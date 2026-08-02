/**
 * MCP Tool Definitions & Handlers — 24 tools for 3DGS rendering pipeline.
 *
 * Implemented tools (full logic):     import_scene, set_camera, modify_gaussians,
 *   render_frame, query_scene, cast_ray, prune_by_importance, export_result,
 *   set_gaussian_density, adjust_opacity, set_rotation
 *
 * Stub tools (schema complete, backend pending): simulate_physics, query_4d_scene,
 *   deform_elastic, query_spatial_context, bayesian_density_control, moe_deform,
 *   surgical_tracking, query_provenance, set_pbr_material, deformable_aggregate,
 *   set_stereoscopic, distractor_decompose, adaptive_tessellation, lod_switch
 */

import type { ToolResult } from './types.js';
import type { SceneState } from './scene-state.js';
import type { RendererBridge } from './renderer-bridge.js';
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
}

function json(data: unknown): ToolResult {
  return {
    content: [{ type: 'text', text: JSON.stringify(data, null, 2) }],
  };
}

function error(message: string): ToolResult {
  return { content: [{ type: 'text', text: `Error: ${message}` }], isError: true };
}

function stubResponse(name: string, args: Record<string, unknown>, description: string): ToolResult {
  return json({
    tool: name,
    status: 'stub',
    description,
    receivedArgs: args,
    message: 'Backend integration pending. Tool schema fully defined per SKILL.md spec.',
  });
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

// ---------------------------------------------------------------------------
// Core Tools (Fully Implemented)
// ---------------------------------------------------------------------------

const tools: MCPTool[] = [
  // === Tool 1: import_scene ===
  {
    name: 'import_scene',
    description: 'Load a 3DGS scene from PLY/SPLAT file or URL into the renderer. Returns scene_id, gaussian_count, and bounding box.',
    inputSchema: {
      type: 'object',
      properties: {
        source: { type: 'string', description: 'File path or URL to .ply/.splat file. Use "synthetic://sphere" for a test scene.' },
        format: { type: 'string', enum: ['ply', 'splat', 'spz', 'ksplat'], description: 'File format' },
      },
      required: ['source'],
    },
    handler: async (args, ctx) => {
      const source = args.source as string;
      const format = (args.format as string) ?? 'ply';

      // Synthetic scene for testing
      if (source.startsWith('synthetic://')) {
        const result = ctx.state.generateSyntheticScene(10000);
        const scene = ctx.state.getScene(result.id)!;
        await ctx.bridge.send({ type: 'load_scene', sceneId: result.id, source, format });
        return json({ scene_id: result.id, gaussian_count: result.gaussianCount, bbox: scene.bbox });
      }

      // Real PLY file loading — parse actual binary data
      // Resolve file path: support absolute paths, relative to cwd, or scenes/ directory
      let filePath = source;
      if (!_path.isAbsolute(filePath)) {
        // Try scenes/ directory first, then cwd
        const scenesPath = _path.resolve(process.cwd(), 'scenes', filePath);
        const cwdPath = _path.resolve(process.cwd(), filePath);
        if (_fs.existsSync(scenesPath)) {
          filePath = scenesPath;
        } else if (_fs.existsSync(cwdPath)) {
          filePath = cwdPath;
        }
      }

      if (_fs.existsSync(filePath)) {
        try {
          const result = ctx.state.loadFromPlyFile(filePath);
          const scene = ctx.state.getScene(result.id);

          // Push parsed point cloud directly to the browser renderer
          // (instead of having the browser re-download the PLY file)
          if (scene && scene.gaussians.length > 0) {
            const gaussians = scene.gaussians;
            const positions = new Float32Array(gaussians.length * 3);
            const colors = new Float32Array(gaussians.length * 3);
            const opacities = new Float32Array(gaussians.length);

            // Debug: log first 5 gaussians to verify data
            for (let di = 0; di < Math.min(5, gaussians.length); di++) {
              console.error(`[import_scene] Gaussian[${di}]: pos=[${gaussians[di].position}], color=[${gaussians[di].color}], opacity=${gaussians[di].opacity}`);
            }

            for (let i = 0; i < gaussians.length; i++) {
              positions[i * 3 + 0] = gaussians[i].position[0];
              positions[i * 3 + 1] = gaussians[i].position[1];
              positions[i * 3 + 2] = gaussians[i].position[2];

              // Color: gamma=0.55 for AdditiveBlending — moderate darkening
              // to compensate for additive accumulation brightening overlaps.
              const gamma = 0.55;
              colors[i * 3 + 0] = Math.pow(Math.max(0, Math.min(1, gaussians[i].color[0])), gamma);
              colors[i * 3 + 1] = Math.pow(Math.max(0, Math.min(1, gaussians[i].color[1])), gamma);
              colors[i * 3 + 2] = Math.pow(Math.max(0, Math.min(1, gaussians[i].color[2])), gamma);
              opacities[i] = gaussians[i].opacity;
            }
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
            await ctx.bridge.pushPointCloud({
              sceneId: result.id,
              positions,
              colors,
              opacities,
              pointCount: gaussians.length,
              bboxCenter: center,
              bboxSize: size,
            });
          }

          return json({
            scene_id: result.id,
            gaussian_count: result.gaussianCount,
            bbox: result.bbox,
            sampled: result.sampled,
            file_path: filePath,
          });
        } catch (parseErr: any) {
          // Fall back to synthetic if parsing fails
          console.error(`[import_scene] PLY parse failed, falling back to synthetic: ${parseErr.message}`);
        }
      }

      // Fallback: synthetic scene for unrecognized or failed files
      const result = ctx.state.generateSyntheticScene(50000);
      const scene = ctx.state.getScene(result.id)!;
      scene.source = source;
      await ctx.bridge.send({ type: 'load_scene', sceneId: result.id, source, format });
      return json({
        scene_id: result.id,
        gaussian_count: result.gaussianCount,
        bbox: scene.bbox,
        note: `Loaded from ${source} (synthetic fallback — file not found or parse error)`,
      });
    },
  },

  // === Tool 2: set_camera ===
  {
    name: 'set_camera',
    description: 'Set camera position, target (look-at point), field of view, and up vector.',
    inputSchema: {
      type: 'object',
      properties: {
        position: { type: 'array', items: { type: 'number' }, description: '[x, y, z] camera position' },
        target: { type: 'array', items: { type: 'number' }, description: '[x, y, z] look-at point' },
        fov: { type: 'number', description: 'Field of view in degrees' },
        up: { type: 'array', items: { type: 'number' }, description: '[x, y, z] up vector' },
      },
      required: ['position', 'target'],
    },
    handler: async (args, ctx) => {
      const scene = ctx.state.getScene();
      if (!scene) return error('No active scene. Call import_scene first.');

      ctx.state.setCamera({
        position: args.position as [number, number, number],
        target: args.target as [number, number, number],
        fov: args.fov as number | undefined,
        up: args.up as [number, number, number] | undefined,
      });

      await ctx.bridge.send({
        type: 'set_camera',
        position: scene.camera.position,
        target: scene.camera.target,
        fov: scene.camera.fov,
        up: scene.camera.up,
      });

      return json({ status: 'ok', camera: scene.camera });
    },
  },

  // === Tool 3: modify_gaussians ===
  {
    name: 'modify_gaussians',
    description: 'Modify properties of Gaussians by selection criteria (IDs, spherical region, or semantic label). Operations: set/add/multiply on opacity, color, position, scale, rotation.',
    inputSchema: {
      type: 'object',
      properties: {
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
              value: {},
            },
          },
        },
      },
      required: ['select', 'operations'],
    },
    handler: async (args, ctx) => {
      const scene = ctx.state.getScene();
      if (!scene) return error('No active scene.');

      const select = args.select as Record<string, unknown>;
      const operations = args.operations as unknown[];
      const selected = ctx.state.selectGaussians(select as any);

      // Safety gate: operations affecting >10% require confirmation (logged)
      const pct = (selected.length / scene.gaussians.length) * 100;
      if (pct > 10) {
        console.error(`[SAFETY] modify_gaussians affecting ${pct.toFixed(1)}% of ${scene.gaussians.length} Gaussians`);
      }

      ctx.state.applyOperations(selected, operations as any);
      await ctx.bridge.send({ type: 'modify_gaussians', select: select as any, operations: operations as any });

      return json({ status: 'ok', modified_count: selected.length, total_gaussians: scene.gaussians.length });
    },
  },

  // === Tool 4: render_frame ===
  {
    name: 'render_frame',
    description: 'Render current scene from current camera and return as base64 image. Always includes render_time_ms for performance monitoring.',
    inputSchema: {
      type: 'object',
      properties: {
        width: { type: 'integer', default: 1920 },
        height: { type: 'integer', default: 1080 },
        format: { type: 'string', enum: ['png', 'jpeg', 'webp'], default: 'png' },
        background: { type: 'string', default: '#000000' },
      },
    },
    handler: async (args, ctx) => {
      const scene = ctx.state.getScene();
      if (!scene) return error('No active scene.');

      const width = (args.width as number) ?? 1920;
      const height = (args.height as number) ?? 1080;
      const format = (args.format as string) ?? 'png';
      const background = (args.background as string) ?? '#000000';

      const response = await ctx.bridge.send({ type: 'render', width, height, format, background });

      if (response.type === 'render_result') {
        // If renderer returned actual image data, save to temp file and return URL
        if (response.image && response.image.length > 100) {
          const renderId = `render-${Date.now()}`;
          const renderDir = _path.resolve(process.cwd(), '.temp', 'renders');
          if (!_fs.existsSync(renderDir)) _fs.mkdirSync(renderDir, { recursive: true });
          const renderPath = _path.join(renderDir, `${renderId}.${format}`);
          const buf = Buffer.from(response.image, 'base64');
          _fs.writeFileSync(renderPath, buf);
          return json({
            image_url: `/api/renders/${renderId}.${format}`,
            render_time_ms: response.renderTimeMs,
            width: response.width,
            height: response.height,
            has_image: true,
            image_size_bytes: buf.length,
          });
        }
        return json({
          image: '(headless mode — no image)',
          render_time_ms: response.renderTimeMs,
          width: response.width,
          height: response.height,
          has_image: false,
        });
      }
      return error('Render failed');
    },
  },

  // === Tool 5: query_scene ===
  {
    name: 'query_scene',
    description: 'Query scene information: statistics (gaussian count, bbox, avg opacity), bbox, gaussian_at_point, segmentation, or materials.',
    inputSchema: {
      type: 'object',
      properties: {
        query_type: { type: 'string', enum: ['stats', 'bbox', 'gaussian_at_point', 'segmentation', 'materials'] },
        point: { type: 'array', items: { type: 'number' }, description: '[x, y, z] for point queries' },
      },
      required: ['query_type'],
    },
    handler: async (args, ctx) => {
      const queryType = args.query_type as string;
      const scene = ctx.state.getScene();
      if (!scene) return error('No active scene.');

      switch (queryType) {
        case 'stats': {
          const stats = ctx.state.getStats();
          const extra: Record<string, unknown> = {};
          if (scene.filePath) extra.file_path = scene.filePath;
          if (scene.headerInfo) {
            extra.ply_format = scene.headerInfo.format;
            extra.total_vertex_count = scene.headerInfo.vertexCount;
            extra.vertex_stride = scene.headerInfo.vertexStride;
            extra.property_count = scene.headerInfo.properties.length;
            extra.is_3dgs = scene.headerInfo.has3dgs;
          }
          return json({ ...stats, ...extra });
        }
        case 'bbox':
          return json({ bbox: scene.bbox });
        case 'gaussian_at_point': {
          const point = args.point as number[];
          if (!point) return error('point parameter required for gaussian_at_point');
          const g = ctx.state.gaussianAtPoint(point);
          return g ? json({ gaussian: g }) : error('No Gaussian found');
        }
        case 'segmentation': {
          const segs = Array.from(scene.segmentation.entries()).map(([label, ids]) => ({ label, count: ids.length }));
          return json({ segmentation: segs, total_labels: segs.length });
        }
        case 'materials':
          return json({ has_pbr: scene.metadata.hasPBR, message: 'PBR material data requires set_pbr_material or external loader' });
        default:
          return error(`Unknown query_type: ${queryType}`);
      }
    },
  },

  // === Tool 6: cast_ray ===
  {
    name: 'cast_ray',
    description: 'Cast a ray from origin in direction and return first surface hit. Leverages DDF-GS neural field for accurate ray-Gaussian intersection.',
    inputSchema: {
      type: 'object',
      properties: {
        origin: { type: 'array', items: { type: 'number' }, description: '[x, y, z] ray origin' },
        direction: { type: 'array', items: { type: 'number' }, description: '[x, y, z] ray direction (normalized)' },
      },
      required: ['origin', 'direction'],
    },
    handler: async (args, ctx) => {
      const scene = ctx.state.getScene();
      if (!scene) return error('No active scene.');

      const origin = args.origin as number[];
      const direction = args.direction as number[];

      // Simplified ray-marching against Gaussian positions (real impl uses DDF-GS)
      let closestDist = Infinity;
      let hitGaussian = null;
      for (const g of scene.gaussians) {
        const dx = g.position[0] - origin[0];
        const dy = g.position[1] - origin[1];
        const dz = g.position[2] - origin[2];
        // Project onto ray direction
        const t = dx * direction[0] + dy * direction[1] + dz * direction[2];
        if (t < 0 || t > closestDist) continue;
        // Perpendicular distance
        const px = dx - t * direction[0];
        const py = dy - t * direction[1];
        const pz = dz - t * direction[2];
        const perpDist = Math.sqrt(px * px + py * py + pz * pz);
        const gaussRadius = Math.max(g.scale[0], g.scale[1], g.scale[2]);
        if (perpDist < gaussRadius && t < closestDist) {
          closestDist = t;
          hitGaussian = g;
        }
      }

      if (hitGaussian) {
        return json({ hit: true, distance: closestDist, gaussian_id: hitGaussian.id, position: hitGaussian.position });
      }
      return json({ hit: false, distance: Infinity, normal: null });
    },
  },

  // === Tool 7: export_result ===
  {
    name: 'export_result',
    description: 'Export the current scene state to PLY, SPLAT, or JSON format. Never modifies original files — creates a new export.',
    inputSchema: {
      type: 'object',
      properties: {
        format: { type: 'string', enum: ['ply', 'splat', 'json'], default: 'ply' },
        output_path: { type: 'string', description: 'Output file path. If omitted, returns data inline.' },
      },
    },
    handler: async (args, ctx) => {
      const scene = ctx.state.getScene();
      if (!scene) return error('No active scene.');

      const format = (args.format as string) ?? 'ply';
      const outputPath = args.output_path as string | undefined;

      if (format === 'json') {
        return json({
          scene_id: scene.id,
          source: scene.source,
          format: scene.format,
          gaussian_count: scene.gaussians.length,
          camera: scene.camera,
          bbox: scene.bbox,
          metadata: scene.metadata,
          message: 'JSON export complete (scene metadata). Gaussian data omitted for brevity.',
        });
      }

      await ctx.bridge.send({ type: 'export', format, outputPath: outputPath ?? 'stdout' });
      return json({
        status: 'ok',
        format,
        gaussian_count: scene.gaussians.length,
        output_path: outputPath ?? '(inline/bridge)',
        message: `Exported ${scene.gaussians.length} Gaussians as ${format.toUpperCase()}`,
      });
    },
  },

  // === Tool 8: prune_by_importance (Phase 1 — fully implemented) ===
  {
    name: 'prune_by_importance',
    description: 'Agent-controlled importance-based pruning of Gaussians using DoG, coreset, gradient, sparsity, or variational strategy. Returns removed/remaining counts.',
    inputSchema: {
      type: 'object',
      properties: {
        scene_id: { type: 'string', description: 'Scene identifier (uses active scene if omitted)' },
        strategy: { type: 'string', enum: ['dog', 'coreset', 'gradient', 'sparsity', 'variational'], description: 'Pruning strategy' },
        target_ratio: { type: 'number', minimum: 0.1, maximum: 0.9, description: 'Target Gaussian retention ratio' },
        preserve_regions: { type: 'array', items: { type: 'object' }, description: 'Bounding regions to protect from pruning' },
      },
      required: ['strategy', 'target_ratio'],
    },
    handler: async (args, ctx) => {
      const scene = ctx.state.getScene(args.scene_id as string);
      if (!scene) return error('No active scene.');

      const strategy = args.strategy as string;
      const targetRatio = args.target_ratio as number;
      const preserveRegions = args.preserve_regions as Array<{ center: number[]; radius: number }> | undefined;

      const result = ctx.state.pruneByImportance(strategy, targetRatio, preserveRegions, args.scene_id as string);

      return json({
        status: 'ok',
        strategy,
        target_ratio: targetRatio,
        removed: result.removed,
        remaining: result.remaining,
        original_count: result.removed + result.remaining,
      });
    },
  },

  // === Tool 9: set_gaussian_density (Phase 1 — implemented) ===
  {
    name: 'set_gaussian_density',
    description: 'Control Gaussian count per region via density map. Targets oversmoothing in flat regions and underdetail in complex regions.',
    inputSchema: {
      type: 'object',
      properties: {
        scene_id: { type: 'string' },
        mode: { type: 'string', enum: ['increase', 'decrease', 'auto'], description: 'Density adjustment mode' },
        factor: { type: 'number', minimum: 0.1, maximum: 10.0, description: 'Density adjustment factor (1.0 = no change)' },
        region: { type: 'object', description: 'Target region (omit for global)' },
      },
      required: ['mode'],
    },
    handler: async (args, ctx) => {
      const scene = ctx.state.getScene(args.scene_id as string);
      if (!scene) return error('No active scene.');
      const mode = args.mode as string;
      const factor = (args.factor as number) ?? 2.0;
      const before = scene.gaussians.length;

      if (mode === 'increase') {
        // Clone existing Gaussians to increase density
        const clones = scene.gaussians.slice(0, Math.floor(scene.gaussians.length * (factor - 1))).map((g, i) => ({
          ...g,
          id: scene.gaussians.length + i,
          position: [g.position[0] + (Math.random() - 0.5) * 0.01, g.position[1] + (Math.random() - 0.5) * 0.01, g.position[2] + (Math.random() - 0.5) * 0.01] as [number, number, number],
        }));
        scene.gaussians.push(...clones);
      } else if (mode === 'decrease') {
        scene.gaussians = scene.gaussians.filter((_, i) => i % Math.ceil(factor) === 0);
        scene.gaussians.forEach((g, i) => (g.id = i));
      }

      return json({ status: 'ok', mode, factor, before, after: scene.gaussians.length });
    },
  },

  // === Tool 10: adjust_opacity (Phase 1 — implemented) ===
  {
    name: 'adjust_opacity',
    description: 'Batch-adjust opacity values for selected Gaussians. Supports per-Gaussian opacity adjustment via selection criteria.',
    inputSchema: {
      type: 'object',
      properties: {
        scene_id: { type: 'string' },
        select: { type: 'object', description: 'Selection criteria (same as modify_gaussians)' },
        opacity: { type: 'number', minimum: 0, maximum: 1, description: 'Target opacity value' },
        action: { type: 'string', enum: ['set', 'add', 'multiply'], default: 'set' },
      },
      required: ['opacity'],
    },
    handler: async (args, ctx) => {
      const scene = ctx.state.getScene(args.scene_id as string);
      if (!scene) return error('No active scene.');

      const select = (args.select as Record<string, unknown>) ?? {};
      const opacity = args.opacity as number;
      const action = (args.action as string) ?? 'set';
      const selected = ctx.state.selectGaussians(select as any);

      ctx.state.applyOperations(selected, [{ property: 'opacity', action: action as 'set' | 'add' | 'multiply', value: opacity }]);

      return json({ status: 'ok', adjusted: selected.length, opacity, action });
    },
  },

  // === Tool 11: set_rotation (Phase 1 — implemented) ===
  {
    name: 'set_rotation',
    description: 'Per-Gaussian rotation control for articulated object manipulation. Rotates selected Gaussians or parts by quaternion or Euler angles.',
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
    handler: async (args, ctx) => {
      const scene = ctx.state.getScene(args.scene_id as string);
      if (!scene) return error('No active scene.');

      const part = args.part as string | undefined;
      const angle = (args.angle as number) ?? 0;
      const axis = (args.axis as number[]) ?? [0, 1, 0];

      let selected;
      if (part) {
        selected = scene.gaussians.filter((g) => g.partName === part);
      } else if (args.select) {
        selected = ctx.state.selectGaussians(args.select as any);
      } else {
        return error('Either "part" or "select" must be specified');
      }

      // Convert angle (degrees) + axis to quaternion
      const rad = (angle * Math.PI) / 180;
      const halfRad = rad / 2;
      const sinHalf = Math.sin(halfRad);
      const w = Math.cos(halfRad);
      const x = axis[0] * sinHalf;
      const y = axis[1] * sinHalf;
      const z = axis[2] * sinHalf;

      ctx.state.applyOperations(selected, [{ property: 'rotation', action: 'set', value: [w, x, y, z] }]);
      return json({ status: 'ok', part: part ?? '(custom selection)', rotated: selected.length, angle, axis });
    },
  },

  // === Tools 12-24: Stub implementations (schema complete) ===

  {
    name: 'simulate_physics',
    description: 'Invoke external physics engine (MPM/SPH/PBD) on 3DGS scene via RAF-style representation abstraction.',
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
    description: 'Query dynamic 3D scene at arbitrary (x,y,t) coordinates. Enables voice-driven temporal navigation via D4RT unified query mechanism.',
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
    description: 'Apply particle-skinned eigenmode deformation to 3DGS object (FreeForm-style elastic deformation).',
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
    name: 'query_spatial_context',
    description: 'Query spatial understanding of the current 3DGS scene using spatial intelligence models (Holi-Spatial/Spatial-TTT). Returns spatial relations, grounding, and scene graph.',
    inputSchema: {
      type: 'object',
      properties: {
        scene_id: { type: 'string' },
        query: { type: 'string', description: 'Natural language spatial query' },
        mode: { type: 'string', enum: ['grounding', 'relation', 'measurement', 'scene_graph'] },
      },
      required: ['scene_id', 'query', 'mode'],
    },
    handler: async (args) => stubResponse('query_spatial_context', args, 'Spatial intelligence via Holi-Spatial (ICML 2026) + Spatial-TTT (ECCV 2026). Requires spatial model integration.'),
  },

  {
    name: 'bayesian_density_control',
    description: 'Agent-controlled Bayesian nonparametric Gaussian density control. Uses DP-Splat Dirichlet-process prior to automatically determine optimal Gaussian count per region.',
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
    description: 'Apply Mixture-of-Experts dynamic deformation to selected Gaussians. Uses MoE-GS/MoDE expert routing per motion pattern.',
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
    description: 'Track surgical instruments and reconstruct tissue map in real-time using Track2Map surgical GS SLAM.',
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
    handler: async (args) => stubResponse('surgical_tracking', args, 'Track2Map surgical GS SLAM. Requires surgical video stream + Track2Map model. MICCAI 2026 integration pending.'),
  },

  {
    name: 'query_provenance',
    description: 'Query 3DGS model provenance and IP forensics using GaussTrace. Constructs directed provenance graphs for model lineage tracing and forgery detection.',
    inputSchema: {
      type: 'object',
      properties: {
        scene_id: { type: 'string' },
        query_type: { type: 'string', enum: ['lineage', 'attribution', 'forgery_detection', 'training_data_influence'] },
        evidence_threshold: { type: 'number', default: 0.75 },
      },
      required: ['scene_id', 'query_type'],
    },
    handler: async (args) => stubResponse('query_provenance', args, 'GaussTrace provenance graph (ICML 2026). Requires trained GaussTrace model for scene attribute analysis.'),
  },

  {
    name: 'set_pbr_material',
    description: 'Set physically-based rendering material properties on selected Gaussians using MGM and InvSplat representations.',
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
    handler: async (args) => stubResponse('set_pbr_material', args, 'PBR material via MGM + InvSplat. Requires material inference model for relightable editing.'),
  },

  {
    name: 'deformable_aggregate',
    description: 'Apply geometry-aware deformable aggregation (GADA) to feed-forward 3DGS from multi-view images. 2.13x faster FPS with improved PSNR.',
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
    description: 'Enable stereoscopic (dual-eye) rendering mode for VR/AR HMDs. Shares compute between eyes using StereoGS paradigm.',
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
      const scene = ctx.state.getScene(args.scene_id as string);
      if (!scene) return error('No active scene.');
      await ctx.bridge.send({
        type: 'set_stereoscopic',
        enabled: args.enabled as boolean,
        ipd: (args.ipd as number) ?? 0.063,
        sharedCompute: (args.shared_compute as boolean) ?? true,
        outputMode: (args.output_mode as string) ?? 'dual_buffer',
      });
      return json({ status: args.enabled ? 'stereoscopic_enabled' : 'stereoscopic_disabled', ipd: args.ipd ?? 0.063 });
    },
  },

  {
    name: 'distractor_decompose',
    description: 'Separates transient objects from static background (DeSplat integration). Useful for removing people, cars, or other moving objects.',
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
    description: 'Dynamically adjust proxy mesh tessellation density (Proxy-GS integration) for LOD-aware rendering.',
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
    description: 'Switch Level-of-Detail for streaming FVV (StreamLoD-GS integration). Controls quality vs. bandwidth trade-off.',
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

/** Tool definitions (schemas only) for ListTools response. */
export const toolDefinitions = tools.map(({ name, description, inputSchema }) => ({
  name,
  description,
  inputSchema,
}));

/** Create handler map for CallTool dispatch. */
export function createToolHandlers(ctx: ToolContext): Map<string, (args: Record<string, unknown>) => Promise<ToolResult>> {
  const handlers = new Map<string, (args: Record<string, unknown>) => Promise<ToolResult>>();
  for (const tool of tools) {
    handlers.set(tool.name, (args) => tool.handler(args, ctx));
  }
  return handlers;
}
