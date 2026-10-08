# 3DGS 论文研读知识库 · Paper Reading Knowledge Base

> **用途**：把项目相关论文（近期 + 经典）的研读沉淀为结构化笔记，作为**撰写 3DGS 论文的基础**——覆盖 related-work 定位、方法对比、实验数据集/基线/指标速查。

> **生成方式**：由 9 个并行子代理分簇 WebFetch arXiv 原文核验 + 深度研读，聚合而成。

> **核查口径**：全项目 arXiv ID 已批量 arXiv API 核验——唯一 ID **1372** 个，可达 **1371** 个；原 `docs/studio.html` 中 Mip-Splatting 链接误写为 `2312.21535`，已修正为正确 ID `2311.16493`（CVPR 2024 Best Student Paper）。方法名↔标题疑似不匹配候选 **77** 个，需人工裁定（非必然错误，见 `references/verification-report.md`）。

> **深度标记**：`[经典]`=2023-2024 奠基性论文深度笔记；`[2025]`=已确立论文简表；`[近期焦点]`=2026 扫描焦点详写。

> **红线**：笔记只记 arXiv 摘要或确证内容，指标不确定处写「待补」；正式投稿引用前请回原始论文复核。

## 目录

1. [簇一 · 基础表示 / 表面渲染 / 优化 / 加速](#A_Found_Render_Opt_Acc)

2. [簇二 · 压缩与流式](#B_Compression)

3. [簇三 · 动态与 4D](#C_Dynamic4D)

4. [簇四 · 前馈式 3DGS](#D_FeedForward)

5. [簇五 · 稀疏视角 / SLAM](#E_Sparse_SLAM)

6. [簇六 · 具身智能 / 自动驾驶](#F_Embodied_Driving)

7. [簇七 · 编辑 / 人体与化身 / 生成](#G_Editing_Human_Gen)

8. [簇八 · 语义 / 跨域 / HDR 重光照](#H_Semantic_Cross_HDR)

9. [簇九 · CAD / 大场景 / 仿真 / 安全 / 世界模型](#I_CAD_Large_Sim_Sec_World)


---

## 簇一 · 基础表示 / 表面渲染 / 优化 / 加速 <a id="A_Found_Render_Opt_Acc"></a>

# 知识库 · 簇 A_Found_Render_Opt_Acc

> 研读子代理产出。所有 arXiv ID 已逐一 WebFetch 核验可达并抓取标题/摘要。
> 编写范围：经典(2023-2024) 30 篇深度笔记、2025 已确立 6 篇简表、2026 近期焦点 4 篇详写。
> 指标仅源自 arxiv 摘要或确知内容；未知以「待补」标注。

## 核查汇总（与任务文件的差异提示）

| arxiv_id | 任务文件标注 | 实际核验结果 | 处理 |
|---|---|---|---|
| 2402.17427 | GES / CVPR 2024 | 实为 **VastGaussian**（大场景） | 以真实标题为准，标注差异 |
| 2410.04974 | 6DGS / ECCV 2024 | arxiv 标注 **ICLR 2025** | 核查提示差异 |
| 2402.17427 之外的 GES | — | 同上 | — |
| 2410.23658 | GS-Blur / CVPR 2025 | arxiv 标注 **NeurIPS 2024 Datasets&Benchmarks** | 核查提示差异 |
| 2502.05040 | GaussRender / CVPR 2025 | arxiv 标注 **ICCV 2025** | 核查提示差异 |
| 2411.15723 | GSurf / CVPR 2024 | 提交于 2024-11，疑似非 CVPR2024 | 核查提示待核 |
| 2411.12452 | GaussianPretrain / CVPR 2024 | 提交于 2024-11，疑似非 CVPR2024 | 核查提示待核 |
| 2510.27318 | SAGS / ECCV 2024 | 提交于 **2025-10**，动态内窥镜 | 核查提示差异（年份） |
| 2411.18966 | SVGS / arXiv 2024 | arxiv 期刊 **IEEE TVCG** | 核查提示差异 |
| 2510.12174 | UniGS / CVPR 2025 | 提交于 2025-10，venue 待核 | 核查标注待核 |
| 2604.23551 | MarineSTD-GS / ACM MM 2025 | arxiv 标注 **ACM MM 2025**，一致 | 一致 |
| 2610.09116 / 2609.31248 / 2610.09343 | 2026 焦点 | 均解析成功，提交于 2026 | 一致 |

---

## 一、经典论文（2023-2024，共 30 篇，深度全覆盖）

### 3D Gaussian Splatting / 3DGS (`2308.04079`, SIGGRAPH 2023)
- **摘要**: 用显式 3D 高斯表示场景，配合交错式密度控制与各向异性协方差，实现 1080p 下 ≥30fps 的实时新视角合成，同时保持有竞争力的训练时间与 SOTA 视觉质量。
- **创新点**: ① 由 SfM 稀疏点初始化 3D 高斯、只在占用区域计算；② 各向异性协方差直接优化以精确拟合表面；③ 可见性感知的各向异性 splatting 光栅化。
- **核心方法**: 可微光栅化按 tile 排序做 alpha 混合（front-to-back）；每 100 次迭代执行克隆/拆分/剪枝的 density control；颜色用 SH 球谐表达视角相关效应。
- **实验设计与分析**: Mip-NeRF360、Tanks&Temples、DeepBlending；基线 3DGS vs Instant-NGP/Mip-NeRF360；指标 PSNR/SSIM/LPIPS/FPS，达 30+fps 且质量 SOTA，支撑"实时+高质量"claim。
- **写作可嫁接点**: 作为所有 3DGS 变体的方法基座、实时渲染基线与 related-work 锚点引用。
- **核查**: arxiv 标题=3D Gaussian Splatting for Real-Time Radiance Field Rendering（一致）。

### 3DGS-Enhancer (`2410.16266`, NeurIPS 2024 Spotlight)
- **摘要**: 针对稀疏视角下 3DGS 重建易出伪影，用 2D 视频扩散先验提升无界场景表示质量，将视角一致性转化为视频生成中的时序一致性。
- **创新点**: ① 首次将 3DGS 增强重构为时序一致的视频生成问题；② 空间-时序解码器恢复视角一致潜特征并与输入视图融合；③ 用增强视图微调解出的初始 3DGS。
- **核心方法**: 渲染新视角→视频扩散恢复 latent→spatial-temporal decoder 重建→监督式微调原 3DGS；利用视频扩散保证跨帧一致。
- **实验设计与分析**: 大尺度无界场景数据集；对比 SOTA 稀疏视角方法；指标 PSNR/SSIM 等展现更优重建与高保真渲染，支撑"稀疏视角增强"claim。具体数字待补。
- **写作可嫁接点**: 稀疏/少视角 3DGS、扩散先验增强相关工作的基线或对比项。
- **核查**: arxiv 标题=3DGS-Enhancer: Enhancing Unbounded 3D Gaussian Splatting with View-consistent 2D Diffusion Priors（一致）。

### 6DGS (`2410.04974`, ICLR 2025*)
- **摘要**: 在 6D 空间-角向高斯表示上改进 N-DG，增强颜色/不透明度表达并利用方向信息优化高斯控制，更好建模视角相关效应与细节。
- **创新点**: ① 相对 N-DG 改进颜色与不透明度表示；② 利用 6D 额外方向信息做优化的高斯控制；③ 完全兼容 3DGS 框架。
- **核心方法**: 引入 6D 空间-角向高斯（N-DG 扩展），保留 3DGS 光栅化；在 6D 空间做方向感知的 densification 与优化。
- **实验设计与分析**: 摘要报告相对 3DGS 最高 +15.73 dB PSNR 提升、高斯数减少 66.5%，并优于 N-DG；支撑"实时+更优视角相关"claim。数据集待补。
- **写作可嫁接点**: 视角相关效果（高光/反射）建模、N-DG/6D 表示相关对比引用。
- **核查**: arxiv 标题=6DGS: Enhanced Direction-Aware Gaussian Splatting for Volumetric Rendering（一致）；*venue 任务文件标 ECCV2024，arxiv 标 ICLR2025，差异待核。

### DC-Gaussian (`2405.17705`, NeurIPS 2024)
- **摘要**: 面向行车记录仪（dash cam）视频的新视角合成，解决风挡反射/遮挡严重阻碍神经渲染的问题，在 3DGS 上建模反射与遮挡。
- **创新点**: ① 自适应图像分解模块统一建模反射与遮挡；② 光照感知的遮挡建模应对不同光照；③ 几何引导的高斯增强引入几何先验提升细节。
- **核心方法**: 在 3DGS 之上增"反射/遮挡"分解分支 + 光照感知建模 + 几何引导增强；联合优化得到去遮挡重建与渲染。
- **实验设计与分析**: 自采与公开 dash cam 视频；指标新视角合成质量与去遮挡重建精度达 SOTA。具体数字待补。支撑"反射遮挡场景"claim。
- **写作可嫁接点**: 动态/含反射遮挡户外视频、自动驾驶采集数据相关基线。
- **核查**: arxiv 标题=DC-Gaussian: Improving 3D Gaussian Splatting for Reflective Dash Cam Videos（一致）。

### DisC-GS (`2405.15196`, NeurIPS 2024)
- **摘要**: 指出 3DGS 因高斯连续本质无法准确渲染图像边界/不连续处，提出不连续感知渲染框架并保留可微性。
- **创新点**: ① 首个让 3DGS 感知图像不连续/边界的渲染框架；② 贝塞尔边界梯度近似策略保持"可微性"。
- **核心方法**: 在 splatting 渲染中引入不连续建模（边界分段），用 Bézier-boundary 梯度近似让分段可微，端到端训练。
- **实验设计与分析**: 摘要称大量实验验证有效性；具体数据集/指标数字待补。支撑"边界/锐利边缘更准"claim。
- **写作可嫁接点**: 几何边界、抗锯齿/边缘保真相关的对比与 related-work 引用。
- **核查**: arxiv 标题=DisC-GS: Discontinuity-aware Gaussian Splatting（一致）。

### Ev-GS (`2407.11343`, CVPR 2024)
- **摘要**: 首个由单目事件相机（event camera）推断 3DGS 的计算神经形态成像方案，纯事件监督实现高效新视角合成。
- **创新点**: ① 首次 CNI-informed 推断 3DGS；② 仅用事件监督克服运动模糊/光照不足；③ 相比 NeRF 基方法显著降低计算占用。
- **核心方法**: 将 3D 高斯与事件流监督结合，无需帧图像；可微 splatting 适配事件信号训练。
- **实验设计与分析**: 对比帧输入方法，渲染更真实、模糊更少；相对已有方法重建质量有竞争力且计算占用降低。具体数字待补。
- **写作可嫁接点**: 事件相机/极速运动/低光照 3DGS、神经形态成像基线引用。
- **核查**: arxiv 标题=Ev-GS: Event-based Gaussian splatting for Efficient and Accurate Radiance Field Rendering（一致）。

### VastGaussian / GES (`2402.17427`, CVPR 2024)
- **摘要**: 首个面向大场景的 3DGS 高质量重建与实时渲染方法，解决显存、训练时长与外观变化问题。
- **创新点**: ① 渐进式分块策略将大场景切 cell 并行优化再合并；② 空域可见性准则合理分配相机与点云；③ 解耦外观建模抑制渲染外观变化。
- **核心方法**: 大场景按空间分块，逐块并行优化高斯并合并；解耦的 appearance embedding 处理跨视角光照差异。
- **实验设计与分析**: 多个大场景数据集；优于 NeRF 基方法并达 SOTA，快速训练+高保真实时渲染。具体数字待补。
- **写作可嫁接点**: 大场景/城市级 3DGS、分块训练相关基线（注：任务文件缩写 GES，实为 VastGaussian）。
- **核查**: arxiv 标题=VastGaussian: Vast 3D Gaussians for Large Scene Reconstruction（一致；任务文件方法名 GES 与标题不符，以真实标题为准）。

### GOF / Self-Organizing Gaussian Grids (`2312.13299`, ECCV 2024)
- **摘要**: 将 3DGS 参数组织进具局部同质性的 2D 网格，大幅降低存储且不损渲染质量，便于资源受限设备部署。
- **创新点**: ① 显式利用自然场景感知冗余，将高维高斯参数规则排布到 2D 网格；② 训练中强制网格内局部平滑；③ 未压缩结构兼容现成光栅化器。
- **核心方法**: 高并行算法把高斯参数排序进 2D grid（保持邻域结构），JPEG XL 等压缩属性；同构 3DGS 渲染。
- **实验设计与分析**: 复杂场景尺寸压缩 17×–42×，训练时间不增；支撑"紧凑存储+质量不变"claim。
- **写作可嫁接点**: 3DGS 压缩/紧凑表示、存储优化相关对比引用。
- **核查**: arxiv 标题=Compact 3D Scene Representation via Self-Organizing Gaussian Grids（一致；任务文件缩写 GOF）。

### GS-PT (`2409.04963`, ECCV 2024)
- **摘要**: 首次将 3DGS 引入点云自监督学习，用 3DGS 生成增强点云分布与新视角图，做三模态对比学习。
- **创新点**: ① 首将 3DGS 用于点云自监督预训练；② transformer 重建掩码点云 + 3DGS 多视角渲染做数据增广；③ 跨模态（点云/深度/图像）对比。
- **核心方法**: transformer 骨干自监督预训练，3DGS 渲染多视图生成增强样本，融合深度特征做三模态对比损失。
- **实验设计与分析**: 下游分类/真实分类/小样本学习与分割优于现成自监督方法；具体指标数字待补。
- **写作可嫁接点**: 点云表征学习、3DGS 作为数据增广/预训练组件相关引用。
- **核查**: arxiv 标题=GS-PT: Exploiting 3D Gaussian Splatting for Comprehensive Point Cloud Understanding via Self-supervised Learning（一致）。

### GS2Mesh (`2404.01810`, CVPR 2024)
- **摘要**: 从 3DGS 经"新立体视图"重建网格，用预训练立体匹配模型抽取深度，再融合得平滑准确网格。
- **创新点**: ① 不直接从高斯属性取几何，而用立体匹配模型注入真实世界知识；② 渲染立体对齐图像对→深度剖面→融合为网格；③ 仅在 3DGS 优化上小开销。
- **核心方法**: 在原训练位姿渲染 stereo pairs → 立体模型得 depth → 多深度融合成 mesh；避免几何约束噪声。
- **实验设计与分析**: in-the-wild 手机场景 + Tanks&Temples + DTU，达 SOTA 表面重建；具体数字待补。
- **写作可嫁接点**: 由 3DGS 提网格/表面重建、stereo 引导几何相关对比。
- **核查**: arxiv 标题=GS2Mesh: Surface Reconstruction from Gaussian Splatting via Novel Stereo Views（一致）。

### GSDF (`2403.16964`, NeurIPS 2024)
- **摘要**: 双分支架构结合灵活的 3DGS 与神经 SDF，互相引导+联合监督，解锁更准表面重建并反哺渲染。
- **创新点**: ① 3DGS+SDF 双分支联合优化；② 互引导缓解单分支局限；③ 联合监督同时提升重建细节与渲染几何对齐。
- **核心方法**: 一支 3DGS 高效渲染、一支 SDF 提供连续表面；两分支共享几何监督，互为正则。
- **实验设计与分析**: 多样场景显示更准确细致表面重建且 3DGS 渲染更贴合几何；指标待补。
- **写作可嫁接点**: 3DGS+隐式表面（SDF）混合、几何-外观联合优化相关对比。
- **核查**: arxiv 标题=GSDF: 3DGS Meets SDF for Improved Rendering and Reconstruction（一致）。

### GSurf (`2411.15723`, 待核*)
- **摘要**: 将 SDF 直接整合进 splatting 管线，用 SDF 连续正则高斯基元以填补几何空洞、抑制稀疏点云噪声。
- **创新点**: ① 不依赖重度体渲染采样，直接把 SDF 正则化嵌入 splatting；② 用 SDF 连续性质填洞降噪；③ 更少基元得高质量表面。
- **核心方法**: SDF 分支对高斯基元做连续正则（相比纯离散高斯），结合高效光栅化加速收敛。
- **实验设计与分析**: 室内外场景评估，更少基元获高质量表面、紧凑高效表示；具体数字待补。
- **写作可嫁接点**: SDF 引导高斯表面重建、开放/稀疏场景相关对比。
- **核查**: arxiv 标题=GSurf: Learning Signed Distance Fields from Splatting Opaque Gaussians for High-quality 3D Reconstruction（一致）；*任务文件标 CVPR2024，但提交于 2024-11，venue 待核。

### GVKF (`2411.01853`, NeurIPS 2024)
- **摘要**: 用高斯-体素核函数（kernel regression）在离散 3DGS 上建立连续场景表示，实现开放场景高效高保真表面重建。
- **创新点**: ① 通过核回归把离散 3DGS 提升为连续隐式表示；② 融合快速 3DGS 光栅化与有效隐式表达；③ 显著降低存储/训练显存。
- **核心方法**: 以核函数回归从高斯基元得到连续场，保留光栅化速度同时获得连续几何。
- **实验设计与分析**: 挑战性开放场景数据集，高重建质量+实时渲染+显著存储/显存节省；数字待补。
- **写作可嫁接点**: 开放场景表面重建、连续化离散高斯相关对比。
- **核查**: arxiv 标题=GVKF: Gaussian Voxel Kernel Functions for Highly Efficient Surface Reconstruction in Open Scenes（一致）。

### GaussianImage (`2403.08551`, ECCV 2024)
- **摘要**: 用 2D 高斯（每高斯 8 参数）表示图像，提出累加求和渲染，达成 1500–2000 FPS 表示/压缩，显存降 3×、拟合快 5×。
- **创新点**: ① 首次 2D 高斯做图像表示/压缩范式；② 基于累加求和的新渲染算法；③ 向量量化构建图像编解码器，解码约 2000 FPS。
- **核心方法**: 2D 高斯（位置/协方差/颜色）拟合图像，accumulated-summation 渲染；量化成 codec。
- **实验设计与分析**: 率失真性能比肩 COIN/COIN++，渲染 1500–2000 FPS、解码约 2000 FPS；支撑"高速低显存"claim。
- **写作可嫁接点**: 2D 高斯图像表示、INR 替代/图像压缩相关引用。
- **核查**: arxiv 标题=GaussianImage: 1000 FPS Image Representation and Compression by 2D Gaussian Splatting（一致）。

### GaussianPretrain (`2411.12452`, 待核*)
- **摘要**: 面向自动驾驶视觉预训练，用 3D 高斯锚点统一几何与纹理表示，比 NeRF 基 UniPAD 快 40.6%、仅 70% 显存。
- **创新点**: ① 将 3D 高斯锚点视作体素 LiDAR 点统一学几何+纹理；② 比 NeRF 基方法快 40.6%/70% 显存；③ 多 3D 感知任务增益。
- **核心方法**: 以 3D Gaussian anchors 编码场景结构与纹理，做自监督预训练后迁移到检测/地图/占据。
- **实验设计与分析**: 3D 检测 NDS +7.05%、HD 地图 mAP +1.9%、占据 +0.8%；支撑"统一几何纹理+高效"claim。
- **写作可嫁接点**: 自动驾驶 3D 预训练、高斯锚点作为 LiDAR 代理相关对比。
- **核查**: arxiv 标题=GaussianPretrain: A Simple Unified 3D Gaussian Representation for Visual Pre-training in Autonomous Driving（一致）；*任务文件标 CVPR2024，提交于 2024-11，venue 待核。

### GaussianSR (`2406.10111`, CVPR 2024)
- **摘要**: 基于 3DGS 的高分辨率新视角合成（HRNVS），用 2D 扩散先验 SDS 蒸馏进 3D，缓解生成随机性带来的冗余基元。
- **创新点**: ① 在 3DGS 上用 SDS 蒸馏 2D 扩散知识做超分；② 退火策略缩小扩散时间步范围；③ densification 时随机丢弃冗余高斯。
- **核心方法**: 低分辨率输入训练 3DGS，SDS + 退火 timestep + 冗余基元丢弃，抑制随机扰动。
- **实验设计与分析**: 合成与真实数据集低分辨率输入下达高质量 HRNVS；具体数字待补。
- **写作可嫁接点**: 3DGS 超分辨率、扩散先验蒸馏相关对比。
- **核查**: arxiv 标题=GaussianSR: 3D Gaussian Super-Resolution with 2D Diffusion Priors（一致）。

### LE3D (`2406.06216`, NeurIPS 2024)
- **摘要**: 用 3DGS 做 RAW 图像 HDR 新视角合成/重对焦，锥形散布初始化+Color MLP 替代 SH，训练时间降至 1%、渲染快达 4000×。
- **创新点**: ① Cone Scatter Initialization 丰富 SfM 低信噪比估计；② 用 Color MLP 替代 SH 表达 RAW 线性色；③ 深度畸变+远近正则改善结构。
- **核心方法**: 由 RAW 图训练 3DGS，Color MLP 建模线性色空间，几何正则支撑下游重对焦/色调映射。
- **实验设计与分析**: 相对体渲染方法训练时间降至 1%、2K 渲染 FPS 提升达 4000×；支撑"夜间/HDR 实时"claim。
- **写作可嫁接点**: RAW/HDR 夜间场景、重对焦、3DGS 低光相关对比。
- **核查**: arxiv 标题=Lighting Every Darkness with 3DGS: Fast Training and Real-Time Rendering for HDR View Synthesis（一致；任务文件缩写 LE3D）。

### Mip-Splatting (`2311.16493`, CVPR 2024 Best Student Paper)
- **摘要**: 发现 3DGS 改变采样率（焦距/距离）出现强伪影，源于缺 3D 频率约束与用 2D 膨胀滤波，提出 3D+2D 抗锯齿。
- **创新点**: ① 3D 平滑滤波按输入视图最大采样频率约束高斯尺寸，消除放大高频伪影；② 以 2D Mip 滤波替代 2D 膨胀，缓解混叠/膨胀。
- **核心方法**: 3D smoothing filter 约束基元尺寸 + 2D box-filter（Mip）模拟，正则化训练。
- **实验设计与分析**: 单尺度训练多尺度测试验证有效；支撑"alias-free"claim。具体指标待补。
- **写作可嫁接点**: 抗锯齿/多尺度一致性 3DGS、所有需变焦场景的必引基线。
- **核查**: arxiv 标题=Mip-Splatting: Alias-free 3D Gaussian Splatting（一致）。

### NegGS (`2405.18163`, arXiv 2024)
- **摘要**: 提出"负高斯"（负颜色）与 Diff-Gaussian（两高斯 PDF 相除）扩展 3DGS 表达非线性结构（如甜甜圈/月牙形）。
- **创新点**: ① 首次把简单椭球扩展为含负色的复杂非线性结构；② Diff-Gaussian 近似高曲率形状；③ 用更少组件建模高频/阴影。
- **核心方法**: 引入带符号颜色的高斯（负高斯）及两高斯相除分布，扩展基元表达力。
- **实验设计与分析**: 增强高频快速颜色过渡与阴影建模；具体数据集/指标待补。
- **写作可嫁接点**: 高斯基元表达力扩展、非线性/薄结构相关讨论引用。
- **核查**: arxiv 标题=NegGS: Negative Gaussian Splatting（一致）。

### NeuSG (`2312.00846`, CVPR 2024)
- **摘要**: 神经隐式表面重建中引入 3DGS 引导，生成密集点云，配合尺度正则与法向细化恢复高细节表面。
- **创新点**: ① 用 3DGS 生成密集点云引导 SDF；② scale regularizer 拉薄高斯使中心贴面；③ 用隐式模型法向细化高斯点云（非固定点）。
- **核心方法**: 联合优化 3DGS 与神经隐式 SDF，高斯点云经法向先验精炼后监督表面。
- **实验设计与分析**: Tanks&Temples 验证有效；具体指标待补。支撑"细节表面"claim。
- **写作可嫁接点**: 3DGS 引导隐式表面重建、点云-隐式联合优化相关对比。
- **核查**: arxiv 标题=NeuSG: Neural Implicit Surface Reconstruction with 3D Gaussian Splatting Guidance（一致）。

### Normal-GS (`2410.20593`, NeurIPS 2024)
- **摘要**: 把法向量整合进 3DGS 渲染管线，用基于物理的渲染方程建模法向与光照交互，获准 SOTA 视觉质量与准确法向且实时。
- **创新点**: ① 首次将法向参与 3DGS 渲染（PBR 方程）；② 把表色重参数化为法向×IDIV（Integrated Directional Illumination Vector）；③ anchor-based 3DGS 隐式共享 IDIV。
- **核心方法**: anchor 基 3DGS 编码局部共享 IDIV，法向+IDE 建模镜面；渲染与几何联合优化。
- **实验设计与分析**: 近 SOTA 视觉质量同时获准确法向、保留实时；具体数字待补。
- **写作可嫁接点**: 法向/PBR 感知 3DGS、镜面与几何联合优化相关对比。
- **核查**: arxiv 标题=Normal-GS: 3D Gaussian Splatting with Normal-Involved Rendering（一致）。

### ODGS (`2410.20686`, NeurIPS 2024)
- **摘要**: 面向全景（360°）图像的 3DGS 光栅化管线，定义切平面投影高斯到全景图，CUDA 并行化比 NeRF 快 100×。
- **创新点**: ① 为全景图设计几何可解释的 3DGS 光栅化；② 每个高斯定义与单位球相切且垂直视线的切平面投影；③ 数学证明隐含假设。
- **核心方法**: 把高斯投影到切平面再变换/合成进全景图，完成全景光栅化；CUDA 实现。
- **实验设计与分析**: 多数据集重建与感知质量 SOTA，漫游大场景细节好；比 NeRF 快约 100×。支撑"全景实时"claim。
- **写作可嫁接点**: 全景/360° 3DGS、等距投影光栅化相关对比。
- **核查**: arxiv 标题=ODGS: 3D Scene Reconstruction from Omnidirectional Images with 3D Gaussian Splattings（一致）。

### PGSR (`2406.06521`, TVCG 2024)
- **摘要**: 平面基高斯 splatting，提出无偏深度渲染（高斯面到相机原点距离/法向图），配单视图几何+多视图光度+几何正则，高保真表面重建。
- **创新点**: ① 无偏深度渲染：直接渲染高斯平面距离与法向再相除得 depth；② 单视图几何+多视图光度+几何三重正则保全局精度；③ 相机曝光补偿应对光照变化。
- **核心方法**: 平面假设下的高斯，渲染平面距离与法向得无偏深度；多正则联合优化。
- **实验设计与分析**: 室内外场景快速训练渲染同时高保真几何重建，优于 3DGS/NeRF 基方法；数字待补。
- **写作可嫁接点**: 无偏深度/法向渲染、平面基 3DGS 表面重建相关对比。
- **核查**: arxiv 标题=PGSR: Planar-based Gaussian Splatting for Efficient and High-Fidelity Surface Reconstruction（一致）。

### SAGS (`2510.27318`, 待核*)
- **摘要**: 自适应该无混叠高斯 splatting，用于动态手术内窥镜重建，用 4D 形变解码 + 3D 平滑/2D Mip 滤波抑制可变形组织伪影。
- **创新点**: ① 注意力驱动动态加权 4D 形变解码；② 复用 3D smoothing + 2D Mip 滤波抗内窥镜混叠；③ 捕捉组织运动细节。
- **核心方法**: 动态手术场景 4D 形变场 + alias-free 滤波，端到端优化可变形 3DGS。
- **实验设计与分析**: EndoNeRF、SCARED 上 PSNR/SSIM/LPIPS 全面优于 SOTA 且可视更佳；具体数字待补。
- **写作可嫁接点**: 动态/可变形 3DGS、医疗内窥镜重建相关对比。
- **核查**: arxiv 标题=SAGS: Self-Adaptive Alias-Free Gaussian Splatting for Dynamic Surgical Endoscopic Reconstruction（一致）；*任务文件标 ECCV2024，实际提交于 2025-10，年份差异待核。

### SVGS (`2411.18966`, IEEE TVCG*)
- **摘要**: 在单高斯基元内引入空间变化颜色与不透明度（双线性插值/可移动核/微型网络），用 2D surfel 高斯提升新视角合成且保几何。
- **创新点**: ① 单基元内空间变化颜色/不透明度，打破单色单透假设；② 三种空间变化函数（bilinear/movable kernel/tiny NN）；③ 2D Gaussian surfel 基元兼具几何。
- **核心方法**: 2D Gaussian surfels + 空间变化函数参数化，提升表示紧凑度与重建质量。
- **实验设计与分析**: 多数据集 movable kernels 最优；具体数字待补。支撑"紧凑+高质量"claim。
- **写作可嫁接点**: 空间变化/多色高斯基元、surfel 3DGS 相关对比。
- **核查**: arxiv 标题=SVGS: Enhancing Gaussian Splatting Using Primitives with Spatially Varying Colors（一致）；*任务文件标 arXiv2024，arxiv 期刊 IEEE TVCG。

### SplatFields (`2409.11211`, ECCV 2024)
- **摘要**: 将 splat 特征建模为隐式神经场输出，为正则化引入空间自相关，提升稀疏 3D/4D 重建质量。
- **创新点**: ① 指出 3DGS 在稀疏下因特征缺空间自相关而劣；② 用对应隐式神经场输出正则化 splat 特征；③ 同时处理静态与动态。
- **核心方法**: 把每个高斯特征视为隐式场的采样，场提供空间平滑先验，缓解少视图过拟合。
- **实验设计与分析**: 多种静态/动态配置与复杂度测试，稀疏设定质量一致提升；具体数字待补。
- **写作可嫁接点**: 稀疏视图 3DGS、特征正则化/隐式场引导相关对比。
- **核查**: arxiv 标题=SplatFields: Neural Gaussian Splats for Sparse 3D and 4D Reconstruction（一致）。

### SuGaR (`2311.12775`, CVPR 2024)
- **摘要**: 从 3DGS 极快提取网格：正则使高斯对齐表面，用 Poisson 重建提网格，可选把高斯绑定到网格联合优化便于编辑。
- **创新点**: ① 表面对齐正则项；② 用 Poisson 重建（非 Marching Cubes）从高斯提网格，快且保细节；③ 可选网格绑定高斯联合优化。
- **核心方法**: 正则对齐→Poisson 重建 mesh→可选 binding 联合 splatting 优化。
- **实验设计与分析**: 数分钟得可编辑网格，优于神经 SDF 方法数小时且渲染更优；具体数字待补。
- **写作可嫁接点**: 高斯→网格提取、可编辑/可绑定 3DGS 相关对比。
- **核查**: arxiv 标题=SuGaR: Surface-Aligned Gaussian Splatting for Efficient 3D Mesh Reconstruction and High-Quality Mesh Rendering（一致）。

### SuperGS (`2410.02571`, CVPR 2024)
- **摘要**: 低分辨率输入的超分辨率 3DGS，两阶段粗到细，潜特征场 + 变分残差特征（方差作不确定性）引导 densification 与损失。
- **创新点**: ① 两阶段 coarse-to-fine 框架，LR 潜特征场初始化；② 变分残差特征增强 HR 细节、方差作不确定性估计；③ 多视图联合学习缓解伪标签不一致。
- **核心方法**: 3DGS 扩展，latent feature field + variational residual，不确定性引导 densify。
- **实验设计与分析**: 真实与合成数据集仅 LR 输入超 SOTA HRNVS；具体数字待补。
- **写作可嫁接点**: 3DGS 超分辨率（与 GaussianSR 并列）、不确定性引导相关对比。
- **核查**: arxiv 标题=SuperGS: Super-Resolution 3D Gaussian Splatting Enhanced by Variational Residual Features and Uncertainty-Augmented Learning（一致）。

### VCR-GauS (`2406.05774`, NeurIPS 2024)
- **摘要**: 提出深度-法向正则器直接把法向与其他几何参数耦合，全量更新几何参数，并用置信项缓解多视图法向不一致。
- **创新点**: ① 法向-几何参数直接耦合，正则有效更新旋转外其他几何参；② 置信项减轻多视图法向预测不一致；③ 专用 densify/split 正则尺寸分布。
- **核心方法**: depth-normal regularizer 联合监督 + confidence weighting + 几何感知 densification。
- **实验设计与分析**: 比高斯基线重建质量更优、外观有竞争力，训练更快且 100+ FPS 渲染；数字待补。
- **写作可嫁接点**: 法向监督表面重建、视图一致正则相关对比。
- **核查**: arxiv 标题=VCR-GauS: View Consistent Depth-Normal Regularizer for Gaussian Surface Reconstruction（一致）。

### WildGaussians (`2407.08447`, NeurIPS 2024)
- **摘要**: 处理野外数据（遮挡/动态物体/光照变化）的 3DGS，利用鲁棒 DINO 特征 + 外观建模模块达 SOTA 且实时。
- **创新点**: ① 用鲁棒 DINO 特征应对遮挡/动态；② 在 3DGS 内集成 appearance modeling 模块；③ 简单架构下同时超 3DGS 与 NeRF 基线。
- **核心方法**: 显式 3DGS + per-image appearance embedding + DINO 鲁棒特征监督。
- **实验设计与分析**: 野外（in-the-wild）数据上匹配 3DGS 实时速度且超 3DGS/NeRF 基线；具体数字待补。
- **写作可嫁接点**: 无约束/野外场景 3DGS、外观变化与遮挡处理相关对比。
- **核查**: arxiv 标题=WildGaussians: 3D Gaussian Splatting in the Wild（一致）。

---

## 二、2025 已确立（共 6 篇，简表）

| 方法名 | arxiv_id | venue | year | 一句话贡献 |
|---|---|---|---|---|
| GS-Blur | 2410.23658 | NeurIPS 2024 D&B* | 2025 | 用 3DGS 重建场景并沿运动轨迹渲染合成大规模真实模糊数据集，提升去模糊泛化。 |
| GaussHDR | 2503.10143 | CVPR 2025 | 2025 | 统一 3D+2D 局部色调映射与不确定性学习，实现稳定 HDR 新视角合成。 |
| GaussRender | 2502.05040 | ICCV 2025* | 2025 | 用可微高斯渲染把预测/真值 3D 占据投影到 2D 做投影一致性监督，提升占据几何。 |
| MarineSTD-GS | 2604.23551 | ACM MM 2025 | 2025 | 时空退化感知水下 3DGS，内外高斯解耦还原无水质真实外观。 |
| Speedy-Splat | 2412.00578 | CVPR 2025 | 2025 | 稀疏像素定位 + 剪枝，平均渲染加速 6.71× 兼减模型与训练耗时。 |
| UniGS | 2510.12174 | 待核* | 2025 | 几何感知统一光栅化，同步渲染 RGB/深度/法向/语义并解析梯度可微剪枝。 |

> *差异：GS-Blur 任务文件标 CVPR2025，arxiv 标 NeurIPS 2024 Datasets&Benchmarks；GaussRender 任务文件标 CVPR2025，arxiv 标 ICCV 2025；UniGS venue 待核（提交 2025-10）。

---

## 三、2026 近期焦点（共 4 篇，详写满五要素）

### SPLATIFY (`2610.09116`, 2026)
- **摘要**: 多智能体框架，将 3DGS 论文自动转为可训练的 gsplat 实现，并能在无公开代码时匹配专家实现、经组合发现进一步提 PSNR 最高 2.4 dB。
- **创新点**: ① 为 gsplat 设计上下文无关文法约束生成代码满足架构不变量；② 组件级 fork-aware 引用恢复 + Graph-of-Thought 拓扑合成 + 20+ 实现 RAG 示例；③ 视觉反馈（PSNR 再生/Gaussian 结构检查/VLM 补丁）；④ 知识驱动组合改进自主发现弱点并组合正则/损失/密度策略；⑤ 跨学科方法发现检索物理先验合成新场景方法，并附 SPLATIFY-Bench（30 篇）。
- **核心方法**: 以模块化方法模板（loss/densification/rendering/optimization 扩展点）+ CFG 约束合成；复用 gsplat 不变式；视觉与数值反馈闭环修复；组合式正则搜索。
- **实验设计与分析**: 在无公开代码论文上匹配专家实现、开发从数周降至数分钟；组合发现 PSNR 最高 +2.4 dB；并展示体积星云等科学域新方法。SPLATIFY-Bench 跨 30 篇评测。具体逐场景数字待补。
- **写作可嫁接点**: 作为"自动化复现/代码生成/3DGS 方法组合发现"的方法与基线引用；可用其 Bench 做可复现性讨论；对比通用 paper-to-code 系统。
- **核查**: arxiv 标题=SPLATIFY: Reproduce, Discover, Innovate! From Papers and Ideas to Trainable 3DGS Code（一致；提交 2026-10）。

### TangoGS (`2609.31248`, 2026)
- **摘要**: 跨场景尺度自动确定高斯数量——由采集（capture）定模型尺度、由训练质量定最终大小，无需重调参即在大小场景均获 SOTA 质量-尺寸折中。
- **创新点**: ① 将"高斯数量自动选择"分解为捕获派生尺寸 + 训练自适应；② 由捕获总像素（扣除重复观测视图）推导模型增长"学习额度"（learning allowance）；③ 训练中由重建质量引导增删高斯，跨尺度无需重调。
- **核心方法**: 训练前依捕获范围与分辨率估算模型规模增长额度；训练中按训练视图重建质量动态 densify/prune，实现尺度自适应大小控制。
- **实验设计与分析**: 13 个标准基准匹配最佳基线 LeGS 的平均 PSNR 且少 48% 高斯；8 个大采集上同配置自动放大，平均 PSNR 最高者、超次优 +0.54 dB（次优用 2.3× 高斯）。支撑"跨尺度质量-尺寸权衡"claim。
- **写作可嫁接点**: 高斯数量/模型尺寸自动规划、密度控制策略、大场景扩展相关对比；可作效率-质量基线引用。
- **核查**: arxiv 标题=Gauss What You Need: Compact Gaussian Splatting Across Scene Scales（一致；TangoGS 为方法名，提交 2026-09）。

### TileSkipper (`2610.09343`, 2026)
- **摘要**: 面向已训练 checkpoint 的静态逐高斯 tile 剪枝策略选择：用校准渲染度量候选对节省与失真代理，跨 64 个高斯组分配截断阈值，导出每高斯 1 字节策略，无参数更新/无额外核/无逐帧推理。
- **创新点**: ① 为冻结 checkpoint 选静态逐高斯贡献截断策略（非训练期）；② 校准渲染度量"候选对节省"与考虑前层透射率与背景色的孤立移除失真代理；③ 在独立选择视图完整渲染后接受策略；④ 仅 1 字节/高斯，纯编译器式加速、可集成现有 opacity-aware 边界。
- **核心方法**: 对固定 checkpoint 做 tile 枚举贡献截断阈值搜索；64 组分配 + 失真代理 + 独立视图验证；导出字节策略，零参数改动。
- **实验设计与分析**: 13 个场景（Mip-NeRF360/T&T/DeepBlending）固定策略 AccuTile 扫描在标准分辨率 1.088×、3840px 宽 1.238× 提速，PSNR 变化 −0.007/−0.023 dB；6 个 opacity-aware 边界集成得 1.009×–1.121× 编译器仅提速；与 AdaGScale 比较随机制而定。支撑"近无损区域自适应 tile 剪枝"claim。
- **写作可嫁接点**: 推理期光栅化加速、tile 枚举/贡献截断、与 opacity-aware bounds 集成的效率基线；可作"零训练加速"对比项。
- **核查**: arxiv 标题=TileSkipper: Region-Adaptive Tile Pruning for 3D Gaussian Splatting（一致；提交 2026-10）。

### Speedy-Splat (`2412.00578`, CVPR 2025 / 2026 焦点)
- **摘要**: 定位并解决 3D-GS 两处低效：精确局部化高斯以提速渲染（不改视觉保真），及新剪枝技术减模型与训练时间并进一步提速，平均渲染加速 6.71×。
- **创新点**: ① 渲染管线优化精确局部化高斯，提升渲染速度且不改保真；② 新剪枝技术整合进训练，显著减模型尺寸与训练时间并再提渲染速度；③ 二者组合得 Speedy-Splat。
- **核心方法**: 稀疏像素定位（sparse pixel localization）加速光栅化 + 训练期剪枝（pruning）压缩基元；兼得更小模型/更快训练/更快渲染。
- **实验设计与分析**: Mip-NeRF360、Tanks&Temples、Deep Blending 三数据集，平均渲染速度提升 6.71×；并降模型尺寸与训练时间。支撑"渲染加速+模型压缩"claim（CVPR 2025 pp.21537-21546）。
- **写作可嫁接点**: 推理加速与模型压缩 3DGS 的必引基线；与 LightGaussian/紧凑表示/本簇 TileSkipper、TangoGS 并列效率对比。
- **核查**: arxiv 标题=Speedy-Splat: Fast 3D Gaussian Splatting with Sparse Pixels and Sparse Primitives（一致；CVPR 2025，提交 2024-11，2026 焦点复看）。


---

## 簇二 · 压缩与流式 <a id="B_Compression"></a>

# 知识库 · 簇 B_Compression（3DGS 压缩与流式）

> 研读子代理产出。经典(2023-2024)深度全覆盖、2025 简表、2026 近期焦点详写。
> 所有 ID 已通过 `https://arxiv.org/abs/<id>` 核验（2026-10-08）。指标仅取自 arxiv 摘要或确知内容，未核实项标「待补」。

---

## 经典论文（2023-2024，深度全覆盖）

### ContextGS (`2405.20721`, NeurIPS 2024)
- **摘要**: 针对 3DGS 高斯数量大、属性多的存储问题，提出首个锚点级（anchor-level）自回归上下文模型做压缩。将锚点分多个层级，未编码锚点可由更粗层级已编码锚点预测，并以低维量化超先验辅助最粗层级熵编码，相对 vanilla 3DGS 压缩超 100×、相对 Scaffold-GS 约 15×，质量持平或更优。
- **创新点**: ① 首次把图像压缩中的上下文模型引入 3DGS 锚点级自回归预测；② 以层级结构显式建模锚点间空间依赖，而非逐个独立编码；③ 引入低维量化超先验（hyperprior）解决最粗层无上下文可参考的问题。
- **核心方法**: 锚点分级 → 粗到细自回归上下文预测 → 低维量化特征作超先验 → 熵编码。关键模块：anchor-level context model、quantized hyperprior。
- **实验设计与分析**: 数据集未明列（摘要未给）；基线与 vanilla 3DGS 及 Scaffold-GS 比；核心指标为存储压缩比与渲染质量。结果支撑 claim：>100× vs vanilla、15× vs Scaffold-GS、质量持平/更优。具体 PSNR/SSIM 数字「待补」。
- **写作可嫁接点**: 在 related-work 中将"上下文模型压缩 3DGS"的源头引用到此；与 HAC 同属 anchor/context 路线，可做 context 建模方式对比（层级自回归 vs hash-grid 连续空间一致性）。
- **核查**: arxiv 标题=ContextGS: Compact 3D Gaussian Splatting with Anchor Level Context Model（一致）。

### EAGLES (`2312.04564`, ECCV 2024)
- **摘要**: 用量化嵌入（quantized embeddings）大幅降低每点存储，配合由粗到细（coarse-to-fine）训练策略稳定优化高斯点云，并引入剪枝阶段减少高斯数量，在保持重建质量的同时将存储内存降低一个数量级以上（10–20×），训练/推理更快。
- **创新点**: ① 以量化嵌入替代逐点全精度属性，直接削减每点存储；② 由粗到细训练提升优化稳定性与速度；③ 显式剪枝阶段得到更少高斯，兼顾实时高分辨率渲染。
- **核心方法**: 量化嵌入编码 + coarse-to-fine 训练 + pruning。关键模块：lightweight embeddings、pruning stage。
- **实验设计与分析**: 多数据集/场景验证（摘要未列具体名）；基线为原始 3D-GS；核心指标存储/内存、训练与推理速度、视觉质量。结果：10–20× 更少内存、更快训练推理、质量保持。具体 FPS/PSNR「待补」。
- **写作可嫁接点**: 作为"轻量编码 + 剪枝"路线的代表；与 LightGaussian 的剪枝-恢复、CompGS 的 VQ 可并列为早期压缩三派对比。
- **核查**: arxiv 标题=EAGLES: Efficient Accelerated 3D Gaussians with Lightweight EncodingS（一致）。

### HAC (`2403.14530`, ECCV 2024)
- **摘要**: 针对高斯（锚点）稀疏无序导致压缩困难，利用无序锚点与结构化哈希网格的关系做上下文建模，提出 Hash-grid Assisted Context（HAC）框架。引入二值哈希网格建立连续空间一致性、以上下文模型揭示锚点空间关系，配合以高斯分布估计量化属性概率的自适应量化与自适应掩码剔除无效高斯，相对 vanilla 3DGS 压缩 >75× 且提升保真度、相对 Scaffold-GS >11×。
- **创新点**: ① 首个探索 3DGS 基于上下文的压缩（pioneer context-based compression）；② 用二值哈希网格桥接无序锚点与结构化网格，建立连续空间一致性；③ 自适应量化 + 自适应掩码分别提升保真度与剔除冗余。
- **核心方法**: 二值哈希网格 → 上下文模型（空间关系） → 高斯分布概率估计 → 自适应量化（adaptive quantization） → 自适应掩码（adaptive masking）。
- **实验设计与分析**: 基线与 vanilla 3DGS、Scaffold-GS 比；核心指标压缩比与保真度。结果支撑 claim：>75× vs vanilla、>11× vs Scaffold-GS 且保真度提升。数据集与具体质量数字「待补」。
- **写作可嫁接点**: 上下文压缩路线的奠基之作，related-work 中置于 ContextGS 前作/并列；hash-grid 桥接思路可与 Scaffold-GS 的 anchor 结构对照。
- **核查**: arxiv 标题=HAC: Hash-grid Assisted Context for 3D Gaussian Splatting Compression（一致），Journal ref: ECCV 2024。

### LightGaussian (`2311.17245`, NeurIPS 2024)
- **摘要**: 将 3D 高斯压缩为更紧凑格式：借鉴网络剪枝识别对场景重建全局显著性低的高斯并做剪枝-恢复，再以知识蒸馏与伪视图增广把球谐系数降到更低阶，最后基于全局显著性的高斯向量量化（VQ）进一步降比特。平均 15× 压缩，FPS 由 144 提升至 237，在 Mip-NeRF 360 与 Tank&Temple 上验证，剪枝亦可迁移到 Scaffold-GS。
- **创新点**: ① 以"全局显著性"为准则的剪枝+恢复去除冗余高斯；② 知识蒸馏+伪视图将 SH 系数降阶；③ 依显著性的向量量化降比特，且剪枝可泛化到其它表示（如 Scaffold-GS）。
- **核心方法**: 显著性剪枝与恢复 → SH 降阶（知识蒸馏+伪视图增广） → 高斯向量量化（VQ）。关键模块：Gaussian Pruning、Gaussian Vector Quantization。
- **实验设计与分析**: 数据集 Mip-NeRF 360、Tank&Temple；基线与 3D-GS（及 Scaffold-GS 泛化）；核心指标压缩率、FPS、质量。结果：平均 15× 压缩、144→237 FPS。具体 PSNR/SSIM「待补」。
- **写作可嫁接点**: 作为"剪枝+蒸馏+VQ"综合压缩范式代表；与 EAGLES/CompGS 同列早期压缩法，强调其"unbounded 场景 + 200+ FPS"的工程卖点。
- **核查**: arxiv 标题=LightGaussian: Unbounded 3D Gaussian Compression with 15x Reduction and 200+ FPS（一致），Comments: NeurIPS 2024。

### QUEEN (`2412.04469`, NeurIPS 2024)
- **摘要**: 面向在线自由视点视频（FVV）流式传输，提出量化高效编码框架 QUEEN。直接在每时间步学习相邻帧间高斯属性残差（无结构约束），并以量化-稀疏框架存储：学习的隐解码器量化非位置残差、门控模块稀疏化位置残差；用视空间梯度差向量区分静/动态以引导稀疏学习并加速训练。在多个 FVV 基准上全面超越 SOTA 在线 FVV 方法，高动态场景每帧仅 0.7 MB、训练 <5 s、渲染 350 FPS。
- **创新点**: ① 面向流式 FVV 的逐帧残差学习，无结构约束保持质量与泛化；② 量化-稀疏框架（隐解码器量化 + 门控稀疏化位置残差）；③ 视空间梯度差向量作静态/动态分离信号，引导稀疏并加速。
- **核心方法**: 帧间属性残差学习 → 量化-稀疏框架（latent-decoder 量化 + gating 稀疏） → viewspace gradient difference 静/动态引导。关键模块：quantization-sparsity framework、learned gating module。
- **实验设计与分析**: 多样 FVV 基准（摘要未列具体名）；基线与 SOTA 在线 FVV 方法；核心指标模型大小/每帧、训练时间、FPS、质量。结果：全面超越 SOTA，高动态场景 0.7 MB/帧、<5 s 训练、350 FPS。具体数据集与质量数字「待补」。
- **写作可嫁接点**: 流式/动态高斯压缩的代表，related-work 中归为"dynamic/streaming 3DGS 压缩"；与静态场景压缩（HAC/LightGaussian）做静/动区分对比。
- **核查**: arxiv 标题=QUEEN: QUantized Efficient ENcoding of Dynamic Gaussians for Streaming Free-viewpoint Videos（一致），Comments: NeurIPS 2024。

### RDO-Gaussian (`2406.01597`, ECCV 2024)
- **摘要**: 将紧凑 3D 高斯学习建模为端到端率失真优化（RDO）问题，提出 RDO-Gaussian 实现灵活连续码率控制。两点改进：以动态剪枝与熵约束矢量量化（ECVQ）联合优化率与失真（而非固定失真下最小率）；用可学习参数数量建模不同区域/材质的颜色。在真实与合成场景验证，尺寸压缩 >40× 且率失真性能超越已有方法。
- **创新点**: ① 端到端 RDO 框架，率与失真联合优化、支持连续码率控制；② 动态剪枝 + ECVQ 替代"固定失真最小化率"的旧范式；③ 按区域/材质以可学习参数量建模颜色，打破逐高斯同权处理。
- **核心方法**: 端到端率失真优化 → 动态剪枝 + 熵约束矢量量化（ECVQ） → 可学习颜色参数建模。关键模块：dynamic pruning、ECVQ、learnable color modeling。
- **实验设计与分析**: 真实 + 合成场景；基线与已有 3DGS 压缩法；核心指标压缩比与率失真（RD）曲线。结果：>40× 尺寸压缩、RD 性能超越已有。具体数据集与 BD-rate 数字「待补」。
- **写作可嫁接点**: 率失真优化路线的代表，related-work 中与 ContextGS/HAC 的熵模型并列；其"连续码率控制"卖点适合在讨论部署/流式时引用。
- **核查**: arxiv 标题=End-to-End Rate-Distortion Optimized 3D Gaussian Representation（一致），Comments: ECCV 2024。

---

## 2025 已确立（简表）

| 方法名 | ID | venue | year | 一句话贡献 |
|--------|-----|-------|------|-----------|
| CompGS | `2311.18159` | CVPR 2025（簇指定；arxiv 未标注 venue） | 2025 | 基于 K-means 向量量化 + 游程编码 + 零透明度正则，存储降 40–50×、渲染快 2–3× |
| HybridGS | `2505.01938` | ICML 2025（arxiv 标注；簇标 CVPR 2025，存疑） | 2025 | 双通道稀疏表示 + 标准点云编码器，质量持平 SOTA 而编解码更快 |

> 注：HybridGS 摘要 Comment 明确写 "Accepted by ICML2025"，与簇内 "CVPR 2025" 标注不一致，以 arxiv 为准并在表中标注。

---

## 近期焦点（2026，详写）

### GSCV (`2610.07795`, MM Asia 2026)
- **摘要**: 提出用标准视频 codec 压缩高斯泼溅（GS）序列的 GSCV 方法。现有基于视频的 GS 序列压缩依赖 PLAS 与跟踪得到的图元信息把 GS 转为平滑 2D 视频，但多数实际应用无跟踪信息，朴素 PLAS 因随机性导致帧间相关性弱。GSCV 引入简洁高效的 Inter-PLAS 在 I/P 帧间生成接近图像以增强帧间性能，并基于 SOTA 高比特深度 GS 图像视频 codec 构建新流水线，兼容性与压缩上限更优；实验显示相对 MPEG 视频与点云锚点方案明显更优。
- **创新点**: ① 针对"无跟踪信息"现实场景，以 Inter-PLAS 替代依赖跟踪的 vanilla PLAS，消除随机排序导致的弱帧间相关；② 用高比特深度 GS 图像 + 标准视频 codec 新流水线，提升可压缩性与质量上限；③ 完全基于标准视频编码，便于部署与跨平台。
- **核心方法**: GS 序列 → 高比特深度 GS 图像投影 → Inter-PLAS（I/P 帧间一致性排序） → SOTA 标准视频 codec 编码 → 标准码流。关键模块：Inter-PLAS、high bit-depth GS image pipeline。
- **实验设计与分析**: 基线与 MPEG 视频编码方案、点云锚点（point-cloud anchor）方案比；核心指标序列压缩率与重建质量。结果支撑 claim：相对 MPEG 视频与点云锚点方案性能明显更优。具体数据集、BD-rate/PSNR 数字「待补」。
- **写作可嫁接点**: 作为"GS 序列 + 标准视频 codec"路线的近期代表，related-work 归入 streaming/temporal 压缩；与 QUEEN 的逐帧残差路线形成"标准 codec vs 学习型残差"对照。
- **核查**: arxiv 标题=Efficient Gaussian Splatting Sequence Compression with Standard Video Codecs（一致），Comments: Accepted by MM Asia 2026。

### Observation-Gram (`2609.28997`, 2026 近期扫描焦点)
- **摘要**: 指出 3DGS 内存多数用于球谐颜色系数，而每个高斯仅被训练相机方向的窄锥观测到。据此提出可被广泛压缩器采用的失真度量：逐高斯观测 Gram 矩阵（由观测方向与混合权重累积），是系数变化到平方图像误差的精确一阶映射，只需模型与相机位姿。在该度量下，降阶成为闭式投影（泛化截断）、阶数分配为拉格朗日率失真问题、矢量量化即矩阵加权 Lloyd 算法（Compressed3D 的量化器为其标量特例）。替换进 Compressed3D（其余不变）后，微调前 PSNR +0.49 dB（SSIM/LPIPS 同步提升），等码率下仍 +0.32 dB 且无需任何训练图；仅基于该度量的无训练栈在 Mip-NeRF 360 上等质量下比无图 GSICO 小 15%。
- **创新点**: ① 用"观测 Gram 矩阵"把视角相关外观的冗余建模为精确一阶失真度量，通用可插拔；② 统一框架下把降阶/阶数分配/VQ 重新表述为闭式投影、拉格朗日 RDO、矩阵加权 Lloyd；③ 训练无关即可获得增益，且直接揭示 Compressed3D 量化器是标量特例。
- **核心方法**: 累积观测 Gram 矩阵（viewing directions + blending weights） → 作为失真度量 → 闭式降阶投影 / Lagrangian 阶数分配 / 矩阵加权 Lloyd VQ。关键模块：observation Gram matrix、matrix-weighted Lloyd quantization。
- **实验设计与分析**: 数据集 Mip-NeRF 360；基线与 Compressed3D、无图 GSICO 比；核心指标 PSNR/SSIM/LPIPS 与存储。结果支撑 claim：插入 Compressed3D 微调前 +0.49 dB、等码率 +0.32 dB（无训练图）、无训练栈等质量下比 GSICO 小 15%。更多数据集与全指标「待补」。
- **写作可嫁接点**: 作为"视角相关外观压缩 + 通用失真度量"的近期理论化工作，related-work 中置于 Compressed3D/GSICO 之后；其 Gram 度量可被任意压缩器引用为更优失真项，适合在讨论 SH 压缩与 RDO 时引用。
- **核查**: arxiv 标题=Only What Was Seen: Observation-Gram Compaction of View-Dependent Appearance in 3D Gaussian Splatting（一致），22 pages / 6 figures，无正式 venue。


---

## 簇三 · 动态与 4D <a id="C_Dynamic4D"></a>

# 知识库笔记 · 簇 C_Dynamic4D（Dynamic & 4D Gaussian Splatting）

> 读法说明：经典(2023-2024) 26 篇深度全覆盖；2025 已确立 15 篇简表；2026 焦点 2 篇详写。
> 所有 ID 均经 `https://arxiv.org/abs/<id>` 核验可达并抓取标题/摘要。数字仅来自 arxiv 摘要或确知内容，未知以「待补」标注。

---

## 一、经典论文（2023-2024，深度全覆盖，26 篇）

### 4DGen (`2312.17225`, arXiv preprint 2023)
- **摘要**: 提出 grounded 4D 内容生成框架，以单目视频/图生视频为运动控制条件，用动态 3D 高斯作表示，借 3D 感知分数蒸馏采样与平滑正则从锚帧时空伪标签监督，解决文本/图像到 4D 的运动受限与不可控问题。
- **创新点**: ①以单目视频作运动条件支持 grounded 生成；②动态 3DGS + 锚帧时空伪标签；③3D 感知 SSD + 平滑先验提升新视角/时刻一致性。
- **核心方法**: 动态 3DGS 表示；锚帧时空伪标签；3D-aware Score Distillation Sampling；smoothness regularization。
- **实验设计与分析**: 对比 video-to-4D 基线，在忠实重建输入信号及新视角/时刻推理上更优；相比 image/text-to-4D 支持可控 grounded 生成（具体指标待补）。
- **写作可嫁接点**: 作 video/text-to-4D 基线，对比 controllable generation 与 motion grounding 能力。
- **核查**: arxiv 标题=4DGen: Grounded 4D Content Generation with Spatial-temporal Consistency（一致）。

### DreamGaussian4D (`2312.17142`, arXiv preprint 2023)
- **摘要**: 基于 3DGS 的高效 4D 生成框架，将空间变换显式建模与静态 GS 结合，并用视频扩散提供时空先验，优化时间由数小时降至数分钟，且生成运动可视觉控制。
- **创新点**: ①显式空间变换 + 静态 GS 的高效 4D 表示；②HexPlane 动态生成 + Gaussian 形变；③视频扩散做 UV 纹理时序精炼。
- **核心方法**: Image-to-4D（DreamGaussianHD 静态 GS → HexPlane 动态形变）；Video-to-Video 纹理精炼（预训练 I2V 扩散）。
- **实验设计与分析**: 优化时间由数小时降到数分钟，产出可在 3D 引擎渲染的动画网格（具体指标待补）。
- **写作可嫁接点**: 作 4D 生成效率与运动可控性基线；对比 HexPlane 类形变表示。
- **核查**: arxiv 标题=DreamGaussian4D: Generative 4D Gaussian Splatting（一致）。

### PVG (`2311.18561`, arXiv 2023)
- **摘要**: 面向大规模动态城市场景的统一表示，在 3DGS 基础上引入周期振动式时间动态，统一表达动静态要素，无需标定框或光流即可重建与实时渲染。
- **创新点**: ①周期振动高斯统一建模动态城市要素；②时序平滑机制 + 位置感知自适应控制；③免物体框/光流的稀疏数据大场景学习。
- **核心方法**: Periodic Vibration Gaussian（时空周期振动）；temporal smoothing；position-aware adaptive control；3DGS 光栅化。
- **实验设计与分析**: 在 Waymo Open / KITTI 上超越 SOTA（动态与静态 NVS），渲染较最佳替代快 900×。
- **写作可嫁接点**: 城市/自动驾驶动态场景基线；对比是否需要显式静态-动态分离先验。
- **核查**: arxiv 标题=Periodic Vibration Gaussian: Dynamic Urban Scene Reconstruction and Real-time Rendering（一致）。

### 3DGStream (`2403.01444`, CVPR 2024)
- **摘要**: 面向真实动态场景自由视角视频(FVV)流式的方案，逐帧在线重建 <12s、渲染 200 FPS，用紧凑 Neural Transformation Cache 建模高斯平移旋转降低训练/存储。
- **创新点**: ①on-the-fly 逐帧在线重建；②NTC 紧凑缓存替代逐帧直接优化高斯；③自适应高斯增删应对新出现物体。
- **核心方法**: 3DGs 表示；Neural Transformation Cache(NTC) 建模 translation/rotation；adaptive 3DG addition。
- **实验设计与分析**: 在渲染速度、画质、训练时间、存储上具竞争力（具体数值待补）。
- **写作可嫁接点**: 作 FVV 流式实时基线；对比逐帧优化 vs 形变场范式。
- **核查**: arxiv 标题=3DGStream: On-the-Fly Training of 3D Gaussians for Efficient Streaming of Photo-Realistic Free-Viewpoint Videos（一致）。

### 4D-rotor GS / 4DRotorGS (`2402.03307`, SIGGRAPH 2024)
- **摘要**: 用各向异性 4D XYZT 高斯表示动态场景，通过对 4D 高斯做时间切片自然组合动态 3D 高斯并投影成像，擅长突变运动与高保真细节。
- **创新点**: ①4D 高斯时间切片替代 canonical+形变场；②显式时空表示对突变运动鲁棒；③高度优化的 CUDA 切片/泼溅。
- **核心方法**: 4D Gaussian（anisotropic XYZT）；temporal slicing；CUDA 加速泼溅；实时推理。
- **实验设计与分析**: RTX3090 达 277 FPS、RTX4090 达 583 FPS，多样运动场景定量定性均超现有方法（数值待补）。
- **写作可嫁接点**: 作实时动态 NVS 强基线；对比 4D 原语 vs 形变场建模复杂度。
- **核查**: arxiv 标题=4D-Rotor Gaussian Splatting: Towards Efficient Novel View Synthesis for Dynamic Scenes（一致）。

### 4DGS (`2310.08528`, CVPR 2024)
- **摘要**: 提出整体式动态场景表示 4D-GS，含 3D 高斯 + 4D 神经体素的显式表示，用类 HexPlane 分解体素编码经轻量 MLP 预测新时刻高斯形变，实时高分辨率渲染。
- **创新点**: ①整体 4D 表示而非逐帧 3D-GS；②4D 神经体素 + 分解编码；③轻量 MLP 预测形变。
- **核心方法**: 3D Gaussians + 4D neural voxels；decomposed neural voxel encoding(HexPlane 启发)；lightweight MLP deformation。
- **实验设计与分析**: 800×800 分辨率、RTX3090 上 82 FPS，质量持平或优于 SOTA（数值待补）。
- **写作可嫁接点**: 4D 神经体素类动态表示基线；对比逐帧/形变场/4D 原语三条路线。
- **核查**: arxiv 标题=4D Gaussian Splatting for Real-Time Dynamic Scene Rendering（一致）。

### CoGS (`2312.05664`, CVPR 2024)
- **摘要**: 提出可操控高斯泼溅 CoGS，无需预计算控制信号即可实时操控动态场景元素，解决动态高斯需同步多视角与缺乏可控性的两个问题。
- **创新点**: ①动态场景元素的直接操控；②无需预计算控制信号实现实时控制；③单相机也可（相对 NeRF 成本低）。
- **核心方法**: Controllable Gaussian Splatting；articulated object 表示；实时控制信号驱动。
- **实验设计与分析**: 合成与真实动态数据集上，视觉保真度超越现有动态/可控神经表示（指标待补）。
- **写作可嫁接点**: 作 controllable/articulated 动态场景基线；对比可编辑性。
- **核查**: arxiv 标题=CoGS: Controllable Gaussian Splatting（一致）。

### DN-4DGS (`2410.13607`, NeurIPS 2024)
- **摘要**: 针对规范 3D 高斯坐标含噪且 4D 信息聚合不足的问题，提出去噪形变网络：噪声抑制改变规范坐标分布，解耦时空聚合模块聚合邻点与邻帧信息，实时级达到 SOTA 画质。
- **创新点**: ①Noise Suppression 抑制规范高斯坐标噪声；②Decoupled Temporal-Spatial Aggregation 聚合相邻点与帧；③实时级 SOTA 渲染质量。
- **核心方法**: canonical 3D Gaussians + deformable fields；Noise Suppression Strategy；Decoupled Temporal-Spatial Aggregation Module。
- **实验设计与分析**: 多真实数据集实时级 SOTA 渲染质量（指标待补）。
- **写作可嫁接点**: 作形变场去噪/聚合基线；对比 canonical 坐标噪声处理。
- **核查**: arxiv 标题=DN-4DGS: Denoised Deformable Network with Temporal-Spatial Aggregation for Dynamic Scene Rendering（一致）。

### Deformable-3DGS (`2309.13101`, CVPR 2024)
- **摘要**: 用 3D 高斯重建、在规范空间学习带形变场的单目动态场景方法，引入退火平滑训练机制缓解姿态不准对时序插值的影响，达到高画质与实时。
- **创新点**: ①单目动态场景的形变高斯；②canonical space + deformation field；③annealing smoothing 训练机制（零额外开销）。
- **核心方法**: Deformable 3D Gaussians；differentiable Gaussian rasterizer；annealing smoothing training。
- **实验设计与分析**: 在渲染质量与速度上显著优于现有方法，适用于 NVS、时间插值、实时渲染（指标待补）。
- **写作可嫁接点**: 单目动态 NVS 经典基线；对比姿态噪声鲁棒性。
- **核查**: arxiv 标题=Deformable 3D Gaussians for High-Fidelity Monocular Dynamic Scene Reconstruction（一致）。

### DreamMesh4D (`2410.06756`, NeurIPS 2024)
- **摘要**: 视频到 4D 生成框架，结合网格与几何蒙皮，将高斯绑定到三角面做可微优化，用 LBS+DQS 混合蒙皮经形变图驱动，兼容现代图形管线。
- **创新点**: ①Gaussian-Mesh 混合表示（高斯基绑定到网格面）；②稀疏控制点形变图；③LBS+DQS 混合几何蒙皮。
- **核心方法**: coarse mesh 初始化；deformation graph；hybrid skinning(LBS+DQS)；photometric + score distillation loss。
- **实验设计与分析**: 实验显示优于现有方法，兼容 3D 游戏/影视管线（指标待补）。
- **写作可嫁接点**: 作 video-to-4D 与可动画网格资产生成基线；对比 GS-only 一致性。
- **核查**: arxiv 标题=DreamMesh4D: Video-to-4D Generation with Sparse-Controlled Gaussian-Mesh Hybrid Representation（一致）。

### Dual-GS (`2409.08353`, ACM ToG 2024 / SIGGRAPH Asia 2024)
- **摘要**: 面向沉浸式人体体积视频，将运动与外观分别用 skin 高斯与 joint 高斯表示，显式解耦降低运动冗余、提升时序一致性，并做熵编码+码本压缩。
- **创新点**: ①skin/joint 高斯显式解耦运动与外观；②coarse-to-fine 逐帧建模；③熵编码+codec 高压缩。
- **核心方法**: Dual Gaussian（skin+joint）；coarse alignment + fine optimization；entropy/codec compression + persistent codebook。
- **实验设计与分析**: 压缩比最高 120×，每帧约 350KB，VR 头显照片级自由视角回放（指标待补）。
- **写作可嫁接点**: 人体体积视频/压缩基线；对比运动-外观解耦。
- **核查**: arxiv 标题=Robust Dual Gaussian Splatting for Immersive Human-centric Volumetric Videos（一致）。

### DynMF (`2312.00112`, CVPR 2024)
- **摘要**: 将动态场景分解为少量神经轨迹，每个点绑定运动系数共享基轨迹，约束欠定运动场，实现 >120 FPS 实时且存储仅约静态场景两倍。
- **创新点**: ①动态场景分解为少量基轨迹；②点绑定运动系数共享基；③稀疏损失解耦并生成未见运动组合。
- **核心方法**: neural motion factorization；tiny set of learned basis（仅时间查询）；sparsity loss on motion coefficients。
- **实验设计与分析**: 5 分钟达 SOTA 渲染质量，半小时内合成新视角；单/多视角均实时（指标待补）。
- **写作可嫁接点**: 作可解释/可控运动分解基线；对比运动基分解 vs 形变场。
- **核查**: arxiv 标题=DynMF: Neural Motion Factorization for Real-time Dynamic View Synthesis with 3D Gaussian Splatting（一致）。

### GPS-Gaussian (`2312.02155`, CVPR 2024)
- **摘要**: 通用像素级 3DGS 人体新视角合成，在源视图定义高斯参数图并回归 GS 属性，无需逐人优化即可即时合成，支持稀疏视角 2K 渲染。
- **创新点**: ①generalizable 像素级高斯参数回归；②无需 fine-tuning/优化即时 NVS；③大规模人体扫描数据训练 + 深度估计模块抬升到 3D。
- **核心方法**: Gaussian parameter maps（源视图）；depth estimation 抬升 2D→3D；fully differentiable 回归。
- **实验设计与分析**: 多数据集超越 SOTA 且渲染速度极快（具体数值待补）。
- **写作可嫁接点**: 作 generalizable 人体 NVS 基线；对比 per-subject 优化 vs 前馈回归。
- **核查**: arxiv 标题=GPS-Gaussian: Generalizable Pixel-wise 3D Gaussian Splatting for Real-time Human Novel View Synthesis（一致）。

### Grid4D (`2410.20815`, NeurIPS 2024)
- **摘要**: 针对平面类显式方法低秩假设导致特征重叠与画质差的问题，提出用哈希编码将 4D 分解为 1 空间 + 3 时序 3D 哈希编码，并设计方向注意力聚合。
- **创新点**: ①4D 哈希编码替代 plane-based（无低秩假设）；②1 空间+3 时序 3D 哈希分解；③方向注意力聚合空间-时间特征。
- **核心方法**: 4D decomposed hash encoding；directional attention module；smooth regularization 抑制显式表示不平滑。
- **实验设计与分析**: 视觉质量与渲染速度显著优于 SOTA（指标待补）。
- **写作可嫁接点**: 作 4D 显式编码基线；对比 plane-based vs hash-based 动态编码。
- **核查**: arxiv 标题=Grid4D: 4D Decomposed Hash Encoding for High-Fidelity Dynamic Gaussian Splatting（一致）。

### HDR-GS (`2405.15125`, NeurIPS 2024)
- **摘要**: 首个基于 3DGS 的 HDR 新视角合成方法，设计双动态范围高斯点云（球谐拟合 HDR 色 + MLP tone-mapper 渲染 LDR 色），并行可微光栅化重建 HDR/LDR。
- **创新点**: ①首个 3DGS 的 HDR NVS；②Dual Dynamic Range(DDR) 高斯；③Parallel Differentiable Rasterization 双路。
- **核心方法**: DDR Gaussian；spherical harmonics 拟合 HDR；MLP tone-mapper；PDR（HDR+LDR 两路）。
- **实验设计与分析**: 较 SOTA NeRF 方法 LDR/HDR NVS 分别 +3.84/+1.91 dB，推理快 1000×，训练仅 6.3% 时间。
- **写作可嫁接点**: HDR/曝光可控 NVS 基线；对比 NeRF 类 HDR 方法效率。
- **核查**: arxiv 标题=HDR-GS: Efficient High Dynamic Range Novel View Synthesis at 1000x Speed via Gaussian Splatting（一致）。

### HiCoM (`2411.07541`, NeurIPS 2024)
- **摘要**: 面向多视角流式视频在线重建，用扰动平滑构建紧凑初始 3DGS，提出层次一致运动机制快速准确跨帧学习运动，并持续合并新高斯保持紧凑。
- **创新点**: ①perturbation smoothing 紧凑鲁棒初始化；②Hierarchical Coherent Motion 利用高斯非均匀分布与局部一致；③增删高斯维持紧凑并 <2s/帧。
- **核心方法**: perturbation smoothing；Hierarchical Coherent Motion；continual refine + merge + remove low-opacity Gaussians。
- **实验设计与分析**: 学习效率较 SOTA 提升约 20%、存储降 85%；并行学习平均 <2s/帧且性能退化可忽略（指标待补）。
- **写作可嫁接点**: 流式/在线动态重建基线；对比存储与训练效率。
- **核查**: arxiv 标题=HiCoM: Hierarchical Coherent Motion for Streamable Dynamic Scene with 3D Gaussian Splatting（一致）。

### L4GM (`2406.10324`, NeurIPS 2024)
- **摘要**: 首个 4D 大重建模型，单前向 pass（约 1 秒）从单视角视频产出动画物体，基于 LGM 并加时序自注意力，训练插值模型将低帧率表示上采样到高帧率。
- **创新点**: ①首个 4D Large Reconstruction Model；②基于 LGM + 时序自注意力；③插值模型上采样帧率保证时序平滑。
- **核心方法**: 合成多视角视频数据集（Objaverse 44K 物体/110K 动画/48 视角）；per-timestep multiview rendering loss；temporal self-attention；interpolation model。
- **实验设计与分析**: 仅合成数据训练即很好泛化到 in-the-wild 视频，产出高质量动画 3D 资产（指标待补）。
- **写作可嫁接点**: 作前馈 4D 生成/重建基线；对比 feed-forward vs per-scene 优化。
- **核查**: arxiv 标题=L4GM: Large 4D Gaussian Reconstruction Model（一致）。

### LoopGaussian (`2404.08966`, ACM MM 2024)
- **摘要**: 将电影图(cinemagraph)从 2D 提升到 3D 空间，用 3D-GS 重建静态场景并加入形状正则，经自编码器投影特征、SuperGaussian 聚类、欧拉运动场驱动高斯循环运动生成无缝循环 3D 电影图。
- **创新点**: ①3D 电影图（升维到 3D）；②SuperGaussian 聚类保持局部连续；③Eulerian motion field + 双向动画循环。
- **核心方法**: 3D-GS + shape regularization；Gaussian autoencoder；SuperGaussian clustering；Eulerian motion field；bidirectional animation。
- **实验设计与分析**: 实验验证高质量且视觉吸引人的 3D cinemagraph 生成（指标待补）。
- **写作可嫁接点**: 局部动态/循环动画场景基线；对比 2D vs 3D cinemagraph。
- **核查**: arxiv 标题=LoopGaussian: Creating 3D Cinemagraph with Multi-view Images via Eulerian Motion Field（一致）。

### MotionGS (`2410.07707`, NeurIPS 2024)
- **摘要**: 提出显式运动先验引导形变高斯框架，将光流解耦为相机流与运动流约束物体形变，并交替优化高斯与相机位姿以缓解位姿不准。
- **创新点**: ①optical flow decoupling（camera flow + motion flow）；②motion flow 显式约束形变；③camera pose refinement 交替优化。
- **核心方法**: optical flow decoupling module；motion flow 约束 3DGS 形变；camera pose refinement module。
- **实验设计与分析**: 单目动态场景上定性与定量均超越 SOTA（指标待补）。
- **写作可嫁接点**: 作显式运动先验/光流引导基线；对比无运动约束的形变方法。
- **核查**: arxiv 标题=MotionGS: Exploring Explicit Motion Guidance for Deformable 3D Gaussian Splatting（一致）。

### NeuroGauss4D-PCI (`2405.14241`, NeurIPS 2024 / under review)
- **摘要**: 面向点云插值的 4D 神经场 + 高斯形变场方法，用迭代高斯云软聚类、时间 RBF 高斯残差插值，及 4D 高斯形变场跟踪参数演化，擅长非刚性形变。
- **创新点**: ①iterative Gaussian cloud soft clustering；②temporal RBF Gaussian residual 时间插值；③4D neural field + Gaussian deformation field 融合。
- **核心方法**: soft clustering；temporal radial basis function Gaussian residual；4D Gaussian deformation field；4D neural field；adaptive fusion。
- **实验设计与分析**: 在物体级(DHB)与大规模自动驾驶(NL-Drive)点云帧插值领先，可扩展到自动标注与 densification（指标待补）。
- **写作可嫁接点**: 点云插值/时序补全基线；对比 4D 场 vs 高斯形变。
- **核查**: arxiv 标题=NeuroGauss4D-PCI: 4D Neural Fields and Gaussian Deformation Fields for Point Cloud Interpolation（一致）。

### Real-time 4DGS (`2310.10642`, ICLR 2024)
- **摘要**: 将时空视作整体，用各向异性 4D 原语（可任意时空旋转的 4D 高斯椭球 + 4D 球谐外观）近似动态场景时空体积，实现实时渲染与端到端训练。
- **创新点**: ①时空整体 4D 原语表示；②4D 高斯 + 4D spherindrical harmonics 外观；③支持变长视频与端到端。
- **核心方法**: 4D Gaussian（anisotropic ellipses 时空旋转）；view/time-dependent 4D spherindrical harmonics；tailored rendering routine。
- **实验设计与分析**: 单/多视角基准上视觉质量与效率优于现有方法（指标待补）。
- **写作可嫁接点**: 4D 原语实时 NVS 基线；对比 4DGS/4DRotorGS 等多原语路线。
- **核查**: arxiv 标题=Real-time Photorealistic Dynamic Scene Representation and Rendering with 4D Gaussian Splatting（一致）。

### SAGD (`2401.17857`, ECCV 2024)
- **摘要**: 针对 3D-GS 高斯结构模糊导致分割边界粗糙的问题，提出边界增强分割：高斯分解找出并拆分边界高斯，并将 2D 基础模型无训练地抬升到 3D-GS 实现快速交互分割。
- **创新点**: ①Gaussian Decomposition 拆分边界高斯；②training-free 管线将 2D 基础模型抬升到 3D-GS；③保留分割速度且边界更精细。
- **核心方法**: Gaussian Decomposition（boundary Gaussians）；2D foundation model lifting；interactive 3D segmentation。
- **实验设计与分析**: 高质量 3D 分割且无粗糙边界，易迁移到其他场景编辑（指标待补）。
- **写作可嫁接点**: 3DGS 分割/编辑基线；对比边界处理与基础模型嫁接。
- **核查**: arxiv 标题=SAGD: Boundary-Enhanced Segment Anything in 3D Gaussian via Gaussian Decomposition（一致）。

### SP-GS (`2406.03697`, ICML 2024)
- **摘要**: 提出 Superpoint Gaussian Splatting，先以显式 3D 高斯重建场景，再将性质相似（旋转/平移/位置）的高斯聚为 superpoint，以微小计算增量将 3DGS 扩展到动态场景并增强操控。
- **创新点**: ①superpoint 聚类相似高斯；②以极小计算开销扩展动态；③更强操控能力。
- **核心方法**: explicit 3D Gaussians；clustering into superpoints；superpoint-driven dynamic extension。
- **实验设计与分析**: 合成与真实数据集上达 SOTA 画质与高分辨率实时渲染（指标待补）。
- **写作可嫁接点**: 作动态重建 + 操控基线；对比 superpoint 抽象层级。
- **核查**: arxiv 标题=Superpoint Gaussian Splatting for Real-Time High-Fidelity Dynamic Scene Reconstruction（一致）。

### TC4D (`2403.17920`, ECCV 2024)
- **摘要**: 将文本到 4D 的运动分解为全局与局部：全局用沿样条轨迹的刚体变换表示场景包围盒运动，局部形变贴合全局轨迹，由文本到视频模型监督，支持任意轨迹动画与组合生成。
- **创新点**: ①trajectory-conditioned 全局+局部运动分解；②spline 参数化全局刚体轨迹；③组合场景生成与更大运动幅度。
- **核心方法**: global rigid transformation（spline trajectory）；local deformations；text-to-video model supervision。
- **实验设计与分析**: 定性及用户研究验证真实感与运动幅度提升（指标待补）。
- **写作可嫁接点**: text-to-4D 生成基线；对比运动模型灵活性（边界盒限制）。
- **核查**: arxiv 标题=TC4D: Trajectory-Conditioned Text-to-4D Generation（一致）。

### Video-3DGS (`2406.02541`, arXiv 2024 / TMLR 2025)
- **摘要**: 用 3DGS 视频精炼器增强零样本视频编辑的时序一致性，两阶段：MC-COLMAP 生成动/静点云初始化 Frg/Bkg 两组 3DGS，再以重建能力对视频扩散施加时序约束。
- **创新点**: ①3DGS-based video refiner；②MC-COLMAP（Masked+Clipped）处理动/静；③Frg-3DGS+Bkg-3DGS + 可学习 2D 参数图。
- **核心方法**: two-stage 3D Gaussian optimizing；MC-COLMAP；foreground/background Gaussians；temporal constraints on diffusion。
- **实验设计与分析**: DAVIS 上 3k 迭代重建质量 +3/+7 PSNR，比 NeRF/3DGS 基线快 1.9×/4.5×；58 段视频增强时序一致性。
- **写作可嫁接点**: 视频编辑时序一致性基线；对比 NeRF/3DGS 重建器。
- **核查**: arxiv 标题=Enhancing Temporal Consistency in Video Editing by Reconstructing Videos with 3D Gaussian Splatting（一致）。

### Vidu4D (`2405.16822`, NeurIPS 2024)
- **摘要**: 从单段生成视频重建 4D 表示，核心是 Dynamic Gaussian Surfels(DGS)：优化时变 warping 函数将高斯 surfel 由静态变换到动态态，并学旋转/缩放精修缓解纹理闪烁。
- **创新点**: ①Dynamic Gaussian Surfels 时变 warping；②warped-state 几何正则估法向保结构；③rot/scaling 精修缓解纹理闪烁。
- **核心方法**: DGS（time-varying warping functions）；continuous warping fields 几何正则；rotation/scaling refinement；proper initialization。
- **实验设计与分析**: 配视频生成模型实现高保真 text-to-4D，外观与几何兼顾（指标待补）。
- **写作可嫁接点**: 视频生成→4D 重建基线；对比 surfel vs volume 表示。
- **核查**: arxiv 标题=Vidu4D: Single Generated Video to High-Fidelity 4D Reconstruction with Dynamic Gaussian Surfels（一致）。

---

## 二、2025 已确立（简表，15 篇）

| 方法名 | ID | Venue | Year | 一句话贡献 |
|---|---|---|---|---|
| BARD-GS | `2503.15835` | CVPR 2025 | 2025 | 将运动模糊分解为相机/物体两类并分别去模糊，鲁棒重建手持单目动态场景。 |
| DynOMo | `2409.02104` | 3DV 2025 | 2025 | 在线单目无位姿高斯重建，首次建立单目无位姿在线点跟踪基线。 |
| GFlow | `2405.18426` | AAAI 2025 | 2025 | 仅用 2D 深度/光流先验从单目无相机参数视频恢复 4D 世界并估计位姿。 |
| GauFRe | `2312.11458` | WACV 2025 | 2025 | 前向 warping 形变场显式建模非刚性变换，~20min 训练 96FPS 实时渲染。 |
| GaussianFlow | `2403.12365` | CVPR 2025 | 2025 | 提出 Gaussian flow 由光流直接监督高斯运动，解决 4D 生成色彩漂移。 |
| GaussianWorld | `2412.10373` | CVPR 2025 | 2025 | 将 3D 占据预测重构为 4D 占据预测的世界模型，mIoU 提升 >2%。 |
| IGS | `2503.16979` | CVPR 2025 | 2025 | 锚点驱动运动网络 + 关键帧流式策略，平均 2s+/帧流式动态重建。 |
| MoDGS | `2406.00434` | ICLR 2025 | 2025 | 用单视图深度先验解决慢/静止相机 casual 单目视频的动态重建。 |
| MoDec-GS | `2501.03714` | CVPR 2025 | 2025 | 全局-局部运动分解 + 时间间隔调整，模型体积平均降 70% 保画质。 |
| ReconDreamer++ | `2503.18438` | arXiv 2025 | 2025 | NTDNet 弥合生成与真实域差，路面 NTL-IoU +4.5%，FID +23%。 |
| STC-GS | `2502.14895` | ICLR 2025 | 2025 | 时空一致高斯表示 + GauMamba 预测，雷达序列空间分辨率 >16×。 |
| STG (STG-Avatar) | `2510.22140` | CVPR 2025（arxiv 标注 IROS 2025） | 2025 | 刚-非刚耦合形变(LBS+Spacetime Gaussian)+光流自适应增密的高保真人体化身。 |
| Shape of Motion | `2407.13764` | ICCV 2025 | 2025 | SE(3) 运动基软分解 + 数据驱动先验，单视频重建 4D 并估长程运动。 |
| SpectroMotion | `2410.17249` | CVPR 2025 | 2025 | 3DGS+PBR+形变场，残差法向校正 + 可变形环境图重建动态镜面场景。 |
| SplineGS | `2412.09982` | CVPR 2025 | 2025 | 运动自适应三次 Hermite 样条表示连续轨迹，免 COLMAP 实时单目动态。 |

---

## 三、近期焦点（2026，详写，2 篇，满五要素）

### Mobile-4DGS (`2610.05289`, 2026-10)
- **摘要**: 提出统一轻量框架，在资源受限移动端实现高保真实时静态与动态高斯渲染；针对外观用蒙特卡洛镜面能量聚合器把高阶辐射残差压入一阶球谐并提出属性条件 SH 增强（推理前预烘焙偏移），针对动态用二阶高斯运动+可学习时间支撑+静-动二值划分的紧凑显式 4D 表示，免运行时形变网络。
- **创新点**: ①首次统一静态-动态高斯于移动端实时框架；②Monte Carlo Specular Energy Aggregator 压缩高阶辐射到一阶 SH + Attribute-Conditioned SH Enhancement 预烘焙；③二阶高斯运动+可学习 temporal support+二值静动划分的连续时间显式 4D，免运行时形变场；④Depth-Order Certificate 复用已提交深度序减少重投影/排序开销；⑤Multi-View Alpha-Based Densification and Pruning 抑制冗余基元。
- **核心方法**: 紧凑外观建模（MC 镜面能量聚合 + 属性条件 SH 增强 + 多视角 alpha 增删剪枝）；动态建模（二阶 Gaussian motion、learnable temporal support、binary static-dynamic partition、continuous-time）；播放优化（Depth-Order Certificate 复用深度序，降低 re-projection/sorting/merging/index-buffer 更新）。
- **实验设计与分析**: 在静态与动态场景上大幅降低存储与渲染开销同时保持有竞争力画质，实现移动端实时 3D/4D GS（具体 FPS/PSNR/存储数值待补，arxiv 摘要未给）。
- **写作可嫁接点**: 移动端/边缘部署动态 GS 的强基线；可对比其"免运行时形变网络"与经典 canonical+deformation 的内存/延迟差异，以及 SH 压缩与 pruning 策略。
- **核查**: arxiv 标题=Mobile-4DGS: Unified Static-Dynamic Real-time Mobile Gaussian Splatting（一致，提交于 2026-10-04）。

### SteadySplats (`2610.05576`, 2026-10)
- **摘要**: 针对随机顺序无关透明在 3DGS 等基元辐射场中因输出噪声而难实用的问题，给出在表示与合成层面最小化高频噪声的原则性方法：训练时用颜色正则隐式降低沿视线的方差，渲染时用基于历史的空间重采样加速收敛、用时间重要性重采样保证相机运动下的连贯。
- **创新点**: ①首个在表示与图像合成双层面系统性降随机 3DGS 渲染噪声的原则性方案；②history-based spatial resampling 加速图像收敛；③temporal importance resampling 保证运动连贯；④训练期 color regularizer 隐式降低 3DGS 沿射线方差；⑤优化 Vulkan 渲染器在低/高样本数下均抑噪。
- **核心方法**: 随机顺序无关透明渲染 3DGS；history-based spatial resampling（渲染期）；temporal importance resampling（相机运动期）；color regularizer（训练期降方差）；Vulkan 优化渲染后端。
- **实验设计与分析**: 在 1 sample/pixel 下较此前随机方法 PSNR 提升约 13 dB，并快速收敛到排序 3DGS，平均 L1 误差 <1e-4（数值来自 arxiv 摘要）。
- **写作可嫁接点**: 随机/无排序 3DGS 渲染、透明与抗噪渲染方向的关键基线；可对比其与排序泼溅在质量-样本数权衡上的差异，作为"无排序高保真"路线的引用锚点。
- **核查**: arxiv 标题=SteadySplats: Resampling of Low-Variance Gaussians for High-Fidelity Stochastic Rendering（一致，v1/v2 提交于 2026-10）。


---

## 簇四 · 前馈式 3DGS <a id="D_FeedForward"></a>

# 知识库 · 簇 D_FeedForward（Feed-Forward 3DGS）

覆盖：经典(2023-2024) 12 篇深度、2025 已确立 12 篇简表、2026 近期焦点 5 篇详写，共 29 篇。
所有 arxiv ID 均经 WebFetch 核验可达，标题与摘要取自 arxiv 页面。指标仅写摘要或确知内容，未知以「待补」标注。

## 经典论文（2023-2024，深度全覆盖）

### CAT3D (`2405.10314`, NeurIPS 2024)
- **摘要**: 高质量 3D 重建通常需数百张图。CAT3D 用多视角扩散模型模拟真实拍摄过程，从任意数量输入图与目标新视角生成高度一致的视角，再交给鲁棒 3D 重建得到可实时渲染的 3D 表示；可在约 1 分钟内创建完整场景，单图/少视角 3D 场景生成超越现有方法。
- **创新点**: 1) 将"真实捕获"建模为多视角扩散生成，而非直接回归 3D；2) 两段式（先生成多视角一致图像，再重建）避开稀疏输入直接回归 3D 的不适定；3) 支持任意数量输入图与目标视角。
- **核心方法**: 大规模多视角数据集上训练的多视角扩散模型预测目标新视角 RGB，生成图作为鲁棒 3D 重建（3DGS/NeRF）的输入得到场景表示。关键模块：multi-view diffusion model + 下游 3D reconstruction，仅光度监督。
- **实验设计与分析**: 数据集与具体数字待补（项目页含 demo 与交互结果）。指标为单图/少视角 3D 场景生成质量，结论为优于现有单图/少视角方法、约 1 分钟完成。支撑 claim：生成一致性视角可提升重建质量。
- **写作可嫁接点**: related-work 中作为"扩散先验 + 多视角生成辅助 3D 重建"代表，可对比 ReconFusion（扩散正则化 NeRF）与 CAT3D（生成视图再重建）的范式差异；实验基线可列入单图 3D 生成。
- **核查**: arxiv 标题 = CAT3D: Create Anything in 3D with Multi-View Diffusion Models（一致）

### EpipolarFree-GS / eFreeSplat (`2410.22817`, NeurIPS 2024)
- **摘要**: 现有可泛化 3DGS 依赖极线先验，在非重叠/遮挡区域不可靠。本文提出 eFreeSplat，免极线约束的前馈 3DGS 新视角合成模型，在宽基线任务上超越依赖极线先验的 SOTA。
- **创新点**: 1) 摆脱极线几何约束，靠跨视角预训练提供 3D 先验做特征匹配/编码；2) 自监督 ViT + 跨视角补全（cross-view completion）预训练增强多视角 3D 感知；3) 迭代跨视角高斯对齐（Iterative Cross-view Gaussians Alignment）保证跨视角深度尺度一致。
- **核心方法**: 大规模数据集上 cross-view completion 预训练的自监督 ViT 提取特征；Iterative Cross-view Gaussians Alignment 对齐不同视角高斯深度尺度；输出像素对齐高斯用于可微渲染。
- **实验设计与分析**: RealEstate10K、ACID 上宽基线 NVS。eFreeSplat 超越依赖极线先验的 SOTA 基线，具体数字待补。支撑 claim：免极线下几何重建与 NVS 质量更优。
- **写作可嫁接点**: 作为"免极线/几何自由前馈 3DGS"基线，对比 MVSplat（依赖 cost volume 几何）与本文几何自由路线；related-work 讨论极线可靠性问题。
- **核查**: arxiv 标题 = Epipolar-Free 3D Gaussian Splatting for Generalizable Novel View Synthesis（一致）

### FreeSplat (`2405.17958`, NeurIPS 2024)
- **摘要**: 现有可泛化 3DGS 受重 backbone 限制，只能在立体图像间窄范围插值，无法宽视角自由合成。FreeSplat 从长序列重建几何一致场景，支持自由视角。
- **创新点**: 1) 低成本跨视角聚合（Low-cost Cross-View Aggregation）用自适应 cost volume + 多尺度聚合，减轻 backbone 负担；2) 像素级三元组融合（Pixel-wise Triplet Fusion）消除重叠区冗余高斯；3) 自由视角训练策略，任意数量视角下鲁棒。
- **核心方法**: 邻近视角间构建自适应 cost volume 聚合特征（多尺度）；Pixel-wise Triplet Fusion 融合多视角观测去冗余；无深度先验的 feed-forward 大模型重建。
- **实验设计与分析**: RealEstate10K/ACID，不同输入视角数下 NVS 颜色与深度精度 SOTA（具体数字待补）；推理更高效且减少冗余高斯。支撑 claim：长序列/宽基线自由视角合成能力。
- **写作可嫁接点**: 作为自由视角/长序列前馈 3DGS 基线，对比 MVSplat（立体对）、pixelSplat（图像对）；related-work 讨论 view-range 局限。
- **核查**: arxiv 标题 = FreeSplat: Generalizable 3D Gaussian Splatting Towards Free-View Synthesis of Indoor Scenes（一致）

