# 3DGS 写作沉淀能力库 · Writing Capability Base

> 版本：**2026-10-08** ｜ 数据源：`data/methods.json`（881 方法 / 23 类，v0.9.6）+ `reports/arxiv-daily/`（2026-09-28→10-08 每日扫描）+ `changelog/2026-10-07.md`（v0.9.6 人工收录 9 篇）
> 用途：把"近期新增论文的阅读"沉淀为**细分领域 → 核心期刊**的可检索能力，支撑**快速选题、写作定位、实验设计**三件事。
> 配套技能：`cg-paper-writing`（写作/投稿/中文期刊格式）、`3dgs-experiment-planner`（实验设计）、`3dgs-method-compare`（related-work 定位）、`3dgs-paper-reader`（精读）。

---

## 0. 使用说明（怎么用这套能力）

1. **想选题** → 先看 §3「快速选题引擎」按 gap 主题切入，再到 §2 找该子领域最近 1 个月的论文确认是否已被占领；
2. **想定位投稿 venue** → 查 §1 矩阵：每类给出「首选会议 / 首选期刊(英文长文) / 推荐中文期刊 / 近期热度」；
3. **想写 related-work / method / experiments** → §2 给出每篇新文的「问题—方法—增益—可嫁接点」，§4 给出分场景的数据集/基线/指标速查；
4. **想对齐写作规范** → §5 指向 `cg-paper-writing` 的 venue 格式与贡献模板，并列出不可触碰的红线（不虚构、引文三验）。

> 口径纪律：本库所有论文 ID 均来自项目已核验数据源（arXiv API / 每日扫描 / 人工收录 R9 协议）。凡只读了题录未读摘要的条目，标注 `[题录]`，仅给子领域与可嫁接点推断，**不写具体指标**。

---

## 1. 细分领域 → 核心期刊能力矩阵（23 类）

分布来自 `methods.json` 全量 881 条（`arXiv(preprint)` 占比高属领域常态，投稿时以非预印本 venue 为首选）。
"近期热度"= 2026-09-28→10-08 扫描+收录中落入该类的**新论文数**（反映当前 active 程度）。

| # | 细分领域 | 总量 | 首选会议 | 首选期刊(英文长文) | 推荐中文期刊 | 近期热度 |
|---|----------|-----|----------|-------------------|-------------|:---:|
| 1 | Dynamic & 4D | 91 | CVPR / NeurIPS | TOG / TVCG | JCAD、图学学报、VRIH | 🔥🔥🔥 |
| 2 | Feed-Forward | 86 | CVPR / NeurIPS | TOG / 3DV | JCAD、CJIG | 🔥🔥🔥 |
| 3 | Surface & Rendering | 65 | CVPR / ECCV | TOG / TVCG | JCAD、图学学报、VCIBA | 🔥🔥 |
| 4 | Cross-Domain | 65 | CVPR / NeurIPS | TVCG / CGF | CJIG、计算机应用 | 🔥🔥🔥 |
| 5 | Compression & Streaming | 52 | NeurIPS / ECCV | TVCG / TOG | JCAD、CJIG、JSKX | 🔥🔥🔥 |
| 6 | Optimization | 51 | CVPR / SIGGRAPH | TOG / TPAMI | JCAD、CJC、JOS | 🔥🔥 |
| 7 | SLAM | 47 | CVPR / ICRA | TRO / RA-L | 机器人、自动化学报 | 🔥🔥 |
| 8 | Editing | 45 | CVPR / ECCV | TOG / TVCG | JCAD、VCIBA | 🔥🔥 |
| 9 | Human & Avatar | 42 | CVPR / SIGGRAPH | TOG / TVCG | JCAD、VRIH | 🔥🔥 |
| 10 | Embodied AI & Robotics | 42 | CVPR / ICRA / CoRL | RA-L / TRO | 机器人、自动化学报 | 🔥🔥🔥 |
| 11 | Generation | 41 | NeurIPS / CVPR | TOG / SIGGRAPH | JCAD、CJIG | 🔥🔥 |
| 12 | Language & Semantic | 37 | CVPR / ECCV | IJCV / TPAMI | CJIG、中文信息学报 | 🔥🔥 |
| 13 | Foundation | 27 | CVPR / NeurIPS | TOG / TPAMI | CJC、JOS | 🔥🔥 |
| 14 | HDR & Relighting | 26 | CVPR / SIGGRAPH | TOG / TPAMI | JCAD、CJIG | 🔥🔥 |
| 15 | Autonomous Driving | 25 | CVPR | IJCV / RA-L | 机器人、CJIG、自动化学报 | 🔥🔥 |
| 16 | Sparse-View | 25 | NeurIPS / ECCV / CVPR | IJCV / TOG | JCAD、CJIG | 🔥🔥🔥 |
| 17 | Acceleration | 23 | CVPR* | TVCG / TOG | JCAD、JSKX | 🔥🔥🔥 |
| 18 | Robustness | 22 | CVPR / ECCV | IJCV / TPAMI | CJIG、计算机应用研究 | 🔥🔥 |
| 19 | CAD & Reverse Engineering | 20 | CVPR / ICCV | TOG / TVCG | JCAD、图学学报 | 🔥🔥 |
| 20 | Large-Scale | 20 | ECCV / NeurIPS | TOG / TVCG | CJIG、JCAD | 🔥🔥 |
| 21 | Simulation | 11 | SIGGRAPH | TOG | JCAD、VRIH | 🔥 |
| 22 | Security | 10 | NeurIPS / ICML | TPAMI / IJCV | CJC、CRAD、JOS | 🔥 |
| 23 | World Models & Spatial Intelligence | 8 | ECCV / NeurIPS | TPAMI / SCIS | 自动化学报、SCIS | 🔥🔥 |

