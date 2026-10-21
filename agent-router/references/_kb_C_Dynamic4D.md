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
