# Experiment Design Protocol — 3DGS 实验设计与训练调试

> 融合自 3dgs-experiment-planner + 3dgs-training-debugger。用于阶段5实验设计与分析，在用户要求"设计实验/选数据集/选基线/选指标/消融实验/训练崩溃/NaN/OOM/调试"时加载。

## 适用场景

- 为 3DGS 论文设计实验方案（数据集/基线/指标/消融矩阵）
- 训练崩溃或结果异常时诊断根因
- 回应审稿人对实验设计的质疑
- 为论文补做远程实验或核查实验声明

## 数据集推荐

### 标准基准（必用）

| 数据集 | 类型 | 场景数 | 分辨率 | 难度 |
|--------|------|--------|--------|------|
| Mip-NeRF 360 | 前向+360° | 9（bicycle/garden/stump/bonsai...） | 1008×756 | 中 |
| Tanks and Temples | 大型户外 | 5+ | 可变 | 中 |
| Deep Blending | 复杂室内 | 7 | 可变 | 难 |
| DTU | 物体中心 | 124+ | 1600×1200 | 中 |

### 专用基准（按方法类型选）

| 方法类型 | 推荐数据集 | 评估重点 |
|---------|-----------|---------|
| 高频/边界 | 合成锐边场景 | 边界质量 |
| 大规模 | Mill 19 / MatrixCity / Block-NeRF | 可扩展性 |
| 动态场景 | D-NeRF / HyperNeRF / iPhone / NeRF-DS | 时间一致性、拓扑变化、稀疏视角泛化 |
| 编辑 | NeRF-Synthetic / SHARP | 可控性 |
| 材质/重照明 | Light Stage / Polyhaven | 材质分解 |
| 自动驾驶 | Waymo / nuScenes / KITTI-360 | 真实驾驶 |
| 人体/Avatar | THUman2.0 / ZJU-MoCap | 人体指标 |
| 前馈/单次 | RealEstate10K / ACID | 多视角前向推理 |
| 语义/分割 | LERF / SemanticKITTI | 3D 语义场 |
| SLAM | Replica / TUM-RGBD / ScanNet | 追踪+建图精度 |
| 具身/抓取 | GaussianGrasper / GraspSplats | 开词汇抓取 |
| 具身/操作 | ManiGaussian / RoboSplat | 多任务操作 |
| 具身/导航 | VR-Robo | Real-to-Sim-to-Real 导航 |
| 稀疏视角 | HeroGS / Sparse-View 3DGS Wild | 层次引导+扩散增强 |
| 物理模拟 | FieryGS | 物理集成火合成 |
| 医学 | GaussianPile / RESPIRE | CT/支气管镜 |
| 安全/取证 | Fake3DGS / 3DGS AD Safety Eval | 操纵检测/AD 感知 |
| HDR 动态 | HDR-GoPro | 真实世界 HDR 动态 |
| 夜间/低光 | Nighttime nuScenes / Waymo | 低光重建 |
| 跨域 | BALTIC | 空气/水跨域 |

## 基线选择

### Tier 1 — 必比（审稿人会问）

- 原始 3DGS（Kerbl et al., SIGGRAPH 2023）
- Mip-NeRF 360（Barron et al., CVPR 2022）

### Tier 2 — 应比（强烈建议）

- 2DGS 或 Scaffold-GS（按方法类别选）
- 一个 NeRF 变体（NeRF / Instant-NGP / Mip-NeRF）
- Proxy-GS（若声称加速）
- 2DGS（若声称几何质量）
- SparseSplat（若声称前馈效率）
- ZPressor（若声称多输入视角前馈可扩展）
- VolSplat（若声称体素对齐或多视角一致性）

### Tier 3 — 宜比（若直接相关）

按子领域选同类别方法：
- **压缩**：LightGS / Compact-3DGS / NanoGS / MesonGS++ / GETA-3DGS
- **几何**：SuGaR / 2DGS / 2D-SuGaR
- **编辑**：Instruct-NeRF2NeRF / GOR-IS
- **训练优化**：Scaffold-GS / Structure-Aware Densification / LeGS / CAdam
- **加速**：FastGS（CVPR 2026 Highlight，100 秒训练）/ GEMM-GS（Tensor Core）
- **前馈**：FTSplat / SVGS / Pi-GS / DropAnSH-GS
- **SLAM**：Flow4DGS-SLAM / GGD-SLAM / BA-GS
- **动态**：D4RT / Color-Encoded Illumination

## 评估指标

### 质量

- **PSNR**（dB）：必报，越高越好
- **SSIM**：必报，结构相似性
- **LPIPS**：必报，感知相似性
- **FID**（生成任务）：可选

### 效率

- **训练时间**（秒/分/小时）：必报
- **推理 FPS**：必报，@指定分辨率
- **显存峰值**（GB）：必报
- **高斯点数**（M）：必报
- **模型大小**（MB）：压缩类必报

### 几何（若声称几何质量）

- **深度误差**（Abs Rel / RMSE）
- **法向误差**（度）
- **Chamfer 距离**（若有 GT 网格）

### 鲁棒性（若声称鲁棒）

- 跨场景方差
- 噪声输入下的指标衰减
- 稀疏视角下的指标

