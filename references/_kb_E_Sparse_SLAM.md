# 知识库 · 簇 E_Sparse_SLAM（Sparse-View / SLAM）

> 覆盖：经典 2023-2024 深度 10 篇；2025 已确立简表 3 篇；近期焦点 2026 详写 4 篇。
> 所有 ID 均经 WebFetch `https://arxiv.org/abs/<id>` 核验可达并抓取摘要。
> 指标仅取自 arxiv 摘要或确知内容，不确定标注「待补」。

---

## 一、经典论文（2023-2024，深度全覆盖，10 篇）

### Binocular3DGS (`2410.18822`, NeurIPS 2024)
- **摘要**: 面向稀疏视角新视角合成，提出无需外部神经先验监督的双目引导 3DGS。利用视差引导图像扭曲构造的每对双目图像间的立体一致性作为自监督信号，并引入 Gaussian 不透明度约束正则化高斯位置、避免冗余。
- **创新点**: ① 不依赖噪声/模糊的 2D 预训练深度先验，改用双目立体一致性自监督；② 引入不透明度约束抑制冗余高斯、提升稀疏推断鲁棒性与效率；③ 相对 FSGS/DPT 等神经先验路线改用内部几何一致性信号。
- **核心方法**: 视差引导的图像扭曲构造双目对 → 立体一致性自监督损失 → Gaussian opacity constraint 约束位置与冗余；渲染为普通可微光栅化 3DGS。
- **实验设计与分析**: 在 LLFF、DTU、Blender 上验证，摘要称显著超越 SOTA（具体 PSNR/SSIM 数字「待补」）。支撑 claim：无外部先验即可在稀疏视角下取得更优合成质量。
- **写作可嫁接点**: 可作为「稀疏视角自监督/无先验正则」基线引用，或在 related work 中代表「不依赖预训练深度」的分支与 FSGS、DNGaussian 等对比。
- **核查**: arxiv 标题=Binocular-Guided 3D Gaussian Splatting with View Consistency for Sparse View Synthesis（一致）。

### CoR-GS (`2405.12110`, ECCV 2024)
- **摘要**: 针对稀疏训练视角下 3DGS 易过拟合，提出协同正则（co-regularization）新视角：训练两个高斯辐射场，利用其间的「点不一致」与「渲染不一致」无监督预测重建质量，并据此抑制不准确重建。
- **创新点**: ① 发现并量化两辐射场的 point disagreement 与 rendering disagreement，且与重建精度呈负相关；② Co-pruning 剪除高不一致位置的高斯；③ Pseudo-view co-regularization 抑制高渲染不一致像素。
- **核心方法**: 双辐射场并行训练 → 量化两种不一致 → Co-pruning（按点不一致剪枝）+ 伪视角协同正则（按渲染不一致加权抑制）。
- **实验设计与分析**: 在 LLFF、Mip-NeRF360、DTU、Blender 上验证，称达到稀疏视角 SOTA（具体数字「待补」）。支撑 claim：无需真值即可识别并抑制错误重建、得到紧凑表示。
- **写作可嫁接点**: 可作为「无监督/一致性正则缓解稀疏过拟合」代表方法，与 DNGaussian、FSGS、CoR-GS 同类工作并列对比。
- **核查**: arxiv 标题=CoR-GS: Sparse-View 3D Gaussian Splatting via Co-Regularization（一致）。

### DG-SLAM (`2411.08373`, NeurIPS 2024)
- **摘要**: 首个基于 3D 高斯的鲁棒动态视觉 SLAM 系统，面向动态场景中的精确相机位姿估计与高保真重建。针对既有 GS-SLAM 依赖静态假设的问题，提出运动掩码、自适应高斯点管理与混合位姿优化策略。
- **创新点**: ① 首个以 3D 高斯为显式表示的动态 SLAM；② motion mask 去除动态干扰观测；③ adaptive Gaussian point management + hybrid camera tracking 提升位姿精度与鲁棒性。
- **核心方法**: 运动掩码生成 → 自适应高斯点管理（增删/重分配）→ 混合相机跟踪算法（结合几何与光度）联合优化位姿与高斯地图。
- **实验设计与分析**: 在动态场景数据上验证位姿估计、地图重建与新视角合成均达 SOTA 且保持实时渲染（具体指标「待补」）。支撑 claim：动态环境下仍能精确位姿估计与高保真重建。
- **写作可嫁接点**: 动态 SLAM 方向关键基线；与 WildGS-SLAM、Gaussian Splatting SLAM/SplaTAM 静态假设对比时引用。
- **核查**: arxiv 标题=DG-SLAM: Robust Dynamic Gaussian Splatting SLAM with Hybrid Pose Optimization（一致）。

