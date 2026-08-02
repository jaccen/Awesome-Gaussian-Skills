/**
 * Renderer Bridge — WebSocket SERVER between MCP Server and Browser Renderer.
 *
 * Architecture:
 *   MCP Client (stdio) ←→ MCP Server ←[WebSocket]→ Browser Renderer (Three.js)
 *
 * The browser renderer opens renderer/index.html, which connects to this
 * WebSocket server as a client. The MCP server pushes render commands and
 * receives rendered frames/results back.
 *
 * If no browser is connected, the bridge operates in headless mode (stub responses).
 */

import { WebSocketServer, WebSocket } from 'ws';
import type { RendererMessage, RendererResponse } from './types.js';

const DEFAULT_PORT = 9842;

interface PendingRequest {
  resolve: (response: RendererResponse) => void;
  reject: (error: Error) => void;
  timeout: NodeJS.Timeout;
}

export class RendererBridge {
  private wss: WebSocketServer | null = null;
  private client: WebSocket | null = null;
  private port: number;
  private pendingRequests = new Map<number, PendingRequest>();
  private messageId = 0;

  constructor(port: number = DEFAULT_PORT) {
    this.port = port;
  }

  /**
   * Start the WebSocket server and wait for browser renderer to connect.
   * Returns true if the server starts (browser may connect later).
   */
  async connect(): Promise<boolean> {
    return new Promise((resolve) => {
      try {
        this.wss = new WebSocketServer({ port: this.port });

        this.wss.on('listening', () => {
          console.error(`[RendererBridge] WebSocket server listening on port ${this.port}`);
          console.error(`[RendererBridge] Open http://localhost:8080/renderer/index.html in a browser to connect.`);
          resolve(true);
        });

        this.wss.on('connection', (ws: WebSocket, req) => {
          console.error(`[RendererBridge] Browser renderer connected from ${req.socket.remoteAddress}`);
          this.client = ws;

          ws.on('message', (data: WebSocket.RawData) => {
            this.handleMessage(data.toString());
          });

          ws.on('close', () => {
            console.error('[RendererBridge] Browser renderer disconnected');
            this.client = null;
            this.rejectAllPending('Renderer disconnected');
          });

          ws.on('error', (err: Error) => {
            console.error(`[RendererBridge] Client error: ${err.message}`);
          });
        });

        this.wss.on('error', (err: Error) => {
          console.error(`[RendererBridge] Server error: ${err.message}`);
          if (err.message.includes('EADDRINUSE')) {
            console.error(`[RendererBridge] Port ${this.port} in use, trying ${this.port + 1}...`);
            this.port++;
            this.connect().then(resolve);
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

  isRendererConnected(): boolean {
    return this.client !== null && this.client.readyState === WebSocket.OPEN;
  }

  /**
   * Send a message to the browser renderer and wait for response.
   * If no renderer is connected, returns a headless stub response.
   */
  async send(message: RendererMessage): Promise<RendererResponse> {
    if (!this.isRendererConnected()) {
      return this.headlessResponse(message);
    }

    return new Promise((resolve, reject) => {
      const id = ++this.messageId;
      const payload = JSON.stringify({ id, ...message });

      const timeout = setTimeout(() => {
        this.pendingRequests.delete(id);
        reject(new Error(`Renderer request timeout after 10s for: ${message.type}`));
      }, 10000);

      this.pendingRequests.set(id, { resolve, reject, timeout });
      this.client!.send(payload);
    });
  }

  private handleMessage(raw: string): void {
    try {
      const msg = JSON.parse(raw) as { id: number } & RendererResponse;

      // Check for scene_loaded confirmation from browser (triggered by pushPointCloud)
      if (msg.type === 'scene_loaded' && this.sceneLoadedResolve) {
        console.error(`[RendererBridge] Received scene_loaded confirmation from browser`);
        this.sceneLoadedResolve();
        this.sceneLoadedResolve = null;
      }

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

  /**
   * Headless fallback: when no browser renderer is connected,
   * return stub responses so the MCP server remains functional.
   */
  private headlessResponse(message: RendererMessage): RendererResponse {
    switch (message.type) {
      case 'render':
        return {
          type: 'render_result',
          image: '',
          renderTimeMs: 0,
          width: message.width,
          height: message.height,
        };
      case 'query_scene':
        return {
          type: 'query_result',
          data: { headless: true, message: 'Renderer not connected. Scene state available via server-side query.' },
        };
      case 'load_scene':
        return {
          type: 'scene_loaded',
          sceneId: message.sceneId,
          gaussianCount: 0,
          bbox: { min: [0, 0, 0], max: [0, 0, 0] },
        };
      default:
        return { type: 'pong' };
    }
  }

  private sceneLoadedResolve: (() => void) | null = null;

  /**
    * Push parsed point cloud data directly to the browser renderer.
    * Sends position + color arrays as a single binary ArrayBuffer to avoid
    * having the browser re-download and re-parse the PLY file.
    *
    * Binary layout:
    *   [4 bytes: pointCount (uint32)]
    *   [4 bytes: float data length (uint32)]
    *   [pointCount * 6 * 4 bytes: interleaved x,y,z,r,g,b float32]
    *
    * Preceded by a JSON text message with type='load_point_cloud' containing
    * scene metadata (sceneId, pointCount, bbox center, bbox size).
    *
    * After sending, waits for the browser to confirm scene_loaded before returning.
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
      // Wait 3 seconds for potential late connection
      await new Promise(r => setTimeout(r, 3000));
      if (!this.isRendererConnected()) return;
    }

    const { sceneId, positions, colors, opacities, pointCount, bboxCenter, bboxSize } = params;

    // 1. Set up a promise that resolves when browser confirms scene_loaded
    const sceneLoadedPromise = new Promise<void>((resolve) => {
      this.sceneLoadedResolve = resolve;
    });
    const timeoutPromise = new Promise<void>((resolve) => {
      setTimeout(resolve, 15000); // 15s timeout
    });

    // 2. Send JSON metadata message
    const metaMsg = JSON.stringify({
      id: ++this.messageId,
      type: 'load_point_cloud',
      sceneId,
      pointCount,
      bboxCenter,
      bboxSize,
    });
    this.client!.send(metaMsg);

    // 3. Send binary data: interleaved [x,y,z,r,g,b,opacity] per point (7 floats)
    const stride = 7; // 3 pos + 3 color + 1 opacity
    const buffer = new ArrayBuffer(4 + 4 + pointCount * stride * 4);
    const view = new DataView(buffer);

    // Header: pointCount + data length
    view.setUint32(0, pointCount, true);
    view.setUint32(4, pointCount * stride * 4, true);

    // Interleave position + color + opacity
    let offset = 8;
    for (let i = 0; i < pointCount; i++) {
      view.setFloat32(offset, positions[i * 3 + 0], true);     offset += 4; // x
      view.setFloat32(offset, positions[i * 3 + 1], true);     offset += 4; // y
      view.setFloat32(offset, positions[i * 3 + 2], true);     offset += 4; // z
      view.setFloat32(offset, colors[i * 3 + 0], true);        offset += 4; // r
      view.setFloat32(offset, colors[i * 3 + 1], true);        offset += 4; // g
      view.setFloat32(offset, colors[i * 3 + 2], true);        offset += 4; // b
      view.setFloat32(offset, opacities[i], true);              offset += 4; // opacity
    }

    this.client!.send(buffer);
    console.error(`[RendererBridge] Pushed ${pointCount} points to renderer (${(buffer.byteLength / 1024 / 1024).toFixed(2)} MB)`);

    // 4. Wait for browser to confirm scene_loaded (or 15s timeout)
    const startTime = Date.now();
    await Promise.race([sceneLoadedPromise, timeoutPromise]);
    const elapsed = Date.now() - startTime;
    console.error(`[RendererBridge] Scene load confirmation received (or timed out) after ${elapsed}ms`);

    // 5. Extra safety delay to ensure Three.js has rendered at least one frame
    await new Promise(r => setTimeout(r, 500));
  }

  disconnect(): void {
    if (this.client) {
      this.client.close();
      this.client = null;
    }
    if (this.wss) {
      this.wss.close();
      this.wss = null;
    }
    this.rejectAllPending('Bridge disconnected');
  }
}
