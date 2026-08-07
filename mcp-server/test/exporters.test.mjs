/**
 * Exporter tests — real PLY/SPLAT serialization round-trips.
 */
import test from 'node:test';
import assert from 'node:assert/strict';
import fs from 'node:fs';
import path from 'node:path';
import os from 'node:os';
import { toPlyBuffer, toSplatBuffer } from '../dist/exporters.js';
import { SceneState } from '../dist/scene-state.js';

function sampleGaussians(n = 10) {
  const gs = [];
  for (let i = 0; i < n; i++) {
    gs.push({
      id: i,
      position: [i * 0.5, i * 0.25, -i * 0.1],
      scale: [0.05, 0.06, 0.07],
      rotation: [1, 0, 0, 0],
      color: [0.2, 0.5, 0.9],
      opacity: 0.8,
    });
  }
  return gs;
}

test('toPlyBuffer emits valid 3DGS header and full property stride', () => {
  const buf = toPlyBuffer(sampleGaussians(7));
  const headerEnd = buf.indexOf('\nend_header\n');
  assert.ok(headerEnd > 0);
  const header = buf.toString('ascii', 0, headerEnd);
  assert.match(header, /format binary_little_endian/);
  assert.match(header, /element vertex 7/);
  for (const p of ['x', 'f_dc_0', 'opacity', 'scale_0', 'rot_3', 'f_rest_44']) {
    assert.ok(header.includes(`property float ${p}`), `missing property ${p}`);
  }
  // 62 properties × 4 bytes × 7 vertices after header
  const expected = headerEnd + '\nend_header\n'.length + 62 * 4 * 7;
  assert.equal(buf.length, expected);
});

test('PLY export round-trips through the PLY loader (count + geometry)', () => {
  const dir = fs.mkdtempSync(path.join(os.tmpdir(), 'export-'));
  const file = path.join(dir, 'roundtrip.ply');
  fs.writeFileSync(file, toPlyBuffer(sampleGaussians(12)));

  const state = new SceneState();
  const result = state.loadFromPlyFile(file);
  assert.equal(result.gaussianCount, 12);
  const g = state.getScene(result.id).gaussians[4];
  assert.ok(Math.abs(g.position[0] - 2.0) < 1e-5);
  // opacity 0.8 survives logit→sigmoid round-trip
  assert.ok(Math.abs(g.opacity - 0.8) < 1e-4, `opacity round-trip failed: ${g.opacity}`);
  // scale 0.05 survives log→exp round-trip
  assert.ok(Math.abs(g.scale[0] - 0.05) < 1e-5, `scale round-trip failed: ${g.scale[0]}`);
  fs.rmSync(dir, { recursive: true, force: true });
});

test('toSplatBuffer writes exactly 32 bytes per splat with clamped rgba', () => {
  const gs = sampleGaussians(5);
  const buf = toSplatBuffer(gs);
  assert.equal(buf.length, 5 * 32);
  // position of splat #2
  assert.ok(Math.abs(buf.readFloatLE(2 * 32 + 0) - 1.0) < 1e-6);
  // color 0.2 → round(51)
  assert.equal(buf.readUInt8(2 * 32 + 24), 51);
  // opacity 0.8 → round(204)
  assert.equal(buf.readUInt8(2 * 32 + 27), 204);
});

test('SceneState integrates with exporters (scene → ply buffer)', () => {
  const state = new SceneState();
  const { id } = state.generateSyntheticScene(50);
  const scene = state.getScene(id);
  const buf = toPlyBuffer(scene.gaussians);
  assert.ok(buf.length > 50 * 62 * 4);
  assert.match(buf.toString('ascii', 0, 200), /element vertex 50/);
});
