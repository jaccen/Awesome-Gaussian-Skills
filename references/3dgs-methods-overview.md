

# 3DGS Methods Overview

> Built-in knowledge base for Awesome Gaussian Skills. Covers 70+ 3D Gaussian Splatting variants organized by category.
> Last updated: 2026-04-29

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

### PAGaS (Pixel-Aligned 1DoF Gaussian Splatting)
- **Paper**: PAGaS: Pixel-Aligned 1DoF Gaussian Splatting for Depth Refinement
- **Authors**: David Recasens, Robert Maier, Aljaz Bozic, Stephane Grabli, Javier Civera, Tony Tung, Edmond Boyer
- **ArXiv**: 2604.22129
- **Core**: Adapts GS from novel view synthesis to multi-view stereo depth task using 1-degree-of-freedom Gaussians
- **Key Innovation**: Gaussians constrained by back-projected pixel volumes, depth as sole DoF; highly detailed depth refinement on top of MVS baselines
- **Code**: https://davidrecasens.github.io/pagas

## CAD / Mesh / Hybrid Methods

### SuGaR
- **Paper**: SuGaR: Surface-Aligned Gaussian Splatting for Efficient 3D Mesh Reconstruction and High-Quality Rendering
- **Authors**: Antoine Guédon, Vincent Lepetit
- **Venue**: CVPR 2024
- **ArXiv**: 2312.13253
- **Core**: Regularizes Gaussians to align with learned mesh surface, extracts mesh via TSDF + Marching Cubes
- **Key Innovation**: Joint optimization of Gaussians and mesh for high-quality surface extraction
- **Pipeline**: Train 3DGS → Regularize toward surface → Multi-view TSDF fusion → Marching Cubes

### 2D Gaussian Splatting (2DGS)
- **Paper**: 2D Gaussian Splatting for Geometrically Accurate Radiance Fields
- **Authors**: Zixiang Zhou, Peng Wang, Yuxing Qiu, Pengfei Wan, Xiaoyang Lyu, Tiejun Huang, Yan Lu
- **Venue**: SIGGRAPH 2024
- **ArXiv**: 2403.17888
- **Core**: Replaces 3D Gaussians with oriented 2D disks constrained to surfaces
- **Key Innovation**: Best geometry quality among pure Gaussian methods; enables direct mesh extraction via Poisson reconstruction
- **Trade-off**: Training more expensive, VRAM-hungry

### MaGS (Mesh-adsorbed Gaussian Splatting)
- **Paper**: MaGS: Unifying 3D Representation Learning and Neural Rendering with Mesh-adsorbed Gaussian Splatting
- **Authors**: Zhejiang University
- **Venue**: ICCV 2025
- **Core**: Gaussians adsorbed onto mesh vertices; mesh provides topology + deformation handle
- **Key Innovation**: Hybrid mesh-Gaussian representation — deform mesh → Gaussians follow automatically
- **Best for**: Animated/deformable objects, physical simulation + neural rendering

### UniMGS (Unified Mesh and 3DGS)
- **Paper**: UniMGS: Unifying Mesh and 3D Gaussian Splatting with Single-Pass Rasterization and Proxy-Based Deformation
- **Authors**: HKUST(GZ)
- **Venue**: AAAI 2026
- **Core**: Single-pass rasterization for both mesh and Gaussians simultaneously
- **Key Innovation**: Eliminates redundant computation in separate mesh + GS pipelines
- **Best for**: Real-time applications needing both mesh geometry and Gaussian appearance

### Vol3DGS
- **Paper**: Volume-consistent 3D Gaussian Splatting for Accurate Surface Rendering
- **Authors**: UC San Diego
- **Venue**: CVPR 2025
- **Core**: Achieves physically accurate volume-consistent rendering in 3D Gaussian rasterization
- **Key Innovation**: Resolves the fundamental inconsistency between splatting and volume rendering

