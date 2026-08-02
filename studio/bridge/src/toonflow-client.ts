/**
 * toonflow-bridge — Toonflow API Client
 *
 * 连接 Toonflow 短剧引擎（端口 10588），提供：
 *   1. 项目/脚本/分镜 CRUD
 *   2. 资产生成与查询
 *   3. 渲染任务提交与轮询
 *
 * Toonflow 数据流：Text → Script → Assets → Storyboard → Video
 *
 * 认证：Toonflow 使用 JWT token（Bearer）鉴权。
 * 默认凭据 admin/admin123，可通过 TOONFLOW_USER/TOONFLOW_PASS 环境变量覆盖。
 */

import axios, { type AxiosInstance } from 'axios';
import type {
  ToonflowStoryboard,
  ToonflowAsset,
} from './types.js';

export interface ToonflowClientOptions {
  baseUrl?: string;
  timeout?: number;
  username?: string;
  password?: string;
}

export class ToonflowClient {
  private http: AxiosInstance;
  private baseUrl: string;
  private username: string;
  private password: string;
  private token: string = '';
  private tokenExpiry: number = 0; // ms timestamp

  constructor(opts: ToonflowClientOptions = {}) {
    this.baseUrl = opts.baseUrl || process.env.TOONFLOW_URL || 'http://localhost:10588';
    this.username = opts.username || process.env.TOONFLOW_USER || 'admin';
    this.password = opts.password || process.env.TOONFLOW_PASS || 'admin123';
    this.http = axios.create({
      baseURL: this.baseUrl,
      timeout: opts.timeout || 30000,
      headers: { 'Content-Type': 'application/json' },
    });

    // Auto-inject JWT token on every request
    this.http.interceptors.request.use(async (config) => {
      if (!this.token || Date.now() >= this.tokenExpiry) {
        await this.login();
      }
      if (this.token) {
        config.headers.Authorization = this.token;
      }
      return config;
    });
  }

  // ============================================================
  // 认证
  // ============================================================

  private async login(): Promise<void> {
    try {
      const res = await axios.post(`${this.baseUrl}/api/login/login`, {
        username: this.username,
        password: this.password,
      }, { timeout: 10000 });

      const data = res.data?.data;
      if (data?.token) {
        this.token = data.token; // Already includes "Bearer " prefix
        // JWT expiry is 180 days; refresh 1 day before expiry
        this.tokenExpiry = Date.now() + 179 * 24 * 60 * 60 * 1000;
        console.error(`[toonflow-client] Login success, token acquired (user: ${data.name})`);
      } else {
        console.error('[toonflow-client] Login response missing token:', JSON.stringify(res.data));
      }
    } catch (err: any) {
      console.error(`[toonflow-client] Login failed: ${err.message}`);
      this.token = '';
      this.tokenExpiry = 0;
    }
  }

  // ============================================================
  // 健康检查
  // ============================================================

  async healthCheck(): Promise<boolean> {
    try {
      // Try login as health check — if credentials work, Toonflow is up
      await this.login();
      return !!this.token;
    } catch {
      return false;
    }
  }

  // ============================================================
  // 项目管理
  // ============================================================

  async listProjects(): Promise<any[]> {
    const res = await this.http.post('/api/project/getProject');
    return res.data?.data || res.data || [];
  }

  async getProject(projectId: string | number): Promise<any> {
    const res = await this.http.post('/api/general/getSingleProject', { id: projectId });
    return res.data?.data || res.data;
  }

  async createProject(opts: {
    name: string;
    projectType?: string;
    intro?: string;
    type?: string;
    artStyle?: string;
    directorManual?: string;
    videoRatio?: string;
    imageModel?: string;
    videoModel?: string;
    imageQuality?: string;
    mode?: string;
  }): Promise<any> {
    const res = await this.http.post('/api/project/addProject', {
      projectType: opts.projectType || 'video',
      name: opts.name,
      intro: opts.intro || '',
      type: opts.type || '短剧',
      artStyle: opts.artStyle || '写实',
      directorManual: opts.directorManual || '',
      videoRatio: opts.videoRatio || '16:9',
      imageModel: opts.imageModel || '',
      videoModel: opts.videoModel || '',
      imageQuality: opts.imageQuality || 'standard',
      mode: opts.mode || 'storyboard',
    });
    return res.data;
  }

