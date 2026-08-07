/**
 * Scene State Manager — In-memory storage for loaded 3DGS scenes.
 * Maintains Gaussian arrays, camera state, segmentation, and metadata.
 * All operations are in-memory; no original PLY files are ever modified.
 */

import type { Scene, Gaussian, CameraState, BoundingBox, GaussianSelection, GaussianOperation, PlyHeaderInfo, PlyProperty } from './types.js';
import { createRequire } from 'module';
import { fileURLToPath } from 'url';
import { dirname } from 'path';
const _require = createRequire(import.meta.url);

export class SceneState {
  private scenes = new Map<string, Scene>();
  private activeSceneId: string | null = null;

  // -----------------------------------------------------------------------
  // Scene Lifecycle
  // -----------------------------------------------------------------------

  createScene(source: string, format: Scene['format'], gaussians: Gaussian[], metadata?: Partial<Scene['metadata']>): string {
    const id = `scene_${Date.now()}_${Math.floor(Math.random() * 10000)}`;
    const bbox = this.computeBoundingBox(gaussians);
    const scene: Scene = {
      id,
      source,
      format,
      gaussians,
      camera: {
        position: [0, 0, -5],
        target: [0, 0, 0],
        fov: 60,
        up: [0, 1, 0],
      },
      bbox,
      segmentation: new Map(),
      metadata: {
        isDynamic: false,
        isArticulated: false,
        hasPBR: false,
        ...metadata,
      },
      createdAt: Date.now(),
    };
    this.scenes.set(id, scene);
    this.activeSceneId = id;
    return id;
  }

  getScene(id?: string): Scene | null {
    const targetId = id ?? this.activeSceneId;
    if (!targetId) return null;
    return this.scenes.get(targetId) ?? null;
  }

  getActiveSceneId(): string | null {
    return this.activeSceneId;
  }

  setActiveScene(id: string): boolean {
    if (!this.scenes.has(id)) return false;
    this.activeSceneId = id;
    return true;
  }

  listScenes(): Array<{ id: string; source: string; gaussianCount: number; createdAt: number }> {
    return Array.from(this.scenes.values()).map((s) => ({
      id: s.id,
      source: s.source,
      gaussianCount: s.gaussians.length,
      createdAt: s.createdAt,
    }));
  }

  removeScene(id: string): boolean {
    return this.scenes.delete(id);
  }

  // -----------------------------------------------------------------------
  // Camera Operations
  // -----------------------------------------------------------------------

  setCamera(cam: Partial<CameraState>, sceneId?: string): void {
    const scene = this.getScene(sceneId);
    if (!scene) throw new Error('No active scene');
    if (cam.position) scene.camera.position = cam.position;
    if (cam.target) scene.camera.target = cam.target;
    if (cam.fov !== undefined) scene.camera.fov = cam.fov;
    if (cam.up) scene.camera.up = cam.up;
  }

  getCamera(sceneId?: string): CameraState | null {
    const scene = this.getScene(sceneId);
    return scene?.camera ?? null;
  }

  // -----------------------------------------------------------------------
  // Gaussian Operations
  // -----------------------------------------------------------------------

  selectGaussians(selection: GaussianSelection, sceneId?: string): Gaussian[] {
    const scene = this.getScene(sceneId);
    if (!scene) throw new Error('No active scene');

    if (selection.ids) {
      return scene.gaussians.filter((g) => selection.ids!.includes(g.id));
    }
    if (selection.label && scene.segmentation.has(selection.label)) {
      const ids = scene.segmentation.get(selection.label)!;
      return scene.gaussians.filter((g) => ids.includes(g.id));
    }
    if (selection.region) {
      const { center, radius } = selection.region;
      const r2 = radius * radius;
      return scene.gaussians.filter((g) => {
        const dx = g.position[0] - center[0];
        const dy = g.position[1] - center[1];
        const dz = g.position[2] - center[2];
        return dx * dx + dy * dy + dz * dz <= r2;
      });
    }
    return scene.gaussians;
  }

  applyOperations(gaussians: Gaussian[], operations: GaussianOperation[]): void {
    for (const g of gaussians) {
      for (const op of operations) {
        this.applyOperation(g, op);
      }
    }
  }

