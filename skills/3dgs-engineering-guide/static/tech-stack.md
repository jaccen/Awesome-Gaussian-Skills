---
# Engineering Technology Stack

## 2.1 Data Acquisition

| Device Type | Use Case | Key Requirements |
|---|---|---|
| DSLR/Mirrorless | High-fidelity capture | Manual exposure, fixed focal length |
| Drone (RTK) | Aerial survey | > 80% forward, > 60% side overlap |
| LiDAR | AD simulation, inspection | Time-synced with cameras |
| Mobile (LiDAR) | Quick indoor scan | iPad Pro/iPhone for rapid scouting |
| TLS | Architectural, industrial | Sub-mm accuracy for as-built |

**Software**: COLMAP (SfM+MVS standard), ORB-SLAM3/BLEPS (visual SLAM), LIO-SAM/FAST-LIO2 (LiDAR SLAM), FreeMoCap (AGPL-3.0, markerless MoCap from webcams, outputs .trc/.c3d/.fbx, `pip install freemocap`)

**Key considerations**: Camera calibration consistency, manual/HDR exposure, > 60% image overlap, GCPs for georeferencing, overcast preferred

## 2.2 Reconstruction

| Framework | Language | Best For |
|---|---|---|
| original 3DGS | CUDA/Python | Research, benchmarking |
| gsplat | PyTorch/CUDA | Custom training, differentiable |
| 2DGS | CUDA/Python | Mesh-extraction pipelines |
| Scaffold-GS | CUDA/Python | Large-scale scenes |
| OpenGaussian | OpenGL | Non-CUDA rendering |

**Compression**: HAC (100x), MobileGS (CPU-runnable), GETA-3DGS (5x), MesonGS++ (34x, SOTA rate-distortion), AdaGScale (adaptive), **CodecSplat** (ultra-compact feed-forward, 20–108 KiB/scene, ArXiv 2605.25563)

**Rule**: No compression for prototyping → add when deployment demands; validate compressed vs original.

## 2.3 Post-processing

**Mesh extraction**: SuGaR (TSDF, clean meshes), 2DDS+Poisson, Marching Cubes (baseline, blobby), NeuS2-GS (hybrid SDF+Gaussian)

**Material separation**: GOR-IS (albedo/shading/normals), SSD-GS (scatter+shadow) — enables relighting

**Relighting**: GS³ (SH-based), GaRe, LumiMotion — critical for virtual production and e-commerce

**Relighting (feed-forward)**: **F-RNG** (ArXiv 2605.25975) — feed-forward relightable 3DGS, ~25× faster than optimization-based; recommended for production relighting pipelines

**Editing**: GaussianEditor, ObjectMorpher, TransSplat, **SuperSplat** (PlayCanvas, MIT, browser-based: inspect/edit/compress/publish PLY & SOG; https://superspl.at/editor)

**Toolchain**: **splat-transform** (PlayCanvas, MIT, CLI) — PLY→SOG (~20x), PLY→streamed SOG (LOD), `-K` collision mesh; `npm install -g @playcanvas/splat-transform`

**MoCap input**: FreeMoCap (AGPL-3.0) — webcam MoCap → SMPL/FLAME → drive GaussianAvatar/EmoTaG; note: AGPL-3.0 not MIT-compatible for commercial use

## 2.4 Deployment

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

**Streaming**: CAGS (VQ + LoD, ~7x), AV1-3DGS (AV1 motion vectors, 63% training reduction), PD-4DGS (progressive 4D streaming, DASH/HLS-compatible), progressive loading, view-dependent prioritization, 20–50 Mbps for 1080p

**Formats**: `.ply` (uncompressed), `.splat` (compact binary, web-friendly), **`.sog`** (PlayCanvas, ~20x, streaming LOD), **`.spz`** (Niantic, ~10x, mobile/AR), custom (HAC/MesonGS++), future: 3D Tiles + Gaussian extension

## 2.5 Integration

**GIS**: SuperMap S3M extension, Cesium ion, ArcGIS (experimental)

**BIM**: IFC/STEP via BrepGaussian, Navisworks federated review, Revit as-built comparison

**AD**: OpenDRIVE + 3DGS co-registration, aiSim 6, ROS2 sensor topics

**Game engines**: UE5 (experimental Nanite-compatible), Unity (gsplat package), Godot (community, early), **PlayCanvas** (MIT, first-class 3DGS + collision + navmesh + physics + WebXR, @playcanvas/react)

**Robotics**: ROS2 scene server, MuJoCo/Isaac Sim, GS-Playground