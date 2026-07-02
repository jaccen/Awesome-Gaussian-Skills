---
# Industry Application Landscape

## 1.1 Autonomous Driving Simulation

**Maturity**: Engineering | **Players**: aiSim, Li Auto mindVLA, NVIDIA DRIVE Sim

**Pipeline**: Real-world scan (LiDAR + multi-camera) → 3DGS reconstruction → Sensor simulation → HIL/SIL testing

**Key papers**: GSDrive, GS-Playground (10^4 FPS, RSS 2026), GS-Surrogate, FieryGS, Nighttime AD GS, Real2Sim (4DGS + differentiable MPM), GS-SCNet, Ground4D, ULF-Loc (CVPR 2026 highlight), ConFixGS [2605.09688], FRUC [2605.29997] (feed-forward cooperative driving), DeGO [2605.28587] (deformable Gaussian occupancy, CVPR 2026)

**Quality bar**: Sensor sim error < 0.02, LiDAR > 30 FPS, LPIPS < 0.1, Radar ±3 dB

**Notes**: ConFixGS provides plug-and-play confidence-aware diffusion repair for +3.68 dB PSNR on Waymo, applicable to pretrained feedforward models; FRUC enables calibration-free multi-agent reconstruction; DeGO decouples rigid/non-rigid motion for human-centric occupancy; LiDAR sim requires opaque surface Gaussians; OpenDRIVE co-registration mandatory; nighttime needs separate IR-adjacent training; FastGS enables 100-second training with comparable quality

## 1.2 Digital Twin & Smart City

**Maturity**: Commercial | **Players**: SuperMap, FantoVision, LCC

**Pipeline**: Aerial + streetview → Large-scale 3DGS → S3M conversion → GIS integration → IoT fusion

**Key papers**: DiffSoup, Street Gaussians, GlobalSplat, Large-Scale HQ Head, ArtiTwinSplat (interactable digital twin from RGB-D)

**Standards**: S3M (Chinese GIS), OGC 3D Tiles, glTF/glb, CityGML

**Notes**: City-level = 10^9–10^10 Gaussians; WGS84→ENU→3DGS alignment critical; streaming LOD mandatory; S3M needs custom exporter

## 1.3 Cultural Heritage & Museum

**Maturity**: Commercial

**Pipeline**: Controlled-lighting photography → High-fidelity 3DGS → Color calibration → Digital archive → VR/AR exhibition

**Quality**: Sub-mm geometry, ΔE < 2 (CIE76), 2048×2048+ texture, lossless compression

**Notes**: Dome/array lighting > flash; attach DOI/catalog metadata; store raw images + COLMAP + checkpoint + compressed .ply

## 1.4 Film & Game Production

**Maturity**: Exploration | **Players**: Volcengine, UE team, Tencent

**Pipeline**: Multi-camera capture → 3DGS → Mesh extraction (SuGaR/2DGS) → UE5 import → Virtual production

**Notes**: 3DGS→mesh needed for DCC; SuGaR (TSDF) > naive marching cubes; material separation (GOR-IS/SSD-GS) for relighting; 4DGS (GauFRe/DeformGS) for temporal consistency; UE5 Nanite+Lumen experimental

## 1.5 E-commerce 3D Display

**Maturity**: Commercial

**Pipeline**: Turntable photography → 3DGS → Compression (MobileGS/GETA-3DGS) → Web AR preview

**Requirements**: < 50 MB, browser-renderable (WebGPU/WebGL2 via gsplat.js), < 5s load on 4G

**Notes**: 50x+ compression needed for web; mesh fallback for low-end; AR needs mesh (Quick Look/Scene Viewer)

## 1.6 Industrial Inspection

**Maturity**: Engineering

**Pipeline**: Drone capture → 3DGS → AI defect detection → Measurement → Report

**Key papers**: EnerGS (LiDAR-3DGS fusion), RGS (CBCT inspection), E2EGS (end-to-end field)