> 注：`*`Acceleration 类中 91% 仍为预印本，正式会议占比低，说明该子领域正快速洗牌、尚未形成稳定顶会归宿——投稿时可优先投 CVPR 并同步 arXiv。
> 中文期刊代号：CJC 计算机学报、JOS 软件学报、JCAD 计算机辅助设计与图形学学报、CJIG 中国图象图形学报、VCIBA 工医艺可视计算、VRIH 虚拟现实与智能硬件、TXB 图学学报、AAS 自动化学报、SCIS 中国科学:信息科学、CRAD 计算机研究与发展、JSKX 计算机科学、JCIS 中文信息学报。

---

## 2. 近期新增论文精读（2026-09-28 → 10-08，~50 篇唯一）

分组按子领域。每篇格式：**方法(ID) — 一句话问题/方法/增益/可嫁接选题点**。
标记 `[精读]` = 已读摘要可给具体增益；`[题录]` = 仅题录，增量与指标不写。

### 2.1 Feed-Forward（前馈/免优化重建）🔥🔥🔥
- **DeltaSplat** (`2610.09853`) `[精读]` — Pose-free 前馈 3DGS 的相机误差会累积进高斯；提出轻量迭代精修模块，渲染上下文视图预测逐高斯更新，并以 Plucker 射线+深度作几何先验。仅 +2.2% 参数，DL3DV pose-free 26.64 dB（比 backbone +1.75 dB，超 GT 相机基线）。**嫁接点**：把"残差驱动迭代精修"嫁到任意前馈 backbone。
- **DensiTok** (`2610.07958`) `[精读]` — 前馈 3DGS 输入视图少时内部表征缺未观测区证据；直接在隐空间 densify 几何 token，单次 flow-matching 补全未观测视角 latent，冻结 backbone。跨 3 个 backbone 缩小了与稠密视图的差距。**嫁接点**："latent 补全"范式可用于稀疏视角/视频表征。
- **MoonGS** (`2610.07110`) `[精读]` — 首个面向月面地形的前馈 3DGS，仅 2 张图单前向预测像素对齐高斯；融合视觉基础模型深度特征+语义先验+熵引导重采样。LuSNAR/MoonBlender 上超 SOTA 前馈 +4.9 dB PSNR、SSIM +0.29、LPIPS -40%，亚秒推理。**嫁接点**：弱纹理/稀疏观测科学场景的 foundation-model 嫁接模板。
- **StereoGaussians** (`2609.38592`) `[题录]` — 双目图前馈 3DGS。
- **AESplat** (`2609.36693`) `[精读, v0.9.6 收录]` — Pose-free 前馈，解耦 SH 外观；RealEstate10K 上 +0.8 dB over NAS3R、+1.1 dB over DepthSplat。
- **AGILE-GS** (`2609.34176`) `[精读, v0.9.6 收录]` — SE(3) anchor 引导的最_next-best-view 选择，延迟降 1–2 个数量级。
- **GenNVS** (`2609.34579`) `[题录]` — 几何增强新视角合成（解耦 3D 先验）。