### GGN (`2503.16338`, NeurIPS 2024)
- **摘要**: 现有前馈 3DGS 简单拼接多视角像素对齐高斯，导致伪影与显存开销。本文 Gaussian Graph Network（GGN）生成高效可泛化高斯表示。
- **创新点**: 1) 构建 Gaussian Graph 建模不同视角高斯组关系，而非简单拼接；2) 在 Gaussian 层面重定义图操作，支持高斯特征融合（message passing）；3) Gaussian pooling 层聚合各高斯组得到高效表示。
- **核心方法**: 各视角高斯组成节点建图；在 Gaussian graph 上做 message passing（高斯特征融合）；Gaussian pooling 聚合得到紧凑场景表示。
- **实验设计与分析**: RealEstate10K、ACID 大规模数据；相比 SOTA 用更少高斯、更高渲染速度且更好图像质量（具体数字待补）。支撑 claim：更少高斯 + 更快渲染 + 更高质量。
- **写作可嫁接点**: 作为"高斯图/关系建模"代表，对比像素级拼接式前馈方法（MVSplat/LRM 类）；related-work 讨论多视角高斯聚合。
- **核查**: arxiv 标题 = Gaussian Graph Network: Learning Efficient and Generalizable Gaussian Representations from Multi-view Images（一致）

