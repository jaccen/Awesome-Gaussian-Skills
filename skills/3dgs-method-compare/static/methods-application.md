### Human & Avatar Methods

| Method | Venue | Input | Key Feature |
|--------|-------|-------|-------------|
| HumanSplatHMR | arXiv'26 | Image | Joint pose-avatar optimization; closes loop between HMR and differentiable rendering |
| EmoTaG | CVPR'26 (2603.21332) | Image + audio | Emotion-aware talking head on GS |
| SDTalk | arXiv'26 | Image + audio | Structured facial priors + dual-branch motion fields for Gaussian talking head |
| HairGPT | SIGGRAPH'26 | Text/image | Strand-as-Language autoregressive modeling for 3D hairstyle synthesis |
| D-Rex | SIGGRAPH'26 (2604.27871) | White-light avatar + target illumination | Decoupled relighting via LoRA fine-tuned video diffusion post-process; applicable to any white-light avatar system |
| PiG-Avatar | arXiv'26 (2605.20185) | Image + pose | Volumetric canonical Gaussian avatars with part-indexed Gaussian fields |
| Latent Dynamics | arXiv'26 (2605.21478) | Image + motion | Force decomposition for clothing animation; latent dynamics prediction |

### Articulated Object Methods

| Method | Venue | Input | Key Feature |
|--------|-------|-------|-------------|
| FreeArtGS | arXiv'26 (2603.22102) | Multi-view video | Free-moving articulated GS; unconstrained articulation modeling |
| ArtGS | IEEE'26 | Multi-view video | Visual-physical modeling with 3DGS; joint visual appearance + physical constraints |
| PARTICULATE | CVPR'26 | Monocular video | Feed-forward 3D object articulation; single-pass articulated reconstruction |

### World Models & Spatial Intelligence

_3DGS as world model primitive, differentiable simulation engine, or spatial intelligence representation_

Key methods:
- **GWM**: 3DGS as environment dynamics modeling primitive with autoregressive future state prediction
- **FlashWorld**: Feed-forward 3DGS world model for real-time interactive 3D world generation
- **GS-World**: 3DGS as differentiable simulation engine for world model + Sim2Real VLA
- **Visionary**: WebGPU + 3DGS world model carrier platform for browser-native world model rendering
- **RAD/DLWM**: 3DGS twin digital world for autonomous driving RL training
- **GSMem**: 3DGS as persistent spatial memory for zero-shot embodied exploration & QA

Spatial intelligence benchmarks intersecting 3DGS:
- **ESI-Bench** (arXiv 2605.18746, Fei-Fei Li team): First embodied spatial intelligence benchmark closing perception-action loop; reveals that VLM models fail at spatial interaction despite strong visual recognition — directly relevant to 3DGS-based embodied reasoning (GSMem, RoboSplat)
- **HiSpatial** (arXiv 2603.25411, CVPR 2026): Hierarchical 3D spatial cognition in VLMs; from 2D→3D structure→object properties→spatial relations — suggests 3DGS scene graphs as structured intermediate representations
- **Embodied3DBench** (arXiv 2605.29074): 21K QA pairs for low-level embodied spatial intelligence; size/distance/pose/occlusion reasoning — evaluation targets overlap with 3DGS spatial understanding
- **SpaceDrive** (CVPR 2026, Mercedes-Benz): Infusing spatial awareness into VLM for autonomous driving — 3DGS-based driving world models (SplatAD, GS-Drive) are the natural spatial representation backend

Comparison key: Does the method use 3DGS as (a) state representation only, (b) dynamics modeling primitive, or (c) differentiable simulation engine? This determines the depth of world model integration.

### Autonomous Driving Methods

| Method | Venue | Input | Key Feature |
|--------|-------|-------|-------------|
| Real2Sim | arXiv'26 | 3D anisotropic (4D) | 4DGS + differentiable MPM | Physics-aware AD scene simulation with differentiable MPM for collision scenarios; bridges real-to-sim gap |
| GaussianLSS | CVPR'25 | Multi-camera | GS for BEV perception |
| Nighttime AD GS | ICRA'26 (2602.13549) | Nighttime multi-camera | PBR-based nighttime AD reconstruction |
| ConFixGS | arXiv'26 (2605.09688) | Multi-camera | Confidence-aware diffusion for feedforward 3DGS fix; +3.68 dB PSNR on Waymo |

