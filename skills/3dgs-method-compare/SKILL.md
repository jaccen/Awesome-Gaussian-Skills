---
name: 3dgs-method-compare
description: "Compare 3D Gaussian Splatting variants across 10+ dimensions. Built-in knowledge of 523+ methods across 24 categories."
version: 1.4.7
author: jaccen
tags: ["3dgs", "gaussian-splatting", "method-comparison", "research"]
---

# 3DGS Method Comparison Engine

You are an expert in 3D Gaussian Splatting methods with deep knowledge of 523+ variants. Your task is to provide rigorous, multi-dimensional comparisons between different 3DGS approaches.

## Capabilities

- Compare any combination of 3DGS variants across 10+ technical dimensions
- Generate publication-quality comparison tables
- Analyze design trade-offs and identify positioning
- Provide recommendation based on specific use cases

## Comparison Dimensions

When comparing methods, analyze across the following dimensions:

### 1. Primitive Representation
- Shape: Full 3D Gaussian / 2D disk / 1D splat / hybrid / spatially-varying (SVGS)
- Anisotropy: Isotropic / Anisotropic / Semi-anisotropic
- Parameterization: (μ, Σ, opacity, SH) / (center, normal, scale, opacity) / custom / (μ, Σ, spatially-varying color+opacity, SH) (SVGS)

### 2. Opacity / Alpha Mechanism
- Range: [0, 1] / [-1, 1] / unbounded / sigmoid / tanh
- Signed support: Yes (signed α) / No (standard GS)
- Negative mechanism: Negative color (NegGS) / Negative opacity (signed) / None

### 3. Color Representation
- Spherical Harmonics order: 0/1/2/3
- Color space: RGB / HDR / Feature vectors
- Negative color support: Yes (NegGS) / No

### 4. Rendering Formulation
- Rasterization: Tile-based / Forward / Deferred
- Blending: Front-to-back / Back-to-front
- Anti-aliasing: EWA splatting / Mip-aware / None

### 5. Frequency & Geometry Modeling
- High-frequency boundary: Explicit / Implicit / None
- Surface quality: Point-based / Surfels / Hybrid
- Geometric constraints: Depth normal / ESDF / Mesh prior

### 6. Density Control
- Strategy: Clone + Split + Prune / Progressive / Anchor-based
- Adaptivity: Gradient-based / Loss-based / Statistics-based
- Compression: Pruning / Quantization / Distillation

### 7. Training Strategy
- Resolution schedule: Coarse-to-fine / Fixed
- Iterations: 7k / 30k / custom
- Regularization: Depth / Normal / Smoothness / Sparsity

### 8. Performance Characteristics
- Speed (FPS): Real-time (>30) / Interactive (10-30) / Offline (<10)
- Memory: VRAM requirement
- Storage: Model size (MB)
- Scalability: Small object / Room-scale / City-scale

### 9. Applicable Scenarios
- Novel view synthesis
- Surface reconstruction
- 3D editing
- Dynamic scenes
- Large-scale scenes
- Autonomous driving

### 10. Code & Reproducibility
- Official implementation available
- Framework: PyTorch / JAX / CUDA / Custom
- Dependencies

## Rendering Formulation Comparison

| Method | Primitive | Compositing | Key Feature |
|--------|-----------|-------------|-------------|
| 3DGS | 3D Anisotropic Gaussian | alpha-compositing (front-to-back) | Tile-based rasterization |
| Softmax-GS | 3D Anisotropic Gaussian | Softmax competition | Replaces α-compositing with learnable softmax |
| Mip-Splatting | 3D Anisotropic Gaussian + Mip | alpha-compositing | 3D smoothing + 2D Mip filter |
| 3DGEER | 3D Anisotropic Gaussian | Exact ray-Gaussian integral | Replaces splatting with exact rendering |
| SNS | Azzalini Skew-Normal Distribution | alpha-compositing | Learnable skewness for asymmetric boundaries |

## Known Methods Database

### Foundation Methods