### BrepGaussian
- **Paper**: BrepGaussian: CAD Reconstruction from Multi-View Images with Gaussian Splatting
- **Authors**: Jiaxing Yu, Dongyang Ren, et al.
- **Venue**: CVPR 2026
- **ArXiv**: 2602.21105
- **Core**: Unified framework combining 3DGS with B-rep (Boundary Representation) CAD reconstruction
- **Key Innovation**: Gaussians provide dense geometric prior for B-rep extraction (trimmed NURBS surfaces, edges, vertices)
- **Output**: Parametric CAD model (STEP-compatible)
- **Limitations**: Struggles with textureless regions, thin structures, high specular, heavy occlusion + sparse views

## Signed / Decomposed Methods

### NegGS (Negative Gaussian Splatting)
- **Paper**: Negative Gaussian Splatting
- **ArXiv**: 2405.14786
- **Core**: Allows negative color values; opacity remains non-negative
- **Key Innovation**: Diff-Gaussian distribution (subtraction of two Gaussians) for ring/crescent/non-convex structures
- **Negative Mechanism**: Negative color values in RGB space (not negative opacity)
- **Trade-off**: Better at non-convex structures, but opacity still bounded [0, +∞)
- **Typical Ratio**: ~20% negative Gaussians optimal

## Feed-Forward Methods

### GlobalSplat
- **Paper**: GlobalSplat: Efficient Feed-Forward 3D Gaussian Splatting via Global Scene Tokens
- **Authors**: Roni Itkin, Noam Issachar, Yehonatan Keypur, Xingyu Chen, Anpei Chen, Sagie Benaim
- **ArXiv**: 2604.15284
- **Core**: Learns a compact global latent scene representation before decoding any explicit 3D geometry
- **Key Innovation**: "Align first, decode later" — resolves cross-view correspondences in latent space, then decodes to ~16K Gaussians with 4MB footprint
- **Speed**: Inference under 78ms in a single forward pass
- **Trade-off**: Far fewer Gaussians (16K vs typical 100K-1M) but competitive quality on RealEstate10K and ACID
- **Code**: https://r-itk.github.io/globalsplat/
### TRiGS
- **Paper**: TRiGS: Temporal Rigid-Body Motion for Scalable 4D Gaussian Splatting
- **Authors**: Suwoong Yeom, Joonsik Nam, Seunggyu Choi, et al.
- **ArXiv**: 2604.00538
- **Core**: Unified, continuous geometric transformations for 4DGS using SE(3) + hierarchical Bezier residuals + learnable local anchors
- **Key Innovation**: Preserves temporal identity of rigid objects, eliminates memory growth; scales to 600-1200 frame sequences without severe bottlenecks

### Reliev3R
- **Paper**: Reliev3R: Relieving Feed-forward Reconstruction from Multi-View Geometric Annotations
- **Authors**: Youyu Chen, et al.
- **ArXiv**: 2604.00548
- **Venue**: CVPR 2026
- **Core**: Reduces dependency of feed-forward 3DGS on dense multi-view geometric annotations

### ARGS
- **Paper**: ARGS: Auto-Regressive Gaussian Splatting via Parallel Progressive Next-Scale Prediction
- **Authors**: Quanyuan Ruan, et al.
- **ArXiv**: 2604.00494
- **Core**: Auto-regressive multi-scale 3D generation with hierarchical tree structure, O(log n) step generation

### WildSplatter
- **Paper**: WildSplatter: Feed-forward 3D Gaussian Splatting with Appearance Control from Unconstrained Images
- **Authors**: Yuki Fujimura, Takahiro Kushida, Kazuya Kitano, Takuya Funatomi, Yasuhiro Mukaigawa
- **ArXiv**: 2604.21182
- **Core**: Feed-forward 3DGS from unconstrained images with unknown camera poses and varying lighting
- **Key Innovation**: Jointly learns 3D Gaussians + appearance embeddings conditioned on input images; <1s reconstruction from sparse views; appearance control under diverse lighting
- **Code**: https://github.com/yfujimura/WildSplatter

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

