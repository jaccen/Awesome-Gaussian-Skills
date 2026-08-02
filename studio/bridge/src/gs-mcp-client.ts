/**
 * toonflow-bridge — 3DGS MCP Client (Real Implementation)
 *
 * 通过 MCP SDK StdioClientTransport 连接 Awesome-Gaussian-Skills MCP Server，
 * 调用其 24 个工具（11 完全实现 + 13 骨架）进行场景渲染。
 *
 * 架构：
 *   Bridge → StdioClientTransport → MCP Server (mcp-server/) → WebSocket :9842 → Browser Renderer
 */

import { Client } from '@modelcontextprotocol/sdk/client/index.js';
import { StdioClientTransport } from '@modelcontextprotocol/sdk/client/stdio.js';
import path from 'path';
import type { GsSceneRequest, GsAssetMapping } from './types.js';
import { EventEmitter } from 'events';

export interface GsMcpClientEvents {
  connected: () => void;
  disconnected: () => void;
  error: (err: Error) => void;
  toolCall: (toolName: string, args: Record<string, unknown>) => void;
  toolResult: (toolName: string, result: any) => void;
}

export class GsMcpClient extends EventEmitter {
  private client: Client | null = null;
  private transport: StdioClientTransport | null = null;
  private connected: boolean = false;
  private connecting: boolean = false;

  private mcpServerCommand: string;
  private mcpServerArgs: string[];
  private mcpServerEnv: Record<string, string>;

  constructor(mcpServerPath: string, rendererUrl: string = 'ws://localhost:9842') {
    super();

    // MCP Server 路径解析：支持指向 dist/index.js 或目录
    // 重要：StdioClientTransport 需要相对于 cwd 的路径或绝对路径
    if (mcpServerPath.endsWith('.js') || mcpServerPath.endsWith('.ts')) {
      this.mcpServerCommand = 'node';
      this.mcpServerArgs = [mcpServerPath];
    } else if (mcpServerPath) {
      this.mcpServerCommand = 'node';
      this.mcpServerArgs = [path.resolve(process.cwd(), mcpServerPath, 'dist/index.js')];
    } else {
      // 默认：相对于 cwd 的 mcp-server/dist/index.js
      this.mcpServerCommand = 'node';
      this.mcpServerArgs = ['mcp-server/dist/index.js'];
    }

    this.mcpServerEnv = {
      ...process.env as Record<string, string>,
      RENDERER_PORT: rendererUrl.split(':').pop() || '9842',
    };
  }

  // ============================================================
  // 连接管理
  // ============================================================

  async connect(): Promise<void> {
    if (this.connected || this.connecting) return;
    this.connecting = true;

    try {
      this.transport = new StdioClientTransport({
        command: this.mcpServerCommand,
        args: this.mcpServerArgs,
        env: this.mcpServerEnv,
        stderr: 'pipe',
      });

      this.client = new Client({
        name: 'toonflow-bridge',
        version: '0.2.0',
      });

      await this.client.connect(this.transport);
      this.connected = true;
      this.connecting = false;
      this.emit('connected');

      console.error('[gs-mcp-client] Connected to MCP Server:', this.mcpServerArgs.join(' '));
    } catch (err: any) {
      this.connecting = false;
      this.connected = false;
      this.emit('error', err);
      console.error('[gs-mcp-client] Connection failed:', err.message);
      throw err;
    }
  }

  async disconnect(): Promise<void> {
    if (this.transport) {
      try {
        await this.transport.close();
      } catch { /* ignore */ }
    }
    this.client = null;
    this.transport = null;
    this.connected = false;
    this.emit('disconnected');
  }

  async reconnect(): Promise<void> {
    await this.disconnect();
    await this.connect();
  }

  isConnected(): boolean {
    return this.connected;
  }

  // ============================================================
  // 核心：调用 MCP 工具
  // ============================================================

