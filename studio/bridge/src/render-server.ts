/**
 * toonflow-bridge — Render Server (REST API + SSE)
 *
 * 端口 10590，提供：
 *   REST API  — 项目/分镜查询、渲染任务提交、结果获取
 *   SSE       — 实时渲染进度推送
 *   Static    — 渲染结果文件服务
 *
 * 架构：前端 SPA → Render Server → RenderManager → GsMcpClient → MCP Server
 */

import express from 'express';
import cors from 'cors';
import path from 'path';
import fs from 'fs';
import { EventEmitter } from 'events';
import type { Request, Response, NextFunction } from 'express';
import type { RenderEvent, RenderTask } from './types.js';
import { RenderManager } from './render-manager.js';
import { GsMcpClient } from './gs-mcp-client.js';
import { ToonflowClient } from './toonflow-client.js';

export interface RenderServerOptions {
  port?: number;
  mcpServerPath?: string;
  rendererUrl?: string;
  toonflowUrl?: string;
  staticDir?: string;
  production?: boolean;
  webDistDir?: string;
}

export class RenderServer {
  private app: express.Application;
  private manager: RenderManager;
  private mcp: GsMcpClient;
  private toonflow: ToonflowClient;
  private port: number;
  private sseClients: Map<string, Response> = new Map();
  private production: boolean;
  private webDistDir: string;

  constructor(opts: RenderServerOptions = {}) {
    this.port = opts.port || 10590;
    this.production = opts.production || false;
    this.webDistDir = opts.webDistDir || path.resolve(process.cwd(), 'studio/web/dist');

    // Resolve MCP Server path to absolute — critical for StdioClientTransport spawn
    let mcpPath = opts.mcpServerPath || '';
    if (mcpPath && !path.isAbsolute(mcpPath)) {
      mcpPath = path.resolve(process.cwd(), mcpPath);
    }

    this.mcp = new GsMcpClient(
      mcpPath,
      opts.rendererUrl || 'ws://localhost:9842'
    );
    this.toonflow = new ToonflowClient({ baseUrl: opts.toonflowUrl });
    this.manager = new RenderManager({
      mcpClient: this.mcp,
      toonflowClient: this.toonflow,
    });

    this.app = express();
    this._setupMiddleware();
    this._setupRoutes();
    this._setupSSE();
    this._setupStaticServing();
  }

  // ============================================================
  // 启动
  // ============================================================

  async start(): Promise<void> {
    return new Promise((resolve) => {
      this.app.listen(this.port, () => {
        console.log(`[render-server] Listening on http://localhost:${this.port}`);
        console.log(`[render-server] MCP Server path: ${this.mcp ? 'configured' : 'default'}`);
        console.log(`[render-server] Toonflow URL: ${this.toonflow.getBaseUrl()}`);
        resolve();
      });
    });
  }

  // ============================================================
  // 中间件
  // ============================================================

  private _setupMiddleware(): void {
    // CORS 白名单（默认仅本地 studio web 源；用 ALLOWED_ORIGINS 追加）
    const defaultOrigins = ['http://localhost:5173', 'http://127.0.0.1:5173'];
    const allowedOrigins = process.env.ALLOWED_ORIGINS
      ? process.env.ALLOWED_ORIGINS.split(',').map((o) => o.trim()).filter(Boolean)
      : defaultOrigins;
    this.app.use(cors({ origin: allowedOrigins }));
    this.app.use(express.json({ limit: '50mb' }));

    // Bearer token 鉴权（设置 STUDIO_TOKEN 后对 /api/* 生效；/api/events SSE 除外）
    const token = process.env.STUDIO_TOKEN;
    if (token) {
      this.app.use((req: Request, res: Response, next: NextFunction) => {
        if (!req.path.startsWith('/api/') || req.path === '/api/events') return next();
        const auth = req.headers.authorization ?? '';
        if (auth !== `Bearer ${token}`) {
          res.status(401).json({ error: 'Unauthorized: missing or invalid STUDIO_TOKEN bearer' });
          return;
        }
        next();
      });
      console.log('[render-server] STUDIO_TOKEN auth ENABLED for /api/*');
    } else {
      console.warn('[render-server] WARNING: STUDIO_TOKEN not set — API is unauthenticated. Set STUDIO_TOKEN for any non-localhost deployment.');
    }

    // 请求日志
    this.app.use((req: Request, _res: Response, next: NextFunction) => {
      console.log(`[render-server] ${req.method} ${req.url}`);
      next();
    });
  }

