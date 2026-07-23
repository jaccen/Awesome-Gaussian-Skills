/**
 * Type definitions for the 3DGS MCP Renderer Server.
 * All scene state, tool inputs/outputs, and renderer messages are defined here.
 */

// ---------------------------------------------------------------------------
// Core Scene Types
// ---------------------------------------------------------------------------

export interface Gaussian {
  id: number;
  position: [number, number, number];
  scale: [number, number, number];
  rotation: [number, number, number, number]; // quaternion [w, x, y, z]
  color: [number, number, number]; // RGB [0, 1]
  opacity: number; // [0, 1]
  semanticLabel?: string;
  partName?: string; // For articulated objects
}

export interface CameraState {
  position: [number, number, number];
  target: [number, number, number];
  fov: number;
  up: [number, number, number];
}

export interface BoundingBox {
  min: [number, number, number];
  max: [number, number, number];
}

export interface Scene {
  id: string;
  source: string;
  format: 'ply' | 'splat' | 'spz' | 'ksplat';
  gaussians: Gaussian[];
  camera: CameraState;
  bbox: BoundingBox;
  segmentation: Map<string, number[]>; // label -> gaussian IDs
  metadata: SceneMetadata;
  createdAt: number;
}

export interface SceneMetadata {
  method?: string; // Source method (e.g., '3DGS', 'Mip-Splatting')
  frameCount?: number; // For dynamic scenes
  isDynamic: boolean;
  isArticulated: boolean;
  hasPBR: boolean;
  compressionRatio?: number;
}

// ---------------------------------------------------------------------------
// Tool I/O Types
// ---------------------------------------------------------------------------

export interface ToolResult {
  content: { type: 'text'; text: string }[];
  isError?: boolean;
}

export interface RenderResult {
  image: string; // base64 encoded
  renderTimeMs: number;
  width: number;
  height: number;
}

export interface QueryResult {
  [key: string]: unknown;
}

// ---------------------------------------------------------------------------
// Renderer Bridge Messages
// ---------------------------------------------------------------------------

export type RendererMessage =
  | { type: 'load_scene'; sceneId: string; source: string; format: string }
  | { type: 'set_camera'; position: number[]; target: number[]; fov: number; up: number[] }
  | { type: 'modify_gaussians'; select: GaussianSelection; operations: GaussianOperation[] }
  | { type: 'render'; width: number; height: number; format: string; background: string }
  | { type: 'query_scene'; queryType: string; point?: number[] }
  | { type: 'set_stereoscopic'; enabled: boolean; ipd: number; sharedCompute: boolean; outputMode: string }
  | { type: 'export'; format: string; outputPath: string }
  | { type: 'ping' };

export type RendererResponse =
  | { type: 'render_result'; image: string; renderTimeMs: number; width: number; height: number }
  | { type: 'query_result'; data: QueryResult }
  | { type: 'scene_loaded'; sceneId: string; gaussianCount: number; bbox: BoundingBox }
  | { type: 'error'; message: string }
  | { type: 'pong' };

export interface GaussianSelection {
  ids?: number[];
  region?: { center: number[]; radius: number };
  label?: string;
}

export interface GaussianOperation {
  property: 'opacity' | 'color' | 'position' | 'scale' | 'rotation';
  action: 'set' | 'add' | 'multiply';
  value: number | number[];
}

// ---------------------------------------------------------------------------
// Voice Intent Types
// ---------------------------------------------------------------------------

export interface VoiceIntentRule {
  pattern: RegExp;
  intent: string;
  toolCalls: VoiceToolCall[];
  description: string;
}

export interface VoiceToolCall {
  tool: string;
  params: Record<string, unknown>;
}

export interface VoiceIntentResult {
  matched: boolean;
  intent: string;
  toolCalls: VoiceToolCall[];
  description: string;
  rawText: string;
}
