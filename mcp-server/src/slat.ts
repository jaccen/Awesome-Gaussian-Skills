/**
 * SLAT Latent Editing — v1.1
 *
 * Structured LATent representation as the edit intermediate for 3DGS scenes.
 * Pipeline: encode (3DGS → voxel latent) → edit (latent-space deltas) → decode (apply deltas).
 * v1.1 adds cross-scene latent transfer (replay an edit from one scene onto
 * another) and latent interpolation (blend two scenes' appearance).
 *
 * Grounding: SLAT (TRELLIS, SIGGRAPH 2025) — structured shared latent for 3D
 * representation conversion. Here it becomes the edit space of the MCP renderer:
 * voice/scene edits are computed in latent space, keeping the SLAT snapshot
 * immutable and the unselected geometry untouched.
 */

import type { Gaussian } from './types.js';

// ---------------------------------------------------------------------------
// SLAT Types
// ---------------------------------------------------------------------------

export interface SlatVoxel {
  id: string;                                         // = voxel key "x,y,z"
  coord: [number, number, number];                    // integer voxel coords
  position: [number, number, number];                 // voxel center (world)
  color: [number, number, number];                    // aggregated RGB [0,1]
  opacity: number;                                    // aggregated opacity [0,1]
  scale: [number, number, number];                    // aggregated scale
  rotation: [number, number, number, number];         // first quaternion [w,x,y,z]
  partName?: string;                                  // majority part label
  semanticLabel?: string;                             // majority semantic label
  gaussianIds: number[];                              // gaussians assigned to this voxel
  count: number;                                      // gaussian count in voxel
}

export interface SlatScene {
  voxelSize: number;
  voxels: Map<string, SlatVoxel>;
  /** Source gaussians used at decode time (kept immutable). */
  sourceGaussians: Gaussian[];
  bbox: { min: [number, number, number]; max: [number, number, number] };
}

/** Which voxels an edit affects. At least one selector key must be present. */
export interface LatentSelector {
  region?: { center: [number, number, number]; radius: number };
  bbox?: { min: [number, number, number]; max: [number, number, number] };
  part?: string;
}

export type LatentEditOp =
  | { op: 'translate'; selector: LatentSelector; delta: [number, number, number] }
  | { op: 'scale'; selector: LatentSelector; factor: number; origin?: [number, number, number] }
  | { op: 'rotate'; selector: LatentSelector; axis: 'x' | 'y' | 'z'; angleDeg: number; origin?: [number, number, number] }
  | { op: 'recolor'; selector: LatentSelector; color: [number, number, number]; mix?: number }
  | { op: 'opacity'; selector: LatentSelector; opacity: number; mode?: 'set' | 'multiply' }
  | { op: 'smooth'; selector: LatentSelector; iterations?: number }
  | { op: 'delete'; selector: LatentSelector };

/** Per-voxel change set produced by an edit. Absent field = keep original. */
export interface VoxelDelta {
  /** Absolute position after edit (world). */
  position?: [number, number, number];
  /** Absolute color after edit. */
  color?: [number, number, number];
  /** Absolute opacity after edit. */
  opacity?: number;
  /** True → drop this voxel's gaussians from the decoded scene. */
  remove?: boolean;
}

export interface SlatEditResult {
  deltas: Map<string, VoxelDelta>;
  metrics: {
    affected_voxels: number;
    affected_gaussians: number;
    edit_delta: number;      // mean position shift (L1) over moved voxels
    encode_loss: number;     // RMSE of source positions vs voxel centers
    voxel_count: number;
    source_count: number;
  };
}

// ---------------------------------------------------------------------------
// Encoding — 3DGS → SLAT (spatial hashing + per-voxel aggregation)
// ---------------------------------------------------------------------------

function voxelKey(coord: [number, number, number]): string {
  return `${coord[0]},${coord[1]},${coord[2]}`;
}

