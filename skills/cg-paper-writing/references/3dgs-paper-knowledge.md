# 3DGS 论文知识库（写作侧）· 9 簇方法格局

> **用途**：为 related-work 定位、方法对比、**基线选择**与**实验设计**提供已核验的方法格局。写作 3DGS/NeRF 论文的 related work 或实验章节时加载。
>
> **数据来源与可信度**：本文件所有方法行均由脚本从技能所在工程的 `data/methods.json`（**单一事实源**）程序化提取，该库已通过 arXiv API 批量核验（唯一 ID 1372 个，可达 1371 个，见 `references/verification-report.md`）。生成日期 2026-10-08。
>
> **与 `<审核>` 的分工**：本文件是「写着什么/比什么」的知识面；引用是否真实由 `references/3dgs-citation-audit.md` 的方法做实时校验。
>
> **深读笔记**：更细的逐篇笔记（含创新点拆解与实验分析）在工程 `references/paper-reading-knowledge-base.md`（9 簇/1678 行），本文件是其 20% 高密度提炼版。

> **红线**：本知识库只含 arXiv 已核验条目；任何表中未出现的方法/编号，如需引用必须先过 `3dgs-citation-audit.md` 的三层校验，不得凭记忆补写。
>
> **重要（引用前必读）**：表中「发表场所」取自 `methods.json` 的**登记值**，其中部分 venue 属待核/有误状态——历史核查已证实过实例：HybridGS 曾误标 CVPR 2025（实为 ICML 2025）、GaussianBeV 曾误标 ECCV 2024（实为 WACV 2025）、GS-Physics 实为 Thermal3D-GS 且应属 ECCV 2024（当时还误标为 CVPR 2025）。**正式引用前务必用 `3dgs-citation-audit.md` 的方法复核「方法名 ↔ arXiv 编号 ↔ venue」三者一致性**，切勿把本表 venue 直接当作已核事实写进文献列表。


---


## 规模口径

- 方法总数 **881**，分类 **23** 类，其中 771 条持有 arXiv 编号（其余 110 条为预印/项目页方法，未登记编号）。
- 下表每簇列出**已核验且有 arXiv 编号**的代表性方法；同簇条目可直接作为对照基线候选。


## 簇 A · 基础表示 / 表面渲染 / 优化 / 加速

**涵盖分类**：Foundation、Optimization、Surface & Rendering、Acceleration　（本簇已核验方法 **145** 条）


**常用数据集与指标**：Mip-NeRF360、Tanks and Temples、Deep Blending、Blender synthetic、ScanNet++；指标以 PSNR/SSIM/LPIPS 为主，并须同时报告 FPS、#Gaussians（显存）与训练时长——该簇 reviewer 最在意「质量与资源的权衡」，只报 PSNR 会被质疑。


**写作可嫁接点**：链条写法：以 3DGS 为原点，按「基元退化/抗锯齿 → 密度控制 → 几何正则 → 硬件防御」分层递进，每层取本簇一条代表方法作为对照；写作时应给出显存/时长表，而非只列画质分数。


**代表性方法（源自已核验 registry）**

| 方法 | arXiv | 发表场所 | 核心思路（据 methods.json desc） |
|---|---|---|---|
| 3DGS | `2308.04079` | SIGGRAPH 2023 | Anisotropic 3D Gaussians with tile-based differentiable rasterization |
| 3DGS-Enhancer | `2410.16266` | NeurIPS 2024 | 2D diffusion priors guiding iterative 3DGS refinement for view-consistent enhancement |
| 6DGS | `2410.04974` | ECCV 2024 | 6-DoF Gaussian Splatting: explicit orientation-aware primitive with full 6D pose parameterization |
| DC-Gaussian | `2405.17705` | NeurIPS 2024 | Reflection separation + degradation-aware training for reflective dashcam 3DGS |
| DisC-GS | `2405.15196` | NeurIPS 2024 | Progressive low-pass + discontinuity boundary detection preventing splat artifacts at edges |
| Ev-GS | `2407.11343` | CVPR 2024 | Event camera-integrated 3DGS for high-speed and HDR scene reconstruction |
| GOF | `2312.13299` | ECCV 2024 | Gaussian Opacity Field: opacity-weighted TSDF fusion for high-fidelity surface extraction from GS |
| GS-PT | `2409.04963` | ECCV 2024 | Gaussian Splatting pre-training: self-supervised representation learning for Gaussian initialization |
| GS2Mesh | `2404.01810` | CVPR 2024 | Surface-regularized GS → mesh extraction with multi-view depth consistency constraints |
| GSDF | `2403.16964` | NeurIPS 2024 | Dual representation: GS guides SDF geometry, SDF provides normal regularization for GS |
| GSurf | `2411.15723` | CVPR 2024 | Gaussian surface reconstruction with SDF-GS hybrid representation for watertight meshes |
| GVKF | `2411.01853` | NeurIPS 2024 | Gaussian Voxel Kernel Functions for highly efficient surface reconstruction via TSDF fusion |
| GaussianImage | `2403.08551` | ECCV 2024 | 2D Gaussian image codec at 1000+ FPS |
| GaussianPretrain | `2411.12452` | CVPR 2024 | Self-supervised pre-training for Gaussian initialization from multi-view features |

