/**
 * MCP Tool Definitions & Handlers — v1.1 (SLAT Latent Editing + Cross-Scene Transfer)
 *
 * Core tools (real implementations, always listed):
 *   import_scene, set_camera, modify_gaussians, render_frame, query_scene,
 *   cast_ray, export_result, prune_by_importance, set_gaussian_density,
 *   adjust_opacity, set_rotation, query_spatial_context, resolve_voice_command,
 *   define_scene_spec, sculpt_pipeline, export_scene_code,
 *   encode_scene_slatent, edit_scene_latent, list_slatents,
 *   transfer_scene_edit, interpolate_scene_latent
 *
 * Experimental tools (schema complete, backend pending — ONLY listed when
 * INCLUDE_EXPERIMENTAL=1, and explicitly marked as unimplemented):
 *   simulate_physics, query_4d_scene, deform_elastic, bayesian_density_control,
 *   moe_deform, surgical_tracking, query_provenance, set_pbr_material,
 *   deformable_aggregate, set_stereoscopic, distractor_decompose,
 *   adaptive_tessellation, lod_switch
 */

import type { ToolResult } from './types.js';
import type { SceneState } from './scene-state.js';
import type { RendererBridge } from './renderer-bridge.js';
import { toPlyBuffer, toSplatBuffer } from './exporters.js';
import { mapVoiceIntent, listVoiceIntents } from './voice-intent.js';
import {
  ValidationError, asString, asNumber, asBool, asVec3, asNumberArray, asRecord,
} from './validate.js';
import { SceneSpecManager, SculptPipeline, generateSceneCode } from './sculpt.js';
import type { SceneSpec, SculptStage } from './sculpt.js';
import { SlatManager } from './slat.js';
import type { LatentEditOp, LatentSelector } from './slat.js';
import { createRequire } from 'module';
const _require = createRequire(import.meta.url);
const _fs = _require('fs');
const _path = _require('path');

// ---------------------------------------------------------------------------
// Context & Helpers
// ---------------------------------------------------------------------------

export interface ToolContext {
  state: SceneState;
  bridge: RendererBridge;
  /** Directories from which scenes may be imported (path whitelist). */
  sceneRoots: string[];
}

function json(data: unknown): ToolResult {
  return { content: [{ type: 'text', text: JSON.stringify(data, null, 2) }] };
}

function error(message: string): ToolResult {
  return { content: [{ type: 'text', text: `Error: ${message}` }], isError: true };
}

function stubResponse(name: string, args: Record<string, unknown>, description: string): ToolResult {
  return json({
    tool: name,
    status: 'stub',
    implemented: false,
    description,
    receivedArgs: args,
    message: 'EXPERIMENTAL: this tool is a schema-only stub. Backend integration pending — do not treat its output as real.',
  });
}

const MAX_IMPORT_BYTES = 512 * 1024 * 1024; // 512 MB hard cap for imports

function tempDir(sub: string): string {
  const dir = _path.resolve(process.cwd(), '.temp', sub);
  if (!_fs.existsSync(dir)) _fs.mkdirSync(dir, { recursive: true });
  return dir;
}

// Shared spec manager singleton for sculpt tools (persists across calls)
let _specManager: SceneSpecManager | null = null;
function getSpecManager(): SceneSpecManager {
  if (!_specManager) _specManager = new SceneSpecManager();
  return _specManager;
}

/** Serialize a SceneSpec (with Map<>) to plain JSON for tool output. */
function serializeSpec(spec: SceneSpec): Record<string, unknown> {
  const stages: Record<string, unknown> = {};
  for (const [key, value] of spec.stages) {
    stages[key] = value;
  }
  return {
    id: spec.id,
    name: spec.name,
    componentCount: spec.components.length,
    materialCount: spec.materials.length,
    qualityGates: spec.qualityGates,
    targetCoverage: spec.targetCoverage,
    minPsnr: spec.minPsnr,
    targetScore: spec.targetScore,
    sceneId: spec.sceneId,
    stages,
    createdAt: spec.createdAt,
  };
}

/** Validate a stage name string. */
function asStage(args: Record<string, unknown>): SculptStage {
  const s = asString(args, 'stage') ?? '';
  const valid: SculptStage[] = ['blockout', 'structural', 'form', 'material', 'surface', 'lighting'];
  if (!valid.includes(s as SculptStage)) {
    throw new ValidationError(`Invalid stage "${s}". Must be one of: ${valid.join(', ')}`);
  }
  return s as SculptStage;
}

// Shared SLAT snapshot manager singleton for latent-edit tools (persists across calls)
let _slatManager: SlatManager | null = null;
function getSlatManager(): SlatManager {
  if (!_slatManager) _slatManager = new SlatManager();
  return _slatManager;
}

// ---------------------------------------------------------------------------
// Tool Definition Interface
// ---------------------------------------------------------------------------

export interface MCPTool {
  name: string;
  description: string;
  inputSchema: Record<string, unknown>;
  handler: (args: Record<string, unknown>, ctx: ToolContext) => Promise<ToolResult>;
}

/** Wrap a handler so ValidationError surfaces as a proper MCP error result. */
function guarded(fn: (args: Record<string, unknown>, ctx: ToolContext) => Promise<ToolResult>): MCPTool['handler'] {
  return async (args, ctx) => {
    try {
      return await fn(args, ctx);
    } catch (err) {
      if (err instanceof ValidationError) return error(err.message);
      throw err;
    }
  };
}

/**
 * Parse a raw `op` object (snake_case MCP layer) into a typed LatentEditOp
 * (camelCase core layer). Shared by edit_scene_latent and transfer_scene_edit.
 */
function parseLatentEditOp(opRaw: Record<string, unknown>): LatentEditOp {
  const op = opRaw.op as LatentEditOp['op'];
  const validOps: LatentEditOp['op'][] = ['translate', 'scale', 'rotate', 'recolor', 'opacity', 'smooth', 'delete'];
  if (!validOps.includes(op)) {
    throw new ValidationError(`Invalid op "${op}". Must be one of: ${validOps.join(', ')}`);
  }
  const selector = (opRaw.selector ?? {}) as LatentSelector;
  if (!selector.region && !selector.bbox && !selector.part) {
    throw new ValidationError('op.selector must include at least one of region / bbox / part');
  }
  switch (op) {
    case 'translate': {
      const delta = asVec3(opRaw, 'delta', { required: true })!;
      return { op, selector, delta };
    }
    case 'scale': {
      const factor = asNumber(opRaw, 'factor', { required: true, min: 0.01, max: 100 })!;
      const origin = asVec3(opRaw, 'origin') as [number, number, number] | undefined;
      return { op, selector, factor, origin };
    }
    case 'rotate': {
      const axis = asString(opRaw, 'axis', { enum: ['x', 'y', 'z'], required: true }) as 'x' | 'y' | 'z';
      const angleDeg = asNumber(opRaw, 'angle_deg', { required: true })!;
      const origin = asVec3(opRaw, 'origin') as [number, number, number] | undefined;
      return { op, selector, axis, angleDeg, origin };
    }
    case 'recolor': {
      const color = asVec3(opRaw, 'color', { required: true })! as [number, number, number];
      const mix = asNumber(opRaw, 'mix', { default: 1, min: 0, max: 1 })!;
      return { op, selector, color, mix };
    }
    case 'opacity': {
      const opacity = asNumber(opRaw, 'opacity', { required: true, min: 0, max: 1 })!;
      const mode = (asString(opRaw, 'mode', { enum: ['set', 'multiply'] }) ?? 'set') as 'set' | 'multiply';
      return { op, selector, opacity, mode };
    }
    case 'smooth': {
      const iterations = asNumber(opRaw, 'iterations', { default: 1, min: 1, max: 8 })!;
      return { op, selector, iterations };
    }
    case 'delete':
      return { op, selector };
    default:
      throw new ValidationError(`Unhandled op "${op}"`);
  }
}

// ---------------------------------------------------------------------------
// Core Tools (Fully Implemented)
// ---------------------------------------------------------------------------

