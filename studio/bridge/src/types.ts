/**
 * toonflow-bridge — Type Definitions
 */

// ============================================================
// Toonflow → Bridge
// ============================================================

export interface ToonflowStoryboard {
  id: string;
  scriptId: string;
  projectId: string;
  videoDesc: string;
  prompt: string;
  duration: number;
  track: string;
  associateAssetsIds: string[];
  shouldGenerateImage: boolean;
  filePath?: string;
}

export interface ToonflowAsset {
  id: string;
  name: string;
  type: 'role' | 'scene' | 'tool' | 'clip' | 'derive';
  prompt: string;
  describe: string;
  assetsId?: string;
  imageId?: string;
  filePath?: string;
}

export interface ToonflowScriptPlan {
  scenes: ToonflowScene[];
  totalDuration: number;
  styleNotes: string;
}

export interface ToonflowScene {
  sceneIndex: number;
  location: string;
  timeOfDay: string;
  mood: string;
  cameraAngle: string;
  characters: string[];
  action: string;
}

// ============================================================
// Bridge → 3DGS MCP
// ============================================================

export interface GsSceneRequest {
  storyboardId: string;
  projectId: string;
  sceneDescription: string;
  cameraSpec: GsCameraSpec;
  assets: GsAssetMapping[];
  renderConfig: GsRenderConfig;
}

export interface GsCameraSpec {
  position: { x: number; y: number; z: number };
  target: { x: number; y: number; z: number };
  fov: number;
  keyframes?: GsCameraKeyframe[];
}

export interface GsCameraKeyframe {
  time: number;
  position: { x: number; y: number; z: number };
  target: { x: number; y: number; z: number };
}

export interface GsAssetMapping {
  assetId: string;
  assetType: 'character' | 'environment' | 'prop';
  gsModelPath?: string;
  gsModelUrl?: string;
  position?: { x: number; y: number; z: number };
  rotation?: { x: number; y: number; z: number };
  scale?: number;
  articulation?: {
    jointName: string;
    angle: number;
    keyframes?: { time: number; angle: number }[];
  }[];
}

export interface GsRenderConfig {
  width: number;
  height: number;
  fps: number;
  duration: number;
  format: 'png_sequence' | 'mp4' | 'webm';
  quality: 'draft' | 'preview' | 'final';
  splatScale?: number;
  opacityThreshold?: number;
  backgroundColor?: { r: number; g: number; b: number };
}

// ============================================================
// Render Task
// ============================================================

export type RenderTaskStatus =
  | 'queued'
  | 'connecting'
  | 'scene_building'
  | 'camera_setting'
  | 'rendering'
  | 'compositing'
  | 'completed'
  | 'failed';

export interface RenderTask {
  id: string;
  storyboardId: string;
  projectId: string;
  status: RenderTaskStatus;
  progress: number;
  outputType: 'image' | 'video';
  outputUrl?: string;
  outputThumbnail?: string;
  error?: string;
  createdAt: string;
  updatedAt: string;
}

export interface RenderBatch {
  id: string;
  projectId: string;
  scriptId: string;
  tasks: RenderTask[];
  status: 'pending' | 'processing' | 'completed' | 'partial' | 'failed';
  compositeVideoUrl?: string;
}

// ============================================================
// SSE Event
// ============================================================

export interface RenderEvent {
  type: 'task_update' | 'batch_update' | 'log';
  taskId?: string;
  batchId?: string;
  data: any;
  timestamp: string;
}
