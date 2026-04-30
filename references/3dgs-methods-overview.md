
# 3DGS Methods Overview

> Built-in knowledge base for Awesome Gaussian Skills. Covers 105+ 3D Gaussian Splatting variants organized by category.
> Last updated: 2026-04-30 (multi-source paper collection — 92 new papers in papers-collection.md)
> Companion file: [papers-collection.md](papers-collection.md) — 92 additional papers from CVPR/ICCV/SIGGRAPH/NeurIPS/ICLR/arXiv

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

### Mip-Splatting
- **Paper**: Mip-Splatting: Alias-free 3D Gaussian Splatting
- **Authors**: Zehao Yu, Anpei Chen, Binbin Huang, Torsten Sattler, Andreas Geiger
- **Venue**: CVPR 2024 (Best Student Paper)
- **ArXiv**: 2311.16493
- **Core**: Anti-aliased 3D Gaussian Splatting with 3D smoothing filter + 2D Mip filter
- **Key Innovation**: Integrates a 3D smoothing filter on Gaussians and a 2D Mip-level filter during rendering; eliminates blooming/erosion artifacts when zooming; significant SSIM improvement over vanilla 3DGS on Mip-NeRF 360
- **Code**: https://github.com/autonomousvision/mip-splatting

## Antialiasing

### LeanGaussian
- **Paper**: LeanGaussian: Compressing 3D Gaussian Splatting to the Minimum for Efficient Large-Scale Rendering
- **Authors**: IDEA Research Institute
- **Venue**: CVPR 2025
- **Core**: Directly models 3D Gaussians from single RGB image for novel view synthesis; extreme compression for efficient rendering
- **Key Innovation**: Breaks pixel/point cloud correspondence constraints; minimal Gaussian representation for efficient large-scale rendering

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

### SuGaR
- **Paper**: SuGaR: Surface-Aligned Gaussian Splatting for Efficient 3D Mesh Reconstruction and High-Quality Rendering
- **Authors**: Antoine Guédon, Vincent Lepetit
- **Venue**: CVPR 2024
- **ArXiv**: 2312.13253
- **Core**: Regularizes Gaussians to align with learned mesh surface
- **Key Innovation**: Joint optimization of Gaussians and mesh for high-quality extraction
- **Note**: Also listed in CAD / Mesh / Hybrid Methods (mesh extraction perspective)

### PGSR
- **Paper**: Planar-based Gaussian Splatting for High-Fidelity Surface Reconstruction
- **Authors**: Danpeng Chen, Hai Li, Weicai Ye, et al. (ZJU-3DV)
- **Venue**: TVCG 2024
- **ArXiv**: 2406.06521
- **Core**: Planar-based Gaussian Splatting for high-fidelity surface reconstruction
- **Key Innovation**: Planar regularizer constraining Gaussians to align with local tangent planes + unbiased depth rendering; produces cleaner, flatter surfaces than vanilla 3DGS; SOTA geometry metrics on DTU and Tanks and Temples

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

## Generation / Text-to-3D

### DreamGaussian
- **Paper**: DreamGaussian: Generative Gaussian Splatting for Efficient 3D Content Creation
- **Authors**: Jiaxiang Tang, Jiawei Ren, Hang Zhou, Ziwei Liu, Gang Zeng
- **Venue**: ICLR 2024 (Oral)
- **ArXiv**: 2309.16653
- **Core**: SDS-based text-to-3D generation with 3DGS prior; generates 3D assets from text prompts
- **Key Innovation**: Replaces NeRF prior in SDS with 3DGS for orders-of-magnitude faster text-to-3D; generates high-quality 3D assets in seconds; combines texture mesh extraction with Gaussian refinement
- **Code**: https://github.com/dreamgaussian/dreamgaussian

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

