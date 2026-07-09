
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
| CAdam | SIGGRAPH'26 | 3D anisotropic | Context-adaptive | Context-adaptive densification for generative distillation; avoids over-densification from transient noise |
| SNS | arXiv'26 (2605.15010) | Skew-Normal | [0,1] | Skew-Normal primitive replacing symmetric Gaussian kernels; continuous interpolation between symmetric Gaussian ↔ Half-Gaussian via learnable skewness |
| RAF | CVPR'26 (Findings) | 3D anisotropic + physics | Engine-abstracted | 3DGS→physics engine abstraction; 3-stage pipeline (asset abstraction→unified simulation kernel→visual recoupling); MPM/SPH/PBD/rigid-body/articulated-body multi-solver bridge; static collision mesh from Gaussian segmentation; opacity field→physics particle sampling; UE5 Lumen GI rendering; 5 heterogeneous interaction demos (fluid+3DGS, cloth+statue, robot+rigid) |

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
| Prune Wisely | CVPR'26 (2602.24136) | Up to 90% reduction | Adaptive pruning + Difference-of-Gaussian (DoG) primitives; quality-preserving extreme compression |
| ProGS | arXiv'26 (2603.09703) | 45× storage | Octree-based progressive encoding + streaming delivery; +10% visual quality |
| GS-NFS | arXiv'26 (2606.05650) | Dynamic codec | GPU-parallelized dynamic 3DGS encode/decode; 1-2 OOM speedup; full frame-rate |
| FCGS | arXiv'26 | Minutes→seconds | Optimization-free single feed-forward compression |
| EvoGS | arXiv'26 (2606.07179) | 2.4× payload ↓ | Continuous-layering via Evolution Tree; child nodes correct ancestral errors; redundancy 65%→25% |
| Flux-GS | ECCV'26 (2606.30017) | Mobile-optimized | Monte Carlo Energy Aggregation; energy-based densification enabling mobile 3DGS rendering |

### Robustness / Regularization Methods

| Method | Venue | Prior Source | Key Feature |
|--------|-------|-------------|-------------|
| EnerGS | arXiv'26 | LiDAR (partial geometric) | Energy-based soft guidance instead of hard constraints; improves outdoor large-scale scenes |
| Luminance-GS++ | TPAMI'26 | Illumination prior | Illumination-robust NVS; decouples shading from geometry |
| Underwater360 | arXiv'26 | Degradation-aware | 3DGS for underwater 360° scenes; attenuation+scattering correction |
| GlowGS | arXiv'26 | Low-light prior | 3DGS for low-light/glowing scenes; radiance-aware decomposition |
| DelowlightSplat | arXiv'26 | Degradation-specific | Depth+low-light joint 3DGS; degradation-specific restoration |

### Foundation / Optimization Methods (New 2026 Additions)

| Method | Venue | Key Innovation |
|--------|-------|---------------|
| Eulerian GS | CVPR'26 (2605.29136) | Hash probabilistic pyramid replacing heuristic densification; gradient-optimized; mip-NeRF 360 SOTA |
| PDEO | CVPR'26 | Plug-and-play PDE-based optimizer; reduces floaters/artifacts via physical constraints |
| Energy-GS | CVPR'26 Oral | Joint camera pose + 3DGS optimization from RGB only; no depth/bone priors |
| Geometry Gaussians | arXiv'26 (2606.05124) | Decouples appearance & geometry opacity per splat; proves default 3DGS unsuited for joint texture+geometry |
| DropAnSH-GS | CVPR'26 | Anchor dropout + SH regularization; eliminates neighbor compensation for sparse-view 3DGS |

### Acceleration / Optimization Methods (New July 2026)

| Method | Venue | Key Innovation |
|--------|-------|---------------|
| Flux-GS | ECCV'26 (arXiv:2606.30017) | Monte Carlo Energy Aggregation for mobile 3DGS; energy-based sampling replaces heuristic densification; mobile-optimized rendering |
| Provable Pruning via Coresets | arXiv'26 (2607.02721) | First provable coreset construction for 3DGS; theoretical guarantee on quality preservation; extends DoG pruning with approximation bounds |
| AnchorSplat | ECCV'26 | Point Anchor Mechanism for 10^5× faster detail enhancement; anchor-based progressive refinement; sparse-to-dense density scheduling |
| SSA-3DGS | arXiv'26 | Sparse Structure-Aware acceleration; exploits spatial sparsity for skip-rendering; 2-3× speedup on sparse scenes |
| Bayesian 3DGS | arXiv'26 | Bayesian uncertainty quantification for 3DGS; per-Gaussian epistemic uncertainty enables confidence-aware pruning; connects to Prune Wisely DoG strategy |

### Hardware Acceleration (New July 2026)

| Method | Venue | Key Innovation |
|--------|-------|---------------|
| Axis-Shared Rasterization Accelerator | ISCA'26 | First 3DGS hardware accelerator; axis-shared tile rasterization; 10-100× energy efficiency vs GPU; targets edge/mobile deployment |