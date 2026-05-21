---
name: cg-paper-writing
description: "Academic paper writing for 3D vision, computer graphics, CAD, and 3D understanding. Covers NeRF, 3DGS, SLAM, point cloud, 3D shape, CAD modeling. Supports CVPR/ICCV/ECCV/SIGGRAPH venues. Multi-agent adversarial review, citation integrity gates, style calibration."
version: 2.0.0
author: jaccen
tags: ["paper-writing", "academic", "computer-graphics", "3dgs", "nerf", "computer-vision", "cvpr", "siggraph", "adversarial-review", "citation-integrity", "style-calibration"]
---

# 三维视觉与计算机图形学论文写作

面向三维重建、计算机图形学、CAD建模、3D理解与生成方向的学术写作辅助，覆盖从摘要到结论的全流程。

## 写作流程

### 摘要（Abstract）

结构：问题 → 不足 → 本文方法（一句话）→ 核心机制（1-2句）→ 实验结果（带数据）。

- 字数：CVPR/ICCV 150-250词；SIGGRAPH 200-300词；博士论文 500-800字
- 禁止：未定义缩写、引用、"we"以外的主语
- 必须包含：方法名称、核心指标数值、对比baseline

英文模板：
```
[Problem context, 1 sentence]
[Specific gap/limitation, 1-2 sentences]
[Our approach name and core idea, 1-2 sentences]
[Key technical mechanism, 1 sentence]
[Main results with numbers, 1-2 sentences]
[Broader impact or implication, 1 sentence]
```

### 引言（Introduction）

标准结构（适用于所有目标会议）：
1. 领域背景 + 该方向建立的基本范式（1段）
2. 已有工作的分类综述 + 各类方法的共性不足（1-2段）
3. 本文动机：从不足中引出研究问题（1段）
4. 本文方法概述：核心思想 + 2-3个关键设计（1段）
5. 实验总结：主要指标 + 对比优势（1段）

英文模板：
```
Paragraph 1: Problem context and importance
Paragraph 2: Existing approaches and their limitations
Paragraph 3: Our insight and high-level approach
Paragraph 4: Technical summary (what we actually do)
Paragraph 5: Contributions (bulleted, 3-4 items)
```

**引言写作禁忌**：
- 不在引言中展开数学公式（最多一个核心公式用于直观说明）
- 不在引言中列举实验细节（具体数字放实验部分）
- 避免通用乐观结尾（"我们相信本研究将推动该领域发展"）

### 相关工作（Related Work）

组织原则：按主题分组，而非按论文逐一罗列。

每个主题段落结构：
1. 该主题的共性方法（2-3句概括）
2. 代表性工作举例（带引用，说明每篇做了什么）
3. **关键**：与本文的区别（最后1-2句）

三维视觉论文常见分组：
- 神经辐射场与新视角合成（NeRF/3DGS及其变体）
- 点云处理与3D理解（分割/配准/检测）
- 3D生成与编辑（文本/图像到3D、形状编辑）
- CAD建模与逆向工程（参数化建模、特征提取）
- 3D场景理解与SLAM（语义重建、位姿估计）
- 高频/边界表达（如有符号方法、频域方法）
- 压缩与加速

英文模板：
```
Group by theme (not by paper):
- Section: "3D Gaussian Splatting and Variants"
- Section: "Neural Implicit Representations"
- Section: "[Your specific sub-area]"
Each section: Narrative flow with citations, not catalog.
End each section with: how existing work differs from yours.
```

### 方法（Methodology）

结构：总体框架图 → 各模块展开。

- 先给出整体pipeline/架构图（图1），后续逐模块引用
- 每个新符号首次出现时必须定义
- 公式编号连续，引用格式：式(1)、式(2)
- 每个模块结尾用1句话总结该模块的作用

英文模板：
```
3.1 Preliminary / Notation
3.2 [Core Component 1]
3.3 [Core Component 2]
3.4 Training / Optimization
3.5 [Implementation Details] (if space)
```

### 实验（Experiments）