**Notes**: GPS geotagging for defect correlation; EnerGS for LiDAR+cam fusion; detect ≥ 5mm at 10m; CAAC/FAA compliance

## 1.7 AR/VR/MR

**Maturity**: Exploration

**Pipeline**: Real-time headset scan → 3DGS → 6DoF tracking + low-latency render → MR overlay

**Key papers**: Mobile Avatar, GS-Playground, CoherentRaster (subpixel rasterization for light field)

**Notes**: < 20ms motion-to-photon; VkSplat for cross-VR; hybrid 3DGS+mesh for occlusion physics; Vision Pro = ARKit+Metal, Quest = OpenXR+Vulkan

## 1.8 BIM & Architecture

**Maturity**: Engineering | **Players**: LumenBIM × LCC

**Pipeline**: TLS + drone → 3DGS → IFC alignment → As-built verification → LCC delivery

**Key papers**: BrepGaussian (B-rep aware), CADFS (CAD feature saliency)

**Notes**: ICP registration before overlay; IFC coordinate mapping; LCC proprietary streaming format

## 1.9 Robotics & Embodied AI

**Maturity**: Rapidly Growing

**Pipeline**: 3DGS environment → Physics sim (GS-Playground) → Policy learning (sim-to-real) → Deployment

**Key papers**:
- **GaussianGrasper** (IEEE T-RO 2024) — Open-vocabulary grasping via SAM+CLIP feature distillation into 3DGS
- **GraspSplats** (CoRL 2024) — Zero-shot manipulation with 3D feature splatting; scene editing support
- **ManiGaussian** (ECCV 2024) — Dynamic GS world model for multi-task manipulation
- **GSMem** (arXiv 2026) — 3DGS as persistent spatial memory for zero-shot embodied exploration & QA
- **RoboSplat** (RSS 2025) — Diverse data generation via Gaussian primitive manipulation; 87.8% success rate
- **VR-Robo** (RAL 2025) — Real-to-Sim-to-Real for visual robot navigation without depth sensors
- **GS-Playground** (RSS 2026) — 10^4 FPS batch 3DGS + parallel physics for robot learning
- **Forecast-GS** (arXiv 2026) — Predictive 3DGS for goal-directed manipulation planning

**Sub-directions**:
1. **Grasping & Manipulation** — GaussianGrasper, GraspSplats, ManiGaussian, RoboSplat
2. **Navigation & Locomotion** — VR-Robo, GS-Playground, MAGICIAN
3. **Embodied Reasoning** — GSMem (spatial memory), Forecast-GS (predictive planning), ESI-Bench (spatial intelligence evaluation)
4. **Driving Policy RL** — GSDrive, SpaceDrive (VLM spatial awareness for AD)
5. **Embodied Simulation** — LEGS (arXiv:2606.01458)

**Toolchain**: ROS2, MuJoCo/Isaac Sim, GS-Playground

## 1.10 Military Simulation

**Maturity**: Early, classified | **Security**: GuardMarkGS (unified watermarking + edit deterrence)

**Requirements**: Air-gapped deployment, indigenous tools, > 60 FPS, sub-meter terrain, multi-spectral (visible+IR+SAR)

## World Model Integration

| Domain | Method | 3DGS Role | Maturity |
|--------|--------|-----------|----------|
| AD Simulation | RAD, DLWM, X-World | Twin digital world for RL/IL training | Production |
| Robot Manipulation | GS-World, Spark 2.0 | Differentiable simulation engine | Research → Early Production |
| Interactive 3D World | GWM, FlashWorld | Dynamics modeling primitive | Research |
| Web-Native Rendering | Visionary | WebGPU rendering platform | Open Source |

Engineering considerations: Sim2Real gap, real-time constraint (≥20fps), physical consistency (standard 3DGS lacks physics), scalability (BlitzGS distributed + PD-4DGS streaming), web deployment (WebGPU + ONNX)