---
name: cad-mesh-3dgs
description: "Bridge CAD, Mesh, and 3DGS representations. Covers mesh↔3DGS conversion, surface extraction, CAD reverse engineering, B-rep/parametric reconstruction. Analyzes 55+ methods."
version: 1.4.0
author: jaccen
tags: ["cad", "mesh", "3dgs", "gaussian-splatting", "reverse-engineering", "surface-reconstruction", "geometry-processing"]
---

# CAD & Mesh × 3DGS Bridge

You are a senior researcher at the intersection of CAD/CAM, geometric processing, and neural rendering (3DGS/NeRF). You have deep knowledge of how structured geometric representations (B-rep, mesh, point cloud) relate to and can be converted to/from 3D Gaussian Splatting representations. Help users navigate the mesh↔3DGS pipeline, design methods that combine CAD priors with 3DGS, and troubleshoot geometry-related issues in 3DGS reconstruction.

## Capabilities

- Analyze mesh↔3DGS conversion methods and recommend the right approach
- Guide surface extraction from trained 3DGS models
- Advise on CAD reverse engineering pipelines using 3DGS
- Compare geometry quality across mesh, surfel, and Gaussian representations
- Debug common issues in mesh-Gaussian hybrid methods
- Evaluate B-rep / parametric reconstruction from images via 3DGS

## Core Knowledge: Representation Spectrum

### The Geometry Representation Landscape

```
Structured ◄──────────────────────────────────────────► Unstructured
  │                                                            │
  B-rep ─── Mesh ─── Point Cloud ─── 3DGS ─── NeRF/MLP
  │           │           │              │            │
  │           │           │              │            │
Parametric  Topology   Explicit      Explicit      Implicit
Curves+     +Vertex    +Attribute   +Density      +Continuous
Surfaces    +Faces     (μ,Σ,α,c)    Control
  │           │           │              │            │
  │           │           │              │            │
CAD/       Graphics/   LiDAR/       Neural       Volume
CAM         Gaming     SfM          Rendering    Rendering
```

### Key Trade-offs Between Representations

| Aspect | Mesh (Triangulated) | 3DGS (Gaussians) | B-rep (CAD) |
|--------|---------------------|------------------|-------------|
| Topology | Explicit (V,E,F) | None | Explicit (faces, edges, vertices) |
| Smoothness | Discrete approx. | Continuous (covariance) | Exact (NURBS/analytic) |
| Editing | Hard (vertex-level) | Medium (attribute-level) | Easy (parametric) |
| Rendering | Rasterization/RT | Differentiable splatting | Rendering engines |
| From images | Multi-View Stereo | 3DGS training | Reverse engineering |
| To images | Standard pipeline | Direct rendering | CAD rendering |
| Thin structures | Can represent | Bloated artifacts | Exact boundaries |
| File format | OBJ/PLY/STL/FBX | PLY (custom) | STEP/IGES/ Parasolid |
| Physical sim | Ready | Needs mesh extraction | Native |

## Section 1: Mesh → 3DGS Conversion

### 1.1 Why Convert Mesh to Gaussians?

- Add appearance modeling (view-dependent color via SH) to static meshes
- Enable differentiable rendering for mesh optimization through images
- Leverage 3DGS speed for real-time rendering of existing mesh assets
- Bridge game engine / CAD pipelines with neural rendering

### 1.2 Conversion Pipeline

```
Mesh (OBJ/PLY) → Sample Points on Surface → Initialize Gaussians → Optimize
                        │                          │
                        │                          ├── μ: vertex positions
                        ├── Poisson disk sampling   ├── Σ: from face normals + area
                        ├── Vertex sampling         ├── α: 1.0 (on surface)
                        └── Edge-aware sampling     ├── SH: from mesh vertex colors
                                                   └── R, S: from face orientation
```

### 1.3 Initialization Strategies

| Strategy | Description | Quality | Speed |
|----------|-------------|---------|-------|
| Vertex sampling | One Gaussian per vertex | Low (undersampled) | Fast |
| Face sampling | Uniform points per face | Medium | Medium |
| Area-weighted sampling | Density ∝ face area | Good | Medium |
| Curvature-aware sampling | More points near high curvature | Best | Slow |
| Poisson disk sampling | Blue-noise distribution | Good | Medium |