  async editProject(projectId: string | number, opts: {
    name?: string;
    intro?: string;
    type?: string;
    artStyle?: string;
    videoRatio?: string;
    projectType?: string;
  }): Promise<any> {
    const res = await this.http.post('/api/general/updateProject', {
      id: Number(projectId),
      ...opts,
    });
    return res.data;
  }

  async deleteProject(projectId: string | number): Promise<any> {
    const res = await this.http.post('/api/project/delProject', { id: Number(projectId) });
    return res.data;
  }

  // ============================================================
  // 脚本 / 分镜
  // ============================================================

  async getScript(projectId: string): Promise<any> {
    // Toonflow scripts are managed internally; this fetches general stats
    const res = await this.http.post('/api/general/generalStatistics', { projectId: Number(projectId) });
    return res.data?.data || res.data;
  }

  async getStoryboards(projectId: string | number, scriptId?: string | number): Promise<ToonflowStoryboard[]> {
    // If scriptId is known, fetch storyboard data directly
    if (scriptId) {
      const res = await this.http.post('/api/production/getStoryboardData', {
        scriptId: Number(scriptId),
        projectId: Number(projectId),
      });
      return res.data?.data || res.data || [];
    }
    // No scriptId — fetch scripts list and use the first one
    try {
      const scripts = await this.getScripts(Number(projectId));
      if (scripts && scripts.length > 0) {
        const firstScriptId = scripts[0].id;
        const res = await this.http.post('/api/production/getStoryboardData', {
          scriptId: Number(firstScriptId),
          projectId: Number(projectId),
        });
        return res.data?.data || res.data || [];
      }
    } catch {
      // fall through
    }
    return [];
  }

  async getStoryboard(storyboardId: string | number): Promise<any> {
    // Toonflow doesn't have a single-storyboard GET; use getStoryboards with scriptId
    // and filter by id. Caller should cache scriptId for efficiency.
    throw new Error('Single storyboard fetch not supported by Toonflow API. Use getStoryboards(projectId, scriptId) and filter client-side.');
  }

  async editStoryboardInfo(storyboardId: string | number, prompt: string, videoDesc: string): Promise<any> {
    const res = await this.http.post('/api/production/storyboard/editStoryboardInfo', {
      id: Number(storyboardId),
      prompt,
      videoDesc,
    });
    return res.data;
  }

  async updateStoryboardUrl(storyboardId: string | number, url: string, flowId: number): Promise<any> {
    const res = await this.http.post('/api/production/storyboard/updateStoryboardUrl', {
      id: Number(storyboardId),
      url,
      flowId,
    });
    return res.data;
  }

  async updateStoryboard(storyboardId: string | number, data: { prompt?: string; videoDesc?: string; url?: string; flowId?: number }): Promise<any> {
    // Convenience: dispatch to appropriate update endpoint based on provided fields
    if (data.prompt !== undefined && data.videoDesc !== undefined) {
      return this.editStoryboardInfo(storyboardId, data.prompt, data.videoDesc);
    }
    if (data.url !== undefined && data.flowId !== undefined) {
      return this.updateStoryboardUrl(storyboardId, data.url, data.flowId);
    }
    throw new Error('updateStoryboard requires either {prompt, videoDesc} or {url, flowId}');
  }

  async addStoryboard(opts: {
    scriptId: number;
    projectId: number;
    prompt: string;
    videoDesc: string;
    duration?: number;
    src?: string | null;
  }): Promise<any> {
    const res = await this.http.post('/api/production/storyboard/addStoryboard', {
      prompt: opts.prompt,
      duration: opts.duration || 3,
      state: '未生成',
      videoDesc: opts.videoDesc,
      shouldGenerateImage: opts.src ? 1 : 0,
      src: opts.src || null,
      scriptId: opts.scriptId,
      projectId: opts.projectId,
    });
    return res.data;
  }

  async batchAddStoryboards(scriptId: number, projectId: number, items: Array<{
    prompt: string;
    videoDesc: string;
    duration?: number;
    track?: string;
    src?: string | null;
    associateAssetsIds?: number[];
  }>): Promise<any> {
    const data = items.map(item => ({
      prompt: item.prompt,
      duration: item.duration || 3,
      track: item.track || '默认',
      state: '未生成',
      src: item.src || null,
      videoDesc: item.videoDesc,
      shouldGenerateImage: item.src ? 1 : 0,
      associateAssetsIds: item.associateAssetsIds || [],
    }));
    const res = await this.http.post('/api/production/storyboard/batchAddStoryboardInfo', {
      scriptId,
      projectId,
      data,
    });
    return res.data;
  }

