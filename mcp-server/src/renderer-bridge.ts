/**
 * Renderer Bridge — WebSocket + HTTP server between MCP Server and browser renderers.
 *
 * Architecture (v0.8):
 *   MCP Client (stdio) ←→ MCP Server ←[WebSocket :9842]→ Browser Renderer(s)
 *                                     ←[HTTP  :9842]→ scene file serving (/scenes/*)
 *
 * Multiple renderer clients may connect simultaneously. Each client announces
 * its capabilities via a `hello` message ({ renderer: 'gsplat' | 'three-points' }).
 * Render requests are routed to the most recently connected capable client.
 *
 * True-3DGS loop: import_scene serializes the scene to a PLY under .temp/scenes/,
 * serves it over HTTP, and sends `load_gaussians_url` — gsplat.js-capable
 * renderers load the real Gaussian data (with sorting & alpha compositing).
 *
 * If no browser is connected, the bridge operates in headless mode.
 */

import http from 'http';
import fs from 'fs';
import path from 'path';
import { WebSocketServer, WebSocket } from 'ws';
import type { RendererMessage, RendererResponse } from './types.js';

const DEFAULT_PORT = 9842;

interface PendingRequest {
  resolve: (response: RendererResponse) => void;
  reject: (error: Error) => void;
  timeout: NodeJS.Timeout;
}

interface RendererClient {
  ws: WebSocket;
  renderer: string;           // 'gsplat' | 'three-points' | 'unknown'
  capabilities: string[];     // e.g. ['splat-render', 'point-cloud', 'capture']
  connectedAt: number;
}

export class RendererBridge {
  private httpServer: http.Server | null = null;
  private wss: WebSocketServer | null = null;
  private clients = new Set<RendererClient>();
  private port: number;
  private pendingRequests = new Map<number, PendingRequest>();
  private messageId = 0;
  private sceneLoadedResolve: (() => void) | null = null;
  private serveRoots: string[] = [];

  constructor(port: number = DEFAULT_PORT) {
    this.port = port;
  }

  /**
   * Start HTTP + WebSocket server. HTTP serves scene files from whitelisted
   * directories; WebSocket carries the renderer control protocol.
   * WebSocket upgrade requests are checked against an origin allowlist
   * (RENDERER_ORIGINS env, default: any localhost origin).
   */
  async connect(serveRoots: string[] = []): Promise<boolean> {
    this.serveRoots = serveRoots.map((r) => path.resolve(r));
    return new Promise((resolve) => {
      try {
        this.httpServer = http.createServer((req, res) => this.handleHttp(req, res));
        this.wss = new WebSocketServer({ server: this.httpServer });

        // Origin allowlist for WebSocket upgrades (anti-hijack baseline)
        const allowedOriginEnv = process.env.RENDERER_ORIGINS;
        const isOriginAllowed = (origin: string | undefined): boolean => {
          if (allowedOriginEnv) {
            if (!origin) return false;
            return allowedOriginEnv.split(',').some((o) => origin.startsWith(o.trim()));
          }
          // Default: localhost origins only
          if (!origin) return true; // non-browser clients (curl/scripts)
          return /^https?:\/\/(localhost|127\.0\.0\.1)(:\d+)?$/.test(origin);
        };

        this.httpServer.on('upgrade', (req, socket, head) => {
          const origin = req.headers.origin as string | undefined;
          if (!isOriginAllowed(origin)) {
            console.error(`[RendererBridge] WS upgrade rejected for origin: ${origin ?? '(none)'}`);
            socket.write('HTTP/1.1 403 Forbidden\r\n\r\n');
            socket.destroy();
            return;
          }
          this.wss!.handleUpgrade(req, socket, head, (ws) => {
            this.wss!.emit('connection', ws, req);
          });
        });

        this.httpServer.listen(this.port, () => {
          console.error(`[RendererBridge] HTTP + WebSocket server listening on port ${this.port}`);
          console.error(`[RendererBridge] Scene files: http://localhost:${this.port}/scenes/<file> | Renderer: gsplat-renderer.html`);
          resolve(true);
        });

        this.wss.on('connection', (ws: WebSocket, req) => {
          const client: RendererClient = { ws, renderer: 'unknown', capabilities: [], connectedAt: Date.now() };
          this.clients.add(client);
          console.error(`[RendererBridge] Renderer connected from ${req.socket.remoteAddress} (${this.clients.size} total)`);

          ws.on('message', (data: WebSocket.RawData, isBinary: boolean) => {
            if (isBinary) return; // renderers only send JSON text
            this.handleMessage(data.toString(), client);
          });

          ws.on('close', () => {
            this.clients.delete(client);
            console.error(`[RendererBridge] Renderer disconnected (${this.clients.size} remaining)`);
            if (this.clients.size === 0) this.rejectAllPending('All renderers disconnected');
          });

          ws.on('error', (err: Error) => {
            console.error(`[RendererBridge] Client error: ${err.message}`);
          });
        });

        this.httpServer.on('error', (err: Error) => {
          console.error(`[RendererBridge] Server error: ${err.message}`);
          if (err.message.includes('EADDRINUSE')) {
            console.error(`[RendererBridge] Port ${this.port} in use — refusing to hijack another process's port.`);
            console.error(`[RendererBridge] Set RENDERER_PORT env to use a different port.`);
            resolve(false);
          } else {
            resolve(false);
          }
        });
      } catch (err) {
        console.error(`[RendererBridge] Failed to start: ${(err as Error).message}`);
        resolve(false);
      }
    });
  }

