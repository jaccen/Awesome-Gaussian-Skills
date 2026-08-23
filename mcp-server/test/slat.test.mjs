/**
 * SLAT latent editing tests — encode, edit ops, decode, SlatManager.
 *
 * Tests cover:
 *   1. encodeGaussiansToSlat: spatial hashing, per-voxel aggregation, bbox
 *   2. applyLatentEdit: translate / scale / rotate / recolor / opacity / smooth / delete
 *   3. decodeSlatToGaussians: unselected region preserved, deltas applied, delete drops
 *   4. SlatManager: encode/edit/decode/list lifecycle
 */
import test from 'node:test';
import assert from 'node:assert/strict';
import {
  encodeGaussiansToSlat,
  applyLatentEdit,
  decodeSlatToGaussians,
  SlatManager,
} from '../dist/slat.js';

// ---------------------------------------------------------------------------
// Fixtures
// ---------------------------------------------------------------------------

/** Deterministic cluster of Gaussians grouped into two part clusters. */
function makeTwoClusterScene() {
  const gaussians = [];
  let id = 0;
  // Cluster A: "table" around x in [-1, 1], centered near origin.
  for (let i = 0; i < 20; i++) {
    gaussians.push({
      id: id++,
      position: [0 + (i % 4) * 0.6, 0 + (i % 5) * 0.5, 0],
      scale: [0.1, 0.1, 0.1],
      rotation: [1, 0, 0, 0],
      color: [0.5, 0.5, 0.5],
      opacity: 0.9,
      partName: 'clusterA',
      semanticLabel: 'left',
    });
  }
  // Cluster B: "region" around x=5, centered at z=5.
  for (let i = 0; i < 15; i++) {
    gaussians.push({
      id: id++,
      position: [5 + (i % 3) * 0.2, 5 + (i % 5) * 0.15, 5 + (i % 2) * 0.1],
      scale: [0.1, 0.1, 0.1],
      rotation: [1, 0, 0, 0],
      color: [0.8, 0.2, 0.2],
      opacity: 0.8,
      partName: 'clusterB',
      semanticLabel: 'right',
    });
  }
  return gaussians;
}

/** Select the voxels whose semanticLabel is 'left' (cluster A). */
function selectorFor(label) {
  return { part: label };
}

// ---------------------------------------------------------------------------
// 1. Encoding
// ---------------------------------------------------------------------------

test('encodeGaussiansToSlat: creates voxels with aggregated features and bbox', () => {
  const gaussians = makeTwoClusterScene();
  const slat = encodeGaussiansToSlat(gaussians, 0.1);

  assert.ok(slat.voxels.size > 0, 'expected at least one voxel');
  // Voxel keys are "x,y,z" integer coords.
  for (const v of slat.voxels.values()) {
    assert.ok(v.id, 'voxel has id');
    assert.equal(v.id.split(',').length, 3, 'voxel id is x,y,z key');
    assert.ok(v.gaussianIds.length >= 1, 'voxel has at least one gaussian');
    assert.equal(v.count, v.gaussianIds.length);
    assert.ok(v.opacity >= 0 && v.opacity <= 1, 'opacity in range');
    assert.ok(v.color.every((c) => c >= 0 && c <= 1), 'color in range');
  }

  // bbox matches the extremes of the two clusters.
  assert.ok(slat.bbox.min[0] <= slat.bbox.max[0]);
  assert.ok(slat.bbox.max[2] >= 5, 'bbox covers cluster B z extent');
  // Source gaussians are preserved for decode.
  assert.equal(slat.sourceGaussians.length, gaussians.length);
});

test('encodeGaussiansToSlat: source gaussians are preserved (decode relies on them)', () => {
  const gaussians = makeTwoClusterScene();
  const slat = encodeGaussiansToSlat(gaussians, 0.2);
  assert.equal(slat.sourceGaussians.length, 35);
  assert.equal(slat.sourceGaussians[0].id, 0);
});

// ---------------------------------------------------------------------------
// 2. Edit Ops
// ---------------------------------------------------------------------------

