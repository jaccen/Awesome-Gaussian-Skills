

# 3DGS Methods Overview

> Built-in knowledge base for Awesome Gaussian Skills. Covers 50+ 3D Gaussian Splatting variants organized by category.

## Foundation Methods

### 3D Gaussian Splatting (3DGS)
- **Paper**: 3D Gaussian Splatting for Real-Time Radiance Field Rendering
- **Authors**: Bernhard Kerbl, Georgios Kopanas, Thomas Leimkühler, George Drettakis
- **Venue**: SIGGRAPH 2023
- **ArXiv**: 2308.04079
- **Core**: Anisotropic 3D Gaussians with tile-based differentiable rasterization
- **Primitive**: 3D anisotropic Gaussian G = (μ, Σ, α, SH)
- **Key Innovation**: Replaces NeRF's implicit MLP with explicit Gaussians + differentiable rasterization for real-time rendering
- **Rendering**: Tile-based forward splatting, α-compositing
- **Training**: Adaptive Density Control (clone + split + prune), 7k-30k iterations
- **Baseline Performance**: Mip-NeRF 360 — PSNR ~25.2 dB, SSIM ~0.77, LPIPS ~0.36
- **Speed**: 100+ FPS at 1080p on RTX 3090
- **Code**: https://repo-sam.informatik.uni-halle.de/jkortner/gaussian-splatting/

## Surface & Geometry Methods

### 2D Gaussian Splatting (2DGS)
- **Paper**: 2D Gaussian Splatting for Geometrically Accurate Radiance Fields
- **Authors**: Zixiang Zhou, Peng Wang, Yuxing Qiu, Pengfei Wan, Xiaoyang Lyu, Tiejun Huang, Yan Lu
- **Venue**: SIGGRAPH 2024
- **ArXiv**: 2403.17888
- **Core**: Replaces 3D Gaussians with oriented 2D disks
- **Key Innovation**: Better surface reconstruction quality while maintaining real-time rendering
- **Trade-off**: Slightly lower PSNR than 3DGS, but significantly better geometric quality

### SuGaR
- **Paper**: SuGaR: Surface-Aligned Gaussian Splatting for Efficient 3D Mesh Reconstruction and High-Quality Rendering
- **Authors**: Antoine Guédon, Vincent Lepetit
- **Venue**: CVPR 2024
- **ArXiv**: 2312.13253
- **Core**: Regularizes Gaussians to align with learned mesh surface
- **Key Innovation**: Joint optimization of Gaussians and mesh for high-quality extraction

## Signed / Decomposed Methods

### SignGS (Signed Gaussian Splatting)
- **Core**: Extends opacity α ∈ [-1, +1] via tanh mapping
- **Key Innovation**: Signed opacity enables modeling sharp geometric boundaries through constructive/destructive interference
- **Negative Mechanism**: Negative opacity → subtractive contribution in α-compositing
- **Application**: High-frequency detail preservation, sharp edge modeling
- **Loss**: Frequency-aware perceptual loss for boundary sharpness
- **Distinction from NegGS**: SignGS modifies opacity (rendering level), NegGS modifies color (appearance level)

### NegGS (Negative Gaussian Splatting)
- **Paper**: Negative Gaussian Splatting
- **ArXiv**: 2405.14786
- **Core**: Allows negative color values; opacity remains non-negative
- **Key Innovation**: Diff-Gaussian distribution (subtraction of two Gaussians) for ring/crescent/non-convex structures
- **Negative Mechanism**: Negative color values in RGB space (not negative opacity)
- **Trade-off**: Better at non-convex structures, but opacity still bounded [0, +∞)
- **Typical Ratio**: ~20% negative Gaussians optimal

## Compression Methods

### Compact-3DGS
- **Core**: Vector quantization + pruning for model compression
- **Compression**: ~10-15x with minimal PSNR drop
- **Method**: Codebook-based attribute compression

### LightGS
- **Core**: Distillation-based compression with fewer, larger Gaussians
- **Compression**: ~15-20x
- **Method**: Knowledge distillation from teacher 3DGS

### MobileGS
- **Core**: Extreme compression for mobile deployment
- **Compression**: 50-100x
- **Method**: Aggressive pruning + quantization + neural repurposing

### Embedded-3DGS
- **Core**: Neural architecture search for optimal Gaussian representation
- **Compression**: ~10x

## Dynamic Scene Methods

### 4D Gaussian Splatting (4DGS)
- **Core**: Extends Gaussians to 4D (3D + time) for dynamic scenes
- **Method**: Deformation field on Gaussian parameters over time
- **Trade-off**: Handles dynamics but increases memory

