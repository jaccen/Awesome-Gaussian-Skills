/**
 * MoneyPrinterTurbo (MPT) 客户端 — HTTP API Sidecar
 *
 * 封装 MPT 的 REST API，作为 SplatVerse Studio 的能力扩展层：
 *   1. TTS 合成   — 扩展音色选择面（Azure / SiliconFlow / ElevenLabs / Chatterbox / Gemini / MiMo）
 *   2. 全量视频生成 — 最终降级：当 3DGS / Toonflow / 视频驱动全部失败时，
 *                     用 MPT 的在线素材（Pexels / Pixabay / Coverr）生成完整视频
 *   3. BGM 曲库   — 本地曲库 + ElevenLabs Music + Sonilo AI 生成
 *   4. 跨平台发布  — TikTok / Instagram / YouTube Shorts
 *
 * 设计原则：
 *   - 与现有 VideoGenClient / TtsClient 保持一致的降级模式
 *   - MPT 不可用时所有方法抛出描述性错误，由调用方优雅降级
 *   - 零侵入：MPT_API_URL 未配置时，pipeline 行为与之前完全一致
 *
 * 配置：
 *   MPT_API_URL=http://localhost:8501   — MPT FastAPI 服务地址
 *   MPT_ENABLED=true                     — 是否启用 MPT 集成（默认 false）
 *   MPT_MATERIAL_SOURCE=pexels           — 素材来源（pexels / pixabay / coverr / local）
 *   MPT_DEFAULT_VOICE=zh-CN-XiaoxiaoNeural — 默认 TTS 音色
 *   MPT_PEXELS_API_KEY=xxx               — Pexels API Key（传入 MPT 侧素材检索用）
 *   MPT_PIXABAY_API_KEY=xxx              — Pixabay API Key
 *
 * MPT API 路由（/api/v1/ 前缀）：
 *   POST /api/v1/videos            — 创建视频任务（ VideoParams ）
 *   GET  /api/v1/tasks/{id}        — 查询任务状态
 *   GET  /api/v1/tasks             — 列出任务（分页）
 *   DELETE /api/v1/tasks/{id}      — 删除任务
 *   POST /api/v1/audio             — TTS 语音合成
 *   POST /api/v1/subtitle          — 字幕生成
 *   GET  /api/v1/musics            — 列出 BGM 曲库
 *   POST /api/v1/musics            — 上传 BGM
 *   GET  /api/v1/video_materials   — 列出本地视频素材
 *   POST /api/v1/video_materials   — 上传视频素材
 *   GET  /api/v1/download/{path}   — 下载成品文件
 *   GET  /api/v1/stream/{path}     — HTTP Range 流式播放
 */

import axios from 'axios';
import fs from 'fs';
import path from 'path';
import { v4 as uuid } from 'uuid';

// ============================================================
// 类型定义
// ============================================================

/** MPT 视频生成参数（映射 MPT 的 VideoParams 结构） */
export interface MptVideoParams {
  /** 完整脚本文本（与 subject 二选一） */
  script?: string;
  /** 主题/话题（MPT 自动生成脚本，与 script 二选一） */
  subject?: string;
  /** 素材检索关键词（空格分隔） */
  terms?: string;
  /** 画面比例：16:9 / 9:16 / 1:1 */
  aspectRatio?: '16:9' | '9:16' | '1:1';
  /** TTS 音色名称 */
  voiceName?: string;
  /** 语速（0.5–2.0） */
  voiceRate?: number;
  /** BGM 名称 */
  bgmName?: string;
  /** BGM 音量（0–1） */
  bgmVolume?: number;
  /** 单段素材时长（秒） */
  clipDuration?: number;
  /** 拼接模式 */
  concatMode?: 'random' | 'sequential';
  /** 转场效果 */
  transition?: string;
  /** 字体名称 */
  fontName?: string;
  /** 字体大小 */
  fontSize?: number;
  /** 字幕前景色 */
  textForecolor?: string;
  /** 字幕背景色 */
  textBackcolor?: string;
  /** 素材来源 */
  materialSource?: 'pexels' | 'pixabay' | 'coverr' | 'local';
}

/** MPT 任务状态 */
export type MptTaskStatus = 'pending' | 'processing' | 'completed' | 'failed';

/** MPT 任务查询结果 */
export interface MptTaskResult {
  taskId: string;
  status: MptTaskStatus;
  progress: number;          // 0–100
  videoUrl?: string;
  videoPath?: string;
  audioUrl?: string;
  subtitleUrl?: string;
  error?: string;
  crossPostState?: Record<string, any>;
  createdAt?: string;
  updatedAt?: string;
}