### 2.2 Dynamic & 4D 🔥🔥🔥
- **Mobile-4DGS** (`2610.05289`) `[精读]` — 统一静态-动态实时移动端高斯泼溅，面向移动端实时。**嫁接点**：端侧部署/蒸馏。
- **Reconstructing the Dynamic World** (`2609.39960`) `[题录]` — 表示中心视角的 4D 场景重建综述性 framing。
- **Eulerian Motion Reconstruction for Water Scenery** (`2609.38622`) `[题录]` — 水体欧拉运动重建。
- **DispFlow-GS** (`2609.36940`) `[题录]` — 单目可形变 3DGS 的位移流监督+运动解耦。
- **Affine-Aligned Atlas** (`2610.01114`) `[题录]` — 视频表征的规范高斯构建（仿射对齐 atlas）。
- **SteadySplats** (`2610.05576`) `[精读]` — 低方差高斯重采样，用于高保真随机渲染（stochastic rendering）。**嫁接点**：可微分/随机渲染的稳定性。

### 2.3 Compression & Streaming 🔥🔥🔥
- **GSCV** (`2610.07795`) `[精读]` — 用标准视频编解码压缩 GS **序列**：Inter-PLAS 拉近 I/P 帧相关性，高比特深度 GS 图提升可压性；超 MPEG 视频与基于点云锚点。代码已开源。**嫁接点**：把"PLAS+现成视频 codec"作为序列压缩 baseline，工程落地友好。
- **TSGL** (`2609.38635`) `[题录]` — 师生图学习做 3DGS 压缩。
- **NRF-GS** (`2609.37115`) `[题录]` — 神经残差场做紧凑且富有表现力的 GS。
- **Rate-Distortion Adaptive Primitive Selection** (`2609.34367`) `[题录]` — 全向(omnidirectional) GS 的率失真自适应图元选择。
- **Observation-Gram** (`2609.28997`) `[精读, v0.9.6 收录]` — 逐高斯观测 Gram 矩阵做 SH 压缩，+0.49 dB over Compressed3D。

### 2.4 Acceleration 🔥🔥🔥
- **TileSkipper** (`2610.09343`) `[精读]` — 区域自适应 tile 剪枝：为冻结 checkpoint 选静态逐高斯 cutoff 策略，仅 1 字节/高斯、无参数更新、无新 kernel、无逐帧推理；13 场景 AccuTile 扫描 1.088×(标准)/1.238×(3840宽)，PSNR 变化 -0.007/-0.023 dB；6 个 opacity-aware bound 集成得 1.009–1.121× 仅编译提速。**嫁接点**："无训练、单字节策略"的 pruning 范式极易作为 plugin。
- **Speedy-Splat** (`2412.00578`) `[精读, v0.9.6 收录, CVPR 2025]` — SnugBox(精确 AABB, 1.82× 无损)+AccuTile(精确高斯-tile 相交, 1.99× 无损)+Soft/Hard Pruning(10.6× 压缩, 6.71× 提速)；Mip-NeRF360 27.55→26.94 dB(-0.61)。**嫁接点**：渲染器级无损加速的标杆组合。
- **EffGS** (`2609.39553`) `[题录]` — 高效高保真 GS。
- **Gaussian Stippling** (`2609.38488`) `[题录]` — 免排序混合采样渲染。

### 2.5 Cross-Domain（科学/医学/遥感/水下）🔥🔥🔥
- **SURGE** (`2610.07472`) `[精读]` — 水下 ROV：相机+声纳在因子图里联合估计轨迹与目标定位，再用恢复的度量和位姿做声纳高斯泼溅；比纯视觉位姿一致性更好、比 RGB GS 更紧凑且原生度量。**嫁接点**：多模态(声学+视觉)因子图→GS 是水下/弱纹理标配范式。
- **EndoPrior-GS** (`2609.37874`) `[题录]` — 动态内窥镜重建+联合纹理先验（医学）。
- **Dirichlet Splatting** (`2610.00618`) `[题录]` — 波基逆问题的可微渲染（cs.GR，物理逆问题）。
- **Remote Sensing Sparse-View** (`2609.35612`) `[题录]` — 遥感稀疏视角（基于深度图像渲染）。
- **Beyond Monoscopic VR** (`2609.38525`) `[题录]` — VR 中 3DGS 质量研究（cs.HC）。
- **OpenSplatGraph** 见 2.10；**ChronoFuseGS / RRTO-CF3DGS** 见 2.6/2.7；**MoonGS** 见 2.1。