  private applyOperation(g: Gaussian, op: GaussianOperation): void {
    const val = op.value;
    switch (op.property) {
      case 'opacity':
        if (typeof val === 'number') {
          g.opacity = op.action === 'set' ? val : op.action === 'add' ? g.opacity + val : g.opacity * val;
          g.opacity = Math.max(0, Math.min(1, g.opacity));
        }
        break;
      case 'color':
        if (Array.isArray(val)) {
          for (let i = 0; i < 3; i++) {
            if (op.action === 'set') g.color[i] = val[i];
            else if (op.action === 'add') g.color[i] = g.color[i] + val[i];
            else g.color[i] = g.color[i] * val[i];
            g.color[i] = Math.max(0, Math.min(1, g.color[i]));
          }
        }
        break;
      case 'position':
        if (Array.isArray(val)) {
          for (let i = 0; i < 3; i++) {
            if (op.action === 'set') g.position[i] = val[i];
            else if (op.action === 'add') g.position[i] = g.position[i] + val[i];
            else g.position[i] = g.position[i] * val[i];
          }
        }
        break;
      case 'scale':
        if (Array.isArray(val)) {
          for (let i = 0; i < 3; i++) {
            if (op.action === 'set') g.scale[i] = val[i];
            else if (op.action === 'add') g.scale[i] = g.scale[i] + val[i];
            else g.scale[i] = g.scale[i] * val[i];
            g.scale[i] = Math.max(0.0001, g.scale[i]);
          }
        }
        break;
      case 'rotation':
        if (Array.isArray(val) && val.length === 4) {
          for (let i = 0; i < 4; i++) g.rotation[i] = val[i];
        }
        break;
    }
  }

  // -----------------------------------------------------------------------
  // Pruning & Density Control
  // -----------------------------------------------------------------------