/** MPT TTS 合成参数 */
export interface MptTtsOptions {
  voiceName?: string;
  voiceRate?: number;       // 0.5–2.0
  outputPath?: string;
}

/** MPT TTS 合成结果 */
export interface MptTtsResult {
  audioPath: string;
  duration: number;
  provider: string;
  voiceName: string;
}

/** BGM 曲目信息 */
export interface MptBgmTrack {
  name: string;
  url?: string;
  duration?: number;
  source: 'local' | 'elevenlabs' | 'sonilo';
}

/** 跨平台发布配置 */
export interface MptPublishPlatform {
  name: 'tiktok' | 'instagram' | 'youtube';
  title: string;
  description?: string;
  tags?: string[];
  /** 发布为 Short / Reel / Story */
  isShort?: boolean;
}

/** 跨平台发布结果 */
export interface MptPublishResult {
  platform: string;
  success: boolean;
  url?: string;
  error?: string;
}

// ============================================================
// MPT 客户端
// ============================================================

export class MptClient {
  private apiUrl: string;
  private enabled: boolean;
  private materialSource: string;
  private defaultVoice: string;
  private outputDir: string;

  constructor() {
    this.apiUrl = (process.env.MPT_API_URL || '').replace(/\/$/, '');
    this.enabled = process.env.MPT_ENABLED === 'true' && !!this.apiUrl;
    this.materialSource = process.env.MPT_MATERIAL_SOURCE || 'pexels';
    this.defaultVoice = process.env.MPT_DEFAULT_VOICE || 'zh-CN-XiaoxiaoNeural';
    this.outputDir = process.env.PIPELINE_OUTPUT_DIR || '.temp/pipeline';
  }

  /** MPT 是否已配置且启用 */
  isAvailable(): boolean {
    return this.enabled;
  }

  /** MPT API 基础 URL */
  getApiUrl(): string {
    return this.apiUrl;
  }

  // ============================================================
  // 健康检查
  // ============================================================

  async healthCheck(): Promise<{ available: boolean; url: string; version?: string }> {
    if (!this.enabled) {
      return { available: false, url: this.apiUrl };
    }
    try {
      const res = await axios.get(`${this.apiUrl}/api/v1/tasks`, {
        params: { page: 1, page_size: 1 },
        timeout: 5000,
      });
      return {
        available: res.status === 200,
        url: this.apiUrl,
        version: res.data?.version,
      };
    } catch {
      return { available: false, url: this.apiUrl };
    }
  }

  // ============================================================
  // TTS 语音合成 — POST /api/v1/audio
  // ============================================================

  /**
   * 调用 MPT 进行 TTS 语音合成
   * 扩展选择面：Azure V2 / SiliconFlow / Gemini / MiMo / ElevenLabs / Chatterbox
   */
  async synthesizeTTS(text: string, opts: MptTtsOptions = {}): Promise<MptTtsResult> {
    this._ensureAvailable();

    const audioId = uuid();
    const outputPath = opts.outputPath ||
      path.resolve(process.cwd(), this.outputDir, 'audio', `${audioId}.mp3`);
    const dir = path.dirname(outputPath);
    if (!fs.existsSync(dir)) fs.mkdirSync(dir, { recursive: true });

    const payload = {
      text,
      voice_name: opts.voiceName || this.defaultVoice,
      voice_rate: opts.voiceRate || 1.0,
    };

    // MPT 的 /api/v1/audio 返回音频二进制或 JSON（含 URL）
    const res = await axios.post(`${this.apiUrl}/api/v1/audio`, payload, {
      timeout: 30000,
      responseType: 'arraybuffer',
      validateStatus: (code) => code < 400,
    });

    // 如果返回 JSON（含 URL），先下载
    const contentType = String(res.headers['content-type'] || '');
    if (contentType.includes('application/json')) {
      const jsonStr = Buffer.from(res.data).toString('utf-8');
      const json = JSON.parse(jsonStr);
      const audioUrl = json.url || json.audio_url || json.data?.url;
      if (!audioUrl) throw new Error('MPT TTS: no audio URL in response');

      const dlRes = await axios.get(audioUrl, { responseType: 'arraybuffer', timeout: 30000 });
      fs.writeFileSync(outputPath, Buffer.from(dlRes.data));
    } else {
      // 直接写入二进制音频
      fs.writeFileSync(outputPath, Buffer.from(res.data));
    }

    // 推算时长
    const duration = await this._getAudioDuration(outputPath);
    return {
      audioPath: outputPath,
      duration,
      provider: 'mpt',
      voiceName: payload.voice_name,
    };
  }