  async batchGenerateImages(storyboardIds: number[], projectId: number, scriptId: number, concurrentCount?: number): Promise<any> {
    const res = await this.http.post('/api/production/storyboard/batchGenerateImage', {
      storyboardIds,
      projectId,
      scriptId,
      concurrentCount: concurrentCount || 5,
    });
    return res.data;
  }

  async deleteStoryboards(ids: number[], projectId: number): Promise<any> {
    const res = await this.http.post('/api/production/storyboard/batchDelete', { ids, projectId });
    return res.data;
  }

  // ============================================================
  // 脚本管理
  // ============================================================

  async getScripts(projectId: string | number, name?: string): Promise<any[]> {
    const body: Record<string, any> = { projectId: Number(projectId) };
    if (name) body.name = name;
    const res = await this.http.post('/api/script/getScrptApi', body);
    return res.data?.data || res.data || [];
  }

  async addScript(opts: { name: string; content: string; projectId: number; assets?: number[] }): Promise<any> {
    const res = await this.http.post('/api/script/addScript', {
      name: opts.name,
      content: opts.content,
      projectId: opts.projectId,
      assets: opts.assets || [],
    });
    return res.data;
  }

  async updateScript(opts: { id: number; name: string; content: string; assets?: number[] }): Promise<any> {
    const res = await this.http.post('/api/script/updateScript', {
      id: opts.id,
      name: opts.name,
      content: opts.content,
      assets: opts.assets || [],
    });
    return res.data;
  }

  async deleteScripts(ids: number[]): Promise<any> {
    const res = await this.http.post('/api/script/delScript', { ids });
    return res.data;
  }

  // ============================================================
  // Flow Data (完整脚本+资产+分镜)
  // ============================================================

  async getFlowData(projectId: number, scriptId: number): Promise<any> {
    const res = await this.http.post('/api/production/getFlowData', {
      projectId,
      episodesId: scriptId,
    });
    return res.data?.data || res.data;
  }

  // ============================================================
  // 资产管理
  // ============================================================

  async getAssets(projectId: string | number, type?: string): Promise<ToonflowAsset[]> {
    const body: Record<string, any> = {
      projectId: Number(projectId),
      page: 1,
      limit: 200,
    };
    if (type) body.type = type;
    const res = await this.http.post('/api/assets/getAssetsApi', body);
    return res.data?.data || res.data || [];
  }

  async getAsset(assetId: string): Promise<ToonflowAsset> {
    const res = await this.http.post('/api/assets/getAssetsApi', { id: Number(assetId) });
    return res.data?.data || res.data;
  }

  async generateAsset(projectId: string, asset: Partial<ToonflowAsset>): Promise<any> {
    const res = await this.http.post(`/api/assets/generate/${projectId}`, asset);
    return res.data?.data || res.data;
  }

  // ============================================================
  // 渲染任务
  // ============================================================

  async startRender(projectId: string, storyboardIds?: string[]): Promise<any> {
    const body = storyboardIds ? { storyboardIds } : {};
    const res = await this.http.post(`/api/video/render/${projectId}`, body);
    return res.data?.data || res.data;
  }

  async getRenderStatus(projectId: string): Promise<any> {
    const res = await this.http.get(`/api/video/status/${projectId}`);
    return res.data?.data || res.data;
  }

  async getVideo(projectId: string, videoId: string): Promise<any> {
    const res = await this.http.get(`/api/video/${projectId}/${videoId}`);
    return res.data?.data || res.data;
  }

  // ============================================================
  // Skill 触发（3DGS 渲染 Skill）
  // ============================================================

  async triggerSkill(projectId: string, skillName: string, params: Record<string, any>): Promise<any> {
    const res = await this.http.post(`/api/skill/trigger/${projectId}`, {
      skillName,
      params,
    });
    return res.data?.data || res.data;
  }

  // ============================================================
  // 工具方法
  // ============================================================

  getBaseUrl(): string {
    return this.baseUrl;
  }
}