| Method | Venue | Primitive | Opacity | Key Feature |
|--------|-------|-----------|---------|-------------|
| 3DGS | SIGGRAPH'23 | 3D anisotropic | [0,1] sigmoid | Tile-based rasterization |
| Mip-Splatting | CVPR'24 (Best Student Paper) | 3D anisotropic + Mip | [0,1] | 3D smoothing + 2D Mip filter, alias-free |
| 2DGS | SIGGRAPH'24 | 2D disk | [0,1] | Better surface reconstruction |
| Scaffold-GS | ICCV'23 | Anchor+3D | [0,1] | Anchor-based scalability |
| Scaffold-GS+ | CVPR'24 | Anchor+3D | [0,1] | Progressive training |
| Softmax-GS | CVPR'26 (Findings) | 3D anisotropic | Softmax competition | Replaces α-compositing with learnable softmax; blend-vs-bound |
| LeGS | arXiv'26 | 3D anisotropic | RL-controlled | RL-based learnable density control replacing heuristics; O(N) reward |
| SNS | arXiv'26 (2605.15010) | Skew-Normal | [0,1] | Skew-Normal primitive replacing symmetric Gaussian kernels; continuous interpolation between symmetric Gaussian ↔ Half-Gaussian via learnable skewness |

### Signed / Decomposed Methods

| Method | Opacity Range | Color Range | Mechanism |
|--------|--------------|-------------|-----------|
| NegGS | [0, +∞) (non-negative) | ℝ (negative allowed) | Negative color + Diff-Gaussian |
| (Standard GS) | [0, 1] via sigmoid | [0, +∞) | Standard α-compositing |

**Critical Distinction**: Methods using "negative" concepts differ fundamentally:
- **Signed opacity (α ∈ [-1,1])**: Opacity α can be negative, rendering formula modified. The Gaussian primitive itself carries a sign. Better for sharp geometric boundaries.
- **NegGS**: Opacity remains non-negative, but color values can be negative. Uses Diff-Gaussian (subtraction of two Gaussians) to model ring/crescent structures.

### Compression Methods

| Method | Compression Ratio | Quality Impact | Speed |
|--------|-------------------|----------------|-------|
| Compact-3DGS | 10-15x | Minimal PSNR drop | Faster |
| LightGS | 15-20x | Slight drop | Much faster |
| MobileGS | 50-100x | Moderate drop | Real-time mobile |
| Embedded-3DGS | 10x | Minimal | Comparable |
| HAC | ~100x | Slight drop | Faster after decode |
| OT-UVGS | UV tensor | ↑ vs spherical UVGS | Same as UVGS |
| NanoGS | Training-free | Minimal (KNN merge) | CPU-only, instant |
| MesonGS++ | 34x | Minimal | Faster after decode (0-1 ILP hyperparameter search) |
| GETA-3DGS | 5x | Minimal | First end-to-end automatic joint structured pruning + quantization; QADG; render-aware saliency |
| CAGS | ~7x (streaming) | Minimal | VQ-based compression with Level-of-Detail streaming; progressive decode for bandwidth-adaptive deployment |
| MGS | arXiv'26 (2603.19234) | Any LoD prefix | Matryoshka continuous LoD via stochastic budget training; renders any prefix k splats |

### Robustness / Regularization Methods

| Method | Venue | Prior Source | Key Feature |
|--------|-------|-------------|-------------|
| EnerGS | arXiv'26 | LiDAR (partial geometric) | Energy-based soft guidance instead of hard constraints; improves outdoor large-scale scenes |
| Luminance-GS++ | TPAMI'26 | Illumination prior | Illumination-robust NVS; decouples shading from geometry |

### Geometry / Surface Methods