### SparseSplat
- **Paper**: SparseSplat: Towards Applicable Feed-Forward 3D Gaussian Splatting with Pixel-Unaligned Prediction
- **Authors**: Zicheng Zhang, Xiangting Meng, Ke Wu, Wenchao Ding (Fudan University + ShanghaiTech)
- **Venue**: CVPR 2026
- **Core**: First feed-forward 3DGS model with adaptive Gaussian density via entropy-based probabilistic sampling
- **Key Innovation**: Pixel-unaligned prediction; entropy-based sampling assigns large sparse Gaussians to textureless areas and small dense Gaussians to rich-info regions; 3D-Local Attribute Predictor addresses receptive field mismatch; achieves SOTA with only 22% of Gaussians (150K vs 688K), maintains quality at 1.5% (10K)
- **Code**: https://github.com/victkk/SparseSplat-page

### Free Geometry
- **Paper**: Free Geometry: Refining 3D Reconstruction from Longer Versions of Itself
- **Authors**: Yuhang Dai, Xingyi Yang (PolyU)
- **ArXiv**: 2604.14048
- **Core**: Enables feed-forward 3D reconstruction models (Depth Anything 3, VGGT) to self-evolve at test time without 3D GT
- **Key Innovation**: Masks subset of frames for self-supervision; enforces cross-view feature consistency between full/partial observations via LoRA updates (<2min per dataset); +3.73% camera pose accuracy, +2.88% point map prediction
- **Code**: https://github.com/hiteacherIamhumble/Free-Geometry

### IDESplat
- **Paper**: IDESplat: Iterative Depth Probability Estimation for Generalizable 3D Gaussian Splatting
- **Authors**: Zizhang Li, et al. (UESTC)
- **Venue**: CVPR 2026
- **ArXiv**: 2601.03824
- **Core**: Iterative depth probability estimation for feed-forward 3DGS with depth probability boosting unit
- **Key Innovation**: Depth Probability Boosting Unit (DPBU) uses multiple warps with epipolar attention for iterative depth refinement; Gaussian Focus Module (GFM) adaptively focuses Gaussians on high-information regions; progressively narrows depth search range while increasing feature resolution
- **Code**: https://github.com/CVL-UESTC/IDESplat

### MVSplat
- **Paper**: MVSplat: Efficient Feed-Forward 3D Gaussian Splatting from Sparse Multi-View Images
- **Authors**: Donny Y. Chen, Haofei Xu, Chuanxia Zheng, Andreas Geiger, Xingyu Chen, Shenghua Gao, Yujun Shen
- **Venue**: ECCV 2024
- **ArXiv**: 2403.14627
- **Core**: Efficient 3DGS reconstruction from sparse multi-view images via cost-volume-based Gaussian prediction
- **Key Innovation**: Cost volume encodes multi-view geometry → predicts per-view Gaussian splats → cross-view aggregation; achieves high-quality reconstruction from as few as 3 views; strong generalization across datasets
- **Code**: https://github.com/donydchen/mvsplat

### GS-LRM
- **Paper**: GS-LRM: Large Reconstruction Model for 3D Gaussian Splatting
- **Authors**: Kai Zhang, Sai Bi, Haotong Lin, Zexiang Xu, Xiaojuan Qi, Alexei A. Efros, Kun Zhou, Felix Heide
- **Venue**: ECCV 2024
- **ArXiv**: 2404.19702
- **Core**: Transformer-based large reconstruction model (1B parameters) for feed-forward 3D Gaussian Splatting
- **Key Innovation**: Large-scale transformer pretrained on massive multi-view data; predicts 3D Gaussians from arbitrary view combinations; strong zero-shot generalization to unseen scenes and object categories
- **Code**: https://github.com/sunnyuvion/GS-LRM