### OT-UVGS
- **Paper**: OT-UVGS: Revisiting UV Mapping for Gaussian Splatting as a Capacity Allocation Problem
- **Author**: Byunghyun Kim
- **Venue**: Eurographics 2026 Short Papers
- **ArXiv**: 2604.19127
- **Core**: Reinterprets UV mapping for Gaussian Splatting as an optimal-transport-based capacity allocation problem
- **Key Innovation**: Separable 1D OT-inspired mapping with O(N log N) complexity; globally couples Gaussian-to-UV assignments
- **Result**: Consistently improves PSNR/SSIM/LPIPS under same UV resolution; higher non-empty slot ratio, fewer collisions, higher Gaussian retention
- **Application**: Drop-in replacement for spherical UVGS

### Gaussians on a Diet
- **Paper**: Gaussians on a Diet: High-Quality Memory-Bounded 3D Gaussian Splatting Training
- **Authors**: Yangming Zhang, Jian Xu, Chaojian Li, Kunxiong Zhu, Wei Niu, Gagan Agrawal, et al.
- **ArXiv**: 2604.20046
- **Core**: Memory-bounded training framework with iterative growth and pruning to maintain near-constant low memory
- **Key Innovation**: Addresses peak memory spikes during training (not just post-training pruning); up to 80% lower peak training memory; runs on Jetson AGX Xavier

### GS-SCNet
- **Paper**: Generalizable 3D Gaussian Splatting enabled Semantic Coding for Real-Time Immersive Video Communications
- **Authors**: Dingxi Yang, Wenqi Guo, Yue Liu, Jungong Han, Zhijin Qin
- **ArXiv**: 2604.25330
- **Core**: Unified end-to-end framework integrating generalizable 3DGS reconstruction with deep semantic coding pipeline
- **Key Innovation**: Disparity-Guided Parallel Semantic Codec + Lightweight Gaussian Parameter Predictor; eliminates redundant computation in decoupled coding+3DGS paradigms
- **Application**: 3D telepresence, immersive video communications

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
### RobustSplat
- **Paper**: RobustSplat: Decoupling Densification and Dynamics for Transient-Free 3DGS
- **Authors**: Sun Yat-sen University + CUHK-Shenzhen
- **Venue**: ICCV 2025
- **Core**: Decouples densification from dynamic object modeling to eliminate transient artifacts
- **Key Innovation**: Separate static/dynamic Gaussian management prevents transient objects from corrupting scene geometry

### TRiGS (also listed in Feed-Forward)
- See Feed-Forward Methods section for details
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

### SketchFaceGS
- **Paper**: SketchFaceGS: Real-Time Sketch-Driven Face Editing and Generation with Gaussian Splatting
- **Authors**: Bo Li, Jiahao Kang, Yubo Ma, Feng-Lin Liu, Bin Liu, Fang-Lue Zhang, Lin Gao
- **Venue**: CVPR 2026 (Highlight)
- **ArXiv**: 2604.19202
- **Core**: Sketch-driven generation and editing of photorealistic 3D Gaussian head models
- **Key Innovation**: Feed-forward coarse-to-fine architecture with Transformer-based UV feature prediction + UV Mask Fusion for real-time editing
- **Code**: https://github.com/gogoneural/SketchFaceGS_jittor

### FluSplat
- **Paper**: FluSplat: Sparse-View 3D Editing without Test-Time Optimization
- **Authors**: Haitao Huang, Shin-Fang Chng, Huangying Zhan, Qingan Yan, Yi Xu
- **ArXiv**: 2604.20038
- **Core**: Feed-forward 3D scene editing from sparse views without per-scene optimization
- **Key Innovation**: Cross-view regularization in image domain during training + feedforward 3DGS lifting; orders of magnitude faster than optimization-based editing

### TransSplat
- **Paper**: TransSplat: Unbalanced Semantic Transport for Language-Driven 3DGS Editing
- **Authors**: Yanhui Chen, Jiahong Li, Jingchao Wang, Junyi Lin, Zixin Zeng, Yang Shi
- **ArXiv**: 2604.19571
- **Core**: Language-driven 3DGS editing formulated as multi-view unbalanced semantic transport problem
- **Key Innovation**: Establishes semantic correspondences between edited 2D evidence and 3D Gaussians; transport residuals suppress edit leakage in non-target regions

