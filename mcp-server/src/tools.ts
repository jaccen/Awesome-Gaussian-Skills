/**
 * MCP Tool Definitions & Handlers — v0.8 (P1 工具治理)
 *
 * Core tools (real implementations, always listed):
 *   import_scene, set_camera, modify_gaussians, render_frame, query_scene,
 *   cast_ray, export_result, prune_by_importance, set_gaussian_density,
 *   adjust_opacity, set_rotation, query_spatial_context, resolve_voice_command
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
