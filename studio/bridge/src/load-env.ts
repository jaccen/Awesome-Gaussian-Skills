/**
 * load-env — 零依赖 .env 加载器
 *
 * SplatVerse Studio 的 pipeline 配置通过 POST /api/pipeline/config 写入
 * process.cwd()/.env，但 bridge 此前从不读取该文件，导致 UI 保存的配置
 * （如 MoneyPrinterTurbo 集成）在重启后仍不生效。
 *
 * 本模块在 bridge 启动时被 render-server.ts 顶层调用：
 *   - 优先读取 process.cwd()/.env（与 pipeline-routes 的写入位置一致）
 *   - 若不存在则向父目录逐级查找（覆盖从 studio/bridge 等子目录启动的情况）
 *   - 只填充未定义的变量，绝不覆盖启动时显式传入的环境变量
 */

import fs from 'fs';
import path from 'path';

export function loadEnvFile(): string {
  const candidates: string[] = [];

  // 1) 当前工作目录
  candidates.push(path.resolve(process.cwd(), '.env'));

  // 2) 向上逐级查找，直到文件系统根
  let dir = process.cwd();
  for (let i = 0; i < 10; i++) {
    const parent = path.dirname(dir);
    if (parent === dir) break;
    dir = parent;
    candidates.push(path.resolve(dir, '.env'));
  }

  for (const file of candidates) {
    if (!fs.existsSync(file)) continue;

    let content: string;
    try {
      content = fs.readFileSync(file, 'utf8');
    } catch {
      continue;
    }

    for (const rawLine of content.split(/\r?\n/)) {
      const line = rawLine.replace(/^\uFEFF/, '').trim();
      if (!line || line.startsWith('#')) continue;

      const eq = line.indexOf('=');
      if (eq <= 0) continue;

      const key = line.slice(0, eq).trim();
      let value = line.slice(eq + 1).trim();

      // 去除成对引号
      if (
        (value.startsWith('"') && value.endsWith('"')) ||
        (value.startsWith("'") && value.endsWith("'"))
      ) {
        value = value.slice(1, -1);
      }

      // 不覆盖已存在的环境变量（显式注入优先）
      if (process.env[key] === undefined) {
        process.env[key] = value;
      }
    }

    return file;
  }

  return '';
}