| Method | Venue | Surface Quality | Key Feature |
|--------|-------|----------------|-------------|
| 2DGS | SIGGRAPH'24 | High | Oriented 2D disks for geometry |
| SuGaR | CVPR'24 | High | Surface-aligned regularization |
| PGSR | TVCG'24 | Highest (SOTA) | Planar regularizer + unbiased depth rendering |
| PAGaS | arXiv'26 | High (depth) | 1DoF Gaussians for depth refinement |
| Vol3DGS | CVPR'25 | High | Volume-consistent rendering |
| 2D-SuGaR | arXiv'26 | Highest (DTU SOTA) | 2DGS + monocular depth/normal priors; depth-guided init; clustering-based pruning |
| IRIS | arXiv'26 (2603.15368) | Hybrid | GS-proxy neural field with analytical ray intersection; hybrid rendering |
| DiffSoup | arXiv'26 (2603.27151) | Extreme simplification | Triangle soup as alternative primitive to Gaussians |
| 3DSS | arXiv'26 (2605.05876) | High (inverse rendering) | First differentiable surface splatting; coverage-based compositing from EWA; joint shape+SVBRDF+lighting |
| SVGS | arXiv'24 (2411.18966) | High (Blender SOTA) | Spatially varying color+opacity within each Gaussian; movable kernels (1.4x params); >30 FPS |
| AmbiSuR | ICML'26 | High (photometric) | Photometric ambiguity disambiguation for accurate GS surface reconstruction |
| DySurface | arXiv'26 | High (4D surface) | Bridges explicit Gaussians and implicit SDF for consistent 4D surface reconstruction |

### Generation / Text-to-3D

| Method | Venue | Input | Output | Key Feature |
|--------|-------|-------|--------|-------------|
| DreamGaussian | ICLR'24 (Oral) | Text prompt | 3D mesh + 3DGS | SDS + 3DGS prior, seconds |
| GaussianEditor | Preprint | Text/geometry mask | Edited 3DGS | CLIP-guided selection + editing |
| ArtifactWorld | arXiv'26 (2604.12251) | Artifact images | Restored video | Video generation for artifact restoration |
| SceneGen-LLMRL | arXiv'26 (2605.05711) | Language | Interactive 3D scene | LLM-RL coupling for unified 3D scene generation + immersive interaction |

### Language / Semantic

| Method | Venue | Feature Source | 3D Storage | Key Feature |
|--------|-------|---------------|------------|-------------|
| LangSplat | CVPR'24 | CLIP (2D distillation) | Per-Gaussian CLIP features | Open-vocabulary 3D queries |
| Feature 3DGS | CVPR'24 | DINO/SAM (2D distillation) | Per-Gaussian feature vectors | Downstream task features |
| NRGS | arXiv'26 | Neural network | Learned regularization | Robust semantic 3DGS |
| Semantic Foam | CVPR'26 (Highlight) | Volumetric Voronoi mesh | Per-cell semantic feature field | Semantic decomposition; outperforms Gaussian Grouping, SAGA |
| GLMap | CVPR'26 | Multi-scale semantics | Per-Gaussian language features | Gaussian-Language Map; zero-shot navigation |
| NG-GS | arXiv'26 (2604.14706) | NeRF-guided | Per-Gaussian segmentation | NeRF-guided GS segmentation |
| PointGS | CVPR'26 | SAM masks (contrastive distillation) | Per-Gaussian semantic features | 3DGS as unified intermediate for unsupervised 3D point cloud segmentation; SAM→3D contrastive learning |

### Feed-Forward Methods

| Method | Venue | #Gaussians | Inference | Key Feature |
|--------|-------|------------|-----------|-------------|
| GlobalSplat | Preprint'26 | ~16K | <78ms | Global scene tokens, 4MB footprint |
| MVSplat | ECCV'24 | Variable | Single-pass | Cost-volume-based prediction |
| GS-LRM | ECCV'24 | Variable | Single-pass | 1B transformer, zero-shot generalization |
| DepthSplat | CVPR'25 | Variable | Single-pass | Stereo-guided depth regularization |
| InstantSplat | arXiv'24 | Variable | ~40s total | Pose-free sparse-view |
| AnySplat | SIGGRAPH'25 | Variable | Single-pass | In-the-wild unconstrained views |
| SparseSplat | CVPR'26 | 22% of SOTA | Single-pass | Pixel-unaligned, entropy-based probabilistic sampling, 3D-Local Attribute Predictor |
| OT-UVGS | EG'26 | UV tensor | Same as UVGS | OT-based UV mapping, O(N log N) |
| Free Geometry | arXiv'26 | Adaptive | Single-pass + LoRA | Self-evolving feed-forward, +3.73% camera accuracy |
| FTSplat | arXiv'26 (2603.05932) | Variable | Single-pass | Feed-forward triangle splatting |
| SplatWeaver | arXiv'26 (2605.07287) | Variable | Single-pass | Cardinality Gaussian Expert Routing (Null/1/2/3 experts per pixel) + DWT frequency prior; 30% Gaussian budget with +1.02 dB PSNR over AnySplat |