### 1.4 Covariance Initialization from Mesh

Given a mesh face with normal n and area A:

```python
# For a Gaussian on a mesh surface:
# Normal direction: flat (small scale)
# Tangent directions: spread proportional to sqrt(face_area)

def init_gaussian_from_face(vertex_positions, face_normal, face_area):
    # Build local frame from face normal
    normal = face_normal / torch.norm(face_normal)
    # Find tangent vectors
    if abs(normal[0]) < 0.9:
        tangent1 = torch.cross(normal, torch.tensor([1, 0, 0]))
    else:
        tangent1 = torch.cross(normal, torch.tensor([0, 1, 0]))
    tangent1 = tangent1 / torch.norm(tangent1)
    tangent2 = torch.cross(normal, tangent1)

    # Scale: flat in normal direction, spread in tangent
    scale = torch.tensor([
        math.sqrt(face_area) * 0.5,  # tangent 1
        math.sqrt(face_area) * 0.5,  # tangent 2
        0.01                          # normal (thin shell)
    ])

    # Rotation from local frame to world
    R = torch.stack([tangent1, tangent2, normal], dim=1)  # 3x3

    return R, scale
```

### 1.5 Known Issues in Mesh→3DGS

| Issue | Symptom | Fix |
|-------|---------|-----|
| Floating artifacts | Gaussians drift off surface | Add normal consistency loss |
| Thick surfaces | Scale in normal direction too large | Clamp normal scale to small value |
| Missing thin parts | Pruned during density control | Reduce prune threshold for mesh-initialized |
| Color bleeding | SH degree too high on flat surfaces | Start with SH degree 0, increase gradually |
| Non-watertight mesh | Holes cause rendering gaps | Pre-process: fill holes with Poisson reconstruction |

## Section 2: 3DGS → Mesh Extraction

### 2.1 Why Extract Mesh from 3DGS?

- Downstream applications require mesh (physical simulation, 3D printing, game engines)
- CAD/CAM pipelines consume mesh or B-rep, not Gaussians
- Industry formats (STEP, IGES, STL, OBJ) are mesh-based
- Quantitative geometry evaluation (Chamfer Distance, F-Score) requires mesh

### 2.2 Extraction Methods Comparison

| Method | Venue | Approach | Speed | Quality | Code |
|--------|-------|----------|-------|---------|------|
| **SuGaR** | CVPR'24 | Regularized Gaussians → TSDF → Marching Cubes | ~1 min | High | Open |
| **2DGS** | SIGGRAPH'24 | 2D oriented disks → Normal-guided extraction | ~30 min | Very High | Open |
| **NeuS2** | ECCV'22 | SDF + volume rendering → Marching Cubes | ~2 hrs | High | Open |
| **Marching Gaussians** | Preprint | Direct isosurface from Gaussian opacity field | ~5 min | Medium | Limited |
| **TSDF-3DGS** | Various | Per-Gaussian TSDF fusion → MC | ~2 min | Good | Various |
| **Poisson 3DGS** | Various | Render depth multi-view → Poisson reconstruction | ~10 min | Medium | Open |

### 2.3 SuGaR Pipeline (Recommended)

```
Trained 3DGS
    │
    ├── Step 1: Regularize Gaussians
    │   ├── Add normal consistency loss
    │   └── Constrain Gaussians near surface
    │
    ├── Step 2: Extract TSDF
    │   ├── Rasterize Gaussian opacity to depth + normal maps
    │   ├── Multi-view TSDF fusion (VolumetricFusion)
    │   └── TSDF volume at target resolution (256³ or 512³)
    │
    └── Step 3: Marching Cubes
        ├── Extract triangle mesh from TSDF
        └── Optional: mesh simplification / texturing
```

### 2.4 2DGS Pipeline (Best Geometry)