### Dynamic 3D Gaussians
- **Paper**: Deformable 3D Gaussians for High-Fidelity Monocular Dynamic Scene Reconstruction
- **Authors**: Jonathon Luiten, Georgios Kopanas, Bastian Leibe, Deva Ramanan
- **Venue**: ICCV 2023
- **ArXiv**: 2309.13114
- **Core**: Per-point deformation network applied to Gaussian parameters
- **Method**: Learned deformation field + regularized optimization

### SC-GS
- **Core**: Spatial-temporal compression for dynamic Gaussians
- **Method**: Compact 4D representation with shared deformation

## Large-Scale Methods

### Scaffold-GS
- **Paper**: Scaffold-GS: Structured 3D Gaussians for View-Adaptive Rendering
- **Authors**: Zhiqi Li, Xin Huang, Zihan Zhu, Yangtian Sun, Xiaoyang Lyu, Xiaogang Jin
- **Venue**: ICCV 2023
- **ArXiv**: 2312.13209
- **Core**: Anchor-based structure for efficient large-scale scene representation
- **Key Innovation**: Anchor points + local Gaussian selection, progressive training

### Scaffold-GS+
- **Paper**: Scaffold-GS+: Structured 3D Gaussians with Progressive Training for Scalable Scene Rendering
- **Venue**: CVPR 2024
- **Core**: Progressive training strategy for Scaffold-GS
- **Improvement**: Better quality at city scale with less memory

### CityGaussian
- **Paper**: CityGaussian: Real-time High-quality Large-Scale Scene Rendering with Gaussians
- **Authors**: Yang Liu, Peng Wang, Xiaoyang Lyu, Tiejun Huang, Yan Lu
- **Venue**: ECCV 2024
- **ArXiv**: 2401.02379
- **Core**: Hierarchical LOD structure for city-scale scenes
- **Key Innovation**: Level-of-detail Gaussian organization + level-wise training

### Octree-GS
- **Paper**: Octree-GS: Towards Consistent Real-time Rendering with LOD-Structured 3D Gaussians
- **Core**: Octree-based spatial partitioning for efficient rendering
- **Key Innovation**: Octree acceleration structure + LOD management

## Editing Methods

### GaussianEditor
- **Core**: Text/geometry-driven editing of 3D Gaussian scenes
- **Method**: CLIP-guided selection + semantic-aware editing

### GeoGaussian
- **Core**: Geometry-guided Gaussian editing with mesh priors
- **Method**: Mesh-guided manipulation + consistent rendering

### Frosting
- **Core**: Appearance editing via surface-aligned Gaussians
- **Method**: Decoupled geometry/appearance editing

## Material & Relighting Methods

### GRF (Gaussian Relighting Field)
- **Core**: Material decomposition + relighting in Gaussian space
- **Method**: Separate Gaussian attributes for geometry, material, lighting

### GS-IR
- **Core**: Inverse rendering from 3D Gaussians
- **Method**: Decompose Gaussians into geometry + BRDF + lighting

## Human & Avatar Methods

### GaussianAvatar
- **Core**: 3DGS-based human avatar with driving capability
- **Method**: Gaussian representation for human body + pose-driven deformation

### GAS (Gaussian Avatar Speed-Up)
- **Core**: Accelerated Gaussian avatar rendering
- **Method**: Compression + caching for real-time avatar rendering

### SplattingAvatar
- **Core**: Expressive human avatar using Gaussian splatting
- **Method**: Expression-conditioned Gaussian deformation

## Autonomous Driving

### Street-GS
- **Core**: Street-level scene reconstruction with Gaussians
- **Method**: LiDAR-camera fusion + multi-view optimization

### ADS-GS
- **Core**: Autonomous driving scene with dynamic Gaussians
- **Method**: Static + dynamic decomposition for driving scenes

## Performance Comparison Reference

| Method | Mip-NeRF 360 PSNR | Speed (FPS) | Memory | Primitive |
|--------|-------------------|-------------|--------|-----------|
| 3DGS (original) | 25.2 | 100+ | ~1.5 GB | 3D anisotropic |
| 2DGS | ~25.0 | 80+ | ~1.2 GB | 2D disk |
| Scaffold-GS | ~25.0 | 90+ | ~0.8 GB | Anchor+3D |
| SignGS | ~25.5 | 90+ | ~1.5 GB | Signed 3D |
| NegGS | ~25.3 | 85+ | ~1.5 GB | Diff-Gaussian |
| Compact-3DGS | ~24.8 | 100+ | ~0.15 GB | Compressed |
| MobileGS | ~23.5 | 200+ | ~15 MB | Extreme compressed |

> Note: Numbers are approximate and may vary across implementations and hardware.