*（本簇另有 131 条已核验方法，未在上述表格中列出；需要完整清单请直接查 `data/methods.json`，或用 `scripts/audit_manuscript_citations.py` 检索。）*


## 簇 B · 压缩与流式

**涵盖分类**：Compression & Streaming　（本簇已核验方法 **45** 条）


**常用数据集与指标**：沿用 Mip-NeRF360 / Tanks and Temples；核心指标是压缩倍率（×）、画质损失（ΔPSNR/ΔdB）、解码与流化时延、存储体积（MB）。审稿人期待看到 rate–distortion 曲线与端到端时延，只给单一压缩比往往被认为评测不充分。


**写作可嫁接点**：对比务必放在同一压缩倍率下比画质（或同一画质下比体积）；若方法含熵编码/量化/剪枝多个模块，需补消融证明各模块对 RD 曲线的边际贡献。


**代表性方法（源自已核验 registry）**

| 方法 | arXiv | 发表场所 | 核心思路（据 methods.json desc） |
|---|---|---|---|
| ContextGS | `2405.20721` | NeurIPS 2024 | Anchor-level context model for entropy coding replacing uniform quantization in 3DGS |
| EAGLES | `2312.04564` | ECCV 2024 | Quantized embeddings + coarse-to-fine training + pruning for 10-20x memory compression maintaining quality |
| HAC | `2403.14530` | ECCV 2024 | Hash-grid context modeling, ~100x compression |
| LightGaussian | `2311.17245` | NeurIPS 2024 | Global+local pruning + SVD distillation for 15x compression at 200+ FPS |
| QUEEN | `2412.04469` | NeurIPS 2024 | Quantized efficient encoding for streaming free-viewpoint video with dynamic Gaussians |
| RDO-Gaussian | `2406.01597` | ECCV 2024 | End-to-end rate-distortion optimization: dynamic pruning + ECVQ quantization for 40x+ compression with cont… |
| CompGS | `2311.18159` | CVPR 2025 | Compact GS with learned importance-aware quantization + progressive decoding |
| HybridGS | `2505.01938` | ICML 2025 | Hybrid GS compression combining explicit pruning + implicit neural coding |
| CAGS | `2605.09279` | SIGGRAPH 2026 | Volumetric video (VV) streaming enables real-time, immersive access to remote 3D environments, powering tel… |
| CC-4DGS | `2609.02184` | IEEE TVCG 2026 | Computational deformation and point-cloud compression for storage-efficient dynamic 4DGS; CDF replaces hash… |
| AtlasLC | `2607.26525` | arXiv 2026 | Source-free, training-free compression pipeline for object-centric 3DGS that operates directly on released … |
| CRP-GS | `2609.23005` | arXiv 2026 | Rate-distortion optimized 3DGS compression using cross-representation priors for anchor-level entropy model… |
| CVT-GS | `2609.08730` | arXiv 2026 | Learning to simplify 3DGS with centroidal Voronoi tessellation; reduces Gaussian primitive count |
| CoSAG | `2607.10237` |  | Compact Semantic Anchor Gaussians via training-free rate-distortion coding; closed-form transmittance-weigh… |

*（本簇另有 31 条已核验方法，未在上述表格中列出；需要完整清单请直接查 `data/methods.json`，或用 `scripts/audit_manuscript_citations.py` 检索。）*


## 簇 C · 动态与 4D

**涵盖分类**：Dynamic & 4D　（本簇已核验方法 **85** 条）