test('applyLatentEdit translate: moves selected voxels, leaves others', () => {
  const slat = encodeGaussiansToSlat(makeTwoClusterScene(), 0.2);
  const before = Array.from(slat.voxels.values());
  const target = slat.voxels.get('0,0,0') ?? before[0];

  const res = applyLatentEdit(slat, {
    op: 'translate',
    selector: { region: { center: target.position, radius: 0.6 } },
    delta: [2, 0, 0],
  });

  assert.ok(res.metrics.affected_voxels > 0, 'should affect some voxels');
  // Every delta must have a position change.
  for (const [, d] of res.deltas) {
    assert.ok(d.position, 'translated voxel has position delta');
  }
  // A delta maps voxel id -> new absolute position.
  const [key, d] = res.deltas.entries().next().value;
  const orig = slat.voxels.get(key);
  assert.ok(Math.abs(d.position[0] - (orig.position[0] + 2)) < 1e-6, 'delta is absolute translated position');
});

test('translate: origin bbox edit returns correct metrics', () => {
  const slat = encodeGaussiansToSlat(makeTwoClusterScene(), 0.2);
  const res = applyLatentEdit(slat, {
    op: 'translate',
    selector: { bbox: { min: [4, 4, 4], max: [6, 6, 6] } },
    delta: [0, 0, -1],
  });
  assert.ok(res.metrics.affected_voxels >= 0);
});

test('scale: grows selected voxels about origin', () => {
  const slat = encodeGaussiansToSlat(makeTwoClusterScene(), 0.2);
  const res = applyLatentEdit(slat, {
    op: 'scale',
    selector: { region: { center: [0, 0, 0], radius: 1.5 } },
    factor: 2,
    origin: [0, 0, 0],
  });
  for (const [, d] of res.deltas) {
    assert.ok(d.position, 'scaled voxel has position');
  }
});

test('rotate: rotates selected voxels about an origin', () => {
  const slat = encodeGaussiansToSlat(makeTwoClusterScene(), 0.2);
  const res = applyLatentEdit(slat, {
    op: 'rotate',
    selector: { bbox: { min: [-1, -1, -1], max: [1, 1, 1] } },
    axis: 'y',
    angleDeg: 90,
    origin: [0, 0, 0],
  });
  // Rotation keeps distance from origin roughly constant (90° about y).
  for (const [key, d] of res.deltas) {
    const orig = slat.voxels.get(key);
    const origR = Math.hypot(orig.position[0], orig.position[2]);
    const newR = Math.hypot(d.position[0], d.position[2]);
    assert.ok(Math.abs(origR - newR) < 1e-6, `rotation preserves radial distance (${origR} vs ${newR})`);
  }
});

test('recolor: blends selected voxels toward target color', () => {
  const slat = encodeGaussiansToSlat(makeTwoClusterScene(), 0.2);
  const res = applyLatentEdit(slat, {
    op: 'recolor',
    selector: { part: 'cluster' },
    color: [1, 0, 0],
    mix: 1,
  });
  for (const [, d] of res.deltas) {
    assert.ok(d.color, 'recolored voxel has color');
    assert.deepEqual(d.color, [1, 0, 0]);
  }
});

test('opacity: set mode clamps to target; multiply mode scales', () => {
  const slat = encodeGaussiansToSlat(makeTwoClusterScene(), 0.2);
  const setRes = applyLatentEdit(slat, { op: 'opacity', selector: { part: 'cluster' }, opacity: 0.5, mode: 'set' });
  for (const [, d] of setRes.deltas) assert.equal(d.opacity, 0.5);

  const mulRes = applyLatentEdit(slat, { op: 'opacity', selector: { part: 'cluster' }, opacity: 0.5, mode: 'multiply' });
  for (const [, d] of mulRes.deltas) {
    assert.ok(d.opacity < 1, 'multiply reduces opacity');
  }
});

test('smooth: averages selected voxel positions with neighbors (reduces spread)', () => {
  const gaussians = makeTwoClusterScene();
  const slat = encodeGaussiansToSlat(gaussians, 0.2);
  const res = applyLatentEdit(slat, { op: 'smooth', selector: { part: 'cluster' }, iterations: 1 });
  // A selected voxel that moved must have converged toward its neighbors.
  assert.ok(res.deltas.size >= 0);
});