  /** Serve whitelisted scene/export files over HTTP (path-traversal safe). */
  private handleHttp(req: http.IncomingMessage, res: http.ServerResponse): void {
    const url = new URL(req.url ?? '/', `http://localhost:${this.port}`);
    if (url.pathname === '/health') {
      res.writeHead(200, { 'Content-Type': 'application/json' });
      res.end(JSON.stringify({ ok: true, port: this.port, clients: this.clients.size }));
      return;
    }
    const m = url.pathname.match(/^\/(?:scenes|exports)\/(.+)$/);
    if (!m) {
      res.writeHead(404, { 'Content-Type': 'text/plain' });
      res.end('Not found');
      return;
    }
    const name = decodeURIComponent(m[1]);
    if (name.includes('..') || name.includes('/') || name.includes('\\')) {
      res.writeHead(400); res.end('Bad request'); return;
    }
    const sub = url.pathname.startsWith('/exports/') ? 'exports' : 'scenes';
    const filePath = path.resolve(path.join(process.cwd(), '.temp', sub, name));
    // Defense in depth: resolved path must stay inside .temp/<sub>/
    const allowedRoot = path.resolve(path.join(process.cwd(), '.temp', sub));
    if (!filePath.startsWith(allowedRoot + path.sep) || !fs.existsSync(filePath)) {
      res.writeHead(404); res.end('Not found'); return;
    }
    // Also honor configured external serve roots (e.g., repo scenes/ dir)
    res.writeHead(200, {
      'Content-Type': name.endsWith('.ply') ? 'application/octet-stream' : 'application/octet-stream',
      'Access-Control-Allow-Origin': '*',
      'Content-Length': fs.statSync(filePath).size,
    });
    fs.createReadStream(filePath).pipe(res);
  }

  /** Check whether a path inside one of the configured serve roots; returns served URL or null. */
  serveUrlForFile(absPath: string): string | null {
    const resolved = path.resolve(absPath);
    const inTempScenes = resolved.startsWith(path.resolve(path.join(process.cwd(), '.temp', 'scenes')) + path.sep);
    const inTempExports = resolved.startsWith(path.resolve(path.join(process.cwd(), '.temp', 'exports')) + path.sep);
    if (inTempScenes) return `/scenes/${path.basename(resolved)}`;
    if (inTempExports) return `/exports/${path.basename(resolved)}`;
    return null;
  }

