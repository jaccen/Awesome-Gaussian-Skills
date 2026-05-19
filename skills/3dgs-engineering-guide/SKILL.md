---
name: 3dgs-engineering-guide
description: "Guide for deploying 3DGS from research to production: 10 industry verticals, engineering stack, GIS toolchain solutions, cross-platform deployment, and common pitfalls"
version: 1.0.6
author: jaccen
tags: ["3dgs", "gaussian-splatting", "engineering", "deployment", "digital-twin", "autonomous-driving"]
---

# 3DGS Engineering Guide

Bridging the gap from academic research to production deployment for 3D Gaussian Splatting.

## Agent Instructions

When invoked, follow this workflow:
1. **Identify use case** — determine application domain and constraints (platform, scale, real-time, budget)
2. **Recommend pipeline** — select tools and pipeline from sections below
3. **Reference papers** — point to methods in `references/3dgs-methods-overview.md` and `references/methods-systems-apps.md`
4. **Provide concrete next steps** — actionable items, not generic advice
5. **Warn about pitfalls** — highlight domain-specific failure modes from Section 5

---

## 1. Industry Application Landscape

### 1.1 Autonomous Driving Simulation

**Maturity**: Engineering | **Players**: aiSim, Li Auto mindVLA, NVIDIA DRIVE Sim

**Pipeline**: Real-world scan (LiDAR + multi-camera) → 3DGS reconstruction → Sensor simulation → HIL/SIL testing

**Key papers**: GSDrive, GS-Playground (10^4 FPS, RSS 2026), GS-Surrogate, FieryGS, Nighttime AD GS, Real2Sim (4DGS + differentiable MPM), GS-SCNet, Ground4D, ULF-Loc (CVPR 2026 highlight), ConFixGS [2605.09688]

**Quality bar**: Sensor sim error < 0.02, LiDAR > 30 FPS, LPIPS < 0.1, Radar ±3 dB

**Notes**: ConFixGS provides plug-and-play confidence-aware diffusion repair for +3.68 dB PSNR on Waymo, applicable to pretrained feedforward models; LiDAR sim requires opaque surface Gaussians; OpenDRIVE co-registration mandatory; nighttime needs separate IR-adjacent training

### 1.2 Digital Twin & Smart City

**Maturity**: Commercial | **Players**: SuperMap, FantoVision, LCC

**Pipeline**: Aerial + streetview → Large-scale 3DGS → S3M conversion → GIS integration → IoT fusion

**Key papers**: DiffSoup, Street Gaussians, GlobalSplat, Large-Scale HQ Head

**Standards**: S3M (Chinese GIS), OGC 3D Tiles, glTF/glb, CityGML

**Notes**: City-level = 10^9–10^10 Gaussians; WGS84→ENU→3DGS alignment critical; streaming LOD mandatory; S3M needs custom exporter

### 1.3 Cultural Heritage & Museum

**Maturity**: Commercial

**Pipeline**: Controlled-lighting photography → High-fidelity 3DGS → Color calibration → Digital archive → VR/AR exhibition

**Quality**: Sub-mm geometry, ΔE < 2 (CIE76), 2048×2048+ texture, lossless compression

**Notes**: Dome/array lighting > flash; attach DOI/catalog metadata; store raw images + COLMAP + checkpoint + compressed .ply

### 1.4 Film & Game Production

**Maturity**: Exploration | **Players**: Volcengine, UE team, Tencent

**Pipeline**: Multi-camera capture → 3DGS → Mesh extraction (SuGaR/2DGS) → UE5 import → Virtual production

**Notes**: 3DGS→mesh needed for DCC; SuGaR (TSDF) > naive marching cubes; material separation (GOR-IS/SSD-GS) for relighting; 4DGS (GauFRe/DeformGS) for temporal consistency; UE5 Nanite+Lumen experimental

### 1.5 E-commerce 3D Display

**Maturity**: Commercial

**Pipeline**: Turntable photography → 3DGS → Compression (MobileGS/GETA-3DGS) → Web AR preview

