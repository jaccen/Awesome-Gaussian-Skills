# 3DGS Bug Patterns Catalog

### 4. Known Bug Patterns

#### Critical Bugs (Will produce wrong results)

| # | Pattern | Symptom | Detection |
|---|---------|---------|-----------|
| 1 | Wrong sorting axis | Flickering, ghosting | Check sort key is camera-space depth |
| 2 | Missing EWA filter | Aliasing in distant views | Check for low-pass in covariance projection |
| 3 | Incorrect covariance regularization | Nan/Inf during training | Verify det(Σ) > ε after every update |
| 4 | Opacity sigmoid applied twice | Dim rendering | Should be raw opacity → sigmoid in rendering |
| 5 | Wrong SH basis function | Color artifacts | Verify SH C0 = 0.28209479177387814 |
| 6 | Scale allowed to go negative | Explosion | Enforce exp(scale) or clamp |

#### Performance Bugs (Correct but slow)

| # | Pattern | Impact | Fix |
|---|---------|--------|-----|
| 7 | No tile culling | 5-10x slower | Implement tile overlap test |
| 8 | CPU sorting every iteration | 2-3x overhead | Sort every 100 iterations |
| 9 | Excessive SH degree | 2x memory | Use degree 3 only if needed |
| 10 | No gradient checkpointing | OOM on large scenes | Checkpoint memory-intensive ops |

#### Subtle Bugs (Correct in most cases, wrong in edge cases)

| # | Pattern | Edge Case | Fix |
|---|---------|-----------|-----|
| 11 | No near-plane clipping | Camera-close Gaussians | Clip at z = near_plane |
| 12 | Spherical harmonics for background | Black background | Skip SH for α < ε |
| 13 | Float precision in accumulation | Banding artifacts | Use float64 for T accumulation |
| 14 | Incorrect Jacobian | Wide-angle distortion | Use full projective Jacobian |
| 15 | UV mapping collision | Quality drop in UVGS | Use OT-UVGS or collision-aware assignment |
| 16 | Deterministic spherical projection | Uneven UV utilization | OT-inspired global assignment (O(N log N)) |

### SLAM-Specific Patterns (4DGS-SLAM, Flow4DGS-SLAM)

| # | Pattern | Symptom | Fix |
|---|---------|---------|-----|
| 17 | No static/dynamic separation | Ghosting in dynamic scenes | Decompose optical flow into ego-motion + object motion |
| 18 | Keyframe-only temporal centers | Temporal inconsistency | Propagate centers via 3D scene flow priors |
| 19 | No adaptive Gaussian insertion | Missing dynamic objects | Adaptive insertion strategy triggered by flow residuals |
| 20 | Uniform temporal modeling | Insufficient for complex dynamics | GMM-based temporal opacity/rotation modeling |

### Feed-Forward Patterns (GlobalSplat, etc.)

| # | Pattern | Symptom | Fix |
|---|---------|---------|-----|
| 21 | Pixel-aligned unprojection | Representation bloat | Use global latent scene tokens before decoding |
| 22 | View-dependent size scaling | Inconsistent cross-view | Coarse-to-fine capacity curriculum |
| 23 | No Gaussian deduplication | Redundant primitives | Cross-view correspondence resolution in latent space |

### Proxy-GS / Occlusion-Aware Patterns

| # | Pattern | Symptom | Fix |
|---|---------|---------|-----|
| 24 | No occlusion culling in proxy model | Ghosting behind objects | Implement occlusion-aware proxy with depth peeling |
| 25 | Proxy model capacity too small | Quality drop on complex scenes | Progressive proxy capacity growth |

### TRiGS / Long-Sequence 4DGS Patterns

| # | Pattern | Symptom | Fix |
|---|---------|---------|-----|
| 26 | Piecewise-linear velocity for rigid motion | Temporal fragmentation, memory explosion | Use SE(3) + Bezier residuals (TRiGS) |
| 27 | No local anchor for long sequences | Identity loss after 300+ frames | Add learnable local anchors per object |

### Compression & Simplification Patterns (NanoGS, etc.)

| # | Pattern | Symptom | Fix |
|---|---------|---------|-----|
| 28 | Greedy merge order in simplification | Quality degradation on high-curvature regions | KNN graph construction + merge cost prioritization (NanoGS) |
| 29 | Merge without moment preservation | Color/opacity drift after simplification | Mass-preserving moment matching for merged Gaussians |

### Mixed-Precision & Compression Coding Patterns (MesonGS++)

| # | Pattern | Symptom | Fix |
|---|---------|---------|-----|
| 40 | Uniform bit-width across all Gaussian attributes | Suboptimal rate-distortion: high-importance attributes (opacity, position) under-quantized while low-importance ones (SH high orders) over-allocated bits | Group-wise mixed-precision quantization; assign higher bit-width to attributes with larger gradient contributions; use 0-1 ILP or heuristic search over attribute-level bit-width (MesonGS++, ArXiv 2604.26799) |
| 41 | Octree coding without neighbor-aware attribute prediction | Redundant bitstream size; sharp attribute discontinuities at octree node boundaries | Predict child node attributes from parent via learned attribute transformation; code residuals instead of raw values; ensure octree depth is rate-distortion optimized jointly with pruning ratio |

### Energy-Based Optimization Patterns (EnerGS)

| # | Pattern | Symptom | Fix |
|---|---------|---------|-----|
| 42 | Hard geometric prior constraints (e.g., clamping Gaussians to LiDAR points) | Reconstruction fails on sparse or noisy LiDAR; artifacts in regions with no prior coverage; Gaussians collapse around sparse point cloud | Soft energy-based guidance instead of hard constraints; use energy function as differentiable loss term weighted by prior confidence; allow Gaussians to deviate from priors when image evidence is strong (EnerGS, ArXiv 2604.26238) |

### Cross-Domain & Application Patterns

| # | Pattern | Symptom | Fix |
|---|---------|---------|-----|
| 30 | Using standard ray transport for non-VS domains | Artifacts in medical imaging / DOT | Use diffusion transport function for photon diffusion regime (GS-DOT) |
| 31 | Uniform Gaussian density in feed-forward models | Redundant primitives, bloated model | Entropy-based probabilistic sampling for adaptive density (SparseSplat) |
| 32 | No viewpoint diversity metric in capture | Reconstruction artifacts from non-uniform coverage | Spherical grid coverage planning for object capture |
| 33 | Treating egocentric video as standard multi-view | Static content degrades under ego motion | Dedicated egocentric evaluation with paired ego-exo data (EgoExo4D) |

### Antialiasing Patterns (Mip-Splatting)

| # | Pattern | Symptom | Fix |
|---|---------|---------|-----|
| 34 | No Mip-level filtering during zoom/focus | Blooming/erosion artifacts at scale changes; SSIM degrades in distant views | Apply 3D smoothing filter on Gaussians + 2D Mip filter during rasterization (Mip-Splatting, ArXiv 2311.16493) |

### SLAM Scale & Dynamic Object Patterns

