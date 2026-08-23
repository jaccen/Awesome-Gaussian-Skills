/**
 * Voice Intent Mapper — Maps natural language voice/text patterns to MCP tool calls.
 *
 * Implements the Voice Intent Mapping tables from:
 * - skills/3dgs-mcp-renderer/SKILL.md (12 patterns)
 * - docs/mcp-integration-roadmap.md Phase 2 (6 patterns)
 *
 * Usage:
 *   const result = mapVoiceIntent("show me the scene from above");
 *   if (result.matched) {
 *     for (const call of result.toolCalls) {
 *       await mcpServer.callTool(call.tool, call.params);
 *     }
 *   }
 */

import type { VoiceIntentRule, VoiceIntentResult } from './types.js';

const rules: VoiceIntentRule[] = [
  // --- Camera & View ---
  {
    description: 'Bird\'s-eye / top-down camera view',
    intent: 'camera_top_down',
    pattern: /(show|view|look).*(from above|top.down|bird'|aerial|overhead)/i,
    toolCalls: [
      { tool: 'set_camera', params: { position: [0, 10, 0], target: [0, 0, 0], fov: 60, up: [0, 0, -1] } },
      { tool: 'render_frame', params: { width: 1920, height: 1080 } },
    ],
  },
  {
    description: 'Front view camera',
    intent: 'camera_front',
    pattern: /(show|view|look).*(from front|front view|straight on)/i,
    toolCalls: [
      { tool: 'set_camera', params: { position: [0, 0, -5], target: [0, 0, 0], fov: 60 } },
      { tool: 'render_frame', params: {} },
    ],
  },
  {
    description: 'Side view camera',
    intent: 'camera_side',
    pattern: /(show|view|look).*(from side|side view|profile)/i,
    toolCalls: [
      { tool: 'set_camera', params: { position: [5, 0, 0], target: [0, 0, 0], fov: 60 } },
      { tool: 'render_frame', params: {} },
    ],
  },

  // --- Gaussian Editing ---
  {
    description: 'Reduce blurriness by increasing density',
    intent: 'reduce_blur',
    pattern: /(make|it).*(less blurry|sharper|more detail|clearer|crisp)/i,
    toolCalls: [
      {
        tool: 'modify_gaussians',
        params: {
          select: {},
          operations: [{ property: 'opacity', action: 'set', value: 0.95 }],
        },
      },
      { tool: 'render_frame', params: {} },
    ],
  },
  {
    description: 'Make object transparent/fade',
    intent: 'make_transparent',
    pattern: /(make|set).*(transparent|invisible|fade|ghost|see.through)/i,
    toolCalls: [
      {
        tool: 'modify_gaussians',
        params: {
          select: { label: '$LABEL' },
          operations: [{ property: 'opacity', action: 'multiply', value: 0.2 }],
        },
      },
    ],
  },
  {
    description: 'Make object fully visible',
    intent: 'make_visible',
    pattern: /(make|set).*(visible|opaque|solid|appear)/i,
    toolCalls: [
      {
        tool: 'modify_gaussians',
        params: {
          select: { label: '$LABEL' },
          operations: [{ property: 'opacity', action: 'set', value: 1.0 }],
        },
      },
    ],
  },

  // --- Pruning & Optimization ---
  {
    description: 'Reduce model size / make smaller',
    intent: 'prune_model',
    pattern: /(make|it).*(smaller|lighter|compress|reduce size|fewer gaussians?)/i,
    toolCalls: [
      { tool: 'prune_by_importance', params: { strategy: 'dog', target_ratio: 0.3 } },
      { tool: 'render_frame', params: {} },
    ],
  },
  {
    description: 'Make it run faster (LOD or compression)',
    intent: 'optimize_speed',
    pattern: /(make|it).*(run faster|faster|speed up|optimize)/i,
    toolCalls: [
      { tool: 'prune_by_importance', params: { strategy: 'gradient', target_ratio: 0.5 } },
      { tool: 'render_frame', params: {} },
    ],
  },

  // --- Spatial Queries ---
  {
    description: 'Spatial relation query (what is on/next to something)',
    intent: 'spatial_relation',
    pattern: /(what|which).*(on|next to|inside|behind|in front of|left of|right of|above|below)/i,
    toolCalls: [
      { tool: 'query_spatial_context', params: { mode: 'relation' } },
    ],
  },
  {
    description: 'Spatial measurement (how far, distance)',
    intent: 'spatial_measurement',
    pattern: /(how far|distance|measure|how big|how tall|dimensions?)/i,
    toolCalls: [
      { tool: 'query_spatial_context', params: { mode: 'measurement' } },
    ],
  },
  {
    description: 'Scene graph query',
    intent: 'scene_graph',
    pattern: /(scene graph|what.*in.*scene|scene structure|layout|what.*objects)/i,
    toolCalls: [
      { tool: 'query_spatial_context', params: { mode: 'scene_graph' } },
    ],
  },

  // --- Articulated Manipulation ---
  {
    description: 'Rotate/move articulated part',
    intent: 'articulated_rotate',
    pattern: /(rotate|move|turn|open|close|extend|retract).*(arm|door|drawer|wheel|joint|lid|leg|hand|finger)/i,
    toolCalls: [
      { tool: 'set_rotation', params: { part: '$PART', angle: 30 } },
      { tool: 'render_frame', params: {} },
    ],
  },

  // --- Physics ---
  {
    description: 'Simulate physics (drop, fall, collapse)',
    intent: 'physics_simulate',
    pattern: /(drop|fall|collapse|simulate|physics|gravity|push|throw)/i,
    toolCalls: [
      { tool: 'simulate_physics', params: { solver_type: 'rigid_body', steps: 10 } },
      { tool: 'render_frame', params: {} },
    ],
  },

  // --- 4D / Temporal ---
  {
    description: 'Temporal scene query (what was here at time t)',
    intent: 'temporal_query',
    pattern: /(what.*(was|happened).*(at|in|during).*time|temporal|time.*(t=|index)|scrub|previous frame)/i,
    toolCalls: [
      { tool: 'query_4d_scene', params: { x: 0, y: 0, t: 0, query_fields: ['position_3d', 'segmentation_label'] } },
    ],
  },

  // --- PBR / Material ---
  {
    description: 'Set material to metallic',
    intent: 'pbr_metallic',
    pattern: /(make|set).*(metallic|metal|chrome|steel|iron)/i,
    toolCalls: [
      { tool: 'set_pbr_material', params: { metallic: 1.0, roughness: 0.3 } },
    ],
  },
  {
    description: 'Infer materials from appearance',
    intent: 'pbr_infer',
    pattern: /(infer|estimate|derive|extract).*(material|appearance|albedo|pbr|texture)/i,
    toolCalls: [
      { tool: 'set_pbr_material', params: { infer_from_appearance: true } },
    ],
  },

  // --- Provenance ---
  {
    description: 'Query model provenance / authenticity',
    intent: 'provenance_query',
    pattern: /(where.*(come from|origin|source)|authentic|real|fake|forgery|provenance|lineage|trace)/i,
    toolCalls: [
      { tool: 'query_provenance', params: { query_type: 'lineage' } },
    ],
  },
  {
    description: 'Forgery detection',
    intent: 'forgery_detect',
    pattern: /(fake|tampered|forged|manipulated|altered|is this real)/i,
    toolCalls: [
      { tool: 'query_provenance', params: { query_type: 'forgery_detection' } },
    ],
  },

  // --- VR / Stereoscopic ---
  {
    description: 'Enable VR / stereoscopic mode',
    intent: 'vr_enable',
    pattern: /(vr|stereo|headset|virtual reality|3d mode|dual eye)/i,
    toolCalls: [
      { tool: 'set_stereoscopic', params: { enabled: true, ipd: 0.063 } },
    ],
  },

  // --- Density Control ---
  {
    description: 'Auto-tune density (Bayesian)',
    intent: 'density_auto',
    pattern: /(auto.*(tune|optimize|adjust).*(density|gaussian)|bayesian|dp.splat|automatic density)/i,
    toolCalls: [
      { tool: 'bayesian_density_control', params: { concentration: 1.0 } },
      { tool: 'render_frame', params: {} },
    ],
  },

  // --- Distractor Removal ---
  {
    description: 'Remove transient objects / distractors',
    intent: 'distractor_remove',
    pattern: /(remove|delete|hide).*(person|people|transient|distractor|moving|pedestrian|car)/i,
    toolCalls: [
      { tool: 'distractor_decompose', params: {} },
      { tool: 'render_frame', params: {} },
    ],
  },

  // --- Export ---
  {
    description: 'Export current scene',
    intent: 'export_scene',
    pattern: /(export|download|save).*(ply|splat|scene|model|file)/i,
    toolCalls: [
      { tool: 'export_result', params: { format: 'ply' } },
    ],
  },

  // --- Scene Stats ---
  {
    description: 'Query scene statistics',
    intent: 'scene_stats',
    pattern: /(how many|count|stats|statistics|info|summary|detail).*(gaussian|scene|model)/i,
    toolCalls: [
      { tool: 'query_scene', params: { query_type: 'stats' } },
    ],
  },

  // --- Spec-First Sculpting (v0.9) ---
  {
    description: 'Define a scene spec for sculpting',
    intent: 'sculpt_define',
    pattern: /(define|create|new|make).*(spec|scene spec|object spec|blueprint|sculpt)/i,
    toolCalls: [
      { tool: 'define_scene_spec', params: {} },
    ],
  },
  {
    description: 'Start sculpting (blockout stage)',
    intent: 'sculpt_blockout',
    pattern: /(sculpt|build|blockout|block out|start sculpting|begin sculpting)/i,
    toolCalls: [
      { tool: 'sculpt_pipeline', params: { stage: 'blockout' } },
    ],
  },
  {
    description: 'Run structural segmentation',
    intent: 'sculpt_structural',
    pattern: /(structural|segment|partition|divide into parts|identify parts)/i,
    toolCalls: [
      { tool: 'sculpt_pipeline', params: { stage: 'structural' } },
    ],
  },
  {
    description: 'Refine form',
    intent: 'sculpt_form',
    pattern: /(refine form|form|shape|refine geometry|smooth geometry)/i,
    toolCalls: [
      { tool: 'sculpt_pipeline', params: { stage: 'form' } },
    ],
  },
  {
    description: 'Apply materials',
    intent: 'sculpt_material',
    pattern: /(material|texture|color|paint|assign material|apply material)/i,
    toolCalls: [
      { tool: 'sculpt_pipeline', params: { stage: 'material' } },
    ],
  },
  {
    description: 'Finalize surface',
    intent: 'sculpt_surface',
    pattern: /(surface|polish|finish surface|clean up surface)/i,
    toolCalls: [
      { tool: 'sculpt_pipeline', params: { stage: 'surface' } },
    ],
  },
  {
    description: 'Set up lighting / camera framing',
    intent: 'sculpt_lighting',
    pattern: /(lighting|light|frame the scene|set up camera|final render|lighting setup)/i,
    toolCalls: [
      { tool: 'sculpt_pipeline', params: { stage: 'lighting' } },
    ],
  },
  {
    description: 'Export scene as Three.js code',
    intent: 'export_code',
    pattern: /(export|generate|download).*(code|three\.?js|javascript|html|runnable)/i,
    toolCalls: [
      { tool: 'export_scene_code', params: { format: 'threejs+splat' } },
    ],
  },

  // --- SLAT Latent Editing (v1.0) ---
  {
    description: 'Encode the scene into a SLAT latent snapshot',
    intent: 'slat_encode',
    pattern: /(encode|create|build|make).*(slat|latent|voxel|latent space|latent snapshot)/i,
    toolCalls: [
      { tool: 'encode_scene_slatent', params: { voxel_size: 0.1 } },
    ],
  },
  {
    description: 'Move a part/region in latent space',
    intent: 'slat_translate',
    pattern: /(move|shift|drag|translate|push).*(the |a |this )?(part|object|region|piece|left|right|forward|backward|up|down)/i,
    toolCalls: [
      { tool: 'edit_scene_latent', params: { op: { op: 'translate', selector: { part: '$PART' }, delta: [0, 0, 0] } } },
    ],
  },
  {
    description: 'Rotate a part/region in latent space',
    intent: 'slat_rotate',
    pattern: /(rotate|spin|turn|tilt).*(part|object|region|piece|arm|door|wheel)/i,
    toolCalls: [
      { tool: 'edit_scene_latent', params: { op: { op: 'rotate', selector: { part: '$PART' }, axis: 'y', angle_deg: 30 } } },
    ],
  },
  {
    description: 'Rescale a part/region in latent space',
    intent: 'slat_scale',
    pattern: /(scale|shrink|grow|enlarge|resize|bigger|smaller).*(part|object|region|piece|table|chair)/i,
    toolCalls: [
      { tool: 'edit_scene_latent', params: { op: { op: 'scale', selector: { part: '$PART' }, factor: 1.5 } } },
    ],
  },
  {
    description: 'Recolor a part/region in latent space',
    intent: 'slat_recolor',
    pattern: /(paint|recolor|change.*color|make.*(red|blue|green|white|black|color)|tint).*(part|object|region|piece)/i,
    toolCalls: [
      { tool: 'edit_scene_latent', params: { op: { op: 'recolor', selector: { part: '$PART' }, color: [1, 0, 0] } } },
    ],
  },
  {
    description: 'Fade a part/region in latent space',
    intent: 'slat_opacity',
    pattern: /(fade|fade out|make.*transparent|ghost|see.through|invisible).*(part|object|region|piece)/i,
    toolCalls: [
      { tool: 'edit_scene_latent', params: { op: { op: 'opacity', selector: { part: '$PART' }, opacity: 0.2, mode: 'set' } } },
    ],
  },
  {
    description: 'Delete a part/region in latent space',
    intent: 'slat_delete',
    pattern: /(remove|delete|get rid of|erase|drop).*(part|object|region|piece|table|chair|sphere)/i,
    toolCalls: [
      { tool: 'edit_scene_latent', params: { op: { op: 'delete', selector: { part: '$PART' } } } },
    ],
  },
  {
    description: 'Smooth a part/region in latent space',
    intent: 'slat_smooth',
    pattern: /(smooth|soften|blur).*(part|object|region|surface|geometry)/i,
    toolCalls: [
      { tool: 'edit_scene_latent', params: { op: { op: 'smooth', selector: { part: '$PART' }, iterations: 2 } } },
    ],
  },
  {
    description: 'List active SLAT snapshots',
    intent: 'slat_list',
    pattern: /(list|show|what).*(slat|latent snapshot|snapshots|latents)/i,
    toolCalls: [
      { tool: 'list_slatents', params: {} },
    ],
  },
];

/**
 * Map natural language text to MCP tool calls.
 * Returns the first matching rule.
 */
export function mapVoiceIntent(text: string): VoiceIntentResult {
  for (const rule of rules) {
    if (rule.pattern.test(text)) {
      // Extract variable placeholders ($LABEL, $PART) from text
      const toolCalls = rule.toolCalls.map((call) => {
        const params = { ...call.params };
        for (const [key, val] of Object.entries(params)) {
          if (typeof val === 'string' && val.startsWith('$')) {
            params[key] = extractVariable(val, text) ?? val;
          }
        }
        return { tool: call.tool, params };
      });

      return {
        matched: true,
        intent: rule.intent,
        toolCalls,
        description: rule.description,
        rawText: text,
      };
    }
  }

  return {
    matched: false,
    intent: 'unknown',
    toolCalls: [],
    description: 'No matching voice intent pattern found',
    rawText: text,
  };
}

/**
 * Try to extract a variable value from the input text.
 * $LABEL → look for "the <label>" pattern
 * $PART → look for named parts (arm, door, drawer, etc.)
 */
function extractVariable(placeholder: string, text: string): string | null {
  if (placeholder === '$LABEL') {
    const match = text.match(/(?:make|set|the)\s+(\w+(?:\s+\w+)?)\s+(?:transparent|invisible|fade|visible|opaque|solid)/i);
    if (match) return match[1].toLowerCase();
    return 'unknown';
  }
  if (placeholder === '$PART') {
    const match = text.match(/(?:rotate|move|turn|open|close|extend|retract)\s+(?:the\s+)?(\w+)/i);
    if (match) return match[1].toLowerCase();
    return 'unknown';
  }
  return placeholder;
}

/**
 * List all available voice intent patterns for introspection.
 */
export function listVoiceIntents(): Array<{ intent: string; description: string; pattern: string; tools: string[] }> {
  return rules.map((r) => ({
    intent: r.intent,
    description: r.description,
    pattern: r.pattern.source,
    tools: r.toolCalls.map((c) => c.tool),
  }));
}