必须包含的实验：
1. **数据集**：列出全部数据集，说明训练/测试划分
2. **评估指标**：根据方向选择（见下方各方向指标）
3. **基线对比**：至少包含当前SOTA
4. **消融实验**：逐一验证每个核心模块的贡献

**各方向核心评估指标**：

| 方向 | 核心指标 | 补充指标 |
|---|---|---|
| 新视角合成 | PSNR↑ SSIM↑ LPIPS↓ | FPS、基元数量 |
| 3D形状理解 | mIoU↑ mAcc↑ | F1-score、AUC |
| 3D生成 | FID↓、1-NNA-CD↓、1-NNA-EMD↓ | MMD、COV |
| 点云配准 | RMSE↓、Chamfer距离↓ | RRE、RTE |
| CAD重建 | Chamfer距离↓、F-score↑ | 几何精度 |
| 3D场景理解 | mIoU↑ | 查全率、查准率 |

可选加分项：
- 运行效率对比（FPS、训练时间、内存）
- 可视化对比（定性分析图）
- 不同场景难度（室内/室外、简单/复杂）
- 鲁棒性分析（噪声、遮挡、稀疏视角）

英文模板：
```
4.1 Experimental Setup (datasets, baselines, metrics)
4.2 Main Results (comparison tables)
4.3 Ablation Study (component analysis)
4.4 [Specific Analysis] (e.g., efficiency, generalization)
```

### 贡献声明（Contribution Statement）

好的贡献声明：
1. **具体**：指明技术机制，而非"提出了一种新方法"
2. **可度量**：附带预期指标提升
3. **差异化**：清楚说明与已有工作的区别
4. **诚实**：不夸大效果

模板：
```
- We propose [具体技术] that [具体机制]。Unlike [已有工作] which [局限]，our approach [优势]，achieving [具体结果]。
- We introduce [组件] that enables [能力]。This [具体收益]，as demonstrated by [实验/分析]。
- We conduct extensive experiments on [N] benchmarks，demonstrating [具体成果] over [M] state-of-the-art methods。
```

## 数学符号规范

详细术语对照表与易错点见 [terminology.md](../../references/terminology.md)，以下为速查。

### 3DGS 域符号

| Symbol | Meaning | Standard Usage |
|--------|---------|---------------|
| G | A 3D Gaussian primitive | G_i = (μ_i, Σ_i, c_i, α_i) |
| μ | Mean / center position | μ ∈ R³ |
| Σ | Covariance matrix | Σ = R S Sᵀ Rᵀ, Σ ∈ R³ˣ³ |
| R | Rotation matrix | R ∈ SO(3) |
| S | Scaling matrix | S = diag(s₁, s₂, s₃) |
| α | Opacity | α ∈ [0,1] (standard) |
| c | Color | c = f(SH, direction) |
| SH | Spherical harmonics | Degree 0-3 |
| T | Transmittance | T_i = ∏ⱼ₌₁ⁱ⁻¹ (1 - αⱼ) |

### 通用 CG 符号

| Symbol | Meaning |
|--------|---------|
| π | Projection function |
| J | Jacobian matrix |
| Σ' | 2D projected covariance |
| L | Loss function |
| λ | Loss weight |
| θ | Network parameters |
| Φ | Scene representation |

### 渲染与重建通用术语

| 中文 | 英文 | 备注 |
|---|---|---|
| 新视角合成 | Novel View Synthesis (NVS) | 首字母大写 |
| 三维高斯泼溅 | 3D Gaussian Splatting (3DGS) | 首次出现写全称 |
| 神经辐射场 | Neural Radiance Field (NeRF) | 首次出现写全称 |
| 体密度 | Volume density | σ，勿与opacity混用 |
| 不透明度 | Opacity | α |
| 透射率 | Transmittance | T = ∏(1-α) |
| α合成 | Alpha compositing | 渲染管线核心操作 |
| 运动恢复结构 | Structure from Motion (SfM) | 初始化步骤 |
| 多视角立体视觉 | Multi-View Stereo (MVS) | 传统重建范式 |
| 遮挡关系 | Occlusion | 多视角几何核心问题 |

