/**
 * Pipeline 编排器 — 文稿→视频 端到端生产管线
 *
 * 流程：
 *   1. 剧本改编（LLM）          — 原始文稿→结构化剧本
 *   2. 智能分镜（LLM）          — 剧本→分镜列表（含图片/视频提示词）
 *   3. Toonflow集成             — 创建项目+脚本+批量分镜
 *   4. 图片生成                  — 每个分镜的画面图（通过Toonflow或本地）
 *   5. TTS配音                   — 每个分镜的对白/旁白→音频
 *   6. 视频驱动                  — 图片→视频片段（Seedance API / Ken Burns）
 *   7. FFmpeg合成                — 视频片段+音频+字幕+BGM→成片
 *
 * 设计原则：
 *   - 每步可降级（Primary→Fallback→Skip）
 *   - 通过 EventEmitter 推送进度到 SSE
 *   - 任务状态可查询，支持断点续做
 */

import { EventEmitter } from 'events';
import { v4 as uuid } from 'uuid';
import path from 'path';
import fs from 'fs';
import type {
  PipelineTask,
  PipelineInput,
  PipelineOutput,
  PipelineEvent,
  SceneData,
  StylePreset,
} from './types.js';
import { STYLE_PRESETS } from './types.js';
import { LlmClient } from '../llm-client.js';
import { TtsClient } from '../tts-client.js';
import { VideoGenClient } from '../video-gen-client.js';
import { FFmpegCompositor } from '../ffmpeg-compositor.js';
import { AsrClient } from '../asr-client.js';
import { ToonflowClient } from '../toonflow-client.js';
import { MptClient } from '../mpt-client.js';

// Path C: 借鉴 DSH 架构模式引入的三个模块
import { PipelineEventLog } from './event-log.js';
import type { LogEntry } from './event-log.js';
import { FallbackChain } from './strategies.js';
import type { TtsStrategyInput, TtsStrategyOutput } from './strategies.js';
import {
  loadPipelineConfig,
  shouldRunStep,
  isProviderAvailable,
  reloadPipelineConfig,
} from './pipeline-config.js';
import type { PipelineConfig, StepConfig, StrategyProviderConfig } from './pipeline-config.js';

export interface PipelineManagerOptions {
  llm?: LlmClient;
  tts?: TtsClient;
  videoGen?: VideoGenClient;
  compositor?: FFmpegCompositor;
  asr?: AsrClient;
  toonflow?: ToonflowClient;
  mpt?: MptClient;
  outputDir?: string;
}

export class PipelineManager extends EventEmitter {
  private llm: LlmClient;
  private tts: TtsClient;
  private videoGen: VideoGenClient;
  private compositor: FFmpegCompositor;
  private asr: AsrClient;
  private toonflow: ToonflowClient;
  private mpt: MptClient;
  private outputDir: string;

  // Path C: 事件日志（持久化）+ 管线配置（外部化）
  private eventLog: PipelineEventLog;
  private config: PipelineConfig;

  // 内存 Map 保留为快速缓存（运行中的任务）
  private tasks: Map<string, PipelineTask> = new Map();

  constructor(opts: PipelineManagerOptions = {}) {
    super();
    this.llm = opts.llm || new LlmClient();
    this.tts = opts.tts || new TtsClient();
    this.videoGen = opts.videoGen || new VideoGenClient();
    this.compositor = opts.compositor || new FFmpegCompositor();
    this.asr = opts.asr || new AsrClient();
    this.toonflow = opts.toonflow || new ToonflowClient();
    this.mpt = opts.mpt || new MptClient();
    this.outputDir = opts.outputDir || process.env.PIPELINE_OUTPUT_DIR || '.temp/pipeline';

    // Path C: 初始化事件日志和管线配置
    this.eventLog = new PipelineEventLog(this.outputDir);
    this.config = loadPipelineConfig();

    // 确保输出目录
    const absDir = path.resolve(process.cwd(), this.outputDir);
    if (!fs.existsSync(absDir)) fs.mkdirSync(absDir, { recursive: true });
  }

  // ============================================================
  // 创建任务
  // ============================================================