### DepthSplat
- **Paper**: DepthSplat: Connecting Gaussian Splatting and Depth for Feed-Forward Multi-View 3D Reconstruction
- **Authors**: Haofei Xu, Songyou Peng, Fangjinhua Wang, Monika Wulff, Daniel Barath, Torsten Sattler, Andreas Geiger
- **Venue**: CVPR 2025
- **ArXiv**: 2410.13862
- **Core**: Stereo-guided feed-forward 3DGS with depth regularization; connects Gaussian Splatting and depth estimation
- **Key Innovation**: Depth regularization bridging stereo depth estimation and 3DGS prediction; stereo-guided cross-view attention; achieves SOTA on multiple benchmarks; robust handling of uncalibrated and sparse views
- **Code**: https://github.com/yzhq97/depthsplat

### InstantSplat
- **Paper**: InstantSplat: Unbounded Sparse-view Pose-free Gaussian Splatting in 40 Seconds
- **Authors**: Zhiwen Fan, Wenqiang Sun, Peng Chen, Zetong Yang, Yuchen Fan, Zhangyang Wang
- **ArXiv**: 2403.20309
- **Core**: Unbounded sparse-view pose-free 3D Gaussian Splatting
- **Key Innovation**: No camera poses required; joint estimation of poses and 3D Gaussians from sparse views in ~40 seconds; unbounded scene support; SILC loss for geometry-aware optimization
- **Code**: https://github.com/NVlabs/InstantSplat

### AnySplat
- **Paper**: AnySplat: Feed-forward 3D Gaussian Splatting from Unconstrained In-the-Wild Views
- **Authors**: Lihan Jiang, Xiaoyang Lyu, et al. (SenseTime / CUHK)
- **Venue**: SIGGRAPH 2025
- **ArXiv**: 2505.23716
- **Core**: Feed-forward 3DGS from unconstrained/in-the-wild views with appearance and lighting variations
- **Key Innovation**: Handles arbitrary in-the-wild images with unknown lighting, varying appearance, and unknown camera parameters; robust feed-forward reconstruction without per-scene optimization

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
- **Code**: https://github.com/yihangchen-ee/HAC

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

### NanoGS
- **Paper**: NanoGS: Training-Free Gaussian Splat Simplification
- **Authors**: Butian Xiong, Rong Liu, Tiantian Zhou, Meida Chen, Zhiwen Fan, Andrew Feng
- **ArXiv**: 2603.16103
- **Core**: Training-free, lightweight Gaussian Splat simplification via local pairwise merging on sparse spatial graph
- **Key Innovation**: Mass-preserving moment matching for Gaussian merge; principled merge cost between original mixture and approximation; runs efficiently on CPU; preserves standard 3DGS parameterization for seamless pipeline integration
- **Code**: https://github.com/saliteta/NanoGS

### MesonGS++
- **Paper**: MesonGS++: Post-training Compression of 3D Gaussian Splatting with Hyperparameter Searching
- **Authors**: Shuzhao Xie, Junchen Ge, Weixiang Zhang, et al. (Tsinghua / NTU Singapore)
- **ArXiv**: 2604.26799
- **Venue**: Under review
- **Core**: Size-aware post-training codec for 3DGS compression with automatic hyperparameter search under target storage budget
- **Key Innovation**: Joint importance-based pruning + octree geometry coding + attribute transformation + selective vector quantization + group-wise mixed-precision quantization; treats reserve ratio and bit-width as rate-distortion knobs optimized via 0-1 integer linear programming; linear size estimator + CUDA parallel quantization for fast search; 34x compression while preserving fidelity
- **Code**: https://github.com/mmlab-sigs/mesongs_plus

## Dynamic Scene Methods

### 4D Gaussian Splatting (4DGS)
- **Paper**: 4D Gaussian Splatting for Real-Time Dynamic Scene Rendering
- **Authors**: Guanjun Wu, Taoran Yi, Jiemin Fang, Lingxi Xie, Xiaopeng Zhang, Wenyu Liu, Qi Tian, Xinggang Wang
- **Venue**: CVPR 2024
- **ArXiv**: 2310.08528
- **Core**: 4D anisotropic Gaussians (3D + time) with regularized deformation for real-time dynamic scene rendering
- **Key Innovation**: Extends standard 3DGS to 4D space-time domain; regularized deformation ensures temporal consistency; real-time rendering of dynamic scenes; handles complex non-rigid motions
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

