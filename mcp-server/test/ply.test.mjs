/**
 * PLY parser tests — synthetic binary 3DGS PLY round-trip through SceneState.
 * Run: node --test test/  (from mcp-server/, after build)
 */
import test from 'node:test';
import assert from 'node:assert/strict';
import fs from 'node:fs';
import path from 'node:path';
import os from 'node:os';
import { SceneState } from '../dist/scene-state.js';

const SH_C0 = 0.28209479177387814;

function sigmoid(x) { return 1 / (1 + Math.exp(-x)); }

/** Build a minimal binary_little_endian 3DGS PLY with n Gaussians. */
function makePly(n) {
  const props = ['x', 'y', 'z', 'f_dc_0', 'f_dc_1', 'f_dc_2', 'opacity', 'scale_0', 'scale_1', 'scale_2', 'rot_0', 'rot_1', 'rot_2', 'rot_3'];
  const header =
    'ply\nformat binary_little_endian 1.0\n' +
    `element vertex ${n}\n` +
    props.map((p) => `property float ${p}`).join('\n') +
    '\nend_header\n';
  const stride = props.length * 4;
  const data = Buffer.alloc(n * stride);
  for (let i = 0; i < n; i++) {
    const off = i * stride;
    let p = 0;
    const w = (v) => data.writeFloatLE(v, off + (p++) * 4);
    w(i * 1.0); w(i * 2.0); w(i * 3.0);        // position
    w(0.5 / SH_C0); w(0.5 / SH_C0); w(0.5 / SH_C0); // f_dc → color 1.0 → ~0.78 after +0.5
    w(0.0);                                     // opacity logit 0 → sigmoid 0.5
    w(Math.log(0.1)); w(Math.log(0.2)); w(Math.log(0.3)); // scale log
    w(1); w(0); w(0); w(0);                     // rotation wxyz
  }
  return Buffer.concat([Buffer.from(header, 'ascii'), data]);
}

test('parsePlyHeader reads vertex count, stride, 3DGS flag', () => {
  const state = new SceneState();
  const header = state.parsePlyHeader(makePly(3));
  assert.equal(header.vertexCount, 3);
  assert.equal(header.format, 'binary_little_endian');
  assert.equal(header.has3dgs, true);
  assert.equal(header.properties.length, 14);
});

test('loadFromPlyFile inverts activations (sigmoid/exp/SH DC)', () => {
  const dir = fs.mkdtempSync(path.join(os.tmpdir(), 'plytest-'));
  const file = path.join(dir, 'test.ply');
  fs.writeFileSync(file, makePly(5));

  const state = new SceneState();
  const result = state.loadFromPlyFile(file);
  assert.equal(result.gaussianCount, 5);
  const scene = state.getScene(result.id);
  assert.ok(scene);

  const g = scene.gaussians[2];
  assert.ok(Math.abs(g.position[0] - 2.0) < 1e-5);
  assert.ok(Math.abs(g.position[1] - 4.0) < 1e-5);
  assert.ok(Math.abs(g.opacity - 0.5) < 1e-5, `opacity sigmoid(0) should be 0.5, got ${g.opacity}`);
  assert.ok(Math.abs(g.scale[0] - 0.1) < 1e-4, `scale exp(log 0.1) should be 0.1, got ${g.scale[0]}`);
  assert.ok(Math.abs(g.scale[2] - 0.3) < 1e-4);
  // f_dc = 0.5/SH_C0 → color = f_dc*SH_C0 + 0.5 = 1.0
  assert.ok(Math.abs(g.color[0] - 1.0) < 1e-4);

  fs.rmSync(dir, { recursive: true, force: true });
});

test('loadFromPlyFile rejects missing file', () => {
  const state = new SceneState();
  assert.throws(() => state.loadFromPlyFile('/nonexistent/nope.ply'), /not found/i);
});

test('scene index persistence round-trips stable ids', () => {
  const dir = fs.mkdtempSync(path.join(os.tmpdir(), 'plyidx-'));
  const file = path.join(dir, 'scene.ply');
  fs.writeFileSync(file, makePly(4));
  const indexPath = path.join(dir, 'index.json');

  const s1 = new SceneState();
  const { id } = s1.loadFromPlyFile(file);
  assert.equal(s1.saveIndex(indexPath), 1);

  const s2 = new SceneState();
  const restore = s2.loadIndex(indexPath);
  assert.equal(restore.restored, 1);
  assert.ok(s2.getScene(id), 'restored scene must keep its original id');
  assert.equal(s2.getScene(id).gaussians.length, 4);

  fs.rmSync(dir, { recursive: true, force: true });
});
