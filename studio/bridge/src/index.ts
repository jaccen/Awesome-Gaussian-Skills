/**
 * toonflow-bridge — MCP Server Entry
 *
 * 以 MCP Server 模式运行（stdio transport），向宿主 Agent 暴露 8 个工具：
 *   1. render_storyboard  — 从 Toonflow 分镜生成 3DGS 渲染
 *   2. render_direct      — 直接从描述生成 3DGS 场景
 *   3. query_task         — 查询渲染任务状态
 *   4. list_tasks         — 列出所有渲染任务
 *   5. connect_toonflow   — 连接 Toonflow 引擎
 *   6. connect_mcp        — 连接 3DGS MCP Server
 *   7. list_mcp_tools     — 列出 MCP Server 可用工具
 *   8. call_mcp_tool      — 直接调用 MCP 工具
 *
 * 使用方式：
 *   npx @modelcontextprotocol/sdk  (自动 stdio 通信)
 *   或在 Claude Code / Cursor 等中配置 MCP Server
 */

import { Server } from '@modelcontextprotocol/sdk/server/index.js';
import { StdioServerTransport } from '@modelcontextprotocol/sdk/server/stdio.js';
import {
  CallToolRequestSchema,
  ListToolsRequestSchema,
} from '@modelcontextprotocol/sdk/types.js';
import { z } from 'zod';
import { v4 as uuid } from 'uuid';
import { GsMcpClient } from './gs-mcp-client.js';
import { ToonflowClient } from './toonflow-client.js';
import { RenderManager } from './render-manager.js';
import type { RenderTask } from './types.js';

// ============================================================
// 工具定义
// ============================================================

const TOOLS = [
  {
    name: 'render_storyboard',
    description: '从 Toonflow 分镜数据生成 3DGS 渲染结果（图片或视频）。输入分镜ID，自动构建场景、设置相机并渲染。',
    inputSchema: {
      type: 'object' as const,
      properties: {
        projectId: { type: 'string', description: 'Toonflow 项目 ID' },
        storyboardId: { type: 'string', description: '分镜 ID' },
        quality: { type: 'string', enum: ['draft', 'preview', 'final'], description: '渲染质量', default: 'preview' },
        width: { type: 'number', description: '输出宽度', default: 1920 },
        height: { type: 'number', description: '输出高度', default: 1080 },
      },
      required: ['projectId', 'storyboardId'],
    },
  },
  {
    name: 'render_direct',
    description: '直接从文本描述生成 3DGS 场景并渲染。无需 Toonflow，适用于独立 3DGS 渲染需求。',
    inputSchema: {
      type: 'object' as const,
      properties: {
        sceneDescription: { type: 'string', description: '场景描述（中文或英文）' },
        cameraPosition: { type: 'object', description: '相机位置 {x,y,z}' },
        cameraTarget: { type: 'object', description: '相机朝向 {x,y,z}' },
        fov: { type: 'number', description: '视场角', default: 50 },
        quality: { type: 'string', enum: ['draft', 'preview', 'final'], default: 'preview' },
      },
      required: ['sceneDescription'],
    },
  },
  {
    name: 'query_task',
    description: '查询指定渲染任务的状态和结果。',
    inputSchema: {
      type: 'object' as const,
      properties: {
        taskId: { type: 'string', description: '渲染任务 ID' },
      },
      required: ['taskId'],
    },
  },
  {
    name: 'list_tasks',
    description: '列出所有渲染任务，可按项目过滤。',
    inputSchema: {
      type: 'object' as const,
      properties: {
        projectId: { type: 'string', description: '按项目 ID 过滤' },
      },
    },
  },
  {
    name: 'connect_toonflow',
    description: '测试与 Toonflow 短剧引擎的连接。',
    inputSchema: {
      type: 'object' as const,
      properties: {
        url: { type: 'string', description: 'Toonflow 服务地址', default: 'http://localhost:10588' },
      },
    },
  },
  {
    name: 'connect_mcp',
    description: '连接 3DGS MCP Server（Awesome-Gaussian-Skills 内置）。',
    inputSchema: {
      type: 'object' as const,
      properties: {
        serverPath: { type: 'string', description: 'MCP Server 入口路径' },
        rendererUrl: { type: 'string', description: 'WebSocket 渲染器地址', default: 'ws://localhost:9842' },
      },
    },
  },
  {
    name: 'list_mcp_tools',
    description: '列出 3DGS MCP Server 暴露的所有工具。',
    inputSchema: {
      type: 'object' as const,
      properties: {},
    },
  },
  {
    name: 'call_mcp_tool',
    description: '直接调用 3DGS MCP Server 的某个工具（高级调试用）。',
    inputSchema: {
      type: 'object' as const,
      properties: {
        toolName: { type: 'string', description: '工具名称，如 import_scene, set_camera, render_frame' },
        args: { type: 'object', description: '工具参数' },
      },
      required: ['toolName'],
    },
  },
];