```
Images + SfM
    │
    ├── Train 2DGS (oriented disks instead of 3D Gaussians)
    │   ├── Disks align to surface normals
    │   └── Better surface constraint by construction
    │
    └── Extract mesh
        ├── Sample points on disk centers
        ├── Estimate normals from disk orientations
        └── Poisson surface reconstruction
```

### 2.5 Geometry Quality Evaluation

After extraction, evaluate mesh quality:

| Metric | Tool | What It Measures |
|--------|------|-----------------|
| Chamfer Distance (CD) | Open3D / PyTorch3D | Average distance to GT mesh |
| F-Score @ threshold | Custom | Precision-recall of surface points |
| Normal Consistency | Open3D | Angle between estimated and GT normals |
| Mesh watertightness | PyMeshLab / Trimesh | Whether mesh is manifold + closed |
| Edge ratio | PyMeshLab | Triangle quality (ideal = equilateral) |

```python
# Standard evaluation
import trimesh
import numpy as np
from scipy.spatial import cKDTree

def chamfer_distance(mesh_pred, mesh_gt, num_samples=100000):
    pts_pred = mesh_pred.sample(num_samples)
    pts_gt = mesh_gt.sample(num_samples)

    tree_pred = cKDTree(pts_pred)
    tree_gt = cKDTree(pts_gt)

    d1, _ = tree_gt.query(pts_pred)  # pred → gt
    d2, _ = tree_pred.query(pts_gt)  # gt → pred

    return np.mean(d1**2) + np.mean(d2**2)

def fscore(mesh_pred, mesh_gt, threshold=0.01):
    # F-Score = 2 * Precision * Recall / (Precision + Recall)
    # Precision: fraction of pred points within threshold of gt
    # Recall: fraction of gt points within threshold of pred
    ...
```

## Section 3: Mesh-Adsorbed & Hybrid Representations

### 3.1 Why Hybrid?

Pure 3DGS: great rendering, poor topology/geometry.
Pure mesh: great topology, limited appearance/real-time rendering.
Hybrid: best of both worlds.

### 3.2 Key Hybrid Methods

#### MaGS (Mesh-adsorbed Gaussian Splatting) — ICCV 2025

| Aspect | Detail |
|--------|--------|
| Core idea | Gaussians "adsorbed" onto mesh vertices, mesh guides Gaussian placement |
| Advantage | Mesh provides topology + deformation handle; Gaussians provide appearance |
| Rendering | Gaussian splatting with mesh-based culling and sorting |
| Deformation | Deform mesh → Gaussians follow automatically |
| Best for | Animated/ deformable objects, physical simulation + neural rendering |

#### UniMGS (Unified Mesh and 3DGS) — AAAI 2026

| Aspect | Detail |
|--------|--------|
| Core idea | Single-pass rasterization for both mesh and Gaussians |
| Advantage | Unified rendering pipeline, proxy-based deformation |
| Key innovation | Eliminates redundant computation in separate mesh + GS pipelines |
| Best for | Real-time applications needing both mesh and appearance |

#### 2DGS (2D Gaussian Splatting) — SIGGRAPH 2024

| Aspect | Detail |
|--------|--------|
| Core idea | Replace 3D anisotropic Gaussians with 2D oriented disks |
| Advantage | Disks naturally constrain to surface, enabling direct mesh extraction |
| Trade-off | Training is more expensive, more prone to VRAM issues |
| Best for | Tasks requiring high-quality mesh output |

### 3.3 When to Use Hybrid vs Pure

| Use Case | Recommendation | Reason |
|----------|---------------|--------|
| Novel view synthesis only | Pure 3DGS | Fastest, highest visual quality |
| Need mesh for 3D printing | 2DGS or SuGaR | Best geometry extraction |
| Animated character + real-time render | MaGS | Deformation follows mesh |
| CAD reverse engineering | BrepGaussian + mesh | Structured output needed |
| Game asset pipeline | UniMGS | Unified single-pass rendering |
| Large-scale scene (city) | Pure 3DGS + post-extraction | Scalability |

## Section 4: CAD Reverse Engineering with 3DGS

### 4.1 The CAD RE Pipeline

