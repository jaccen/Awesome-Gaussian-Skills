/**
 * Scene State Manager — In-memory storage for loaded 3DGS scenes.
 * Maintains Gaussian arrays, camera state, segmentation, and metadata.
 * All operations are in-memory; no original PLY files are ever modified.
 */

import type { Scene, Gaussian, CameraState, BoundingBox, GaussianSelection, GaussianOperation } from './types.js';

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

  pruneByImportance(strategy: string, targetRatio: number, preserveRegions?: Array<{ center: number[]; radius: number }>, sceneId?: string): { removed: number; remaining: number } {
    const scene = this.getScene(sceneId);
    if (!scene) throw new Error('No active scene');

    const total = scene.gaussians.length;
    const targetCount = Math.floor(total * targetRatio);
    const toRemove = total - targetCount;

    // Sort by importance metric (simplified — real impl would use DoG/coreset/gradient)
    const scored = scene.gaussians.map((g, idx) => {
      let score = g.opacity;
      // Smaller scale = finer detail = more important
      const scaleMag = Math.sqrt(g.scale[0] ** 2 + g.scale[1] ** 2 + g.scale[2] ** 2);
      score += 1.0 / (scaleMag + 0.001);

      // Protected regions
      if (preserveRegions) {
        for (const region of preserveRegions) {
          const dx = g.position[0] - region.center[0];
          const dy = g.position[1] - region.center[1];
          const dz = g.position[2] - region.center[2];
          if (dx * dx + dy * dy + dz * dz <= region.radius * region.radius) {
            score += 1000; // Protect from pruning
          }
        }
      }
      return { idx, score };
    });

    scored.sort((a, b) => a.score - b.score); // Lowest score = least important = prune first
    const toRemoveSet = new Set(scored.slice(0, toRemove).map((s) => s.idx));

    scene.gaussians = scene.gaussians.filter((_, idx) => !toRemoveSet.has(idx));
    // Re-index
    scene.gaussians.forEach((g, i) => (g.id = i));

    return { removed: toRemove, remaining: scene.gaussians.length };
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
}