  createTask(input: PipelineInput): PipelineTask {
    // Path C: 从配置文件读取步骤定义（而非硬编码）
    const steps = this.config.steps
      .filter((s) => s.enabled)
      .map((s) => ({
        name: s.name,
        label: s.label,
        status: 'pending' as const,
        progress: 0,
      }));

    const task: PipelineTask = {
      id: uuid(),
      input,
      status: 'pending',
      progress: 0,
      currentStep: '',
      steps,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    };

    this.tasks.set(task.id, task);
    // P1修复：超过 100 个任务时清理最旧的已完成/失败任务，防 OOM
    if (this.tasks.size > 100) {
      this._evictOldTasks();
    }

    // Path C: _emit 统一负责 SSE 推送 + JSONL 持久化（含 input/steps 供 replay 恢复）
    this._emit({
      type: 'task_created',
      taskId: task.id,
      message: `Pipeline task created: ${input.title || 'untitled'}`,
      data: { input, steps: task.steps },
    });

    // 异步执行
    this._execute(task.id).catch((err) => {
      console.error(`[pipeline] Task ${task.id} fatal error:`, err);
      const t = this.tasks.get(task.id);
      if (t) {
        t.status = 'failed';
        t.error = err.message;
        t.updatedAt = new Date().toISOString();
        this._emit({ type: 'task_failed', taskId: task.id, message: err.message });
      }
    });

    return task;
  }

  // ============================================================
  // 执行管线
  // ============================================================

