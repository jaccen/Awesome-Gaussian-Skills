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

## Generation / Text-to-3D

### DreamGaussian
- **Paper**: DreamGaussian: Generative Gaussian Splatting for Efficient 3D Content Creation
- **Authors**: Jiaxiang Tang, Jiawei Ren, Hang Zhou, Ziwei Liu, Gang Zeng
- **Venue**: ICLR 2024 (Oral)
- **ArXiv**: 2309.16653
- **Core**: SDS-based text-to-3D generation with 3DGS prior; generates 3D assets from text prompts
- **Key Innovation**: Replaces NeRF prior in SDS with 3DGS for orders-of-magnitude faster text-to-3D; generates high-quality 3D assets in seconds; combines texture mesh extraction with Gaussian refinement
- **Links**: [中英摘要](https://arxiv.org/abs/2309.16653) | [arXiv:2309.16653](https://arxiv.org/abs/2309.16653) | [Code](https://github.com/dreamgaussian/dreamgaussian)

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