export function encodeGaussiansToSlat(gaussians: Gaussian[], voxelSize = 0.1): SlatScene {
  const voxels = new Map<string, SlatVoxel>();
  const acc = new Map<string, {
    sumPos: [number, number, number];
    sumColor: [number, number, number];
    sumOpacity: number;
    sumScale: [number, number, number];
    ids: number[];
    partVotes: Map<string, number>;
    semanticVotes: Map<string, number>;
    rotation: [number, number, number, number];
  }>();

  for (const g of gaussians) {
    const coord: [number, number, number] = [
      Math.floor(g.position[0] / voxelSize),
      Math.floor(g.position[1] / voxelSize),
      Math.floor(g.position[2] / voxelSize),
    ];
    const key = voxelKey(coord);
    let a = acc.get(key);
    if (!a) {
      a = {
        sumPos: [0, 0, 0],
        sumColor: [0, 0, 0],
        sumOpacity: 0,
        sumScale: [0, 0, 0],
        ids: [],
        partVotes: new Map(),
        semanticVotes: new Map(),
        rotation: g.rotation,
      };
      acc.set(key, a);
    }
    a.sumPos[0] += g.position[0]; a.sumPos[1] += g.position[1]; a.sumPos[2] += g.position[2];
    a.sumColor[0] += g.color[0]; a.sumColor[1] += g.color[1]; a.sumColor[2] += g.color[2];
    a.sumOpacity += g.opacity;
    a.sumScale[0] += g.scale[0]; a.sumScale[1] += g.scale[1]; a.sumScale[2] += g.scale[2];
    a.ids.push(g.id);
    if (g.partName) a.partVotes.set(g.partName, (a.partVotes.get(g.partName) ?? 0) + 1);
    if (g.semanticLabel) a.semanticVotes.set(g.semanticLabel, (a.semanticVotes.get(g.semanticLabel) ?? 0) + 1);
  }

  for (const [key, a] of acc) {
    const n = a.ids.length;
    const [cx, cy, cz] = key.split(',').map(Number);
    voxels.set(key, {
      id: key,
      coord: [cx, cy, cz],
      position: [(cx + 0.5) * voxelSize, (cy + 0.5) * voxelSize, (cz + 0.5) * voxelSize],
      color: [a.sumColor[0] / n, a.sumColor[1] / n, a.sumColor[2] / n],
      opacity: a.sumOpacity / n,
      scale: [a.sumScale[0] / n, a.sumScale[1] / n, a.sumScale[2] / n],
      rotation: a.rotation,
      partName: majority(a.partVotes),
      semanticLabel: majority(a.semanticVotes),
      gaussianIds: a.ids,
      count: n,
    });
  }

  const min: [number, number, number] = [Infinity, Infinity, Infinity];
  const max: [number, number, number] = [-Infinity, -Infinity, -Infinity];
  for (const g of gaussians) {
    for (let i = 0; i < 3; i++) {
      min[i] = Math.min(min[i], g.position[i]);
      max[i] = Math.max(max[i], g.position[i]);
    }
  }

  return { voxelSize, voxels, sourceGaussians: gaussians, bbox: { min, max } };
}

function majority(votes: Map<string, number>): string | undefined {
  let best: string | undefined;
  let bestN = 0;
  for (const [k, n] of votes) {
    if (n > bestN) { best = k; bestN = n; }
  }
  return best;
}

// ---------------------------------------------------------------------------
// Selection
// ---------------------------------------------------------------------------

