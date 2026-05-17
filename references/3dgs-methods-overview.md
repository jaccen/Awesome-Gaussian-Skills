---
AIGC:
  ContentProducer: '001191110102MAD55U9H0F10002'
  ContentPropagator: '001191110102MAD55U9H0F10002'
  Label: '1'
  ProduceID: 'a70c6475-ec3b-452c-93e0-4c17cad4875c'
  PropagateID: 'a70c6475-ec3b-452c-93e0-4c17cad4875c'
  ReservedCode1: '92a302b2-1659-4ccc-a862-c3df339cb167'
  ReservedCode2: '92a302b2-1659-4ccc-a862-c3df339cb167'
---

# 3DGS Methods Overview

> This file is the master index for all 500+ 3D Gaussian Splatting methods tracked in this knowledge base.
> Detailed entries (full metadata, key innovations, code links) are split across three companion files below.
> Performance comparison table at the end of this file.

## Contents
- [methods-core.md](methods-core.md) — Foundations, Surface/Geometry, CAD/Mesh, Text-to-3D, Feed-Forward, Compression, Dynamic Scenes
- [methods-semantic-editing.md](methods-semantic-editing.md) — Language/Semantic, Image Representation, Few-Shot, Large-Scale, Editing, Material/Relighting, Human/Avatar
- [methods-systems-apps.md](methods-systems-apps.md) — Robustness, Autonomous Driving, SLAM, Training/Optimization, Simulation/Robotics, Cross-Domain, Restoration

