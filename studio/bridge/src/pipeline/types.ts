/**
 * Pipeline 类型定义 — 文稿→视频 端到端生产管线
 *
 * 数据流：
 *   输入文稿 → LLM剧本改编 → 智能分镜 → Toonflow集成
 *   → TTS配音 → 视频驱动 → FFmpeg合成 → 成片
 */

// ============================================================
// 管线状态
// ============================================================

export type PipelineStatus = 'pending' | 'running' | 'completed' | 'failed' | 'cancelled';

export type StepStatus = 'pending' | 'running' | 'completed' | 'failed' | 'skipped';

export interface PipelineStep {
  name: string;
  label: string;
  status: StepStatus;
  progress: number;        // 0-100
  startedAt?: string;
  completedAt?: string;
  error?: string;
  output?: any;
}

// ============================================================
// 管线输入
// ============================================================

export interface PipelineInput {
  text: string;              // 原始文稿（小说/剧本/大纲）
  title?: string;            // 标题
  style: ArtStyle;           // 画风
  videoRatio: VideoRatio;   // 画面比例
  voiceMode: VoiceMode;     // 配音模式
  language: string;          // 语言
  toonflowProjectId?: string; // 已有Toonflow项目ID（可选）
  enableVideoGen: boolean;    // 是否启用图→视频驱动
  enableTTS: boolean;         // 是否启用TTS配音
  // --- MPT 扩展字段 ---
  /** 是否启用 MPT 作为最终降级（当 3DGS/Toonflow/视频驱动全失败时，用 MPT 在线素材生成完整视频） */
  enableMptFallback?: boolean;
  /** 是否启用 MPT TTS 作为额外 TTS 选项（扩展现有 CosyVoice2→Edge→SAPI 降级链） */
  enableMptTTS?: boolean;
  /** MPT TTS 音色名称（如 azure-XiaoxiaoNeural / elevenlabs-xxx） */
  mptVoiceName?: string;
  /** 跨平台发布配置——完成视频后自动发布到指定平台 */
  publishPlatforms?: MptPublishPlatform[];
}

// MPT 跨平台发布配置
export interface MptPublishPlatform {
  name: 'tiktok' | 'instagram' | 'youtube';
  title: string;
  description?: string;
  tags?: string[];
  isShort?: boolean;
}

export type ArtStyle = '写实' | '国漫' | '日漫' | '美漫' | '水彩' | '3D写实';

export type VideoRatio = '16:9' | '9:16' | '1:1';

export type VoiceMode = 'narration' | 'dialogue' | 'narration+dialogue';

// ============================================================
// 分镜数据
// ============================================================

export interface SceneData {
  index: number;            // 分镜序号
  sceneDesc: string;        // 场景描述
  location: string;         // 场景地点
  timeOfDay: string;        // 时间段
  mood: string;             // 氛围
  cameraAngle: string;      // 镜头角度
  characters: CharacterRef[]; // 出场角色
  dialogue: string;         // 对白
  narration: string;       // 旁白
  duration: number;         // 时长（秒）
  imagePrompt: string;      // 图片生成提示词
  videoPrompt: string;      // 视频驱动提示词
  // 运行时填充
  imagePath?: string;       // 生成的图片路径
  audioPath?: string;        // 生成的音频路径
  videoPath?: string;        // 生成的视频片段路径
}

export interface CharacterRef {
  name: string;              // 角色名
  role: string;              // 角色定位
  description: string;       // 外貌描述
  voiceId?: string;          // 声音ID（TTS用）
}

// ============================================================
// 管线输出
// ============================================================