  pruneByImportance(strategy: string, targetRatio: number, preserveRegions?: Array<{ center: number[]; radius: number }>, sceneId?: string): { removed: number; remaining: number; strategy: string } {
    const scene = this.getScene(sceneId);
    if (!scene) throw new Error('No active scene');

    const total = scene.gaussians.length;
    const targetCount = Math.floor(total * targetRatio);
    const toRemove = total - targetCount;
    if (toRemove <= 0) return { removed: 0, remaining: total, strategy };

    const gs = scene.gaussians;
    const scaleMag = (g: Gaussian) => Math.sqrt(g.scale[0] ** 2 + g.scale[1] ** 2 + g.scale[2] ** 2);
    const inPreserve = (g: Gaussian): boolean => {
      if (!preserveRegions) return false;
      for (const region of preserveRegions) {
        const dx = g.position[0] - region.center[0];
        const dy = g.position[1] - region.center[1];
        const dz = g.position[2] - region.center[2];
        if (dx * dx + dy * dy + dz * dz <= region.radius * region.radius) return true;
      }
      return false;
    };

    // Strategy-specific importance scoring (higher = keep)
    let scores: number[];
    switch (strategy) {
      case 'sparsity': {
        // Sparsity: small, opaque Gaussians carry fine detail — keep them.
        scores = gs.map((g) => g.opacity + 1.0 / (scaleMag(g) + 0.001));
        break;
      }
      case 'dog': {
        // Difference-of-Gaussians band-pass: structure-band scales (near the
        // median scale) matter most; very small (noise) and very large
        // (background sheet) Gaussians score lower.
        const mags = gs.map(scaleMag).sort((a, b) => a - b);
        const median = mags[Math.floor(mags.length / 2)] || 0.01;
        const sigma = median * 1.5 + 1e-6;
        scores = gs.map((g) => {
          const d = (scaleMag(g) - median) / sigma;
          return g.opacity * Math.exp(-0.5 * d * d);
        });
        break;
      }
      case 'coreset': {
        // Coreset-style spatial coverage: the scene is voxelized; within each
        // voxel only the most opaque Gaussian is essential (covers that cell),
        // duplicates get low scores. Greedy coverage approximation.
        const cell = this.bboxDiagonal(scene) / 48;
        const bestPerVoxel = new Map<string, { idx: number; opacity: number }>();
        gs.forEach((g, idx) => {
          const key = `${Math.floor(g.position[0] / cell)},${Math.floor(g.position[1] / cell)},${Math.floor(g.position[2] / cell)}`;
          const cur = bestPerVoxel.get(key);
          if (!cur || g.opacity > cur.opacity) bestPerVoxel.set(key, { idx, opacity: g.opacity });
        });
        const representative = new Set(Array.from(bestPerVoxel.values()).map((v) => v.idx));
        scores = gs.map((g, idx) => (representative.has(idx) ? 1 + g.opacity : g.opacity * 0.1));
        break;
      }
      case 'gradient': {
        // Gradient proxy: Gaussians whose color deviates from their local
        // voxel neighborhood approximate high-frequency (edge) content.
        const cell = this.bboxDiagonal(scene) / 48;
        const voxelColor = new Map<string, { sum: [number, number, number]; n: number }>();
        for (const g of gs) {
          const key = `${Math.floor(g.position[0] / cell)},${Math.floor(g.position[1] / cell)},${Math.floor(g.position[2] / cell)}`;
          const v = voxelColor.get(key) ?? { sum: [0, 0, 0], n: 0 };
          v.sum[0] += g.color[0]; v.sum[1] += g.color[1]; v.sum[2] += g.color[2]; v.n++;
          voxelColor.set(key, v);
        }
        scores = gs.map((g) => {
          const key = `${Math.floor(g.position[0] / cell)},${Math.floor(g.position[1] / cell)},${Math.floor(g.position[2] / cell)}`;
          const v = voxelColor.get(key)!;
          const dist = Math.abs(g.color[0] - v.sum[0] / v.n) + Math.abs(g.color[1] - v.sum[1] / v.n) + Math.abs(g.color[2] - v.sum[2] / v.n);
          return g.opacity * 0.5 + dist;
        });
        break;
      }
      case 'variational': {
        // Variational proxy: prune low-confidence primitives first. Confidence
        // is approximated by decisiveness of opacity (distance from 0.5) and
        // shape regularity (scale isotropy).
        scores = gs.map((g) => {
          const m = scaleMag(g) + 1e-6;
          const isotropy = Math.min(...g.scale) / Math.max(...g.scale, 1e-6);
          return Math.abs(g.opacity - 0.5) * 2 + isotropy * 0.5;
        });
        break;
      }
      default:
        throw new Error(`Unknown pruning strategy: ${strategy} (expected dog|coreset|gradient|sparsity|variational)`);
    }

    const scored = gs
      .map((g, idx) => ({ idx, score: scores[idx] }))
      .filter((s) => !inPreserve(gs[s.idx])); // protected Gaussians are fully exempt
    scored.sort((a, b) => a.score - b.score); // Lowest score = least important = prune first
    const removable = Math.min(toRemove, scored.length);
    const toRemoveSet = new Set(scored.slice(0, removable).map((s) => s.idx));

    scene.gaussians = gs.filter((_, idx) => !toRemoveSet.has(idx));
    scene.gaussians.forEach((g, i) => (g.id = i));
    this.invalidateSpatialIndex(scene);

    return { removed: removable, remaining: scene.gaussians.length, strategy };
  }

  private bboxDiagonal(scene: Scene): number {
    const d = [
      scene.bbox.max[0] - scene.bbox.min[0],
      scene.bbox.max[1] - scene.bbox.min[1],
      scene.bbox.max[2] - scene.bbox.min[2],
    ];
    return Math.sqrt(d[0] ** 2 + d[1] ** 2 + d[2] ** 2) || 1;
  }

  // -----------------------------------------------------------------------
  // Query Operations
  // -----------------------------------------------------------------------

  getStats(sceneId?: string): { gaussianCount: number; bbox: BoundingBox; avgOpacity: number; avgScale: number; format: string } {
    const scene = this.getScene(sceneId);
    if (!scene) throw new Error('No active scene');

    const count = scene.gaussians.length;
    let totalOpacity = 0;
    let totalScale = 0;
    for (const g of scene.gaussians) {
      totalOpacity += g.opacity;
      totalScale += Math.sqrt(g.scale[0] ** 2 + g.scale[1] ** 2 + g.scale[2] ** 2);
    }

    return {
      gaussianCount: count,
      bbox: scene.bbox,
      avgOpacity: count > 0 ? totalOpacity / count : 0,
      avgScale: count > 0 ? totalScale / count : 0,
      format: scene.format,
    };
  }

