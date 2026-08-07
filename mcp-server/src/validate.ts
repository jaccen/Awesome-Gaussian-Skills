/**
 * Lightweight runtime argument validation for MCP tool handlers.
 * Zero dependencies — every tool handler validates its inputs through
 * these helpers instead of blind `as` casts.
 */

import { createRequire } from 'module';
const _require = createRequire(import.meta.url);

export class ValidationError extends Error {
  constructor(message: string) {
    super(message);
    this.name = 'ValidationError';
  }
}

export function asString(args: Record<string, unknown>, key: string, opts: { required?: boolean; pattern?: RegExp; enum?: string[] } = {}): string | undefined {
  const v = args[key];
  if (v === undefined || v === null || v === '') {
    if (opts.required) throw new ValidationError(`Missing required string argument "${key}"`);
    return undefined;
  }
  if (typeof v !== 'string') throw new ValidationError(`Argument "${key}" must be a string, got ${typeof v}`);
  if (opts.pattern && !opts.pattern.test(v)) throw new ValidationError(`Argument "${key}" has invalid format: ${v}`);
  if (opts.enum && !opts.enum.includes(v)) throw new ValidationError(`Argument "${key}" must be one of [${opts.enum.join(', ')}], got "${v}"`);
  return v;
}

export function asNumber(args: Record<string, unknown>, key: string, opts: { required?: boolean; min?: number; max?: number; default?: number } = {}): number | undefined {
  let v = args[key];
  if (v === undefined || v === null) {
    if (opts.default !== undefined) return opts.default;
    if (opts.required) throw new ValidationError(`Missing required number argument "${key}"`);
    return undefined;
  }
  if (typeof v !== 'number' || Number.isNaN(v)) throw new ValidationError(`Argument "${key}" must be a finite number`);
  if (opts.min !== undefined && v < opts.min) throw new ValidationError(`Argument "${key}" must be >= ${opts.min}, got ${v}`);
  if (opts.max !== undefined && v > opts.max) throw new ValidationError(`Argument "${key}" must be <= ${opts.max}, got ${v}`);
  return v;
}

export function asBool(args: Record<string, unknown>, key: string, opts: { default?: boolean } = {}): boolean {
  const v = args[key];
  if (v === undefined || v === null) return opts.default ?? false;
  if (typeof v !== 'boolean') throw new ValidationError(`Argument "${key}" must be a boolean`);
  return v;
}

export function asVec3(args: Record<string, unknown>, key: string, opts: { required?: boolean } = {}): [number, number, number] | undefined {
  const v = args[key];
  if (v === undefined || v === null) {
    if (opts.required) throw new ValidationError(`Missing required vec3 argument "${key}"`);
    return undefined;
  }
  if (!Array.isArray(v) || v.length !== 3 || v.some((x) => typeof x !== 'number' || Number.isNaN(x))) {
    throw new ValidationError(`Argument "${key}" must be a numeric [x, y, z] array`);
  }
  return [v[0], v[1], v[2]];
}

export function asNumberArray(args: Record<string, unknown>, key: string, opts: { required?: boolean; length?: number } = {}): number[] | undefined {
  const v = args[key];
  if (v === undefined || v === null) {
    if (opts.required) throw new ValidationError(`Missing required array argument "${key}"`);
    return undefined;
  }
  if (!Array.isArray(v) || v.some((x) => typeof x !== 'number' || Number.isNaN(x))) {
    throw new ValidationError(`Argument "${key}" must be a numeric array`);
  }
  if (opts.length !== undefined && v.length !== opts.length) {
    throw new ValidationError(`Argument "${key}" must have length ${opts.length}, got ${v.length}`);
  }
  return v as number[];
}

export function asRecord(args: Record<string, unknown>, key: string, opts: { required?: boolean } = {}): Record<string, unknown> | undefined {
  const v = args[key];
  if (v === undefined || v === null) {
    if (opts.required) throw new ValidationError(`Missing required object argument "${key}"`);
    return undefined;
  }
  if (typeof v !== 'object' || Array.isArray(v)) throw new ValidationError(`Argument "${key}" must be an object`);
  return v as Record<string, unknown>;
}

/** Restrict file paths to a whitelist of allowed root directories (anti path-traversal). */
export function resolveSafePath(rawPath: string, allowedRoots: string[]): string {
  const path = _require('path') as typeof import('path');
  const resolved = path.resolve(rawPath);
  for (const root of allowedRoots) {
    const rootResolved = path.resolve(root);
    if (resolved === rootResolved || resolved.startsWith(rootResolved + path.sep)) {
      return resolved;
    }
  }
  throw new ValidationError(`Path "${rawPath}" is outside allowed directories: ${allowedRoots.join(', ')}`);
}
