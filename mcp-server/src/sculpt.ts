/**
 * Spec-First Sculpting Pipeline — v0.9
 *
 * Implements the three v0.8+ flagship tools:
 *   1. define_scene_spec  — Object Spec management (component hierarchy, materials, gates)
 *   2. sculpt_pipeline    — 6-stage gate-evaluated sculpting (blockout → structural → form → material → surface → lighting)
 *   3. generateSceneCode  — Code-first export (Three.js procedural code + .splat data)
 *
 * Design principles:
 *   - Spec before sculpt: sculpt_pipeline rejects calls without a valid spec_id
 *   - Stage order enforced: stages must execute in sequence; skipping requires explicit override
 *   - Gate evaluation: each stage produces metrics compared against spec quality gates
 *   - Code-first: procedural geometry → Three.js code; organic regions → .splat file
 */

import type { Scene, Gaussian } from './types.js';
import type { SceneState } from './scene-state.js';
import { createRequire } from 'module';
const _require = createRequire(import.meta.url);
const _fs = _require('fs');
const _path = _require('path');

// ---------------------------------------------------------------------------
// Spec Types
// ---------------------------------------------------------------------------

export type ComponentType = 'box' | 'sphere' | 'cylinder' | 'cone' | 'torus' | 'plane' | 'organic';
export type SculptStage = 'blockout' | 'structural' | 'form' | 'material' | 'surface' | 'lighting';
export type StageStatus = 'pending' | 'in_progress' | 'passed' | 'failed' | 'skipped';

export interface ComponentSpec {
  name: string;
  type: ComponentType;
  bbox: { min: [number, number, number]; max: [number, number, number] };
  parent?: string;
  material?: string;
  gaussianCount?: number; // target Gaussian count for this component
}

export interface MaterialSpec {
  name: string;
  type: 'pbr' | 'sh' | 'procedural';
  baseColor: [number, number, number];
  metallic?: number;
  roughness?: number;
  opacity?: number;
}

export interface QualityGate {
  stage: SculptStage;
  metric: string;
  target: number;
  description: string;
}

export interface StageResult {
  stage: SculptStage;
  status: StageStatus;
  attempts: number;
  metrics: Record<string, number>;
  passed: boolean;
  message: string;
  completedAt: number;
}

export interface SceneSpec {
  id: string;
  name: string;
  components: ComponentSpec[];
  materials: MaterialSpec[];
  qualityGates: QualityGate[];
  targetCoverage: number;
  minPsnr: number;
  targetScore: number;
  sceneId?: string; // set after blockout creates the scene
  stages: Map<SculptStage, StageResult>;
  createdAt: number;
}

// ---------------------------------------------------------------------------
// Scene Spec Manager
// ---------------------------------------------------------------------------

export class SceneSpecManager {
  private specs = new Map<string, SceneSpec>();

  defineSpec(params: {
    name: string;
    components: ComponentSpec[];
    materials?: MaterialSpec[];
    qualityGates?: QualityGate[];
    targetCoverage?: number;
    minPsnr?: number;
    targetScore?: number;
  }): SceneSpec {
    const id = `spec_${Date.now()}_${Math.floor(Math.random() * 10000)}`;
    const stageOrder: SculptStage[] = ['blockout', 'structural', 'form', 'material', 'surface', 'lighting'];
    const stages = new Map<SculptStage, StageResult>();
    for (const stage of stageOrder) {
      stages.set(stage, {
        stage,
        status: 'pending',
        attempts: 0,
        metrics: {},
        passed: false,
        message: '',
        completedAt: 0,
      });
    }

    const spec: SceneSpec = {
      id,
      name: params.name,
      components: params.components,
      materials: params.materials ?? [],
      qualityGates: params.qualityGates ?? this.defaultGates(params.targetCoverage ?? 0.85, params.minPsnr ?? 20, params.targetScore ?? 0.8),
      targetCoverage: params.targetCoverage ?? 0.85,
      minPsnr: params.minPsnr ?? 20,
      targetScore: params.targetScore ?? 0.8,
      stages,
      createdAt: Date.now(),
    };
    this.specs.set(id, spec);
    return spec;
  }

  getSpec(id: string): SceneSpec | null {
    return this.specs.get(id) ?? null;
  }

  listSpecs(): Array<{ id: string; name: string; componentCount: number; createdAt: number }> {
    return Array.from(this.specs.values()).map((s) => ({
      id: s.id,
      name: s.name,
      componentCount: s.components.length,
      createdAt: s.createdAt,
    }));
  }