  // ============================================================
  // REST API 路由
  // ============================================================

  private _setupRoutes(): void {
    // ----------------------------------------------------------
    // Health
    // ----------------------------------------------------------
    this.app.get('/api/health', (_req: Request, res: Response) => {
      res.json({
        status: 'ok',
        mcp: this.mcp.isConnected(),
        toonflow: 'configured',
        version: '0.2.0',
      });
    });

    // ----------------------------------------------------------
    // MCP 连接管理
    // ----------------------------------------------------------
    this.app.post('/api/mcp/connect', async (_req: Request, res: Response) => {
      try {
        await this.mcp.connect();
        res.json({ success: true, connected: this.mcp.isConnected() });
      } catch (err: any) {
        // Return 200 with connected:false instead of 500, so frontend doesn't log console errors
        res.json({ success: false, connected: false, error: err.message });
      }
    });

    this.app.post('/api/mcp/disconnect', async (_req: Request, res: Response) => {
      await this.mcp.disconnect();
      res.json({ success: true, connected: false });
    });

    this.app.get('/api/mcp/status', (_req: Request, res: Response) => {
      res.json({ connected: this.mcp.isConnected() });
    });

    this.app.get('/api/mcp/tools', async (_req: Request, res: Response) => {
      try {
        const tools = await this.mcp.listTools();
        res.json({ tools });
      } catch {
        // Return empty list instead of 500 when MCP is unavailable
        res.json({ tools: [] });
      }
    });

    // ----------------------------------------------------------
    // Toonflow 代理
    // ----------------------------------------------------------
    this.app.get('/api/toonflow/health', async (_req: Request, res: Response) => {
      const ok = await this.toonflow.healthCheck();
      res.json({ connected: ok });
    });

    // --- 项目 CRUD ---
    this.app.post('/api/toonflow/projects', async (req: Request, res: Response) => {
      try {
        // If body has 'name', treat as create; otherwise list
        if (req.body?.name) {
          const project = await this.toonflow.createProject(req.body);
          res.json({ project });
        } else {
          const projects = await this.toonflow.listProjects();
          res.json({ projects });
        }
      } catch (err: any) {
        res.json({ projects: [], warning: `Toonflow unavailable: ${err.message}` });
      }
    });

    this.app.get('/api/toonflow/projects', async (_req: Request, res: Response) => {
      try {
        const projects = await this.toonflow.listProjects();
        res.json({ projects });
      } catch (err: any) {
        res.json({ projects: [], warning: `Toonflow unavailable: ${err.message}` });
      }
    });

    this.app.get('/api/toonflow/projects/:projectId', async (req: Request, res: Response) => {
      try {
        const project = await this.toonflow.getProject(req.params.projectId as string);
        res.json({ project });
      } catch (err: any) {
        res.json({ project: null, warning: `Toonflow unavailable: ${err.message}` });
      }
    });

    this.app.put('/api/toonflow/projects/:projectId', async (req: Request, res: Response) => {
      try {
        const result = await this.toonflow.editProject(req.params.projectId as string, req.body);
        res.json({ result });
      } catch (err: any) {
        res.status(500).json({ error: err.message });
      }
    });

    this.app.delete('/api/toonflow/projects/:projectId', async (req: Request, res: Response) => {
      try {
        const result = await this.toonflow.deleteProject(req.params.projectId as string);
        res.json({ result });
      } catch (err: any) {
        res.status(500).json({ error: err.message });
      }
    });

    // --- 脚本管理 ---
    this.app.get('/api/toonflow/projects/:projectId/scripts', async (req: Request, res: Response) => {
      try {
        const scripts = await this.toonflow.getScripts(req.params.projectId as string);
        res.json({ scripts });
      } catch (err: any) {
        res.json({ scripts: [], warning: `Toonflow unavailable: ${err.message}` });
      }
    });

    this.app.post('/api/toonflow/projects/:projectId/scripts', async (req: Request, res: Response) => {
      try {
        const result = await this.toonflow.addScript({ ...req.body, projectId: Number(req.params.projectId) });
        res.json({ result });
      } catch (err: any) {
        res.status(500).json({ error: err.message });
      }
    });

    // --- 分镜管理 ---
    this.app.post('/api/toonflow/projects/:projectId/storyboards', async (req: Request, res: Response) => {
      try {
        const { projectId } = req.params;
        const { scriptId } = req.body || {};
        const storyboards = await this.toonflow.getStoryboards(projectId as string, scriptId as string | number | undefined);
        res.json({ storyboards });
      } catch (err: any) {
        res.json({ storyboards: [], warning: `Toonflow unavailable: ${err.message}` });
      }
    });

    this.app.post('/api/toonflow/projects/:projectId/storyboards/add', async (req: Request, res: Response) => {
      try {
        const result = await this.toonflow.addStoryboard(req.body);
        res.json({ result });
      } catch (err: any) {
        res.status(500).json({ error: err.message });
      }
    });

    this.app.post('/api/toonflow/projects/:projectId/storyboards/batch', async (req: Request, res: Response) => {
      try {
        const { scriptId, items } = req.body;
        const result = await this.toonflow.batchAddStoryboards(Number(scriptId), Number(req.params.projectId), items);
        res.json({ result });
      } catch (err: any) {
        res.status(500).json({ error: err.message });
      }
    });

    this.app.put('/api/toonflow/storyboards/:storyboardId', async (req: Request, res: Response) => {
      try {
        const result = await this.toonflow.updateStoryboard(req.params.storyboardId as string, req.body);
        res.json({ result });
      } catch (err: any) {
        res.status(500).json({ error: err.message });
      }
    });

    this.app.post('/api/toonflow/storyboards/generate-images', async (req: Request, res: Response) => {
      try {
        const { storyboardIds, projectId, scriptId, concurrentCount } = req.body;
        const result = await this.toonflow.batchGenerateImages(storyboardIds, projectId, scriptId, concurrentCount);
        res.json({ result });
      } catch (err: any) {
        res.status(500).json({ error: err.message });
      }
    });

    this.app.delete('/api/toonflow/projects/:projectId/storyboards', async (req: Request, res: Response) => {
      try {
        const { ids } = req.body;
        const result = await this.toonflow.deleteStoryboards(ids, Number(req.params.projectId));
        res.json({ result });
      } catch (err: any) {
        res.status(500).json({ error: err.message });
      }
    });

    // --- Flow Data (完整数据) ---
    this.app.get('/api/toonflow/projects/:projectId/flow', async (req: Request, res: Response) => {
      try {
        const scriptId = Number(req.query.scriptId);
        if (!scriptId) {
          res.status(400).json({ error: 'scriptId query param required' });
          return;
        }
        const flowData = await this.toonflow.getFlowData(Number(req.params.projectId), scriptId);
        res.json({ flowData });
      } catch (err: any) {
        res.json({ flowData: null, warning: `Toonflow unavailable: ${err.message}` });
      }
    });

    // --- 资产管理 ---
    this.app.post('/api/toonflow/projects/:projectId/assets', async (req: Request, res: Response) => {
      try {
        const { projectId } = req.params;
        const { type } = req.body || {};
        const assets = await this.toonflow.getAssets(projectId as string, type as string | undefined);
        res.json({ assets });
      } catch (err: any) {
        res.json({ assets: [], warning: `Toonflow unavailable: ${err.message}` });
      }
    });

    // ----------------------------------------------------------
    // 渲染任务
    // ----------------------------------------------------------
    this.app.post('/api/render/batch', async (req: Request, res: Response) => {
      try {
        const { projectId, storyboardIds, renderConfig } = req.body;
        if (!projectId || !storyboardIds?.length) {
          res.status(400).json({ error: 'projectId and storyboardIds required' });
          return;
        }

        // 从 Toonflow 获取分镜和资产
        const [storyboards, assets] = await Promise.all([
          this.toonflow.getStoryboards(projectId),
          this.toonflow.getAssets(projectId),
        ]);

        const filtered = storyboards.filter(sb => storyboardIds.includes(sb.id));
        const batch = await this.manager.renderStoryboardBatch(
          projectId, filtered, assets, renderConfig
        );

        res.json({ batch });
      } catch (err: any) {
        res.status(500).json({ error: err.message });
      }
    });

    this.app.post('/api/render/single', async (req: Request, res: Response) => {
      try {
        const { projectId, storyboardId, renderConfig } = req.body;
        if (!projectId || !storyboardId) {
          res.status(400).json({ error: 'projectId and storyboardId required' });
          return;
        }

        const storyboards = await this.toonflow.getStoryboards(projectId);
        const assets = await this.toonflow.getAssets(projectId);
        const storyboard = storyboards.find(sb => sb.id === storyboardId);

        if (!storyboard) {
          res.status(404).json({ error: 'Storyboard not found' });
          return;
        }

        const task = await this.manager.renderSingleStoryboard(
          projectId, storyboard, assets, renderConfig
        );
        res.json({ task });
      } catch (err: any) {
        res.status(500).json({ error: err.message });
      }
    });

    // 3DGS-only 渲染（不依赖 Toonflow，直接从描述渲染）
    this.app.post('/api/render/direct', async (req: Request, res: Response) => {
      try {
        const { sceneDescription, sceneFile, cameraSpec, renderConfig } = req.body;
        if (!sceneDescription && !sceneFile) {
          res.status(400).json({ error: 'sceneDescription or sceneFile required' });
          return;
        }

        if (!this.mcp.isConnected()) {
          try {
            await this.mcp.connect();
          } catch (connectErr: any) {
            res.json({ error: `MCP Server unavailable: ${connectErr.message}`, sceneId: null });
            return;
          }
        }

        const sceneRequest = {
          storyboardId: `direct-${Date.now()}`,
          projectId: 'direct',
          sceneDescription: sceneDescription || `Load from ${sceneFile}`,
          sceneFile: sceneFile || '',
          cameraSpec: cameraSpec || {
            position: { x: 0, y: 1.5, z: 4 },
            target: { x: 0, y: 0.8, z: 0 },
            fov: 50,
          },
          assets: [],
          renderConfig: {
            width: 1920,
            height: 1080,
            fps: 24,
            duration: 3,
            format: 'mp4',
            quality: 'preview',
            ...renderConfig,
          },
        };

        const result = await this.mcp.buildScene(sceneRequest);
        const imageUrl = await this.mcp.renderFrame(result.sceneId, {
          width: sceneRequest.renderConfig.width,
          height: sceneRequest.renderConfig.height,
          quality: sceneRequest.renderConfig.quality,
        });

        res.json({
          sceneId: result.sceneId,
          previewUrl: result.previewUrl,
          renderUrl: imageUrl,
          usedCameraSpec: result.usedCameraSpec || null,
        });
      } catch (err: any) {
        res.status(500).json({ error: err.message });
      }
    });

    // MCP 工具直调（调试用）
    this.app.post('/api/mcp/call', async (req: Request, res: Response) => {
      try {
        const { toolName, args } = req.body;
        if (!toolName) {
          res.status(400).json({ error: 'toolName required' });
          return;
        }

        if (!this.mcp.isConnected()) {
          try {
            await this.mcp.connect();
          } catch (connectErr: any) {
            res.json({ result: { error: `MCP Server unavailable: ${connectErr.message}` } });
            return;
          }
        }

        const result = await this.mcp.callTool(toolName, args || {});
        res.json({ result });
      } catch (err: any) {
        res.status(500).json({ error: err.message });
      }
    });

    // ----------------------------------------------------------
    // 场景文件管理（本地 .ply/.splat 文件）
    // ----------------------------------------------------------
    this.app.get('/api/scenes', (_req: Request, res: Response) => {
      try {
        const scenesDir = path.resolve(process.cwd(), 'scenes');
        if (!fs.existsSync(scenesDir)) {
          res.json({ scenes: [], directory: scenesDir });
          return;
        }

        const files = fs.readdirSync(scenesDir);
        const scenes = files
          .filter(f => f.endsWith('.ply') || f.endsWith('.splat') || f.endsWith('.spz') || f.endsWith('.ksplat'))
          .map(f => {
            const filePath = path.join(scenesDir, f);
            const stat = fs.statSync(filePath);
            return {
              name: f,
              format: f.split('.').pop() || 'unknown',
              size: stat.size,
              sizeMB: Math.round(stat.size / 1024 / 1024 * 100) / 100,
              modified: stat.mtime.toISOString(),
              path: `scenes/${f}`,
            };
          });

        res.json({ scenes, directory: scenesDir });
      } catch (err: any) {
        res.json({ scenes: [], error: err.message });
      }
    });

    // Serve PLY/SPLAT files from scenes/ directory for browser renderer
    this.app.get('/api/files/scenes/:filename', (req: Request, res: Response) => {
      try {
        const filename = req.params.filename as string;
        const scenesDir = path.resolve(process.cwd(), 'scenes');
        const filePath = path.resolve(scenesDir, filename);

        // Security: prevent path traversal
        if (!filePath.startsWith(scenesDir + path.sep) && filePath !== scenesDir) {
          res.status(403).json({ error: 'Path traversal denied' });
          return;
        }

        if (!fs.existsSync(filePath)) {
          res.status(404).json({ error: 'File not found' });
          return;
        }

        const stat = fs.statSync(filePath);
        res.setHeader('Content-Length', stat.size);
        res.setHeader('Access-Control-Allow-Origin', '*');

        const ext = filename.split('.').pop()?.toLowerCase();
        if (ext === 'ply') {
          res.setHeader('Content-Type', 'application/octet-stream');
        } else if (ext === 'splat') {
          res.setHeader('Content-Type', 'application/octet-stream');
        } else {
          res.setHeader('Content-Type', 'application/octet-stream');
        }

        const stream = fs.createReadStream(filePath);
        stream.pipe(res);
        stream.on('error', () => {
          if (!res.headersSent) res.status(500).json({ error: 'Stream error' });
        });
      } catch (err: any) {
        res.status(500).json({ error: err.message });
      }
    });

    // Serve rendered images from .temp/renders/
    this.app.get('/api/renders/:filename', (req: Request, res: Response) => {
      try {
        const filename = req.params.filename as string;
        const rendersDir = path.resolve(process.cwd(), '.temp', 'renders');
        const filePath = path.resolve(rendersDir, filename);

        // Security: prevent path traversal
        if (!filePath.startsWith(rendersDir + path.sep) && filePath !== rendersDir) {
          res.status(403).json({ error: 'Path traversal denied' });
          return;
        }

        if (!fs.existsSync(filePath)) {
          res.status(404).json({ error: 'Render not found' });
          return;
        }

        const ext = filename.split('.').pop()?.toLowerCase();
        const contentType = ext === 'png' ? 'image/png' : ext === 'jpeg' || ext === 'jpg' ? 'image/jpeg' : ext === 'webp' ? 'image/webp' : 'application/octet-stream';

        res.setHeader('Content-Type', contentType);
        res.setHeader('Access-Control-Allow-Origin', '*');
        res.setHeader('Cache-Control', 'public, max-age=3600');

        const stream = fs.createReadStream(filePath);
        stream.pipe(res);
        stream.on('error', () => {
          if (!res.headersSent) res.status(500).json({ error: 'Stream error' });
        });
      } catch (err: any) {
        res.status(500).json({ error: err.message });
      }
    });

    // ----------------------------------------------------------
    // 渲染结果查询
    // ----------------------------------------------------------
    this.app.get('/api/render/tasks', (req: Request, res: Response) => {
      const projectId = req.query.projectId as string | undefined;
      const tasks = this.manager.listTasks(projectId);
      res.json({ tasks });
    });

    this.app.get('/api/render/tasks/:taskId', (req: Request, res: Response) => {
      const task = this.manager.getTask(req.params.taskId as string);
      if (!task) {
        res.status(404).json({ error: 'Task not found' });
        return;
      }
      res.json({ task });
    });

    this.app.get('/api/render/batches', (req: Request, res: Response) => {
      const projectId = req.query.projectId as string | undefined;
      const batches = this.manager.listBatches(projectId);
      res.json({ batches });
    });

    this.app.get('/api/render/batches/:batchId', (req: Request, res: Response) => {
      const batch = this.manager.getBatch(req.params.batchId as string);
      if (!batch) {
        res.status(404).json({ error: 'Batch not found' });
        return;
      }
      res.json({ batch });
    });
  }

