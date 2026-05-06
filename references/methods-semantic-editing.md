# Semantic, Editing, Material & Avatar Methods

> Methods covering language/semantic understanding, image representation, editing, material/lighting, and human avatars.
> Companion file: [3dgs-methods-overview.md](3dgs-methods-overview.md) (index) | [methods-core.md](methods-core.md) | [methods-systems-apps.md](methods-systems-apps.md)

## Language / Semantic

### LangSplat
- **Paper**: LangSplat: 3D Language Gaussian Splatting
- **Authors**: Minghan Qin, Wanhua Li, Jiawei Zhou, Haoqian Wang, Hanspeter Pfister
- **Venue**: CVPR 2024
- **ArXiv**: 2312.16084
- **Core**: 3D language Gaussian Splatting with CLIP features stored per-Gaussian for open-vocabulary 3D queries
- **Key Innovation**: Distills 2D CLIP features into 3D Gaussian attributes via semantic Gaussians with distinct feature/opacity; enables open-vocabulary 3D semantic queries without per-scene training; precise 3D bounding box extraction from language prompts
- **Links**: [中英摘要](https://arxiv.org/abs/2312.16084) | [arXiv:2312.16084](https://arxiv.org/abs/2312.16084) | [Code](https://github.com/minghanqin/LangSplat)

### Feature 3DGS
- **Paper**: Feature 3DGS: Supercharging 3D Gaussian Splatting with Distilled Feature Fields
- **Authors**: Shijie Zhou, et al.
- **Venue**: CVPR 2024
- **ArXiv**: 2312.03203
- **Core**: Supercharges 3DGS with distilled feature fields for downstream tasks
- **Key Innovation**: Distills 2D foundation model features (e.g., DINO, SAM) into 3D feature fields attached to Gaussians; enables high-quality 3D segmentation, detection, and semantic understanding without per-scene fine-tuning
- **Links**: [中英摘要](https://arxiv.org/abs/2312.03203) | [arXiv:2312.03203](https://arxiv.org/abs/2312.03203) | [Code](https://github.com/D%20Charles2/feature-3dgs)

### Semantic Foam
- **Paper**: Semantic Foam: Unifying Spatial and Semantic Scene Decomposition
- **Authors**: Amr Sharafeldin, Shrisudhan Govindarajan, Thomas Walker, Aryan Mikaeili, Daniel Rebain, Kwang Moo Yi, Andrea Tagliasacchi
- **ArXiv**: 2604.26262
- **Venue**: CVPR 2026 (Highlight)
- **Core**: Extends Radiant Foam (volumetric Voronoi mesh) to semantic decomposition tasks with explicit semantic feature field at cell level
- **Key Innovation**: Leverages volumetric Voronoi mesh structure for direct spatial regularization, improving cross-view semantic consistency; outperforms Gaussian Grouping and SAGA on object-level segmentation; addresses occlusion/inconsistent supervision artifacts common in point-based representations
- **Links**: [中英摘要](https://arxiv.org/abs/2604.26262) | [arXiv:2604.26262](https://arxiv.org/abs/2604.26262) | [Code](http://semanticfoam.github.io/)

### GLMap
- **Paper**: Multi-Scale Gaussian-Language Map for Zero-shot Embodied Navigation and Reasoning
- **Authors**: Sixian Zhang, Yiyao Wang, Xinhang Song, Keming Zhang, Zijian Xu, Shuqiang Jiang
- **Venue**: CVPR 2026
- **ArXiv**: 2605.01736
- **Core**: Multi-scale Gaussian-Language Map combining explicit geometry, multi-scale semantics (instance + region), and dual-modality interface
- **Key Innovation**: Each semantic unit jointly stores natural language description and 3D Gaussian representation; enables fast rendering of task-relevant images via Gaussian splatting; Gaussian Estimator analytically derives Gaussian parameters from dense point clouds without gradient optimization; zero-shot compatible with large-model methods
- **Links**: [中英摘要](https://arxiv.org/abs/2605.01736) | [arXiv:2605.01736](https://arxiv.org/abs/2605.01736) | [Code](https://github.com/sx-zhang/GLMap)

### NG-GS
- **Paper**: NG-GS: NeRF-Guided 3D Gaussian Splatting Segmentation
- **ArXiv**: 2604.14706
- **Core**: NeRF-guided segmentation for 3DGS
- **Key Innovation**: Leverages NeRF's continuous representation to guide Gaussian-level semantic assignment
- **Links**: [中英摘要](https://arxiv.org/abs/2604.14706) | [arXiv:2604.14706](https://arxiv.org/abs/2604.14706) | [Code]

## Image Representation

### GaussianImage
- **Paper**: GaussianImage: 1000 FPS Image Representation and Compression by 2D Gaussian Splatting
- **Authors**: Xinjie Zhang, et al.
- **Venue**: ECCV 2024
- **ArXiv**: 2403.08551
- **Core**: Represents and compresses images using 2D Gaussian Splatting at 1000+ FPS
- **Key Innovation**: Uses 2D Gaussian primitives to represent images; achieves extreme compression ratios; enables 1000+ FPS decoding/rendering; novel image codec with competitive rate-distortion performance
- **Links**: [中英摘要](https://arxiv.org/abs/2403.08551) | [arXiv:2403.08551](https://arxiv.org/abs/2403.08551) | [Code]

## Few-Shot / Sparse-View

### Pi-GS
- **Paper**: Pi-GS: Sparse-View Gaussian Splatting with Dense π³ Initialization
- **Authors**: Manuel Hofer, Markus Steinberger, Thomas Köhler
- **ArXiv**: 2602.03327
- **Core**: Robust sparse-view 3DGS using reference-free π³ point cloud estimation
- **Key Innovation**: Dense π³ initialization + uncertainty-guided depth supervision + normal consistency loss; SOTA on Tanks and Temples, LLFF, DTU, MipNeRF360
- **Links**: [中英摘要](https://arxiv.org/abs/2602.03327) | [arXiv:2602.03327](https://arxiv.org/abs/2602.03327) | [Code]


### FSGS
- **Paper**: FSGS: Real-Time Few-Shot View Synthesis using Gaussian Splatting
- **Authors**: Zehao Zhu, Zhiwen Fan, Yifan Jiang, Zhangyang Wang
- **Venue**: ECCV 2024
- **ArXiv**: 2312.00451
- **Core**: Real-time few-shot view synthesis combining SRF (Spatial Radiance Fields) with 3DGS
- **Key Innovation**: Pre-trained SRF provides geometric prior from sparse views, 3DGS handles fine detail; generalizes to novel scenes without per-scene optimization
- **Links**: [中英摘要](https://arxiv.org/abs/2312.00451) | [arXiv:2312.00451](https://arxiv.org/abs/2312.00451) | [Code](https://github.com/VITA-Group/FSGS)

### HeroGS
- **Paper**: HeroGS: Hierarchical Guidance for Robust 3D Gaussian Splatting under Sparse Views
- **Authors**: Jiashu Li (CAS/UCAS Vision Group)
- **Venue**: CVPR 2026
- **Core**: Fusion framework addressing overfitting in sparse-view 3DGS via hierarchical guidance from image-level to pixel-level
- **Key Innovation**: Multi-scale hierarchical guidance (image to region to pixel) progressively refines 3DGS with limited supervision

### GSCompleter
- **Paper**: GSCompleter: A Distillation-Free Plugin for Metric-Aware 3D Gaussian Splatting Completion in Seconds
- **Authors**: Ao Gao, Jingyu Gong, Xin Tan, Zhizhong Zhang, Yuan Xie
- **ArXiv**: 2604.20155
- **Core**: Distillation-free plugin for sparse-view 3DGS completion using Generate-then-Register workflow
- **Key Innovation**: Stereo-Anchor mechanism lifts synthesized 2D references into metric-scale 3D primitives; Ray-Constrained Registration integrates into global context
- **Links**: [中英摘要](https://arxiv.org/abs/2604.20155) | [arXiv:2604.20155](https://arxiv.org/abs/2604.20155) | [Code]

## Large-Scale Methods

### Scaffold-GS
- **Paper**: Scaffold-GS: Structured 3D Gaussians for View-Adaptive Rendering
- **Authors**: Zhiqi Li, Xin Huang, Zihan Zhu, Yangtian Sun, Xiaoyang Lyu, Xiaogang Jin
- **Venue**: ICCV 2023
- **ArXiv**: 2312.13209
- **Core**: Anchor-based structure for efficient large-scale scene representation
- **Key Innovation**: Anchor points + local Gaussian selection, progressive training
- **Links**: [中英摘要](https://arxiv.org/abs/2312.13209) | [arXiv:2312.13209](https://arxiv.org/abs/2312.13209) | [Code]

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
- **Links**: [中英摘要](https://arxiv.org/abs/2401.02379) | [arXiv:2401.02379](https://arxiv.org/abs/2401.02379) | [Code]

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
- **Links**: [中英摘要](https://arxiv.org/abs/2401.01339) | [arXiv:2401.01339](https://arxiv.org/abs/2401.01339) | [Code](https://github.com/hbb1/Street-Gaussians)

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
- **Links**: [中英摘要](https://arxiv.org/abs/2604.19202) | [arXiv:2604.19202](https://arxiv.org/abs/2604.19202) | [Code](https://github.com/gogoneural/SketchFaceGS_jittor)

### FluSplat
- **Paper**: FluSplat: Sparse-View 3D Editing without Test-Time Optimization
- **Authors**: Haitao Huang, Shin-Fang Chng, Huangying Zhan, Qingan Yan, Yi Xu
- **ArXiv**: 2604.20038
- **Core**: Feed-forward 3D scene editing from sparse views without per-scene optimization
- **Key Innovation**: Cross-view regularization in image domain during training + feedforward 3DGS lifting; orders of magnitude faster than optimization-based editing
- **Links**: [中英摘要](https://arxiv.org/abs/2604.20038) | [arXiv:2604.20038](https://arxiv.org/abs/2604.20038) | [Code]

### TransSplat
- **Paper**: TransSplat: Unbalanced Semantic Transport for Language-Driven 3DGS Editing
- **Authors**: Yanhui Chen, Jiahong Li, Jingchao Wang, Junyi Lin, Zixin Zeng, Yang Shi
- **ArXiv**: 2604.19571
- **Core**: Language-driven 3DGS editing formulated as multi-view unbalanced semantic transport problem
- **Key Innovation**: Establishes semantic correspondences between edited 2D evidence and 3D Gaussians; transport residuals suppress edit leakage in non-target regions
- **Links**: [中英摘要](https://arxiv.org/abs/2604.19571) | [arXiv:2604.19571](https://arxiv.org/abs/2604.19571) | [Code]

### GOR-IS
- **Paper**: GOR-IS: 3D Gaussian Object Removal in the Intrinsic Space
- **Authors**: Yonghao Zhao, Yupeng Gao, Jian Yang, Jin Xie, Beibei Wang
- **ArXiv**: 2605.00498
- **Core**: Physically consistent 3D object removal via intrinsic decomposition (material + lighting)
- **Key Innovation**: Decomposes scene into intrinsic components; explicitly models light transport for global lighting consistency; intrinsic-space inpainting module operates in material and lighting domains; handles view-dependent non-Lambertian surfaces; +13% LPIPS and +2dB PSNR over existing methods
- **Links**: [中英摘要](https://arxiv.org/abs/2605.00498) | [arXiv:2605.00498](https://arxiv.org/abs/2605.00498) | [Code](https://applezyh.github.io/GOR-IS-project-page/)

### SVGS
- **Paper**: SVGS: Single-View to 3D Object Editing via Gaussian Splatting
- **Authors**: Pengcheng Xue, Yan Tian, Qiutao Song, Ziyi Wang, Linyang He, Weiping Ding, Mahmoud Hassaballah, Karen Egiazarian, Wei-Fa Yang, Leszek Rutkowski
- **ArXiv**: 2603.28126
- **Core**: Single-view text-driven 3D object editing using sparse 3DGS
- **Key Innovation**: Single-view editing strategy with multi-view diffusion models; reconstructs 3D from only consistent views; sparse 3DGS for efficiency
- **Links**: [中英摘要](https://arxiv.org/abs/2603.28126) | [arXiv:2603.28126](https://arxiv.org/abs/2603.28126) | [Code](https://amateurc.github.io/svgs.github.io)

### DiffSoup
- **Paper**: DiffSoup: Direct Differentiable Rasterization of Triangle Soup for Extreme Radiance Field Simplification
- **Authors**: Kenji Tojo, Bernd Bickel, Nobuyuki Umetani
- **ArXiv**: 2603.27151
- **Core**: Triangle soup with neural textures + binary opacity as extreme simplification of radiance fields
- **Key Innovation**: Stochastic opacity masking for differentiability; standard depth testing; orders-of-magnitude simplification; runs on consumer hardware
- **Links**: [中英摘要](https://arxiv.org/abs/2603.27151) | [arXiv:2603.27151](https://arxiv.org/abs/2603.27151) | [Code](https://github.com/kenji-tojo/diffsoup)

### FTSplat
- **Paper**: FTSplat: Feed-forward Triangle Splatting Network
- **Authors**: Xiong Jinlin, Li Can, Shen Jiawei, Qi Zhigang, Sun Lei, Zhao Dongyang
- **ArXiv**: 2603.05932
- **Core**: Feed-forward triangle primitive generation from multi-view images
- **Key Innovation**: Produces simulation-ready models in single forward pass; no per-scene optimization; compatible with standard graphics/robotic simulators
- **Links**: [中英摘要](https://arxiv.org/abs/2603.05932) | [arXiv:2603.05932](https://arxiv.org/abs/2603.05932) | [Code]

### IRIS
- **Paper**: IRIS: Intersection-aware Ray-based Implicit Editable Scenes
- **Authors**: Grzegorz Wilczyński, Mikołaj Zieliński, Krzysztof Byrski, Joanna Waczyńska, Dominik Belter, Przemysław Spurek
- **ArXiv**: 2603.15368
- **Core**: Hybrid Gaussians-as-proxies for neural field evaluation with analytical ray-primitive intersection
- **Key Innovation**: Eliminates empty space via analytical sampling; continuous feature aggregation along ray; real-time rendering + flexible shape editing
- **Links**: [中英摘要](https://arxiv.org/abs/2603.15368) | [arXiv:2603.15368](https://arxiv.org/abs/2603.15368) | [Code](https://github.com/gwilczynski95/iris)

> **Note**: DiffSoup, FTSplat, and IRIS use non-Gaussian primitives (triangle soup, hybrid proxy) but are listed here due to their relevance to 3DGS editing workflows and the trend toward alternative primitives.

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
- **Links**: [中英摘要](https://arxiv.org/abs/2311.17977) | [arXiv:2311.17977](https://arxiv.org/abs/2311.17977) | [Code]

### Instant Colorization
- **Paper**: Instant Colorization of Gaussian Splats
- **Authors**: Daniel Lieber, Alexander Mock, Nils Wandel
- **ArXiv**: 2604.17155
- **Core**: Maps 2D image information (color, features, segmentation masks) back onto existing Gaussian splat scenes
- **Key Innovation**: Normal-equation-based visibility-weighted least squares for per-Gaussian colorization; up to 10x faster than gradient descent baselines
- **Application**: Scene relighting, feature enrichment, 3D semantic segmentation
- **Links**: [中英摘要](https://arxiv.org/abs/2604.17155) | [arXiv:2604.17155](https://arxiv.org/abs/2604.17155) | [Code]


### VIRGi
- **Paper**: VIRGi: View-dependent Instant Recoloring of 3D Gaussians Splats
- **Authors**: Alessio Mazzucchelli, Ivan Ojeda-Martin, Fernando Rivas-Manzaneque, Elena Garces, Adrian Penate-Sanchez, Francesc Moreno-Noguer
- **Venue**: IEEE TPAMI 2026
- **ArXiv**: 2603.02986
- **Core**: Rapid recoloring of 3DGS scenes while preserving view-dependent effects
- **Key Innovation**: Separates color into diffuse and view-dependent components; only one manually edited image needed; fine-tunes single MLP in two seconds; control over view-dependent effect strength
- **Links**: [中英摘要](https://arxiv.org/abs/2603.02986) | [arXiv:2603.02986](https://arxiv.org/abs/2603.02986) | [Code]

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
- **Links**: [中英摘要](https://arxiv.org/abs/2604.25466) | [arXiv:2604.25466](https://arxiv.org/abs/2604.25466) | [Code]

### High-Fidelity Human GS (Region-Aware)
- **Paper**: High-Fidelity 3D Gaussian Human Reconstruction via Region-Aware Initialization and Geometric Priors
- **Authors**: Yang Liu, Zhiyong Zhang
- **ArXiv**: 2604.21714
- **Core**: Region-aware initialization + SMPL-X geometric priors for dynamic human reconstruction
- **Key Innovation**: SMPL-X initializes Gaussians and skinning weights; region-aware density init + geometry-aware multi-scale hash encoding for local detail recovery
- **Links**: [中英摘要](https://arxiv.org/abs/2604.21714) | [arXiv:2604.21714](https://arxiv.org/abs/2604.21714) | [Code]

### HumanSplatHMR
- **Paper**: HumanSplatHMR: Closing the Loop Between Human Mesh Recovery and Gaussian Splatting Avatar
- **Authors**: Yeheng Zong, Pou-Chun Kung, Yike Pan, Seth Isaacson, Yizhou Chen, Ram Vasudevan, Katherine A. Skinner
- **ArXiv**: 2605.02784
- **Core**: Joint optimization framework that refines 3D human poses while simultaneously learning high-fidelity Gaussian avatar
- **Key Innovation**: Closes the loop between geometric pose estimation and differentiable rendering; backpropagates photometric, segmentation, and depth losses through differentiable renderer to pose parameters and global position; uses only human mesh estimates from HMR (no motion capture needed); consistent improvements over pose recovery baselines and avatar baselines that decouple pose from reconstruction
- **Links**: [中英摘要](https://arxiv.org/abs/2605.02784) | [arXiv:2605.02784](https://arxiv.org/abs/2605.02784) | [Code]

### D-Rex
- **Paper**: D-Rex: Diffusion Rendering for Relightable Expressive Avatars
- **Authors**: Timo Teufel, Xilong Zhou, Umar Iqbal, Jan Kautz, Marc Habermann, Vladislav Golyanik, Christian Theobalt (MPI Informatics / SAIF / NVIDIA)
- **Venue**: SIGGRAPH 2026
- **ArXiv**: 2604.27871
- **Core**: Person-specific relightable, expressive, and animatable full-body human avatar framework
- **Key Innovation**: Decouples relighting entirely from avatar modeling by treating it as image-space post-process; leverages pre-trained video diffusion relighting model fine-tuned via LoRA on paired flat-lit and relit frames from light stage; flat-lit driving frames from independent expressive avatar framework; directly applicable to any white-light avatar system; enables view- and temporally consistent relighting while preserving expressive motion and fine-grained facial detail
- **Note**: Bridges Human & Avatar and Material & Relighting categories; first method demonstrating strong facial animation alongside relighting
- **Links**: [中英摘要](https://arxiv.org/abs/2604.27871) | [arXiv:2604.27871](https://arxiv.org/abs/2604.27871) | [Code]

### ProgressiveAvatars
- **Paper**: ProgressiveAvatars: Progressive Animatable 3D Gaussian Avatars
- **Authors**: Juyong Zhang group
- **Affiliations**: USTC
- **Venue**: SIGGRAPH 2026 Journal Track (ACM TOG)
- **Core**: Progressive animatable 3D Gaussian avatar generation
- **Key Innovation**: Coarse-to-fine progressive generation pipeline for high-quality 3D Gaussian avatars with animation capability