  private defaultGates(coverage: number, psnr: number, targetScore: number = 0.8): QualityGate[] {
    return [
      { stage: 'blockout', metric: 'bbox_coverage', target: coverage, description: 'Bounding box coverage of all components' },
      { stage: 'structural', metric: 'part_count_match', target: 1.0, description: 'Part count matches spec (1.0 = exact match)' },
      { stage: 'form', metric: 'psnr_estimate', target: psnr, description: 'Estimated PSNR after form refinement' },
      { stage: 'material', metric: 'material_coverage', target: 0.9, description: 'Fraction of Gaussians with assigned materials' },
      { stage: 'surface', metric: 'normal_consistency', target: 0.7, description: 'Normal consistency score across neighboring Gaussians' },
      { stage: 'lighting', metric: 'render_quality_score', target: targetScore, description: 'Overall render quality score' },
    ];
  }
}

// ---------------------------------------------------------------------------
// Sculpt Pipeline — Stage Executors
// ---------------------------------------------------------------------------

const STAGE_ORDER: SculptStage[] = ['blockout', 'structural', 'form', 'material', 'surface', 'lighting'];

export class SculptPipeline {
  constructor(
    private state: SceneState,
    private specManager: SceneSpecManager,
  ) {}

  /**
   * Execute one stage of the sculpting pipeline.
   * Returns the stage result with gate evaluation.
   */
  async executeStage(specId: string, stage: SculptStage, params?: Record<string, unknown>): Promise<StageResult> {
    const spec = this.specManager.getSpec(specId);
    if (!spec) {
      throw new Error(`Spec not found: ${specId}`);
    }

    // Check stage order
    const stageIndex = STAGE_ORDER.indexOf(stage);
    if (stageIndex > 0) {
      const prevStage = STAGE_ORDER[stageIndex - 1];
      const prevResult = spec.stages.get(prevStage);
      if (prevResult && prevResult.status !== 'passed' && prevResult.status !== 'skipped') {
        if (!params?.override_order) {
          throw new Error(`Stage "${prevStage}" must be completed before "${stage}". Current status: ${prevResult.status}. Pass override_order=true to skip.`);
        }
      }
    }

    const current = spec.stages.get(stage)!;
    current.status = 'in_progress';
    current.attempts++;

    try {
      const metrics = await this.runStage(spec, stage, params);
      current.metrics = metrics;
      current.passed = this.evaluateGate(spec, stage, metrics);
      current.status = current.passed ? 'passed' : 'failed';
      current.message = current.passed
        ? `Stage "${stage}" passed all gates.`
        : `Stage "${stage}" did not pass gates. See metrics.`;
      current.completedAt = Date.now();
    } catch (err) {
      current.status = 'failed';
      current.message = `Stage "${stage}" errored: ${(err as Error).message}`;
      current.completedAt = Date.now();
    }

    return current;
  }

  private async runStage(spec: SceneSpec, stage: SculptStage, params?: Record<string, unknown>): Promise<Record<string, number>> {
    switch (stage) {
      case 'blockout': return this.stageBlockout(spec);
      case 'structural': return this.stageStructural(spec);
      case 'form': return this.stageForm(spec, params);
      case 'material': return this.stageMaterial(spec);
      case 'surface': return this.stageSurface(spec, params);
      case 'lighting': return this.stageLighting(spec, params);
      default: throw new Error(`Unknown stage: ${stage}`);
    }
  }

  // --- Stage 1: Blockout ---
  private stageBlockout(spec: SceneSpec): Record<string, number> {
    const allGaussians: Gaussian[] = [];
    let nextId = 0;

    for (const comp of spec.components) {
      const gaussians = this.generateComponentGaussians(comp, nextId);
      allGaussians.push(...gaussians);
      nextId += gaussians.length;
    }

    // Create or replace scene
    const sceneId = this.state.createScene(
      `sculpt:${spec.name}`,
      'ply',
      allGaussians,
      { isArticulated: spec.components.some((c) => c.parent !== undefined) },
    );
    spec.sceneId = sceneId;

    // Compute bbox coverage
    const scene = this.state.getScene(sceneId)!;
    const sceneBbox = scene.bbox;
    const componentBbox = this.computeComponentsBbox(spec.components);
    const coverage = this.bboxCoverage(sceneBbox, componentBbox);

    return {
      bbox_coverage: coverage,
      gaussian_count: allGaussians.length,
      component_count: spec.components.length,
    };
  }

  // --- Stage 2: Structural ---
  private stageStructural(spec: SceneSpec): Record<string, number> {
    const scene = this.state.getScene(spec.sceneId!);
    if (!scene) throw new Error('Scene not found after blockout');

    // Assign partName to each Gaussian based on which component bbox it falls within
    let assigned = 0;
    const segmentation = new Map<string, number[]>();

    for (const g of scene.gaussians) {
      for (const comp of spec.components) {
        if (this.pointInBbox(g.position, comp.bbox)) {
          g.partName = comp.name;
          if (!segmentation.has(comp.name)) segmentation.set(comp.name, []);
          segmentation.get(comp.name)!.push(g.id);
          assigned++;
          break;
        }
      }
    }
    scene.segmentation = segmentation;

    const partCount = segmentation.size;
    const expectedParts = spec.components.length;
    const matchRatio = expectedParts > 0 ? partCount / expectedParts : 0;

    return {
      part_count: partCount,
      part_count_match: matchRatio,
      assigned_gaussians: assigned,
      unassigned_gaussians: scene.gaussians.length - assigned,
    };
  }