export interface PipelineOutput {
  script: string;            // 改编后的剧本
  characters: CharacterRef[]; // 角色列表
  scenes: SceneData[];       // 分镜数据
  toonflowProjectId?: string;
  toonflowScriptId?: number;
  toonflowStoryboardIds?: number[];
  finalVideoPath?: string;   // 最终视频路径
  finalVideoUrl?: string;    // 最终视频URL
  subtitlePath?: string;     // 字幕文件路径
  thumbnailUrl?: string;     // 缩略图URL
  durationSec?: number;      // 总时长（秒）
  // --- MPT 扩展字段 ---
  /** MPT 任务 ID（若使用了 MPT 降级） */
  mptTaskId?: string;
  /** MPT 生成的视频是否替代了 Studio 原生管线 */
  mptFallbackUsed?: boolean;
  /** 跨平台发布结果 */
  publishResults?: MptPublishResult[];
}

// MPT 跨平台发布结果
export interface MptPublishResult {
  platform: string;
  success: boolean;
  url?: string;
  error?: string;
}

// ============================================================
// 管线任务
// ============================================================

export interface PipelineTask {
  id: string;
  input: PipelineInput;
  status: PipelineStatus;
  progress: number;          // 0-100（整体进度）
  currentStep: string;      // 当前执行步骤
  steps: PipelineStep[];
  output?: PipelineOutput;
  error?: string;
  createdAt: string;
  updatedAt: string;
}

// ============================================================
// 管线事件（SSE推送）
// ============================================================

export interface PipelineEvent {
  type: 'task_created' | 'step_started' | 'step_progress' | 'step_completed' | 'step_failed' | 'task_completed' | 'task_failed' | 'log';
  taskId: string;
  stepName?: string;
  progress?: number;
  message?: string;
  data?: any;
  timestamp: string;
}

// ============================================================
// 风格预设
// ============================================================

export interface StylePreset {
  id: string;
  label: string;
  artStyle: ArtStyle;
  imagePromptSuffix: string;  // 图片prompt后缀
  videoPromptSuffix: string;  // 视频prompt后缀
  description: string;
}

export const STYLE_PRESETS: StylePreset[] = [
  {
    id: 'realistic',
    label: '写实',
    artStyle: '写实',
    imagePromptSuffix: 'realistic style, cinematic lighting, high detail, 8K, professional photography',
    videoPromptSuffix: 'cinematic camera movement, smooth motion',
    description: '写实电影风格，适合现代短剧',
  },
  {
    id: 'guoman',
    label: '国漫',
    artStyle: '国漫',
    imagePromptSuffix: 'Chinese anime style, ink wash painting influence, vibrant colors, detailed line art',
    videoPromptSuffix: 'dynamic camera, anime-style motion',
    description: '中国风动漫，适合玄幻/武侠短剧',
  },
  {
    id: 'riman',
    label: '日漫',
    artStyle: '日漫',
    imagePromptSuffix: 'Japanese anime style, cel shading, bright colors, detailed eyes, studio Ghibli inspired',
    videoPromptSuffix: 'anime camera movement, expressive motion',
    description: '日式动漫风格，适合青春/校园短剧',
  },
  {
    id: 'meiman',
    label: '美漫',
    artStyle: '美漫',
    imagePromptSuffix: 'American comic style, bold outlines, dramatic shading, Marvel/DC inspired',
    videoPromptSuffix: 'dynamic comic-style camera, dramatic motion',
    description: '美式漫画风格，适合超级英雄/动作短剧',
  },
  {
    id: 'watercolor',
    label: '水彩',
    artStyle: '水彩',
    imagePromptSuffix: 'watercolor painting style, soft edges, pastel colors, artistic, dreamy atmosphere',
    videoPromptSuffix: 'gentle camera movement, watercolor animation style',
    description: '水彩绘本风格，适合童话/治愈短剧',
  },
  {
    id: '3drealistic',
    label: '3D写实',
    artStyle: '3D写实',
    imagePromptSuffix: '3D render, photorealistic, octane render, ray tracing, volumetric lighting',
    videoPromptSuffix: 'smooth 3D camera movement, realistic physics',
    description: '3D渲染写实风格，适合科幻/现代短剧',
  },
];
