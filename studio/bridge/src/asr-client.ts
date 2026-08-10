/**
 * ASR 客户端 — 语音识别（字幕对齐）
 *
 * 多供应商架构：
 *   whisper-local — 本地 Whisper（免费，pip install openai-whisper）
 *   aliyun        — 阿里云语音识别API
 *   tencent       — 腾讯云语音识别API
 *   skip          — 跳过ASR，用LLM估算时间轴
 *
 * 配置：ASR_PROVIDER, ASR_WHISPER_MODEL 等环境变量
 */

import { execFile } from 'child_process';
import { promisify } from 'util';
import axios from 'axios';
import fs from 'fs';
import path from 'path';
import { v4 as uuid } from 'uuid';

const execFileAsync = promisify(execFile);

export interface AsrResult {
  segments: AsrSegment[];
  fullText: string;
  provider: string;
}

export interface AsrSegment {
  start: number;      // 开始时间（秒）
  end: number;         // 结束时间（秒）
  text: string;       // 文字
}

export class AsrClient {
  private provider: string;
  private outputDir: string;

  constructor() {
    this.provider = process.env.ASR_PROVIDER || 'skip';
    this.outputDir = process.env.PIPELINE_OUTPUT_DIR || '.temp/pipeline';
  }

  // ============================================================
  // 识别入口
  // ============================================================

  async recognize(audioPath: string): Promise<AsrResult> {
    if (this.provider === 'skip' || !this.provider) {
      return this._fallback(audioPath);
    }

    try {
      switch (this.provider) {
        case 'whisper-local':
          return await this._whisperLocal(audioPath);
        case 'aliyun':
          return await this._aliyun(audioPath);
        case 'tencent':
          return await this._tencent(audioPath);
        default:
          return this._fallback(audioPath);
      }
    } catch (err: any) {
      console.warn(`[asr-client] ${this.provider} failed: ${err.message}, using fallback`);
      return this._fallback(audioPath);
    }
  }

  // ============================================================
  // 本地 Whisper
  // ============================================================

  private async _whisperLocal(audioPath: string): Promise<AsrResult> {
    const model = process.env.ASR_WHISPER_MODEL || 'base';
    const device = process.env.ASR_WHISPER_DEVICE || 'cpu';
    const language = process.env.ASR_WHISPER_LANGUAGE || 'zh';

    // P0修复：execFile 防命令注入；参数校验防非法值
    const validModel = /^[a-zA-Z0-9._-]+$/.test(model) ? model : 'base';
    const validDevice = /^(cpu|cuda)$/.test(device) ? device : 'cpu';
    const validLang = /^[a-zA-Z-]{2,5}$/.test(language) ? language : 'zh';

    const outputDir = path.resolve(process.cwd(), this.outputDir, 'asr');
    if (!fs.existsSync(outputDir)) fs.mkdirSync(outputDir, { recursive: true });

    try {
      await execFileAsync('whisper', [
        audioPath,
        '--model', validModel,
        '--language', validLang,
        '--device', validDevice,
        '--output_format', 'json',
        '--output_dir', outputDir,
      ], { timeout: 120000 });

      // whisper 输出的 JSON 文件名与音频文件同名
      const baseName = path.basename(audioPath, path.extname(audioPath));
      const expectedPath = path.join(outputDir, `${baseName}.json`);

      if (fs.existsSync(expectedPath)) {
        const data = JSON.parse(fs.readFileSync(expectedPath, 'utf-8'));
        const segments: AsrSegment[] = (data.segments || []).map((s: any) => ({
          start: s.start,
          end: s.end,
          text: s.text.trim(),
        }));
        return {
          segments,
          fullText: data.text || segments.map(s => s.text).join(''),
          provider: 'whisper-local',
        };
      }
      throw new Error('Whisper JSON output not found');
    } catch (err: any) {
      // 方法2：faster-whisper Python 包（用临时文件传参防注入）
      const validModel = /^[a-zA-Z0-9._-]+$/.test(model) ? model : 'base';
      const validDevice = /^(cpu|cuda)$/.test(device) ? device : 'cpu';
      const validLang = /^[a-zA-Z-]{2,5}$/.test(language) ? language : 'zh';

      const tmpDir = path.resolve(process.cwd(), this.outputDir, 'asr');
      if (!fs.existsSync(tmpDir)) fs.mkdirSync(tmpDir, { recursive: true });
      const scriptFile = path.join(tmpDir, `faster-whisper-${uuid()}.py`);
      const jsonOutFile = path.join(tmpDir, `faster-whisper-${uuid()}.json`);
      const script = `# -*- coding: utf-8 -*-
import json, sys
from faster_whisper import WhisperModel
model = WhisperModel(sys.argv[1], device=sys.argv[2])
segments, info = model.transcribe(sys.argv[3], language=sys.argv[4])
result = {"segments": [], "text": ""}
for seg in segments:
    result["segments"].append({"start": seg.start, "end": seg.end, "text": seg.text.strip()})
    result["text"] += seg.text
with open(sys.argv[5], "w", encoding="utf-8") as f:
    json.dump(result, f, ensure_ascii=False)
`;
      try {
        fs.writeFileSync(scriptFile, script, 'utf-8');
        await execFileAsync('python', [
          scriptFile, validModel, validDevice, audioPath, validLang, jsonOutFile,
        ], { timeout: 120000 });

        const data = JSON.parse(fs.readFileSync(jsonOutFile, 'utf-8'));
        return {
          segments: data.segments || [],
          fullText: data.text || '',
          provider: 'faster-whisper',
        };
      } catch (err2: any) {
        throw new Error(`Whisper failed: ${err.message}; faster-whisper also failed: ${err2.message}`);
      } finally {
        try { fs.unlinkSync(scriptFile); } catch { /* */ }
        try { fs.unlinkSync(jsonOutFile); } catch { /* */ }
      }
    }
  }

