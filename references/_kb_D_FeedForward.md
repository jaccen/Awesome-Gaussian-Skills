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