  private async _execute(taskId: string): Promise<void> {
    const task = this.tasks.get(taskId);
    if (!task) return;

    task.status = 'running';
    task.updatedAt = new Date().toISOString();

    const preset = this._getPreset(task.input.style);
    const output: PipelineOutput = {
      script: '',
      characters: [],
      scenes: [],
    };

    try {
      // Path C: 从配置读取步骤条件，而非硬编码 if/else
      const ctx = this._buildContext(task);

      // Step 1: 剧本改编
      if (shouldRunStep(this._getStepConfig('script_adaptation'), ctx)) {
        await this._runStep(task, 'script_adaptation', async (step) => {
          this._updateStepProgress(task, step, 30, 'LLM正在改编剧本...');
          const adapted = await this.llm.adaptScript(task.input.text, task.input.style);
          output.script = adapted.synopsis;
          output.characters = adapted.characters;
          const allScenes = adapted.acts.flatMap(act => act.scenes);
          (task as any)._adaptedScript = adapted;
          (task as any)._allScenes = allScenes;
          this._updateStepProgress(task, step, 100,
            `剧本改编完成：${adapted.acts.length}幕，${allScenes.length}个场景`);
          // Path C: 记录中间结果到事件日志（供断点续做）
          this.eventLog.append({
            timestamp: new Date().toISOString(),
            type: 'step_output',
            taskId: task.id,
            stepName: 'script_adaptation',
            data: { script: output.script, characters: output.characters, sceneCount: allScenes.length },
          });
        });
      } else {
        this._skipStep(task, 'script_adaptation', 'Condition not met');
      }

      // Step 2: 智能分镜
      if (shouldRunStep(this._getStepConfig('storyboard'), ctx)) {
        await this._runStep(task, 'storyboard', async (step) => {
          this._updateStepProgress(task, step, 20, 'LLM正在生成分镜...');
          const adapted = (task as any)._adaptedScript;
          const scenes = await this.llm.generateStoryboard(adapted, preset);
          output.scenes = scenes;
          this._updateStepProgress(task, step, 100, `分镜生成完成：${scenes.length}个分镜`);
          this.eventLog.append({
            timestamp: new Date().toISOString(),
            type: 'step_output',
            taskId: task.id,
            stepName: 'storyboard',
            data: { sceneCount: scenes.length },
          });
        });
      } else {
        this._skipStep(task, 'storyboard', 'Condition not met');
      }

      // Step 3: Toonflow集成（可选）
      if (shouldRunStep(this._getStepConfig('toonflow_sync'), ctx)) {
        await this._runStep(task, 'toonflow_sync', async (step) => {
          this._updateStepProgress(task, step, 30, '正在同步到Toonflow...');
          try {
            const toonflowResult = await this._syncToonflow(task, output.scenes, preset);
            output.toonflowProjectId = toonflowResult.projectId;
            output.toonflowScriptId = toonflowResult.scriptId;
            output.toonflowStoryboardIds = toonflowResult.storyboardIds;

            if (toonflowResult.storyboardIds && toonflowResult.storyboardIds.length > 0) {
              for (let i = 0; i < output.scenes.length; i++) {
                const sb = toonflowResult.storyboards?.[i];
                if (sb?.filePath) {
                  output.scenes[i].imagePath = sb.filePath;
                }
              }
            }
            this._updateStepProgress(task, step, 100, `Toonflow同步完成`);
          } catch (err: any) {
            this._updateStepProgress(task, step, 100, `Toonflow同步跳过: ${err.message}`, true);
          }
        });
      } else {
        this._skipStep(task, 'toonflow_sync', 'Toonflow not configured');
      }

      // Step 4: TTS配音
      if (shouldRunStep(this._getStepConfig('tts'), ctx)) {
        await this._runStep(task, 'tts', async (step) => {
          // Path C: 使用 FallbackChain 替代硬编码降级
          const ttsChain = new FallbackChain<TtsStrategyInput, TtsStrategyOutput>()
            .setLogger((msg) => console.log(`[pipeline:tts] ${msg}`))
            .add({
              name: 'studio-native',
              available: () => isProviderAvailable(this._getStrategyProvider('tts', 'studio-native'), ctx),
              execute: async (input) => {
                const result = await this.tts.synthesize(input.text, { voice: input.voice });
                return {
                  audioPath: result.audioPath,
                  duration: (result as any).duration || 0,
                  provider: 'studio-native',
                };
              },
            })
            .add({
              name: 'mpt',
              available: () =>
                isProviderAvailable(this._getStrategyProvider('tts', 'mpt'), ctx) &&
                this.mpt.isAvailable(),
              execute: async (input) => {
                const result = await this.mpt.synthesizeTTS(input.text, {
                  voiceName: task.input.mptVoiceName,
                });
                return {
                  audioPath: result.audioPath,
                  duration: (result as any).duration || 0,
                  provider: 'mpt',
                };
              },
            });

          for (let i = 0; i < output.scenes.length; i++) {
            const scene = output.scenes[i];
            this._updateStepProgress(task, step,
              Math.round((i / output.scenes.length) * 100),
              `TTS: 分镜${i + 1}/${output.scenes.length}`);

            const dialogueText = scene.dialogue || scene.narration || '';
            if (dialogueText.trim()) {
              const voice = scene.characters[0]?.name === '旁白' ? 'narrator' : 'default';
              const ttsResult = await ttsChain.execute({ text: dialogueText, voice });
              scene.audioPath = ttsResult.result.audioPath;
            }
          }
          this._updateStepProgress(task, step, 100, `TTS配音完成`);
        });
      } else {
        this._skipStep(task, 'tts', 'TTS disabled by user');
      }

      // Step 5: 视频驱动
      if (shouldRunStep(this._getStepConfig('video_gen'), ctx)) {
        if (task.input.enableVideoGen) {
          // AI 视频生成模式
          await this._runStep(task, 'video_gen', async (step) => {
            for (let i = 0; i < output.scenes.length; i++) {
              const scene = output.scenes[i];
              this._updateStepProgress(task, step,
                Math.round((i / output.scenes.length) * 100),
                `视频生成: 分镜${i + 1}/${output.scenes.length}`);
              const result = await this.videoGen.generate({
                imagePath: scene.imagePath,
                prompt: scene.videoPrompt,
                duration: scene.duration,
                videoRatio: task.input.videoRatio,
              } as any);
              scene.videoPath = result.videoPath;
            }
            this._updateStepProgress(task, step, 100, `视频驱动完成`);
          });
        } else {
          // Ken Burns 降级模式
          await this._runStep(task, 'video_gen', async (step) => {
            for (let i = 0; i < output.scenes.length; i++) {
              const scene = output.scenes[i];
              this._updateStepProgress(task, step,
                Math.round((i / output.scenes.length) * 100),
                `Ken Burns: 分镜${i + 1}/${output.scenes.length}`);
              const result = await this.videoGen.generate({
                imagePath: scene.imagePath,
                prompt: scene.videoPrompt || scene.imagePrompt,
                duration: scene.duration,
              });
              scene.videoPath = result.videoPath;
            }
            this._updateStepProgress(task, step, 100, `视频片段生成完成`);
          });
        }
      } else {
        this._skipStep(task, 'video_gen', 'Condition not met');
      }

      // --- 合成阶段（含 MPT 全面降级）---
      const allVideosMissing = output.scenes.length > 0 &&
        output.scenes.every(s => !s.videoPath);

      if (allVideosMissing && task.input.enableMptFallback && this.mpt.isAvailable()) {
        // MPT 全量降级
        await this._runStep(task, 'compose', async (step) => {
          this._updateStepProgress(task, step, 10, 'MPT 降级：在线素材生成完整视频...');
          const fullScript = output.scenes.map(s =>
            [s.narration, s.dialogue].filter(Boolean).join('\n')
          ).join('\n\n');
          const terms = output.scenes.map(s => s.sceneDesc).join(' ');
          const mptResult = await this.mpt.generateFullVideo(
            {
              script: fullScript || task.input.text,
              terms,
              aspectRatio: task.input.videoRatio as '16:9' | '9:16' | '1:1',
              voiceName: task.input.mptVoiceName,
              materialSource: undefined,
            },
            (progress, message) => {
              this._updateStepProgress(task, step, 10 + Math.round(progress * 0.85), message);
            },
          );
          if (mptResult.videoUrl || mptResult.videoPath) {
            const mptSource = mptResult.videoUrl || mptResult.videoPath!;
            const localPath = await this.mpt.downloadFile(mptSource);
            output.finalVideoPath = localPath;
            output.finalVideoUrl = mptResult.videoUrl || `/api/pipeline/files/${path.basename(localPath)}`;
            output.durationSec = output.scenes.reduce((sum, s) => sum + s.duration, 0);
            output.mptTaskId = mptResult.taskId;
            output.mptFallbackUsed = true;
            output.subtitlePath = mptResult.subtitleUrl;
          }
          this._updateStepProgress(task, step, 100,
            `MPT 降级完成${output.finalVideoPath ? '' : '（无视频产出）'}`);
        });
      } else if (allVideosMissing) {
        this._skipStep(task, 'compose',
          '无视频素材可用（3DGS/Toonflow/视频驱动/MPT 均未产出）');
      } else if (shouldRunStep(this._getStepConfig('compose'), ctx)) {
        // Step 6: FFmpeg合成
        await this._runStep(task, 'compose', async (step) => {
          this._updateStepProgress(task, step, 30, '正在合成最终视频...');
          const videoClips: string[] = [];
          const audioFiles: string[] = [];
          for (const scene of output.scenes) {
            videoClips.push(scene.videoPath || '');
            audioFiles.push(scene.audioPath || '');
          }
          const result = await this.compositor.compose({
            videoClips,
            audioFiles,
            scenes: output.scenes,
            outputDir: this.outputDir,
            videoRatio: task.input.videoRatio,
            enableSubtitles: true,
          });
          output.finalVideoPath = result.videoPath;
          output.finalVideoUrl = result.videoUrl;
          output.subtitlePath = result.subtitlePath;
          output.durationSec = result.durationSec;
          this._updateStepProgress(task, step, 100, `成片完成：${result.durationSec}秒`);
        });
      } else {
        this._skipStep(task, 'compose', 'Condition not met');
      }

      // Step 7: 跨平台发布（可选）
      if (shouldRunStep(this._getStepConfig('publish'), ctx)) {
        await this._runStep(task, 'publish', async (step) => {
          if (!output.mptTaskId) {
            this._updateStepProgress(task, step, 100,
              '跨平台发布需要 MPT 降级模式（MPT 生成的视频可直接发布）', true);
            return;
          }
          if (!this.mpt.isAvailable()) {
            this._updateStepProgress(task, step, 100, 'MPT 不可用，跳过发布', true);
            return;
          }
          this._updateStepProgress(task, step, 20,
            `正在发布到 ${task.input.publishPlatforms!.length} 个平台...`);
          const results = await this.mpt.publishVideo(
            output.mptTaskId,
            task.input.publishPlatforms!,
          );
          output.publishResults = results;
          const succeeded = results.filter(r => r.success).length;
          this._updateStepProgress(task, step, 100,
            `发布完成：${succeeded}/${results.length} 个平台成功`);
        });
      } else {
        this._skipStep(task, 'publish', '未配置发布平台');
      }

      // 完成
      task.status = 'completed';
      task.progress = 100;
      task.output = output;
      task.updatedAt = new Date().toISOString();
      this._emit({
        type: 'task_completed',
        taskId: task.id,
        progress: 100,
        message: `Pipeline completed: ${output.scenes.length} scenes, ${output.durationSec}s`,
        // Path C: 包含完整 output 供 replay 恢复
        data: { finalVideoUrl: output.finalVideoUrl, output },
      });

    } catch (err: any) {
      task.status = 'failed';
      task.error = err.message;
      task.updatedAt = new Date().toISOString();
      this._emit({
        type: 'task_failed',
        taskId: task.id,
        message: err.message,
      });
    }
  }