const coreTools: MCPTool[] = [
  // === Tool 1: import_scene ===
  {
    name: 'import_scene',
    description: 'Load a 3DGS scene from a PLY file into the renderer. Returns scene_id, gaussian_count, bounding box, and the URL used by the renderer. Files must live inside the configured scene directories. Parse failures are reported as errors unless allow_synthetic_fallback=true.',
    inputSchema: {
      type: 'object',
      properties: {
        source: { type: 'string', description: 'File path to .ply file (inside allowed scene dirs). Use "synthetic://sphere" for a generated test scene.' },
        format: { type: 'string', enum: ['ply', 'splat', 'spz', 'ksplat'], description: 'File format (ply supported)' },
        allow_synthetic_fallback: { type: 'boolean', default: false, description: 'If true, fall back to a synthetic scene when the file cannot be parsed. Default false (fail loudly).' },
      },
      required: ['source'],
    },
    handler: guarded(async (args, ctx) => {
      const source = asString(args, 'source', { required: true })!;
      const allowFallback = asBool(args, 'allow_synthetic_fallback', { default: false });

      // Synthetic scene for testing (explicit opt-in via URI scheme)
      if (source.startsWith('synthetic://')) {
        const result = ctx.state.generateSyntheticScene(10000);
        const scene = ctx.state.getScene(result.id)!;
        await ctx.bridge.broadcast({ type: 'load_scene', sceneId: result.id, source, format: 'ply' });
        return json({ scene_id: result.id, gaussian_count: result.gaussianCount, bbox: scene.bbox, synthetic: true });
      }

      // --- Resolve within the path whitelist ---
      let filePath: string | null = null;
      const candidates: string[] = [];
      if (_path.isAbsolute(source)) candidates.push(source);
      else {
        for (const root of ctx.sceneRoots) candidates.push(_path.resolve(root, source));
        candidates.push(_path.resolve(process.cwd(), source));
      }
      for (const c of candidates) {
        const resolved = _path.resolve(c);
        const inRoot = ctx.sceneRoots.some((r) => resolved === _path.resolve(r) || resolved.startsWith(_path.resolve(r) + _path.sep))
          || resolved.startsWith(_path.resolve(process.cwd()) + _path.sep);
        if (inRoot && _fs.existsSync(resolved)) { filePath = resolved; break; }
      }
      if (!filePath) {
        return error(`File not found or outside allowed scene directories: ${source}. Allowed roots: ${ctx.sceneRoots.join(', ')}`);
      }
      const stat = _fs.statSync(filePath);
      if (stat.size > MAX_IMPORT_BYTES) {
        return error(`File too large: ${(stat.size / 1024 / 1024).toFixed(0)} MB exceeds ${MAX_IMPORT_BYTES / 1024 / 1024} MB cap.`);
      }

      let result: { id: string; gaussianCount: number; bbox: { min: number[]; max: number[] }; sampled: boolean };
      try {
        result = ctx.state.loadFromPlyFile(filePath);
      } catch (parseErr) {
        if (!allowFallback) {
          return error(`PLY parse failed for ${source}: ${(parseErr as Error).message}. Fix the file or pass allow_synthetic_fallback=true.`);
        }
        const synth = ctx.state.generateSyntheticScene(50000);
        const scene = ctx.state.getScene(synth.id)!;
        scene.source = source;
        return json({
          scene_id: synth.id,
          gaussian_count: synth.gaussianCount,
          bbox: scene.bbox,
          synthetic: true,
          note: `Parse failed (${(parseErr as Error).message}); synthetic fallback loaded because allow_synthetic_fallback=true`,
        });
      }

      const scene = ctx.state.getScene(result.id)!;

      // Persist index so the scene survives restarts
      try { ctx.state.saveIndex(_path.resolve(process.cwd(), '.temp', 'scenes', 'index.json')); } catch { /* non-fatal */ }

      // --- True-3DGS loop: export canonical PLY and serve over HTTP ---
      const scenesDir = tempDir('scenes');
      const canonicalPath = _path.join(scenesDir, `${result.id}.ply`);
      try {
        _fs.writeFileSync(canonicalPath, toPlyBuffer(scene.gaussians));
        const url = `/scenes/${result.id}.ply`;
        const center: [number, number, number] = [
          (result.bbox.min[0] + result.bbox.max[0]) / 2,
          (result.bbox.min[1] + result.bbox.max[1]) / 2,
          (result.bbox.min[2] + result.bbox.max[2]) / 2,
        ];
        const size: [number, number, number] = [
          result.bbox.max[0] - result.bbox.min[0],
          result.bbox.max[1] - result.bbox.min[1],
          result.bbox.max[2] - result.bbox.min[2],
        ];
        await ctx.bridge.pushGaussiansUrl({ sceneId: result.id, url, format: 'ply', bboxCenter: center, bboxSize: size });
      } catch (exportErr) {
        console.error(`[import_scene] Canonical export failed (${(exportErr as Error).message}); renderer may fall back to point-cloud push.`);
      }

      return json({
        scene_id: result.id,
        gaussian_count: result.gaussianCount,
        bbox: result.bbox,
        sampled: result.sampled,
        file_path: filePath,
        renderer_url: `/scenes/${result.id}.ply`,
        renderers_connected: ctx.bridge.connectedRenderers(),
      });
    }),
  },

  // === Tool 2: set_camera ===
  {
    name: 'set_camera',
    description: 'Set camera position, target (look-at point), field of view, and up vector.',
    inputSchema: {
      type: 'object',
      properties: {
        scene_id: { type: 'string' },
        position: { type: 'array', items: { type: 'number' }, description: '[x, y, z] camera position' },
        target: { type: 'array', items: { type: 'number' }, description: '[x, y, z] look-at point' },
        fov: { type: 'number', description: 'Field of view in degrees' },
        up: { type: 'array', items: { type: 'number' }, description: '[x, y, z] up vector' },
      },
      required: ['position', 'target'],
    },
    handler: guarded(async (args, ctx) => {
      const sceneId = asString(args, 'scene_id');
      const scene = ctx.state.getScene(sceneId);
      if (!scene) return error('No active scene. Call import_scene first.');

      const position = asVec3(args, 'position', { required: true })!;
      const target = asVec3(args, 'target', { required: true })!;
      const fov = asNumber(args, 'fov', { min: 5, max: 170 });
      const up = asVec3(args, 'up');

      ctx.state.setCamera({ position, target, fov, up }, sceneId);
      await ctx.bridge.broadcast({
        type: 'set_camera',
        position: scene.camera.position,
        target: scene.camera.target,
        fov: scene.camera.fov,
        up: scene.camera.up,
      });
      return json({ status: 'ok', camera: scene.camera });
    }),
  },

  // === Tool 3: modify_gaussians ===
  {
    name: 'modify_gaussians',
    description: 'Modify properties of Gaussians by selection criteria (IDs, spherical region, or semantic label). Operations: set/add/multiply on opacity, color, position, scale, rotation. Modifications affecting more than 10% of the scene require confirm=true.',
    inputSchema: {
      type: 'object',
      properties: {
        scene_id: { type: 'string' },
        select: {
          type: 'object',
          properties: {
            ids: { type: 'array', items: { type: 'integer' }, description: 'Specific Gaussian IDs' },
            region: { type: 'object', properties: { center: { type: 'array', items: { type: 'number' } }, radius: { type: 'number' } }, description: 'Sphere selection' },
            label: { type: 'string', description: 'Semantic label from segmentation' },
          },
        },
        operations: {
          type: 'array',
          items: {
            type: 'object',
            properties: {
              property: { type: 'string', enum: ['opacity', 'color', 'position', 'scale', 'rotation'] },
              action: { type: 'string', enum: ['set', 'add', 'multiply'] },
              value: { description: 'number or numeric array matching the property' },
            },
            required: ['property', 'action', 'value'],
          },
        },
        confirm: { type: 'boolean', default: false, description: 'Required when the operation affects >10% of Gaussians' },
      },
      required: ['select', 'operations'],
    },
    handler: guarded(async (args, ctx) => {
      const sceneId = asString(args, 'scene_id');
      const scene = ctx.state.getScene(sceneId);
      if (!scene) return error('No active scene.');

      const select = asRecord(args, 'select', { required: true })!;
      const operationsRaw = args.operations;
      if (!Array.isArray(operationsRaw) || operationsRaw.length === 0) return error('"operations" must be a non-empty array');
      for (const op of operationsRaw as Array<Record<string, unknown>>) {
        if (!op || typeof op !== 'object') return error('Each operation must be an object');
        if (!['opacity', 'color', 'position', 'scale', 'rotation'].includes(String(op.property))) {
          return error(`Invalid operation property: ${String(op.property)}`);
        }
        if (!['set', 'add', 'multiply'].includes(String(op.action))) {
          return error(`Invalid operation action: ${String(op.action)}`);
        }
        if (op.value === undefined) return error('Operation "value" is required');
      }
      const operations = operationsRaw as Array<{ property: 'opacity' | 'color' | 'position' | 'scale' | 'rotation'; action: 'set' | 'add' | 'multiply'; value: number | number[] }>;

      const selected = ctx.state.selectGaussians(select as { ids?: number[]; region?: { center: number[]; radius: number }; label?: string }, sceneId);

      // Hard safety gate: >10% modifications require explicit confirmation
      const pct = scene.gaussians.length > 0 ? (selected.length / scene.gaussians.length) * 100 : 0;
      if (pct > 10 && !asBool(args, 'confirm')) {
        return error(`Operation would affect ${selected.length} of ${scene.gaussians.length} Gaussians (${pct.toFixed(1)}% > 10% threshold). Re-run with confirm=true to proceed.`);
      }

      ctx.state.applyOperations(selected, operations);
      ctx.state.invalidateSpatialIndex(scene);
      await ctx.bridge.broadcast({ type: 'modify_gaussians', select, operations });

      return json({ status: 'ok', modified_count: selected.length, total_gaussians: scene.gaussians.length, affected_pct: Number(pct.toFixed(2)) });
    }),
  },

  // === Tool 4: render_frame ===
  {
    name: 'render_frame',
    description: 'Render current scene from current camera via the connected browser renderer (real 3DGS splatting when a gsplat-capable renderer is connected). Returns a URL to the rendered image.',
    inputSchema: {
      type: 'object',
      properties: {
        scene_id: { type: 'string' },
        width: { type: 'integer', default: 1280 },
        height: { type: 'integer', default: 720 },
        format: { type: 'string', enum: ['png', 'jpeg', 'webp'], default: 'png' },
        background: { type: 'string', default: '#000000' },
      },
    },
    handler: guarded(async (args, ctx) => {
      const sceneId = asString(args, 'scene_id');
      const scene = ctx.state.getScene(sceneId);
      if (!scene) return error('No active scene.');

      const width = asNumber(args, 'width', { default: 1280, min: 16, max: 4096 })!;
      const height = asNumber(args, 'height', { default: 720, min: 16, max: 4096 })!;
      const format = asString(args, 'format', { enum: ['png', 'jpeg', 'webp'] }) ?? 'png';
      const background = asString(args, 'background') ?? '#000000';

      const response = await ctx.bridge.send({ type: 'render', width, height, format, background });

      if (response.type === 'render_result') {
        if (response.image && response.image.length > 100) {
          const renderId = `render-${Date.now()}`;
          const renderDir = tempDir('renders');
          const renderPath = _path.join(renderDir, `${renderId}.${format}`);
          const buf = Buffer.from(response.image, 'base64');
          _fs.writeFileSync(renderPath, buf);
          return json({
            image_url: `/api/renders/${renderId}.${format}`,
            local_path: renderPath,
            render_time_ms: response.renderTimeMs,
            width: response.width,
            height: response.height,
            has_image: true,
            image_size_bytes: buf.length,
            renderer: ctx.bridge.connectedRenderers(),
          });
        }
        return json({
          image: '(headless mode — no image)',
          render_time_ms: response.renderTimeMs,
          width: response.width,
          height: response.height,
          has_image: false,
          note: 'No renderer connected. Open gsplat-renderer.html (or studio web) to enable real rendering.',
        });
      }
      return error('Render failed');
    }),
  },

  // === Tool 5: query_scene ===
  {
    name: 'query_scene',
    description: 'Query scene information: statistics (gaussian count, bbox, avg opacity), bbox, gaussian_at_point, segmentation, or materials.',
    inputSchema: {
      type: 'object',
      properties: {
        scene_id: { type: 'string' },
        query_type: { type: 'string', enum: ['stats', 'bbox', 'gaussian_at_point', 'segmentation', 'materials', 'list_scenes'] },
        point: { type: 'array', items: { type: 'number' }, description: '[x, y, z] for point queries' },
      },
      required: ['query_type'],
    },
    handler: guarded(async (args, ctx) => {
      const queryType = asString(args, 'query_type', { required: true, enum: ['stats', 'bbox', 'gaussian_at_point', 'segmentation', 'materials', 'list_scenes'] })!;
      const sceneId = asString(args, 'scene_id');

      if (queryType === 'list_scenes') {
        return json({ scenes: ctx.state.listScenes(), active: ctx.state.getActiveSceneId() });
      }

      const scene = ctx.state.getScene(sceneId);
      if (!scene) return error('No active scene.');

      switch (queryType) {
        case 'stats': {
          const stats = ctx.state.getStats(sceneId);
          const extra: Record<string, unknown> = {};
          if (scene.filePath) extra.file_path = scene.filePath;
          if (scene.headerInfo) {
            extra.ply_format = scene.headerInfo.format;
            extra.total_vertex_count = scene.headerInfo.vertexCount;
            extra.vertex_stride = scene.headerInfo.vertexStride;
            extra.property_count = scene.headerInfo.properties.length;
            extra.is_3dgs = scene.headerInfo.has3dgs;
          }
          return json({ scene_id: scene.id, ...stats, ...extra });
        }
        case 'bbox':
          return json({ scene_id: scene.id, bbox: scene.bbox });
        case 'gaussian_at_point': {
          const point = asVec3(args, 'point');
          if (!point) return error('point parameter required for gaussian_at_point');
          const g = ctx.state.gaussianAtPoint(point, sceneId);
          return g ? json({ gaussian: g }) : error('No Gaussian found');
        }
        case 'segmentation': {
          const segs = Array.from(scene.segmentation.entries()).map(([label, ids]) => ({ label, count: ids.length }));
          return json({ segmentation: segs, total_labels: segs.length });
        }
        case 'materials':
          return json({ has_pbr: scene.metadata.hasPBR, message: 'PBR material data requires set_pbr_material (experimental) or an external loader' });
        default:
          return error(`Unknown query_type: ${queryType}`);
      }
    }),
  },

  // === Tool 6: cast_ray ===
  {
    name: 'cast_ray',
    description: 'Cast a ray and return the first Gaussian hit. Uses a server-side uniform-grid acceleration structure. Each Gaussian is approximated as a sphere of its max scale radius (analytic ellipsoid intersection not implemented).',
    inputSchema: {
      type: 'object',
      properties: {
        scene_id: { type: 'string' },
        origin: { type: 'array', items: { type: 'number' }, description: '[x, y, z] ray origin' },
        direction: { type: 'array', items: { type: 'number' }, description: '[x, y, z] ray direction (need not be normalized)' },
        max_distance: { type: 'number', default: 1000, description: 'Maximum ray travel distance' },
      },
      required: ['origin', 'direction'],
    },
    handler: guarded(async (args, ctx) => {
      const sceneId = asString(args, 'scene_id');
      if (!ctx.state.getScene(sceneId)) return error('No active scene.');
      const origin = asVec3(args, 'origin', { required: true })!;
      const direction = asVec3(args, 'direction', { required: true })!;
      const maxDistance = asNumber(args, 'max_distance', { default: 1000, min: 0.01, max: 100000 })!;

      const result = ctx.state.castRay(origin, direction, sceneId, maxDistance);
      if (result.hit) {
        return json({ hit: true, distance: result.distance, gaussian_id: result.gaussianId, position: result.position });
      }
      return json({ hit: false, distance: null, gaussian_id: null, position: null });
    }),
  },

  // === Tool 7: export_result ===
  {
    name: 'export_result',
    description: 'Export the current scene state to PLY (standard 3DGS layout), SPLAT (32B/splat), or JSON (metadata). Writes a real file and returns its path/URL. Never modifies original files.',
    inputSchema: {
      type: 'object',
      properties: {
        scene_id: { type: 'string' },
        format: { type: 'string', enum: ['ply', 'splat', 'json'], default: 'ply' },
        output_path: { type: 'string', description: 'Optional output file path (must be inside the working directory). If omitted, writes to .temp/exports/.' },
      },
    },
    handler: guarded(async (args, ctx) => {
      const sceneId = asString(args, 'scene_id');
      const scene = ctx.state.getScene(sceneId);
      if (!scene) return error('No active scene.');

      const format = asString(args, 'format', { enum: ['ply', 'splat', 'json'] }) ?? 'ply';
      const outputPathArg = asString(args, 'output_path');

      if (format === 'json') {
        return json({
          scene_id: scene.id,
          source: scene.source,
          format: scene.format,
          gaussian_count: scene.gaussians.length,
          camera: scene.camera,
          bbox: scene.bbox,
          metadata: scene.metadata,
          message: 'JSON export returns scene metadata inline (Gaussian arrays omitted for transport size).',
        });
      }

      const buffer = format === 'ply' ? toPlyBuffer(scene.gaussians) : toSplatBuffer(scene.gaussians);
      const exportDir = tempDir('exports');
      let outputPath: string;
      if (outputPathArg) {
        outputPath = _path.resolve(outputPathArg);
        const cwd = _path.resolve(process.cwd());
        if (!outputPath.startsWith(cwd + _path.sep)) {
          return error(`output_path must stay inside the working directory (${cwd})`);
        }
        _fs.mkdirSync(_path.dirname(outputPath), { recursive: true });
      } else {
        outputPath = _path.join(exportDir, `${scene.id}-export.${format}`);
      }
      _fs.writeFileSync(outputPath, buffer);

      const url = ctx.bridge.serveUrlForFile(outputPath);
      return json({
        status: 'ok',
        format,
        gaussian_count: scene.gaussians.length,
        output_path: outputPath,
        bytes: buffer.length,
        serve_url: url,
        message: `Serialized ${scene.gaussians.length} Gaussians to ${format.toUpperCase()} (${(buffer.length / 1024 / 1024).toFixed(2)} MB)`,
      });
    }),
  },

  // === Tool 8: prune_by_importance ===
  {
    name: 'prune_by_importance',
    description: 'Importance-based Gaussian pruning with five distinct strategies: sparsity (small+opaque detail), dog (structure-band scales), coreset (voxel coverage), gradient (color-contrast proxy), variational (confidence proxy). Returns removed/remaining counts.',
    inputSchema: {
      type: 'object',
      properties: {
        scene_id: { type: 'string', description: 'Scene identifier (uses active scene if omitted)' },
        strategy: { type: 'string', enum: ['dog', 'coreset', 'gradient', 'sparsity', 'variational'], description: 'Pruning strategy (each uses a different scoring function)' },
        target_ratio: { type: 'number', minimum: 0.05, maximum: 0.99, description: 'Target Gaussian retention ratio (e.g. 0.5 keeps half)' },
        preserve_regions: { type: 'array', items: { type: 'object' }, description: 'Spherical regions {center:[x,y,z], radius} protected from pruning' },
      },
      required: ['strategy', 'target_ratio'],
    },
    handler: guarded(async (args, ctx) => {
      const sceneId = asString(args, 'scene_id');
      if (!ctx.state.getScene(sceneId)) return error('No active scene.');
      const strategy = asString(args, 'strategy', { required: true, enum: ['dog', 'coreset', 'gradient', 'sparsity', 'variational'] })!;
      const targetRatio = asNumber(args, 'target_ratio', { required: true, min: 0.05, max: 0.99 })!;
      const preserveRegions = args.preserve_regions as Array<{ center: number[]; radius: number }> | undefined;

      const result = ctx.state.pruneByImportance(strategy, targetRatio, preserveRegions, sceneId);

      // Persist index metadata after structural change
      try { ctx.state.saveIndex(_path.resolve(process.cwd(), '.temp', 'scenes', 'index.json')); } catch { /* non-fatal */ }

      return json({
        status: 'ok',
        strategy: result.strategy,
        target_ratio: targetRatio,
        removed: result.removed,
        remaining: result.remaining,
        original_count: result.removed + result.remaining,
      });
    }),
  },

  // === Tool 9: set_gaussian_density ===
  {
    name: 'set_gaussian_density',
    description: 'Control Gaussian count via cloning (increase) or subsampling (decrease). Global operation; region-scoped density requires modify_gaussians + pruning.',
    inputSchema: {
      type: 'object',
      properties: {
        scene_id: { type: 'string' },
        mode: { type: 'string', enum: ['increase', 'decrease', 'auto'], description: 'Density adjustment mode' },
        factor: { type: 'number', minimum: 0.1, maximum: 10.0, description: 'Density adjustment factor (1.0 = no change)' },
      },
      required: ['mode'],
    },
    handler: guarded(async (args, ctx) => {
      const sceneId = asString(args, 'scene_id');
      const scene = ctx.state.getScene(sceneId);
      if (!scene) return error('No active scene.');
      const mode = asString(args, 'mode', { required: true, enum: ['increase', 'decrease', 'auto'] })!;
      const factor = asNumber(args, 'factor', { default: 2.0, min: 0.1, max: 10 })!;
      const before = scene.gaussians.length;

      if (mode === 'increase') {
        const cloneCount = Math.floor(scene.gaussians.length * (factor - 1));
        const clones = scene.gaussians.slice(0, cloneCount).map((g, i) => ({
          ...g,
          id: scene.gaussians.length + i,
          position: [
            g.position[0] + (Math.random() - 0.5) * 0.01,
            g.position[1] + (Math.random() - 0.5) * 0.01,
            g.position[2] + (Math.random() - 0.5) * 0.01,
          ] as [number, number, number],
        }));
        scene.gaussians.push(...clones);
      } else if (mode === 'decrease') {
        const keep = Math.max(1, Math.ceil(factor));
        scene.gaussians = scene.gaussians.filter((_, i) => i % keep === 0);
        scene.gaussians.forEach((g, i) => (g.id = i));
      }
      ctx.state.invalidateSpatialIndex(scene);

      return json({ status: 'ok', mode, factor, before, after: scene.gaussians.length });
    }),
  },

  // === Tool 10: adjust_opacity ===
  {
    name: 'adjust_opacity',
    description: 'Batch-adjust opacity for selected Gaussians (set/add/multiply).',
    inputSchema: {
      type: 'object',
      properties: {
        scene_id: { type: 'string' },
        select: { type: 'object', description: 'Selection criteria (same as modify_gaussians; omit for all)' },
        opacity: { type: 'number', minimum: -1, maximum: 1, description: 'Opacity value (interpretation depends on action)' },
        action: { type: 'string', enum: ['set', 'add', 'multiply'], default: 'set' },
      },
      required: ['opacity'],
    },
    handler: guarded(async (args, ctx) => {
      const sceneId = asString(args, 'scene_id');
      const scene = ctx.state.getScene(sceneId);
      if (!scene) return error('No active scene.');
      const opacity = asNumber(args, 'opacity', { required: true, min: -1, max: 1 })!;
      const action = (asString(args, 'action', { enum: ['set', 'add', 'multiply'] }) ?? 'set') as 'set' | 'add' | 'multiply';
      const select = (asRecord(args, 'select') ?? {}) as { ids?: number[]; region?: { center: number[]; radius: number }; label?: string };

      const selected = ctx.state.selectGaussians(select, sceneId);
      ctx.state.applyOperations(selected, [{ property: 'opacity', action, value: opacity }]);

      return json({ status: 'ok', adjusted: selected.length, opacity, action });
    }),
  },

  // === Tool 11: set_rotation ===
  {
    name: 'set_rotation',
    description: 'Set per-Gaussian rotation quaternion for selected Gaussians or named parts (articulated objects). Angle+axis are converted to a quaternion.',
    inputSchema: {
      type: 'object',
      properties: {
        scene_id: { type: 'string' },
        part: { type: 'string', description: 'Part name to rotate (e.g., "arm", "door")' },
        angle: { type: 'number', description: 'Rotation angle in degrees' },
        axis: { type: 'array', items: { type: 'number' }, default: [0, 1, 0], description: 'Rotation axis [x, y, z]' },
        select: { type: 'object', description: 'Direct Gaussian selection (alternative to part name)' },
      },
    },
    handler: guarded(async (args, ctx) => {
      const sceneId = asString(args, 'scene_id');
      const scene = ctx.state.getScene(sceneId);
      if (!scene) return error('No active scene.');

      const part = asString(args, 'part');
      const angle = asNumber(args, 'angle', { default: 0 })!;
      const axis = asVec3(args, 'axis') ?? [0, 1, 0];

      let selected;
      if (part) {
        selected = scene.gaussians.filter((g) => g.partName === part);
        if (selected.length === 0) return error(`No Gaussians with part name "${part}". Available parts require prior articulation setup.`);
      } else if (args.select) {
        selected = ctx.state.selectGaussians(asRecord(args, 'select', { required: true }) as { ids?: number[]; region?: { center: number[]; radius: number }; label?: string }, sceneId);
      } else {
        return error('Either "part" or "select" must be specified');
      }

      const rad = (angle * Math.PI) / 180;
      const halfRad = rad / 2;
      const sinHalf = Math.sin(halfRad);
      const quat = [Math.cos(halfRad), axis[0] * sinHalf, axis[1] * sinHalf, axis[2] * sinHalf];

      ctx.state.applyOperations(selected, [{ property: 'rotation', action: 'set', value: quat }]);
      return json({ status: 'ok', part: part ?? '(custom selection)', rotated: selected.length, angle, axis, quaternion: quat });
    }),
  },

  // === Tool 12: query_spatial_context (REAL — geometric spatial reasoning) ===
  {
    name: 'query_spatial_context',
    description: 'Geometric spatial reasoning over the loaded scene: voxel-cluster scene graph, pairwise spatial relations (above/below/near/far), and point-to-point measurement. Pure geometry; semantic grounding requires segmentation labels.',
    inputSchema: {
      type: 'object',
      properties: {
        scene_id: { type: 'string' },
        mode: { type: 'string', enum: ['scene_graph', 'relation', 'measurement', 'grounding'] },
        point_a: { type: 'array', items: { type: 'number' }, description: '[x,y,z] first point (measurement mode)' },
        point_b: { type: 'array', items: { type: 'number' }, description: '[x,y,z] second point (measurement mode)' },
        label: { type: 'string', description: 'Semantic label to ground (grounding mode)' },
        max_clusters: { type: 'integer', default: 12, minimum: 2, maximum: 64 },
      },
      required: ['mode'],
    },
    handler: guarded(async (args, ctx) => {
      const sceneId = asString(args, 'scene_id');
      const scene = ctx.state.getScene(sceneId);
      if (!scene) return error('No active scene.');
      const mode = asString(args, 'mode', { required: true, enum: ['scene_graph', 'relation', 'measurement', 'grounding'] })!;
      const maxClusters = asNumber(args, 'max_clusters', { default: 12, min: 2, max: 64 })!;

      if (mode === 'grounding') {
        const label = asString(args, 'label');
        if (!label) return error('grounding mode requires "label"');
        const ids = scene.segmentation.get(label);
        if (!ids) {
          return json({
            grounded: false,
            label,
            available_labels: Array.from(scene.segmentation.keys()),
            note: 'No segmentation for this label. Grounding needs prior semantic segmentation (e.g., LangSplat-style features); this tool matches labels only.',
          });
        }
        const gs = scene.gaussians.filter((g) => ids.includes(g.id));
        const centroid = gs.reduce((acc, g) => [acc[0] + g.position[0] / gs.length, acc[1] + g.position[1] / gs.length, acc[2] + g.position[2] / gs.length], [0, 0, 0]);
        return json({ grounded: true, label, gaussian_count: gs.length, centroid });
      }

      const pointA = asVec3(args, 'point_a');
      const pointB = asVec3(args, 'point_b');
      const result = ctx.state.spatialContext({
        mode: mode as 'scene_graph' | 'relation' | 'measurement',
        pointA, pointB,
        maxClusters,
      }, sceneId);
      return json({ scene_id: scene.id, ...result });
    }),
  },

  // === Tool 13: resolve_voice_command (REAL — intent mapping) ===
  {
    name: 'resolve_voice_command',
    description: 'Map a natural-language (possibly transcribed voice) command to concrete MCP tool calls using the built-in intent rules. Returns the matched intent and the planned tool-call sequence.',
    inputSchema: {
      type: 'object',
      properties: {
        text: { type: 'string', description: 'Raw user utterance, e.g. "从上方看这个场景"' },
        list_intents: { type: 'boolean', default: false, description: 'If true, return all known intent patterns instead of matching' },
      },
    },
    handler: guarded(async (args, ctx) => {
      void ctx;
      if (asBool(args, 'list_intents')) {
        return json({ intents: listVoiceIntents() });
      }
      const text = asString(args, 'text', { required: true })!;
      const result = mapVoiceIntent(text);
      return json(result);
    }),
  },
  // === Tool 14: define_scene_spec ===
  {
    name: 'define_scene_spec',
    description: 'Define a scene specification (Object Spec) for the spec-first sculpting pipeline. The spec contains: component hierarchy (bbox + type per part), material assignments, and quality gates (per-stage metric targets). Returns a spec_id used by sculpt_pipeline and export_scene_code.',
    inputSchema: {
      type: 'object',
      properties: {
        name: { type: 'string', description: 'Human-readable spec name, e.g. "conference_room"' },
        components: {
          type: 'array',
          description: 'Component specifications defining the scene geometry',
          items: {
            type: 'object',
            properties: {
              name: { type: 'string' },
              type: { type: 'string', enum: ['box', 'sphere', 'cylinder', 'cone', 'torus', 'plane', 'organic'] },
              bbox: {
                type: 'object',
                properties: {
                  min: { type: 'array', items: { type: 'number' }, minItems: 3, maxItems: 3 },
                  max: { type: 'array', items: { type: 'number' }, minItems: 3, maxItems: 3 },
                },
                required: ['min', 'max'],
              },
              parent: { type: 'string', description: 'Parent component name for articulated hierarchy' },
              material: { type: 'string', description: 'Material name from materials array' },
              gaussianCount: { type: 'integer', description: 'Target Gaussian count for this component' },
            },
            required: ['name', 'type', 'bbox'],
          },
          minItems: 1,
        },
        materials: {
          type: 'array',
          description: 'Material definitions (PBR / SH / procedural)',
          items: {
            type: 'object',
            properties: {
              name: { type: 'string' },
              type: { type: 'string', enum: ['pbr', 'sh', 'procedural'] },
              baseColor: { type: 'array', items: { type: 'number' }, minItems: 3, maxItems: 3, description: 'RGB [0,1]' },
              metallic: { type: 'number', minimum: 0, maximum: 1 },
              roughness: { type: 'number', minimum: 0, maximum: 1 },
              opacity: { type: 'number', minimum: 0, maximum: 1 },
            },
            required: ['name', 'type', 'baseColor'],
          },
        },
        quality_gates: {
          type: 'array',
          description: 'Custom quality gates (overrides defaults). Each gate maps a stage metric to a target value.',
          items: {
            type: 'object',
            properties: {
              stage: { type: 'string', enum: ['blockout', 'structural', 'form', 'material', 'surface', 'lighting'] },
              metric: { type: 'string' },
              target: { type: 'number' },
              description: { type: 'string' },
            },
            required: ['stage', 'metric', 'target'],
          },
        },
        target_coverage: { type: 'number', default: 0.85, description: 'Target bbox coverage for blockout gate' },
        min_psnr: { type: 'number', default: 20, description: 'Minimum PSNR estimate for form gate' },
        target_score: { type: 'number', default: 0.8, description: 'Overall target quality score' },
      },
      required: ['name', 'components'],
    },
    handler: guarded(async (args, ctx) => {
      void ctx;
      const name = asString(args, 'name', { required: true })!;
      const componentsRaw = args.components as Array<Record<string, unknown>>;
      if (!Array.isArray(componentsRaw) || componentsRaw.length === 0) {
        throw new ValidationError('components must be a non-empty array');
      }

      const components = componentsRaw.map((c) => {
        const bbox = c.bbox as { min: [number, number, number]; max: [number, number, number] };
        if (!bbox || !Array.isArray(bbox.min) || !Array.isArray(bbox.max)) {
          throw new ValidationError(`Component "${c.name}" missing valid bbox`);
        }
        return {
          name: c.name as string,
          type: c.type as 'box' | 'sphere' | 'cylinder' | 'cone' | 'torus' | 'plane' | 'organic',
          bbox,
          parent: c.parent as string | undefined,
          material: c.material as string | undefined,
          gaussianCount: c.gaussianCount as number | undefined,
        };
      });

      const materialsRaw = args.materials as Array<Record<string, unknown>> | undefined;
      const materials = materialsRaw?.map((m) => ({
        name: m.name as string,
        type: m.type as 'pbr' | 'sh' | 'procedural',
        baseColor: m.baseColor as [number, number, number],
        metallic: m.metallic as number | undefined,
        roughness: m.roughness as number | undefined,
        opacity: m.opacity as number | undefined,
      })) ?? [];

      const gatesRaw = args.quality_gates as Array<Record<string, unknown>> | undefined;
      const qualityGates = gatesRaw?.map((g) => ({
        stage: g.stage as SculptStage,
        metric: g.metric as string,
        target: g.target as number,
        description: (g.description as string) ?? '',
      }));

      const specManager = getSpecManager();
      const spec = specManager.defineSpec({
        name,
        components,
        materials,
        qualityGates,
        targetCoverage: args.target_coverage as number | undefined,
        minPsnr: args.min_psnr as number | undefined,
        targetScore: args.target_score as number | undefined,
      });

      return json({
        spec_id: spec.id,
        status: 'defined',
        ...serializeSpec(spec),
      });
    }),
  },
  // === Tool 15: sculpt_pipeline ===
  {
    name: 'sculpt_pipeline',
    description: 'Execute one stage of the spec-first sculpting pipeline. Stages run in order: blockout → structural → form → material → surface → lighting. Each stage produces metrics evaluated against spec quality gates. The blockout stage creates a new scene from the spec; subsequent stages refine it. Returns stage status, metrics, and gate pass/fail.',
    inputSchema: {
      type: 'object',
      properties: {
        spec_id: { type: 'string', description: 'Scene spec ID from define_scene_spec' },
        stage: { type: 'string', enum: ['blockout', 'structural', 'form', 'material', 'surface', 'lighting'], description: 'Stage to execute' },
        override_order: { type: 'boolean', default: false, description: 'Skip stage-order enforcement (use with caution)' },
        params: {
          type: 'object',
          description: 'Stage-specific parameters',
          properties: {
            density_factor: { type: 'number', default: 1.0, description: '[form] Gaussian scale multiplier' },
            thin_threshold: { type: 'number', default: 0.01, description: '[surface] Minimum Gaussian scale clamp' },
            fov: { type: 'number', default: 50, description: '[lighting] Camera field of view' },
          },
        },
      },
      required: ['spec_id', 'stage'],
    },
    handler: guarded(async (args, ctx) => {
      const specId = asString(args, 'spec_id', { required: true })!;
      const stage = asStage(args);
      const overrideOrder = asBool(args, 'override_order') || false;
      const params = (args.params as Record<string, unknown>) ?? {};
      if (overrideOrder) params.override_order = true;

      const specManager = getSpecManager();
      const spec = specManager.getSpec(specId);
      if (!spec) {
        throw new ValidationError(`Spec not found: ${specId}. Call define_scene_spec first.`);
      }

      const pipeline = new SculptPipeline(ctx.state, specManager);
      const result = await pipeline.executeStage(specId, stage, params);

      return json({
        spec_id: specId,
        stage: result.stage,
        status: result.status,
        passed: result.passed,
        attempts: result.attempts,
        metrics: result.metrics,
        message: result.message,
        scene_id: spec.sceneId,
        completed_at: new Date(result.completedAt).toISOString(),
      });
    }),
  },
  // === Tool 16: export_scene_code ===
  {
    name: 'export_scene_code',
    description: 'Export a sculpted scene using the code-first approach: procedural geometry (box/cylinder/cone/plane) becomes Three.js source code; organic regions become .splat binary data. Produces a standalone, runnable Three.js HTML module. Requires a scene (from sculpt_pipeline blockout or import_scene) and optionally a spec for geometry partitioning.',
    inputSchema: {
      type: 'object',
      properties: {
        scene_id: { type: 'string', description: 'Scene ID to export. If omitted, uses active scene.' },
        spec_id: { type: 'string', description: 'Spec ID for geometry partitioning. If omitted, uses scene segmentation.' },
        format: { type: 'string', enum: ['threejs+splat', 'threejs_only', 'splat_only', 'html'], default: 'threejs+splat', description: 'Export format. Use "html" for a standalone browser-openable HTML file with CDN Three.js.' },
        output_dir: { type: 'string', default: '.temp/exports', description: 'Output directory for generated files' },
      },
    },
    handler: guarded(async (args, ctx) => {
      const sceneId = asString(args, 'scene_id') ?? ctx.state.getActiveSceneId() ?? undefined;
      const scene = ctx.state.getScene(sceneId);
      if (!scene) {
        throw new ValidationError('No scene found. Provide scene_id or run sculpt_pipeline blockout first.');
      }

      const specId = asString(args, 'spec_id');
      const specManager = getSpecManager();
      const spec = specId ? specManager.getSpec(specId) : null;
      if (specId && !spec) {
        throw new ValidationError(`Spec not found: ${specId}`);
      }

      const format = (args.format as 'threejs+splat' | 'threejs_only' | 'splat_only' | 'html') ?? 'threejs+splat';
      const outputDir = (args.output_dir as string) ?? _path.resolve(process.cwd(), '.temp', 'exports');
      if (!_fs.existsSync(outputDir)) _fs.mkdirSync(outputDir, { recursive: true });

      const result = generateSceneCode(scene, spec, format, outputDir);

      return json({
        status: 'exported',
        scene_id: scene.id,
        format: result.format,
        code_path: result.codePath,
        html_path: result.htmlPath,
        splat_path: result.splatPath,
        component_count: result.componentCount,
        gaussian_count: result.gaussianCount,
        procedural_count: result.proceduralCount,
        splat_count: result.splatCount,
        message: result.htmlPath
          ? `Standalone HTML written to ${result.htmlPath}`
          : result.codePath
            ? `Three.js code written to ${result.codePath}`
            : 'Splat data only (no procedural code).',
      });
    }),
  },
  // === Tool 17: encode_scene_slatent ===
  {
    name: 'encode_scene_slatent',
    description: 'Encode the current scene into a SLAT latent snapshot (sparse voxel grid with per-voxel feature aggregation). The snapshot is immutable and used as the edit intermediate for edit_scene_latent. Returns a slat_id, voxel count, and the position encode-loss (RMSE vs voxel centers).',
    inputSchema: {
      type: 'object',
      properties: {
        scene_id: { type: 'string', description: 'Scene to encode (uses active scene if omitted)' },
        voxel_size: { type: 'number', default: 0.1, description: 'Voxel edge length in scene units. Smaller = finer latent, more voxels.' },
      },
    },
    handler: guarded(async (args, ctx) => {
      const sceneId = asString(args, 'scene_id') ?? ctx.state.getActiveSceneId() ?? undefined;
      const scene = ctx.state.getScene(sceneId);
      if (!scene || scene.gaussians.length === 0) {
        throw new ValidationError('No scene with Gaussians found. Import or sculpt a scene first.');
      }
      const voxelSize = asNumber(args, 'voxel_size', { default: 0.1, min: 0.001, max: 100 })!;
      const mgr = getSlatManager();
      const { slatId, slat } = mgr.encode(scene.gaussians, voxelSize);

      // Encode loss: RMSE of source positions vs voxel centers
      let sq = 0;
      let n = 0;
      const byId = new Map<number, (typeof scene.gaussians)[number]>();
      for (const g of scene.gaussians) byId.set(g.id, g);
      for (const v of slat.voxels.values()) {
        for (const gid of v.gaussianIds) {
          const g = byId.get(gid);
          if (!g) continue;
          sq += (v.position[0] - g.position[0]) ** 2 +
                (v.position[1] - g.position[1]) ** 2 +
                (v.position[2] - g.position[2]) ** 2;
          n += 3;
        }
      }

      return json({
        status: 'ok',
        slat_id: slatId,
        scene_id: scene.id,
        voxel_size: voxelSize,
        voxel_count: slat.voxels.size,
        source_count: scene.gaussians.length,
        encode_loss: n > 0 ? Math.sqrt(sq / n) : 0,
        active_slats: mgr.list().length,
      });
    }),
  },
  // === Tool 18: edit_scene_latent ===
  {
    name: 'edit_scene_latent',
    description: 'Apply a latent-space edit to a SLAT snapshot (from encode_scene_slatent). Computes deltas on the immutable snapshot, then optionally decodes them back into the scene. Ops: translate (region/bbox/part by delta), scale (by factor about an origin), rotate (about an axis+origin), recolor (mix toward a target color), opacity, smooth (neighbor averaging), delete. Returns affected voxels/gaussians, edit delta, and decode result.',
    inputSchema: {
      type: 'object',
      properties: {
        scene_id: { type: 'string', description: 'Scene to apply the decoded edit to (required when apply_to_scene=true)' },
        slat_id: { type: 'string', description: 'SLAT snapshot id from encode_scene_slatent' },
        op: {
          type: 'object',
          description: 'Latent edit operation',
          properties: {
            op: { type: 'string', enum: ['translate', 'scale', 'rotate', 'recolor', 'opacity', 'smooth', 'delete'], description: 'Edit operation type' },
            selector: {
              type: 'object',
              description: 'Voxel selection. At least one of region/bbox/part.',
              properties: {
                region: { type: 'object', properties: { center: { type: 'array', items: { type: 'number' }, minItems: 3, maxItems: 3 }, radius: { type: 'number' } }, description: 'Spherical region of voxel centers' },
                bbox: { type: 'object', properties: { min: { type: 'array', items: { type: 'number' }, minItems: 3, maxItems: 3 }, max: { type: 'array', items: { type: 'number' }, minItems: 3, maxItems: 3 } }, description: 'Axis-aligned voxel box' },
                part: { type: 'string', description: 'Part or semantic label (matches voxel partName / semanticLabel)' },
              },
            },
            delta: { type: 'array', items: { type: 'number' }, minItems: 3, maxItems: 3, description: '[translate] translation offset' },
            factor: { type: 'number', description: '[scale] scale factor' },
            axis: { type: 'string', enum: ['x', 'y', 'z'], description: '[rotate] rotation axis' },
            angle_deg: { type: 'number', description: '[rotate] rotation angle in degrees' },
            color: { type: 'array', items: { type: 'number' }, minItems: 3, maxItems: 3, description: '[recolor] target RGB [0,1]' },
            mix: { type: 'number', default: 1, minimum: 0, maximum: 1, description: '[recolor] blend factor (1 = full recolor)' },
            opacity: { type: 'number', minimum: 0, maximum: 1, description: '[opacity] target opacity' },
            mode: { type: 'string', enum: ['set', 'multiply'], default: 'set', description: '[opacity] set or multiply' },
            iterations: { type: 'integer', minimum: 1, default: 1, description: '[smooth] number of neighbor-averaging passes' },
            origin: { type: 'array', items: { type: 'number' }, minItems: 3, maxItems: 3, description: '[scale/rotate] pivot origin (defaults to bbox min / selected centroid)' },
          },
          required: ['op', 'selector'],
        },
        apply_to_scene: { type: 'boolean', default: true, description: 'Decode the deltas and write them back to the scene. If false, returns deltas only without mutating the scene.' },
        confirm: { type: 'boolean', default: false, description: 'Required when the edit affects >10% of scene Gaussians' },
      },
      required: ['slat_id', 'op'],
    },
    handler: guarded(async (args, ctx) => {
      const slatId = asString(args, 'slat_id', { required: true })!;
      const opRaw = asRecord(args, 'op', { required: true })!;
      const mgr = getSlatManager();
      const slat = mgr.get(slatId);
      if (!slat) {
        throw new ValidationError(`SLAT snapshot not found: ${slatId}. Call encode_scene_slatent first.`);
      }

      const edit = parseLatentEditOp(opRaw);
      const op = edit.op;
      const result = mgr.edit(slatId, edit);

      // Hard safety gate: >10% of scene affected requires confirmation
      const sceneId = asString(args, 'scene_id');
      const applyToScene = asBool(args, 'apply_to_scene', { default: true });
      let scene = null;
      if (applyToScene) {
        scene = ctx.state.getScene(sceneId);
        if (!scene) {
          throw new ValidationError('apply_to_scene=true requires a valid scene_id (the scene must already exist).');
        }
        const pct = scene.gaussians.length > 0 ? (result.metrics.affected_gaussians / scene.gaussians.length) * 100 : 0;
        if (pct > 10 && !asBool(args, 'confirm')) {
          return error(`Edit would affect ${result.metrics.affected_gaussians} of ${scene.gaussians.length} Gaussians (${pct.toFixed(1)}% > 10%). Re-run with confirm=true to apply. Deltas below.`);
        }
      }

      const decoded = applyToScene && scene ? mgr.decode(slatId, result.deltas) : null;

      // Apply decoded Gaussians back into the scene
      if (applyToScene && scene && decoded) {
        scene.gaussians = decoded;
        ctx.state.invalidateSpatialIndex(scene);
        await ctx.bridge.broadcast({ type: 'modify_gaussians', select: {}, operations: [] });
      }

      return json({
        status: 'ok',
        slat_id: slatId,
        op,
        affected_voxels: result.metrics.affected_voxels,
        affected_gaussians: result.metrics.affected_gaussians,
        edit_delta: result.metrics.edit_delta,
        encode_loss: result.metrics.encode_loss,
        voxel_count: result.metrics.voxel_count,
        applied_to_scene: !!(applyToScene && scene && decoded),
        decoded_gaussians: decoded ? decoded.length : 0,
        metrics: result.metrics,
      });
    }),
  },
  // === Tool 19: list_slatents ===
  {
    name: 'list_slatents',
    description: 'List all SLAT snapshots currently held in memory, with voxel and source counts. Use to discover available slat_ids before editing.',
    inputSchema: {
      type: 'object',
      properties: {},
    },
    handler: guarded(async (_args, ctx) => {
      void ctx;
      return json({ slats: getSlatManager().list() });
    }),
  },
  // === Tool 20: transfer_scene_edit ===
  {
    name: 'transfer_scene_edit',
    description: 'Replay a latent edit (any of the 7 SLAT ops) computed on one scene onto a different scene. The op is applied to the source snapshot; each edited source voxel transfers its RELATIVE change (position offset, color offset, opacity ratio, delete) to the spatially nearest target voxel within match_radius. Use to reuse a look/edit across scenes (e.g. recolor or lift the same region in two captures). Optionally decodes the resulting target deltas back into a scene.',
    inputSchema: {
      type: 'object',
      properties: {
        scene_id: { type: 'string', description: 'Target scene to apply the transferred deltas to (required when apply_to_scene=true)' },
        source_slat_id: { type: 'string', description: 'SLAT snapshot to compute the edit on (from encode_scene_slatent)' },
        target_slat_id: { type: 'string', description: 'SLAT snapshot to transfer the edit onto' },
        op: {
          type: 'object',
          description: 'Latent edit operation (same shape as edit_scene_latent.op)',
          properties: {
            op: { type: 'string', enum: ['translate', 'scale', 'rotate', 'recolor', 'opacity', 'smooth', 'delete'], description: 'Edit operation type' },
            selector: {
              type: 'object',
              description: 'Voxel selection on the SOURCE snapshot. At least one of region/bbox/part.',
              properties: {
                region: { type: 'object', properties: { center: { type: 'array', items: { type: 'number' }, minItems: 3, maxItems: 3 }, radius: { type: 'number' } }, description: 'Spherical region of voxel centers' },
                bbox: { type: 'object', properties: { min: { type: 'array', items: { type: 'number' }, minItems: 3, maxItems: 3 }, max: { type: 'array', items: { type: 'number' }, minItems: 3, maxItems: 3 } }, description: 'Axis-aligned voxel box' },
                part: { type: 'string', description: 'Part or semantic label (matches voxel partName / semanticLabel)' },
              },
            },
            delta: { type: 'array', items: { type: 'number' }, minItems: 3, maxItems: 3, description: '[translate] translation offset' },
            factor: { type: 'number', description: '[scale] scale factor' },
            axis: { type: 'string', enum: ['x', 'y', 'z'], description: '[rotate] rotation axis' },
            angle_deg: { type: 'number', description: '[rotate] rotation angle in degrees' },
            color: { type: 'array', items: { type: 'number' }, minItems: 3, maxItems: 3, description: '[recolor] target RGB [0,1]' },
            mix: { type: 'number', default: 1, minimum: 0, maximum: 1, description: '[recolor] blend factor (1 = full recolor)' },
            opacity: { type: 'number', minimum: 0, maximum: 1, description: '[opacity] target opacity' },
            mode: { type: 'string', enum: ['set', 'multiply'], default: 'set', description: '[opacity] set or multiply' },
            iterations: { type: 'integer', minimum: 1, default: 1, description: '[smooth] number of neighbor-averaging passes' },
            origin: { type: 'array', items: { type: 'number' }, minItems: 3, maxItems: 3, description: '[scale/rotate] pivot origin (defaults to bbox min / selected centroid)' },
          },
          required: ['op', 'selector'],
        },
        match_radius: { type: 'number', minimum: 0.0001, description: 'Spatial match radius between target and source voxels (scene units). Defaults to 2x source voxel_size.' },
        strength: { type: 'number', minimum: 0, maximum: 3, default: 1, description: 'Effect strength of the transferred delta (0 = none, 1 = full, >1 = amplify).' },
        apply_to_scene: { type: 'boolean', default: true, description: 'Decode the transferred deltas and write them back to the target scene. If false, returns deltas only.' },
        confirm: { type: 'boolean', default: false, description: 'Required when the transferred deltas affect >10% of the target scene Gaussians' },
      },
      required: ['source_slat_id', 'target_slat_id', 'op'],
    },
    handler: guarded(async (args, ctx) => {
      const sourceSlatId = asString(args, 'source_slat_id', { required: true })!;
      const targetSlatId = asString(args, 'target_slat_id', { required: true })!;
      const opRaw = asRecord(args, 'op', { required: true })!;
      const edit = parseLatentEditOp(opRaw);
      const mgr = getSlatManager();
      const source = mgr.get(sourceSlatId);
      const target = mgr.get(targetSlatId);
      if (!source) throw new ValidationError(`SLAT snapshot not found: ${sourceSlatId}. Call encode_scene_slatent first.`);
      if (!target) throw new ValidationError(`SLAT snapshot not found: ${targetSlatId}. Call encode_scene_slatent first.`);

      const matchRadius = asNumber(args, 'match_radius', { min: 0.0001 });
      const strength = asNumber(args, 'strength', { default: 1, min: 0, max: 3 })!;
      const result = mgr.transfer(sourceSlatId, targetSlatId, edit, {
        matchRadius,
        strength,
      });

      // Safety gate against large destructive transfers.
      const sceneId = asString(args, 'scene_id');
      const applyToScene = asBool(args, 'apply_to_scene', { default: true });
      let scene = null;
      if (applyToScene) {
        scene = ctx.state.getScene(sceneId);
        if (!scene) {
          throw new ValidationError('apply_to_scene=true requires a valid scene_id (the target scene must already exist).');
        }
        const pct = scene.gaussians.length > 0 ? (result.metrics.matched_target_voxels / scene.gaussians.length) * 100 : 0;
        if (pct > 10 && !asBool(args, 'confirm')) {
          return error(`Transfer would affect ${result.metrics.matched_target_voxels} of ${scene.gaussians.length} Gaussians (${pct.toFixed(1)}% > 10%). Re-run with confirm=true to apply. Deltas below.`);
        }
      }

      const decoded = applyToScene && scene ? mgr.decode(targetSlatId, result.targetDeltas) : null;
      if (applyToScene && scene && decoded) {
        scene.gaussians = decoded;
        ctx.state.invalidateSpatialIndex(scene);
        await ctx.bridge.broadcast({ type: 'modify_gaussians', select: {}, operations: [] });
      }

      return json({
        status: 'ok',
        source_slat_id: sourceSlatId,
        target_slat_id: targetSlatId,
        op: edit.op,
        matched_target_voxels: result.metrics.matched_target_voxels,
        unmatched_target_voxels: result.metrics.unmatched_target_voxels,
        source_edited_voxels: result.metrics.source_edited_voxels,
        match_radius: result.metrics.match_radius,
        applied_to_scene: !!(applyToScene && scene && decoded),
        decoded_gaussians: decoded ? decoded.length : 0,
        metrics: result.metrics,
      });
    }),
  },
  // === Tool 21: interpolate_scene_latent ===
  {
    name: 'interpolate_scene_latent',
    description: 'Blend a target scene toward a source scene via latent-space interpolation at fraction t in [0,1]. For each target voxel, the spatially nearest source voxel (within match_radius) pulls target position, color and opacity toward the source. t=0 keeps the target unchanged; t=1 fully adopts the source appearance. Useful for cross-scene style/look transfer.',
    inputSchema: {
      type: 'object',
      properties: {
        scene_id: { type: 'string', description: 'Target scene to apply the interpolated deltas to (required when apply_to_scene=true)' },
        target_slat_id: { type: 'string', description: 'SLAT snapshot to interpolate (base scene)' },
        source_slat_id: { type: 'string', description: 'SLAT snapshot to interpolate toward' },
        t: { type: 'number', default: 0.5, minimum: 0, maximum: 1, description: 'Interpolation fraction: 0 = keep target, 1 = adopt source' },
        match_radius: { type: 'number', minimum: 0.0001, description: 'Spatial match radius (scene units). Defaults to 2x source voxel_size.' },
        apply_to_scene: { type: 'boolean', default: true, description: 'Decode the interpolated deltas and write them back to the target scene. If false, returns deltas only.' },
        confirm: { type: 'boolean', default: false, description: 'Required when the interpolation affects >10% of the target scene Gaussians' },
      },
      required: ['target_slat_id', 'source_slat_id'],
    },
    handler: guarded(async (args, ctx) => {
      const targetSlatId = asString(args, 'target_slat_id', { required: true })!;
      const sourceSlatId = asString(args, 'source_slat_id', { required: true })!;
      const t = asNumber(args, 't', { default: 0.5, min: 0, max: 1 })!;
      const matchRadius = asNumber(args, 'match_radius', { min: 0.0001 });
      const mgr = getSlatManager();
      const source = mgr.get(sourceSlatId);
      const target = mgr.get(targetSlatId);
      if (!target) throw new ValidationError(`SLAT snapshot not found: ${targetSlatId}. Call encode_scene_slatent first.`);
      if (!source) throw new ValidationError(`SLAT snapshot not found: ${sourceSlatId}. Call encode_scene_slatent first.`);

      const result = mgr.interpolate(targetSlatId, sourceSlatId, { t, matchRadius });

      const sceneId = asString(args, 'scene_id');
      const applyToScene = asBool(args, 'apply_to_scene', { default: true });
      let scene = null;
      if (applyToScene) {
        scene = ctx.state.getScene(sceneId);
        if (!scene) {
          throw new ValidationError('apply_to_scene=true requires a valid scene_id (the target scene must already exist).');
        }
        const pct = scene.gaussians.length > 0 ? (result.metrics.matched_voxels / scene.gaussians.length) * 100 : 0;
        if (pct > 10 && !asBool(args, 'confirm')) {
          return error(`Interpolation would affect ${result.metrics.matched_voxels} of ${scene.gaussians.length} Gaussians (${pct.toFixed(1)}% > 10%). Re-run with confirm=true to apply. Deltas below.`);
        }
      }

      const decoded = applyToScene && scene ? mgr.decode(targetSlatId, result.targetDeltas) : null;
      if (applyToScene && scene && decoded) {
        scene.gaussians = decoded;
        ctx.state.invalidateSpatialIndex(scene);
        await ctx.bridge.broadcast({ type: 'modify_gaussians', select: {}, operations: [] });
      }

      return json({
        status: 'ok',
        target_slat_id: targetSlatId,
        source_slat_id: sourceSlatId,
        t: result.metrics.interpolation_t,
        matched_voxels: result.metrics.matched_voxels,
        total_voxels: result.metrics.total_voxels,
        applied_to_scene: !!(applyToScene && scene && decoded),
        decoded_gaussians: decoded ? decoded.length : 0,
        metrics: result.metrics,
      });
    }),
  },
];