### CAD与逆向工程术语

| 中文 | 英文 | 备注 |
|---|---|---|
| 边界表示 | Boundary Representation (B-rep) | CAD核心表示 |
| 构造实体几何 | Constructive Solid Geometry (CSG) | 布尔运算建模 |
| 参数化建模 | Parametric modeling | 草图约束→3D |
| 逆向工程 | Reverse engineering | 点云/网格→CAD |
| 自由曲面 | Freeform surface | NURBS/Bézier曲面 |
| 容差分析 | Tolerance analysis | 工程精度 |

### 3D形状理解术语

| 中文 | 英文 | 备注 |
|---|---|---|
| 点云分割 | Point cloud segmentation | 语义/实例/部件级 |
| 点云配准 | Point cloud registration | ICP及其变体 |
| 法线估计 | Normal estimation | 局部几何特征 |
| 形状补全 | Shape completion | 部分观测→完整形状 |
| 3D目标检测 | 3D object detection | 点云/体素/鸟瞰图 |
| 部件分割 | Part segmentation | 按语义部件分解 |

### 3D生成与编辑术语

| 中文 | 英文 | 备注 |
|---|---|---|
| 文本到3D | Text-to-3D | 大模型驱动 |
| 图像到3D | Image-to-3D | 单/多视角 |
| 3D生成模型 | 3D generative model | GAN/Diffusion/Flow |
| 形状编辑 | Shape editing | 变形/风格迁移/局部编辑 |
| 几何先验 | Geometric prior | 深度/法线/表面法 |
| 体素化 | Voxelization | 点云/网格→体素网格 |

### 3D场景理解术语

| 中文 | 英文 | 备注 |
|---|---|---|
| 语义分割 | Semantic segmentation | 逐点/逐面片分类 |
| 实例分割 | Instance segmentation | 区分同类不同个体 |
| 场景重建 | Scene reconstruction | 室内/室外/城市级 |
| SLAM | Simultaneous Localization and Mapping | 实时位姿估计与建图 |
| 深度估计 | Depth estimation | 单目/双目/多目 |
| 鸟瞰图 | Bird's Eye View (BEV) | 自动驾驶常用表示 |
| 场景流 | Scene flow | 3D运动场估计 |

### SLAM与压缩术语

| 中文 | 英文 | 备注 |
|---|---|---|
| 前馈重建 | Feed-forward reconstruction | 单次前向推理，无逐场景优化 |
| 压缩 | Compression / Compact | 减少存储和传输开销 |
| 剪枝 | Pruning | 删除基元 |
| 致密化 | Densification | 增加基元 |
| 分裂 | Split | 大基元→两个小基元 |
| 克隆 | Clone | 复制基元到欠重建区域 |
| 哈希网格上下文 | Hash-grid assisted context | HAC压缩范式 |

## 会议/期刊格式与审稿偏好

### CVPR / ICCV / ECCV

| 维度 | 规范 |
|---|---|
| 页数限制 | 正文8页 + 参考文献（无上限） |
| 格式 | IEEE双栏，LaTeX模板 cvpr.sty |
| 摘要 | 150-250词，禁止引用 |
| 数学风格 | 编号公式，theorem/definition 环境少见 |
| 语言 | 主动语态可接受（"We propose..."） |

审稿倾向与权重：

| 维度 | 权重 | 常见审稿意见 |
|---|---|---|
| 新颖性 | 高 | "与XXX的区别是什么？" |
| 实验充分性 | 高 | "缺少XXX数据集/基线" |
| 定性可视化 | 中高 | "需要更多视觉对比" |
| 写作清晰度 | 中 | "动机不够清晰" |
| 效率分析 | 中 | "推理速度/内存占用？" |

- CVPR 2025：投稿13008篇，录用2878篇（录用率22.1%）
- 附带补充材料（supplementary）常见

### SIGGRAPH / EG / PG