### 2.6 Large-Scale 🔥🔥
- **ChronoFuseGS** (`2609.31339`) `[精读, v0.9.6 收录, PG 2026]` — 多时相高斯融合，逐 splat 持久性(persistence)；处理时序变化的大规模场景。

### 2.7 SLAM 🔥🔥
- **RRTO-CF3DGS** (`2609.30865`) `[精读, v0.9.6 收录]` — 可靠性调节的轨迹优化做 COLMAP-free 3DGS，T&T 与 CO3D-V2 上 SOTA。**嫁接点**：把"可靠性权重"引入免 COLMAP 训练。

### 2.8 Editing 🔥🔥
- **MaRO-GS** (`2610.06472`) `[精读]` — 面向目标物体的 object-centric GS，对多视角不一致 mask 鲁棒：mask 可靠性视图过滤+物体支撑的密度控制+轮廓对齐物体损失；小物体 LERF-Mask 上 PSNR 最大 +2.05 dB、更高效。**嫁接点**："鲁棒 mask 监督"可嫁接到任何 object-level GS。
- **WINGS** (`2609.37816`) `[题录]` — 免参考 GS inpainting，3D-native 生成先验。
- **Lens Flare Removal and Reconstruction** (`2609.39527`) `[题录]` — 镜头光晕去除与重建（编辑/逆渲染交叉）。
- **GS-Pool** (`2610.06688`) `[精读]` — 两次独立重建的 GS 场做**物体级变化检测**：SAM2 mask 抬升到高斯合并为物体池，用训练 loss 作"照片载体"反传；PASLCD mIoU/F1 0.751/0.846（GS-Diff 0.644/0.758）。**嫁接点**：变化检测/场景审计新任务。

### 2.9 HDR & Relighting 🔥🔥
- **Casual Flash Lighting** (`2610.06035`) `[精读]` — 用日常室内"闪光开/关"双光照做高斯泼溅逆渲染；闪光残差约束反照率与 BRDF，静态光照抓掠射高光；2DGS 框架下 GS 锚定漫反射场(hash MLP 查询 2DGS 深度)。5 合成+3 真实场景，重光照 PSNR 比次优 +4.17 dB。**嫁接点**："casual flash"主动光照降歧义是可复现范式。
- **EvenSplat** (`2610.01876`) `[题录]` — 曝光/光照变化下的 2D-3D 耦合分解。

### 2.10 Embodied AI & Robotics 🔥🔥🔥
- **OpenSplatGraph** (`2610.07569`) `[精读]` — 从在线高斯开放词汇语义图直接建持久 3D 场景图：可靠性感知语义场+持久图节点增量更新；支持语言引导定位与关系推理。ScanNet++ 等。**嫁接点**：dense semantic map → structured scene graph 是机器人感知热点。
- **SURGE** 见 2.5；**ControlPed** 见 2.15；**Measuring Asset/Scene** (`2610.00731`) `[题录]` real-to-sim 机器人评估；**Distilling CBF** (`2609.36520`) `[题录]` RGB-only 安全滤波；**PneuTac** (`2609.38418`) `[题录]` 软体气动机器人 MPM-GS 统一仿真；**CollisionSplatting** (`2609.35619`) `[题录]` 3DGS 场景中碰撞感知运动规划。

### 2.11 Language & Semantic 🔥🔥
- **Post-Training Semantic Lifting** (`2610.08756`) `[精读]` — 训练后语义提升，逐目标类组合多视角证据并按可见性加权；分离三类误差(2D 检测器/提升/表征迁移)。Replica 验证 mIoU 0.93(数据集掩码)/0.65(YOLO)，ScanNet++ 0.80/0.54。**嫁接点**："误差可分离"框架用于语义 GS 的 ablation 设计。
- **Imagine3D-LLM** (`2609.38177`) `[题录]` — 教 MLLM 先想象 3D 场景再回答。
- **EviSplat** (`2609.34853`) `[题录]` — 开放词汇分割中保留多视角证据。