  private anyClient(): RendererClient | null {
    let best: RendererClient | null = null;
    for (const c of this.clients) {
      if (c.ws.readyState === WebSocket.OPEN && (!best || c.connectedAt > best.connectedAt)) best = c;
    }
    return best;
  }

  private pickClient(requireCapability?: string): RendererClient | null {
    let best: RendererClient | null = null;
    for (const c of this.clients) {
      if (c.ws.readyState !== WebSocket.OPEN) continue;
      if (requireCapability && !c.capabilities.includes(requireCapability)) continue;
      if (!best || c.connectedAt > best.connectedAt) best = c;
    }
    return best;
  }

  isRendererConnected(): boolean {
    return this.anyClient() !== null;
  }

  connectedRenderers(): Array<{ renderer: string; capabilities: string[] }> {
    return Array.from(this.clients).map((c) => ({ renderer: c.renderer, capabilities: c.capabilities }));
  }

  /**
   * Send a message to the renderer and wait for response.
   * Render requests prefer a splat-render capable client (gsplat);
   * other messages go to the newest client.
   */
  async send(message: RendererMessage): Promise<RendererResponse> {
    const needCapability = message.type === 'render' ? 'splat-render' : undefined;
    const client = this.pickClient(needCapability) ?? this.anyClient();
    if (!client) return this.headlessResponse(message);

    return new Promise((resolve, reject) => {
      const id = ++this.messageId;
      const payload = JSON.stringify({ id, ...message });

      const timeout = setTimeout(() => {
        this.pendingRequests.delete(id);
        reject(new Error(`Renderer request timeout after 10s for: ${message.type}`));
      }, 10000);

      this.pendingRequests.set(id, { resolve, reject, timeout });
      client.ws.send(payload);
    });
  }

  /** Broadcast a message to all connected renderers (no response expected). */
  broadcast(message: Record<string, unknown>): void {
    const payload = JSON.stringify(message);
    for (const c of this.clients) {
      if (c.ws.readyState === WebSocket.OPEN) c.ws.send(payload);
    }
  }

  private handleMessage(raw: string, client: RendererClient): void {
    try {
      const msg = JSON.parse(raw) as { id?: number } & RendererResponse;

      if (msg.type === 'hello') {
        client.renderer = (msg as { renderer?: string }).renderer ?? 'unknown';
        client.capabilities = (msg as { capabilities?: string[] }).capabilities ?? [];
        console.error(`[RendererBridge] hello: renderer=${client.renderer} capabilities=[${client.capabilities.join(',')}]`);
        return;
      }

      if (msg.type === 'scene_loaded' && this.sceneLoadedResolve) {
        console.error(`[RendererBridge] Received scene_loaded confirmation from renderer`);
        this.sceneLoadedResolve();
        this.sceneLoadedResolve = null;
      }

      if (msg.id === undefined) return;
      const pending = this.pendingRequests.get(msg.id);
      if (pending) {
        clearTimeout(pending.timeout);
        this.pendingRequests.delete(msg.id);
        pending.resolve(msg);
      }
    } catch (err) {
      console.error(`[RendererBridge] Failed to parse renderer message: ${(err as Error).message}`);
    }
  }

  private rejectAllPending(reason: string): void {
    for (const [, pending] of this.pendingRequests) {
      clearTimeout(pending.timeout);
      pending.reject(new Error(reason));
    }
    this.pendingRequests.clear();
  }

  /** Headless fallback when no renderer is connected. */
  private headlessResponse(message: RendererMessage): RendererResponse {
    switch (message.type) {
      case 'render':
        return { type: 'render_result', image: '', renderTimeMs: 0, width: message.width, height: message.height };
      case 'query_scene':
        return { type: 'query_result', data: { headless: true, message: 'Renderer not connected. Scene state available via server-side query.' } };
      case 'load_scene':
        return { type: 'scene_loaded', sceneId: message.sceneId, gaussianCount: 0, bbox: { min: [0, 0, 0], max: [0, 0, 0] } };
      default:
        return { type: 'pong' };
    }
  }

