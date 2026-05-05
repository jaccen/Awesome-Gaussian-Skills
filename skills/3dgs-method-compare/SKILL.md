---
name: 3dgs-method-compare
description: Compare 3D Gaussian Splatting variants across multiple dimensions. Generates detailed comparison tables covering primitive representation, rendering formulation, training strategy, and performance. Built-in knowledge of 130+ 3DGS methods.
version: 1.2.0
author: jaccen
tags:
  - 3dgs
  - gaussian-splatting
  - method-comparison
  - research
  - nerf
trigger:
  - "对比"
  - "比较"
  - "compare"
  - "difference between"
  - "和...有什么区别"
  - "哪个方法更好"
  - "method comparison"
  - "GS vs"
  - "3DGS vs 2DGS"
---

# 3DGS Method Comparison Engine

You are an expert in 3D Gaussian Splatting methods with deep knowledge of 130+ variants. Your task is to provide rigorous, multi-dimensional comparisons between different 3DGS approaches.

## Capabilities

- Compare any combination of 3DGS variants across 10+ technical dimensions
- Generate publication-quality comparison tables
- Analyze design trade-offs and identify positioning
- Provide recommendation based on specific use cases

## Comparison Dimensions

When comparing methods, analyze across the following dimensions:

### 1. Primitive Representation
- Shape: Full 3D Gaussian / 2D disk / 1D splat / hybrid
- Anisotropy: Isotropic / Anisotropic / Semi-anisotropic
- Parameterization: (μ, Σ, opacity, SH) / (center, normal, scale, opacity) / custom

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

### Robustness / Regularization Methods

| Method | Venue | Prior Source | Key Feature |
|--------|-------|-------------|-------------|
| EnerGS | arXiv'26 | LiDAR (partial geometric) | Energy-based soft guidance instead of hard constraints; improves outdoor large-scale scenes |

### Geometry / Surface Methods

| Method | Venue | Surface Quality | Key Feature |
|--------|-------|----------------|-------------|
| 2DGS | SIGGRAPH'24 | High | Oriented 2D disks for geometry |
| SuGaR | CVPR'24 | High | Surface-aligned regularization |
| PGSR | TVCG'24 | Highest (SOTA) | Planar regularizer + unbiased depth rendering |
| PAGaS | arXiv'26 | High (depth) | 1DoF Gaussians for depth refinement |
| Vol3DGS | CVPR'25 | High | Volume-consistent rendering |
| 2D-SuGaR | arXiv'26 | Highest (DTU SOTA) | 2DGS + monocular depth/normal priors; depth-guided init; clustering-based pruning |

### Generation / Text-to-3D

| Method | Venue | Input | Output | Key Feature |
|--------|-------|-------|--------|-------------|
| DreamGaussian | ICLR'24 (Oral) | Text prompt | 3D mesh + 3DGS | SDS + 3DGS prior, seconds |
| GaussianEditor | Preprint | Text/geometry mask | Edited 3DGS | CLIP-guided selection + editing |

### Language / Semantic

| Method | Venue | Feature Source | 3D Storage | Key Feature |
|--------|-------|---------------|------------|-------------|
| LangSplat | CVPR'24 | CLIP (2D distillation) | Per-Gaussian CLIP features | Open-vocabulary 3D queries |
| Feature 3DGS | CVPR'24 | DINO/SAM (2D distillation) | Per-Gaussian feature vectors | Downstream task features |
| NRGS | arXiv'26 | Neural network | Learned regularization | Robust semantic 3DGS |
| Semantic Foam | CVPR'26 (Highlight) | Volumetric Voronoi mesh | Per-cell semantic feature field | Semantic decomposition; outperforms Gaussian Grouping, SAGA |
| GLMap | CVPR'26 | Multi-scale semantics | Per-Gaussian language features | Gaussian-Language Map; zero-shot navigation |

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

### SLAM Methods

| Method | Venue | Input | Scale | Key Feature |
|--------|-------|-------|-------|-------------|
| Gaussian Splatting SLAM | CVPR'24 (Highlight) | Monocular video | Room-scale | First real-time monocular 3DGS SLAM, differentiable rendering for joint pose+map |
| CGS-SLAM | IROS'25 | Monocular video | Room-scale | Voxel-based compact representation for efficiency |
| WildGS-SLAM | CVPR'25 | Monocular video | Room-scale | Dynamic environments, uncertainty-aware mapping via pretrained 3D priors |
| S3PO-GS | ICCV'25 | Monocular video | Outdoor | Scale-consistent pose optimization, eliminates outdoor scale drift |
| Flow4DGS-SLAM | arXiv'26 | Monocular video | Room-scale | Optical flow-guided 4DGS for temporal consistency |

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
| 3DGS AD Safety Eval | SafeComp'26 | Autonomous driving | Industrial fidelity evaluation for AD perception |
| HeroGS | CVPR'26 | Sparse-view NVS | Hierarchical guidance for sparse-view robust 3DGS |
| Sparse-View 3DGS Wild | arXiv'26 | Sparse-view NVS | Diffusion-guided sparse-view enhancement |

### Human & Avatar Methods

| Method | Venue | Input | Key Feature |
|--------|-------|-------|-------------|
| HumanSplatHMR | arXiv'26 | Image | Joint pose-avatar optimization; closes loop between HMR and differentiable rendering |

### Autonomous Driving Methods

| Method | Venue | Input | Key Feature |
|--------|-------|-------|-------------|
| GSDrive | arXiv'26 | Multi-camera | 3DGS-based differentiable reward shaping for E2E driving; multi-mode trajectory probing |

### System & Infrastructure Methods

| Method | Venue | Framework | Key Feature |
|--------|-------|-----------|-------------|
| VkSplat | Eurographics'26 | Vulkan | Vulkan-based 3DGS training; 3.3x speed; cross-vendor |

### Training Acceleration Methods

| Method | Venue | Strategy | Key Feature |
|--------|-------|----------|-------------|
| Structure-Aware Densification | SIGGRAPH'26 | Frequency-aware anisotropic splitting | Frequency-aware anisotropic splitting; multiview consistency; faster convergence |

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