**常用数据集与指标**：D-NeRF（合成）、HyperNeRF、NeRF-DS、NVIDIA DyNeRF、CMU-Panoptic；在 PSNR/SSIM/LPIPS 之外必须报告时序一致性与每帧优化/渲染耗时。


**写作可嫁接点**：写作要点：明确区分「形变场建模」与「4D 时空场」两条路线并说明选型理由；实验须覆盖刚体/非刚体、单目/多目场景，缺非刚体评测是常见硬伤。


**代表性方法（源自已核验 registry）**

| 方法 | arXiv | 发表场所 | 核心思路（据 methods.json desc） |
|---|---|---|---|
| 3DGStream | `2403.01444` | CVPR 2024 | 3D Gaussian Stream for real-time radiance field streaming; per-frame 3DGS optimization with temporal consis… |
| 4D-rotor GS | `2402.03307` | SIGGRAPH 2024 | 4D rotor-based Gaussian Splatting; geometric algebra rotors for compact 4D motion representation suitable f… |
| 4DGS | `2310.08528` | CVPR 2024 | 4D anisotropic Gaussians (3D + time) with regularized deformation |
| CoGS | `2312.05664` | CVPR 2024 | Controllable Gaussian Splatting for dynamic scenes; invertible deformation network enables both reconstruct… |
| DN-4DGS | `2410.13607` | NeurIPS 2024 | Denoised deformable network with temporal-spatial aggregation for dynamic scene rendering |
| Deformable-3DGS | `2309.13101` | CVPR 2024 | Deformation field network for 3DGS enabling high-fidelity dynamic scene rendering |
| DreamMesh4D | `2410.06756` | NeurIPS 2024 | Sparse-controlled Gaussian-Mesh hybrid 4D generation |
| Dual-GS | `2409.08353` | ACM ToG 2024 | Dual-stream Gaussian Splatting; separates global and local geometry streams for stable reconstruction of lo… |
| DynMF | `2312.00112` | CVPR 2024 | Dynamic neural motion fields decomposing scene motion into compact basis functions for 4D GS |
| GPS-Gaussian | `2312.02155` | CVPR 2024 | Generalizable Pixel-aligned Gaussian Splatting for novel view synthesis of dynamic scenes; feed-forward pip… |
| Grid4D | `2410.20815` | NeurIPS 2024 | 4D decomposed hash encoding for efficient spatiotemporal Gaussian queries in dynamic GS |
| HDR-GS | `2405.15125` | NeurIPS 2024 | HDR-specific GS luminance encoding + fast tonemapping for 1000x HDR view synthesis |
| HiCoM | `2411.07541` | NeurIPS 2024 | Hierarchical coherent motion for streamable dynamic scene with 3DGS |
| L4GM | `2406.10324` | NeurIPS 2024 | Large-scale feed-forward 4D Gaussian reconstruction from video |

*（本簇另有 71 条已核验方法，未在上述表格中列出；需要完整清单请直接查 `data/methods.json`，或用 `scripts/audit_manuscript_citations.py` 检索。）*


## 簇 D · 前馈式 3DGS

**涵盖分类**：Feed-Forward　（本簇已核验方法 **77** 条）


**常用数据集与指标**：RealEstate10K、ACID、DTU、Objaverse、ScanNet；关键指标是**跨数据集泛化**（未在评测域上训练）的 PSNR/SSIM/LPIPS，以及推理时延；因无 per-scene 优化，务必强调「零优化时间」这一卖点。


**写作可嫁接点**：定位时抓住「是否依赖位姿」「单图/稀疏视图输入」「能否跨域泛化」三个维度；若不依赖相机位姿需显式对照依赖位姿的同类方法，这是本簇最有力的创新切口。


**代表性方法（源自已核验 registry）**

