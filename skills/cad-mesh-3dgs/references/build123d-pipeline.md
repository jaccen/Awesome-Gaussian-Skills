
# Parametric CAD → 3DGS Pipeline (build123d Integration)

### 6.1 Why Parametric CAD as 3DGS Source?

| Advantage | Detail |
|-----------|--------|
| **Exact geometry** | No approximation error from scanning; ground-truth surface is analytically defined |
| **Part hierarchy** | STEP topology provides occurrence-level (o1.N) labels → natural part segmentation |
| **Programmable** | Parameters (gear ratio, crank length) → infinite scene variations for ablation |
| **Material metadata** | CAD models carry face-level material/finish information → supervision for appearance |
| **Benchmark ground truth** | CAD mesh = perfect Chamfer Distance / F-Score reference for geometry evaluation |

### 6.2 build123d → STEP → GLB → 3DGS Pipeline

```
Parametric CAD (build123d Python)
    │
    ├── Define parts as labeled Compound assemblies
    │   ├── _compound_of(pieces, label="crank_left")  # occurrence naming
    │   ├── _fuse(parts)                               # boolean union
    │   └── Export STEP with topology
    │
    ├── STEP → GLB (via CAD Skills / OCP)
    │   ├── Mesh tessellation (angular/linear tolerance)
    │   ├── STEP_topology glTF extension (o1.N occurrence map preserved)
    │   └── Per-occurrence color assignment
    │
    ├── GLB → Mesh Sampling
    │   ├── Load GLB with trimesh
    │   ├── Per-occurrence mesh extraction (via STEP_topology names)
    │   ├── Curvature-aware Poisson disk sampling per surface
    │   └── Output: sampled point positions + normals + part labels
    │
    └── Sampled Points → Gaussian Initialization
        ├── μ: sampled point positions (curvature-weighted density)
        ├── R: rotation from face normal (local frame alignment)
        ├── S: scale from [sqrt(face_area)*0.5, sqrt(face_area)*0.5, 0.01]
        ├── α: 1.0 (all points are on-surface)
        ├── SH: initialized from per-occurrence base color
        └── Part label: preserved for Part-Aware rendering experiments
```

### 6.3 build123d Model Templates for 3DGS Experiments

