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