// ---------------------------------------------------------------------------
// Experimental Tools (schema defined, backend NOT implemented — gated by flag)
// ---------------------------------------------------------------------------

const experimentalTools: MCPTool[] = [
  {
    name: 'simulate_physics',
    description: '[EXPERIMENTAL — NOT IMPLEMENTED] Invoke external physics engine (MPM/SPH/PBD) on 3DGS scene. Returns stub status only.',
    inputSchema: {
      type: 'object',
      properties: {
        object_ids: { type: 'array', items: { type: 'integer' } },
        force: { type: 'object' },
        solver_type: { type: 'string', enum: ['mpm', 'sph', 'pbd', 'rigid_body'] },
        dt: { type: 'number', default: 0.016 },
        steps: { type: 'integer', default: 1 },
      },
      required: ['object_ids', 'solver_type'],
    },
    handler: async (args) => stubResponse('simulate_physics', args, 'Physics simulation via RAF representation abstraction. Requires external physics engine (MuJoCo/PyBullet) integration.'),
  },
  {
    name: 'query_4d_scene',
    description: '[EXPERIMENTAL — NOT IMPLEMENTED] Query dynamic 3D scene at arbitrary (x,y,t). Returns stub status only.',
    inputSchema: {
      type: 'object',
      properties: {
        x: { type: 'number' }, y: { type: 'number' }, t: { type: 'number' },
        query_fields: { type: 'array', items: { type: 'string', enum: ['position_3d', 'flow_vector', 'segmentation_label', 'depth'] } },
      },
      required: ['x', 'y', 't'],
    },
    handler: async (args) => stubResponse('query_4d_scene', args, 'Temporal scene query via D4RT. Requires dynamic 3DGS model with temporal embeddings.'),
  },
  {
    name: 'deform_elastic',
    description: '[EXPERIMENTAL — NOT IMPLEMENTED] Particle-skinned eigenmode deformation. Returns stub status only.',
    inputSchema: {
      type: 'object',
      properties: {
        object_id: { type: 'integer' },
        mode_indices: { type: 'array', items: { type: 'integer' } },
        amplitudes: { type: 'array', items: { type: 'number' } },
        interpolation: { type: 'string', enum: ['linear', 'smoothstep'], default: 'smoothstep' },
      },
      required: ['object_id', 'mode_indices', 'amplitudes'],
    },
    handler: async (args) => stubResponse('deform_elastic', args, 'Eigenmode-based elastic deformation via FreeForm. Requires pre-computed eigenmode basis.'),
  },
  {
    name: 'bayesian_density_control',
    description: '[EXPERIMENTAL — NOT IMPLEMENTED] DP-Splat Dirichlet-process density control. Returns stub status only.',
    inputSchema: {
      type: 'object',
      properties: {
        scene_id: { type: 'string' },
        concentration: { type: 'number', minimum: 0.1, maximum: 10.0 },
        base_measure: { type: 'string', enum: ['uniform', 'saliency-weighted', 'gradient-weighted'] },
        max_iterations: { type: 'integer', default: 50 },
      },
      required: ['scene_id', 'concentration'],
    },
    handler: async (args) => stubResponse('bayesian_density_control', args, 'DP-Splat Bayesian density control. Requires DP-Splat model weights and MCMC inference backend.'),
  },
  {
    name: 'moe_deform',
    description: '[EXPERIMENTAL — NOT IMPLEMENTED] MoE-GS/MoDE dynamic deformation. Returns stub status only.',
    inputSchema: {
      type: 'object',
      properties: {
        scene_id: { type: 'string' },
        object_ids: { type: 'array', items: { type: 'integer' } },
        target_motion: { type: 'string' },
        num_experts: { type: 'integer', default: 4 },
        temporal_range: { type: 'array', items: { type: 'number' } },
      },
      required: ['scene_id', 'object_ids', 'target_motion'],
    },
    handler: async (args) => stubResponse('moe_deform', args, 'MoE-GS/MoDE deformation with expert routing. Requires trained MoE deformation model.'),
  },
  {
    name: 'surgical_tracking',
    description: '[EXPERIMENTAL — NOT IMPLEMENTED] Track2Map surgical GS SLAM tracking. Returns stub status only.',
    inputSchema: {
      type: 'object',
      properties: {
        scene_id: { type: 'string' },
        tracking_mode: { type: 'string', enum: ['instrument', 'tissue', 'both'] },
        update_rate_hz: { type: 'number', default: 30 },
        safety_margin_mm: { type: 'number', default: 2.0 },
      },
      required: ['scene_id', 'tracking_mode'],
    },
    handler: async (args) => stubResponse('surgical_tracking', args, 'Track2Map surgical GS SLAM. Requires surgical video stream + Track2Map model.'),
  },
  {
    name: 'query_provenance',
    description: '[EXPERIMENTAL — NOT IMPLEMENTED] GaussTrace provenance / IP forensics. Returns stub status only.',
    inputSchema: {
      type: 'object',
      properties: {
        scene_id: { type: 'string' },
        query_type: { type: 'string', enum: ['lineage', 'attribution', 'forgery_detection', 'training_data_influence'] },
        evidence_threshold: { type: 'number', default: 0.75 },
      },
      required: ['scene_id', 'query_type'],
    },
    handler: async (args) => stubResponse('query_provenance', args, 'GaussTrace provenance graph (ICML 2026). Requires trained GaussTrace model.'),
  },
  {
    name: 'set_pbr_material',
    description: '[EXPERIMENTAL — NOT IMPLEMENTED] MGM/InvSplat PBR material assignment. Returns stub status only.',
    inputSchema: {
      type: 'object',
      properties: {
        scene_id: { type: 'string' },
        select: { type: 'object' },
        albedo: { type: 'array', items: { type: 'number' } },
        metallic: { type: 'number' },
        roughness: { type: 'number' },
        infer_from_appearance: { type: 'boolean', default: false },
      },
      required: ['scene_id', 'select'],
    },
    handler: async (args) => stubResponse('set_pbr_material', args, 'PBR material via MGM + InvSplat. Requires material inference model.'),
  },
  {
    name: 'deformable_aggregate',
    description: '[EXPERIMENTAL — NOT IMPLEMENTED] GADA geometry-aware deformable aggregation. Returns stub status only.',
    inputSchema: {
      type: 'object',
      properties: {
        input_views: { type: 'array', items: { type: 'string' } },
        deform_offset_range: { type: 'number', default: 0.1 },
        confidence_weighting: { type: 'boolean', default: true },
        output_format: { type: 'string', enum: ['ply', 'splat'], default: 'ply' },
      },
      required: ['input_views'],
    },
    handler: async (args) => stubResponse('deformable_aggregate', args, 'GADA feed-forward splatting (ICML 2026). Requires GADA model weights + multi-view input images.'),
  },
  {
    name: 'set_stereoscopic',
    description: '[EXPERIMENTAL — NOT IMPLEMENTED] Stereoscopic dual-eye rendering mode. Message is forwarded but no renderer implements it yet.',
    inputSchema: {
      type: 'object',
      properties: {
        scene_id: { type: 'string' },
        enabled: { type: 'boolean' },
        ipd: { type: 'number', default: 0.063 },
        shared_compute: { type: 'boolean', default: true },
        output_mode: { type: 'string', enum: ['side_by_side', 'top_bottom', 'dual_buffer'], default: 'dual_buffer' },
      },
      required: ['scene_id', 'enabled'],
    },
    handler: async (args, ctx) => {
      const scene = ctx.state.getScene(asString(args, 'scene_id'));
      if (!scene) return error('No active scene.');
      await ctx.bridge.broadcast({
        type: 'set_stereoscopic',
        enabled: args.enabled as boolean,
        ipd: (args.ipd as number) ?? 0.063,
        sharedCompute: (args.shared_compute as boolean) ?? true,
        outputMode: (args.output_mode as string) ?? 'dual_buffer',
      });
      return json({ status: 'forwarded', note: 'EXPERIMENTAL: message broadcast to renderers; no renderer implements stereoscopic output yet.', ipd: args.ipd ?? 0.063 });
    },
  },
  {
    name: 'distractor_decompose',
    description: '[EXPERIMENTAL — NOT IMPLEMENTED] DeSplat transient/static separation. Returns stub status only.',
    inputSchema: {
      type: 'object',
      properties: {
        scene_id: { type: 'string' },
        remove_transient: { type: 'boolean', default: true },
        return_masks: { type: 'boolean', default: false },
      },
      required: ['scene_id'],
    },
    handler: async (args) => stubResponse('distractor_decompose', args, 'DeSplat distractor decomposition. Requires multi-frame input for transient/static separation.'),
  },
  {
    name: 'adaptive_tessellation',
    description: '[EXPERIMENTAL — NOT IMPLEMENTED] Proxy-GS adaptive tessellation / LOD. Returns stub status only.',
    inputSchema: {
      type: 'object',
      properties: {
        scene_id: { type: 'string' },
        level: { type: 'string', enum: ['low', 'medium', 'high', 'adaptive'] },
        target_fps: { type: 'number', default: 60 },
      },
      required: ['scene_id', 'level'],
    },
    handler: async (args) => stubResponse('adaptive_tessellation', args, 'Proxy-GS adaptive tessellation. Requires proxy mesh generation pipeline.'),
  },
  {
    name: 'lod_switch',
    description: '[EXPERIMENTAL — NOT IMPLEMENTED] StreamLoD-GS level-of-detail switching. Returns stub status only.',
    inputSchema: {
      type: 'object',
      properties: {
        scene_id: { type: 'string' },
        level: { type: 'string', enum: ['low', 'medium', 'high'] },
        auto_switch: { type: 'boolean', default: true },
      },
      required: ['scene_id', 'level'],
    },
    handler: async (args) => stubResponse('lod_switch', args, 'StreamLoD-GS level-of-detail switching. Requires pre-computed LOD hierarchy.'),
  },
];

// ---------------------------------------------------------------------------
// Public API
// ---------------------------------------------------------------------------

export const CORE_TOOL_COUNT = coreTools.length;
export const EXPERIMENTAL_TOOL_COUNT = experimentalTools.length;

function includeExperimental(): boolean {
  return process.env.INCLUDE_EXPERIMENTAL === '1' || process.env.INCLUDE_EXPERIMENTAL === 'true';
}

function allTools(): MCPTool[] {
  return includeExperimental() ? [...coreTools, ...experimentalTools] : [...coreTools];
}

/** Tool definitions (schemas only) for ListTools response. */
export function getToolDefinitions(): Array<{ name: string; description: string; inputSchema: Record<string, unknown> }> {
  return allTools().map(({ name, description, inputSchema }) => ({ name, description, inputSchema }));
}

/** Create handler map for CallTool dispatch. */
export function createToolHandlers(ctx: ToolContext): Map<string, (args: Record<string, unknown>) => Promise<ToolResult>> {
  const handlers = new Map<string, (args: Record<string, unknown>) => Promise<ToolResult>>();
  for (const tool of allTools()) {
    handlers.set(tool.name, (args) => tool.handler(args, ctx));
  }
  return handlers;
}