  // ============================================================
  // Toonflow 集成
  // ============================================================

  private async _syncToonflow(
    task: PipelineTask,
    scenes: SceneData[],
    preset: StylePreset
  ): Promise<{
    projectId: string;
    scriptId: number;
    storyboardIds: number[];
    storyboards?: any[];
  }> {
    // 创建或使用已有项目
    let projectId = task.input.toonflowProjectId;
    if (!projectId) {
      const project = await this.toonflow.createProject({
        name: task.input.title || `短剧-${new Date().toLocaleDateString('zh-CN')}`,
        artStyle: task.input.style,
        videoRatio: task.input.videoRatio,
        type: '短剧',
        intro: `自动生成于 ${new Date().toISOString()}`,
      });
      projectId = String(project?.id || project?.data?.id || '');
      if (!projectId) throw new Error('Toonflow project creation returned no ID');
    }

    // 添加脚本
    const scriptResult = await this.toonflow.addScript({
      name: task.input.title || '默认脚本',
      content: JSON.stringify(scenes, null, 2),
      projectId: Number(projectId),
    });
    const scriptId = scriptResult?.id || scriptResult?.data?.id;
    if (!scriptId) throw new Error('Toonflow script creation returned no ID');

    // 批量添加分镜
    const items = scenes.map(s => ({
      prompt: s.imagePrompt,
      videoDesc: s.videoPrompt,
      duration: s.duration,
      track: '默认',
    }));

    await this.toonflow.batchAddStoryboards(Number(scriptId), Number(projectId), items);

    // 查询创建的分镜
    const storyboards = await this.toonflow.getStoryboards(projectId, scriptId);
    const storyboardIds = storyboards.map((sb: any) => Number(sb.id));

    return { projectId, scriptId, storyboardIds, storyboards };
  }