## Material & Relighting Methods

### GRF (Gaussian Relighting Field)
- **Core**: Material decomposition + relighting in Gaussian space
- **Method**: Separate Gaussian attributes for geometry, material, lighting

### GS-IR
- **Core**: Inverse rendering from 3D Gaussians
- **Method**: Decompose Gaussians into geometry + BRDF + lighting

### Instant Colorization
- **Paper**: Instant Colorization of Gaussian Splats
- **Authors**: Daniel Lieber, Alexander Mock, Nils Wandel
- **ArXiv**: 2604.17155
- **Core**: Maps 2D image information (color, features, segmentation masks) back onto existing Gaussian splat scenes
- **Key Innovation**: Normal-equation-based visibility-weighted least squares for per-Gaussian colorization; up to 10x faster than gradient descent baselines
- **Application**: Scene relighting, feature enrichment, 3D semantic segmentation

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

### Generalizable Human GS (Multi-view Semantic Consistency)
- **Paper**: Generalizable Human Gaussian Splatting via Multi-view Semantic Consistency
- **Authors**: Jingi Kim, Wonjun Kim
- **ArXiv**: 2604.25466
- **Venue**: CVPR 2026 Findings
- **Core**: Generalizable human Gaussian splatting from sparse-view inputs with cross-view attention
- **Key Innovation**: Unprojects latent embeddings into shared 3D space via predicted depth; recalibrates per body part using cross-view attention to resolve spatial ambiguity

### High-Fidelity Human GS (Region-Aware)
- **Paper**: High-Fidelity 3D Gaussian Human Reconstruction via Region-Aware Initialization and Geometric Priors
- **Authors**: Yang Liu, Zhiyong Zhang
- **ArXiv**: 2604.21714
- **Core**: Region-aware initialization + SMPL-X geometric priors for dynamic human reconstruction
- **Key Innovation**: SMPL-X initializes Gaussians and skinning weights; region-aware density init + geometry-aware multi-scale hash encoding for local detail recovery

## Robustness & Regularization

### NRGS (Neural Regularization for Gaussian Splatting)
- **Paper**: NRGS: Neural Regularization for Robust 3D Semantic Gaussian Splatting
- **Authors**: Zaiyan Yang, Xinpeng Liu, Heng Guo, Jinglei Shi, Zhanyu Ma, Fumio Okura
- **ArXiv**: 2604.22439
- **Core**: Neural network-based regularization for semantic 3DGS
- **Key Innovation**: Improves robustness of 3DGS in semantic segmentation tasks through learnable regularization, addressing a key weakness of standard 3DGS in downstream dense prediction tasks

### DualSplat
- **Paper**: DualSplat: Robust 3D Gaussian Splatting via Pseudo-Mask Bootstrapping from Reconstruction Failures
- **Authors**: Xu Wang, Zhiru Wang, Shiyun Xie, Chengwei Pan, Yisong Chen
- **Venue**: CVPR 2026
- **ArXiv**: 2604.21631
- **Core**: Converts first-pass reconstruction failures into explicit priors for second-pass clean reconstruction
- **Key Innovation**: Failure-to-Prior framework; exploits transient fragments + photometric residuals + SAM2 boundaries to construct pseudo-masks; lightweight MLP refines masks online

## Autonomous Driving

### Street-GS
- **Core**: Street-level scene reconstruction with Gaussians
- **Method**: LiDAR-camera fusion + multi-view optimization

### ADS-GS
- **Core**: Autonomous driving scene with dynamic Gaussians
- **Method**: Static + dynamic decomposition for driving scenes

### Asset Harvester
- **Paper**: Asset Harvester: Extracting 3D Assets from Autonomous Driving Logs for Simulation
- **Authors**: Tianshi Cao, Jiawei Ren, Yuxuan Zhang, Jaewoo Seo, et al. (NVIDIA)
- **ArXiv**: 2604.18468
- **Core**: End-to-end pipeline converting sparse AV object observations into simulation-ready 3D assets
- **Key Innovation**: SparseViewDiT for limited-angle view generation + 3D Gaussian lifting; hybrid data curation with self-distillation
- **Application**: Closed-loop AV simulation, scalable 3D asset extraction
- **Code**: https://research.nvidia.com/labs/sil/projects/asset-harvester/