| 维度 | 规范 |
|---|---|
| 页数限制 | Journal Track: ~8页；EG: 10-12页；PG: 8页 |
| 格式 | ACM TOG 格式（SIGGRAPH）；CGF（EG） |
| 摘要 | 200-300词 |
| 数学风格 | 正式定义，lemma/theorem 常见 |
| 语言 | 更叙事化，storytelling style |

审稿倾向与权重：

| 维度 | 权重 | 常见审稿意见 |
|---|---|---|
| 技术深度 | 高 | "数学推导是否严谨？" |
| 理论分析 | 高 | "收敛性/复杂度分析？" |
| 美学质量 | 中高 | "视觉质量是否显著提升？" |
| 方法通用性 | 中 | "能否泛化到其他场景？" |
| 实现细节 | 中 | "超参数敏感性？" |

- 视觉效果和demo video很重要
- 方法需包含算法伪代码

### NeurIPS / AAAI

| 维度 | NeurIPS | AAAI |
|---|---|---|
| 截稿 | 通常5月 | 通常8月 |
| 页数限制 | 正文9页 + 附录 | 正文7页 + 附录 |
| 审稿偏好 | 理论贡献权重高，偏好有理论保证 | 接受范围广，偏好清晰技术贡献 |

### TVCG / CGF / ACM TOG

| 期刊 | 影响因子 | 页数 | 特点 |
|---|---|---|---|
| IEEE TVCG | ~5.2 | 12-18页，无严格限制 | JCGRT格式，覆盖可视化与图形学 |
| CGF | ~2.5 | 10-15页 | EG关联期刊，Wiley出版 |
| ACM TOG | ~6.7（图形学最高） | — | SIGGRAPH/EG论文期刊扩展版 |
| IEEE TPAMI | ~24 | 14页 | 偏重理论，审稿极严 |

### 博士论文注意事项

- 每章需独立成体系，包含本章小结
- 创新点声明需在引言末尾明确列出（编号列表）
- 参考文献100篇以上，近3年文献占60%+
- 实验章节需覆盖至少3个不同场景/数据集
- 格式遵循学校模板，注意封面、摘要的中英文版本

### 常见 Rebuttal 策略

- 新颖性质疑：精确指明技术差异，补充对比实验
- 基线缺失：承认遗漏，补充实验或引用
- 效率质疑：补充FPS/内存/参数量表格

## 引用核查规范

核查每条引用时需验证：
1. 作者姓名拼写（特别注意ü、ö等特殊字符）
2. 标题大小写（论文缩写如NeRF、3DGS需大写）
3. 期刊/会议名称准确
4. 年份、卷号、页码/文章号
5. arXiv预印本是否已被正式会议接收（如已接收需更新引用格式）

**高频事实错误**：
- NegGS 的"负不透明度"→ 实为负颜色（opacity仍为非负）
- 6DGS 标注为arXiv→ 已被ICLR 2025接收
- AH-GS → 作者已撤稿
- Ref-NeRF 第一作者 → Verbin D 而非 Barron J T

## 去AI痕迹规则

**必须删除的 AI 写作模式**：

| AI 模式 | 修正方式 |
|---------|---------|
| "It is worth noting that..." | 直接删除 |
| "Furthermore, ..." / "Moreover, ..." | 直接过渡或删除 |
| "Significantly improves" | 写具体指标："improves PSNR by 1.2 dB" |
| "Effectively addresses" | "addresses"（去掉副词） |
| "Leverages" | "uses" / "employs" / "builds on" |
| "Cutting-edge" / "State-of-the-art" | 引用具体方法 |
| "In this paper, we propose a novel..." | "This paper proposes..." |
| 三段式排比（A, B, and C） | 变换句式 |
| **粗体强调**（非术语） | 仅用于术语的斜体 |
| 破折号过多 | 改写为独立句子 |
| "To the best of our knowledge" | 除非确实首次，否则删除 |
| 通用乐观结尾 | 以具体发现或开放问题结尾 |
| "值得注意的是" | 直接删除 |
| "不可或缺" / "至关重要" | 用 "需要" 或 "是...的关键" |