  // ============================================================
  // 静态文件服务（生产模式）
  // ============================================================

  private _setupStaticServing(): void {
    // Serve renderer.html from studio/web/public/ (always, for iframe embedding)
    const publicDir = path.resolve(process.cwd(), 'studio/web/public');
    if (fs.existsSync(publicDir)) {
      this.app.use('/renderer', express.static(publicDir));
      // Specifically serve renderer.html at /renderer/
      this.app.get('/renderer/', (req: Request, res: Response) => {
        const htmlPath = path.join(publicDir, 'renderer.html');
        if (fs.existsSync(htmlPath)) {
          res.sendFile(htmlPath);
        } else {
          res.status(404).send('Renderer not found');
        }
      });
    }

    // Production mode: serve Vite build output directly from Bridge
    if (this.production && fs.existsSync(this.webDistDir)) {
      console.log(`[render-server] Production mode: serving static from ${this.webDistDir}`);
      this.app.use(express.static(this.webDistDir));

      // SPA fallback: all non-API, non-file routes → index.html
      this.app.get('*', (req: Request, res: Response, next: NextFunction) => {
        // Skip API routes and file serving routes
        if (req.path.startsWith('/api/') || req.path.startsWith('/renderer/')) {
          return next();
        }
        const indexPath = path.join(this.webDistDir, 'index.html');
        if (fs.existsSync(indexPath)) {
          res.sendFile(indexPath);
        } else {
          next();
        }
      });
    }
  }

