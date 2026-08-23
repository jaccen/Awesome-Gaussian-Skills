/**
 * Voice-Driven Sculpt Pipeline Demo — v0.9
 *
 * Demonstrates the full spec-first sculpting workflow triggered by voice commands:
 *   voice text → intent mapping → tool calls → results
 *
 * Pipeline: define_scene_spec → sculpt (6 stages) → export_scene_code
 *
 * Run with: npx tsx examples/voice-sculpt-demo.ts
 *
 * This demo directly calls MCP tool handlers against a real SceneState —
 * no MCP client or browser renderer required.
 */

import { SceneState } from '../src/scene-state.js';
import { RendererBridge } from '../src/renderer-bridge.js';
import { getToolDefinitions, createToolHandlers } from '../src/tools.js';
import { mapVoiceIntent } from '../src/voice-intent.js';

// ---------------------------------------------------------------------------
// Demo Scene Specification — "Conference Room"
// ---------------------------------------------------------------------------

const CONFERENCE_ROOM_SPEC = {
  name: 'conference_room',
  components: [
    {
      name: 'floor',
      type: 'plane',
      bbox: { min: [-3, -0.05, -3], max: [3, 0, 3] },
      material: 'wood',
    },
    {
      name: 'table_top',
      type: 'box',
      bbox: { min: [-1.5, 0.7, -0.8], max: [1.5, 0.75, 0.8] },
      material: 'wood',
    },
    {
      name: 'table_leg_1',
      type: 'cylinder',
      bbox: { min: [-1.4, 0, -0.7], max: [-1.2, 0.7, -0.5] },
      material: 'metal',
    },
    {
      name: 'table_leg_2',
      type: 'cylinder',
      bbox: { min: [1.2, 0, -0.7], max: [1.4, 0.7, -0.5] },
      material: 'metal',
    },
    {
      name: 'table_leg_3',
      type: 'cylinder',
      bbox: { min: [-1.4, 0, 0.5], max: [-1.2, 0.7, 0.7] },
      material: 'metal',
    },
    {
      name: 'table_leg_4',
      type: 'cylinder',
      bbox: { min: [1.2, 0, 0.5], max: [1.4, 0.7, 0.7] },
      material: 'metal',
    },
    {
      name: 'chair_seat',
      type: 'box',
      bbox: { min: [-0.3, 0.4, 1.0], max: [0.3, 0.5, 1.6] },
      material: 'fabric',
    },
    {
      name: 'chair_back',
      type: 'box',
      bbox: { min: [-0.3, 0.5, 1.5], max: [0.3, 1.2, 1.6] },
      material: 'fabric',
    },
    {
      name: 'lamp_shade',
      type: 'cone',
      bbox: { min: [-0.3, 2.0, -0.3], max: [0.3, 2.5, 0.3] },
      material: 'glass',
    },
    {
      name: 'lamp_pole',
      type: 'cylinder',
      bbox: { min: [-0.03, 0.75, -0.03], max: [0.03, 2.0, 0.03] },
      material: 'metal',
    },
  ],
  materials: [
    { name: 'wood', type: 'procedural', baseColor: [0.55, 0.35, 0.15], roughness: 0.75, opacity: 1.0 },
    { name: 'metal', type: 'pbr', baseColor: [0.65, 0.65, 0.68], metallic: 0.9, roughness: 0.25, opacity: 1.0 },
    { name: 'fabric', type: 'pbr', baseColor: [0.2, 0.3, 0.5], metallic: 0.0, roughness: 0.9, opacity: 1.0 },
    { name: 'glass', type: 'pbr', baseColor: [0.9, 0.9, 0.95], metallic: 0.1, roughness: 0.05, opacity: 0.6 },
  ],
  target_coverage: 0.8,
  min_psnr: 18,
  target_score: 0.75,
};

// ---------------------------------------------------------------------------
// Voice Session Simulator
// ---------------------------------------------------------------------------

