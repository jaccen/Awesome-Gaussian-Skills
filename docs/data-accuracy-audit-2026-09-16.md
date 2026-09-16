# 知识库准确性审计报告 — 2026-09-16

> 审计对象：`data/methods.json` 全库 858 条方法（其中 747 条带 arXiv ID）。
> 审计方式：arXiv 官方 API 逐条核验（ID 可达性 + 标题/摘要名称一致性 + 名称反查）。
> 审计结论：**747 个 arXiv ID 无一虚构**，但 **242 条（32%）存在名实不符**，其中 66 条确认链接到无关论文。

## 一、总体结论

| 检查项 | 结果 | 判定 |
|--------|------|------|
| arXiv ID 可达性（747 条逐条查询） | 747 / 747 命中，0 条不存在 | ✅ 通过 |
| v0.8.4 新增 39 篇 ID 可达性 | 39 / 39 命中 | ✅ 通过 |
| v0.8.4 新增 39 篇方法名 vs 论文标题 | 34 条标题直含；3 条摘要含方法名；2 条为描述性命名 | ✅ 通过 |
| v0.8.4 会议声明（ECCV/TVCG/PG 2026 共 5 条） | 5 / 5 与论文 comment/journal_ref 一致 | ✅ 通过 |
| 全库方法名 vs 所链接论文（747 条） | 493 条名称出现在论文标题/摘要中 | ⚠️ 66% |
| ↳ 名称在 arXiv 存在但链接论文无关 | **66 条** | ❌ 需修正 |
| ↳ 名称在 arXiv 无对应论文（疑似虚构） | **176 条** | ❌ 需处置 |

**核心风险**：知识库对外宣称「zero fabrication / 零虚构」。经本次审计，编号层面确实零虚构，
但**名称与论文的对应关系**存在系统性错配——部分条目的方法名在 arXiv 上并不存在（如 `AnchorGS`、
`DensifyGS`、`GaussCalib`、`GS-Fed`），部分条目把真实方法名挂到了完全无关的论文上
（如 `Scaffold-GS` 指向一篇纯数学论文《Toda brackets in n-angulated categories》）。
建议在对外的「零虚构」表述中同步修正口径。

## 二、审计方法

1. **ID 可达性**：以 `data/methods.json` 中 747 个去重 arXiv ID 分批（90 个/批）调用 arXiv Atom API，
   统计 `totalResults` 与实际返回条目，任一条目缺失即判定为虚构编号。
2. **名称一致性**：将方法名与论文 `title + summary` 归一化（去除非字母数字、转小写）后做子串包含判断。
   缩写类别名（如 `3DGS` ↔ *3D Gaussian Splatting*）会因此被判为不匹配，故需二次判别。
3. **名称反查**：对全部不匹配的名称，用 `ti:"<名称>"` 在 arXiv 检索其是否为真实论文名。
   - 检索到 + 库内 ID 指向另一篇论文 → **A 类：ID 挂错**（方法名真实，链接错误）
   - 检索不到 + 库内 ID 论文标题/摘要也无该名 → **B 类：名称虚构或为内部标签**
4. **会议声明核验**：读取论文 `arxiv:comment` / `arxiv:journal_ref` 字段比对。

## 三、A 类：方法名真实存在，但库内链接到无关论文（66 条）

「库内链接论文」列为该 ID 在 arXiv 的**真实标题**，可据此直接判断错配程度。
「候选正确 ID」列来自 `ti:"<名称>"` 检索首位命中，**多数正确，但存在同名误配**（见下方例外说明），
应用前需逐条二次核验。

