/**
 * Pipeline Config — 管线配置外部化
 *
 * 借鉴 DSH Profile/Bundle 分层配置模式：
 *   pipeline.yml (base) → pipeline.local.yml (user override) → 代码内默认
 *
 * 将管线步骤组合和降级策略从代码中提取到 YAML 配置，
 * 支持分层覆盖，无需改代码即可调整管线行为。
 */

import fs from 'fs';
import path from 'path';
import { parse } from 'yaml';

// ============================================================
// 配置类型定义
// ============================================================

export interface StepConfig {
  name: string;
  label: string;
  enabled: boolean;
  /** 条件表达式，在 PipelineInput 上下文中求值，决定步骤是否执行 */
  condition?: string;
}

export interface StrategyProviderConfig {
  name: string;
  /** 条件表达式，在 PipelineInput 上下文中求值，决定该 provider 是否可用 */
  condition?: string;
}

export interface StrategyConfig {
  providers: StrategyProviderConfig[];
}

export interface PipelineConfig {
  steps: StepConfig[];
  strategies: {
    tts: StrategyConfig;
    video: StrategyConfig;
    compose: StrategyConfig;
  };
}

// ============================================================
// 默认配置（与原硬编码逻辑一致）
// ============================================================

export const DEFAULT_PIPELINE_CONFIG: PipelineConfig = {
  steps: [
    { name: 'script_adaptation', label: '剧本改编', enabled: true },
    { name: 'storyboard', label: '智能分镜', enabled: true },
    {
      name: 'toonflow_sync',
      label: 'Toonflow集成',
      enabled: true,
      condition: 'toonflowProjectId || process.env.TOONFLOW_URL',
    },
    { name: 'tts', label: 'TTS配音', enabled: true, condition: 'enableTTS' },
    { name: 'video_gen', label: '视频驱动', enabled: true },
    { name: 'compose', label: 'FFmpeg合成', enabled: true },
    {
      name: 'publish',
      label: '跨平台发布',
      enabled: true,
      condition: 'publishPlatforms && publishPlatforms.length > 0',
    },
  ],
  strategies: {
    tts: {
      providers: [
        { name: 'studio-native' },
        { name: 'mpt', condition: 'enableMptTTS' },
      ],
    },
    video: {
      providers: [
        { name: 'video-gen', condition: 'enableVideoGen' },
        { name: 'ken-burns' },
        { name: 'mpt-full', condition: 'enableMptFallback' },
      ],
    },
    compose: {
      providers: [
        { name: 'ffmpeg' },
        { name: 'mpt-full', condition: 'enableMptFallback' },
      ],
    },
  },
};

// ============================================================
// 配置加载（分层覆盖）
// ============================================================

let cachedConfig: PipelineConfig | null = null;

/**
 * 加载管线配置。分层优先级：
 *   1. pipeline.local.yml（用户覆盖，应 gitignore）
 *   2. pipeline.yml（项目默认）
 *   3. DEFAULT_PIPELINE_CONFIG（代码内兜底）
 */
export function loadPipelineConfig(): PipelineConfig {
  if (cachedConfig) return cachedConfig;

  let config = DEFAULT_PIPELINE_CONFIG;

  // 尝试加载 pipeline.yml
  const basePath = path.resolve(process.cwd(), 'pipeline.yml');
  if (fs.existsSync(basePath)) {
    try {
      const content = fs.readFileSync(basePath, 'utf-8');
      const parsed = parse(content) as Partial<PipelineConfig>;
      config = mergeConfig(config, parsed);
    } catch (err: any) {
      console.warn(`[pipeline-config] Failed to parse pipeline.yml: ${err.message}, using defaults`);
    }
  }

  // 尝试加载 pipeline.local.yml（用户覆盖）
  const localPath = path.resolve(process.cwd(), 'pipeline.local.yml');
  if (fs.existsSync(localPath)) {
    try {
      const content = fs.readFileSync(localPath, 'utf-8');
      const parsed = parse(content) as Partial<PipelineConfig>;
      config = mergeConfig(config, parsed);
    } catch (err: any) {
      console.warn(`[pipeline-config] Failed to parse pipeline.local.yml: ${err.message}`);
    }
  }

  cachedConfig = config;
  return config;
}

/** 强制重新加载配置（用于配置更新后） */
export function reloadPipelineConfig(): PipelineConfig {
  cachedConfig = null;
  return loadPipelineConfig();
}

// ============================================================
// 配置合并
// ============================================================

function mergeConfig(base: PipelineConfig, overlay: Partial<PipelineConfig>): PipelineConfig {
  return {
    steps: overlay.steps || base.steps,
    strategies: {
      tts: overlay.strategies?.tts || base.strategies.tts,
      video: overlay.strategies?.video || base.strategies.video,
      compose: overlay.strategies?.compose || base.strategies.compose,
    },
  };
}

// ============================================================
// 条件求值
// ============================================================

/**
 * 在 PipelineInput 上下文中求值条件表达式。
 * 安全性：仅从本地 YAML 配置加载，不接受用户输入。
 */
export function evaluateCondition(
  expr: string,
  context: Record<string, any>,
): boolean {
  try {
    const keys = Object.keys(context);
    const fn = new Function('process', ...keys, `"use strict"; return (${expr});`);
    return fn(process, ...Object.values(context)) === true;
  } catch {
    return false;
  }
}

/**
 * 检查步骤是否应该执行（enabled + condition）
 */
export function shouldRunStep(step: StepConfig, context: Record<string, any>): boolean {
  if (!step.enabled) return false;
  if (!step.condition) return true;
  return evaluateCondition(step.condition, context);
}

/**
 * 检查策略 provider 是否可用（condition 满足）
 */
export function isProviderAvailable(
  provider: StrategyProviderConfig,
  context: Record<string, any>,
): boolean {
  if (!provider.condition) return true;
  return evaluateCondition(provider.condition, context);
}
