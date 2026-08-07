#!/usr/bin/env node

/**
 * 3DGS MCP Renderer Server — Entry Point (v0.8)
 *
 * MCP server exposing 13 core tools (+13 experimental behind
 * INCLUDE_EXPERIMENTAL=1) for Agent-controlled 3DGS rendering.
 * Uses stdio transport for communication with MCP clients.
 *
 * Architecture:
 *   MCP Client (stdio) ←→ This Server ←→ Browser Renderer(s)
 *                              (WebSocket + HTTP :9842, real 3DGS via gsplat)
 *
 * Env:
 *   RENDERER_PORT          WebSocket/HTTP port (default 9842)
 *   RENDERER_ORIGINS       Comma-separated WS origin allowlist
 *                          (default: localhost origins only)
 *   SCENE_DIRS             Extra comma-separated scene directories
 *   INCLUDE_EXPERIMENTAL   "1" to list experimental stub tools
 *   AUTO_SYNTHETIC_SCENE   "1" to create a demo scene at startup
 *
 * MCP client config (e.g., Claude Desktop):
 *   {
 *     "mcpServers": {
 *       "3dgs-renderer": {
 *         "command": "node",
 *         "args": ["path/to/mcp-server/dist/index.js"]
 *       }
 *     }
 *   }
 */

import path from 'path';
import { Server } from '@modelcontextprotocol/sdk/server/index.js';
import { StdioServerTransport } from '@modelcontextprotocol/sdk/server/stdio.js';
import {
  CallToolRequestSchema,
  ListToolsRequestSchema,
} from '@modelcontextprotocol/sdk/types.js';
import { SceneState } from './scene-state.js';
import { RendererBridge } from './renderer-bridge.js';
import { getToolDefinitions, createToolHandlers, CORE_TOOL_COUNT, EXPERIMENTAL_TOOL_COUNT, type ToolContext } from './tools.js';

// ---------------------------------------------------------------------------
// Configuration
// ---------------------------------------------------------------------------

const SERVER_NAME = '3dgs-mcp-renderer';
const SERVER_VERSION = '0.8.0';
const RENDERER_PORT = parseInt(process.env.RENDERER_PORT ?? '9842', 10);
const SCENE_INDEX_PATH = path.resolve(process.cwd(), '.temp', 'scenes', 'index.json');

// Path whitelist for scene imports (anti path-traversal baseline)
const sceneRoots: string[] = [path.resolve(process.cwd(), 'scenes')];
if (process.env.SCENE_DIRS) {
  for (const d of process.env.SCENE_DIRS.split(',')) {
    if (d.trim()) sceneRoots.push(path.resolve(d.trim()));
  }
}
// Also allow the repo-level scenes/ dir when running from mcp-server/
const repoScenes = path.resolve(process.cwd(), '..', 'scenes');
if (!sceneRoots.includes(repoScenes)) sceneRoots.push(repoScenes);

// ---------------------------------------------------------------------------
// Create Server
// ---------------------------------------------------------------------------

const sceneState = new SceneState();
const rendererBridge = new RendererBridge(RENDERER_PORT);

const ctx: ToolContext = { state: sceneState, bridge: rendererBridge, sceneRoots };
const toolHandlers = createToolHandlers(ctx);
const toolDefinitions = getToolDefinitions();

const server = new Server(
  { name: SERVER_NAME, version: SERVER_VERSION },
  { capabilities: { tools: {} } },
);

// ---------------------------------------------------------------------------
// Tool Listing & Execution
// ---------------------------------------------------------------------------

server.setRequestHandler(ListToolsRequestSchema, async () => ({
  tools: toolDefinitions,
}));

server.setRequestHandler(CallToolRequestSchema, async (request) => {
  const { name, arguments: args } = request.params;

  const handler = toolHandlers.get(name);
  if (!handler) {
    return {
      content: [{ type: 'text', text: `Unknown tool: ${name}. Available: ${toolDefinitions.map((t) => t.name).join(', ')}` }],
      isError: true,
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } as any;
  }

  try {
    const result = await handler(args ?? {});
    // SDK v1.12+ changed the expected return type; cast to satisfy both old and new versions.
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    return result as any;
  } catch (err) {
    const message = err instanceof Error ? err.message : String(err);
    console.error(`[Tool:${name}] Error: ${message}`);
    return {
      content: [{ type: 'text', text: `Tool "${name}" failed: ${message}` }],
      isError: true,
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } as any;
  }
});

// ---------------------------------------------------------------------------
// Startup
// ---------------------------------------------------------------------------

async function main() {
  console.error(`[${SERVER_NAME} v${SERVER_VERSION}] Starting...`);
  console.error(`[Config] Renderer port: ${RENDERER_PORT}`);
  console.error(`[Config] Scene roots: ${sceneRoots.join(', ')}`);
  console.error(`[Config] Tools: ${CORE_TOOL_COUNT} core + ${EXPERIMENTAL_TOOL_COUNT} experimental (${process.env.INCLUDE_EXPERIMENTAL === '1' ? 'LISTED' : 'hidden; set INCLUDE_EXPERIMENTAL=1 to list'})`);

  // Restore persisted scenes (server-authoritative scene ids survive restarts)
  const { restored, skipped } = sceneState.loadIndex(SCENE_INDEX_PATH);
  if (restored > 0 || skipped > 0) {
    console.error(`[Startup] Scene index: ${restored} restored, ${skipped} skipped`);
  }

  // Attempt to start renderer bridge (non-blocking — headless mode if unavailable)
  console.error('[Startup] Starting renderer bridge (WS + HTTP)...');
  const connected = await rendererBridge.connect(sceneRoots);
  if (connected) {
    console.error('[Startup] Renderer bridge ready — open gsplat-renderer.html in a browser for true 3DGS rendering.');
  } else {
    console.error('[Startup] Renderer bridge unavailable — running in headless mode.');
  }

  // Optional demo scene (off by default — agents should import real scenes)
  if (process.env.AUTO_SYNTHETIC_SCENE === '1') {
    const { id, gaussianCount } = sceneState.generateSyntheticScene(10000);
    console.error(`[Startup] Synthetic demo scene created: ${id} (${gaussianCount} Gaussians)`);
  }

  // Start MCP server with stdio transport
  const transport = new StdioServerTransport();
  await server.connect(transport);
  console.error(`[${SERVER_NAME}] MCP server ready on stdio.`);
}

main().catch((err) => {
  console.error(`[Fatal] ${err.message}`);
  process.exit(1);
});

// Graceful shutdown: persist scene index before exit
async function shutdown(signal: string) {
  console.error(`[Shutdown] ${signal} received, persisting scene index...`);
  try {
    const n = sceneState.saveIndex(SCENE_INDEX_PATH);
    console.error(`[Shutdown] Saved ${n} persistable scene(s)`);
  } catch (err) {
    console.error(`[Shutdown] Index save failed: ${(err as Error).message}`);
  }
  rendererBridge.disconnect();
  await server.close();
  process.exit(0);
}

process.on('SIGINT', () => void shutdown('SIGINT'));
process.on('SIGTERM', () => void shutdown('SIGTERM'));