  // --- Stage 3: Form ---
  private stageForm(spec: SceneSpec, params?: Record<string, unknown>): Record<string, number> {
    const scene = this.state.getScene(spec.sceneId!);
    if (!scene) throw new Error('Scene not found');

    const densityFactor = (params?.density_factor as number) ?? 1.0;
    let refined = 0;

    for (const g of scene.gaussians) {
      const comp = spec.components.find((c) => c.name === g.partName);
      if (!comp) continue;

      // Adjust scale based on component type
      switch (comp.type) {
        case 'box':
        case 'plane':
          // Flat surfaces: uniform small scale
          g.scale = [0.03 * densityFactor, 0.03 * densityFactor, 0.03 * densityFactor];
          break;
        case 'sphere':
        case 'organic':
          // Organic: slightly larger, more variation
          g.scale = [0.04 * densityFactor, 0.04 * densityFactor, 0.04 * densityFactor];
          break;
        case 'cylinder':
        case 'cone':
          // Elongated: stretch along one axis
          g.scale = [0.025 * densityFactor, 0.05 * densityFactor, 0.025 * densityFactor];
          break;
        case 'torus':
          g.scale = [0.035 * densityFactor, 0.02 * densityFactor, 0.035 * densityFactor];
          break;
      }
      refined++;
    }

    // Estimate PSNR (simplified: based on density and coverage)
    const density = scene.gaussians.length / Math.max(1, this.bboxVolume(scene.bbox));
    const psnrEstimate = 15 + Math.min(15, density * 100);

    return {
      psnr_estimate: psnrEstimate,
      refined_gaussians: refined,
      avg_scale: scene.gaussians.reduce((s, g) => s + (g.scale[0] + g.scale[1] + g.scale[2]) / 3, 0) / scene.gaussians.length,
    };
  }

  // --- Stage 4: Material ---
  private stageMaterial(spec: SceneSpec): Record<string, number> {
    const scene = this.state.getScene(spec.sceneId!);
    if (!scene) throw new Error('Scene not found');

    let assigned = 0;
    for (const g of scene.gaussians) {
      const comp = spec.components.find((c) => c.name === g.partName);
      if (!comp || !comp.material) {
        // Default gray
        g.color = [0.5, 0.5, 0.5];
        continue;
      }
      const mat = spec.materials.find((m) => m.name === comp.material);
      if (mat) {
        g.color = [...mat.baseColor] as [number, number, number];
        if (mat.opacity !== undefined) g.opacity = mat.opacity;
        assigned++;
      } else {
        g.color = [0.6, 0.6, 0.6];
      }
    }

    if (spec.materials.length > 0) {
      scene.metadata.hasPBR = spec.materials.some((m) => m.type === 'pbr');
    }

    const totalGaussians = scene.gaussians.length;
    const coverage = totalGaussians > 0 ? assigned / totalGaussians : 0;

    return {
      material_coverage: coverage,
      assigned_materials: assigned,
      material_count: spec.materials.length,
    };
  }

  // --- Stage 5: Surface ---
  private stageSurface(spec: SceneSpec, params?: Record<string, unknown>): Record<string, number> {
    const scene = this.state.getScene(spec.sceneId!);
    if (!scene) throw new Error('Scene not found');

    const thinThreshold = (params?.thin_threshold as number) ?? 0.01;
    let adjusted = 0;

    // Simplified normal consistency: for each Gaussian, check neighbors and align scale
    for (const g of scene.gaussians) {
      // Clamp minimum scale to prevent degenerate Gaussians
      g.scale = g.scale.map((s) => Math.max(thinThreshold, s)) as [number, number, number];

      // Ensure scale is within reasonable bounds
      const maxScale = 0.1;
      g.scale = g.scale.map((s) => Math.min(maxScale, s)) as [number, number, number];
      adjusted++;
    }

    // Compute simplified normal consistency (proxy: scale uniformity)
    let consistencySum = 0;
    for (const g of scene.gaussians) {
      const avg = (g.scale[0] + g.scale[1] + g.scale[2]) / 3;
      const variance = ((g.scale[0] - avg) ** 2 + (g.scale[1] - avg) ** 2 + (g.scale[2] - avg) ** 2) / 3;
      consistencySum += 1 / (1 + variance * 100);
    }
    const consistency = consistencySum / scene.gaussians.length;

    return {
      normal_consistency: consistency,
      adjusted_gaussians: adjusted,
      thin_clamped: adjusted,
    };
  }

