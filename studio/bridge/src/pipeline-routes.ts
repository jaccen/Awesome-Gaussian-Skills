/**
 * Pipeline REST API 路由
 *
 * 挂载到 render-server 的 /api/pipeline/* 路径下
 *
 * 端点：
 *   GET  /api/pipeline/health          — 健康检查（各模块可用性）
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
      const input: PipelineInput = {
        text: body.text || '',
        title: body.title,
        style: body.style || '写实',
        videoRatio: body.videoRatio || '16:9',
        voiceMode: body.voiceMode || 'narration+dialogue',
        language: body.language || 'zh-CN',
        toonflowProjectId: body.toonflowProjectId,
        enableVideoGen: body.enableVideoGen !== false,
        enableTTS: body.enableTTS !== false,
      };

      if (!input.text || input.text.trim().length < 10) {
        res.status(400).json({ error: 'text is required and must be at least 10 characters' });
        return;
      }

      if (input.text.length > 20000) {
        res.status(400).json({ error: 'text too long (max 20000 characters)' });
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

      // 安全：防止路径穿越
      if (!filePath.startsWith(absOutputDir + path.sep) && filePath !== absOutputDir) {
        res.status(403).json({ error: 'Path traversal denied' });
        return;
      }

      if (!fs.existsSync(filePath)) {
        res.status(404).json({ error: 'File not found' });
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