```
Physical Object
    │
    ├── 3D Scanning (LiDAR / Photogrammetry)
    │       │
    │       ▼
    │   Images / Point Cloud
    │       │
    │       ├── 3DGS Training → High-fidelity appearance model
    │       │
    │       ├── Mesh Extraction (SuGaR / 2DGS)
    │       │       │
    │       │       ▼
    │       │   Triangle Mesh
    │       │       │
    │       │       ├── Mesh simplification
    │       │       ├── Mesh segmentation
    │       │       ├── Primitive fitting (planes, cylinders, cones)
    │       │       │
    │       │       ▼
    │       │   B-rep / Parametric CAD
    │       │       │
    │       │       ▼
    │       │   STEP / IGES File
    │       │
    │       └── Direct B-rep extraction (BrepGaussian)
    │
    └── CAD Model Ready for Manufacturing
```

### 4.2 BrepGaussian (CVPR 2026) — Direct CAD from Images

| Aspect | Detail |
|--------|--------|
| Problem | Traditional RE: mesh → B-rep is a two-stage process with error accumulation |
| Innovation | Gaussian Splatting + B-rep reconstruction in a unified framework |
| B-rep components | Trimmed surfaces (NURBS), edges (curves), vertices |
| Key mechanism | Gaussians provide dense geometric prior; B-rep extraction constrained by Gaussian geometry |
| Output | Parametric CAD model (STEP-compatible) |
| Limitations | Struggles with: textureless regions, thin structures, high specular, heavy occlusion + sparse views |

### 4.3 Mesh → B-rep Conversion Methods

| Method | Approach | Automation | Quality |
|--------|----------|------------|---------|
| Feature-based (CAD software) | Detect geometric features → fit primitives | Semi-auto | High |
| Deep learning (BrepNet, CSGNet) | Predict primitives from point cloud / mesh | Auto | Medium |
| Sketch-based | Extract edge network → fit curves/surfaces | Semi-auto | High |
| BrepGaussian | End-to-end from images via 3DGS prior | Auto | Medium-High |

### 4.4 Primitive Fitting for CAD Reverse Engineering

Common CAD primitives to detect:

| Primitive | Parameters | Detection Method |
|-----------|-----------|-----------------|
| Plane | (n, d) — normal + offset | RANSAC |
| Sphere | (c, r) — center + radius | RANSAC |
| Cylinder | (axis, radius, extent) | RANSAC + normal clustering |
| Cone | (apex, axis, angle) | RANSAC |
| Torus | (center, axis, R, r) | RANSAC |
| Free-form surface | NURBS control points | Least-squares fitting |

```python
# Example: Plane detection from point cloud using RANSAC
import open3d as o3d

def detect_planes(pcd, distance_threshold=0.01, ransac_n=3, num_iterations=1000):
    segments = []
    remaining = pcd

    for _ in range(10):  # detect up to 10 planes
        plane_model, inliers = remaining.segment_plane(
            distance_threshold=distance_threshold,
            ransac_n=ransac_n,
            num_iterations=num_iterations
        )
        if len(inliers) < 100:
            break

        # Extract plane segment
        plane_cloud = remaining.select_by_index(inliers)
        remaining = remaining.select_by_index(inliers, invert=True)

        # [a, b, c, d] where ax + by + cz + d = 0
        a, b, c, d = plane_model
        segments.append({
            'type': 'plane',
            'normal': [a, b, c],
            'offset': d,
            'points': plane_cloud,
            'num_points': len(inliers)
        })

    return segments, remaining
```

## Section 5: Common Pitfalls & Debugging

### 5.1 Mesh Extraction Quality Issues

| Issue | Cause | Debug | Fix |
|-------|-------|-------|-----|
| Bumpy surface | TSDF resolution too low | Check voxel size | Increase to 512³ |
| Holes in mesh | Incomplete multi-view coverage | Check camera coverage | Add viewpoints or interpolate |
| Thick surfaces | Gaussians not surface-constrained | Visualize Gaussian positions | Add normal consistency loss |
| Floating fragments | Prune threshold too high | Check isolated clusters | Post-process: remove small components |
| Wrong topology | Non-manifold geometry | Use pymeshlab to check | Repair with meshfix |