  async callTool(toolName: string, args: Record<string, unknown>): Promise<any> {
    if (!this.connected || !this.client) {
      throw new Error(`MCP Client not connected. Cannot call tool: ${toolName}`);
    }

    this.emit('toolCall', toolName, args);

    try {
      const result = await this.client.callTool({
        name: toolName,
        arguments: args,
      });

      const parsed = this._parseResult(result);
      this.emit('toolResult', toolName, parsed);
      return parsed;
    } catch (err: any) {
      console.error(`[gs-mcp-client] Tool call failed: ${toolName}`, err.message);
      throw err;
    }
  }

  // ============================================================
  // 场景构建
  // ============================================================

  async buildScene(request: GsSceneRequest & { sceneFile?: string }): Promise<{ sceneId: string; previewUrl: string; usedCameraSpec?: GsSceneRequest['cameraSpec'] }> {
    let usedCameraSpec: GsSceneRequest['cameraSpec'] | undefined;

    // Step 1: Import scene — if sceneFile is provided, load it directly
    let importResult: any = null;
    if (request.sceneFile) {
      const ext = request.sceneFile.split('.').pop() || 'ply';
      // Resolve to absolute path so MCP Server subprocess can find it regardless of cwd
      let resolvedPath = request.sceneFile;
      if (!path.isAbsolute(resolvedPath)) {
        resolvedPath = path.resolve(process.cwd(), resolvedPath);
      }
      importResult = await this.callTool('import_scene', {
        source: resolvedPath,
        format: ext,
      });

      // Auto-adjust camera for real PLY scenes: compute camera from bbox
      const bbox = importResult?.bbox;
      const camPos = request.cameraSpec.position;
      const camTgt = request.cameraSpec.target;
      const isDefaultCamera = (
        camPos.x === 0 && camPos.y === 1.5 && camPos.z === 4 &&
        camTgt.x === 0 && camTgt.y === 0.8 && camTgt.z === 0
      );
      if (bbox && isDefaultCamera) {
        // Default camera — replace with bbox-derived camera
        const cx = (bbox.min[0] + bbox.max[0]) / 2;
        const cy = (bbox.min[1] + bbox.max[1]) / 2;
        const cz = (bbox.min[2] + bbox.max[2]) / 2;
        const dx = bbox.max[0] - bbox.min[0];
        const dy = bbox.max[1] - bbox.min[1];
        const dz = bbox.max[2] - bbox.min[2];
        const maxDim = Math.max(dx, dy, dz);
        // Place camera at diagonal offset from scene center
        const cameraDist = maxDim * 1.2;
        request.cameraSpec = {
          position: { x: cx + cameraDist * 0.7, y: cy + maxDim * 0.3, z: cz + cameraDist * 0.5 },
          target: { x: cx, y: cy, z: cz },
          fov: 50,
        };
        usedCameraSpec = request.cameraSpec;
        console.error(`[gs-mcp-client] Auto-adjusted camera for PLY scene: center=(${cx.toFixed(1)},${cy.toFixed(1)},${cz.toFixed(1)}) dist=${cameraDist.toFixed(1)}`);
      }
    } else {
      // Original logic: synthetic scene or file assets
      const sceneId = `scene-${Date.now()}`;
      const syntheticAssets = request.assets.filter(a => !a.gsModelPath);
      const fileAssets = request.assets.filter(a => a.gsModelPath);

      if (syntheticAssets.length > 0 || fileAssets.length === 0) {
        await this.callTool('import_scene', {
          source: `synthetic:scene_${sceneId}`,
          format: 'synthetic',
        });
      }

      // Import .ply/.splat file assets
      for (const asset of fileAssets) {
        const format = asset.gsModelPath!.endsWith('.ply') ? 'ply' : 'splat';
        await this.callTool('import_scene', {
          source: asset.gsModelPath,
          format,
        });
      }
    }

    // Step 3: 设置相机
    // Convert camera spec to array format (MCP set_camera expects [x,y,z])
    const camPos = request.cameraSpec.position;
    const camTgt = request.cameraSpec.target;
    await this.callTool('set_camera', {
      position: [camPos.x, camPos.y, camPos.z],
      target: [camTgt.x, camTgt.y, camTgt.z],
      fov: request.cameraSpec.fov,
    });

    // Step 4: 渲染预览帧
    // (No delay needed — pushPointCloud waits for browser scene_loaded confirmation)
    const preview = await this.callTool('render_frame', {
      width: 640,
      height: 360,
      format: 'png',
    });

    let previewUrl = '';
    if (typeof preview === 'string' && preview.startsWith('data:')) {
      previewUrl = preview;
    } else if (preview?.image) {
      previewUrl = preview.image;
    } else if (preview?.data) {
      previewUrl = preview.data;
    }

    const sceneId = `scene-${Date.now()}`;
    return { sceneId, previewUrl, usedCameraSpec };
  }

