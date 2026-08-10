/**
 * Pipeline REST API 路由
 *
 * 挂载到 render-server 的 /api/pipeline/* 路径下
 *
 * 端点：
 *   GET  /api/pipeline/health          — 健康检查（各模块可用性）
 *   GET  /api/pipeline/config          — 读取当前配置
 *   POST /api/pipeline/config          — 保存配置（写入 .env）
 *   POST /api/pipeline/tasks           — 创建管线任务（文稿→视频）
 *   GET  /api/pipeline/tasks           — 列出所有任务
 *   GET  /api/pipeline/tasks/:taskId   — 查询任务状态
 *   GET  /api/pipeline/styles          — 获取风格预设列表
 *   GET  /api/pipeline/files/:filename  — 获取输出文件
 */

import express from 'express';
import path from 'path';
import fs from 'fs';
import type { Request, Response } from 'express';
import { PipelineManager } from './pipeline/orchestrator.js';
import type { PipelineInput } from './pipeline/types.js';
import { STYLE_PRESETS } from './pipeline/types.js';

export function createPipelineRouter(pipelineManager: PipelineManager, outputDir: string): express.Router {
  const router = express.Router();

  // ----------------------------------------------------------
  // 健康检查
  // ----------------------------------------------------------
  router.get('/health', async (_req: Request, res: Response) => {
    try {
      const status = await pipelineManager.healthCheck();
      res.json({ status: 'ok', services: status });
    } catch (err: any) {
      res.json({ status: 'error', error: err.message });
    }
  });

  // ----------------------------------------------------------
  // 配置读取（GET /api/pipeline/config）
  // ----------------------------------------------------------
  router.get('/config', (_req: Request, res: Response) => {
    try {
      // 从环境变量读取当前配置（Key 做脱敏处理）
      const maskKey = (key: string) => {
        if (!key) return '';
        if (key.length <= 8) return key.slice(0, 2) + '***';
        return key.slice(0, 4) + '****' + key.slice(-4);
      };

      res.json({
        llm: {
          apiKey: maskKey(process.env.LLM_API_KEY || ''),
          apiKeySet: !!process.env.LLM_API_KEY,
          baseUrl: process.env.LLM_BASE_URL || 'https://api.deepseek.com/v1',
          model: process.env.LLM_MODEL || 'deepseek-chat',
        },
        tts: {
          provider: process.env.TTS_PROVIDER || 'edge',
          cosyvoiceUrl: process.env.COSYVOICE_URL || 'http://localhost:5000',
          cosyvoiceKeySet: !!process.env.COSYVOICE_API_KEY,
        },
        asr: {
          provider: process.env.ASR_PROVIDER || 'skip',
          whisperModel: process.env.ASR_WHISPER_MODEL || 'base',
          whisperDevice: process.env.ASR_WHISPER_DEVICE || 'cpu',
        },
        videoGen: {
          provider: process.env.VIDEO_GEN_PROVIDER || 'skip',
          seedanceKeySet: !!process.env.SEEDANCE_API_KEY,
          seedanceBaseUrl: process.env.SEEDANCE_BASE_URL || 'https://api.seedance.ai/v1',
        },
        ffmpeg: {
          path: process.env.FFMPEG_PATH || 'ffmpeg',
        },
      });
    } catch (err: any) {
      res.status(500).json({ error: err.message });
    }
  });

  // ----------------------------------------------------------
  // 配置保存（POST /api/pipeline/config）
  // 写入 .env 文件，需要手动重启服务生效
  // ----------------------------------------------------------
  router.post('/config', (req: Request, res: Response) => {
    try {
      const body = req.body || {};
      const envPath = path.resolve(process.cwd(), '.env');

      // 读取现有 .env 内容（如果存在）
      let envContent = '';
      if (fs.existsSync(envPath)) {
        envContent = fs.readFileSync(envPath, 'utf-8');
      }

      // 构建要更新/新增的键值对
      const updates: Record<string, string> = {};

      // LLM
      if (body.llm) {
        if (body.llm.apiKey !== undefined && body.llm.apiKey !== '') {
          // 如果是脱敏格式（含****），不更新
          if (!body.llm.apiKey.includes('****')) {
            updates['LLM_API_KEY'] = body.llm.apiKey;
          }
        }
        if (body.llm.baseUrl) updates['LLM_BASE_URL'] = body.llm.baseUrl;
        if (body.llm.model) updates['LLM_MODEL'] = body.llm.model;
      }

      // TTS
      if (body.tts) {
        if (body.tts.provider) updates['TTS_PROVIDER'] = body.tts.provider;
        if (body.tts.cosyvoiceUrl) updates['COSYVOICE_URL'] = body.tts.cosyvoiceUrl;
        if (body.tts.cosyvoiceApiKey && !body.tts.cosyvoiceApiKey.includes('****')) {
          updates['COSYVOICE_API_KEY'] = body.tts.cosyvoiceApiKey;
        }
      }

      // ASR
      if (body.asr) {
        if (body.asr.provider) updates['ASR_PROVIDER'] = body.asr.provider;
        if (body.asr.whisperModel) updates['ASR_WHISPER_MODEL'] = body.asr.whisperModel;
        if (body.asr.whisperDevice) updates['ASR_WHISPER_DEVICE'] = body.asr.whisperDevice;
      }

      // VideoGen
      if (body.videoGen) {
        if (body.videoGen.provider) updates['VIDEO_GEN_PROVIDER'] = body.videoGen.provider;
        if (body.videoGen.seedanceApiKey && !body.videoGen.seedanceApiKey.includes('****')) {
          updates['SEEDANCE_API_KEY'] = body.videoGen.seedanceApiKey;
        }
        if (body.videoGen.seedanceBaseUrl) updates['SEEDANCE_BASE_URL'] = body.videoGen.seedanceBaseUrl;
      }

      // FFmpeg
      if (body.ffmpeg && body.ffmpeg.path) {
        updates['FFMPEG_PATH'] = body.ffmpeg.path;
      }

      // 逐行更新 .env 内容
      const lines = envContent.split('\n');
      const updatedKeys = new Set<string>();

      for (let i = 0; i < lines.length; i++) {
        const line = lines[i].trim();
        // 跳过注释和空行
        if (line.startsWith('#') || line === '') continue;
        // 解析 KEY=VALUE
        const eqIdx = line.indexOf('=');
        if (eqIdx < 0) continue;
        const key = line.substring(0, eqIdx).trim();
        if (updates[key] !== undefined) {
          lines[i] = `${key}=${updates[key]}`;
          updatedKeys.add(key);
        }
      }

      // 添加 .env 中不存在的键
      const newLines: string[] = [];
      if (updatedKeys.size < Object.keys(updates).length) {
        newLines.push('');
        newLines.push('# --- Pipeline config (added via UI) ---');
        for (const [key, value] of Object.entries(updates)) {
          if (!updatedKeys.has(key)) {
            newLines.push(`${key}=${value}`);
          }
        }
      }

      const newContent = lines.join('\n') + (newLines.length > 0 ? '\n' + newLines.join('\n') : '');
      fs.writeFileSync(envPath, newContent, 'utf-8');

      res.json({
        success: true,
        message: '配置已保存到 .env 文件。需要重启服务生效。',
        updatedKeys: Object.keys(updates),
        requiresRestart: true,
      });
    } catch (err: any) {
      res.status(500).json({ error: err.message });
    }
  });

  // ----------------------------------------------------------
  // 风格预设
  // ----------------------------------------------------------
  router.get('/styles', (_req: Request, res: Response) => {
    res.json({ styles: STYLE_PRESETS });
  });

  // ----------------------------------------------------------
  // 创建任务
  // ----------------------------------------------------------
  router.post('/tasks', (req: Request, res: Response) => {
    try {
      const body = req.body || {};
      // P2修复：布尔强转防 "false" 字符串误判
      const input: PipelineInput = {
        text: String(body.text || ''),
        title: body.title ? String(body.title).slice(0, 200) : undefined,
        style: body.style || '写实',
        // P2修复：videoRatio 白名单校验
        videoRatio: ['16:9', '9:16', '1:1'].includes(body.videoRatio) ? body.videoRatio : '16:9',
        voiceMode: body.voiceMode || 'narration+dialogue',
        language: body.language || 'zh-CN',
        toonflowProjectId: body.toonflowProjectId,
        enableVideoGen: body.enableVideoGen !== false,
        enableTTS: body.enableTTS !== false,
      };

      if (!input.text || input.text.trim().length < 10) {
        res.status(400).json({ error: '文稿内容至少 10 个字' });
        return;
      }

      if (input.text.length > 20000) {
        res.status(400).json({ error: '文稿不能超过 20000 字' });
        return;
      }

      const task = pipelineManager.createTask(input);
      res.json({ task });
    } catch (err: any) {
      res.status(500).json({ error: err.message });
    }
  });

  // ----------------------------------------------------------
  // 列出任务
  // ----------------------------------------------------------
  router.get('/tasks', (_req: Request, res: Response) => {
    const tasks = pipelineManager.listTasks();
    res.json({ tasks });
  });

  // ----------------------------------------------------------
  // 查询任务状态
  // ----------------------------------------------------------
  router.get('/tasks/:taskId', (req: Request, res: Response) => {
    const taskId = req.params.taskId as string;
    const task = pipelineManager.getTask(taskId);
    if (!task) {
      res.status(404).json({ error: 'Task not found' });
      return;
    }
    res.json({ task });
  });

  // ----------------------------------------------------------
  // 文件服务（输出视频/图片/字幕）
  // ----------------------------------------------------------
  router.get('/files/:filename', (req: Request, res: Response) => {
    try {
      const filename = req.params.filename as string;
      const absOutputDir = path.resolve(process.cwd(), outputDir);
      const filePath = path.resolve(absOutputDir, filename);

      // 安全：防止路径穿越（Windows 大小写不敏感比较）
      const normalizedAbs = path.normalize(absOutputDir).toLowerCase();
      const normalizedFile = path.normalize(filePath).toLowerCase();
      if (!normalizedFile.startsWith(normalizedAbs + path.sep) && normalizedFile !== normalizedAbs) {
        res.status(403).json({ error: '路径访问被拒绝' });
        return;
      }

      // 安全：文件名只允许字母数字点下划线横杠
      if (!/^[a-zA-Z0-9._-]+$/.test(filename)) {
        res.status(400).json({ error: '非法文件名' });
        return;
      }

      if (!fs.existsSync(filePath)) {
        res.status(404).json({ error: '文件不存在' });
        return;
      }

      const ext = filename.split('.').pop()?.toLowerCase();
      const contentType =
        ext === 'mp4' ? 'video/mp4' :
        ext === 'png' ? 'image/png' :
        ext === 'jpg' || ext === 'jpeg' ? 'image/jpeg' :
        ext === 'webp' ? 'image/webp' :
        ext === 'srt' ? 'application/x-subrip' :
        ext === 'wav' ? 'audio/wav' :
        ext === 'mp3' ? 'audio/mpeg' :
        'application/octet-stream';

      res.setHeader('Content-Type', contentType);
      res.setHeader('Access-Control-Allow-Origin', '*');
      res.setHeader('Cache-Control', 'public, max-age=3600');

      const stream = fs.createReadStream(filePath);
      stream.pipe(res);
      stream.on('error', () => {
        if (!res.headersSent) res.status(500).json({ error: 'Stream error' });
      });
    } catch (err: any) {
      res.status(500).json({ error: err.message });
    }
  });

  return router;
}
