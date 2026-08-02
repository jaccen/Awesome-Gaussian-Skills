#!/usr/bin/env node

/**
 * 3DGS MCP Renderer Server — Entry Point
 *
 * MCP server exposing 24 tools for Agent-controlled 3DGS rendering.
 * Uses stdio transport for communication with MCP clients (Claude, TeleClaw, etc.).
 *
 * Architecture:
 *   MCP Client (stdio) ←→ This Server ←→ Browser Renderer (WebSocket :9842)
 *
 * Usage:
 *   npx 3dgs-mcp-server                    # Start server
 *   RENDERER_PORT=9842 npx 3dgs-mcp-server # Custom renderer port
 *
 * Or in MCP client config (e.g., Claude Desktop):
 *   {
 *     "mcpServers": {
 *       "3dgs-renderer": {
 *         "command": "node",
 *         "args": ["path/to/mcp-server/dist/index.js"]
 *       }
 *     }
 *   }
 */

import { Server } from '@modelcontextprotocol/sdk/server/index.js';
import { StdioServerTransport } from '@modelcontextprotocol/sdk/server/stdio.js';
import {
  CallToolRequestSchema,
  ListToolsRequestSchema,
} from '@modelcontextprotocol/sdk/types.js';
import { SceneState } from './scene-state.js';
import { RendererBridge } from './renderer-bridge.js';
import { toolDefinitions, createToolHandlers, type ToolContext } from './tools.js';

// ---------------------------------------------------------------------------
// Configuration
// ---------------------------------------------------------------------------

const SERVER_NAME = '3dgs-mcp-renderer';
const SERVER_VERSION = '0.5.0';
const RENDERER_PORT = parseInt(process.env.RENDERER_PORT ?? '9842', 10);

// ---------------------------------------------------------------------------
// Create Server
// ---------------------------------------------------------------------------

const sceneState = new SceneState();
const rendererBridge = new RendererBridge(RENDERER_PORT);

const ctx: ToolContext = { state: sceneState, bridge: rendererBridge };
const toolHandlers = createToolHandlers(ctx);

const server = new Server(
  { name: SERVER_NAME, version: SERVER_VERSION },
  { capabilities: { tools: {} } },
);

// ---------------------------------------------------------------------------
// Tool Listing
// ---------------------------------------------------------------------------

server.setRequestHandler(ListToolsRequestSchema, async () => ({
  tools: toolDefinitions,
}));

// ---------------------------------------------------------------------------
// Tool Execution
// ---------------------------------------------------------------------------

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
  console.error(`[Config] Tools registered: ${toolDefinitions.length}`);

  // Attempt to connect to browser renderer (non-blocking — headless mode if unavailable)
  console.error('[Startup] Connecting to browser renderer...');
  const connected = await rendererBridge.connect();
  if (connected) {
    console.error('[Startup] Renderer connected — full rendering mode.');
  } else {
    console.error('[Startup] Renderer not available — running in headless mode.');
    console.error('[Startup] Open renderer/index.html in a browser to enable rendering.');
  }

  // Create a default synthetic scene so tools work immediately
  const { id, gaussianCount } = sceneState.generateSyntheticScene(10000);
  console.error(`[Startup] Default scene created: ${id} (${gaussianCount} Gaussians)`);

  // Start MCP server with stdio transport
  const transport = new StdioServerTransport();
  await server.connect(transport);
  console.error(`[${SERVER_NAME}] MCP server ready on stdio.`);
}

main().catch((err) => {
  console.error(`[Fatal] ${err.message}`);
  process.exit(1);
});

// Graceful shutdown
process.on('SIGINT', async () => {
  console.error('[Shutdown] SIGINT received, cleaning up...');
  rendererBridge.disconnect();
  await server.close();
  process.exit(0);
});

process.on('SIGTERM', async () => {
  console.error('[Shutdown] SIGTERM received, cleaning up...');
  rendererBridge.disconnect();
  await server.close();
  process.exit(0);
});