| 方法 | arXiv | 发表场所 | 核心思路（据 methods.json desc） |
|---|---|---|---|
| CAT3D | `2405.10314` | NeurIPS 2024 |  |
| EpipolarFree-GS | `2410.22817` | NeurIPS 2024 | Removing epipolar constraint for generalizable NVS, stronger cross-domain generalization |
| FreeSplat | `2405.17958` | NeurIPS 2024 | Generalizable feed-forward indoor 3DGS with pixel-aligned Gaussian prediction |
| GGN | `2503.16338` | NeurIPS 2024 | Gaussian Graph Network modeling inter-Gaussian relationships with graph neural networks |
| GS-LRM | `2404.19702` | ECCV 2024 | 1B-parameter transformer with zero-shot generalization |
| GeoLRM | `2406.15333` | NeurIPS 2024 | Geometry-aware attention for large reconstruction model generating high-quality 3D Gaussians |
| MVSplat | `2403.14627` | ECCV 2024 | Cost-volume-based 3DGS from 3 sparse views |
| MVSplat360 | `2411.04924` | NeurIPS 2024 | Feed-forward 360-degree scene synthesis from sparse views |
| PixelSplat | `2312.12337` | CVPR 2024 | Epipolar Transformer for feed-forward stereo GS reconstruction from image pairs |
| ReconFusion | `2312.02981` | CVPR 2024 |  |
| AnySplat | `2505.23716` | SIGGRAPH 2025 | In-the-wild feed-forward with appearance/lighting variation handling |
| CUT3R | `2501.12387` | CVPR 2025 |  |
| DepthSplat | `2410.13862` | CVPR 2025 | Stereo-guided depth regularization for feed-forward 3DGS |
| MonST3R | `2410.03825` | ICLR 2025 |  |

*（本簇另有 63 条已核验方法，未在上述表格中列出；需要完整清单请直接查 `data/methods.json`，或用 `scripts/audit_manuscript_citations.py` 检索。）*


## 簇 E · 稀疏视角 / SLAM

**涵盖分类**：Sparse-View、SLAM　（本簇已核验方法 **63** 条）


**常用数据集与指标**：DTU、Tanks and Temples、ScanNet/ScanNet++、Replica、TUM-RGBD、mip-NeRF360；SLAM 侧核心遥测是 ATE RMSE（轨迹误差），重建侧是 Chamfer distance 与 PSNR，并须报告跟踪 FPS 与显存峰值。


**写作可嫁接点**：两条主线要分开写：纯重建（few-shot NVS）强调几何监督；SLAM 强调在线跟踪与闭环。混淆二者是常见写作错误；COLMAP-free 方法须额外声明不依赖外部位姿。


**代表性方法（源自已核验 registry）**

| 方法 | arXiv | 发表场所 | 核心思路（据 methods.json desc） |
|---|---|---|---|
| Binocular3DGS | `2410.18822` | NeurIPS 2024 | Binocular disparity-guided depth + GS joint optimization for sparse views |
| CoR-GS | `2405.12110` | ECCV 2024 | Co-regularization of two randomly initialized GS fields: co-pruning + pseudo-view augmentation for sparse v… |
| DG-SLAM | `2411.08373` | NeurIPS 2024 | Dynamic Gaussian SLAM with hybrid pose optimization for dynamic environments |
| FSGS | `2312.00451` | ECCV 2024 | SRF geometric prior + 3DGS for few-shot view synthesis |
| FewViewGS | `2411.02229` | NeurIPS 2024 | Multi-stage coarse-to-fine training strategy for few-view Gaussian Splatting |
| Gaussian Splatting SLAM | `2312.06741` | CVPR 2024 (Highlight) | First real-time monocular 3DGS SLAM |
| GaussianObject | `2402.10259` | CVPR 2024 | Object-centric GS from sparse views with depth-regularized Gaussian initialization |
| Photo-SLAM | `2311.16728` | CVPR 2024 | Hyper primitives map with explicit geometric features for localization + implicit photometric features; Gau… |
| SCGaussian | `2411.03637` | NeurIPS 2024 | Structure consistency constraint + geometric regularization for sparse-view GS |
| SplaTAM | `2312.02126` | CVPR 2024 | First real-time GS-SLAM: online incremental Gaussians with silhouette mask and rendering-based pose optimiz… |
| CoMapGS | `2503.20998` | CVPR 2025 | Covisibility map-based Gaussian Splatting for sparse-view novel view synthesis and rendering |
| SplatLoc | `2409.14067` | CVPR 2025 | GS-based visual localization with Gaussian-anchored map representation |
| WildGS-SLAM | `2504.03886` | CVPR 2025 | Dynamic environment SLAM with uncertainty-aware mapping |
| Flow4DGS-SLAM | `2604.22339` | CVPR 2026 | Optical flow-guided 4D Gaussian SLAM for dynamic scenes; category-agnostic motion mask; GMM temporal opacit… |

*（本簇另有 49 条已核验方法，未在上述表格中列出；需要完整清单请直接查 `data/methods.json`，或用 `scripts/audit_manuscript_citations.py` 检索。）*