**标准学术用语（保留）**：
- "本文提出" / "This paper proposes"
- "由此" / "Consequently"
- "与之配套" / "Coupled with"
- "实验结果表明" / "Experimental results show"
- "基于...的观察" / "Motivated by the observation that..."

## 资源

### references/（项目根目录）

- [terminology.md](../../references/terminology.md) — 详细术语对照表与易错点
- [venues.md](../../references/venues.md) — 各会议/期刊的格式要求与审稿偏好
- [baselines.md](../../references/baselines.md) — 各方向主流基线方法与核心指标
- [experiments.md](../../references/experiments.md) — 标准实验设计与常见数据集配置
- [cad-3d.md](../../references/cad-3d.md) — CAD/3D方向术语、基线与数据集

### 2025-2026 近期重要论文（引用参考）

| Venue | Method | ArXiv | 核心贡献 |
|-------|--------|-------|----------|
| SIGGRAPH 2026 | Structure-Aware Densification | 2604.28016 | Frequency-aware anisotropic splitting，替代vanilla 3DGS的均匀split策略 |
| ICLR 2026 | FieryGS | 2605.00177 | Physics-integrated fire synthesis，将火焰动力学融入Gaussian渲染 |
| ICML 2026 Spotlight | SplAttN | 2605.01466 | Gaussian soft splatting for point cloud understanding |
| CVPR 2026 | GLMap | 2605.01736 | Gaussian-Language Map，语言引导的Gaussian场景表示用于导航 |
| CVPR 2026 Findings | Softmax-GS | 2604.27437 | Softmax competition rendering，替代α-compositing混合机制 |
| SIGGRAPH 2026 | LeGS | 2605.00408 | RL-based density control，替代heuristic clone/split/prune |
| CVPR 2026 | 2D-SuGaR | 2605.00569 | Surface-aware 2DGS with depth/normal priors，改进表面提取质量 |
| arXiv 2026 | GETA-3DGS | 2605.02086 | Joint pruning + quantization for 3DGS compression |
| arXiv 2026 | GOR-IS | 2605.00498 | Intrinsic decomposition editing for Gaussian scenes |

## 多Agent协同与对抗审稿机制

### 写作流水线Agent分工

论文写作按阶段分配角色，每个阶段产出需经下一阶段验证后才可推进：

| 阶段 | 角色 | 职责 | 产出 |
|------|------|------|------|
| Phase 1 | 结构规划师 | 根据目标venue确定论文结构、section分配、字数预算 | STRUCTURE_PLAN.md |
| Phase 2 | 文献审核员 | 验证Related Work引用准确性与完整性 | REF_VERIFICATION.md |
| Phase 3 | 方法论撰写者 | 按结构撰写Methodology，确保符号一致 | method_draft.md |
| Phase 4 | 实验分析师 | 撰写实验，验证数据与声明一致 | experiment_draft.md |
| Phase 5 | 对抗审稿人 | 以审稿人视角攻击论文弱点 | ADVERSARIAL_REPORT.md |
| Phase 6 | 修订编辑 | 基于对抗报告修订，标注每处修改 | revision_diff.md |
| Phase 7 | 终审校对 | 最终一致性检查 | FINAL_CHECKLIST.md |

### 对抗审稿协议（Devil's Advocate Protocol）

对抗审稿人必须严格遵循以下协议，防止AI讨好倾向(sycophancy)和frame-lock：

**1. 让步阈值协议（Concession Threshold）**

对抗审稿人对论文发起攻击后，如果作者（或用户）提出反驳：
- 反驳前必须对反驳力度打分（1-5）
- 得分≥4：反驳直接针对攻击核心且有证据 → 允许让步
- 得分≤3：攻击仍然成立 → 维持原攻击立场，重述攻击要点
- 禁止连续让步：同一论点不得连续2次让步
- 让步率追踪：单轮审稿让步率>50%视为sycophancy警告

**2. Frame-Lock检测**