| # | Pattern | Symptom | Fix |
|---|---------|---------|-----|
| 35 | Scale drift in outdoor monocular SLAM | Cumulative metric scale error growing over trajectory; inconsistent map scale across sessions | Scale-consistent pose optimization with global scale constraint (S3PO-GS, ICCV'25); avoid pure monocular scale ambiguity |
| 36 | Dynamic object ghosts in SLAM maps | Transient objects leaving persistent Gaussian traces; map quality degrades in scenes with moving people/vehicles | Uncertainty-aware geometric mapping with pretrained 3D priors (WildGS-SLAM, CVPR'25); probabilistic classification of static vs dynamic Gaussians |

### Feature Field & Optimization Patterns

| # | Pattern | Symptom | Fix |
|---|---------|---------|-----|
| 37 | Feature field quality degradation in downstream tasks | Blurry or noisy 3D features; poor segmentation/detection performance when using 3DGS feature fields for downstream tasks | Distill 2D foundation model features (DINO, SAM) into per-Gaussian 3D features with separate feature Gaussians (Feature 3DGS, CVPR'24) |
| 38 | Local minima in 3DGS optimization | Reconstruction stuck in suboptimal state; density control creates redundant Gaussians without improving quality | Frame clone/split/prune as MCMC sampling moves (3DGS-as-MCMC, NeurIPS'24); use sampling-based optimization to escape local minima |
| 39 | Planar surface bulging artifacts | Gaussians overshooting flat surfaces (walls, floors, tables); bumpy appearance on planar regions | Add planar regularizer constraining Gaussians to align with local tangent planes (PGSR, TVCG'24); unbiased depth rendering for surface consistency |

### Vulkan Compute Kernel Patterns

| # | Pattern | Symptom | Fix |
|---|---------|---------|-----|
| 43 | Vulkan compute kernel without vendor-agnostic workgroup tuning | Crashes or severe performance degradation on AMD/Intel GPUs; incorrect rendering on non-NVIDIA hardware | Use vendor-agnostic workgroup sizes in VkComputePipelineCreateInfo; add subgroup operations for cross-vendor optimization; validate memory barriers between dispatch calls (VkSplat, ArXiv 2605.00219) |

### RL-Based Density Control Patterns

| # | Pattern | Symptom | Fix |
|---|---------|---------|-----|
| 44 | Reward function gradient not detached from rendering graph in LeGS-style methods | Policy network receives wrong gradients; training instability; density control oscillation | Detach rendered images from computation graph before computing reward (`.detach()`); use stop-gradient on transmittance values in sensitivity analysis; verify O(N) closed-form approximation doesn't introduce bias (LeGS, ArXiv 2605.00408) |

### Medical Imaging & Spectral Decomposition Patterns

| # | Pattern | Symptom | Fix |
|---|---------|---------|-----|
| 45 | Spectral crosstalk between geometric base and residual detail Gaussians | Base Gaussians absorb high-frequency content; loss of fine detail in medical imaging reconstructions; violation of X-ray attenuation non-negativity | Add spectral regularization loss to prevent base from absorbing high-frequency content; enforce non-negativity constraint on geometric base; use alternating optimization schedule for base and residual components (RGS, ArXiv 2604.27552) |

### Softmax-GS Specific Patterns

| # | Pattern | Symptom | Fix |
|---|---------|---------|-----|
| 46 | Softmax applied over all overlapping Gaussians without proper normalization boundary | Output changes when Gaussian order changes; inconsistent blending at tile edges; NaN from softmax of large negative logits | Ensure softmax is applied over a fixed-size neighborhood (not variable per-pixel); clamp logit range before softmax; verify order-invariance by shuffling Gaussian indices in unit test |
| 47 | Blend-to-bound transition not differentiable at boundary | Gradient discontinuity at opacity→boundary regime switch; training oscillations near object boundaries | Use smooth sigmoid transition between blend and bound modes; add small epsilon to regime classification threshold; verify gradient flow through transition function numerically |

### Hardware Acceleration Patterns (Tensor Cores, GEMM)

| # | Pattern | Symptom | Fix |
|---|---------|---------|-----|
| 48 | Naive GEMM mapping breaks α-compositing order | Incorrect transmittance accumulation; color bleeding artifacts when porting 3DGS to Tensor Cores via GEMM reformulation | Ensure blending accumulation order matches tile-based splatting order; GEMM output layout must respect front-to-back transmittance guarantees; verify with deterministic rendering comparison (GEMM-GS, ArXiv 2505.04658) |

### Event Camera & Neuromorphic Sensor Patterns

| # | Pattern | Symptom | Fix |
|---|---------|---------|-----|
| 49 | Gaussian initialization on raw event edges without noise suppression | Catastrophic geometry corruption; spurious Gaussians at high-noise event boundaries; degraded reconstruction in event-based 3DGS | Apply temporal coherence analysis to event streams before edge extraction; filter events by temporal consistency (minimum event count over sliding window); suppress isolated events before Gaussian initialization (E2EGS, ArXiv 2504.14556) |

### Articulated Model & Expression-Driven Patterns

| # | Pattern | Symptom | Fix |
|---|---------|---------|-----|
| 50 | Directly deforming 3D Gaussians instead of operating in FLAME parameter space | Geometric instability in mouth/eye regions; inconsistent deformation across expressions; visible artifacts at expression boundaries | Deform Gaussians in FLAME UV parameter space and map back to 3D; respect FLAME's UV parameterization for consistent facial region deformation; use expression-conditioned Gaussian attributes rather than direct 3D offset (EmoTaG, ArXiv 2505.00969) |

### PBR Material & Physically-Based Rendering Patterns

| # | Pattern | Symptom | Fix |
|---|---------|---------|-----|
| 51 | Joint GI + anisotropic specular optimization collapses to trivial solution | Specular highlights vanish under low-light or nighttime conditions; all materials converge to Lambertian; loss of reflective/refractive detail | Initialize materials with anisotropic priors (spherical Gaussian lobes); use separate optimization schedules for diffuse and specular components; add specular regularization loss to prevent collapse to pure Lambertian (Nighttime AD GS, ArXiv 2505.01438) |

### HDR & Multi-Exposure Patterns

| # | Pattern | Symptom | Fix |
|---|---------|---------|-----|
| 52 | Naively mixing alternating-exposure frames in loss function | Model favors overexposed views; loss of highlight detail; blown-out specular reflections; inconsistent tone across views | Weight each frame's loss by inverse exposure duration or use exposure-normalized rendering; apply tone-mapping-aware loss that operates in log domain; separate HDR reconstruction from tone-mapping optimization (HDR-NSFF, ArXiv 2505.01090) |

### 4DGS Temporal Consistency Patterns

| # | Pattern | Symptom | Fix |
|---|---------|---------|-----|
| 53 | 4DGS temporal partitioning instability | Unstable dynamic representations with high run-to-run variance when naively assigning Gaussian durations without temporal partitioning; discrepancy between photometric fidelity and spatiotemporal consistency | Use principled duration assignment via gated marginalization + neural velocity fields instead of heuristic per-Gaussian lifetime settings (FreeTimeGS++, ArXiv 2605.03337) |

### Fluid & Particle GS Patterns (LagrangianSplats, ParticleGS)

| # | Pattern | Symptom | Fix |
|---|---------|---------|-----|
| 54 | Missing divergence-free constraint in fluid GS | Unphysical fluid behavior: volume not conserved; fluid appears to compress/expand; particles cluster or disperse non-physically | Enforce divergence-free velocity field constraint (∇·v = 0) as soft loss or projection step; use Helmholtz decomposition to project velocity onto divergence-free subspace; verify incompressibility by checking ∂ρ/∂t ≈ 0 over simulation steps (LagrangianSplats, ParticleGS context) |

### VQ Compression & Streaming Patterns (CAGS)

| # | Pattern | Symptom | Fix |
|---|---------|---------|-----|
| 55 | VQ codebook inconsistency across LoD levels in streaming | Visual popping when switching LOD levels; color/opacity discontinuity at chunk boundaries; codebook drift between independently trained LoD tiers | Share a single global codebook across all LoD levels; align quantization boundaries during training with multi-resolution consistency loss; validate cross-LoD decode coherence with PSNR threshold per transition (CAGS context) |

### Transmissive & Dual-GS Patterns (TransmissiveGS)

| # | Pattern | Symptom | Fix |
|---|---------|---------|-----|
| 56 | Missing deferred shading in transmissive dual-GS implementations | Incorrect blending of reflective and transmissive components; specular reflections bleed through opaque surfaces; glass objects render as solid color | Use deferred shading pipeline: render surface and reflection Gaussians to separate G-buffers; composite transmissive and reflective contributions in screen space; separate light field sampling for near-field vs far-field reflections (TransmissiveGS, ArXiv 2605.10705) |

### Progressive 4DGS Streaming Patterns (PD-4DGS)

| # | Pattern | Symptom | Fix |
|---|---------|---------|-----|
| 57 | Serving monolithic 4DGS without progressive layer decomposition | Long first-frame latency (73-930s); cannot start playback until entire dynamic scene is loaded; poor UX in bandwidth-constrained environments | Decompose 4DGS into 3 progressive layers: (1) static scaffold, (2) global deformation, (3) local refinement; encode as DASH/HLS-compatible bitstream; start playback after layer 1; progressively enhance with layers 2-3; reduces first-frame latency to ~1.7s (PD-4DGS, ArXiv 2605.11427) |

### Feed-Forward Alpha Normalization Patterns (RoSplat)

| # | Pattern | Symptom | Fix |
|---|---------|---------|-----|
| 58 | Missing alpha normalization in feed-forward pixel-wise GS when input view count varies | Over-brightness with varying number of overlapping Gaussians; rendered image intensity scales non-linearly with view count; inconsistent appearance across different input configurations | Normalize accumulated alpha by the number of input views before final compositing; apply view-count-adaptive scaling factor to per-pixel alpha accumulation; verify brightness consistency with unit test across 1/3/6/9 input views (RoSplat) |

### Monolithic 4DGS Streaming Patterns (BlitzGS)

| # | Pattern | Symptom | Fix |
|---|---------|---------|-----|
| 59 | Monolithic 4DGS bitstream without progressive deformation decomposition | Long black-screen waits during initial load; entire 4DGS scene must download before any frame renders; poor UX especially on mobile/constrained networks | Use progressive deformation decomposition: encode static scaffold first, then global deformation, then local refinement as separate streamable layers; see PD-4DGS/BlitzGS for correct approach; target <2s first-frame latency via DASH/HLS chunking |

### In-the-Wild Harmonization Patterns (HarmoGS)

| # | Pattern | Symptom | Fix |
|---|---------|---------|-----|
| 60 | Gradient conflict in in-the-wild 3DGS without harmonization | Transient distractors (pedestrians, vehicles, shadows) and illumination inconsistencies create conflicting cross-view gradients; optimization destabilizes; Gaussians oscillate or collapse in problematic regions | Apply gradient harmonization: detect and dampen conflicting gradients from transient objects and lighting variations; use illumination harmonization module to normalize appearance across views; resolve distractor conflicts via attention-based gradient filtering (HarmoGS) |

### Feed-Forward Cardinality Patterns (SplatWeaver)

| # | Pattern | Symptom | Fix |
|---|---------|---------|-----|
| 61 | Hardcoded cardinality in feed-forward GS prediction | Cannot adapt to scene complexity; wasting compute on flat regions while under-allocating on complex ones; `num_gaussians_per_pixel = CONSTANT` or `gaussians = self.mlp(x).reshape(B, N, C)` where N is fixed | Use expert routing to dynamically allocate varying numbers of Gaussians per pixel based on local scene complexity; replace fixed N with learned cardinality prediction (SplatWeaver, ArXiv 2605.07287) |

### Asymmetric Kernel Patterns (SNS)

| # | Pattern | Symptom | Fix |
|---|---------|---------|-----|
| 62 | Symmetric-only Gaussian kernel limiting boundary representation | Wasted primitive budget approximating asymmetric geometry; poor quality on sharp boundaries, one-sided surfaces, or thin structures; using `covariance = R @ S @ S^T @ R^T` without skewness parameter | Replace symmetric Gaussian with Skew-Normal distribution that introduces skewness parameter; allows one-sided tails for sharp boundaries and thin structures without increasing Gaussian count (SNS, ArXiv 2605.15010) |

### Alpha-Compositing Feature Bias Patterns (ULF-Loc)

| # | Pattern | Symptom | Fix |
|---|---------|---------|-----|
| 63 | Alpha-compositing introduces inherent feature bias in localization tasks | Poor 2D-3D feature matching accuracy; localization precision plateau; feature distinctiveness degrades with more Gaussians in a region | Standard alpha-compositing aggregates per-Gaussian features using visibility weights (T_i * α_i), causing each Gaussian's stored feature to become a weighted average of neighbors' features during training — learned features are never "pure" representations. Replace alpha-compositing with geometry-weighted aggregation (e.g., inverse distance weighting without visibility blending) for feature localization; use keypoint consensus sampling to filter unreliable features (ULF-Loc, CVPR 2026 Highlight) |

### Uncompressed Multi-View Token Aggregation Patterns (ZPressor)

| # | Pattern | Symptom | Fix |
|---|---------|---------|-----|
| 64 | Uncompressed multi-view token aggregation in feed-forward 3DGS | Memory/time grows rapidly with input view count; attention or cost-volume fusion becomes impractical beyond dozens of views; adding views does not improve output because redundant tokens dominate | Add bottleneck-aware latent compression before Gaussian prediction; compress redundant multi-view tokens while preserving geometric cues; test scaling at 2/8/32/100+ views and report memory vs quality (ZPressor, ArXiv 2505.23734) |

### Voxel-Aligned Feed-Forward Patterns (VolSplat)

| # | Pattern | Symptom | Fix |
|---|---------|---------|-----|
| 65 | Independent pixel-aligned Gaussian prediction for each input view | Duplicate Gaussians, inconsistent geometry across views, view-dependent floaters near occlusions, and poor fusion when camera baselines grow | Use a shared voxel-aligned prediction space so multi-view evidence lands in a common 3D reference frame before Gaussian decoding; validate cross-view consistency and duplicate-pruning rates (VolSplat, ArXiv 2509.19297) |

### Feed-Forward Depth Representation Patterns (PM-Loss)

| # | Pattern | Symptom | Fix |
|---|---------|---------|-----|
| 66 | Pixel-wise depth loss only for feed-forward 3DGS geometry | Jagged depth discontinuities, over-smoothed object boundaries, and inconsistent point positions after unprojection even when depth error is numerically low | Add pointmap loss that supervises depth-derived 3D coordinates in point space; evaluate boundary-region PSNR/LPIPS and geometry metrics to verify smoother depth transitions without inference-time cost (PM-Loss, ArXiv 2506.05327) |

### Photometric Ambiguity Patterns (AmbiSuR)

| # | Pattern | Symptom | Fix |
|---|---------|---------|-----|
| 67 | Standard density control amplifies photometric ambiguity causing surface degradation | Over-reconstructed floaters and malignant geometric overlap; poor surface extraction quality; excessive Gaussians in ambiguous regions | Alpha-compositing lacks constraints against over-reconstruction; SH coefficients serve as ambiguity self-indicator but signal is not leveraged during training. Add primitive truncation + ray-color consistency constraints; monitor SH coefficient magnitudes as ambiguity indicators (AmbiSuR, ICML 2026) |
| 68 | GMM temporal opacity training converges slowly without flow prior warmup | Slow convergence of temporal opacity modeling in 4DGS SLAM; inconsistent dynamic object rendering; training takes 2-3x longer to stabilize | Pre-train optical flow estimation before enabling GMM temporal opacity; use flow prior warmup schedule for first N iterations with frozen temporal parameters (Flow4DGS-SLAM) |
| 69 | Slice-aware PSF projection operator requires float64 precision for diagnostic fidelity | Banding artifacts in volumetric medical GS when using float16; diagnostic quality degradation in CT/cBCT reconstruction; false contours appear in soft tissue regions | Use float64 accumulation for slice-aware PSF projection kernel; cast to float32 only after final accumulation; verify with DICOM-grade PSNR comparison against float32 baseline (GaussianPile) |
| 70 | CAdam densification dilemma in generative distillation | Standard magnitude-based gradient accumulation aggregates transient noise alongside geometric signals; Gaussians over-densify in stochastic regions or under-fit geometric structure | Use context-adaptive densification that distinguishes transient generative noise from geometric signals; apply signal-to-noise ratio gating before densification decisions; decouple generative gradient accumulation from geometric gradient paths (CAdam, ArXiv 2605.20872) |
| 71 | GGD-SLAM dynamic interference in factor graph | Dynamic object residuals contaminate static factor graph; tracking drift accumulates as moving objects inject incorrect constraints | Mask dynamic region residuals before factor graph construction; detect and exclude dynamic Gaussians from tracking optimization; use motion model to separate static/dynamic contributions (GGD-SLAM, ICRA 2026, ArXiv 2604.12837) |
| 72 | Depth Peeling transmittance error | Incorrect depth peeling order causes transmittance accumulation errors when implementing sort-free rendering with semi-transparent boundaries; visual artifacts at overlap boundaries | Enforce strict front-to-back peeling order per layer; validate transmittance accumulation matches alpha-compositing baseline; add layer continuity constraint to prevent depth reversal (DP-GES, ArXiv 2605.25345) |
| 73 | Token count-resolution coupling | When learnable token count is hardcoded to input resolution, scaling to higher resolution silently drops primitives; quality degrades without warning | Decouple token count from input resolution via adaptive pooling or learned cardinality; validate primitive count consistency across resolution scales; add budget-aware token allocation (TokenGS, ArXiv 2604.15239) |
| 74 | Articulation joint map consistency | Per-pixel joint prediction in feed-forward articulated GS produces inconsistent joint assignments across neighboring pixels; visible seams at part boundaries | Add spatial consistency loss on joint maps; enforce part-level joint smoothness via bilateral filtering or CRF; validate across viewpoints that joint assignments are topologically consistent (ArtSplat, ArXiv 2605.24304) |
| 75 | Voxel-Gaussian tethering gradient starvation | When Gaussians are tethered to voxel SDF anchors, gradient from SDF loss may starve Gaussian position updates; convergence stalls as positions cannot escape anchor pull | Use gradient scaling or stop-gradient on SDF anchor pull when Gaussian position gradient magnitude falls below threshold; alternate SDF and position optimization steps; monitor position gradient norms for starvation detection (VoxelGS, ArXiv 2605.26616) |

### Probability-Based Densification Patterns (EulerianGS)

| # | Pattern | Symptom | Fix |
|---|---------|---------|-----|
| 76 | Heuristic ADC densification is brittle and hyperparameter-sensitive | Heuristic clone/split/prune decisions (gradient threshold, scale threshold, opacity threshold) require per-scene tuning; different scenes need different thresholds; densification priors can interfere with optimization | Replace heuristic densification with gradient-based probability density optimization; treat Gaussian locations as samples from a learnable density field; use multi-scale hierarchical grids and unbiased gradient estimators with control variates; allows probability mass to flow to where loss demands (EulerianGS, ArXiv 2605.29136, CVPR 2026) |

### TPS Initialization Patterns (TWINGS)

| # | Pattern | Symptom | Fix |
|---|---------|---------|-----|
| 77 | Sparse-view 3DGS initialization from SfM points is insufficient | Under sparse-view conditioning, SfM produces too few points for good 3DGS initialization; resulting reconstructions have missing structure and poor color fidelity | Use Thin Plate Splines (TPS) warp to align backprojected depth points with triangulated 3D control points; sample calibrated points near control points for geometrically accurate initialization (TWINGS, ArXiv 2605.22069, CVPR 2026) |

### Uncertainty-Aware Active Mapping Patterns (GAVIS)

| # | Pattern | Symptom | Fix |
|---|---------|---------|-----|
| 78 | No principled uncertainty quantification for 3DGS | Existing 3DGS provides no per-pixel uncertainty; active mapping relies on heuristics; regions unseen from training views produce unreliable predictions without warning | Compute anisotropic visibility field per Gaussian using spherical harmonics; integrate into Bayesian Network rasterizer for real-time (200 FPS) uncertainty quantification; use maximum information gain for active viewpoint selection (GAVIS, ArXiv 2605.30342, CVPR 2026) |

### High-Capacity Watermarking Patterns (BitC-3DGS)

| # | Pattern | Symptom | Fix |
|---|---------|---------|-----|
| 79 | 3DGS watermarking limited to 77-bit messages by CLIP token context | Existing token-based watermarking methods are capped at 77 bits due to CLIP's fixed context length; insufficient for rich ownership/provenance/authentication information in large-scale 3D asset pipelines | Use bit-compressed tokenization that encodes multiple message bits per semantic token; dual-branch architecture for joint chunk decompression and bit decoding; hard-message sampling strategy for combinatorial coverage (BitC-3DGS, ArXiv 2605.29583) |

### View-Dependent Splatting Kernel Patterns

| # | Pattern | Symptom | Fix |
|---|---------|---------|-----|
| 80 | Fixed Gaussian kernel shape ignores view-dependent effects | Standard 3DGS uses fixed covariance per Gaussian regardless of viewing angle; specular highlights and view-dependent reflections require excessive Gaussians to approximate, leading to bloat | Learn view-dependent splatting kernels that adapt covariance based on ray direction; replace static 2D projection with learned kernel function; validate by measuring Gaussian count reduction and specular fidelity (View-Dependent Splatting Kernels, ArXiv 2605.25426, SIGGRAPH 2026) |

### UV-Parameterized Head Reconstruction Patterns (HeadsUp)

| # | Pattern | Symptom | Fix |
|---|---------|---------|-----|
| 81 | Per-pixel Gaussian count coupled to input resolution | Feed-forward 3DGS head methods produce Gaussian count proportional to input image count × resolution; scaling to more cameras or higher resolution causes OOM or quadratic compute growth | Decouple Gaussian count from input via UV-parameterized representation; predict Gaussians on a fixed UV grid regardless of input size; enables training on 10K+ subjects with arbitrary camera counts (HeadsUp, ArXiv 2605.04035, Apple) |

### 3D-Aware Memory Bank Segmentation Patterns (Gaga)

| # | Pattern | Symptom | Fix |
|---|---------|---------|-----|
| 82 | Video-tracking-dependent 3DGS segmentation fails on sparse views | Existing 3DGS segmentation relies on continuous video tracking or contrastive learning; fails when camera poses are sparse or non-sequential; mask label inconsistency across views | Use 3D-aware memory bank that leverages spatial information to associate masks across diverse camera poses without requiring temporal continuity; eliminates continuous-view-change assumption (Gaga, TMLR 2026) |

### Hierarchical Tile Rendering Patterns (HiGS)

| # | Pattern | Symptom | Fix |
|---|---------|---------|-----|
| 83 | Partitioning/Rasterization scale conflict in hierarchical tile rendering | In hierarchical tile rendering, partitioning bins Gaussians at coarse macro-tile granularity while rasterization executes alpha compositing at fine render-tile granularity. Gaussians deemed "non-covering" at coarse level may still contribute at fine level, breaking exact alpha compositing and producing small holes and color shifts | Partitioning coverage test must execute at fine sub-tile granularity, or add conservative relaxation factor to coarse-grain test. Verification: compare hierarchical vs flat tile-based rendering per-pixel; PSNR difference should be <0.01 dB. (HiGS, arXiv:2606.00352) |

### Neural Field Distillation Patterns (DDF-GS)

| # | Pattern | Symptom | Fix |
|---|---------|---------|-----|
| 84 | Depth supervision noise propagation in neural field distillation | In DDF-style distillation, teacher network depth maps contain blur noise (especially at edges/occlusions); using them directly as 3DGS depth loss propagates noise into Gaussian position/scale parameters, causing geometric degradation. Clean distance supervision (from SfM sparse points or LiDAR) avoids this but has incomplete coverage | Apply edge-aware confidence weighting to depth loss: reduce weight at depth discontinuities (gradient magnitude threshold); or use depth certainty map for confidence gating. Verify: compare Chamfer Distance of distilled depth vs clean distance supervision. (DDF-GS, arXiv:2606.00817) |

### Variational Pruning Patterns (VEDAL)

| # | Pattern | Symptom | Fix |
|---|---------|---------|-----|
| 85 | Prediction-error gating boundary condition in variational pruning | In variational pruning, Gaussian retention/pruning is gated by prediction error; at threshold boundary, hard switching causes gradient vanishing (gradient=0) or explosion (discontinuous jump), training oscillates near boundary, pruning ratio fluctuates wildly across iterations | Replace hard gating with smooth sigmoid or Gumbel-Softmax; add temperature annealing at threshold boundary for gradual soft→hard transition. Verify: monitor consecutive iteration pruning ratio change rate, should be <5%/iter. (VEDAL, arXiv:2606.02346) |

### Mesh-Gaussian Conversion Patterns (Dynamic Mesh-Gaussian)

| # | Pattern | Symptom | Fix |
|---|---------|---------|-----|
| 86 | Geometric degeneration in fixed/changing topology mesh-to-Gaussian conversion | Fixed-topology mesh→Gaussian conversion initializes Gaussians from local face normals without global geometric consistency check; topology change points cause severe Gaussian overlap; 65-80% of converted Gaussians exhibit degeneration (flattening, inconsistent normals, scale degenerating to near-zero) | Add geometric verification pass after conversion: detect degenerate Gaussians (min/max eigenvalue ratio < ε) and trigger re-initialization; resample at topology change regions instead of direct attribute inheritance. Degeneration rate should be <5%. (Dynamic Mesh-Gaussian, arXiv:2606.00444) |

### Spline Trajectory Patterns (WebSpline)

| # | Pattern | Symptom | Fix |
|---|---------|---------|-----|
| 87 | Hermite spline initial tangent estimation in continuous trajectory modeling | When using Hermite splines for Gaussian motion trajectories, initial tangent estimated from endpoint displacement difference deviates from true motion direction when sampling rate is insufficient or endpoints are noisy, causing loop-back artifacts or non-physical oscillation at trajectory start/end frames | Use Catmull-Rom or B-spline instead of Hermite to avoid explicit tangent estimation; if Hermite is required, use multi-frame weighted tangent estimation (central difference + forward/backward weighting) instead of simple differencing. Verify: check trajectory curvature continuity and velocity direction consistency. (WebSpline, arXiv:2606.02096) |

### Event Simulation Patterns (TIDES)

| # | Pattern | Symptom | Fix |
|---|---------|---------|-----|
| 88 | Self-excited oscillation in adaptive time-stepping for event simulation | In event camera simulation, adaptive time-stepping adjusts step size based on event density; dense-event regions trigger shorter steps, which generate more events, further shortening steps in positive feedback; step size approaches zero, simulation stalls or produces massive numerical error; sparse regions miss fast changes | Add step size bounds (Δt_min, Δt_max); apply damping factor to step size adjustment rate (Δt_{n+1} = η·Δt_new + (1-η)·Δt_n, η < 1); or use event-count triggering instead of density-driven. Verify: monitor Δt sequence, confirm no monotonic decrease toward zero. (TIDES, arXiv:2606.02058) |

### Token-Based Feed-Forward Patterns (ZipSplat)

| # | Pattern | Symptom | Fix |
|---|---------|---------|-----|
| 89 | Token-based feed-forward cardinality mismatch | K-means token clustering produces N_tokens Gaussian clusters, but downstream rasterizer expects pixel-resolution Gaussian count; token count vs pixel grid resolution mismatch causes ghost Gaussians at tile boundaries where cluster assignments overlap adjacent tiles | Ensure token count is explicitly managed: (1) add tile-boundary-aware k-means that expands tokens near tile edges; (2) validate token→Gaussian expansion produces consistent counts per tile; (3) add ghost Gaussian detection via render-then-compare. Verify: compare rendered output with and without tile-boundary expansion. (ZipSplat, arXiv:2606.05102) |
| 100 | Free-positioned Gaussian gradient starvation | When Gaussian positions are not constrained to observation rays (e.g., token-decoded via anti-log activation), Gaussians may drift to regions invisible to camera; rendering loss gradients cannot reach them, causing gradient starvation and training instability/divergence | (1) Single-directional Chamfer geometry loss: penalize Gaussian-to-nearest-real-point distance only (not bidirectional, which destroys adaptive allocation); (2) Coupled initialization: all 32 Gaussians per token start with identical parameters, forcing gradual differentiation; (3) Low initial opacity (~0.18) so photometric gradients penetrate to deep Gaussians; (4) Progressive view scheduling: start 2-view → 24-view. Verify: monitor fraction of zero-gradient Gaussians per iteration; should be <5%. (ZipSplat, arXiv:2606.05102) |

### Volumetric Medical Patterns (GaussianPile)

| # | Pattern | Symptom | Fix |
|---|---------|---------|-----|
| 101 | Alpha-blending applied to volumetric data | Standard 3DGS alpha-blending compositing assumes opaque surface occlusion, but volumetric medical imaging (CT/ultrasound/MRI) pixel intensity is additive integration along imaging direction; alpha-blending incorrectly models occlusion for transparent volumetric structures, producing floating artifacts and 3D structural inconsistency | Replace alpha-blending with additive rasterization: pixel intensity = Σ(κ_i · T_{i-1} · c_i) where T is not consumed by individual Gaussians in volumetric mode; add focus-aware PSF projection modeling slice thickness and focal depth; optionally constrain SH coefficients to view-independent (remove view-dependent color for volumetric intensity). Verify: compare 2D slice PSNR + 3D volumetric PSNR; ensure 3D consistency improves. (GaussianPile, arXiv:2603.20611, CVPR 2026) |

### Geometry Opacity Decoupling Patterns (Geometry Gaussians)

| # | Pattern | Symptom | Fix |
|---|---------|---------|-----|
| 90 | Geometry opacity and appearance opacity gradient conflict | When per-splat geometry opacity (α_geo) and appearance opacity (α_app) are simultaneously optimized, gradients from α_geo try to make thin surfaces opaque (pull α_geo→1) while α_app gradients may reduce appearance opacity for transparent objects (pull α_app→0); these opposing signals cause oscillation or converge to suboptimal local minimum where both are ~0.5 | Option 1: Staggered optimization — freeze α_geo for first N iterations, then jointly optimize with reduced lr. Option 2: Geometry-first loss — supervise α_geo via depth/normal consistency, supervise α_app via photometric loss with α_geo detached. Option 3: Regularize α_geo via Laplacian smoothness. Verify: plot α_geo and α_app histograms; check for bimodal distributions. (Geometry Gaussians, arXiv:2606.05124) |

### Reflective Material Patterns (3DReflecNet)

| # | Pattern | Symptom | Fix |
|---|---------|---------|-----|
| 91 | Reflective/transparent material reconstruction collapse | 3DGS/NeRF methods suffer catastrophic PSNR collapse (>10 dB drop) on reflective, transparent, and low-texture surfaces; three failure modes: (a) view-dependent color SH coefficients oscillate for specular reflections, (b) alpha compositing cannot resolve transparent surface ordering ambiguity, (c) sparse point cloud initialization fails on featureless glass surfaces | Per-mode fixes: (a) Specular mode: constrain SH high-order coefficients via learned smoothness prior or separate specular/reflection lobes (RT-Splatting approach). (b) Transparency mode: use geometry-aware opacity (Geometry Gaussians) or signed opacity to disambiguate surface ordering. (c) Featureless mode: use depth prior (Depth-Anything-V2) or normal prior for initialization. Verify: test on 3DReflecNet benchmark (48 material combos). (3DReflecNet, arXiv:2605.10204, CVPR 2026) |

### Streaming Reconstruction Patterns (Anchor3R)

| # | Pattern | Symptom | Fix |
|---|---------|---------|-----|
| 92 | Streaming reconstruction transient anchor drift | In streaming 3D reconstruction, current-centric transient anchors for local chunks drift without explicit loop closure; accumulated pose error grows linearly with sequence length; revisit of previously seen areas fails to register correctly | Integrate global pose optimization: (1) keyframe-based loop closure detection via feature matching; (2) motion averaging for drift correction across chunks; (3) anchor position refinement via bundle adjustment on overlapping regions. Verify: measure absolute trajectory error (ATE) on long sequences with loop closures. (Anchor3R, arXiv:2606.05035) |

### Mesh Generation Patterns (MeshWeaver)

| # | Pattern | Symptom | Fix |
|---|---------|---------|-----|
| 93 | Autoregressive mesh vertex count drift | During autoregressive mesh generation, predicted vertex count diverges from target face count; no explicit termination condition causes over-generation (degenerate tiny faces) or under-generation (missing details); quality degrades significantly when count error >10% | (1) Add explicit face count token in sequence header as generation budget; (2) Apply count-aware stopping criterion: if remaining budget <5% and next vertex confidence < threshold, terminate. (3) Post-process: face merging for over-generation, subdivision for under-generation. Verify: measure face count accuracy on held-out test set. (MeshWeaver, arXiv:2606.04688, CVPR 2026) |

### Physics Simulation Gradient Patterns (RAF)

| # | Pattern | Category | Method | Symptom | Fix |
|---|---------|----------|--------|---------|-----|
| 94 | Physics Abstraction Layer Gradient Disconnection | Simulation | RAF | When 3DGS particles pass through representation abstraction layer (visual→physics→visual), gradient backpropagation is severed at the physics kernel boundary, making end-to-end training impossible | Use differentiable physics bridge with custom autograd; ensure gradient continuity across abstraction layer boundaries; add surrogate gradient or straight-through estimator at physics kernel interface |

### Eigenmode Deformation Patterns (FreeForm)

| # | Pattern | Category | Method | Symptom | Fix |
|---|---------|----------|--------|---------|-----|
| 95 | Eigenmode Basis Singularities in Particle Skinning | Physics | FreeForm | Particle-skinned eigenmode deformation fails when eigenvalues are degenerate (repeated eigenvalues), causing undefined deformation directions and mesh self-intersection | Add perturbation to degenerate eigenvalues (ε-nudge); use eigenvalue gap threshold to detect singularity; fall back to PCA-based deformation when eigenvalue ratio < threshold |

### Bayesian Pose-Gaussian Optimization Patterns (BA-GS)

| # | Pattern | Category | Method | Symptom | Fix |
|---|---------|----------|--------|---------|-----|
| 96 | Bayesian Pose-Gaussian Coupling Collapse | Optimization | BA-GS | Joint Bayesian optimization of camera poses + Gaussians without SfM initialization can collapse to trivial solutions where all Gaussians cluster at origin | Initialize camera poses from SfM/ColMAP before joint optimization; add pose prior term to prevent degenerate solutions; use progressive coupling strategy that freezes poses for first N iterations |

### Query-Based 4D Reconstruction Patterns (D4RT)

| # | Pattern | Category | Method | Symptom | Fix |
|---|---------|----------|--------|---------|-----|
| 97 | Query-Based Temporal Consistency Drift | Dynamic/4D | D4RT | Unified query mechanism for 4D reconstruction produces temporally inconsistent geometry when query points are processed independently across frames without temporal regularization | Add temporal regularization loss on query point trajectories; enforce cross-frame query correspondence via contrastive or cycle consistency; use shared latent temporal code across frames |

### Adaptive Pruning Patterns (Prune Wisely)

| # | Pattern | Category | Method | Symptom | Fix |
|---|---------|----------|--------|---------|-----|
| 98 | Difference-of-Gaussian Pruning False Positive | Optimization | Prune Wisely | DoG primitives incorrectly flag high-frequency detail Gaussians as redundant when adjacent Gaussians have similar but not identical positions; aggressive DoG threshold merges fine detail into coarse reconstruction | Use spatially adaptive DoG threshold proportional to local Gaussian density; preserve Gaussians where DoG response exceeds detail-preservation threshold; validate with PSNR on held-out views after each pruning step. (Prune Wisely, arXiv:2602.24136, CVPR 2026) |

### Proxy Mesh Occlusion Patterns (Proxy-GS)

| # | Pattern | Category | Method | Symptom | Fix |
|---|---------|----------|--------|---------|-----|
| 99 | Proxy Mesh Occlusion Over-Culling | Acceleration | Proxy-GS | Lightweight proxy mesh for occlusion culling incorrectly culls visible Gaussians when proxy mesh tessellation is too coarse; thin structures (wires, poles) pass between proxy triangles and are culled despite being visible | Ensure proxy mesh minimum tessellation density matches scene thin-structure distribution; add conservative offset (ε-inflation) to proxy triangles when culling; fall back to full rendering for tiles containing thin-structure Gaussians detected by aspect-ratio filter. (Proxy-GS, arXiv:2509.24421, CVPR 2026 Full Score Oral) |

### Feed-Forward Geometry-Aware Deformable Aggregation Patterns (GADA)

| # | Pattern | Category | Method | Symptom | Fix |
|---|---------|----------|--------|---------|-----|
| 102 | Deformable Offset Over-Displacement | Feed-Forward | GADA | Geometry-aware deformable aggregation with learnable offsets can produce excessive displacement when implicit confidence weights are miscalibrated; Gaussians drift far from their geometric anchors, causing floaters and surface distortion in regions with weak photometric supervision | (1) Clamp offset magnitude to local Gaussian density radius; (2) Add anchor-pull regularization: λ·‖offset‖² decay term; (3) Use temperature-annealed softmax for implicit confidence: start high-T (uniform)→low-T (sharp). Verify: compare offset statistics (mean/std) across epochs; std should stabilize. (GADA, arXiv:2607.00595, ICML 2026) |

### Inverse Feed-Forward PBR Material Patterns (InvSplat)

| # | Pattern | Category | Method | Symptom | Fix |
|---|---------|----------|--------|---------|-----|
| 103 | Albedo-Illumination Entanglement | Feed-Forward / Material | InvSplat | Inverse feed-forward splatting predicts intrinsic material attributes (albedo, metallic, roughness) from a single forward pass, but albedo and residual illumination are entangled; under novel lighting, relit results show baked-in shadows/highlights from the original capture, producing incorrect PBR | (1) Decompose predicted color into view-independent albedo and view-dependent residual via disentanglement loss; (2) Add shading consistency constraint: re-render under uniform lighting should match albedo-only output; (3) Use multi-view supervision with known lighting for initial training, then fine-tune on in-the-wild. Verify: check relighting consistency under 3+ novel environment maps. (InvSplat, arXiv:2607.02301) |

### Underwater Physics-Guided GS Patterns (DualPhys-GS)

| # | Pattern | Category | Method | Symptom | Fix |
|---|---------|----------|--------|---------|-----|
| 104 | Attenuation Coefficient Mismatch | Robustness / Physics | DualPhys-GS | Dual physically-guided underwater 3DGS uses fixed wavelength-dependent attenuation coefficients; when deployment water type (turbidity, chlorophyll concentration) differs from training data, attenuation model generates incorrect color correction, producing green/magenta casts | (1) Make attenuation coefficients learnable per-scene with physics-constrained prior; (2) Add water-type classifier to select attenuation profile from a parametric family; (3) Use dark channel prior as unsuperved regularization for unknown water types. Verify: test cross-water-type generalization on Sea-thru dataset variants. (DualPhys-GS, arXiv:2508.09610) |

---

## v3.0.0 Expansion — 2026 Round 1: Modern Framework, Large-Scale Engineering, AI-Fusion, Physics & Graphics (Patterns #105–#164)

> Added 2026-10-29. Covers new methods from CVPR 2026, NeurIPS 2026, SIGGRAPH 2026, and engineering gaps identified from gsplat/Nerfstudio ecosystem, large-scale scene reconstruction, 3DGS+AI/LLM fusion, differentiable physics, and general graphics code review.

### gsplat / Nerfstudio Framework Migration Patterns

| # | Pattern | Category | Method | Symptom | Fix |
|---|---------|----------|--------|---------|-----|
| 105 | INRIA→gsplat attribute layout mismatch | Framework Migration | gsplat migration | When porting INRIA-style 3DGS code to gsplat/Nerfstudio, Gaussian attribute ordering (means, scales, rotations, opacities, SH coefficients) differs: INRIA stores SH as `(N, max_sh_degree+1)^2, 3)` while gsplat uses `(N, (max_sh_degree+1)^2 * 3)`; scales are stored as log-scales in INRIA but raw scales in gsplat; rotation quaternion convention is `(w,x,y,z)` in INRIA but `(x,y,z,w)` in some gsplat versions. Silently swapping produces NaN or color inversion | Audit attribute layout via `gsplat.rasterize()` signature; verify tensor shapes against `GaussianModelConfig` field definitions; add shape assertion unit test: `assert means.shape == (N, 3)` and `assert opacities.shape == (N, 1) or (N,)`; use `gsplat.sh_degree_to_channels()` for SH conversion. Verify: render a single Gaussian and compare pixel value against analytic expectation |
| 106 | Missing `rasterize_backward` custom autograd in gsplat wrapper | Framework Migration | gsplat custom rasterizer | When implementing a custom rasterization kernel on top of gsplat, the forward pass may work but gradients return `None` for Gaussian attributes if `torch.autograd.Function.backward()` is not properly registered or if the backward kernel does not match the forward kernel's memory layout. Training appears to run but PSNR plateaus immediately | Verify that `ctx.save_for_backward()` stores all tensors needed in backward; check that backward kernel reads from the same tile structure as forward; use `torch.autograd.gradcheck()` on a small test case; ensure `requires_grad=True` on all Gaussian attribute tensors. Verify: check `param.grad is not None` after first loss.backward() for every optimizable parameter |
| 107 | Nerfstudio `PipelineConfig` vs manual training loop mismatch | Framework Migration | Nerfstudio integration | When embedding custom 3DGS methods into Nerfstudio's `TrainLoop`, custom training logic (e.g., progressive SH schedule, custom densification) placed in `forward()` or `get_loss_dict()` may not execute at the expected training phase because Nerfstudio's `TrainLoop` controls iteration count, checkpointing, and eval scheduling. Custom densification in `get_loss_dict()` may be called during eval mode | Place training-phase logic in `get_outputs()` or override `step()`; use `self.train()` / `self.eval()` checks; register custom callbacks via `@pipeline_callbacks`; verify densification only triggers when `self.training and self.step % densify_interval == 0`. Verify: log densification count per epoch and confirm it matches expected schedule |
| 108 | `gsplat.rasterize` vs `diff_gaussian_rasterization` API confusion in hybrid codebases | Framework Migration | Dual backend | When a codebase imports both `gsplat` and `diff_gaussian_rasterization` (common in forks), the two backends use different `rasterize()` signatures: gsplat takes `means2d, conics, colors, opacities` as separate tensors while `diff_gaussian_rasterization` takes a `raster_settings` object + concatenated tensor. Mixing calls produces silent shape mismatches or incorrect gradient flow | Standardize on one backend per project; if both are needed, create a wrapper class with explicit `backend` property and assert-compatible tensor formats; use `from gsplat import rasterize as gs_rasterize` and `from diff_gaussian_rasterization import GaussianRasterizer as inria_rasterize` with named imports. Verify: render identical Gaussians with both backends and assert PSNR difference < 0.01 dB |

### Large-Scale & Block-Based Reconstruction Patterns

| # | Pattern | Category | Method | Symptom | Fix |
|---|---------|----------|--------|---------|-----|
| 109 | Block boundary seam artifacts in partitioned 3DGS | Large-Scale | Block-3DGS / Hierarchical GS | When a large scene is split into spatial blocks for independent 3DGS training, Gaussians at block boundaries are optimized independently, producing visible seams, color discontinuities, and depth jumps at block edges when merged | (1) Use overlap regions between blocks (typically 10-20% of block size) and blend Gaussians in overlap zone during merge; (2) Apply boundary consistency loss: for boundary Gaussians, add L2 loss on rendered color consistency across neighboring blocks; (3) Use ghost Gaussians: duplicate boundary Gaussians in both blocks and average attributes after merge. Verify: render across block boundary and compute PSNR on a 50px boundary strip; target < 1 dB drop vs interior |
| 110 | OOM during large-scale 3DGS training from uncontrolled Gaussian growth | Large-Scale | City-scale 3DGS | In large outdoor scenes (>1000 images, >500K initial points), adaptive density control can grow Gaussian count to 10M+ within 15k iterations, exhausting GPU memory (typically 24-48GB). Standard ADC thresholds designed for single-room scenes produce excessive splitting in unbounded outdoor regions | (1) Impose hard Gaussian count cap: if N > max_gaussians, disable clone/split and only prune; (2) Use spatially-adaptive gradient threshold: higher threshold in low-texture regions (sky, pavement), lower in high-detail regions; (3) Implement block-wise training with global merge; (4) Use gradient accumulation to reduce per-iteration memory. Verify: monitor `torch.cuda.max_memory_allocated()` and Gaussian count every 100 iterations; ensure peak memory < 80% of VRAM |
| 111 | Progressive/LOD streaming desynchronization | Large-Scale | Hierarchical 3DGS / Streaming GS | When implementing Level-of-Detail streaming for 3DGS, the renderer may request a finer LOD level before the data stream has finished loading it, producing popping artifacts, missing geometry, or crash from accessing unloaded Gaussian buffers. The issue is common in web/mobile deployment where network latency is unpredictable | (1) Implement double-buffered LOD: maintain current and next LOD in memory; swap only after next level is fully loaded; (2) Use fallback rendering: if requested LOD unavailable, render with coarser LOD and apply temporal blend; (3) Add explicit loading state per block and skip rendering blocks in `LOADING` state. Verify: simulate 100ms-2s network delay and confirm no visual popping or crash |
| 112 | Camera frustum culling incorrect for unbounded scenes | Large-Scale | Aerial-3DGS / UrbanGS | Standard frustum culling uses camera-space bounds, but in unbounded/aerial scenes with large depth ranges, Gaussians far outside the frustum may project inside due to perspective division near the near plane, or Gaussians just outside may be incorrectly culled. This produces floaters or missing geometry at scene extremes | (1) Use conservative frustum culling with margin: expand frustum planes by Gaussian 3σ radius; (2) For unbounded scenes, add far-plane culling at a configurable distance and fade Gaussians approaching it; (3) Use clip-space test instead of view-space test for robustness. Verify: render with and without culling and compare pixel-wise; no pixel should differ by more than 1/255 |

### CUDA Compilation & Environment Compatibility Patterns

| # | Pattern | Category | Method | Symptom | Fix |
|---|---------|----------|--------|---------|-----|
| 113 | PyTorch/CUDA version incompatibility in diff-gaussian-rasterization compilation | Environment | INRIA 3DGS / gsplat | `diff_gaussian_rasterization` fails to compile with `error: no kernel named 'cudaFuncSetAttribute'` or `undefined symbol: _Z...` when PyTorch CUDA version doesn't match system CUDA toolkit version. Common with PyTorch 2.1+ and CUDA 12.x against code written for CUDA 11.x | (1) Align versions: `torch.__version__` CUDA tag must match `nvcc --version`; e.g., PyTorch `cu121` requires CUDA 12.1 toolkit; (2) If mismatched, reinstall PyTorch: `pip install torch --index-url https://download.pytorch.org/whl/cu121`; (3) For gsplat, use prebuilt wheels: `pip install gsplat --no-build-isolation`; (4) Set `CUDA_HOME` environment variable: `export CUDA_HOME=/usr/local/cuda-12.1`. Verify: `python -c "import torch; print(torch.version.cuda, torch.cuda.is_available())"` matches `nvcc --version` |
| 114 | `nvcc` not found during CUDA extension build | Environment | Any 3DGS CUDA extension | `error: command 'nvcc' failed: No such file or directory` during `pip install -e .` or `python setup.py install`. Occurs when CUDA toolkit is installed but not on PATH, or when only CUDA runtime (via PyTorch) is present without toolkit | (1) Install CUDA toolkit (not just runtime): `sudo apt install nvidia-cuda-toolkit` or from NVIDIA官网; (2) Add to PATH: `export PATH=/usr/local/cuda/bin:$PATH` and `export LD_LIBRARY_PATH=/usr/local/cuda/lib64:$LD_LIBRARY_PATH`; (3) For conda: `conda install cuda-toolkit -c nvidia`; (4) Verify: `which nvcc` returns valid path and `nvcc --version` shows correct version |
| 115 | gcc/g++ version too new for CUDA compiler | Environment | INRIA 3DGS / custom CUDA kernels | CUDA 11.x officially supports gcc up to version 10; CUDA 12.x supports gcc up to 12. Using gcc 13+ produces `error: unsupported GNU version` during CUDA kernel compilation. Common on Ubuntu 23.04+ or WSL2 with recent distros | (1) Install older gcc: `sudo apt install gcc-11 g++-11`; (2) Set CUDA compiler to use specific gcc: add `os.environ['CC'] = 'gcc-11'` and `os.environ['CXX'] = 'g++-11'` in `setup.py` before `from setuptools import setup`; (3) Or set `CUDAHOSTCXX=g++-11` environment variable. Verify: `gcc-11 --version` and rebuild extension |
| 116 | Mixed-precision (AMP) causing NaN in 3DGS training | Environment | Any 3DGS with AMP | When `torch.cuda.amp.autocast()` is enabled for 3DGS training, the covariance matrix computation (which involves products of rotation and scale matrices) can produce NaN in float16 due to overflow/underflow in exponential scale activation. Loss becomes NaN after first iteration with no obvious cause | (1) Disable AMP for covariance computation: wrap only the loss computation in autocast, not the forward rendering; (2) Use `torch.cuda.amp.autocast(dtype=torch.bfloat16)` instead of float16 — bfloat16 has same exponent range as float32; (3) Force float32 for scale activation: `scales = scales.float()` before `exp()`; (4) Add `torch.nn.utils.clip_grad_norm_(model.parameters(), max_norm=1.0)`. Verify: check `torch.isnan(loss)` every iteration for first 1000 steps |

### 3DGS + AI/LLM Fusion Patterns

| # | Pattern | Category | Method | Symptom | Fix |
|---|---------|----------|--------|---------|-----|
| 117 | LLM-generated spatial operators executing on wrong Gaussian subset | AI-Fusion | GaussEdit / LLM-3DGS Agent | When an LLM agent translates natural language editing commands into spatial operators (e.g., "delete the chair", "move the table left"), the operator may incorrectly select Gaussians based on semantic labels that don't match the scene's actual segmentation, or may apply geometric transforms to Gaussians that belong to different semantic groups. Result: wrong parts of the scene are modified | (1) Validate operator scope before execution: render before/after preview and verify changed Gaussians match intended semantic class; (2) Use confidence-gated execution: LLM outputs include confidence score; only auto-apply if confidence > threshold, else request human confirmation; (3) Maintain a semantic-to-Gaussian mapping table and verify operator targets against it. Verify: compute IoU between intended semantic mask and actually-modified Gaussian mask; target IoU > 0.9 |
| 118 | World model state representation not differentiable through 3DGS rendering | AI-Fusion | GS-WorldBrain / 3DGS World Model | When 3DGS is used as the visual renderer in a world model pipeline (state → render → observe → predict → act), the rendering step may break the gradient chain if the rasterizer uses non-differentiable operations (e.g., hard sorting, argmax in tile assignment). The agent's policy network cannot backpropagate through the visual observation, preventing end-to-end training | (1) Use differentiable sorting (e.g., soft sort, NeuralSort) or approximate gradients for tile assignment; (2) Use straight-through estimator for discrete tile assignment; (3) Alternatively, use gsplat's built-in differentiable rasterization and ensure `means.requires_grad=True` for all Gaussian attributes that the policy modifies; (4) Use reparameterization trick for stochastic Gaussian perturbation. Verify: `torch.autograd.gradcheck()` on the full state→render→loss pipeline with small perturbation |
| 119 | VLM-guided 3DGS optimization feedback loop instability | AI-Fusion | VLM-3DGS / Splatify-style | When a Vision-Language Model (VLM) provides structured feedback on rendered 3DGS outputs (e.g., "fix floaters near the ceiling", "improve texture on the floor"), the feedback-to-loss translation may be unstable: VLM may identify false artifacts, provide contradictory feedback across iterations, or the loss term derived from VLM feedback may conflict with photometric loss, causing oscillation | (1) Apply temporal smoothing on VLM feedback: only act on feedback that persists across 3+ consecutive evaluations; (2) Weight VLM-derived loss by confidence and decay weight over training (start high, anneal to 0); (3) Use VLM feedback only for densification/pruning decisions, not as a direct loss term; (4) Validate VLM feedback against rendering metrics (PSNR/SSIM) before applying. Verify: track VLM feedback consistency across iterations; inconsistent feedback rate should be < 20% |
| 120 | Multi-agent 3DGS code generation missing Gaussian invariant checks | AI-Fusion | Splatify / SplatLab / Paper2Code-3DGS | When LLM agents generate 3DGS training code from papers or specifications, generated code may violate Gaussian structural invariants: negative scales, non-unit quaternions, opacity outside [0,1], SH coefficients with wrong shape. These violations produce silent failures: code runs but training produces garbage or NaN after N iterations | (1) Add invariant assertions in the training loop: `assert torch.all(scales >= 0)`, `assert torch.allclose(quaternion_norm, torch.ones(N))`, `assert torch.all(opacity >= 0) and torch.all(opacity <= 1)`; (2) Add smoke test: run 100 iterations and check PSNR > 5 dB (random init should already produce non-zero PSNR); (3) Use CFG-constrained generation: define formal grammar for valid 3DGS plugin structure and validate generated code against it. Verify: run `python -m pytest tests/test_gaussian_invariants.py` before full training |

### Differentiable Physics & Simulation Patterns

| # | Pattern | Category | Method | Symptom | Fix |
|---|---------|----------|--------|---------|-----|
| 121 | Physics simulation gradient disconnection at GS-physics boundary | Physics | PhysGS-Sim / RAF / PG-3DGS | When 3DGS Gaussians are coupled with a physics simulator (rigid body, fluid, cloth), the gradient from rendering loss cannot flow through the physics step to update Gaussian attributes if the simulator uses non-differentiable operations (collision detection, contact resolution). End-to-end training impossible: physics updates Gaussian positions but no gradient flows back | (1) Use differentiable physics engine (Brax, DiffTaichi, PlasticineLab) or implement custom autograd for physics step; (2) Use surrogate gradient / straight-through estimator at collision boundary; (3) Decouple optimization: alternate photometric optimization and physics simulation steps (not simultaneous); (4) Use penalty-based contact model (soft contact) instead of hard contact for differentiability. Verify: `torch.autograd.gradcheck()` on physics step with small Gaussian position perturbation |
| 122 | Rigid body quaternion integration drift in physics-coupled 3DGS | Physics | PhysGS-Sim / Articulated GS | When Gaussians are attached to rigid bodies and integrated over time, quaternion-based rotation integration accumulates numerical drift if not properly renormalized. After 100+ simulation steps, quaternions deviate from unit norm, producing non-orthogonal rotation matrices and corrupted covariance. Rendering shows gradual geometric distortion | (1) Renormalize quaternions after every integration step: `q = q / q.norm(dim=-1, keepdim=True)`; (2) Use exponential map or axis-angle representation for integration instead of direct quaternion multiplication; (3) For long sequences, periodically re-derive rotation from accumulated angular velocity rather than multiplying incremental rotations. Verify: check `torch.allclose(quaternion_norm, 1.0, atol=1e-5)` every 10 simulation steps |
| 123 | Fluid GS incompressibility violation during differentiable simulation | Physics | LagrangianSplats / ParticleGS / Fluid GS | When 3DGS is used for fluid simulation with differentiable rendering, the pressure projection step (enforcing ∇·v = 0) may be non-differentiable if implemented via iterative solvers with hard convergence thresholds. The resulting velocity field violates incompressibility, producing visible volume changes in the fluid rendering | (1) Use differentiable pressure projection: implement as a linear system solve with `torch.linalg.solve()` (differentiable) instead of Jacobi/Gauss-Seidel iteration; (2) Add soft incompressibility loss: `loss_incompressible = λ * (∇·v)²` as a penalty term; (3) Use Helmholtz decomposition to project velocity onto divergence-free subspace differentiably. Verify: check `max(abs(divergence)) < 1e-3` per simulation step |

### Modern 3DGS Method-Specific Code Patterns (CVPR/NeurIPS/SIGGRAPH 2026)

| # | Pattern | Category | Method | Symptom | Fix |
|---|---------|----------|--------|---------|-----|
| 124 | Equivalent distribution reorganization boundary mismatch | Optimization | ReorgGS (NeurIPS 2026) | ReorgGS reorganizes Gaussian distributions to equivalent forms for better rendering quality. When implementing the reorganization step, boundary Gaussians between reorganized clusters may be assigned to the wrong cluster, producing visible seams or color discontinuities at cluster boundaries. The issue arises when the clustering algorithm uses position-only features without considering appearance | (1) Use position+appearance joint features for clustering (not position alone); (2) Add boundary Gaussian duplication: assign boundary Gaussians to both adjacent clusters and average after reorganization; (3) Apply post-reorganization fine-tuning for 1k iterations to smooth boundaries. Verify: render cluster boundary regions and compute local PSNR; target within 0.5 dB of interior |
| 125 | HT-3DGS hierarchical merge producing inconsistent SH degrees | Training | HT-3DGS (CVPR 2026) | HT-3DGS uses hierarchical training with progressive merge of local 3DGS models. When merging models trained with different SH degrees (e.g., local model A with degree 3, model B with degree 2), the merged model has inconsistent SH coefficient shapes, causing rendering errors or crashes in the rasterizer | (1) Standardize SH degree across all local models before merge: either train all with same max degree, or pad lower-degree SH coefficients with zeros; (2) During merge, use max SH degree across all models and zero-pad; (3) Add SH degree check in merge function: `assert all(model.max_sh_degree == global_max_sh_degree for model in local_models)`. Verify: render merged model and compare with individual local renders at overlapping viewpoints |
| 126 | DashGaussian progressive training schedule race condition | Training | DashGaussian (CVPR 2025) | DashGaussian uses progressive Gaussian activation (activating subsets of Gaussians over training). If the activation schedule and the densification schedule are not properly synchronized, newly densified Gaussians may be activated before their gradients are stable, or may remain inactive for too long, causing training instability or wasted computation | (1) Decouple activation and densification timelines: activation every N_act iterations, densification every N_den iterations, with N_den > N_act; (2) After densification, force new Gaussians to be inactive for at least N_act iterations before first activation; (3) Use warmup learning rate for newly activated Gaussians: `lr_new = lr_base * min(1.0, activation_age / warmup_steps)`. Verify: track per-Gaussian activation status and gradient magnitude; newly activated Gaussians should have stable gradients within 100 iterations |
| 127 | Proxy-GS proxy mesh occlusion culling over-culling thin structures | Acceleration | Proxy-GS (CVPR 2026 Full Score Oral) | [Extended from #99] When implementing Proxy-GS's proxy mesh for occlusion culling, thin structures (wires, poles, railings) may fall between proxy mesh triangles and be incorrectly culled. The issue is more severe in the code implementation when proxy mesh tessellation is adaptive: thin-structure regions may have low tessellation density | (1) Add thin-structure detection: compute Gaussian aspect ratio (max_scale/min_scale) and flag Gaussians with ratio > 10 as thin; (2) For tiles containing thin-structure Gaussians, bypass proxy culling and use full rendering; (3) Use conservative ε-inflation on proxy triangles: expand each triangle by max Gaussian radius in the tile. Verify: compare rendering with and without proxy culling on scenes with known thin structures; PSNR difference should be < 0.01 dB |
| 128 | IDESplat depth estimation gradient blocking geometry learning | Feed-Forward | IDESplat (CVPR 2026) | IDESplat uses estimated depth to guide Gaussian parameter prediction in feed-forward 3DGS. If the depth estimation network's gradients dominate the total loss, the Gaussian geometry parameters (position, scale) receive weak gradients from the rendering loss, causing geometric under-fitting: the model achieves good depth estimation but poor novel-view rendering | (1) Detach depth estimation gradients from Gaussian parameter updates: `depth_loss = depth_loss.detach()` for geometry parameters, or use separate optimizer groups with different learning rates; (2) Weight depth loss with annealing schedule: high weight early (helps initialization), decay to 0 over training; (3) Add explicit rendering quality loss on geometry parameters. Verify: monitor gradient norms separately for depth network and Gaussian parameters; ratio should stabilize around 1:1 after warmup |
| 129 | UrbanGS D-Normal regularization failing on textureless surfaces | Geometry | UrbanGS (2026) | UrbanGS's depth-consistent D-Normal regularization relies on monocular normal estimation, which fails on textureless urban surfaces (glass facades, uniform walls). The regularization loss provides incorrect normal directions, pulling Gaussians away from the true surface orientation and producing bumpy geometry on flat surfaces | (1) Add confidence weighting from normal estimator: low-confidence normals (detected by estimator uncertainty) should have near-zero regularization weight; (2) Use multi-view normal consistency check: if normal estimates from different viewpoints disagree by > 30°, skip regularization for that Gaussian; (3) Add planarity detection: if local Gaussian distribution is approximately planar (PCA eigenvalue ratio), enforce plane-aligned normals regardless of estimator. Verify: compare normal maps on textureless regions with and without confidence weighting |

### General Graphics & Math Code Patterns

| # | Pattern | Category | Method | Symptom | Fix |
|---|---------|----------|--------|---------|-----|
| 130 | Column-major vs row-major matrix confusion in covariance computation | Graphics | Any 3DGS | When computing 3D covariance `Σ = R @ S @ S^T @ R^T`, if the code mixes column-major (OpenGL/Fortran convention, used by PyTorch default) and row-major (C/C++ convention) matrix multiplication order, the resulting covariance is transposed, producing Gaussians with swapped axes. The error is subtle: rendering "works" but Gaussians are elongated in wrong directions | (1) Explicitly check: in PyTorch, `@` is matmul with `(batch, M, K) @ (batch, K, N) → (batch, M, N)`; ensure S is `(N, 3)` diagonal and R is `(N, 3, 3)`; (2) Add assertion: `assert covariance.shape == (N, 3, 3)` and `assert torch.allclose(covariance, covariance.transpose(-1, -2), atol=1e-5)` (covariance must be symmetric); (3) Use `torch.einsum('bi,bij->bj', ...)` for explicit control. Verify: render a single anisotropic Gaussian with known R and S, compare rendered shape with analytic expectation |
| 131 | View-space vs world-space depth sorting inconsistency | Graphics | Any 3DGS | When sorting Gaussians for alpha compositing, using world-space distance to camera instead of view-space depth (z-coordinate in camera space) produces incorrect sorting for wide-FOV or off-center cameras. The error manifests as flickering or ghosting at large camera angles but is invisible at normal viewing angles | (1) Always sort by view-space z: `depths = (means @ view_matrix[:3, :3].T + view_matrix[:3, 3])[:, 2]`; (2) For perspective cameras, use the signed z-coordinate (negative = in front of camera); (3) Add unit test: render a scene with two overlapping Gaussians at different depths from an extreme angle and verify correct compositing order. Verify: compare rendering with view-space z sort vs world-space distance sort on a controlled scene |
| 132 | NDC coordinate vs pixel coordinate confusion in tile assignment | Graphics | Any tile-based 3DGS | When mapping projected Gaussian centers to tile indices, using normalized device coordinates (NDC, range [-1, 1]) directly as pixel coordinates (range [0, W] or [0, H]) produces incorrect tile assignments: Gaussians are placed in wrong tiles, producing scattered rendering artifacts. The error occurs when the projection step outputs NDC but the tile assignment code assumes pixel coordinates | (1) Explicitly convert: `pixel_x = (ndc_x + 1) * 0.5 * width`, `pixel_y = (1 - ndc_y) * 0.5 * height` (note y-flip for image coordinates); (2) Add assertion: `assert 0 <= pixel_x < width and 0 <= pixel_y < height`; (3) Use a single `project_to_pixel()` function with documented output convention and test it independently. Verify: render a grid of known Gaussians and verify each lands in the correct tile |
| 133 | Quaternion to rotation matrix formula error (Hamilton convention) | Graphics | Any 3DGS | When converting quaternion `(w, x, y, z)` to rotation matrix, using the wrong Hamilton convention or swapping the component order produces a rotation matrix that represents a different rotation. The error is extremely common because different libraries use different conventions (wxyz vs xyzw, Hamilton vs JPL). Result: Gaussians are rotated incorrectly, producing wrong orientations | (1) Standardize on one convention and document it: use Hamilton convention with `(w, x, y, z)` order; (2) Use `scipy.spatial.transform.Rotation.from_quat([x, y, z, w]).as_matrix()` (scipy uses xyzw!); (3) For PyTorch: `from gsplat import quaternion_to_matrix` and verify against scipy. Verify: rotate a known vector by 90° around Y-axis and compare with expected result |
| 134 | Degenerate covariance from zero or near-zero scale | Graphics | Any 3DGS | When a Gaussian's scale parameter approaches zero (e.g., after pruning or during early training), the covariance matrix becomes singular, causing NaN in eigenvalue computation and crashes in the rasterizer. The issue is common in the first few iterations when scales are initialized near zero or when gradient updates push scales negative | (1) Enforce minimum scale: `scales = torch.clamp(scales, min=1e-6)` or `scales = torch.clamp_min(scales, 1e-6)`; (2) Add covariance regularization: if `det(Σ) < ε`, add `λ * (ε - det(Σ))` to loss; (3) In the rasterizer, add epsilon to diagonal: `Σ_reg = Σ + ε * I`. Verify: check `torch.linalg.eigvalsh(covariance).min() > 0` for all Gaussians every 100 iterations |

### Training Robustness & Reproducibility Patterns

| # | Pattern | Category | Method | Symptom | Fix |
|---|---------|----------|--------|---------|-----|
| 135 | Non-deterministic Gaussian ordering across runs | Reproducibility | Any 3DGS | 3DGS training results vary across runs even with identical hyperparameters because Gaussian ordering depends on GPU thread scheduling, which is non-deterministic. This affects sorting, densification, and rendering, producing different PSNR (up to 0.5 dB) across runs. Makes ablation studies unreliable | (1) Set deterministic flags: `torch.backends.cudnn.deterministic = True`, `torch.backends.cudnn.benchmark = False`, `torch.use_deterministic_algorithms(True)`; (2) Set fixed seeds: `torch.manual_seed(42)`, `np.random.seed(42)`, `random.seed(42)`; (3) Use `CUBLAS_WORKSPACE_CONFIG=:4096:8` environment variable; (4) Note: deterministic mode may slow training by 10-20%. Verify: run training 3 times with same seed and confirm PSNR difference < 0.01 dB |
| 136 | Gradient accumulation incorrect for 3DGS densification | Reproducibility | Any 3DGS with gradient accumulation | When using gradient accumulation (large batch simulation), the per-Gaussian position gradient used for densification decisions (clone/split) is averaged over accumulation steps, but densification should use the gradient from the current view only, not the accumulated average. Using accumulated gradients for densification produces incorrect clone/split decisions | (1) Separate densification gradient from optimization gradient: compute a fresh forward pass on a single random view to get position gradients for densification, independent of the accumulated optimization gradients; (2) Or disable gradient accumulation during densification iterations; (3) Store per-view gradients separately and use max (not mean) for densification threshold. Verify: compare densification decisions with and without gradient accumulation on same scene |
| 137 | Learning rate scheduler applied to all parameters uniformly | Reproducibility | Any 3DGS | Standard 3DGS uses different learning rates for different parameter groups (position, SH, opacity, scaling, rotation). If a single learning rate scheduler (e.g., CosineAnnealingLR) is applied to all parameters uniformly, the relative learning rate ratios are not preserved, causing some parameter groups to converge too fast or too slow | (1) Use per-parameter-group learning rates as in INRIA reference: position=1.6e-4, SH=2.5e-3, opacity=5e-2, scaling=5e-3, rotation=1e-3; (2) Apply exponential decay per-group: `lr = lr_init * (lr_decay ** (step / max_steps))`; (3) If using a unified scheduler, apply it as a multiplier on top of per-group base rates, not as absolute rates. Verify: log per-group learning rate every 1000 steps and confirm ratios match INRIA defaults |

### Web/Mobile Deployment Code Patterns

| # | Pattern | Category | Method | Symptom | Fix |
|---|---------|----------|--------|---------|-----|
| 138 | WebGL/WebGPU shader precision mismatch with training | Deployment | Web 3DGS / WebGPU GS | When deploying 3DGS to web via WebGL or WebGPU shaders, float32 training precision is often reduced to float16 or mediump in shaders, causing visible rendering differences: colors shift, edges soften, floaters appear/disappear. The issue is especially severe for covariance computation where small precision errors compound through the projection chain | (1) Use highp/float32 in shaders for covariance and alpha compositing: `precision highp float;` in GLSL; (2) Pre-compute 2D covariance on CPU/Python and pass to shader to avoid precision loss in shader math; (3) For WebGPU, use `f32` storage class for all Gaussian attributes; (4) Add precision regression test: render same scene in Python and WebGL, compare PSNR; target > 40 dB. Verify: render in browser and compare pixel-by-pixel with Python reference |
| 139 | Mobile GPU Gaussian count exceeding texture memory budget | Deployment | Mobile 3DGS | On mobile GPUs, Gaussian attributes are typically stored in textures (RGBA32F), and texture memory is limited (512MB-2GB on most mobile devices). Loading a desktop-scale 3DGS model (3M+ Gaussians, ~300MB) may exceed mobile memory budget or cause severe frame drops due to memory swapping | (1) Implement mobile-specific Gaussian compression: quantize positions to int16, scales to int8, SH degree 1 only; (2) Use progressive loading: load coarse LOD first, refine progressively; (3) Implement frustum-based Gaussian streaming: only load Gaussians visible in current view frustum; (4) Target < 500K Gaussians for mobile at 30 FPS. Verify: profile on target mobile device with Chrome DevTools GPU inspector; peak memory < 80% of device GPU budget |
| 140 | WASM/WebGPU kernel performance regression from Python-to-JS translation | Deployment | Web 3DGS | When 3DGS CUDA kernels are ported to WASM or WebGPU compute shaders, performance may regress by 5-10x compared to native CUDA due to: (a) WASM's lack of SIMD intrinsics for matrix operations, (b) WebGPU compute shader workgroup size limitations (max 256 threads), (c) JavaScript garbage collection pauses during rendering. Result: 5 FPS instead of 30 FPS | (1) Use WebGPU compute shaders (not WASM) for all Gaussian rendering math; (2) Pre-allocate all buffers and avoid JS object creation in render loop; (3) Use `device.queue.writeBuffer()` for batch GPU uploads; (4) Set workgroup size to 64 (optimal for most mobile GPUs); (5) Use instanced rendering for Gaussian splats to reduce draw calls. Verify: measure frame time with `performance.now()` in render loop; target < 33ms (30 FPS) |

### 3DGS Code Authoring Patterns (New Section)

| # | Pattern | Category | Method | Symptom | Fix |
|---|---------|----------|--------|---------|-----|
| 141 | Missing gradient clipping causing training explosion | Authoring | Any 3DGS new method | When implementing a new 3DGS loss function or densification strategy, the added loss terms may produce large gradients (especially in early training), causing parameter explosion: scales go to infinity, opacities saturate, quaternions become non-unit. Without gradient clipping, training diverges within 100 iterations | (1) Always add gradient clipping in the training loop: `torch.nn.utils.clip_grad_norm_(model.parameters(), max_norm=1.0)`; (2) For new loss terms, add gradient monitoring: `grad_norm = torch.norm(param.grad)` and log it; (3) Use loss weighting with warmup: `loss_weight = min(step / warmup_steps, 1.0) * max_weight`. Verify: log gradient norm every 10 iterations for first 1000 steps; should be bounded and decreasing |
| 142 | Custom loss function not differentiable due to in-place operations | Authoring | Any 3DGS custom loss | When writing custom loss functions for 3DGS (e.g., normal consistency, planarity, sparsity), in-place operations like `loss += penalty` or `tensor[mask] = value` break the autograd graph. The loss returns a finite value but `loss.backward()` produces `None` gradients for the modified tensors | (1) Never use in-place operations on tensors that require grad: avoid `+=`, `*=`, `tensor[idx] = val` on grad-requiring tensors; (2) Use `torch.where()` instead of masked assignment: `loss = torch.where(mask, penalty, torch.zeros_like(penalty))`; (3) Use functional style: `loss = loss + penalty` (not `loss += penalty`). Verify: `assert param.grad is not None` after `loss.backward()` for all parameters |
| 143 | SH coefficient initialization causing color explosion | Authoring | Any 3DGS | When initializing SH coefficients for new Gaussians (after densification), if DC component (SH degree 0) is initialized to a large value or random instead of the average color of nearby Gaussians, the new Gaussians produce extremely bright or dark spots. This is common in custom densification implementations | (1) Initialize SH DC component from the average color of the K nearest existing Gaussians: `sh_dc = knn_colors.mean(dim=0)`; (2) Initialize higher-order SH to zero (they represent view-dependent variation, should be learned gradually); (3) After densification, run a few "color-only" optimization steps (freeze position/scale/rotation, only optimize SH) to stabilize new Gaussian colors. Verify: render immediately after densification and check for bright/dark spots |
| 144 | Camera intrinsics/extrinsics loading format mismatch | Authoring | Any 3DGS | When loading camera parameters from different datasets (COLMAP, NeRF Synthetic, LLFF, custom), the extrinsics convention varies: COLMAP uses world-to-camera, some datasets use camera-to-world; intrinsics may be in pixels or normalized. Loading with wrong convention produces camera poses that are inverted or rotated, causing catastrophic reconstruction failure | (1) Always convert to a canonical format at load time: world-to-camera extrinsics (4x4), intrinsics in pixels (fx, fy, cx, cy); (2) Add sanity checks: camera positions should be in front of the scene (z < 0 in camera space for visible points), camera up vector should be approximately +Y in world space; (3) Visualize camera poses before training using a simple viewer. Verify: render from loaded cameras and compare with input images; if completely wrong, convention is likely inverted |
| 145 | Missing `torch.no_grad()` in evaluation/inference path | Authoring | Any 3DGS | When running evaluation (rendering test views, computing metrics), if the evaluation code does not wrap the rendering in `torch.no_grad()`, PyTorch builds the computation graph for every rendered image, causing memory to grow linearly with the number of test images. Eventually OOM during evaluation even if training was fine | (1) Wrap all evaluation rendering in `with torch.no_grad():`; (2) In Nerfstudio, evaluation is automatically no-grad if using `pipeline.eval()`; (3) For custom eval loops, add `torch.set_grad_enabled(False)` at start and `torch.set_grad_enabled(True)` at end. Verify: monitor `torch.cuda.memory_allocated()` during eval; should be constant per image, not growing |
| 146 | Densification not accounting for gradient from all loss terms | Authoring | Any 3DGS custom method | Standard 3DGS densification uses position gradient from the total loss. When custom loss terms (normal, depth, semantics) are added, they contribute to the position gradient but may not be included in the gradient accumulation for densification. This causes densification to miss regions where custom losses demand more Gaussians | (1) Ensure densification uses the total gradient (including all loss terms), not just the photometric gradient: use `means.grad` which accumulates from `total_loss.backward()`; (2) If custom losses are computed outside the main loss (e.g., in a separate forward pass), manually accumulate their gradients: `means.grad += custom_loss.backward()`; (3) Optionally, use separate densification thresholds for different loss types. Verify: compare Gaussian distribution with and without custom loss gradients in densification |
| 147 | Checkpoint save/load missing optimizer state | Authoring | Any 3DGS | When saving 3DGS checkpoints, if only Gaussian attributes (means, scales, etc.) are saved but optimizer state (momentum, learning rate per parameter) is omitted, resuming training from checkpoint produces a "cold start" for the optimizer, causing training instability or quality drop. The issue is common in custom training loops | (1) Save full training state: `torch.save({'model': model.state_dict(), 'optimizer': optimizer.state_dict(), 'step': step, 'lr_scheduler': scheduler.state_dict()}, path)`; (2) For 3DGS, also save densification state: Gaussian count, last densification step, gradient statistics; (3) On load, restore all: `optimizer.load_state_dict(checkpoint['optimizer'])`. Verify: resume from checkpoint and confirm PSNR trajectory continues smoothly (no > 0.1 dB drop at resume) |
| 148 | Missing NaN/Inf checking in training loop | Authoring | Any 3DGS | Without explicit NaN/Inf checks, a single NaN in the loss (from numerical instability) propagates through all parameters within one optimizer step, silently corrupting the entire model. The training appears to continue but PSNR drops to 0 or -inf. The issue is common with custom loss functions or when using mixed precision | (1) Add NaN check after loss computation: `if torch.isnan(loss) or torch.isinf(loss): print(f"NaN/Inf at step {step}"); break`; (2) Add parameter NaN check: `if any(torch.isnan(p).any() for p in model.parameters()): print(f"NaN in params at step {step}"); break`; (3) Use `torch.autograd.detect_anomaly()` for debugging. Verify: intentionally inject NaN (e.g., set one scale to 0) and confirm the check triggers |

### Advanced Rendering & Shader Patterns

| # | Pattern | Category | Method | Symptom | Fix |
|---|---------|----------|--------|---------|-----|
| 149 | EWA filter scale mismatch between training and inference | Rendering | Mip-Splatting / Anti-aliasing | The EWA (Elliptical Weighted Average) filter scale depends on the sampling rate (pixels per degree of FOV). If the filter is configured for training resolution but inference uses a different resolution (common in super-resolution or downsampling), Gaussians appear too sharp (upsampling) or too blurry (downsampling). The issue is invisible at training resolution but produces quality degradation at inference | (1) Make EWA filter scale resolution-dependent: `filter_scale = base_scale * (train_resolution / current_resolution)`; (2) Store filter scale in the model and update at inference: `model.filter_scale = compute_filter_scale(current_resolution, fov)`; (3) For multi-resolution rendering, pre-compute filter scales for common resolutions. Verify: render at 2x and 0.5x training resolution and compare SSIM; should be consistent |
| 150 | Spherical harmonics evaluation using wrong associated Legendre functions | Rendering | Any 3DGS with SH > degree 1 | SH evaluation for degree 2+ requires associated Legendre polynomials, which have multiple conventions (Condon-Shortley phase, normalization). Using the wrong convention produces incorrect view-dependent colors at higher SH degrees. The error is invisible at degree 0-1 but produces color artifacts at degree 2+ (especially at grazing angles) | (1) Use the SH evaluation from the INRIA reference implementation or gsplat's `spherical_harmonics()` function directly; (2) Verify SH basis values against known references: `Y_0^0 = 0.28209479177387814`, `Y_1^0 = 0.4886025119029199 * z`; (3) If implementing custom SH, add unit test comparing against `scipy.special.sph_harm`. Verify: render a Gaussian with known SH coefficients and compare rendered color at multiple viewpoints with analytic evaluation |
| 151 | Tile-based rendering missing per-tile Gaussian count limit | Rendering | Any tile-based 3DGS | When a tile contains an extremely large number of overlapping Gaussians (e.g., at object silhouettes or semi-transparent regions), the per-tile rendering loop may exceed register limits or take excessively long, causing kernel timeout or frame drops. Standard implementations don't limit per-tile Gaussian count, assuming reasonable distribution | (1) Add per-tile Gaussian count cap: if count > max_per_tile (e.g., 256), process in batches; (2) Use early termination more aggressively for tiles with high opacity accumulation; (3) For extreme cases, merge nearby Gaussians in overpopulated tiles (pre-rendering optimization). Verify: profile per-tile rendering time; no tile should exceed 2x average tile time |
| 152 | Background color not properly handled in alpha compositing | Rendering | Any 3DGS | When the final transmittance `T_final = ∏(1-α_i)` is not zero (camera sees through all Gaussians to background), the background color must be added: `C = Σ c_i α_i T_i + T_final * C_bg`. If `C_bg` is set to black (0,0,0) by default but the dataset has white background (e.g., NeRF Synthetic), rendered images have black halos around foreground objects. Conversely, if background is environment map but code uses solid color, outdoor scenes have artificial edges | (1) Make background color configurable: `background_color = config.get('bg_color', 'black')` — options: 'black', 'white', 'random', 'environment_map'; (2) For datasets with known background (NeRF Synthetic = white), set `C_bg = (1, 1, 1)`; (3) For outdoor scenes, use random background color during training to encourage opaque reconstruction: `C_bg = torch.rand(3)`. Verify: render a scene with alpha < 1 regions and confirm background color matches configuration |

### Multi-View & Dataset Handling Patterns

| # | Pattern | Category | Method | Symptom | Fix |
|---|---------|----------|--------|---------|-----|
| 153 | Image resolution downsampling inconsistent with camera intrinsics | Dataset | Any 3DGS | When input images are downsampled (e.g., 4K → 2K for memory efficiency), if camera intrinsics (fx, fy, cx, cy) are not scaled by the same factor, the camera model is wrong: focal length is too large for the image size, producing a narrow FOV effect. Rendering produces zoomed-in or misaligned images | (1) Scale intrinsics by downsampling factor: `fx_new = fx * (new_width / orig_width)`, `cx_new = cx * (new_width / orig_width)`; (2) Store downsampling factor in camera metadata and apply consistently; (3) Add assertion: `assert abs(cx_new - new_width / 2) < new_width * 0.1` (principal point should be near image center for most cameras). Verify: render at downsampled resolution and compare with ground truth at same resolution |
| 154 | COLMAP sparse point cloud quality insufficient for 3DGS init | Dataset | Any 3DGS with COLMAP | 3DGS initialization from COLMAP sparse points fails when: (a) COLMAP produces too few points (<1000 for a room), (b) points are clustered in high-texture regions leaving low-texture regions empty, (c) points have high reprojection error. The resulting 3DGS has missing structure and poor coverage | (1) Increase COLMAP point density: run denser matching (`MapperOptions.max_num_matches`), use `pycolmap.densify_point_cloud()` or run patch-match stereo; (2) For sparse regions, add uniformly distributed low-opacity Gaussians as "filler"; (3) Use depth prior (Depth Anything V2, DPT) to backproject additional points in low-texture regions; (4) Consider SfM-free approaches (HT-3DGS, VGGT-based init). Verify: visualize initial point cloud coverage and confirm every image has >100 visible init points |
| 155 | Temporal inconsistency in video-based 3DGS from frame sampling | Dataset | 4DGS / Video 3DGS | When training 4DGS from video, uniform frame sampling may miss fast-moving objects (temporal aliasing) or waste capacity on static regions (temporal redundancy). The resulting 4DGS has blurry dynamic regions and excessive Gaussians in static regions | (1) Use adaptive frame sampling: sample more frames during high-motion segments (detected by optical flow magnitude or frame difference); (2) Use keyframe extraction: identify keyframes via structural similarity threshold and train primarily on keyframes with interpolation on intermediate frames; (3) For 4DGS, add temporal regularization loss: `L_temporal = λ * ||Gaussians(t) - Gaussians(t-1)||²` for static regions. Verify: render intermediate frames and check temporal smoothness (SSIM between consecutive rendered frames > 0.95 for static regions) |

### Specialized Domain Patterns

| # | Pattern | Category | Method | Symptom | Fix |
|---|---------|----------|--------|---------|-----|
| 156 | Volumetric additive rendering mode not exposed in standard 3DGS | Domain | GaussianPile / Medical 3DGS | [Extended from #101] Standard 3DGS implementations hardcode alpha compositing, but volumetric medical imaging (CT, ultrasound, MRI) requires additive integration: `I = Σ κ_i * T_{i-1} * c_i` without occlusion. When the rendering mode is not configurable, medical 3DGS must fork the entire rasterizer, creating maintenance burden and compatibility issues | (1) Make compositing mode a rasterizer parameter: `rasterize(..., compositing_mode='alpha' | 'additive' | 'maximum_intensity')`; (2) In additive mode, skip the transmittance multiplication for individual Gaussians (T is only used for weighting, not occlusion); (3) For MIP (Maximum Intensity Projection) mode, replace alpha blending with max operation: `C = max(c_i * α_i)`. Verify: render a volumetric dataset in all three modes and confirm correct physical interpretation |
| 157 | Event camera temporal binning losing high-frequency information | Domain | E2EGS / Event-based 3DGS | When converting continuous event streams to discrete frames for 3DGS training, temporal binning aggregates events within fixed time windows. If bin size is too large, high-frequency motion (fast-moving objects) is blurred; if too small, individual bins have too few events for reliable gradient estimation. The optimal bin size depends on scene dynamics | (1) Use adaptive temporal binning: bin size proportional to local event rate (more events → smaller bins); (2) Use overlapping bins with temporal smoothing: each bin overlaps 50% with neighbors and applies temporal Gaussian weighting; (3) For known motion speed, compute optimal bin size: `bin_size = motion_speed / (pixel_resolution * events_per_pixel_threshold)`. Verify: reconstruct fast-moving object and check edge sharpness vs bin size |
| 158 | Underwater 3DGS color correction using wrong Jerlov water type | Domain | DualPhys-GS / Sea-thru GS | Underwater 3DGS requires wavelength-dependent attenuation correction based on water type (Jerlov classification: I, IA, IB, II, III, 1C, 3C, 9C). Using the wrong water type produces color casts (green for open ocean, blue for coastal). The issue is common when deployment water type differs from training data | (1) Estimate water type from image statistics: use dark channel prior or color distribution analysis to classify Jerlov type; (2) Make attenuation coefficients learnable with physics-constrained prior initialized from estimated water type; (3) Add water-type classification loss to training. Verify: compare corrected colors against Sea-thru ground truth for known water types |
| 159 | Articulated object joint limit violation in 3DGS deformation | Domain | ArtSplat / Articulated GS | When deforming 3DGS for articulated objects (robotics, human body), the deformation may violate joint limits (e.g., elbow bending backward, knee hyperextending). Without joint limit constraints, the optimization produces physically impossible articulations that look correct from training viewpoints but fail from novel viewpoints | (1) Add joint limit constraints as inequality loss: `L_joint = λ * Σ max(0, θ - θ_max)² + max(0, θ_min - θ)²`; (2) Use joint-angle parameterization that enforces limits by design: `θ = θ_min + (θ_max - θ_min) * sigmoid(raw_θ)`; (3) Validate against known kinematic models (URDF, SMPL). Verify: render from novel viewpoints and check for physical plausibility of articulation |

### Testing & Validation Patterns

| # | Pattern | Category | Method | Symptom | Fix |
|---|---------|----------|--------|---------|-----|
| 160 | Evaluation metrics computed on wrong color space | Testing | Any 3DGS | When computing PSNR/SSIM/LPIPS, if rendered images are in linear color space but ground truth images are in sRGB (or vice versa), metrics are computed incorrectly. The error is common because 3DGS rendering may output linear RGB while datasets store sRGB. PSNR may appear 2-5 dB lower than actual | (1) Explicitly convert both to same color space before metrics: `if config.linear_rendering: rendered = linear_to_srgb(rendered)`; (2) Document the color space in evaluation code; (3) Use `lpips` library's built-in conversion or disable it explicitly. Verify: compute PSNR on identity (rendered = GT) and confirm 100 dB (or inf) |
| 161 | Missing test-time camera adjustment for metric consistency | Testing | Any 3DGS | When evaluating on test views, some implementations apply test-time camera optimization (refining camera poses on test set), while others don't. Comparing PSNR across methods without noting this difference is misleading. A method with test-time pose refinement may appear 1-2 dB better | (1) Document evaluation protocol: "with/without test-time pose refinement"; (2) For fair comparison, use the same protocol across all methods; (3) Report both: "PSNR (no refinement)" and "PSNR (with refinement)". Verify: check if paper's evaluation section mentions test-time optimization |
| 162 | LPIPS using different backbone networks producing incomparable results | Testing | Any 3DGS | LPIPS metric depends on the backbone network (AlexNet, VGG, ResNet50) and whether it uses linear calibration. Different implementations use different backbones by default: `lpips` library defaults to AlexNet, some papers use VGG. Comparing LPIPS across papers with different backbones is invalid | (1) Always specify LPIPS backbone in results: "LPIPS (AlexNet)" or "LPIPS (VGG)"; (2) Use the same backbone as the paper being compared: most 3DGS papers use AlexNet (lpips default); (3) If comparing with a paper using VGG, re-evaluate with VGG: `lpips.LPIPS(net='vgg')`. Verify: compute LPIPS with both AlexNet and VGG on same images and note the difference |

### Performance Profiling & Optimization Patterns

| # | Pattern | Category | Method | Symptom | Fix |
|---|---------|----------|--------|---------|-----|
| 163 | Unnecessary CPU-GPU synchronization in training loop | Performance | Any 3DGS | When the training loop calls `.item()`, `.cpu()`, or `print()` on GPU tensors, it forces CPU-GPU synchronization, stalling the GPU pipeline. Common in logging code: `loss.item()` every iteration, `print(f"step {step}, loss {loss.item()}")`. This can slow training by 2-3x | (1) Only log every N iterations (e.g., every 100): `if step % 100 == 0: logger.info(f"loss: {loss.item():.4f}")`; (2) Use `loss.detach()` instead of `loss.item()` for tensor logging; (3) Use `torch.cuda.synchronize()` only for profiling, not production. Verify: profile with `torch.profiler` and check for CPU-GPU sync events; should be < 1 per 100 iterations |
| 164 | Gaussian attribute storage using padded tensors wasting memory | Performance | Any 3DGS | When Gaussian attributes are stored as padded tensors (e.g., SH coefficients padded to max degree for all Gaussians, even those using degree 0), memory is wasted. For a model with 3M Gaussians and max SH degree 3, padding degree-0 Gaussians wastes ~40% of SH memory. The issue compounds with custom attributes (semantics, features) | (1) Use variable-length SH storage: store per-Gaussian SH degree and use ragged tensors or packed arrays; (2) For gsplat, use `sh_degree_to_channels()` and store only needed channels; (3) Alternatively, store all at max degree but prune unused during inference; (4) For custom attributes, use sparse storage if many Gaussians don't use them. Verify: compare memory usage with fixed vs variable SH storage; expect 20-40% reduction for mixed-degree models |