/**
 * FFmpeg 合成器 — 后期合成出片
 *
 * 功能：
 *   1. 合并多个视频片段
 *   2. 叠加音频轨道（配音+BGM）
 *   3. 烧录字幕
 *   4. 格式标准化输出
 *
 * 依赖：FFmpeg / FFprobe（系统 PATH 或 FFMPEG_PATH 环境变量）
 */

import { exec } from 'child_process';
import { promisify } from 'util';
import fs from 'fs';
import path from 'path';
import { v4 as uuid } from 'uuid';
import type { SceneData } from './pipeline/types.js';

const execAsync = promisify(exec);

export interface ComposeOptions {
  videoClips: string[];       // 视频片段路径列表
  audioFiles: string[];       // 音频文件路径列表（对应每个场景）
  scenes: SceneData[];        // 分镜数据（用于字幕）
  outputDir: string;
  videoRatio: string;         // 16:9 / 9:16 / 1:1
  bgmPath?: string;           // 背景音乐路径
  bgmVolume?: number;         // BGM音量（0-1）
  enableSubtitles: boolean;   // 是否烧录字幕
  watermark?: string;         // 水印文字
}

export interface ComposeResult {
  videoPath: string;          // 最终视频路径
  videoUrl: string;           // 视频访问URL
  subtitlePath?: string;      // 字幕文件路径
  durationSec: number;         // 总时长（秒）
  thumbnailPath?: string;      // 缩略图路径
  thumbnailUrl?: string;       // 缩略图URL
}

export class FFmpegCompositor {
  private ffmpegPath: string;
  private ffprobePath: string;

  constructor() {
    this.ffmpegPath = process.env.FFMPEG_PATH || 'ffmpeg';
    // P1修复：ffprobePath 替换 Bug——replace('ffmpeg', 'ffprobe') 会替换路径中非可执行文件名的部分
    if (process.env.FFMPEG_PATH) {
      this.ffprobePath = process.env.FFMPEG_PATH.replace(/ffmpeg(\.exe)?$/i, 'ffprobe$1');
    } else {
      this.ffprobePath = 'ffprobe';
    }
  }

  // ============================================================
  // 主合成入口
  // ============================================================

  async compose(opts: ComposeOptions): Promise<ComposeResult> {
    const jobId = uuid();
    const workDir = path.resolve(opts.outputDir, `compose-${jobId}`);
    if (!fs.existsSync(workDir)) fs.mkdirSync(workDir, { recursive: true });

    // P1修复：空 clips 前置检查
    if (!opts.videoClips || opts.videoClips.length === 0) {
      throw new Error('视频片段列表为空，无法合成');
    }

    try {
    // Step 1: 标准化每个视频片段（统一分辨率+帧率+时长对齐音频）
    const normalizedClips: string[] = [];
    for (let i = 0; i < opts.videoClips.length; i++) {
      const clip = opts.videoClips[i];
      const audio = opts.audioFiles[i];
      const scene = opts.scenes[i];
      // P1修复：scene 可能为 undefined
      if (!scene) throw new Error(`分镜数据缺失：第 ${i+1} 个片段无对应 scene`);
      const normalizedPath = await this._normalizeClip(
        clip, audio, scene, workDir, i, opts.videoRatio
      );
      normalizedClips.push(normalizedPath);
    }

    // Step 2: 拼接所有片段
    const concatPath = path.join(workDir, 'concat.mp4');
    await this._concatClips(normalizedClips, concatPath);

    // Step 3: 生成字幕文件
    let subtitlePath: string | undefined;
    if (opts.enableSubtitles) {
      subtitlePath = await this._generateSRT(opts.scenes, workDir);
    }

    // Step 4: 最终合成（字幕+BGM+水印）
    const finalPath = path.resolve(opts.outputDir, `final-${jobId}.mp4`);
    await this._finalCompose(concatPath, subtitlePath, opts, finalPath);

    // Step 5: 生成缩略图
    const thumbnailPath = path.resolve(opts.outputDir, `thumb-${jobId}.png`);
    await this._generateThumbnail(finalPath, thumbnailPath);

    // Step 6: 获取总时长
    const durationSec = await this._getDuration(finalPath);

    return {
      videoPath: finalPath,
      videoUrl: `/api/pipeline/files/${path.basename(finalPath)}`,
      subtitlePath,
      durationSec,
      thumbnailPath,
      thumbnailUrl: `/api/pipeline/files/${path.basename(thumbnailPath)}`,
    };
    } finally {
      // P2修复：异常路径也清理临时文件
      try { fs.rmSync(workDir, { recursive: true, force: true }); } catch { /* */ }
    }
  }

  // ============================================================
  // 标准化单个片段
  // ============================================================

  private async _normalizeClip(
    videoPath: string,
    audioPath: string | undefined,
    scene: SceneData,
    workDir: string,
    index: number,
    ratio: string
  ): Promise<string> {
    const outputPath = path.join(workDir, `clip-${String(index).padStart(3, '0')}.mp4`);

    const [w, h] = ratio === '9:16' ? [1080, 1920] : ratio === '1:1' ? [1080, 1080] : [1920, 1080];

    // 如果有音频，合并视频+音频，按音频时长截断
    if (audioPath && fs.existsSync(audioPath)) {
      await execAsync(
        `"${this.ffmpegPath}" -y -i "${videoPath}" -i "${audioPath}" ` +
        `-vf "scale=${w}:${h}:force_original_aspect_ratio=decrease,pad=${w}:${h}:(ow-iw)/2:(oh-ih)/2:black" ` +
        `-c:v libx264 -preset fast -crf 23 -r 24 -pix_fmt yuv420p ` +
        `-c:a aac -b:a 128k -shortest -t ${scene.duration} ` +
        `"${outputPath}"`,
        { timeout: 60000 }
      );
    } else {
      // 无音频，直接标准化视频
      await execAsync(
        `"${this.ffmpegPath}" -y -i "${videoPath}" ` +
        `-vf "scale=${w}:${h}:force_original_aspect_ratio=decrease,pad=${w}:${h}:(ow-iw)/2:(oh-ih)/2:black" ` +
        `-c:v libx264 -preset fast -crf 23 -r 24 -pix_fmt yuv420p ` +
        `-t ${scene.duration} "${outputPath}"`,
        { timeout: 60000 }
      );
    }

    return outputPath;
  }