  // --- Stage 6: Lighting ---
  private stageLighting(spec: SceneSpec, params?: Record<string, unknown>): Record<string, number> {
    const scene = this.state.getScene(spec.sceneId!);
    if (!scene) throw new Error('Scene not found');

    // Set camera to frame the scene
    const bbox = scene.bbox;
    const center: [number, number, number] = [
      (bbox.min[0] + bbox.max[0]) / 2,
      (bbox.min[1] + bbox.max[1]) / 2,
      (bbox.min[2] + bbox.max[2]) / 2,
    ];
    const size = Math.max(
      bbox.max[0] - bbox.min[0],
      bbox.max[1] - bbox.min[1],
      bbox.max[2] - bbox.min[2],
    );
    const distance = size * 2.5;

    scene.camera = {
      position: [center[0] + distance * 0.7, center[1] + distance * 0.5, center[2] + distance],
      target: center,
      fov: (params?.fov as number) ?? 50,
      up: [0, 1, 0],
    };

    // Compute render quality score (simplified)
    const gaussianCount = scene.gaussians.length;
    const densityScore = Math.min(1, gaussianCount / 5000);
    const coverageScore = Math.min(1, this.bboxCoverage(scene.bbox, this.computeComponentsBbox(spec.components)));
    const materialScore = Math.min(1, (scene.segmentation.size / Math.max(1, spec.components.length)));
    const qualityScore = (densityScore * 0.3 + coverageScore * 0.3 + materialScore * 0.4);

    return {
      render_quality_score: qualityScore,
      camera_distance: distance,
      gaussian_count: gaussianCount,
    };
  }

  // --- Gate Evaluation ---
  private evaluateGate(spec: SceneSpec, stage: SculptStage, metrics: Record<string, number>): boolean {
    const gate = spec.qualityGates.find((g) => g.stage === stage);
    if (!gate) return true; // No gate defined = auto-pass
    const value = metrics[gate.metric];
    if (value === undefined) return false;
    return value >= gate.target;
  }

  // --- Geometry Helpers ---
  private generateComponentGaussians(comp: ComponentSpec, startId: number): Gaussian[] {
    const gaussians: Gaussian[] = [];
    const { min, max } = comp.bbox;
    const size = [max[0] - min[0], max[1] - min[1], max[2] - min[2]];
    const targetCount = comp.gaussianCount ?? Math.max(50, Math.floor(size[0] * size[1] * size[2] * 1000));

    let id = startId;
    for (let i = 0; i < targetCount; i++) {
      const pos = this.samplePosition(comp, min, max);
      gaussians.push({
        id: id++,
        position: pos,
        scale: [0.04, 0.04, 0.04],
        rotation: [1, 0, 0, 0],
        color: [0.6, 0.6, 0.6],
        opacity: 0.8,
        partName: comp.name,
      });
    }
    return gaussians;
  }

  private samplePosition(comp: ComponentType | ComponentSpec, min: number[], max: number[]): [number, number, number] {
    const c = comp as ComponentSpec;
    const [minX, minY, minZ] = min;
    const [maxX, maxY, maxZ] = max;

    switch (c.type) {
      case 'box':
      case 'plane':
        // Uniform sampling within bbox
        return [
          minX + Math.random() * (maxX - minX),
          minY + Math.random() * (maxY - minY),
          minZ + Math.random() * (maxZ - minZ),
        ];
      case 'sphere': {
        // Sample within a sphere inscribed in bbox
        const cx = (minX + maxX) / 2, cy = (minY + maxY) / 2, cz = (minZ + maxZ) / 2;
        const r = Math.min(maxX - minX, maxY - minY, maxZ - minZ) / 2;
        const theta = Math.random() * Math.PI * 2;
        const phi = Math.acos(2 * Math.random() - 1);
        const rr = r * Math.cbrt(Math.random());
        return [cx + rr * Math.sin(phi) * Math.cos(theta), cy + rr * Math.sin(phi) * Math.sin(theta), cz + rr * Math.cos(phi)];
      }
      case 'cylinder':
      case 'cone': {
        // Sample within a cylinder along Y axis
        const cx = (minX + maxX) / 2, cz = (minZ + maxZ) / 2;
        const r = Math.min(maxX - minX, maxZ - minZ) / 2;
        const theta = Math.random() * Math.PI * 2;
        const yFrac = Math.random();
        const rr = r * (c.type === 'cone' ? yFrac : 1) * Math.sqrt(Math.random());
        return [cx + rr * Math.cos(theta), minY + yFrac * (maxY - minY), cz + rr * Math.sin(theta)];
      }
      case 'torus': {
        // Sample within a torus in the XZ plane
        const cx = (minX + maxX) / 2, cy = (minY + maxY) / 2, cz = (minZ + maxZ) / 2;
        const R = Math.min(maxX - minX, maxZ - minZ) / 3; // major radius
        const r = Math.min(maxX - minX, maxZ - minZ) / 6; // minor radius
        const u = Math.random() * Math.PI * 2;
        const v = Math.random() * Math.PI * 2;
        return [cx + (R + r * Math.cos(v)) * Math.cos(u), cy + r * Math.sin(v), cz + (R + r * Math.cos(v)) * Math.sin(u)];
      }
      default:
        return [
          minX + Math.random() * (maxX - minX),
          minY + Math.random() * (maxY - minY),
          minZ + Math.random() * (maxZ - minZ),
        ];
    }
  }