## 簇 F · 具身智能 / 自动驾驶

**涵盖分类**：Embodied AI & Robotics、Autonomous Driving　（本簇已核验方法 **54** 条）


**常用数据集与指标**：nuScenes、Waymo Open、KITTI-360、AI2-THOR / Habitat；指标随任务而异：BEV/占据分割用 IoU、mIoU，导航任务用成功率与 SPL，若含 NVS 则补 PSNR，并报告时延（自动驾驶侧硬约束）。


**写作可嫁接点**：务必把「3DGS 作为场景表示」与「下游任务收益」之间的桥写清楚——只在小规模/仿真环境验证而缺真实数据评测，是审稿常见拒稿点。


**代表性方法（源自已核验 registry）**

| 方法 | arXiv | 发表场所 | 核心思路（据 methods.json desc） |
|---|---|---|---|
| GIC | `2406.14927` | NeurIPS 2024 | Gaussian-Informed Continuum for physical property identification and differentiable simulation |
| GaussNav | `2403.11625` | CVPR 2024 | GS-based navigation with language-guided semantic Gaussian maps for embodied agents |
| GaussianGrasper | `2403.09637` | IEEE T-RO 2024 | Constructing a 3D scene capable of accommodating open-ended language queries, is a pivotal pursuit, particu… |
| ManiGaussian | `2403.08321` | ECCV 2024 | Dynamic Gaussian Splatting for multi-task robotic manipulation — Gaussian world model predicts optimal actions |
| GaussianSSC | `2603.21487` | CVPR 2025 | GS-based 3D semantic scene completion with Gaussian-anchored feature lifting |
| Splat-Nav | `2403.02751` | CVPR 2025 | GS-based navigation with Gaussian-anchored topological maps |
| SplatAD | `2411.16816` | CVPR 2025 | Autonomous driving GS with dynamic object decomposition and sensor simulation |
| SplatSim | `2409.10161` | CVPR 2025 | GS-based sim-to-real transfer for robotic manipulation with photorealistic rendering |
| VR-Robo | `2502.01536` | RAL 2025 | Recent success in legged robot locomotion is attributed to the integration of reinforcement learning and ph… |
| DeGO | `2605.28587` | CVPR | Deformable Gaussian occupancy decoupling rigid and non-rigid motion with factorized 4D VGGT distillation |
| GaussianDWM | `2512.23180` | CVPR 2026 | 3D Gaussian Driving World Model unifying scene understanding + multi-modal generation; task-aware language-… |
| P2GS | `2605.16925` | CVPR 2026 | Physical prior-guided 3DGS: joint HDR radiance + exposure decomposition for photometrically consistent urba… |
| SA-ResGS | `2601.03024` | ECCV 2026 | Self-augmented residual 3DGS for next-best-view selection; SA-Points via triangulation for coverage estimat… |
| SceneSmith | `2602.09153` | ICML 2026 Spotlight | Hierarchical agentic framework for simulation-ready indoor scene generation from natural language; designer… |

*（本簇另有 40 条已核验方法，未在上述表格中列出；需要完整清单请直接查 `data/methods.json`，或用 `scripts/audit_manuscript_citations.py` 检索。）*


## 簇 G · 编辑 / 人体与化身 / 生成

**涵盖分类**：Editing、Human & Avatar、Generation　（本簇已核验方法 **113** 条）


**常用数据集与指标**：Objaverse、ShapeNet、THuman、ZJU-MoCap、PeopleSnapshot；除 PSNR/SSIM/LPIPS 外，生成类须报 FID/KID 与 CLIP score，编辑/风格迁移类常配用户偏好 study 作为主观补充。


**写作可嫁接点**：工作现实的抓手：区分「编辑的局部性与一致性」和「生成的多样性与保真度」两组矛盾；若用 2D 扩散先验，须说明如何缓解多视角不一致（Janus 问题）。


**代表性方法（源自已核验 registry）**

