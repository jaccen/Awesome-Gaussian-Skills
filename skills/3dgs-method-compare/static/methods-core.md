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

### Robustness / Regularization Methods

| Method | Venue | Prior Source | Key Feature |
|--------|-------|-------------|-------------|
| EnerGS | arXiv'26 | LiDAR (partial geometric) | Energy-based soft guidance instead of hard constraints; improves outdoor large-scale scenes |
| Luminance-GS++ | TPAMI'26 | Illumination prior | Illumination-robust NVS; decouples shading from geometry |
| Underwater360 | arXiv'26 | Degradation-aware | 3DGS for underwater 360° scenes; attenuation+scattering correction |
| GlowGS | arXiv'26 | Low-light prior | 3DGS for low-light/glowing scenes; radiance-aware decomposition |
| DelowlightSplat | arXiv'26 | Degradation-specific | Depth+low-light joint 3DGS; degradation-specific restoration |