## Language / Semantic

### LangSplat
- **Paper**: LangSplat: 3D Language Gaussian Splatting
- **Authors**: Minghan Qin, Wanhua Li, Jiawei Zhou, Haoqian Wang, Hanspeter Pfister
- **Venue**: CVPR 2024
- **ArXiv**: 2312.16084
- **Core**: 3D language Gaussian Splatting with CLIP features stored per-Gaussian for open-vocabulary 3D queries
- **Key Innovation**: Distills 2D CLIP features into 3D Gaussian attributes via semantic Gaussians with distinct feature/opacity; enables open-vocabulary 3D semantic queries without per-scene training; precise 3D bounding box extraction from language prompts
- **Code**: https://github.com/minghanqin/LangSplat

### Feature 3DGS
- **Paper**: Feature 3DGS: Supercharging 3D Gaussian Splatting with Distilled Feature Fields
- **Authors**: Shijie Zhou, et al.
- **Venue**: CVPR 2024
- **ArXiv**: 2312.03203
- **Core**: Supercharges 3DGS with distilled feature fields for downstream tasks
- **Key Innovation**: Distills 2D foundation model features (e.g., DINO, SAM) into 3D feature fields attached to Gaussians; enables high-quality 3D segmentation, detection, and semantic understanding without per-scene fine-tuning
- **Code**: https://github.com/D Charles2/feature-3dgs

### Semantic Foam
- **Paper**: Semantic Foam: Unifying Spatial and Semantic Scene Decomposition
- **Authors**: Amr Sharafeldin, Shrisudhan Govindarajan, Thomas Walker, Aryan Mikaeili, Daniel Rebain, Kwang Moo Yi, Andrea Tagliasacchi
- **ArXiv**: 2604.26262
- **Venue**: CVPR 2026 (Highlight)
- **Core**: Extends Radiant Foam (volumetric Voronoi mesh) to semantic decomposition tasks with explicit semantic feature field at cell level
- **Key Innovation**: Leverages volumetric Voronoi mesh structure for direct spatial regularization, improving cross-view semantic consistency; outperforms Gaussian Grouping and SAGA on object-level segmentation; addresses occlusion/inconsistent supervision artifacts common in point-based representations
- **Code**: http://semanticfoam.github.io/

## Image Representation

### GaussianImage
- **Paper**: GaussianImage: 1000 FPS Image Representation and Compression by 2D Gaussian Splatting
- **Authors**: Xinjie Zhang, et al.
- **Venue**: ECCV 2024
- **ArXiv**: 2403.08551
- **Core**: Represents and compresses images using 2D Gaussian Splatting at 1000+ FPS
- **Key Innovation**: Uses 2D Gaussian primitives to represent images; achieves extreme compression ratios; enables 1000+ FPS decoding/rendering; novel image codec with competitive rate-distortion performance

## Few-Shot / Sparse-View

### FSGS
- **Paper**: FSGS: Real-Time Few-Shot View Synthesis using Gaussian Splatting
- **Authors**: Zehao Zhu, Zhiwen Fan, Yifan Jiang, Zhangyang Wang
- **Venue**: ECCV 2024
- **ArXiv**: 2312.00451
- **Core**: Real-time few-shot view synthesis combining SRF (Spatial Radiance Fields) with 3DGS
- **Key Innovation**: Pre-trained SRF provides geometric prior from sparse views, 3DGS handles fine detail; generalizes to novel scenes without per-scene optimization; high-quality novel view synthesis from as few as 3 input views
- **Code**: https://github.com/VITA-Group/FSGS

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