| 方法 | arXiv | 发表场所 | 核心思路（据 methods.json desc） |
|---|---|---|---|
| 3DGS-Avatar | `2312.09228` | CVPR 2024 | Deformable 3DGS for animatable human avatars with pose-conditioned Gaussian deformation |
| Align Your Gaussians | `2312.13763` | CVPR 2024 | Text-to-4D with dynamic 3D Gaussians and composed diffusion models |
| BAD-Gaussians | `2403.11831` | CVPR 2024 | Bundle-adjusted deformation Gaussians for consistent editing across views |
| D-MiSo | `2405.14276` | NeurIPS 2024 | Multi-Gaussians Soup representation for editing dynamic 3D scenes |
| DiffGS | `2410.19657` | NeurIPS 2024 | Functional Gaussian Splatting diffusion in function space (not original space) |
| Director3D | `2406.17601` | NeurIPS 2024 | Text to progressive 3D scene GS generation with camera trajectory planning |
| DreamGaussian | `2309.16653` | ICLR 2024 Oral | SDS text-to-3D with 3DGS prior for orders-of-magnitude speedup |
| ExpressiveGaussianHuman | `2407.03204` | NeurIPS 2024 | Expression-coefficient-driven Gaussian deformation fields for expressive human avatars |
| FlashSplat | `2409.08270` | ECCV 2024 | Alpha blending linearity enables 2D-to-3D GS segmentation as linear programming with closed-form solution (… |
| GAGAvatar | `2410.07971` | NeurIPS 2024 | Generalizable and animatable Gaussian head avatar from monocular video |
| GSGAN | `2406.02968` | NeurIPS 2024 | Hierarchical GAN for direct 3D Gaussian generation |
| GScream | `2404.13679` | ECCV 2024 | Cross-attention feature propagation bridging visible/invisible regions for 3D object removal |
| GauHuman | `2312.02973` | ECCV 2024 | Human-specific GS with SMPL-constrained Gaussian initialization and pose-aware densification |
| GaussCtrl | `2403.08733` | ECCV 2024 | Depth-conditioned attention + progressive editing for controllable GS generation from text/depth |

*（本簇另有 99 条已核验方法，未在上述表格中列出；需要完整清单请直接查 `data/methods.json`，或用 `scripts/audit_manuscript_citations.py` 检索。）*


## 簇 H · 语义 / 跨域 / HDR 重光照

**涵盖分类**：Language & Semantic、Cross-Domain、HDR & Relighting　（本簇已核验方法 **118** 条）


**常用数据集与指标**：ScanNet（语义）、nuScenes（LiDAR 跨域）、以及遥感/医学/显微等跨域数据；语义侧用 mIoU 与开放词汇检索指标，成像跨域用 PSNR/SSIM 与下游任务指标，HDR 侧关注 ΔE 色差、HDR-VDP 或多曝光 PSNR。


**写作可嫁接点**：跨域是本簇最大机会：写清楚「把 GS 引入某新模态解决了该模态什么固有痛点」；语义/语言类需特别注意评测协议是否与 FEATURE-3DGS 系列对齐，否则难以公平比较。


**代表性方法（源自已核验 registry）**

| 方法 | arXiv | 发表场所 | 核心思路（据 methods.json desc） |
|---|---|---|---|
| DDGS-CT | `2406.02518` | NeurIPS 2024 | Direction-disentangled X-ray volume rendering with Gaussian acceleration for CT |
| Feature 3DGS | `2312.03203` | CVPR 2024 | Distilled DINO/SAM features for 3D segmentation/detection |
| GStex | `2409.12954` | ECCV 2024 | Texture-tiled Gaussians with UV-parameterized appearance for editable material and relighting |
| HumanGaussian | `2311.17061` | CVPR 2024 | Text-driven 3D human generation with Gaussian Splatting |
| LangSplat | `2312.16084` | CVPR 2024 | CLIP features stored per-Gaussian for open-vocabulary 3D queries |
| NeuMA | `2410.08257` | NeurIPS 2024 | Neural Material Adaptor replacing SH with physics-constrained material decomposition |
| OpenGaussian | `2406.02058` | NeurIPS 2024 | Per-Gaussian feature distillation for point-level open-vocabulary 3D understanding |
| R2-Gaussian | `2405.20693` | NeurIPS 2024 | GS adapted for Radon transform + X-ray volume rendering for tomographic reconstruction |
| Spec-Gaussian | `2402.15870` | NeurIPS 2024 | Anisotropic Spherical Gaussians replacing SH for view-dependent specular appearance |
| EndoGS | `2401.11535` | CVPR 2025 | Endoscopic scene reconstruction with GS for surgical navigation |
| GS-LLM | `2412.09176` | CVPR 2025 | LLM-guided GS for reasoning-driven 3D scene understanding and manipulation |
| Thermal3D-GS | `2409.08042` | ECCV 2024 | Thermal3D-GS: physics-induced 3D Gaussians for thermal-infrared novel-view synthesis; models atmospheric tr… |
| CapFrame | `2608.30342` | ECCV 2026 | Text-instructed viewpoint localization in 3D Gaussian scenes; geometric pseudo-labels bridge language queri… |
| EmoTaG | `2603.21332` | CVPR 2026 | Few-shot emotion-aware talking head on Gaussian Splatting |

*（本簇另有 104 条已核验方法，未在上述表格中列出；需要完整清单请直接查 `data/methods.json`，或用 `scripts/audit_manuscript_citations.py` 检索。）*


## 簇 I · CAD / 大场景 / 仿真 / 安全 / 世界模型

**涵盖分类**：CAD & Reverse Engineering、Large-Scale、Simulation、Security、World Models & Spatial Intelligence、Robustness　（本簇已核验方法 **71** 条）


**常用数据集与指标**：ABC / ShapeNet（CAD 与逆向工程）、UrbanScene3D / MatrixCity（大场景）、GSO（仿真资产）；几何重建用 Chamfer / mesh IoU，大场景强调显存峰值与分块策略，水印/对抗类报攻击成功率与不可感知性（PSNR），世界模型类则开始出现场景图/规划类涌现指标。


**写作可嫁接点**：这是最「新」也最缺标准的一簇：若选题在此，务必自己定义清楚评测协议并给出理由，同时对照邻近成熟簇（如 SLAM / 生成）的评测做交叉验证，避免审稿人质疑指标不自洽。


**代表性方法（源自已核验 registry）**

| 方法 | arXiv | 发表场所 | 核心思路（据 methods.json desc） |
|---|---|---|---|
| Scaffold-GS | `2312.00109` | ICCV 2023 | Anchor-based structure for efficient large-scale representation |
| 2DGS | `2403.17888` | SIGGRAPH 2024 | 2D disks on surfaces enabling direct mesh extraction via Poisson reconstruction |
| CityGaussian | `2404.01133` | ECCV 2024 | Hierarchical LOD for city-scale real-time rendering |
| DOGS | `2405.13943` | NeurIPS 2024 | Distributed GS with communication-efficient Gaussian consensus for large-scale reconstruction |
| GS-Hider | `2405.15118` | NeurIPS 2024 | Steganography embedding into Gaussian parameters for 3D message hiding, visually lossless |
| GaussianMarker | `2410.23718` | NeurIPS 2024 | Uncertainty-aware watermark embedding + robust extraction for 3DGS copyright protection |
| GeometryCloak | `2410.22705` | NeurIPS 2024 | Geometric perturbation copyright watermark embedding into Gaussians preventing TGS-based 3D reconstruction |
| SCube | `2410.20030` | NeurIPS 2024 | VoxSplats: voxelized splat with hierarchical LOD for large-scale streaming reconstruction |
| Street Gaussians | `2401.01339` | ECCV 2024 | Static/dynamic decomposition for urban street scenes |
| VastGaussian | `2402.17427` | CVPR 2024 | VastGaussian: high-quality large-scene 3DGS reconstruction and real-time rendering via progressive partitio… |
| 3DReflecNet | `2605.10204` | CVPR | Large-scale dataset for 3D reconstruction from reflection-corrupted images |
| AGILE | `2602.04672` | SIGGRAPH | Agentic generation for hand-object interaction reconstruction from video; VLM guides generative model |
| BrepGaussian | `2602.21105` | CVPR 2026 | 3DGS + B-rep CAD reconstruction to parametric STEP models |
| CADFS | `2605.01925` | CVPR 2026 | Large-scale CAD program dataset + LLM-assisted CAD understanding |

*（本簇另有 57 条已核验方法，未在上述表格中列出；需要完整清单请直接查 `data/methods.json`，或用 `scripts/audit_manuscript_citations.py` 检索。）*


---


## 使用约定

1. **先定位后引用**：写 related work 时先在对应簇表格里确认方法归属与编号，再落笔。
2. **基线要同源**：性能对照优先取同簇、同期、已核验条目；跨簇比对须说明可比性。
3. **指标要成套**：按各簇「常用数据集与指标」节成套报告，避免只报单一分数被质疑评测不充分。 
4. **不确定即停用**：表中没有的方法/编号，先经 `3dgs-citation-audit.md` 校验；无法核实的宁可删引，不可凭印象补写（本项目核查协议第 6 条）。