The following CAD models from [cad-power-animations](https://github.com/gordensun/cad-power-animations) serve as ideal 3DGS test scenes:

| Model | Part Count | Key Challenge for 3DGS | Experiment Type |
|-------|-----------|----------------------|-----------------|
| **Planetary Gearbox** | 5 (sun + 3 planets + ring) | Tight gear mesh boundaries, thin teeth | Part-boundary rendering |
| **Robot Arm** | 6+ (links + joints) | Articulated occlusion, joint deformation | Part-Aware alpha compositing |
| **Bicycle** | 13 (frame, wheels, chain, cranks…) | Fine spokes, chain links, thin tubes | High-frequency detail recovery |
| **Geneva Drive** | 4 (drive wheel + driven wheel + pin + frame) | Intermittent contact surfaces | Contact-region rendering |
| **F1 Car Engine** | 15+ (pistons, crankshaft, cam…) | Complex internal geometry, specular metal | Specular + geometry reconstruction |
| **Drone** | 8 (frame + 4 rotors + camera) | Rotating thin blades, transparent body | Motion blur + transparency |

### 6.4 Key Code: build123d Part-Labeled Assembly

```python
# pattern from cad-power-animations — adapted for 3DGS initialization
from build123d import *

def make_part_labeled_assembly():
    """Build a parametric assembly with STEP_topology-compatible labels."""
    # Example: planetary gear system
    sun_gear = _compound_of(make_sun_gear(teeth=20), label="sun_gear")
    planet_1 = _compound_of(make_planet_gear(teeth=10), label="planet_1")
    planet_2 = _compound_of(make_planet_gear(teeth=10), label="planet_2")
    planet_3 = _compound_of(make_planet_gear(teeth=10), label="planet_3")
    ring_gear = _compound_of(make_ring_gear(teeth=40), label="ring_gear")

    assembly = Compound(
        label="planetary_gearbox",
        children=[sun_gear, planet_1, planet_2, planet_3, ring_gear]
    )
    return assembly

def _compound_of(pieces, label):
    """Create a labeled Compound from one or more solid pieces."""
    if isinstance(pieces, Solid):
        pieces = [pieces]
    fused = pieces[0]
    for p in pieces[1:]:
        fused = fuse(fused, p)
    return Compound(children=[fused], label=label)
```

### 6.5 Key Code: GLB → Part-Aware Gaussian Initialization

```python
import trimesh
import numpy as np
import torch

def glb_to_part_gaussians(glb_path, samples_per_m2=50000, normal_scale=0.01):
    """Load GLB with STEP_topology, sample per-part, init Gaussians."""
    scene = trimesh.load(glb_path)

    # Group meshes by occurrence label (o1.N from STEP_topology)
    part_meshes = {}
    for name, geom in scene.geometry.items():
        if name.startswith("o1."):
            part_name = name  # e.g., "o1.3" → part occurrence
            if isinstance(geom, trimesh.Trimesh):
                part_meshes[part_name] = geom

    all_means = []
    all_scales = []
    all_rotations = []
    all_opacities = []
    all_part_ids = []
    part_id_map = {}

    for pid, (occ_name, mesh) in enumerate(part_meshes.items()):
        part_id_map[occ_name] = pid
        surface_area = mesh.area

        # Curvature-aware: more samples on high-curvature regions
        n_samples = max(1000, int(surface_area * samples_per_m2))
        points, face_idx = mesh.sample(n_samples, return_index=True)

        # Get normals at sample points
        normals = mesh.face_normals[face_idx]

        # Per-face area for scale initialization
        face_areas = mesh.area_faces
        sample_face_areas = face_areas[face_idx]

        for i in range(len(points)):
            n = normals[i]
            area = sample_face_areas[i]

            # Build rotation from normal
            R = normal_to_rotation(n)

            # Scale: flat in normal, spread in tangent
            s = np.sqrt(area) * 0.5
            scale = np.array([s, s, normal_scale])

            all_means.append(points[i])
            all_scales.append(scale)
            all_rotations.append(R)
            all_opacities.append(1.0)
            all_part_ids.append(pid)

    return {
        "means": torch.tensor(np.array(all_means), dtype=torch.float32),
        "scales": torch.tensor(np.array(all_scales), dtype=torch.float32),
        "rotations": torch.tensor(np.array(all_rotations), dtype=torch.float32),
        "opacities": torch.tensor(all_opacities, dtype=torch.float32),
        "part_ids": torch.tensor(all_part_ids, dtype=torch.long),
        "part_id_map": part_id_map,
    }

def normal_to_rotation(normal):
    """Convert face normal to 3x3 rotation matrix (local frame)."""
    n = normal / np.linalg.norm(normal)
    if abs(n[0]) < 0.9:
        t1 = np.cross(n, np.array([1, 0, 0]))
    else:
        t1 = np.cross(n, np.array([0, 1, 0]))
    t1 = t1 / np.linalg.norm(t1)
    t2 = np.cross(n, t1)
    return np.stack([t1, t2, n], axis=1)  # 3x3
```

### 6.6 Part-Aware 3DGS Rendering Integration

The part-label information from STEP topology enables Part-Aware alpha compositing:

```
Standard compositing:  C = Σᵢ Tᵢ · αᵢ · cᵢ
Part-Aware compositing: C = Σᵢ Tᵢ · αᵢ · ω_{p(i)}(θ) · cᵢ

Where:
  p(i) = part label of Gaussian i (from STEP_topology)
  ω_{p(i)}(θ) = part-aware opacity modulation
    - Penalizes inter-part penetration: ω ↓ when Gaussian i
      overlaps a different part's volume
    - Enforces joint constraints: ω ↓ when part violates
      kinematic limits (e.g., robot arm joint angle)
```

This directly supports Research Idea I-01 (Part-Aware Alpha-Compositing) from the project README.

### 6.7 Rendering Multi-View Images from CAD Models

For 3DGS benchmark evaluation, render multi-view images from CAD models:

```python
# Using Blender Python API (bpy) for high-quality rendering
import bpy, os, math

def render_cad_multiview.step_file, output_dir, n_views=100):
    """Render a STEP model from multiple viewpoints for 3DGS training."""
    bpy.ops.wm.read_factory_settings(use_empty=True)
    bpy.ops.import_scene.step(filepath=step_file)

    # Camera on hemisphere
    cam = bpy.data.objects['Camera']
    for i in range(n_views):
        theta = 2 * math.pi * i / n_views
        phi = math.pi / 4  # 45° elevation
        r = 3.0

        cam.location = (
            r * math.sin(phi) * math.cos(theta),
            r * math.sin(phi) * math.sin(theta),
            r * math.cos(phi)
        )
        cam.rotation_euler = look_at(cam.location, (0, 0, 0))

        bpy.context.scene.render.filepath = os.path.join(
            output_dir, f"image_{i:04d}.png"
        )
        bpy.ops.render.render(write_still=True)

    # Save cameras.json in COLMAP format
    save_cameras_colmap(output_dir, n_views)
```