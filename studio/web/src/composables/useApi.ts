import axios from 'axios';

const api = axios.create({ baseURL: '/api', timeout: 30000 });

export interface HealthStatus {
  status: string;
  mcp: boolean;
  toonflow: string;
  version: string;
}

export interface RenderTaskInfo {
  id: string;
  storyboardId: string;
  projectId: string;
  status: string;
  progress: number;
  outputType: string;
  outputUrl?: string;
  error?: string;
}

export interface RenderBatchInfo {
  id: string;
  projectId: string;
  scriptId: string;
  status: string;
  tasks: RenderTaskInfo[];
}

export async function getHealth(): Promise<HealthStatus> {
  const res = await api.get('/health');
  return res.data;
}

export async function connectMcp(): Promise<{ connected: boolean }> {
  const res = await api.post('/mcp/connect');
  return res.data;
}

export async function getMcpStatus(): Promise<{ connected: boolean }> {
  const res = await api.get('/mcp/status');
  return res.data;
}

export async function listMcpTools(): Promise<{ tools: any[] }> {
  const res = await api.get('/mcp/tools');
  return res.data;
}

export async function callMcpTool(toolName: string, args: Record<string, unknown>): Promise<any> {
  const res = await api.post('/mcp/call', { toolName, args });
  return res.data.result;
}

export async function renderDirect(params: {
  sceneDescription: string;
  sceneFile?: string;
  cameraSpec?: any;
  renderConfig?: any;
}): Promise<any> {
  const res = await api.post('/render/direct', params);
  return res.data;
}

export async function renderBatch(params: {
  projectId: string;
  storyboardIds: string[];
  renderConfig?: any;
}): Promise<{ batch: RenderBatchInfo }> {
  const res = await api.post('/render/batch', params);
  return res.data;
}

export async function listTasks(projectId?: string): Promise<{ tasks: RenderTaskInfo[] }> {
  const res = await api.get('/render/tasks', { params: { projectId } });
  return res.data;
}

export async function listBatches(projectId?: string): Promise<{ batches: RenderBatchInfo[] }> {
  const res = await api.get('/render/batches', { params: { projectId } });
  return res.data;
}

export async function getToonflowProjects(): Promise<any> {
  const res = await api.get('/toonflow/projects');
  return res.data;
}

export async function getToonflowStoryboards(projectId: string): Promise<any> {
  const res = await api.post(`/toonflow/projects/${projectId}/storyboards`, {});
  return res.data;
}

export interface SceneFileInfo {
  name: string;
  format: string;
  size: number;
  sizeMB: number;
  modified: string;
  path: string;
}

export async function listSceneFiles(): Promise<{ scenes: SceneFileInfo[]; directory: string }> {
  const res = await api.get('/scenes');
  return res.data;
}

// ============================================================
// Pipeline API（文稿→视频 端到端生产）
// ============================================================

export interface StylePresetInfo {
  id: string;
  label: string;
  artStyle: string;
  description: string;
}

export interface PipelineTaskInfo {
  id: string;
  status: 'pending' | 'running' | 'completed' | 'failed' | 'cancelled';
  progress: number;
  currentStep: string;
  steps: Array<{
    name: string;
    label: string;
    status: 'pending' | 'running' | 'completed' | 'failed' | 'skipped';
    progress: number;
    error?: string;
  }>;
  output?: {
    script: string;
    characters: any[];
    scenes: any[];
    finalVideoUrl?: string;
    durationSec?: number;
  };
  error?: string;
  createdAt: string;
  updatedAt: string;
}

export async function getPipelineHealth(): Promise<any> {
  const res = await api.get('/pipeline/health');
  return res.data;
}

export async function getPipelineStyles(): Promise<{ styles: StylePresetInfo[] }> {
  const res = await api.get('/pipeline/styles');
  return res.data;
}

export async function createPipelineTask(params: {
  text: string;
  title?: string;
  style?: string;
  videoRatio?: string;
  voiceMode?: string;
  enableVideoGen?: boolean;
  enableTTS?: boolean;
}): Promise<{ task: PipelineTaskInfo }> {
  const res = await api.post('/pipeline/tasks', params, { timeout: 60000 });
  return res.data;
}

export async function listPipelineTasks(): Promise<{ tasks: PipelineTaskInfo[] }> {
  const res = await api.get('/pipeline/tasks');
  return res.data;
}

export async function getPipelineTask(taskId: string): Promise<{ task: PipelineTaskInfo }> {
  const res = await api.get(`/pipeline/tasks/${taskId}`);
  return res.data;
}

// ============================================================
// Pipeline Config API
// ============================================================

export interface PipelineConfig {
  llm: {
    apiKey: string;
    apiKeySet: boolean;
    baseUrl: string;
    model: string;
  };
  tts: {
    provider: string;
    cosyvoiceUrl: string;
    cosyvoiceKeySet: boolean;
  };
  asr: {
    provider: string;
    whisperModel: string;
    whisperDevice: string;
  };
  videoGen: {
    provider: string;
    seedanceKeySet: boolean;
    seedanceBaseUrl: string;
  };
  ffmpeg: {
    path: string;
  };
}

export async function getPipelineConfig(): Promise<PipelineConfig> {
  const res = await api.get('/pipeline/config');
  return res.data;
}

export async function savePipelineConfig(config: Partial<PipelineConfig>): Promise<{ success: boolean; message: string; requiresRestart: boolean }> {
  const res = await api.post('/pipeline/config', config, { timeout: 10000 });
  return res.data;
}
