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

### New Additions (June 28, 2026 — CVPR 2026 Representative Papers)

| Method | arXiv / Venue | Category | Key Feature |
|--------|--------------|----------|-------------|
| LR-SGS | 2603.12647 | AD | LiDAR reflectance-guided salient Gaussians; +1.18 dB PSNR vs OmniRe under illumination variation |
| GaussianDWM | 2512.23180 / CVPR'26 | AD | Unified scene understanding + multi-modal generation in Gaussian driving world model |
| NG-GS | 2604.14706 / CVPR'26 Highlight | Segmentation | NeRF-guided 3DGS segmentation; RBF-interpolated continuous feature field; boundary mIoU SOTA |
| ReLaGS | CVPR'26 | Semantic | No per-scene training; hierarchical language-described Gaussian scene models + 3D semantic scene graphs |
| MaterialClusterGS | 2606.09018 | Material | Palette-based material decomposition; shared BRDF prototypes; physical relighting & editing |
| Hand-4DGS | 2606.19156 | Avatar / Dynamic | First feed-forward 4D hand from egocentric video; mesh-guided GS; ~60 FPS |
| ViewSplat | 2603.25265 | Feed-Forward | View-adaptive dynamic splatting; 17 FPS inference / 154 FPS rendering |
| UniSHARP | 2606.07514 / CVPR'26 | Feed-Forward | First single-image 3DGS unifying perspective/fisheye/360° via omnidirectional latent alignment |
| BlitzGS | 2605.13794 | Large-Scale / Distributed | Index odd-even partition + importance scoring + distance LOD; city-scale in tens of minutes |
| GaussianPile | CVPR'26 | Medical | Extends 3DGS to volumetric/slice imaging (MRI, ultrasound, microscopy) |
### Recent Additions (July 2026)

| Method | Venue | Category | Key Feature |
|--------|-------|----------|-------------|
| DISCOVERSE | RAL'26 | Robotics / Simulation | 3DGS+MuJoCo unified Real2Sim2Real; multi-modal sensor support; open-source |
| gsplat | Open-source (Berkeley/NVIDIA) | System / Infrastructure | CUDA-accelerated 3DGS; 4x VRAM savings; 10% training speedup; production-grade |
| Capacity-Controlled Stylization | ECCV'26 | Editing / Stylization | Capacity-controlled multi-view 3DGS stylization; style-structure disentanglement |
| PDE-Constrained 3DGS | CVPR'26 | Geometry / Regularization | PDE physical constraints for artifact removal; geometry occupy supervision for boundary precision |

### New Additions (July 9, 2026)

| Method | Venue | Category | Key Feature |
|--------|-------|----------|-------------|
| ASSEMCAD | ECCV'26 | CAD / Assembly | Production-ready CAD assembly from natural language; LLM-driven assembly graph generation; parametric CAD output |
| CGGS | arXiv'26 | Cross-Domain / CG | Computer Graphics-meets-Gaussian Splatting; bridges traditional CG pipeline with 3DGS for hybrid rendering |
| SceneFrom3D | arXiv'26 | Cross-Domain / Scene | In-the-wild scene generation from 3DGS; layout-aware scene completion |
| GaussFusion | arXiv'26 | Cross-Domain / Fusion | Multi-modal Gaussian fusion; LiDAR-camera-IMU 3DGS for sensor-rich environments |
| GeoGS-SLAM | arXiv'26 | SLAM / Geometry | Geometry-Only GS for monocular SLAM; 80%+ parameter reduction vs standard GS-SLAM; geometry-first pipeline |
| Real-Time LiDAR GS-SLAM | arXiv'26 | SLAM / LiDAR | First real-time LiDAR-only GS-SLAM; LiDAR point cloud as Gaussian primitives; direct LiDAR rendering |
| DL-SLAM | arXiv'26 | SLAM / Dynamic | Dual-level probability dynamic GS-SLAM; probability-based static/dynamic decomposition for robust dynamic SLAM |
| HyperGS | arXiv'26 (2607.11500) | Acceleration / Feed-Forward | 10^4-10^5× feedforward video GS; massively parallel video-conditioned 3DGS |
| AsySplat | arXiv'26 (2607.10995) | Acceleration / Architecture | ~800× speedup asymmetric encoder-decoder architecture for fast GS |
| PanoLOG | arXiv'26 (2607.08769) | Outdoor / Panoramic | Panoramic outdoor partitioned GS; Pano360 benchmark for panoramic evaluation |
| StereoSplat+ | IROS'26 (2607.08808) | Stereo / Diffusion | Stereo + diffusion progressive GS; progressive refinement from stereo priors |
| SyncSpace | arXiv'26 (2607.10050) | MR / Reskinning | Mixed reality space reskinning via layout-conditioned GS; real-time spatial editing |
| ABot-3DWorld 0 | arXiv'26 (2607.11673) | World Model / Agent | World model → 3DGS; SGP (Scene Graph Primitive) for agent-centered 3D understanding |
| SplatCtrl | ICRA'26 (2607.08948) | Robotics / Control | GS + reactive robot control via Control Barrier Functions (CBF); safety-guaranteed navigation |
| PEAR | SIGGRAPH'26 | Avatar / Real-Time | Single-image 100 FPS human avatar; real-time animatable Gaussian avatar |
| FreDeGS | Springer'26 | Deblurring / Frequency | Frequency-guided deblurring GS; frequency-aware optimization for motion-blurred inputs |

### New Additions (July 23, 2026)

| Method | Venue | Category | Key Feature |
|--------|-------|----------|-------------|
| GaussTrace | ICML'26 (2606.10612) | Provenance / Security | 3DGS provenance analysis via evidence-driven LLM reasoning; directed provenance graphs from Gaussian attributes for IP protection & forensics |
| DualPhys-GS | arXiv'26 (2508.09610) | Robustness / Underwater | Dual physically-guided 3DGS for underwater scenes; joint attenuation-scattering + lighting decomposition |
| InvSplat | arXiv'26 (2607.02301) | Feed-Forward / Material | Inverse feed-forward scene splatting; intrinsic PBR attributes (albedo, metallic, roughness) for relighting |
| GADA | ICML'26 (2607.00595) | Feed-Forward / Geometry | Geometry-Aware Deformable Aggregation; deformable offsets + implicit confidence; 2.13× faster FPS |
| MGM | arXiv'26 (2509.22112) | Material / Relighting | Relightable 3D generation with PBR; multiview material diffusion + Gaussian material representation |
| StereoGS | 2026 | Hardware / VR | Energy-efficient stereoscopic 3DGS processor; dual-eye shared compute for VR/AR rendering |