# 3DGS Methods Overview

> This file is the master index for all 184+ 3D Gaussian Splatting methods tracked in this knowledge base.
> Detailed entries (full metadata, key innovations, code links) are split across three companion files below.
> Performance comparison table at the end of this file.

## Contents
- [methods-core.md](methods-core.md) — Foundations, Surface/Geometry, CAD/Mesh, Text-to-3D, Feed-Forward, Compression, Dynamic Scenes
- [methods-semantic-editing.md](methods-semantic-editing.md) — Language/Semantic, Image Representation, Few-Shot, Large-Scale, Editing, Material/Relighting, Human/Avatar
- [methods-systems-apps.md](methods-systems-apps.md) — Robustness, Autonomous Driving, SLAM, Training/Optimization, Simulation/Robotics, Cross-Domain, Restoration

---

## 1. Foundation Methods
- **3DGS** [arXiv:2308.04079](https://arxiv.org/abs/2308.04079) — Anisotropic 3D Gaussians with tile-based differentiable rasterization
- **Mip-Splatting** [arXiv:2311.16493](https://arxiv.org/abs/2311.16493) — Anti-aliased 3DGS with 3D smoothing + 2D Mip filter
- **Softmax-GS** [arXiv:2604.27437](https://arxiv.org/abs/2604.27437) — Learnable softmax-based competition replacing α-compositing

> Full details in [methods-core.md](methods-core.md#foundation-methods)

## 2. Surface & Geometry Methods
- **2DGS** [arXiv:2403.17888](https://arxiv.org/abs/2403.17888) — Oriented 2D disks for geometrically accurate radiance fields
- **SuGaR** [arXiv:2312.13253](https://arxiv.org/abs/2312.13253) — Surface-aligned Gaussians for mesh extraction via TSDF + Marching Cubes
- **PGSR** [arXiv:2406.06521](https://arxiv.org/abs/2406.06521) — Planar-based regularizer for high-fidelity surface reconstruction
- **PAGaS** [arXiv:2604.22129](https://arxiv.org/abs/2604.22129) — Pixel-aligned 1DoF Gaussians for depth refinement
- **2D-SuGaR** [arXiv:2605.00569](https://arxiv.org/abs/2605.00569) — 2DGS enhanced with monocular depth/normal priors
- **LeanGaussian** — Extreme compression from single RGB image for efficient large-scale rendering
- **NegGS** [arXiv:2405.14786](https://arxiv.org/abs/2405.14786) — Negative color values for ring/crescent/non-convex structures
- **Neural Gabor Splatting** [arXiv:2604.15941](https://arxiv.org/abs/2604.15941) — Neural Gabor augmentation per Gaussian + frequency-aware densification for high-freq surfaces (CVPR 2026)
- **PointSplat** [arXiv:2604.09903](https://arxiv.org/abs/2604.09903) — Geometry-driven pruning + Transformer refinement for efficient 3DGS
- **GLINT** [arXiv:2603.26181](https://arxiv.org/abs/2603.26181) — Scene-scale transparency via decomposed Gaussian radiance transport for glass
- **P2M++** [arXiv:2605.00429](https://arxiv.org/abs/2605.00429) — Enhanced solver for point-to-mesh distance queries
- **SAND** — Spatially adaptive network depth for efficient neural implicit surface sampling (SIGGRAPH 2026 TOG)

> Full details in [methods-core.md](methods-core.md#surface--geometry-methods)

## 3. CAD / Mesh / Hybrid Methods
- **SuGaR** [arXiv:2312.13253](https://arxiv.org/abs/2312.13253) — Joint Gaussians + mesh optimization with TSDF extraction
- **2DGS** [arXiv:2403.17888](https://arxiv.org/abs/2403.17888) — 2D disks on surfaces enabling direct mesh extraction via Poisson reconstruction
- **MaGS** — Mesh-adsorbed Gaussians; deform mesh → Gaussians follow
- **UniMGS** — Single-pass rasterization for both mesh and Gaussians simultaneously
- **Vol3DGS** — Physically accurate volume-consistent rendering resolving splatting/volume inconsistency
- **BrepGaussian** [arXiv:2602.21105](https://arxiv.org/abs/2602.21105) — 3DGS + B-rep CAD reconstruction to parametric STEP models
- **CADFS** [arXiv:2605.01925](https://arxiv.org/abs/2605.01925) — Large-scale CAD program dataset + LLM-assisted CAD understanding (CVPR 2026)

> Full details in [methods-core.md](methods-core.md#cad--mesh--hybrid-methods)

## 4. Generation / Text-to-3D
- **DreamGaussian** [arXiv:2309.16653](https://arxiv.org/abs/2309.16653) — SDS text-to-3D with 3DGS prior for orders-of-magnitude speedup
- **AniGen** [GitHub](https://github.com/VAST-AI-Research/AniGen) — Unified S³ Fields for single-image animatable 3D asset generation with skeleton + skinning (SIGGRAPH 2026 TOG)

> Full details in [methods-core.md](methods-core.md#generation--text-to-3d)

## 5. Feed-Forward Methods
- **GlobalSplat** [arXiv:2604.15284](https://arxiv.org/abs/2604.15284) — Global latent tokens → 16K Gaussians in 78ms single forward pass
- **TRiGS** [arXiv:2604.00538](https://arxiv.org/abs/2604.00538) — SE(3) + Bezier residuals for scalable 4DGS
- **Reliev3R** [arXiv:2604.00548](https://arxiv.org/abs/2604.00548) — Reduces dependency on dense multi-view geometric annotations
- **ARGS** [arXiv:2604.00494](https://arxiv.org/abs/2604.00494) — Auto-regressive O(log n) multi-scale 3D generation
- **WildSplatter** [arXiv:2604.21182](https://arxiv.org/abs/2604.21182) — Unconstrained images with appearance embeddings, <1s reconstruction
- **SparseSplat** — Entropy-based adaptive density, SOTA with 22% of Gaussians (150K vs 688K)
- **Free Geometry** [arXiv:2604.14048](https://arxiv.org/abs/2604.14048) — Self-evolving feed-forward models via LoRA without 3D GT
- **IDESplat** [arXiv:2601.03824](https://arxiv.org/abs/2601.03824) — Iterative depth probability with epipolar attention
- **MVSplat** [arXiv:2403.14627](https://arxiv.org/abs/2403.14627) — Cost-volume-based 3DGS from 3 sparse views
- **GS-LRM** [arXiv:2404.19702](https://arxiv.org/abs/2404.19702) — 1B-parameter transformer with zero-shot generalization
- **DepthSplat** [arXiv:2410.13862](https://arxiv.org/abs/2410.13862) — Stereo-guided depth regularization for feed-forward 3DGS
- **InstantSplat** [arXiv:2403.20309](https://arxiv.org/abs/2403.20309) — Pose-free sparse-view reconstruction in ~40 seconds
- **AnySplat** [arXiv:2505.23716](https://arxiv.org/abs/2505.23716) — In-the-wild feed-forward with appearance/lighting variation handling

> Full details in [methods-core.md](methods-core.md#feed-forward-methods)

## 6. Compression Methods
- **Compact-3DGS** — Vector quantization + pruning, ~10-15x compression
- **LightGS** — Distillation-based, ~15-20x compression
- **MobileGS** — Extreme 50-100x compression for mobile deployment
- **Embedded-3DGS** — Neural architecture search, ~10x compression
- **HAC** [arXiv:2403.14530](https://arxiv.org/abs/2403.14530) — Hash-grid context modeling, ~100x compression
- **OT-UVGS** [arXiv:2604.19127](https://arxiv.org/abs/2604.19127) — Optimal-transport UV mapping as capacity allocation
- **Gaussians on a Diet** [arXiv:2604.20046](https://arxiv.org/abs/2604.20046) — Memory-bounded training, 80% lower peak memory
- **GS-SCNet** [arXiv:2604.25330](https://arxiv.org/abs/2604.25330) — Generalizable 3DGS + semantic coding for immersive video
- **NanoGS** [arXiv:2603.16103](https://arxiv.org/abs/2603.16103) — Training-free simplification via local pairwise merging
- **MesonGS++** [arXiv:2604.26799](https://arxiv.org/abs/2604.26799) — Post-training codec with 34x compression + ILP hyperparameter search
- **GETA-3DGS** [arXiv:2605.02086](https://arxiv.org/abs/2605.02086) — End-to-end automatic joint pruning + quantization

> Full details in [methods-core.md](methods-core.md#compression-methods)

## 7. Dynamic Scene Methods
- **4DGS** [arXiv:2310.08528](https://arxiv.org/abs/2310.08528) — 4D anisotropic Gaussians (3D + time) with regularized deformation
- **Dynamic 3D Gaussians** [arXiv:2309.13114](https://arxiv.org/abs/2309.13114) — Per-point deformation network for monocular dynamic scenes
- **SC-GS** — Spatial-temporal compression for dynamic Gaussians
- **RobustSplat** — Decouples densification from dynamics for transient-free 3DGS
- **Color-Encoded Illumination** [arXiv:2604.26920](https://arxiv.org/abs/2604.26920) — High-speed volumetric reconstruction via color-coded illumination
- **TRiGS** [arXiv:2604.00538](https://arxiv.org/abs/2604.00538) — See Feed-Forward for details
- **HDR-NSFF** [arXiv:2603.08313](https://arxiv.org/abs/2603.08313) — Dynamic HDR radiance fields from alternating-exposure video
- **FreeTimeGS++** [arXiv:2605.03337](https://arxiv.org/abs/2605.03337) — Principled analysis + gated marginalization for 4DGS stability
- **ClipGStream** [arXiv:2604.13746](https://arxiv.org/abs/2604.13746) — Clip-stream any-length any-motion multi-view dynamic scene reconstruction (CVPR 2026)

> Full details in [methods-core.md](methods-core.md#dynamic-scene-methods)

## 8. Language / Semantic
- **LangSplat** [arXiv:2312.16084](https://arxiv.org/abs/2312.16084) — CLIP features stored per-Gaussian for open-vocabulary 3D queries
- **Feature 3DGS** [arXiv:2312.03203](https://arxiv.org/abs/2312.03203) — Distilled DINO/SAM features for 3D segmentation/detection
- **Semantic Foam** [arXiv:2604.26262](https://arxiv.org/abs/2604.26262) — Volumetric Voronoi mesh for spatial + semantic decomposition
- **GLMap** [arXiv:2605.01736](https://arxiv.org/abs/2605.01736) — Multi-scale Gaussian-Language map for zero-shot navigation
- **NG-GS** [arXiv:2604.14706](https://arxiv.org/abs/2604.14706) — NeRF-guided Gaussian-level semantic assignment

> Full details in [methods-semantic-editing.md](methods-semantic-editing.md#language--semantic)

## 9. Image Representation
- **GaussianImage** [arXiv:2403.08551](https://arxiv.org/abs/2403.08551) — 2D Gaussian image codec at 1000+ FPS

> Full details in [methods-semantic-editing.md](methods-semantic-editing.md#image-representation)

## 10. Few-Shot / Sparse-View
- **Pi-GS** [arXiv:2602.03327](https://arxiv.org/abs/2602.03327) — Reference-free π³ initialization for sparse-view 3DGS
- **FSGS** [arXiv:2312.00451](https://arxiv.org/abs/2312.00451) — SRF geometric prior + 3DGS for few-shot view synthesis
- **HeroGS** — Hierarchical image→region→pixel guidance for sparse-view robustness
- **GSCompleter** [arXiv:2604.20155](https://arxiv.org/abs/2604.20155) — Distillation-free sparse-view completion via Stereo-Anchor

> Full details in [methods-semantic-editing.md](methods-semantic-editing.md#few-shot--sparse-view)

## 11. Large-Scale Methods
- **Scaffold-GS** [arXiv:2312.13209](https://arxiv.org/abs/2312.13209) — Anchor-based structure for efficient large-scale representation
- **Scaffold-GS+** — Progressive training for better city-scale quality
- **CityGaussian** [arXiv:2401.02379](https://arxiv.org/abs/2401.02379) — Hierarchical LOD for city-scale real-time rendering
- **Octree-GS** — Octree spatial partitioning + LOD management
- **Street Gaussians** [arXiv:2401.01339](https://arxiv.org/abs/2401.01339) — Static/dynamic decomposition for urban street scenes

> Full details in [methods-semantic-editing.md](methods-semantic-editing.md#large-scale-methods)

## 12. Editing Methods
- **GaussianEditor** — CLIP-guided text/geometry-driven editing
- **GeoGaussian** — Mesh-prior-guided Gaussian manipulation
- **Frosting** — Decoupled geometry/appearance editing
- **SketchFaceGS** [arXiv:2604.19202](https://arxiv.org/abs/2604.19202) — Sketch-driven face editing via Transformer UV prediction
- **FluSplat** [arXiv:2604.20038](https://arxiv.org/abs/2604.20038) — Feed-forward sparse-view editing without per-scene optimization
- **TransSplat** [arXiv:2604.19571](https://arxiv.org/abs/2604.19571) — Language-driven editing as unbalanced semantic transport
- **GOR-IS** [arXiv:2605.00498](https://arxiv.org/abs/2605.00498) — Physically consistent object removal via intrinsic decomposition
- **SVGS** [arXiv:2603.28126](https://arxiv.org/abs/2603.28126) — Single-view text-driven 3D editing with sparse 3DGS
- **DiffSoup** [arXiv:2603.27151](https://arxiv.org/abs/2603.27151) — Triangle soup as extreme radiance field simplification
- **FTSplat** [arXiv:2603.05932](https://arxiv.org/abs/2603.05932) — Feed-forward triangle primitive generation
- **IRIS** [arXiv:2603.15368](https://arxiv.org/abs/2603.15368) — Hybrid proxy with analytical ray-primitive intersection
- **ObjectMorpher** [arXiv:2603.28152](https://arxiv.org/abs/2603.28152) — Deformable 3DGS for 3D-aware interactive image editing (CVPR 2026)

> Full details in [methods-semantic-editing.md](methods-semantic-editing.md#editing-methods)

## 13. Material & Relighting Methods
- **GRF** — Material decomposition + relighting in Gaussian space
- **GS-IR** — Inverse rendering: Gaussians → geometry + BRDF + lighting
- **GaussianShader** [arXiv:2311.17977](https://arxiv.org/abs/2311.17977) — Shading functions for reflective/refractive surfaces
- **Instant Colorization** [arXiv:2604.17155](https://arxiv.org/abs/2604.17155) — Visibility-weighted least squares for per-Gaussian colorization
- **VIRGi** [arXiv:2603.02986](https://arxiv.org/abs/2603.02986) — View-dependent instant recoloring with single edited image
- **SSD-GS** [arXiv:2604.13333](https://arxiv.org/abs/2604.13333) — Scattering and shadow decomposition for relightable 3DGS (ICLR 2026)
- **LumiMotion** [arXiv:2604.10994](https://arxiv.org/abs/2604.10994) — Improving Gaussian relighting with scene dynamics (CVPR 2026)

> Full details in [methods-semantic-editing.md](methods-semantic-editing.md#material--relighting-methods)

## 14. Human & Avatar Methods
- **GaussianAvatar** — Pose-driven human body Gaussian representation
- **GAS** — Compression + caching for real-time avatar rendering
- **SplattingAvatar** — Expression-conditioned Gaussian deformation
- **Generalizable Human GS** [arXiv:2604.25466](https://arxiv.org/abs/2604.25466) — Cross-view attention for sparse-view human splatting
- **High-Fidelity Human GS** [arXiv:2604.21714](https://arxiv.org/abs/2604.21714) — SMPL-X geometric priors + region-aware initialization
- **HumanSplatHMR** [arXiv:2605.02784](https://arxiv.org/abs/2605.02784) — Joint pose refinement + Gaussian avatar optimization
- **D-Rex** [arXiv:2604.27871](https://arxiv.org/abs/2604.27871) — Diffusion post-process relighting for expressive avatars
- **Large-Scale HQ 3D Gaussian Head** [arXiv:2605.04035](https://arxiv.org/abs/2605.04035) — Multi-view large-scale high-fidelity 3D Gaussian head reconstruction
- **Mobile Avatar (Pruned Blendshapes)** [arXiv:2605.01854](https://arxiv.org/abs/2605.01854) — High-fidelity mobile avatars with pruned local blendshapes (CVPR 2026)
- **ProgressiveAvatars** — Progressive animatable 3D Gaussian avatar generation (SIGGRAPH 2026 TOG)

> Full details in [methods-semantic-editing.md](methods-semantic-editing.md#human--avatar-methods)

## 15. Robustness & Regularization
- **NRGS** [arXiv:2604.22439](https://arxiv.org/abs/2604.22439) — Neural regularization for semantic 3DGS
- **DualSplat** [arXiv:2604.21631](https://arxiv.org/abs/2604.21631) — Failure-to-Prior framework from reconstruction failures
- **EnerGS** [arXiv:2604.26238](https://arxiv.org/abs/2604.26238) — Energy-based soft geometric guidance from LiDAR/depth priors
- **WildGaussians** [arXiv:2407.08447](https://arxiv.org/abs/2407.08447) — Joint pose + 3DGS optimization from internet photos
- **MERID-GS** [arXiv:2604.24053](https://arxiv.org/abs/2604.24053) — Retinex-based illumination/reflectance decoupling for low-light
- **MarineSTD-GS** [arXiv:2604.23551](https://arxiv.org/abs/2604.23551) — Spatiotemporal underwater degradation modeling

> Full details in [methods-systems-apps.md](methods-systems-apps.md#robustness--regularization)

## 16. Autonomous Driving
- **Street-GS** — LiDAR-camera fusion + multi-view optimization
- **ADS-GS** — Static + dynamic decomposition for driving scenes
- **Asset Harvester** [arXiv:2604.18468](https://arxiv.org/abs/2604.18468) — AV log → simulation-ready 3D assets via SparseViewDiT
- **GSDrive** [arXiv:2604.28111](https://arxiv.org/abs/2604.28111) — 3DGS-based RL reward shaping for driving policy improvement
- **3DGS Safety Evaluation for AD** [arXiv:2605.01995](https://arxiv.org/abs/2605.01995) — Industrial-fidelity AD scene reconstruction evaluation
- **Nighttime AD GS** [arXiv:2602.13549](https://arxiv.org/abs/2602.13549) — PBR + BRDF for nighttime driving scene reconstruction
- **GaussianLSS** — BEV perception via Gaussian Splatting

> Full details in [methods-systems-apps.md](methods-systems-apps.md#autonomous-driving)

## 17. SLAM
- **Gaussian Splatting SLAM** [arXiv:2312.06741](https://arxiv.org/abs/2312.06741) — First real-time monocular 3DGS SLAM
- **CGS-SLAM** — Compact voxel-based 3DGS for dense visual SLAM
- **WildGS-SLAM** [arXiv:2504.03886](https://arxiv.org/abs/2504.03886) — Dynamic environment SLAM with uncertainty-aware mapping
- **S3PO-GS** — Global scale-consistent outdoor monocular 3DGS SLAM
- **Flow4DGS-SLAM** [arXiv:2604.22339](https://arxiv.org/abs/2604.22339) — Optical flow-guided 4DGS for SLAM
- **EvFlow-GS** [arXiv:2604.22183](https://arxiv.org/abs/2604.22183) — Event camera + optical flow for motion blur handling
- **MAGICIAN** [arXiv:2603.22650](https://arxiv.org/abs/2603.22650) — Active mapping with imagined Gaussians + beam search

> Full details in [methods-systems-apps.md](methods-systems-apps.md#slam)

## 18. Training & Optimization
- **Faster-GS** — Systematic benchmark separating engineering from algorithmic acceleration
- **Proxy-GS** — Lightweight proxy model for 2.5x speedup with no accuracy loss
- **Structure-Aware Densification** [arXiv:2604.28016](https://arxiv.org/abs/2604.28016) — Frequency-aware anisotropic split replacing heuristic clone/split
- **3DGS as MCMC** [arXiv:2404.09591](https://arxiv.org/abs/2404.09591) — Density control as MCMC sampling moves
- **LeGS** [arXiv:2605.00408](https://arxiv.org/abs/2605.00408) — RL-learnable density control replacing heuristic clone/split/prune
- **GEMM-GS** [arXiv:2604.02120](https://arxiv.org/abs/2604.02120) — GEMM-compatible blending for Tensor Core utilization, 1.42x speedup
- **Hybrid-Capture Two-View Training** [arXiv:2605.00052](https://arxiv.org/abs/2605.00052) — Two-view-per-step as dominant training lever
- **YOGO** [arXiv:2604.21400](https://arxiv.org/abs/2604.21400) — Budget-aware equilibrium for ultra-dense scene control
- **VkSplat** [arXiv:2605.00219](https://arxiv.org/abs/2605.00219) — Vulkan-based 3DGS training, 3.3x faster, 33% less VRAM

> Full details in [methods-systems-apps.md](methods-systems-apps.md#training--optimization)

## 19. Simulation & Robotics
- **GS-Playground** [arXiv:2604.25459](https://arxiv.org/abs/2604.25459) — Batch 3DGS + parallel physics at 10^4 FPS for robot learning
- **GS-Surrogate** [arXiv:2604.06358](https://arxiv.org/abs/2604.06358) — Deformable GS surrogate for ensemble simulation exploration
- **3DGS Demo Synthesis (IL)** [arXiv:2605.01232](https://arxiv.org/abs/2605.01232) — 3DGS-based demonstration generation for imitation learning
- **TAIL-Safe** [arXiv:2605.01195](https://arxiv.org/abs/2605.01195) — Safety monitoring for IL policies using 3DGS digital twin

> Full details in [methods-systems-apps.md](methods-systems-apps.md#simulation--robotics)

## 20. Cross-Domain Applications
- **GS-DOT** [arXiv:2604.23675](https://arxiv.org/abs/2604.23675) — Diffuse optical tomography via Gaussian Splatting
- **Habitat-GS** — 3DGS-rendered simulator for robot navigation training
- **BiSplat-WRF** [arXiv:2604.25945](https://arxiv.org/abs/2604.25945) — Gaussian Splatting for wireless radiance field reconstruction
- **FieryGS** [arXiv:2605.00177](https://arxiv.org/abs/2605.00177) — Physics-integrated combustion simulation + 3DGS rendering
- **SplAttN** [arXiv:2605.01466](https://arxiv.org/abs/2605.01466) — Gaussian soft splatting for point cloud completion
- **Fake3DGS** [arXiv:2604.27590](https://arxiv.org/abs/2604.27590) — Benchmark for 3D manipulation detection in neural rendering
- **SandSim** [arXiv:2604.27572](https://arxiv.org/abs/2604.27572) — Curve-guided GS for sand painting process reconstruction
- **RGS** [arXiv:2604.27552](https://arxiv.org/abs/2604.27552) — Residual wavelet-GS for ultra sparse-view CBCT reconstruction
- **RESPIRE** [arXiv:2604.28179](https://arxiv.org/abs/2604.28179) — CT-informed mesh-anchored GS for dynamic bronchoscopy
- **EmoTaG** [arXiv:2603.21332](https://arxiv.org/abs/2603.21332) — Few-shot emotion-aware talking head on Gaussian Splatting
- **3DTV** [arXiv:2604.11211](https://arxiv.org/abs/2604.11211) — Feedforward 3-camera interpolation at 40 FPS
- **Mobile Phone 3DGS Acquisition** [arXiv:2604.19216](https://arxiv.org/abs/2604.19216) — Object-centered on-device capture guidance
- **RDSplat** [arXiv:2512.06774](https://arxiv.org/abs/2512.06774) — Robust watermarking against diffusion editing
- **Egocentric Dynamic 3DGS Evaluation** [arXiv:2604.23803](https://arxiv.org/abs/2604.23803) — Egocentric video reconstruction evaluation
- **TwinPose** [GitHub](https://github.com/zgspose) — Multi-view 3D pose estimation via person-specific subspaces (SIGGRAPH 2026 TOG)

> Full details in [methods-systems-apps.md](methods-systems-apps.md#cross-domain-applications)

## 21. Robustness & Restoration
- **ArtifactWorld** [arXiv:2604.12251](https://arxiv.org/abs/2604.12251) — Video generation models for 3DGS artifact restoration at scale
- **FreeFix** [arXiv:2601.20857](https://arxiv.org/abs/2601.20857) — Fine-tuning-free diffusion guidance for extrapolated 3DGS
- **Luminance-GS++** [arXiv:2602.18322](https://arxiv.org/abs/2602.18322) — View-adaptive color/lightness correction for robust NVS
- **E2EGS** [arXiv:2603.14684](https://arxiv.org/abs/2603.14684) — Event-to-edge pose-free 3D reconstruction

> Full details in [methods-systems-apps.md](methods-systems-apps.md#robustness--restoration)

---

## Performance Comparison Reference

| Method | Mip-NeRF 360 PSNR | Speed (FPS) | Memory | Primitive |
|--------|-------------------|-------------|--------|-----------|
| 3DGS (original) | 25.2 | 100+ | ~1.5 GB | 3D anisotropic |
| Mip-Splatting | ~25.3 (~SSIM) | 60-80 | ~1.5 GB | 3D anisotropic + Mip filter |
| 2DGS | ~25.0 | 80+ | ~1.2 GB | 2D disk |
| PGSR | ~geometry | ~80 | ~1.8 GB | Planar-based 3DGS |
| Scaffold-GS | ~25.0 | 90+ | ~0.8 GB | Anchor+3D |
| NegGS | ~25.3 | 85+ | ~1.5 GB | Diff-Gaussian |
| Compact-3DGS | ~24.8 | 100+ | ~0.15 GB | Compressed |
| HAC | ~24.5 | Faster after decode | ~15 MB (100x) | Hash-grid context |
| MobileGS | ~23.5 | 200+ | ~15 MB | Extreme compressed |
| GlobalSplat | ~25.0* | ~13 (78ms) | ~4 MB | 16K Gaussians (feed-forward) |
| MVSplat | ~25.5* | Single-pass | ~500 MB | Cost-volume 3DGS |
| GS-LRM | ~25.8* | Single-pass | ~2 GB (1B params) | Transformer 3DGS |
| DepthSplat | ~25.6* | Single-pass | ~600 MB | Stereo-guided 3DGS |
| InstantSplat | ~25.0* | ~40s total | ~1.5 GB | Pose-free 3DGS |
| DreamGaussian | N/A (text-to-3D) | ~2s (SDS) | ~50 MB | Text-conditioned 3DGS |
| SketchFaceGS | N/A (face) | Real-time | N/A | UV-param + 3DGS |
| Street Gaussians | N/A (street) | ~30 | ~2 GB | Static+Dynamic 3DGS |
| OT-UVGS | ~vs UVGS | Same as UVGS | UV tensor | UV-mapped |
| WildSplatter | N/A (wild) | <1s (feed-forward) | N/A | Appearance-conditioned |
| Gaussians on a Diet | ~24.5 | Same as 3DGS | 80% less peak | Memory-bounded |
| DualSplat | ~vs baseline | Same as 3DGS | Same | Failure-to-Prior |
| MERID-GS | ~(low-light) | Same as 3DGS | Same | Retinex-decoupled |
| GS-Playground | N/A (sim) | 10^4 FPS | N/A | Batch 3DGS |
| SparseSplat | ~24.2 (DL3DV) | ~13* | ~150K Gaussians | Adaptive density feed-forward |
| NanoGS | Same as input 3DGS | CPU-only | Reduced count | Training-free merge |
| 3DTV | N/A (3-cam) | 40 FPS | N/A | Feedforward depth pyramid |
| Free Geometry | ~vs baseline (DA3/VGGT) | +LoRA (<2min) | Same | Self-supervised refinement |
| IDESplat | ~25.5* (RealEstate10K) | Single-pass | N/A | Iterative depth feed-forward |
| MesonGS++ | ~24.5 (34x compressed) | Faster after decode | ~15 MB (34x) | Post-training codec |
| Semantic Foam | N/A (segmentation) | N/A | Voronoi mesh | Semantic decomposition |
| EnerGS | ~(outdoor w/ LiDAR) | Same as 3DGS | Same | Energy-based priors |
| BiSplat-WRF | ~vs NeRF-WRF | N/A (WRF) | N/A | Planar GS (wireless) |
| Softmax-GS | ~vs 3DGS | Same | Reduced | Softmax competition |
| LeGS | ~vs baseline | Same | Same | RL-learnable density control |
| 2D-SuGaR | ~geometry (DTU) | Same | Same | Depth+normal priors + 2DGS |
| GETA-3DGS | ~24.5 (5x compressed) | Faster after decode | ~5x smaller | Joint prune+quantize auto |
| GOR-IS | ~(editing) | Same | Same | Intrinsic decomposition |
| VkSplat | Same as 3DGS | 3.3x faster | 33% less | Vulkan cross-vendor |
| FieryGS | N/A (fire) | N/A | N/A | Physics-integrated 3DGS |
| GLMap | N/A (navigation) | Real-time | N/A | Gaussian-Language map |
| Structure-Aware Dens. | ~(high-freq) | Faster convergence | Same | Freq-aware anisotropic split |
| HumanSplatHMR | N/A (avatar) | Real-time | N/A | Pose-avatar joint opt |
| GSDrive | N/A (AD) | N/A | N/A | 3DGS RL reward shaping |
| SplAttN | ~(PC completion) | N/A | N/A | Gaussian soft splatting |
| Fake3DGS | N/A (detection) | N/A | N/A | 3D manipulation detection |
| RGS | ~(CBCT sparse) | N/A | N/A | Residual wavelet-GS |
| RESPIRE | N/A (bronchoscopy) | 20x faster | N/A | Mesh-anchored + breathing phase |
| HeroGS | ~(sparse-view) | Same | Same | Hierarchical guidance |
| Sparse-View 3DGS Wild | ~vs baseline (wild) | Same | Same | Diffusion-guided refinement |
| Color-Encoded Illum. | N/A (high-speed) | Low-speed cam | N/A | Color-coded temporal encoding |
| 3DGS AD Safety | N/A (eval) | N/A | N/A | AD fidelity evaluation |
| GEMM-GS | Same as 3DGS | 1.42x faster | Same | GEMM Tensor Core |
| EmoTaG | N/A (talking head) | Real-time | N/A | FLAME + 3DGS |
| VIRGi | Same as 3DGS | Same | Same | Diffuse + view-dep. recolor |
| Pi-GS | ~vs baseline (sparse) | Same | Same | π³ ref-free init |
| E2EGS | ~vs baseline (event) | Real-time | N/A | Event-edge guided |
| Nighttime AD GS | ~vs baseline (night) | Real-time | Same | PBR + BRDF 3DGS |
| HDR-NSFF | ~(HDR dynamic) | N/A | N/A | 4D HDR NeRF/4DGS |
| DiffSoup | ~24.0 (extreme comp.) | Interactive | Minimal | Triangle soup |
| FreeFix | ~vs baseline (extrap.) | Same | Same | Diffusion-guided refine |
| Luminance-GS++ | ~vs baseline (illum.) | Same | Same | View-adaptive correction |
| FreeTimeGS++ | ~(dynamic 4DGS) | Same | Same | Gated marginalization + neural velocity |
| D-Rex | N/A (avatar relight) | Real-time | N/A | Diffusion post-process relighting |
| ClipGStream | N/A (dynamic) | Real-time streaming | N/A | Clip-stream 4DGS |
| SSD-GS | ~(relighting) | Same | Same | Scatter+shadow decomposition |
| LumiMotion | ~(dynamic relight) | Same | Same | Dynamic-aware relighting |
| ObjectMorpher | N/A (editing) | ~20s + RI | N/A | Deformable 3DGS editing |
| CADFS | N/A (CAD dataset) | N/A | N/A | Large-scale CAD + LLM |
| Mobile Avatar | N/A (avatar) | Real-time | Mobile | Pruned blendshapes |
| Large-Scale HQ Head | N/A (head) | N/A | N/A | Multi-view 3DGS head |
| AniGen | N/A (generation) | N/A | N/A | S³ Fields animatable 3D |
| SAND | N/A (neural surface) | Faster sampling | Same | Spatially adaptive depth |
| ProgressiveAvatars | N/A (avatar) | N/A | N/A | Progressive 3D Gaussian avatar |
| TwinPose | N/A (3D pose) | Real-time | N/A | Person-specific subspaces |

> *Methods marked with asterisk are evaluated on RealEstate10K/ACID or other benchmarks (not Mip-NeRF 360)
> Numbers are approximate and may vary across implementations and hardware.