function selectVoxels(slat: SlatScene, selector: LatentSelector): SlatVoxel[] {
  const out: SlatVoxel[] = [];
  for (const v of slat.voxels.values()) {
    let hit = false;
    if (selector.region) {
      const { center, radius } = selector.region;
      const dx = v.position[0] - center[0];
      const dy = v.position[1] - center[1];
      const dz = v.position[2] - center[2];
      if (dx * dx + dy * dy + dz * dz <= radius * radius) hit = true;
    }
    if (selector.bbox) {
      const b = selector.bbox;
      if (v.position[0] >= b.min[0] && v.position[0] <= b.max[0] &&
          v.position[1] >= b.min[1] && v.position[1] <= b.max[1] &&
          v.position[2] >= b.min[2] && v.position[2] <= b.max[2]) hit = true;
    }
    if (selector.part) {
      // Substring match against both part and semantic labels (voice commands
      // often give partial names, e.g. "cluster" matching "clusterA").
      const part = selector.part.toLowerCase();
      const matchesPart = v.partName?.toLowerCase().includes(part);
      const matchesSemantic = v.semanticLabel?.toLowerCase().includes(part);
      if (matchesPart || matchesSemantic) hit = true;
    }
    if (hit) out.push(v);
  }
  return out;
}

// ---------------------------------------------------------------------------
// Edit Ops — produce deltas; the SLAT snapshot stays immutable
// ---------------------------------------------------------------------------

function clamp01(v: number): number { return Math.min(1, Math.max(0, v)); }

function rotatePoint(
  p: [number, number, number],
  axis: 'x' | 'y' | 'z',
  rad: number,
  origin: [number, number, number],
): [number, number, number] {
  const x = p[0] - origin[0], y = p[1] - origin[1], z = p[2] - origin[2];
  const c = Math.cos(rad), s = Math.sin(rad);
  let rx: number, ry: number, rz: number;
  if (axis === 'x') { rx = x; ry = y * c - z * s; rz = y * s + z * c; }
  else if (axis === 'y') { rx = x * c + z * s; ry = y; rz = -x * s + z * c; }
  else { rx = x * c - y * s; ry = x * s + y * c; rz = z; }
  return [rx + origin[0], ry + origin[1], rz + origin[2]];
}

function centroidOf(voxels: SlatVoxel[]): [number, number, number] {
  const c: [number, number, number] = [0, 0, 0];
  for (const v of voxels) {
    c[0] += v.position[0]; c[1] += v.position[1]; c[2] += v.position[2];
  }
  if (voxels.length > 0) {
    c[0] /= voxels.length; c[1] /= voxels.length; c[2] /= voxels.length;
  }
  return c;
}