### GS-LRM (`2404.19702`, ECCV 2024)
- **摘要**: 提出 GS-LRM，可扩展大模型，从 2-4 张带位姿稀疏图在单 A100 上 0.23 秒预测高质量 3D 高斯。
- **创新点**: 1) 极简 transformer 架构：patchify 输入图 → 拼接多视角 token → transformer 块 → 直接解码每像素高斯；2) 预测像素对齐高斯，自然处理大幅尺度/复杂度场景（区别于只能重建物体的 LRM）；3) 单前向 0.23s。
- **核心方法**: 将 pose 图像 patchify 成 token，多视角 token 拼接后经 transformer 序列建模，直接回归每像素高斯参数用于可微渲染。在 Objaverse（物体）与 RealEstate10K（场景）分别训练。
- **实验设计与分析**: Objaverse、RealEstate10K；两场景均大幅超 SOTA（具体数字待补）；0.23s/A100。支撑 claim：大幅优于前作且适用于物体与场景，并验证下游 3D 生成。
- **写作可嫁接点**: 作为 feed-forward LRM 类基石基线，几乎每篇前馈 3DGS（LRM/GS-LRM/GeoLRM）都引用；related-work 中作为"大模型直接回归高斯"的开创。
- **核查**: arxiv 标题 = GS-LRM: Large Reconstruction Model for 3D Gaussian Splatting（一致）