  /**
   * Tell renderers to load a scene from an HTTP-served PLY/SPLAT file.
   * gsplat-capable renderers perform real sorted alpha-compositing rendering.
   */
  async pushGaussiansUrl(params: {
    sceneId: string;
    url: string;
    format: string;
    bboxCenter: [number, number, number];
    bboxSize: [number, number, number];
  }): Promise<void> {
    if (!this.isRendererConnected()) {
      console.error('[RendererBridge] No renderer connected — load_gaussians_url skipped');
      return;
    }
    const sceneLoadedPromise = new Promise<void>((resolve) => { this.sceneLoadedResolve = resolve; });
    const timeoutPromise = new Promise<void>((resolve) => setTimeout(resolve, 30000));

    this.broadcast({
      id: ++this.messageId,
      type: 'load_gaussians_url',
      sceneId: params.sceneId,
      url: params.url,
      format: params.format,
      bboxCenter: params.bboxCenter,
      bboxSize: params.bboxSize,
    });

    const startTime = Date.now();
    await Promise.race([sceneLoadedPromise, timeoutPromise]);
    console.error(`[RendererBridge] Scene load via URL confirmed/timeout after ${Date.now() - startTime}ms`);
    await new Promise((r) => setTimeout(r, 300));
  }

  /**
   * Push parsed point cloud data directly (fallback preview path for
   * renderers without splat support). Binary layout:
   *   [4B pointCount][4B dataLen][pointCount × 7 × f32: xyz rgb opacity]
   */
  async pushPointCloud(params: {
    sceneId: string;
    positions: Float32Array;
    colors: Float32Array;
    opacities: Float32Array;
    pointCount: number;
    bboxCenter: [number, number, number];
    bboxSize: [number, number, number];
  }): Promise<void> {
    if (!this.isRendererConnected()) {
      console.error('[RendererBridge] No renderer connected, skipping point cloud push');
      return;
    }

    const { sceneId, positions, colors, opacities, pointCount, bboxCenter, bboxSize } = params;

    const sceneLoadedPromise = new Promise<void>((resolve) => { this.sceneLoadedResolve = resolve; });
    const timeoutPromise = new Promise<void>((resolve) => setTimeout(resolve, 15000));

    this.broadcast({
      id: ++this.messageId,
      type: 'load_point_cloud',
      sceneId,
      pointCount,
      bboxCenter,
      bboxSize,
    });

    const stride = 7;
    const buffer = Buffer.alloc(4 + 4 + pointCount * stride * 4);
    buffer.writeUInt32LE(pointCount, 0);
    buffer.writeUInt32LE(pointCount * stride * 4, 4);
    let offset = 8;
    for (let i = 0; i < pointCount; i++) {
      buffer.writeFloatLE(positions[i * 3 + 0], offset); offset += 4;
      buffer.writeFloatLE(positions[i * 3 + 1], offset); offset += 4;
      buffer.writeFloatLE(positions[i * 3 + 2], offset); offset += 4;
      buffer.writeFloatLE(colors[i * 3 + 0], offset); offset += 4;
      buffer.writeFloatLE(colors[i * 3 + 1], offset); offset += 4;
      buffer.writeFloatLE(colors[i * 3 + 2], offset); offset += 4;
      buffer.writeFloatLE(opacities[i], offset); offset += 4;
    }

    for (const c of this.clients) {
      if (c.ws.readyState === WebSocket.OPEN) c.ws.send(buffer);
    }
    console.error(`[RendererBridge] Pushed ${pointCount} points to ${this.clients.size} renderer(s) (${(buffer.byteLength / 1024 / 1024).toFixed(2)} MB)`);

    await Promise.race([sceneLoadedPromise, timeoutPromise]);
    await new Promise((r) => setTimeout(r, 300));
  }

  disconnect(): void {
    for (const c of this.clients) c.ws.close();
    this.clients.clear();
    if (this.wss) { this.wss.close(); this.wss = null; }
    if (this.httpServer) { this.httpServer.close(); this.httpServer = null; }
    this.rejectAllPending('Bridge disconnected');
  }
}