## SLAM & Dynamic (Recent)

### Flow4DGS-SLAM
- **Paper**: Flow4DGS-SLAM: Optical Flow-Guided 4D Gaussian Splatting SLAM
- **Authors**: Yunsong Wang, Gim Hee Lee
- **ArXiv**: 2604.22339
- **Core**: Combines optical flow guidance with 4D Gaussian Splatting for SLAM
- **Key Innovation**: Optical flow provides temporal consistency constraints for 4DGS in SLAM scenarios, reducing drift

### EvFlow-GS
- **Paper**: EvFlow-GS: Event Enhanced Motion Deblurring with Optical Flow for 3D Gaussian Splatting
- **Authors**: Feiyu An, Yufei Deng, Zihui Zhang, Rong Xiao
- **ArXiv**: 2604.22183
- **Venue**: ICME 2026
- **Core**: Uses event camera data + optical flow to handle motion blur in 3DGS
- **Key Innovation**: Novel combination of event cameras (high temporal resolution) with 3DGS rendering, enabling high-quality reconstruction in high-speed motion scenarios
### MAGICIAN
- **Paper**: MAGICIAN: Active Mapping with Gaussian Splatting via Imagined Gaussians
- **Authors**: Shiyao Li, Antoine Guedon, Shizhe Chen, Vincent Lepetit
- **Affiliation**: IP Paris, Inria
- **Venue**: CVPR 2026 (Oral)
- **ArXiv**: 2603.22650
- **Core**: Active mapping agent that imagines unseen regions via imagined Gaussians + beam search for long-horizon planning
- **Key Innovation**: Occupancy prediction -> Gaussian representation -> efficient gain computation via rendering; global-optimal path planning via beam search
- **Code**: https://shiyao-li.github.io/magician/

## Training Acceleration

### Faster-GS
- **Paper**: Faster-GS — Systematic Acceleration of 3D Gaussian Splatting Training
- **Venue**: CVPR 2026
- **Core**: Systematic benchmark for 3DGS training speed optimization
- **Key Innovation**: Separates engineering optimizations from algorithmic innovations, enabling fair evaluation of 3DGS acceleration methods
### Proxy-GS
- **Paper**: Proxy-GS: Occlusion-Aware Gaussian Splatting via Lightweight Proxy Model
- **Authors**: Zhonghang Zhou (USTC/SJTU), Shanghai AI Lab, NWPU
- **Venue**: CVPR 2026 (Perfect Score)
- **Core**: Lightweight proxy model with occlusion prior for training and inference acceleration
- **Key Innovation**: 2.5x rendering speedup with no accuracy loss; occlusion-aware pruning via proxy model

## Scene Completion

### GSCompleter
- **Paper**: GSCompleter: A Distillation-Free Plugin for Metric-Aware 3D Gaussian Splatting Completion in Seconds
- **Authors**: Ao Gao, Jingyu Gong, Xin Tan, Zhizhong Zhang, Yuan Xie
- **ArXiv**: 2604.20155
- **Core**: Distillation-free plugin for sparse-view 3DGS completion using Generate-then-Register workflow
- **Key Innovation**: Stereo-Anchor mechanism lifts synthesized 2D references into metric-scale 3D primitives; Ray-Constrained Registration integrates into global context; SOTA on 3 benchmarks

## Degradation-Aware Methods

### MERID-GS
- **Paper**: Light 'em Up: Enabling Few-Shot Low-Light 3D Gaussian Splatting with Multi-Scale Explicit Retinex Illumination Decoupling
- **Authors**: YuHao Yin, Zongji Wang, Yuanben Zhang, Biqing Li, Jiesong Bai, Junyi Liu
- **ArXiv**: 2604.24053
- **Core**: Few-shot low-light 360° synthesis via Retinex-based illumination/reflectance decoupling
- **Key Innovation**: Learnable gain + Illumination-State-Guided Frequency Gating; adapts to new scenes with few shots; constructs low-light multi-view dataset
- **Code**: https://github.com/YhuoyuH/MERID-GS

