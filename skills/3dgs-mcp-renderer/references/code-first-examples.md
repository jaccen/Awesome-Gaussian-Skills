# Code-First Examples — Hybrid Export JavaScript

> Extracted from SKILL.md. Loaded on demand when code-first export examples are needed.

## Hybrid: Procedural Code + 3DGS Splatting

The key insight: **not everything needs to be Gaussians**. For a desk scene:
- Desk surface → procedural `BoxGeometry` in code (simple, editable, lightweight)
- Monitor screen texture → procedural `MeshStandardMaterial` (or 3DGS if view-dependent)
- Complex organic objects → 3DGS splatting data (where procedural code can't compete)

```javascript
// Code-first export example: desk_scene.js
import * as THREE from 'three';
import { SplatLoader } from './splat-loader.js';

export function createDeskScene() {
  const scene = new THREE.Scene();
  
  // === Procedural geometry (from sculpting spec) ===
  // Desk: simple parametric geometry
  const desk = new THREE.Mesh(
    new THREE.BoxGeometry(1.2, 0.05, 0.6),
    new THREE.MeshStandardMaterial({ color: 0x8B4513, roughness: 0.7 })
  );
  desk.position.set(0, 0.75, 0);
  scene.add(desk);
  
  // Keyboard: procedural + label-based grouping
  const keyboardGroup = new THREE.Group();
  // ... key meshes generated procedurally ...
  scene.add(keyboardGroup);
  
  // === 3DGS splatting (for complex/organic elements) ===
  // Monitor: splatting data for view-dependent reflections
  const monitorSplat = new SplatLoader();
  monitorSplat.load('monitor.splat').then(splat => {
    splat.setPosition(0, 0.95, -0.15);
    scene.add(splat);
  });
  
  // === Lighting (from sculpting stage 6) ===
  const lamp = new THREE.PointLight(0xFFE4B5, 0.8);
  lamp.position.set(0.4, 1.2, 0.2);
  scene.add(lamp);
  
  return scene;
}
```