### 5.2 Mesh→3DGS Quality Issues

| Issue | Cause | Fix |
|-------|-------|-----|
| Gaussians drift off mesh | No surface constraint | Add mesh attraction loss: `L_mesh = ||μ - nearest_surface_point||²` |
| Scale explodes in normal direction | No constraint on σ_n | Clamp or use separate learning rate for normal scale |
| Poor appearance on flat surfaces | SH overfitting | Limit SH degree to 1 for planar regions |
| Artifacts at mesh seams | Discontinuous UV/normal | Ensure per-vertex attributes are consistent across shared vertices |

### 5.3 CAD-Specific Issues

| Issue | Context | Fix |
|-------|---------|-----|
| B-rep edges don't align with extracted mesh | Mesh smoothing removed sharp edges | Preserve sharp features: edge-aware sampling |
| Cylindrical surfaces become faceted | Too few Gaussians on curved surfaces | Increase sampling density by curvature |
| Parametric fit fails | Point cloud too noisy | Pre-filter with statistical outlier removal |
| STEP export invalid | Non-manifold geometry | Repair mesh before B-rep extraction |

## Section 6: Parametric CAD → 3DGS Pipeline (build123d Integration)

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

## Section 7: Methods Database

### Mesh-Gaussian Hybrid Methods

| Method | Venue | Key Idea | Mesh Quality | Rendering Speed | Code |
|--------|-------|----------|-------------|----------------|------|
| 3DGS | SIGGRAPH'23 | Pure Gaussian | N/A | Real-time | Open |
| 2DGS | SIGGRAPH'24 | 2D disks for surface | Very High | Real-time | Open |
| 2D-SuGaR | arXiv'26 | Surface-aware 2DGS with depth/normal priors | Very High | Real-time | — |
| SuGaR | CVPR'24 | Regularized GS → TSDF → MC | High | Real-time | Open |
| MaGS | ICCV'25 | Mesh-adsorbed Gaussians | High | Real-time | Open |
| UniMGS | AAAI'26 | Unified mesh+GS rasterization | High | Real-time | Open |
| Vol3DGS | CVPR'25 | Volume-consistent rasterization | High | Real-time | Open |
| MeshGS | Various | Mesh-guided Gaussian placement | Medium-High | Real-time | Open |
| Fake3DGS | arXiv'26 | 3D manipulation detection in GS scenes | — | — | — |

### Generation Methods

| Method | Venue | Input | Output | Key Feature |
|--------|-------|-------|--------|-------------|
| SEIG | arXiv'26 (2606.02580) | Single image | Executable Blender Python program | Staged decomposition (geometry→materials→composition→lighting); inherently editable and simulation-ready (Guangzhao He et al.) |
| 3DCodeBench | arXiv'26 (2606.01057) | VLM agents | Procedural 3D generation | Systematic benchmark; 12 VLMs evaluated; API mismatches cause most failures; disconnected floating geometry in successful renders (Yipeng Gao et al.) |
| UniCAD | arXiv'26 (2606.05058) | Multi-view images / sketches / point clouds | Parametric CAD | Multi-modal multi-task CAD benchmark + universal model; parametric CAD reconstruction from multi-view images, sketches, and point clouds |
| MeshFlow | CVPR'26 Highlight (2606.04621) | Latent code | Triangle mesh | MeshVAE + Flow-based Diffusion Transformer; autoregressive mesh generation with flow-based prior |
| MeshWeaver | CVPR'26 (2606.04688) | Latent code | Triangle mesh | Autoregressive next-vertex mesh generation; sequential attention for vertex-by-vertex triangle mesh synthesis |
| SymTRELLIS | arXiv'26 (2606.04108) | Single image / text | 3D mesh | Symmetry-aware 3D generation; exploits symmetry priors in 3D structure for improved mesh quality |
| HSP | arXiv'26 (2606.04891) | Images / point clouds | Hybrid mesh + neural field | Hybrid Structured Primitives; combines structured geometric primitives with neural fields for 3D reconstruction |
| TRELLIS.2 | CVPR'26 Best Student Paper | Single image / text | PBR 3D asset (mesh+GS) | 4B-parameter native 3D generation model; 17s PBR asset generation; handles open surfaces, nested geometry, transparent materials; Microsoft+Tsinghua |