### FSGS (`2312.00451`, ECCV 2024)
- **摘要**: 基于 3DGS 的少样本新视角合成框架，最少 3 张训练视角即可实时、照片级合成。针对极稀疏 SfM 初始化点，设计 Gaussian Unpooling 迭代播撒高斯填补空缺，并引入大规模预训练单目深度估计器在线引导几何优化。
- **创新点**: ① Gaussian Unpooling 从代表性位置迭代生长高斯覆盖未见区域；② 在线增强视图 + 预训练单目深度引导几何优化；③ 相对 NeRF 少样本方法兼顾精度与实时性。
- **核心方法**: 稀疏 SfM 点初始化 → Gaussian Unpooling 局部填补 → 单目深度估计器监督 + 在线增广视图 → 可微光栅化优化。
- **实验设计与分析**: 在 LLFF、Mip-NeRF360、Blender 上取得 SOTA 精度与渲染效率（具体数字「待补」）。支撑 claim：从 ≤3 视角准确生长覆盖全场景、提升新视角质量。
- **写作可嫁接点**: 少样本/稀疏视角 3DGS 早期代表，与 CoR-GS、FewViewGS、Binocular3DGS 同簇对比的强基线。
- **核查**: arxiv 标题=FSGS: Real-Time Few-shot View Synthesis using Gaussian Splatting（一致）。

### FewViewGS (`2411.02229`, NeurIPS 2024)
- **摘要**: 面向稀疏输入的 3D 高斯新视角合成，提出多阶段训练 + 基于匹配的跨视角一致性约束，不依赖预训练深度或扩散模型。用训练图像间的匹配监督训练帧间采样的新视角，辅以局部保持正则消除伪影。
- **创新点**: ① 多阶段训练 + matching-based consistency（color/geometry/semantic 损失）替代外部先验；② 由训练图像匹配监督帧间采样新视角；③ locality preserving regularization 保持局部颜色结构、去伪影。
- **核心方法**: 训练图匹配 → 帧间采样新视角 → color+geometry+semantic 一致性损失 → 局部保持正则（local color structure）。
- **实验设计与分析**: 在合成与真实数据集上对比稀疏视角 SOTA 具竞争力或更优（具体数字「待补」）。支撑 claim：无预训练深度/扩散模型亦可准确渲染未覆盖视角。
- **写作可嫁接点**: 作为「匹配/几何一致性自监督、无外部先验」路线的代表，与 FewViewGS、SCGaussian、Binocular3DGS 并列。
- **核查**: arxiv 标题=FewViewGS: Gaussian Splatting with Few View Matching and Multi-stage Training（一致）。

### Gaussian Splatting SLAM (`2312.06741`, CVPR 2024 Highlight)
- **摘要**: 首个将 3DGS 用于单目 SLAM 的工作，实时约 3fps；以高斯作为唯一 3D 表示，统一跟踪、建图与高质量渲染。提出以直接优化 3D 高斯进行相机跟踪、几何验证与正则，可扩展至 RGB-D。
- **创新点**: ① 首个单目 GS-SLAM，摆脱离线 SfM 提供的精确位姿；② 直接对 3D 高斯做 direct optimisation 跟踪，宽收敛域、快速鲁棒；③ 利用显式表示做几何验证/正则处理增量稠密重建歧义。
- **核心方法**: 高斯作为唯一表示 → 直接法相机跟踪（对高斯求光度误差）→ 几何验证与正则 → 全 SLAM 系统（跟踪+建图+渲染）。
- **实验设计与分析**: CVPR 2024 Highlight；摘要称在新视角合成、轨迹估计及微小/透明物体重建上达 SOTA（具体数字「待补」）。支撑 claim：单目设置下实时高保真稠密重建与跟踪。
- **写作可嫁接点**: GS-SLAM 方向奠基性基线，几乎所有后续 GS-SLAM（SplaTAM、Photo-SLAM、MonoGS、DG-SLAM、WildGS-SLAM）的必引与对比对象。
- **核查**: arxiv 标题=Gaussian Splatting SLAM（一致）。