  // ============================================================
  // 渲染方法
  // ============================================================

  async renderFrame(sceneId: string, config: { width: number; height: number; quality: string }): Promise<string> {
    const result = await this.callTool('render_frame', {
      width: config.width,
      height: config.height,
      format: 'png',
    });

    // New format: render_frame returns { image_url, has_image, render_time_ms, ... }
    if (result?.image_url) {
      return result.image_url;
    }
    // Legacy: base64 data URL
    if (typeof result === 'string' && result.startsWith('data:')) {
      return result;
    }
    // Fallback: try extracting from various result shapes
    return result?.image || result?.data || result?.content?.[0]?.data || '';
  }

  async renderAnimation(
    sceneId: string,
    keyframes: { time: number; position: { x: number; y: number; z: number }; target: { x: number; y: number; z: number } }[],
    duration: number,
    fps: number = 24
  ): Promise<{ framePaths: string[]; videoPath: string }> {
    const totalFrames = Math.ceil(duration * fps);
    const framePaths: string[] = [];

    for (let i = 0; i < totalFrames; i++) {
      const t = i / totalFrames;
      const camera = this._interpolateCamera(keyframes, t, duration);

      await this.callTool('set_camera', {
        position: camera.position,
        target: camera.target,
        fov: camera.fov,
      });

      const result = await this.callTool('render_frame', {
        width: 1920,
        height: 1080,
        format: 'png',
      });

      const framePath = `.temp/frames/scene_${sceneId}/frame_${String(i).padStart(5, '0')}.png`;
      framePaths.push(framePath);

      // 如果有 base64 图片数据，保存到文件
      const imageData = result?.image || result?.data || (typeof result === 'string' ? result : '');
      if (imageData) {
        await this._saveFrame(imageData, framePath);
      }
    }

    // ffmpeg 合成
    const videoPath = `.temp/renders/${sceneId}/animation.mp4`;
    if (framePaths.length > 0) {
      await this._ffmpegCompose(framePaths, videoPath, fps);
    }

    return { framePaths, videoPath };
  }

  // ============================================================
  // 查询 & 编辑
  // ============================================================

  async queryScene(sceneId: string) {
    return this.callTool('query_scene', { query_type: 'stats' });
  }

  async setPbrMaterial(gaussianIds: string[], material: { metallic?: number; roughness?: number; color?: string }) {
    return this.callTool('set_pbr_material', {
      scene_id: this.sceneId,
      select: { ids: gaussianIds },
      metallic: material.metallic,
      roughness: material.roughness,
    });
  }

  async simulatePhysics(params: { duration: number; gravity?: number }) {
    return this.callTool('simulate_physics', {
      object_ids: [],
      solver_type: 'rigid',
      duration: params.duration,
    });
  }

  async setArticulation(gaussianId: string, jointName: string, angle: number) {
    return this.callTool('set_rotation', {
      part: jointName,
      angle,
      axis: [0, 1, 0],
    });
  }

  async compressScene(sceneId: string, targetSize: string = 'web') {
    return this.callTool('prune_by_importance', {
      strategy: targetSize === 'web' ? 'gradient' : 'coreset',
      target_ratio: targetSize === 'web' ? 0.3 : targetSize === 'mobile' ? 0.2 : 0.5,
    });
  }