  // ============================================================
  // 步骤执行辅助
  // ============================================================

  private async _runStep(
    task: PipelineTask,
    stepName: string,
    fn: (step: any) => Promise<void>
  ): Promise<void> {
    const step = task.steps.find(s => s.name === stepName);
    if (!step) return;

    step.status = 'running';
    step.startedAt = new Date().toISOString();
    task.currentStep = stepName;
    task.updatedAt = new Date().toISOString();

    this._emit({
      type: 'step_started',
      taskId: task.id,
      stepName,
      message: step.label,
    });

    try {
      await fn(step);
      step.status = 'completed';
      step.completedAt = new Date().toISOString();
      this._emit({
        type: 'step_completed',
        taskId: task.id,
        stepName,
        progress: step.progress,
      });
    } catch (err: any) {
      step.status = 'failed';
      step.error = err.message;
      this._emit({
        type: 'step_failed',
        taskId: task.id,
        stepName,
        message: err.message,
      });
      throw err;
    }

    // 更新整体进度
    const completedSteps = task.steps.filter(s => s.status === 'completed').length;
    task.progress = Math.round((completedSteps / task.steps.length) * 100);
  }

  private _skipStep(task: PipelineTask, stepName: string, reason: string): void {
    const step = task.steps.find(s => s.name === stepName);
    if (!step) return;
    step.status = 'skipped';
    step.progress = 100;
    step.error = reason;
    this._emit({
      type: 'step_completed',
      taskId: task.id,
      stepName,
      progress: 100,
      message: `Skipped: ${reason}`,
    });
  }

  private _updateStepProgress(
    task: PipelineTask,
    step: any,
    progress: number,
    message?: string,
    isWarning = false
  ): void {
    step.progress = progress;
    task.updatedAt = new Date().toISOString();
    this._emit({
      type: 'step_progress',
      taskId: task.id,
      stepName: step.name,
      progress,
      message,
    });
  }

  // ============================================================
  // 工具方法
  // ============================================================

  private _getPreset(style: string): StylePreset {
    return STYLE_PRESETS.find(p => p.artStyle === style) || STYLE_PRESETS[0];
  }

  // ============================================================
  // Path C: 配置辅助方法
  // ============================================================

  /** 构建 PipelineInput 上下文，供条件求值使用 */
  private _buildContext(task: PipelineTask): Record<string, any> {
    return { ...task.input, process };
  }

  /** 从配置中查找步骤定义 */
  private _getStepConfig(name: string): StepConfig {
    return this.config.steps.find(s => s.name === name)
      || { name, label: name, enabled: true };
  }

  /** 从配置中查找策略 provider */
  private _getStrategyProvider(
    strategy: 'tts' | 'video' | 'compose',
    providerName: string,
  ): StrategyProviderConfig {
    const s = this.config.strategies[strategy];
    return s.providers.find(p => p.name === providerName)
      || { name: providerName };
  }