**Requirements**: < 50 MB, browser-renderable (WebGPU/WebGL2 via gsplat.js), < 5s load on 4G

**Notes**: 50x+ compression needed for web; mesh fallback for low-end; AR needs mesh (Quick Look/Scene Viewer)

### 1.6 Industrial Inspection

**Maturity**: Engineering

**Pipeline**: Drone capture → 3DGS → AI defect detection → Measurement → Report

**Key papers**: EnerGS (LiDAR-3DGS fusion), RGS (CBCT inspection), E2EGS (end-to-end field)

**Notes**: GPS geotagging for defect correlation; EnerGS for LiDAR+cam fusion; detect ≥ 5mm at 10m; CAAC/FAA compliance

### 1.7 AR/VR/MR

**Maturity**: Exploration

**Pipeline**: Real-time headset scan → 3DGS → 6DoF tracking + low-latency render → MR overlay

**Key papers**: Mobile Avatar, GS-Playground, CoherentRaster (subpixel rasterization for light field)

**Notes**: < 20ms motion-to-photon; VkSplat for cross-VR; hybrid 3DGS+mesh for occlusion physics; Vision Pro = ARKit+Metal, Quest = OpenXR+Vulkan

### 1.8 BIM & Architecture

**Maturity**: Engineering | **Players**: LumenBIM × LCC

**Pipeline**: TLS + drone → 3DGS → IFC alignment → As-built verification → LCC delivery

**Key papers**: BrepGaussian (B-rep aware), CADFS (CAD feature saliency)

**Notes**: ICP registration before overlay; IFC coordinate mapping; LCC proprietary streaming format

### 1.9 Robotics & Embodied AI

**Maturity**: Rapidly Growing

**Pipeline**: 3DGS environment → Physics sim (GS-Playground) → Policy learning (sim-to-real) → Deployment

**Key papers**:
- **GaussianGrasper** (IEEE T-RO 2024) — Open-vocabulary grasping via SAM+CLIP feature distillation into 3DGS
- **GraspSplats** (CoRL 2024) — Zero-shot manipulation with 3D feature splatting; scene editing support
- **ManiGaussian** (ECCV 2024) — Dynamic GS world model for multi-task manipulation via future scene prediction
- **GSMem** (arXiv 2026) — 3DGS as persistent spatial memory for zero-shot embodied exploration & QA
- **RoboSplat** (RSS 2025) — Diverse data generation via Gaussian primitive manipulation; 87.8% success rate
- **VR-Robo** (RAL 2025) — Real-to-Sim-to-Real for visual robot navigation without depth sensors
- **GS-Playground** (RSS 2026) — 10^4 FPS batch 3DGS + parallel physics for robot learning
- **Forecast-GS** (arXiv 2026) — Predictive 3DGS for goal-directed manipulation planning

**Sub-directions**:
1. **Grasping & Manipulation** — GaussianGrasper, GraspSplats, ManiGaussian, RoboSplat
2. **Navigation & Locomotion** — VR-Robo, GS-Playground, MAGICIAN
3. **Embodied Reasoning** — GSMem (spatial memory), Forecast-GS (predictive planning)
4. **Driving Policy RL** — GSDrive (3DGS environment for reinforcement learning)

**Toolchain**: ROS2 (point cloud/depth topics), MuJoCo/Isaac Sim physics backend, GS-Playground (high-throughput sim)

**Notes**: 10^4 FPS sim transforms sample efficiency; ROS2 as point cloud/depth topics; debias with real-world fine-tuning; GraspSplats demonstrates NeRF unsuitable for scene changes — prefer 3DGS for manipulation tasks requiring scene editing

### 1.10 Military Simulation

**Maturity**: Early, classified | **Security**: GuardMarkGS (unified watermarking + edit deterrence for 3DGS assets)

**Requirements**: Air-gapped deployment, indigenous tools, > 60 FPS, sub-meter terrain, multi-spectral (visible+IR+SAR)

**Notes**: No foreign cloud/API; DEM/DSM fusion; no sensitive data in checkpoints

### World Model Integration

3DGS is emerging as a core 3D primitive for world models across multiple domains:

| Domain | Method | 3DGS Role | Maturity |
|--------|--------|-----------|----------|
| Autonomous Driving Simulation | RAD, DLWM, X-World | Twin digital world for RL/IL training | Production (XPeng, Momenta) |
| Robot Manipulation | GS-World, Spark 2.0 | Differentiable simulation engine | Research → Early Production |
| Interactive 3D World Generation | GWM, FlashWorld | Dynamics modeling primitive | Research |
| Web-Native World Model Rendering | Visionary | WebGPU rendering platform | Open Source (Shanghai AI Lab) |

Engineering considerations:
- **Sim2Real gap**: 3DGS simulation fidelity directly impacts policy transfer quality (RAD shows closed-loop RL in 3DGS reduces IL causal confusion)
- **Real-time constraint**: World models require ≥20fps for interactive use; 3DGS rendering speed is often the bottleneck
- **Physical consistency**: Standard 3DGS lacks physics; GS-World adds differentiable physics as simulation engine layer
- **Scalability**: Urban-scale world models need distributed 3DGS (BlitzGS pattern) + streaming (PD-4DGS pattern)
- **Web deployment**: Visionary demonstrates WebGPU + ONNX as viable path for browser-native world models

---

## 2. Engineering Technology Stack

### 2.1 Data Acquisition

| Device Type | Use Case | Key Requirements |
|---|---|---|
| DSLR/Mirrorless | High-fidelity capture | Manual exposure, fixed focal length |
| Drone (RTK) | Aerial survey | > 80% forward, > 60% side overlap |
| LiDAR | AD simulation, inspection | Time-synced with cameras |
| Mobile (LiDAR) | Quick indoor scan | iPad Pro/iPhone for rapid scouting |
| TLS | Architectural, industrial | Sub-mm accuracy for as-built |

**Software**: COLMAP (SfM+MVS standard), ORB-SLAM3/BLEPS (visual SLAM), LIO-SAM/FAST-LIO2 (LiDAR SLAM), FreeMoCap (AGPL-3.0, markerless MoCap from webcams, outputs .trc/.c3d/.fbx, `pip install freemocap`)

**Key considerations**: Camera calibration consistency, manual/HDR exposure, > 60% image overlap, GCPs for georeferencing, overcast preferred

### 2.2 Reconstruction

| Framework | Language | Best For |
|---|---|---|
| original 3DGS | CUDA/Python | Research, benchmarking |
| gsplat | PyTorch/CUDA | Custom training, differentiable |
| 2DGS | CUDA/Python | Mesh-extraction pipelines |
| Scaffold-GS | CUDA/Python | Large-scale scenes |
| OpenGaussian | OpenGL | Non-CUDA rendering |

| Scale | Gaussians | Training | GPU |
|---|---|---|---|
| Object/room | 100K–1M | 10–30 min | RTX 4070 |
| Building | 1M–10M | 1–3 h | RTX 4090 |
| City block | 10M–100M | 3–7 h | A100 80GB |
| City district | 100M–1B | 12–24 h | A100/H100 cluster |

**Compression**: HAC (100x), MobileGS (CPU-runnable), GETA-3DGS (5x), MesonGS++ (34x, SOTA rate-distortion), AdaGScale (adaptive)

**Rule**: No compression for prototyping → add when deployment demands; validate compressed vs original.

### 2.3 Post-processing

**Mesh extraction**: SuGaR (TSDF, clean meshes), 2DGS+Poisson, Marching Cubes (baseline, blobby), NeuS2-GS (hybrid SDF+Gaussian)

**Material separation**: GOR-IS (albedo/shading/normals), SSD-GS (scatter+shadow) — enables relighting

**Relighting**: GS³ (SH-based), GaRe, LumiMotion — critical for virtual production and e-commerce