  // ============================================================
  // 全量视频生成 — POST /api/v1/videos + 轮询 GET /api/v1/tasks/{id}
  // ============================================================

  /**
   * 提交 MPT 全量视频生成任务（最终降级方案）
   *
   * MPT 内部流程：脚本生成（可选）→ 素材检索（Pexels/Pixabay/Coverr）
   * → TTS 合成 → FFmpeg 合成（转场+字幕+BGM）→ 成片
   *
   * @param params 视频参数
   * @param onProgress 进度回调（0–100）
   * @returns MPT 任务结果（含最终视频 URL）
   */
  async generateFullVideo(
    params: MptVideoParams,
    onProgress?: (progress: number, message: string) => void,
  ): Promise<MptTaskResult> {
    this._ensureAvailable();

    // 映射 Studio 参数 → MPT VideoParams
    const videoParams: Record<string, any> = {
      script: params.script || '',
      subject: params.subject || '',
      terms: params.terms || '',
      aspect_ratio: params.aspectRatio || '16:9',
      voice_name: params.voiceName || this.defaultVoice,
      voice_rate: params.voiceRate || 1.0,
      bgm_name: params.bgmName || '',
      bgm_volume: params.bgmVolume ?? 0.2,
      clip_duration: params.clipDuration || 5,
      concat_mode: params.concatMode || 'random',
      transition: params.transition || '',
      font_name: params.fontName || '',
      font_size: params.fontSize || 60,
      text_fore_color: params.textForecolor || '#FFFFFF',
      text_back_color: params.textBackcolor || '#000000',
      material_source: params.materialSource || this.materialSource,
    };

    // 提交任务
    onProgress?.(0, 'MPT: 提交视频生成任务...');
    const submitRes = await axios.post(
      `${this.apiUrl}/api/v1/videos`,
      { video_params: videoParams },
      { timeout: 30000, validateStatus: (c) => c < 400 },
    );

    const taskId = submitRes.data?.id || submitRes.data?.task_id || submitRes.data?.data?.id;
    if (!taskId) throw new Error('MPT: no task ID returned from POST /videos');

    // 轮询任务状态（最多等待 15 分钟）
    const maxPolls = 180;
    for (let i = 0; i < maxPolls; i++) {
      await new Promise(r => setTimeout(r, 5000));

      const pollRes = await axios.get(
        `${this.apiUrl}/api/v1/tasks/${taskId}`,
        { timeout: 10000, validateStatus: (c) => c < 400 },
      );

      const data = pollRes.data?.data || pollRes.data;
      const status = data?.state || data?.status || '';
      const progress = data?.progress || 0;

      onProgress?.(
        Math.min(Math.round(progress), 95),
        `MPT: ${status} (${progress}%)`,
      );

      if (status === 'completed' || status === 'success') {
        const videoUrl = data?.video_url || data?.final_video || data?.video_path;
        const videoPath = data?.video_path || '';
        if (!videoUrl && !videoPath) {
          throw new Error('MPT: task completed but no video URL returned');
        }
        onProgress?.(100, 'MPT: 视频生成完成');
        return {
          taskId: String(taskId),
          status: 'completed',
          progress: 100,
          videoUrl,
          videoPath,
          audioUrl: data?.audio_url,
          subtitleUrl: data?.subtitle_url,
          crossPostState: data?.cross_post_state,
          createdAt: data?.created_at,
          updatedAt: data?.updated_at,
        };
      }

      if (status === 'failed' || status === 'error') {
        throw new Error(`MPT task failed: ${data?.error || data?.message || 'unknown error'}`);
      }
    }

    throw new Error('MPT: task timed out (15 min)');
  }

  /** 查询 MPT 任务状态（不轮询，单次查询） */
  async getTask(taskId: string): Promise<MptTaskResult> {
    this._ensureAvailable();

    const res = await axios.get(
      `${this.apiUrl}/api/v1/tasks/${taskId}`,
      { timeout: 10000, validateStatus: (c) => c < 400 },
    );

    const data = res.data?.data || res.data;
    return {
      taskId: String(data?.id || taskId),
      status: (data?.state || data?.status || 'pending') as MptTaskStatus,
      progress: data?.progress || 0,
      videoUrl: data?.video_url || data?.final_video,
      videoPath: data?.video_path,
      audioUrl: data?.audio_url,
      subtitleUrl: data?.subtitle_url,
      error: data?.error,
      crossPostState: data?.cross_post_state,
      createdAt: data?.created_at,
      updatedAt: data?.updated_at,
    };
  }

  // ============================================================
  // BGM 曲库 — GET /api/v1/musics
  // ============================================================