export function applyLatentEdit(slat: SlatScene, op: LatentEditOp): SlatEditResult {
  const selected = selectVoxels(slat, op.selector);
  const deltas = new Map<string, VoxelDelta>();
  const affectedIds = new Set<number>();

  for (const v of selected) {
    for (const gid of v.gaussianIds) affectedIds.add(gid);
  }

  if (op.op === 'smooth') {
    // Iterative neighbor averaging over the selected voxels.
    const iterations = op.iterations ?? 1;
    const current = new Map<string, SlatVoxel>();
    for (const v of slat.voxels.values()) current.set(v.id, { ...v });
    const selectedKeys = new Set(selected.map((v) => v.id));

    for (let it = 0; it < iterations; it++) {
      for (const key of selectedKeys) {
        const v = current.get(key)!;
        const nk = neighborKeys(current, v.id).filter((k) => current.has(k));
        const p: [number, number, number] = [...v.position];
        const c: [number, number, number] = [...v.color];
        let n = 1;
        for (const k of nk) {
          const nv = current.get(k)!;
          p[0] += nv.position[0]; p[1] += nv.position[1]; p[2] += nv.position[2];
          c[0] += nv.color[0]; c[1] += nv.color[1]; c[2] += nv.color[2];
          n++;
        }
        const np: [number, number, number] = [p[0] / n, p[1] / n, p[2] / n];
        const nc: [number, number, number] = [c[0] / n, c[1] / n, c[2] / n];
        current.set(key, { ...v, position: np, color: nc });
      }
    }
    for (const key of selectedKeys) {
      const orig = slat.voxels.get(key)!;
      const updated = current.get(key)!;
      const moved =
        Math.abs(updated.position[0] - orig.position[0]) > 1e-9 ||
        Math.abs(updated.position[1] - orig.position[1]) > 1e-9 ||
        Math.abs(updated.position[2] - orig.position[2]) > 1e-9 ||
        Math.abs(updated.color[0] - orig.color[0]) > 1e-9 ||
        Math.abs(updated.color[1] - orig.color[1]) > 1e-9 ||
        Math.abs(updated.color[2] - orig.color[2]) > 1e-9;
      if (moved) {
        deltas.set(key, { position: updated.position, color: updated.color });
      }
    }
  } else {
    const origin = op.op === 'rotate'
      ? (op.origin ?? centroid(selected))
      : (op.op === 'scale' ? (op.origin ?? slat.bbox.min) : undefined);

    for (const v of selected) {
      const d: VoxelDelta = {};
      switch (op.op) {
        case 'translate':
          d.position = [v.position[0] + op.delta[0], v.position[1] + op.delta[1], v.position[2] + op.delta[2]];
          break;
        case 'scale': {
          const f = op.factor;
          d.position = [
            origin![0] + (v.position[0] - origin![0]) * f,
            origin![1] + (v.position[1] - origin![1]) * f,
            origin![2] + (v.position[2] - origin![2]) * f,
          ];
          break;
        }
        case 'rotate':
          d.position = rotatePoint(v.position, op.axis, (op.angleDeg * Math.PI) / 180, origin!);
          break;
        case 'recolor': {
          const mix = op.mix ?? 1;
          d.color = [
            clamp01(v.color[0] + (op.color[0] - v.color[0]) * mix),
            clamp01(v.color[1] + (op.color[1] - v.color[1]) * mix),
            clamp01(v.color[2] + (op.color[2] - v.color[2]) * mix),
          ];
          break;
        }
        case 'opacity':
          d.opacity = (op.mode ?? 'set') === 'set' ? clamp01(op.opacity) : clamp01(v.opacity * op.opacity);
          break;
        case 'delete':
          d.remove = true;
          break;
        default:
          void op; // unreachable
      }
      if (Object.keys(d).length > 0) deltas.set(v.id, d);
    }
  }

  // Metrics
  let shiftSum = 0;
  let movedCount = 0;
  for (const [key, d] of deltas) {
    if (d.position) {
      const v = slat.voxels.get(key)!;
      shiftSum += Math.abs(d.position[0] - v.position[0]) +
                  Math.abs(d.position[1] - v.position[1]) +
                  Math.abs(d.position[2] - v.position[2]);
      movedCount++;
    }
  }

  // Encode loss: RMSE of each gaussian's position vs its voxel center.
  let sq = 0;
  let nPos = 0;
  const byId = new Map<number, Gaussian>();
  for (const g of slat.sourceGaussians) byId.set(g.id, g);
  for (const v of slat.voxels.values()) {
    for (const gid of v.gaussianIds) {
      const g = byId.get(gid);
      if (!g) continue;
      sq += (v.position[0] - g.position[0]) ** 2 +
            (v.position[1] - g.position[1]) ** 2 +
            (v.position[2] - g.position[2]) ** 2;
      nPos += 3;
    }
  }

  return {
    deltas,
    metrics: {
      affected_voxels: deltas.size,
      affected_gaussians: affectedIds.size,
      edit_delta: movedCount > 0 ? shiftSum / movedCount : 0,
      encode_loss: nPos > 0 ? Math.sqrt(sq / nPos) : 0,
      voxel_count: slat.voxels.size,
      source_count: slat.sourceGaussians.length,
    },
  };
}

function neighborKeys(voxels: Map<string, SlatVoxel>, key: string): string[] {
  const [x, y, z] = key.split(',').map(Number);
  return [
    `${x + 1},${y},${z}`, `${x - 1},${y},${z}`,
    `${x},${y + 1},${z}`, `${x},${y - 1},${z}`,
    `${x},${y},${z + 1}`, `${x},${y},${z - 1}`,
  ];
}