  gaussianAtPoint(point: number[], sceneId?: string): Gaussian | null {
    const scene = this.getScene(sceneId);
    if (!scene) throw new Error('No active scene');

    let closest: Gaussian | null = null;
    let minDist = Infinity;
    for (const g of scene.gaussians) {
      const dx = g.position[0] - point[0];
      const dy = g.position[1] - point[1];
      const dz = g.position[2] - point[2];
      const dist = dx * dx + dy * dy + dz * dz;
      if (dist < minDist) {
        minDist = dist;
        closest = g;
      }
    }
    return closest;
  }

  // -----------------------------------------------------------------------
  // Spatial Index & Ray Casting (grid-accelerated)
  // -----------------------------------------------------------------------

  private spatialIndex = new Map<string, { cell: number; grid: Map<string, number[]>; builtFor: number }>();

  invalidateSpatialIndex(scene: Scene): void {
    this.spatialIndex.delete(scene.id);
  }

  private getSpatialIndex(scene: Scene): { cell: number; grid: Map<string, number[]> } {
    const cached = this.spatialIndex.get(scene.id);
    if (cached && cached.builtFor === scene.gaussians.length) return cached;

    const cell = this.bboxDiagonal(scene) / 64;
    const grid = new Map<string, number[]>();
    scene.gaussians.forEach((g, idx) => {
      const key = `${Math.floor(g.position[0] / cell)},${Math.floor(g.position[1] / cell)},${Math.floor(g.position[2] / cell)}`;
      const arr = grid.get(key);
      if (arr) arr.push(idx);
      else grid.set(key, [idx]);
    });
    const entry = { cell, grid, builtFor: scene.gaussians.length };
    this.spatialIndex.set(scene.id, entry);
    return entry;
  }

  /**
   * Grid-accelerated ray query. Walks along the ray in steps of one cell and
   * only tests Gaussians in the visited cells (with a 1-cell neighborhood),
   * reducing cost from O(N) to O(steps × candidates-per-cell) on large scenes.
   * Intersection test approximates each Gaussian as a sphere of its max scale.
   */
  castRay(origin: number[], direction: number[], sceneId?: string, maxDistance: number = 1000): { hit: boolean; distance: number; gaussianId: number | null; position: [number, number, number] | null } {
    const scene = this.getScene(sceneId);
    if (!scene) throw new Error('No active scene');
    if (scene.gaussians.length === 0) return { hit: false, distance: Infinity, gaussianId: null, position: null };

    const { cell, grid } = this.getSpatialIndex(scene);
    const len = Math.sqrt(direction[0] ** 2 + direction[1] ** 2 + direction[2] ** 2) || 1;
    const dir = [direction[0] / len, direction[1] / len, direction[2] / len];

    let closestT = Infinity;
    let hitIdx: number | null = null;
    const visited = new Set<string>();
    const steps = Math.min(Math.ceil(maxDistance / cell), 4096);

    for (let s = 0; s <= steps; s++) {
      const t = s * cell;
      if (t >= closestT) break;
      const px = origin[0] + dir[0] * t;
      const py = origin[1] + dir[1] * t;
      const pz = origin[2] + dir[2] * t;
      const cx = Math.floor(px / cell), cy = Math.floor(py / cell), cz = Math.floor(pz / cell);

      for (let ox = -1; ox <= 1; ox++) for (let oy = -1; oy <= 1; oy++) for (let oz = -1; oz <= 1; oz++) {
        const key = `${cx + ox},${cy + oy},${cz + oz}`;
        if (visited.has(key)) continue;
        visited.add(key);
        const candidates = grid.get(key);
        if (!candidates) continue;
        for (const idx of candidates) {
          const g = scene.gaussians[idx];
          const dx = g.position[0] - origin[0];
          const dy = g.position[1] - origin[1];
          const dz = g.position[2] - origin[2];
          const tt = dx * dir[0] + dy * dir[1] + dz * dir[2];
          if (tt < 0 || tt >= closestT) continue;
          const perpX = dx - tt * dir[0], perpY = dy - tt * dir[1], perpZ = dz - tt * dir[2];
          const perp2 = perpX * perpX + perpY * perpY + perpZ * perpZ;
          const radius = Math.max(g.scale[0], g.scale[1], g.scale[2]);
          if (perp2 < radius * radius) {
            closestT = tt;
            hitIdx = idx;
          }
        }
      }
    }

    if (hitIdx === null) return { hit: false, distance: Infinity, gaussianId: null, position: null };
    const g = scene.gaussians[hitIdx];
    return { hit: true, distance: closestT, gaussianId: g.id, position: g.position };
  }