### 2.12 Optimization 🔥🔥
- **TangoGS** (`2609.31248`) `[精读, v0.9.6 收录]` — 捕获派生学习余量+训练质量引导密度控制，高斯数 -48%。**嫁接点**："密度控制策略"是 optimization 类高频创新点。
- **Prior-Driven Enhancements** (`2609.36969`) `[题录]` — 法线+深度正则的先验驱动增强。
- **Less Is More** (`2609.35573`) `[题录]` — 遗传帧选择做高效新视角合成（优化输入帧）。

### 2.13 CAD & Reverse Engineering 🔥🔥
- **MEGA** (`2610.01707`) `[精读]` — 通过空间视觉蒸馏从 3DGS 做物体级网格提取。**嫁接点**：GS→mesh 的"蒸馏式"提取比几何法更稳，是 CAD 类趋势。

### 2.14 Sparse-View 🔥🔥🔥
- **OC-GS** (`2609.31572`) `[精读, v0.9.6 收录]` — 物体中心 GS 用于不规则转台；12/8/6 视图→21.26/19.36/15.83 dB。
- **UGOD** (`2609.39089`) `[精读]` — 不确定性引导的 opacity 与 dropout 做稀疏视角 GS。**嫁接点**："不确定性作为 dropout/opacity 门控"是稀疏视角训练通用件。
- **ClearGS** (`2609.31509`) `[精读, v0.9.6 收录]` — 可靠性感知视图分配+渲染引导视频内修复；GS2E/GSOTM SOTA。
- **Remote Sensing Sparse-View** 见 2.5；**GenNVS** 见 2.1。

### 2.15 Autonomous Driving 🔥🔥
- **ControlPed** (`2610.06171`) `[精读]` — 轨迹级冲突合成 + 文本条件运动扩散 + 可动画 3DGS 行人化身，渲染多视角传感器观测做端到端驾驶安全评估；88 个场景使 7 个主流端到端模型 HDScore 从 88.8 跌到 47.4。**嫁接点**：GS 化身生成"可控风险场景"是自动驾驶安全评测新范式。

### 2.16 Foundation 🔥🔥
- **SPLATIFY** (`2610.09116`) `[精读]` — 多智能体框架把 3DGS 论文转成可训练 gsplat 实现：gsplat 的 CFG+模块化模板(扩展点: loss/densification/rendering/optimization)、fork-aware 引用恢复、Graph-of-Thought 拓扑合成、RAG 上下文示例、PSNR 引导再生+VLM patch；SPLATIFY-Bench(30 篇)。无公开代码论文上匹配专家实现、开发从数周→分钟，组合发现再 +2.4 dB。**嫁接点**：paper-to-code 自动化是基础设施方向，值得跟踪。
- **What Builds the Scene?** (`2610.00749`) `[题录]` — 亮度主导 3DGS 几何形成的分析性工作。

### 2.17 Security 🔥
- **TRACE** (`2610.00822`) `[精读]` — 分布式 3DGS 地图上的隐私保护 next-best-view 选择。**嫁接点**：联邦/分布式 GS 的隐私是新兴安全方向。

### 2.18 World Models & Spatial Intelligence 🔥🔥
（本期扫描未出现该类新增；该类体量小但增长快，建议持续跟踪 embodied/spatial 交叉。）

### 2.19 Generation / Simulation / Robustness
- **Generation**：本期以 Imagine3D-LLM、GenNVS 为主，无独立新文。
- **Simulation**：本期无新增（MoonGS 的渲染范式、PneuTac 的 MPM-GS 仿真可归此方向的近邻）。
- **Robustness**：ClearGS(2.14) 的"可靠性感知"属此类；本期无独立新文。

---

## 3. 快速选题引擎（按 gap 主题切入）

以下主题由 §2 前沿归纳，每条给出**可占领的切口 + 推荐子领域 + 首选 venue + 必须对比的基线**。

