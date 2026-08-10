/**
 * TTS 客户端 — 语音合成
 *
 * 双通道架构：
 *   Primary: CosyVoice2 API（本地部署或远程）
 *   Fallback: EdgeTTS（微软免费TTS，无需API Key）
 *
 * 配置：
 *   TTS_PROVIDER=cosyvoice|edge
 *   COSYVOICE_URL, COSYVOICE_API_KEY
 */

import axios from 'axios';
import { exec } from 'child_process';
import { promisify } from 'util';
import fs from 'fs';
import path from 'path';
import { v4 as uuid } from 'uuid';

const execAsync = promisify(exec);

export interface TtsOptions {
  voice?: string;        // 声音ID/名称
  speed?: number;        // 语速 0.5-2.0
  emotion?: string;     // 情感（CosyVoice2支持）
  outputPath?: string;  // 输出路径（不指定则自动生成）
}

export interface TtsResult {
  audioPath: string;     // 音频文件路径
  duration: number;      // 时长（秒）
  provider: string;      // 使用的提供商
}

// EdgeTTS 中文声音映射
const EDGE_VOICES: Record<string, string> = {
  'female-young': 'zh-CN-XiaoxiaoNeural',
  'female-mature': 'zh-CN-XiaoyiNeural',
  'male-young': 'zh-CN-YunyangNeural',
  'male-mature': 'zh-CN-YunxiNeural',
  'narrator': 'zh-CN-YunjianNeural',
  'default': 'zh-CN-XiaoxiaoNeural',
};

export class TtsClient {
  private provider: string;
  private cosyvoiceUrl: string;
  private cosyvoiceKey: string;
  private outputDir: string;

  constructor() {
    this.provider = process.env.TTS_PROVIDER || 'edge';
    this.cosyvoiceUrl = process.env.COSYVOICE_URL || 'http://localhost:5000';
    this.cosyvoiceKey = process.env.COSYVOICE_API_KEY || '';
    this.outputDir = process.env.PIPELINE_OUTPUT_DIR || '.temp/pipeline';
    // 确保输出目录存在
    const absDir = path.resolve(process.cwd(), this.outputDir, 'audio');
    if (!fs.existsSync(absDir)) {
      fs.mkdirSync(absDir, { recursive: true });
    }
  }

  // ============================================================
  // 合成入口
  // ============================================================

  async synthesize(text: string, opts: TtsOptions = {}): Promise<TtsResult> {
    if (!text || !text.trim()) {
      return this._generateSilence(opts.outputPath);
    }

    const provider = opts.voice && opts.voice.startsWith('edge:') ? 'edge' : this.provider;

    // 按供应商优先级尝试，失败自动降级到 EdgeTTS
    try {
      switch (provider) {
        case 'cosyvoice':
          return await this._cosyvoice(text, opts);
        case 'openai':
          return await this._openaiTts(text, opts);
        case 'aliyun':
          return await this._aliyunTts(text, opts);
      }
    } catch (err: any) {
      console.warn(`[tts-client] ${provider} failed: ${err.message}, falling back to EdgeTTS`);
    }

    // EdgeTTS 作为默认/降级方案
    return await this._edgeTts(text, opts);
  }

  // ============================================================
  // OpenAI TTS API
  // ============================================================

  private async _openaiTts(text: string, opts: TtsOptions): Promise<TtsResult> {
    const apiKey = process.env.LLM_API_KEY || '';
    const baseUrl = process.env.LLM_BASE_URL || 'https://api.openai.com/v1';
    const model = process.env.TTS_OPENAI_MODEL || 'tts-1';
    const voice = process.env.TTS_OPENAI_VOICE || 'alloy';
    if (!apiKey) throw new Error('LLM_API_KEY required for OpenAI TTS');

    const audioId = uuid();
    const outputPath = opts.outputPath ||
      path.resolve(process.cwd(), this.outputDir, 'audio', `${audioId}.mp3`);

    const response = await axios.post(
      `${baseUrl}/audio/speech`,
      { model, voice, input: text, response_format: 'mp3', speed: opts.speed || 1.0 },
      {
        headers: { 'Authorization': `Bearer ${apiKey}`, 'Content-Type': 'application/json' },
        responseType: 'arraybuffer',
        timeout: 30000,
      }
    );

    fs.writeFileSync(outputPath, Buffer.from(response.data));
    const duration = await this._getAudioDuration(outputPath);
    return { audioPath: outputPath, duration, provider: 'openai-tts' };
  }

  // ============================================================
  // 阿里云语音合成
  // ============================================================

  private async _aliyunTts(text: string, opts: TtsOptions): Promise<TtsResult> {
    const key = process.env.TTS_ALIYUN_KEY;
    const appkey = process.env.TTS_ALIYUN_APPKEY;
    const voice = process.env.TTS_ALIYUN_VOICE || 'siyue';
    if (!key || !appkey) throw new Error('TTS_ALIYUN_KEY and TTS_ALIYUN_APPKEY required');

    const audioId = uuid();
    const outputPath = opts.outputPath ||
      path.resolve(process.cwd(), this.outputDir, 'audio', `${audioId}.wav`);

    const response = await axios.post(
      'https://nls-gateway.cn-shanghai.aliyuncs.com/stream/v1/tts',
      {
        appkey,
        text,
        voice,
        format: 'wav',
        sample_rate: 16000,
        speed: opts.speed || 0,
      },
      {
        headers: { 'Authorization': `Bearer ${key}`, 'Content-Type': 'application/json' },
        responseType: 'arraybuffer',
        timeout: 30000,
      }
    );

    fs.writeFileSync(outputPath, Buffer.from(response.data));
    const duration = await this._getAudioDuration(outputPath);
    return { audioPath: outputPath, duration, provider: 'aliyun-tts' };
  }