  private pointInBbox(p: number[], bbox: { min: number[]; max: number[] }): boolean {
    return p[0] >= bbox.min[0] && p[0] <= bbox.max[0] &&
           p[1] >= bbox.min[1] && p[1] <= bbox.max[1] &&
           p[2] >= bbox.min[2] && p[2] <= bbox.max[2];
  }

  private computeComponentsBbox(components: ComponentSpec[]): { min: [number, number, number]; max: [number, number, number] } {
    if (components.length === 0) return { min: [0, 0, 0], max: [0, 0, 0] };
    const min: [number, number, number] = [Infinity, Infinity, Infinity];
    const max: [number, number, number] = [-Infinity, -Infinity, -Infinity];
    for (const c of components) {
      for (let i = 0; i < 3; i++) {
        min[i] = Math.min(min[i], c.bbox.min[i]);
        max[i] = Math.max(max[i], c.bbox.max[i]);
      }
    }
    return { min, max };
  }

  private bboxCoverage(a: { min: number[]; max: number[] }, b: { min: number[]; max: number[] }): number {
    const volA = this.bboxVolume(a);
    const volB = this.bboxVolume(b);
    if (volB === 0) return 0;
    // Simplified: ratio of intersection to target bbox
    const intersectMin = [Math.max(a.min[0], b.min[0]), Math.max(a.min[1], b.min[1]), Math.max(a.min[2], b.min[2])];
    const intersectMax = [Math.min(a.max[0], b.max[0]), Math.min(a.max[1], b.max[1]), Math.min(a.max[2], b.max[2])];
    const intersectVol = Math.max(0, intersectMax[0] - intersectMin[0]) *
                         Math.max(0, intersectMax[1] - intersectMin[1]) *
                         Math.max(0, intersectMax[2] - intersectMin[2]);
    return Math.min(1, intersectVol / volB);
  }

  private bboxVolume(bbox: { min: number[]; max: number[] }): number {
    return Math.max(0, bbox.max[0] - bbox.min[0]) *
           Math.max(0, bbox.max[1] - bbox.min[1]) *
           Math.max(0, bbox.max[2] - bbox.min[2]);
  }
}

// ---------------------------------------------------------------------------
// Code-First Export — Three.js Code Generator
// ---------------------------------------------------------------------------

export type ExportFormat = 'threejs+splat' | 'threejs_only' | 'splat_only' | 'html';

export interface ExportResult {
  code: string;
  splatPath?: string;
  codePath?: string;
  htmlPath?: string;
  httpCodeUrl?: string;
  httpSplatUrl?: string;
  format: ExportFormat;
  componentCount: number;
  gaussianCount: number;
  proceduralCount: number;
  splatCount: number;
}

export function generateSceneCode(
  scene: Scene,
  spec: SceneSpec | null,
  format: ExportFormat,
  outputDir: string,
): ExportResult {
  const proceduralComponents: ComponentSpec[] = [];
  const splatGaussians: Gaussian[] = [];

  if (spec && format !== 'splat_only') {
    // Partition: procedural geometry vs splat
    for (const comp of spec.components) {
      if (comp.type === 'box' || comp.type === 'plane' || comp.type === 'cylinder' || comp.type === 'cone') {
        proceduralComponents.push(comp);
      } else {
        // Collect organic Gaussians for splat
        const gaussians = scene.gaussians.filter((g) => g.partName === comp.name);
        splatGaussians.push(...gaussians);
      }
    }
  } else if (format === 'splat_only') {
    splatGaussians.push(...scene.gaussians);
  } else {
    // No spec: all procedural based on segmentation
    for (const [label, ids] of scene.segmentation) {
      const labelGaussians = scene.gaussians.filter((g) => ids.includes(g.id));
      const bbox = computeGaussiansBbox(labelGaussians);
      proceduralComponents.push({
        name: label,
        type: 'box',
        bbox,
      });
    }
    if (proceduralComponents.length === 0) {
      splatGaussians.push(...scene.gaussians);
    }
  }

  let code = '';
  let splatPath: string | undefined;
  let codePath: string | undefined;
  let htmlPath: string | undefined;

  if (format === 'html') {
    // Generate standalone HTML with CDN Three.js imports
    const hasSplat = splatGaussians.length > 0;
    const splatData = hasSplat ? generateSplatData(splatGaussians) : null;
    const html = generateStandaloneHTML(scene, proceduralComponents, spec, hasSplat, splatData);
    htmlPath = _path.join(outputDir, `scene_${scene.id}.html`);
    _fs.writeFileSync(htmlPath, html, 'utf-8');
    code = html;
  } else {
    if (format !== 'splat_only') {
      code = generateThreeJSCode(scene, proceduralComponents, spec, format === 'threejs+splat' && splatGaussians.length > 0);
      codePath = _path.join(outputDir, `scene_${scene.id}.js`);
      _fs.writeFileSync(codePath, code, 'utf-8');
    }

    if (format !== 'threejs_only' && splatGaussians.length > 0) {
      const splatData = generateSplatData(splatGaussians);
      splatPath = _path.join(outputDir, `scene_${scene.id}.splat`);
      _fs.writeFileSync(splatPath, splatData);
    }
  }

  return {
    code,
    splatPath,
    codePath,
    htmlPath,
    format,
    componentCount: proceduralComponents.length + (splatGaussians.length > 0 ? 1 : 0),
    gaussianCount: scene.gaussians.length,
    proceduralCount: proceduralComponents.length,
    splatCount: splatGaussians.length,
  };
}