### GaussianObject (`2402.10259`, CVPR 2024)
- **摘要**: 仅用 4 张输入图以高斯泼溅高质量重建并渲染 3D 物体。针对稀疏视角多视角一致性难建立、信息缺失/压缩两大挑战，引入视觉外壳与浮点消除注入结构先验，并构建基于扩散模型的高斯修复模型补充缺失信息。
- **创新点**: ① visual hull + floater elimination 显式注入结构先验建粗表示；② Gaussian repair model（扩散）补充被省略物体信息；③ 设计 COLMAP-free 变体免精确位姿。
- **核心方法**: 视觉外壳/浮点消除初始化 → 扩散修复模型（自生成图像对训练）→ 高斯精修；并提供无需预给位姿的变体。
- **实验设计与分析**: 在 MipNeRF360、OmniObject3D、OpenIllumination 及自采无位姿数据上验证，4 视角显著超先前 SOTA（具体数字「待补」）。支撑 claim：仅 4 视角即可高质量物体重建。
- **写作可嫁接点**: 物体级稀疏视角 3DGS 代表；与 DPT、FSGS 物体重建对比，扩散修复思路可嫁接。注：arxiv 注释实为 SIGGRAPH Asia 2024 (TOG)，簇表标 CVPR 2024 存在出入，以 arxiv 为准。
- **核查**: arxiv 标题=GaussianObject: High-Quality 3D Object Reconstruction from Four Views with Gaussian Splatting（一致）。

### Photo-SLAM (`2311.16728`, CVPR 2024)
- **摘要**: 提出以「超基元地图（hyper primitives）」为核心的实时 SLAM：同时利用显式几何特征做定位、隐式光度特征表达纹理。主动按几何特征稠密化超基元，并用高斯金字塔训练渐进学习多级特征，可在 Jetson 等嵌入式平台实时运行。
- **创新点**: ① 显式几何 + 隐式光度解耦的超基元地图；② Gaussian-Pyramid 渐进多尺度训练提升真实感建图；③ 嵌入式平台（Jetson AGX Orin）实时，突破纯隐式方法资源消耗瓶颈。
- **核心方法**: hyper primitives（几何显式+光度隐式）→ 几何驱动主动稠密化 → 高斯金字塔多尺度特征训练 → 联合定位与真实感建图。
- **实验设计与分析**: 单目/双目/RGB-D 数据上，Replica 数据 PSNR 高 30%、渲染速度快数百倍于 SOTA，且可 Jetson 实时（数字来自摘要）。支撑 claim：在线真实感建图 SOTA 且嵌入式可实时。
- **写作可嫁接点**: 实时/嵌入式 GS-SLAM 强基线，与 SplaTAM、Gaussian Splatting SLAM 在效率与平台部署上对比。
- **核查**: arxiv 标题=Photo-SLAM: Real-time Simultaneous Localization and Photorealistic Mapping for Monocular, Stereo, and RGB-D Cameras（一致）。

### SCGaussian (`2411.03637`, NeurIPS 2024)
- **摘要**: 提出结构一致性高斯泼溅（SCGaussian），用匹配先验学习 3D 一致场景结构以缓解稀疏输入退化。核心为混合高斯表示：在普通非结构高斯外，加入绑定匹配射线、位置仅沿射线受限优化的 ray-based 高斯，直接将位置收敛到射线交点表面点。
- **创新点**: ① 混合高斯表示（非结构高斯 + 射线绑定高斯）直接约束高斯位置；② 利用匹配对应将位置强制收敛到射线交点表面；③ 相对普通 3DGS 可约束「非结构」的高斯位置属性。
- **核心方法**: 普通 3DGS 优化渲染几何 + ray-based 高斯（位置沿匹配射线受限）→ 匹配对应监督位置收敛至表面点 → 结构一致场景重建。
- **实验设计与分析**: 在 forward-facing、surrounding、复杂大场景上验证达 SOTA 且高效（具体数字「待补」）。支撑 claim：通过匹配先验约束高斯位置获得结构一致、大场景有效。
- **写作可嫁接点**: 「匹配/射线先验约束高斯位置」路线的代表，与 FewViewGS、Binocular3DGS 对比；其混合表示思路可借鉴。
- **核查**: arxiv 标题=Structure Consistent Gaussian Splatting with Matching Prior for Few-shot Novel View Synthesis（一致）。