  // ============================================================
  // CosyVoice2 API
  // ============================================================

  private async _cosyvoice(text: string, opts: TtsOptions): Promise<TtsResult> {
    const audioId = uuid();
    const outputPath = opts.outputPath ||
      path.resolve(process.cwd(), this.outputDir, 'audio', `${audioId}.wav`);

    const response = await axios.post(
      `${this.cosyvoiceUrl}/api/tts`,
      {
        text,
        voice: opts.voice || '中文女',
        speed: opts.speed || 1.0,
        emotion: opts.emotion || 'neutral',
        output_format: 'wav',
      },
      {
        headers: this.cosyvoiceKey ? { 'Authorization': `Bearer ${this.cosyvoiceKey}` } : {},
        responseType: 'arraybuffer',
        timeout: 30000,
      }
    );

    fs.writeFileSync(outputPath, Buffer.from(response.data));

    // 获取时长（通过ffprobe）
    const duration = await this._getAudioDuration(outputPath);

    return { audioPath: outputPath, duration, provider: 'cosyvoice' };
  }

  // ============================================================
  // EdgeTTS（通过 edge-tts Python 包或 PowerShell SAPI 降级）
  // ============================================================

  private async _edgeTts(text: string, opts: TtsOptions): Promise<TtsResult> {
    const audioId = uuid();
    const outputPath = opts.outputPath ||
      path.resolve(process.cwd(), this.outputDir, 'audio', `${audioId}.mp3`);

    const voiceName = EDGE_VOICES[opts.voice || 'default'] || EDGE_VOICES['default'];

    // 尝试方法1：edge-tts Python 包
    // edge-tts 7.x 的 rate 格式为 +0%（相对值），1.0倍速=+0%
    const speedDelta = Math.round((opts.speed || 1.0 - 1.0) * 100);
    const rateStr = `${speedDelta >= 0 ? '+' : ''}${speedDelta}%`;
    try {
      const { stderr } = await execAsync(
        `edge-tts --voice "${voiceName}" --text "${this._escapeText(text)}" --write-media "${outputPath}" --rate "${rateStr}"`,
        { timeout: 30000 }
      );
      if (fs.existsSync(outputPath) && fs.statSync(outputPath).size > 0) {
        const duration = await this._getAudioDuration(outputPath);
        return { audioPath: outputPath, duration, provider: 'edge-tts' };
      }
      throw new Error('edge-tts produced empty file');
    } catch (pyErr: any) {
      // 方法2：Windows SAPI 降级
      if (process.platform === 'win32') {
        return await this._windowsSapi(text, outputPath, opts);
      }
      throw new Error(`EdgeTTS failed: ${pyErr.message}. Install with: pip install edge-tts`);
    }
  }

  // ============================================================
  // Windows SAPI 降级（最终兜底）
  // ============================================================

  private async _windowsSapi(text: string, outputPath: string, opts: TtsOptions): Promise<TtsResult> {
    const psScript = `
      Add-Type -AssemblyName System.Speech
      $synth = New-Object System.Speech.Synthesis.SpeechSynthesizer
      $synth.Rate = [Math]::Max(-5, [Math]::Min(5, [int]((${opts.speed || 1.0} - 1.0) * 5)))
      $synth.SetOutputToWaveFile("${outputPath.replace(/\\/g, '\\\\')}")
      $synth.Speak("${this._escapeText(text)}")
      $synth.Dispose()
    `;

    await execAsync(`powershell -Command "${psScript}"`, { timeout: 30000 });

    if (!fs.existsSync(outputPath)) {
      throw new Error('Windows SAPI TTS failed');
    }

    const duration = await this._getAudioDuration(outputPath);
    return { audioPath: outputPath, duration, provider: 'windows-sapi' };
  }

  // ============================================================
  // 工具方法
  // ============================================================

  private async _getAudioDuration(filePath: string): Promise<number> {
    try {
      const { stdout } = await execAsync(
        `ffprobe -v quiet -show_entries format=duration -of csv=p=0 "${filePath}"`,
        { timeout: 5000 }
      );
      return parseFloat(stdout.trim()) || 3;
    } catch {
      return 3; // 默认3秒
    }
  }

  private async _generateSilence(outputPath?: string): Promise<TtsResult> {
    const audioId = uuid();
    const p = outputPath ||
      path.resolve(process.cwd(), this.outputDir, 'audio', `${audioId}.wav`);
    await execAsync(`ffmpeg -y -f lavfi -i anullsrc=channel_layout=mono:sample_rate=22000 -t 1 "${p}"`, { timeout: 5000 });
    return { audioPath: p, duration: 1, provider: 'silence' };
  }

  private _escapeText(text: string): string {
    return text.replace(/"/g, '\\"').replace(/\n/g, ' ').replace(/\r/g, '');
  }

  // ============================================================
  // 健康检查
  // ============================================================

  async healthCheck(): Promise<{ provider: string; available: boolean }> {
    if (this.provider === 'cosyvoice') {
      try {
        const res = await axios.get(`${this.cosyvoiceUrl}/api/health`, { timeout: 5000 });
        return { provider: 'cosyvoice', available: res.status === 200 };
      } catch {
        return { provider: 'cosyvoice', available: false };
      }
    }
    // EdgeTTS: 检查 edge-tts 命令是否可用
    try {
      await execAsync('edge-tts --help', { timeout: 5000 });
      return { provider: 'edge-tts', available: true };
    } catch {
      if (process.platform === 'win32') {
        return { provider: 'windows-sapi', available: true };
      }
      return { provider: 'edge-tts', available: false };
    }
  }
}
