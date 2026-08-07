/**
 * Pruning + spatial index + ray casting tests.
 */
import test from 'node:test';
import assert from 'node:assert/strict';
import { SceneState } from '../dist/scene-state.js';

function seededState(count = 600) {
  const state = new SceneState();
  // Deterministic pseudo-random scene on a 3D grid
  const gaussians = [];
  let seed = 42;
  const rnd = () => { seed = (seed * 1103515245 + 12345) & 0x7fffffff; return seed / 0x7fffffff; };
  for (let i = 0; i < count; i++) {
    gaussians.push({
      id: i,
      position: [rnd() * 10, rnd() * 10, rnd() * 10],
      scale: [0.01 + rnd() * 0.2, 0.01 + rnd() * 0.2, 0.01 + rnd() * 0.2],
      rotation: [1, 0, 0, 0],
      color: [rnd(), rnd(), rnd()],
      opacity: 0.1 + rnd() * 0.9,
    });
  }
  const id = state.createScene('test://grid', 'ply', gaussians);
  return { state, id };
}

test('pruneByImportance respects target_ratio for every strategy', () => {
  const strategies = ['sparsity', 'dog', 'coreset', 'gradient', 'variational'];
  for (const strategy of strategies) {
    const { state } = seededState(600);
    const r = state.pruneByImportance(strategy, 0.5);
    assert.equal(r.strategy, strategy);
    assert.equal(r.removed + r.remaining, 600);
    assert.ok(Math.abs(r.remaining - 300) <= 1, `${strategy}: expected ~300 remaining, got ${r.remaining}`);
  }
});

test('different strategies prune different Gaussians', () => {
  const { state: a } = seededState(400);
  const { state: b } = seededState(400);
  a.pruneByImportance('coreset', 0.3);
  b.pruneByImportance('gradient', 0.3);
  // survivors differ because scoring functions differ
  const idsA = a.getScene().gaussians.map((g) => `${g.position[0].toFixed(3)}`).sort().join(',');
  const idsB = b.getScene().gaussians.map((g) => `${g.position[0].toFixed(3)}`).sort().join(',');
  assert.notEqual(idsA, idsB, 'coreset vs gradient should keep different subsets');
});

test('pruneByImportance protect-region keeps enclosed Gaussians', () => {
  const { state, id } = seededState(500);
  const scene = state.getScene(id);
  // Pick one Gaussian and protect a large region around it
  const target = scene.gaussians[123];
  const before = { ...target.position };
  const r = state.pruneByImportance('sparsity', 0.2, [{ center: before, radius: 100 }]);
  // radius 100 covers the whole 10x10x10 scene → nothing should be pruned
  assert.equal(r.removed, 0);
});

test('pruneByImportance rejects unknown strategy', () => {
  const { state } = seededState(100);
  assert.throws(() => state.pruneByImportance('bogus', 0.5), /Unknown pruning strategy/i);
});

test('castRay hits a dense Gaussian cluster and misses empty space', () => {
  const state = new SceneState();
  const gaussians = [];
  for (let i = 0; i < 200; i++) {
    gaussians.push({
      id: i,
      position: [5 + (i % 10) * 0.05, 5, 5],
      scale: [0.3, 0.3, 0.3],
      rotation: [1, 0, 0, 0],
      color: [1, 0, 0],
      opacity: 1,
    });
  }
  state.createScene('test://ray', 'ply', gaussians);

  const hit = state.castRay([0, 5, 5], [1, 0, 0]);
  assert.equal(hit.hit, true, 'ray toward the cluster should hit');
  assert.ok(hit.distance > 4 && hit.distance < 6, `hit distance ~5, got ${hit.distance}`);

  const miss = state.castRay([0, 50, 50], [1, 0, 0]);
  assert.equal(miss.hit, false, 'ray far from the cluster should miss');
});

test('spatialContext measurement computes Euclidean distance', () => {
  const { state } = seededState(200);
  const r = state.spatialContext({ mode: 'measurement', pointA: [0, 0, 0], pointB: [3, 4, 0] });
  assert.equal(r.mode, 'measurement');
  assert.ok(Math.abs(r.distance - 5) < 1e-9, `expected distance 5, got ${r.distance}`);
});

test('spatialContext scene_graph returns clusters + bbox', () => {
  const { state } = seededState(400);
  const r = state.spatialContext({ mode: 'scene_graph', maxClusters: 8 });
  assert.equal(r.mode, 'scene_graph');
  assert.ok(Array.isArray(r.clusters) && r.clusters.length > 0);
  assert.ok(r.bbox && r.bbox.min && r.bbox.max);
  assert.ok(r.clusters[0].centroid.length === 3);
});