每轮审稿后自检：
- 攻击是否停留在原始框架内？（仅质疑论据，不质疑前提）
- 是否存在未被挑战的根本假设？
- 如发现frame-lock，自动注入元问题："我们是否在讨论正确的问题？"

**3. 对抗审稿审稿维度清单**

| 维度 | 审稿问题 | 权重 |
|------|---------|------|
| 新颖性 | 与XXX的核心技术差异是什么？能否用一句话说清？ | 高 |
| 理论完整性 | 数学推导是否存在跳步？假设是否显式列出？ | 高 |
| 实验可信度 | 消融实验是否验证了每个核心模块？基线是否为当前SOTA？ | 高 |
| 声明-证据对齐 | 贡献声明中的每条claim是否有对应实验支撑？ | 中高 |
| 符号一致性 | 同一符号在全文中是否严格保持同一含义？ | 中 |
| 写作清晰度 | 动机链是否连贯？读者能否在不看图的情况下复现？ | 中 |

---

## 引用完整性与声明-引用一致性门控

### 引用三层验证（Citation Three-Layer Verification）

对论文中每条引用执行三层验证，任何一层失败都不可直接使用该引用：

**Layer 1: 存在性验证**
- arXiv ID是否真实存在？（通过arXiv API或Semantic Scholar验证）
- DOI是否可解析？
- 作者-标题-venue三元组是否匹配？

**Layer 2: 声明-引用对齐验证（Claim-Faithfulness Audit）**
- 每条引用必须标注其支撑的具体claim
- 对每条claim验证：被引文献是否确实支持该claim？
- 常见违规模式：
  - 引用存在但内容与claim不符（"张冠李戴"）
  - 引用仅部分支撑claim但被描述为完全支撑
  - 原文使用限定语（"may"/"in some cases"）但引用时变为断言

**Layer 3: 引用时效与venue验证**
- arXiv预印本是否已被正式会议接收？如是，必须更新引用格式
- 引用的方法是否为该方向当前SOTA？如不是，需说明引用理由
- 3DGS领域高频事实错误（见上方"引用核查规范"）是否已规避？

### Integrity Gate机制

论文写作流程中设置两个不可跳过的完整性检查门控：

**Gate 1: 写作完成门控（Post-Draft Gate）**
必须在提交初稿前通过：
- [ ] 全部引用通过三层验证
- [ ] 贡献声明每条claim有对应实验/分析支撑
- [ ] 消融实验覆盖全部核心模块
- [ ] 符号表与正文一致
- [ ] 无AI捏造数据（缺失数据标注`<!-- DATA_NEEDED: <描述> -->`）

**Gate 2: 终稿提交门控（Pre-Submission Gate）**
必须在提交终稿前通过：
- [ ] 对抗审稿报告中全部HIGH/CRITICAL问题已处理
- [ ] 引用三层验证零失败
- [ ] 实验数据与正文声明完全一致
- [ ] 格式符合目标venue要求（页数/模板/引用格式）
- [ ] Rebuttal预案已准备（针对预期审稿质疑）

### 声明-引用对齐模板

```
Claim: [具体声明]
Supported by: [引用1, 引用2]
Verification: [通过/Layer2违规-原因]
```

违规处理：
- Layer 2违规 → 删除该claim或更换正确引用
- 无法找到支撑引用 → 标注`<!-- NEEDS_CITATION: <描述所需引用的具体内容> -->`
- 不得用不相关引用"凑数"

---

## 风格校准

### 写作风格学习协议（Style Calibration）

当用户提供过往写作样本时，执行以下风格学习流程：

**Step 1: 提取风格特征**
从用户样本中分析：
- 句子平均长度与方差
- 被动语态使用频率
- 第一人称使用偏好（"We"/"This paper"/"Our method"）
- 过渡词偏好（"Consequently"/"Thus"/"As a result"）
- 数学表达密度（每段公式数量）
- 段落结构模式（论点-论据-小结 / 直接陈述）