### GeoLRM (`2406.15333`, NeurIPS 2024)
- **摘要**: 提出 GeoLRM，用 3D 感知 transformer 从 21 张图预测 512k 高斯，仅 11GB 显存。
- **创新点**: 1) 利用 3D 结构稀疏性，引入 3D 感知 transformer 直接处理 3D 点；2) 可变形跨注意力（deformable cross-attention）将图像特征融入 3D 表示；3) 两阶段：轻量 proposal 网络生成稀疏 3D 锚点 → 重建 transformer 细化几何与纹理。
- **核心方法**: 阶段一轻量 proposal 网络从带位姿图生成稀疏 3D anchor points；阶段二专用重建 transformer 用 deformable cross-attention 细化几何、检索纹理。
- **实验设计与分析**: 21 输入图 / 512k 高斯 / 11GB；密集视角输入下显著优于现有模型（具体数字待补）。支撑 claim：可扩展至密集视角提升质量且显存低。
- **写作可嫁接点**: 作为"几何感知 LRM / 锚点 + transformer 细化"基线，对比 GS-LRM（纯像素 token）；related-work 讨论显存与分辨率限制。
- **核查**: arxiv 标题 = GeoLRM: Geometry-Aware Large Reconstruction Model for High-Quality 3D Gaussian Generation（一致）

### InstantSplat (`2403.20309`, arXiv 2024)
- **摘要**: 解决稀疏视角重建——SfM 在特征稀少时不可靠。InstantSplat 用自监督框架，以几何基础模型初始化，快速优化场景与相机位姿。
- **创新点**: 1) 用大规模几何基础模型（MASt3R 类）提供稠密先验作初始化，而非依赖 SfM；2) 基于共视性的几何初始化（co-visibility-based geometry initialization）缓解先验冗余；3) 基于高斯的 bundle adjustment 快速适配场景与相机参数，无需自适应密度控制。
- **核心方法**: 基础模型推理得初始点 → 光度误差进一步优化；co-visibility 几何初始化去冗余；Gaussian-based BA 联合优化表示与位姿。
- **实验设计与分析**: SSIM 从 0.3755 提升至 0.7624（相对传统 SfM + 3D-GS）；重建加速 > 30x（摘要给出）。支撑 claim：稀疏视角下质量与速度大幅提升。
- **写作可嫁接点**: 作为"几何基础模型初始化 + 快速 BA"稀疏视角基线，对比每场景优化的 3D-GS；related-work 讨论 SfM 失败场景。
- **核查**: arxiv 标题 = InstantSplat: Sparse-view Gaussian Splatting in Seconds（一致）

### MVSplat (`2403.14627`, ECCV 2024)
- **摘要**: MVSplat 从稀疏多视角图预测干净的 feed-forward 3D 高斯，用 plane sweeping 构建 cost volume 提供几何线索定位高斯中心。
- **创新点**: 1) 用 plane-sweeping cost volume 提供跨视角相似度几何线索定位高斯中心；2) 仅光度监督联合学习其他高斯参数；3) 极快前馈推理（22fps）且比 pixelSplat 参数少 10 倍、快 2 倍以上。
- **核心方法**: 平面扫描构建 cost volume 存跨视角特征相似度 → 估计深度/高斯中心；联合学习高斯其他属性；可微渲染监督。
- **实验设计与分析**: RealEstate10K、ACID SOTA；22fps 最快前馈；比 pixelSplat 少 10x 参数、> 2x 快、质量更高、跨数据集泛化更好（摘要给出）。支撑 claim：cost volume 对前馈高斯至关重要。
- **写作可嫁接点**: 作为"cost volume/MVS 几何引导前馈 3DGS"标杆基线，几乎必比；related-work 讨论像素对齐高斯定位。
- **核查**: arxiv 标题 = MVSplat: Efficient 3D Gaussian Splatting from Sparse Multi-View Images（一致）