  // ============================================================
  // SSE 实时推送
  // ============================================================

  private _setupSSE(): void {
    this.app.get('/api/events', (req: Request, res: Response) => {
      const clientId = `sse-${Date.now()}-${Math.random().toString(36).slice(2, 8)}`;

      res.writeHead(200, {
        'Content-Type': 'text/event-stream',
        'Cache-Control': 'no-cache',
        Connection: 'keep-alive',
        'Access-Control-Allow-Origin': '*',
      });
      res.write(`data: ${JSON.stringify({ type: 'connected', clientId })}\n\n`);

      this.sseClients.set(clientId, res);

      // 心跳
      const heartbeat = setInterval(() => {
        try {
          res.write(': heartbeat\n\n');
        } catch {
          clearInterval(heartbeat);
          this.sseClients.delete(clientId);
        }
      }, 15000);

      req.on('close', () => {
        clearInterval(heartbeat);
        this.sseClients.delete(clientId);
      });
    });

    // 从 RenderManager 订阅事件
    this.manager.on('event', (event: RenderEvent) => {
      this._broadcastSSE(event);
    });

    // 从 MCP Client 订阅事件
    this.mcp.on('toolCall', (toolName: string, args: Record<string, unknown>) => {
      this._broadcastSSE({
        type: 'log',
        data: { source: 'mcp', action: 'toolCall', toolName, args },
        timestamp: new Date().toISOString(),
      });
    });

    this.mcp.on('toolResult', (toolName: string, result: any) => {
      this._broadcastSSE({
        type: 'log',
        data: { source: 'mcp', action: 'toolResult', toolName, summary: typeof result === 'string' ? result.slice(0, 200) : 'object' },
        timestamp: new Date().toISOString(),
      });
    });
  }