function generateThreeJSCode(
  scene: Scene,
  proceduralComponents: ComponentSpec[],
  spec: SceneSpec | null,
  hasSplat: boolean,
): string {
  const lines: string[] = [];
  lines.push('// ═══════════════════════════════════════════════════════════════');
  lines.push('// Code-First 3DGS Scene Export — Generated by sculpt_pipeline');
  lines.push(`// Scene: ${scene.id} | Gaussians: ${scene.gaussians.length} | Generated: ${new Date().toISOString()}`);
  lines.push('// ═══════════════════════════════════════════════════════════════');
  lines.push('');
  lines.push("import * as THREE from 'three';");
  lines.push("import { OrbitControls } from 'three/addons/controls/OrbitControls.js';");
  if (hasSplat) {
    lines.push("import { SplatLoader } from 'three/addons/loaders/SplatLoader.js';");
  }
  lines.push('');
  lines.push('// ── Scene Setup ──────────────────────────────────────────────');
  lines.push('const scene = new THREE.Scene();');
  lines.push('scene.background = new THREE.Color(0x1a1a2e);');
  lines.push('');
  lines.push('const camera = new THREE.PerspectiveCamera(');
  lines.push(`  ${scene.camera.fov},`);
  lines.push('  window.innerWidth / window.innerHeight,');
  lines.push('  0.1,');
  lines.push('  1000');
  lines.push(');');
  lines.push(`camera.position.set(${scene.camera.position.map((v) => v.toFixed(3)).join(', ')});`);
  lines.push(`camera.lookAt(${scene.camera.target.map((v) => v.toFixed(3)).join(', ')});`);
  lines.push('');
  lines.push('const renderer = new THREE.WebGLRenderer({ antialias: true });');
  lines.push('renderer.setSize(window.innerWidth, window.innerHeight);');
  lines.push('renderer.setPixelRatio(window.devicePixelRatio);');
  lines.push('document.body.appendChild(renderer.domElement);');
  lines.push('');
  lines.push('const controls = new OrbitControls(camera, renderer.domElement);');
  lines.push(`controls.target.set(${scene.camera.target.map((v) => v.toFixed(3)).join(', ')});`);
  lines.push('controls.enableDamping = true;');
  lines.push('');
  lines.push('// ── Lighting ─────────────────────────────────────────────────');
  lines.push('const ambientLight = new THREE.AmbientLight(0xffffff, 0.5);');
  lines.push('scene.add(ambientLight);');
  lines.push('');
  lines.push('const directionalLight = new THREE.DirectionalLight(0xffffff, 0.8);');
  lines.push('directionalLight.position.set(5, 10, 5);');
  lines.push('scene.add(directionalLight);');
  lines.push('');

  // Procedural geometry
  if (proceduralComponents.length > 0) {
    lines.push('// ── Procedural Geometry (from spec) ──────────────────────────');
    for (const comp of proceduralComponents) {
      const mat = spec?.materials.find((m) => m.name === comp.material);
      const color = mat?.baseColor ?? [0.6, 0.6, 0.6];
      const opacity = mat?.opacity ?? 0.9;
      const size = [
        comp.bbox.max[0] - comp.bbox.min[0],
        comp.bbox.max[1] - comp.bbox.min[1],
        comp.bbox.max[2] - comp.bbox.min[2],
      ];
      const center = [
        (comp.bbox.min[0] + comp.bbox.max[0]) / 2,
        (comp.bbox.min[1] + comp.bbox.max[1]) / 2,
        (comp.bbox.min[2] + comp.bbox.max[2]) / 2,
      ];

      lines.push(`// Component: ${comp.name} (${comp.type})`);
      let geometryCall = '';
      switch (comp.type) {
        case 'box':
          geometryCall = `new THREE.BoxGeometry(${size[0].toFixed(3)}, ${size[1].toFixed(3)}, ${size[2].toFixed(3)})`;
          break;
        case 'plane':
          geometryCall = `new THREE.PlaneGeometry(${size[0].toFixed(3)}, ${size[2].toFixed(3)})`;
          break;
        case 'cylinder':
          geometryCall = `new THREE.CylinderGeometry(${(Math.min(size[0], size[2]) / 2).toFixed(3)}, ${(Math.min(size[0], size[2]) / 2).toFixed(3)}, ${size[1].toFixed(3)})`;
          break;
        case 'cone':
          geometryCall = `new THREE.ConeGeometry(${(Math.min(size[0], size[2]) / 2).toFixed(3)}, ${size[1].toFixed(3)})`;
          break;
        default:
          geometryCall = `new THREE.BoxGeometry(${size[0].toFixed(3)}, ${size[1].toFixed(3)}, ${size[2].toFixed(3)})`;
      }

      const varName = comp.name.replace(/[^a-zA-Z0-9]/g, '_');
      lines.push(`const ${varName}_geo = ${geometryCall};`);
      lines.push(`const ${varName}_mat = new THREE.MeshStandardMaterial({`);
      lines.push(`  color: new THREE.Color(${color[0].toFixed(3)}, ${color[1].toFixed(3)}, ${color[2].toFixed(3)}),`);
      lines.push(`  roughness: ${mat?.roughness ?? 0.5},`);
      lines.push(`  metalness: ${mat?.metallic ?? 0.0},`);
      lines.push(`  transparent: ${opacity < 1.0},`);
      lines.push(`  opacity: ${opacity.toFixed(2)},`);
      lines.push('});');
      lines.push(`const ${varName} = new THREE.Mesh(${varName}_geo, ${varName}_mat);`);
      lines.push(`${varName}.position.set(${center.map((v) => v.toFixed(3)).join(', ')});`);
      lines.push(`scene.add(${varName});`);
      lines.push('');
    }
  }

  // Splat loading
  if (hasSplat) {
    lines.push('// ── 3DGS Splat Data (organic regions) ────────────────────────');
    lines.push("const splatLoader = new SplatLoader();");
    lines.push(`splatLoader.load('scene_${scene.id}.splat', (splatMesh) => {`);
    lines.push('  scene.add(splatMesh);');
    lines.push('  console.log("Splat data loaded");');
    lines.push('});');
    lines.push('');
  }

  // Animation loop
  lines.push('// ── Render Loop ──────────────────────────────────────────────');
  lines.push('function animate() {');
  lines.push('  requestAnimationFrame(animate);');
  lines.push('  controls.update();');
  lines.push('  renderer.render(scene, camera);');
  lines.push('}');
  lines.push('animate();');
  lines.push('');
  lines.push('// ── Window Resize ────────────────────────────────────────────');
  lines.push('window.addEventListener("resize", () => {');
  lines.push('  camera.aspect = window.innerWidth / window.innerHeight;');
  lines.push('  camera.updateProjectionMatrix();');
  lines.push('  renderer.setSize(window.innerWidth, window.innerHeight);');
  lines.push('});');

  return lines.join('\n');
}

