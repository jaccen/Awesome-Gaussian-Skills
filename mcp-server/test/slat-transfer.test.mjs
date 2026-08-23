/**
 * Cross-scene SLAT latent transfer & interpolation tests (v1.1).
 *
 * Covers:
 *   1. transferLatentEdit: source edit replayed onto a target via spatial
 *      correspondence (relative position/color/opacity/delete deltas).
 *   2. interpolateLatent: blend a target toward a source at fraction t.
 *   3. SlatManager.transfer / interpolate lifecycle + error handling.
 */
import test from 'node:test';
import assert from 'node:assert/strict';
import {
  encodeGaussiansToSlat,
  transferLatentEdit,
  interpolateLatent,
  decodeSlatToGaussians,
  SlatManager,
} from '../dist/slat.js';

/** Small cluster of Gaussians with a given origin, color, and part tag. */
function makeCluster(origin, color, count, tag) {
  const gaussians = [];
  for (let i = 0; i < count; i++) {
    gaussians.push({
      id: i,
      position: [origin[0] + (i % 4) * 0.6, origin[1] + (i % 5) * 0.5, origin[2]],
      scale: [0.1, 0.1, 0.1],
      rotation: [1, 0, 0, 0],
      color: [...color],
      opacity: 0.9,
      partName: `${tag}part`,
      semanticLabel: tag,
    });
  }
  return gaussians;
}

/** Two scenes overlapping at the same region so spatial correspondence works. */
function makeScenes() {
  const source = makeCluster([0, 0, 0], [0.5, 0.5, 0.5], 20, 'left');
  const target = makeCluster([0, 0, 0], [0.2, 0.2, 0.2], 20, 'left');
  return {
    sourceSlat: encodeGaussiansToSlat(source, 0.2),
    targetSlat: encodeGaussiansToSlat(target, 0.2),
  };
}

// ---------------------------------------------------------------------------
// 1. transferLatentEdit
// ---------------------------------------------------------------------------

test('transferLatentEdit: recolor on source recolors matching target voxels', () => {
  const { sourceSlat, targetSlat } = makeScenes();
  const res = transferLatentEdit(sourceSlat, targetSlat, {
    op: 'recolor',
    selector: { part: 'left' },
    color: [1, 0, 0],
    mix: 1,
  }, { matchRadius: 0.6 });

  assert.ok(res.metrics.source_edited_voxels > 0, 'source edited voxels > 0');
  assert.ok(res.metrics.matched_target_voxels > 0, 'target voxels matched');
  for (const [key, td] of res.targetDeltas) {
    assert.ok(td.color, 'target voxel gets a color delta');
    const orig = targetSlat.voxels.get(key);
    // Source was 0.5-gray, recolored to red; target (0.2 gray) should move redward.
    assert.ok(td.color[0] > orig.color[0], 'red channel raised');
  }
  // Transferred deltas decode against the target snapshot.
  const out = decodeSlatToGaussians(targetSlat, res.targetDeltas);
  assert.equal(out.length, targetSlat.sourceGaussians.length, 'count preserved');
});

test('transferLatentEdit: translate transfers relative position offset', () => {
  const { sourceSlat, targetSlat } = makeScenes();
  const res = transferLatentEdit(sourceSlat, targetSlat, {
    op: 'translate',
    selector: { part: 'left' },
    delta: [2, 0, 0],
  }, { matchRadius: 0.6 });

  assert.ok(res.targetDeltas.size > 0, 'transferred some voxels');
  for (const [key, td] of res.targetDeltas) {
    assert.ok(td.position, 'target voxel gets position delta');
    const orig = targetSlat.voxels.get(key);
    assert.ok(Math.abs((td.position[0] - orig.position[0]) - 2) < 1e-6, 'relative +2 x applied');
  }
});

test('transferLatentEdit: delete propagates removal to matched target voxels', () => {
  const { sourceSlat, targetSlat } = makeScenes();
  const res = transferLatentEdit(sourceSlat, targetSlat, {
    op: 'delete',
    selector: { part: 'left' },
  }, { matchRadius: 0.6 });
  assert.ok(res.targetDeltas.size > 0, 'some target voxels marked');
  for (const [, td] of res.targetDeltas) assert.equal(td.remove, true);
});

test('transferLatentEdit: strength 0 yields no-op color delta', () => {
  const { sourceSlat, targetSlat } = makeScenes();
  const res = transferLatentEdit(sourceSlat, targetSlat, {
    op: 'recolor',
    selector: { part: 'left' },
    color: [1, 0, 0],
    mix: 1,
  }, { matchRadius: 0.6, strength: 0 });
  for (const [key, td] of res.targetDeltas) {
    const orig = targetSlat.voxels.get(key);
    if (td.color) {
      assert.ok(Math.abs(td.color[0] - orig.color[0]) < 1e-9, 'strength 0 keeps target color');
    }
  }
});

