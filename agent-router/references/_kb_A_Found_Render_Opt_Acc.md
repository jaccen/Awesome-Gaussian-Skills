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
