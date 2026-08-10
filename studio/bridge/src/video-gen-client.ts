/**
 * 视频生成客户端 — 图→视频驱动
 *
 * Primary: Seedance API（文生视频/图生视频 SOTA）
 * Fallback: 跳过视频驱动，使用图片+Ken Burns效果（FFmpeg zoompan）
 *
 * 配置：
 *   VIDEO_GEN_PROVIDER=seedance|skip
 *   SEEDANCE_API_KEY, SEEDANCE_BASE_URL
 */

import axios from 'axios';
import fs from 'fs';
import path from 'path';
import { v4 as uuid } from 'uuid';
import { exec } from 'child_process';
import { promisify } from 'util';

const execAsync = promisify(exec);

export interface VideoGenOptions {
  imagePath?: string;       // 输入图片路径（图生视频）
  imageUrl?: string;        // 输入图片URL
  prompt: string;           // 视频驱动提示词
  duration: number;         // 目标时长（秒）
  width?: number;
  height?: number;
  fps?: number;
  outputPath?: string;      // 输出路径
}

export interface VideoGenResult {
  videoPath: string;
  duration: number;
  provider: string;
}

export class VideoGenClient {
  private provider: string;
  private seedanceKey: string;
  private seedanceUrl: string;
  private outputDir: string;

  constructor() {
    this.provider = process.env.VIDEO_GEN_PROVIDER || 'skip';
    this.seedanceKey = process.env.SEEDANCE_API_KEY || '';
    this.seedanceUrl = process.env.SEEDANCE_BASE_URL || 'https://api.seedance.ai/v1';
    this.outputDir = process.env.PIPELINE_OUTPUT_DIR || '.temp/pipeline';
    const absDir = path.resolve(process.cwd(), this.outputDir, 'video');
    if (!fs.existsSync(absDir)) {
      fs.mkdirSync(absDir, { recursive: true });
    }
  }

  // ============================================================
  // 生成入口
  // ============================================================

  async generate(opts: VideoGenOptions): Promise<VideoGenResult> {
    const videoId = uuid();
    const outputPath = opts.outputPath ||
      path.resolve(process.cwd(), this.outputDir, 'video', `${videoId}.mp4`);

    if (this.provider === 'seedance' && this.seedanceKey) {
      try {
        return await this._seedance(opts, outputPath);
      } catch (err: any) {
        console.warn(`[video-gen] Seedance failed: ${err.message}, using Ken Burns fallback`);
      }
    }

    // Fallback: Ken Burns 效果（图片→视频 with zoom/pan）
    if (opts.imagePath || opts.imageUrl) {
      return await this._kenBurns(opts, outputPath);
    }

    // 最终降级：生成纯色背景视频
    return await this._solidColor(opts, outputPath);
  }

  // ============================================================
  // Seedance API
  // ============================================================

  private async _seedance(opts: VideoGenOptions, outputPath: string): Promise<VideoGenResult> {
    // 1. 提交生成任务
    const payload: Record<string, any> = {
      prompt: opts.prompt,
      duration: opts.duration,
      width: opts.width || 1920,
      height: opts.height || 1080,
      fps: opts.fps || 24,
    };

    // 图生视频模式
    if (opts.imageUrl) {
      payload.image = opts.imageUrl;
      payload.mode = 'image_to_video';
    } else if (opts.imagePath) {
      // 读取图片转base64上传
      const imgBuffer = fs.readFileSync(opts.imagePath);
      const base64 = imgBuffer.toString('base64');
      const ext = path.extname(opts.imagePath).slice(1) || 'png';
      payload.image = `data:image/${ext};base64,${base64}`;
      payload.mode = 'image_to_video';
    } else {
      payload.mode = 'text_to_video';
    }

    const submitRes = await axios.post(
      `${this.seedanceUrl}/video/generations`,
      payload,
      {
        headers: {
          'Authorization': `Bearer ${this.seedanceKey}`,
          'Content-Type': 'application/json',
        },
        timeout: 30000,
      }
    );

    const taskId = submitRes.data?.id || submitRes.data?.task_id;
    if (!taskId) throw new Error('Seedance: no task ID returned');

    // 2. 轮询任务状态
    const maxPolls = 120; // 最多等待10分钟
    for (let i = 0; i < maxPolls; i++) {
      await new Promise(r => setTimeout(r, 5000)); // 每5秒轮询一次

      const pollRes = await axios.get(
        `${this.seedanceUrl}/video/generations/${taskId}`,
        { headers: { 'Authorization': `Bearer ${this.seedanceKey}` }, timeout: 10000 }
      );

      const status = pollRes.data?.status;
      if (status === 'succeeded' || status === 'completed') {
        const videoUrl = pollRes.data?.video_url || pollRes.data?.output?.[0];
        if (!videoUrl) throw new Error('Seedance: task completed but no video URL');

        // 下载视频文件
        const videoRes = await axios.get(videoUrl, { responseType: 'arraybuffer', timeout: 120000 });
        fs.writeFileSync(outputPath, Buffer.from(videoRes.data));

        return { videoPath: outputPath, duration: opts.duration, provider: 'seedance' };
      }
      if (status === 'failed' || status === 'error') {
        throw new Error(`Seedance task failed: ${pollRes.data?.error || 'unknown'}`);
      }
      // 继续等待
    }
    throw new Error('Seedance: task timed out');
  }