  /**
   * Spatial context: voxel-cluster the scene and derive geometric spatial
   * relations (above/below, left/right, in-front/behind, near/far) between
   * clusters, plus point-to-point measurement. Pure geometry — no learned
   * models involved; language grounding requires external features.
   */
  spatialContext(opts: { mode: 'scene_graph' | 'relation' | 'measurement'; pointA?: number[]; pointB?: number[]; label?: string; maxClusters?: number }, sceneId?: string): Record<string, unknown> {
    const scene = this.getScene(sceneId);
    if (!scene) throw new Error('No active scene');
    const gs = scene.gaussians;
    if (gs.length === 0) return { error: 'Empty scene' };

    if (opts.mode === 'measurement') {
      const a = opts.pointA, b = opts.pointB;
      if (!a || !b) throw new Error('measurement mode requires pointA and pointB');
      const dist = Math.sqrt((a[0] - b[0]) ** 2 + (a[1] - b[1]) ** 2 + (a[2] - b[2]) ** 2);
      const gA = this.gaussianAtPoint(a, sceneId), gB = this.gaussianAtPoint(b, sceneId);
      return {
        mode: 'measurement',
        distance: dist,
        pointA: a, pointB: b,
        supportA: gA ? { gaussianId: gA.id, distanceToNearestGaussian: Math.sqrt((gA.position[0] - a[0]) ** 2 + (gA.position[1] - a[1]) ** 2 + (gA.position[2] - a[2]) ** 2) } : null,
        supportB: gB ? { gaussianId: gB.id, distanceToNearestGaussian: Math.sqrt((gB.position[0] - b[0]) ** 2 + (gB.position[1] - b[1]) ** 2 + (gB.position[2] - b[2]) ** 2) } : null,
        note: 'Euclidean distance in scene units; support fields indicate how well each point is backed by scene geometry.',
      };
    }

    // Cluster into coarse voxels (structure-aware grouping)
    const cell = this.bboxDiagonal(scene) / 16;
    const clusters = new Map<string, { sum: number[]; n: number; opacity: number; min: number[]; max: number[] }>();
    for (const g of gs) {
      const key = `${Math.floor(g.position[0] / cell)},${Math.floor(g.position[1] / cell)},${Math.floor(g.position[2] / cell)}`;
      let c = clusters.get(key);
      if (!c) {
        c = { sum: [0, 0, 0], n: 0, opacity: 0, min: [...g.position], max: [...g.position] };
        clusters.set(key, c);
      }
      c.sum[0] += g.position[0]; c.sum[1] += g.position[1]; c.sum[2] += g.position[2];
      c.n++; c.opacity += g.opacity;
      for (let i = 0; i < 3; i++) { c.min[i] = Math.min(c.min[i], g.position[i]); c.max[i] = Math.max(c.max[i], g.position[i]); }
    }

    const maxClusters = opts.maxClusters ?? 12;
    const top = Array.from(clusters.entries())
      .map(([key, c]) => ({ key, centroid: c.sum.map((v) => v / c.n), count: c.n, opacity: c.opacity / c.n, min: c.min, max: c.max }))
      .sort((x, y) => y.count - x.count)
      .slice(0, maxClusters);

    const sceneCenter = [
      (scene.bbox.min[0] + scene.bbox.max[0]) / 2,
      (scene.bbox.min[1] + scene.bbox.max[1]) / 2,
      (scene.bbox.min[2] + scene.bbox.max[2]) / 2,
    ];

    const describeCluster = (c: (typeof top)[number], i: number) => ({
      clusterId: i,
      voxelKey: c.key,
      centroid: c.centroid,
      gaussianCount: c.count,
      avgOpacity: Number(c.opacity.toFixed(3)),
      extent: c.max.map((v, k) => v - c.min[k]),
      location: this.octantLabel(c.centroid, sceneCenter),
    });

    if (opts.mode === 'scene_graph') {
      return {
        mode: 'scene_graph',
        sceneCenter,
        bbox: scene.bbox,
        gaussianCount: gs.length,
        clusters: top.map(describeCluster),
        note: 'Clusters are coarse voxel groups ranked by Gaussian count. Semantic labels require external segmentation.',
      };
    }

    // mode === 'relation': pairwise spatial relations among top clusters
    const relations: Array<{ a: number; b: number; relation: string; distance: number }> = [];
    const diag = this.bboxDiagonal(scene);
    for (let i = 0; i < top.length; i++) {
      for (let j = i + 1; j < top.length; j++) {
        const ca = top[i].centroid, cb = top[j].centroid;
        const d = Math.sqrt((ca[0] - cb[0]) ** 2 + (ca[1] - cb[1]) ** 2 + (ca[2] - cb[2]) ** 2);
        const dy = ca[1] - cb[1];
        const rel = Math.abs(dy) > 0.25 * d
          ? (dy > 0 ? `cluster ${i} is above cluster ${j}` : `cluster ${i} is below cluster ${j}`)
          : d < diag * 0.1 ? `cluster ${i} is near cluster ${j}` : `cluster ${i} is far from cluster ${j}`;
        relations.push({ a: i, b: j, relation: rel, distance: Number(d.toFixed(4)) });
      }
    }
    return { mode: 'relation', clusters: top.map(describeCluster), relations: relations.slice(0, 30) };
  }