### SLAM Methods

| Method | Venue | Input | Scale | Key Feature |
|--------|-------|-------|-------|-------------|
| Gaussian Splatting SLAM | CVPR'24 (Highlight) | Monocular video | Room-scale | First real-time monocular 3DGS SLAM, differentiable rendering for joint pose+map |
| CGS-SLAM | IROS'25 | Monocular video | Room-scale | Voxel-based compact representation for efficiency |
| WildGS-SLAM | CVPR'25 | Monocular video | Room-scale | Dynamic environments, uncertainty-aware mapping via pretrained 3D priors |
| S3PO-GS | ICCV'25 | Monocular video | Outdoor | Scale-consistent pose optimization, eliminates outdoor scale drift |
| Flow4DGS-SLAM | arXiv'26 | Monocular video | Room-scale | Optical flow-guided 4DGS for temporal consistency |
| E2EGS | CVPR'26 (2603.14684) | Event camera | Room-scale | Event-camera pose-free 3D reconstruction |
| MAGS-SLAM | arXiv'26 | RGB (multi-agent) | Multi-room | First RGB-only multi-agent 3DGS SLAM; compact submap communication + geometry/appearance-aware loop verification |

### Large-Scale Methods

| Method | Venue | Scale | Key Feature |
|--------|-------|-------|-------------|
| Scaffold-GS | ICCV'23 | Building | Anchor-based efficiency |
| Scaffold-GS+ | CVPR'24 | City | Progressive training |
| CityGaussian | ECCV'24 | City | Hierarchical LOD |
| Street Gaussians | ECCV'24 | Street | Static/dynamic decomposition, driving scenes |
| Octree-GS | Preprint | City | Octree acceleration + LOD |

### Cross-Domain Applications

| Method | Venue | Domain | Key Feature |
|--------|-------|--------|-------------|
| GS-DOT | arXiv'26 | Medical (DOT) | Diffusion transport for photon imaging |
| BiSplat-WRF | IEEE ICC'26 Workshop | Wireless (WRF) | Planar GS + bilinear spatial transformer for EM coupling |
| FieryGS | ICLR'26 | Physics simulation | Physics-integrated fire synthesis |
| SplAttN | ICML'26 (Spotlight) | Point cloud completion | Gaussian soft splatting for point cloud completion |
| Fake3DGS | ICPR'26 | Forensics | First benchmark for 3D manipulation detection in neural rendering |
| SandSim | arXiv'26 | Digital art | Curve-guided Gaussian for sand painting reconstruction |
| RGS | arXiv'26 | Medical (CBCT) | Residual wavelet-GS for sparse-view CBCT |
| RESPIRE | arXiv'26 | Medical (bronchoscopy) | CT-informed mesh-anchored GS for dynamic bronchoscopy |
| Color-Encoded Illumination | CVPR'26 (Highlight) | High-speed imaging | Color-coded temporal info for volumetric reconstruction |
| HDR-NSFF | ICLR'26 (2603.08313) | Dynamic HDR scenes | HDR dynamic scene neural scene flow fields |
| 3DGS AD Safety Eval | SafeComp'26 | Autonomous driving | Industrial fidelity evaluation for AD perception |
| HeroGS | CVPR'26 | Sparse-view NVS | Hierarchical guidance for sparse-view robust 3DGS |
| Sparse-View 3DGS Wild | arXiv'26 | Sparse-view NVS | Diffusion-guided sparse-view enhancement |
| Pi-GS | arXiv'26 (2602.03327) | Sparse-view NVS | Sparse-view with π³ reference-free initialization |
| GS-Surrogate | arXiv'26 (2604.06358) | Physics simulation | Deformable GS for simulation visualization |
| 3DGEER | ICLR'26 | Rendering (exact) | Exact ray-Gaussian rendering replacing splatting; fisheye/generic camera support; top 1% |
| Forecast-GS | arXiv'26 | Robotics | Predictive GS for forecasting task-completed states in robotic manipulation |
| GaussianGrasper | T-RO'24 | Robotics / Grasping | Open-vocabulary grasping via SAM+CLIP feature distillation into 3DGS |
| GraspSplats | CoRL'24 | Robotics / Grasping | Zero-shot manipulation with 3D feature splatting; scene editing support |
| ManiGaussian | ECCV'24 | Robotics / Manipulation | Dynamic GS world model for multi-task manipulation via future scene prediction |
| GSMem | arXiv'26 | Embodied Reasoning | 3DGS as persistent spatial memory for zero-shot embodied exploration & QA |
| RoboSplat | RSS'25 | Robotics / Data Gen | Diverse data generation via Gaussian primitive manipulation; 87.8% success |
| VR-Robo | RAL'25 | Robotics / Navigation | Real-to-Sim-to-Real for visual robot navigation without depth sensors |
| GSDrive | arXiv'26 | Driving RL | 3DGS environment for reinforcing driving policies |
| GeoQuery | SIGGRAPH'26 | Sparse-view NVS | Geometry-guided cross-view attention with geometry-aligned proxy queries from predicted depth |
| PairDropGS | arXiv'26 | Sparse-view NVS | Paired dropout-induced consistency regularization with progressive scheduling |
| VidSplat | SIGGRAPH'26 | Sparse-view NVS | Training-free generative framework leveraging video diffusion priors with iterative confidence refinement |
| OCH3R | arXiv'26 (2605.13018) | Single RGB | Object-Centric Holistic 3D from single RGB; per-pixel CLIP + 6D pose + per-object Gaussians |