  private _broadcastSSE(event: RenderEvent): void {
    const data = JSON.stringify(event);
    for (const [clientId, res] of this.sseClients) {
      try {
        res.write(`data: ${data}\n\n`);
      } catch {
        this.sseClients.delete(clientId);
      }
    }
  }
}

// ============================================================
// 独立运行入口
// ============================================================

// ESM-compatible entry point detection.
// In ESM, `require` is undefined; use import.meta.url instead.
const __entry = typeof require !== 'undefined'
  ? (require.main === module)
  : (process.argv[1] && import.meta.url.endsWith(process.argv[1].replace(/\\/g, '/')));

if (__entry) {
  const mcpPath = process.env.MCP_SERVER_PATH || 'mcp-server/dist/index.js';
  const isProduction = (process.env.NODE_ENV === 'production' || process.env.PRODUCTION === '1');

  // NOTE (v0.8): we intentionally do NOT kill whatever occupies the renderer
  // port — that used to terminate unrelated processes. If the port is busy,
  // the MCP Server will report the conflict; set RENDERER_PORT to resolve it.
  {
      const server = new RenderServer({
        port: parseInt(process.env.BRIDGE_PORT || '10590'),
        mcpServerPath: mcpPath,
        rendererUrl: process.env.RENDERER_URL || 'ws://localhost:9842',
        toonflowUrl: process.env.TOONFLOW_URL || 'http://localhost:10588',
        production: isProduction,
        webDistDir: process.env.WEB_DIST_DIR || undefined,
      });
      server.start().then(() => {
        const mode = isProduction ? 'PRODUCTION' : 'DEVELOPMENT';
        console.log(`[render-server] Ready (${mode}). MCP Server path resolved to: ${path.resolve(process.cwd(), mcpPath)}`);
        if (isProduction) {
          console.log(`[render-server] Static files served from: ${server['webDistDir'] || 'studio/web/dist'}`);
          console.log(`[render-server] Open http://localhost:${process.env.BRIDGE_PORT || '10590'}`);
        }
      });
  }
}

export default RenderServer;