### SplaTAM (`2312.02126`, CVPR 2024)
- **摘要**: 首次将显式体积表示（3D 高斯）用于单目无位姿 RGB-D 相机的稠密 SLAM，提出贴合高斯表示的在线跟踪与建图，用轮廓掩码（silhouette mask）刻画场景密度存在性，实现快速渲染、稠密优化与结构化地图扩展。
- **创新点**: ① 首次用显式高斯体积表示做稠密 SLAM；② silhouette mask 优雅刻画密度存在、判定是否已建图区域；③ 结构化地图扩展（按需增高斯）优于隐式/非体积表示。
- **核心方法**: 3D 高斯体积地图 → 在线跟踪（直接法）+ 在线建图 → silhouette mask 密度判定 → 结构化高斯增删扩展。
- **实验设计与分析**: 摘要称在相机位姿估计、地图构建、新视角合成上达现有方法 2× 性能（"up to 2x superior"）。支撑 claim：单 RGB-D 相机高保真重建优于先前方法。
- **写作可嫁接点**: RGB-D GS-SLAM 奠基基线，与 Gaussian Splatting SLAM、Photo-SLAM 同簇必比；silhouette mask 设计常被借鉴。
- **核查**: arxiv 标题=SplaTAM: Splat, Track & Map 3D Gaussians for Dense RGB-D SLAM（一致）。

---

## 二、2025 已确立（简表，3 篇）

| 方法名 | ID | venue | year | 一句话贡献 |
|--------|-----|-------|------|-----------|
| CoMapGS | `2503.20998` | CVPR 2025 | 2025 | 用共视性地图增强初始点云并以不确定性加权监督恢复稀疏欠表达区域。 |
| SplatLoc | `2409.14067` | CVPR 2025 | 2025 | 基于 3DGS 的视觉定位：场景专属描述子解码 + 显著地标选择做 6-DoF 位姿。 |
| WildGS-SLAM | `2504.03886` | CVPR 2025 | 2025 | 单目 GS-SLAM 引入 DINOv2 不确定性图去除动态物体，动态环境无伪影。 |

---

## 三、近期焦点（2026，详写满五要素，4 篇）

### OC-GS (`2609.31572`, 2026)
- **摘要**: 针对转盘（turntable）重建中不均匀旋转、丢帧导致等角度假设失效的问题，提出物体中心的 GS 方法，在共享相机、旋转轴与支点的前提下逐图精修角度，轨道一致（orbit-consistent）地联合优化几何与角度，从稀疏不规则捕获重建物体。
- **创新点**: ① 不假设等角度，改为逐图精修角度并维持共享运动模型（相机/轴/支点）；② orbit-consistent refinement 联合优化图像几何与角度；③ 面向稀疏不规则转盘捕获，区别于一般 pose-free GS。
- **核心方法**: 物体中心高斯表示 → 共享相机/旋转轴/支点参数化 → 轨道一致角度精修（联合图像几何与角度）→ 稀疏不规则视图重建。
- **实验设计与分析**: 渲染物体 12/8/6 不规则视图下前景 PSNR 分别为 21.26/19.36/15.83 dB，各条件均超 4 个 pose-free GS 基线；共享训练器下精修角度较固定估计 +7.88 dB；真实捕获 +0.70 dB。消融证明图像初始角度与共享运动模型均贡献。支撑 claim：共享运动模型内精修不确定角度提升稀疏不规则重建。
- **写作可嫁接点**: 可作为「pose-free / 角度不确定 / 物体中心捕获」方向新基线，与无位姿 3DGS、转盘重建工作对比；其共享运动模型思路可嫁接到手持/不规则序列。
- **核查**: arxiv 标题=OC-GS: Gaussian Splatting for Irregular Turntable Capture（一致，提交 2026-09-25）。

