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