  async listBgm(): Promise<MptBgmTrack[]> {
    this._ensureAvailable();

    const res = await axios.get(`${this.apiUrl}/api/v1/musics`, {
      timeout: 10000,
      validateStatus: (c) => c < 400,
    });

    const musics = res.data?.data || res.data?.musics || res.data || [];
    if (!Array.isArray(musics)) return [];

    return musics.map((m: any) => ({
      name: m.name || m.title || 'unknown',
      url: m.url || m.path,
      duration: m.duration,
      source: m.source || 'local',
    }));
  }

  // ============================================================
  // 下载 MPT 产物 — GET /api/v1/download/{path}
  // ============================================================

  /**
   * 下载 MPT 生成的视频文件到本地
   * @param mptPath MPT 返回的文件路径或 URL
   * @param localPath 本地保存路径（不指定则自动生成）
   */
  async downloadFile(mptPath: string, localPath?: string): Promise<string> {
    this._ensureAvailable();

    const outputPath = localPath ||
      path.resolve(process.cwd(), this.outputDir, 'mpt-output', `${uuid()}.mp4`);
    const dir = path.dirname(outputPath);
    if (!fs.existsSync(dir)) fs.mkdirSync(dir, { recursive: true });

    // 如果 mptPath 是完整 URL，直接下载
    if (mptPath.startsWith('http://') || mptPath.startsWith('https://')) {
      const res = await axios.get(mptPath, { responseType: 'arraybuffer', timeout: 120000 });
      fs.writeFileSync(outputPath, Buffer.from(res.data));
    } else {
      // 否则用 MPT 的 download 端点
      const cleanPath = mptPath.replace(/^\/+/, '');
      const res = await axios.get(
        `${this.apiUrl}/api/v1/download/${cleanPath}`,
        { responseType: 'arraybuffer', timeout: 120000, validateStatus: (c) => c < 400 },
      );
      fs.writeFileSync(outputPath, Buffer.from(res.data));
    }

    return outputPath;
  }

  // ============================================================
  // 跨平台发布 — MPT Upload-Post
  // ============================================================

  /**
   * 将最终视频发布到多个短视频平台
   *
   * 注意：
   *   - 各平台自动化发布涉及 ToS 合规，生产环境需评估
   *   - 需在 MPT 侧预配置各平台的 Cookie / Token
   *   - MPT 通过 cross_post_state 追踪每个平台的发布状态
   *
   * @param taskId MPT 视频任务 ID（需已生成完成）
   * @param platforms 目标平台及发布配置
   */
  async publishVideo(
    taskId: string,
    platforms: MptPublishPlatform[],
  ): Promise<MptPublishResult[]> {
    this._ensureAvailable();

    const results: MptPublishResult[] = [];

    for (const platform of platforms) {
      try {
        const res = await axios.post(
          `${this.apiUrl}/api/v1/tasks/${taskId}/publish`,
          {
            platform: platform.name,
            title: platform.title,
            description: platform.description || '',
            tags: platform.tags || [],
            is_short: platform.isShort !== false, // 默认 Short
          },
          { timeout: 60000, validateStatus: (c) => c < 400 },
        );

        const data = res.data?.data || res.data;
        results.push({
          platform: platform.name,
          success: data?.success !== false,
          url: data?.url || data?.post_url,
        });
      } catch (err: any) {
        results.push({
          platform: platform.name,
          success: false,
          error: err.response?.data?.error || err.message,
        });
      }
    }

    return results;
  }

  // ============================================================
  // 辅助方法
  // ============================================================

  /** 若 MPT 未配置则抛出 */
  private _ensureAvailable(): void {
    if (!this.enabled) {
      throw new Error('MPT not configured. Set MPT_ENABLED=true and MPT_API_URL to enable.');
    }
  }

  /** 获取音频时长（ffprobe） */
  private async _getAudioDuration(filePath: string): Promise<number> {
    try {
      const { execFile } = await import('child_process');
      const { promisify } = await import('util');
      const execFileAsync = promisify(execFile);
      const { stdout } = await execFileAsync('ffprobe', [
        '-v', 'quiet', '-show_entries', 'format=duration',
        '-of', 'csv=p=0', filePath,
      ], { timeout: 5000 });
      return parseFloat(stdout.trim()) || 3;
    } catch {
      return 3;
    }
  }
}

// ============================================================
// 便捷工厂
// ============================================================

/** 单例 MPT 客户端（延迟初始化） */
let _mptInstance: MptClient | null = null;

export function getMptClient(): MptClient {
  if (!_mptInstance) {
    _mptInstance = new MptClient();
  }
  return _mptInstance;
}