function generateSplatData(gaussians: Gaussian[]): Buffer {
  // 32 bytes per splat: positions(12) + scales(12) + rgba(4) + rotation(4)
  const buf = Buffer.alloc(gaussians.length * 32);
  for (let i = 0; i < gaussians.length; i++) {
    const g = gaussians[i];
    const offset = i * 32;
    buf.writeFloatLE(g.position[0], offset);
    buf.writeFloatLE(g.position[1], offset + 4);
    buf.writeFloatLE(g.position[2], offset + 8);
    buf.writeFloatLE(g.scale[0], offset + 12);
    buf.writeFloatLE(g.scale[1], offset + 16);
    buf.writeFloatLE(g.scale[2], offset + 20);
    buf.writeUInt8(Math.round(g.color[0] * 255), offset + 24);
    buf.writeUInt8(Math.round(g.color[1] * 255), offset + 25);
    buf.writeUInt8(Math.round(g.color[2] * 255), offset + 26);
    buf.writeUInt8(Math.round(g.opacity * 255), offset + 27);
    // Rotation quaternion as uint8, mapping [-1, 1] → [0, 255]
    buf.writeUInt8(Math.round((g.rotation[0] + 1) * 127.5), offset + 28);
    buf.writeUInt8(Math.round((g.rotation[1] + 1) * 127.5), offset + 29);
    buf.writeUInt8(Math.round((g.rotation[2] + 1) * 127.5), offset + 30);
    buf.writeUInt8(Math.round((g.rotation[3] + 1) * 127.5), offset + 31);
  }
  return buf;
}