### MVSplat360 (`2411.04924`, NeurIPS 2024)
- **摘要**: MVSplat360 用稀疏视角做 360° 前馈新视角合成，结合几何感知 3D 重建与时间一致的视频生成。
- **创新点**: 1) 将前馈 3DGS 改造为在预训练 SVD 潜空间渲染特征，而非直接渲染 RGB；2) 渲染特征作为 pose 与视觉线索引导 SVD 去噪生成逼真 3D 一致视角；3) 端到端可训练，支持少至 5 张稀疏图任意视角。
- **核心方法**: 前馈 3DGS 渲染特征至 Stable Video Diffusion 潜空间；这些特征引导 SVD 去噪产生多视角一致视频帧；端到端训练。
- **实验设计与分析**: 提出 DL3DV-10K 新基准（挑战性）；RealEstate10K 验证；宽扫/360° NVS 上优于 SOTA（具体数字待补）。支撑 claim：少重叠稀疏输入下 360° 合成。
- **写作可嫁接点**: 作为"前馈 3DGS + 视频扩散"混合范式基线，对比纯前馈（MVSplat）与纯生成；related-work 讨论 360/少重叠难题。
- **核查**: arxiv 标题 = MVSplat360: Feed-Forward 360 Scene Synthesis from Sparse Views（一致）

### PixelSplat (`2312.12337`, CVPR 2024)
- **摘要**: pixelSplat 前馈模型从图像对学习以 3D 高斯参数化的辐射场，实时、显存高效渲染，可扩展训练与快速推理。
- **创新点**: 1) 从图像对直接前馈预测像素对齐高斯（早期可泛化 3DGS 奠基之一）；2) 预测 3D 上稠密概率分布并对高斯均值采样，用 reparameterization trick 使采样可微，克服稀疏局部表示局部极小；3) 实时高效渲染。
- **核心方法**: 编码图像对 → 预测每像素高斯均值的概率分布 → 可微采样得高斯均值 → 解码其他属性；可微光栅化渲染监督。
- **实验设计与分析**: RealEstate10K、ACID 宽基线 NVS；超 SOTA 光场 transformer，渲染加速 2.5 个数量级（摘要给出）。支撑 claim：可泛化、实时、可编辑辐射场。
- **写作可嫁接点**: 作为可泛化前馈 3DGS 开山基线，几乎每篇必引用对比；related-work 讨论 pixel-aligned 高斯预测起源。
- **核查**: arxiv 标题 = pixelSplat: 3D Gaussian Splats from Image Pairs for Scalable Generalizable 3D Reconstruction（一致）

### ReconFusion (`2312.02981`, CVPR 2024)
- **摘要**: 仅用少量照片重建真实场景。用扩散先验正则化 NeRF 重建管线，在输入图之外的相机位姿合成真实几何与纹理。
- **创新点**: 1) 利用在合成/多视角数据集训练的扩散先验做新视角合成正则化；2) 在输入图之外的新位姿正则化 NeRF，填充欠约束区域；3) 保留已观测区域外观同时合成未观测区域几何纹理。
- **核心方法**: 扩散模型（新视角合成先验）在训练时于未见相机位姿处提供监督；与 NeRF 重建目标联合优化；测试时 few-shot 重建。
- **实验设计与分析**: 前向着、360° 等多真实数据集；相比前作 few-view NeRF 重建显著提升（具体数字待补）。支撑 claim：少图重建质量提升。
- **写作可嫁接点**: 作为"扩散先验正则化 few-view 重建"代表（NeRF 路线），与 CAT3D（生成视图再重建）、前馈 3DGS 对比；related-work 讨论扩散 + 3D。
- **核查**: arxiv 标题 = ReconFusion: 3D Reconstruction with Diffusion Priors（一致）

### Splatt3R (`2408.13912`, arXiv preprint 2024)
- **摘要**: Splatt3R 从无标定图像对做 pose-free 前馈 3D 重建与 NVS，无需相机参数或深度。
- **创新点**: 1) 基于 MASt3R「基础」几何重建方法扩展处理 3D 结构与外观；2) 先优化 3D 点云几何损失，再优化 NVS 目标，避免从立体对训练高斯的局部极小；3) 新损失掩码策略对 Dedicated 外推视角关键。
- **核心方法**: 在 MASt3R 上预测每点额外高斯属性；两阶段训练（几何损失 → NVS 目标）；loss masking 策略；ScanNet++ 训练。
- **实验设计与分析**: ScanNet++ 训练，对无标定 in-the-wild 图像优秀泛化；512×512 下 4FPS 重建（摘要给出）。支撑 claim：pose-free 且实时、外推视角鲁棒。
- **写作可嫁接点**: 作为"基于 MASt3R 的 pose-free 前馈 3DGS"基线，对比 NoPoSplat、AnySplat；related-work 讨论无位姿重建。
- **核查**: arxiv 标题 = Splatt3R: Zero-shot Gaussian Splatting from Uncalibrated Image Pairs（一致）

## 2025 已确立（简表）

| 方法名 | ID | venue | year | 一句话贡献 |
|---|---|---|---|---|
| AnySplat | `2505.23716` | SIGGRAPH 2025 | 2025 | 单前向从无标定图集预测高斯及相机内外参，免位姿实时 NVS |
| CUT3R | `2501.12387` | CVPR 2025 | 2025 | 状态循环 Transformer 持续更新 pointmap，在线累积稠密重建 |
| DepthSplat | `2410.13862` | CVPR 2025 | 2025 | 连接深度估计与前馈 3DGS，互促达 SOTA，0.6s/12 视角 |
| Flash3D | `2406.04343` | 3DV 2025 | 2025 | 单图扩展单目深度基础模型为多层高斯，高效泛化 |
| MonST3R | `2410.03825` | ICLR 2025 | 2025 | 将 DUSt3R 扩展每时刻 pointmap 处理动态场景几何 |
| NoPoSplat | `2410.24207` | ICLR 2025 | 2025 | 无位姿稀疏图前馈 3DGS，仅光度损失，实时且 NVS 超有位姿法 |
| OmniSplat | `2412.16604` | CVPR 2025 | 2025 | 免训练 Yin-Yang 网格分解适配前馈 3DGS 处理全景图 |
| Spann3R | `2408.16061` | 3DV 2025 | 2025 | 外部空间记忆统一全局坐标系 pointmap 重建，免全局对齐 |
| SplatFormer | `2411.06390` | CVPR 2025 | 2025 | 首个点 transformer 直接精修高斯，提升 OOD 极端视角渲染 |
| VGGT | `2503.11651` | CVPR 2025 | 2025 | 前馈 Transformer 一次推断相机/点图/深度/轨迹全 3D 属性 |
| VolSplat | `2509.19297` | arXiv 2025（摘要注 ECCV 2026） | 2025 | 以体素对齐高斯替代像素对齐，提升多视角一致性与质量 |
| ZPressor | `2505.23734` | NeurIPS 2025 | 2025 | 信息瓶颈压缩多视角为紧凑潜 Z，使前馈 3DGS 扩展至百视图 |

## 近期焦点（2026，详写）

### DeltaSplat (`2610.09853`, 2026)
- **摘要**: pose-free 前馈 3DGS 单次推理重建，但相机估计误差会传播进高斯，单遍预测几何/光度不准。DeltaSplat 是轻量高斯精修模块，迭代渲染当前高斯并预测逐高斯更新以纠正误差。
- **创新点**: 1) 迭代式逐高斯残差精修：渲染当前高斯在上下文视角得残差再预测更新，纠正单遍误差；2) 以逐像素 Plücker 射线 + 渲染深度作软几何先验条件化更新，解决 2D 残差欠定 3D 纠正；3) 仅增 ~2.2% 参数、全前馈推理。
- **核心方法**: 双分支卷积 mixer 编码（残差图 + Plücker 射线 + 渲染深度）；per-attribute heads 解码为位置/不透明度/颜色更新；迭代多步。模块接入 pose-free backbone。
- **实验设计与分析**: DL3DV 上 pose-free 达 26.64 dB PSNR，较 SOTA backbone +1.75 dB，并超提供真值相机基线；6-24 视角及所有相机体制一致增益（摘要给出）。支撑 claim：迭代精修纠正位姿误差带来跨体制增益。
- **写作可嫁接点**: 作为"pose-free 前馈 3DGS 后处理精修"基线，对比 NoPoSplat/AESplat；related-work 讨论位姿误差传播与残差纠正。
- **核查**: arxiv 标题 = DeltaSplat: Iterative Gaussian Refinement for Pose-Free Feed-Forward 3D Gaussian Splatting（一致，2026-10-07 提交）

### DensiTok (`2610.07958`, 2026)
- **摘要**: 前馈 3DGS 随输入图减少质量骤降，瓶颈在内部表示缺未观测证据。DensiTok 插件直接稠密化预训练模型的内部几何 token，使冻结 backbone 如见更多视图。
- **创新点**: 1) 不再合成额外像素视图（昂贵且非 3D 一致），而是稠密化内部几何 token 本身；2) 将 token 压缩到紧凑潜空间，单步 flow-matching 补全未观测视角潜变量，再解码回 token；3) 冻结 backbone 与重建头，可插不同预训练模型。
- **核心方法**: 压缩几何 token → 低维潜空间；flow-matching 一步条件于相机几何补全未观测视角潜；解码回 token 供原重建头。无需图像合成或额外编码。
- **实验设计与分析**: 三个预训练 backbone + 两个基准，稀疏视角重建一致提升、大幅缩小与密集视角差距（具体数字待补）。支撑 claim：token 级稠密化优于像素级视图合成补证据。
- **写作可嫁接点**: 作为"内部潜空间稠密化/视图补全"插件式基线，对比 MVSplat360（视频扩散补视图）；related-work 讨论稀疏输入证据缺失。
- **核查**: arxiv 标题 = DensiTok: Making Feed-Forward 3D Gaussian Splatting See More Views Than It Is Given（一致，2026-10-06 提交）

### MoonGS (`2610.07110`, 2026)
- **摘要**: 月球车稀疏图像 3D 重建难（重叠不足、纹理弱）。MoonGS 首个面向月面场景的前馈 3DGS 框架，仅两图单遍预测像素对齐高斯并渲染逼真新视角。
- **创新点**: 1) 适配 backbone 无缝集成视觉基础模型提取鲁棒深度特征；2) 双重语义先验：语义线索融视觉特征细化高斯 + 语义排序损失正则化背景深度；3) 熵引导启发式重采样选最信息远端视角增广稀疏观测。
- **核心方法**: 双图输入 → 基础模型深度特征 → 像素对齐高斯；语义融合 + semantic ranking loss；entropy-guided resampling 选视角。
- **实验设计与分析**: LuSNAR 基准 + 合成 MoonBlender；较 SOTA 前馈 NeRF/3DGS +4.9dB PSNR、+0.29 SSIM、低 40% LPIPS，亚秒推理（摘要给出）；Chang'e 影像定性最佳。支撑 claim：弱纹理月面稀疏两图重建鲁棒。
- **写作可嫁接点**: 作为"面向特定域（月面/弱纹理）前馈 3DGS + 基础模型"应用基线，对比通用前馈 3DGS；related-work 讨论弱纹理/稀疏域适配。
- **核查**: arxiv 标题 = MoonGS: High-quality Representation of the Lunar Surface via Gaussian Splatting Using Robust Depth Features from Image Pairs（一致，2026-10-05 提交）

### AESplat (`2609.36693`, 2026)
- **摘要**: 现有 pose-free 前馈 3DGS 同法预测 SH 表观，忽视视角无关/相关区别致渲染次优。AESplat 解耦表观建模提升质量。
- **创新点**: 1) 基于 SH 分析的解耦表观：零阶 SH（视角无关基础）直接从输入图免训练推导；2) 高阶 SH 由带两种 3D 感知归纳偏置的浅 MLP 预测建模视角相关变化；3) 通用框架可加 pose-free 前馈 3DGS。
- **核心方法**: 直接由输入图算零阶 SH 系数（无训练）；浅 MLP + 2 个 3D 感知归纳偏置预测高阶 SH；组合得高斯表观。
- **实验设计与分析**: 多数据集；RealEstate10K 上较 pose-free NAS3R +0.8dB PSNR、较 pose-required DepthSplat +1.1dB（摘要给出）。支撑 claim：解耦表观建模显著超越 SOTA。
- **写作可嫁接点**: 作为"SH 解耦/表观分解"基线，对比 DepthSplat、NAS3R、NoPoSplat；related-work 讨论视角相关辐射建模。
- **核查**: arxiv 标题 = AESplat: Advancing Pose-Free Feed-Forward 3D Gaussian Splatting via Decoupled Appearance Modeling（一致，2026-09-29 提交）

### AGILE-GS (`2609.34176`, 2026)
- **摘要**: NBV 选择 3DGS 通常对候选池逐一打分保留一个。AGILE-GS 锚点引导分离"搜索信息"与"选相机"，大幅降延迟。
- **创新点**: 1) 在 SE(3) 上用 Riemannian 梯度上升优化虚拟锚点位姿（标记最不确定处），无需可达/在池中；2) 候选对锚点视角几何打分，greedy ridge-leverage 将池蒸馏为小而非冗余短名单，无需渲染候选；3) AGILE-GS(+) 两种用法，Fisher 信息仅对短名单计算。
- **核心方法**: 虚拟锚点 SE(3) 优化（期望信息增益）；候选几何打分 + ridge-leverage 去冗余短名单；AGILE-GS 取首视图 / AGILE-GS+ 算 Fisher 选最优。
- **实验设计与分析**: 标准基准 + 闭环具身采集；达/超现有基线，选择延迟降 1-2 个数量级（摘要给出）。支撑 claim：分离搜索与选择大幅加速 NBV。
- **写作可嫁接点**: 作为"主动采集/NBV + 3DGS"高效基线；related-work 讨论 3DGS 主动感知、信息增益 NBV；对比需渲染打分的 NBV 方法。
- **核查**: arxiv 标题 = AGILE-GS: Anchor-Guided Fast Next-Best-View Selection for Active 3D Gaussian Splatting（一致，2026-09-28 提交）


---

## 簇五 · 稀疏视角 / SLAM <a id="E_Sparse_SLAM"></a>

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


---

## 簇六 · 具身智能 / 自动驾驶 <a id="F_Embodied_Driving"></a>

# 研读笔记 · 簇 F_Embodied_Driving（Embodied AI & Robotics / Autonomous Driving）

> 说明：本文件依据 `_cluster_F_Embodied_Driving.md` 的任务清单生成。所有论文均经 `https://arxiv.org/abs/<id>` 核验。部分簇内标注（方法短名/venue/year）与 arXiv 实际信息不符者已在「核查」中标注。

---

## 一、经典论文（2023-2024，深度全覆盖）

### GIC (`2406.14927`, NeurIPS 2024)
- **摘要**: 研究通过视觉观测估计物体物理属性（系统辨识）。提出混合框架，用 3D Gaussian 显式捕捉形状，并让模拟连续体在训练中把物体掩码渲染为 2D 形状代理，引导物理属性估计；在多个基准与真实演示上达 SOTA。
- **创新点**: ① 用运动分解的动态 3D Gaussian 跨时间状态恢复物体点集；② 由粗到细填充策略从 Gaussian 重建生成密度场、抽取连续体及其表面并融合 Gaussian 属性；③ Gaussian 信息连续体可在模拟中渲染掩码作 2D 形状监督。
- **核心方法**: 表示=3DGS+连续体（continuum）；优化=运动分解动态 Gaussian 重建+密度场填充；渲染=模拟中掩码渲染；监督=2D 形状代理引导物理属性回归。
- **实验设计与分析**: 多基准+指标达 SOTA（具体数字「待补」），并含真实世界演示；支撑「Gaussian 几何能提升物理属性辨识」的 claim。
- **写作可嫁接点**: related work 中作为「3DGS + 物理/连续体仿真/系统辨识」桥接方法引用，或对比 NeRF/点云在可微物理中的差异。
- **核查**: arxiv 标题=GIC: Gaussian-Informed Continuum for Physical Property Identification and Simulation（一致）。

### GaussNav (`2403.11625`, CVPR 2024)
- **摘要**: 面向实例图像目标导航（IIN），解决在未知环境中按目标图找到特定物体、并抗干扰物的问题。提出基于 3DGS 的地图表示，记忆场景几何、语义与物体纹理特征，通过渲染匹配识别并导航至目标；HM3D 上 SPL 由 0.347 升至 0.578。
- **创新点**: ① 首次将 3DGS 用于 IIN 建图，弥补 BEV 地图缺乏纹理细节的缺陷；② 地图同时保留几何、语义与纹理特征；③ 以相似物体渲染与目标图匹配实现实例级 grounding。
- **核心方法**: 表示=3DGS 语义-纹理地图；模块=目标图匹配+渲染比对；任务=IIN 导航至指定物体。
- **实验设计与分析**: Habitat-Matterport 3D (HM3D) 数据集，SPL 0.347→0.578，支撑「3DGS 纹理地图显著优于 BEV 语义地图」的 claim。
- **写作可嫁接点**: 作为「3DGS 用于视觉导航/建图」基线引用，或与 BEV、NeRF 地图做对比。
- **核查**: arxiv 标题=GaussNav: Gaussian Splatting for Visual Navigation（一致）；venue 簇标 CVPR 2024，arxiv comments 仅注 "journal"，以簇标为准。

### GaussianBeV (`2407.14108`, ECCV 2024)
- **摘要**: 提出 GaussianBeV，用一组位于 3D 空间并具方向的 3D 高斯将图像特征变换为 BeV，并 splat 生成 BeV 特征图；首个在线上（无需针对单场景优化）将 3D 高斯建模与渲染集成进单阶段 BeV 理解模型的方法，在 nuScenes BeV 语义分割上达 SOTA。
- **创新点**: ① 以 3D 高斯精细建模场景替代几何/交叉注意力视图变换的下采样；② 在线、非逐场景优化的高斯渲染；③ 单阶段模型直接做 BeV 场景理解。
- **核心方法**: 表示=3D 定向高斯集合；流程=图像特征→3D 高斯定位/定向→splat→BeV 特征图→分割头。
- **实验设计与分析**: nuScenes BeV 语义分割，新 SOTA（具体数字「待补」），支撑「高斯表示比现有视图变换更细致」的 claim。
- **写作可嫁接点**: 作为「3DGS 用于自动驾驶 BeV 感知」代表方法，或对比 LSS/跨注意力/BEV 方法。
- **核查**: arxiv 标题=GaussianBeV: 3D Gaussian Representation meets Perception Models for BeV Segmentation（一致）；⚠ 簇标 ECCV 2024，arxiv 实际为 WACV 2025。

### GaussianGrasper (`2403.09637`, IEEE T-RO 2024)
- **摘要**: 面向开放词汇机器人抓取，用 3DGS 显式表示场景，从少量 RGB-D 视图经 tile-based splatting 构建特征场，结合预训练抓取模型与法向引导模块选出无碰撞抓取姿态；真实实验验证语言指令抓取可行。
- **创新点**: ① 以 3DGS 显式场替代 NeRF 隐式场，克服多视角重建与推理低效；② 提出 EFD（高效特征蒸馏）模块，用对比学习从基础模型蒸馏语言嵌入；③ normal-guided grasp 模块选最优姿态。
- **核心方法**: 表示=3D 语言 Gaussian Splatting；模块=EFD 对比蒸馏语言特征 + 预训练抓取模型生成候选 + 法向引导筛选。
- **实验设计与分析**: 真实世界抓取实验（数字「待补」），支撑「语言查询+抓取」的 claim。
- **写作可嫁接点**: 作为「语言嵌入 3DGS / 开放词汇抓取」基线，或对比 LangSplat、LERF 等特征场。
- **核查**: arxiv 标题=GaussianGrasper: 3D Language Gaussian Splatting for Open-vocabulary Robotic Grasping（一致）。

### GraspSplats (`2409.02084`, CoRL 2024)
- **摘要**: 提出 GraspSplats，用深度监督+新颖参考特征计算在 60 秒内生成高质量场景表示；论证 NeRF 因隐式性不适场景变化、点投影法缺渲染优化导致部件定位不准。显式优化几何原生支持实时抓取采样与动态/关节物体操控；Franka 实验显著优于 F3RM、LERF-TOGO 与 2D 检测。
- **创新点**: ① 显式 Gaussian 表示天然支持场景变化与实时抓取；② 新颖 reference feature computation 提升特征质量；③ 结合点追踪器支持动态/关节物体操控。
- **核心方法**: 表示=3D 特征 splatting；优化=深度监督+参考特征计算（<60s）；应用=实时抓取采样 + 点追踪器动态操控。
- **实验设计与分析**: Franka 机器人多任务，优于 NeRF 基 F3RM/LERF-TOGO 与 2D 检测（具体数字「待补」），支撑「显式几何优于隐式/点基」的 claim。
- **写作可嫁接点**: 作为「3D 特征 splatting 用于零样本/部件抓取」强基线，对比 F3RM、GaussCtrl 等。
- **核查**: arxiv 标题=GraspSplats: Efficient Manipulation with 3D Feature Splatting（一致）。

### ManiGaussian (`2403.08321`, ECCV 2024)
- **摘要**: 提出动态 Gaussian Splatting 方法 ManiGaussian 用于多任务机器人操作，通过未来场景重建挖掘场景动态；构建 Gaussian world model 参数化分布，提供交互监督。10 个 RLBench 任务 166 个变体上平均成功率超 SOTA 13.1%。
- **创新点**: ① 动态 Gaussian Splatting 框架推断 Gaussian 嵌入空间的语义传播；② Gaussian world model 以未来场景重建提供交互式监督；③ 用语义表示预测最优动作。
- **核心方法**: 表示=动态 3DGS；模块=语义传播推断 + Gaussian world model（未来场景重建监督）→动作预测。
- **实验设计与分析**: RLBench 10 任务/166 变体，平均成功率 +13.1%，支撑「场景级时空动态提升操作」的 claim。
- **写作可嫁接点**: 作为「动态 3DGS / Gaussian world model 用于操作」方法，或对比其他策略表征。
- **核查**: arxiv 标题=ManiGaussian: Dynamic Gaussian Splatting for Multi-task Robotic Manipulation（一致）。

---

## 二、2025 已确立（简表）

| 方法名 | ID | venue(year) | 一句话贡献 |
|---|---|---|---|
| GS-Physics* | `2409.08042` | CVPR 2025（⚠arxiv 实际=ECCV2024，标题 Thermal3D-GS） | 物理诱导 3DGS 做热红外新视角合成与基准 TI-NSD，PSNR +3.03dB |
| GaussianSSC | `2603.21487` | CVPR 2025（⚠arxiv 实际 2026-03 提交） | triplane 引导方向性高斯场做 3D 语义场景补全，SemanticKITTI 领先 |
| Splat-Nav | `2403.02751` | CVPR 2025 | GSplat 地图中实时安全导航（Splat-Plan+Splat-Loc），比 NeRF 快一个数量级 |
| SplatAD | `2411.16816` | CVPR 2025 | 首个 3DGS 同时实时渲染动态驾驶场景的相机与激光雷达（含卷帘/丢点建模） |
| SplatSim | `2409.10161` | CVPR 2025 | 用高斯泼溅作渲染原语实现 RGB 操作策略零样本 Sim2Real（成功率 86.25%） |
| VR-Robo | `2502.01536` | RAL 2025 | 3DGS 真实→仿真→真实，RGB-only 视觉导航与运动策略迁移框架 |

> *GS-Physics：簇内短名与 arXiv 实际标题（Thermal3D-GS: Physics-induced 3D Gaussians for Thermal Infrared Novel-view Synthesis）不一致，ID 有效可解析；其贡献为热红外新视角合成。

---

## 三、近期焦点（2026，详写，满五要素）

### OpenSplatGraph (`2610.07569`, ACCV 2026)
- **摘要**: 密集 3D 语义映射对机器人感知至关重要。现有 3DGS 建图以非结构化特征场表示语义，限制以物体为中心的推理；而 3D 场景图能显式建模物体与关系，却常基于稀疏几何、未充分利用密集语义图。本文提出统一框架，从在线高斯开放词汇语义地图直接构建持久 3D 场景图。
- **创新点**: ① 在密集语义图上增广 reliability-aware 语义场，维护轻量观测统计，实现置信感知、查询条件的物体提取；② 提取的物体实例关联持久图节点，属性与关系可跨观测/查询增量更新；③ 紧耦合密集语义映射与持久以物体为中心的表示，兼顾几何保真与关系推理。
- **核心方法**: 表示=在线高斯开放词汇语义地图 + 持久 3D 场景图；关键模块=reliability-aware semantic field（观测统计）、query-conditioned object extraction、persistent graph node 关联与增量更新；渲染=Gaussian-based mapping 保几何。
- **实验设计与分析**: 在标准 3D 场景理解基准与真实机器人实验上评估，开放词汇感知与下游任务具竞争力（具体数字「待补」）；支撑「密集语义映射+持久图」兼顾 grounding 与关系推理的 claim。
- **写作可嫁接点**: related work 中同时覆盖「语言嵌入/GS 语义地图」与「3D 场景图」两线，作为 open-vocabulary grounding + 结构化关系推理的统一基线引用。
- **核查**: arxiv 标题=OpenSplatGraph: From Dense Semantic Maps to Structured Scene Graphs for Open-Vocabulary Robot Perception（一致）；簇标 2026，arxiv 实际 Accepted to ACCV 2026。

