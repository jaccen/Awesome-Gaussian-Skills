/**
 * Voice-Driven Demo — Simulates a voice-driven 3DGS session.
 *
 * Shows the full closed-loop: voice text → intent mapping → MCP tool calls → results.
 * Run with: npx tsx examples/voice-demo.ts
 *
 * This demo does NOT require a real MCP client — it directly calls the
 * voice intent mapper and simulates tool execution against SceneState.
 */

import { SceneState } from '../src/scene-state.js';
import { mapVoiceIntent, listVoiceIntents } from '../src/voice-intent.ts';

// ---------------------------------------------------------------------------
// Simulated Tool Executor
// ---------------------------------------------------------------------------

async function simulateToolCall(
  toolName: string,
  params: Record<string, unknown>,
  state: SceneState,
): Promise<string> {
  switch (toolName) {
    case 'import_scene': {
      const result = state.generateSyntheticScene(50000);
      return `Loaded scene ${result.id} with ${result.gaussianCount} Gaussians`;
    }
    case 'set_camera': {
      const cam = state.getCamera();
      if (cam) {
        state.setCamera(params as any);
        return `Camera moved to position=[${(params.position as number[]).join(', ')}]`;
      }
      return 'No active scene';
    }
    case 'render_frame': {
      const start = Date.now();
      await new Promise((r) => setTimeout(r, 50)); // Simulate render time
      return `Rendered in ${Date.now() - start}ms (1920x1080)`;
    }
    case 'modify_gaussians': {
      const scene = state.getScene();
      const count = scene?.gaussians.length ?? 0;
      return `Modified ${count} Gaussians`;
    }
    case 'prune_by_importance': {
      const scene = state.getScene();
      const before = scene?.gaussians.length ?? 0;
      const result = state.pruneByImportance(
        params.strategy as string,
        params.target_ratio as number,
      );
      return `Pruned ${result.removed} Gaussians (${before} → ${result.remaining}, strategy=${params.strategy})`;
    }
    case 'query_scene': {
      const stats = state.getStats();
      return `Scene stats: ${stats.gaussianCount} Gaussians, bbox=[${stats.bbox.min.join(',')}..${stats.bbox.max.join(',')}]`;
    }
    default:
      return `[STUB] ${toolName} executed (backend pending)`;
  }
}

// ---------------------------------------------------------------------------
// Demo Session
// ---------------------------------------------------------------------------

async function runVoiceDemo() {
  console.log('════════════════════════════════════════════════════════');
  console.log('  3DGS MCP Voice-Driven Demo Session');
  console.log('  v0.5.0 — Awesome-Gaussian-Skills');
  console.log('════════════════════════════════════════════════════════\n');

  const state = new SceneState();

  // List available voice intents
  console.log('─ Available Voice Intents ─────────────────────────────');
  const intents = listVoiceIntents();
  for (const intent of intents.slice(0, 8)) {
    console.log(`  • ${intent.intent}: ${intent.description}`);
  }
  console.log(`  ... and ${intents.length - 8} more\n`);

  // Simulated voice inputs
  const voiceInputs = [
    'Load a scene from the PLY file',
    'Show me the scene from above',
    'How many Gaussians are in the scene?',
    'Make it less blurry',
    'Make it smaller',
    'Export the scene as PLY',
  ];

  for (const voiceInput of voiceInputs) {
    console.log('───────────────────────────────────────────────────────');
    console.log(`🎤 Voice: "${voiceInput}"`);

    // Special case: "load a scene" doesn't match any intent, handle directly
    if (/load|import|open.*(scene|ply|file)/i.test(voiceInput)) {
      const result = await simulateToolCall('import_scene', { source: 'demo.ply' }, state);
      console.log(`  → import_scene: ${result}`);
      continue;
    }

    const intent = mapVoiceIntent(voiceInput);

    if (!intent.matched) {
      console.log(`  ✗ No matching intent for: "${voiceInput}"`);
      continue;
    }

    console.log(`  ✓ Intent: ${intent.intent} (${intent.description})`);

    // Execute tool calls
    for (const call of intent.toolCalls) {
      console.log(`  → ${call.tool}(${JSON.stringify(call.params).slice(0, 80)}...)`);
      const result = await simulateToolCall(call.tool, call.params, state);
      console.log(`    Result: ${result}`);
    }
  }

  console.log('\n════════════════════════════════════════════════════════');
  console.log('  Demo complete. In production, these tool calls would');
  console.log('  go through the MCP server to the browser renderer.');
  console.log('════════════════════════════════════════════════════════\n');
}

runVoiceDemo().catch(console.error);