function centroid(voxels: SlatVoxel[]): [number, number, number] {
  return centroidOf(voxels);
}

// ---------------------------------------------------------------------------
// Decode — deltas → updated Gaussian list
// ---------------------------------------------------------------------------

export function decodeSlatToGaussians(slat: SlatScene, deltas: Map<string, VoxelDelta>): Gaussian[] {
  const byId = new Map<number, Gaussian>();
  for (const g of slat.sourceGaussians) byId.set(g.id, g);

  const out: Gaussian[] = [];
  for (const v of slat.voxels.values()) {
    const d = deltas.get(v.id);
    if (d?.remove) continue;
    for (const gid of v.gaussianIds) {
      const g = byId.get(gid);
      if (!g) continue;
      out.push({
        ...g,
        position: d?.position ?? g.position,
        color: d?.color ?? g.color,
        opacity: d?.opacity ?? g.opacity,
      });
    }
  }
  return out;
}

// ---------------------------------------------------------------------------
// Cross-Scene Latent Transfer & Interpolation — v1.1
//
// Reuse a latent edit computed on one scene (source) onto another scene
// (target), and blend scene appearances through latent interpolation.
// Correspondence is spatial: every target voxel maps to the nearest source
// voxel within a match radius; edits carry over as *relative* changes so the
// transfer stays meaningful across different coordinate frames.
// ---------------------------------------------------------------------------

export interface LatentTransferOptions {
  /** Spatial match radius (scene units) between target and source voxels. */
  matchRadius?: number;
  /** How strongly to apply the transferred delta (0 = none, 1 = full, >1 = amplify). */
  strength?: number;
}

export interface LatentTransferResult {
  /** Deltas to apply against the TARGET scene (decode with target's slat). */
  targetDeltas: Map<string, VoxelDelta>;
  metrics: {
    /** Source voxels that were edited by the op. */
    source_edited_voxels: number;
    /** Target voxels that received a transferred delta. */
    matched_target_voxels: number;
    /** Target voxels with no corresponding edited source voxel. */
    unmatched_target_voxels: number;
    match_radius: number;
    target_voxel_count: number;
    source_voxel_count: number;
  };
}

export interface LatentInterpolationOptions {
  /** Spatial match radius (scene units). */
  matchRadius?: number;
  /** 0 = keep target, 1 = fully adopt source. Default 0.5. */
  t?: number;
}

export interface LatentInterpolationResult {
  /** Deltas to apply against the target scene. */
  targetDeltas: Map<string, VoxelDelta>;
  metrics: {
    matched_voxels: number;
    total_voxels: number;
    interpolation_t: number;
    match_radius: number;
  };
}

interface VoxelGrid {
  cell: number;
  buckets: Map<string, SlatVoxel[]>;
}

/** Bucket source voxels into a uniform grid keyed by integer cell coords. */
function buildVoxelGrid(source: SlatScene, cell: number): VoxelGrid {
  const buckets = new Map<string, SlatVoxel[]>();
  for (const v of source.voxels.values()) {
    const key = `${Math.floor(v.position[0] / cell)},${Math.floor(v.position[1] / cell)},${Math.floor(v.position[2] / cell)}`;
    const arr = buckets.get(key);
    if (arr) arr.push(v);
    else buckets.set(key, [v]);
  }
  return { cell, buckets };
}

/** Nearest source voxel to a world position within matchRadius, or null. */
function nearestVoxel(
  grid: VoxelGrid,
  pos: [number, number, number],
  matchRadius: number,
): SlatVoxel | null {
  const cell = grid.cell;
  const cx = Math.floor(pos[0] / cell);
  const cy = Math.floor(pos[1] / cell);
  const cz = Math.floor(pos[2] / cell);
  const r2 = matchRadius * matchRadius;
  let best: SlatVoxel | null = null;
  let bestD2 = r2;
  for (let dx = -1; dx <= 1; dx++) {
    for (let dy = -1; dy <= 1; dy++) {
      for (let dz = -1; dz <= 1; dz++) {
        const bucket = grid.buckets.get(`${cx + dx},${cy + dy},${cz + dz}`);
        if (!bucket) continue;
        for (const v of bucket) {
          const ddx = v.position[0] - pos[0];
          const ddy = v.position[1] - pos[1];
          const ddz = v.position[2] - pos[2];
          const d2 = ddx * ddx + ddy * ddy + ddz * ddz;
          if (d2 <= bestD2) { best = v; bestD2 = d2; }
        }
      }
    }
  }
  return best;
}