| # | 方法名 | 库内 arXiv ID | 该 ID 的真实论文 | 候选正确 ID | 候选论文标题 |
|---|--------|---------------|------------------|-------------|--------------|
| 1 | GaussRender | 2503.07476 | SOGS: Second-Order Anchor for Advanced 3D Gaus… | 2502.05040 | GaussRender: Learning 3D Occupancy with Gaussi… |
| 2 | UniGS | 2406.02720 | 3D-HGS: 3D Half-Gaussian Splatting | 2410.13195 | UniGS: Modeling Unitary 3D Gaussians for Novel… |
| 3 | 6DGS | 2404.13679 | GScream: Learning 3D Geometry and Feature Cons… | 2407.15484 | 6DGS: 6D Pose Estimation from a Single Image a… |
| 4 | 3DGS | 2308.04079 | 3D Gaussian Splatting for Real-Time Radiance F… | 2207.02375 | 3DG-STFM: 3D Geometric Guided Student-Teacher … |
| 5 | EGS | 2503.14198 | RoGSplat: Learning Robust Generalizable Human … | 2508.07003 | EGS-SLAM: RGB-D Gaussian Splatting SLAM with E… |
| 6 | GaussHDR | 2503.18421 | 4DGC: Rate-Aware 4D Gaussian Compression for E… | 2503.10143 | GaussHDR: High Dynamic Range Gaussian Splattin… |
| 7 | GS-Blur | 2408.15708 | Towards Realistic Example-based Modeling via 3… | 2410.23658 | GS-Blur: A 3D Scene-Based Dataset for Realisti… |
| 8 | EMGS | 2403.12550 | RGBD GS-ICP SLAM | 2301.01080 | A Laplacian Gaussian Mixture Model for Surface… |
| 9 | Ev-GS | 2312.07920 | DrivingGaussian: Composite Gaussian Splatting … | 2407.11343 | Ev-GS: Event-based Gaussian splatting for Effi… |
| 10 | GaussianPretrain | 2404.07991 | GoMAvatar: Efficient Animatable Human Modeling… | 2411.12452 | GaussianPretrain: A Simple Unified 3D Gaussian… |
| 11 | CLEAR-NeRF | 2605.28394 | Sketch2Motion: Text-driven 2D Sketch to 3D Ani… | 2605.28125 | CLEAR-NeRF: Collinearity and Local-region Enha… |
| 12 | GS2Mesh | 2403.05087 | SplattingAvatar: Realistic Real-Time Human Ava… | 2404.01810 | GS2Mesh: Surface Reconstruction from Gaussian … |
| 13 | GSurf | 2404.16510 | Interactive3D: Create What You Want by Interac… | 2411.15723 | GSurf: Learning Signed Distance Fields from Sp… |
| 14 | NegGS | 2405.14786 | The TESS-Keck Survey XX: 15 New TESS Planets a… | 2405.18163 | NegGS: Negative Gaussian Splatting |
| 15 | NeuSG | 2311.13398 | Depth-Regularized Optimization for 3D Gaussian… | 2312.00846 | NeuSG: Neural Implicit Surface Reconstruction … |
| 16 | SAGS | 2403.16292 | latentSplat: Autoencoding Variational Gaussian… | 2404.19149 | SAGS: Structure-Aware 3D Gaussian Splatting |
| 17 | SuGaR | 2312.13253 | Conditional Image Generation with Pretrained G… | 2404.01491 | SUGAR: Pre-training 3D Visual Representations … |
| 18 | SuperGS | 2311.16099 | GART: Gaussian Articulated Template Models | 2410.02571 | SuperGS: Super-Resolution 3D Gaussian Splattin… |
| 19 | CompGS | 2411.06019 | GaussianSpa: An "Optimizing-Sparsifying" Simpl… | 2311.18159 | CompGS: Smaller and Faster Gaussian Splatting … |
| 20 | HGS | 2411.12089 | FruitNinja: 3D Object Interior Texture Generat… | 2403.20159 | HGS-Mapping: Online Dense Mapping Using Hybrid… |
| 21 | HybridGS | 2411.11921 | DeSiRe-GS: 4D Street Gaussians for Static-Dyna… | 2412.03844 | HybridGS: Decoupling Transients and Statics wi… |
| 22 | LRG | 2504.00387 | Scene4U: Hierarchical Layered 3D Scene Reconst… | 2411.17623 | Constraining primordial non-Gaussianity with D… |
| 23 | CityGaussian | 2401.02379 | Detection and Discovery of Misinformation Sour… | 2404.01133 | CityGaussian: Real-time High-quality Large-Sca… |
| 24 | Scaffold-GS | 2312.13209 | Toda brackets in n-angulated categories | 2312.00109 | Scaffold-GS: Structured 3D Gaussians for View-… |
| 25 | GeoSplat | 2412.16604 | OmniSplat: Taming Feed-Forward 3D Gaussian Spl… | 2410.24204 | GeoSplatting: Towards Geometry Guided Gaussian… |
| 26 | SplatFormer | 2412.20522 | MaskGaussian: Adaptive 3D Gaussian Representat… | 2411.06390 | SplatFormer: Point Transformer for Robust 3D G… |
| 27 | GS-LLM | 2412.06767 | MAtCha Gaussians: Atlas of Charts for High-Qua… | 2412.09176 | LIVE-GS: LLM Powers Interactive VR Experience … |
| 28 | GaussianDreamer | 2312.05941 | ASH: Animatable Gaussian Splats for Efficient … | 2310.08529 | GaussianDreamer: Fast Generation from Text to … |
| 29 | GaussianSSC | 2503.17032 | TaoAvatar: Real-Time Lifelike Full-Body Talkin… | 2603.21487 | GaussianSSC: Triplane-Guided Directional Gauss… |
| 30 | SplatAD | 2503.08352 | Mitigating Ambiguities in 3D Classification wi… | 2411.16816 | SplatAD: Real-Time Lidar and Camera Rendering … |
| 31 | GaussianBeV | 2403.11056 | Analytic-Splatting: Anti-Aliased 3D Gaussian S… | 2407.14108 | GaussianBeV: 3D Gaussian Representation meets … |
| 32 | MotionDreamer | 2606.01518 | SkelMo: Universal Skeletal Motion Generation f… | 2405.20155 | MotionDreamer: Exploring Semantic Video Diffus… |
| 33 | FlowGS | 2412.00578 | Speedy-Splat: Fast 3D Gaussian Splatting with … | 2609.17039 | Bi-FlowGS: Bridging Generative View Completion… |
| 34 | GaussianFlow | 2411.18625 | Textured Gaussians for Enhanced 3D Scene Appea… | 2403.12365 | GaussianFlow: Splatting Gaussian Dynamics for … |
| 35 | STG | 2411.19235 | InstanceGaussian: Appearance-Semantic Joint Ga… | 2510.22140 | STG-Avatar: Animatable Human Avatars via Space… |
| 36 | Deformable-3DGS | 2311.12775 | SuGaR: Surface-Aligned Gaussian Splatting for … | 2603.28152 | ObjectMorpher: 3D-Aware Image Editing via Defo… |
| 37 | DynMF | 2311.16096 | Animatable and Relightable Gaussians for High-… | 2312.00112 | DynMF: Neural Motion Factorization for Real-ti… |
| 38 | SAGD | 2407.15070 | GPHM: Gaussian Parametric Head Model for Monoc… | 2401.17857 | SAGD: Boundary-Enhanced Segment Anything in 3D… |
| 39 | GStex | 2403.04116 | Radiative Gaussian Splatting for Efficient X-r… | 2409.12954 | GStex: Per-Primitive Texturing of 2D Gaussian … |
| 40 | GaussFusion | 2503.20998 | CoMapGS: Covisibility Map-based Gaussian Splat… | 2603.25053 | GaussFusion: Improving 3D Reconstruction in th… |
| 41 | SplatLoc | 2503.18107 | PanoGS: Gaussian-based Panoptic Segmentation f… | 2409.14067 | SplatLoc: 3D Gaussian Splatting-based Visual L… |
| 42 | CoR-GS | 2401.00834 | Deblurring 3D Gaussian Splatting | 2405.12110 | CoR-GS: Sparse-View 3D Gaussian Splatting via … |
| 43 | GaussianObject | 2312.11461 | GAvatar: Animatable 3D Gaussian Avatars with I… | 2402.10259 | GaussianObject: High-Quality 3D Object Reconst… |
| 44 | FlashWorld | 2510.13677 | APRIL: Auxiliary Physically-Redundant Informat… | 2510.13678 | FlashWorld: High-quality 3D Scene Generation w… |
| 45 | GaussianBody | 2412.10972 | DCSEG: Decoupled 3D Open-Set Segmentation usin… | 2401.09720 | GaussianBody: Clothed Human Reconstruction via… |
| 46 | SplatFace | 2412.10209 | GAF: Gaussian Avatar Reconstruction from Monoc… | 2403.18784 | SplatFace: Gaussian Splat Face Reconstruction … |
| 47 | SplatPose | 2412.09511 | GEAL: Generalizable 3D Affordance Learning wit… | 2404.06832 | SplatPose &amp; Detect: Pose-Agnostic 3D Anoma… |
| 48 | SplatTalk | 2503.24382 | Free360: Layered Gaussian Splatting for Unboun… | 2503.06271 | SplatTalk: 3D VQA with Gaussian Splatting |
| 49 | 3DGS-Avatar | 2310.08529 | GaussianDreamer: Fast Generation from Text to … | 2312.09228 | 3DGS-Avatar: Animatable Avatars via Deformable… |
| 50 | BAGS | 2403.14166 | Mini-Splatting: Representing Scenes with a Con… | 2403.04926 | BAGS: Blur Agnostic Gaussian Splatting through… |
| 51 | GauHuman | 2403.16095 | CG-SLAM: Efficient Dense RGB-D SLAM in a Consi… | 2312.02973 | GauHuman: Articulated Gaussian Splatting from … |
| 52 | SplatArmor | 2311.13681 | Compact 3D Gaussian Representation for Radianc… | 2311.10812 | SplatArmor: Articulated Gaussian splatting for… |
| 53 | VEGS | 2406.06526 | Generative Gaussian Splatting for Unbounded 3D… | 2407.02945 | VEGS: View Extrapolation of Urban Scenes in 3D… |
| 54 | BAD-Gaussians | 2401.06116 | Gaussian Shadow Casting for Neural Characters | 2403.11831 | BAD-Gaussians: Bundle Adjusted Deblur Gaussian… |
| 55 | GaussCtrl | 2311.16043 | Relightable 3D Gaussians: Realistic Point Clou… | 2403.08733 | GaussCtrl: Multi-View Consistent Text-Driven 3… |
| 56 | GScream | 2404.15264 | TalkingGaussian: Structure-Persistent 3D Talki… | 2404.13679 | GScream: Learning 3D Geometry and Feature Cons… |
| 57 | InFusion | 2403.06908 | FreGS: 3D Gaussian Splatting with Progressive … | 2404.11613 | InFusion: Inpainting 3D Gaussians via Learning… |
| 58 | StylizedGS | 2407.07220 | Reference-based Controllable Scene Stylization… | 2404.05220 | StylizedGS: Controllable Stylization for 3D Ga… |
| 59 | VR-GS | 2407.12777 | Generalizable Human Gaussians for Sparse View … | 2401.16663 | VR-GS: A Physical Dynamics-Aware Interactive G… |
| 60 | EndoGS | 2502.01846 | UVGS: Reimagining Unstructured 3D Gaussian Spl… | 2401.11535 | EndoGS: Deformable Endoscopic Tissues Reconstr… |
| 61 | RAF | 2605.25980 | Reversible-jump MCMC reveals binary black hole… | 2607.04587 | RAF: Reliability-Aware Fusion of Camera, LiDAR… |
| 62 | GS-Physics | 2410.08107 | IncEventGS: Pose-Free Gaussian Splatting from … | 2409.08042 | Thermal3D-GS: Physics-induced 3D Gaussians for… |
| 63 | Splat-Nav | 2504.06978 | Wheat3DGS: In-field 3D Reconstruction, Instanc… | 2403.02751 | Splat-Nav: Safe Real-Time Robot Navigation in … |
| 64 | SplatSim | 2406.10219 | PUP 3D-GS: Principled Uncertainty Pruning for … | 2409.10161 | SplatSim: Zero-Shot Sim2Real Transfer of RGB M… |
| 65 | GaussNav | 2403.12722 | HUGS: Holistic Urban 3D Scene Understanding vi… | 2403.11625 | GaussNav: Gaussian Splatting for Visual Naviga… |
| 66 | ManiGaussian | 2403.08498 | Gaussian Splatting in Style | 2403.08321 | ManiGaussian: Dynamic Gaussian Splatting for M… |