  private octantLabel(p: number[], center: number[]): string {
    const parts: string[] = [];
    parts.push(p[1] > center[1] ? 'upper' : 'lower');
    parts.push(p[0] > center[0] ? '+x-side' : '-x-side');
    parts.push(p[2] > center[2] ? '+z-side' : '-z-side');
    return parts.join('/');
  }

  // -----------------------------------------------------------------------
  // Helpers
  // -----------------------------------------------------------------------

  private computeBoundingBox(gaussians: Gaussian[]): BoundingBox {
    if (gaussians.length === 0) {
      return { min: [0, 0, 0], max: [0, 0, 0] };
    }
    const min = [Infinity, Infinity, Infinity];
    const max = [-Infinity, -Infinity, -Infinity];
    for (const g of gaussians) {
      for (let i = 0; i < 3; i++) {
        min[i] = Math.min(min[i], g.position[i]);
        max[i] = Math.max(max[i], g.position[i]);
      }
    }
    return { min: min as [number, number, number], max: max as [number, number, number] };
  }

  /**
   * Generate a synthetic scene for testing without a PLY file.
   * Creates a sphere of Gaussians.
   */
  generateSyntheticScene(count: number = 10000): { id: string; gaussianCount: number } {
    const gaussians: Gaussian[] = [];
    for (let i = 0; i < count; i++) {
      const theta = Math.acos(2 * Math.random() - 1);
      const phi = 2 * Math.PI * Math.random();
      const r = 1.0 + Math.random() * 0.1;
      gaussians.push({
        id: i,
        position: [r * Math.sin(theta) * Math.cos(phi), r * Math.sin(theta) * Math.sin(phi), r * Math.cos(theta)],
        scale: [0.01 + Math.random() * 0.02, 0.01 + Math.random() * 0.02, 0.01 + Math.random() * 0.02],
        rotation: [1, 0, 0, 0],
        color: [Math.random(), Math.random(), Math.random()],
        opacity: 0.7 + Math.random() * 0.3,
      });
    }
    const id = this.createScene('synthetic://sphere', 'ply', gaussians, { method: 'synthetic' });
    return { id, gaussianCount: count };
  }

  // -----------------------------------------------------------------------
  // Real PLY File Loading
  // -----------------------------------------------------------------------

