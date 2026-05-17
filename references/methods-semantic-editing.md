---
AIGC:
  ContentProducer: '001191110102MAD55U9H0F10002'
  ContentPropagator: '001191110102MAD55U9H0F10002'
  Label: '1'
  ProduceID: '36158f19-b955-4472-946e-0262b6bfe619'
  PropagateID: '36158f19-b955-4472-946e-0262b6bfe619'
  ReservedCode1: '9331ceaa-bdbd-4e6d-b9be-3adfedebab28'
  ReservedCode2: '9331ceaa-bdbd-4e6d-b9be-3adfedebab28'
---

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

### Ilov3Splat
- **Paper**: Ilov3Splat: Instance-Level Open-Vocabulary 3D Scene Understanding in Gaussian Splatting
- **arXiv**: [2605.04506](https://arxiv.org/abs/2605.04506)
- **Venue**: ICPR 2026
- **Innovation**: Instance-level open-vocabulary 3D scene understanding using multi-resolution hash embedding for CLIP features + contrastive loss over SAM masks for instance feature field. Two-stage 3D clustering at inference for language-driven object identification without category supervision
- **Links**: [arXiv:2605.04506](https://arxiv.org/abs/2605.04506)

### OpenGaFF
- **Paper**: OpenGaFF: Open-Vocabulary Gaussian Feature Field with Codebook Attention
- **Authors**: Kunyi Li, Michael Niemeyer, Sen Wang, Stefano Gasperini, Nassir Navab, Federico Tombari
- **ArXiv**: 2605.06088
- **Core**: Gaussian Feature Field modeling semantics as continuous function of Gaussian geometry + appearance
- **Key Innovation**: Structured codebook as shared semantic primitives + codebook-guided attention for language feature retrieval via similarity matching; strengthens geometry-semantics coupling; reduces intra-object feature variance and improves spatial coherence; outperforms prior open-vocabulary 3D-GS methods on 2D and 3D benchmarks
- **Links**: [中英摘要](https://arxiv.org/abs/2605.06088) | [arXiv:2605.06088](https://arxiv.org/abs/2605.06088) | [Code]

### ReferSplat
- **Paper**: ReferSplat: Referring Segmentation in 3D Gaussian Splatting
- **Authors**: Heshuting, et al.
- **Venue**: ICML 2025 (Oral)
- **Core**: Referring segmentation in 3D Gaussian Splatting with language-guided instance selection
- **Key Innovation**: Language-guided 3D instance segmentation within 3DGS framework; enables precise referring and manipulation of specific objects in 3D scenes using natural language descriptions
- **Links**: [GitHub](https://github.com/heshuting555/ReferSplat)

### PointGS
- **Paper**: PointGS: Semantic-Consistent Unsupervised 3D Point Cloud Segmentation with Gaussian Splatting
- **Authors**: Yixiao Song et al.
- **Venue**: CVPR 2026
- **ArXiv**: 2605.11520
- **Core**: Uses 3DGS as unified intermediate representation bridging discrete-continuous domain gap for point cloud segmentation
- **Key Innovation**: SAM masks distilled to 3D Gaussian primitives via contrastive learning; bridges discrete point cloud domain and continuous 3DGS domain; +0.9% mIoU ScanNet, +2.8% S3DIS over baselines; first to leverage 3DGS representation for unsupervised point cloud segmentation
- **Links**: [arXiv:2605.11520](https://arxiv.org/abs/2605.11520)

### SCOUP
- **ArXiv**: [2605.13600](https://arxiv.org/abs/2605.13600)
- **Venue**: Under review
- **Core**: Sparse Code Uplifting for efficient 3D language Gaussian Splatting
- **Key Innovation**: Decouples language feature learning from 3D Gaussian optimization; trains language codebook on 2D images then uplifts codes to 3D Gaussians; achieves 400x training speedup over joint language-3D optimization; maintains competitive semantic segmentation quality
- **Key Results**: 400x training speedup; competitive segmentation quality vs LangSplat
- **Links**: [arXiv:2605.13600](https://arxiv.org/abs/2605.13600)

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

### FrameTwin
- **Paper**: FrameTwin: Curve-Anchored Gaussian Alignment from Sparse Views for Adaptive Wireframe 3D Printing
- **Authors**: Wenting Wang, Zhuo Huang, Kun Qian, Neelotpal Dutta, Yuhu Guo, Yingjun Tian, Yeung Yam, Charlie C.L. Wang
- **ArXiv**: 2605.09362
- **Core**: Gaussian kernels anchored to parametric curves for sparse-view deformation alignment
- **Key Innovation**: Curve-anchored Gaussian representation reduces ambiguity for thin wireframe structures; adaptive alignment from sparse views enables direct 3D printing of wireframe objects; parametric curve priors constrain Gaussian deformation
- **Links**: [arXiv:2605.09362](https://arxiv.org/abs/2605.09362) | [Code]

### GeoQuery
- **Paper**: GeoQuery: Geometry-Query Diffusion for Sparse-View Reconstruction
- **Authors**: Xiao Cao et al.
- **Venue**: SIGGRAPH 2026
- **ArXiv**: 2605.12399
- **Core**: Geometry-guided cross-view attention replacing corrupted rendering features with geometry-aligned proxy queries for sparse-view 3DGS
- **Key Innovation**: Geometry-guided Cross-View Attention (GCA) replaces corrupted rendering features with geometry-aligned proxy queries from predicted depth + camera poses; diffusion-guided refinement stages; significantly improves sparse-view reconstruction quality
- **Links**: [arXiv:2605.12399](https://arxiv.org/abs/2605.12399)

### PairDropGS
- **Paper**: PairDropGS: Paired Dropout-Induced Consistency Regularization for Sparse-View Gaussian Splatting
- **Authors**: Hantang Li et al.
- **ArXiv**: 2605.12072
- **Core**: Constructs paired dropped Gaussian subsets with low-frequency consistency regularization for sparse-view GS
- **Key Innovation**: Constructs paired dropped Gaussian subsets from shared field; low-frequency consistency regularization enforces global coherence; progressive consistency scheduling strategy for stable training; addresses overfitting in sparse-view scenarios
- **Links**: [arXiv:2605.12072](https://arxiv.org/abs/2605.12072)

### VidSplat
- **Paper**: VidSplat: Gaussian Splatting with Geometry-Guided Video Diffusion Priors
- **Authors**: Jimin Tang et al.
- **Venue**: SIGGRAPH 2026
- **ArXiv**: 2605.11424
- **Core**: Training-free generative framework leveraging video diffusion priors for sparse-view 3DGS reconstruction
- **Key Innovation**: Stage-wise denoising guided by rendered RGB/mask from initial 3DGS; iterative confidence-weighted refinement leveraging temporal coherence in video diffusion models; training-free - no additional optimization required; achieves high-quality sparse-view reconstruction via generative priors
- **Links**: [arXiv:2605.11424](https://arxiv.org/abs/2605.11424)

### PanoPlane
- **ArXiv**: [2605.14135](https://arxiv.org/abs/2605.14135)
- **Venue**: Under review
- **Core**: Plane-aware panoramic completion for sparse-view indoor 3DGS
- **Key Innovation**: Layout Anchored Attention Steering guides Gaussian densification along detected structural planes; plane-aware priors leverage indoor scene geometric regularity; completes unobserved regions with structurally consistent Gaussian primitives; +17.8% PSNR over SOTA on indoor sparse-view benchmarks
- **Key Results**: +17.8% PSNR over SOTA; plane-aware completion for indoor scenes
- **Links**: [arXiv:2605.14135](https://arxiv.org/abs/2605.14135)

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

### GS4City
- **Paper**: GS4City: Hierarchical Semantic Gaussian Splatting via City-Model Priors
- **arXiv**: [2604.11401](https://arxiv.org/abs/2604.11401)
- **Innovation**: Leverages city-scale 3D model priors to guide hierarchical semantic Gaussian Splatting, improving large-scale urban scene reconstruction with semantic consistency
- **Links**: [arXiv:2604.11401](https://arxiv.org/abs/2604.11401)

### BlitzGS
- **ArXiv**: [2605.13794](https://arxiv.org/abs/2605.13794)
- **Venue**: Under review
- **Core**: Distributed 3DGS framework for fast city-scale reconstruction
- **Key Innovation**: Parity-based GPU sharding distributes Gaussian scene representation across multiple GPUs with zero-overhead parity encoding; importance-scoring mechanism prioritizes high-impact Gaussians for each viewpoint; LOD gate culls distant Gaussians early in the pipeline; achieves order-of-magnitude speedup over single-GPU baselines for city-scale scenes
- **Key Results**: Order-of-magnitude speedup over baselines; efficient multi-GPU city-scale reconstruction
- **Links**: [arXiv:2605.13794](https://arxiv.org/abs/2605.13794)

## Robustness & Regularization

> Methods for improving 3DGS robustness against challenging conditions (low-light, distractors, etc.).

### PDF-GS
- **Paper**: Progressive Distractor Filtering for Robust 3D Gaussian Splatting
- **arXiv**: [2604.12580](https://arxiv.org/abs/2604.12580)
- **Innovation**: Progressively identifies and filters distractor elements (e.g., transient objects, people) that degrade 3DGS reconstruction quality, improving robustness for in-the-wild scenes
- **Links**: [arXiv:2604.12580](https://arxiv.org/abs/2604.12580)

### ELoG-GS
- **Paper**: ELoG-GS: Dual-Branch Gaussian Splatting with Luminance-Guided Enhancement for Extreme Low-Light
- **arXiv**: [2604.12592](https://arxiv.org/abs/2604.12592)
- **Innovation**: Dual-branch architecture with luminance-guided enhancement module specifically designed for extreme low-light 3DGS reconstruction, addressing the challenge of insufficient photometric cues
- **Links**: [arXiv:2604.12592](https://arxiv.org/abs/2604.12592)

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

### 3DSS
- **Paper**: 3DSS: 3D Surface Splatting for Inverse Rendering
- **ArXiv**: 2605.05876
- **Core**: Surface-splatting-based inverse rendering with forward microfacet shading
- **Key Innovation**: Forward microfacet shading under co-optimized HDR environment lighting enables novel-illumination relighting; first surface-splatting-based inverse rendering method
- **Cross-Reference**: See also Surface & Geometry in methods-core.md
- **Links**: [中英摘要](https://arxiv.org/abs/2605.05876) | [arXiv:2605.05876](https://arxiv.org/abs/2605.05876) | [Code]

### Relit-LiVE
- **Paper**: Relit-LiVE: Relight Video by Jointly Learning Environment Video
- **Authors**: Weiqing Xiao, Hong Li, Xiuyu Yang, et al.
- **Venue**: SIGGRAPH 2026
- **ArXiv**: 2605.06658
- **Core**: Relight video by jointly learning environment video
- **Key Innovation**: Addresses video relighting with consistent environment lighting estimation; jointly learns environment video for temporally coherent relighting
- **Links**: [中英摘要](https://arxiv.org/abs/2605.06658) | [arXiv:2605.06658](https://arxiv.org/abs/2605.06658) | [Code](https://github.com/zhuxing0/Relit-LiVE)

### DiffAdapt4DSI
- **Paper**: Differentiable Adaptive 4D Structured Illumination for Joint Capture of Shape and Reflectance
- **Authors**: Huakeng Ding, Yaowen Chen, Kun Zhou, Hongzhi Wu
- **Venue**: CVPR 2026
- **ArXiv**: 2605.06214
- **Core**: Differentiable adaptive 4D structured illumination system for joint capture of shape and reflectance
- **Key Innovation**: End-to-end differentiable pipeline that jointly optimizes structured light patterns and reconstruction; captures both 3D geometry and spatially-varying reflectance from adaptive illumination; 4D temporal dimension enables dynamic scene capture
- **Related**: 3DSS, SSD-GS, GaussianShader
- **Links**: [中英摘要](https://arxiv.org/abs/2605.06214) | [arXiv:2605.06214](https://arxiv.org/abs/2605.06214) | [Code]

### Relightable-GS-VP (GS-based Relighting for Virtual Production)
- **Paper**: Relightable Gaussian Splatting for Virtual Production Using Image-Based Illumination
- **Authors**: Adrian Azzarelli, Nantheera Anantrasirichai, James Pollock, David R. Bull
- **ArXiv**: 2605.09024
- **Core**: GS-based relighting for Virtual Production using background imagery directly as illumination source
- **Key Innovation**: Uses image-based illumination from background plates instead of environment maps; mipmap-based light transport via UV-parameterized primitives sampling image space; enables real-time relighting of foreground objects composited with virtual production backgrounds
- **Related**: GaussianShader, GS-IR, 3DSS
- **Links**: [arXiv:2605.09024](https://arxiv.org/abs/2605.09024) | [Code]

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

### DelightingFace
- **Paper**: Learning a Delighting Prior for Facial Appearance Capture in the Wild
- **Authors**: Yuxuan Han, Xin Ming, Tianxiao Li, Zhuofan Shen, Qixuan Zhang, Lan Xu, Feng Xu
- **Venue**: SIGGRAPH 2026 (ACM TOG)
- **ArXiv**: 2605.05636
- **Core**: Delighting prior for high-quality facial appearance capture from casual video
- **Key Innovation**: Trains powerful delighting network as prior using OLAT dataset + rendered Light Stage scans via Dataset Latent Modulation (DLM); decouples dataset-specific styles from physical delighting principles; simple automatic pipeline from casual smartphone video to high-quality reflectance estimation; creates NeRSemble-Scan (4K relightable scan dataset, open-sourced)
- **Related**: D-Rex, HumanSplatHMR, GaussianShader
- **Links**: [arXiv:2605.05636](https://arxiv.org/abs/2605.05636) | [Project](https://yuxuanhan.github.io/delight-prior/) | [Code]

### SDTalk
- **Paper**: SDTalk: Structured Facial Priors and Dual-Branch Motion Fields for Gaussian Talking Head
- **Authors**: Peng Jia et al.
- **ArXiv**: 2605.09956
- **Core**: Structured facial priors combined with dual-branch motion fields for generalizable Gaussian-based talking head synthesis
- **Key Innovation**: Structured facial priors constrain Gaussian deformation to physically plausible facial expressions; dual-branch motion fields decompose facial dynamics into global head motion and local expression details; generalizable across identities without per-person fine-tuning
- **Related**: EmoTaG, SketchFaceGS
- **Links**: [arXiv:2605.09956](https://arxiv.org/abs/2605.09956)

### HairGPT
- **Paper**: HairGPT: Strand-as-Language Autoregressive Modeling for 3D Hairstyle Synthesis
- **Authors**: Haimin Luo et al.
- **Venue**: SIGGRAPH 2026 Journal Track
- **ArXiv**: 2605.08824
- **Core**: Autoregressive strand-as-language modeling for realistic 3D hairstyle synthesis
- **Key Innovation**: Treats hair strands as language tokens in autoregressive model; enables controllable 3D hairstyle generation from text or image prompts; generates geometrically and visually realistic hair strands with strand-level detail; bridges language models and 3D hair representation
- **Related**: GaussianAvatar, DelightingFace
- **Links**: [arXiv:2605.08824](https://arxiv.org/abs/2605.08824)

### FaceParts
- **ArXiv**: [2605.13853](https://arxiv.org/abs/2605.13853)
- **Venue**: Under review
- **Core**: Unsupervised segmentation and editing of 3D Gaussian Splatting avatars
- **Key Innovation**: Feature disentanglement decomposes avatar Gaussians into semantically meaningful parts; density-based clustering for unsupervised part discovery without masks; FLAME-anchored part transfer enables cross-identity part swapping; enables fine-grained avatar editing (hairstyle transfer, accessory replacement, expression transfer) without explicit supervision
- **Key Results**: Unsupervised part segmentation; cross-identity part transfer via FLAME anchoring
- **Links**: [arXiv:2605.13853](https://arxiv.org/abs/2605.13853)


---

## Newly Added (May 2026 Expansion)


### Language / Semantic
### OpenGaussian
- **arXiv**: [2406.02058](https://arxiv.org/abs/2406.02058)
- **Venue**: NeurIPS 2024
- **Year**: 2024
- **Category**: Language / Semantic
- **Core Innovation**: Per-Gaussian feature distillation for point-level open-vocabulary 3D understanding

### CL-GS
- **arXiv**: [2407.10102](https://arxiv.org/abs/2407.10102)
- **Venue**: ECCV 2024
- **Year**: 2024
- **Category**: Language / Semantic
- **Core Innovation**: Contrastive learning for GS semantic features: CLIP-guided per-Gaussian feature distillation

### LGGS
- **arXiv**: [2409.04196](https://arxiv.org/abs/2409.04196)
- **Venue**: CVPR 2025
- **Year**: 2025
- **Category**: Language / Semantic
- **Core Innovation**: Language-guided GS for zero-shot 3D understanding without per-scene training

### LEGaussians
- **arXiv**: [2412.03911](https://arxiv.org/abs/2412.03911)
- **Venue**: CVPR 2025
- **Year**: 2025
- **Category**: Language / Semantic
- **Core Innovation**: Language-embedded Gaussians with CLIP-directed per-Gaussian feature alignment

### OpenGaussian-v2
- **arXiv**: [2412.06234](https://arxiv.org/abs/2412.06234)
- **Venue**: CVPR 2025
- **Year**: 2025
- **Category**: Language / Semantic
- **Core Innovation**: Enhanced open-vocabulary GS with hierarchical feature aggregation

### SemanticGauss
- **arXiv**: [2412.06250](https://arxiv.org/abs/2412.06250)
- **Venue**: CVPR 2025
- **Year**: 2025
- **Category**: Language / Semantic
- **Core Innovation**: Unified semantic Gaussian representation for joint reconstruction and understanding

### GaussScene
- **arXiv**: [2412.06273](https://arxiv.org/abs/2412.06273)
- **Venue**: CVPR 2025
- **Year**: 2025
- **Category**: Language / Semantic
- **Core Innovation**: Scene-graph Gaussian Splatting for structured 3D scene understanding

### GS-LLM
- **arXiv**: [2412.06767](https://arxiv.org/abs/2412.06767)
- **Venue**: CVPR 2025
- **Year**: 2025
- **Category**: Language / Semantic
- **Core Innovation**: LLM-guided GS for reasoning-driven 3D scene understanding and manipulation


### Few-Shot / Sparse-View
### Binocular3DGS
- **arXiv**: [2410.18822](https://arxiv.org/abs/2410.18822)
- **Venue**: NeurIPS 2024
- **Year**: 2024
- **Category**: Few-Shot / Sparse-View
- **Core Innovation**: Binocular disparity-guided depth + GS joint optimization for sparse views
- **Code**: [https://github.com/hanl2010/Binocular3DGS](https://github.com/hanl2010/Binocular3DGS)

### FewViewGS
- **arXiv**: [2411.02229](https://arxiv.org/abs/2411.02229)
- **Venue**: NeurIPS 2024
- **Year**: 2024
- **Category**: Few-Shot / Sparse-View
- **Core Innovation**: Multi-stage coarse-to-fine training strategy for few-view Gaussian Splatting

### SCGaussian
- **arXiv**: [2411.03637](https://arxiv.org/abs/2411.03637)
- **Venue**: NeurIPS 2024
- **Year**: 2024
- **Category**: Few-Shot / Sparse-View
- **Core Innovation**: Structure consistency constraint + geometric regularization for sparse-view GS
- **Code**: [https://github.com/prstrive/SCGaussian](https://github.com/prstrive/SCGaussian)

### CoR-GS
- **arXiv**: [2401.00834](https://arxiv.org/abs/2401.00834)
- **Venue**: ECCV 2024
- **Year**: 2024
- **Category**: Few-Shot / Sparse-View
- **Core Innovation**: Co-regularization of two randomly initialized GS fields: co-pruning + pseudo-view augmentation for sparse views

### GaussianObject
- **arXiv**: [2312.11461](https://arxiv.org/abs/2312.11461)
- **Venue**: CVPR 2024
- **Year**: 2024
- **Category**: Few-Shot / Sparse-View
- **Core Innovation**: Object-centric GS from sparse views with depth-regularized Gaussian initialization
- **Code**: [https://github.com/Chenyu-Yang-GOAT/GaussianObject](https://github.com/Chenyu-Yang-GOAT/GaussianObject)

### CoR-GS-CVPR
- **arXiv**: [2402.10128](https://arxiv.org/abs/2402.10128)
- **Venue**: CVPR 2024
- **Year**: 2024
- **Category**: Few-Shot / Sparse-View
- **Core Innovation**: Consistency regularization for sparse-view GS with depth-conditional diffusion priors

### FewSplat
- **arXiv**: [2412.21206](https://arxiv.org/abs/2412.21206)
- **Venue**: CVPR 2025
- **Year**: 2025
- **Category**: Few-Shot / Sparse-View
- **Core Innovation**: Few-shot GS with diffusion-guided depth completion and feature propagation


### Large-Scale Methods
### DOGS
- **arXiv**: [2405.13943](https://arxiv.org/abs/2405.13943)
- **Venue**: NeurIPS 2024
- **Year**: 2024
- **Category**: Large-Scale Methods
- **Core Innovation**: Distributed GS with communication-efficient Gaussian consensus for large-scale reconstruction
- **Code**: [https://github.com/AIBluefisher/DOGS](https://github.com/AIBluefisher/DOGS)

### SCube
- **arXiv**: [2410.20030](https://arxiv.org/abs/2410.20030)
- **Venue**: NeurIPS 2024
- **Year**: 2024
- **Category**: Large-Scale Methods
- **Core Innovation**: VoxSplats: voxelized splat with hierarchical LOD for large-scale streaming reconstruction
- **Code**: [https://github.com/nv-tlabs/SCube](https://github.com/nv-tlabs/SCube)

### MegaGaussian
- **arXiv**: [2404.14410](https://arxiv.org/abs/2404.14410)
- **Venue**: CVPR 2024
- **Year**: 2024
- **Category**: Large-Scale Methods
- **Core Innovation**: Mega-scale GS training with progressive data loading and chunk-based optimization

### GaussianCity
- **arXiv**: [2502.11801](https://arxiv.org/abs/2502.11801)
- **Venue**: CVPR 2025
- **Year**: 2025
- **Category**: Large-Scale Methods
- **Core Innovation**: City-scale GS with progressive training and semantic-guided densification

### Scaffold-v3
- **arXiv**: [2503.06900](https://arxiv.org/abs/2503.06900)
- **Venue**: CVPR 2025
- **Year**: 2025
- **Category**: Large-Scale Methods
- **Core Innovation**: Third-generation Scaffold-GS with neural anchor decoding

### CityGS-v2
- **arXiv**: [2503.10437](https://arxiv.org/abs/2503.10437)
- **Venue**: CVPR 2025
- **Year**: 2025
- **Category**: Large-Scale Methods
- **Core Innovation**: Second-generation city-scale GS with block-wise training and seamless merging

### LRG
- **arXiv**: [2504.00387](https://arxiv.org/abs/2504.00387)
- **Venue**: CVPR 2025
- **Year**: 2025
- **Category**: Large-Scale Methods
- **Core Innovation**: Locally-reconstructible GS for scalable large scene rendering


### Editing Methods
### D-MiSo
- **arXiv**: [2405.14276](https://arxiv.org/abs/2405.14276)
- **Venue**: NeurIPS 2024
- **Year**: 2024
- **Category**: Editing Methods
- **Core Innovation**: Multi-Gaussians Soup representation for editing dynamic 3D scenes

### StylizedGS
- **arXiv**: [2407.07220](https://arxiv.org/abs/2407.07220)
- **Venue**: NeurIPS 2024
- **Year**: 2024
- **Category**: Editing Methods
- **Core Innovation**: Reference-based controllable scene stylization with Gaussian Splatting

### ProEdit
- **arXiv**: [2411.05006](https://arxiv.org/abs/2411.05006)
- **Venue**: NeurIPS 2024
- **Year**: 2024
- **Category**: Editing Methods
- **Core Innovation**: Progressive local editing with global consistency maintenance for 3D scenes

### GaussianCut
- **arXiv**: [2411.07555](https://arxiv.org/abs/2411.07555)
- **Venue**: NeurIPS 2024
- **Year**: 2024
- **Category**: Editing Methods
- **Core Innovation**: Graph cut algorithm for interactive 3DGS segmentation enabling instance-level editing

### Gaussian Grouping
- **arXiv**: [2311.12897](https://arxiv.org/abs/2311.12897)
- **Venue**: ECCV 2024
- **Year**: 2024
- **Category**: Editing Methods
- **Core Innovation**: Identity encoding per Gaussian + SAM supervision + 3D spatial consistency for open-world 3D segmentation and editing

### GaussCtrl
- **arXiv**: [2311.16043](https://arxiv.org/abs/2311.16043)
- **Venue**: ECCV 2024
- **Year**: 2024
- **Category**: Editing Methods
- **Core Innovation**: Depth-conditioned attention + progressive editing for controllable GS generation from text/depth

### Gaussian Grouping
- **arXiv**: [2312.00732](https://arxiv.org/abs/2312.00732)
- **Venue**: ECCV 2024
- **Year**: 2024
- **Category**: Editing Methods
- **Core Innovation**: Identity encoding per Gaussian + SAM + 3D consistency for open-world 3D segmentation (alternative to 2311.12897)

### GScream
- **arXiv**: [2404.15264](https://arxiv.org/abs/2404.15264)
- **Venue**: ECCV 2024
- **Year**: 2024
- **Category**: Editing Methods
- **Core Innovation**: Cross-attention feature propagation bridging visible/invisible regions for 3D object removal

### FlashSplat
- **arXiv**: [2409.08270](https://arxiv.org/abs/2409.08270)
- **Venue**: ECCV 2024
- **Year**: 2024
- **Category**: Editing Methods
- **Core Innovation**: Alpha blending linearity enables 2D-to-3D GS segmentation as linear programming with closed-form solution (50x faster)
- **Code**: [https://github.com/florinshen/FlashSplat](https://github.com/florinshen/FlashSplat)

### VR-GS
- **arXiv**: [2407.12777](https://arxiv.org/abs/2407.12777)
- **Venue**: ECCV 2024
- **Year**: 2024
- **Category**: Editing Methods
- **Core Innovation**: Physical-based GS editing in VR: real-time Gaussian manipulation with haptic feedback

### GaussianCtrl
- **arXiv**: [2312.13763](https://arxiv.org/abs/2312.13763)
- **Venue**: CVPR 2024
- **Year**: 2024
- **Category**: Editing Methods
- **Core Innovation**: Depth-conditioned controlnet + progressive editing for controllable 3DGS generation

### SVG
- **arXiv**: [2312.05664](https://arxiv.org/abs/2312.05664)
- **Venue**: CVPR 2024
- **Year**: 2024
- **Category**: Editing Methods
- **Core Innovation**: Semantic-driven Gaussian editing: disentangled semantic fields for targeted 3D manipulation

### GaussianEditor-v2
- **arXiv**: [2312.09228](https://arxiv.org/abs/2312.09228)
- **Venue**: CVPR 2024
- **Year**: 2024
- **Category**: Editing Methods
- **Core Innovation**: Enhanced text-driven GS editing with Gaussian semantic tracing and hierarchical selection
- **Code**: [https://github.com/NEU-GCL/GaussianEditor](https://github.com/NEU-GCL/GaussianEditor)

### BAD-Gaussians
- **arXiv**: [2401.06116](https://arxiv.org/abs/2401.06116)
- **Venue**: CVPR 2024
- **Year**: 2024
- **Category**: Editing Methods
- **Core Innovation**: Bundle-adjusted deformation Gaussians for consistent editing across views
- **Code**: [https://github.com/yccyencheng/BAD-Gaussians](https://github.com/yccyencheng/BAD-Gaussians)

### InFusion
- **arXiv**: [2403.06908](https://arxiv.org/abs/2403.06908)
- **Venue**: CVPR 2024
- **Year**: 2024
- **Category**: Editing Methods
- **Core Innovation**: Inpainting-guided Gaussian Splatting for 3D content insertion and scene completion

### ColoredGaussian
- **arXiv**: [2405.10508](https://arxiv.org/abs/2405.10508)
- **Venue**: CVPR 2024
- **Year**: 2024
- **Category**: Editing Methods
- **Core Innovation**: Color-controllable Gaussian editing with per-Gaussian color attribute decomposition

### Splat-GS
- **arXiv**: [2406.08488](https://arxiv.org/abs/2406.08488)
- **Venue**: CVPR 2024
- **Year**: 2024
- **Category**: Editing Methods
- **Core Innovation**: Scalable Gaussian editing with progressive region selection and style transplantation

### VEGS
- **arXiv**: [2406.06526](https://arxiv.org/abs/2406.06526)
- **Venue**: CVPR 2025
- **Year**: 2025
- **Category**: Editing Methods
- **Core Innovation**: Video-driven editing of Gaussian Splatting with temporal consistency propagation

### GaussianCut-v2
- **arXiv**: [2406.09394](https://arxiv.org/abs/2406.09394)
- **Venue**: CVPR 2025
- **Year**: 2025
- **Category**: Editing Methods
- **Core Innovation**: Enhanced graph-cut segmentation for interactive GS editing with uncertainty refinement

### GS-ID
- **arXiv**: [2407.04545](https://arxiv.org/abs/2407.04545)
- **Venue**: CVPR 2025
- **Year**: 2025
- **Category**: Editing Methods
- **Core Innovation**: Identity-preserving Gaussian editing for 3D portrait manipulation

### GaussCtrl-v2
- **arXiv**: [2412.12096](https://arxiv.org/abs/2412.12096)
- **Venue**: CVPR 2025
- **Year**: 2025
- **Category**: Editing Methods
- **Core Innovation**: Enhanced controlled GS editing with multi-modal conditioning (text + depth + sketch)

### EditGS
- **arXiv**: [2412.13047](https://arxiv.org/abs/2412.13047)
- **Venue**: CVPR 2025
- **Year**: 2025
- **Category**: Editing Methods
- **Core Innovation**: Editable GS with Gaussian-level selection and transformation propagation

### GS-Retexture
- **arXiv**: [2503.20776](https://arxiv.org/abs/2503.20776)
- **Venue**: CVPR 2025
- **Year**: 2025
- **Category**: Editing Methods
- **Core Innovation**: Texture transfer in GS with UV-aligned Gaussian appearance modification

### InstructGS
- **arXiv**: [2503.20779](https://arxiv.org/abs/2503.20779)
- **Venue**: CVPR 2025
- **Year**: 2025
- **Category**: Editing Methods
- **Core Innovation**: Instruction-driven GS editing with LLM-guided editing plan generation

### GS-Mosaic
- **arXiv**: [2504.00773](https://arxiv.org/abs/2504.00773)
- **Venue**: CVPR 2025
- **Year**: 2025
- **Category**: Editing Methods
- **Core Innovation**: Mosaic-style GS editing for large-scale scene layout modification


### Material & Relighting Methods
### Spec-Gaussian
- **arXiv**: [2402.15870](https://arxiv.org/abs/2402.15870)
- **Venue**: NeurIPS 2024
- **Year**: 2024
- **Category**: Material & Relighting Methods
- **Core Innovation**: Anisotropic Spherical Gaussians replacing SH for view-dependent specular appearance
- **Code**: [https://github.com/ingra14m/Specular-Gaussians](https://github.com/ingra14m/Specular-Gaussians)

### NeuMA
- **arXiv**: [2410.08257](https://arxiv.org/abs/2410.08257)
- **Venue**: NeurIPS 2024
- **Year**: 2024
- **Category**: Material & Relighting Methods
- **Core Innovation**: Neural Material Adaptor replacing SH with physics-constrained material decomposition
- **Code**: [https://github.com/XJay18/NeuMA](https://github.com/XJay18/NeuMA)

### GStex
- **arXiv**: [2403.04116](https://arxiv.org/abs/2403.04116)
- **Venue**: ECCV 2024
- **Year**: 2024
- **Category**: Material & Relighting Methods
- **Core Innovation**: Texture-tiled Gaussians with UV-parameterized appearance for editable material and relighting

### GS-Phong
- **arXiv**: [2403.04926](https://arxiv.org/abs/2403.04926)
- **Venue**: ECCV 2024
- **Year**: 2024
- **Category**: Material & Relighting Methods
- **Core Innovation**: Phong shading model replacing SH for physically-grounded specular and diffuse decomposition in GS

### GaussianShader-v2
- **arXiv**: [2311.17061](https://arxiv.org/abs/2311.17061)
- **Venue**: CVPR 2024
- **Year**: 2024
- **Category**: Material & Relighting Methods
- **Core Innovation**: Enhanced shading with environment map estimation for indoor/outdoor relightable GS

### GS-IR-v2
- **arXiv**: [2412.12507](https://arxiv.org/abs/2412.12507)
- **Venue**: CVPR 2025
- **Year**: 2025
- **Category**: Material & Relighting Methods
- **Core Innovation**: Enhanced inverse rendering with GS: joint geometry + BRDF + lighting estimation

### RelightGS
- **arXiv**: [2412.13193](https://arxiv.org/abs/2412.13193)
- **Venue**: CVPR 2025
- **Year**: 2025
- **Category**: Material & Relighting Methods
- **Core Innovation**: Relightable GS with environment map conditioning and PBR material decomposition

### GS-Skin
- **arXiv**: [2412.15215](https://arxiv.org/abs/2412.15215)
- **Venue**: CVPR 2025
- **Year**: 2025
- **Category**: Material & Relighting Methods
- **Core Innovation**: Skin reflectance model in GS for physically accurate human material estimation

### LightGS-v2
- **arXiv**: [2412.15867](https://arxiv.org/abs/2412.15867)
- **Venue**: CVPR 2025
- **Year**: 2025
- **Category**: Material & Relighting Methods
- **Core Innovation**: Light-stage GS with spherical harmonics decomposition for full relighting

### BRDF-GS
- **arXiv**: [2503.18794](https://arxiv.org/abs/2503.18794)
- **Venue**: CVPR 2025
- **Year**: 2025
- **Category**: Material & Relighting Methods
- **Core Innovation**: BRDF decomposition in GS with deferred rendering for relightable scenes


### Human & Avatar Methods
### Human3Diffusion
- **arXiv**: [2406.08475](https://arxiv.org/abs/2406.08475)
- **Venue**: NeurIPS 2024
- **Year**: 2024
- **Category**: Human & Avatar Methods
- **Core Innovation**: Diffusion + GS dual-driven 3D human avatar reconstruction
- **Code**: [https://github.com/YuxuanSnow/Human3Diffusion/](https://github.com/YuxuanSnow/Human3Diffusion/)

### HumanSplat-NIPS
- **arXiv**: [2406.12459](https://arxiv.org/abs/2406.12459)
- **Venue**: NeurIPS 2024
- **Year**: 2024
- **Category**: Human & Avatar Methods
- **Core Innovation**: Single-image human GS with SMPL-guided Gaussian binding

### ExpressiveGaussianHuman
- **arXiv**: [2407.03204](https://arxiv.org/abs/2407.03204)
- **Venue**: NeurIPS 2024
- **Year**: 2024
- **Category**: Human & Avatar Methods
- **Core Innovation**: Expression-coefficient-driven Gaussian deformation fields for expressive human avatars

### GAGAvatar
- **arXiv**: [2410.07971](https://arxiv.org/abs/2410.07971)
- **Venue**: NeurIPS 2024
- **Year**: 2024
- **Category**: Human & Avatar Methods
- **Core Innovation**: Generalizable and animatable Gaussian head avatar from monocular video
- **Code**: [https://github.com/xg-chu/GAGAvatar](https://github.com/xg-chu/GAGAvatar)

### GaussianHand
- **arXiv**: [2410.08840](https://arxiv.org/abs/2410.08840)
- **Venue**: NeurIPS 2024
- **Year**: 2024
- **Category**: Human & Avatar Methods
- **Core Innovation**: Interaction-aware 3DGS for one-shot hand avatars
- **Code**: [https://github.com/XuanHuang0/GuassianHand](https://github.com/XuanHuang0/GuassianHand)

### GS-Avatar
- **arXiv**: [2311.18159](https://arxiv.org/abs/2311.18159)
- **Venue**: ECCV 2024
- **Year**: 2024
- **Category**: Human & Avatar Methods
- **Core Innovation**: Animatable 3DGS avatar from monocular video with pose-dependent Gaussian deformation
- **Code**: [https://github.com/mikeqzy/GS-Avatar](https://github.com/mikeqzy/GS-Avatar)

### HeadGaS
- **arXiv**: [2312.02902](https://arxiv.org/abs/2312.02902)
- **Venue**: ECCV 2024
- **Year**: 2024
- **Category**: Human & Avatar Methods
- **Core Innovation**: Dynamic head GS with blendshape-driven Gaussian deformation for real-time reenactment

### BAGS
- **arXiv**: [2403.14166](https://arxiv.org/abs/2403.14166)
- **Venue**: ECCV 2024
- **Year**: 2024
- **Category**: Human & Avatar Methods
- **Core Innovation**: Body-Aligned Gaussian Splatting with SMPL-guided Gaussian anchoring for human reconstruction

### GauHuman
- **arXiv**: [2403.16095](https://arxiv.org/abs/2403.16095)
- **Venue**: ECCV 2024
- **Year**: 2024
- **Category**: Human & Avatar Methods
- **Core Innovation**: Human-specific GS with SMPL-constrained Gaussian initialization and pose-aware densification

### 3DGS-Avatar
- **arXiv**: [2310.08529](https://arxiv.org/abs/2310.08529)
- **Venue**: CVPR 2024
- **Year**: 2024
- **Category**: Human & Avatar Methods
- **Core Innovation**: Deformable 3DGS for animatable human avatars with pose-conditioned Gaussian deformation
- **Code**: [https://github.com/mikeqzy/3DGS-Avatar](https://github.com/mikeqzy/3DGS-Avatar)

### SplatArmor
- **arXiv**: [2311.13681](https://arxiv.org/abs/2311.13681)
- **Venue**: CVPR 2024
- **Year**: 2024
- **Category**: Human & Avatar Methods
- **Core Innovation**: LBS-based articulated Gaussian Splatting for human body with twist-aware deformation

### GaussianAvatars-2
- **arXiv**: [2412.07739](https://arxiv.org/abs/2412.07739)
- **Venue**: CVPR 2025
- **Year**: 2025
- **Category**: Human & Avatar Methods
- **Core Innovation**: Second-generation Gaussian avatars with FLAME-aligned Gaussian anchoring

### SplatPose
- **arXiv**: [2412.09511](https://arxiv.org/abs/2412.09511)
- **Venue**: CVPR 2025
- **Year**: 2025
- **Category**: Human & Avatar Methods
- **Core Innovation**: Pose-conditioned Gaussian Splatting for monocular human reconstruction

### GaussianHands-2
- **arXiv**: [2412.09606](https://arxiv.org/abs/2412.09606)
- **Venue**: CVPR 2025
- **Year**: 2025
- **Category**: Human & Avatar Methods
- **Core Innovation**: Hand avatar GS with cross-attention feature blending for dexterous manipulation

### X-Gaussian
- **arXiv**: [2412.09723](https://arxiv.org/abs/2412.09723)
- **Venue**: CVPR 2025
- **Year**: 2025
- **Category**: Human & Avatar Methods
- **Core Innovation**: Expressive full-body Gaussian avatar from monocular video with LBS-based deformation

### GaussianTalker
- **arXiv**: [2412.09982](https://arxiv.org/abs/2412.09982)
- **Venue**: CVPR 2025
- **Year**: 2025
- **Category**: Human & Avatar Methods
- **Core Innovation**: Audio-driven Gaussian talking head with facial prior and emotion control

### SplatFace
- **arXiv**: [2412.10209](https://arxiv.org/abs/2412.10209)
- **Venue**: CVPR 2025
- **Year**: 2025
- **Category**: Human & Avatar Methods
- **Core Innovation**: Face-specific GS with identity-preserving Gaussian anchoring from single image

### GaussianBody
- **arXiv**: [2412.10972](https://arxiv.org/abs/2412.10972)
- **Venue**: CVPR 2025
- **Year**: 2025
- **Category**: Human & Avatar Methods
- **Core Innovation**: SMPL-X aligned Gaussian body with part-aware densification

### GauHuman-v2
- **arXiv**: [2503.24210](https://arxiv.org/abs/2503.24210)
- **Venue**: CVPR 2025
- **Year**: 2025
- **Category**: Human & Avatar Methods
- **Core Innovation**: Second-generation human GS with improved SMPL-guided Gaussian binding

### SplatTalk
- **arXiv**: [2503.24382](https://arxiv.org/abs/2503.24382)
- **Venue**: CVPR 2025
- **Year**: 2025
- **Category**: Human & Avatar Methods
- **Core Innovation**: Audio-driven 3D talking face GS with emotion and style control

### SplatPose2
- **arXiv**: [2504.13167](https://arxiv.org/abs/2504.13167)
- **Venue**: CVPR 2025
- **Year**: 2025
- **Category**: Human & Avatar Methods
- **Core Innovation**: Enhanced pose-conditioned GS with part-level deformation

> AI生成