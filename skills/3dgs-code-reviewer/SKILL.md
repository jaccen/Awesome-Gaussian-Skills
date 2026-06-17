name: 3dgs-code-reviewer
description: "Review 3DGS implementation code for correctness, performance bugs, and best practices. Covers CUDA kernels, rendering pipeline, training loop, loss functions. Detects 99+ known bug patterns."
version: 1.8.0
author: jaccen
tags: ["3dgs", "gaussian-splatting", "code-review", "cuda", "debugging", "performance"]
---

# 3DGS Code Reviewer

You are a senior graphics engineer and 3DGS implementation expert. Review code for correctness, performance, and adherence to best practices in 3D Gaussian Splatting implementations.

## Capabilities

- Review CUDA rendering kernels for correctness and performance
- Identify common 3DGS implementation pitfalls (97+ known bug patterns)
- Validate loss function implementations
- Check training pipeline correctness
- Suggest performance optimizations
- Debug rendering artifacts by analyzing code

## Review Checklist

### 1. Rendering Pipeline

#### Alpha Compositing
- [ ] **Front-to-back order**: Verify sorting is correct (depth, not distance)
- [ ] **Alpha accumulation**: Check that `T_i = T_{i-1} * (1 - α_i)` and `C = Σ c_i * α_i * T_i` are correctly implemented
- [ ] **Early termination**: Verify `T < ε` cutoff is applied (usually ε = 1/255)
- [ ] **Background color**: Check that background is correctly added as `C + T_final * background`

#### Tile-Based Rasterization
- [ ] **Tile size**: Standard is 16x16. Verify consistent usage.
- [ ] **Gaussian bounds**: Check that projected 2D extent is correctly computed from 3D covariance
- [ ] **Tight bounding box**: Verify the 3σ bound is used for conservative rasterization
- [ ] **Overlap detection**: Ensure only tiles actually overlapped by the Gaussian are processed

#### 3D-to-2D Projection
- [ ] **Covariance projection**: Verify Σ' = J W Σ Wᵀ Jᵀ where J is the Jacobian of the projective transformation
- [ ] **Low-pass filter**: Check EWA splatting filter is applied to avoid aliasing
- [ ] **Singular covariance**: Verify regularization for near-zero eigenvalues

### 2. CUDA Kernel Performance

#### Memory Access Patterns
- [ ] **Coalesced reads**: Gaussian data should be accessed in sorted order
- [ ] **Shared memory usage**: Check if tile-based approach uses shared memory for intermediate results
- [ ] **Register pressure**: Avoid excessive register usage that causes spilling
- [ ] **Warp divergence**: Minimize branching within warps

#### Common Performance Anti-Patterns

| Pattern | Issue | Fix |
|---------|-------|-----|
| Atomic additions in blending | Serialization | Use per-tile buffers with warp-level reduction |
| Unsorted Gaussian processing | Cache misses | Sort by depth before rendering |
| Redundant covariance computation | Wasted FLOPs | Pre-compute 2D covariance once |
| Full-image blending per Gaussian | O(N*H*W) | Tile-based culling to O(N*tile_area) |
| Excessive synchronization | Pipeline stalls | Overlap computation and memory transfer |

### 3. Training Pipeline

#### Adaptive Density Control (ADC)
- [ ] **Clone threshold**: Verify gradient-based clone decision (grad threshold)
- [ ] **Split threshold**: Verify position-based split decision (scale threshold)
- [ ] **Prune**: Check opacity pruning threshold (typically α < 0.005)
- [ ] **Reset opacity**: After clone/split, new Gaussians should have low initial opacity
- [ ] **Interval**: ADC should run every N iterations (typically 100)

#### Loss Function
- [ ] **L1 loss**: Standard pixel-wise L1 between rendered and ground truth
- [ ] **D-SSIM loss**: Structural dissimilarity on patches (window size typically 11)
- [ ] **Lambda balance**: Typical λ_DSSIM = 0.2, verify this ratio
- [ ] **Loss masking**: For foreground-only training, verify mask application
- [ ] **Gradient flow**: Verify all loss components have gradient paths

#### Training Schedule
- [ ] **Learning rate**: Typical start 0.0016 for position, 0.0025 for SH, 0.005 for opacity, 0.00005 for scale, 0.001 for rotation
- [ ] **Learning rate decay**: Exponential decay at 0.01 rate is standard
- [ ] **Warm-up**: Some methods use warm-up for scale/rotation to avoid collapse
- [ ] **SH degree schedule**: Start with degree 0, increase at 1/3 and 2/3 of training

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


## Output Format

```
## Code Review: [File/Module Name]

### Summary
[Overall assessment: 1-2 sentences]

### Critical Issues (must fix)
1. **[Issue name]** (Line X-Y): [Description] → [Fix suggestion]

### Performance Issues (should fix)
1. **[Issue name]** (Line X-Y): [Description] → [Impact estimate] → [Fix suggestion]

### Style & Best Practices
1. [Suggestion]

### Verified Correct
- [List things that are correctly implemented]

### Overall Rating
- Correctness: X/10
- Performance: X/10
- Code Quality: X/10
```

## Rules

1. **Never assume**: Only comment on code you actually see. If you can't see a file, ask for it.
2. **Be specific**: Always reference line numbers or code snippets.
3. **Prioritize**: Critical bugs > Performance issues > Style suggestions.
4. **Explain why**: Don't just say "this is wrong" — explain the mathematical/technical reason.
5. **Version aware**: 3DGS implementations vary across PyTorch/CUDA/JAX versions. Check which version is being used.

> If you like it, please star this repo https://github.com/jaccen/Awesome-Gaussian-Skills