### ControlPed (`2610.06171`, 2026)
- **摘要**: 端到端自动驾驶在罕见安全临界人车交互下的评估需要照片级、传感器级场景。轨迹生成器无法合成原始视觉观测，视频方法又缺乏可控性。ControlPed 结合轨迹级冲突合成与 3DGS，生成照片级、运动可控的安全关键场景用于驾驶安全评测。
- **创新点**: ① 同时具备轨迹级可控性与 3DGS 照片级渲染，弥补「轨迹法不可见 / 视频法不可控」两侧短板；② 基于 HazardPed 数据集（10,352 交通视频、422 冲突轨迹、HD 地图、857 标注 3D 人体运动）；③ 文本条件运动扩散将冲突轨迹提升为 3D 人体运动，再用可动画 3DGS 化身渲染多视角传感器观测。
- **核心方法**: 流程=生成冲突轨迹 → 文本条件运动扩散提升为 3D 人体运动序列 → 可动画 3DGS 化身渲染多视角传感器观测；数据=HazardPed。
- **实验设计与分析**: 88 个渲染照片级场景中，7 个主流端到端驾驶模型 mean HDScore 由 88.8 骤降至 47.4，暴露危险行人行为下的关键失效模式；支撑「生成式安全关键场景可暴露 SOTA 模型缺陷」的 claim。
- **写作可嫁接点**: 作为「生成式安全关键场景评测基准」对比方法或引用，论证评测需同时具备可控性与照片级；可与 NeRF/视频生成式仿真对位。
- **核查**: arxiv 标题=Controllable and Photorealistic Pedestrian Risky Motion Generation for End-to-End Driving Safety Evaluation（一致，簇内简称 ControlPed）；簇标 2026，arxiv 提交于 2026-10-05。


---

## 簇七 · 编辑 / 人体与化身 / 生成 <a id="G_Editing_Human_Gen"></a>

# 研读知识库 · 簇 G_Editing_Human_Gen（Editing / Human & Avatar / Generation）

> 格式说明：经典(2023-2024) 深度全覆盖；2025 简表；2026 焦点详写满五要素。所有指标仅来自 arxiv 摘要或确证知识，未知以「待补」标注。共覆盖 39 篇（29 经典 + 8 2025 + 2 2026）。

---

## 一、经典论文（2023-2024，深度全覆盖，29 篇）

### 3DGS-Avatar (`2312.09228`, CVPR 2024)
- **摘要**: 用 3D Gaussian Splatting 从单目视频重建可动画衣著人体化身；学习非刚性形变网络，30 分钟内训练、50+ FPS 实时渲染。
- **创新点**: ① 显式高斯 + 非刚性形变场表示可动化身，告别 NeRF 的数天训练；② 在均值向量与协方差矩阵上施加 as-isometric-as-possible 正则；③ 显著提升对未见姿态的泛化。
- **核心方法**: 规范空间 3D 高斯 + 学习得到的形变网络驱动到姿态空间；等距正则约束高斯均值与协方差在形变中保持几何结构。
- **实验设计与分析**: 单目视频动画化身基准；对比 NeRF 与快速 grid 方法。可实时 50+ FPS，训练/推理分别快 400×/250×（摘要数字，支撑「实时可动化身」claim）。
- **写作可嫁接点**: 作为实时可动人类化身 baseline 引用；related-work 中对比 NeRF 化身与 grid 方法。
- **核查**: arxiv 标题=3DGS-Avatar: Animatable Avatars via Deformable 3D Gaussian Splatting（一致）。

### Align Your Gaussians (`2312.13763`, CVPR 2024)
- **摘要**: 提出 text-to-4D 合成方法 AYG，用动态 3D 高斯 + 形变场作 4D 表示，结合多扩散模型反馈做分数蒸馏。
- **创新点**: ① 组合式生成（text-to-image / text-to-video / 多视角扩散）联合监督；② 正则移动高斯分布以稳定优化并诱导运动；③ 运动放大 + 自回归拼接多段 4D 序列。
- **核心方法**: 动态 3DGS（带形变场）作 4D 表示；用多源扩散模型在优化中同时强制时序一致性、外观与几何；自回归合成延长 4D 动画。
- **实验设计与分析**: 定性+定量超越先前 text-to-4D 工作（摘要结论，具体数字待补）；展示不同 4D 动画无缝拼接。
- **写作可嫁接点**: text-to-4D / 动态 3DGS 生成方向的代表方法；与 GaussianDreamer、DreamGaussian 对比。
- **核查**: arxiv 标题=Align Your Gaussians: Text-to-4D with Dynamic 3D Gaussians and Composed Diffusion Models（一致）。

### BAD-Gaussians (`2403.11831`, CVPR 2024)
- **摘要**: 在运动模糊 + 相机位姿不准条件下做 3DGS 重建与去模糊，建模物理成像过程联合优化高斯与曝光轨迹。
- **创新点**: ① 显式高斯处理严重运动模糊（NeRF 隐式难恢复细节且不能实时）；② 建模曝光时间内相机运动轨迹；③ 联合恢复高斯参数与位姿（bundle adjusted deblur）。
- **核心方法**: 将模糊图像形成建模为物理过程，联合学习高斯参数并恢复曝光期间相机运动轨迹；端到端可微渲染。
- **实验设计与分析**: 合成+真实数据集，渲染质量优于先前 SOTA 去模糊神经渲染方法，且支持实时渲染（具体指标待补）。
- **写作可嫁接点**: 鲁棒/去模糊 3DGS baseline；编辑簇中作为模糊输入重建的对比方法。
- **核查**: arxiv 标题=BAD-Gaussians: Bundle Adjusted Deblur Gaussian Splatting（一致）。

### D-MiSo (`2405.14276`, NeurIPS 2024)
- **摘要**: 提出 Dynamic Multi-Gaussian Soup，用网格启发表示让动态 3DGS 场景随时间可编辑。
- **创新点**: ① mesh-inspired 动态 GS 表示；② 将参数化高斯链接成 Triangle Soup 与估计网格绑定；③ 可为组成场景的物体分别构造新轨迹，保持部分动态。
- **核心方法**: 以 Triangle Soup 关联参数化高斯与估计网格；为每个 3D 物体独立构造轨迹，实现随时间/保持部分动态的可编辑性。
- **实验设计与分析**: 对比 SC-GS + 形变控制点（需手动选固定元素），D-MiSo 提升编辑可复现性（具体基准数字待补）。
- **写作可嫁接点**: 动态场景编辑代表；Editing 簇中对比 SC-GS / 形变控制点方法。
- **核查**: arxiv 标题=D-MiSo: Editing Dynamic 3D Scenes using Multi-Gaussians Soup（一致）。

### DiffGS (`2410.19657`, NeurIPS 2024)
- **摘要**: 基于隐扩散的通用高斯生成器，将 3DGS 解耦为概率/颜色/变换三个函数，生成任意数量高斯。
- **创新点**: ① 用三个新颖函数解耦离散非结构 3DGS 为连续「GS 函数」；② 训练隐扩散无条件/条件生成这些函数；③ octree 引导采样+优化的离散化算法抽取任意数量高斯。
- **核心方法**: 概率/颜色/变换函数解耦表示；隐扩散生成 GS 函数；离散化算法（octree 引导采样与优化）提取高斯。
- **实验设计与分析**: 覆盖无条件生成、文本/图像/部分 3DGS/点云到高斯生成（具体指标待补）；提供灵活建模高斯的新方向。
- **写作可嫁接点**: 生成簇中「结构化/函数化高斯生成」代表；与 GaussianCube、GSGAN 对比。
- **核查**: arxiv 标题=DiffGS: Functional Gaussian Splatting Diffusion（一致，NeurIPS 2024）。

### Director3D (`2406.17601`, NeurIPS 2024)
- **摘要**: 面向真实世界文本到 3D 生成，同时生成 3D 场景与自适应相机轨迹。
- **创新点**: ① Trajectory Diffusion Transformer 作「导演」建模相机轨迹分布；② Gaussian-driven 多视角隐扩散「装饰」直接生成像素对齐的 3D 高斯；③ SDS++ 损失「细化」融入 2D 扩散先验。
- **核心方法**: 轨迹扩散 Transformer + 高斯驱动多视角隐扩散（微调自 2D 扩散）+ SDS++ 细节细化，三阶段端到端。
- **实验设计与分析**: 真实世界 3D 生成上超越现有方法（具体数字待补）；利用真实数据集比合成数据更真实。
- **写作可嫁接点**: 文本到 3D（含相机轨迹）生成代表；与 DreamGaussian、GaussianDreamer 对比。
- **核查**: arxiv 标题=Director3D: Real-world Camera Trajectory and 3D Scene Generation from Text（一致）。

### DreamGaussian (`2309.16653`, ICLR 2024 Oral)
- **摘要**: 生成式高斯泼溅框架，单视角图像 2 分钟生成带纹理网格，约 10× 加速于已有方法。
- **创新点**: ① 生成式 3DGS + 网格抽取 + UV 空间纹理细化；② 渐进式高斯 densification 比 NeRF 占用剪枝收敛更快；③ 高效高斯→网格转换 + 微调细化细节。
- **核心方法**: 渐进 densification 的 3D 高斯生成；高效算法将高斯转为纹理网格并做 UV 空间微调。
- **实验设计与分析**: 单图约 2 分钟出高质量纹理网格，约 10× 加速（摘要数字，支撑效率 claim）。
- **写作可嫁接点**: 文本/图像到 3D 生成的奠基性高效方法；几乎所有后续 3DGS 生成工作引用。
- **核查**: arxiv 标题=DreamGaussian: Generative Gaussian Splatting for Efficient 3D Content Creation（一致）。

### ExpressiveGaussianHuman (`2407.03204`, NeurIPS 2024)
- **摘要**: EVA：从单目 RGB 视频学可驱动人类化身，用 3D 高斯 + SMPL-X 精细刻画手部与面部表情。
- **创新点**: ① 即插即用模块缓解 SMPL-X 与 RGB 帧对不齐；② 上下文感知自适应密度控制（按部位粒度调梯度阈值）；③ 逐像素置信度反馈机制引导高斯学习。
- **核心方法**: 3D 高斯 + SMPL-X 可驱动模型；改进对齐模块 + 自适应密度控制 + 置信度反馈。
- **实验设计与分析**: 两个基准上定量+定性占优，尤其细粒度手/脸细节（具体指标待补）。
- **写作可嫁接点**: 表情化（手/脸）化身代表；与 GauHuman、3DGS-Avatar、SplatArmor 对比。
- **核查**: arxiv 标题=Expressive Gaussian Human Avatars from Monocular RGB Video（一致，即 EVA）。

### FlashSplat (`2409.08270`, ECCV 2024)
- **摘要**: 2D 掩码到 3DGS 分割的全局最优闭式求解，约 30 秒完成、约 50× 快于最佳现有方法。
- **创新点**: ① 将掩码渲染视为关于高斯标签的线性函数；② 线性规划闭式求最优标签分配；③ 目标函数引入背景偏置提升抗噪鲁棒性。
- **核心方法**: 利用 alpha blending 特性做单步优化；线性规划全局最优求解；背景偏置正则。
- **实验设计与分析**: 各类场景分割 + 下游物体移除/修复；约 30 秒、约 50× 加速（摘要数字，支撑效率 claim）。
- **写作可嫁接点**: 3DGS 分割代表；与 GaussianCut、Gaussian Grouping、GauHuman 对比。
- **核查**: arxiv 标题=FlashSplat: 2D to 3D Gaussian Splatting Segmentation Solved Optimally（一致）。

### GAGAvatar (`2410.07971`, NeurIPS 2024)
- **摘要**: 单图一次前向生成可动画高斯头部化身（GAGAvatar），实时重演无需逐人优化。
- **创新点**: ① 单前向从单图生成 3D 高斯参数；② dual-lifting 方法产生高保真身份/面部细节；③ 全局图像特征 + 3DMM 构造控制表情的高斯。
- **核心方法**: dual-lifting 从单图生成 3D 高斯；全局特征 + 3DMM 驱动表情控制；训练后泛化到未见身份。
- **实验设计与分析**: 重建质量与表情精度优于先前方法（具体指标待补）；实时重演。
- **写作可嫁接点**: 单图/可泛化头部化身代表；与 HeadGaS、SplatFace、GaussianTalker 对比。
- **核查**: arxiv 标题=Generalizable and Animatable Gaussian Head Avatar（一致）。

### GSDeformer (`2405.15491`, arXiv 2024)
- **摘要**: cage-based 形变作用于 3DGS，用代理点云桥接，无需重训、实时、可扩展到变体。
- **创新点**: ① 代理点云表示桥接 cage 形变与 3DGS；② 对点云形变转译为高斯变换，含 split 近似弯曲；③ render-and-reconstruct 自动建 cage；不改 3DGS 核心架构。
- **核心方法**: 从 3D 高斯生成代理点云；cage 形变映射到高斯变换 + split 处理弯曲；自动 cage 构建。
- **实验设计与分析**: 形变结果优于现有方法、极端形变鲁棒、实时、无需重训（具体指标待补）。
- **写作可嫁接点**: 3DGS 编辑（形变）代表；Editing 簇中对比几何编辑方案。
- **核查**: arxiv 标题=GSDeformer: Direct, Real-time and Extensible Cage-based Deformation for 3D Gaussian Splatting（一致）。

### GSGAN (`2406.02968`, NeurIPS 2024)
- **摘要**: 将 3DGS 用作 3D GAN 显式表示，分层多尺度高斯生成，渲染约 100× 快于 SOTA 3D 一致 GAN。
- **创新点**: ① 用显式高斯替代 ray-casting 体渲染降成本；② 分层多尺度高斯解决朴素生成器训练不稳定与尺度不可调；③ 粗到细参化学制位置与尺度单调下降。
- **核心方法**: 分层高斯生成器（细级由粗级参数化）；位置近粗级、尺度单调减建模粗细细节；对抗训练。
- **实验设计与分析**: 渲染速度约 100× 快于 SOTA 3D 一致 GAN，生成能力可比（摘要数字，支撑效率 claim）。
- **写作可嫁接点**: 对抗式高斯生成代表；与 DiffGS（扩散式）、GaussianCube 对比。
- **核查**: arxiv 标题=GSGAN: Adversarial Learning for Hierarchical Generation of 3D Gaussian Splats（一致）。

### GScream (`2404.13679`, ECCV 2024)
- **摘要**: 面向 3DGS 物体移除，保持几何一致与纹理连贯，增强可见/不可见区域信息交换。
- **创新点**: ① 在线注册（单目深度引导）优化高斯位置提升几何一致；② 特征传播机制（cross-attention）桥接不确定/确定区域提升纹理连贯；③ 针对离散高斯的不完整挑战。
- **核心方法**: 单目深度估计引导在线注册优化高斯几何；跨注意力特征传播增强纹理一致；针对移除区域修复。
- **实验设计与分析**: 新视角合成质量提升 + 训练/渲染效率（具体指标待补）。
- **写作可嫁接点**: 物体移除/修复编辑代表；与 GaussianCut、Gaussian Grouping、InFusion 对比。
- **核查**: arxiv 标题=GScream: Learning 3D Geometry and Feature Consistent Gaussian Splatting for Object Removal（一致）。

### GauHuman (`2312.02973`, ECCV 2024)
- **摘要**: 单目人视频的关节化高斯泼溅，1~2 分钟训练、最高 189 FPS，约 13k 高斯建模人体。
- **创新点**: ① 规范空间高斯 + LBS 变换到姿态空间；② 姿态与 LBS 细化模块学细节点；③ 3D 人体先验初始化/剪枝 + KL 散度 split/clone + merge 加速。
- **核心方法**: 规范空间 3D 高斯 + 线性混合蒙皮；人体先验初始化与 KL 引导 densification/merge。
- **实验设计与分析**: ZJU_Mocap、MonoCap 上 SOTA；最高 189 FPS、约 13k 高斯、1~2 分钟训练（摘要数字，支撑实时 claim）。
- **写作可嫁接点**: 实时人体化身奠基方法；多数人类化身工作的直接 baseline。
- **核查**: arxiv 标题=GauHuman: Articulated Gaussian Splatting from Monocular Human Videos（一致）。

### GaussCtrl (`2403.08733`, ECCV 2024)
- **摘要**: 文本驱动、多视角一致地编辑 3DGS 场景，比逐图迭代编辑更快更好。
- **创新点**: ① 多视角一致编辑（一次编辑所有图而非迭代单图）；② 深度条件编辑借一致深度图强制几何一致；③ 注意力潜在码对齐（自/跨视角注意力）统一外观。
- **核心方法**: 渲染图集 + ControlNet 文本编辑 + 深度条件几何一致 + 注意力潜在对齐外观一致；可微优化 3DGS。
- **实验设计与分析**: 编辑更快、视觉更优（具体指标待补）；强调多视角一致性。
- **写作可嫁接点**: 文本驱动 3DGS 编辑代表；与 ProEdit、Gaussian Grouping 编辑、StylizedGS 对比。
- **核查**: arxiv 标题=GaussCtrl: Multi-View Consistent Text-Driven 3D Gaussian Splatting Editing（一致）。

### Gaussian Grouping (`2312.00732`, ECCV 2024)
- **摘要**: 扩展 3DGS 联合重建并分割开放世界 3D 场景，每个高斯带紧凑 Identity Encoding。
- **创新点**: ① 给高斯加 Identity Encoding 按实例/ stuff 分组；② 用 SAM 的 2D 掩码 + 3D 空间一致正则监督，无需昂贵 3D 标签；③ 局部高斯编辑（移除/修复/着色/风格/重组）。
- **核心方法**: Identity Encoding 增广 + SAM 2D 掩码监督 + 3D 空间一致正则；局部高斯编辑方案。
- **实验设计与分析**: 高视觉质量、细粒度、高效率的重建/分割/编辑（具体指标待补）。
- **写作可嫁接点**: 3DGS 场景理解/分割/编辑的基石方法；被广泛引用为分割+编辑 baseline。
- **核查**: arxiv 标题=Gaussian Grouping: Segment and Edit Anything in 3D Scenes（一致）。

### GaussianCube (`2403.19655`, NeurIPS 2024)
- **摘要**: 结构化且显式的辐射表示，固定数量自由高斯 + Optimal Transport 重排到体素网格，利于 3D 扩散。
- **创新点**: ① densification-constrained 高斯拟合算法用固定数自由高斯高精拟合；② Optimal Transport 重排到预定义体素网格成结构化；③ 标准 3D U-Net 作扩散主干，参数少 1~2 数量级。
- **核心方法**: 约束 densification 拟合 + Optimal Transport 网格重排；3D U-Net 扩散建模。
- **实验设计与分析**: 无条件/类条件/数字化身/文本到 3D 均 SOTA；参数比先前结构化表示少 1~2 数量级（摘要数字）。
- **写作可嫁接点**: 结构化高斯生成代表；与 DiffGS、GSGAN 对比生成建模。
- **核查**: arxiv 标题=GaussianCube: A Structured and Explicit Radiance Representation for 3D Generative Modeling（一致）。

### GaussianCut (`2411.07555`, NeurIPS 2024)
- **摘要**: 图割交互式多视角 3DGS 分割，单视角点/涂鸦/文本输入，无需分割感知训练。
- **创新点**: ① 将场景建为图 + 图割最小化能量分割前景/背景；② 分割对齐能量函数结合用户输入与场景属性；③ 2D 分割模型做粗分割 + 图构造精修。
- **核心方法**: 高斯建图 + 分割对齐能量函数的图割；2D 模型粗分割初始化 + 图精修。
- **实验设计与分析**: 多场景具适应性，与 SOTA 3D 分割竞争（具体指标待补）；无需额外训练。
- **写作可嫁接点**: 交互式 3DGS 分割代表；与 FlashSplat、Gaussian Grouping 对比。
- **核查**: arxiv 标题=GaussianCut: Interactive segmentation via graph cut for 3D Gaussian Splatting（一致）。

### GaussianDreamer (`2310.08529`, CVPR 2024)
- **摘要**: 桥接 2D 与 3D 扩散的文本到 3D 高斯生成，单 GPU 约 15 分钟出高质量实例/化身。
- **创新点**: ① 3D 扩散模型提供初始化先验、2D 扩散丰富几何与外观；② noisy point growing + color perturbation 增强初始化高斯；③ 显式高效高斯表示桥接两类先验。
- **核心方法**: 3D 扩散初始化 + 2D 扩散细化；点生长与颜色扰动增强；可实时渲染生成。
- **实验设计与分析**: 单 GPU 约 15 分钟生成高质量 3D 实例/化身，远快于先前（摘要数字，支撑效率 claim）。
- **写作可嫁接点**: 文本到 3D 生成代表；与 DreamGaussian、Director3D 对比。
- **核查**: arxiv 标题=GaussianDreamer: Fast Generation from Text to 3D Gaussians by Bridging 2D and 3D Diffusion Models（一致）。

### HeadGaS (`2312.02902`, ECCV 2024)
- **摘要**: 混合 3DGS + 可学习潜特征基底的实时可动画头部化身，实时帧率、超基线最高 2dB、渲染快 10×+。
- **创新点**: ① 显式 3DGS + 可学习潜特征基底；② 潜特征与参数头模低维参数线性混合得表情相关颜色/不透明度；③ 实时推理。
- **核心方法**: learnable latent features 基底 + 参数头模低维参数线性混合驱动表情相关属性。
- **实验设计与分析**: 实时 SOTA，超基线最高 2dB、渲染加速 >10×（摘要数字，支撑实时/质量 claim）。
- **写作可嫁接点**: 实时头部化身代表；与 GAGAvatar、SplatFace、GaussianTalker 对比。
- **核查**: arxiv 标题=HeadGaS: Real-Time Animatable Head Avatars via 3D Gaussian Splatting（一致）。

### Human3Diffusion (`2406.08475`, NeurIPS 2024)
- **摘要**: Human 3Diffusion：单 RGB 图创建真实化身，耦合多视角 2D 扩散与显式 3D 重建。
- **创新点**: ① 图像条件生成式 3D 高斯重建模型借 2D 多视角扩散先验；② 显式 3D 表示反过来引导 2D 反采样提升 3D 一致；③ 双向紧耦合互相利用。
- **核心方法**: 2D 多视角扩散 + 图像条件 3D 高斯重建模型紧耦合；显式 3D 表示修正采样轨迹一致性。
- **实验设计与分析**: 单图创建真实化身几何/外观均超 SOTA（具体指标待补）。
- **写作可嫁接点**: 单图人体化身生成代表；与 HumanSplat、GAGAvatar 对比。
- **核查**: arxiv 标题=Human-3Diffusion: Realistic Avatar Creation via Explicit 3D Consistent Diffusion Models（一致）。

### HumanSplat-NIPS (`2406.12459`, NeurIPS 2024)
- **摘要**: HumanSplat：可泛化单图人体高斯泼溅，2D 多视角扩散 + 带人体结构先验的隐重建 Transformer。
- **创新点**: ① 可泛化单图预测任意人体 3DGS 属性；② 多视角扩散 + 人体结构先验潜重建 Transformer 统一几何/语义；③ 层级损失（含人体语义）约束多视角。
- **核心方法**: 2D 多视角扩散 + 结构先验隐重建 Transformer + 含人体语义的层级损失。
- **实验设计与分析**: 标准基准 + in-the-wild 上照片级新视角合成超 SOTA（具体指标待补）。
- **写作可嫁接点**: 泛化式单图人体重建代表；与 Human3Diffusion、GauHuman 对比。
- **核查**: arxiv 标题=HumanSplat: Generalizable Single-Image Human Gaussian Splatting with Structure Priors（一致）。

### InFusion (`2404.11613`, CVPR 2024)
- **摘要**: 用扩散先验学深度补全来修复（inpainting）不完整的 3D 高斯集，点初始化由深度补全引导。
- **创新点**: ① 图像条件深度补全模型引导新点初始化；② 恢复与原深度对齐尺度的深度值；③ 借助大规模扩散先验强泛化。
- **核心方法**: 深度补全模型（扩散先验）为新增高斯定初始 3D 位置；可和谐渲染修复。
- **实验设计与分析**: 多复杂场景保真度/效率优于替代方法（具体指标待补）；支持用户纹理/新物体插入。
- **写作可嫁接点**: 3DGS inpainting/修复代表；与 GScream、GaussianCut、Gaussian Grouping 对比。
- **核查**: arxiv 标题=InFusion: Inpainting 3D Gaussians via Learning Depth Completion from Diffusion Prior（一致）。

