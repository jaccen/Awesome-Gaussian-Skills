---
AIGC:
  ContentProducer: '001191110102MAD55U9H0F10002'
  ContentPropagator: '001191110102MAD55U9H0F10002'
  Label: '1'
  ProduceID: 'f9a90592-1db2-488f-8dac-75c57914ad11'
  PropagateID: 'f9a90592-1db2-488f-8dac-75c57914ad11'
  ReservedCode1: '24bfbb5a-0d7d-40d9-ada9-9462b1da3d16'
  ReservedCode2: '24bfbb5a-0d7d-40d9-ada9-9462b1da3d16'
---

# Core 3DGS Methods

> Core methods covering foundations, representations, feed-forward, compression, and dynamic scenes.
> Companion file: [3dgs-methods-overview.md](3dgs-methods-overview.md) (index) | [methods-semantic-editing.md](methods-semantic-editing.md) | [methods-systems-apps.md](methods-systems-apps.md)

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
- **Baseline Performance**: Mip-NeRF 360 → PSNR -> ~25.2 dB, SSIM ~0.77, LPIPS ~0.36
- **Speed**: 100+ FPS at 1080p on RTX 3090
- **Links**: [中英摘要](https://arxiv.org/abs/2308.04079) | [arXiv:2308.04079](https://arxiv.org/abs/2308.04079) | [Code](https://repo-sam.informatik.uni-halle.de/jkortner/gaussian-splatting/)

### Mip-Splatting
- **Paper**: Mip-Splatting: Alias-free 3D Gaussian Splatting
- **Authors**: Zehao Yu, Anpei Chen, Binbin Huang, Torsten Sattler, Andreas Geiger
- **Venue**: CVPR 2024 (Best Student Paper)
- **ArXiv**: 2311.16493
- **Core**: Anti-aliased 3D Gaussian Splatting with 3D smoothing filter + 2D Mip filter
- **Key Innovation**: Integrates a 3D smoothing filter on Gaussians and a 2D Mip-level filter during rendering; eliminates blooming/erosion artifacts when zooming; significant SSIM improvement over vanilla 3DGS on Mip-NeRF 360
- **Links**: [中英摘要](https://arxiv.org/abs/2311.16493) | [arXiv:2311.16493](https://arxiv.org/abs/2311.16493) | [Code](https://github.com/autonomousvision/mip-splatting)

### Softmax-GS
- **Paper**: Softmax-GS: Generalized Gaussians Learning When to Blend or Bound
- **Authors**: Chen Ziwen, Peng Wang, Hao Tan, Zexiang Xu, Li Fuxin
- **Venue**: CVPR 2026 Findings
- **ArXiv**: 2604.27437
- **Core**: Replaces standard α-compositing with learnable softmax-based competition between overlapping Gaussians
- **Key Innovation**: Enforces softmax competition in overlapping regions; learnable parameters control blend-vs-bound strength (smooth blending  → crisp boundaries); preserves order invariance and transmittance consistency; addresses both view-inconsistency and diffuse-boundary problems in a unified formulation
- **Trade-off**: Higher parameter efficiency with better reconstruction quality on real-world benchmarks
- **Links**: [中英摘要](https://arxiv.org/abs/2604.27437) | [arXiv:2604.27437](https://arxiv.org/abs/2604.27437) | [Code]

### SNS (3D Skew-Normal Splatting)
- **Paper**: SNS: 3D Skew-Normal Splatting
- **Authors**: Xiangru Wu, Ke Fan, Yanwei Fu
- **ArXiv**: 2605.15010
- **Core**: Adopts Azzalini Skew-Normal distribution as fundamental primitive, replacing symmetric Gaussian kernels
- **Key Innovation**: Learnable bounded skewness parameter enables continuous interpolation between symmetric Gaussians and Half-Gaussian-like shapes; decoupled parameterization + block-wise optimization for scale/rotation/skewness coupling; preserves analytical tractability under affine transformations and marginalization, enabling seamless integration into existing 3DGS rasterization pipelines
- **Performance**: Consistent improvement over Gaussian and recent non-Gaussian kernels on standard NVS benchmarks, especially on sharp boundaries and thin/one-sided structures
- **Venue**: Preprint (May 2026)
- **Links**: [arXiv:2605.15010](https://arxiv.org/abs/2605.15010)

### 3DGEER (Exact Gaussian Rendering)
- **Paper**: 3DGEER: Exact Gaussian Rendering for Fisheye and Generic Cameras
- **Authors**: Bosch Research
- **Venue**: ICLR 2026 (top 1% score)
- **GitHub**: [boschresearch/3dgeer](https://github.com/boschresearch/3dgeer)
- **Core**: Exact ray-Gaussian integration replacing splatting approximation for fisheye and generic camera models
- **Key Innovation**: Challenges the fundamental splatting approximation in 3DGS by computing exact ray-Gaussian interactions; enables high-fidelity rendering for fisheye, omnidirectional, and other non-pinhole cameras critical for autonomous driving and robotics; extends gsplat with gsplat-geer
- **Trade-off**: More computationally intensive per-ray but eliminates approximation errors that compound in wide-FOV cameras
- **Links**: [GitHub](https://github.com/boschresearch/3dgeer)

## Surface & Geometry Methods

### 2D Gaussian Splatting (2DGS)
- **Paper**: 2D Gaussian Splatting for Geometrically Accurate Radiance Fields
- **Note**: Also listed in CAD / Mesh / Hybrid Methods (hybrid representation perspective)
- **Authors**: Zixiang Zhou, Peng Wang, Yuxing Qiu, Pengfei Wan, Xiaoyang Lyu, Tiejun Huang, Yan Lu
- **Venue**: SIGGRAPH 2024
- **ArXiv**: 2403.17888
- **Core**: Replaces 3D Gaussians with oriented 2D disks
- **Key Innovation**: Better surface reconstruction quality while maintaining real-time rendering
- **Trade-off**: Slightly lower PSNR than 3DGS, but significantly better geometric quality
- **Links**: [中英摘要](https://arxiv.org/abs/2403.17888) | [arXiv:2403.17888](https://arxiv.org/abs/2403.17888) | [Code]

### SuGaR
- **Paper**: SuGaR: Surface-Aligned Gaussian Splatting for Efficient 3D Mesh Reconstruction and High-Quality Rendering
- **Authors**: Antoine Guédon, Vincent Lepetit
- **Venue**: CVPR 2024
- **ArXiv**: 2312.13253
- **Core**: Regularizes Gaussians to align with learned mesh surface
- **Key Innovation**: Joint optimization of Gaussians and mesh for high-quality extraction
- **Note**: Also listed in CAD / Mesh / Hybrid Methods (mesh extraction perspective)
- **Links**: [中英摘要](https://arxiv.org/abs/2312.13253) | [arXiv:2312.13253](https://arxiv.org/abs/2312.13253) | [Code](https://github.com/Anttwo/SuGaR)

### PGSR
- **Paper**: Planar-based Gaussian Splatting for High-Fidelity Surface Reconstruction
- **Authors**: Danpeng Chen, Hai Li, Weicai Ye, et al. (ZJU-3DV)
- **Venue**: TVCG 2024
- **ArXiv**: 2406.06521
- **Core**: Planar-based Gaussian Splatting for high-fidelity surface reconstruction
- **Key Innovation**: Planar regularizer constraining Gaussians to align with local tangent planes + unbiased depth rendering; produces cleaner, flatter surfaces than vanilla 3DGS; SOTA geometry metrics on DTU and Tanks and Temples
- **Links**: [中英摘要](https://arxiv.org/abs/2406.06521) | [arXiv:2406.06521](https://arxiv.org/abs/2406.06521) | [Code]

### PAGaS (Pixel-Aligned 1DoF Gaussian Splatting)
- **Paper**: PAGaS: Pixel-Aligned 1DoF Gaussian Splatting for Depth Refinement
- **Authors**: David Recasens, Robert Maier, Aljaz Bozic, Stephane Grabli, Javier Civera, Tony Tung, Edmond Boyer
- **ArXiv**: 2604.22129
- **Core**: Adapts GS from novel view synthesis to multi-view stereo depth task using 1-degree-of-freedom Gaussians
- **Key Innovation**: Gaussians constrained by back-projected pixel volumes, depth as sole DoF; highly detailed depth refinement on top of MVS baselines
- **Links**: [中英摘要](https://arxiv.org/abs/2604.22129) | [arXiv:2604.22129](https://arxiv.org/abs/2604.22129) | [Code](https://github.com/UZ-SLAMLab/pagas)

### 2D-SuGaR
- **Paper**: 2D-SuGaR: Surface-Aware Gaussian Splatting for Geometrically Accurate Mesh Reconstruction
- **Authors**: Prajwal Gupta C. R., Divyam Sheth, Jinjoo Ha, Mirela Ostrek, Justus Thies
- **ArXiv**: 2605.00569
- **Core**: Enhances 2DGS with monocular depth and normal priors for improved geometric accuracy and robustness
- **Key Innovation**: Depth-guided initialization strategy for Gaussians; clustering-based technique for pruning degenerate Gaussians; achieves SOTA mesh reconstruction on DTU while preserving high-quality novel view synthesis
- **Note**: Extension of 2DGS and SuGaR, combining surface-aware regularization with 2D Gaussian primitives
- **Links**: [中英摘要](https://arxiv.org/abs/2605.00569) | [arXiv:2605.00569](https://arxiv.org/abs/2605.00569) | [Code]


### LeanGaussian
- **Paper**: LeanGaussian: Compressing 3D Gaussian Splatting to the Minimum for Efficient Large-Scale Rendering
- **Authors**: IDEA Research Institute
- **Venue**: CVPR 2025
- **Core**: Directly models 3D Gaussians from single RGB image for novel view synthesis; extreme compression for efficient rendering
- **Key Innovation**: Breaks pixel/point cloud correspondence constraints; minimal Gaussian representation for efficient large-scale rendering

### NegGS (Negative Gaussian Splatting)
- **Paper**: Negative Gaussian Splatting
- **ArXiv**: 2405.14786
- **Core**: Allows negative color values; opacity remains non-negative
- **Key Innovation**: Diff-Gaussian distribution (subtraction of two Gaussians) for ring/crescent/non-convex structures; negative color values in RGB space (not negative opacity); ~20% negative Gaussians optimal
- **Links**: [中英摘要](https://arxiv.org/abs/2405.14786) | [arXiv:2405.14786](https://arxiv.org/abs/2405.14786) | [Code]

### SAND
- **Paper**: SAND: Spatially Adaptive Network Depth for Fast Sampling of Neural Implicit Surfaces
- **Authors**: Chuanxiang Yang, Yuanfeng Zhou, Wenping Wang
- **Affiliations**: SDU, Texas A&M
- **Venue**: SIGGRAPH 2026 Journal Track (ACM TOG)
- **Core**: Spatially adaptive network depth for efficient neural implicit surface sampling
- **Key Innovation**: Voxelized depth mapping assigns per-voxel network depth; branched MLP architecture evaluates only necessary layers per spatial region; faster sampling while maintaining surface quality

### 3DSS (3D Surface Splatting)
- **Paper**: 3DSS: 3D Surface Splatting
- **Authors**: Mae Younes, Adnane Boukhayma
- **ArXiv**: 2605.05876
- **Core**: First differentiable surface splatting renderer for physically-based inverse rendering
- **Key Innovation**: Coverage-based compositing model derives per-layer opacity from accumulated EWA reconstruction weight, yielding anti-aliased silhouettes and informative visibility gradients; jointly recovers shape + spatially-varying BRDF + HDR illumination via microfacet shading; bridges to mesh workflows via oriented point cloud
- **Key difference from 3DGS**: Uses oriented surface samples (not volumetric Gaussians), enabling native mesh extraction
- **Related**: 2DGS, SuGaR, GS-IR
- **Links**: [arXiv:2605.05876](https://arxiv.org/abs/2605.05876)

### SVGS (Spatially Varying Gaussian Splatting)
- **Paper**: SVGS: Enhancing Gaussian Splatting Using Primitives with Spatially Varying Colors
- **Authors**: Rui Xu, et al. (HKU, NTU, MUST, SDU, Texas A&M)
- **ArXiv**: 2411.18966
- **Core**: Spatially varying colors and opacity within each Gaussian primitive
- **Key Innovation**: Introduces position-dependent color c(p,d) = SH(d) + Fc(p) and opacity alpha(p) = Falpha(p), enabling a single Gaussian to express complex textures (checkerboards, zebra stripes, letter patterns); three spatial variation designs: (1) Bilinear interpolation (4-quadrant, 1.28x params), (2) Movable kernels (k=4 learnable Gaussian kernels, 1.4x params, best trade-off), (3) Tiny MLP (3-layer, 1.88x params, harder to optimize)
- **Performance**: SOTA on Synthetic Blender (complex textures); on par on Mip-NeRF 360 / T&T; DTU geometry competitive with 2DGS; >30 FPS rendering
- **Trade-off**: Slightly slower training/inference vs vanilla 2DGS due to per-hit spatial variation computation; movable kernels offer best quality-to-cost ratio
- **Related**: 2DGS, Neural Gabor Splatting, NegGS
- **Links**: [arXiv:2411.18966](https://arxiv.org/abs/2411.18966) | [Project](https://ruixu.me/html/SuperGaussians/index.html) | [Code](https://github.com/Xrvitd/SVGS)

### HiFi-SurfSplat (High-Fidelity Surface Splatting-Based 3D Reconstruction)
- **Paper**: High-Fidelity Surface Splatting-Based 3D Reconstruction from Multi-View Images
- **Authors**: Nandhana Sunil, Abhirami R Iyer, Avirup Mandal
- **ArXiv**: 2605.07254
- **Core**: Compact polynomial kernel replacing exponential IMLS kernels for high-fidelity surface splatting reconstruction
- **Key Innovation**: Compact polynomial approximation of IMLS kernel reduces computation; Laplacian stochastic regularization preserves high-frequency geometry; better surface detail than vanilla surface splatting methods
- **Links**: [arXiv:2605.07254](https://arxiv.org/abs/2605.07254) | [Code]

### AmbiSuR
- **Paper**: AmbiSuR: Revisiting Photometric Ambiguity for Accurate Gaussian Splatting Surface Reconstruction
- **Authors**: Jiahe Li et al.
- **Venue**: ICML 2026
- **ArXiv**: 2605.12494
- **Core**: Discovers and resolves two built-in primitive-wise ambiguities in GS representation for surface reconstruction
- **Key Innovation**: Identifies photometric ambiguities intrinsic to Gaussian-based surface representation; introduces photometric disambiguation module + ambiguity self-indication module; corrects underconstrained reconstructions that conventional losses cannot resolve
- **Links**: [arXiv:2605.12494](https://arxiv.org/abs/2605.12494)

### DySurface
- **Paper**: DySurface: Consistent 4D Surface Reconstruction via Bridging Explicit Gaussians and Implicit SDFs
- **Authors**: Minje Kim et al.
- **ArXiv**: 2605.10360
- **Core**: Bridges forward-deformation Gaussians with backward-deformation SDF for consistent 4D surface reconstruction
- **Key Innovation**: VoxGS-DSDF dual branch: deformed Gaussians construct dynamic sparse voxel grid to regularize implicit SDF; combines explicit Gaussian flexibility with implicit SDF's watertight boundary guarantees; achieves temporally consistent 4D surface reconstruction
- **Links**: [arXiv:2605.10360](https://arxiv.org/abs/2605.10360)

### TransmissiveGS
- **Paper**: TransmissiveGS: Residual-Guided Disentangled Gaussian Splatting for Transmissive Scene Reconstruction
- **Authors**: Zhenyu Liang et al.
- **ArXiv**: 2605.10705
- **Core**: Dual-Gaussian representation with deferred shading for transmissive and refractive scenes
- **Key Innovation**: Exploits multi-view inconsistency of reflections as cues for disentangled geometry/appearance; dual-Gaussian (surface + reflection) with deferred shading pipeline; reflection light field for near-field reflections; handles glass, windows, and transparent objects
- **Links**: [arXiv:2605.10705](https://arxiv.org/abs/2605.10705)

### SparseOIT
- **ArXiv**: [2605.13855](https://arxiv.org/abs/2605.13855)
- **Core**: Order-independent transparency rendering for 3DGS via active set method
- **Key Innovation**: Exploits sparse variable dependencies in OIT rendering to efficiently solve for correct transparency ordering; active set method iteratively refines opacity assignments without sorting all Gaussians; enables physically correct semi-transparent rendering in 3DGS
- **Key Results**: Correct transparency rendering without explicit depth sorting; efficient computation via sparsity exploitation
- **Links**: [arXiv:2605.13855](https://arxiv.org/abs/2605.13855)

## CAD / Mesh / Hybrid Methods

### SuGaR
- **Paper**: SuGaR: Surface-Aligned Gaussian Splatting for Efficient 3D Mesh Reconstruction and High-Quality Rendering
- **Authors**: Antoine Guédon, Vincent Lepetit
- **Venue**: CVPR 2024
- **ArXiv**: 2312.13253
- **Core**: Regularizes Gaussians to align with learned mesh surface, extracts mesh via TSDF + Marching Cubes
- **Key Innovation**: Joint optimization of Gaussians and mesh for high-quality surface extraction
- **Pipeline**: Train 3DGS  → Regularize toward surface  → Multi-view TSDF fusion  → Marching Cubes
- **Links**: [中英摘要](https://arxiv.org/abs/2312.13253) | [arXiv:2312.13253](https://arxiv.org/abs/2312.13253) | [Code](https://github.com/Anttwo/SuGaR)

### 2D Gaussian Splatting (2DGS)
- **Paper**: 2D Gaussian Splatting for Geometrically Accurate Radiance Fields
- **Authors**: Zixiang Zhou, Peng Wang, Yuxing Qiu, Pengfei Wan, Xiaoyang Lyu, Tiejun Huang, Yan Lu
- **Venue**: SIGGRAPH 2024
- **ArXiv**: 2403.17888
- **Core**: Replaces 3D Gaussians with oriented 2D disks constrained to surfaces
- **Key Innovation**: Best geometry quality among pure Gaussian methods; enables direct mesh extraction via Poisson reconstruction
- **Trade-off**: Training more expensive, VRAM-hungry
- **Links**: [中英摘要](https://arxiv.org/abs/2403.17888) | [arXiv:2403.17888](https://arxiv.org/abs/2403.17888) | [Code]

### MaGS (Mesh-adsorbed Gaussian Splatting)
- **Paper**: MaGS: Unifying 3D Representation Learning and Neural Rendering with Mesh-adsorbed Gaussian Splatting
- **Authors**: Zhejiang University
- **Venue**: ICCV 2025
- **Core**: Gaussians adsorbed onto mesh vertices; mesh provides topology + deformation handle
- **Key Innovation**: Hybrid mesh-Gaussian representation  → deform mesh  → Gaussians follow automatically
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
- **Links**: [中英摘要](https://arxiv.org/abs/2602.21105) | [arXiv:2602.21105](https://arxiv.org/abs/2602.21105) | [Code]

### CADFit (Mesh-to-CAD Program Generation)
- **Paper**: CADFit: Precise Mesh-to-CAD Program Generation with Hybrid Optimization
- **Authors**: Ghadi Nehme, Eamon Whalen, Faez Ahmed
- **ArXiv**: 2605.01171
- **Core**: IoU-driven hybrid optimization over structured CAD programs for mesh-to-CAD conversion
- **Key Innovation**: Hybrid optimization combining gradient-based and discrete search over CAD programs (extrusions, revolutions, fillets, chamfers); multimodal image-to-CAD pipeline; precise parametric CAD output from mesh input
- **Related**: BrepGaussian, CADFS
- **Links**: [arXiv:2605.01171](https://arxiv.org/abs/2605.01171) | [Code]

## Generation / Text-to-3D

### DreamGaussian
- **Paper**: DreamGaussian: Generative Gaussian Splatting for Efficient 3D Content Creation
- **Authors**: Jiaxiang Tang, Jiawei Ren, Hang Zhou, Ziwei Liu, Gang Zeng
- **Venue**: ICLR 2024 (Oral)
- **ArXiv**: 2309.16653
- **Core**: SDS-based text-to-3D generation with 3DGS prior; generates 3D assets from text prompts
- **Key Innovation**: Replaces NeRF prior in SDS with 3DGS for orders-of-magnitude faster text-to-3D; generates high-quality 3D assets in seconds; combines texture mesh extraction with Gaussian refinement
- **Links**: [中英摘要](https://arxiv.org/abs/2309.16653) | [arXiv:2309.16653](https://arxiv.org/abs/2309.16653) | [Code](https://github.com/dreamgaussian/dreamgaussian)

### AniGen
- **Paper**: AniGen: Unified S³ Fields for Animatable 3D Asset Generation
- **Authors**: Yihua Huang, Yanpei Cao, Xiaojuan Qi
- **Affiliations**: HKU, VAST
- **Venue**: SIGGRAPH 2026 Journal Track (ACM TOG)
- **Core**: Single image → animatable 3D asset with skeleton + skinning weights via unified S³ Fields + two-stage flow matching
- **Key Innovation**: Jointly models geometry, skeleton, and skinning in shared latent space instead of serial generate-then-rig pipeline; produces fully rigged animatable characters from a single image
- **Links**: [GitHub](https://github.com/VAST-AI-Research/AniGen) | [Project](https://yihua7.github.io/AniGen-web/)

### SIC3D
- **Paper**: Style Image Conditioned Text-to-3D Gaussian Splatting Generation
- **arXiv**: [2604.08760](https://arxiv.org/abs/2604.08760)
- **Innovation**: Introduces style image conditioning for text-to-3D Gaussian Splatting, enabling controllable style transfer in 3D generation via reference style images
- **Links**: [arXiv:2604.08760](https://arxiv.org/abs/2604.08760)

### SceneGen-LLMRL
- **Paper**: Closing the Loop: Unified 3D Scene Generation and Immersive Interaction via LLM-RL Coupling
- **Authors**: Anh H. Vo, Sungyo Lee, Phil-Joong Kim, Soo-Mi Choi, Yong-Guk Kim
- **ArXiv**: 2605.05711
- **Core**: Unified 3D scene generation + immersive interaction via LLM-RL coupling
- **Key Innovation**: Closes the loop between LLM-based scene understanding/generation and RL-guided interactive exploration; generates 3D scenes from language descriptions and enables real-time interactive manipulation; bridges scene generation with immersive user experience
- **Related**: DreamGaussian, AniGen
- **Links**: [arXiv:2605.05711](https://arxiv.org/abs/2605.05711)

## Feed-Forward Methods

### GlobalSplat
- **Paper**: GlobalSplat: Efficient Feed-Forward 3D Gaussian Splatting via Global Scene Tokens
- **Authors**: Roni Itkin, Noam Issachar, Yehonatan Keypur, Xingyu Chen, Anpei Chen, Sagie Benaim
- **ArXiv**: 2604.15284
- **Core**: Learns a compact global latent scene representation before decoding any explicit 3D geometry
- **Key Innovation**: "Align first, decode later"  → resolves cross-view correspondences in latent space, then decodes to ~16K Gaussians with 4MB footprint
- **Speed**: Inference under 78ms in a single forward pass
- **Trade-off**: Far fewer Gaussians (16K vs typical 100K-1M) but competitive quality on RealEstate10K and ACID
- **Links**: [中英摘要](https://arxiv.org/abs/2604.15284) | [arXiv:2604.15284](https://arxiv.org/abs/2604.15284) | [Code](https://r-itk.github.io/globalsplat/)

### TRiGS
- **Paper**: TRiGS: Temporal Rigid-Body Motion for Scalable 4D Gaussian Splatting
- **Authors**: Suwoong Yeom, Joonsik Nam, Seunggyu Choi, et al.
- **ArXiv**: 2604.00538
- **Core**: Unified, continuous geometric transformations for 4DGS using SE(3) + hierarchical Bezier residuals + learnable local anchors
- **Key Innovation**: Preserves temporal identity of rigid objects, eliminates memory growth; scales to 600-1200 frame sequences without severe bottlenecks
- **Links**: [中英摘要](https://arxiv.org/abs/2604.00538) | [arXiv:2604.00538](https://arxiv.org/abs/2604.00538) | [Code]

### Reliev3R
- **Paper**: Reliev3R: Relieving Feed-forward Reconstruction from Multi-View Geometric Annotations
- **Authors**: Youyu Chen, et al.
- **ArXiv**: 2604.00548
- **Venue**: CVPR 2026
- **Core**: Reduces dependency of feed-forward 3DGS on dense multi-view geometric annotations
- **Links**: [中英摘要](https://arxiv.org/abs/2604.00548) | [arXiv:2604.00548](https://arxiv.org/abs/2604.00548) | [Code]

### ARGS
- **Paper**: ARGS: Auto-Regressive Gaussian Splatting via Parallel Progressive Next-Scale Prediction
- **Authors**: Quanyuan Ruan, et al.
- **ArXiv**: 2604.00494
- **Core**: Auto-regressive multi-scale 3D generation with hierarchical tree structure, O(log n) step generation
- **Links**: [中英摘要](https://arxiv.org/abs/2604.00494) | [arXiv:2604.00494](https://arxiv.org/abs/2604.00494) | [Code]

### WildSplatter
- **Paper**: WildSplatter: Feed-forward 3D Gaussian Splatting with Appearance Control from Unconstrained Images
- **Authors**: Yuki Fujimura, Takahiro Kushida, Kazuya Kitano, Takuya Funatomi, Yasuhiro Mukaigawa
- **ArXiv**: 2604.21182
- **Core**: Feed-forward 3DGS from unconstrained images with unknown camera poses and varying lighting
- **Key Innovation**: Jointly learns 3D Gaussians + appearance embeddings conditioned on input images; <1s reconstruction from sparse views; appearance control under diverse lighting
- **Links**: [中英摘要](https://arxiv.org/abs/2604.21182) | [arXiv:2604.21182](https://arxiv.org/abs/2604.21182) | [Code](https://github.com/yfujimura/WildSplatter)

### SparseSplat
- **Paper**: SparseSplat: Towards Applicable Feed-Forward 3D Gaussian Splatting with Pixel-Unaligned Prediction
- **Authors**: Zicheng Zhang, Xiangting Meng, Ke Wu, Wenchao Ding (Fudan University + ShanghaiTech)
- **Venue**: CVPR 2026
- **Core**: First feed-forward 3DGS model with adaptive Gaussian density via entropy-based probabilistic sampling
- **Key Innovation**: Pixel-unaligned prediction; entropy-based sampling assigns large sparse Gaussians to textureless areas and small dense Gaussians to rich-info regions; 3D-Local Attribute Predictor addresses receptive field mismatch; achieves SOTA with only 22% of Gaussians (150K vs 688K), maintains quality at 1.5% (10K)
- **Links**: [中英摘要](https://arxiv.org/abs/2604.14048) | [arXiv:2604.14048](https://arxiv.org/abs/2604.14048) | [Code](https://github.com/victkk/SparseSplat-page)

### Free Geometry
- **Paper**: Free Geometry: Refining 3D Reconstruction from Longer Versions of Itself
- **Authors**: Yuhang Dai, Xingyi Yang (PolyU)
- **ArXiv**: 2604.14048
- **Core**: Enables feed-forward 3D reconstruction models (Depth Anything 3, VGGT) to self-evolve at test time without 3D GT
- **Key Innovation**: Masks subset of frames for self-supervision; enforces cross-view feature consistency between full/partial observations via LoRA updates (<2min per dataset); +3.73% camera pose accuracy, +2.88% point map prediction
- **Links**: [中英摘要](https://arxiv.org/abs/2604.14048) | [arXiv:2604.14048](https://arxiv.org/abs/2604.14048) | [Code](https://github.com/hiteacherIamhumble/Free-Geometry)

### IDESplat
- **Paper**: IDESplat: Iterative Depth Probability Estimation for Generalizable 3D Gaussian Splatting
- **Authors**: Zizhang Li, et al. (UESTC)
- **Venue**: CVPR 2026
- **ArXiv**: 2601.03824
- **Core**: Iterative depth probability estimation for feed-forward 3DGS with depth probability boosting unit
- **Key Innovation**: Depth Probability Boosting Unit (DPBU) uses multiple warps with epipolar attention for iterative depth refinement; Gaussian Focus Module (GFM) adaptively focuses Gaussians on high-information regions; progressively narrows depth search range while increasing feature resolution
- **Links**: [中英摘要](https://arxiv.org/abs/2601.03824) | [arXiv:2601.03824](https://arxiv.org/abs/2601.03824) | [Code](https://github.com/CVL-UESTC/IDESplat)

### MVSplat
- **Paper**: MVSplat: Efficient Feed-Forward 3D Gaussian Splatting from Sparse Multi-View Images
- **Authors**: Donny Y. Chen, Haofei Xu, Chuanxia Zheng, Andreas Geiger, Xingyu Chen, Shenghua Gao, Yujun Shen
- **Venue**: ECCV 2024
- **ArXiv**: 2403.14627
- **Core**: Efficient 3DGS reconstruction from sparse multi-view images via cost-volume-based Gaussian prediction
- **Key Innovation**: Cost volume encodes multi-view geometry  → predicts per-view Gaussian splats  → cross-view aggregation; achieves high-quality reconstruction from as few as 3 views; strong generalization across datasets
- **Links**: [中英摘要](https://arxiv.org/abs/2403.14627) | [arXiv:2403.14627](https://arxiv.org/abs/2403.14627) | [Code](https://github.com/donydchen/mvsplat)

### GS-LRM
- **Paper**: GS-LRM: Large Reconstruction Model for 3D Gaussian Splatting
- **Authors**: Kai Zhang, Sai Bi, Haotong Lin, Zexiang Xu, Xiaojuan Qi, Alexei A. Efros, Kun Zhou, Felix Heide
- **Venue**: ECCV 2024
- **ArXiv**: 2404.19702
- **Core**: Transformer-based large reconstruction model (1B parameters) for feed-forward 3D Gaussian Splatting
- **Key Innovation**: Large-scale transformer pretrained on massive multi-view data; predicts 3D Gaussians from arbitrary view combinations; strong zero-shot generalization to unseen scenes and object categories
- **Links**: [中英摘要](https://arxiv.org/abs/2404.19702) | [arXiv:2404.19702](https://arxiv.org/abs/2404.19702) | [Code](https://github.com/sunnyuvion/GS-LRM)

### DepthSplat
- **Paper**: DepthSplat: Connecting Gaussian Splatting and Depth for Feed-Forward Multi-View 3D Reconstruction
- **Authors**: Haofei Xu, Songyou Peng, Fangjinhua Wang, Monika Wulff, Daniel Barath, Torsten Sattler, Andreas Geiger
- **Venue**: CVPR 2025
- **ArXiv**: 2410.13862
- **Core**: Stereo-guided feed-forward 3DGS with depth regularization; connects Gaussian Splatting and depth estimation
- **Key Innovation**: Depth regularization bridging stereo depth estimation and 3DGS prediction; stereo-guided cross-view attention; achieves SOTA on multiple benchmarks; robust handling of uncalibrated and sparse views
- **Links**: [中英摘要](https://arxiv.org/abs/2410.13862) | [arXiv:2410.13862](https://arxiv.org/abs/2410.13862) | [Code](https://github.com/yzhq97/depthsplat)

### InstantSplat
- **Paper**: InstantSplat: Unbounded Sparse-view Pose-free Gaussian Splatting in 40 Seconds
- **Authors**: Zhiwen Fan, Wenqiang Sun, Peng Chen, Zetong Yang, Yuchen Fan, Zhangyang Wang
- **ArXiv**: 2403.20309
- **Core**: Unbounded sparse-view pose-free 3D Gaussian Splatting
- **Key Innovation**: No camera poses required; joint estimation of poses and 3D Gaussians from sparse views in ~40 seconds; unbounded scene support; SILC loss for geometry-aware optimization
- **Links**: [中英摘要](https://arxiv.org/abs/2403.20309) | [arXiv:2403.20309](https://arxiv.org/abs/2403.20309) | [Code](https://github.com/NVlabs/InstantSplat)

### AnySplat
- **Paper**: AnySplat: Feed-forward 3D Gaussian Splatting from Unconstrained In-the-Wild Views
- **Authors**: Lihan Jiang, Xiaoyang Lyu, et al. (SenseTime / CUHK)
- **Venue**: SIGGRAPH 2025
- **ArXiv**: 2505.23716
- **Core**: Feed-forward 3DGS from unconstrained/in-the-wild views with appearance and lighting variations
- **Key Innovation**: Handles arbitrary in-the-wild images with unknown lighting, varying appearance, and unknown camera parameters; robust feed-forward reconstruction without per-scene optimization
- **Links**: [中英摘要](https://arxiv.org/abs/2505.23716) | [arXiv:2505.23716](https://arxiv.org/abs/2505.23716) | [Code]

### TokenGS
- **Paper**: TokenGS: Decoupling 3D Gaussian Prediction from Pixels with Learnable Tokens
- **arXiv**: [2604.15239](https://arxiv.org/abs/2604.15239)
- **Innovation**: Replaces pixel-to-Gaussian direct prediction with learnable token-based representation, decoupling 3D Gaussian generation from pixel-level features for better generalization in feed-forward novel view synthesis
- **Links**: [arXiv:2604.15239](https://arxiv.org/abs/2604.15239)

### Spark3R
- **Paper**: Spark3R: Training-Free Acceleration for Feed-Forward 3D Reconstruction
- **Authors**: Zecheng Tang, Jiaye Fu, Qiankun Gao, Haijie Li, Yanmin Wu, Jiaqi Zhang, Siwei Ma, Jian Zhang
- **ArXiv**: 2605.06270
- **Core**: Training-free acceleration framework for feed-forward 3D reconstruction models
- **Key Innovation**: Identifies that query tokens (view-specific geometric requests) are sensitive to compression while KV tokens (shared scene context) tolerate aggressive compression; applies asymmetric reduction: intra-group merging for query tokens, lightweight pruning for KV tokens; up to 28x speedup on 1000-frame inputs; plug-and-play for VGGT, π³, Depth-Anything-3
- **Category**: Feed-Forward / Acceleration
- **Links**: [arXiv:2605.06270](https://arxiv.org/abs/2605.06270)

### GenWildSplat
- **Paper**: GenWildSplat: Generalizable Sparse-View 3D Reconstruction from Unconstrained Images
- **Authors**: Vinayak Gupta, Chih-Hao Lin, Shenlong Wang, Anand Bhattad, Jia-Bin Huang
- **Venue**: CVPR 2026
- **ArXiv**: 2604.28193
- **Core**: Generalizable sparse-view 3D reconstruction from unconstrained images in wild conditions
- **Key Innovation**: Handles appearance variations in wild conditions without per-scene optimization
- **Category**: Feed-Forward / Few-Shot
- **Links**: [arXiv:2604.28193](https://arxiv.org/abs/2604.28193)

### AdaptSplat
- **Paper**: AdaptSplat: Adapting Vision Foundation Models for Feed-Forward 3D Gaussian Splatting
- **Authors**: Mingwei Xing et al.
- **ArXiv**: 2605.10239
- **Core**: Lightweight Frequency-Preserving Adapter on generic feed-forward 3DGS pipeline
- **Key Innovation**: Only 1.5M additional parameters; Frequency-Preserving Adapter extracts direction-aware high-frequency structural priors from shallow features; preserves fine details that standard feed-forward methods lose; SOTA on feed-forward benchmarks
- **Links**: [arXiv:2605.10239](https://arxiv.org/abs/2605.10239)

### Z-Order GS
- **ArXiv**: [2605.13465](https://arxiv.org/abs/2605.13465)
- **Venue**: CVPR 2026 Oral
- **Core**: Z-order strategy for spatially coherent Gaussian sequence in feed-forward 3DGS
- **Key Innovation**: Replaces heuristic Gaussian ordering with Z-order (Morton) curve for spatially coherent sequence; enables efficient sparse attention mechanism that focuses on nearby Gaussians in 3D space; reduces computational complexity from O(N²) to O(N log N) for cross-Gaussian attention
- **Key Results**: CVPR 2026 Oral; achieves state-of-the-art feed-forward quality with more efficient attention
- **Links**: [arXiv:2605.13465](https://arxiv.org/abs/2605.13465)

### RoSplat
- **ArXiv**: [2605.13093](https://arxiv.org/abs/2605.13093)
- **Core**: Robust feed-forward pixel-wise Gaussian Splatting for varying input views and high-resolution rendering
- **Key Innovation**: Alpha normalization prevents oversaturation from varying view counts; 3D sampling regularizer ensures consistent Gaussian distribution across resolutions; handles arbitrary number of input views with robust performance
- **Key Results**: Consistent quality across varying input views; supports high-resolution output
- **Links**: [arXiv:2605.13093](https://arxiv.org/abs/2605.13093)

### SplatWeaver
- **Paper**: SplatWeaver: Cardinality-Aware Feed-Forward 3D Gaussian Splatting
- **Authors**: HIT + Huawei Noah's Ark Lab + Shenzhen Technology University
- **ArXiv**: 2605.07287
- **Core**: Cardinality Gaussian Expert Routing with 4 experts (Null/1/2/3 Gaussians per pixel) + Frequency Prior Guidance + Neighbor-Conditioned Gaussian Parameter Prediction
- **Key Innovation**: Hard discrete routing preserves physical meaning of bubble positions; DWT-based high-frequency energy as Frequency Prior Guidance; K=8 neighbor attention for Gaussian parameter prediction; stochastic budget training with ε=0.3 budget control; route regularization loss for warmup; coarse-to-fine neighbor search for GPU acceleration
- **Performance**: On DL3DV 16-view: PSNR 20.11 (+1.02 over AnySplat), 451K Gaussians (30% of AnySplat), 29.2MB storage, 301 FPS rendering; zero-shot generalization on RealEstate10K and Mip-NeRF 360
- **Code**: [GitHub](https://github.com/yecongwan/SplatWeaver)
- **Venue**: Preprint (May 2026)
- **Links**: [arXiv:2605.07287](https://arxiv.org/abs/2605.07287) | [Code](https://github.com/yecongwan/SplatWeaver)

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

### HAC
- **Paper**: HAC: Hash-grid Assisted Context Modeling for 3D Gaussian Splatting Compression
- **Authors**: Yihang Chen, Qianyi Wu, Jianfei Cai, Mehrtash Harandi, Weiyao Lin
- **Venue**: ECCV 2024
- **ArXiv**: 2403.14530
- **Core**: Hash-grid assisted context modeling for 3DGS compression; achieves ~100x compression
- **Key Innovation**: Learned context modeling via hash grid for compact attribute representation; ~100x compression ratio with minimal quality loss; efficient entropy coding for storage
- **Links**: [中英摘要](https://arxiv.org/abs/2403.14530) | [arXiv:2403.14530](https://arxiv.org/abs/2403.14530) | [Code](https://github.com/yihangchen-ee/HAC)

### OT-UVGS
- **Paper**: OT-UVGS: Revisiting UV Mapping for Gaussian Splatting as a Capacity Allocation Problem
- **Author**: Byunghyun Kim
- **Venue**: Eurographics 2026 Short Papers
- **ArXiv**: 2604.19127
- **Core**: Reinterprets UV mapping for Gaussian Splatting as an optimal-transport-based capacity allocation problem
- **Key Innovation**: Separable 1D OT-inspired mapping with O(N log N) complexity; globally couples Gaussian-to-UV assignments
- **Result**: Consistently improves PSNR/SSIM/LPIPS under same UV resolution; higher non-empty slot ratio, fewer collisions, higher Gaussian retention
- **Application**: Drop-in replacement for spherical UVGS
- **Links**: [中英摘要](https://arxiv.org/abs/2604.19127) | [arXiv:2604.19127](https://arxiv.org/abs/2604.19127) | [Code]

### Gaussians on a Diet
- **Paper**: Gaussians on a Diet: High-Quality Memory-Bounded 3D Gaussian Splatting Training
- **Authors**: Yangming Zhang, Jian Xu, Chaojian Li, Kunxiong Zhu, Wei Niu, Gagan Agrawal, et al.
- **ArXiv**: 2604.20046
- **Core**: Memory-bounded training framework with iterative growth and pruning to maintain near-constant low memory
- **Key Innovation**: Addresses peak memory spikes during training (not just post-training pruning); up to 80% lower peak training memory; runs on Jetson AGX Xavier
- **Links**: [中英摘要](https://arxiv.org/abs/2604.20046) | [arXiv:2604.20046](https://arxiv.org/abs/2604.20046) | [Code]

### GS-SCNet
- **Paper**: Generalizable 3D Gaussian Splatting enabled Semantic Coding for Real-Time Immersive Video Communications
- **Authors**: Dingxi Yang, Wenqi Guo, Yue Liu, Jungong Han, Zhijin Qin
- **ArXiv**: 2604.25330
- **Core**: Unified end-to-end framework integrating generalizable 3DGS reconstruction with deep semantic coding pipeline
- **Key Innovation**: Disparity-Guided Parallel Semantic Codec + Lightweight Gaussian Parameter Predictor; eliminates redundant computation in decoupled coding+3DGS paradigms
- **Application**: 3D telepresence, immersive video communications
- **Links**: [中英摘要](https://arxiv.org/abs/2604.25330) | [arXiv:2604.25330](https://arxiv.org/abs/2604.25330) | [Code]

### NanoGS
- **Paper**: NanoGS: Training-Free Gaussian Splat Simplification
- **Authors**: Butian Xiong, Rong Liu, Tiantian Zhou, Meida Chen, Zhiwen Fan, Andrew Feng
- **ArXiv**: 2603.16103
- **Core**: Training-free, lightweight Gaussian Splat simplification via local pairwise merging on sparse spatial graph
- **Key Innovation**: Mass-preserving moment matching for Gaussian merge; principled merge cost between original mixture and approximation; runs efficiently on CPU; preserves standard 3DGS parameterization for seamless pipeline integration
- **Links**: [中英摘要](https://arxiv.org/abs/2603.16103) | [arXiv:2603.16103](https://arxiv.org/abs/2603.16103) | [Code](https://github.com/saliteta/NanoGS)

### MesonGS++
- **Paper**: MesonGS++: Post-training Compression of 3D Gaussian Splatting with Hyperparameter Searching
- **Authors**: Shuzhao Xie, Junchen Ge, Weixiang Zhang, et al. (Tsinghua / NTU Singapore)
- **ArXiv**: 2604.26799
- **Venue**: Under review
- **Core**: Size-aware post-training codec for 3DGS compression with automatic hyperparameter search under target storage budget
- **Key Innovation**: Joint importance-based pruning + octree geometry coding + attribute transformation + selective vector quantization + group-wise mixed-precision quantization; treats reserve ratio and bit-width as rate-distortion knobs optimized via 0-1 integer linear programming; linear size estimator + CUDA parallel quantization for fast search; 34x compression while preserving fidelity
- **Links**: [中英摘要](https://arxiv.org/abs/2604.26799) | [arXiv:2604.26799](https://arxiv.org/abs/2604.26799) | [Code](https://github.com/mmlab-sigs/mesongs_plus)

### GETA-3DGS
- **Paper**: GETA-3DGS: Automatic Joint Structured Pruning and Quantization for 3D Gaussian Splatting
- **Authors**: Baobing Zhang, Wanxin Sui
- **ArXiv**: 2605.02086
- **Core**: First end-to-end automatic joint structured pruning and quantization framework for 3DGS
- **Key Innovation**: 3DGS-aware quantization-aware dependency graph (QADG) treating each Gaussian as group with 5 attribute sub-nodes; render-aware saliency fusing transmittance-weighted contribution + screen-space gradient + pixel coverage; heterogeneous per-attribute mixed-precision scheme co-optimized with structural sparsity; ~5x storage reduction with no per-scene thresholds; bit-width policy is dominant rate-distortion lever (uniform 6-bit cap costs up to -6.74 dB vs heterogeneous allocation)
- **Note**: Complementary to existing codecs (HAC++, CompGS); operates on raw Gaussian primitives
- **Links**: [中英摘要](https://arxiv.org/abs/2605.02086) | [arXiv:2605.02086](https://arxiv.org/abs/2605.02086) | [Code]

### CAGS (Color-Adaptive Volumetric Video Streaming)
- **Paper**: CAGS: Color-Adaptive Volumetric Video Streaming with Dynamic 3D Gaussian Splatting
- **Authors**: Daheng Yin, Yili Jin, Jianxin Shi, Isaac Ding, Miao Zhang, Fangxin Wang, Zhaowu Huang, Cong Zhang, Jiangchuan Liu, Fang Dong
- **Venue**: SIGGRAPH 2026
- **ArXiv**: 2605.09279
- **Core**: VQ-based LoD for adaptive 3DGS volumetric video streaming + low-res reference image color-distortion correction
- **Key Innovation**: Vector quantization establishes quality LoDs for 3DGS streaming; server-side rendering of low-res reference image corrects attribute compression color distortion at client; +5~20 dB PSNR over baselines under fluctuating bandwidth; representation-agnostic (works with diverse Gaussian types)
- **Trade-off**: Requires server-side rendering for reference images but avoids heavy client-side computation
- **Related**: Compact-3DGS, HAC, GS-SCNet
- **Links**: [arXiv:2605.09279](https://arxiv.org/abs/2605.09279) | [Code](https://github.com/yindaheng98/ColorAdaptiveGaussianSplatting)

### MGS (Matryoshka Gaussian Splatting)
- **Paper**: MGS: Matryoshka Gaussian Splatting
- **Authors**: Zhilin Guo et al.
- **ArXiv**: 2603.19234
- **Core**: Continuous LoD for 3DGS via stochastic budget training - each iteration samples random splat budget and optimizes both prefix-k and full set
- **Key Innovation**: Learns ordered Gaussian set where any prefix produces coherent reconstruction; requires only two forward passes with no architectural modifications; enables continuous speed-quality trade-off from single model while matching full-capacity performance
- **Venue**: Preprint (Mar 2026)
- **Links**: [arXiv:2603.19234](https://arxiv.org/abs/2603.19234)

## Dynamic Scene Methods

### 4D Gaussian Splatting (4DGS)
- **Paper**: 4D Gaussian Splatting for Real-Time Dynamic Scene Rendering
- **Authors**: Guanjun Wu, Taoran Yi, Jiemin Fang, Lingxi Xie, Xiaopeng Zhang, Wenyu Liu, Qi Tian, Xinggang Wang
- **Venue**: CVPR 2024
- **ArXiv**: 2310.08528
- **Core**: 4D anisotropic Gaussians (3D + time) with regularized deformation for real-time dynamic scene rendering
- **Key Innovation**: Extends standard 3DGS to 4D space-time domain; regularized deformation ensures temporal consistency; real-time rendering of dynamic scenes; handles complex non-rigid motions
- **Trade-off**: Handles dynamics but increases memory
- **Links**: [中英摘要](https://arxiv.org/abs/2310.08528) | [arXiv:2310.08528](https://arxiv.org/abs/2310.08528) | [Code](https://github.com/hustvl/4DGaussians)

### Dynamic 3D Gaussians
- **Paper**: Deformable 3D Gaussians for High-Fidelity Monocular Dynamic Scene Reconstruction
- **Authors**: Jonathon Luiten, Georgios Kopanas, Bastian Leibe, Deva Ramanan
- **Venue**: ICCV 2023
- **ArXiv**: 2309.13114
- **Core**: Per-point deformation network applied to Gaussian parameters
- **Method**: Learned deformation field + regularized optimization
- **Links**: [中英摘要](https://arxiv.org/abs/2309.13114) | [arXiv:2309.13114](https://arxiv.org/abs/2309.13114) | [Code]

### SC-GS
- **Core**: Spatial-temporal compression for dynamic Gaussians
- **Method**: Compact 4D representation with shared deformation

### RobustSplat
- **Paper**: RobustSplat: Decoupling Densification and Dynamics for Transient-Free 3DGS
- **Authors**: Sun Yat-sen University + CUHK-Shenzhen
- **Venue**: ICCV 2025
- **Core**: Decouples densification from dynamic object modeling to eliminate transient artifacts
- **Key Innovation**: Separate static/dynamic Gaussian management prevents transient objects from corrupting scene geometry

### Color-Encoded Illumination (CVPR 2026 Highlight)
- **Paper**: Color-Encoded Illumination for High-Speed Volumetric Scene Reconstruction
- **Authors**: David Novikov, Eilon Vaknin, Narek Tumanyan, Mark Sheinin
- **Venue**: CVPR 2026 (Highlight)
- **ArXiv**: 2604.26920
- **Core**: Encodes high-speed temporal information via rapid sequential color-coded illumination, decoded with dynamic Gaussian Splatting
- **Key Innovation**: First high-speed volumetric scene reconstruction using only unaugmented low-speed cameras; color-coded light sequence encodes temporal dimension; novel dynamic 3DGS approach for decoding multi-frame information from single captured frame
- **Links**: [中英摘要](https://arxiv.org/abs/2604.26920) | [arXiv:2604.26920](https://arxiv.org/abs/2604.26920) | [Code]

### TRiGS (also listed in Feed-Forward)
- See Feed-Forward Methods section for details


### HDR-NSFF
- **Paper**: HDR-NSFF: High Dynamic Range Neural Scene Flow Fields
- **Authors**: Shin Dong-Yeon, Kim Jun-Seong, Kwon Byung-Ki, Tae-Hyun Oh
- **Venue**: ICLR 2026
- **ArXiv**: 2603.08313
- **Core**: Dynamic HDR radiance fields from alternating-exposure monocular video; compatible with both NeRF and 4DGS
- **Key Innovation**: 4D spatio-temporal modeling paradigm; DINO-based exposure-invariant optical flow; first real-world HDR-GoPro dataset
- **Links**: [中英摘要](https://arxiv.org/abs/2603.08313) | [arXiv:2603.08313](https://arxiv.org/abs/2603.08313) | [Code](https://shin-dong-yeon.github.io/HDR-NSFF/)

### FreeTimeGS++
- **Paper**: FreeTimeGS++: Secrets of Dynamic Gaussian Splatting and Their Principles
- **Authors**: Lucas Yunkyu Lee, Soonho Kim, Youngwook Kim, Sangmin Kim, Jaesik Park (POSTECH)
- **ArXiv**: 2605.03337
- **Core**: Comprehensive analysis and principled improvement of 4D Gaussian Splatting for dynamic scene reconstruction
- **Key Innovation**: Establishes controlled baseline (FreeTimeGS_ours) by formalizing SOTA heuristics; uncovers emergent temporal partitioning driven by Gaussian durations and photometric vs spatiotemporal consistency discrepancy; proposes gated marginalization + neural velocity fields for superior stability; reduced run-to-run variance and reproducible results
- **Note**: Provides systematic understanding and reliable foundation for future 4DGS research
- **Links**: [中英摘要](https://arxiv.org/abs/2605.03337) | [arXiv:2605.03337](https://arxiv.org/abs/2605.03337) | [Code]

### GeoRect4D
- **Paper**: GeoRect4D: Geometry-Compatible Generative Rectification for Dynamic Sparse-View 3D Reconstruction
- **Authors**: Zhenlong Wu, Zihan Zheng, Xuanxuan Wang, Qianhe Wang, Hua Yang, Xiaoyun Zhang, Qiang Hu, Wenjun Zhang
- **Affiliation**: Shanghai Jiao Tong University
- **ArXiv**: 2604.20784
- **Core**: Geometry-compatible generative rectification for dynamic sparse-view 3D reconstruction
- **Key Innovation**: Addresses geometry deformation in dynamic scenes via generative rectification
- **Category**: Dynamic
- **Links**: [arXiv:2604.20784](https://arxiv.org/abs/2604.20784)

### ParticleGS
- **Paper**: ParticleGS: Learning Neural Gaussian Particle Dynamics from Videos for Prior-free Physical Motion Extrapolation
- **Authors**: Jinsheng Quan, Qiaowei Miao, Yichao Xu, Zizhuo Lin, Ying Li, Wei Yang, Zhihui Li, Yawei Luo
- **Venue**: CVPR 2026 (Highlight)
- **ArXiv**: 2505.20270
- **Core**: Physics-based framework that reformulates dynamic 3D scenes as physically grounded particle systems with Neural ODE evolution for motion extrapolation
- **Key Innovation**: MPM-inspired decomposition into static properties + initial dynamic physical fields; Neural ODE evolver learns continuous-time dynamics for future prediction; decoder reconstructs 3D Gaussians from evolved particle states; enables accurate physical motion extrapolation beyond observed timeframe (prior-free)
- **Related**: 4DGS, Dynamic 3D Gaussians, FreeTimeGS++
- **Links**: [arXiv:2505.20270](https://arxiv.org/abs/2505.20270) | [Code]

### PaMoSplat
- **Paper**: PaMoSplat: Part-Aware Motion-Guided Gaussian Splatting for Dynamic Scene Reconstruction
- **Authors**: Yinan Deng, Jianyu Dou, Jiahui Wang, Jingyu Zhao, Yi Yang, Yufeng Yue
- **Venue**: TCSVT
- **ArXiv**: 2605.10307
- **Core**: Part-aware 3DGS with graph-clustered Gaussian parts and differential evolution for rigid motion estimation
- **Key Innovation**: Graph-based clustering partitions scene into rigid parts; differential evolution estimates per-part rigid motion from optical flow; enables part-level 4D editing and manipulation; handles articulated/deformable objects as collections of rigid parts
- **Related**: 4DGS, Dynamic 3D Gaussians
- **Links**: [arXiv:2605.10307](https://arxiv.org/abs/2605.10307) | [Code]

### PD-4DGS
- **Paper**: PD-4DGS: Progressive Decomposition of 4DGS for Bandwidth-Adaptive Dynamic Scene Streaming
- **Authors**: Jiachen Li et al.
- **ArXiv**: 2605.11427
- **Core**: First progressive compression/transmission framework for 4DGS dynamic scenes
- **Key Innovation**: Hierarchical Deformation Decomposition (HDD) creates 3 independently transmittable layers: static scaffold, global deformation, local refinement; DASH/HLS-compatible bitstream for standard video players; reduces first-frame latency from 73-930s to ~1.7s; enables bandwidth-adaptive streaming of dynamic 3DGS
- **Related**: CAGS, ClipGStream, FreeTimeGS++
- **Links**: [arXiv:2605.11427](https://arxiv.org/abs/2605.11427)

### 3DGS³ (Super Sampling + Frame Interpolation)
- **Paper**: 3DGS³: Joint Super Sampling and Frame Interpolation for Real-Time Large-Scale 3D Gaussian Splatting Rendering
- **Authors**: Yibo Zhao et al.
- **ArXiv**: 2605.11489
- **Core**: Post-rendering framework combining super sampling and temporal frame interpolation for large-scale 3DGS
- **Key Innovation**: Gradient-Aware Super Sampling (GASS) extracts differentiable image gradients from 3DGS + GRU refinement; Lightweight Temporal Frame Interpolation (LTFI) generates intermediate frames; enables real-time high-quality rendering of large-scale scenes on consumer hardware
- **Related**: Scaffold-GS, CityGaussian, QuadBox
- **Links**: [arXiv:2605.11489](https://arxiv.org/abs/2605.11489)

### Velox
- **ArXiv**: [2605.04527](https://arxiv.org/abs/2605.04527)
- **Core**: Learning representations of 4D geometry and appearance for feed-forward 4D reconstruction
- **Key Innovation**: Feed-forward approach to 4D scene reconstruction that jointly learns geometry and appearance representations; enables single-forward-pass 4D Gaussian prediction without per-scene optimization; generalizes across different dynamic scene categories
- **Key Results**: Feed-forward 4D reconstruction without per-scene optimization
- **Links**: [arXiv:2605.04527](https://arxiv.org/abs/2605.04527)

### RetroNVS
- **ArXiv**: [2605.12437](https://arxiv.org/abs/2605.12437)
- **Venue**: CVPR 2026
- **Core**: Retrospective dynamic scene novel view synthesis with SfM-initialized Gaussian propagation
- **Key Innovation**: Propagates Gaussians from SfM-initialized static reconstruction to dynamic frames via optical flow; standardized dynamic multi-view benchmark for dynamic NVS evaluation; addresses temporal consistency in dynamic scene reconstruction
- **Key Results**: Establishes standardized benchmark for dynamic multi-view novel view synthesis
- **Links**: [arXiv:2605.12437](https://arxiv.org/abs/2605.12437)

### AV1-3DGS
- **ArXiv**: [2605.14629](https://arxiv.org/abs/2605.14629)
- **Core**: Leverages AV1 codec motion vectors for dense feature matching in Structure-from-Motion to improve 3DGS reconstruction
- **Key Innovation**: Extracts motion vectors from AV1 video compression as dense correspondences for SfM; produces 8x denser point clouds than traditional SfM; reduces 3DGS training time by 63% while achieving 9-point VMAF quality gain
- **Key Results**: 8x denser point clouds; 9-point VMAF gain; 63% training time reduction
- **Links**: [arXiv:2605.14629](https://arxiv.org/abs/2605.14629)

### Denoising-GS
- **Paper**: Denoising-GS: Formulating 3DGS Optimization as Primitive Denoising
- **Authors**: Qingyuan Zhou et al.
- **ArXiv**: 2605.14880
- **Core**: Formulates 3DGS optimization as primitive denoising process with spatial-aware denoising framework
- **Key Innovation**: Spatial gradient-based denoising strategy + uncertainty-based denoising module + spatial coherence refinement; custom optimizer preserving spatial optimization flow; gradient-consistent updates via spatial supports; uncertainty estimation for pruning redundant primitives
- **Performance**: SOTA on 3 benchmarks with compact representation
- **Venue**: Preprint (May 2026)
- **Links**: [arXiv:2605.14880](https://arxiv.org/abs/2605.14880)

### 3DGS²
- **ArXiv**: [2501.13975](https://arxiv.org/abs/2501.13975)
- **Core**: Near second-order converging 3DGS training via per-attribute Newton systems
- **Key Innovation**: Replaces first-order SGD with per-attribute Newton-like optimization; decomposes per-Gaussian Hessian into independent per-attribute systems with sparse cross-attribute coupling; achieves near-quadratic convergence rate; 10x fewer iterations to reach same quality as standard 3DGS
- **Key Results**: 10x fewer training iterations; near second-order convergence; same final quality as vanilla 3DGS
- **Links**: [arXiv:2501.13975](https://arxiv.org/abs/2501.13975)

### AdpSplit
- **Paper**: AdpSplit: Adaptive Split Operator for Efficient 3D Gaussian Splatting Training
- **Authors**: Yongjae Lee, Jingxing Li, Abhay Kumar Yadav, Rama Chellappa, Deliang Fan
- **ArXiv**: 2605.06876
- **Core**: Error-driven adaptive split operator that determines number of split children and initializes from L1-pixel-error region statistics
- **Key Innovation**: Drop-in replacement for standard split operator; enables fewer densification iterations while preserving quality; reduces training time 9.2-22.3% across MipNeRF360, Deep-Blending, Tanks&Temples
- **Performance**: With FastGS, matches full-schedule PSNR on MipNeRF360 while 16.4% faster training (= 12.6x over vanilla 3DGS)
- **Venue**: Preprint (May 2026)
- **Links**: [arXiv:2605.06876](https://arxiv.org/abs/2605.06876)

> AI生成