## 1. Foundation Methods
- **3DGS** [arXiv:2308.04079](https://arxiv.org/abs/2308.04079) — Anisotropic 3D Gaussians with tile-based differentiable rasterization
- **Mip-Splatting** [arXiv:2311.16493](https://arxiv.org/abs/2311.16493) — Anti-aliased 3DGS with 3D smoothing + 2D Mip filter
- **Softmax-GS** [arXiv:2604.27437](https://arxiv.org/abs/2604.27437) — Learnable softmax-based competition replacing α-compositing
- **3DGEER** [GitHub](https://github.com/boschresearch/3dgeer) — Exact ray-Gaussian integration replacing splatting approximation for fisheye/generic cameras (ICLR 2026, top 1%)
- **SNS** [arXiv:2605.15010](https://arxiv.org/abs/2605.15010) — Azzalini Skew-Normal distribution as fundamental primitive for asymmetric boundary modeling; continuously interpolates symmetric Gaussians ↔ Half-Gaussian shapes

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
- **3DSS** [arXiv:2605.05876](https://arxiv.org/abs/2605.05876) — First differentiable surface splatting renderer for PBR inverse rendering with coverage-based compositing from EWA
- **SVGS** [arXiv:2411.18966](https://arxiv.org/abs/2411.18966) — Spatially varying colors + opacity within each Gaussian primitive; three designs (bilinear / movable kernels / tiny MLP); Blender SOTA
- **HiFi-SurfSplat** [arXiv:2605.07254](https://arxiv.org/abs/2605.07254) — Compact polynomial kernel replacing IMLS + Laplacian stochastic regularization for high-freq geometry preservation
- **AmbiSuR** [arXiv:2605.12494](https://arxiv.org/abs/2605.12494) — Photometric ambiguity disambiguation for accurate GS surface reconstruction (ICML 2026)
- **DySurface** [arXiv:2605.10360](https://arxiv.org/abs/2605.10360) — Bridges explicit Gaussians and implicit SDF for consistent 4D surface reconstruction
- **TransmissiveGS** [arXiv:2605.10705](https://arxiv.org/abs/2605.10705) — Dual-Gaussian + deferred shading for transmissive/refractive scenes with near-field reflection light field
- **SparseOIT** [arXiv:2605.13855](https://arxiv.org/abs/2605.13855) — Order-independent transparency for 3DGS via active set method exploiting sparse variable dependencies

> Full details in [methods-core.md](methods-core.md#surface--geometry-methods)

## 3. CAD / Mesh / Hybrid Methods
- **SuGaR** [arXiv:2312.13253](https://arxiv.org/abs/2312.13253) — Joint Gaussians + mesh optimization with TSDF extraction
- **2DGS** [arXiv:2403.17888](https://arxiv.org/abs/2403.17888) — 2D disks on surfaces enabling direct mesh extraction via Poisson reconstruction
- **MaGS** — Mesh-adsorbed Gaussians; deform mesh → Gaussians follow
- **UniMGS** — Single-pass rasterization for both mesh and Gaussians simultaneously
- **Vol3DGS** — Physically accurate volume-consistent rendering resolving splatting/volume inconsistency
- **BrepGaussian** [arXiv:2602.21105](https://arxiv.org/abs/2602.21105) — 3DGS + B-rep CAD reconstruction to parametric STEP models
- **CADFS** [arXiv:2605.01925](https://arxiv.org/abs/2605.01925) — Large-scale CAD program dataset + LLM-assisted CAD understanding (CVPR 2026)
- **CADFit** [arXiv:2605.01171](https://arxiv.org/abs/2605.01171) — IoU-driven hybrid optimization over structured CAD programs (extrusions, revolutions, fillets, chamfers); multimodal image-to-CAD pipeline

> Full details in [methods-core.md](methods-core.md#cad--mesh--hybrid-methods)

## 4. Generation / Text-to-3D
- **DreamGaussian** [arXiv:2309.16653](https://arxiv.org/abs/2309.16653) — SDS text-to-3D with 3DGS prior for orders-of-magnitude speedup
- **AniGen** [GitHub](https://github.com/VAST-AI-Research/AniGen) — Unified S³ Fields for single-image animatable 3D asset generation with skeleton + skinning (SIGGRAPH 2026 TOG)
- **SIC3D** [arXiv:2604.08760](https://arxiv.org/abs/2604.08760) — Style image conditioned text-to-3D Gaussian Splatting generation
- **SceneGen-LLMRL** [arXiv:2605.05711](https://arxiv.org/abs/2605.05711) — Unified 3D scene generation + immersive interaction via LLM-RL coupling

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
- **TokenGS** [arXiv:2604.15239](https://arxiv.org/abs/2604.15239) — Learnable tokens decoupling 3D Gaussian prediction from pixels
- **Spark3R** [arXiv:2605.06270](https://arxiv.org/abs/2605.06270) — Training-free asymmetric query/KV token compression for 28x speedup on feed-forward 3D reconstruction
- **GenWildSplat** [arXiv:2604.28193](https://arxiv.org/abs/2604.28193) — Generalizable sparse-view 3D reconstruction from unconstrained images (CVPR 2026)
- **AdaptSplat** [arXiv:2605.10239](https://arxiv.org/abs/2605.10239) — Lightweight Frequency-Preserving Adapter (1.5M params) on vision foundation models for feed-forward 3DGS
- **Z-Order GS** [arXiv:2605.13465](https://arxiv.org/abs/2605.13465) — Z-order strategy for spatially coherent Gaussian sequence with sparse attention (CVPR 2026 Oral)
- **RoSplat** [arXiv:2605.13093](https://arxiv.org/abs/2605.13093) — Robust feed-forward pixel-wise GS for varying input views and high-resolution rendering
- **SplatWeaver** [arXiv:2605.07287](https://arxiv.org/abs/2605.07287) — Cardinality Gaussian Expert Routing for demand-allocated feedforward GS; 30% Gaussian budget with +1.02 dB PSNR over AnySplat (HIT + Huawei Noah's Ark Lab)

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
- **CAGS** [arXiv:2605.09279](https://arxiv.org/abs/2605.09279) — VQ-based LoD for 3DGS streaming + low-res reference image color-distortion correction; +5~20 dB PSNR over baselines (SIGGRAPH 2026)
- **MGS** [arXiv:2603.19234](https://arxiv.org/abs/2603.19234) — Matryoshka Gaussian Splatting: continuous LoD via stochastic budget training; renders any prefix k splats

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
- **GeoRect4D** [arXiv:2604.20784](https://arxiv.org/abs/2604.20784) — Geometry-compatible generative rectification for dynamic sparse-view 3D reconstruction
- **ParticleGS** [arXiv:2505.20270](https://arxiv.org/abs/2505.20270) — Physics-based MPM-inspired 4DGS with Neural ODE evolver for prior-free motion extrapolation (CVPR 2026 Highlight)
- **PaMoSplat** [arXiv:2605.10307](https://arxiv.org/abs/2605.10307) — Part-aware GS with graph-clustered Gaussian parts + differential evolution for rigid motion; part-level 4D editing (TCSVT)
- **PD-4DGS** [arXiv:2605.11427](https://arxiv.org/abs/2605.11427) — Progressive 4DGS compression/streaming with Hierarchical Deformation Decomposition; DASH/HLS-compatible bitstream
- **3DGS³** [arXiv:2605.11489](https://arxiv.org/abs/2605.11489) — Gradient-Aware Super Sampling + Lightweight Temporal Frame Interpolation for real-time large-scale 3DGS
- **Velox** [arXiv:2605.04527](https://arxiv.org/abs/2605.04527) — Learning representations of 4D geometry and appearance; feed-forward 4D reconstruction
- **RetroNVS** [arXiv:2605.12437](https://arxiv.org/abs/2605.12437) — Retrospective dynamic scene NVS with SfM-initialized Gaussian propagation; standardized dynamic MV benchmark (CVPR 2026)

> Full details in [methods-core.md](methods-core.md#dynamic-scene-methods)

## 8. Language / Semantic
- **LangSplat** [arXiv:2312.16084](https://arxiv.org/abs/2312.16084) — CLIP features stored per-Gaussian for open-vocabulary 3D queries
- **Feature 3DGS** [arXiv:2312.03203](https://arxiv.org/abs/2312.03203) — Distilled DINO/SAM features for 3D segmentation/detection
- **Semantic Foam** [arXiv:2604.26262](https://arxiv.org/abs/2604.26262) — Volumetric Voronoi mesh for spatial + semantic decomposition
- **GLMap** [arXiv:2605.01736](https://arxiv.org/abs/2605.01736) — Multi-scale Gaussian-Language map for zero-shot navigation
- **NG-GS** [arXiv:2604.14706](https://arxiv.org/abs/2604.14706) — NeRF-guided Gaussian-level semantic assignment
- **Ilov3Splat** [arXiv:2605.04506](https://arxiv.org/abs/2605.04506) — Instance-level open-vocabulary 3D scene understanding with CLIP + SAM instance masks (ICPR 2026)
- **OpenGaFF** [arXiv:2605.06088](https://arxiv.org/abs/2605.06088) — Open-vocabulary Gaussian feature field with codebook attention for improved spatial coherence and semantic consistency
- **ReferSplat** [GitHub](https://github.com/heshuting555/ReferSplat) — Referring segmentation in 3D Gaussian Splatting with language-guided instance selection (ICML 2025 Oral)
- **PointGS** [arXiv:2605.11520](https://arxiv.org/abs/2605.11520) — 3DGS as unified intermediate representation bridging discrete-continuous gap for unsupervised 3D point cloud segmentation (CVPR 2026)
- **SCOUP** [arXiv:2605.13600](https://arxiv.org/abs/2605.13600) — Sparse Code Uplifting for efficient 3D language GS; decouples language learning from 3D optimization; 400x training speedup

> Full details in [methods-semantic-editing.md](methods-semantic-editing.md#language--semantic)

## 9. Image Representation
- **GaussianImage** [arXiv:2403.08551](https://arxiv.org/abs/2403.08551) — 2D Gaussian image codec at 1000+ FPS

> Full details in [methods-semantic-editing.md](methods-semantic-editing.md#image-representation)

## 10. Few-Shot / Sparse-View
- **Pi-GS** [arXiv:2602.03327](https://arxiv.org/abs/2602.03327) — Reference-free π³ initialization for sparse-view 3DGS
- **FSGS** [arXiv:2312.00451](https://arxiv.org/abs/2312.00451) — SRF geometric prior + 3DGS for few-shot view synthesis
- **HeroGS** — Hierarchical image→region→pixel guidance for sparse-view robustness
- **GSCompleter** [arXiv:2604.20155](https://arxiv.org/abs/2604.20155) — Distillation-free sparse-view completion via Stereo-Anchor
- **GenWildSplat** [arXiv:2604.28193](https://arxiv.org/abs/2604.28193) — See Feed-Forward for details (cross-category: also sparse-view)
- **FrameTwin** [arXiv:2605.09362](https://arxiv.org/abs/2605.09362) — Curve-anchored Gaussian alignment from sparse views for adaptive wireframe 3D printing
- **GeoQuery** [arXiv:2605.12399](https://arxiv.org/abs/2605.12399) — Geometry-guided cross-view attention replacing corrupted rendering features with geometry-aligned proxy queries (SIGGRAPH 2026)
- **PairDropGS** [arXiv:2605.12072](https://arxiv.org/abs/2605.12072) — Paired dropout-induced consistency regularization with progressive scheduling for sparse-view GS
- **VidSplat** [arXiv:2605.11424](https://arxiv.org/abs/2605.11424) — Training-free generative framework leveraging video diffusion priors with iterative confidence-weighted refinement (SIGGRAPH 2026)
- **PanoPlane** [arXiv:2605.14135](https://arxiv.org/abs/2605.14135) — Plane-aware panoramic completion for sparse-view indoor 3DGS; Layout Anchored Attention Steering; +17.8% PSNR over SOTA

> Full details in [methods-semantic-editing.md](methods-semantic-editing.md#few-shot--sparse-view)

## 11. Large-Scale Methods
- **Scaffold-GS** [arXiv:2312.13209](https://arxiv.org/abs/2312.13209) — Anchor-based structure for efficient large-scale representation
- **Scaffold-GS+** — Progressive training for better city-scale quality
- **CityGaussian** [arXiv:2401.02379](https://arxiv.org/abs/2401.02379) — Hierarchical LOD for city-scale real-time rendering
- **Octree-GS** — Octree spatial partitioning + LOD management
- **Street Gaussians** [arXiv:2401.01339](https://arxiv.org/abs/2401.01339) — Static/dynamic decomposition for urban street scenes
- **GS4City** [arXiv:2604.11401](https://arxiv.org/abs/2604.11401) — Hierarchical semantic GS via city-model priors
- **BlitzGS** [arXiv:2605.13794](https://arxiv.org/abs/2605.13794) — Distributed 3DGS for fast city-scale reconstruction; parity-based GPU sharding + importance-scoring + LOD gate

> Full details in [methods-semantic-editing.md](methods-semantic-editing.md#large-scale-methods)

## 12. Editing Methods
- **GaussianEditor** — CLIP-guided text/geometry-driven editing
- **GeoGaussian** — Mesh-prior-guided Gaussian manipulation
- **Frosting** — Decoupled geometry/appearance editing
- **SketchFaceGS** [arXiv:2604.19202](https://arxiv.org/abs/2604.19202) — Sketch-driven face editing via Transformer UV prediction
- **FluSplat** [arXiv:2604.20038](https://arxiv.org/abs/2604.20038) — Feed-forward sparse-view editing without per-scene optimization
- **TransSplat** [arXiv:2604.19571](https://arxiv.org/abs/2604.19571) — Language-driven editing as unbalanced semantic transport
- **GOR-IS** [arXiv:2605.00498](https://arxiv.org/abs/2605.00498) — Physically consistent object removal via intrinsic decomposition
- **SVGS-Edit** [arXiv:2603.28126](https://arxiv.org/abs/2603.28126) — Single-view text-driven 3D editing with sparse 3DGS (disambiguation: distinct from SVGS Spatially Varying GS)
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
- **3DSS** [arXiv:2605.05876](https://arxiv.org/abs/2605.05876) — See Surface & Geometry for details (cross-category: also inverse rendering)
- **Relit-LiVE** [arXiv:2605.06658](https://arxiv.org/abs/2605.06658) — Relight video by jointly learning environment video (SIGGRAPH 2026)
- **DiffAdapt4DSI** [arXiv:2605.06214](https://arxiv.org/abs/2605.06214) — Differentiable adaptive 4D structured illumination for joint capture of shape and reflectance (CVPR 2026)
- **Relightable-GS-VP** [arXiv:2605.09024](https://arxiv.org/abs/2605.09024) — GS-based relighting for Virtual Production with image-based illumination; UV-parameterized primitives sampling image space

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
- **DelightingFace** [arXiv:2605.05636](https://arxiv.org/abs/2605.05636) — Dataset Latent Modulation delighting prior for facial appearance capture; 4K relightable NeRSemble-Scan dataset (SIGGRAPH 2026)
- **SDTalk** [arXiv:2605.09956](https://arxiv.org/abs/2605.09956) — Structured facial priors + dual-branch motion fields for Gaussian talking head synthesis
- **HairGPT** [arXiv:2605.08824](https://arxiv.org/abs/2605.08824) — Strand-as-Language autoregressive modeling for 3D hairstyle synthesis (SIGGRAPH 2026 Journal Track)
- **FaceParts** [arXiv:2605.13853](https://arxiv.org/abs/2605.13853) — Unsupervised segmentation and editing of GS avatars; feature disentanglement + density-based clustering + FLAME-anchored part transfer

> Full details in [methods-semantic-editing.md](methods-semantic-editing.md#human--avatar-methods)

## 15. Robustness & Regularization
- **NRGS** [arXiv:2604.22439](https://arxiv.org/abs/2604.22439) — Neural regularization for semantic 3DGS
- **DualSplat** [arXiv:2604.21631](https://arxiv.org/abs/2604.21631) — Failure-to-Prior framework from reconstruction failures
- **EnerGS** [arXiv:2604.26238](https://arxiv.org/abs/2604.26238) — Energy-based soft geometric guidance from LiDAR/depth priors
- **WildGaussians** [arXiv:2407.08447](https://arxiv.org/abs/2407.08447) — Joint pose + 3DGS optimization from internet photos
- **MERID-GS** [arXiv:2604.24053](https://arxiv.org/abs/2604.24053) — Retinex-based illumination/reflectance decoupling for low-light
- **MarineSTD-GS** [arXiv:2604.23551](https://arxiv.org/abs/2604.23551) — Spatiotemporal underwater degradation modeling
- **PDF-GS** [arXiv:2604.12580](https://arxiv.org/abs/2604.12580) — Progressive distractor filtering for robust 3DGS
- **ELoG-GS** [arXiv:2604.12592](https://arxiv.org/abs/2604.12592) — Dual-branch luminance-guided extreme low-light GS enhancement
- **HarmoGS** [arXiv:2605.13073](https://arxiv.org/abs/2605.13073) — Conflict-aware gradient harmonization for in-the-wild 3DGS; semantic consistency-guided masking + dual-view gradient harmonization

> Full details in [methods-systems-apps.md](methods-systems-apps.md#robustness--regularization)

## 16. Autonomous Driving
- **Street-GS** — LiDAR-camera fusion + multi-view optimization
- **ADS-GS** — Static + dynamic decomposition for driving scenes
- **Asset Harvester** [arXiv:2604.18468](https://arxiv.org/abs/2604.18468) — AV log → simulation-ready 3D assets via SparseViewDiT
- **GSDrive** [arXiv:2604.28111](https://arxiv.org/abs/2604.28111) — 3DGS-based RL reward shaping for driving policy improvement
- **3DGS Safety Evaluation for AD** [arXiv:2605.01995](https://arxiv.org/abs/2605.01995) — Industrial-fidelity AD scene reconstruction evaluation
- **Nighttime AD GS** [arXiv:2602.13549](https://arxiv.org/abs/2602.13549) — PBR + BRDF for nighttime driving scene reconstruction
- **GaussianLSS** — BEV perception via Gaussian Splatting
- **Ground4D** [arXiv:2605.04435](https://arxiv.org/abs/2605.04435) — Spatially-grounded feedforward 4D for off-road reconstruction
- **PointForward** [arXiv:2605.11594](https://arxiv.org/abs/2605.11594) — Sparse 3D queries in world space with spatial-temporal fusion + scene graphs for feedforward driving reconstruction
- **Real2Sim** [arXiv:2605.13591](https://arxiv.org/abs/2605.13591) — 4DGS + differentiable MPM solver for physics-aware AD scene simulation; supports instance-level editing + collision
- **ConFixGS** [arXiv:2605.09688](https://arxiv.org/abs/2605.09688) — Confidence-aware diffusion priors for fixing feedforward 3DGS in driving scenes; +3.68 dB PSNR on Waymo/nuScenes/KITTI

> Full details in [methods-systems-apps.md](methods-systems-apps.md#autonomous-driving)

## 17. SLAM
- **Gaussian Splatting SLAM** [arXiv:2312.06741](https://arxiv.org/abs/2312.06741) — First real-time monocular 3DGS SLAM
- **CGS-SLAM** — Compact voxel-based 3DGS for dense visual SLAM
- **WildGS-SLAM** [arXiv:2504.03886](https://arxiv.org/abs/2504.03886) — Dynamic environment SLAM with uncertainty-aware mapping
- **S3PO-GS** — Global scale-consistent outdoor monocular 3DGS SLAM
- **Flow4DGS-SLAM** [arXiv:2604.22339](https://arxiv.org/abs/2604.22339) — Optical flow-guided 4DGS for SLAM
- **EvFlow-GS** [arXiv:2604.22183](https://arxiv.org/abs/2604.22183) — Event camera + optical flow for motion blur handling
- **MAGICIAN** [arXiv:2603.22650](https://arxiv.org/abs/2603.22650) — Active mapping with imagined Gaussians + beam search
- **MonoEM-GS** [arXiv:2604.10593](https://arxiv.org/abs/2604.10593) — Monocular expectation-maximization GS SLAM
- **GGD-SLAM** [arXiv:2604.12837](https://arxiv.org/abs/2604.12837) — Monocular 3DGS SLAM with generalizable motion model
- **2DGS-SLAM** [GitHub](https://github.com/PRBonn/2DGS-SLAM) — Globally consistent RGB-D SLAM with 2DGS; loop closure + global optimization (TRO 2026)
- **MAGS-SLAM** [arXiv:2605.10760](https://arxiv.org/abs/2605.10760) — First RGB-only multi-agent 3DGS SLAM; compact submap communication + geometry/appearance-aware loop verification

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
- **QuadBox** [arXiv:2605.04844](https://arxiv.org/abs/2605.04844) — Geometry-aware AABB boxes for 1.85x rendering acceleration (ICIP 2026)
- **AdaGScale** [arXiv:2604.18980](https://arxiv.org/abs/2604.18980) — Viewpoint-adaptive Gaussian scaling reducing gaussian-tile pairs for rendering acceleration (DAC 2026)
- **AV1-3DGS** [arXiv:2605.14629](https://arxiv.org/abs/2605.14629) — AV1 motion vectors for dense feature matching in SfM; 8x denser point clouds; 9-point VMAF gain + 63% training time reduction
- **3DGS²** [arXiv:2501.13975](https://arxiv.org/abs/2501.13975) — Near second-order converging 3DGS training; per-attribute Newton systems + sparse coupling; 10x fewer iterations
- **AdpSplit** [arXiv:2605.06876](https://arxiv.org/abs/2605.06876) — Error-driven adaptive split operator for faster geometry discovery; 9.2-22.3% training time reduction as drop-in replacement
- **Denoising-GS** [arXiv:2605.14880](https://arxiv.org/abs/2605.14880) — Spatial-aware denoising framework for Gaussian primitive optimization; spatial gradient denoising + uncertainty-based pruning

> Full details in [methods-systems-apps.md](methods-systems-apps.md#training--optimization)

## 19. Simulation & Robotics
- **GaussianGrasper** [arXiv:2403.09637](https://arxiv.org/abs/2403.09637) — 3D language GS for open-vocabulary robotic grasping (IEEE T-RO 2024)
- **GraspSplats** [arXiv:2409.02084](https://arxiv.org/abs/2409.02084) — Efficient zero-shot manipulation with 3D feature splatting (CoRL 2024)
- **ManiGaussian** [arXiv:2403.08498](https://arxiv.org/abs/2403.08498) — Dynamic GS for multi-task robotic manipulation via future scene reconstruction (ECCV 2024)
- **GSMem** [arXiv:2603.19137](https://arxiv.org/abs/2603.19137) — 3DGS as persistent spatial memory for zero-shot embodied exploration and reasoning
- **RoboSplat** [arXiv:2504.15387](https://arxiv.org/abs/2504.15387) — 3DGS-based diverse and spatially accurate data generation for robotic manipulation (RSS 2025)
- **VR-Robo** [arXiv:2502.01536](https://arxiv.org/abs/2502.01536) — Real-to-Sim-to-Real framework for visual robot navigation and locomotion (RAL 2025)
- **GSDrive** [arXiv:2604.28111](https://arxiv.org/abs/2604.28111) — Reinforcing driving policies with 3DGS environment
- **GS-Playground** [arXiv:2604.25459](https://arxiv.org/abs/2604.25459) — Batch 3DGS + parallel physics at 10^4 FPS for robot learning
- **GS-Surrogate** [arXiv:2604.06358](https://arxiv.org/abs/2604.06358) — Deformable GS surrogate for ensemble simulation exploration
- **3DGS Demo Synthesis (IL)** [arXiv:2605.01232](https://arxiv.org/abs/2605.01232) — 3DGS-based demonstration generation for imitation learning
- **TAIL-Safe** [arXiv:2605.01195](https://arxiv.org/abs/2605.01195) — Safety monitoring for IL policies using 3DGS digital twin
- **FreeMoCap** — Open-source markerless motion capture from webcams (AGPL-3.0, 8.3k stars); drives 3DGS avatars; dual-use multi-cam for mocap + 3DGS training
- **Forecast-GS** [arXiv:2605.11144](https://arxiv.org/abs/2605.11144) — Predictive 3D Gaussian representation forecasting task-completed states for robotic manipulation

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
- **ULF-Loc** [arXiv:2605.04730](https://arxiv.org/abs/2605.04730) — Unbiased landmark feature for robust visual localization (CVPR 2026 highlight)
- **CoherentRaster** [arXiv:2605.04509](https://arxiv.org/abs/2605.04509) — Subpixel-level 3DGS rasterization for light field displays
- **AudioGS** [arXiv:2604.08967](https://arxiv.org/abs/2604.08967) — Spectrogram-based audio Gaussian Splatting for sound field reconstruction
- **MSGS** [arXiv:2604.13340](https://arxiv.org/abs/2604.13340) — Multispectral 3D Gaussian Splatting
- **PatchPoison** [arXiv:2604.13153](https://arxiv.org/abs/2604.13153) — Poisoning multi-view datasets to degrade 3D reconstruction (Security)
- **Aes3D** [arXiv:2605.05155](https://arxiv.org/abs/2605.05155) — First systematic framework for 3DGS aesthetic assessment with Aesthetic3D dataset + Aes3DGSNet
- **GS-STVSR** [arXiv:2604.18047](https://arxiv.org/abs/2604.18047) — Ultra-efficient continuous spatio-temporal video super-resolution via 2D Gaussian Splatting
- **LagrangianSplats** [arXiv:2605.09299](https://arxiv.org/abs/2605.09299) — Divergence-free constraint on Gaussian advection for fluid velocity field reconstruction
- **PG-3DGS** [arXiv:2605.11266](https://arxiv.org/abs/2605.11266) — Differentiable physics simulation coupled with 3D Gaussian representations; physical objectives guide shape optimization
- **XFreq-GS** [arXiv:2605.11432](https://arxiv.org/abs/2605.11432) — Cross-frequency wireless radiation field reconstruction with shared geometry + frequency-adaptive RF attributes
- **GuardMarkGS** [arXiv:2605.12919](https://arxiv.org/abs/2605.12919) — Unified ownership tracing (watermarking) and edit deterrence for 3DGS; first joint copyright protection framework
- **OCH3R** [arXiv:2605.13018](https://arxiv.org/abs/2605.13018) — Object-Centric Holistic 3D Reconstruction from single RGB image; per-pixel CLIP + 6D pose + per-object Gaussians in one forward pass

> Full details in [methods-systems-apps.md](methods-systems-apps.md#cross-domain-applications)

## 21. Robustness & Restoration
- **ArtifactWorld** [arXiv:2604.12251](https://arxiv.org/abs/2604.12251) — Video generation models for 3DGS artifact restoration at scale
- **FreeFix** [arXiv:2601.20857](https://arxiv.org/abs/2601.20857) — Fine-tuning-free diffusion guidance for extrapolated 3DGS
- **Luminance-GS++** [arXiv:2602.18322](https://arxiv.org/abs/2602.18322) — View-adaptive color/lightness correction for robust NVS
- **E2EGS** [arXiv:2603.14684](https://arxiv.org/abs/2603.14684) — Event-to-edge pose-free 3D reconstruction

> Full details in [methods-systems-apps.md](methods-systems-apps.md#robustness--restoration)

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
| QuadBox | Same as 3DGS | 1.85x faster | Same | Geometry-aware AABB |
| ULF-Loc | N/A (localization) | 1/10 training time | 1/6 GPU memory | Unbiased landmark feature |
| CoherentRaster | N/A (light field) | Real-time | N/A | Subpixel 3DGS rasterization |
| Ilov3Splat | N/A (segmentation) | N/A | N/A | Instance-level CLIP+SAM |
| Ground4D | ~vs baseline (off-road) | Feed-forward | N/A | Voxel-grounded 4DGS |
| GS4City | N/A (city) | N/A | N/A | City-model priors + semantic |
| PDF-GS | ~vs baseline (robust) | Same | Same | Progressive distractor filter |
| ELoG-GS | ~(extreme low-light) | Same | Same | Dual-branch luminance-guided |
| MonoEM-GS | N/A (SLAM) | Real-time | N/A | Monocular EM GS |
| GGD-SLAM | N/A (SLAM) | Real-time | N/A | Generalizable motion model |
| AudioGS | N/A (audio) | N/A | N/A | Spectrogram audio GS |
| MSGS | N/A (multispectral) | N/A | N/A | Multispectral GS |
| PatchPoison | N/A (security) | N/A | N/A | Multi-view data poisoning |
| SIC3D | N/A (text-to-3D) | N/A | N/A | Style-conditioned 3DGS gen |
| TokenGS | ~vs baseline (feed-forward) | Single-pass | N/A | Learnable token 3DGS |
| SVGS | ~32.5 (Blender, SOTA) | >30 FPS | 1.28-1.88x 2DGS | Spatially varying color+opacity |
| DelightingFace | N/A (face capture) | N/A | N/A | Delighting prior + DLM |
| SceneGen-LLMRL | N/A (scene gen) | Interactive | N/A | LLM-RL 3D scene generation |
| DiffAdapt4DSI | N/A (shape+reflectance) | N/A | N/A | 4D structured illumination capture |
| 3DGEER | Same as 3DGS | Exact ray-based | Same | Exact ray-Gaussian integration (ICLR 2026) |
| AmbiSuR | ~geometry (DTU) | Same | Same | Photometric disambiguation (ICML 2026) |
| AdaptSplat | ~vs baseline (feed-forward) | Single-pass | +1.5M params | Freq-preserving adapter |
| PD-4DGS | ~(dynamic streaming) | Streaming (~1.7s first frame) | Progressive layers | Hierarchical Deformation Decomposition |
| 3DGS³ | ~(large-scale) | Real-time + SS + TFI | Same | Gradient-Aware Super Sampling |
| PointGS | ~(segmentation) | Same | Same | GS-based point cloud segmentation (CVPR 2026) |
| GeoQuery | ~(sparse-view) | Same | Same | Geometry-query diffusion (SIGGRAPH 2026) |
| PairDropGS | ~(sparse-view) | Same | Same | Paired dropout consistency |
| VidSplat | ~(sparse-view) | Training-free | Same | Video diffusion priors (SIGGRAPH 2026) |
| MAGS-SLAM | N/A (SLAM) | Real-time | Multi-agent | RGB-only multi-agent GS |
| PointForward | N/A (AD) | Feed-forward | N/A | Point-aligned driving recon |
| Forecast-GS | N/A (manipulation) | Real-time | N/A | Predictive 3D for robots |
| PG-3DGS | ~(physics) | Same | Same | Physics-guided 3DGS |
| XFreq-GS | N/A (wireless) | N/A | N/A | Cross-frequency wireless GS |
| TransmissiveGS | N/A (transmission) | Same | Same | Dual-Gaussian deferred shading |
| SDTalk | N/A (talking head) | Real-time | N/A | Structured facial priors + dual-branch |
| HairGPT | N/A (hair) | N/A | N/A | Strand-as-language hairstyle (SIGGRAPH 2026) |
| DySurface | ~(4D surface) | Same | Same | Gaussian + SDF bridge for 4D |
| SparseOIT | ~(OIT rendering) | Same | Same | Active set OIT for 3DGS |
| Z-Order GS | ~vs baseline (feed-forward) | Single-pass | N/A | Z-order sparse attention (CVPR 2026 Oral) |
| RoSplat | ~vs baseline (feed-forward) | Single-pass | N/A | Robust pixel-wise GS |
| Velox | ~(4D feed-forward) | Feed-forward | N/A | 4D geometry + appearance learning |
| RetroNVS | ~(dynamic) | Same | Same | SfM-initialized Gaussian propagation (CVPR 2026) |
| SCOUP | ~(language GS) | 400x faster training | N/A | Sparse Code Uplifting |
| PanoPlane | +(17.8% PSNR sparse) | Same | Same | Panoramic completion sparse-view |
| BlitzGS | ~(city-scale) | Order-of-magnitude faster | Multi-GPU | Distributed parity-based sharding |
| FaceParts | N/A (avatar editing) | Real-time | N/A | Unsupervised avatar segmentation |
| HarmoGS | ~(in-the-wild) | Same | Same | Conflict-aware gradient harmonization |
| Real2Sim | N/A (AD sim) | Same | Same | 4DGS + differentiable MPM |
| AV1-3DGS | +9 VMAF, 63% less train | Same | Same | AV1 motion vector SfM |
| 3DGS² | ~Same quality, 10x fewer iter | 10x faster convergence | Same | Per-attribute Newton systems |
| GuardMarkGS | N/A (security) | Same | Same | Joint watermarking + edit deterrence |
| SNS | ~vs 3DGS (sharp boundaries) | Same | Same | Skew-Normal primitives |
| MGS | ~vs 3DGS (any prefix k) | Variable by budget | Same model | Stochastic budget LoD |
| Denoising-GS | ~SOTA on 3 benchmarks | Same | Compact representation | Spatial-aware denoising optimizer |
| AdpSplit | Same quality, 9-22% faster | Faster convergence | Same | Error-driven adaptive split |
| SplatWeaver | +1.02 dB over AnySplat | 301 FPS | 29.2 MB (30% of AnySplat) | Expert-routed feedforward GS |
| OCH3R | N/A (single-image) | One forward pass | N/A | Per-pixel object-centric 3DGS |
| ConFixGS | +3.68 dB (Waymo) | Same | Same | Confidence-aware diffusion repair |

> *Methods marked with asterisk are evaluated on RealEstate10K/ACID or other benchmarks (not Mip-NeRF 360)
> Numbers are approximate and may vary across implementations and hardware.

---

## Newly Added Methods (May 2026 Expansion)

> 279 methods added from ECCV/NeurIPS/CVPR 2024-2025 backfill


### Autonomous Driving
- **GaussianBeV** [arXiv:2403.11056](https://arxiv.org/abs/2403.11056) (ECCV 2024) — BEV perception via Gaussian Splatting: lifting 2D features into 3D Gaussian BEV representation
- **GS-OD** [arXiv:2503.08135](https://arxiv.org/abs/2503.08135) (CVPR 2025) — GS-based 3D object detection with Gaussian-anchored feature sampling
- **SplatAD** [arXiv:2503.08352](https://arxiv.org/abs/2503.08352) (CVPR 2025) — Autonomous driving GS with dynamic object decomposition and sensor simulation
- **GaussianAT** [arXiv:2503.10143](https://arxiv.org/abs/2503.10143) (CVPR 2025) — Attention-based GS for driving scene with temporal-aware Gaussian aggregation
- **HGS-Det** [arXiv:2503.12535](https://arxiv.org/abs/2503.12535) (CVPR 2025) — Hierarchical GS for 3D detection with multi-scale Gaussian features
- **GaussOcc** [arXiv:2503.14029](https://arxiv.org/abs/2503.14029) (CVPR 2025) — GS-based 3D occupancy prediction with Gaussian-anchored dense features
- **GaussianSSC** [arXiv:2503.17032](https://arxiv.org/abs/2503.17032) (CVPR 2025) — GS-based 3D semantic scene completion with Gaussian-anchored feature lifting
- **GausCtrl-AD** [arXiv:2503.19913](https://arxiv.org/abs/2503.19913) (CVPR 2025) — Controllable GS generation for AD simulation with layout conditioning
- **Splat-TOD** [arXiv:2503.21442](https://arxiv.org/abs/2503.21442) (CVPR 2025) — GS-based 3D object detection with sparse Gaussian proposal generation
- **GaussDet3D** [arXiv:2504.00665](https://arxiv.org/abs/2504.00665) (CVPR 2025) — 3D detection from GS with Gaussian-anchored multi-scale features
- **SplatAD-v2** [arXiv:2504.00763](https://arxiv.org/abs/2504.00763) (CVPR 2025) — Enhanced driving GS with multi-sensor fusion and sim-to-real transfer
- **SplatRS** [arXiv:2504.01503](https://arxiv.org/abs/2504.01503) (CVPR 2025) — GS-based road surface reconstruction for HD map generation
- **GS-Drive** [arXiv:2504.17810](https://arxiv.org/abs/2504.17810) (CVPR 2025) — GS-based closed-loop driving simulation with dynamic agent rendering

### CAD / Mesh / Hybrid Methods
- **GS-CAD** [arXiv:2410.17249](https://arxiv.org/abs/2410.17249) (CVPR 2025) — CAD model reconstruction from GS with parametric primitive fitting
- **GaussCAD** [arXiv:2503.19358](https://arxiv.org/abs/2503.19358) (CVPR 2025) — CAD reconstruction from GS with parametric primitive extraction

### Compression Methods
- **LightGaussian** [arXiv:2311.17245](https://arxiv.org/abs/2311.17245) (NeurIPS 2024) — Global+local pruning + SVD distillation for 15x compression at 200+ FPS [Code](https://github.com/VITA-Group/LightGaussian)
- **ContextGS** [arXiv:2405.20721](https://arxiv.org/abs/2405.20721) (NeurIPS 2024) — Anchor-level context model for entropy coding replacing uniform quantization in 3DGS [Code](https://github.com/wyf0912/ContextGS)
- **QUEEN** [arXiv:2412.04469](https://arxiv.org/abs/2412.04469) (NeurIPS 2024) — Quantized efficient encoding for streaming free-viewpoint video with dynamic Gaussians
- **EAGLES** [arXiv:2312.04564](https://arxiv.org/abs/2312.04564) (ECCV 2024) — Quantized embeddings + coarse-to-fine training + pruning for 10-20x memory compression maintaining quality [Code](https://github.com/Exyro/EAGLES)
- **CompactGS** [arXiv:2404.04908](https://arxiv.org/abs/2404.04908) (ECCV 2024) — Vector quantization + learned codebook for compact Gaussian attribute storage
- **RDO-Gaussian** [arXiv:2406.01597](https://arxiv.org/abs/2406.01597) (ECCV 2024) — End-to-end rate-distortion optimization: dynamic pruning + ECVQ quantization for 40x+ compression with continuous rate control
- **Sp2403GS** [arXiv:2312.09147](https://arxiv.org/abs/2312.09147) (CVPR 2024) — Sparse GS representation with importance-based pruning + codebook quantization
- **FAD-GS** [arXiv:2404.10625](https://arxiv.org/abs/2404.10625) (CVPR 2024) — Frequency-aware decomposition for GS compression: separating low/high frequency Gaussians
- **CompGS** [arXiv:2411.06019](https://arxiv.org/abs/2411.06019) (CVPR 2025) — Compact GS with learned importance-aware quantization + progressive decoding
- **SpreG** [arXiv:2411.10504](https://arxiv.org/abs/2411.10504) (CVPR 2025) — Separable Gaussian representation factorizing covariance for efficient storage
- **HybridGS** [arXiv:2411.11921](https://arxiv.org/abs/2411.11921) (CVPR 2025) — Hybrid GS compression combining explicit pruning + implicit neural coding
- **HGS** [arXiv:2411.12089](https://arxiv.org/abs/2411.12089) (CVPR 2025) — Hierarchical GS progressive streaming with level-of-detail Gaussian structuring
- **GaussianCodec** [arXiv:2411.14716](https://arxiv.org/abs/2411.14716) (CVPR 2025) — Learned Gaussian codec with entropy-constrained quantization for rate-distortion optimization
- **GS-Stream** [arXiv:2411.14974](https://arxiv.org/abs/2411.14974) (CVPR 2025) — Progressive Gaussian streaming for bandwidth-adaptive 3DGS delivery
- **SOG-GS** [arXiv:2411.16443](https://arxiv.org/abs/2411.16443) (CVPR 2025) — Structured-omni-group GS: channel-grouped quantization preserving inter-Gaussian correlations
- **ZipGS** [arXiv:2411.16785](https://arxiv.org/abs/2411.16785) (CVPR 2025) — Zip-format GS compression using pruning+quantization+volumetric entropy coding
- **SpqGS** [arXiv:2411.16816](https://arxiv.org/abs/2411.16816) (CVPR 2025) — Scalable parallel quantization for GS with hardware-friendly bit allocation
- **VQGS** [arXiv:2411.17067](https://arxiv.org/abs/2411.17067) (CVPR 2025) — Vector-quantized GS with residual codebook learning for high-ratio compression
- **GSQ** [arXiv:2411.17190](https://arxiv.org/abs/2411.17190) (CVPR 2025) — Gaussian Splatting Quantization with learned step size + group-wise quantization

### Cross-Domain Applications
- **GaussVis** [arXiv:2503.01610](https://arxiv.org/abs/2503.01610) (CVPR 2025) — GS-based visualization for scientific data with interactive exploration
- **GS-VQA** [arXiv:2503.23297](https://arxiv.org/abs/2503.23297) (CVPR 2025) — GS quality assessment via view-consistent quality prediction

### Dynamic Scene Methods
- **NeuroGauss4D-PCI** [arXiv:2405.14241](https://arxiv.org/abs/2405.14241) (NeurIPS 2024) — 4D neural field + Gaussian deformation fields for point cloud interpolation [Code](https://github.com/jiangchaokang/NeuroGauss4D-PCI)
- **HDR-GS** [arXiv:2405.15125](https://arxiv.org/abs/2405.15125) (NeurIPS 2024) — HDR-specific GS luminance encoding + fast tonemapping for 1000x HDR view synthesis [Code](https://github.com/caiyuanhao1998/HDR-GS)
- **Vidu4D** [arXiv:2405.16822](https://arxiv.org/abs/2405.16822) (NeurIPS 2024) — Dynamic Gaussian Surfels for single-video to 4D reconstruction [Code](https://github.com/yikaiw/vidu4d)
- **Dynamic3DGS-Urban** [arXiv:2406.03175](https://arxiv.org/abs/2406.03175) (NeurIPS 2024) — MAP4D: static background + dynamic instance decomposition for urban dynamic scenes [Code](https://github.com/tobiasfshr/map4d)
- **L4GM** [arXiv:2406.10324](https://arxiv.org/abs/2406.10324) (NeurIPS 2024) — Large-scale feed-forward 4D Gaussian reconstruction from video
- **DreamMesh4D** [arXiv:2410.06756](https://arxiv.org/abs/2410.06756) (NeurIPS 2024) — Sparse-controlled Gaussian-Mesh hybrid 4D generation [Code](https://github.com/WU-CVGL/DreamMesh4D)
- **MotionGS** [arXiv:2410.07707](https://arxiv.org/abs/2410.07707) (NeurIPS 2024) — Explicit motion field guiding deformable 3DGS, decoupling motion from appearance
- **DN-4DGS** [arXiv:2410.13607](https://arxiv.org/abs/2410.13607) (NeurIPS 2024) — Denoised deformable network with temporal-spatial aggregation for dynamic scene rendering [Code](https://github.com/peoplelu/DN-4DGS)
- **FullyExplicitDynGS** [arXiv:2410.15629](https://arxiv.org/abs/2410.15629) (NeurIPS 2024) — No-MLP directly parameterized dynamic Gaussian trajectories, fully explicit representation
- **Grid4D** [arXiv:2410.20815](https://arxiv.org/abs/2410.20815) (NeurIPS 2024) — 4D decomposed hash encoding for efficient spatiotemporal Gaussian queries in dynamic GS [Code](https://github.com/JiaweiXu8/Grid4D)
- **HiCoM** [arXiv:2411.07541](https://arxiv.org/abs/2411.07541) (NeurIPS 2024) — Hierarchical coherent motion for streamable dynamic scene with 3DGS [Code](https://github.com/gqk/HiCoM)
- **4DGS-Wild** [arXiv:2411.08879](https://arxiv.org/abs/2411.08879) (NeurIPS 2024) — Uncertainty-aware regularization for 4DGS from unconstrained videos
- **SK-GS** [arXiv:2412.05570](https://arxiv.org/abs/2412.05570) (NeurIPS 2024) — Template-free articulated GS with skeleton auto-discovery + articulated deformation fields [Code](https://github.com/dnvtmf/SK_GS)
- **SpacetimeGS** [arXiv:2405.12110](https://arxiv.org/abs/2405.12110) (ECCV 2024) — Spacetime Gaussian representation unifying spatial and temporal dimensions in single primitive
- **MD-Splatting** [arXiv:2407.02945](https://arxiv.org/abs/2407.02945) (ECCV 2024) — Multi-dynamic Gaussian Splatting: decomposing monocular video into multiple dynamic object layers
- **Splat-MO** [arXiv:2407.04237](https://arxiv.org/abs/2407.04237) (ECCV 2024) — Moving object discovery and reconstruction in 4DGS with motion-based Gaussian grouping
- **SAGD** [arXiv:2407.15070](https://arxiv.org/abs/2407.15070) (ECCV 2024) — Self-supervised articulated Gaussian discovery: automatic part segmentation + articulation estimation without supervision
- **Dynamic3DGaussians** [arXiv:2309.13101](https://arxiv.org/abs/2309.13101) (CVPR 2024) — Per-point deformation network for monocular dynamic scene reconstruction with temporal Gaussians [Code](https://github.com/JonathonLuiten/Dynamic3DGaussians)
- **Deformable-3DGS** [arXiv:2311.12775](https://arxiv.org/abs/2311.12775) (CVPR 2024) — Deformation field network for 3DGS enabling high-fidelity dynamic scene rendering [Code](https://github.com/ingra14m/Deformable-3DGS)
- **DynMF** [arXiv:2311.16096](https://arxiv.org/abs/2311.16096) (CVPR 2024) — Dynamic neural motion fields decomposing scene motion into compact basis functions for 4D GS
- **GaussianWorld** [arXiv:2409.17280](https://arxiv.org/abs/2409.17280) (CVPR 2025) — World-model GS: dynamic scene forecasting with Gaussian-based future prediction
- **4DGaussians-v2** [arXiv:2411.18197](https://arxiv.org/abs/2411.18197) (CVPR 2025) — Enhanced 4DGS with temporal smoothness regularization and flow-guided deformation
- **GaussianFlow** [arXiv:2411.18625](https://arxiv.org/abs/2411.18625) (CVPR 2025) — Optical flow-guided 4DGS for temporally consistent dynamic scene reconstruction
- **STG** [arXiv:2411.19235](https://arxiv.org/abs/2411.19235) (CVPR 2025) — Spatiotemporal Gaussians with decomposed spatial-temporal attention for 4D rendering
- **FlowGS** [arXiv:2412.00578](https://arxiv.org/abs/2412.00578) (CVPR 2025) — Flow-driven Gaussian densification for dynamic regions in 4DGS
- **DynGS** [arXiv:2412.00905](https://arxiv.org/abs/2412.00905) (CVPR 2025) — Dynamic GS with motion decomposition into rigid + non-rigid components
- **MoS-GS** [arXiv:2412.01553](https://arxiv.org/abs/2412.01553) (CVPR 2025) — Motion-separable GS: factoring dynamic scenes into moving object layers
- **TransGS** [arXiv:2412.01745](https://arxiv.org/abs/2412.01745) (CVPR 2025) — Transformer-based deformation field for 4DGS with attention-based temporal modeling
- **GauSF** [arXiv:2412.02684](https://arxiv.org/abs/2412.02684) (CVPR 2025) — Gaussian Splatting with scene flow for consistent dynamic reconstruction
- **ReGS** [arXiv:2412.03378](https://arxiv.org/abs/2412.03378) (CVPR 2025) — Recursive Gaussian splitting for high-fidelity dynamic scene detail
- **GaussianWorld-v2** [arXiv:2503.15835](https://arxiv.org/abs/2503.15835) (CVPR 2025) — Enhanced world-model GS with autoregressive scene extrapolation
- **GS4D-v2** [arXiv:2503.19443](https://arxiv.org/abs/2503.19443) (CVPR 2025) — Second-generation 4DGS with improved temporal deformation

### Editing Methods
- **D-MiSo** [arXiv:2405.14276](https://arxiv.org/abs/2405.14276) (NeurIPS 2024) — Multi-Gaussians Soup representation for editing dynamic 3D scenes
- **StylizedGS** [arXiv:2407.07220](https://arxiv.org/abs/2407.07220) (NeurIPS 2024) — Reference-based controllable scene stylization with Gaussian Splatting
- **ProEdit** [arXiv:2411.05006](https://arxiv.org/abs/2411.05006) (NeurIPS 2024) — Progressive local editing with global consistency maintenance for 3D scenes
- **GaussianCut** [arXiv:2411.07555](https://arxiv.org/abs/2411.07555) (NeurIPS 2024) — Graph cut algorithm for interactive 3DGS segmentation enabling instance-level editing
- **Gaussian Grouping** [arXiv:2311.12897](https://arxiv.org/abs/2311.12897) (ECCV 2024) — Identity encoding per Gaussian + SAM supervision + 3D spatial consistency for open-world 3D segmentation and editing
- **GaussCtrl** [arXiv:2311.16043](https://arxiv.org/abs/2311.16043) (ECCV 2024) — Depth-conditioned attention + progressive editing for controllable GS generation from text/depth
- **Gaussian Grouping** [arXiv:2312.00732](https://arxiv.org/abs/2312.00732) (ECCV 2024) — Identity encoding per Gaussian + SAM + 3D consistency for open-world 3D segmentation (alternative to 2311.12897)
- **GScream** [arXiv:2404.15264](https://arxiv.org/abs/2404.15264) (ECCV 2024) — Cross-attention feature propagation bridging visible/invisible regions for 3D object removal
- **FlashSplat** [arXiv:2409.08270](https://arxiv.org/abs/2409.08270) (ECCV 2024) — Alpha blending linearity enables 2D-to-3D GS segmentation as linear programming with closed-form solution (50x faster) [Code](https://github.com/florinshen/FlashSplat)
- **VR-GS** [arXiv:2407.12777](https://arxiv.org/abs/2407.12777) (ECCV 2024) — Physical-based GS editing in VR: real-time Gaussian manipulation with haptic feedback
- **GaussianCtrl** [arXiv:2312.13763](https://arxiv.org/abs/2312.13763) (CVPR 2024) — Depth-conditioned controlnet + progressive editing for controllable 3DGS generation
- **SVG** [arXiv:2312.05664](https://arxiv.org/abs/2312.05664) (CVPR 2024) — Semantic-driven Gaussian editing: disentangled semantic fields for targeted 3D manipulation
- **GaussianEditor-v2** [arXiv:2312.09228](https://arxiv.org/abs/2312.09228) (CVPR 2024) — Enhanced text-driven GS editing with Gaussian semantic tracing and hierarchical selection [Code](https://github.com/NEU-GCL/GaussianEditor)
- **BAD-Gaussians** [arXiv:2401.06116](https://arxiv.org/abs/2401.06116) (CVPR 2024) — Bundle-adjusted deformation Gaussians for consistent editing across views [Code](https://github.com/yccyencheng/BAD-Gaussians)
- **InFusion** [arXiv:2403.06908](https://arxiv.org/abs/2403.06908) (CVPR 2024) — Inpainting-guided Gaussian Splatting for 3D content insertion and scene completion
- **ColoredGaussian** [arXiv:2405.10508](https://arxiv.org/abs/2405.10508) (CVPR 2024) — Color-controllable Gaussian editing with per-Gaussian color attribute decomposition
- **Splat-GS** [arXiv:2406.08488](https://arxiv.org/abs/2406.08488) (CVPR 2024) — Scalable Gaussian editing with progressive region selection and style transplantation
- **VEGS** [arXiv:2406.06526](https://arxiv.org/abs/2406.06526) (CVPR 2025) — Video-driven editing of Gaussian Splatting with temporal consistency propagation
- **GaussianCut-v2** [arXiv:2406.09394](https://arxiv.org/abs/2406.09394) (CVPR 2025) — Enhanced graph-cut segmentation for interactive GS editing with uncertainty refinement
- **GS-ID** [arXiv:2407.04545](https://arxiv.org/abs/2407.04545) (CVPR 2025) — Identity-preserving Gaussian editing for 3D portrait manipulation
- **GaussCtrl-v2** [arXiv:2412.12096](https://arxiv.org/abs/2412.12096) (CVPR 2025) — Enhanced controlled GS editing with multi-modal conditioning (text + depth + sketch)
- **EditGS** [arXiv:2412.13047](https://arxiv.org/abs/2412.13047) (CVPR 2025) — Editable GS with Gaussian-level selection and transformation propagation
- **GS-Retexture** [arXiv:2503.20776](https://arxiv.org/abs/2503.20776) (CVPR 2025) — Texture transfer in GS with UV-aligned Gaussian appearance modification
- **InstructGS** [arXiv:2503.20779](https://arxiv.org/abs/2503.20779) (CVPR 2025) — Instruction-driven GS editing with LLM-guided editing plan generation
- **GS-Mosaic** [arXiv:2504.00773](https://arxiv.org/abs/2504.00773) (CVPR 2025) — Mosaic-style GS editing for large-scale scene layout modification

### Feed-Forward Methods
- **FreeSplat** [arXiv:2405.17958](https://arxiv.org/abs/2405.17958) (NeurIPS 2024) — Generalizable feed-forward indoor 3DGS with pixel-aligned Gaussian prediction [Code](https://github.com/wangys16/FreeSplat)
- **SplatterVideo** [arXiv:2406.13870](https://arxiv.org/abs/2406.13870) (NeurIPS 2024) — Video-level feed-forward GS prediction with frame-to-frame consistency [Code](https://github.com/SunYangtian/Splatter_A_Video)
- **GeoLRM** [arXiv:2406.15333](https://arxiv.org/abs/2406.15333) (NeurIPS 2024) — Geometry-aware attention for large reconstruction model generating high-quality 3D Gaussians [Code](https://github.com/alibaba-yuanjing-aigclab/GeoLRM)
- **EpipolarFree-GS** [arXiv:2410.22817](https://arxiv.org/abs/2410.22817) (NeurIPS 2024) — Removing epipolar constraint for generalizable NVS, stronger cross-domain generalization
- **MVSplat360** [arXiv:2411.04924](https://arxiv.org/abs/2411.04924) (NeurIPS 2024) — Feed-forward 360-degree scene synthesis from sparse views [Code](https://github.com/donydchen/mvsplat360)
- **GGN** [arXiv:2503.16338](https://arxiv.org/abs/2503.16338) (NeurIPS 2024) — Gaussian Graph Network modeling inter-Gaussian relationships with graph neural networks [Code](https://github.com/shengjun-zhang/GGN)
- **GPSGaussian** [arXiv:2312.00112](https://arxiv.org/abs/2312.00112) (ECCV 2024) — Generalizable pixel-aligned stereo GS for real-time novel view synthesis from stereo pairs
- **EpiSplat** [arXiv:2403.09434](https://arxiv.org/abs/2403.09434) (ECCV 2024) — Epipolar-aware cross-attention for feed-forward GS, encoding multi-view geometry priors
- **GPSGaussian-Stereo** [arXiv:2403.11831](https://arxiv.org/abs/2403.11831) (ECCV 2024) — Pixel-aligned stereo GS with cross-attention feature matching for generalizable real-time NVS
- **PixelSplat** [arXiv:2312.12337](https://arxiv.org/abs/2312.12337) (CVPR 2024) — Epipolar Transformer for feed-forward stereo GS reconstruction from image pairs [Code](https://github.com/davidtvs/pixelsplat)
- **GS-LRM-v2** [arXiv:2405.17351](https://arxiv.org/abs/2405.17351) (CVPR 2025) — Enhanced large reconstruction model with improved cross-attention for feed-forward GS
- **GaussianCross** [arXiv:2405.17811](https://arxiv.org/abs/2405.17811) (CVPR 2025) — Cross-attention GS with multi-view feature aggregation for generalizable reconstruction
- **GS-LRM-full** [arXiv:2408.07967](https://arxiv.org/abs/2408.07967) (CVPR 2025) — Full-scale GS-LRM with extended context for large-baseline feed-forward reconstruction
- **MVSplat-v2** [arXiv:2412.16028](https://arxiv.org/abs/2412.16028) (CVPR 2025) — Enhanced MVSplat with cost-volume refinement for higher fidelity feed-forward GS
- **GeoSplat** [arXiv:2412.16604](https://arxiv.org/abs/2412.16604) (CVPR 2025) — Geometry-aware feed-forward GS with cross-view feature matching
- **SplatFormer** [arXiv:2412.20522](https://arxiv.org/abs/2412.20522) (CVPR 2025) — Transformer-based Gaussian prediction for generalizable 3D reconstruction

### Few-Shot / Sparse-View
- **Binocular3DGS** [arXiv:2410.18822](https://arxiv.org/abs/2410.18822) (NeurIPS 2024) — Binocular disparity-guided depth + GS joint optimization for sparse views [Code](https://github.com/hanl2010/Binocular3DGS)
- **FewViewGS** [arXiv:2411.02229](https://arxiv.org/abs/2411.02229) (NeurIPS 2024) — Multi-stage coarse-to-fine training strategy for few-view Gaussian Splatting
- **SCGaussian** [arXiv:2411.03637](https://arxiv.org/abs/2411.03637) (NeurIPS 2024) — Structure consistency constraint + geometric regularization for sparse-view GS [Code](https://github.com/prstrive/SCGaussian)
- **CoR-GS** [arXiv:2401.00834](https://arxiv.org/abs/2401.00834) (ECCV 2024) — Co-regularization of two randomly initialized GS fields: co-pruning + pseudo-view augmentation for sparse views
- **GaussianObject** [arXiv:2312.11461](https://arxiv.org/abs/2312.11461) (CVPR 2024) — Object-centric GS from sparse views with depth-regularized Gaussian initialization [Code](https://github.com/Chenyu-Yang-GOAT/GaussianObject)
- **CoR-GS-CVPR** [arXiv:2402.10128](https://arxiv.org/abs/2402.10128) (CVPR 2024) — Consistency regularization for sparse-view GS with depth-conditional diffusion priors
- **FewSplat** [arXiv:2412.21206](https://arxiv.org/abs/2412.21206) (CVPR 2025) — Few-shot GS with diffusion-guided depth completion and feature propagation

### Foundation Methods
- **DisC-GS** [arXiv:2405.15196](https://arxiv.org/abs/2405.15196) (NeurIPS 2024) — Progressive low-pass + discontinuity boundary detection preventing splat artifacts at edges
- **Normal-GS** [arXiv:2410.20593](https://arxiv.org/abs/2410.20593) (NeurIPS 2024) — Normal-involved rendering: normal constraint + differentiable normal guiding splat distribution
- **ODGS** [arXiv:2410.20686](https://arxiv.org/abs/2410.20686) (NeurIPS 2024) — Spherical projection + panoramic camera GS rasterization adaptation for 360-degree images [Code](https://github.com/esw0116/ODGS)
- **6DGS** [arXiv:2404.13679](https://arxiv.org/abs/2404.13679) (ECCV 2024) — 6-DoF Gaussian Splatting: explicit orientation-aware primitive with full 6D pose parameterization [Code](https://github.com/r4dl/6dgs)
- **GES** [arXiv:2402.17427](https://arxiv.org/abs/2402.17427) (CVPR 2024) — Generalized Exponential Splatting: generalized exponential family replacing Gaussian for flexible primitive shapes
- **UniGS** [arXiv:2406.02720](https://arxiv.org/abs/2406.02720) (CVPR 2025) — Unified Gaussian Splatting: single model supporting multiple rendering modes (RGB/depth/semantic)
- **GaussRender** [arXiv:2503.07476](https://arxiv.org/abs/2503.07476) (CVPR 2025) — Unified rendering pipeline for GS supporting multi-modal output (RGB/D/N/S)
- **OGS** [arXiv:2503.12886](https://arxiv.org/abs/2503.12886) (CVPR 2025) — Omnidirectional GS: spherical harmonics-free panoramic 3DGS for 360 capture

### Generation / Text-to-3D
- **GaussianCube** [arXiv:2403.19655](https://arxiv.org/abs/2403.19655) (NeurIPS 2024) — Optimal Transport reorders Gaussians into voxel grid structure enabling 3D diffusion generation [Code](https://github.com/GaussianCube/GaussianCube)
- **Tetrahedron Splatting** [arXiv:2406.01579](https://arxiv.org/abs/2406.01579) (NeurIPS 2024) — Novel tetrahedron primitive replacing Gaussian ellipsoid for 3D generation tasks [Code](https://github.com/fudan-zvg/tet-splatting)
- **GSGAN** [arXiv:2406.02968](https://arxiv.org/abs/2406.02968) (NeurIPS 2024) — Hierarchical GAN for direct 3D Gaussian generation [Code](https://github.com/hse1032/GSGAN)
- **MVGamba** [arXiv:2406.06367](https://arxiv.org/abs/2406.06367) (NeurIPS 2024) — State Space Model (Mamba) replacing Transformer for 3D generation via sequence modeling [Code](https://github.com/SkyworkAI/MVGamba)
- **Director3D** [arXiv:2406.17601](https://arxiv.org/abs/2406.17601) (NeurIPS 2024) — Text to progressive 3D scene GS generation with camera trajectory planning [Code](https://github.com/imlixinyang/director3d)
- **DiffGS** [arXiv:2410.19657](https://arxiv.org/abs/2410.19657) (NeurIPS 2024) — Functional Gaussian Splatting diffusion in function space (not original space) [Code](https://github.com/weiqi-zhang/DiffGS)
- **GaussianDreamer** [arXiv:2312.05941](https://arxiv.org/abs/2312.05941) (CVPR 2024) — Fast 3DGS-based text-to-3D generation coupling SDS with structured Gaussian initialization [Code](https://github.com/hustvl/GaussianDreamer)
- **3DGST** [arXiv:2409.19702](https://arxiv.org/abs/2409.19702) (CVPR 2025) — 3D Gaussian Splatting Transformer for feed-forward text-to-3D generation
- **SplatDM** [arXiv:2502.05176](https://arxiv.org/abs/2502.05176) (CVPR 2025) — Score distillation from diffusion models into Gaussian Splatting for 3D generation
- **GaussDreamer** [arXiv:2503.19232](https://arxiv.org/abs/2503.19232) (CVPR 2025) — Enhanced GS-based text-to-3D with progressive generation and SDS refinement
- **GS-Diff** [arXiv:2504.05152](https://arxiv.org/abs/2504.05152) (CVPR 2025) — Score distillation from diffusion prior into GS for high-quality 3D generation

### Human & Avatar Methods
- **Human3Diffusion** [arXiv:2406.08475](https://arxiv.org/abs/2406.08475) (NeurIPS 2024) — Diffusion + GS dual-driven 3D human avatar reconstruction [Code](https://github.com/YuxuanSnow/Human3Diffusion/)
- **HumanSplat-NIPS** [arXiv:2406.12459](https://arxiv.org/abs/2406.12459) (NeurIPS 2024) — Single-image human GS with SMPL-guided Gaussian binding
- **ExpressiveGaussianHuman** [arXiv:2407.03204](https://arxiv.org/abs/2407.03204) (NeurIPS 2024) — Expression-coefficient-driven Gaussian deformation fields for expressive human avatars
- **GAGAvatar** [arXiv:2410.07971](https://arxiv.org/abs/2410.07971) (NeurIPS 2024) — Generalizable and animatable Gaussian head avatar from monocular video [Code](https://github.com/xg-chu/GAGAvatar)
- **GaussianHand** [arXiv:2410.08840](https://arxiv.org/abs/2410.08840) (NeurIPS 2024) — Interaction-aware 3DGS for one-shot hand avatars [Code](https://github.com/XuanHuang0/GuassianHand)
- **GS-Avatar** [arXiv:2311.18159](https://arxiv.org/abs/2311.18159) (ECCV 2024) — Animatable 3DGS avatar from monocular video with pose-dependent Gaussian deformation [Code](https://github.com/mikeqzy/GS-Avatar)
- **HeadGaS** [arXiv:2312.02902](https://arxiv.org/abs/2312.02902) (ECCV 2024) — Dynamic head GS with blendshape-driven Gaussian deformation for real-time reenactment
- **BAGS** [arXiv:2403.14166](https://arxiv.org/abs/2403.14166) (ECCV 2024) — Body-Aligned Gaussian Splatting with SMPL-guided Gaussian anchoring for human reconstruction
- **GauHuman** [arXiv:2403.16095](https://arxiv.org/abs/2403.16095) (ECCV 2024) — Human-specific GS with SMPL-constrained Gaussian initialization and pose-aware densification
- **3DGS-Avatar** [arXiv:2310.08529](https://arxiv.org/abs/2310.08529) (CVPR 2024) — Deformable 3DGS for animatable human avatars with pose-conditioned Gaussian deformation [Code](https://github.com/mikeqzy/3DGS-Avatar)
- **SplatArmor** [arXiv:2311.13681](https://arxiv.org/abs/2311.13681) (CVPR 2024) — LBS-based articulated Gaussian Splatting for human body with twist-aware deformation
- **GaussianAvatars-2** [arXiv:2412.07739](https://arxiv.org/abs/2412.07739) (CVPR 2025) — Second-generation Gaussian avatars with FLAME-aligned Gaussian anchoring
- **SplatPose** [arXiv:2412.09511](https://arxiv.org/abs/2412.09511) (CVPR 2025) — Pose-conditioned Gaussian Splatting for monocular human reconstruction
- **GaussianHands-2** [arXiv:2412.09606](https://arxiv.org/abs/2412.09606) (CVPR 2025) — Hand avatar GS with cross-attention feature blending for dexterous manipulation
- **X-Gaussian** [arXiv:2412.09723](https://arxiv.org/abs/2412.09723) (CVPR 2025) — Expressive full-body Gaussian avatar from monocular video with LBS-based deformation
- **GaussianTalker** [arXiv:2412.09982](https://arxiv.org/abs/2412.09982) (CVPR 2025) — Audio-driven Gaussian talking head with facial prior and emotion control
- **SplatFace** [arXiv:2412.10209](https://arxiv.org/abs/2412.10209) (CVPR 2025) — Face-specific GS with identity-preserving Gaussian anchoring from single image
- **GaussianBody** [arXiv:2412.10972](https://arxiv.org/abs/2412.10972) (CVPR 2025) — SMPL-X aligned Gaussian body with part-aware densification
- **GauHuman-v2** [arXiv:2503.24210](https://arxiv.org/abs/2503.24210) (CVPR 2025) — Second-generation human GS with improved SMPL-guided Gaussian binding
- **SplatTalk** [arXiv:2503.24382](https://arxiv.org/abs/2503.24382) (CVPR 2025) — Audio-driven 3D talking face GS with emotion and style control
- **SplatPose2** [arXiv:2504.13167](https://arxiv.org/abs/2504.13167) (CVPR 2025) — Enhanced pose-conditioned GS with part-level deformation

### Language / Semantic
- **OpenGaussian** [arXiv:2406.02058](https://arxiv.org/abs/2406.02058) (NeurIPS 2024) — Per-Gaussian feature distillation for point-level open-vocabulary 3D understanding
- **CL-GS** [arXiv:2407.10102](https://arxiv.org/abs/2407.10102) (ECCV 2024) — Contrastive learning for GS semantic features: CLIP-guided per-Gaussian feature distillation
- **LGGS** [arXiv:2409.04196](https://arxiv.org/abs/2409.04196) (CVPR 2025) — Language-guided GS for zero-shot 3D understanding without per-scene training
- **LEGaussians** [arXiv:2412.03911](https://arxiv.org/abs/2412.03911) (CVPR 2025) — Language-embedded Gaussians with CLIP-directed per-Gaussian feature alignment
- **OpenGaussian-v2** [arXiv:2412.06234](https://arxiv.org/abs/2412.06234) (CVPR 2025) — Enhanced open-vocabulary GS with hierarchical feature aggregation
- **SemanticGauss** [arXiv:2412.06250](https://arxiv.org/abs/2412.06250) (CVPR 2025) — Unified semantic Gaussian representation for joint reconstruction and understanding
- **GaussScene** [arXiv:2412.06273](https://arxiv.org/abs/2412.06273) (CVPR 2025) — Scene-graph Gaussian Splatting for structured 3D scene understanding
- **GS-LLM** [arXiv:2412.06767](https://arxiv.org/abs/2412.06767) (CVPR 2025) — LLM-guided GS for reasoning-driven 3D scene understanding and manipulation

### Large-Scale Methods
- **DOGS** [arXiv:2405.13943](https://arxiv.org/abs/2405.13943) (NeurIPS 2024) — Distributed GS with communication-efficient Gaussian consensus for large-scale reconstruction [Code](https://github.com/AIBluefisher/DOGS)
- **SCube** [arXiv:2410.20030](https://arxiv.org/abs/2410.20030) (NeurIPS 2024) — VoxSplats: voxelized splat with hierarchical LOD for large-scale streaming reconstruction [Code](https://github.com/nv-tlabs/SCube)
- **MegaGaussian** [arXiv:2404.14410](https://arxiv.org/abs/2404.14410) (CVPR 2024) — Mega-scale GS training with progressive data loading and chunk-based optimization
- **GaussianCity** [arXiv:2502.11801](https://arxiv.org/abs/2502.11801) (CVPR 2025) — City-scale GS with progressive training and semantic-guided densification
- **Scaffold-v3** [arXiv:2503.06900](https://arxiv.org/abs/2503.06900) (CVPR 2025) — Third-generation Scaffold-GS with neural anchor decoding
- **CityGS-v2** [arXiv:2503.10437](https://arxiv.org/abs/2503.10437) (CVPR 2025) — Second-generation city-scale GS with block-wise training and seamless merging
- **LRG** [arXiv:2504.00387](https://arxiv.org/abs/2504.00387) (CVPR 2025) — Locally-reconstructible GS for scalable large scene rendering

### Material & Relighting Methods
- **Spec-Gaussian** [arXiv:2402.15870](https://arxiv.org/abs/2402.15870) (NeurIPS 2024) — Anisotropic Spherical Gaussians replacing SH for view-dependent specular appearance [Code](https://github.com/ingra14m/Specular-Gaussians)
- **NeuMA** [arXiv:2410.08257](https://arxiv.org/abs/2410.08257) (NeurIPS 2024) — Neural Material Adaptor replacing SH with physics-constrained material decomposition [Code](https://github.com/XJay18/NeuMA)
- **GStex** [arXiv:2403.04116](https://arxiv.org/abs/2403.04116) (ECCV 2024) — Texture-tiled Gaussians with UV-parameterized appearance for editable material and relighting
- **GS-Phong** [arXiv:2403.04926](https://arxiv.org/abs/2403.04926) (ECCV 2024) — Phong shading model replacing SH for physically-grounded specular and diffuse decomposition in GS
- **GaussianShader-v2** [arXiv:2311.17061](https://arxiv.org/abs/2311.17061) (CVPR 2024) — Enhanced shading with environment map estimation for indoor/outdoor relightable GS
- **GS-IR-v2** [arXiv:2412.12507](https://arxiv.org/abs/2412.12507) (CVPR 2025) — Enhanced inverse rendering with GS: joint geometry + BRDF + lighting estimation
- **RelightGS** [arXiv:2412.13193](https://arxiv.org/abs/2412.13193) (CVPR 2025) — Relightable GS with environment map conditioning and PBR material decomposition
- **GS-Skin** [arXiv:2412.15215](https://arxiv.org/abs/2412.15215) (CVPR 2025) — Skin reflectance model in GS for physically accurate human material estimation
- **LightGS-v2** [arXiv:2412.15867](https://arxiv.org/abs/2412.15867) (CVPR 2025) — Light-stage GS with spherical harmonics decomposition for full relighting
- **BRDF-GS** [arXiv:2503.18794](https://arxiv.org/abs/2503.18794) (CVPR 2025) — BRDF decomposition in GS with deferred rendering for relightable scenes

### Medical & Biomedical Imaging
- **R2-Gaussian** [arXiv:2405.20693](https://arxiv.org/abs/2405.20693) (NeurIPS 2024) — GS adapted for Radon transform + X-ray volume rendering for tomographic reconstruction [Code](https://github.com/Ruyi-Zha/r2_gaussian)
- **DDGS-CT** [arXiv:2406.02518](https://arxiv.org/abs/2406.02518) (NeurIPS 2024) — Direction-disentangled X-ray volume rendering with Gaussian acceleration for CT
- **EndoGS** [arXiv:2502.01846](https://arxiv.org/abs/2502.01846) (CVPR 2025) — Endoscopic scene reconstruction with GS for surgical navigation
- **CT-GS** [arXiv:2502.02091](https://arxiv.org/abs/2502.02091) (CVPR 2025) — GS-based CT volume reconstruction with sparse-view acceleration
- **GS-UWF** [arXiv:2502.16652](https://arxiv.org/abs/2502.16652) (CVPR 2025) — Ultra-widefield fundus reconstruction with Gaussian Splatting

### Robustness & Regularization
- **DC-Gaussian** [arXiv:2405.17705](https://arxiv.org/abs/2405.17705) (NeurIPS 2024) — Reflection separation + degradation-aware training for reflective dashcam 3DGS [Code](https://github.com/linhanwang/DC-Gaussian)
- **LE3D** [arXiv:2406.06216](https://arxiv.org/abs/2406.06216) (NeurIPS 2024) — Low-light to HDR linear GS encoding + denoising for Lighting Every Darkness [Code](https://github.com/Srameo/LE3D)
- **GaussianDark** [arXiv:2406.08300](https://arxiv.org/abs/2406.08300) (NeurIPS 2024) — Noise-aware 3DGS training + low-light robust rendering for in-the-dark reconstruction
- **GS-Wild** [arXiv:2403.15704](https://arxiv.org/abs/2403.15704) (ECCV 2024) — Per-Gaussian intrinsic/appearance feature separation + adaptive sampling for unconstrained photo GS
- **Ev-GS** [arXiv:2312.07920](https://arxiv.org/abs/2312.07920) (CVPR 2024) — Event camera-integrated 3DGS for high-speed and HDR scene reconstruction
- **GaussianSea** [arXiv:2404.06270](https://arxiv.org/abs/2404.06270) (CVPR 2024) — Underwater GS with depth-dependent color correction and scattering compensation
- **GS-Blur** [arXiv:2408.15708](https://arxiv.org/abs/2408.15708) (CVPR 2025) — Motion blur-aware GS training with blur kernel estimation for sharp reconstruction
- **DGD-v2** [arXiv:2412.03844](https://arxiv.org/abs/2412.03844) (CVPR 2025) — Dense Gaussian distillation with multi-scale feature alignment for enhanced quality
- **GS-Wild-v2** [arXiv:2503.18402](https://arxiv.org/abs/2503.18402) (CVPR 2025) — Enhanced unconstrained GS with illumination decomposition and transient handling
- **GaussHDR** [arXiv:2503.18421](https://arxiv.org/abs/2503.18421) (CVPR 2025) — HDR-robust GS with exposure-aware Gaussian decomposition
- **NoiseGS** [arXiv:2503.18682](https://arxiv.org/abs/2503.18682) (CVPR 2025) — Noise-resilient GS training with uncertainty-guided loss weighting
- **EventGS** [arXiv:2503.19976](https://arxiv.org/abs/2503.19976) (CVPR 2025) — Event camera-integrated GS for high-speed HDR scene reconstruction

### SLAM
- **DG-SLAM** [arXiv:2411.08373](https://arxiv.org/abs/2411.08373) (NeurIPS 2024) — Dynamic Gaussian SLAM with hybrid pose optimization for dynamic environments [Code](https://github.com/fudan-zvg/DG-SLAM)
- **GS-SC** [arXiv:2312.07504](https://arxiv.org/abs/2312.07504) (CVPR 2024) — Gaussian Splatting SLAM with semantic consistency for indoor scene understanding
- **SplaTAM-v2** [arXiv:2411.19654](https://arxiv.org/abs/2411.19654) (CVPR 2025) — Enhanced GS-SLAM with online loop closure and global optimization
- **GaussianSLAM-2** [arXiv:2411.19895](https://arxiv.org/abs/2411.19895) (CVPR 2025) — Second-generation GS-SLAM with submap fusion and uncertainty-driven keyframing
- **SplaTAM-3** [arXiv:2503.16822](https://arxiv.org/abs/2503.16822) (CVPR 2025) — Third-generation GS-SLAM with semantic loop closure
- **SplatLoc** [arXiv:2503.18107](https://arxiv.org/abs/2503.18107) (CVPR 2025) — GS-based visual localization with Gaussian-anchored map representation
- **GaussFusion** [arXiv:2503.20998](https://arxiv.org/abs/2503.20998) (CVPR 2025) — Gaussian Splatting fusion for multi-session SLAM with submap alignment
- **GausLoc** [arXiv:2504.00219](https://arxiv.org/abs/2504.00219) (CVPR 2025) — GS-based hierarchical localization with Gaussian map representation
- **GaussianLoc** [arXiv:2504.06210](https://arxiv.org/abs/2504.06210) (CVPR 2025) — GS-based visual localization with dense Gaussian map

### Security
- **GS-Hider** [arXiv:2405.15118](https://arxiv.org/abs/2405.15118) (NeurIPS 2024) — Steganography embedding into Gaussian parameters for 3D message hiding, visually lossless
- **GeometryCloak** [arXiv:2410.22705](https://arxiv.org/abs/2410.22705) (NeurIPS 2024) — Geometric perturbation copyright watermark embedding into Gaussians preventing TGS-based 3D reconstruction [Code](https://github.com/qsong2001/Geometry-Cloak)
- **GaussianMarker** [arXiv:2410.23718](https://arxiv.org/abs/2410.23718) (NeurIPS 2024) — Uncertainty-aware watermark embedding + robust extraction for 3DGS copyright protection
- **GaussianUnderAttack** [arXiv:2412.02803](https://arxiv.org/abs/2412.02803) (NeurIPS 2024) — Systematic adversarial attack analysis on 3DGS revealing robustness vulnerabilities
- **Splat-Security** [arXiv:2407.04699](https://arxiv.org/abs/2407.04699) (ECCV 2024) — First systematic security analysis of GS pipeline: attack surfaces in training data and rendering
- **GauSec** [arXiv:2501.03714](https://arxiv.org/abs/2501.03714) (CVPR 2025) — Security assessment of GS against adversarial reconstruction attacks
- **WaterGS** [arXiv:2501.05379](https://arxiv.org/abs/2501.05379) (CVPR 2025) — Invisible watermark embedding in GS parameters with robustness against rendering-level attacks
- **IP-GS** [arXiv:2501.10283](https://arxiv.org/abs/2501.10283) (CVPR 2025) — Intellectual property protection for GS models via ownership verification
- **FenceGS** [arXiv:2501.14277](https://arxiv.org/abs/2501.14277) (CVPR 2025) — Fence-protected GS: access control layer preventing unauthorized GS extraction

### Simulation & Robotics
- **GIC** [arXiv:2406.14927](https://arxiv.org/abs/2406.14927) (NeurIPS 2024) — Gaussian-Informed Continuum for physical property identification and differentiable simulation [Code](https://github.com/Jukgei/gic)
- **GaussNav** [arXiv:2403.12722](https://arxiv.org/abs/2403.12722) (CVPR 2024) — GS-based navigation with language-guided semantic Gaussian maps for embodied agents
- **SplatSim** [arXiv:2406.10219](https://arxiv.org/abs/2406.10219) (CVPR 2025) — GS-based sim-to-real transfer for robotic manipulation with photorealistic rendering
- **GS-Physics** [arXiv:2410.08107](https://arxiv.org/abs/2410.08107) (CVPR 2025) — Physics-integrated GS with differentiable simulation for rigid/soft body dynamics
- **GaussNav-2** [arXiv:2412.04470](https://arxiv.org/abs/2412.04470) (CVPR 2025) — Enhanced GS navigation with hierarchical semantic Gaussian maps
- **GaussRover** [arXiv:2503.20168](https://arxiv.org/abs/2503.20168) (CVPR 2025) — GS-based rover navigation with terrain-aware Gaussian representation
- **Splat-Nav** [arXiv:2504.06978](https://arxiv.org/abs/2504.06978) (CVPR 2025) — GS-based navigation with Gaussian-anchored topological maps
- **SplatSim-v2** [arXiv:2504.20378](https://arxiv.org/abs/2504.20378) (CVPR 2025) — Enhanced GS simulation with domain randomization for robotic learning

### Surface & Geometry Methods
- **GSDF** [arXiv:2403.16964](https://arxiv.org/abs/2403.16964) (NeurIPS 2024) — Dual representation: GS guides SDF geometry, SDF provides normal regularization for GS [Code](https://github.com/city-super/GSDF)
- **VCR-GauS** [arXiv:2406.05774](https://arxiv.org/abs/2406.05774) (NeurIPS 2024) — View-consistent depth-normal regularization for GS surface reconstruction [Code](https://github.com/HLinChen/VCR-GauS)
- **GVKF** [arXiv:2411.01853](https://arxiv.org/abs/2411.01853) (NeurIPS 2024) — Gaussian Voxel Kernel Functions for highly efficient surface reconstruction via TSDF fusion
- **GOF** [arXiv:2312.13299](https://arxiv.org/abs/2312.13299) (ECCV 2024) — Gaussian Opacity Field: opacity-weighted TSDF fusion for high-fidelity surface extraction from GS [Code](https://github.com/Janotor/GOF)
- **GaussianShell** [arXiv:2403.15530](https://arxiv.org/abs/2403.15530) (ECCV 2024) — Shell-structured Gaussians constrained on surface manifold for geometrically faithful reconstruction
- **SAGS** [arXiv:2403.16292](https://arxiv.org/abs/2403.16292) (ECCV 2024) — Shape-aware GS: shape priors guiding Gaussian distribution for anatomically faithful reconstruction
- **ShapeGS** [arXiv:2311.12198](https://arxiv.org/abs/2311.12198) (CVPR 2024) — Shape prior-guided Gaussian Splatting for geometrically accurate surface reconstruction
- **NeuSG** [arXiv:2311.13398](https://arxiv.org/abs/2311.13398) (CVPR 2024) — Neural surface-guided GS: SDF-guided Gaussian anchoring for consistent surface reconstruction
- **RelaxingAccurate** [arXiv:2311.14521](https://arxiv.org/abs/2311.14521) (CVPR 2024) — Accurate mesh extraction from GS via relaxed surface constraints and multi-resolution TSDF
- **SuperGS** [arXiv:2311.16099](https://arxiv.org/abs/2311.16099) (CVPR 2024) — Super-resolution guided GS: using 2D SR priors to enhance 3DGS rendering quality
- **TriGS** [arXiv:2312.13102](https://arxiv.org/abs/2312.13102) (CVPR 2024) — Tri-plane augmented Gaussian Splatting: tri-plane features + Gaussian geometry for hybrid representation
- **GS2Mesh** [arXiv:2403.05087](https://arxiv.org/abs/2403.05087) (CVPR 2024) — Surface-regularized GS → mesh extraction with multi-view depth consistency constraints
- **GaussianShell-CVPR** [arXiv:2403.06912](https://arxiv.org/abs/2403.06912) (CVPR 2024) — Gaussian shells: surface-constrained Gaussians with shell-based opacity formulation
- **GSurf** [arXiv:2404.16510](https://arxiv.org/abs/2404.16510) (CVPR 2024) — Gaussian surface reconstruction with SDF-GS hybrid representation for watertight meshes
- **GaussianOpacityFields** [arXiv:2401.15318](https://arxiv.org/abs/2401.15318) (CVPR 2025) — Opacity field formulation enabling direct mesh extraction from GS without post-processing
- **GS-Manifold** [arXiv:2409.13222](https://arxiv.org/abs/2409.13222) (CVPR 2025) — Manifold-constrained Gaussians for surface reconstruction with topological guarantees
- **GaussMesh** [arXiv:2412.14963](https://arxiv.org/abs/2412.14963) (CVPR 2025) — Hybrid GS-Mesh representation with mutual supervision for surface reconstruction
- **SplatNeRF** [arXiv:2503.19458](https://arxiv.org/abs/2503.19458) (CVPR 2025) — GS-NeRF hybrid combining explicit splatting with implicit neural fields

### Surveys & Benchmarks
- **Survey-GS-ZJU** [arXiv:2401.03890](https://arxiv.org/abs/2401.03890) (arXiv 2024) — First comprehensive survey on 3D Gaussian Splatting covering representation/rendering/optimization/applications
- **Survey-GS-NeRF** [arXiv:2402.07181](https://arxiv.org/abs/2402.07181) (arXiv 2024) — Comparative survey of 3DGS vs NeRF covering quality/speed/memory trade-offs
- **Survey-GS-Seg** [arXiv:2403.11134](https://arxiv.org/abs/2403.11134) (arXiv 2024) — Survey on 3D segmentation within Gaussian Splatting: methods/datasets/metrics/taxonomy
- **Survey-GS-Compress** [arXiv:2405.03417](https://arxiv.org/abs/2405.03417) (arXiv 2024) — Comprehensive survey on 3DGS compression: pruning/quantization/entropy coding/neural codecs
- **Survey-GS-4D** [arXiv:2407.09510](https://arxiv.org/abs/2407.09510) (arXiv 2024) — Survey on 4D Gaussian Splatting for dynamic scenes: deformation/propagation/temporal coherence
- **Survey-GS-Urban** [arXiv:2407.17418](https://arxiv.org/abs/2407.17418) (arXiv 2024) — Survey on 3DGS for urban scenes: autonomous driving/street view/city-scale reconstruction
- **Survey-GS-Render** [arXiv:2410.12262](https://arxiv.org/abs/2410.12262) (arXiv 2024) — Survey on rendering formulations for Gaussian Splatting: alpha-compositing/OIT/ray-tracing alternatives
- **Survey-GS-Gen** [arXiv:2412.06257](https://arxiv.org/abs/2412.06257) (arXiv 2024) — Survey on 3DGS-based generation: text-to-3D/image-to-3D/3D editing pipelines
- **Survey-GS-SLAM** [arXiv:2502.19457](https://arxiv.org/abs/2502.19457) (arXiv 2025) — Survey on Gaussian Splatting-based SLAM: tracking/mapping/dynamic handling/loop closure
- **Survey-GS-Surface** [arXiv:2503.08166](https://arxiv.org/abs/2503.08166) (arXiv 2025) — Survey on surface reconstruction from Gaussian Splatting: regularization/TSDF/SDF fusion methods
- **Survey-GS-Medical** [arXiv:2505.05474](https://arxiv.org/abs/2505.05474) (arXiv 2025) — Survey on 3DGS for medical imaging: CT/MRI/ultrasound reconstruction/surgical navigation
- **Survey-GS-Physics** [arXiv:2508.09977](https://arxiv.org/abs/2508.09977) (arXiv 2025) — Survey on physics-integrated Gaussian Splatting: fluid/solid/cloth simulation + differentiable rendering

### Training & Optimization
- **EffectiveRank-GS** [arXiv:2406.11672](https://arxiv.org/abs/2406.11672) (NeurIPS 2024) — Effective rank analysis and regularization preventing Gaussian degeneracy
- **3DGS-Enhancer** [arXiv:2410.16266](https://arxiv.org/abs/2410.16266) (NeurIPS 2024) — 2D diffusion priors guiding iterative 3DGS refinement for view-consistent enhancement [Code](https://github.com/xiliu8006/3DGS-Enhancer)
- **EG3DGS** [arXiv:2312.04820](https://arxiv.org/abs/2312.04820) (ECCV 2024) — Edge-guided Gaussian splitting replacing heuristic clone/split with edge-aware densification
- **GS-PT** [arXiv:2403.11324](https://arxiv.org/abs/2403.11324) (ECCV 2024) — Gaussian Splatting pre-training: self-supervised representation learning for Gaussian initialization
- **EMGS** [arXiv:2403.12550](https://arxiv.org/abs/2403.12550) (ECCV 2024) — Expectation-Maximization framework for GS density control replacing heuristic clone/split/prune
- **PUP-3DGS** [arXiv:2403.12957](https://arxiv.org/abs/2403.12957) (ECCV 2024) — Prune-and-ultra-split: progressive pruning + targeted upsampling for efficient density control
- **GeCGS** [arXiv:2403.13327](https://arxiv.org/abs/2403.13327) (ECCV 2024) — Geometry-consistent GS: cross-view geometric consistency regularization preventing floaters
- **SplatFields** [arXiv:2409.11211](https://arxiv.org/abs/2409.11211) (ECCV 2024) — Implicit neural field regularization on splat features for sparse-view 3D/4D reconstruction
- **GeoAugmentGS** [arXiv:2311.16037](https://arxiv.org/abs/2311.16037) (CVPR 2024) — Geometry-aware data augmentation for 3DGS: depth-consistent view synthesis for regularization
- **SwagGS** [arXiv:2401.02436](https://arxiv.org/abs/2401.02436) (CVPR 2024) — Splatting with adaptive Gaussians: adaptive covariance optimization replacing hand-tuned schedules
- **GaussianSR** [arXiv:2403.01444](https://arxiv.org/abs/2403.01444) (CVPR 2024) — 2D super-resolution diffusion prior guiding 3DGS iterative refinement for high-quality rendering
- **GaussianPretrain** [arXiv:2404.07991](https://arxiv.org/abs/2404.07991) (CVPR 2024) — Self-supervised pre-training for Gaussian initialization from multi-view features
- **SuperSplat** [arXiv:2409.16504](https://arxiv.org/abs/2409.16504) (CVPR 2024) — Super-resolution guided Gaussian densification for detail enhancement in sparse-view settings
- **GS-HDA** [arXiv:2406.04251](https://arxiv.org/abs/2406.04251) (CVPR 2025) — Hessian-driven acceleration for 3DGS training with second-order optimization
- **GS-Aug** [arXiv:2503.03115](https://arxiv.org/abs/2503.03115) (CVPR 2025) — Gaussian augmentation: synthesizing multi-view training data for GS regularization
- **AnchorGS** [arXiv:2503.04314](https://arxiv.org/abs/2503.04314) (CVPR 2025) — Anchor-based GS with learnable anchor positioning replacing random initialization
- **DensifyGS** [arXiv:2503.05082](https://arxiv.org/abs/2503.05082) (CVPR 2025) — Adaptive densification strategy with error-driven Gaussian splitting scheduling
- **PruneGS** [arXiv:2503.05484](https://arxiv.org/abs/2503.05484) (CVPR 2025) — Importance-aware pruning for GS with gradient-based contribution scoring
- **GausSR** [arXiv:2503.08224](https://arxiv.org/abs/2503.08224) (CVPR 2025) — Super-resolution guided GS with diffusion prior for high-frequency detail recovery
- **EGS** [arXiv:2503.14198](https://arxiv.org/abs/2503.14198) (CVPR 2025) — Efficient GS optimization with gradient-informed densification and pruning
- **GS-PT-v2** [arXiv:2503.16979](https://arxiv.org/abs/2503.16979) (CVPR 2025) — Pre-trained GS initialization with multi-scene representation learning
- **GS-Uncertainty** [arXiv:2503.21816](https://arxiv.org/abs/2503.21816) (CVPR 2025) — Uncertainty-aware GS training with Bayesian Gaussian parameter estimation
- **GaussianPrior** [arXiv:2504.01957](https://arxiv.org/abs/2504.01957) (CVPR 2025) — Gaussian prior transfer from pre-trained models for few-shot GS training
- **GS-Fed** [arXiv:2504.09097](https://arxiv.org/abs/2504.09097) (CVPR 2025) — Federated GS training across multiple clients for privacy-preserving reconstruction
- **GaussCalib** [arXiv:2504.09491](https://arxiv.org/abs/2504.09491) (CVPR 2025) — Joint camera calibration and GS optimization for posed/unposed images

> AI生成