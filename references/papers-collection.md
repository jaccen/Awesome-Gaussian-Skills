
# 3DGS / NeRF / 3D Vision Papers Collection

> Curated paper collection for Awesome-Gaussian-Skills. Supplements the main knowledge base (3dgs-methods-overview.md) with additional important papers organized by research direction.
> Sources: CVF (CVPR/ICCV/3DV), arXiv (cs.CV/cs.GR), SIGGRAPH/Eurographics, GaussianSplatting-Papers, MrNeRF awesome list, awesome-NeRF-and-3DGS-SLAM, Baidu/Google Scholar.
> Last updated: 2026-04-30
> Note: Papers already covered in 3dgs-methods-overview.md are excluded. See that file for 105+ core methods.

---

## Table of Contents

1. [Foundation & Core 3DGS](#1-foundation--core-3dgs)
2. [Antialiasing & Rendering Quality](#2-antialiasing--rendering-quality)
3. [Surface & Geometry Reconstruction](#3-surface--geometry-reconstruction)
4. [CAD / Mesh / Hybrid Methods](#4-cad--mesh--hybrid-methods)
5. [Feed-Forward & Single/Pfew-Shot Reconstruction](#5-feed-forward--singlefew-shot-reconstruction)
6. [Compression & Efficiency](#6-compression--efficiency)
7. [Dynamic Scene & 4D Methods](#7-dynamic-scene--4d-methods)
8. [Language / Semantic / Segmentation](#8-language--semantic--segmentation)
9. [Editing & Manipulation](#9-editing--manipulation)
10. [Material, Relighting & Appearance](#10-material-relighting--appearance)
11. [Human & Avatar](#11-human--avatar)
12. [Large-Scale & Autonomous Driving](#12-large-scale--autonomous-driving)
13. [SLAM & Exploration](#13-slam--exploration)
14. [Generation (Text/Image-to-3D)](#14-generation-textimage-to-3d)
15. [Robustness & Degradation](#15-robustness--degradation)
16. [Training Acceleration & Optimization](#16-training-acceleration--optimization)
17. [Simulation & Robotics](#17-simulation--robotics)
18. [Cross-Domain & Novel Applications](#18-cross-domain--novel-applications)
19. [Surveys & Benchmarks](#19-surveys--benchmarks)
20. [NeRF Advances (Non-GS)](#20-nerf-advances-non-gs)
21. [3D Generation & Understanding](#21-3d-generation--understanding)

---

## 1. Foundation & Core 3DGS

### HoGS (Homogeneous Gaussian Splatting)
- **Paper**: Homogeneous Gaussian Splatting
- **Authors**: Microsoft Research Asia
- **Venue**: CVPR 2025
- **Core**: Homogeneous Gaussian projection unifying near/far object reconstruction
- **Key Innovation**: Resolves 3DGS degradation under extreme depth range via homogeneous coordinates
- **Source**: CVF

### 7DGS (7D Gaussian Splatting)
- **Paper**: 7D Gaussian Splatting
- **Venue**: ICCV 2025 (Oral)
- **Core**: 7-dimensional Gaussian (spatial+temporal+angular) unified modeling
- **Key Innovation**: Dynamic scene reconstruction error drops 72%; unifies spatiotemporal-angular representation
- **Source**: CVF / MrNeRF

### TrimGS
- **Paper**: Trim 3D Gaussian Splatting for Accurate Geometry Representation
- **Authors**: Lue Fan, Yuxue Yang, Minxing Li, Hongsheng Li, Zhaoxiang Zhang
- **Venue**: 2024
- **ArXiv**: 2406.07499
- **Core**: Trims 3DGS primitives for accurate geometry representation
- **Key Innovation**: Geometry-focused densification control; improves surface reconstruction quality
- **Code**: https://github.com/YuxueYang1204/TrimGS

### Gaussian Billboards
- **Paper**: Gaussian Billboards: Expressive 2D Gaussian Splatting with Textures
- **Authors**: Sebastian Weiss, Derek Bradley
- **Venue**: 2024
- **ArXiv**: 2412.12734
- **Core**: 2D Gaussian Splatting with texture maps for expressive rendering
- **Key Innovation**: Textured 2D billboards improve multi-view consistency and appearance quality
- **Source**: MrNeRF

### HDGS
- **Paper**: HDGS: Textured 2D Gaussian Splatting for Enhanced Scene Rendering
- **Authors**: Yunzhou Song, Heguang Lin, Jiahui Lei, Lingjie Liu, Kostas Daniilidis
- **Venue**: 2024
- **ArXiv**: 2412.01823
- **Core**: Textured 2DGS for enhanced rendering with anti-aliasing and geometry
- **Key Innovation**: Combines 2DGS surface quality with texture detail preservation
- **Source**: MrNeRF

### Deformable Beta Splatting
- **Paper**: Deformable Beta Splatting
- **Venue**: SIGGRAPH 2025
- **Core**: Replaces Gaussian kernel with bounded Beta distribution; separates diffuse/specular
- **Key Innovation**: Kernel-agnostic MCMC sampling; Beta distribution better handles compact objects; spherical Beta replaces SH for view-dependent appearance
- **Source**: SIGGRAPH 2025

### PDEO (PDE-based Optimization for 3DGS)
- **Paper**: PDE-based Optimization for 3D Gaussian Splatting
- **Authors**: USTC GCL Lab (刘利刚/蔡有城)
- **Venue**: CVPR 2026
- **Core**: Optimizes 3DGS reconstruction from PDE (Partial Differential Equation) perspective
- **Key Innovation**: Plug-and-play PDE component for complex scene high-fidelity reconstruction
- **Source**: Baidu Search

### PointGS
- **Paper**: PointGS: Semantic-Consistent Unsupervised 3D Point Cloud Segmentation
- **Authors**: Beijing Jiaotong University
- **Venue**: CVPR 2026
- **Core**: Integrates SAM and 2D pre-trained models into 3DGS for semantic point cloud segmentation
- **Key Innovation**: 2D→3D semantic information transfer without supervision
- **Source**: Baidu Search

### PointSplat
- **Paper**: PointSplat
- **ArXiv**: 2604.09903
- **Venue**: CVPR 2026
- **Core**: Geometry-driven pruning + Transformer refinement for efficient 3DGS
- **Key Innovation**: Reduces millions of Gaussians to reasonable scale while preserving quality
- **Source**: Baidu Search

---

## 2. Antialiasing & Rendering Quality

### Quantile Rendering
- **Paper**: Quantile Rendering: Efficiently Embedding High-dimensional Feature on 3D Gaussian Splatting
- **Authors**: Yoonwoo Jeong et al. (POSTECH/NVIDIA)
- **Venue**: Eurographics 2025 (Computer Graphics Forum)
- **Core**: Embeds high-dimensional features into 3DGS via quantile-based rendering
- **Key Innovation**: Improves rendering realism with efficient feature embedding
- **Source**: Eurographics DL

### IBGS (Image Borrowing Gaussian Splatting)
- **Paper**: IBGS: Image Borrowing Gaussian Splatting
- **Authors**: NVIDIA / ANU
- **Venue**: NeurIPS 2025
- **Core**: Borrows image features to enhance 3DGS quality without increasing storage
- **Key Innovation**: Breaks low-order SH bottleneck for high-frequency detail; achieves storage-quality win-win
- **Source**: Baidu Search

### VA-GS (View-Aligned Gaussian Splatting)
- **Paper**: VA-GS: View-Aligned Enhancement of 3DGS Geometry
- **Venue**: NeurIPS 2025
- **Core**: Edge-aware rendering + visibility-aware cross-view photometric alignment + normal constraints
- **Key Innovation**: Multi-view geometric consistency for improved 3DGS geometry representation
- **Source**: Baidu Search

### Signal Structure-Aware GS
- **Paper**: Signal Structure-Aware Gaussian Splatting
- **Authors**: Xijing Technology & Tongji University
- **Venue**: ICLR 2026
- **Core**: Signal structure-aware Gaussian Splatting for large-scale scenes
- **Key Innovation**: Addresses extremely sparse initial point clouds in observation-sparse regions
- **Source**: Baidu Search

### 3DGEER (Geometrically Exact 3DGS)
- **Paper**: Geometrically Exact 3D Gaussian Splatting
- **Venue**: ICLR 2026
- **Core**: First 3DGS framework satisfying strict projective geometric consistency
- **Key Innovation**: Supports fisheye, ultra-wide-angle, and cross-camera training
- **Source**: Baidu Search

---

## 3. Surface & Geometry Reconstruction

### GS2Mesh
- **Paper**: GS2Mesh: Surface Reconstruction from Gaussian Splatting via Novel Stereo Views
- **Authors**: Yaniv Wolf, Amit Bracha, Ron Kimmel
- **Venue**: 2024
- **ArXiv**: 2404.01810
- **Core**: Extracts mesh from 3DGS via stereo view-based reconstruction
- **Key Innovation**: Novel stereo view synthesis for mesh extraction from Gaussians
- **Code**: https://github.com/yanivw12/gs2mesh

### IMLS-Splatting
- **Paper**: IMLS-Splatting: Efficient Mesh Reconstruction from Multi-view Images via Point Representation
- **Authors**: USTC/UCSD/Hillbot
- **Venue**: SIGGRAPH 2025
- **Core**: End-to-end mesh reconstruction via Implicit Maximum Likelihood Splatting
- **Key Innovation**: IMLS-based surface extraction without extra regularization; 11-minute reconstruction
- **Source**: SIGGRAPH 2025

### Distance Field Rasterization for Mesh Reconstruction
- **Paper**: Distance Field Rasterization for End-to-End Mesh Reconstruction
- **Authors**: Jinkai Cui, Kaiwen Song, Chumeng Niu, Juyong Zhang
- **Venue**: SIGGRAPH 2026
- **ArXiv**: 2604.23537
- **Core**: Distance field rasterization for end-to-end mesh reconstruction
- **Key Innovation**: Solves efficient rendering of neural implicit surfaces for mesh reconstruction
- **Source**: arXiv

### GeoSVR
- **Paper**: GeoSVR: Sparse Voxel High-Precision 3D Surface Reconstruction
- **Venue**: NeurIPS 2025 (Spotlight)
- **Core**: Sparse voxel-based high-precision 3D surface reconstruction
- **Key Innovation**: Surpasses 3DGS series in geometric accuracy
- **Source**: Baidu Search

### MeshSplat
- **Paper**: MeshSplat: Generalizable Sparse-View Surface Reconstruction via Gaussian Splatting
- **Authors**: Hanzhi Chang, Ruijie Zhu, Wenjie Chang, et al.
- **Venue**: 2025
- **ArXiv**: 2508.17811
- **Core**: Generalizable sparse-view surface reconstruction with GS
- **Key Innovation**: Feed-forward surface reconstruction from sparse views
- **Source**: MrNeRF

### Non-parametric 3DGS
- **Paper**: Non-parametric 3D Gaussian Splatting
- **Venue**: ICLR 2026
- **Core**: Rethinks 3DGS representation with unified non-parametric alternative
- **Key Innovation**: Solves training instability and convergence issues of feed-forward networks
- **Source**: Baidu Search

### Mesh Splatting
- **Paper**: Mesh Splatting
- **Venue**: ICLR 2026
- **Core**: End-to-end multi-view surface reconstruction via mesh-to-volume rendering
- **Key Innovation**: 23-minute high-fidelity mesh reconstruction by converting surface to volume representation
- **Source**: Baidu Search

### Prox-E
- **Paper**: Prox-E: Fine-Grained 3D Shape Editing via Primitive-Based Abstractions
- **Venue**: SIGGRAPH 2026
- **ArXiv**: 2604.23774
- **Core**: Primitive-based abstraction for fine-grained 3D shape editing
- **Source**: arXiv

---

## 4. CAD / Mesh / Hybrid Methods

### Sketch2Arti
- **Paper**: Sketch2Arti: Sketch-based Articulation Modeling of CAD Objects
- **Authors**: Yi Yang, Hao Pan, Yijing Cui, Alla Sheffer, Changjian Li
- **ArXiv**: 2604.25781
- **Core**: Sketch-based CAD object articulation modeling
- **Key Innovation**: Joint sketch understanding and joint motion modeling for CAD objects
- **Source**: arXiv cs.CV+cs.GR

### REArtGS (Reconstructing Articulated 3DGS)
- **Paper**: Reconstructing Articulated 3DGS from Two Views
- **Authors**: Hefei University of Technology / CAS / SJTU / ByteDance
- **Venue**: NeurIPS 2025
- **Core**: Reconstructs articulated objects from only two views
- **Key Innovation**: SDF-guided geometry + kinematic constraints for arbitrary pose generation
- **Source**: Baidu Search

---

## 5. Feed-Forward & Single/Few-Shot Reconstruction

### SPFSplat
- **Paper**: SPFSplat: Self-supervised Pose-Free Gaussian Splatting
- **Authors**: Imperial College London
- **Venue**: ICCV 2025 (Highlight)
- **Core**: First fully pose-free self-supervised 3DGS from 2-3 images
- **Key Innovation**: Single network forward pass simultaneously outputs 3D scene and camera poses without any pose input
- **Source**: CVF / MrNeRF

### LongSplat
- **Paper**: LongSplat
- **Authors**: NVIDIA
- **Venue**: ICCV 2025
- **Core**: Robust pose-free 3DGS for arbitrarily long videos
- **Key Innovation**: Incremental joint optimization strategy with MASt3R prior to suppress pose drift
- **Source**: CVF / MrNeRF

### Speedy-Splat
- **Paper**: Speedy-Splat: Systematic Training Acceleration for 3DGS
- **Authors**: UC San Diego et al.
- **Venue**: CVPR 2025
- **Core**: Systematic acceleration via SnugBox + Soft Pruning
- **Key Innovation**: Precise Gaussian-tile intersection computation + dynamic pruning
- **Source**: CVF

### HeroGS
- **Paper**: HeroGS: Hierarchical Image/Feature-Guided Sparse-View 3DGS
- **Authors**: UCAS (Chinese Academy of Sciences)
- **Venue**: CVPR 2026
- **Core**: Image-level + feature-level hierarchical guidance for sparse-view 3DGS
- **Key Innovation**: Addresses overfitting from insufficient sparse-view supervision
- **Source**: Baidu Search

### GaussianDiffusion
- **Paper**: GaussianDiffusion: Embedding 3DGS into Diffusion Models
- **Venue**: ICCV 2025
- **Core**: Embeds 3DGS into diffusion model for high-speed high-resolution 3D generation (object + scene)
- **Key Innovation**: Bridge between 3DGS representation and diffusion generation
- **Source**: Baidu Search

### Non-parametric 3DGS
- See Section 3 (Surface & Geometry Reconstruction)

### 3D-LENS
- **Paper**: 3D-LENS: A 3D Lifting-based Elevated Novel-view Synthesis method for Single-View Aerial-Ground Re-Identification
- **ArXiv**: 2604.26520
- **Core**: 3D lifting-based novel view synthesis for aerial-ground re-identification
- **Source**: arXiv

### PanSplat
- **Paper**: PanSplat: 4K Panorama Synthesis with Feed-Forward Gaussian Splatting
- **Authors**: Cheng Zhang, Haofei Xu, Qianyi Wu, et al.
- **ArXiv**: 2412.12096
- **Core**: Feed-forward 4K panorama synthesis with GS
- **Code**: https://github.com/chengzhag/PanSplat

### Panoramic 3D Reconstruction Dataset (Holo360D)
- **Paper**: Holo360D: A Large-Scale Real-World Dataset with Continuous Trajectories for Advancing Panoramic 3D Reconstruction
- **ArXiv**: 2604.22482
- **Core**: Large-scale panoramic 3D reconstruction dataset with continuous trajectory annotations
- **Source**: arXiv

---

## 6. Compression & Efficiency

### GHAP (Gaussian Herding across Pens)
- **Paper**: GHAP: Gaussian Herding across Pens via Optimal Transport
- **ArXiv**: 2506.09534
- **Venue**: NeurIPS 2025
- **Core**: Optimal transport view global Gaussian compression
- **Key Innovation**: Retains only 10% Gaussians with near-lossless PSNR/SSIM; plug-and-play for any 3DGS pipeline
- **Source**: Baidu Search

### ReCon-GS
- **Paper**: ReCon-GS: Continuum Gaussian Flow Online Reconstruction
- **ArXiv**: 2509.24325
- **Venue**: NeurIPS 2025
- **Core**: Online reconstruction with density-adaptive multi-level anchors + hierarchically reconfigurable Gaussians
- **Key Innovation**: +15% training efficiency, 50% memory reduction
- **Source**: Baidu Search

### LODGE
- **Paper**: LODGE: LOD Strategy for Large-Scale 3DGS
- **ArXiv**: 2505.23158
- **Venue**: NeurIPS 2025
- **Core**: Level-of-detail strategy for large-scale 3DGS
- **Key Innovation**: Depth-aware smoothing + importance pruning + spatial blocking dynamic loading; mobile real-time rendering
- **Source**: Baidu Search

### LiteGS
- **Paper**: LiteGS: 60-Second 3DGS Reconstruction via Software-Hardware Co-optimization
- **Authors**: Moore Threads (摩尔线程)
- **Venue**: SIGGRAPH Asia 2025
- **Core**: Software-hardware co-optimized 3DGS reconstruction
- **Key Innovation**: Completes 3DGS in 60 seconds; Silver Award in 3DGS Reconstruction Challenge
- **Source**: Baidu Search

---

## 7. Dynamic Scene & 4D Methods

### Splat4D
- **Paper**: Splat4D: Diffusion-Enhanced 4D Gaussian Splatting
- **Authors**: HKU et al.
- **Venue**: SIGGRAPH 2025
- **Core**: Diffusion model enhanced 4DGS from monocular video
- **Key Innovation**: Generates temporally and spatially consistent 4D content; user-guided editing
- **Source**: SIGGRAPH 2025

### MEGA (Memory-Efficient Gaussian Animation)
- **Paper**: MEGA
- **Venue**: ICCV 2025 (Highlight)
- **Core**: 190x storage compression for 4DGS without quality loss
- **Key Innovation**: Breakthrough memory-efficiency for dynamic scene representation
- **Source**: MrNeRF

### Color-Encoded Illumination for High-Speed Volumetric Reconstruction
- **Paper**: Color-Encoded Illumination for High-Speed Volumetric Scene Reconstruction
- **ArXiv**: 2604.26920
- **Venue**: CVPR 2026 (Highlight)
- **Core**: Uses fast color-encoded sequential illumination + dynamic GS to decode temporal information from low-FPS cameras
- **Key Innovation**: First high-speed volumetric scene reconstruction using encoded illumination
- **Source**: arXiv

### Instant4D
- **Paper**: Instant4D
- **Venue**: NeurIPS 2025
- **Core**: Minute-level 4DGS reconstruction from monocular video
- **Source**: Baidu Search

### ProDyG
- **Paper**: ProDyG: Progressive Dynamic 3DGS from Monocular Video
- **ArXiv**: 2509.17864
- **Venue**: NeurIPS 2025
- **Core**: Progressive monocular video dynamic 3DGS reconstruction
- **Key Innovation**: Static-dynamic decoupling + Motion Scaffolds; online SLAM-level pose tracking
- **Source**: Baidu Search

### WorldTree
- **Paper**: WorldTree: Monocular Video 4D Reconstruction via Spatiotemporal Tree Encoding
- **Authors**: Beihang University
- **Venue**: ICLR 2026
- **Core**: Spatiotemporal tree chain encoding for 4D dynamic world reconstruction
- **Key Innovation**: Decouples global/local motion in tree structure
- **Source**: Baidu Search

### PhysGM
- **Paper**: PhysGM: Single Image to 4D Physically-Realistic Video
- **Authors**: Beijing Institute of Technology & Li Auto
- **Venue**: CVPR 2026
- **Core**: Single image to 4D physically-realistic video via DPO-introduced physics simulation
- **Key Innovation**: End-to-end 1-minute inference; DPO for physics-aware generation
- **Source**: Baidu Search

### UAV4D
- **Paper**: UAV4D: Dynamic Neural Rendering of Human-Centric UAV Imagery using Gaussian Splatting
- **ArXiv**: 2506.05011
- **Core**: Dynamic neural rendering for UAV-centric human imagery
- **Source**: Eurographics

### AnimateAnyMesh++
- **Paper**: AnimateAnyMesh++: Flexible 4D Foundation Model for Text-Driven Mesh Animation
- **ArXiv**: 2604.26917
- **Core**: Feed-forward text-driven animation for arbitrary 3D meshes
- **Key Innovation**: Extends DyMesh-XL dataset from 60K to 300K identities; variable-length sequence generation
- **Source**: arXiv

---

## 8. Language / Semantic / Segmentation

### FHGS (Feature-Homogenized Gaussian Splatting)
- **Paper**: FHGS: Feature-Homogenized Gaussian Splatting
- **Venue**: NeurIPS 2025
- **Core**: Homogenizes CLIP/SAM 2D semantics in 3D for isotropic distribution
- **Key Innovation**: Provides stable feature space for semantic mapping, stylization, and interaction
- **Source**: Baidu Search

### Co-Adaptation Regularization (Sparse-View 3DGS)
- **Paper**: Quantifying and Alleviating Co-Adaptation in Sparse-View 3DGS
- **Authors**: Tsinghua / HKUST / Huawei Noah's Ark / HIT
- **Venue**: NeurIPS 2025
- **Core**: Quantifies and eliminates co-adaptation between depth estimation and color prediction in sparse-view 3DGS
- **Key Innovation**: Novel regularization removes floating artifacts and color noise
- **Source**: Baidu Search

---

## 9. Editing & Manipulation

### Difix3D+
- **Paper**: Difix3D+: Single-Step Diffusion Inpainting for 3D Rendering
- **Authors**: NVIDIA et al.
- **Venue**: CVPR 2025 (Award Candidate)
- **Core**: Single-step diffusion model for image inpainting on NeRF/3DGS rendered novel views
- **Key Innovation**: Eliminates novel view artifacts from NeRF/3DGS rendering
- **Source**: CVF / Baidu Search

### Painting with 3D Gaussian Splat Brushes
- **Paper**: Painting with 3D Gaussian Splat Brushes
- **Venue**: SIGGRAPH 2025
- **Core**: First 3D Gaussian painting tool with real-world textures and geometry
- **Key Innovation**: Stamp-based painting, smart seam repair, artistic parameter control
- **Source**: SIGGRAPH 2025

### VR-Doh: Hands-on 3D Modeling in VR
- **Paper**: VR-Doh: Hands-on 3D Modeling in Virtual Reality
- **Venue**: SIGGRAPH 2025
- **Core**: VR immersive 3D modeling with custom MPM simulation for hand interaction
- **Key Innovation**: Enhanced 3D Gaussian rendering for VR; elastic-plastic sculpting and editing
- **Source**: SIGGRAPH 2025

### KaRF (KAN Radiance Field)
- **Paper**: KaRF: Weakly-Supervised KAN Radiance Field for Local Recoloring
- **Venue**: NeurIPS 2025
- **Core**: KAN-based radiance field for weakly-supervised local 3D recoloring
- **Key Innovation**: Residual adaptive gating + palette loss; multi-view consistent 3D editing
- **Source**: Baidu Search

---

## 10. Material, Relighting & Appearance

### TransparentGS
- **Paper**: TransparentGS: Fast Inverse Rendering of Transparent Objects with Gaussians
- **Venue**: SIGGRAPH 2025
- **Core**: Fast inverse rendering pipeline for transparent objects using 3DGS
- **Key Innovation**: Supports refraction and inter-reflection; first <1-hour transparent object inverse rendering with real-time novel view synthesis
- **Source**: SIGGRAPH 2025

### Relightable Full-Body Gaussian Codec Avatars
- **Paper**: Relightable Full-Body Gaussian Codec Avatars
- **Venue**: SIGGRAPH 2025
- **Core**: Relightable full-body avatar with learnable regional harmonics
- **Key Innovation**: Physics-based shadow network for self-occlusion shadows; deferred shading for specular
- **Source**: SIGGRAPH 2025

### Physically Controllable Relighting of Photographs
- **Paper**: Physically Controllable Relighting of Photographs
- **Venue**: SIGGRAPH 2025
- **Core**: Self-supervised differentiable rendering for photograph relighting
- **Key Innovation**: Neural renderer outputs high-fidelity relit images in PBR environments
- **Source**: SIGGRAPH 2025

### Generative Detail Enhancement for PBR Materials
- **Paper**: Generative Detail Enhancement for Physically Based Materials
- **Venue**: SIGGRAPH 2025
- **Core**: Diffusion model + inverse rendering for PBR material detail enhancement
- **Key Innovation**: Outputs standard PBR texture maps with multi-view consistency; integrates with traditional 3D software
- **Source**: SIGGRAPH 2025

### Neural Enhancement of Analytical Appearance Models
- **Paper**: Neural Enhancement of Analytical Appearance Models
- **Authors**: Xuanzhe Shen, Xiaohe Ma, Kun Zhou, Hongzhi Wu
- **ArXiv**: 2604.24081
- **Core**: Neural network enhancement of analytical appearance models
- **Key Innovation**: Bridges analytical and learned appearance representations
- **Source**: arXiv cs.GR

### 8DNA (8D Neural Asset Light Transport)
- **Paper**: 8DNA: 8D Neural Asset Light Transport by Distribution Learning
- **ArXiv**: 2604.25129
- **Core**: 8D neural asset lifecycle light transport via distribution learning
- **Key Innovation**: Neural appearance modeling for advanced rendering; handles complex light transport
- **Source**: arXiv cs.GR

### NExF (Neural Exposure Fields)
- **Paper**: NExF: Neural Exposure Fields
- **Authors**: Google
- **Venue**: NeurIPS 2025
- **Core**: Explicitly models exposure variation in NeRF/3DGS
- **Key Innovation**: Solves over/under-exposure in real lighting conditions
- **Source**: Baidu Search

### Learning Sparse BRDF Measurement Samples
- **Paper**: Learning Sparse BRDF Measurement Samples from Image
- **ArXiv**: 2604.26740
- **Core**: Learns sparse BRDF measurement samples from images for appearance modeling
- **Source**: arXiv cs.CV+cs.GR

### Comprehensive Neural Materials
- **Paper**: Towards Comprehensive Neural Materials: Dynamic Structure-Preserving Synthesis with Accurate Silhouette
- **Venue**: SIGGRAPH 2025
- **Core**: Comprehensive neural material representation
- **Key Innovation**: Unified optimization of quality/performance/synthesis/parallax silhouette
- **Source**: SIGGRAPH 2025

---

## 11. Human & Avatar

### Splat4D
- See Section 7 (Dynamic Scene & 4D Methods)

### SketchFaceGS
- Already in 3dgs-methods-overview.md (Editing Methods)

---

## 12. Large-Scale & Autonomous Driving

### RE-UrbanGS
- **Paper**: RE-UrbanGS: Robust and Efficient Urban 3D Gaussian Splatting
- **Venue**: ICCV 2025
- **Core**: City-level robust and efficient 3DGS reconstruction
- **Key Innovation**: Balances training efficiency and rendering quality for urban scenes
- **Source**: CVF / MrNeRF

### UrbanGS
- **Paper**: UrbanGS: City-Scale Large-Scale 3DGS Reconstruction
- **Venue**: ICLR 2026
- **Core**: D-Normal regularization + spatially adaptive Gaussian pruning + partitioning strategy
- **Key Innovation**: SOTA on rendering/geometry/memory simultaneously for city-scale scenes
- **Source**: Baidu Search

### RAD
- **Paper**: RAD: End-to-End Reinforcement Learning Training via 3DGS Digital Twins
- **Venue**: NeurIPS 2025
- **Core**: Large-scale 3DGS digital twin for end-to-end RL autonomous driving training
- **Source**: Baidu Search

### 2.5D-GS
- **Paper**: 2.5D-GS: Sparse-view Geometry-aware Gaussian Splatting via Depth and Normal Clues
- **Venue**: Frontiers of Computer Science, 2026
- **Core**: Sparse-view geometry-aware GS using depth and normal priors
- **Source**: Eurographics

---

## 13. SLAM & Exploration

### SplatLoc
- **Paper**: SplatLoc: 3DGS-based Visual Localization for AR
- **Authors**: ZJU
- **Venue**: EGSR 2025
- **Core**: Visual localization for AR using 3DGS representation
- **Source**: Eurographics

### NeRF-based Safe Navigation
- **Paper**: Safe Navigation using Neural Radiance Fields via Reachable Sets
- **ArXiv**: 2604.26899
- **Core**: Uses NeRF for obstacle/ego vehicle volumetric representation + reachable sets for safe path planning
- **Source**: arXiv

---

## 14. Generation (Text/Image-to-3D)

### CAST (Component-Aligned Scene Reconstruction) - SIGGRAPH 2025 Best Paper
- **Paper**: CAST: Component-Aligned 3D Scene Reconstruction from an RGB Image
- **Authors**: Kaixin Yao et al. (SJTU)
- **ArXiv**: 2502.12894
- **Core**: Single RGB image → high-quality 3D scene reconstruction
- **Key Innovation**: Open-vocabulary reconstruction, occlusion-aware object generation, physics-consistent optimization
- **Source**: SIGGRAPH 2025 / arXiv

### DiffPBR
- **Paper**: DiffPBR: Spatial-Aware Residual Diffusion for Point Cloud Rendering
- **Venue**: ICLR 2026
- **Core**: Spatial-aware residual diffusion for cross-scene point cloud rendering
- **Key Innovation**: New paradigm for point cloud rendering via diffusion
- **Source**: Baidu Search

### PhysX-3D / PhysXGen
- **Paper**: PhysX-3D: Physics-First 3D Asset Generation
- **ArXiv**: 2507.12465
- **Venue**: NeurIPS 2025
- **Core**: Physics-first 3D asset generation with 5D physics annotation dataset
- **Key Innovation**: PhysXGen dual-branch jointly models geometry and physics
- **Source**: Baidu Search

### PartCrafter
- **Paper**: PartCrafter: Single Image to Decomposable Multi-Part 3D Mesh
- **ArXiv**: 2506.05573
- **Venue**: NeurIPS 2025
- **Core**: Single image → decomposable multi-part 3D mesh
- **Key Innovation**: Composable latent space + hierarchical attention; part-level editable generation
- **Source**: Baidu Search

### ProcFunc
- **Paper**: ProcFunc: Function-Oriented Abstractions for Procedural 3D Generation
- **ArXiv**: 2604.26943
- **Core**: Blender-based procedural 3D generation Python library
- **Key Innovation**: Semantic component composition; VLM-assisted code editing for large-scale training data
- **Source**: arXiv

### DiET-GS
- **Paper**: DiET-GS: Diffusion Prior + Event Stream Assisted Motion Deblurring 3DGS
- **Venue**: CVPR 2025
- **Core**: Uses diffusion prior and event stream for motion deblurring in 3DGS
- **Source**: Baidu Search

---

## 15. Robustness & Degradation

### Casual3DHDR
- **Paper**: Casual3DHDR: Casual Video to Cinematic 3D HDR Reconstruction
- **Venue**: ACM MM 2025
- **Core**: Phone-captured video → cinematic 3D HDR reconstruction
- **Key Innovation**: Breaks fixed camera/known exposure limitations
- **Source**: Baidu Search

---

## 16. Training Acceleration & Optimization

### Speedy-Splat
- See Section 5 (Feed-Forward)

### Proxy-GS
- Already in 3dgs-methods-overview.md (Training Acceleration)

### Faster-GS
- Already in 3dgs-methods-overview.md (Training Acceleration)

---

## 17. Simulation & Robotics

### GS-Playground
- Already in 3dgs-methods-overview.md (Simulation & Robotics)

---

## 18. Cross-Domain & Novel Applications

### GS-DOT
- Already in 3dgs-methods-overview.md (Cross-Domain Applications)

### BiSplat-WRF
- Already in 3dgs-methods-overview.md (Cross-Domain Applications)

### LightLab
- **Paper**: LightLab: Controlling Light Sources in Images with Diffusion Models
- **Venue**: SIGGRAPH 2025
- **Core**: Explicit parameterization and control of light sources in images via diffusion
- **Key Innovation**: Supports brightness/color temperature/ambient light/tone mapping editing
- **Source**: SIGGRAPH 2025

### SAND (Spatially Adaptive Network Depth)
- **Paper**: SAND: Spatially Adaptive Network Depth for Fast Sampling of Neural Implicit Surfaces
- **ArXiv**: 2604.25936
- **Core**: Spatially adaptive network depth accelerates neural implicit surface sampling
- **Source**: arXiv cs.GR

### Voxel Deformation-Aware Neural Intersection Function
- **Paper**: Voxel Deformation-Aware Neural Intersection Function
- **ArXiv**: 2604.24666
- **Core**: Voxel deformation-aware neural intersection for deforming object implicit surface modeling
- **Source**: arXiv cs.GR

### Power Foam
- **Paper**: Power Foam: Unifying Real-Time Differentiable Ray Tracing and Rasterization
- **ArXiv**: 2604.24994
- **Core**: Unifies real-time differentiable ray tracing and rasterization
- **Key Innovation**: Hybrid pipeline for differentiable rendering infrastructure
- **Source**: arXiv cs.GR

### Moment Bounds Are Differentiable
- **Paper**: Moment Bounds Are Differentiable: Efficiently Approximating Measures in Inverse Rendering
- **Venue**: SIGGRAPH 2025 (Honorable Mention)
- **Core**: Differentiable moment bounds for efficient inverse rendering measure approximation
- **Source**: SIGGRAPH 2025

### Vector-Valued Monte Carlo Integration
- **Paper**: Vector-Valued Monte Carlo Integration Using Ratio Control Variates
- **Venue**: SIGGRAPH 2025 (Best Paper)
- **Core**: Ratio control variates for vector-valued Monte Carlo integration variance reduction
- **Key Innovation**: Breaks scalar-value assumption; significant variance reduction
- **Source**: SIGGRAPH 2025

### RenderFormer
- **Paper**: RenderFormer (Microsoft Research, 2025)
- **Venue**: EGSR 2025
- **Core**: ML model learns universal rendering pipeline without ray tracing or rasterization
- **Key Innovation**: Supports global illumination via pure learned rendering
- **Source**: Eurographics

### World2VLM
- **Paper**: World2VLM: Distilling World Model Imagination into VLMs
- **ArXiv**: 2604.26934
- **Core**: Distills world model future-view synthesis into VLMs for spatial reasoning
- **Source**: arXiv

### 3D Asset Generation Survey
- **Paper**: From Visual Synthesis to Interactive Worlds: Toward Production-Ready 3D Asset Generation
- **ArXiv**: 2604.23629
- **Core**: Survey of 3D asset generation from visual synthesis to interactive worlds
- **Source**: arXiv cs.GR

### NeuralTexture Splatting
- **Paper**: NeuralTexture Splatting
- **Venue**: SIGGRAPH Asia 2025
- **Core**: 3DGS texture representation optimization and engineering
- **Source**: SIGGRAPH Asia 2025

---

## 19. Surveys & Benchmarks

### Don't Splat Your Gaussians
- **Paper**: Don't Splat your Gaussians: Volumetric Ray-Traced Primitives for Modeling and Rendering Scattering and Emissive Media
- **Authors**: Jorge Condor, et al. (Meta)
- **Code**: https://github.com/facebookresearch/volumetric_primitives
- **Core**: Formalizes ray-tracing of volume kernel mixtures (Gaussian or otherwise) for physically-based path tracing
- **Source**: MrNeRF

### Egocentric Dynamic 3DGS Evaluation
- Already in 3dgs-methods-overview.md (Egocentric & Benchmark Methods)

---

## 20. NeRF Advances (Non-GS)

### Safe Navigation using NeRF via Reachable Sets
- See Section 13 (SLAM & Exploration)

### SAND
- See Section 18 (Cross-Domain)

---

## 21. 3D Generation & Understanding

### Transformer-based Neural Rendering of Triangle Meshes
- **Paper**: Transformer-based Neural Rendering of Triangle Meshes with Global Illumination
- **Venue**: SIGGRAPH Asia 2025
- **Core**: Transformer directly performs neural rendering of triangle meshes with global illumination
- **Source**: SIGGRAPH Asia 2025

### 3DPR (3D Portrait Relight)
- **Paper**: 3DPR: 3D Portrait Relighting
- **Authors**: MPI / Google et al.
- **Venue**: SIGGRAPH Asia 2025
- **Core**: Single portrait photo to 3D relighting via generation prior + OLAT
- **Source**: SIGGRAPH Asia 2025

### Lifting the Winding Number
- **Paper**: Lifting the Winding Number: Precise Discontinuities in Neural Fields for Physics Simulation
- **Venue**: SIGGRAPH 2025 (Honorable Mention)
- **Core**: Precise discontinuities in neural fields for physics simulation
- **Source**: SIGGRAPH 2025

### Variational Surface Reconstruction Using Natural Neighbors
- **Paper**: Variational Surface Reconstruction Using Natural Neighbors
- **Venue**: SIGGRAPH 2025 (Honorable Mention)
- **Source**: SIGGRAPH 2025

---

## Statistics Summary

| Category | New Papers | Key Venues |
|----------|-----------|------------|
| Foundation & Core 3DGS | 10 | CVPR, ICCV, SIGGRAPH, CVPR 2026 |
| Antialiasing & Quality | 5 | Eurographics, NeurIPS, ICLR |
| Surface & Geometry | 8 | SIGGRAPH, NeurIPS, ICLR, arXiv |
| CAD/Mesh/Hybrid | 2 | NeurIPS, arXiv |
| Feed-Forward | 8 | CVPR, ICCV, CVPR 2026 |
| Compression & Efficiency | 4 | NeurIPS, SIGGRAPH Asia |
| Dynamic/4D | 8 | SIGGRAPH, ICCV, CVPR, NeurIPS, ICLR |
| Language/Semantic | 2 | NeurIPS |
| Editing & Manipulation | 4 | CVPR, SIGGRAPH, NeurIPS |
| Material/Relighting | 9 | SIGGRAPH, NeurIPS, arXiv |
| Large-Scale/AD | 4 | ICCV, ICLR, NeurIPS |
| SLAM & Exploration | 2 | EGSR, arXiv |
| Generation | 7 | SIGGRAPH, ICLR, NeurIPS, arXiv |
| Robustness | 1 | ACM MM |
| Cross-Domain | 12 | SIGGRAPH, EGSR, arXiv |
| Surveys | 1 | Meta |
| NeRF Advances | 2 | arXiv |
| 3D Generation | 3 | SIGGRAPH Asia |
| **Total** | **~92** | |

## Venue Distribution (New Papers Only)

| Venue | Count |
|-------|-------|
| CVPR 2025 | 4 |
| CVPR 2026 | 4 |
| ICCV 2025 | 5 |
| SIGGRAPH 2025 | 14 |
| SIGGRAPH 2026 | 2 |
| SIGGRAPH Asia 2025 | 3 |
| Eurographics/EGSR 2025 | 3 |
| NeurIPS 2025 | 15 |
| ICLR 2026 | 7 |
| ACM MM 2025 | 1 |
| arXiv (preprint) | ~30 |
| **Total** | **~92** |

## Data Sources Used

| Source | URL | Papers Found |
|--------|-----|-------------|
| CVF CVPR 2025 | https://openaccess.thecvf.com/CVPR2025 | ~158 (92 curated) |
| CVF ICCV 2025 | https://openaccess.thecvf.com/ICCV2025 | ~111 (28 curated) |
| CVF 3DV 2025/2026 | https://openaccess.thecvf.com/3DV2026 | ~32 |
| arXiv cs.CV recent | https://arxiv.org/list/cs.CV/recent | 19 |
| arXiv cs.GR recent | https://arxiv.org/list/cs.GR/recent | (included above) |
| MrNeRF awesome-3DGS | https://github.com/MrNeRF/awesome-3d-gaussian-splatting | 498 (YAML DB) |
| awesome-NeRF-3DGS-SLAM | https://github.com/awesome-NeRF-and-3DGS-SLAM | 415 (94 GS-related) |
| GaussianSplatting-Papers | https://github.com/limacv/GaussianSplatting-Papers | 404 (repo archived) |
| SIGGRAPH 2025 | https://s2025.siggraph.org/ | 17 curated |
| Eurographics DL | https://diglib.eg.org/ | 3 |
| Baidu Scholar | Multi-query search | 40 new papers |