### A 类中的同名误配例外（候选列不可直接采用）

| 方法名 | 候选列给出的论文 | 问题 |
|--------|------------------|------|
| `3DGS` | 3DG-STFM（特征匹配） | 同名启发式命中，库内 2308.04079 实为 3DGS 原论文，**库内正确** |
| `SuGaR` | SUGAR（机器人预训练） | 与表面重建 SuGaR 同名不同物，需另查正确 ID |
| `EMGS` | 表面肌电信号的高斯混合模型 | 非 3DGS 论文，误配 |
| `LRG` | DESI 2024 星系巡天原初非高斯性 | 宇宙学论文，误配 |
| `RAF` | 相机/激光雷达/4D 雷达融合 | 与库内 2605.25980 指向不同论文，需人工判定 |
| `GS-LLM` | LIVE-GS | 名称与论文不符 |
| `GS-Physics` | Thermal3D-GS | 名称与论文不符 |
| `Deformable-3DGS` | ObjectMorpher | 名称与论文不符 |
| `STG` | STG-Avatar | 需判定是同一方法还是不同工作 |
| `FlowGS` | Bi-FlowGS | Bi-FlowGS 已于 v0.8.4 单独收录，存在重复风险 |
| `HGS` | HGS-Mapping | 需判定是否为同一方法 |