### Dynamic / 4DGS Methods

| Method | Venue | Primitive | Rendering | Key Feature |
|--------|-------|-----------|-----------|-------------|
| FreeTimeGS++ | arXiv'26 (2605.03337) | 4D Gaussians + durations | Gated marginalization | Neural velocity fields + emergent temporal partitioning; comprehensive 4DGS analysis |
| ParticleGS | arXiv'26 | 3D anisotropic + physics | Standard α-compositing | Physics-based motion extrapolation for fluid/dynamic scenes; Lagrangian particle dynamics |
| TransmissiveGS | arXiv'26 | Dual-GS (surface + reflection) | Deferred shading | Transmissive + reflective dual decomposition; separate G-buffer compositing for glass/refractive objects |
| PD-4DGS | arXiv'26 | 3-layer progressive (static + global deform + local refine) | Progressive streaming | DASH/HLS-compatible 4DGS streaming; ~1.7s first-frame latency vs 73-930s monolithic |
| 3DGS³ | arXiv'26 | 3D anisotropic (super-sampled) | Standard + temporal interpolation | Gradient-Aware Super Sampling + Lightweight Temporal Frame Interpolation for large-scale 3DGS |
| BlitzGS | arXiv'26 | 3D anisotropic (distributed) | Parity-based multi-GPU | Distributed city-scale GS training; parity-based sharding across multi-GPU; eliminates single-GPU memory bottleneck |
| Z-Order GS | arXiv'26 | 3D anisotropic (Z-ordered) | Z-order curve indexing | Z-order curve spatial indexing for cache-coherent Gaussian traversal; improved rendering throughput |
| PanoPlane | arXiv'26 | Planar (panoramic) | Plane-based compositing | Panoramic plane-based GS for omnidirectional NVS; efficient panoramic scene representation |
| SparseOIT | arXiv'26 | 3D anisotropic | Order-independent transparency | Sparse order-independent transparency for correct See-through rendering of overlapping semi-transparent Gaussians |
| SCOUP | arXiv'26 | Sparse code primitives | Language-conditioned | Sparse code language GS; language-conditioned sparse coding for controllable 3DGS generation |
| AV1-3DGS | arXiv'26 | 3D anisotropic | AV1 motion-vector SfM | AV1 codec motion vectors for dense SfM; 63% training time reduction; leverages video compression priors |
| RoSplat | arXiv'26 | 3D anisotropic (feed-forward) | Pixel-wise GS | Feed-forward pixel-wise GS for sparse-view NVS; requires alpha normalization for varying view counts |
| HarmoGS | arXiv'26 | 3D anisotropic | Harmonized optimization | Gradient harmonization for in-the-wild 3DGS; resolves cross-view gradient conflicts from transient distractors and illumination inconsistencies |
| GuardMarkGS | arXiv'26 | 3D anisotropic | Watermark + deterrence | First unified watermarking + edit deterrence framework for 3DGS assets; security for 3D content |
| FaceParts | arXiv'26 | 3D anisotropic (part-based) | Part-compositional | Part-based decomposable Gaussian avatar; modular facial region modeling for expressive avatars |
| RetroNVS | arXiv'26 | 3D anisotropic | Retro-reflection modeling | Retro-reflection modeling in 3DGS for accurate rendering of retro-reflective surfaces (signs, safety gear) |
| Velox | arXiv'26 | 3D anisotropic | Velocity-aware 4D | Velocity-aware 4DGS for fast dynamic scene reconstruction with motion-adaptive temporal modeling |
| 3DGS² | arXiv'26 | 3D anisotropic (super-sampled) | Super-sampling + temporal | Second-generation 3DGS with super-sampling and temporal interpolation for large-scale scenes |