## 消融实验矩阵

### 必做消融

| 消融维度 | 做法 | 验证什么 |
|---------|------|---------|
| 核心模块 | 逐个去掉，看指标掉多少 | 每个模块的独立贡献 |
| 关键超参 | 在合理范围内扫，看敏感性 | 超参鲁棒性 |
| 损失项权重 | 逐项调零/翻倍，看影响 | 损失设计的必要性 |
| 数据规模 | 减少输入视角/帧数 | 数据效率 |

### 消融纪律（对齐老板偏好）

- **多种子统计**：每组消融至少 3 个种子，报均值±标准差
- **配对 t 检验**：消融对比必须做配对 t 检验，标显著性
- **诚实报告 negative results**：某模块贡献不显著就如实说，不硬找解释
- **先关键场景达标再全量重跑**：如先验证 ≥0.5dB PSNR 增益再跑全量 16 场景

## 比较公平性协议（与 writing-experiments.md 一致）

所有比较方法（含基线）必须在**同一数据集、同版本、同分辨率、同 split、同评估协议**下评估。基线数字的口径无法核实时，在统一设置下重跑，**不得静默复用、转换或近似不匹配口径的数字**，不得在同一表内混合不同口径数字。

## 训练调试：60 种失败模式速查

### 崩溃类

| 症状 | 可能根因 | 诊断步骤 | 修复 |
|------|---------|---------|------|
| OOM / CUDA error | 显存不足 / 点数爆炸 / batch 过大 | 查 nvidia-smi 峰值；查高斯点数增长曲线 | 降 batch / 限制 densify 上限 / 梯度累积 |
| NaN / Inf loss | 学习率过高 / 数值不稳 / 梯度爆炸 | 查 loss 曲线突变点；查梯度范数 | 降学习率 / 加梯度裁剪 / 检查 log 运算 |
| CUDA kernel assert | 索引越界 / 形状不匹配 | 查 stack trace 定位 kernel | 核对张量形状 / 边界条件 |

### 收敛类

| 症状 | 可能根因 | 诊断步骤 | 修复 |
|------|---------|---------|------|
| Loss 平台期不降 | 学习率过低 / densify 未触发 | 查 densify 触发次数；查学习率调度 | 调 densify 阈值 / 检查 scheduler |
| 训练发散（loss 先降后升） | 自适应 densify 失控 / 损失冲突 | 查点数增长是否异常；查各损失项趋势 | 限制 densify 频率 / 调损失权重 |
| 过早收敛（PSNR 卡在低位） | 容量不足 / 正则过强 | 查点数是否过早饱和；查正则项权重 | 放宽 densify / 降正则权重 |

### 伪影类

| 症状 | 可能根因 | 诊断步骤 | 修复 |
|------|---------|---------|------|
| 大型浮点（floaters） | densify 过度 / 不透明度衰减不足 | 渲染深度图看悬浮点；查不透明度分布 | 加不透明度正则 / 周期性剪枝 |
| 边界模糊 | 高频细节不足 / 低通滤波 | 查高频区域局部 PSNR | 加高频感知损失（SignedGS 思路） |
| 残影/鬼影 | 动态场景时间不一致 | 查相邻帧差异图 | 加时间一致性损失 |
| 孔洞 | densify 不足 / 表面重建缺失 | 查深度图空洞 | 提高 densify 阈值 / 加表面正则 |

### 分布式/检查点类

| 症状 | 可能根因 | 修复 |
|------|---------|------|
| 梯度不一致 | All-Reduce 未同步 | 检查 DDP sync 点 |
| 死 worker | NCCL 超时 / 个别 GPU 崩溃 | 查 NCCL 日志 / 降 batch |
| 检查点恢复结果不同 | 随机性未固定 / 优化器状态未存 | 固定种子 / 存完整优化器状态 |

### 新方法专项（deformable/MoE/physics/feed-forward）

- **Deformable GS**：变形场过拟合 → 检查变形正则；时间平滑性不足 → 加时序一致性
- **MoE-GS**：路由崩塌 → 检查负载均衡损失；专家死锁 → 加探索噪声
- **Physics-based GS**：物理约束冲突 → 检查物理损失与渲染损失的权重比
- **Feed-forward GS**：泛化不足 → 检查训练集多样性；推理崩塌 → 检查前馈网络容量

## 执行层说明

本协议提供实验设计方法论与调试检查清单。执行时：
- 实验设计：我按上述表推荐数据集/基线/指标，生成消融矩阵表格供用户确认
- 训练调试：用户贴出 loss 曲线/错误信息/渲染结果，我按 60 种失败模式匹配根因
- 远程实验：配合 `experiment-claim-verification.md` 的 SSH-PowerShell 操作规范
- 挂机实验：用 `autoresearch` 技能（不融入本协议，因其为运行时编排能力）

## 与本技能其他 fragment 的衔接

- 实验结果写成论文 → `writing-experiments.md` + `3dgs-paper-knowledge.md`
- 实验数字核查 → `experiment-claim-verification.md`（声明-产物六步核查链）
- 比较公平性 → `writing-experiments.md` Comparison Fairness Protocol
- 训练前代码审查 → 外调 `3dgs-code-reviewer` 技能（104 种 bug 模式静态检查）