**Editing**: GaussianEditor, ObjectMorpher, TransSplat, **SuperSplat** (PlayCanvas, MIT, browser-based: inspect/edit/compress/publish PLY & SOG; https://superspl.at/editor)

**Toolchain**: **splat-transform** (PlayCanvas, MIT, CLI) — PLY→SOG (~20x), PLY→streamed SOG (LOD), `-K` collision mesh (`.collision.glb`); `npm install -g @playcanvas/splat-transform`

**MoCap input**: FreeMoCap (AGPL-3.0) — webcam MoCap → SMPL/FLAME → drive GaussianAvatar/EmoTaG; same rig for MoCap + 3DGS training images; note: AGPL-3.0 not MIT-compatible for commercial use

### 2.4 Deployment

| Engine | Backend | Platform | 3DGS Native? |
|---|---|---|---|
| original 3DGS | CUDA | NVIDIA GPU | Yes |
| VkSplat | Vulkan | Cross-platform | Yes |
| GSeurat | Vulkan C++23 | Cross-platform | Yes |
| BlitzGS | Multi-GPU (parity sharding) | Distributed | Yes |
| msplat | Metal | macOS/iOS | Yes |
| tortuise | CPU (Rust) | Any CPU | Yes |
| PlayCanvas Engine | WebGL2/WebGPU | Web | Yes (first-class) |
| gsplat.js | WebGPU/WebGL2 | Web | Yes |
| @playcanvas/react | WebGL2/WebGPU | Web | Yes (Splats component) |
| UE5 plugin | DX12 | Desktop/Console | Plugin |
| Unity renderer | Vulkan/DX12 | Multi-platform | Plugin |

**Streaming**: CAGS (VQ + LoD, ~7x, chunked with global codebook), AV1-3DGS (AV1 motion vectors for SfM, 63% training reduction), PD-4DGS (progressive 4D streaming, DASH/HLS-compatible), progressive loading (coarse→fine), view-dependent prioritization, 20–50 Mbps for 1080p

**Formats**: `.ply` (uncompressed), `.splat` (compact binary, web-friendly), **`.sog`** (PlayCanvas, ~20x, streaming LOD, chunked with manifest), **`.spz`** (Niantic, ~10x, mobile/AR), custom (HAC/MesonGS++), future: 3D Tiles + Gaussian extension

### 2.5 Integration

**GIS**: SuperMap S3M extension, Cesium ion, ArcGIS (experimental)

**BIM**: IFC/STEP via BrepGaussian, Navisworks federated review, Revit as-built comparison

**AD**: OpenDRIVE + 3DGS co-registration, aiSim 6, ROS2 sensor topics

**Game engines**: UE5 (experimental Nanite-compatible), Unity (gsplat package), Godot (community, early), **PlayCanvas** (MIT, first-class 3DGS + collision + navmesh + physics + WebXR, @playcanvas/react)

**Robotics**: ROS2 scene server, MuJoCo/Isaac Sim, GS-Playground

### 2.6 The GIS Toolchain Gap: "3DGS Looks Good but Does Nothing"

> The #1 pain point blocking 3DGS from production use (based on industry practitioner analysis, particularly WebGIS engineer xjjdjj).

After expensive drone surveys and 3DGS reconstruction, the resulting PLY file cannot: measure distances, cut cross-sections, calculate volumes, compute surface areas, query semantics, or overlay real-time video.

**5 Root Causes**:

1. **Format mismatch**: 3DGS = unstructured Gaussian primitives; GIS expects structured geometry (mesh faces, point clouds with topology). No standard conversion layer.
2. **No spatial reference**: 3DGS lives in arbitrary local coordinates; GIS requires WGS84/projected CRS.
3. **No semantic layer**: No notion of "this group is a building" / "this surface is a road."
4. **No analysis primitives**: GIS operates on mesh faces/edges/vertices; ray-Gaussian intersection is not a standard GIS operation.
5. **No real-time data fusion**: 3DGS is static; live video overlay requires camera pose estimation + temporal sync + occlusion handling.

**6 Solution Categories**:

1. **Distance measurement**: Raycasting through Gaussian field → surface point → Euclidean distance; or KNN surface estimation; project to vertical/horizontal plane first
2. **Cross-section clipping**: Plane-Gaussian intersection; GPU shader real-time clipping; use cases: geological, architectural, pipeline
3. **Volume calculation**: Voxelization (occupancy grid × voxel volume) or Gaussian integral (probability mass above reference plane); needs closed-surface assumption
4. **Surface area**: Multi-view projected area (SH degree-0) or mesh extraction first (SuGaR/2DGS)
5. **Semantic enrichment**: SAM/SAGA segment 2D → project to 3D Gaussians; or CLIP embeddings for semantic queries; map to CityGML/OGC
6. **Real-time video fusion**: Camera calibration + SLAM pose → frame-to-3D projection → depth z-buffering → temporal progressive update

**PlayCanvas Pipeline** (3 CLI commands — first end-to-end open-source making 3DGS scenes interactable in browser; source: [PlayCanvas Blog 2026-04](https://playcanvas.com/blog/turning-a-gaussian-splat-into-a-videogame)):

```bash
splat-transform scene.ply --seed-pos 0,1,0 --voxel-params 0.05,0.1 \
  --voxel-carve 1.6,0.2 -K scene.sog
npx glb-to-navmesh scene.collision.glb navmesh.bin
# Step 3: Bake lightness probes (in-engine, ~15s, ~40KB JSON)
```

| Component | Tool | Output | Size |
|---|---|---|---|
| Collision mesh | `splat-transform -K` (voxelization + flood-fill) | `.collision.glb` | ~1 MB |
| Nav mesh | `recast-navigation` | `navmesh.bin` | ~100 KB |
| Lightness grid | Probe script (cubemap luminance, Rec.601) | `lightness.json` | ~40 KB |
| Streamed SOG | `splat-transform` (LOD partitioning) | Multi-chunk `.sog/` + manifest | ~5% of PLY |

**Key insights**: Voxelization + flood-fill = sealed collision meshes (no manual cleanup); lightness probes as JSON (no runtime raytracing, mobile-friendly); SOG streaming enables mobile deployment of million-Gaussian scenes.

**GIS Toolchain Solutions**:

| Task | Tool | Notes |
|---|---|---|
| PLY → 3D Tiles | libTileSplat, supermap-3dtiles | Cesium-compatible |
| PLY → collision mesh | splat-transform -K | Voxelization + flood-fill |
| PLY → nav mesh | splat-transform + recast-navigation | Collision GLB → Recast |
| PLY → compressed SOG | splat-transform | 20x, streaming LOD |
| Web 3DGS editor | SuperSplat | Browser-based, PWA |
| Spatial analysis | Custom Python (NumPy + plyfile) | Build custom GIS layer |
| Semantic labeling | SAGA | SAM → 3D projection |
| Lightness baking | PlayCanvas probe script | ~15s bake, ~40KB |
| Volume calculation | Custom voxelizer + PLY parser | Not yet standard |
| Cesium rendering | gsplat.js, cesium-3dgs-plugin | Three.js limited native support |

**Standards progress**: CSM group standard for 3DGS modeling initiated (2026-04); S3M extended for 3DGS; 3D Tiles extension proposals

---

## 3. Best Practices

### 3.1 Quality Assurance

**Geometric**: Chamfer Distance, F-Score (τ ∈ {1mm, 5mm, 10mm}), normal consistency

**Visual**: PSNR/SSIM/LPIPS — WARNING: insufficient for engineering use; human evaluation required for sign-off

**Engineering metrics**: sensor sim fidelity vs real data, real-time FPS (30/60/90+ by domain), memory footprint, time-to-first-render, rate-distortion curves

### 3.2 Scalability

- **Scene splitting**: octree/voxel grid, ~1M Gaussians/cell, overlap zones for seams
- **LOD**: multi-resolution hierarchy, distance-based switching, view-dependent refinement
- **Streaming**: camera pose → spatial index → LOD + frustum culling → compress → transfer → decompress & render

| Scenario | Compression | Ratio | Quality |
|---|---|---|---|
| Prototyping | None | 1x | None |
| Desktop | GETA-3DGS | 5x | Minimal |
| Mobile | MobileGS / CAGS | 10–50x | Moderate |
| Web | MesonGS++ + .splat/SPZ | 30–50x | Acceptable |
| Large-scale | HAC + progressive / CAGS | 50–100x | Significant |

### 3.3 Cross-Platform

| Platform | Backend | Fallback | Max Scene | Real-time? |
|---|---|---|---|---|
| Desktop (NVIDIA) | CUDA | Vulkan | 10M+ | 60 FPS |
| Desktop (AMD/Intel) | VkSplat | GSeurat | 5M+ | 30 FPS |
| Desktop (CPU) | tortuise (Rust) | — | 500K | No |
| macOS (Apple) | msplat (Metal) | — | 3M | 20 FPS |
| iOS | Metal | — | 1M | 15 FPS |
| Android | Vulkan | WebGPU | 1M | 15 FPS |
| Web | WebGPU | WebGL2 | 500K–2M | Varies |
| VR (Quest 3) | Vulkan (OpenXR) | — | 2M | 72 Hz |
| VR (Vision Pro) | Metal | — | 3M | 90 Hz |

**Checklist**: target GPU family, VRAM fallback to lower LOD, color space (sRGB/linear/HDR), min-spec hardware, memory leak testing over extended sessions

### 3.4 Data Pipeline Automation

**CI/CD**: Data validation → COLMAP SfM+MVS → 3DGS training → quality gate (PSNR/F-Score) → compression → deploy to CDN → alert on regression

**Quality gates**: PSNR < 28 dB = flag; geometric drift > 5mm = flag; coverage gaps; floater/needle artifacts

**Versioning**: Raw images + COLMAP in git; checkpoints (.ply) in git LFS/DVC; semantic versioning; changelog per version

**Monitoring**: FPS P50/P95/P99, Gaussian count, file size, data freshness, user engagement metrics

---

## 4. Decision Trees

### 4.1 By Use Case

- **AD simulation** → aiSim 6 / CARLA + 3DGS plugin + OpenDRIVE + ROS2
- **Digital twin / Smart city** → SuperMap GIS + LCC streaming / S3M
- **Cultural heritage** → Polycam (capture) + COLMAP + 3DGS; Luma AI (preview)
- **E-commerce** → gsplat.js / three.js + compression
- **Film / Game** → UE5 plugin + SuGaR (mesh) + material separation
- **Industrial inspection** → DJI + COLMAP + 3DGS + YOLO/SAM
- **Robotics** → GS-Playground (sim) + ROS2
- **Avatar / MoCap** → FreeMoCap + GaussianAvatar/EmoTaG + SMPL/FLAME
- **BIM / Architecture** → LCC + IFC alignment + as-built verification
- **Research** → original 3DGS + gsplat + custom extensions

### 4.2 By Platform

- **Desktop (NVIDIA)** → CUDA backend
- **Desktop (AMD/Intel)** → VkSplat / GSeurat
- **Mobile (iOS/Android)** → VkSplat / msplat (Metal) / WebGPU
- **Web** → gsplat.js / three.js / PlayCanvas Engine + @playcanvas/react
- **VR headset** → OpenXR+Vulkan (Quest) / Metal (Vision Pro)

### 4.3 By Scene Scale

- **< 100K Gaussians** → original 3DGS, 5–15 min on RTX 3070+
- **< 10M** → Scaffold-GS + GETA-3DGS (5x), 30 min–2h on RTX 4090
- **< 100M** → Spatial partitioning + MesonGS++ (34x), 2–7h on A100
- **> 1B** → LCC + S3M + HAC (100x), distributed 12–48h on GPU cluster

---

## 5. Common Engineering Pitfalls

- **Over-fitting to training views**: Artifacts at novel viewpoints. Fix: more viewpoints at different elevations, depth/opacity regularization, validate on held-out views.
- **Floating artifacts**: Semi-transparent blobs in empty space. Fix: depth regularization, opacity pruning (α < threshold), post-processing depth filter.
- **Memory explosion at scale**: GPU OOM > 10M Gaussians. Fix: spatial partitioning from day one, Scaffold-GS anchors, streaming for > 10M.
- **Sensor sim fidelity ignored**: High PSNR but inaccurate LiDAR/Radar. Fix: validate sensor outputs vs real data; opaque surface Gaussians for LiDAR; calibrate Radar cross-section.
- **CUDA lock-in**: Cannot deploy to AMD/Intel/Mobile. Fix: VkSplat/GSeurat (Vulkan), msplat (Metal), tortuise (Rust CPU), **brush** (Rust/WebGPU/Burn, most complete cross-platform: Win/Mac/Linux/Android/Web, 4.3k stars, faster than gsplat); abstract CUDA behind interface.
- **No version control for 3DGS**: Cannot reproduce/track changes. Fix: git LFS or DVC; separate metadata (YAML) from binary; semantic versioning.
- **Static lighting assumption**: Breaks under different lighting. Fix: plan relighting upfront; GOR-IS/SSD-GS decomposition; GS³/GaRe SH-based relighting.
- **Temporal inconsistency**: Video flicker, object jumping. Fix: 4DGS (GauFRe, DeformGS, ScubeGS); temporal smoothness loss.
- **Under-estimated compression artifacts**: Visible holes, color shifts. Fix: rate-distortion benchmarks first; domain-specific metrics (not just PSNR); uncompressed reference for comparison.

---

## 6. Reference Papers

| Domain | Methods |
|---|---|
| AD Simulation | GSDrive, GS-Playground (RSS 2026), GS-Surrogate, FieryGS, GS-SCNet, Ground4D, ULF-Loc (CVPR 2026), Nighttime AD, Real2Sim, ConFixGS (+3.68 dB Waymo) |
| World Models | GWM, FlashWorld, GS-World, Visionary, RAD, DLWM, X-World |
| Digital Twin | DiffSoup, Street Gaussians, GlobalSplat, Large-Scale HQ Head |
| Inspection | EnerGS, RGS, E2EGS |
| Physics | PhysGaussian, Gaussian Splashing, GS-Playground |
| Relighting | GS³, GaRe, SSD-GS, LumiMotion, GOR-IS |
| Cross-platform | VkSplat, GSeurat (Vulkan C++23), msplat (Metal), tortuise (Rust CPU), brush (Rust/WebGPU, 4.3k stars), AdaGScale, BlitzGS (distributed) |
| Feed-Forward | SplatWeaver [2605.07287] (expert-routing, 30% budget reduction, 301 FPS, no calibration; code: github.com/yecongwan/SplatWeaver) |
| BIM/CAD | BrepGaussian, CADFS |
| Editing | GaussianEditor, ObjectMorpher, TransSplat |
| Security | GuardMarkGS (watermarking + edit deterrence) |
| Rendering | CoherentRaster (subpixel, light field), 3DGEER (exact ray, ICLR 2026), SparseOIT (order-independent transparency) |
| Streaming | CAGS (~7x VQ+LoD), AV1-3DGS (63% training reduction), PD-4DGS (progressive 4D streaming), MGS [2603.19234] (Matryoshka continuous LoD, single model multi-fidelity) |
| Acceleration | AdpSplit [2605.06876] (error-driven adaptive split, drop-in for 9-22% training speedup) |
| Compression | HAC (100x), MobileGS (CPU), GETA-3DGS (5x), MesonGS++ (34x), AdaGScale |

See knowledge base: `references/3dgs-methods-overview.md`, `references/methods-core.md`, `references/methods-semantic-editing.md`, `references/methods-systems-apps.md`

---

## 7. Terminology

- **Cardinality Gaussian Expert Routing**: Routing mechanism where discrete experts predict different numbers of Gaussians per pixel based on scene complexity (cf. SplatWeaver)
- **Skew-Normal Splatting**: Using Azzalini skew-normal distribution instead of symmetric Gaussian for asymmetric boundary representation
- **Stochastic Budget Training**: Training strategy that randomly samples Gaussian budget each iteration to learn ordered, LoD-compatible representations (cf. MGS)

---

*Part of [Awesome-Gaussian-Skills](https://github.com/jaccen/Awesome-Gaussian-Skills)*