  // ============================================================
  // 拼接视频片段
  // ============================================================

  private async _concatClips(clips: string[], outputPath: string): Promise<void> {
    // 创建concat列表文件
    const listFile = path.join(path.dirname(outputPath), 'concat-list.txt');
    const listContent = clips.map(c => `file '${c.replace(/'/g, "'\\''")}'`).join('\n');
    fs.writeFileSync(listFile, listContent, 'utf-8');

    await execAsync(
      `"${this.ffmpegPath}" -y -f concat -safe 0 -i "${listFile}" -c copy "${outputPath}"`,
      { timeout: 60000 }
    );
  }

  // ============================================================
  // 生成SRT字幕文件
  // ============================================================

  private async _generateSRT(scenes: SceneData[], workDir: string): Promise<string> {
    const srtPath = path.join(workDir, 'subtitles.srt');
    let srtContent = '';
    let currentTime = 0;

    scenes.forEach((scene, i) => {
      const start = currentTime;
      const end = currentTime + scene.duration;
      srtContent += `${i + 1}\n`;
      srtContent += `${this._formatTime(start)} --> ${this._formatTime(end)}\n`;
      // 对白+旁白组合
      const subtitleText = [scene.dialogue, scene.narration].filter(Boolean).join('\n');
      srtContent += `${subtitleText || ''}\n\n`;
      currentTime = end;
    });

    fs.writeFileSync(srtPath, srtContent, 'utf-8');
    return srtPath;
  }

  // ============================================================
  // 最终合成
  // ============================================================

  private async _finalCompose(
    videoPath: string,
    subtitlePath: string | undefined,
    opts: ComposeOptions,
    outputPath: string
  ): Promise<void> {
    const args: string[] = [`"${this.ffmpegPath}" -y -i "${videoPath}"`];

    // 添加BGM
    if (opts.bgmPath && fs.existsSync(opts.bgmPath)) {
      args.push(`-i "${opts.bgmPath}"`);
    }

    // 视频滤镜
    const filters: string[] = [];
    if (subtitlePath) {
      // 烧录字幕（Windows需要转义路径）
      const srtPath = subtitlePath.replace(/\\/g, '/').replace(/:/g, '\\:');
      filters.push(`subtitles='${srtPath}'`);
    }
    if (opts.watermark) {
      // P0修复：水印文字转义单引号防FFmpeg滤镜注入
      const safeWatermark = opts.watermark.replace(/'/g, "\\'").replace(/:/g, '\\:');
      filters.push(`drawtext=text='${safeWatermark}':fontcolor=white@0.5:fontsize=24:x=w-tw-20:y=h-th-20`);
    }
    if (filters.length > 0) {
      args.push(`-vf "${filters.join(',')}"`);
    }

    // 音频混合
    if (opts.bgmPath && fs.existsSync(opts.bgmPath)) {
      const bgmVol = opts.bgmVolume ?? 0.15;
      // P1修复：用 0:a? (optional) 防止无音频流时报错
      args.push(`-filter_complex "[0:a?]volume=1.0[a1];[1:a]volume=${bgmVol}[a2];[a1][a2]amix=duration=first:dropout_transition=2[aout]"`);
      args.push(`-map "0:v" -map "[aout]"`);
    } else {
      args.push(`-map "0:v" -map "0:a?"`);
    }

    args.push(`-c:v libx264 -preset fast -crf 23 -pix_fmt yuv420p`);
    args.push(`-c:a aac -b:a 192k`);
    args.push(`"${outputPath}"`);

    await execAsync(args.join(' '), { timeout: 120000 });
  }

  // ============================================================
  // 生成缩略图
  // ============================================================

  private async _generateThumbnail(videoPath: string, thumbPath: string): Promise<void> {
    try {
      await execAsync(
        `"${this.ffmpegPath}" -y -i "${videoPath}" -ss 00:00:01 -vframes 1 -q:v 2 "${thumbPath}"`,
        { timeout: 10000 }
      );
    } catch {
      // 缩略图生成失败不致命
    }
  }

  // ============================================================
  // 工具方法
  // ============================================================

  private async _getDuration(filePath: string): Promise<number> {
    try {
      const { stdout } = await execAsync(
        `"${this.ffprobePath}" -v quiet -show_entries format=duration -of csv=p=0 "${filePath}"`,
        { timeout: 5000 }
      );
      return parseFloat(stdout.trim()) || 0;
    } catch {
      return 0;
    }
  }

  private _formatTime(seconds: number): string {
    const h = Math.floor(seconds / 3600);
    const m = Math.floor((seconds % 3600) / 60);
    const s = Math.floor(seconds % 60);
    const ms = Math.round((seconds % 1) * 1000);
    return `${String(h).padStart(2, '0')}:${String(m).padStart(2, '0')}:${String(s).padStart(2, '0')},${String(ms).padStart(3, '0')}`;
  }

  // ============================================================
  // 健康检查
  // ============================================================

  async healthCheck(): Promise<boolean> {
    try {
      await execAsync(`"${this.ffmpegPath}" -version`, { timeout: 5000 });
      return true;
    } catch {
      return false;
    }
  }
}