**SEIG** — VLM generates executable Blender Python programs via staged decomposition (geometry→materials→composition→lighting). Output is inherently editable and simulation-ready, bridging the gap between neural rendering and CAD/manufacturing pipelines.

**3DCodeBench** — Systematic benchmark for evaluating VLM agents on procedural 3D generation. Key findings: API mismatches are the primary failure mode; even successful renders exhibit disconnected floating geometry, indicating that current VLMs lack robust spatial reasoning for CAD-quality output.

**UniCAD** — Multi-modal multi-task CAD benchmark and universal model covering parametric CAD reconstruction from multi-view images, sketches, and point clouds. Provides a unified framework for evaluating and training CAD reconstruction methods across diverse input modalities.

**MeshFlow** — MeshVAE encodes meshes into a structured latent space; a Flow-based Diffusion Transformer generates meshes autoregressively with a flow-based prior. CVPR 2026 Highlight — achieves state-of-the-art mesh generation quality by combining the expressiveness of normalizing flows with the scalability of diffusion transformers.

**MeshWeaver** — Autoregressive next-vertex mesh generation that produces triangle meshes vertex-by-vertex using sequential attention. Eliminates the need for intermediate representations (voxels, SDFs, or point clouds) by directly generating mesh topology and geometry in a single autoregressive pass.

**SymTRELLIS** — Symmetry-aware 3D generation that exploits inherent symmetry priors in 3D structures to improve mesh quality. By constraining generation to respect symmetry, reduces artifacts and improves geometric fidelity, particularly for man-made objects with dominant symmetry axes.

**HSP** — Hybrid Structured Primitives combine explicit structured geometric primitives (planes, cylinders, etc.) with neural fields for 3D reconstruction. The structured primitives provide CAD-like geometric parsimony while neural fields capture fine details, bridging the gap between parametric and implicit representations.

**TRELLIS.2** — 4B-parameter native 3D generation model (CVPR 2026 Best Student Paper, Microsoft+Tsinghua). Generates PBR-equipped 3D assets in 17 seconds from a single image or text prompt. Key advance: handles open surfaces, nested geometry, and transparent materials — structural categories that previously required manual CAD intervention. Output includes mesh and Gaussian representations, making it directly compatible with CAD↔3DGS hybrid pipelines.

### Articulated Object & Interaction Methods

| Method | Venue | Input | Output | Key Feature |
|--------|-------|-------|--------|-------------|
| FreeArtGS | arXiv'26 (2603.22102) | Multi-view video | Articulated 3DGS | Articulated GS under free-moving scenario; scalable for AR/robotics |
| ArtGS | IEEE'26 | Multi-view images | Interactive 3DGS | Interactive visual-physical modeling with 3DGS for articulated objects |
| PARTICULATE | CVPR'26 | Static mesh | Articulated structure | Feed-forward 3D object articulation from static mesh; auto-infer movable structure |

**FreeArtGS** — Articulated Gaussian Splatting under free-moving scenarios (arXiv:2603.22102). Extends articulated object reconstruction beyond controlled environments to free-moving, in-the-wild captures. Scalable representation suitable for AR and robotics applications where objects undergo unconstrained articulation during capture.

**ArtGS** — Interactive visual-physical modeling with 3DGS for articulated objects (IEEE 2026). Combines visual appearance (via 3DGS) with physical interaction constraints, enabling users to interactively manipulate reconstructed articulated objects while maintaining physical plausibility.

**PARTICULATE** — Feed-forward 3D object articulation from static mesh (CVPR 2026). Given a single static mesh, automatically infers the movable structure (joints, hinges, sliders) and generates an articulated model. Eliminates the need for multi-state observation or manual articulation specification, directly producing CAD-compatible articulated output from static geometry.

### CAD Reconstruction Methods

