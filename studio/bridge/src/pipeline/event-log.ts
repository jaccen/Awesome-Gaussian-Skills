/**
 * Pipeline Event Log — append-only JSONL 事件日志
 *
 * 借鉴 DSH Session Log 模式：每个任务一个 JSONL 文件，记录所有事件。
 * 支持：
 *   - 断点续做：进程重启后从日志恢复任务状态
 *   - 任务回放：重放日志查看完整执行轨迹
 *   - 调试审计：离线分析任意步骤的输入/输出/错误
 *
 * 文件位置：{outputDir}/logs/{taskId}.jsonl
 *
 * 与内存 Map 的关系：
 *   - 内存 Map 保持为主要快速访问缓存（运行中的任务）
 *   - 事件日志为持久化真相源（断点续做 + 历史查询）
 *   - getTask() 先查内存，miss 后从日志 replay
 *   - listTasks() 合并内存 + 日盘
 */

import fs from 'fs';
import path from 'path';
import type { PipelineTask } from './types.js';

export interface LogEntry {
  timestamp: string;
  type: string;
  taskId: string;
  stepName?: string;
  progress?: number;
  message?: string;
  data?: any;
}

export class PipelineEventLog {
  private logDir: string;

  constructor(outputDir: string) {
    this.logDir = path.resolve(process.cwd(), outputDir, 'logs');
    if (!fs.existsSync(this.logDir)) {
      fs.mkdirSync(this.logDir, { recursive: true });
    }
  }

  /** 追加事件到任务的 JSONL 日志 */
  append(entry: LogEntry): void {
    const filePath = path.join(this.logDir, `${entry.taskId}.jsonl`);
    const line = JSON.stringify(entry) + '\n';
    try {
      fs.appendFileSync(filePath, line, 'utf-8');
    } catch (err: any) {
      console.error(`[event-log] Failed to append to ${filePath}: ${err.message}`);
    }
  }

  /** 读取任务的所有日志条目 */
  read(taskId: string): LogEntry[] {
    const filePath = path.join(this.logDir, `${taskId}.jsonl`);
    if (!fs.existsSync(filePath)) return [];

    const content = fs.readFileSync(filePath, 'utf-8');
    return content
      .split('\n')
      .filter((line) => line.trim())
      .map((line) => {
        try {
          return JSON.parse(line) as LogEntry;
        } catch {
          return null;
        }
      })
      .filter((e): e is LogEntry => e !== null);
  }

  /** 重放日志重建任务状态 */
  replay(taskId: string): PipelineTask | null {
    const entries = this.read(taskId);
    if (entries.length === 0) return null;

    let task: PipelineTask | null = null;

    for (const entry of entries) {
      task = this._applyEntry(task, entry);
    }

    return task;
  }

  /** 将单条日志应用到任务状态 */
  private _applyEntry(task: PipelineTask | null, entry: LogEntry): PipelineTask | null {
    switch (entry.type) {
      case 'task_created':
        return {
          id: entry.taskId,
          input: entry.data?.input,
          status: 'pending',
          progress: 0,
          currentStep: '',
          steps: entry.data?.steps || [],
          createdAt: entry.timestamp,
          updatedAt: entry.timestamp,
        };

      case 'step_started':
        if (task) {
          const step = task.steps.find((s) => s.name === entry.stepName);
          if (step) {
            step.status = 'running';
            step.startedAt = entry.timestamp;
          }
          task.currentStep = entry.stepName || '';
          task.updatedAt = entry.timestamp;
        }
        break;

      case 'step_progress':
        if (task) {
          const step = task.steps.find((s) => s.name === entry.stepName);
          if (step) {
            step.progress = entry.progress ?? step.progress;
          }
          task.updatedAt = entry.timestamp;
        }
        break;

      case 'step_completed':
        if (task) {
          const step = task.steps.find((s) => s.name === entry.stepName);
          if (step) {
            if (entry.message?.startsWith('Skipped:')) {
              step.status = 'skipped';
              step.error = entry.message;
            } else {
              step.status = 'completed';
            }
            step.progress = entry.progress ?? 100;
            step.completedAt = entry.timestamp;
          }
          task.updatedAt = entry.timestamp;
          const done = task.steps.filter(
            (s) => s.status === 'completed' || s.status === 'skipped',
          ).length;
          task.progress = Math.round((done / task.steps.length) * 100);
        }
        break;

      case 'step_failed':
        if (task) {
          const step = task.steps.find((s) => s.name === entry.stepName);
          if (step) {
            step.status = 'failed';
            step.error = entry.message;
          }
          task.updatedAt = entry.timestamp;
        }
        break;

      case 'step_output':
        if (task && entry.data) {
          const step = task.steps.find((s) => s.name === entry.stepName);
          if (step) {
            step.output = entry.data;
          }
        }
        break;

      case 'task_completed':
        if (task) {
          task.status = 'completed';
          task.progress = 100;
          task.output = entry.data?.output;
          task.updatedAt = entry.timestamp;
        }
        break;

      case 'task_failed':
        if (task) {
          task.status = 'failed';
          task.error = entry.message;
          task.updatedAt = entry.timestamp;
        }
        break;
    }

    return task;
  }

  /** 列出所有磁盘上的任务 ID */
  listTaskIds(): string[] {
    if (!fs.existsSync(this.logDir)) return [];
    return fs
      .readdirSync(this.logDir)
      .filter((f) => f.endsWith('.jsonl'))
      .map((f) => f.replace('.jsonl', ''));
  }

  /** 获取日志文件路径 */
  getLogPath(taskId: string): string {
    return path.join(this.logDir, `${taskId}.jsonl`);
  }

  /** 检查任务日志是否存在 */
  hasLog(taskId: string): boolean {
    return fs.existsSync(this.getLogPath(taskId));
  }

  /** 列出所有可恢复的任务（已完成或失败的） */
  listResumableTaskIds(): string[] {
    return this.listTaskIds().filter((id) => {
      const task = this.replay(id);
      return task && (task.status === 'completed' || task.status === 'failed');
    });
  }
}