### UGOD (`2609.39089`, 2026)
- **摘要**: 针对稀疏视角 3DGS 因弱约束高斯经 alpha 混合累积贡献而容易过拟合，提出不确定性引导框架 UGOD：为每个高斯估计视角相关不确定性分数并调控其渲染贡献，抑制不可靠基元。
- **创新点**: ① 轻量不确定性头（条件于高斯属性与视角方向）预测视角相关不确定性分数；② differentiable opacity-modulation 在合成前衰减高不确定性高斯；③  detach 的软 dropout 分支施加不确定性控制的连续 keep mask 防过拟合，且 detach 防止随机正则偏置不确定性预测。
- **核心方法**: 不确定性头预测（attribute + view-dir）→ opacity 调制衰减 → 训练期 detached soft-dropout（连续 keep mask）→ 稀疏视角优化更紧凑、更少过拟合。
- **实验设计与分析**: Mip-NeRF360 与 LLFF 上稀疏视角新视角合成优于对比方法，且高斯表示更紧凑（具体 PSNR 数字「待补」）。支撑 claim：高斯不确定性提供有效的渲染期控制、改善稀疏重建并简化表示。
- **写作可嫁接点**: 「不确定性感知渲染/高斯可靠性」方向新代表，与 WildGS-SLAM 不确定性图、UGOD 同类思路对比；opacity 调制 + detached dropout 可借鉴。
- **核查**: arxiv 标题=UGOD: Uncertainty-Guided Opacity and Dropout for Sparse-View 3D Gaussian Splatting（一致，提交 2026-09-30）。

### ClearGS (`2609.31509`, 2026)
- **摘要**: 面向视角覆盖不均、帧质量参差的手机手持视频，提出可靠性感知 3DGS。用 Reliability-aware View Allocation（RVA）给帧分配分级原始监督权重而非二值筛选，并弱重启有用被压帧保持轨迹覆盖；再用 Render-Guided In-Video Restoration（RIVR）修复模糊/失真丢失的细节。
- **创新点**: ① RVA 按外观可靠性/退化风险/几何效用给帧分级权重并弱重启被压帧；② RIVR：以当前渲染为位姿对齐结构候选，冻结的无参考修复专家恢复原始观测，无参考感知分数在渲染/修复/高频融合候选间选择；③ Full-Trajectory Repair Consolidation 回访已接受修复保全早期细节。
- **核心方法**: 可靠性感知视图分配（分级权重+弱重启）→ 渲染引导视频内修复（无参考专家+感知分数选择+高频融合）→ 全轨迹修复整合。
- **实验设计与分析**: GS2E 与 GSOTM 上达 SOTA 整体表现，多数退化设置下 CLIP-IQA 与 MUSIQ 增益、LPIPS 下降，无需成对清晰监督或匹配干净参考（具体数值「待补」）。支撑 claim：分级可靠性加权 + 渲染引导修复可在无干净参考手持视频上稳健 3DGS。
- **写作可嫁接点**: 「手持视频/退化帧/无参考修复」方向新基线，与处理模糊/动态视频输入的 3DGS 工作对比；RVA 与 RIVR 模块思路可嫁接。
- **核查**: arxiv 标题=ClearGS: Reliability-Aware Gaussian Splatting from Handheld Videos（一致，提交 2026-09-25）。

### RRTO-CF3DGS (`2609.30865`, 2026)
- **摘要**: 针对 COLMAP-free 渐进式 3DGS 中逐帧位姿跟踪误差累积、早期误差冻结进场景表示的问题，提出统一可靠性调控轨迹优化框架。核心是内禀自监督双向循环一致性机制，在两个时间尺度上系统调控渐进相机轨迹。
- **创新点**: ① 自监督双向循环一致性作为内在可靠性信号，无需外部神经先验/离线预处理；② 前向运动传播（Forward Motion Propagation）：在线可靠性门控一阶运动学 warm-start 进入后续配准，拦截不可信转移；③ 回溯轨迹校正（Retrospective Trajectory Correction）：同信号在滑动窗口内加权相对位姿一致性约束。
- **核心方法**: 渐进无位姿 GS → 双向循环一致性可靠性信号 → 前向门控运动传播 + 回溯滑动窗一致性加权 → 统一调控前瞻初始化与回溯整合。
- **实验设计与分析**: Tanks and Temples 与 CO3D-V2 上相机轨迹精度与新视角渲染质量大幅优于现有无位姿基线（具体数字「待补」）。支撑 claim：统一可靠性调控无需外部先验即可消解渐进漂移。
- **写作可嫁接点**: 「COLMAP-free / 无位姿渐进 3DGS 轨迹优化」方向新代表，与无位姿 3DGS、渐进 SfM-free 工作对比；双向循环一致性可靠性信号可借鉴。
- **核查**: arxiv 标题=Reliability-Regulated Trajectory Optimization for Progressive COLMAP-Free 3D Gaussian Splatting（一致，提交 2026-09-25）。
