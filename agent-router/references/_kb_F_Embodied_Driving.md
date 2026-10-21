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