/**
 * Replay a latent edit from a source scene onto a target scene.
 * The op is applied to the source; each edited source voxel transfers its
 * *relative* change (position offset, color offset, opacity ratio) to the
 * spatially nearest target voxel within matchRadius.
 */
export function transferLatentEdit(
  source: SlatScene,
  target: SlatScene,
  op: LatentEditOp,
  options: LatentTransferOptions = {},
): LatentTransferResult {
  const matchRadius = options.matchRadius ?? source.voxelSize * 2;
  const strength = options.strength ?? 1;
  const sourceResult = applyLatentEdit(source, op);
  const sourceDeltas = sourceResult.deltas;
  const grid = buildVoxelGrid(source, matchRadius);

  const targetDeltas = new Map<string, VoxelDelta>();
  let matched = 0;
  for (const tv of target.voxels.values()) {
    const sv = nearestVoxel(grid, tv.position, matchRadius);
    if (!sv) continue;
    const sd = sourceDeltas.get(sv.id);
    if (!sd) continue; // source voxel was not edited
    const td: VoxelDelta = {};
    if (sd.remove) {
      td.remove = true;
    } else {
      if (sd.position) {
        td.position = [
          tv.position[0] + (sd.position[0] - sv.position[0]) * strength,
          tv.position[1] + (sd.position[1] - sv.position[1]) * strength,
          tv.position[2] + (sd.position[2] - sv.position[2]) * strength,
        ];
      }
      if (sd.color) {
        td.color = [
          clamp01(tv.color[0] + (sd.color[0] - sv.color[0]) * strength),
          clamp01(tv.color[1] + (sd.color[1] - sv.color[1]) * strength),
          clamp01(tv.color[2] + (sd.color[2] - sv.color[2]) * strength),
        ];
      }
      if (sd.opacity !== undefined) {
        const ratio = sv.opacity > 0 ? sd.opacity / sv.opacity : 0;
        td.opacity = clamp01(tv.opacity * (1 + (ratio - 1) * strength));
      }
    }
    targetDeltas.set(tv.id, td);
    matched++;
  }

  return {
    targetDeltas,
    metrics: {
      source_edited_voxels: sourceDeltas.size,
      matched_target_voxels: matched,
      unmatched_target_voxels: target.voxels.size - matched,
      match_radius: matchRadius,
      target_voxel_count: target.voxels.size,
      source_voxel_count: source.voxels.size,
    },
  };
}

/**
 * Latent interpolation: blend a target scene toward a source scene's
 * appearance at fraction t, by spatial correspondence. Keeps target geometry
 * count; moves position, blends color and opacity toward the source voxels.
 */
