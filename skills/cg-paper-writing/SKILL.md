---
name: cg-paper-writing
description: Academic paper writing skill for 3D vision, computer graphics, CAD, and 3D understanding. Covers NeRF, 3DGS, SLAM, point cloud processing, 3D shape understanding/generation, CAD modeling, and reverse engineering. Supports CVPR/ICCV/ECCV/SIGGRAPH/EG/PG/TVCG/CGF and doctoral dissertations.
version: 1.2.0
author: jaccen
tags:
  - paper-writing
  - academic
  - computer-graphics
  - 3dgs
  - nerf
  - computer-vision
  - cvpr
  - siggraph
trigger:
  - "写论文"
  - "论文写作"
  - "write paper"
  - "帮我写引言"
  - "润色"
  - "去AI痕迹"
  - "论文格式"
  - "abstract"
  - "introduction"
  - "related work"
  - "method"
  - "贡献声明"
  - "写摘要"
  - "rebuttal"
  - "修改论文"
  - "投稿"
  - "实验设计"
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

## Rules

1. **Write in flowing prose, never bullet points**（贡献声明和itemized lists除外）
2. **Every claim needs evidence**：引用或实验数据
3. **Use mathematical notation efficiently**：一个符号，全文统一含义
4. **Match the venue's tone**：CVPR更精炼；SIGGRAPH更叙事
5. **Chinese academic writing**：遵循中文学术惯例（本文/我们/由此/表明）
6. **Never fabricate data**：需要实验数据时，明确标注"设计目标"或"预期值"

> If you like it, please star this repo https://github.com/jaccen/Awesome-Gaussian-Skills