## 四、B 类：方法名在 arXiv 无对应论文（176 条）

此类条目所链接的 arXiv ID 均为真实论文，但论文标题与摘要都不含该条目名称。
其中包含三类情形，需分别处置：

1. **内部标签**（如 `Survey-GS-SLAM`、`Survey-GS-Medical`）——作为分类锚点使用，但指向了不相关的综述论文；
2. **描述性命名**（如 `Dual Contouring of SDF`、`Point Cloud Upsampling for 3DGS`）——名称由论文标题改写，属可接受的别名；
3. **疑似虚构方法名**（如 `AnchorGS`、`DensifyGS`、`GaussCalib`、`GS-Fed`、`PruneGS`、`NoiseGS`）——arXiv 上不存在该方法名。

| # | 方法名 | 库内 arXiv ID | 所链接论文的真实标题 | 类别 |
|---|--------|---------------|----------------------|------|
| 1 | 3D Representation Survey | 2606.04871 | Recent Advances and Trends in Learning-based 3D Representation… | Foundation |
| 2 | Neural 3D Mesh Texturing Survey | 2606.00137 | Advances in Neural 3D Mesh Texturing: A Survey | Foundation |
| 3 | OGS | 2503.12886 | RGBAvatar: Reduced Gaussian Blendshapes for Online Modeling of… | Foundation |
| 4 | Survey-GS-Medical | 2505.05474 | 3D Scene Generation: A Survey | Foundation |
| 5 | Survey-GS-Physics | 2508.09977 | A Survey on 3D Gaussian Splatting Applications: Segmentation, … | Foundation |
| 6 | Survey-GS-SLAM | 2502.19457 | Compression in 3D Gaussian Splatting: A Survey of Methods, Tre… | Foundation |
| 7 | Survey-GS-Surface | 2503.08166 | Dynamic Scene Reconstruction: Recent Advance in Real-time Rend… | Foundation |
| 8 | Survey-GS-4D | 2407.09510 | 3DGS.zip: A survey on 3D Gaussian Splatting Compression Method… | Foundation |
| 9 | Survey-GS-Compress | 2405.03417 | Gaussian Splatting: 3D Reconstruction and Novel View Synthesis… | Foundation |
| 10 | Survey-GS-Gen | 2412.06257 | Advancing Extended Reality with 3D Gaussian Splatting: Innovat… | Foundation |
| 11 | Survey-GS-NeRF | 2402.07181 | 3D Gaussian as a New Era: A Survey | Foundation |
| 12 | Survey-GS-Render | 2410.12262 | 3D Gaussian Splatting in Robotics: A Survey | Foundation |
| 13 | Survey-GS-Seg | 2403.11134 | Recent Advances in 3D Gaussian Splatting | Foundation |
| 14 | Survey-GS-Urban | 2407.17418 | 3D Gaussian Splatting: Survey, Technologies, Challenges, and O… | Foundation |
| 15 | Survey-GS-ZJU | 2401.03890 | A Survey on 3D Gaussian Splatting | Foundation |
| 16 | EulerianGS | 2605.29136 | Eulerian Gaussian Splatting using Hashed Probability Pyramids | Optimization |
| 17 | Point Cloud Upsampling for 3DGS | 2606.00450 | Optimizing 3D Gaussian Splatting via Point Cloud Upsampling | Optimization |
| 18 | 3DGS squared | 2501.13975 | 3DGS$^2$: Near Second-order Converging 3D Gaussian Splatting | Optimization |
| 19 | AnchorGS | 2503.04314 | S2Gaussian: Sparse-View Super-Resolution 3D Gaussian Splatting | Optimization |
| 20 | DensifyGS | 2503.05082 | Taming Video Diffusion Prior with Scene-Grounding Guidance for… | Optimization |
| 21 | DGD-v2 | 2412.03844 | HybridGS: Decoupling Transients and Statics with 2D and 3D Gau… | Optimization |
| 22 | EventGS | 2503.19976 | Thin-Shell-SfT: Fine-Grained Monocular Non-rigid 3D Surface Tr… | Optimization |
| 23 | GaussCalib | 2504.09491 | DropoutGS: Dropping Out Gaussians for Better Sparse-view Rende… | Optimization |
| 24 | GaussianPrior | 2504.01957 | Toward Real-world BEV Perception: Depth Uncertainty Estimation… | Optimization |
| 25 | GausSR | 2503.08224 | HRAvatar: High-Quality and Relightable Gaussian Head Avatar | Optimization |
| 26 | GS-Aug | 2503.03115 | NTR-Gaussian: Nighttime Dynamic Thermal Reconstruction with 4D… | Optimization |
| 27 | GS-Fed | 2504.09097 | BIGS: Bimanual Category-agnostic Interaction Reconstruction fr… | Optimization |
| 28 | GS-HDA | 2406.04251 | Improving Gaussian Splatting with Localized Points Management | Optimization |
| 29 | GS-Uncertainty | 2503.21816 | EVPGS: Enhanced View Prior Guidance for Splatting-based Extrap… | Optimization |
| 30 | GS-Wild-v2 | 2503.18402 | DashGaussian: Optimizing 3D Gaussian Splatting in 200 Seconds | Optimization |
| 31 | NoiseGS | 2503.18682 | Hardware-Rasterized Ray-Based Gaussian Splatting | Optimization |
| 32 | PruneGS | 2503.05484 | DecoupledGaussian: Object-Scene Decoupling for Physics-Based I… | Optimization |
| 33 | 3DGS as MCMC | 2404.09591 | 3D Gaussian Splatting as Markov Chain Monte Carlo | Optimization |
| 34 | EffectiveRank-GS | 2406.11672 | Effective Rank Analysis and Regularization for Enhanced 3D Gau… | Optimization |
| 35 | EG3DGS | 2312.04820 | Learn to Optimize Denoising Scores for 3D Generation: A Unifie… | Optimization |
| 36 | GaussianDark | 2406.08300 | From Chaos to Clarity: 3DGS in the Dark | Optimization |
| 37 | GaussianSea | 2404.06270 | 3D Geometry-aware Deformable Gaussian Splatting for Dynamic Vi… | Optimization |
| 38 | GeCGS | 2403.13327 | Gaussian Splatting on the Move: Blur and Rolling Shutter Compe… | Optimization |
| 39 | GeoAugmentGS | 2311.16037 | GaussianEditor: Editing 3D Gaussians Delicately with Text Inst… | Optimization |
| 40 | GS-Wild | 2403.15704 | Gaussian in the Wild: 3D Gaussian Splatting for Unconstrained … | Optimization |
| 41 | PUP-3DGS | 2403.12957 | GVGEN: Text-to-3D Generation with Volumetric Representation | Optimization |
| 42 | SuperSplat | 2409.16504 | Low Latency Point Cloud Rendering with Learned Splatting | Optimization |
| 43 | SwagGS | 2401.02436 | Compressed 3D Gaussian Splatting for Accelerated Novel View Sy… | Optimization |
| 44 | Dual Contouring of SDF | 2604.00157 | Dual Contouring of Signed Distance Data | Surface & Rendering |
| 45 | HiFi-SurfSplat | 2605.07254 | High-Fidelity Surface Splatting-Based 3D Reconstruction from M… | Surface & Rendering |
| 46 | HSP | 2606.04891 | Hierarchical Space Partition for Surface Reconstruction | Surface & Rendering |
| 47 | GaussianOpacityFields | 2401.15318 | Gaussian Splashing: Unified Particles for Versatile Motion Syn… | Surface & Rendering |
| 48 | GaussMesh | 2412.14963 | IDOL: Instant Photorealistic 3D Human Creation from a Single I… | Surface & Rendering |
| 49 | SplatNeRF | 2503.19458 | GaussianUDF: Inferring Unsigned Distance Functions through 3D … | Surface & Rendering |
| 50 | GaussianShell | 2403.15530 | Pixel-GS: Density Control with Pixel-aware Gradient for 3D Gau… | Surface & Rendering |
| 51 | GaussianShell-CVPR | 2403.06912 | DNGaussian: Optimizing Sparse-View 3D Gaussian Radiance Fields… | Surface & Rendering |
| 52 | RelaxingAccurate | 2311.14521 | GaussianEditor: Swift and Controllable 3D Editing with Gaussia… | Surface & Rendering |
| 53 | ShapeGS | 2311.12198 | PhysGaussian: Physics-Integrated 3D Gaussians for Generative D… | Surface & Rendering |
| 54 | GaussianCodec | 2411.14716 | VisionPAD: A Vision-Centric Pre-training Paradigm for Autonomo… | Compression & Streamin… |
| 55 | GS-Stream | 2411.14974 | 3D Convex Splatting: Radiance Field Rendering with 3D Smooth C… | Compression & Streamin… |
| 56 | GSQ | 2411.17190 | SelfSplat: Pose-Free and 3D Prior-Free Generalizable 3D Gaussi… | Compression & Streamin… |
| 57 | SOG-GS | 2411.16443 | SplatFlow: Multi-View Rectified Flow Model for 3D Gaussian Spl… | Compression & Streamin… |
| 58 | SpqGS | 2411.16816 | SplatAD: Real-Time Lidar and Camera Rendering with 3D Gaussian… | Compression & Streamin… |
| 59 | SpreG | 2411.10504 | USP-Gaussian: Unifying Spike-based Image Reconstruction, Pose … | Compression & Streamin… |
| 60 | VQGS | 2411.17067 | Geometry Field Splatting with Gaussian Surfels | Compression & Streamin… |
| 61 | ZipGS | 2411.16785 | MAGiC-SLAM: Multi-Agent Gaussian Globally Consistent SLAM | Compression & Streamin… |
| 62 | CompactGS | 2404.04908 | Dual-Camera Smooth Zoom on Mobile Phones | Compression & Streamin… |
| 63 | FAD-GS | 2404.10625 | Gaussian Splatting Decoder for 3D-aware Generative Adversarial… | Compression & Streamin… |
| 64 | Sp2403GS | 2312.09147 | Triplane Meets Gaussian Splatting: Fast and Generalizable Sing… | Compression & Streamin… |
| 65 | IPU-GS | 2607.15951 | Rendering 3D Gaussians on a Graph Processor | Acceleration |
| 66 | CityGS-v2 | 2503.10437 | 4D LangSplat: 4D Language Gaussian Splatting via Multimodal La… | Large-Scale |
| 67 | GaussianCity | 2502.11801 | 3D Gaussian Inpainting with Depth-Guided Cross-View Consistenc… | Large-Scale |
| 68 | Scaffold-v3 | 2503.06900 | DirectTriGS: Triplane-based Gaussian Splatting Field Represent… | Large-Scale |
| 69 | MegaGaussian | 2404.14410 | Guess The Unseen: Dynamic 3D Scene Reconstruction from Partial… | Large-Scale |
| 70 | VG²GT | 2606.01573 | $\text{VG}^2$GT: Voxel-Gaussian Splatting Visual Geometry Grou… | Feed-Forward |
| 71 | EpiSplat | 2403.09434 | Reconstruction and Simulation of Elastic Objects with Spring-M… | Feed-Forward |
| 72 | GPSGaussian | 2312.00112 | DynMF: Neural Motion Factorization for Real-time Dynamic View … | Feed-Forward |
| 73 | SplatterVideo | 2406.13870 | Splatter a Video: Video Gaussian Representation for Versatile … | Feed-Forward |
| 74 | GaussScene | 2412.06273 | Omni-Scene: Omni-Gaussian Representation for Ego-Centric Spars… | Language & Semantic |
| 75 | LEGaussians | 2412.03911 | Multi-View Pose-Agnostic Change Localization with Zero Labels | Language & Semantic |
| 76 | LGGS | 2409.04196 | GST: Precise 3D Human Body from a Single Image with Gaussian S… | Language & Semantic |
| 77 | OpenGaussian-v2 | 2412.06234 | Generative Densification: Learning to Densify Gaussians for Hi… | Language & Semantic |
| 78 | SemanticGauss | 2412.06250 | Splatter-360: Generalizable 360$^{\circ}$ Gaussian Splatting f… | Language & Semantic |
| 79 | CL-GS | 2407.10102 | 3DEgo: 3D Editing on the Go! | Language & Semantic |
| 80 | SceneGen-LLMRL | 2605.05711 | Closing the Loop: Unified 3D Scene Generation and Immersive In… | Generation |
| 81 | 3DGST | 2409.19702 | RNG: Relightable Neural Gaussians | Generation |
| 82 | GaussDreamer | 2503.19232 | HoGS: Unified Near and Far Object Reconstruction via Homogeneo… | Generation |
| 83 | SplatDM | 2502.05176 | AuraFusion360: Augmented Unseen Region Alignment for Reference… | Generation |
| 84 | 3DGS Safety Evaluation for AD | 2605.01995 | From Concept to Capability: Evaluating 3D Gaussian Splatting f… | Autonomous Driving |
| 85 | DENSR | 2606.01419 | DENSER: Depth-Guided Ensemble with Staged EFA-GS Reconstructio… | Autonomous Driving |
| 86 | GP-3DGS | 2606.20103 | Geometry-Preserving in 3D Gaussian Splatting for LiDAR-Camera … | Autonomous Driving |
| 87 | Nighttime AD GS | 2602.13549 | Nighttime Autonomous Driving Scene Reconstruction with Physica… | Autonomous Driving |
| 88 | GausCtrl-AD | 2503.19913 | PartRM: Modeling Part-Level Dynamics with Large Cross-State Re… | Autonomous Driving |
| 89 | GaussDet3D | 2504.00665 | Monocular and Generalizable Gaussian Talking Head Animation | Autonomous Driving |
| 90 | GaussianAT | 2503.10143 | GaussHDR: High Dynamic Range Gaussian Splatting via Learning U… | Autonomous Driving |
| 91 | GaussOcc | 2503.14029 | Rethinking End-to-End 2D to 3D Scene Segmentation in Gaussian … | Autonomous Driving |
| 92 | GS-Drive | 2504.17810 | SmallGS: Gaussian Splatting-based Camera Pose Estimation for S… | Autonomous Driving |
| 93 | GS-OD | 2503.08135 | ArticulatedGS: Self-supervised Digital Twin Modeling of Articu… | Autonomous Driving |
| 94 | HGS-Det | 2503.12535 | SPC-GS: Gaussian Splatting with Semantic-Prompt Consistency fo… | Autonomous Driving |
| 95 | Splat-TOD | 2503.21442 | RainyGS: Efficient Rain Synthesis with Physically-Based Gaussi… | Autonomous Driving |
| 96 | SplatAD-v2 | 2504.00763 | UnIRe: Unsupervised Instance Decomposition for Dynamic Urban S… | Autonomous Driving |
| 97 | SplatRS | 2504.01503 | Luminance-GS: Adapting 3D Gaussian Splatting to Challenging Li… | Autonomous Driving |
| 98 | Dynamic 3DGS Paradigms | 2606.00452 | Beyond Static Gaussians: An Empirical Investigation of Archite… | Dynamic & 4D |
| 99 | MoE-GS / MoDE | 2607.08250 | On the Design of Mixture-of-Experts for Dynamic Gaussian Splat… | Dynamic & 4D |
| 100 | RetroNVS | 2605.12437 | 3D Gaussian Splatting for Efficient Retrospective Dynamic Scen… | Dynamic & 4D |
| 101 | 4DGaussians-v2 | 2411.18197 | Make-It-Animatable: An Efficient Framework for Authoring Anima… | Dynamic & 4D |
| 102 | DynGS | 2412.00905 | Ref-GS: Directional Factorization for 2D Gaussian Splatting | Dynamic & 4D |
| 103 | GauSF | 2412.02684 | AniGS: Animatable Gaussian Avatar from a Single Image with Inc… | Dynamic & 4D |
| 104 | GS4D-v2 | 2503.19443 | COB-GS: Clear Object Boundaries in 3DGS Segmentation Based on … | Dynamic & 4D |
| 105 | MoS-GS | 2412.01553 | SfM-Free 3D Gaussian Splatting via Hierarchical Training | Dynamic & 4D |
| 106 | ReGS | 2412.03378 | Volumetrically Consistent 3D Gaussian Rasterization | Dynamic & 4D |
| 107 | TransGS | 2412.01745 | Horizon-GS: Unified 3D Gaussian Splatting for Large-Scale Aeri… | Dynamic & 4D |
| 108 | 4DGS-Wild | 2411.08879 | 4D Gaussian Splatting in the Wild with Uncertainty-Aware Regul… | Dynamic & 4D |
| 109 | CD-GS | 2311.12897 | A Compact Dynamic 3D Gaussian Representation for Real-Time Dyn… | Dynamic & 4D |
| 110 | Dynamic3DGaussians | 2309.13101 | Deformable 3D Gaussians for High-Fidelity Monocular Dynamic Sc… | Dynamic & 4D |
| 111 | Dynamic3DGS-Urban | 2406.03175 | Dynamic 3D Gaussian Fields for Urban Areas | Dynamic & 4D |
| 112 | FullyExplicitDynGS | 2410.15629 | Fully Explicit Dynamic Gaussian Splatting | Dynamic & 4D |
| 113 | MD-Splatting | 2407.02945 | VEGS: View Extrapolation of Urban Scenes in 3D Gaussian Splatt… | Dynamic & 4D |
| 114 | PGED | 2404.03613 | Per-Gaussian Embedding-Based Deformation for Deformable 3D Gau… | Dynamic & 4D |
| 115 | SK-GS | 2412.05570 | Template-free Articulated Gaussian Splatting for Real-time Rep… | Dynamic & 4D |
| 116 | SpacetimeGS | 2405.12110 | CoR-GS: Sparse-View 3D Gaussian Splatting via Co-Regularizatio… | Dynamic & 4D |
| 117 | Splat-MO | 2407.04237 | GSD: View-Guided Gaussian Splatting Diffusion for 3D Reconstru… | Dynamic & 4D |
| 118 | DiffAdapt4DSI | 2605.06214 | Differentiable Adaptive 4D Structured Illumination for Joint C… | HDR & Relighting |
| 119 | MGM (Large Material Gaussian Model… | 2509.22112 | Large Material Gaussian Model for Relightable 3D Generation | HDR & Relighting |
| 120 | Relightable-GS-VP | 2605.09024 | Relightable Gaussian Splatting for Virtual Production Using Im… | HDR & Relighting |
| 121 | BRDF-GS | 2503.18794 | NexusGS: Sparse View Synthesis with Epipolar Depth Priors in 3… | HDR & Relighting |
| 122 | GS-IR-v2 | 2412.12507 | 3DGUT: Enabling Distorted Cameras and Secondary Rays in Gaussi… | HDR & Relighting |
| 123 | GS-Skin | 2412.15215 | EnvGS: Modeling View-Dependent Appearance with Environment Gau… | HDR & Relighting |
| 124 | LightGS-v2 | 2412.15867 | IRGS: Inter-Reflective Gaussian Splatting with 2D Gaussian Ray… | HDR & Relighting |
| 125 | RelightGS | 2412.13193 | GaussTR: Foundation Model-Aligned Gaussian Transformer for Sel… | HDR & Relighting |
| 126 | GaussianShader-v2 | 2311.17061 | HumanGaussian: Text-Driven 3D Human Generation with Gaussian S… | HDR & Relighting |
| 127 | GS-Phong | 2403.04926 | BAGS: Blur Agnostic Gaussian Splatting through Multi-Scale Ker… | HDR & Relighting |
| 128 | GausLoc | 2504.00219 | LITA-GS: Illumination-Agnostic Novel View Synthesis via Refere… | SLAM |
| 129 | GaussianLoc | 2504.06210 | HiMoR: Monocular Deformable Gaussian Reconstruction with Hiera… | SLAM |
| 130 | GaussianSLAM-2 | 2411.19895 | GuardSplat: Efficient and Robust Watermarking for 3D Gaussian … | SLAM |
| 131 | SplaTAM-3 | 2503.16822 | RigGS: Rigging of 3D Gaussians for Modeling Articulated Object… | SLAM |
| 132 | SplaTAM-v2 | 2411.19654 | TexGaussian: Generating High-quality PBR Material via Octree-b… | SLAM |
| 133 | GS-SC | 2312.07504 | COLMAP-Free 3D Gaussian Splatting | SLAM |
| 134 | FewSplat | 2412.21206 | PERSE: Personalized 3D Generative Avatars from A Single Portra… | Sparse-View |
| 135 | CoR-GS-CVPR | 2402.10128 | GES: Generalized Exponential Splatting for Efficient Radiance … | Sparse-View |
| 136 | DelightingFace | 2605.05636 | Learning a Delighting Prior for Facial Appearance Capture in t… | Human & Avatar |
| 137 | Generalizable Human GS | 2604.25466 | Generalizable Human Gaussian Splatting via Multi-view Semantic… | Human & Avatar |
| 138 | Mobile Avatar (Pruned Blendshapes) | 2605.01854 | High-Fidelity Mobile Avatars with Pruned Local Blendshapes | Human & Avatar |
| 139 | GauHuman-v2 | 2503.24210 | DiET-GS: Diffusion Prior and Event Stream-Assisted Motion Debl… | Human & Avatar |
| 140 | GaussianAvatars-2 | 2412.07739 | GASP: Gaussian Avatars with Synthetic Priors | Human & Avatar |
| 141 | GaussianHands-2 | 2412.09606 | Feat2GS: Probing Visual Foundation Models with Gaussian Splatt… | Human & Avatar |
| 142 | SplatPose2 | 2504.13167 | ODHSR: Online Dense 3D Reconstruction of Humans and Scenes fro… | Human & Avatar |
| 143 | X-Gaussian | 2412.09723 | MAC-Ego3D: Multi-Agent Gaussian Consensus for Real-Time Collab… | Human & Avatar |
| 144 | GaussianHand | 2410.08840 | Learning Interaction-aware 3D Gaussian Splatting for One-shot … | Human & Avatar |
| 145 | GS-Avatar | 2311.18159 | CompGS: Smaller and Faster Gaussian Splatting with Vector Quan… | Human & Avatar |
| 146 | EditGS | 2412.13047 | Gaussian Splatting for Efficient Satellite Image Photogrammetr… | Editing |
| 147 | GaussCtrl-v2 | 2412.12096 | PanSplat: 4K Panorama Synthesis with Feed-Forward Gaussian Spl… | Editing |
| 148 | GaussianCut-v2 | 2406.09394 | WonderWorld: Interactive 3D Scene Generation from a Single Ima… | Editing |
| 149 | GS-Diff | 2504.05152 | PanoDreamer: Consistent Text to 360-Degree Scene Generation | Editing |
| 150 | GS-Mosaic | 2504.00773 | DropGaussian: Structural Regularization for Sparse-view Gaussi… | Editing |
| 151 | GS-Retexture | 2503.20776 | Feature4X: Bridging Any Monocular Video to 4D Agentic AI with … | Editing |
| 152 | InstructGS | 2503.20779 | PGC: Physics-Based Gaussian Cloth from a Single Pose | Editing |
| 153 | ColoredGaussian | 2405.10508 | ART3D: 3D Gaussian Splatting for Text-Guided Artistic Scenes G… | Editing |
| 154 | GaussianCtrl | 2312.13763 | Align Your Gaussians: Text-to-4D with Dynamic 3D Gaussians and… | Editing |
| 155 | GaussianEditor-v2 | 2312.09228 | 3DGS-Avatar: Animatable Avatars via Deformable 3D Gaussian Spl… | Editing |
| 156 | Splat-GS | 2406.08488 | ICE-G: Image Conditional Editing of 3D Gaussian Splats | Editing |
| 157 | GaussCAD | 2503.19358 | From Sparse to Dense: Camera Relocalization with Scene-Specifi… | CAD & Reverse Engineer… |
| 158 | Egocentric Dynamic 3DGS Evaluation | 2604.23803 | Bringing a Personal Point of View: Evaluating Dynamic 3D Gauss… | Cross-Domain |
| 159 | GSRep | 2605.29549 | Learning Representations from 3D Gaussian Splats | Cross-Domain |
| 160 | Mobile Phone 3DGS Acquisition | 2604.19216 | An Object-Centered Data Acquisition Method for 3D Gaussian Spl… | Cross-Domain |
| 161 | CT-GS | 2502.02091 | Instruct-4DGS: Efficient Dynamic Scene Editing via 4D Gaussian… | Cross-Domain |
| 162 | GaussVis | 2503.01610 | Vid2Avatar-Pro: Authentic Avatar from Videos in the Wild via U… | Cross-Domain |
| 163 | GS-UWF | 2502.16652 | Dr. Splat: Directly Referring 3D Gaussian Splatting via Direct… | Cross-Domain |
| 164 | GS-VQA | 2503.23297 | ReasonGrounder: LVLM-Guided Hierarchical Feature Splatting for… | Cross-Domain |
| 165 | SAM3D-Phys | 2605.30239 | CA-World: Multi-Object Counterfactual Alignment for Efficient … | Simulation |
| 166 | 3DGS Demo Synthesis (IL) | 2605.01232 | A Principled Approach for Creating High-fidelity Synthetic Dem… | Embodied AI & Robotics |
| 167 | GaussNav-2 | 2412.04470 | Turbo3D: Ultra-fast Text-to-3D Generation | Embodied AI & Robotics |
| 168 | GaussRover | 2503.20168 | EVolSplat: Efficient Volume-based Gaussian Splatting for Urban… | Embodied AI & Robotics |
| 169 | RoboSplat | 2504.15387 | Antenna Arrays for CRES-based Neutrino Mass Measurement | Embodied AI & Robotics |
| 170 | SplatSim-v2 | 2504.20378 | Sparse2DGS: Geometry-Prioritized Gaussian Splatting for Surfac… | Embodied AI & Robotics |
| 171 | FenceGS | 2501.14277 | Dense-SfM: Structure from Motion with Dense Consistent Matchin… | Security |
| 172 | IP-GS | 2501.10283 | GauSTAR: Gaussian Surface Tracking and Reconstruction | Security |
| 173 | WaterGS | 2501.05379 | Arc2Avatar: Generating Expressive 3D Avatars from a Single Ima… | Security |
| 174 | GaussianUnderAttack | 2412.02803 | Gaussian Splatting Under Attack: Investigating Adversarial Noi… | Security |
| 175 | Splat-Security | 2407.04699 | LaRa: Efficient Large-Baseline Radiance Fields | Security |
| 176 | PlanarGS-Pose | 2609.07231 | Generalizable 6D Pose Estimation of Textureless Objects with P… | Embodied AI & Robotics |

## 五、本轮已修正项

| 条目 | 修正前 | 修正后 | 依据 |
|------|--------|--------|------|
| arXiv:2609.07231 | 名称 `PlanarGS-Pose` | 名称 `PG-Pose`，描述同步改写 | 论文摘要原文：*"we propose PG-Pose, a geometry-aware framework combining Planar-based Gaussian Splatting (PGS) reconstruction and Geometry-driven pose optimization"* |

已同步载体：`data/methods.json`、`3dgs-methods-overview.csv`、`docs/index.html`、`docs/abstracts.js`、
`references/3dgs-methods-overview.md`。条目总数不变（858）。

## 六、待处置项与建议方案

### 建议 1：A 类 66 条——先核验后改 ID（不建议直接套用候选列）
流程：对每条名称用 `ti:"<名称>"` 检索 → 人工确认候选论文的方法名、任务领域与库内描述一致 → 改写 `arxiv_id`，
并把 `venue`/`year` 同步为该论文的真实信息。同名误配（上表 11 条）需单独人工判定。

### 建议 2：B 类 176 条——按三分类分别处置
- 内部标签类：保留名称但修正指向，或改为「综述聚类」独立字段，不占用方法计数；
- 描述性命名类：保留名称，核对 `desc` 与所链接论文一致即可；
- 疑似虚构名类：**建议删除**，或按所链接论文的真实方法名重建条目。

### 建议 3：口径修正
在 README / README_CN / CLAUDE.md 的「zero fabrication」表述中补充限定语，
或在本轮修复完成后再恢复原表述。当前状态下对外宣称零虚构存在事实风险。

### 建议 4：CI 增强
现有 `scripts/validate_knowledge_base.py` 只校验 ID 格式、重复与黑名单，
不校验「方法与论文是否对应」。建议新增 **名称—论文一致性检查**（本次审计脚本可直接复用），
对新增条目强制执行，避免同类问题再次累积。

## 七、复现方式

| 脚本 | 作用 |
|------|------|
| `.temp/full_audit.py` | 全库 747 条 ID 可达性 + 名称一致性核验 |
| `.temp/discriminate.py` | 名称反查，区分「ID 挂错」与「名称虚构」 |
| `.temp/verify_new_batch.py` | v0.8.4 新增 39 篇逐条核验 |
| `.temp/verify_venue_missing.py` | 会议声明核验 + 漏收论文定位 |

审计原始数据：`.temp/full_audit.json`、`.temp/remediation.json`、`.temp/arxiv_scan_0916.json`。