async function runVoiceSculptDemo() {
  console.log('════════════════════════════════════════════════════════════');
  console.log('  Voice-Driven Spec-First Sculpt Pipeline Demo');
  console.log('  v0.9 — 3DGS MCP Renderer Server');
  console.log('════════════════════════════════════════════════════════════\n');

  // Setup tool context
  const state = new SceneState();
  const bridge = new RendererBridge();
  const ctx = { state, bridge, sceneRoots: [] as string[] };
  const handlers = createToolHandlers(ctx);
  const defs = getToolDefinitions();

  console.log(`Tools available: ${defs.length} (core: ${defs.filter(d => !d.description.includes('EXPERIMENTAL')).length})`);
  const sculptDefs = defs.filter(d => ['define_scene_spec', 'sculpt_pipeline', 'export_scene_code'].includes(d.name));
  console.log(`Sculpt tools: ${sculptDefs.map(d => d.name).join(', ')}\n`);

  // Track state across voice commands
  let specId: string | null = null;
  let sceneId: string | null = null;

  // Simulated voice session
  const voiceCommands = [
    { text: 'Create a new scene spec for sculpting', action: 'define' },
    { text: 'Start sculpting the scene', action: 'blockout' },
    { text: 'Run structural segmentation', action: 'structural' },
    { text: 'Refine the form', action: 'form' },
    { text: 'Apply materials to everything', action: 'material' },
    { text: 'Polish the surface', action: 'surface' },
    { text: 'Set up lighting', action: 'lighting' },
    { text: 'Export as Three.js code', action: 'export' },
  ];

  for (const cmd of voiceCommands) {
    console.log('───────────────────────────────────────────────────────────');
    console.log(`🎤 Voice: "${cmd.text}"`);

    // Map voice to intent (for demonstration — each should match)
    const intent = mapVoiceIntent(cmd.text);
    if (!intent.matched) {
      console.log(`  ✗ No intent matched. Falling back to direct call.`);
    } else {
      console.log(`  ✓ Intent: ${intent.intent} — ${intent.description}`);
    }

    // Execute the appropriate tool
    const startTime = Date.now();
    let resultText: string;

    switch (cmd.action) {
      case 'define': {
        const result = await handlers.get('define_scene_spec')!(CONFERENCE_ROOM_SPEC);
        const data = JSON.parse(result.content[0].text);
        specId = data.spec_id;
        resultText = `Spec "${data.name}" defined: ${data.componentCount} components, ${data.materialCount} materials, ${data.qualityGates?.length ?? 6} quality gates`;
        break;
      }
      case 'blockout':
      case 'structural':
      case 'form':
      case 'material':
      case 'surface':
      case 'lighting': {
        if (!specId) {
          resultText = '✗ No spec defined yet';
          break;
        }
        const stageParams: Record<string, unknown> = { spec_id: specId, stage: cmd.action };
        if (cmd.action === 'form') stageParams.params = { density_factor: 1.2 };
        if (cmd.action === 'lighting') stageParams.params = { fov: 45 };
        const result = await handlers.get('sculpt_pipeline')!(stageParams);
        const data = JSON.parse(result.content[0].text);
        sceneId = data.scene_id ?? sceneId;
        const metricsStr = Object.entries(data.metrics as Record<string, number>)
          .map(([k, v]) => `${k}=${typeof v === 'number' ? v.toFixed(3) : v}`)
          .join(', ');
        resultText = `Stage "${data.stage}": ${data.status.toUpperCase()} ${data.passed ? '✓' : '✗'} | ${metricsStr}`;
        break;
      }
      case 'export': {
        if (!sceneId) {
          resultText = '✗ No scene to export';
          break;
        }
        const result = await handlers.get('export_scene_code')!({
          scene_id: sceneId,
          spec_id: specId ?? undefined,
          format: 'threejs+splat',
        });
        const data = JSON.parse(result.content[0].text);
        resultText = `Exported: ${data.procedural_count} procedural components, ${data.splat_count} splat gaussians\n    Code: ${data.code_path ?? 'N/A'}`;
        break;
      }
      default:
        resultText = 'Unknown action';
    }

    const elapsed = Date.now() - startTime;
    console.log(`  → ${resultText} (${elapsed}ms)`);
  }

  // Final scene summary
  console.log('\n════════════════════════════════════════════════════════════');
  const scene = state.getScene(sceneId ?? undefined);
  if (scene) {
    console.log('  Final Scene Summary:');
    console.log(`    Scene ID: ${scene.id}`);
    console.log(`    Gaussians: ${scene.gaussians.length}`);
    console.log(`    Segmentation: ${scene.segmentation.size} parts`);
    console.log(`    BBox: [${scene.bbox.min.map(v => v.toFixed(2)).join(', ')}] → [${scene.bbox.max.map(v => v.toFixed(2)).join(', ')}]`);
    console.log(`    Camera: pos=[${scene.camera.position.map(v => v.toFixed(1)).join(', ')}] target=[${scene.camera.target.map(v => v.toFixed(1)).join(', ')}] fov=${scene.camera.fov}°`);

    // Part breakdown
    console.log('\n    Part Breakdown:');
    for (const [label, ids] of scene.segmentation) {
      const partGaussians = scene.gaussians.filter(g => ids.includes(g.id));
      const colors = partGaussians.map(g => g.color);
      const avgColor = colors.length > 0
        ? colors.reduce((acc, c) => [acc[0] + c[0], acc[1] + c[1], acc[2] + c[2]], [0, 0, 0]).map(v => v / colors.length)
        : [0, 0, 0];
      console.log(`      ${label}: ${ids.length} gaussians, avg color=[${avgColor.map(v => v.toFixed(2)).join(', ')}]`);
    }
  }

  console.log('\n  ✅ Voice-driven sculpt pipeline demo complete.');
  console.log('  In production, voice input → STT → intent mapping → MCP → renderer.');
  console.log('════════════════════════════════════════════════════════════\n');
}

runVoiceSculptDemo().catch(console.error);