### Street Gaussians
- **Paper**: Street Gaussians: Modeling Dynamic Urban Scenes with Gaussian Splatting
- **Authors**: Yunzhi Yan, Haotong Lin, Chenxu Zhou, Shaohui Jiao, Xiaojuan Qi, Xiaogang Jin
- **Venue**: ECCV 2024
- **ArXiv**: 2401.01339
- **Core**: Modeling dynamic urban street scenes with Gaussian Splatting via static/dynamic decomposition
- **Key Innovation**: Static/dynamic decomposition for street scenes; separate Gaussian representations for static background and dynamic objects (cars, pedestrians); real-time rendering of complex urban driving scenarios; handles large-scale driving sequences
- **Code**: https://github.com/hbb1/Street-Gaussians

## In-the-Wild / Robust

### WildGaussians
- **Paper**: WildGaussians: 3D Gaussian Splatting in the Wild
- **Authors**: Jonas Kulhanek, Songyou Peng, Zuzana Kukelova, Marc Pollefeys, Torsten Sattler
- **Venue**: NeurIPS 2024
- **ArXiv**: 2407.08447
- **Core**: 3DGS with unknown camera poses from internet photos; joint pose and 3DGS optimization
- **Key Innovation**: Robust initialization from COLMAP point clouds + incremental pose refinement; handles in-the-wild image collections with varying lighting, transient objects, and occlusion; first robust 3DGS pipeline for unconstrained internet photo collections

## Optimization

### 3DGS as MCMC
- **Paper**: 3D Gaussian Splatting as Markov Chain Monte Carlo
- **Authors**: Shakiba Kheradmand, et al.
- **Venue**: NeurIPS 2024
- **ArXiv**: 2404.09591
- **Core**: Formulates 3DGS optimization as Markov Chain Monte Carlo sampling
- **Key Innovation**: Reframes Gaussian density control (clone/split/prune) as MCMC sampling moves; provides principled probabilistic foundation for 3DGS optimization; addresses local minima problem; Bayesian perspective on Gaussian placement and parameter estimation

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

### GaussianShader
- **Paper**: GaussianShader: 3D Gaussian Splatting with Shading Functions for Reflective Surfaces
- **Authors**: Yingwenqi Jiang, et al.
- **Venue**: ArXiv 2023
- **ArXiv**: 2311.17977
- **Core**: 3DGS with shading functions for reflective surface rendering
- **Key Innovation**: Decomposes appearance into shading components (diffuse, specular, ambient) stored per-Gaussian; enables realistic rendering of reflective/refractive surfaces; overcomes vanilla 3DGS limitations on glossy and metallic materials

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

### EnerGS
- **Paper**: EnerGS: Energy-Based Gaussian Splatting with Partial Geometric Priors
- **Authors**: Rui Song, Tianhui Cai, Markus Gross, Yun Zhang, et al.
- **ArXiv**: 2604.26238
- **Venue**: Under review
- **Core**: Models partially observable geometry as continuous energy field for soft geometric guidance in 3DGS optimization
- **Key Innovation**: Instead of hard geometric constraints, provides soft energy-based guidance from LiDAR/depth priors; allows geometry to steer optimization without restricting solution space; mitigates overfitting in large-scale outdoor scenes with incomplete geometric supervision

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

## SLAM

### Gaussian Splatting SLAM
- **Paper**: Gaussian Splatting SLAM
- **Authors**: Hidenobu Matsuki, Riku Murai, Paul H.J. Kelly, Andrew J. Davison (Imperial College)
- **Venue**: CVPR 2024 (Highlight)
- **ArXiv**: 2312.06741
- **Core**: First real-time monocular 3DGS SLAM system
- **Key Innovation**: Joint optimization of camera poses and 3D Gaussian map via differentiable rendering; replaces implicit map representation in traditional SLAM with explicit 3DGS; real-time performance with high-quality rendering
- **Code**: https://github.com/muskie82/MonoGS

