/**
 * toonflow-bridge — Render Manager
 *
 * 管理从 Toonflow 分镜到 3DGS 渲染的完整生命周期：
 *   1. 分镜解析 → GsSceneRequest 构建
 *   2. MCP 场景构建（import_scene → set_camera）
 *   3. 帧渲染 / 动画渲染
 *   4. 结果回写 Toonflow
 *
 * 使用 EventEmitter 广播 SSE 事件给前端。
 */

import { v4 as uuid } from 'uuid';
import { EventEmitter } from 'events';
import type {
  ToonflowStoryboard,
  ToonflowAsset,
  GsSceneRequest,
  GsCameraSpec,
  GsAssetMapping,
  GsRenderConfig,
  RenderTask,
  RenderTaskStatus,
  RenderBatch,
  RenderEvent,
} from './types.js';
import { GsMcpClient } from './gs-mcp-client.js';
import { ToonflowClient } from './toonflow-client.js';

export interface RenderManagerOptions {
  mcpClient: GsMcpClient;
  toonflowClient: ToonflowClient;
}

export class RenderManager extends EventEmitter {
  private mcp: GsMcpClient;
  private toonflow: ToonflowClient;
  private tasks: Map<string, RenderTask> = new Map();
  private batches: Map<string, RenderBatch> = new Map();

  constructor(opts: RenderManagerOptions) {
    super();
    this.mcp = opts.mcpClient;
    this.toonflow = opts.toonflowClient;
  }

  // ============================================================
  // 批量渲染入口
  // ============================================================

  async renderStoryboardBatch(
    projectId: string,
    storyboards: ToonflowStoryboard[],
    assets: ToonflowAsset[],
    renderConfig?: Partial<GsRenderConfig>
  ): Promise<RenderBatch> {
    const batchId = uuid();
    const batch: RenderBatch = {
      id: batchId,
      projectId,
      scriptId: storyboards[0]?.scriptId || '',
      tasks: [],
      status: 'pending',
    };
    this.batches.set(batchId, batch);

    // 为每个分镜创建渲染任务
    const tasks: RenderTask[] = storyboards.map((sb) => ({
      id: uuid(),
      storyboardId: sb.id,
      projectId,
      status: 'queued',
      progress: 0,
      outputType: sb.shouldGenerateImage ? 'image' : 'video',
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    }));

    batch.tasks = tasks;
    for (const t of tasks) {
      this.tasks.set(t.id, t);
    }

    this._emitBatch(batchId, 'processing');

    // 顺序执行（MCP 是单连接顺序调用）
    for (const task of tasks) {
      const sb = storyboards.find(s => s.id === task.storyboardId);
      if (!sb) continue;

      try {
        await this._executeRenderTask(task, sb, assets, renderConfig);
      } catch (err: any) {
        task.status = 'failed';
        task.error = err.message;
        this._emitTask(task.id, task.status, task.progress);
      }
    }

    // 汇总 batch 状态
    const completedCount = batch.tasks.filter(t => t.status === 'completed').length;
    const failedCount = batch.tasks.filter(t => t.status === 'failed').length;

    if (completedCount === batch.tasks.length) {
      batch.status = 'completed';
    } else if (failedCount === batch.tasks.length) {
      batch.status = 'failed';
    } else {
      batch.status = 'partial';
    }

    this._emitBatch(batchId, batch.status);
    return batch;
  }

  // ============================================================
  // 单任务执行
  // ============================================================

  async renderSingleStoryboard(
    projectId: string,
    storyboard: ToonflowStoryboard,
    assets: ToonflowAsset[],
    renderConfig?: Partial<GsRenderConfig>
  ): Promise<RenderTask> {
    const task: RenderTask = {
      id: uuid(),
      storyboardId: storyboard.id,
      projectId,
      status: 'queued',
      progress: 0,
      outputType: storyboard.shouldGenerateImage ? 'image' : 'video',
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    };
    this.tasks.set(task.id, task);

    try {
      await this._executeRenderTask(task, storyboard, assets, renderConfig);
    } catch (err: any) {
      task.status = 'failed';
      task.error = err.message;
    }

    return task;
  }

  // ============================================================
  // 核心渲染流程
  // ============================================================