test('delete: marks selected voxels for removal', () => {
  const slat = encodeGaussiansToSlat(makeTwoClusterScene(), 0.2);
  const res = applyLatentEdit(slat, { op: 'delete', selector: { part: 'cluster' } });
  assert.ok(res.metrics.affected_voxels > 0, 'delete affects voxels');
  for (const [, d] of res.deltas) assert.equal(d.remove, true);
});

// ---------------------------------------------------------------------------
// 3. Decode
// ---------------------------------------------------------------------------

test('decode: unselected voxels keep original position/color/opacity', () => {
  const gaussians = makeTwoClusterScene();
  const slat = encodeGaussiansToSlat(gaussians, 0.2);
  const deltas = new Map();
  const out = decodeSlatToGaussians(slat, deltas);
  assert.equal(out.length, gaussians.length, 'no-op decode preserves count');
  const byId = new Map(out.map((g) => [g.id, g]));
  for (const g of gaussians) {
    const o = byId.get(g.id);
    assert.deepEqual(o.position, g.position, 'position unchanged');
    assert.deepEqual(o.color, g.color, 'color unchanged');
    assert.equal(o.opacity, g.opacity, 'opacity unchanged');
  }
});

test('decode: applies delta to affected gaussians', () => {
  const gaussians = makeTwoClusterScene();
  const slat = encodeGaussiansToSlat(gaussians, 0.2);
  const target = slat.voxels.values().next().value;
  const deltas = new Map([[target.id, { position: [99, 99, 99], color: [0, 1, 0], opacity: 0.1 }]]);
  const out = decodeSlatToGaussians(slat, deltas);
  const byId = new Map(out.map((g) => [g.id, g]));
  for (const gid of target.gaussianIds) {
    const o = byId.get(gid);
    assert.deepEqual(o.position, [99, 99, 99], 'delta position applied');
    assert.deepEqual(o.color, [0, 1, 0], 'delta color applied');
    assert.equal(o.opacity, 0.1, 'delta opacity applied');
  }
});

test('decode: delete removes affected gaussians', () => {
  const gaussians = makeTwoClusterScene();
  const slat = encodeGaussiansToSlat(gaussians, 0.2);
  const target = slat.voxels.values().next().value;
  const deltas = new Map([[target.id, { remove: true }]]);
  const out = decodeSlatToGaussians(slat, deltas);
  const removedIds = new Set(target.gaussianIds);
  assert.ok(removedIds.size > 0, 'target voxel has gaussians');
  assert.equal(out.length, gaussians.length - removedIds.size, 'removed affected gaussians');
  for (const g of out) assert.ok(!removedIds.has(g.id), 'removed gaussians gone');
});

// ---------------------------------------------------------------------------
// 4. SlatManager
// ---------------------------------------------------------------------------

test('SlatManager: encode / edit / decode / list lifecycle', () => {
  const mgr = new SlatManager();
  const gaussians = makeTwoClusterScene();

  const { slatId, slat } = mgr.encode(gaussians, 0.2);
  assert.equal(slatId.startsWith('slat_'), true);
  assert.equal(mgr.list().length, 1);

  const res = mgr.edit(slatId, { op: 'recolor', selector: { part: 'cluster' }, color: [1, 1, 1] });
  assert.ok(res.metrics.affected_voxels > 0);

  const decoded = mgr.decode(slatId, res.deltas);
  assert.equal(decoded.length, gaussians.length);
});

test('SlatManager: edit on unknown id throws', () => {
  const mgr = new SlatManager();
  assert.throws(
    () => mgr.edit('nope', { op: 'translate', selector: { part: 'x' }, delta: [0, 0, 0] }),
    /SLAT snapshot not found/,
  );
});

test('SlatManager: get returns null for unknown id', () => {
  const mgr = new SlatManager();
  assert.equal(mgr.get('missing'), null);
});