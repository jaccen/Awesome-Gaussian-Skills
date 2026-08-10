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
import { ToonflowClient } from '../toonflow-client.js';

export interface PipelineManagerOptions {
  llm?: LlmClient;
  tts?: TtsClient;
  videoGen?: VideoGenClient;
  compositor?: FFmpegCompositor;
  toonflow?: ToonflowClient;
  outputDir?: string;
}

export class PipelineManager extends EventEmitter {
  private llm: LlmClient;
  private tts: TtsClient;
  private videoGen: VideoGenClient;
  private compositor: FFmpegCompositor;
  private toonflow: ToonflowClient;
  private outputDir: string;
  private tasks: Map<string, PipelineTask> = new Map();

  constructor(opts: PipelineManagerOptions = {}) {
    super();
    this.llm = opts.llm || new LlmClient();
    this.tts = opts.tts || new TtsClient();
    this.videoGen = opts.videoGen || new VideoGenClient();
    this.compositor = opts.compositor || new FFmpegCompositor();
    this.toonflow = opts.toonflow || new ToonflowClient();
    this.outputDir = opts.outputDir || process.env.PIPELINE_OUTPUT_DIR || '.temp/pipeline';

    // 确保输出目录
    const absDir = path.resolve(process.cwd(), this.outputDir);
    if (!fs.existsSync(absDir)) fs.mkdirSync(absDir, { recursive: true });
  }

  // ============================================================
  // 创建任务
  // ============================================================

  createTask(input: PipelineInput): PipelineTask {
    const task: PipelineTask = {
      id: uuid(),
      input,
      status: 'pending',
      progress: 0,
      currentStep: '',
      steps: [
        { name: 'script_adaptation', label: '剧本改编', status: 'pending', progress: 0 },
        { name: 'storyboard', label: '智能分镜', status: 'pending', progress: 0 },
        { name: 'toonflow_sync', label: 'Toonflow集成', status: 'pending', progress: 0 },
        { name: 'tts', label: 'TTS配音', status: 'pending', progress: 0 },
        { name: 'video_gen', label: '视频驱动', status: 'pending', progress: 0 },
        { name: 'compose', label: 'FFmpeg合成', status: 'pending', progress: 0 },
      ],
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    };

    this.tasks.set(task.id, task);

    this._emit({
      type: 'task_created',
      taskId: task.id,
      message: `Pipeline task created: ${input.title || 'untitled'}`,
    });

    // 异步执行
    this._execute(task.id).catch(err => {
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
      // Step 1: 剧本改编
      await this._runStep(task, 'script_adaptation', async (step) => {
        this._updateStepProgress(task, step, 30, 'LLM正在改编剧本...');
        const adapted = await this.llm.adaptScript(task.input.text, task.input.style);
        output.script = adapted.synopsis;
        output.characters = adapted.characters;
        // 扁平化所有幕的场景
        const allScenes = adapted.acts.flatMap(act => act.scenes);
        // 暂存中间结果到 task 供下一步使用
        (task as any)._adaptedScript = adapted;
        (task as any)._allScenes = allScenes;
        this._updateStepProgress(task, step, 100, `剧本改编完成：${adapted.acts.length}幕，${allScenes.length}个场景`);
      });

      // Step 2: 智能分镜
      await this._runStep(task, 'storyboard', async (step) => {
        this._updateStepProgress(task, step, 20, 'LLM正在生成分镜...');
        const adapted = (task as any)._adaptedScript;
        const scenes = await this.llm.generateStoryboard(adapted, preset);
        output.scenes = scenes;
        this._updateStepProgress(task, step, 100, `分镜生成完成：${scenes.length}个分镜`);
      });

      // Step 3: Toonflow集成（可选）
      if (task.input.toonflowProjectId || this.toonflow) {
        await this._runStep(task, 'toonflow_sync', async (step) => {
          this._updateStepProgress(task, step, 30, '正在同步到Toonflow...');
          try {
            const toonflowResult = await this._syncToonflow(task, output.scenes, preset);
            output.toonflowProjectId = toonflowResult.projectId;
            output.toonflowScriptId = toonflowResult.scriptId;
            output.toonflowStoryboardIds = toonflowResult.storyboardIds;

            // 从Toonflow获取生成的图片
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
      if (task.input.enableTTS) {
        await this._runStep(task, 'tts', async (step) => {
          for (let i = 0; i < output.scenes.length; i++) {
            const scene = output.scenes[i];
            this._updateStepProgress(task, step,
              Math.round((i / output.scenes.length) * 100),
              `TTS: 分镜${i + 1}/${output.scenes.length}`);

            // 合成对白音频
            const dialogueText = scene.dialogue || scene.narration || '';
            if (dialogueText.trim()) {
              // 根据角色选择声音
              const voice = scene.characters[0]?.name === '旁白' ? 'narrator' : 'default';
              const result = await this.tts.synthesize(dialogueText, { voice });
              scene.audioPath = result.audioPath;
            }
          }
          this._updateStepProgress(task, step, 100, `TTS配音完成`);
        });
      } else {
        this._skipStep(task, 'tts', 'TTS disabled by user');
      }

      // Step 5: 视频驱动
      if (task.input.enableVideoGen) {
        await this._runStep(task, 'video_gen', async (step) => {
          for (let i = 0; i < output.scenes.length; i++) {
            const scene = output.scenes[i];
            this._updateStepProgress(task, step,
              Math.round((i / output.scenes.length) * 100),
              `视频生成: 分镜${i + 1}/${output.scenes.length}`);

            // 为每个分镜生成视频片段
            // 如果有图片路径，用图生视频；否则纯文本生视频
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
        this._skipStep(task, 'video_gen', 'Video generation disabled');
        // 即使跳过视频生成，仍需要为每个场景生成基本视频片段（Ken Burns效果）
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

      // Step 6: FFmpeg合成
      await this._runStep(task, 'compose', async (step) => {
        this._updateStepProgress(task, step, 30, '正在合成最终视频...');

        const videoClips = output.scenes.map(s => s.videoPath!).filter(Boolean);
        const audioFiles = output.scenes.map(s => s.audioPath || '').filter(Boolean);

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
        data: { finalVideoUrl: output.finalVideoUrl },
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

  private _emit(event: Partial<PipelineEvent>): void {
    this.emit('event', {
      ...event,
      taskId: event.taskId || '',
      timestamp: new Date().toISOString(),
    } as PipelineEvent);
  }

  // ============================================================
  // 查询接口
  // ============================================================

  getTask(taskId: string): PipelineTask | undefined {
    return this.tasks.get(taskId);
  }

  listTasks(): PipelineTask[] {
    return Array.from(this.tasks.values());
  }

  // ============================================================
  // 健康检查
  // ============================================================

  async healthCheck(): Promise<Record<string, any>> {
    const [llm, tts, videoGen, compositor] = await Promise.all([
      this.llm.healthCheck().catch(() => false),
      this.tts.healthCheck().catch(() => ({ available: false })),
      this.videoGen.healthCheck().catch(() => ({ available: false })),
      this.compositor.healthCheck().catch(() => false),
    ]);

    return {
      llm: { available: llm, model: process.env.LLM_MODEL || 'deepseek-chat' },
      tts,
      videoGen,
      compositor: { available: compositor },
      toonflow: { configured: !!process.env.TOONFLOW_URL },
    };
  }
}