// ============================================================
// Server 初始化
// ============================================================

const server = new Server(
  { name: 'toonflow-bridge', version: '0.2.0' },
  { capabilities: { tools: {} } }
);

let mcpClient: GsMcpClient | null = null;
let toonflowClient: ToonflowClient | null = null;
let renderManager: RenderManager | null = null;

function getMcpClient(): GsMcpClient {
  if (!mcpClient) throw new Error('3DGS MCP Server not connected. Call connect_mcp first.');
  return mcpClient;
}

function getToonflowClient(): ToonflowClient {
  if (!toonflowClient) throw new Error('Toonflow not connected. Call connect_toonflow first.');
  return toonflowClient;
}

function getRenderManager(): RenderManager {
  if (!renderManager) throw new Error('Render manager not initialized.');
  return renderManager;
}

// ============================================================
// 工具列表
// ============================================================

server.setRequestHandler(ListToolsRequestSchema, async () => ({
  tools: TOOLS,
}));

// ============================================================
// 工具调用
// ============================================================

server.setRequestHandler(CallToolRequestSchema, async (request) => {
  const { name, arguments: args } = request.params;

  try {
    switch (name) {
      // --------------------------------------------------------
      case 'render_storyboard': {
        const mgr = getRenderManager();
        const tf = getToonflowClient();

        const storyboards = await tf.getStoryboards(args!.projectId as string);
        const sb = storyboards.find(s => s.id === args!.storyboardId);
        if (!sb) {
          return { content: [{ type: 'text', text: `Storyboard not found: ${args!.storyboardId}` }], isError: true };
        }

        const assets = await tf.getAssets(args!.projectId as string);
        const task = await mgr.renderSingleStoryboard(
          args!.projectId as string,
          sb,
          assets,
          { quality: args!.quality as any, width: args!.width as number, height: args!.height as number }
        );

        return {
          content: [{
            type: 'text',
            text: JSON.stringify({ taskId: task.id, status: task.status, outputUrl: task.outputUrl, progress: task.progress }, null, 2),
          }],
        };
      }

      // --------------------------------------------------------
      case 'render_direct': {
        const client = getMcpClient();
        if (!client.isConnected()) await client.connect();

        const camPos = args!.cameraPosition as { x: number; y: number; z: number } | undefined;
        const camTgt = args!.cameraTarget as { x: number; y: number; z: number } | undefined;

        const sceneRequest = {
          storyboardId: `direct-${Date.now()}`,
          projectId: 'direct',
          sceneDescription: args!.sceneDescription as string,
          cameraSpec: {
            position: camPos || { x: 0, y: 1.5, z: 4 },
            target: camTgt || { x: 0, y: 0.8, z: 0 },
            fov: Number(args!.fov) || 50,
          },
          assets: [],
          renderConfig: {
            width: 1920,
            height: 1080,
            fps: 24,
            duration: 3,
            format: 'mp4' as const,
            quality: (args!.quality || 'preview') as any,
          },
        };

        const result = await client.buildScene(sceneRequest);
        const frameUrl = await client.renderFrame(result.sceneId, {
          width: sceneRequest.renderConfig.width,
          height: sceneRequest.renderConfig.height,
          quality: sceneRequest.renderConfig.quality,
        });

        return {
          content: [{
            type: 'text',
            text: JSON.stringify({ sceneId: result.sceneId, previewUrl: result.previewUrl, renderUrl: frameUrl }, null, 2),
          }],
        };
      }

      // --------------------------------------------------------
      case 'query_task': {
        const mgr = getRenderManager();
        const task = mgr.getTask(args!.taskId as string);
        if (!task) {
          return { content: [{ type: 'text', text: `Task not found: ${args!.taskId}` }], isError: true };
        }
        return {
          content: [{ type: 'text', text: JSON.stringify(task, null, 2) }],
        };
      }

      // --------------------------------------------------------
      case 'list_tasks': {
        const mgr = getRenderManager();
        const tasks = mgr.listTasks(args!.projectId as string);
        return {
          content: [{ type: 'text', text: JSON.stringify({ count: tasks.length, tasks }, null, 2) }],
        };
      }

      // --------------------------------------------------------
      case 'connect_toonflow': {
        const url = (args!.url || 'http://localhost:10588') as string;
        toonflowClient = new ToonflowClient({ baseUrl: url });
        const ok = await toonflowClient.healthCheck();

        // 同时初始化 RenderManager（如果 MCP 也已连接）
        if (mcpClient) {
          renderManager = new RenderManager({ mcpClient, toonflowClient });
        }

        return {
          content: [{ type: 'text', text: JSON.stringify({ connected: ok, url }, null, 2) }],
        };
      }

      // --------------------------------------------------------
      case 'connect_mcp': {
        const serverPath = args!.serverPath as string || '';
        const rendererUrl = (args!.rendererUrl || 'ws://localhost:9842') as string;
        mcpClient = new GsMcpClient(serverPath, rendererUrl);
        await mcpClient.connect();

        // 同时初始化 RenderManager
        if (toonflowClient) {
          renderManager = new RenderManager({ mcpClient, toonflowClient });
        } else {
          renderManager = new RenderManager({ mcpClient, toonflowClient: new ToonflowClient() });
        }

        return {
          content: [{ type: 'text', text: JSON.stringify({ connected: mcpClient.isConnected() }, null, 2) }],
        };
      }

      // --------------------------------------------------------
      case 'list_mcp_tools': {
        const client = getMcpClient();
        if (!client.isConnected()) await client.connect();
        const tools = await client.listTools();
        return {
          content: [{ type: 'text', text: JSON.stringify({ count: tools.length, tools: tools.map(t => ({ name: t.name, description: t.description })) }, null, 2) }],
        };
      }

      // --------------------------------------------------------
      case 'call_mcp_tool': {
        const client = getMcpClient();
        if (!client.isConnected()) await client.connect();
        const result = await client.callTool(args!.toolName as string, (args!.args || {}) as Record<string, unknown>);
        return {
          content: [{ type: 'text', text: typeof result === 'string' ? result : JSON.stringify(result, null, 2) }],
        };
      }

      // --------------------------------------------------------
      default:
        return { content: [{ type: 'text', text: `Unknown tool: ${name}` }], isError: true };
    }
  } catch (err: any) {
    return {
      content: [{ type: 'text', text: `Error: ${err.message}` }],
      isError: true,
    };
  }
});

// ============================================================
// 启动
// ============================================================

async function main() {
  const transport = new StdioServerTransport();
  await server.connect(transport);
  console.error('[toonflow-bridge] MCP Server started (stdio transport).');
}

main().catch((err) => {
  console.error('[toonflow-bridge] Fatal:', err);
  process.exit(1);
});