  /**
   * Parse PLY header (ASCII) from a binary buffer.
   * Returns header info including property layout and byte offset to data.
   */
  parsePlyHeader(buffer: Buffer): PlyHeaderInfo {
    const headerEnd = buffer.indexOf('\nend_header\n');
    if (headerEnd === -1) {
      throw new Error('Invalid PLY: no end_header found');
    }

    const headerStr = buffer.toString('ascii', 0, headerEnd);
    const lines = headerStr.split('\n').map(l => l.trim()).filter(Boolean);

    let format: PlyHeaderInfo['format'] = 'ascii';
    let vertexCount = 0;
    const properties: PlyProperty[] = [];
    let currentElement = '';

    for (const line of lines) {
      if (line.startsWith('format ')) {
        const f = line.split(/\s+/)[1];
        if (f === 'binary_little_endian') format = 'binary_little_endian';
        else if (f === 'binary_big_endian') format = 'binary_big_endian';
        else format = 'ascii';
      } else if (line.startsWith('element ')) {
        const parts = line.split(/\s+/);
        currentElement = parts[1];
        if (currentElement === 'vertex') {
          vertexCount = parseInt(parts[2], 10);
        }
      } else if (line.startsWith('property ') && currentElement === 'vertex') {
        const parts = line.split(/\s+/);
        const type = parts[1] as PlyProperty['type'];
        const name = parts[2];
        const sizeMap: Record<string, number> = { float: 4, double: 8, uchar: 1, int: 4, short: 2, uint: 4 };
        properties.push({ name, type, size: sizeMap[type] || 4 });
      }
    }

    const vertexStride = properties.reduce((sum, p) => sum + p.size, 0);
    const has3dgs = properties.some(p => p.name === 'opacity') &&
                    properties.some(p => p.name.startsWith('scale_')) &&
                    properties.some(p => p.name.startsWith('rot_'));

    return {
      format,
      vertexCount,
      properties,
      headerByteLength: headerEnd + '\nend_header\n'.length,
      vertexStride,
      has3dgs,
    };
  }

  /**
   * Load a real 3DGS PLY file into the scene state.
   * For large files (>1M gaussians), samples a representative subset for in-memory operations.
   * Stores the file path for the browser renderer to load the full scene.
   */
  loadFromPlyFile(filePath: string, keepId?: string): { id: string; gaussianCount: number; bbox: BoundingBox; sampled: boolean } {
    // Use createRequire for ESM compatibility
    const fs = _require('fs');
    const path = _require('path');

    if (!fs.existsSync(filePath)) {
      throw new Error(`PLY file not found: ${filePath}`);
    }

    const buffer = fs.readFileSync(filePath);
    const header = this.parsePlyHeader(buffer);

    console.log(`[scene-state] PLY header parsed: ${header.vertexCount} vertices, ${header.properties.length} properties, stride=${header.vertexStride}, 3DGS=${header.has3dgs}`);

    // Build property index map for fast access
    const propIndex: Record<string, number> = {};
    header.properties.forEach((p, i) => { propIndex[p.name] = i; });

    // Compute byte offsets for each property within a vertex row
    const propOffsets: Record<string, number> = {};
    let offset = 0;
    for (const p of header.properties) {
      propOffsets[p.name] = offset;
      offset += p.size;
    }

    const dataStart = header.headerByteLength;
    const totalGaussians = header.vertexCount;

    // For very large files, sample a subset to avoid OOM
    // 500K is a good balance: covers enough points for visual fidelity
    // while staying within memory limits for browser WebSocket transfer
    const MAX_IN_MEMORY = 500000;
    const sampled = totalGaussians > MAX_IN_MEMORY;
    const sampleRate = sampled ? MAX_IN_MEMORY / totalGaussians : 1;
    const gaussians: Gaussian[] = [];

    // If 3DGS format, parse real properties; otherwise just positions
    const hasOpacity = 'opacity' in propOffsets;
    const hasScale = 'scale_0' in propOffsets;
    const hasRot = 'rot_0' in propOffsets;
    const hasDC = 'f_dc_0' in propOffsets;

    let sampleIdx = 0;
    for (let i = 0; i < totalGaussians; i++) {
      // Sampling: include this vertex if not sampled or passes sample threshold
      if (sampled && Math.random() > sampleRate) continue;

      const rowStart = dataStart + i * header.vertexStride;

      // Read position (always present)
      const x = buffer.readFloatLE(rowStart + propOffsets['x']);
      const y = buffer.readFloatLE(rowStart + propOffsets['y']);
      const z = buffer.readFloatLE(rowStart + propOffsets['z']);

      let opacity = 0.8;
      let scale: [number, number, number] = [0.01, 0.01, 0.01];
      let rotation: [number, number, number, number] = [1, 0, 0, 0];
      let color: [number, number, number] = [0.5, 0.5, 0.5];

      if (hasOpacity) {
        const raw = buffer.readFloatLE(rowStart + propOffsets['opacity']);
        opacity = 1 / (1 + Math.exp(-raw)); // sigmoid — 3DGS stores logit
      }

      if (hasScale) {
        scale = [
          Math.exp(buffer.readFloatLE(rowStart + propOffsets['scale_0'])),
          Math.exp(buffer.readFloatLE(rowStart + propOffsets['scale_1'])),
          Math.exp(buffer.readFloatLE(rowStart + propOffsets['scale_2'])),
        ];
      }

      if (hasRot) {
        rotation = [
          buffer.readFloatLE(rowStart + propOffsets['rot_0']),
          buffer.readFloatLE(rowStart + propOffsets['rot_1']),
          buffer.readFloatLE(rowStart + propOffsets['rot_2']),
          buffer.readFloatLE(rowStart + propOffsets['rot_3']),
        ];
      }

      if (hasDC) {
        // SH DC coefficients → RGB (approximate, ignoring SH_C0 constant for simplicity)
        const SH_C0 = 0.28209479177387814;
        color = [
          buffer.readFloatLE(rowStart + propOffsets['f_dc_0']) * SH_C0 + 0.5,
          buffer.readFloatLE(rowStart + propOffsets['f_dc_1']) * SH_C0 + 0.5,
          buffer.readFloatLE(rowStart + propOffsets['f_dc_2']) * SH_C0 + 0.5,
        ];
      }

      gaussians.push({
        id: sampleIdx++,
        position: [x, y, z],
        scale,
        rotation,
        color,
        opacity,
      });
    }

    // Create scene with real data
    const absPath = path.resolve(filePath);
    let id = this.createScene(absPath, 'ply', gaussians, {
      method: header.has3dgs ? '3DGS' : 'point_cloud',
    });

    // Stable-ID restore: remap to a previously persisted scene id
    if (keepId && keepId !== id) {
      const sceneObj = this.scenes.get(id)!;
      this.scenes.delete(id);
      sceneObj.id = keepId;
      this.scenes.set(keepId, sceneObj);
      this.activeSceneId = keepId;
      id = keepId;
    }

    const scene = this.getScene(id)!;
    scene.filePath = absPath;
    scene.headerInfo = header;

    console.log(`[scene-state] Loaded PLY: ${gaussians.length} gaussians in memory${sampled ? ` (sampled from ${totalGaussians})` : ''}, bbox: ${JSON.stringify(scene.bbox)}`);

    return { id, gaussianCount: gaussians.length, bbox: scene.bbox, sampled };
  }