### MVGamba (`2406.06367`, NeurIPS 2024)
- **摘要**: 基于 RNN 式状态空间模型(SSM)的多视角高斯重建模型，统一单图/稀疏图/文本到 3D 生成，模型仅约 0.1×。
- **创新点**: ① 用 SSM 替代重的 Transformer，线性复杂度传播多视角因果上下文做跨视角自细化；② 长序列高斯细细节建模；③ 轻量（约 0.1× 模型大小）统一多任务。
- **核心方法**: 多视角高斯重建器基于 State Space Model；因果上下文跨视角自细化 + 长序列生成。
- **实验设计与分析**: 三类 3D 生成场景均超 SOTA，模型大小约 0.1×（摘要数字，支撑轻量 claim）。
- **写作可嫁接点**: 高效 3D 高斯重建/生成代表；与 GaussianCube、LRM 类对比。
- **核查**: arxiv 标题=MVGamba: Unify 3D Content Generation as State Space Sequence Modeling（一致）。

### ProEdit (`2411.05006`, NeurIPS 2024)
- **摘要**: ProEdit：扩散蒸馏引导的渐进式高质量 3D 场景编辑，无需蒸馏损失等复杂组件。
- **创新点**: ① 洞察多视角不一致源于扩散大可行输出空间(FOS)，分解子任务渐进控制 FOS；② 难度感知子任务分解调度器；③ 自适应 3DGS 训练策略；可预览/选择编辑「激进度」。
- **核心方法**: 渐进式分解编辑为子任务 + 难度感知调度 + 自适应 3DGS 训练。
- **实验设计与分析**: 多场景/挑战编辑 SOTA，简单框架无昂贵附加（具体指标待补）。
- **写作可嫁接点**: 文本/渐进式 3DGS 编辑代表；与 GaussCtrl、Gaussian Grouping 编辑对比。
- **核查**: arxiv 标题=ProEdit: Simple Progression is All You Need for High-Quality 3D Scene Editing（一致）。

### SplatArmor (`2311.10812`, CVPR 2024)
- **摘要**: SplatArmor：用 3D 高斯「装甲」参数化身体模型，从单目 RGB 视频恢复可动人类。
- **创新点**: ① 规范空间一组高斯 + SMPL 蒙皮扩展到任意位置；② SE(3) 场捕捉位置与 anisotropy 的姿势相关效应；③ 神经颜色场提供颜色正则与 3D 监督，前向蒙皮无逆蒙皮歧义。
- **核心方法**: 规范空间高斯 + SMPL 扩展蒙皮 + SE(3) 场 + 神经颜色场。
- **实验设计与分析**: ZJU MoCap、People Snapshot 上可控人体合成效果好（具体指标待补）。
- **写作可嫁接点**: 早期人类化身代表；与 GauHuman、3DGS-Avatar、ExpressiveGaussianHuman 对比。
- **核查**: arxiv 标题=SplatArmor: Articulated Gaussian splatting for animatable humans from monocular RGB videos（一致）。

### StylizedGS (`2404.05220`, NeurIPS 2024)
- **摘要**: StylizedGS：基于 3DGS 的可控神经风格迁移，单参考风格图做一致艺术化并可控制颜色/尺度/区域。
- **创新点**: ① 基于滤波的精修消除影响风格的 floaters；② 最近邻风格损失微调几何+颜色；③ 深度保持损失 + 正则防几何篡改；可控颜色/风格尺度/区域。
- **核心方法**: 滤波精修去 floaters + 最近邻风格损失 + 深度保持损失；特别损失实现可控风格化。
- **实验设计与分析**: 多场景/风格高质量风格化 + 推理快（具体指标待补）。
- **写作可嫁接点**: 3DGS 风格化代表；Editing 簇中与 GaussCtrl、Gaussian Grouping 对比。
- **核查**: arxiv 标题=StylizedGS: Controllable Stylization for 3D Gaussian Splatting（一致；note: 最终发表 TPAMI 2025）。

### Tetrahedron Splatting (`2406.01579`, NeurIPS 2024)
- **摘要**: TeT-Splatting：在结构化四面体网格上做面基体渲染，兼顾易收敛、精确网格抽取与实时渲染。
- **创新点**: ① 四面体网格上面基体渲染保留精确网格抽取；② tile-based 可微四面体光栅器；③ eikonal + 法线一致正则提升质量稳定；无需网格抽取即可训练。
- **核心方法**: 结构化四面体网格 + 面基体渲染 + 可微四面体光栅 + SDF 正则。
- **实验设计与分析**: 收敛速度/渲染效率/网格质量优于替代（具体指标待补）；易集成到现有生成管线。
- **写作可嫁接点**: 结构化网格高斯表示代表；与 GaussianCube、DMTet 对比生成建模。
- **核查**: arxiv 标题=Tetrahedron Splatting for 3D Generation（一致）。

### VR-GS (`2401.16663`, ECCV 2024)
- **摘要**: VR-GS：物理动力学感知的 VR 交互式高斯泼溅系统，实时真实动态响应。
- **创新点**: ① 物理动力学感知的交互式 3DGS；② 两级嵌入策略 + 可变形体仿真；③ 实时形变嵌入 + 动态阴影；含场景重建/分割/多视角修复/物理编辑。
- **核心方法**: 场景重建 + 物体分割 + 多视角 inpainting + 交互式物理编辑；两级嵌入 + 可变形体仿真。
- **实验设计与分析**: 实时执行 + 高真实动态响应（具体指标待补）；面向 VR/MR 内容交互。
- **写作可嫁接点**: 交互/物理编辑系统代表；Editing 簇中对比 GSDeformer、VR 应用。
- **核查**: arxiv 标题=VR-GS: A Physical Dynamics-Aware Interactive Gaussian Splatting System in Virtual Reality（一致）。

---

## 二、2025 已确立（简表，8 篇）

| 方法名 | ID | Venue | Year | 一句话贡献 |
|---|---|---|---|---|
| GaussianBody | `2401.09720` | CVPR 2025 | 2025 | 姿态引导形变+物理先验+pose 精修的着装人体 3DGS 重建 |
| GaussianTalker | `2404.16012` | CVPR 2025 | 2025 | 音频驱动规范 3DGS 头部形变，最高 120 FPS 说话头 |
| HoGS | `2503.19232` | CVPR 2025 | 2025 | 齐次坐标统一近远物体，改善室外无界场景远物渲染 |
| SceneGenAgent | `2410.21909` | ACL 2025 | 2025 | 用 C# 编码智能体精确生成工业场景，成功率 81% |
| SplatFace | `2403.18784` | CVPR 2025 | 2025 | 3DMM 可优化表面联合优化高斯的人脸重建与网格 |
| SplatPose | `2503.05174` | CVPR 2025 | 2025 | DARS-Net 单 RGB 图几何感知 6-DoF 位姿估计 |
| SplatTalk | `2503.06271` | ICCV 2025 | 2025 | 通用 3DGS 产生 3D token 直入 LLM 做零样本 3D VQA（注：簇列 CVPR 2025，arxiv 实际为 ICCV 2025） |
| VEGS | `2407.02945` | CVPR 2025 | 2025 | LiDAR+扩散先验做城市场景视角外推(EVS)新视角合成 |

---

## 三、近期焦点（2026，详写满五要素，2 篇）

### MaRO-GS (`2610.06472`, ACCV 2026)
- **摘要**: 从多视角掩码做以目标为中心的 3DGS 重建，直接优化目标物体高斯，并对跨视角不一致的 2D 分割掩码保持鲁棒。
- **创新点**: ① 直接优化目标物体高斯而非重建整场景，省去大量无关计算；② mask-reliability 视图过滤剔除不可靠监督视图；③ object-supported 高斯密度控制抑制与目标无关的高斯、阻止背景 densification；④ Silhouette-aligned Object Loss 维持物体聚焦优化。
- **核心方法**: 输入 object-masked 多视角图像；先用视图可靠性过滤排除不一致掩码视图，再以物体支撑的密度控制约束高斯增长，配合轮廓对齐物体损失做物体聚焦的可微渲染优化。
- **实验设计与分析**: 多数据集验证 PSNR、分割精度与计算效率提升；在 LERF-Mask 小物体上取得最大 +2.05 dB PSNR 增益（摘要数字，支撑「鲁棒于不一致掩码且更高效」claim）。对比整场景 3DGS 方法。
- **写作可嫁接点**: Editing/Human 簇中作为「鲁棒物体级分割重建」的强 baseline；与 Gaussian Grouping、FlashSplat、GaussianCut 在掩码噪声鲁棒性上做直接对比，可引用其 mask-reliability 过滤思路处理多视角不一致标注。
- **核查**: arxiv 标题=MaRO-GS: Mask-Robust Object-Centric Gaussian Splatting from Inconsistent Multi-view Masks（一致，ACCV 2026）。

### GS-Pool (`2610.06688`, 2026)
- **摘要**: 对两次独立重建的同一空间高斯场做物体级变化检测，返回变化的物体及其掩码；克服两次重建随机性不重合与二次扫描图更少的难题。
- **创新点**: ① 将每访问的 SAM2 掩码提升并合并为「物体池」，每个决策在 3D 中每物体只做一次；② 提出 photographic carrier——用一重建在另一访问照片上的 3DGS 训练损失反传到渲染该像素的高斯；③ 融合 GS-Diff 的几何/颜色项与本工作蒸馏的 DINOv3 特征，按两访问共有物体设每场景变化阈值。
- **核心方法**: 两独立高斯场 → SAM2 掩码提升为物体池；photographic carrier（交叉 3DGS 训练损失）反传 + GS-Diff 几何颜色项 + DINOv3 特征融合比较；以共有物体证据设阈值判定变化。
- **实验设计与分析**: PASLCD 上 mIoU/F1 = 0.751/0.846，对比最强先验 GS-Diff 的 0.644/0.758（+17%/+12%）；相对 O-SCD、PlenoCI、MV-3DCD 的 mIoU 高 36%/40%/57%；CL-Splats 达 0.855 mIoU（+33% vs MV-3DCD）。每个变化物体返回带证据的高斯集供 3D 审查（摘要数字，支撑「物体级变化检测 SOTA」claim）。
- **写作可嫁接点**: Editing 簇中「场景级变化检测/对比编辑」的代表方法；与 GS-Diff、O-SCD、PlenoCI、MV-3DCD 直接对比；其物体池 + photographic carrier 思路可迁移到 3DGS 场景差异编辑与增量更新任务。
- **核查**: arxiv 标题=GS-Pool: Object-Level Change Detection in 3D Gaussian Splatting（一致，2026 arXiv；无正式 venue 标注）。

---

## 四、覆盖统计

- 经典(2023-2024)：29 篇（深度全覆盖）
- 2025 已确立：8 篇（简表）
- 2026 焦点：2 篇（详写满五要素）
- 合计：**39 篇**，全部经 WebFetch 核验 arxiv ID 可达并抓取标题/摘要。


---

## 簇八 · 语义 / 跨域 / HDR 重光照 <a id="H_Semantic_Cross_HDR"></a>

# 研读笔记 · 簇 H_Semantic_Cross_HDR（Language & Semantic / Cross-Domain / HDR & Relighting）

> 说明：本文件按 `_cluster_H_Semantic_Cross_HDR.md` 指派撰写。所有论文均经 `https://arxiv.org/abs/<id>` 核验，标题与摘要取自 arxiv 页面。数字仅来自摘要/确知内容，未编造指标；未知项标注「待补」。

---

## 一、经典论文（2023-2024，深度全覆盖，共 10 篇）

### GaussianShader (`2311.17977`, arXiv 2023)
- **摘要**: 3DGS 在反射表面因离散显式表示难以建模镜面反射；本工作在每个 3D Gaussian 上施加简化着色函数（shading function）增强反射场景渲染，同时保持训练/渲染效率。
- **创新点**: （1）首次在 3DGS 上引入着色函数建模反射；（2）提出基于 Gaussian 最短轴方向的法线估计框架，克服了离散基元上法线估计不准的难题；（3）设计专门损失使法线与 Gaussian 球体几何一致。
- **核心方法**: 表示=带法线/着色属性的 3D Gaussian；优化=轴方向法线估计 + 法线-几何一致性损失；渲染=标准 3DGS 光栅化叠加着色项。
- **实验设计与分析**: 在 specular object 数据集上比原始 Gaussian Splatting 的 PSNR 高 1.57dB；相比 Ref-NeRF 优化时间从 23h 降至 0.58h。支撑 claim：效率与质量平衡。
- **写作可嫁接点**: 反射/镜面表面重建的 related-work 基线（对比 Ref-NeRF、原始 3DGS）；法线估计模块可引用。
- **核查**: arxiv 标题=GaussianShader: 3D Gaussian Splatting with Shading Functions for Reflective Surfaces（一致）。

### DDGS-CT (`2406.02518`, NeurIPS 2024)
- **摘要**: 数字重建放射影像（DRR）从 CT 体积生成 2D X 光，但物理蒙特卡洛法太慢、解析法忽略各向异性散射；本工作用方向解耦 3DGS 兼顾真实物理与高效可微 DRR 生成。
- **创新点**: （1）将辐射贡献解耦为各向同性与方向相关分量，逼近各向异性 X 光交互而无需运行时仿真；（2）针对断层数据特性调整 3DGS 初始化；（3）首次将 3DGS 用于真实体积 DRR 渲染与位姿配准逆问题。
- **核心方法**: 表示=方向解耦 3DGS（DDGS）；渲染=分离各向同性/方向依赖辐射的 X 光光栅化；优化=适配 CT 体数据的初始化。
- **实验设计与分析**: 在图像精度上超过 SOTA；在术中位姿配准逆问题上相比解析 DRR 法取得更优配准精度与运行性能（具体数字「待补」）。支撑 claim：真实感+效率。
- **写作可嫁接点**: Cross-Domain（医学/X 光）重建基线；体积/断层场景的 3DGS 引用。
- **核查**: arxiv 标题=DDGS-CT: Direction-Disentangled Gaussian Splatting for Realistic Volume Rendering（一致，NeurIPS2024）。

### Feature 3DGS (`2312.03203`, CVPR 2024)
- **摘要**: 现有 NeRF 特征场蒸馏受限于渲染速度与隐式表示的连续性伪影；本工作将 3DGS 扩展到任意维度语义特征，通过 2D 基础模型蒸馏实现特征场。
- **创新点**: （1）首次在 3DGS 框架内做任意维度特征蒸馏（而非仅辐射）；（2）针对 RGB 与特征图空间分辨率/通道不一致提出架构与训练改动；（3）首个利用 SAM 实现点/框提示驱动辐射场编辑的方法。
- **核心方法**: 表示=带特征属性的 3D Gaussian；渲染=特征通道光栅化；优化=从 SAM、CLIP-LSeg 等 2D 基础模型蒸馏特征场；解决分辨率/通道对齐。
- **实验设计与分析**: 在新视角语义分割、语言引导编辑、Segment Anything 任务上取得可比或更优结果，且训练与渲染显著更快（具体加速比「待补」）。支撑 claim：速度+质量。
- **写作可嫁接点**: 语义/特征场 3DGS 的奠基性基线（对比 LangSplat、OpenGaussian）；编辑类工作必引。
- **核查**: arxiv 标题=Feature 3DGS: Supercharging 3D Gaussian Splatting to Enable Distilled Feature Fields（一致，CVPR2024）。

### GStex (`2409.12954`, ECCV 2024 / WACV 2025)
- **摘要**: 2D/3D Gaussian 基元同时编码外观与几何，二者强耦合导致简单几何也需海量基元；本工作对每个 2D Gaussian 进行逐基元纹理化，使单个基元也能表达外观细节。
- **创新点**: （1）提出 per-primitive texturing，外观表示与场景拓扑/几何复杂度解耦；（2）单个 Gaussian 即可捕捉纹理平面细节；（3）解耦后支持外观编辑与重纹理（re-texturing）。
- **核心方法**: 表示=带纹理的 2D Gaussian 基元；优化=解耦外观/几何的训练；应用=场景重纹理与外观编辑。
- **实验设计与分析**: 在纹理化 Gaussian splat 上视觉质量优于前作；减少基元数量时 NVS 性能优于 2DGS（具体数字「待补」）。支撑 claim：解耦带来高效率与编辑性。
- **写作可嫁接点**: 外观-几何解耦方向的对比基线；纹理化表示可引用。
- **核查**: arxiv 标题=GStex: Per-Primitive Texturing of 2D Gaussian Splatting for Decoupled Appearance and Geometry Modeling（一致；arxiv 标注 WACV 2025 camera-ready，簇列 ECCV 2024，以 arxiv 为准）。

### HumanGaussian (`2311.17061`, CVPR 2024)
- **摘要**: 文本驱动 3D 人体生成中 SDS 存在细节不足或训练过慢；本工作用 3DGS 高效渲染并周期性收缩/生长 Gaussian，以人体结构引导自适应密度控制。
- **创新点**: （1）Structure-Aware SDS：联合 RGB 与深度多模态分数优化人体外观与几何，指导 Gaussian 增密/剪枝；（2）Annealed Negative Prompt Guidance 分解 SDS 为生成分数+分类分数，缓解过饱和；（3）基于 Gaussian 尺寸的 prune-only 阶段消除漂浮伪影。
- **核心方法**: 表示=文本驱动 3DGS；优化=多模态 SDS + 退火负提示 + 结构感知密度控制；渲染=标准 3DGS。
- **实验设计与分析**: 多场景生动 3D 人体生成，效率与质量具竞争力（具体指标「待补」）。支撑 claim：细粒度几何+真实外观+高效率。
- **写作可嫁接点**: 文本生成 3D 人体/物体的 3DGS 基线；SDS 改进方法可引用。
- **核查**: arxiv 标题=HumanGaussian: Text-Driven 3D Human Generation with Gaussian Splatting（一致，CVPR2024）。

### LangSplat (`2312.16084`, CVPR 2024)
- **摘要**: 现有 3D 语言场以 NeRF 承载 CLIP 嵌入，渲染慢且边界模糊；本工作用一组编码 CLIP 语言特征的 3D Gaussian 构建语言场，支持精确高效开放词汇查询。
- **创新点**: （1）用 tile-based 光栅化渲染语言特征，绕开 NeRF 昂贵渲染；（2）先训场景级语言自编码器再在场景潜空间学特征，缓解显式建模显存压力；（3）用 SAM 学层次化语义，消除跨尺度查询与 DINO 正则需求。
- **核心方法**: 表示=每 Gaussian 编码 CLIP 语言特征；渲染=tile-based 语言特征光栅化；优化=场景自编码器+层次语义（SAM 引导）。
- **实验设计与分析**: 大幅超越 LERF SOTA；在 1440×1080 分辨率下比 LERF 快 199×。支撑 claim：精确+高效开放词汇 3D 查询。
- **写作可嫁接点**: 3D 语言/开放词汇理解的标杆基线（对比 Feature 3DGS、LERF、OpenGaussian）。
- **核查**: arxiv 标题=LangSplat: 3D Language Gaussian Splatting（一致，CVPR2024）。

### NeuMA (`2410.08257`, NeurIPS 2024)
- **摘要**: 视觉动力学校准要么纯黑箱神经网络违背物理、要么白箱物理模拟难捕捉真实动态；本工作提出 Neural Material Adaptor，将物理定律与学习修正结合。
- **创新点**: （1）NeuMA 融合已有物理规律与学习修正，兼顾可泛化性与可解释性；（2）提出 Particle-GS：粒子驱动的 3DGS 变体，桥接仿真与观测图像，可反向传播图像梯度优化模拟器；（3）统一 grounded particle 精度、动态渲染与泛化评测。
- **核心方法**: 表示=Particle-GS（粒子+3D Gaussian）；优化=图像梯度反向优化物理模拟器；建模=物理先验+神经修正。
- **实验设计与分析**: 多种内在动态在 grounded particle 精度、动态渲染质量、泛化能力上验证 NeuMA 能准确捕捉动态（具体数字「待补」）。支撑 claim：物理一致+可泛化。
- **写作可嫁接点**: 动力学/物理仿真与 3DGS 结合的 Cross-Domain 基线；可微仿真引用。
- **核查**: arxiv 标题=Neural Material Adaptor for Visual Grounding of Intrinsic Dynamics（一致，NeurIPS2024；簇列名 NeuMA）。

### OpenGaussian (`2406.02058`, NeurIPS 2024)
- **摘要**: 现有 3DGS 开放词汇方法偏 2D 像素级解析，3D 点级任务因特征表达弱、2D-3D 关联不准而受限；本工作实现 3D 点级开放词汇理解。
- **创新点**: （1）用无跨帧关联的 SAM mask 训练具 3D 一致性的实例特征（类内一致、类间可分）；（2）两阶段 codebook 由粗到细离散化特征（粗级位置聚类、细级精炼）；（3）实例级 3D-2D 特征关联将 3D 点连到 2D mask 再连 CLIP 特征。
- **核心方法**: 表示=带实例/语义特征的 3D Gaussian；优化=SAM 实例特征 + 两阶段 codebook；关联=实例级 3D→2D mask→CLIP。
- **实验设计与分析**: 开放词汇 3D 物体选择、点云理解、点击选择等任务验证有效性（具体指标「待补」）。支撑 claim：点级开放词汇理解。
- **写作可嫁接点**: 点级开放词汇 3DGS 基线（对比 LangSplat、Feature 3DGS）；实例分割引用。
- **核查**: arxiv 标题=OpenGaussian: Towards Point-Level 3D Gaussian-based Open Vocabulary Understanding（一致，NeurIPS2024）。

### R2-Gaussian (`2405.20693`, NeurIPS 2024)
- **摘要**: 3DGS 在体重建（如 X 光 CT）潜力未充分挖掘；本工作提出首个基于 3DGS 的稀疏视角断层重建框架，并发现标准 3DGS 中此前未知的积分偏置。
- **创新点**: （1）推导 X 光光栅化函数，发现标准 3DGS 的积分偏置；（2）重构 3D→2D Gaussian 投影的校正技术消除偏置；（3）三项关键创新：定制 Gaussian 核、扩展到 X 光成像、CUDA 可微体素化器。
- **核心方法**: 表示=定制 X 光 Gaussian 核；渲染=校正后的 X 光光栅化；优化=CUDA 可微体素化。
- **实验设计与分析**: 合成与真实数据集上精度与效率超过 SOTA；4 分钟出高质量结果，比 NeRF 法快 12×，与传统算法相当。支撑 claim：稀疏视角 CT 重建的高效高精度。
- **写作可嫁接点**: 稀疏视角/断层重建 Cross-Domain 基线（对比 DDGS-CT）；积分偏置发现可引用。
- **核查**: arxiv 标题=R2-Gaussian: Rectifying Radiative Gaussian Splatting for Tomographic Reconstruction（一致，NeurIPS2024）。

### Spec-Gaussian (`2402.15870`, NeurIPS 2024)
- **摘要**: 3D-GS 用球谐（SH）表示视角相关外观，难以建模高频频谱的镜面/各向异性分量；本工作以各向异性球面高斯（ASG）外观场替代 SH。
- **创新点**: （1）用 ASG 外观场建模每个 3D Gaussian 视角相关外观，突破 SH 高频瓶颈；（2）提出 coarse-to-fine 训练策略提升学习效率并消除真实场景过拟合漂浮物；（3）在不增加 Gaussian 数量前提下显著提升镜面/各向异性建模能力。
- **核心方法**: 表示=ASG 外观场（替代 SH）；优化=粗到细训练 + 防漂浮正则；渲染=标准 3DGS 叠加 ASG 着色。
- **实验设计与分析**: 渲染质量超过现有方法，且不增 Gaussian 数量即提升镜面/各向异性场景表现（具体指标「待补」）。支撑 claim：高频视角相关外观建模。
- **写作可嫁接点**: 视角相关/各向异性外观的对比基线（对比 GaussianShader、Relightable 系列）；ASG 表示引用。
- **核查**: arxiv 标题=Spec-Gaussian: Anisotropic View-Dependent Appearance for 3D Gaussian Splatting（一致，NeurIPS2024）。

---

## 二、2025 已确立论文（简表，共 6 篇，每篇≤40 字）

| 方法名 | arxiv ID | venue | year | 一句话贡献 |
|---|---|---|---|---|
| EndoGS | `2401.11535` | MICCAI EARTH 2024* | 2025 | 形变场+深度引导重建可形变内窥镜组织（簇列 CVPR2025，arxiv 注 MICCAI EARTH2024） |
| GS-LLM (LIVE-GS) | `2412.09176` | arXiv 2025* | 2025 | LLM 驱动 10 秒推断物理参数，建物理感知 Gaussian VR 资产（arxiv 标题 LIVE-GS） |
| GaussianGraph | `2503.04034` | arXiv | 2025 | 3DGS+场景图，Control-Follow 聚类提升开放世界理解 |
| Large Material Gaussian Model | `2509.22112` | arXiv | 2025 | 生成带 PBR 材质（反照/粗糙/金属）的可重光照 3DGS |
| RDSplat | `2512.06774` | arXiv | 2025 | 抗 2D/3D 扩散编辑的 100-bit 3DGS 水印 |
| SurfFill | `2512.03010` | arXiv | 2025 | Gaussian surfel 补全 LiDAR 点云缺失结构 |