export function interpolateLatent(
  target: SlatScene,
  source: SlatScene,
  options: LatentInterpolationOptions = {},
): LatentInterpolationResult {
  const t = Math.min(1, Math.max(0, options.t ?? 0.5));
  const matchRadius = options.matchRadius ?? source.voxelSize * 2;
  const grid = buildVoxelGrid(source, matchRadius);

  const targetDeltas = new Map<string, VoxelDelta>();
  let matched = 0;
  for (const tv of target.voxels.values()) {
    const sv = nearestVoxel(grid, tv.position, matchRadius);
    if (!sv) continue;
    matched++;
    const td: VoxelDelta = {
      position: [
        tv.position[0] + (sv.position[0] - tv.position[0]) * t,
        tv.position[1] + (sv.position[1] - tv.position[1]) * t,
        tv.position[2] + (sv.position[2] - tv.position[2]) * t,
      ],
      color: [
        clamp01(tv.color[0] + (sv.color[0] - tv.color[0]) * t),
        clamp01(tv.color[1] + (sv.color[1] - tv.color[1]) * t),
        clamp01(tv.color[2] + (sv.color[2] - tv.color[2]) * t),
      ],
      opacity: clamp01(tv.opacity + (sv.opacity - tv.opacity) * t),
    };
    targetDeltas.set(tv.id, td);
  }
  return {
    targetDeltas,
    metrics: {
      matched_voxels: matched,
      total_voxels: target.voxels.size,
      interpolation_t: t,
      match_radius: matchRadius,
    },
  };
}

// ---------------------------------------------------------------------------
// SlatManager — snapshot cache shared by the MCP tools
// ---------------------------------------------------------------------------

export class SlatManager {
  private slats = new Map<string, SlatScene>();

  get(id: string): SlatScene | null {
    return this.slats.get(id) ?? null;
  }

  /** Encode a scene and cache the snapshot; returns the snapshot id. */
  encode(gaussians: Gaussian[], voxelSize = 0.1): { slatId: string; slat: SlatScene } {
    const slat = encodeGaussiansToSlat(gaussians, voxelSize);
    const slatId = `slat_${Date.now()}_${Math.floor(Math.random() * 10000)}`;
    this.slats.set(slatId, slat);
    return { slatId, slat };
  }

  /** Apply an edit to a cached snapshot (immutable — snapshot unchanged). */
  edit(slatId: string, op: LatentEditOp): SlatEditResult {
    const slat = this.slats.get(slatId);
    if (!slat) throw new Error(`SLAT snapshot not found: ${slatId}. Call encode_scene_slatent first.`);
    return applyLatentEdit(slat, op);
  }

  /** Transfer an edit computed on `sourceSlatId` onto `targetSlatId`. */
  transfer(
    sourceSlatId: string,
    targetSlatId: string,
    op: LatentEditOp,
    options?: LatentTransferOptions,
  ): LatentTransferResult {
    const source = this.slats.get(sourceSlatId);
    const target = this.slats.get(targetSlatId);
    if (!source) throw new Error(`SLAT snapshot not found: ${sourceSlatId}. Call encode_scene_slatent first.`);
    if (!target) throw new Error(`SLAT snapshot not found: ${targetSlatId}. Call encode_scene_slatent first.`);
    return transferLatentEdit(source, target, op, options);
  }

  /** Interpolate `targetSlatId` toward `sourceSlatId` at fraction t. */
  interpolate(
    targetSlatId: string,
    sourceSlatId: string,
    options?: LatentInterpolationOptions,
  ): LatentInterpolationResult {
    const target = this.slats.get(targetSlatId);
    const source = this.slats.get(sourceSlatId);
    if (!target) throw new Error(`SLAT snapshot not found: ${targetSlatId}. Call encode_scene_slatent first.`);
    if (!source) throw new Error(`SLAT snapshot not found: ${sourceSlatId}. Call encode_scene_slatent first.`);
    return interpolateLatent(target, source, options);
  }

  /** Decode a snapshot + deltas back into an updated Gaussian list. */
  decode(slatId: string, deltas: Map<string, VoxelDelta>): Gaussian[] {
    const slat = this.slats.get(slatId);
    if (!slat) throw new Error(`SLAT snapshot not found: ${slatId}`);
    return decodeSlatToGaussians(slat, deltas);
  }

  list(): Array<{ id: string; voxelCount: number; sourceCount: number }> {
    const out: Array<{ id: string; voxelCount: number; sourceCount: number }> = [];
    for (const [id, s] of this.slats) {
      out.push({ id, voxelCount: s.voxels.size, sourceCount: s.sourceGaussians.length });
    }
    return out;
  }
}