### MarineSTD-GS
- **Paper**: Spatiotemporal Degradation-Aware 3D Gaussian Splatting for Realistic Underwater Scene Reconstruction
- **Authors**: Shaohua Liu, Ning Gao, Zuoya Gu, Hongkun Dou, Yue Deng, Hongjue Li
- **Venue**: ACM MM 2025
- **ArXiv**: 2604.23551
- **Core**: Explicitly models temporal + spatial underwater degradations (caustics, flickering, attenuation, backscattering)
- **Key Innovation**: Paired Intrinsic/Degraded Gaussians; Spatiotemporal Degradation Modeling module; self-supervised disentanglement of realistic appearance

## Simulation & Robotics

### GS-Playground
- **Paper**: GS-Playground: A High-Throughput Photorealistic Simulator for Vision-Informed Robot Learning
- **Authors**: Yufei Jia, Heng Zhang, Ziheng Zhang, et al. (42 authors)
- **Venue**: RSS 2026
- **ArXiv**: 2604.25459
- **Core**: Multi-modal simulation framework integrating batch 3DGS rendering with parallel physics engine
- **Key Innovation**: 10^4 FPS throughput at 640x480; automated Real2Sim workflow for photorealistic simulation-ready environments; bridges perceptual and physical gaps
- **Code**: https://gsplayground.github.io

## System & Production

### YOGO (You Only Gaussian Once)
- **Paper**: You Only Gaussian Once: Controllable 3D Gaussian Splatting for Ultra-Densely Sampled Scenes
- **Authors**: Jinrang Jia, Zhenjia Li, Yifeng Shi
- **ArXiv**: 2604.21400
- **Core**: System-level framework reformulating stochastic Gaussian growth into deterministic budget-aware equilibrium
- **Key Innovation**: Budget controller for resource allocation + availability-registration for multi-sensor fusion; introduces Immersion v1.0 ultra-dense indoor dataset
- **Code**: https://jjrcn.github.io/yogo-project-home/

## Performance Comparison Reference

| Method | Mip-NeRF 360 PSNR | Speed (FPS) | Memory | Primitive |
|--------|-------------------|-------------|--------|-----------|
| 3DGS (original) | 25.2 | 100+ | ~1.5 GB | 3D anisotropic |
| 2DGS | ~25.0 | 80+ | ~1.2 GB | 2D disk |
| Scaffold-GS | ~25.0 | 90+ | ~0.8 GB | Anchor+3D |
| NegGS | ~25.3 | 85+ | ~1.5 GB | Diff-Gaussian |
| Compact-3DGS | ~24.8 | 100+ | ~0.15 GB | Compressed |
| MobileGS | ~23.5 | 200+ | ~15 MB | Extreme compressed |
| GlobalSplat | ~25.0* | ~13 (78ms) | ~4 MB | 16K Gaussians (feed-forward) |
| SketchFaceGS | N/A (face) | Real-time | N/A | UV-param + 3DGS |
| OT-UVGS | ↑ vs UVGS | Same as UVGS | UV tensor | UV-mapped |
| WildSplatter | N/A (wild) | <1s (feed-forward) | N/A | Appearance-conditioned |
| Gaussians on a Diet | ~24.5 | Same as 3DGS | 80% less peak | Memory-bounded |
| DualSplat | ↑ vs baseline | Same as 3DGS | Same | Failure-to-Prior |
| MERID-GS | ↑ (low-light) | Same as 3DGS | Same | Retinex-decoupled |
| GS-Playground | N/A (sim) | 10^4 FPS | N/A | Batch 3DGS |

> *GlobalSplat evaluated on RealEstate10K/ACID (not Mip-NeRF 360)
> Numbers are approximate and may vary across implementations and hardware.

