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
        { name: 'publish', label: '跨平台发布', status: 'pending', progress: 0 },
      ],
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    };

    this.tasks.set(task.id, task);
    // P1修复：超过 100 个任务时清理最旧的已完成/失败任务，防 OOM
    if (this.tasks.size > 100) {
      this._evictOldTasks();
    }

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
      // P1修复：this.toonflow 在构造函数中总是被赋值，条件恒 true
      // 改为检查 Toonflow 是否实际可连接（通过环境变量或传入的 projectId）
      if (task.input.toonflowProjectId || process.env.TOONFLOW_URL) {
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
              try {
                const result = await this.tts.synthesize(dialogueText, { voice });
                scene.audioPath = result.audioPath;
              } catch (ttsErr: any) {
                // MPT TTS 降级：当 Studio 原生 TTS 链（CosyVoice2→Edge→SAPI）全部失败时
                if (task.input.enableMptTTS && this.mpt.isAvailable()) {
                  this._updateStepProgress(task, step,
                    Math.round((i / output.scenes.length) * 100),
                    `MPT TTS 降级: 分镜${i + 1}/${output.scenes.length}`);
                  const mptResult = await this.mpt.synthesizeTTS(dialogueText, {
                    voiceName: task.input.mptVoiceName,
                  });
                  scene.audioPath = mptResult.audioPath;
                } else {
                  throw ttsErr;
                }
              }
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
        // P1修复：不再先 skip 再 runStep（会导致状态混乱）
        // 直接生成 Ken Burns 效果视频
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

      // --- MPT 最终降级 ---
      // 当所有分镜均无视频片段（3DGS / Toonflow / 视频驱动全失败），
      // 且 MPT 降级已启用时，用 MPT 在线素材生成完整视频，跳过 FFmpeg 合成
      const allVideosMissing = output.scenes.length > 0 &&
        output.scenes.every(s => !s.videoPath);

      if (allVideosMissing && task.input.enableMptFallback && this.mpt.isAvailable()) {
        // 用 MPT 全量生成
        await this._runStep(task, 'compose', async (step) => {
          this._updateStepProgress(task, step, 10, 'MPT 降级：在线素材生成完整视频...');

          // 拼接完整脚本
          const fullScript = output.scenes.map(s =>
            [s.narration, s.dialogue].filter(Boolean).join('\n')
          ).join('\n\n');

          // 素材关键词：从场景描述提取
          const terms = output.scenes.map(s => s.sceneDesc).join(' ');

          const mptResult = await this.mpt.generateFullVideo(
            {
              script: fullScript || task.input.text,
              terms,
              aspectRatio: task.input.videoRatio as '16:9' | '9:16' | '1:1',
              voiceName: task.input.mptVoiceName,
              materialSource: undefined, // 使用 MPT 侧默认配置
            },
            (progress, message) => {
              this._updateStepProgress(task, step, 10 + Math.round(progress * 0.85), message);
            },
          );

          // 下载 MPT 生成的视频到本地
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
        // 无任何视频源可用，跳过合成
        this._skipStep(task, 'compose',
          '无视频素材可用（3DGS/Toonflow/视频驱动/MPT 均未产出）');
      } else {
        // Step 6: FFmpeg合成
        await this._runStep(task, 'compose', async (step) => {
        this._updateStepProgress(task, step, 30, '正在合成最终视频...');

        // P1修复：videoClips 和 audioFiles 保持按 scene 对齐，不分别 filter
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
      }

      // Step 7: 跨平台发布（可选）
      if (task.input.publishPlatforms && task.input.publishPlatforms.length > 0) {
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

          this._updateStepProgress(task, step, 20, `正在发布到 ${task.input.publishPlatforms!.length} 个平台...`);
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