> *注：簇文件将 EndoGS 列 CVPR 2025、GS-LLM 列 CVPR 2025，但 arxiv 页面显示 EndoGS 录用于 MICCAI EARTH 2024、GS-LLM(实为 LIVE-GS) 为 cs.HC 且 v2 于 2026-04 修订；此处以 arxiv 核验结果标注，供后续核对。

---

## 三、近期焦点（2026，详写满五要素，共 3 篇）

### Post-Training Semantic Lifting (`2610.08756`, 2026)
- **摘要**: 同一 3DGS 的 Gaussian 在多视角下类别判定常不一致（遮挡、检测器置信不同）。本工作提出训练后语义提升方法，逐目标类聚合所有视角证据，分离检测器、提升、表示三类误差。
- **创新点**: （1）逐类处理并以各 Gaussian 在每视角的可见性加权，同时累积目标/非目标证据；（2）双阈值过滤：主阈值 β 选高置信种子，低阈值 γβ 补连通分量；（3）将标签从 Gaussian 传到可见且已标注的 mesh 顶点，首次分离 detector/lifting/representation 三类误差来源。
- **核心方法**: 表示=后训练 3DGS（标注来自 mesh）；流程=逐类跨视角证据累积（可见性加权）→双阈值 β/γβ 过滤→Gaussian→mesh 顶点标签迁移；超参（阈值、迁移算子）在 7 个 Replica 验证集选定，10 个 ScanNet++ 测试集沿用。
- **实验设计与分析**: 验证集 mIoU 用数据集标注 mask 为 0.93、YOLO mask 为 0.65；ScanNet++ 测试集分别为 0.80 与 0.54；相比逐视角阈值法测试 mIoU 提升 0.24，且可用单一阈值跨所有类与场景。误差分析显示剩余误差主要源于检测器。支撑 claim：跨视角一致性提升 + 误差可分解。
- **写作可嫁接点**: 语义 3DGS/lifting 误差分析的最新基线；可见性加权证据聚合、detector-vs-lifting 误差分离可引用。
- **核查**: arxiv 标题=Post-Training Semantic Lifting for 3D Gaussian Splatting: Separating Detector, Lifting and Representation Error（一致，2026-10-06 提交）。

### SURGE (`2610.07472`, 2026)
- **摘要**: 水下 ROV 缺乏外部定位，需靠机载感知同时做定位与度量重建；视觉有尺度模糊与漂移、2D 成像声呐有度量距离但 3D 不完整。本工作用相机-声呐融合因子图联合估计轨迹与目标位置，再以度量位姿做声呐 Gaussian splatting。
- **创新点**: （1）在因子图内融合视觉与声学观测，联合估计 ROV 轨迹与目标位置（而非分别处理）；（2）用恢复出的度量位姿驱动 sonar Gaussian splatting，得到原生度量重建；（3）相较 RGB GS 基线产出更紧凑、原生度量的重建，且定位一致性显著优于纯视觉位姿估计。
- **核心方法**: 表示=相机+2D 成像声呐多模态；优化=视觉/声学观测融合的因子图（factor graph）联合定位；渲染=声呐 Gaussian splatting（基于度量位姿）。
- **实验设计与分析**: 在真实水下 RGB-声呐观测上，相比传统视觉位姿估计显著提升定位一致性，并比 RGB Gaussian splatting 基线得到更紧凑、原生度量的重建（具体指标「待补」）。支撑 claim：定位-重建联合 + 度量一致性。
- **写作可嫁接点**: Cross-Domain（水下/声学-视觉）3DGS 基准；多模态因子图融合、声呐 splatting 可引用。
- **核查**: arxiv 标题=SURGE: Sonar-fUsed Reconstruction and localization via image-gated Graph Estimation（一致，2026-10-05 提交）。

### Casual Flash Lighting (`2610.06035`, 2026)
- **摘要**: 仅静态光照下从照片恢复几何/材质/光照高度歧义；主动光照需暗室或专用硬件。本工作协同利用室内随意拍摄的静态光与闪光（开/关、独立视角），以 2DGS 做逆渲染恢复可重光照材质。
- **创新点**: （1）闪光残差约束反照率与 BRDF，静态光捕捉闪光遗漏的掠射高光，二者互补降歧义；（2）提出 GS-anchored diffuse field：在光栅化 2DGS 深度处查询 hash 编码 MLP，仅依赖世界坐标故 3D 视角一致，使闪光残差驱动材质分解而不被跨视角 alpha 混合漂移吸收；（3）静态光用延迟着色（deferred shading）渲染以监督材质分解。
- **核心方法**: 表示=2D Gaussian Splatting；优化=闪光残差 + 静态光延迟着色联合监督的材质分解；关键模块=GS-anchored diffuse field（hash MLP @ rasterized depth）。
- **实验设计与分析**: 在 5 个合成 + 3 个真实室内场景上，反照率/粗糙度材质参数与重光照均超过 6 个近期基线，重光照 PSNR 比次优基线高 4.17 dB。支撑 claim：随意闪光+静态光协同实现高质量逆渲染与重光照。
- **写作可嫁接点**: HDR & Relighting / 逆渲染最新基线（对比 Spec-Gaussian、Relightable 3DGS 等）；闪光残差、GS-anchored diffuse field 可引用。
- **核查**: arxiv 标题=Casual Flash Lighting for Gaussian Splat Inverse Rendering（一致，2026-10-05 提交）。

---

## 四、覆盖子领域与关联
- **Language & Semantic**: LangSplat、Feature 3DGS、OpenGaussian、GaussianGraph、Post-Training Semantic Lifting。
- **Cross-Domain**: DDGS-CT、R2-Gaussian（医学/X 光）、NeuMA（物理仿真）、SURGE（水下声呐-视觉）、SurfFill（LiDAR）。
- **HDR & Relighting**: GaussianShader、Spec-Gaussian、HumanGaussian、Large Material Gaussian Model、Casual Flash Lighting、RDSplat（资产保护）。


---

## 簇九 · CAD / 大场景 / 仿真 / 安全 / 世界模型 <a id="I_CAD_Large_Sim_Sec_World"></a>

# 知识库 · 簇 I_CAD_Large_Sim_Sec_World

> 本簇覆盖子领域：CAD & Reverse Engineering、Large-Scale、Simulation、Security、World Models & Spatial Intelligence
> 说明：经典(2023-2024) 9 篇深度全覆盖；2025 已确立 0 篇（无简表）；2026 焦点 3 篇详写。所有指标仅来自 arxiv 摘要或确知内容，不确定处标「待补」。

---

## 经典论文（2023-2024，深度全覆盖）

### Scaffold-GS (`2312.00109`, ICCV 2023)
- **摘要**: 针对 3DGS 为拟合每个训练视角而产生大量冗余高斯、忽视底层几何、对大视角变化/无纹理/光照变化鲁棒性差的问题，提出以 anchor 点分布局部高斯、按视向与距离在视锥内实时预测属性，并配合 anchor 生长/剪枝策略提升场景覆盖。
- **创新点**: ① 用 anchor 点结构化组织高斯，告别逐点冗余；② 视自适应（view-adaptive）属性预测，按需生成局部高斯；③ 基于重要性的 anchor 生长/剪枝，天然支持多细节层次（LoD）与视相关观测。
- **核心方法**: anchor 点与局部神经高斯（neural Gaussians）分离；MLP 依据视向/距离输出高斯属性；anchor growing & pruning 控制规模；保留实时光栅化速度。
- **实验设计与分析**: 在含大视角变化、无纹理区域的场景上验证，相对 vanilla 3DGS 显著减少冗余高斯且质量不降；支持多 LoD 与视相关，渲染速度保持。具体 PSNR/SSIM 数字「待补」；支撑 claim：更少高斯+更高质量+视自适应。
- **写作可嫁接点**: 作为"结构化/anchor 驱动 3DGS"的代表基线，可在 related-work 对比大规模/动态场景或讨论冗余与 LoD 时引用；大规模（CityGS/DOGS）与动态（Street Gaussians）工作的前身参照。
- **核查**: arxiv 标题=Scaffold-GS: Structured 3D Gaussians for View-Adaptive Rendering（一致）

### 2DGS (`2403.17888`, SIGGRAPH 2024)
- **摘要**: 指出 3DGS 因 3D 高斯的多视角不一致性而难以准确表达表面，提出将 3D 体积坍缩为一组 2D 有向平面高斯盘，以视角一致的方式建模几何内在表面，实现几何精确的辐射场重建。
- **创新点**: ① 用 2D 有向平面高斯替代 3D 高斯，提供视角一致几何；② perspective-correct 2D splatting（ray-splat 相交+光栅化）稳定优化薄表面；③ 引入 depth distortion 与 normal consistency 损失提升重建质量。
- **核心方法**: 2D 高斯（平面 disk）表示；射线-面元求交的可微光栅化；深度失真项 + 法向一致性项约束几何；可微渲染器支持无噪、细节化几何重建。
- **实验设计与分析**: 在 MipNeRF-360、Tanks&Temples、DTU 等几何/外观基准上验证几何精度与外观质量兼具，训练快、实时渲染。具体几何误差/PSNR「待补」；支撑 claim：几何精确且外观有竞争力。
- **写作可嫁接点**: 作为"几何精确 3DGS"基线，凡涉及表面重建、法向/深度监督、CAD/反向工程几何质量对比时必引；是后续高斯几何化工作的基础。
- **核查**: arxiv 标题=2D Gaussian Splatting for Geometrically Accurate Radiance Fields（一致）

### CityGaussian (`2404.01133`, ECCV 2024)
- **摘要**: 面向大规模场景，3DGS 的训练效率与跨尺度实时渲染仍是挑战；提出 CityGaussian（CityGS），以分治训练 + 细节层次（LoD）策略实现高效大规模 3DGS 训练与实时渲染。
- **创新点**: ① 分治（divide-and-conquer）训练：全局场景先验 + 自适应训练数据选择实现高效训练与无缝融合；② 基于融合高斯生成不同细节层级（压缩）；③ block-wise 细节层级选择+聚合，实现跨尺度快速渲染。
- **核心方法**: 场景分块训练后融合为统一高斯；按压缩产生多 LoD；推理时按块选择/聚合 LoD；兼顾一致实时渲染与大规模覆盖。
- **实验设计与分析**: 在大规模城市场景上达到 SOTA 渲染质量，并能在差异极大的尺度间一致实时渲染。具体 FPS/PSNR「待补」；支撑 claim：大规模场景 SOTA 质量+跨尺度实时。
- **写作可嫁接点**: 大规模 3DGS 代表性工作，与 DOGS（分布式训练）、SCube（前馈大模型）、Street Gaussians（动态城市）并列引用；讨论训练效率/渲染扩展性时作基线。
- **核查**: arxiv 标题=CityGaussian: Real-time High-quality Large-Scale Scene Rendering with Gaussians（一致）

### DOGS (`2405.13943`, NeurIPS 2024)
- **摘要**: 关注大规模场景 3DGS 的训练效率短板，提出 DoGaussian（DOGS），将场景分解为 K 块并用 ADMM 把 3DGS 训练分布式化，在保持渲染质量的同时大幅加速训练。
- **创新点**: ① 将 ADMM（交替方向乘子法）引入 3DGS 训练，主控全局模型、从控 K 个局部模型；② 通过对共享高斯的 consensus 保证收敛与稳定；③ 训练后丢弃局部模型，仅查询全局模型，消息尺寸不随地图增长。
- **核心方法**: 场景分解 + 分布式 ADMM 优化；master 节点持全局 3DGS，slave 节点持局部 3DGS；consensus 约束共享高斯；推理只用全局模型。
- **实验设计与分析**: 在大规模场景上训练加速 6+ 倍，同时达到 SOTA 渲染质量（具体 PSNR/SSIM「待补」）。支撑 claim：分布式训练既快又稳且质量不降。
- **写作可嫁接点**: 大规模训练效率方向核心基线，与 CityGS 的"分治融合"路线对照（后者重 LoD 渲染、本工作重点重分布式优化）；讨论训练扩展性/多机训练时引用。
- **核查**: arxiv 标题=DOGS: Distributed-Oriented Gaussian Splatting for Large-Scale 3D Reconstruction Via Gaussian Consensus（一致）

### GS-Hider (`2405.15118`, NeurIPS 2024)
- **摘要**: 鉴于 3DGS 显式表示+实时渲染使其点云公开透明、每点物理意义明确，提出首个针对 3DGS 的隐写框架 GS-Hider，可将 3D 场景与图像以不可见方式嵌入原始 GS 点云并准确提取隐藏信息。
- **创新点**: ① 首个面向 3DGS 的隐写（steganography）框架；② 设计耦合的安全特征属性替代原始球谐系数，用场景解码器与消息解码器解耦 RGB 场景与隐藏消息；③ 在保真渲染的同时具备安全性、鲁棒性、容量与灵活性。
- **核心方法**: 耦合安全特征属性替换 SH 系数；双解码器（scene decoder + message decoder）分离渲染内容与隐写消息；保持渲染质量不受损。
- **实验设计与分析**: 在 3DGS 上验证可隐蔽多模态消息且渲染质量不降，具备安全性/鲁棒性/容量/灵活性（具体容量比特数、攻击鲁棒率「待补」）。支撑 claim：不可见嵌入+可靠提取+多属性兼顾。
- **写作可嫁接点**: 3DGS 安全/隐写方向代表，与 GaussianMarker（水印版权）、GeometryCloak（图像保护、对抗侧）构成 Security 子领域三足；讨论 3D 资产版权/加密传输时引用。
- **核查**: arxiv 标题=GS-Hider: Hiding Messages into 3D Gaussian Splatting（一致）

### GaussianMarker (`2410.23718`, NeurIPS 2024)
- **摘要**: 面向 3DGS 资产的版权保护，指出现有点云/网格/隐式辐射场水印无法直接用于显式高斯，提出基于不确定性的水印方法，约束参数扰动实现不可见水印，并能在 3D/2D 多种失真下稳健提取版权信息。
- **创新点**: ① 针对 3DGS 显式结构、无神经网络依赖的特异性设计水印；② 以不确定性约束模型参数扰动，避免预训练 3DGS 上嵌入导致渲染明显失真；③ 消息可从 3D 高斯与 2D 渲染图双路径提取，抗多种 3D/2D 失真。
- **核心方法**: 不确定性感知的扰动约束；在 3DGS 参数上嵌入水印；解码端支持高斯与渲染图双重提取。
- **实验设计与分析**: 在 Blender、LLFF、MipNeRF-360 上验证，消息解码准确率与视角合成质量均达 SOTA（具体准确率/PSNR「待补」）。支撑 claim：不可见+双路径稳健提取。
- **写作可嫁接点**: 3DGS 水印/版权保护代表，与 GS-Hider（隐写）、GeometryCloak（图像侧防护）区分引用；讨论"主动"版权标记 vs"被动"隐写时作对比基线。
- **核查**: arxiv 标题=GaussianMarker: Uncertainty-Aware Copyright Protection of 3D Gaussian Splatting（一致）

### GeometryCloak (`2410.22705`, NeurIPS 2024)
- **摘要**: 针对单视图 TGS 可在数秒内从单张图生成 3D 模型带来的版权滥用风险，提出在图像送入 TGS 前嵌入不可见的"几何斗篷"扰动，使 TGS 重建以可识别的定制图案失败，从而宣示版权。
- **创新点**: ① 在图像端（而非 3D 模型端）做防护，拦在重建之前；② 区别于常规对抗攻击只降质，本方法强制造失败并以定制水印图案暴露；③ 扰动不可见，平衡防护与可用性。
- **核心方法**: 为图像嵌入定制几何扰动（geometry cloak）；TGS 重建时触发可识别图案作为水印；以"失败方式可控"实现版权声明。
- **实验设计与分析**: 在 TGS 单视图重建上验证几何斗篷有效性（具体成功率/不可见性指标「待补」）。支撑 claim：在保护图像版权的同时阻止未授权 3D 重建。
- **写作可嫁接点**: Security 子领域"图像侧防护/对抗 TGS"代表，与 GS-Hider/GaussianMarker（模型侧）形成"进攻前拦截 vs 资产内标记"互补；讨论生成模型版权治理时引用。
- **核查**: arxiv 标题=Geometry Cloak: Preventing TGS-based 3D Reconstruction from Copyrighted Images（一致）

### SCube (`2410.20030`, NeurIPS 2024)
- **摘要**: 从稀疏位姿图像即时重建大规模场景（几何/外观/语义），提出 VoxSplat 表示（支撑于高分辨率稀疏体素支架上的一组 3D 高斯），用层级体素潜扩散 + 前馈外观预测，从少至 3 张非重叠图 20 秒内生成数百万高斯。
- **创新点**: ① 新表示 VoxSplat：高分辨率稀疏体素上的 3D 高斯集合；② 层级体素潜扩散粗到细生成高分辨率网格 + 前馈外观网络预测每体素高斯；③ 告别逐场景优化，少视图即得锐利输出（而非低分辨率先验的模糊结果）。
- **核心方法**: 稀疏体素支架 + 3D 高斯；coarse-to-fine 层级体素潜扩散；feedforward appearance prediction；支持 LiDAR 仿真、text-to-scene 生成等应用。
- **实验设计与分析**: 在 Waymo 自动驾驶数据集上对比 3D 重建，从少视图（3 张）覆盖数百米、1024³ 体素、20 秒生成数百万高斯（具体指标「待补」）。支撑 claim：少视图锐利重建 + 即时大规模。
- **写作可嫁接点**: "前馈/大模型 3DGS 重建"代表，与 CityGS/DOGS（优化式大规模）路线对照；World Models/Spatial Intelligence 子领域中少视图即时重建的强基线。
- **核查**: arxiv 标题=SCube: Instant Large-Scale Scene Reconstruction using VoxSplats（一致）

### Street Gaussians (`2401.01339`, ECCV 2024)
- **摘要**: 面向自动驾驶动态城市场景，指出现有 NeRF 方法训练/渲染慢，提出 Street Gaussians 显式表示：以带语义 logits 与 3D 高斯的动态点云建模前景车辆与背景，可在半小时内训练并以 135 FPS 渲染。
- **创新点**: ① 显式点云 + 3D 高斯建模动态城市场景，告别慢速 NeRF；② 前景车辆用可优化跟踪位姿 + 4D 球谐建模动态外观；③ 显式表示便于车辆与背景组合/场景编辑。
- **核心方法**: 每物体点云配 3D 高斯与可优化跟踪位姿；4D SH 建模动态外观；背景与前景分离；半小时内训练、1066×1600 分辨率 135 FPS。
- **实验设计与分析**: 在 KITTI、Waymo Open 等基准上一致超越 SOTA，训练半小时内、渲染 135 FPS（1066×1600）。支撑 claim：动态城市场景质量+速度双优且可编辑。
- **写作可嫁接点**: 动态城市/自动驾驶 3DGS 代表，与 CityGS（静态大规模）、SCube（前馈）区分；讨论动态场景、4D 外观、场景编辑、自动驾驶仿真时引用。
- **核查**: arxiv 标题=Street Gaussians: Modeling Dynamic Urban Scenes with Gaussian Splatting（一致）

---

## 2025 已确立（共 0 篇，简表）

> 本簇 2025 已确立清单为空，无简表行。

---

## 近期焦点（2026，详写）

### MEGA (`2610.01707`, 2026)
- **摘要**: 3DGS 网格提取旨在赋予高斯精确几何结构以实现显式精确占据，但现有方法多为场景级、无法表达物体级占据且常产生非水密表面。MEGA 提出"先分割后网格化"（segment-then-mesh）框架，从复杂 3DGS 场景提取物体级、水密网格。
- **创新点**: ① 从场景级走向物体级水密网格，解决非水密与无法表达物体占据的问题；② 核心 Spatial Visual Distillation（SVD）以 3DGS 为教师，采样多样相机位姿渲染各分割物体视图，用光度监督训练网格重建模型；③ 融合 mask 引导的神经表面重建模块。
- **核心方法**: 物体分割 → SVD 师生蒸馏（渲染多视角视图训练网格模型）→ mask-guided neural surface reconstruction；输出物体级水密 mesh，可与 3DGS 渲染结合支撑物理交互。
- **实验设计与分析**: 在多个常用基准上验证物体级 3D 占据恢复达到 SOTA（具体 IoU/水密率/基准名「待补」）；并展示与 3DGS 结合实现复杂物理交互。支撑 claim：物体级精确占据 + 水密 + 可物理交互。
- **写作可嫁接点**: CAD & 反向工程子领域焦点，引用 2DGS/几何精确 3DGS 作为几何基础，并对比既有"场景级"网格提取方法突出本工作的物体级贡献；讨论高斯→网格、可编辑/可仿真资产时必引。
- **核查**: arxiv 标题=MEGA: Object-Level Mesh Extraction from 3D Gaussian Splatting via Spatial Visual Distillation（一致，2026-10-01 提交）

### ChronoFuseGS (`2609.31339`, Pacific Graphics 2026)
- **摘要**: 针对场景部分区域在不同拍摄集之间发生变化带来的重建难题，提出多时序高斯 Splatting：将多个分别训练、部分地理重叠的时序 GS 模型合并为单一模型，并支持增量扩展与变化可视化。
- **创新点**: ① 跨时序合并：允许一个时序的高斯贡献于其他时序重建，借全部时序数据精修持久部分；② 每个高斯基元编码其贡献的时序，支持增量扩展（新增时序不破坏已有合并重建）；③ 变化感知可视化在子物体粒度高亮变化，而非仅物体级。
- **核心方法**: 多时序 GS 模型融合（consensus/合并）保留持久结构；per-splat persistence 编码；change-aware visualization 依据用户时间选择高亮变化、保留持久部分颜色；persistence 在基元级故变化可视化达子物体粒度。
- **实验设计与分析**: 在真实户外洪水管理区数据集（7 个月、8 个采集日，含季节性植被、积雪、洪水）上评估；合并模型在 NVS 质量上一致优于各单时序模型，恢复单模型中缺失的结构细节，并可靠高亮细粒度变化与物体/自然地物的子部件。具体 PSNR 提升「待补」。
- **写作可嫁接点**: 时序/动态大规模 3DGS 与"变化检测/世界模型时序一致性"交叉点；与 Street Gaussians（动态但单时序）、CityGS（大规模静态）对照引用；讨论长期场景监控、世界模型时间维度时引用。
- **核查**: arxiv 标题=ChronoFuseGS: Multi-Temporal Gaussian Fusion with Per-Splat Persistence and Change Visualization（一致，Pacific Graphics 2026，2026-09-25 提交）

### TRACE (`2610.00822`, 2026)
- **摘要**: 研究多机器人协同的下一最佳视角（NBV）选择，每个机器人各自构建并私有其 3D Gaussian Splatting 地图；在不共享地图的前提下，按期望信息增益（EIG）选视，使信息耦合仅通过"前方透射率"与"后方辐射"两个射线量分解传递。
- **创新点**: ① 隐私保护式分布式 NBV：任何机器人都不持有合并地图却可评估跨地图 EIG；② 证明耦合仅穿过透射率与辐射两个射线量，且二者为沿射线命中的求和，可跨机器人分解、按深度箱本地聚合；③ 通信量不随地图增长，且给出误差界与精确重建条件。
- **核心方法**: 各机器人沿候选视角射线、在自身地图按深度箱累加 Transmittance 与 Radiance Aggregates（含位姿导数）并发送；规划机器人据此合成 EIG 与 SO(3) 梯度；协议名 TRACE。证明：除非某 splat 后方的深度箱混入了两机器人的命中，重建精确，否则给出误差界。
- **实验设计与分析**: 在 Habitat-Sim 上 100 次 NBV 决策中，TRACE 选向在 83.3% 情况下与集中式结果相差 15° 以内，其视角达到集中式 EIG 的 97.9%。支撑 claim：分布式隐私 NBV 接近集中式性能且通信可扩展。
- **写作可嫁接点**: Security/Privacy + World Models/Spatial Intelligence 交叉焦点；与 GS-Hider/GeometryCloak（内容安全）对照"协同隐私"维度；讨论分布式 3D 地图、机器人 NBV、隐私保护空间智能时引用。
- **核查**: arxiv 标题=TRACE: Privacy-Preserving Next-Best-View Selection over Distributed 3D Gaussian-Splat Maps（一致，2026-09-30 提交）

---

## 覆盖统计
- 经典（2023-2024）深度全覆盖：9 篇
- 2025 已确立简表：0 篇（清单为空）
- 2026 焦点详写：3 篇
- 合计：12 篇


---