// ---------------------------------------------------------------------------
// 2. interpolateLatent
// ---------------------------------------------------------------------------

test('interpolateLatent: t=0 keeps target unchanged', () => {
  const { sourceSlat, targetSlat } = makeScenes();
  const res = interpolateLatent(targetSlat, sourceSlat, { t: 0, matchRadius: 0.6 });
  assert.ok(res.targetDeltas.size > 0, 'voxels matched');
  for (const [key, td] of res.targetDeltas) {
    const orig = targetSlat.voxels.get(key);
    assert.ok(Math.abs(td.position[0] - orig.position[0]) < 1e-9, 't=0 position unchanged');
    assert.ok(Math.abs(td.color[0] - orig.color[0]) < 1e-9, 't=0 color unchanged');
  }
});

test('interpolateLatent: t=1 adopts source appearance', () => {
  const { sourceSlat, targetSlat } = makeScenes();
  const res = interpolateLatent(targetSlat, sourceSlat, { t: 1, matchRadius: 0.6 });
  for (const [key, td] of res.targetDeltas) {
    const orig = targetSlat.voxels.get(key);
    // t=1 => color becomes the source voxel color at that location (source R=0.5).
    assert.ok(Math.abs(td.color[0] - 0.5) < 1e-9, `t=1 adopts source R=0.5 (got ${td.color[0]})`);
    // position shifts toward the source cluster origin.
    assert.ok(Math.abs(td.position[0] - orig.position[0]) < 1e-6, 'position interpolated toward source');
  }
});

test('interpolateLatent: t clamps to [0,1]', () => {
  const { sourceSlat, targetSlat } = makeScenes();
  const low = interpolateLatent(targetSlat, sourceSlat, { t: -5, matchRadius: 0.6 });
  assert.equal(low.metrics.interpolation_t, 0, 't<0 clamps to 0');
  const high = interpolateLatent(targetSlat, sourceSlat, { t: 9, matchRadius: 0.6 });
  assert.equal(high.metrics.interpolation_t, 1, 't>1 clamps to 1');
});

test('interpolateLatent: color stays within [0,1] at intermediate t', () => {
  const { sourceSlat, targetSlat } = makeScenes();
  const res = interpolateLatent(targetSlat, sourceSlat, { t: 0.5, matchRadius: 0.6 });
  for (const [, td] of res.targetDeltas) {
    for (const c of td.color) assert.ok(c >= 0 && c <= 1, `color channel in range: ${c}`);
  }
});

// ---------------------------------------------------------------------------
// 3. SlatManager.transfer / interpolate
// ---------------------------------------------------------------------------

test('SlatManager.transfer: two encoded snapshots', () => {
  const mgr = new SlatManager();
  const { slatId: srcId } = mgr.encode(makeCluster([0, 0, 0], [0.5, 0.5, 0.5], 10, 'a'), 0.2);
  const { slatId: tgtId } = mgr.encode(makeCluster([0, 0, 0], [0.2, 0.2, 0.2], 10, 'a'), 0.2);
  const res = mgr.transfer(srcId, tgtId, {
    op: 'recolor',
    selector: { part: 'a' },
    color: [1, 0, 0],
    mix: 1,
  }, { matchRadius: 0.6 });
  assert.ok(res.metrics.matched_target_voxels > 0);
  const decoded = mgr.decode(tgtId, res.targetDeltas);
  assert.equal(decoded.length, 10);
});

test('SlatManager.transfer: unknown source throws', () => {
  const mgr = new SlatManager();
  const { slatId: tgtId } = mgr.encode(makeCluster([0, 0, 0], [0.2, 0.2, 0.2], 5, 'a'), 0.2);
  assert.throws(
    () => mgr.transfer('missing', tgtId, { op: 'delete', selector: { part: 'a' } }),
    /SLAT snapshot not found/,
  );
});

test('SlatManager.interpolate: blends and decodes', () => {
  const mgr = new SlatManager();
  const { slatId: srcId } = mgr.encode(makeCluster([0, 0, 0], [0.5, 0.5, 0.5], 10, 'a'), 0.2);
  const { slatId: tgtId } = mgr.encode(makeCluster([0, 0, 0], [0.2, 0.2, 0.2], 10, 'a'), 0.2);
  const res = mgr.interpolate(tgtId, srcId, { t: 0.5, matchRadius: 0.6 });
  assert.equal(res.metrics.interpolation_t, 0.5);
  const decoded = mgr.decode(tgtId, res.targetDeltas);
  assert.equal(decoded.length, 10);
});