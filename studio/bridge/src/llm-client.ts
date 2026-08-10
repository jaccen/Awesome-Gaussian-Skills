/**
 * LLM 客户端 — 剧本改编 + 智能分镜
 *
 * 通过 OpenAI 兼容 API（DeepSeek/OpenAI 等）实现：
 *   1. adaptScript() — 原始文稿→结构化剧本
 *   2. generateStoryboard() — 剧本→分镜列表
 *   3. generateImagePrompt() — 分镜→图片生成提示词
 *
 * 配置：
 *   LLM_API_KEY, LLM_BASE_URL, LLM_MODEL 环境变量
 */

import axios from 'axios';
import type { SceneData, CharacterRef, ArtStyle, StylePreset } from './pipeline/types.js';

export interface LlmClientOptions {
  apiKey?: string;
  baseUrl?: string;
  model?: string;
  timeout?: number;
}

export interface AdaptedScript {
  title: string;
  synopsis: string;
  characters: CharacterRef[];
  acts: ScriptAct[];
}

export interface ScriptAct {
  actName: string;
  scenes: {
    sceneDesc: string;
    location: string;
    timeOfDay: string;
    mood: string;
    cameraAngle: string;
    characters: string[];
    dialogue: string;
    narration: string;
    duration: number;
  }[];
}

export class LlmClient {
  private apiKey: string;
  private baseUrl: string;
  private model: string;
  private timeout: number;

  constructor(opts: LlmClientOptions = {}) {
    this.apiKey = opts.apiKey || process.env.LLM_API_KEY || '';
    this.baseUrl = opts.baseUrl || process.env.LLM_BASE_URL || 'https://api.deepseek.com/v1';
    this.model = opts.model || process.env.LLM_MODEL || 'deepseek-chat';
    this.timeout = opts.timeout || 60000;
    if (!this.apiKey) {
      console.warn('[llm-client] WARNING: LLM_API_KEY not set — script adaptation will fail.');
    }
  }

  // ============================================================
  // 底层调用
  // ============================================================

  private async chat(messages: Array<{ role: string; content: string }>, jsonMode = false): Promise<string> {
    if (!this.apiKey) throw new Error('LLM_API_KEY not configured');

    const response = await axios.post(
      `${this.baseUrl}/chat/completions`,
      {
        model: this.model,
        messages,
        temperature: 0.7,
        max_tokens: 8192,
        ...(jsonMode ? { response_format: { type: 'json_object' } } : {}),
      },
      {
        headers: { 'Authorization': `Bearer ${this.apiKey}`, 'Content-Type': 'application/json' },
        timeout: this.timeout,
      }
    );

    const content = response.data?.choices?.[0]?.message?.content;
    if (!content) throw new Error('LLM returned empty response');
    return content;
  }

  // ============================================================
  // 剧本改编
  // ============================================================

  async adaptScript(text: string, style: ArtStyle): Promise<AdaptedScript> {
    const systemPrompt = `你是一位专业的短剧编剧。请将用户提供的文稿改编为适合${style}风格动画短剧的结构化剧本。

要求：
1. 将文稿拆分为多个幕（Act），每幕包含多个场景
2. 每个场景包含：场景描述、地点、时间段、氛围、镜头角度、出场角色、对白、旁白、时长
3. 提取所有角色，包含角色名、定位、外貌描述
4. 对白要自然口语化，旁白用于补充背景信息
5. 每个场景时长3-8秒，总时长控制在60-120秒

请以JSON格式返回，结构如下：
{
  "title": "短剧标题",
  "synopsis": "剧情简介（100字内）",
  "characters": [{"name":"角色名","role":"主角/配角/路人","description":"外貌描述"}],
  "acts": [{"actName":"幕名","scenes":[{"sceneDesc":"场景描述","location":"地点","timeOfDay":"白天/夜晚","mood":"氛围","cameraAngle":"镜头角度","characters":["角色名"],"dialogue":"对白","narration":"旁白","duration":5}]}]
}`;

    const content = await this.chat([
      { role: 'system', content: systemPrompt },
      { role: 'user', content: `文稿内容：\n\n${text}` },
    ], true);

    try {
      const parsed = JSON.parse(content);
      return parsed as AdaptedScript;
    } catch {
      // 如果JSON解析失败，尝试从内容中提取JSON
      const jsonMatch = content.match(/\{[\s\S]*\}/);
      if (jsonMatch) {
        return JSON.parse(jsonMatch[0]) as AdaptedScript;
      }
      throw new Error('LLM script adaptation: failed to parse JSON response');
    }
  }

  // ============================================================
  // 分镜生成（从剧本→带图片/视频提示词的分镜列表）
  // ============================================================

  async generateStoryboard(
    script: AdaptedScript,
    preset: StylePreset
  ): Promise<SceneData[]> {
    const systemPrompt = `你是一位动画分镜师。请根据提供的剧本，为每个场景生成详细的分镜数据，包括图片生成提示词和视频驱动提示词。

画风：${preset.label}（${preset.artStyle}）
图片风格后缀：${preset.imagePromptSuffix}
视频风格后缀：${preset.videoPromptSuffix}

要求：
1. 为每个场景生成 imagePrompt（用于AI图片生成的英文提示词，描述画面构图、角色姿态、光影、氛围）
2. 为每个场景生成 videoPrompt（用于视频驱动的英文提示词，描述镜头运动、角色动作）
3. imagePrompt 必须包含角色外貌描述，确保角色一致性
4. 提示词末尾自动追加风格后缀

请以JSON数组格式返回，每个元素：
{
  "index": 序号,
  "sceneDesc": "场景描述",
  "location": "地点",
  "timeOfDay": "时间段",
  "mood": "氛围",
  "cameraAngle": "镜头角度",
  "characters": [{"name":"角色名","role":"角色定位","description":"外貌描述"}],
  "dialogue": "对白",
  "narration": "旁白",
  "duration": 时长秒数,
  "imagePrompt": "英文图片提示词（不含风格后缀）",
  "videoPrompt": "英文视频提示词（不含风格后缀）"
}`;

    const content = await this.chat([
      { role: 'system', content: systemPrompt },
      { role: 'user', content: `剧本：\n${JSON.stringify(script, null, 2)}` },
    ], true);

    let scenes: SceneData[];
    try {
      const parsed = JSON.parse(content);
      scenes = Array.isArray(parsed) ? parsed : (parsed.scenes || [parsed]);
    } catch {
      const jsonMatch = content.match(/\[[\s\S]*\]/);
      if (jsonMatch) {
        scenes = JSON.parse(jsonMatch[0]);
      } else {
        throw new Error('LLM storyboard: failed to parse JSON response');
      }
    }

    // 追加风格后缀到提示词
    return scenes.map(s => ({
      ...s,
      imagePrompt: `${s.imagePrompt}, ${preset.imagePromptSuffix}`,
      videoPrompt: `${s.videoPrompt}, ${preset.videoPromptSuffix}`,
    }));
  }

  // ============================================================
  // 健康检查
  // ============================================================

  async healthCheck(): Promise<boolean> {
    if (!this.apiKey) return false;
    try {
      await this.chat([
        { role: 'system', content: 'Reply with "ok".' },
        { role: 'user', content: 'health check' },
      ]);
      return true;
    } catch {
      return false;
    }
  }
}