function computeGaussiansBbox(gaussians: Gaussian[]): { min: [number, number, number]; max: [number, number, number] } {
  if (gaussians.length === 0) return { min: [0, 0, 0], max: [0, 0, 0] };
  const min: [number, number, number] = [Infinity, Infinity, Infinity];
  const max: [number, number, number] = [-Infinity, -Infinity, -Infinity];
  for (const g of gaussians) {
    for (let i = 0; i < 3; i++) {
      min[i] = Math.min(min[i], g.position[i]);
      max[i] = Math.max(max[i], g.position[i]);
    }
  }
  return { min, max };
}

// ---------------------------------------------------------------------------
// Standalone HTML Export — CDN-based, browser-openable
// ---------------------------------------------------------------------------

function generateStandaloneHTML(
  scene: Scene,
  proceduralComponents: ComponentSpec[],
  spec: SceneSpec | null,
  hasSplat: boolean,
  splatData: Buffer | null,
): string {
  // Generate Three.js code body (splats handled separately via inline base64)
  let codeBody = generateThreeJSCode(scene, proceduralComponents, spec, false);

  // Remove ES module import statements (importmap handles these in HTML)
  codeBody = codeBody.replace(/^import .+$/gm, '');

  // If splat data exists, inject inline rendering before the animation loop
  if (hasSplat && splatData) {
    const base64 = splatData.toString('base64');
    const splatLines: string[] = [
      '// ── Splat Data (inline base64) ────────────────────────────────',
      `const splatBase64 = "${base64}";`,
      'const splatBuf = Uint8Array.from(atob(splatBase64), c => c.charCodeAt(0)).buffer;',
      'const splatView = new DataView(splatBuf);',
      'const splatCount = Math.floor(splatBuf.byteLength / 32);',
      'const splatPositions = new Float32Array(splatCount * 3);',
      'const splatColors = new Float32Array(splatCount * 3);',
      'for (let i = 0; i < splatCount; i++) {',
      '  const off = i * 32;',
      '  splatPositions[i * 3] = splatView.getFloat32(off, true);',
      '  splatPositions[i * 3 + 1] = splatView.getFloat32(off + 4, true);',
      '  splatPositions[i * 3 + 2] = splatView.getFloat32(off + 8, true);',
      '  splatColors[i * 3] = splatView.getUint8(off + 24) / 255;',
      '  splatColors[i * 3 + 1] = splatView.getUint8(off + 25) / 255;',
      '  splatColors[i * 3 + 2] = splatView.getUint8(off + 26) / 255;',
      '}',
      'const splatGeo = new THREE.BufferGeometry();',
      "splatGeo.setAttribute('position', new THREE.BufferAttribute(splatPositions, 3));",
      "splatGeo.setAttribute('color', new THREE.BufferAttribute(splatColors, 3));",
      'const splatMaterial = new THREE.PointsMaterial({',
      '  size: 0.04, vertexColors: true, transparent: true, opacity: 0.85, sizeAttenuation: true,',
      '});',
      'const splatMesh = new THREE.Points(splatGeo, splatMaterial);',
      'scene.add(splatMesh);',
      "console.log('Loaded ' + splatCount + ' splat points (inline)');",
      '',
    ];
    const splatCode = splatLines.join('\n');

    // Insert before the render loop section
    const renderLoopMarker = '// ── Render Loop';
    const idx = codeBody.indexOf(renderLoopMarker);
    if (idx >= 0) {
      codeBody = codeBody.slice(0, idx) + splatCode + '\n' + codeBody.slice(idx);
    } else {
      codeBody += '\n' + splatCode;
    }
  }

  return `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>3DGS Scene — ${scene.id}</title>
  <style>
    * { margin: 0; padding: 0; box-sizing: border-box; }
    body { overflow: hidden; background: #1a1a2e; font-family: monospace; }
    canvas { display: block; }
    #info {
      position: absolute; top: 10px; left: 10px;
      color: #888; font-size: 12px; pointer-events: none;
      background: rgba(0,0,0,0.4); padding: 6px 10px; border-radius: 4px;
    }
  </style>
  <script type="importmap">
  {
    "imports": {
      "three": "https://unpkg.com/three@0.160.0/build/three.module.js",
      "three/addons/": "https://unpkg.com/three@0.160.0/examples/jsm/"
    }
  }
  </script>
</head>
<body>
  <div id="info">Scene: ${scene.id} | Gaussians: ${scene.gaussians.length} | Generated: ${new Date().toISOString().slice(0, 10)}</div>
  <script type="module">
${codeBody}
  </script>
</body>
</html>`;
}