  private async _executeRenderTask(
    task: RenderTask,
    storyboard: ToonflowStoryboard,
    assets: ToonflowAsset[],
    renderConfig?: Partial<GsRenderConfig>
  ): Promise<void> {
    // Step 1: 构建场景请求
    this._updateTask(task, 'scene_building', 10);
    const sceneRequest = this._buildSceneRequest(storyboard, assets, renderConfig);

    // Step 2: 连接 MCP（如果未连接）
    if (!this.mcp.isConnected()) {
      this._updateTask(task, 'connecting', 20);
      try {
        await this.mcp.connect();
      } catch (err: any) {
        throw new Error(`MCP connection failed: ${err.message}`);
      }
    }

    // Step 3: 构建场景
    this._updateTask(task, 'scene_building', 30);
    const sceneResult = await this.mcp.buildScene(sceneRequest);

    // Step 4: 渲染
    if (task.outputType === 'image') {
      this._updateTask(task, 'rendering', 50);
      const imageUrl = await this.mcp.renderFrame(sceneResult.sceneId, {
        width: sceneRequest.renderConfig.width,
        height: sceneRequest.renderConfig.height,
        quality: sceneRequest.renderConfig.quality,
      });
      task.outputUrl = imageUrl || sceneResult.previewUrl;
      task.outputThumbnail = task.outputUrl;
      this._updateTask(task, 'compositing', 90);
    } else {
      this._updateTask(task, 'rendering', 40);
      const cameraSpec = sceneRequest.cameraSpec;
      const keyframes = cameraSpec.keyframes || [{
        time: 0,
        position: cameraSpec.position,
        target: cameraSpec.target,
      }];

      const animResult = await this.mcp.renderAnimation(
        sceneResult.sceneId,
        keyframes,
        sceneRequest.renderConfig.duration,
        sceneRequest.renderConfig.fps
      );
      task.outputUrl = animResult.videoPath;
      this._updateTask(task, 'compositing', 85);
    }

    // Step 5: 完成
    this._updateTask(task, 'completed', 100);
  }

  // ============================================================
  // 场景请求构建
  // ============================================================

  private _buildSceneRequest(
    storyboard: ToonflowStoryboard,
    assets: ToonflowAsset[],
    renderConfig?: Partial<GsRenderConfig>
  ): GsSceneRequest {
    // 从分镜描述推断相机
    const cameraSpec = this._inferCameraSpec(storyboard);

    // 映射资产
    const assetMappings: GsAssetMapping[] = assets
      .filter(a => storyboard.associateAssetsIds?.includes(a.id))
      .map(a => ({
        assetId: a.id,
        assetType: a.type === 'role' ? 'character' : a.type === 'scene' ? 'environment' : 'prop',
        gsModelPath: a.filePath,
      }));

    return {
      storyboardId: storyboard.id,
      projectId: storyboard.projectId,
      sceneDescription: storyboard.videoDesc || storyboard.prompt,
      cameraSpec,
      assets: assetMappings,
      renderConfig: {
        width: 1920,
        height: 1080,
        fps: 24,
        duration: storyboard.duration || 3,
        format: 'mp4',
        quality: 'preview',
        ...renderConfig,
      },
    };
  }

  private _inferCameraSpec(storyboard: ToonflowStoryboard): GsCameraSpec {
    // 从分镜描述中简单推断相机
    // 实际生产中可调用 LLM 或规则引擎进行更精确的解析
    const desc = (storyboard.videoDesc || storyboard.prompt || '').toLowerCase();

    let position = { x: 0, y: 1.5, z: 4 };
    let target = { x: 0, y: 0.8, z: 0 };
    let fov = 50;

    if (desc.includes('特写') || desc.includes('close-up')) {
      position = { x: 0, y: 1.2, z: 1.5 };
      fov = 35;
    } else if (desc.includes('全景') || desc.includes('wide') || desc.includes('全景')) {
      position = { x: 0, y: 2, z: 8 };
      fov = 60;
    } else if (desc.includes('俯视') || desc.includes('top-down') || desc.includes('鸟瞰')) {
      position = { x: 0, y: 10, z: 0.1 };
      target = { x: 0, y: 0, z: 0 };
      fov = 45;
    } else if (desc.includes('仰视') || desc.includes('low-angle')) {
      position = { x: 0, y: 0.3, z: 3 };
      target = { x: 0, y: 1.5, z: 0 };
      fov = 55;
    }

    return { position, target, fov };
  }

  // ============================================================
  // 任务状态管理
  // ============================================================

  private _updateTask(task: RenderTask, status: RenderTaskStatus, progress: number): void {
    task.status = status;
    task.progress = progress;
    task.updatedAt = new Date().toISOString();
    this._emitTask(task.id, status, progress);
  }

  private _emitTask(taskId: string, status: RenderTaskStatus, progress: number): void {
    const event: RenderEvent = {
      type: 'task_update',
      taskId,
      data: { status, progress },
      timestamp: new Date().toISOString(),
    };
    this.emit('event', event);
  }

  private _emitBatch(batchId: string, status: string): void {
    const event: RenderEvent = {
      type: 'batch_update',
      batchId,
      data: { status },
      timestamp: new Date().toISOString(),
    };
    this.emit('event', event);
  }

  // ============================================================
  // 查询方法
  // ============================================================

  getTask(taskId: string): RenderTask | undefined {
    return this.tasks.get(taskId);
  }

  getBatch(batchId: string): RenderBatch | undefined {
    return this.batches.get(batchId);
  }

  listTasks(projectId?: string): RenderTask[] {
    const all = Array.from(this.tasks.values());
    if (projectId) return all.filter(t => t.projectId === projectId);
    return all;
  }

  listBatches(projectId?: string): RenderBatch[] {
    const all = Array.from(this.batches.values());
    if (projectId) return all.filter(b => b.projectId === projectId);
    return all;
  }
}