### CGS-SLAM
- **Paper**: CGS-SLAM: Compact Gaussian Splatting SLAM
- **Authors**: Tianchen Deng, et al.
- **Venue**: IROS 2025
- **Core**: Compact 3DGS for dense visual SLAM with voxel-based representation
- **Key Innovation**: Voxel-based compact representation for efficient memory usage in SLAM; balances reconstruction quality with computational efficiency for real-time dense mapping

### WildGS-SLAM
- **Paper**: WildGS-SLAM: Monocular 3D Gaussian Splatting SLAM in Dynamic Environments
- **Authors**: Jianhao Zheng, et al. (Stanford / ETH)
- **Venue**: CVPR 2025
- **ArXiv**: 2504.03886
- **Core**: Monocular 3DGS SLAM designed for dynamic environments
- **Key Innovation**: Uncertainty-aware geometric mapping via pretrained 3D priors; robust to dynamic objects in real-world environments; handles moving objects without explicit segmentation
- **Code**: https://github.com/JokerJohn/WildGS-SLAM

### S3PO-GS
- **Paper**: S3PO-GS: Scale-Consistent 3DGS for Outdoor SLAM
- **Authors**: HKUST(GZ)
- **Venue**: ICCV 2025
- **Core**: Outdoor RGB-only SLAM with global scale consistency for monocular 3DGS
- **Key Innovation**: First global scale consistency for monocular outdoor 3DGS SLAM; eliminates metric scale drift in outdoor environments; scale-consistent pose optimization

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
- **Note**: Also relevant to Active Vision category

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

## Real-Time View Synthesis (Non-GS but Related)

### 3DTV
- **Paper**: 3DTV: A Feedforward Interpolation Network for Real-Time View Synthesis
- **Authors**: Stefan Schulz, Fernando Edelstein, Hannah Dröge, Matthias B. Hullin, Markus Plack (University of Bonn)
- **ArXiv**: 2604.11211
- **Core**: Feedforward sparse-view interpolation network for real-time free-viewpoint rendering from only 3 cameras
- **Key Innovation**: Delaunay-based triplet selection for angular coverage; pose-aware depth module with coarse-to-fine 7-layer depth pyramid; occlusion-aware blending; 25ms per frame at 40 FPS; no scene-specific retraining needed
- **Application**: Live streaming, esports broadcasting, telepresence, AR/VR
- **Code**: https://stefanmschulz.github.io/3DTV_webpage/

## Data Acquisition & Capture Guidance

### Mobile Phone 3DGS Acquisition (Object-Centered)
- **Paper**: An Object-Centered Data Acquisition Method for 3D Gaussian Splatting using Mobile Phones
- **Authors**: Yuezhe Zhang, Luqian Bai, Mengting Yu, Lei Wei, Shuai Wan, Yifan Zhang
- **ArXiv**: 2604.19216
- **Core**: On-device capture guidance for mobile 3DGS acquisition with real-time spherical coverage feedback
- **Key Innovation**: Maps camera optical axis to object-centered spherical grid; area-weighted spherical coverage for uniform viewpoints; superior to RealityScan and free-capture with fewer images

## Cross-Domain Applications

### GS-DOT
- **Paper**: GS-DOT: Gaussian Splatting-based Image Reconstruction for Diffuse Optical Tomography
- **Authors**: Jingjing Jiang
- **ArXiv**: 2604.23675
- **Core**: First adaptation of GS algorithms in photon diffusion regime for medical imaging (DOT)
- **Key Innovation**: Replaces ray transport with diffusion functions; absorption coefficients as sparse anisotropic Gaussian primitives; high noise robustness; huge memory reduction vs traditional DOT methods

### Habitat-GS
- **Paper**: Habitat-GS (reported by Zhejiang University, Apr 2026)
- **Core**: Upgrades Habitat-Sim simulator with 3DGS rendering for high-fidelity robot navigation training
- **Key Innovation**: Replaces mesh-based rendering with 3DGS for photorealistic simulation; introduces interactive virtual human agents for crowd navigation training