  // ============================================================
  // Ken Burns 效果（图片→视频，FFmpeg zoompan）
  // ============================================================

  private async _kenBurns(opts: VideoGenOptions, outputPath: string): Promise<VideoGenResult> {
    const inputPath = opts.imagePath || await this._downloadImage(opts.imageUrl!);
    const fps = opts.fps || 24;
    const frames = Math.round(opts.duration * fps);
    const width = opts.width || 1920;
    const height = opts.height || 1080;

    // zoompan: 从1.0缓慢放大到1.15，配合轻微平移
    const zoomExpr = `'zoompan=f=${fps}:d=${frames}:s=${width}x${height}:z='min(zoom+0.0008,1.15)':x='iw/2-(iw/zoom/2)':y='ih/2-(ih/zoom/2)'`;

    await execAsync(
      `ffmpeg -y -loop 1 -i "${inputPath}" -vf ${zoomExpr} -t ${opts.duration} -c:v libx264 -pix_fmt yuv420p -r ${fps} "${outputPath}"`,
      { timeout: 60000 }
    );

    return { videoPath: outputPath, duration: opts.duration, provider: 'ken-burns' };
  }

  // ============================================================
  // 纯色背景视频（最终降级）
  // ============================================================

  private async _solidColor(opts: VideoGenOptions, outputPath: string): Promise<VideoGenResult> {
    const fps = opts.fps || 24;
    const width = opts.width || 1920;
    const height = opts.height || 1080;

    await execAsync(
      `ffmpeg -y -f lavfi -i color=c=0x1a1a2e:s=${width}x${height}:d=${opts.duration}:r=${fps} -c:v libx264 -pix_fmt yuv420p "${outputPath}"`,
      { timeout: 30000 }
    );

    return { videoPath: outputPath, duration: opts.duration, provider: 'solid-color' };
  }

  // ============================================================
  // 工具方法
  // ============================================================

  private async _downloadImage(url: string): Promise<string> {
    const imgId = uuid();
    const imgPath = path.resolve(process.cwd(), this.outputDir, 'images', `${imgId}.png`);
    const dir = path.dirname(imgPath);
    if (!fs.existsSync(dir)) fs.mkdirSync(dir, { recursive: true });

    const res = await axios.get(url, { responseType: 'arraybuffer', timeout: 30000 });
    fs.writeFileSync(imgPath, Buffer.from(res.data));
    return imgPath;
  }

  // ============================================================
  // 健康检查
  // ============================================================

  async healthCheck(): Promise<{ provider: string; available: boolean }> {
    if (this.provider === 'seedance' && this.seedanceKey) {
      try {
        await axios.get(`${this.seedanceUrl}/models`, {
          headers: { 'Authorization': `Bearer ${this.seedanceKey}` },
          timeout: 5000,
        });
        return { provider: 'seedance', available: true };
      } catch {
        return { provider: 'seedance', available: false };
      }
    }
    // Ken Burns 和纯色背景始终可用（依赖FFmpeg）
    try {
      await execAsync('ffmpeg -version', { timeout: 5000 });
      return { provider: 'ken-burns', available: true };
    } catch {
      return { provider: 'ken-burns', available: false };
    }
  }
}
