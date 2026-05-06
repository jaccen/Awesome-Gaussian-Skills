# Systems, Applications & Cross-Domain Methods

> Methods covering robustness, autonomous driving, SLAM, training, simulation, robotics, and cross-domain applications.
> Companion file: [3dgs-methods-overview.md](3dgs-methods-overview.md) (index) | [methods-core.md](methods-core.md) | [methods-semantic-editing.md](methods-semantic-editing.md)

## Robustness & Regularization

### NRGS (Neural Regularization for Gaussian Splatting)
- **Paper**: NRGS: Neural Regularization for Robust 3D Semantic Gaussian Splatting
- **Authors**: Zaiyan Yang, Xinpeng Liu, Heng Guo, Jinglei Shi, Zhanyu Ma, Fumio Okura
- **ArXiv**: 2604.22439
- **Core**: Neural network-based regularization for semantic 3DGS
- **Key Innovation**: Improves robustness of 3DGS in semantic segmentation tasks through learnable regularization, addressing a key weakness of standard 3DGS in downstream dense prediction tasks
- **Links**: [中英摘要](https://arxiv.org/abs/2604.22439) | [arXiv:2604.22439](https://arxiv.org/abs/2604.22439) | [Code]

### DualSplat
- **Paper**: DualSplat: Robust 3D Gaussian Splatting via Pseudo-Mask Bootstrapping from Reconstruction Failures
- **Authors**: Xu Wang, Zhiru Wang, Shiyun Xie, Chengwei Pan, Yisong Chen
- **Venue**: CVPR 2026
- **ArXiv**: 2604.21631
- **Core**: Converts first-pass reconstruction failures into explicit priors for second-pass clean reconstruction
- **Key Innovation**: Failure-to-Prior framework; exploits transient fragments + photometric residuals + SAM2 boundaries to construct pseudo-masks; lightweight MLP refines masks online
- **Links**: [中英摘要](https://arxiv.org/abs/2604.21631) | [arXiv:2604.21631](https://arxiv.org/abs/2604.21631) | [Code]

### EnerGS
- **Paper**: EnerGS: Energy-Based Gaussian Splatting with Partial Geometric Priors
- **Authors**: Rui Song, Tianhui Cai, Markus Gross, Yun Zhang, et al.
- **ArXiv**: 2604.26238
- **Venue**: Under review
- **Core**: Models partially observable geometry as continuous energy field for soft geometric guidance in 3DGS optimization
- **Key Innovation**: Instead of hard geometric constraints, provides soft energy-based guidance from LiDAR/depth priors; allows geometry to steer optimization without restricting solution space; mitigates overfitting in large-scale outdoor scenes with incomplete geometric supervision
- **Links**: [中英摘要](https://arxiv.org/abs/2604.26238) | [arXiv:2604.26238](https://arxiv.org/abs/2604.26238) | [Code]


### WildGaussians
- **Paper**: WildGaussians: 3D Gaussian Splatting in the Wild
- **Authors**: Jonas Kulhanek, Songyou Peng, Zuzana Kukelova, Marc Pollefeys, Torsten Sattler
- **Venue**: NeurIPS 2024
- **ArXiv**: 2407.08447
- **Core**: 3DGS with unknown camera poses from internet photos; joint pose and 3DGS optimization
- **Key Innovation**: Robust initialization from COLMAP point clouds + incremental pose refinement; handles in-the-wild image collections with varying lighting, transient objects, and occlusion
- **Links**: [中英摘要](https://arxiv.org/abs/2407.08447) | [arXiv:2407.08447](https://arxiv.org/abs/2407.08447) | [Code](https://github.com/jkulhanek/wild-gaussians/)

### MERID-GS
- **Paper**: Light 'em Up: Enabling Few-Shot Low-Light 3D Gaussian Splatting with Multi-Scale Explicit Retinex Illumination Decoupling
- **Authors**: YuHao Yin, Zongji Wang, Yuanben Zhang, Biqing Li, Jiesong Bai, Junyi Liu
- **ArXiv**: 2604.24053
- **Core**: Few-shot low-light 360 synthesis via Retinex-based illumination/reflectance decoupling
- **Key Innovation**: Learnable gain + Illumination-State-Guided Frequency Gating; adapts to new scenes with few shots
- **Links**: [中英摘要](https://arxiv.org/abs/2604.24053) | [arXiv:2604.24053](https://arxiv.org/abs/2604.24053) | [Code](https://github.com/YhuoyuH/MERID-GS)

### MarineSTD-GS
- **Paper**: Spatiotemporal Degradation-Aware 3D Gaussian Splatting for Realistic Underwater Scene Reconstruction
- **Authors**: Shaohua Liu, Ning Gao, Zuoya Gu, Hongkun Dou, Yue Deng, Hongjue Li
- **Venue**: ACM MM 2025
- **ArXiv**: 2604.23551
- **Core**: Explicitly models temporal + spatial underwater degradations (caustics, flickering, attenuation, backscattering)
- **Key Innovation**: Paired Intrinsic/Degraded Gaussians; Spatiotemporal Degradation Modeling module; self-supervised disentanglement of realistic appearance
- **Links**: [中英摘要](https://arxiv.org/abs/2604.23551) | [arXiv:2604.23551](https://arxiv.org/abs/2604.23551) | [Code]

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
- **Links**: [中英摘要](https://arxiv.org/abs/2604.18468) | [arXiv:2604.18468](https://arxiv.org/abs/2604.18468) | [Code](https://research.nvidia.com/labs/sil/projects/asset-harvester/)

### GSDrive
- **Paper**: GSDrive: Reinforcing Driving Policies by Multi-mode Trajectory Probing with 3D Gaussian Splatting Environment
- **Authors**: Ziang Guo, Chen Min, Xuefeng Zhang, Yixiao Zhou, Zufeng Zhang, Dzmitry Tsetserukou
- **ArXiv**: 2604.28111
- **Core**: Exploits 3DGS for differentiable, physics-based reward shaping in E2E driving policy improvement
- **Key Innovation**: Flow matching-based trajectory predictor within 3DGS simulator; multi-mode trajectory probing rolls out candidate trajectories to assess prospective rewards; establishes bidirectional knowledge exchange between IL and RL; dense feedback instead of sparse catastrophic events
- **Links**: [中英摘要](https://arxiv.org/abs/2604.28111) | [arXiv:2604.28111](https://arxiv.org/abs/2604.28111) | [Code](https://github.com/ZionGo6/GSDrive)

### 3DGS Safety Evaluation for AD
- **Paper**: From Concept to Capability: Evaluating 3D Gaussian Splatting for Synthetic Scene Editing in Autonomous Driving
- **Authors**: Ali Nouri, Yifei Zhang, Yifan Zhang, Tayssir Bouraffa, Zhennan Fei, Zijian Han, Håkan Sivencrona, Anders Heyden
- **Venue**: SafeComp 2026
- **ArXiv**: 2605.01995
- **Core**: Systematic evaluation framework for 3DGS capabilities and limitations in safety-related AD scene reconstruction
- **Key Innovation**: First industrial-fidelity evaluation of 3DGS for AD; focuses on vehicle and pedestrian reconstruction quality from multiple novel viewpoints (lateral and longitudinal); analyzes fidelity degradation patterns for integrating 3DGS into real-world AD software pipelines
- **Links**: [中英摘要](https://arxiv.org/abs/2605.01995) | [arXiv:2605.01995](https://arxiv.org/abs/2605.01995) | [Code]

### Nighttime AD GS
- **Paper**: Nighttime Autonomous Driving Scene Reconstruction with Physically-Based Gaussian Splatting
- **Authors**: Tae-Kyeong Kim, Xingxin Chen, Guile Wu, Chengjie Huang, Dongfeng Bai, Bingbing Liu
- **Venue**: ICRA 2026
- **ArXiv**: 2602.13549
- **Core**: Physically based rendering in 3DGS for nighttime driving scene reconstruction
- **Key Innovation**: BRDF material optimization; global illumination (diffuse) + anisotropic spherical Gaussians (specular); SOTA on nuScenes/Waymo nighttime
- **Links**: [中英摘要](https://arxiv.org/abs/2602.13549) | [arXiv:2602.13549](https://arxiv.org/abs/2602.13549) | [Code]

### GaussianLSS
- **Paper**: GaussianLSS: Gaussian Splatting for BEV Perception
- **Venue**: CVPR 2025
- **Core**: Reconstructs BEV representation using Gaussian Splatting for AD perception
- **Key Innovation**: Models depth uncertainty in BEV perception; improves 3D perception without larger Transformers

## SLAM

### Gaussian Splatting SLAM
- **Paper**: Gaussian Splatting SLAM
- **Authors**: Hidenobu Matsuki, Riku Murai, Paul H.J. Kelly, Andrew J. Davison (Imperial College)
- **Venue**: CVPR 2024 (Highlight)
- **ArXiv**: 2312.06741
- **Core**: First real-time monocular 3DGS SLAM system
- **Key Innovation**: Joint optimization of camera poses and 3D Gaussian map via differentiable rendering; replaces implicit map representation in traditional SLAM with explicit 3DGS; real-time performance with high-quality rendering
- **Links**: [中英摘要](https://arxiv.org/abs/2312.06741) | [arXiv:2312.06741](https://arxiv.org/abs/2312.06741) | [Code](https://github.com/muskie82/MonoGS)

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
- **Links**: [中英摘要](https://arxiv.org/abs/2504.03886) | [arXiv:2504.03886](https://arxiv.org/abs/2504.03886) | [Code](https://github.com/JokerJohn/WildGS-SLAM)

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
- **Links**: [中英摘要](https://arxiv.org/abs/2604.22339) | [arXiv:2604.22339](https://arxiv.org/abs/2604.22339) | [Code]

### EvFlow-GS
- **Paper**: EvFlow-GS: Event Enhanced Motion Deblurring with Optical Flow for 3D Gaussian Splatting
- **Authors**: Feiyu An, Yufei Deng, Zihui Zhang, Rong Xiao
- **ArXiv**: 2604.22183
- **Venue**: ICME 2026
- **Core**: Uses event camera data + optical flow to handle motion blur in 3DGS
- **Key Innovation**: Novel combination of event cameras (high temporal resolution) with 3DGS rendering, enabling high-quality reconstruction in high-speed motion scenarios

- **Links**: [中英摘要](https://arxiv.org/abs/2604.22183) | [arXiv:2604.22183](https://arxiv.org/abs/2604.22183) | [Code]

### MAGICIAN
- **Paper**: MAGICIAN: Active Mapping with Gaussian Splatting via Imagined Gaussians
- **Authors**: Shiyao Li, Antoine Guedon, Shizhe Chen, Vincent Lepetit
- **Affiliation**: IP Paris, Inria
- **Venue**: CVPR 2026 (Oral)
- **ArXiv**: 2603.22650
- **Core**: Active mapping agent that imagines unseen regions via imagined Gaussians + beam search for long-horizon planning
- **Key Innovation**: Occupancy prediction -> Gaussian representation -> efficient gain computation via rendering; global-optimal path planning via beam search
- **Links**: [中英摘要](https://arxiv.org/abs/2603.22650) | [arXiv:2603.22650](https://arxiv.org/abs/2603.22650) | [Code](https://shiyao-li.github.io/magician/)
- **Note**: Also relevant to Active Vision category

## Training & Optimization

### Faster-GS
- **Paper**: Faster-GS  → Systematic Acceleration of 3D Gaussian Splatting Training
- **Venue**: CVPR 2026
- **Core**: Systematic benchmark for 3DGS training speed optimization
- **Key Innovation**: Separates engineering optimizations from algorithmic innovations, enabling fair evaluation of 3DGS acceleration methods

### Proxy-GS
- **Paper**: Proxy-GS: Occlusion-Aware Gaussian Splatting via Lightweight Proxy Model
- **Authors**: Zhonghang Zhou (USTC/SJTU), Shanghai AI Lab, NWPU
- **Venue**: CVPR 2026 (Perfect Score)
- **Core**: Lightweight proxy model with occlusion prior for training and inference acceleration
- **Key Innovation**: 2.5x rendering speedup with no accuracy loss; occlusion-aware pruning via proxy model

### Structure-Aware Densification (SIGGRAPH 2026)
- **Paper**: Faster 3D Gaussian Splatting Convergence via Structure-Aware Densification
- **Authors**: Linjie Lyu, Ayush Tewari, Jianchun Chen, Thomas Leimkühler, Christian Theobalt
- **Venue**: SIGGRAPH 2026
- **ArXiv**: 2604.28016
- **Core**: Structure-aware densification replacing heuristic screen-space gradient-based split/clone
- **Key Innovation**: Multi-scale frequency analysis combining structure tensors with Laplacian scale space to estimate dominant frequency; per-Gaussian per-axis frequency violation metric η; anisotropic splitting (vs isotropic); multiview consistency criterion; faster convergence with superior quality especially in high-frequency regions
- **Links**: [中英摘要](https://arxiv.org/abs/2604.28016) | [arXiv:2604.28016](https://arxiv.org/abs/2604.28016) | [Code]

### 3DGS as MCMC
- **Paper**: 3D Gaussian Splatting as Markov Chain Monte Carlo
- **Authors**: Shakiba Kheradmand, et al.
- **Venue**: NeurIPS 2024
- **ArXiv**: 2404.09591
- **Core**: Formulates 3DGS optimization as Markov Chain Monte Carlo sampling
- **Key Innovation**: Reframes Gaussian density control (clone/split/prune) as MCMC sampling moves; provides principled probabilistic foundation for 3DGS optimization
- **Links**: [中英摘要](https://arxiv.org/abs/2404.09591) | [arXiv:2404.09591](https://arxiv.org/abs/2404.09591) | [Code]

### LeGS (Learnable Density Control)
- **Paper**: Beyond Heuristics: Learnable Density Control for 3D Gaussian Splatting
- **Authors**: Zhenhua Ning, Xin Li, Jun Yu, Guangming Lu, Yaowei Wang, Wenjie Pei
- **ArXiv**: 2605.00408
- **Core**: Replaces heuristic density control (clone/split/prune) with fully learnable policy via Reinforcement Learning
- **Key Innovation**: Formulates density control as parameterized policy network optimized via RL; closed-form O(N) reward computation via sensitivity analysis
- **Links**: [中英摘要](https://arxiv.org/abs/2605.00408) | [arXiv:2605.00408](https://arxiv.org/abs/2605.00408) | [Code](https://github.com/AaronNZH/LeGS)

### GEMM-GS
- **Paper**: GEMM-GS: Accelerating 3D Gaussian Splatting on Tensor Cores with GEMM-Compatible Blending
- **Authors**: Haomin Li, Bowen Zhu, Fangxin Liu, Zongwu Wang, Xinran Liang, Li Jiang, Haibing Guan
- **Venue**: DAC 2026
- **ArXiv**: 2604.02120
- **Core**: Reformulates 3DGS blending into GEMM-compatible form to utilize GPU Tensor Cores
- **Key Innovation**: First method to exploit Tensor Cores for 3DGS; 1.42x speedup; three-stage double-buffered CUDA pipeline
- **Links**: [中英摘要](https://arxiv.org/abs/2604.02120) | [arXiv:2604.02120](https://arxiv.org/abs/2604.02120) | [Code](https://github.com/shieldforever/GEMM-GS)

### Hybrid-Capture Two-View Training
- **Paper**: Two-View Accumulation as the Primary Training Lever for Hybrid-Capture Gaussian Splatting
- **Authors**: Sungjun Cho
- **ArXiv**: 2605.00052
- **Core**: Training strategy analysis for hybrid-capture 3DGS (aerial drone + ground-level views)
- **Key Innovation**: Two-view-per-step as dominant lever; variance-decomposition framework; transfers to Scaffold-GS and Pixel-GS
- **Links**: [中英摘要](https://arxiv.org/abs/2605.00052) | [arXiv:2605.00052](https://arxiv.org/abs/2605.00052) | [Code]

### YOGO (You Only Gaussian Once)
- **Paper**: You Only Gaussian Once: Controllable 3D Gaussian Splatting for Ultra-Densely Sampled Scenes
- **Authors**: Jinrang Jia, Zhenjia Li, Yifeng Shi
- **ArXiv**: 2604.21400
- **Core**: System-level framework reformulating stochastic Gaussian growth into deterministic budget-aware equilibrium
- **Key Innovation**: Budget controller for resource allocation + availability-registration for multi-sensor fusion
- **Links**: [中英摘要](https://arxiv.org/abs/2604.21400) | [arXiv:2604.21400](https://arxiv.org/abs/2604.21400) | [Code](https://jjrcn.github.io/yogo-project-home/)

### VkSplat
- **Paper**: VkSplat: High-Performance 3DGS Training in Vulkan Compute
- **Authors**: Jingxiang Chen, Mohamed Ibrahim, Yang Liu
- **Venue**: Eurographics 2026 Short Papers
- **ArXiv**: 2605.00219
- **Core**: First fully-Vulkan-based 3DGS training pipeline achieving SOTA performance
- **Key Innovation**: 3.3x speed and 33% VRAM reduction over CUDA+PyTorch baseline; cross-vendor GPU compatibility
- **Links**: [中英摘要](https://arxiv.org/abs/2605.00219) | [arXiv:2605.00219](https://arxiv.org/abs/2605.00219) | [Code](https://github.com/harry7557558/vksplat)

## Simulation & Robotics

### GS-Playground
- **Paper**: GS-Playground: A High-Throughput Photorealistic Simulator for Vision-Informed Robot Learning
- **Authors**: Yufei Jia, Heng Zhang, Ziheng Zhang, et al. (42 authors)
- **Venue**: RSS 2026
- **ArXiv**: 2604.25459
- **Core**: Multi-modal simulation framework integrating batch 3DGS rendering with parallel physics engine
- **Key Innovation**: 10^4 FPS throughput at 640x480; automated Real2Sim workflow for photorealistic simulation-ready environments; bridges perceptual and physical gaps
- **Links**: [中英摘要](https://arxiv.org/abs/2604.25459) | [arXiv:2604.25459](https://arxiv.org/abs/2604.25459) | [Code](https://gsplayground.github.io)


### GS-Surrogate
- **Paper**: GS-Surrogate: Deformable Gaussian Splatting for Parameter Space Exploration of Ensemble Simulations
- **Authors**: Ziwei Li, Rumali Perera, Angus Forbes, Ken Moreland, Dave Pugmire, Scott Klasky, Wei-Lun Chao, Han-Wei Shen
- **ArXiv**: 2604.06358
- **Core**: Deformable GS-based visualization surrogate for parameter-space exploration of ensemble simulations
- **Key Innovation**: Canonical Gaussian field + sequential parameter-conditioned deformations; real-time exploration; enables isosurface extraction and transfer function editing
- **Links**: [中英摘要](https://arxiv.org/abs/2604.06358) | [arXiv:2604.06358](https://arxiv.org/abs/2604.06358) | [Code]

### 3DGS Demo Synthesis (IL)
- **Paper**: A Principled Approach for Creating High-fidelity Synthetic Demonstrations for Imitation Learning
- **Authors**: Moniruzzaman Akash, Momotaz Begum
- **ArXiv**: 2605.01232
- **Core**: Uses 3DGS reconstruction for generating diverse task demonstrations for imitation learning
- **Key Innovation**: Expert trajectory via DMPs retargeted to new goals within 3DGS scene; obstacle-aware DMP on continuous density field
- **Links**: [中英摘要](https://arxiv.org/abs/2605.01232) | [arXiv:2605.01232](https://arxiv.org/abs/2605.01232) | [Code]

### TAIL-Safe
- **Paper**: TAIL-Safe: Task-Agnostic Safety Monitoring for Imitation Learning Policies
- **Authors**: Riad Ahmed, Momotaz Begum
- **ArXiv**: 2605.01195
- **Core**: Safety monitoring for IL policies using Gaussian Splatting digital twin
- **Key Innovation**: Lipschitz-continuous Q-value function for safety scores; Nagumo-inspired recovery mechanism
- **Links**: [中英摘要](https://arxiv.org/abs/2605.01195) | [arXiv:2605.01195](https://arxiv.org/abs/2605.01195) | [Code]

## Cross-Domain Applications

### GS-DOT
- **Paper**: GS-DOT: Gaussian Splatting-based Image Reconstruction for Diffuse Optical Tomography
- **Authors**: Jingjing Jiang
- **ArXiv**: 2604.23675
- **Core**: First adaptation of GS algorithms in photon diffusion regime for medical imaging (DOT)
- **Key Innovation**: Replaces ray transport with diffusion functions; absorption coefficients as sparse anisotropic Gaussian primitives; high noise robustness; huge memory reduction vs traditional DOT methods
- **Links**: [中英摘要](https://arxiv.org/abs/2604.23675) | [arXiv:2604.23675](https://arxiv.org/abs/2604.23675) | [Code]

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

- **Links**: [中英摘要](https://arxiv.org/abs/2604.25945) | [arXiv:2604.25945](https://arxiv.org/abs/2604.25945) | [Code]

### FieryGS
- **Paper**: FieryGS: In-the-Wild Fire Synthesis with Physics-Integrated Gaussian Splatting
- **Authors**: Qianfan Shen, Ningxiao Tao, Qiyu Dai, Tianle Chen, Minghan Qin, Yongjie Zhang, Mengyu Chu, Wenzheng Chen, Baoquan Chen
- **Venue**: ICLR 2026
- **ArXiv**: 2605.00177
- **Core**: Physically-based framework integrating combustion simulation and rendering within 3DGS pipeline
- **Key Innovation**: Three coupled modules  → multimodal LLM-based physical material reasoning, efficient volumetric combustion simulation, unified fire+3DGS renderer; supports flame propagation, smoke dispersion, surface carbonization; user-controllable fire intensity, airflow, ignition location

- **Links**: [中英摘要](https://arxiv.org/abs/2605.00177) | [arXiv:2605.00177](https://arxiv.org/abs/2605.00177) | [Code](https://pku-vcl-geometry.github.io/FieryGS/)

### SplAttN
- **Paper**: SplAttN: Bridging 2D and 3D with Gaussian Soft Splatting and Attention for Point Cloud Completion
- **Authors**: Zhaoyang Li, Zhichao You, Tianrui Li
- **Venue**: ICML 2026 Spotlight
- **ArXiv**: 2605.01466
- **Core**: Replaces hard projection with Differentiable Gaussian Splatting for dense, continuous image-plane representation in point cloud completion
- **Key Innovation**: Identifies "Cross-Modal Entropy Collapse"  → hard projection yields extremely sparse support; Gaussian Splatting as continuous density estimation avoids collapsed sparse support, facilitates gradient flow; robust cross-modal connection on KITTI stress test
- **Links**: [中英摘要](https://arxiv.org/abs/2605.01466) | [arXiv:2605.01466](https://arxiv.org/abs/2605.01466) | [Code](https://github.com/zay002/SplAttN)

### Fake3DGS
- **Paper**: Fake3DGS: A Benchmark for 3D Manipulation Detection in Neural Rendering
- **Authors**: Davide Di Nucci, Riccardo Catalini, Guido Borghi, Roberto Vezzani
- **Venue**: ICPR 2026
- **ArXiv**: 2604.27590
- **Core**: First benchmark for detecting 3D manipulations (geometry, appearance, spatial layout) in Gaussian Splatting scenes
- **Key Innovation**: Formalizes concept of 3D fake detection; dataset of manipulated 3DGS scenes with controlled manipulations; demonstrates 2D detectors struggle with 3D manipulation; introduces 3D-aware detection leveraging multi-view coherence and Gaussian features
- **Links**: [中英摘要](https://arxiv.org/abs/2604.27590) | [arXiv:2604.27590](https://arxiv.org/abs/2604.27590) | [Code](https://github.com/iot-unimore/Fake3DGS)

### SandSim
- **Paper**: SandSim: Curve-Guided Gaussian Splatting for Reconstructing Sand Painting Processes
- **Authors**: Yilin Wang, Haojie Huang, Chen Li, Yang Li, Changbo Wang, Chenhui Li
- **ArXiv**: 2604.27572
- **Core**: Reconstructs sand painting process from a single image using curve-guided Gaussian representation
- **Key Innovation**: Strokes modeled as sequences of anisotropic primitives along continuous trajectories; smooth kernels capture soft boundaries; subtractive compositing for light attenuation during sand accumulation; semantic-guided planning for scene decomposition and drawing order
- **Application**: Art process reconstruction, temporal modeling of granular accumulation
- **Links**: [中英摘要](https://arxiv.org/abs/2604.27572) | [arXiv:2604.27572](https://arxiv.org/abs/2604.27572) | [Code]

### RGS (Residual Gaussian Splatting)
- **Paper**: Residual Gaussian Splatting for Ultra Sparse-View CBCT Reconstruction
- **Authors**: Jian Lin, Jiancheng Fang, Shaoyu Wang, Changan Lai, Yikun Zhang, Yang Chen, Qiegen Liu
- **ArXiv**: 2604.27552
- **Core**: Integrates wavelet multi-resolution analysis with 3DGS for ultra sparse-view cone-beam CT reconstruction
- **Key Innovation**: Spectrally-decoupled Gaussian representation  → geometric base component + residual detail component; resolves mismatch between X-ray attenuation non-negativity and bipolar wavelet coefficients; spectral-spatial collaborative optimization; superior fidelity in trabecular and vascular structures
- **Application**: Medical imaging (CBCT reconstruction from sparse views)
- **Links**: [中英摘要](https://arxiv.org/abs/2604.27552) | [arXiv:2604.27552](https://arxiv.org/abs/2604.27552) | [Code]

### RESPIRE (CT-Informed GS for Bronchoscopy)
- **Paper**: Stop Holding Your Breath: CT-Informed Gaussian Splatting for Dynamic Bronchoscopy
- **Authors**: Andrea Dunn Beltran, Daniel Rho, Aarav Mehta, Xinqi Xiong, Raul San Jose Estepar, Ron Alterovitz, Marc Niethammer, Roni Sengupta
- **ArXiv**: 2604.28179
- **Core**: Mesh-anchored Gaussian splatting framework with respiratory-phase-aware deformation for dynamic bronchoscopy
- **Key Innovation**: Paired inhale-exhale CT scans reduce respiratory motion to single scalar breathing phase; lightweight estimator infers breathing phase from endoscopic RGB; eliminates breath-hold protocols; 1.22mm target localization accuracy (within 3mm clinical tolerance); 20x faster training

- **Links**: [中英摘要](https://arxiv.org/abs/2604.28179) | [arXiv:2604.28179](https://arxiv.org/abs/2604.28179) | [Code](https://asdunnbe.github.io/RESPIRE/)

### EmoTaG
- **Paper**: EmoTaG: Emotion-Aware Talking Head Synthesis on Gaussian Splatting with Few-Shot Personalization
- **Authors**: Haolan Xu, Keli Cheng, Lei Wang, Ning Bi, Xiaoming Liu (Michigan State University)
- **Venue**: CVPR 2026
- **ArXiv**: 2603.21332
- **Core**: Few-shot emotion-aware 3D talking head synthesis on Gaussian Splatting
- **Key Innovation**: Reformulates motion prediction in structured FLAME parameter space (not direct Gaussian deformation) for geometric stability; Gated Residual Motion Network (GRMN) captures emotional prosody from audio + supplements head pose/upper-face cues; SOTA in emotional expressiveness, lip sync, visual realism
- **Links**: [中英摘要](https://arxiv.org/abs/2603.21332) | [arXiv:2603.21332](https://arxiv.org/abs/2603.21332) | [Code](https://emotag26.github.io/)


### 3DTV
- **Paper**: 3DTV: A Feedforward Interpolation Network for Real-Time View Synthesis
- **Authors**: Stefan Schulz, Fernando Edelstein, Hannah Droge, Matthias B. Hullin, Markus Plack (University of Bonn)
- **ArXiv**: 2604.11211
- **Core**: Feedforward sparse-view interpolation network for real-time free-viewpoint rendering from only 3 cameras
- **Key Innovation**: Delaunay-based triplet selection; 25ms per frame at 40 FPS; no scene-specific retraining needed

- **Links**: [中英摘要](https://arxiv.org/abs/2604.11211) | [arXiv:2604.11211](https://arxiv.org/abs/2604.11211) | [Code](https://stefanmschulz.github.io/3DTV_webpage/)

### Mobile Phone 3DGS Acquisition (Object-Centered)
- **Paper**: An Object-Centered Data Acquisition Method for 3D Gaussian Splatting using Mobile Phones
- **Authors**: Yuezhe Zhang, Luqian Bai, Mengting Yu, Lei Wei, Shuai Wan, Yifan Zhang
- **ArXiv**: 2604.19216
- **Core**: On-device capture guidance for mobile 3DGS acquisition with real-time spherical coverage feedback
- **Key Innovation**: Area-weighted spherical coverage for uniform viewpoints

- **Links**: [中英摘要](https://arxiv.org/abs/2604.19216) | [arXiv:2604.19216](https://arxiv.org/abs/2604.19216) | [Code]

### RDSplat
- **Paper**: RDSplat: Robust Watermarking Against Diffusion Editing for 3D Gaussian Splatting
- **ArXiv**: 2512.06774
- **Core**: Robust watermarking framework for 3DGS assets resilient against diffusion-based editing
- **Key Innovation**: First watermarking method designed to withstand diffusion model editing operations on 3DGS scenes
- **Links**: [中英摘要](https://arxiv.org/abs/2512.06774) | [arXiv:2512.06774](https://arxiv.org/abs/2512.06774) | [Code]

### Egocentric Dynamic 3DGS Evaluation
- **Paper**: Bringing a Personal Point of View: Evaluating Dynamic 3D Gaussian Splatting for Egocentric Scene Reconstruction
- **Authors**: Jan Warchocki, Xi Wang, Jonas Kulhanek, Jan van Gemert
- **Venue**: EgoVis Workshop @ CVPR 2026
- **ArXiv**: 2604.23803
- **Core**: First systematic evaluation of dynamic monocular 3DGS models on egocentric video (EgoExo4D)
- **Key Innovation**: Finds reconstruction quality consistently lower in egocentric views; gap stems from static content reconstruction
- **Links**: [中英摘要](https://arxiv.org/abs/2604.23803) | [arXiv:2604.23803](https://arxiv.org/abs/2604.23803) | [Code]

### TwinPose
- **Paper**: TwinPose: Person-Specific Subspaces for Multi-View 3D Pose Estimation
- **Authors**: Wenwu Yang et al.
- **Affiliations**: ZJGSU
- **Venue**: SIGGRAPH 2026 Journal Track (ACM TOG)
- **Core**: Multi-view 3D human pose estimation via instance-level twin pose subspaces
- **Key Innovation**: Learns person-specific pose subspaces from 2D detections; 2D-to-3D lifting principle with instance-level adaptation; handles diverse body shapes and poses across multiple views
- **Links**: [GitHub](https://github.com/zgspose)

## Robustness & Restoration

### ArtifactWorld
- **Paper**: ArtifactWorld: Scaling 3D Gaussian Splatting Artifact Restoration via Video Generation Models
- **ArXiv**: 2604.12251
- **Core**: Video generation models for 3DGS rendering artifact restoration at scale
- **Links**: [中英摘要](https://arxiv.org/abs/2604.12251) | [arXiv:2604.12251](https://arxiv.org/abs/2604.12251) | [Code]

### FreeFix
- **Paper**: FreeFix: Boosting 3D Gaussian Splatting via Fine-Tuning-Free Diffusion Models
- **Authors**: Hongyu Zhou, Zisen Shao, Sheng Miao, Pan Wang, Dongfeng Bai, Bingbing Liu, Yiyi Liao
- **ArXiv**: 2601.20857
- **Core**: Fine-tuning-free diffusion model guidance for improving extrapolated 3DGS rendering
- **Key Innovation**: Interleaved 2D-3D refinement; per-pixel confidence mask for targeted improvement; comparable to fine-tuning methods while retaining generalization

- **Links**: [中英摘要](https://arxiv.org/abs/2601.20857) | [arXiv:2601.20857](https://arxiv.org/abs/2601.20857) | [Code]

### Luminance-GS++
- **Paper**: Unifying Color and Lightness Correction with View-Adaptive Curve Adjustment for Robust 3D Novel View Synthesis
- **Authors**: Ziteng Cui, Shuhong Liu, Xiaoyu Dong, Xuangeng Chu, Lin Gu, Ming-Hsuan Yang, Tatsuya Harada
- **ArXiv**: 2602.18322 (TPAMI 2026, journal extension of CVPR 2025)
- **Core**: 3DGS-based robust NVS under diverse illumination conditions
- **Key Innovation**: View-adaptive lightness adjustment + pixel-wise residual refinement; handles low-light, overexposure, chromatic variations; preserves real-time rendering

- **Links**: [中英摘要](https://arxiv.org/abs/2602.18322) | [arXiv:2602.18322](https://arxiv.org/abs/2602.18322) | [Code]


### E2EGS
- **Paper**: E2EGS: Event-to-Edge Gaussian Splatting for Pose-Free 3D Reconstruction
- **Authors**: Yunsoo Kim, Changki Sung, Dasol Hong, Hyun Myung
- **Venue**: CVPR 2026
- **ArXiv**: 2603.14684
- **Core**: Pose-free 3D reconstruction from event camera streams using Gaussian Splatting
- **Key Innovation**: Patch-based temporal coherence analysis extracts edges from noisy events; edge-weighted losses; fully pose-free event-based 3D reconstruction

- **Links**: [中英摘要](https://arxiv.org/abs/2603.14684) | [arXiv:2603.14684](https://arxiv.org/abs/2603.14684) | [Code]