### BiSplat-WRF
- **Paper**: Planar Gaussian Splatting with Bilinear Spatial Transformer for Wireless Radiance Field Reconstruction
- **Authors**: Jinghan Zhang, Xitao Gong, Qi Wang, Richard A. Stirling-Gallacher, Giuseppe Caire
- **ArXiv**: 2604.25945
- **Venue**: IEEE ICC 2026 Workshop
- **Core**: Adapts Gaussian Splatting to wireless radiance field (WRF) reconstruction for spatial power spectrum prediction
- **Key Innovation**: Planar 2D Gaussians with 3D coordinates rendered directly on angular domain; bilinear spatial transformer (BST) captures long-range electromagnetic dependencies; surpasses NeRF-based and prior GS-based baselines on SSIM

## Egocentric & Benchmark Methods

### Egocentric Dynamic 3DGS Evaluation
- **Paper**: Bringing a Personal Point of View: Evaluating Dynamic 3D Gaussian Splatting for Egocentric Scene Reconstruction
- **Authors**: Jan Warchocki, Xi Wang, Jonas Kulhanek, Jan van Gemert
- **Venue**: EgoVis Workshop @ CVPR 2026
- **ArXiv**: 2604.23803
- **Core**: First systematic evaluation of dynamic monocular 3DGS models on egocentric video (EgoExo4D)
- **Key Innovation**: Finds reconstruction quality consistently lower in egocentric views; gap stems from static content reconstruction (not dynamic); motivates egocentric-specific 3DGS approaches

## Performance Comparison Reference

| Method | Mip-NeRF 360 PSNR | Speed (FPS) | Memory | Primitive |
|--------|-------------------|-------------|--------|-----------|
| 3DGS (original) | 25.2 | 100+ | ~1.5 GB | 3D anisotropic |
| Mip-Splatting | ~25.3 (↑ SSIM) | 60-80 | ~1.5 GB | 3D anisotropic + Mip filter |
| 2DGS | ~25.0 | 80+ | ~1.2 GB | 2D disk |
| PGSR | ↑ geometry | ~80 | ~1.8 GB | Planar-based 3DGS |
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
| OT-UVGS | ↑ vs UVGS | Same as UVGS | UV tensor | UV-mapped |
| WildSplatter | N/A (wild) | <1s (feed-forward) | N/A | Appearance-conditioned |
| Gaussians on a Diet | ~24.5 | Same as 3DGS | 80% less peak | Memory-bounded |
| DualSplat | ↑ vs baseline | Same as 3DGS | Same | Failure-to-Prior |
| MERID-GS | ↑ (low-light) | Same as 3DGS | Same | Retinex-decoupled |
| GS-Playground | N/A (sim) | 10^4 FPS | N/A | Batch 3DGS |
| SparseSplat | ~24.2 (DL3DV) | ~13* | ~150K Gaussians | Adaptive density feed-forward |
| NanoGS | Same as input 3DGS | CPU-only | Reduced count | Training-free merge |
| 3DTV | N/A (3-cam) | 40 FPS | N/A | Feedforward depth pyramid |
| Free Geometry | ↑ vs baseline (DA3/VGGT) | +LoRA (<2min) | Same | Self-supervised refinement |
| IDESplat | ~25.5* (RealEstate10K) | Single-pass | N/A | Iterative depth feed-forward |
| MesonGS++ | ~24.5 (34x compressed) | Faster after decode | ~15 MB (34x) | Post-training codec |
| Semantic Foam | N/A (segmentation) | N/A | Voronoi mesh | Semantic decomposition |
| EnerGS | ↑ (outdoor w/ LiDAR) | Same as 3DGS | Same | Energy-based priors |
| BiSplat-WRF | ↑ vs NeRF-WRF | N/A (WRF) | N/A | Planar GS (wireless) |

> *Methods marked with asterisk are evaluated on RealEstate10K/ACID or other benchmarks (not Mip-NeRF 360)
> Numbers are approximate and may vary across implementations and hardware.