1. **Pose-free / 少视角前馈的"误差修正"** — DeltaSplat(残差迭代)、DensiTok(latent 补全)、AESplat(解耦外观) 三线并行，但仍缺"统一框架"。→ 子领域 Feed-Forward / Sparse-View；venue CVPR/NeurIPS；基线含 DepthSplat、NAS3R、MVSplat。
2. **无训练/单字节的推理加速 plugin** — TileSkipper、Speedy-Splat 证明渲染器级无损加速仍有空间。→ Acceleration；venue CVPR/TVCG；基线 Speedy-Splat、LightGaussian、SoftGrowth。
3. **GS 序列/资产压缩用现成视频 codec** — GSCV 把 PLAS+视频编解码工程化。→ Compression & Streaming；venue NeurIPS/ECCV/TVCG；基线 Compressed3D、PLAS。
4. **训练后语义提升 + 误差可分离** — Post-Training Semantic Lifting。→ Language & Semantic；venue CVPR/ECCV；基线 LEGaussians、Feature-3DGS、GAGS。
5. **dense semantic map → 结构化场景图（机器人）** — OpenSplatGraph。→ Embodied AI & Robotics；venue ICRA/CoRL/RA-L；基线 ConceptGraphs、Hierarchical 3DGS。
6. **GS 驱动的可控风险场景生成（自动驾驶安全）** — ControlPed。→ Autonomous Driving / Human & Avatar；venue CVPR/机器人；基线用端到端模型(HDScore)。
7. **casual 主动光照降歧义逆渲染** — Casual Flash Lighting。→ HDR & Relighting；venue SIGGRAPH/TOG；基线 InvRender、GS-IR。
8. **多模态因子图(声学+视觉)→GS** — SURGE。→ Cross-Domain/SLAM；venue ICRA/RA-L；基线各水下重建。
9. **物体级变化检测 / 场景审计** — GS-Pool。→ Editing/Cross-Domain；venue CVPR/ECCV；基线 GS-Diff、O-SCD。
10. **鲁棒 mask/不确定性监督** — MaRO-GS、UGOD。→ Editing/Sparse-View；venue CVPR；基线 SAM-guided object GS。
11. **密度控制/帧选择等 optimization 微创新** — TangoGS、Less Is More、Prior-Driven。→ Optimization；venue CVPR/SIGGRAPH；基线与 3DGS 原始 densification 对比。
12. **论文→代码自动化基础设施** — SPLATIFY。→ Foundation（基础设施）；venue 系统/AI 会议均可；关注可复现性社区。
13. **联邦/分布式 GS 隐私** — TRACE。→ Security；venue NeurIPS/ICML；基线分布式 NBV。

---

## 4. 实验沉淀速查（分场景数据集 / 基线 / 指标）

> 取自 §2 已读摘要中明确出现的设置；未读摘要的子领域给出领域通行默认，**标注 [默认]** 需按目标论文核实。

| 子领域 | 常用数据集 | 必比基线 | 核心指标 |
|--------|-----------|---------|---------|
| Feed-Forward(通用) | DL3DV、RealEstate10K、CO3D-V2、ACID | MVSplat、DepthSplat、pixelSplat、NAS3R | PSNR/SSIM/LPIPS |
| Feed-Forward(科学弱纹理) | LuSNAR、MoonBlender(合成) | 前馈 NeRF/3DGS 基线 | PSNR/SSIM/LPIPS、推理时延 |
| Dynamic & 4D | D-NeRF、HyperNeRF、MeetRoom、Neu3D | 4D-GS、Deformed-GS | PSNR/SSIM/LPIPS、FPS |
| Acceleration | Mip-NeRF 360、Tanks&Temples、Deep Blending | LightGaussian、Speedy-Splat、Scaffold-GS | PSNR、FPS、存储(MB)、参数量 |
| Compression | 上述 + 自采序列 | Compressed3D、PLAS、LightGaussian | 比特率/PSNR、BD-rate、解码时延 |
| Sparse-View | LLFF、DTU、CO3D-V2、RealEstate10K | FSGS、DNGaussian、对应前馈模型 | PSNR/SSIM/LPIPS |
| SLAM | TUM-RGBD、Replica、ScanNet、Tanks&Temples | SplaTAM、MonoGS、Gaussian-SLAM | ATE(RMSE)、渲染 PSNR |
| Language & Semantic | ScanNet++、Replica、LERF、3D-OVS | LEGaussians、Feature-3DGS、LangSplat、GAGS | mIoU、语义 PSNR |
| HDR & Relighting | 合成室内 + 真实室内(自建) | InvRender、GS-IR、Relightable 3DGS | PSNR(重光照)、 albedo/roughness 误差 |
| Editing | 标准场景 + 分割/修复基准 | 对应 inpainting/编辑 SOTA | PSNR/SSIM/LPIPS、FID |
| Embodied/Robotics | ScanNet++、真实机器人采集、ConceptGraphs 基准 | ConceptGraphs、Hierarchical 3DGS | 定位 mAP、关系推理准确率 |
| Autonomous Driving | 交通视频派生(HazardPed 类)、nuScenes | 端到端驾驶模型(HDScore) | HDScore、碰撞率 |
| CAD/Reverse | DTU、自定义物体、ShapeNet | SuGaR、2DGS、Gauss-to-Mesh | Chamfer、F-score、法向误差 |