  // ============================================================
  // 阿里云语音识别
  // ============================================================

  private async _aliyun(audioPath: string): Promise<AsrResult> {
    const key = process.env.ASR_ALIYUN_KEY;
    const appkey = process.env.ASR_ALIYUN_APPKEY;
    if (!key || !appkey) throw new Error('ASR_ALIYUN_KEY and ASR_ALIYUN_APPKEY required');

    // 读取音频转base64
    const audioBuffer = fs.readFileSync(audioPath);
    const base64Audio = audioBuffer.toString('base64');

    const response = await axios.post(
      'https://nls-gateway.cn-shanghai.aliyuncs.com/stream/v1/asr',
      {
        appkey,
        audio: base64Audio,
        format: path.extname(audioPath).slice(1) || 'wav',
        sample_rate: 16000,
      },
      {
        headers: {
          'Authorization': `Bearer ${key}`,
          'Content-Type': 'application/json',
        },
        timeout: 30000,
      }
    );

    const result = response.data?.result || '';
    // 阿里云返回纯文本，需要自行分段（简化处理：整段作为一个segment）
    return {
      segments: [{ start: 0, end: 0, text: result }],
      fullText: result,
      provider: 'aliyun',
    };
  }

  // ============================================================
  // 腾讯云语音识别
  // ============================================================

  private async _tencent(audioPath: string): Promise<AsrResult> {
    const secretId = process.env.ASR_TENCENT_SECRET_ID;
    const secretKey = process.env.ASR_TENCENT_SECRET_KEY;
    const appId = process.env.ASR_TENCENT_APP_ID;
    if (!secretId || !secretKey || !appId) throw new Error('ASR_TENCENT_* required');

    // 腾讯云 ASR 需要签名鉴权，这里用简化方案：通过 ffmpeg 转 PCM 再上传
    // 实际生产建议用腾讯云 SDK
    throw new Error('Tencent ASR not yet implemented, use whisper-local instead');
  }

  // ============================================================
  // 降级方案：用音频时长估算时间轴
  // ============================================================

  private async _fallback(audioPath: string): Promise<AsrResult> {
    let duration = 3;
    try {
      const { stdout } = await execFileAsync('ffprobe', [
        '-v', 'quiet', '-show_entries', 'format=duration',
        '-of', 'csv=p=0', audioPath,
      ], { timeout: 5000 });
      duration = parseFloat(stdout.trim()) || 3;
    } catch { /* 使用默认值 */ }

    return {
      segments: [{ start: 0, end: duration, text: '' }],
      fullText: '',
      provider: 'fallback',
    };
  }

  // ============================================================
  // 健康检查
  // ============================================================

  async healthCheck(): Promise<{ provider: string; available: boolean; detail?: string }> {
    if (this.provider === 'skip' || !this.provider) {
      return { provider: 'skip', available: true, detail: 'ASR disabled, using LLM estimated timestamps' };
    }

    if (this.provider === 'whisper-local') {
      try {
        await execFileAsync('whisper', ['--help'], { timeout: 5000 });
        return { provider: 'whisper-local', available: true, detail: `model=${process.env.ASR_WHISPER_MODEL || 'base'}` };
      } catch {
        try {
          await execFileAsync('python', ['-c', 'import faster_whisper; print("ok")'], { timeout: 10000 });
          return { provider: 'faster-whisper', available: true };
        } catch {
          return { provider: 'whisper-local', available: false, detail: 'Install: pip install openai-whisper or pip install faster-whisper' };
        }
      }
    }

    if (this.provider === 'aliyun') {
      const hasKey = !!(process.env.ASR_ALIYUN_KEY && process.env.ASR_ALIYUN_APPKEY);
      return { provider: 'aliyun', available: hasKey, detail: hasKey ? 'configured' : 'ASR_ALIYUN_KEY not set' };
    }

    if (this.provider === 'tencent') {
      const hasKey = !!(process.env.ASR_TENCENT_SECRET_ID && process.env.ASR_TENCENT_SECRET_KEY);
      return { provider: 'tencent', available: hasKey, detail: hasKey ? 'configured' : 'ASR_TENCENT_* not set' };
    }

    return { provider: this.provider, available: false };
  }
}
