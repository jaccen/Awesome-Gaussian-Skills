/**
 * Fallback Chain — 降级策略对象化
 *
 * 借鉴 DSH Capability Seam 模式：定义接口 + 多实现 + 策略选择。
 * 将编排器中硬编码的降级链提取为可配置的策略对象。
 *
 * 三层降级体系：
 *   1. 客户端内部降级（不修改）：
 *      TTS: cosyvoice→openai→aliyun→edge-tts→windows-sapi
 *      Video: seedance→kling→wan-local→ken-burns→solid-color
 *   2. 编排器级降级（本模块封装）：
 *      TTS: studio-native→mpt
 *      Video: video-gen→ken-burns→mpt-full
 *      Compose: ffmpeg→mpt-full
 *   3. 管线级降级（编排器条件分支）：
 *      全部视频缺失→MPT 全量生成
 */

// ============================================================
// 泛型降级链
// ============================================================

export interface FallbackProvider<TInput, TOutput> {
  name: string;
  available: () => boolean;
  execute: (input: TInput) => Promise<TOutput>;
}

export interface FallbackResult<TOutput> {
  result: TOutput;
  provider: string;
  attempted: string[];
}

export class FallbackChain<TInput, TOutput> {
  private providers: FallbackProvider<TInput, TOutput>[] = [];
  private logger?: (message: string) => void;

  setLogger(fn: (msg: string) => void): this {
    this.logger = fn;
    return this;
  }

  add(provider: FallbackProvider<TInput, TOutput>): this {
    this.providers.push(provider);
    return this;
  }

  /** 按顺序尝试每个 provider，第一个成功即返回 */
  async execute(input: TInput): Promise<FallbackResult<TOutput>> {
    const attempted: string[] = [];

    for (const provider of this.providers) {
      const label = provider.available()
        ? provider.name
        : `${provider.name} (unavailable)`;
      attempted.push(label);

      if (!provider.available()) {
        continue;
      }

      try {
        const result = await provider.execute(input);
        return { result, provider: provider.name, attempted };
      } catch (err: any) {
        this.logger?.(`[${provider.name}] failed: ${err.message}`);
      }
    }

    throw new Error(`All providers failed: ${attempted.join(' → ')}`);
  }

  /** 获取所有 provider 名称（用于日志/展示） */
  getProviderNames(): string[] {
    return this.providers.map((p) => p.name);
  }
}

// ============================================================
// TTS 降级策略类型
// ============================================================

export interface TtsStrategyInput {
  text: string;
  voice?: string;
  outputPath?: string;
}

export interface TtsStrategyOutput {
  audioPath: string;
  duration: number;
  provider: string;
}

// ============================================================
// Video 降级策略类型
// ============================================================

export interface VideoStrategyInput {
  imagePath?: string;
  imageUrl?: string;
  prompt: string;
  duration: number;
  videoRatio?: string;
  enableVideoGen?: boolean;
}

export interface VideoStrategyOutput {
  videoPath: string;
  duration: number;
  provider: string;
}

// ============================================================
// Compose 降级策略类型
// ============================================================

export interface ComposeStrategyInput {
  videoClips: string[];
  audioFiles: string[];
  scenes: any[];
  outputDir: string;
  videoRatio?: string;
  enableSubtitles?: boolean;
}

export interface ComposeStrategyOutput {
  videoPath: string;
  videoUrl: string;
  subtitlePath?: string;
  durationSec: number;
}

// ============================================================
// MPT 全量降级策略类型（管线级别）
// ============================================================

export interface MptFullStrategyInput {
  script: string;
  terms: string;
  aspectRatio: string;
  voiceName?: string;
  onProgress?: (progress: number, message: string) => void;
}

export interface MptFullStrategyOutput {
  videoUrl?: string;
  videoPath?: string;
  taskId?: string;
  subtitleUrl?: string;
}