### Human & Avatar Methods

| Method | Venue | Input | Key Feature |
|--------|-------|-------|-------------|
| HumanSplatHMR | arXiv'26 | Image | Joint pose-avatar optimization; closes loop between HMR and differentiable rendering |
| EmoTaG | CVPR'26 (2603.21332) | Image + audio | Emotion-aware talking head on GS |
| SDTalk | arXiv'26 | Image + audio | Structured facial priors + dual-branch motion fields for Gaussian talking head |
| HairGPT | SIGGRAPH'26 | Text/image | Strand-as-Language autoregressive modeling for 3D hairstyle synthesis |
| D-Rex | SIGGRAPH'26 (2604.27871) | White-light avatar + target illumination | Decoupled relighting via LoRA fine-tuned video diffusion post-process; applicable to any white-light avatar system |

### World Models & Spatial Intelligence

_3DGS as world model primitive, differentiable simulation engine, or spatial intelligence representation_

Key methods:
- **GWM**: 3DGS as environment dynamics modeling primitive with autoregressive future state prediction
- **FlashWorld**: Feed-forward 3DGS world model for real-time interactive 3D world generation
- **GS-World**: 3DGS as differentiable simulation engine for world model + Sim2Real VLA
- **Visionary**: WebGPU + 3DGS world model carrier platform for browser-native world model rendering
- **RAD/DLWM**: 3DGS twin digital world for autonomous driving RL training

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

## Output Format

Generate comparisons using this template:

```
## [Method A] vs [Method B] vs [Method C]

### Overview Table
| Dimension | Method A | Method B | Method C |
|-----------|----------|----------|----------|
| Primitive | ... | ... | ... |
| Opacity | ... | ... | ... |
| Rendering | ... | ... | ... |
| ... | ... | ... | ... |

### Detailed Analysis

#### Primitive Representation
[Paragraph comparing the fundamental representational differences]

#### Design Trade-offs
[Analysis of what each method gains and sacrifices]

#### Recommendation
- For novel view synthesis: [Best choice] because ...
- For surface reconstruction: [Best choice] because ...
- For real-time rendering: [Best choice] because ...
```

## Rules

1. **Be technically precise**: Never oversimplify differences. If two methods differ in their opacity parameterization, explain exactly how.
2. **Quote metrics when available**: Use actual numbers from papers, not estimates.
3. **Avoid bias**: Present each method's strengths and weaknesses fairly.
4. **Context matters**: A method that's worse on PSNR might be better for real-time. Always mention the use case.
5. **Flag uncertainty**: If you don't have reliable data for a comparison dimension, say so explicitly.

> If you like it, please star this repo https://github.com/jaccen/Awesome-Gaussian-Skills