| Method | Venue | Input | Output | Automation |
|--------|-------|-------|--------|------------|
| BrepGaussian | CVPR'26 | Images | B-rep (STEP) | Semi-auto |
| CSGNet | NeurIPS'21 | Voxel grid | CSG tree | Auto |
| BrepNet | CVPR'22 | Point cloud | B-rep edges | Auto |
| Primitive fitting (RANSAC) | Classic | Point cloud | Primitives | Semi-auto |
| DeepCAD | CVPR'21 | Point cloud | Sketch-extrusion | Auto |
| KDH-CAD | arXiv'26 (2606.01702) | Small labeled data + domain knowledge | CAD classification/reconstruction | Auto |

**KDH-CAD** — Knowledge-data hybrid framework combining pretrained foundation models with structured domain knowledge from CAD textbooks and small labeled data. Achieves 92.6% accuracy with only 250 training samples (Ziqin Gao et al.). Key insight: when CAD training data is scarce, domain knowledge (geometric constraints, design rules) supplements data-driven approaches. Pipeline: Foundation model features → Domain knowledge completion → Labeled data calibration → CAD classification/reconstruction.

### Surface Extraction Methods

| Method | Approach | Input | Output | Speed |
|--------|----------|-------|--------|-------|
| Marching Cubes | Isosurface extraction | TSDF / SDF | Triangle mesh | Fast |
| Poisson Reconstruction | Implicit surface fitting | Oriented points | Triangle mesh | Medium |
| Ball-Pivoting | Growing algorithm | Oriented points | Triangle mesh | Medium |
| Delaunay-based | Tetrahedralization | Points | Triangle mesh | Slow |
| Neural Mesh (DMTet) | Differentiable | Features | Triangle mesh | Slow |

### Mesh Processing Methods

| Method | Venue | Key Idea | Key Metric | Code |
|--------|-------|----------|------------|------|
| MidSurfNet | arXiv'26 (2606.01891) | Learning-augmented mid-surface abstraction for thin-walled CAD | 87.32% face pairing accuracy | — |

**MidSurfNet** — Learning-augmented mid-surface abstraction for thin-walled CAD models (Li Ye et al.). Neural face pairing module + interference implicit field (SDF intersection) for arbitrary offset control. 1,500+ annotated CAD model dataset. Critical for CAE: thin-walled structural FEA requires mid-surface abstraction before mesh generation.

### Semantic Scene Decomposition (Alternative to Gaussian-Based)

| Method | Venue | Representation | Key Feature |
|--------|-------|---------------|-------------|
| Semantic Foam | CVPR'26 (Highlight) | Volumetric Voronoi mesh | Per-cell semantic feature field; outperforms Gaussian Grouping, SAGA; avoids point-based occlusion/inconsistent-supervision artifacts |

**Note**: Semantic Foam uses volumetric Voronoi mesh instead of point-based Gaussians for semantic decomposition. When CAD/mesh reconstruction needs semantic labels, consider Semantic Foam as an alternative to Gaussian-based semantic methods (LangSplat, Feature 3DGS, NRGS). The mesh-based representation integrates more naturally with B-rep/mesh pipelines.

### Cross-Domain 3DGS Applications

| Method | Venue | Domain | Representation | Key Feature |
|--------|-------|--------|---------------|-------------|
| GS-DOT | arXiv'26 | Medical (DOT) | Anisotropic Gaussians | Photon diffusion transport |
| BiSplat-WRF | IEEE ICC'26 Workshop | Wireless (WRF) | Planar 2D Gaussians | Bilinear spatial transformer for EM coupling; adapts GS rendering to angular domain |
| RESPIRE | arXiv'26 (2604.28179) | Medical (bronchoscopy) | Mesh-anchored Gaussians | CT-informed mesh-anchored GS; dynamic bronchoscopy with geometric prior |
| RGS | arXiv'26 (2604.27552) | Medical (CBCT) | Residual wavelet-GS | Spectral decomposition into geometric base + residual detail Gaussians for sparse-view CBCT |
| DiffSoup | arXiv'26 (2603.27151) | Neural Rendering | Triangle soup primitives | Triangle soup as alternative to Gaussians; standard depth testing enables seamless integration with traditional mesh/graphics pipelines |
| FTSplat | arXiv'26 (2603.05932) | Robotics / Simulation | Predicted triangle surfaces | Feed-forward triangle prediction producing simulation-ready mesh; compatible with robotic simulators (Isaac Sim, MuJoCo) |
| IRIS | arXiv'26 (2603.15368) | Neural Fields / Editing | Gaussians-as-proxies for INR | Hybrid Gaussians-as-proxies for implicit neural fields; enables shape editing workflows bridging mesh↔GS conversion |
| D-Rex | SIGGRAPH'26 (2604.27871) | Avatar / Relighting | Decoupled diffusion post-process | Decouples relighting from avatar modeling via LoRA fine-tuned video diffusion; applicable to any white-light avatar system; enables mesh/avatar geometry preservation under novel illumination |