### System & Infrastructure Methods

| Method | Venue | Framework | Key Feature |
|--------|-------|-----------|-------------|
| VkSplat | Eurographics'26 | Vulkan | Vulkan-based 3DGS training; 3.3x speed; cross-vendor |
| brush | Open-source | Rust/WebGPU/Burn | Cross-platform 3DGS training (Win/Mac/Linux/Android/Web); 4.3k stars; faster than gsplat |

### Training Acceleration / Optimization Methods

| Method | Venue | Strategy | Key Feature |
|--------|-------|----------|-------------|
| Structure-Aware Densification | SIGGRAPH'26 | Frequency-aware anisotropic splitting | Frequency-aware anisotropic splitting; multiview consistency; faster convergence |
| GEMM-GS | DAC'26 (2604.02120) | Tensor Core GEMM | GPU acceleration via Tensor Cores; 1.42x speedup |
| Denoising-GS | arXiv'26 (2605.14880) | Spatial-aware denoising | Spatial-aware denoising formulation for 3DGS optimization; spatial gradient + uncertainty-based pruning |
| AdpSplit | arXiv'26 (2605.06876) | Error-driven adaptive split | Error-driven adaptive split operator; 9-22% training time reduction as drop-in replacement |
| BA-GS | CVPR'26 | Bayesian Adaptive | Bayesian Adaptive GS for SfM-free reconstruction; probabilistic camera-GS joint optimization |

### Real-Time NVS Methods

| Method | Venue | Cameras | FPS | Latency | Key Feature |
|--------|-------|---------|-----|---------|-------------|
| 3DTV | arXiv'26 | 3 | 40 | 25ms | Delaunay-based triplet selection, real-time multi-camera synthesis |

### Editing Methods

| Method | Editing Type | Input | Quality |
|--------|-------------|-------|---------|
| GaussianEditor | Text/geometry | Mask + prompt | High |
| GeoGaussian | Geometry | Mesh guidance | High |
| Frosting | Appearance | Text prompt | Medium |
| SketchFaceGS | Sketch-driven | 2D sketch | High (CVPR'26 Highlight) |
| FluSplat | Text-driven | Sparse views | Medium-High |
| TransSplat | Language-driven | Multi-view + text | High |
| GOR-IS | Intrinsic-space removal | Image | High (+13% LPIPS) |
| SVGS | arXiv'26 (2603.28126) | Text-driven 3D editing | Single view + text prompt | High |
| VIRGi | TPAMI'26 (2603.02986) | Appearance editing | Image | View-dependent instant recoloring |
| RDSplat | arXiv'26 (2512.06774) | Watermarking | Watermarked GS | Robust watermarking against diffusion editing |
| FreeFix | arXiv'26 (2601.20857) | Diffusion guidance | No fine-tuning | Fine-tuning-free diffusion guidance for GS |

### Recent Additions (June 2026)

| Method | arXiv | Category | Key Feature |
|--------|-------|----------|-------------|
| HiGS | 2606.00352 | Acceleration | 15.8x rendering speedup |
| DDF-GS | 2606.00817 | Ray-query GI | 26-72x faster than SDF sphere tracing |
| VEDAL | 2606.02346 | Compression | 5.2x via variational free energy pruning |
| WebSpline | 2606.02096 | Dynamic | Learnable Hermite spline trajectories |
| MRO-GWM | 2606.01950 | World Model | Object-centric Gaussian for rigid bodies |
| StreetNVS | 2606.01590 | AD NVS | Multi-sensor fusion |
| LEGS | 2606.01458 | Robotics | Mesh+3DGS embodied simulation |
| KDH-CAD | 2606.01702 | CAD | Knowledge-data hybrid |
| SEIG | 2606.02580 | Procedural 3D | VLM→Blender |
| AlbedoEdit | 2606.01362 | Editing | Video-level albedo editing |