  async exportScene(sceneId: string, format: string = 'splat') {
    return this.callTool('export_result', { format });
  }

  // ============================================================
  // MCP Server 工具列表
  // ============================================================

  async listTools(): Promise<any[]> {
    if (!this.connected || !this.client) return [];
    try {
      const result = await this.client.listTools();
      return result.tools || [];
    } catch {
      return [];
    }
  }

  // ============================================================
  // 内部方法
  // ============================================================

  private _parseResult(result: any): any {
    if (!result) return null;

    // MCP 返回格式: { content: [{ type: 'text', text: '...' }, { type: 'image', data: '...' }] }
    if (result.content && Array.isArray(result.content)) {
      for (const item of result.content) {
        if (item.type === 'text') {
          try {
            return JSON.parse(item.text);
          } catch {
            return item.text;
          }
        }
        if (item.type === 'image') {
          return { image: item.data, mimeType: item.mimeType };
        }
      }
    }

    // 兼容旧格式
    return result;
  }

  private _interpolateCamera(
    keyframes: { time: number; position: { x: number; y: number; z: number }; target: { x: number; y: number; z: number } }[],
    t: number,
    duration: number
  ): { position: { x: number; y: number; z: number }; target: { x: number; y: number; z: number }; fov: number } {
    if (keyframes.length === 0) {
      return { position: { x: 0, y: 1, z: 3 }, target: { x: 0, y: 0, z: 0 }, fov: 60 };
    }
    if (keyframes.length === 1) {
      return { ...keyframes[0], fov: 60 };
    }

    const currentT = t * duration;
    let prev = keyframes[0];
    let next = keyframes[keyframes.length - 1];

    for (let i = 0; i < keyframes.length - 1; i++) {
      if (currentT >= keyframes[i].time && currentT <= keyframes[i + 1].time) {
        prev = keyframes[i];
        next = keyframes[i + 1];
        break;
      }
    }

    const segDuration = next.time - prev.time;
    const segT = segDuration > 0 ? (currentT - prev.time) / segDuration : 0;

    return {
      position: {
        x: prev.position.x + (next.position.x - prev.position.x) * segT,
        y: prev.position.y + (next.position.y - prev.position.y) * segT,
        z: prev.position.z + (next.position.z - prev.position.z) * segT,
      },
      target: {
        x: prev.target.x + (next.target.x - prev.target.x) * segT,
        y: prev.target.y + (next.target.y - prev.target.y) * segT,
        z: prev.target.z + (next.target.z - prev.target.z) * segT,
      },
      fov: 60,
    };
  }

  private async _saveFrame(imageData: string, framePath: string): Promise<void> {
    const fs = await import('fs');
    const path = await import('path');
    const dir = path.dirname(framePath);
    await fs.promises.mkdir(dir, { recursive: true });

    if (imageData.startsWith('data:')) {
      const base64 = imageData.split(',')[1];
      await fs.promises.writeFile(framePath, Buffer.from(base64, 'base64'));
    } else {
      await fs.promises.writeFile(framePath, Buffer.from(imageData, 'base64'));
    }
  }

  private async _ffmpegCompose(framePaths: string[], outputPath: string, fps: number): Promise<void> {
    const fs = await import('fs');
    const path = await import('path');
    const { exec } = await import('child_process');

    const dir = path.dirname(framePaths[0] || outputPath);
    await fs.promises.mkdir(path.dirname(outputPath), { recursive: true });

    return new Promise((resolve, reject) => {
      const cmd = `ffmpeg -y -framerate ${fps} -i "${dir}/frame_%05d.png" -c:v libx264 -pix_fmt yuv420p "${outputPath}"`;
      exec(cmd, (error) => {
        if (error) reject(error);
        else resolve();
      });
    });
  }

  // 场景 ID 占位（MCP Server 内部维护状态，此处仅做引用）
  private sceneId: string = '';
}
