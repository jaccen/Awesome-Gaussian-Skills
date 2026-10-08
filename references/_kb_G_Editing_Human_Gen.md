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