> 指标口径纪律：PSNR 务必注明是否含/不含背景、测试分辨率（3840 宽等）；压缩类必须给**比特率**而非仅大小；加速类必须给**无损/有损**边界与存储。详见 `cg-paper-writing` 的 experiment-claim-verification 与 reviewer-perspective。

---

## 5. 写作速查（规范与红线）

### 5.1 venue 格式入口（指向 `cg-paper-writing`）
- 英文会议：CVPR/ICCV/ECCV → `venue=cvpr`；SIGGRAPH/PG/EG → `venue=siggraph`；NeurIPS/AAAI → `venue=neurips`；TVCG/TOG/TPAMI → `venue=tvcg`。
- 中文期刊：CJC/JOS/JCAD/AAS/SCIS/CRAD/CJIG/PRAI/VRIH/JSKX/JCIS/TXB/机器人/计算机应用研究/VCIBA → 见技能 `venue` 轴逐项加载 `<venue>-format.md`。
- 顶刊/综述投稿策略 → `venue=top-journal` + `references/top-journal-strategy.md`。

### 5.2 贡献声明模板（四件套）
每条贡献 = **根本问题句 + 方法名/机制 + 外部技术嫁接点 + 量化增益(可复述)**。禁止"本文首次提出"类不可证伪表述，除非能给出对比基线+指标。

### 5.3 红线（不可触碰）
- **不虚构**：任何指标/ID/venue 须来自本库或一手来源；缺失写 `<!-- DATA_NEEDED -->` 或 "N/A"。
- **引文三验**：arXiv ID 经 API 核验标题一致；作者/venue 三要素一致；凭记忆报的 ID 先验再写（参见项目核查协议：InFusion=2404.11613、CityGaussian=2404.01133、Scaffold-GS=2312.00109）。
- **不冒领**：方法特征/结果不得跨方法错配（如把 Speedy-Splat 的 SnugBox 写到别的方法）。
- **派生后缀**：`+ / ++ / -v2` 等必须对照 arXiv 标题确认（作者自印才保留，否则删）。
- **描述性标题不是方法名**：论文未自述方法名的不入方法库（参见准确性核查协议第 9 条）。

### 5.4 交叉技能
- 定位 / related-work 表 → `3dgs-method-compare`
- 实验设计 → `3dgs-experiment-planner`
- 论文精读 → `3dgs-paper-reader`
- 配图 → `3dgs-visualizer`
- 实现核查 → `3dgs-code-reviewer`

---

## 6. 维护说明
- 数据刷新：每日 `scripts/daily_arxiv_scan.py` 产出 `reports/arxiv-daily/`；人工收录走 `scripts/enroll_new_papers.py` + R9 协议。
- 本库更新节奏：建议每月（或与 v 版本 bump 同步）重跑 §1 分布统计、合并新扫描、刷新 §2/§3。
- 统计脚本（复现 §1）：从 `data/methods.json` 按 `category` 聚合 `venue` 家族计数，逻辑见本仓库 `scripts/` 中 venue 归一化范式。
- 待办：§2 中 `[题录]` 条目待补摘要精读；World Models / Generation / Simulation / Robustness 本期新增偏少，下月重点补扫。