**Step 2: 生成风格画像（Style Profile）**
```
style_profile:
  avg_sentence_length: [值] words
  passive_ratio: [值]%
  first_person_preference: "We" / "This paper" / mixed
  transition_preference: [top-3]
  math_density: low/medium/high
  paragraph_pattern: [模式]
  domain_specific_phrases: [列表]
```

**Step 3: 应用风格约束**
- 后续写作严格遵循提取的风格画像
- 每3段自检：当前输出是否符合风格画像
- 如偏离>2个维度，自动修正

### 写作质量检查（Writing Quality Check）

检测并消除以下AI写作痕迹模式：

| AI痕迹模式 | 检测方法 | 修正策略 |
|-----------|---------|---------|
| 三段式排比（A, B, and C） | 连续3句结构相同 | 变换中间句式 |
| 过度使用"Furthermore/Moreover" | 出现频率>2次/页 | 替换为直接过渡或删除 |
| "Significantly improves"无数据 | 检查后是否跟数字 | 补充具体指标 |
| 通用乐观结尾 | 末段无具体发现 | 以开放问题或具体limitation结尾 |
| 引用堆砌 | 单句>3条引用且未逐条说明 | 逐条说明每篇的贡献 |
| "It is worth noting that" | 字符串匹配 | 直接删除 |
| 破折号过多 | 单段>2个em-dash | 改写为独立句子 |
| 粗体非术语强调 | regex检测 | 仅保留术语的斜体 |
| Hollow superlatives | "effectively"/"seamlessly" | 删除或替换为事实陈述 |

---

## 持久化知识库支持

### 写作上下文持久化

在论文写作过程中，以下信息应持久化存储以便跨session复用：

**文件结构**：
```
项目目录/
├── .paper-context/
│   ├── style_profile.md        # 风格画像
│   ├── symbol_table.md         # 符号定义表
│   ├── ref_registry.md         # 引用登记簿（含三层验证状态）
│   ├── claim_evidence_map.md   # 声明-证据映射
│   ├── adversarial_log.md      # 对抗审稿历史
│   └── gate_status.md          # 门控通过状态
```

**跨session恢复协议**：
1. 每次写作session开始时，自动加载`.paper-context/`下的全部文件
2. 读取`gate_status.md`确认当前进度和未通过项
3. 基于`adversarial_log.md`继续处理上次未解决的审稿问题
4. 基于`symbol_table.md`确保符号一致性不受session切换影响
5. 基于`ref_registry.md`避免重复验证已通过的引用

**引用登记簿格式**：
```
| ID | 引用 | 支撑的Claim | Layer1 | Layer2 | Layer3 | 状态 |
|----|------|------------|--------|--------|--------|------|
| R1 | Kerbl et al. 2024 | 3DGS实时渲染 | PASS | PASS | PASS | VERIFIED |
| R2 | XXX | [...] | PASS | FAIL-张冠李戴 | - | NEEDS_FIX |
```

---

## Rules

1. **Write in flowing prose, never bullet points**（贡献声明和itemized lists除外）
2. **Every claim needs evidence**：引用或实验数据，且引用必须通过三层验证
3. **Use mathematical notation efficiently**：一个符号，全文统一含义，符号表持久化
4. **Match the venue's tone**：CVPR更精炼；SIGGRAPH更叙事；如提供风格样本则严格校准
5. **Chinese academic writing**：遵循中文学术惯例（本文/我们/由此/表明）
6. **Never fabricate data**：需要实验数据时，标注`<!-- DATA_NEEDED: <描述> -->`而非捏造
7. **Integrity gates不可跳过**：Post-Draft Gate和Pre-Submission Gate必须全部通过
8. **对抗审稿必须遵循让步阈值协议**：防止sycophancy和frame-lock
9. **声明-引用对齐**：每条claim必须可追溯到支撑引用，引用必须确实支持该claim
10. **写作上下文持久化**：跨session保持符号、引用、审稿状态的一致性

> If you like it, please star this repo https://github.com/jaccen/Awesome-Gaussian-Skills