  /** Path C: 热重载管线配置（供 API 端点调用） */
  reloadConfig(): PipelineConfig {
    this.config = reloadPipelineConfig();
    return this.config;
  }

  private _emit(event: Partial<PipelineEvent>): void {
    const fullEvent = {
      ...event,
      taskId: event.taskId || '',
      timestamp: new Date().toISOString(),
    } as PipelineEvent;

    // SSE 推送
    this.emit('event', fullEvent);

    // Path C: 持久化到 JSONL 事件日志（所有带 taskId 的事件统一记录）
    if (fullEvent.taskId) {
      this.eventLog.append({
        timestamp: fullEvent.timestamp,
        type: fullEvent.type,
        taskId: fullEvent.taskId,
        stepName: fullEvent.stepName,
        progress: fullEvent.progress,
        message: fullEvent.message,
        data: (fullEvent as any).data,
      });
    }
  }

  // ============================================================
  // 查询接口
  // ============================================================

  getTask(taskId: string): PipelineTask | undefined {
    const cached = this.tasks.get(taskId);
    if (cached) return cached;

    // Path C: 内存 miss 后从事件日志 replay 恢复
    const restored = this.eventLog.replay(taskId);
    if (restored) {
      this.tasks.set(taskId, restored);
      return restored;
    }
    return undefined;
  }

  listTasks(): PipelineTask[] {
    const memoryIds = new Set(this.tasks.keys());
    const diskIds = this.eventLog.listTaskIds();

    // Path C: 合并内存 + 磁盘，去重
    const allIds = new Set([...memoryIds, ...diskIds]);
    const tasks: PipelineTask[] = [];

    for (const id of allIds) {
      const task = this.tasks.get(id) || this.eventLog.replay(id);
      if (task) tasks.push(task);
    }

    // 按创建时间降序排列
    return tasks.sort((a, b) => b.createdAt.localeCompare(a.createdAt));
  }

  /** Path C: 获取任务事件日志（供 API 端点调用） */
  getTaskLog(taskId: string): LogEntry[] {
    return this.eventLog.read(taskId);
  }

  /** Path C: 获取日志文件路径（供文件下载端点调用） */
  getLogPath(taskId: string): string {
    return this.eventLog.getLogPath(taskId);
  }

  /** Path C: 列出所有可恢复的任务 ID */
  listResumableTaskIds(): string[] {
    return this.eventLog.listResumableTaskIds();
  }

  // P1修复：清理已完成的旧任务，保留最近 50 个
  private _evictOldTasks(): void {
    const completed = Array.from(this.tasks.values())
      .filter(t => t.status === 'completed' || t.status === 'failed')
      .sort((a, b) => a.updatedAt.localeCompare(b.updatedAt));
    const toRemove = completed.slice(0, completed.length - 50);
    for (const t of toRemove) {
      this.tasks.delete(t.id);
    }
  }

  // ============================================================
  // 健康检查
  // ============================================================

  async healthCheck(): Promise<Record<string, any>> {
    const [llm, tts, videoGen, compositor, asr, mpt] = await Promise.all([
      this.llm.healthCheck().catch(() => false),
      this.tts.healthCheck().catch(() => ({ available: false })),
      this.videoGen.healthCheck().catch(() => ({ available: false })),
      this.compositor.healthCheck().catch(() => false),
      this.asr.healthCheck().catch(() => ({ available: false })),
      this.mpt.healthCheck().catch(() => ({ available: false })),
    ]);

    // 检查 Toonflow 实际连通性
    let toonflowStatus = { configured: !!process.env.TOONFLOW_URL, available: false };
    try {
      const tfUrl = process.env.TOONFLOW_URL || 'http://localhost:10588';
      const { default: axios } = await import('axios');
      await axios.get(`${tfUrl}/`, { timeout: 3000 });
      toonflowStatus.available = true;
    } catch { /* not running */ }

    return {
      llm: {
        available: llm,
        model: process.env.LLM_MODEL || 'deepseek-chat',
        baseUrl: process.env.LLM_BASE_URL || 'https://api.deepseek.com/v1',
        configured: !!process.env.LLM_API_KEY,
      },
      tts,
      videoGen,
      compositor: { available: compositor },
      asr,
      toonflow: toonflowStatus,
      mpt: {
        available: mpt.available,
        enabled: this.mpt.isAvailable(),
        url: this.mpt.getApiUrl() || 'not configured',
      },
    };
  }
}