**Note on medical mesh-GS methods**: RESPIRE and RGS both use hybrid mesh-Gaussian representations for medical imaging. RESPIRE anchors Gaussians to a CT-derived mesh for bronchoscopy (topology from prior), while RGS uses spectral decomposition to separate geometric base (mesh-like) from residual detail (Gaussian-like) for CBCT reconstruction.

**Note on triangle/mesh primitive alternatives**: DiffSoup and FTSplat represent a growing trend of returning to mesh/triangle primitives within neural rendering frameworks. DiffSoup replaces Gaussians with triangle soup while retaining differentiability, enabling direct use of standard depth testing and z-buffer pipelines. FTSplat produces explicit triangle meshes via feed-forward prediction, bypassing the need for post-hoc mesh extraction. Both methods eliminate the mesh↔GS conversion bottleneck for downstream applications requiring mesh geometry.

**Note on hybrid proxy representations**: IRIS demonstrates that Gaussians can serve as learnable proxies for implicit neural fields, enabling shape editing that propagates through the proxy to the underlying INR. This is relevant for mesh↔GS conversion workflows where editing operations need to transfer across representation boundaries.

## Output Format

When responding to user queries, use these templates:

### For Conversion Advice:
```
## [Mesh/3DGS/CAD] Conversion Recommendation

### Input: [description]
### Output Goal: [description]

### Recommended Pipeline
1. [Step 1]: [Tool/Method] — [Why]
2. [Step 2]: ...

### Expected Quality
- Geometric accuracy: [High/Medium/Low]
- Rendering fidelity: [High/Medium/Low]
- Processing time: [estimate]

### Key Parameters
- [Param]: [Recommended value] — [Reason]

### Potential Issues & Mitigations
1. [Issue] → [Fix]
```

### For Method Comparison:
```
## [Method A] vs [Method B] for [Task]

| Dimension | Method A | Method B |
|-----------|----------|----------|
| Geometry quality | ... | ... |
| Rendering speed | ... | ... |
| Implementation difficulty | ... | ... |
| Best use case | ... | ... |

### Recommendation: [Winner] because ...
```

### For Debugging:
```
## Diagnosis: [Symptom]

### Root Cause
[Explanation]

### Fix
1. Immediate: [Quick fix]
2. Proper: [Right fix]

### Code Change
[Minimal code snippet if applicable]
```

## Rules

1. **Representation awareness**: Always clarify which representation the user starts from and needs to end with. The conversion path matters.
2. **No free lunch**: Every conversion loses information. Be honest about what degrades.
3. **Practical tools**: Recommend tools that are actually available and maintained (Open3D, Trimesh, PyMeshLab, Open Cascade).
4. **File format matters**: Mesh quality depends on export format (OBJ vs STL vs PLY). Specify format when relevant.
5. **GPU-aware**: 3DGS methods require specific GPU resources. Mention VRAM requirements for extraction.
6. **Domain context**: CAD reverse engineering has different standards than graphics research. Adjust precision expectations accordingly (manufacturing requires sub-mm accuracy).
7. **Cite accurately**: Only cite methods and metrics you are confident about. Mark uncertain information as "[需验证]".

> If you like it, please star this repo https://github.com/jaccen/Awesome-Gaussian-Skills