  // -----------------------------------------------------------------------
  // Persistence (scene index)
  // -----------------------------------------------------------------------

  /**
   * Persist a scene index so scenes survive server restarts. Only scenes
   * backed by an on-disk file are persistable (in-memory synthetic scenes
   * are not — they are cheap to regenerate).
   */
  saveIndex(indexPath: string): number {
    const fs = _require('fs');
    const path = _require('path');
    const entries = Array.from(this.scenes.values())
      .filter((s) => s.filePath)
      .map((s) => ({
        id: s.id,
        source: s.source,
        filePath: s.filePath,
        gaussianCount: s.gaussians.length,
        createdAt: s.createdAt,
      }));
    fs.mkdirSync(path.dirname(indexPath), { recursive: true });
    fs.writeFileSync(indexPath, JSON.stringify({ savedAt: Date.now(), scenes: entries }, null, 2));
    return entries.length;
  }

  /**
   * Restore scenes from a persisted index (lazy: reload PLY by original id).
   * Missing source files are skipped with a warning. Returns restored count.
   */
  loadIndex(indexPath: string): { restored: number; skipped: number } {
    const fs = _require('fs');
    if (!fs.existsSync(indexPath)) return { restored: 0, skipped: 0 };
    let restored = 0;
    let skipped = 0;
    try {
      const data = JSON.parse(fs.readFileSync(indexPath, 'utf-8'));
      for (const entry of data.scenes ?? []) {
        if (!entry.filePath || !fs.existsSync(entry.filePath)) {
          console.error(`[scene-state] Restore skipped (file missing): ${entry.filePath}`);
          skipped++;
          continue;
        }
        try {
          this.loadFromPlyFile(entry.filePath, entry.id);
          restored++;
        } catch (err) {
          console.error(`[scene-state] Restore failed for ${entry.id}: ${(err as Error).message}`);
          skipped++;
        }
      }
    } catch (err) {
      console.error(`[scene-state] Index load failed: ${(err as Error).message}`);
    }
    return { restored, skipped };
  }
}
