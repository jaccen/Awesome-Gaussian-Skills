
---

<div align="center">

<img src="assets/hero.png" width="100%" alt="3D Gaussian Splatting 方法总览">

# Awesome Gaussian Skills

### 最全的 3D Gaussian Splatting 目录 — 700+ 方法，25 类别，交互式浏览器

**你不需要翻 20 个仓库找 3DGS 论文。这是你唯一需要的那个。**

[![Stars](https://img.shields.io/github/stars/jaccen/Awesome-Gaussian-Skills?style=for-the-badge&logo=github&color=FFD700)](https://github.com/jaccen/Awesome-Gaussian-Skills/stargazers)
[![Live Demo](https://img.shields.io/badge/交互式浏览器-在线体验-4caf50.svg)](https://jaccen.github.io/Awesome-Gaussian-Skills/)
[![Methods](https://img.shields.io/badge/方法-700+-9cf.svg)](references/3dgs-methods-overview.md)
[![Skills](https://img.shields.io/badge/AI技能-13-green.svg)](skills/)
[![Bug Patterns](https://img.shields.io/badge/Bug模式-101+-red.svg)](skills/3dgs-code-reviewer/)
[![License](https://img.shields.io/badge/License-Apache%202.0-blue.svg)](LICENSE)
[![PRs Welcome](https://img.shields.io/badge/PRs-Welcome-brightgreen.svg)](CONTRIBUTING.md)

[English](README.md) | [中文](README_CN.md)

</div>

## 为什么选这个仓库？

其他列表只给论文标题。**我们给你论文标题 + 让你更快的AI工具箱。**

| 你的需求 | 其他列表 | 本仓库 |
|----------|----------|--------|
| 浏览论文 | 静态 Markdown 表格 | [交互式浏览器](https://jaccen.github.io/Awesome-Gaussian-Skills/)：搜索、筛选、排序 |
| 对比方法 | 同时打开 2 篇论文对照 | 10+ 维度自动对比 |
| 避免代码 bug | 提交后才发现 | 101+ 已知 bug 模式检测 |
| 设计实验 | 猜基线和消融方案 | 顶会定制实验方案 |
| NeRF → 3DGS | 试错式移植 | 逐步迁移指南 |
| CAD ↔ 3DGS | 无覆盖 | 35+ 方法转换管线 |
| 专利申请 | 从零手写 | 自动生成权利要求与说明书 |

## 在线体验

**[试用交互式方法浏览器 →](https://jaccen.github.io/Awesome-Gaussian-Skills/)**

秒搜 700+ 方法，按类别筛选，按引用排序，点击任意方法卡片查看详情。

## 最新动态（2026 年 7 月）

最新更新（6 月 28 日）：690→700+ 方法，25 类别，101+ bug 模式。**CVPR 2026 代表性论文浪潮**：+**Eulerian GS**（CVPR 2026，梯度优化密化）、+**Energy-GS**（CVPR 2026 Oral，仅 RGB 联合优化）、+**NG-GS**（CVPR 2026 Highlight，NeRF 引导分割）、+**UniSHARP**（CVPR 2026，统一全向 3DGS）、+**RAF**（CVPR 2026 Findings，物理引擎桥接）、+**PDEO**（CVPR 2026，PDE 优化器）、+**Liquid Neural Fields**（连续时间动态）、+**MaterialClusterGS**（调色板 BRDF）、+**Hand-4DGS**（第一人称 4D 手部）、+**GaussianPile**（体积 3DGS 用于 MRI）、+**ProGS**（45× 压缩）、+**BlitzGS**（分布式城市尺度）。23 篇新增。Skills v0.4.0：全部 13 技能已更新。

| 方法 | 发表 venue | 类别 | 核心创新 |
|------|-----------|------|----------|
| **Proxy-GS** | CVPR 2026 Oral | 加速 | 轻量代理模型实现 2.5x 加速，无损精度 |
| **Z-Order GS** | CVPR 2026 Oral | 前馈 | Z-order Morton 曲线 + 稀疏注意力 O(N²)→O(N log N) |
| **3DReflecNet** | CVPR 2026 最佳论文候选 | 跨领域 | 120K+ 物体，48 材质组合，3 种失败模式 |
| **Prune Wisely** | — | 优化 | 90% 高斯剪枝，DoG 重要性准则 |
| **StreamLoD-GS** | — | 流式 | LoD 渐进式流式传输，视点相关质量 |
| **CADDreamer** | CVPR 2025 Highlight | CAD | 文本/草图 → CAD B-rep 生成 |

<sup>完整变更记录：[`changelog/`](changelog/)</sup>

## 快速开始

每个技能是一个独立的 SKILL.md 文件 — 复制到你的 Agent 技能目录即可使用。

**3 条命令开启 AI 驱动的 3DGS 工作流：**

```bash
git clone https://github.com/jaccen/Awesome-Gaussian-Skills.git

# Option 1: Claude Code
cp -r Awesome-Gaussian-Skills/skills/* .claude/

# Option 2: Cursor
cp -r Awesome-Gaussian-Skills/skills/* .cursor/rules/

# Option 3: One-Click Install
curl -sSL https://raw.githubusercontent.com/jaccen/Awesome-Gaussian-Skills/main/scripts/setup.sh | bash
```

然后问你的 Agent：*"对比 3DGS 和 2DGS 的渲染公式差异"*

## 知识库（700+ 方法，25 类别）

| 分组 | 类别 | 关键方向 |
|------|------|----------|
| **核心表示** | 基础、抗锯齿、优化、表面/渲染、图像表示 | 3DGS, 2DGS, Scaffold-GS, Mip-Splatting, GaussianImage |
| **效率与规模** | 压缩、加速、大规模、前馈 | Compact-3DGS, BlitzGS, HiGS, VEDAL, VG²GT |
| **理解与语义** | 语言/语义、生成、自动驾驶 | LangSplat, DreamGaussian, StreetNVS |
| **动态与空间** | 动态、HDR、SLAM、稀疏视角 | DSD-GS, WebSpline, GGD-SLAM, PanoPlane |
| **应用** | 人体/头像、编辑、重光照、CAD、跨领域、仿真、机器人等 14+ 类 | AlbedoEdit, KDH-CAD, LEGS, TIDES, 3DEditSafe |

> 下载完整数据库：[CSV](3dgs-methods-overview.csv) | 完整分析：[references/3dgs-methods-overview.md](references/3dgs-methods-overview.md)

<details>
<summary><strong>完整类别表（25 类别）</strong></summary>

**核心表示**

| 类别 | 说明 | 方法 |
|------|------|------|
| 基础 | 核心 3DGS 表示与基本变体 | 3DGS, 2DGS, Scaffold-GS, Scaffold-GS+, Mip-Splatting, 3DGEER, SNS |
| 抗锯齿 | 抗锯齿与频率感知渲染 | Mip-Splatting, LeanGaussian |
| 优化 | 训练目标、密度控制与收敛 | 3DGS-as-MCMC, 3DGS², AdpSplit, Denoising-GS |
| 表面/渲染 | 渲染公式创新（OIT、RBF 等） | SparseOIT, View-Dependent Splatting, Gaussian Surfel Rendering |
| 图像表示 | 图像级高斯编码 | GaussianImage |

**效率与规模**

| 类别 | 说明 | 方法 |
|------|------|------|
| 压缩/流式 | 轻量化、移动端与渐进式传输 | Compact-3DGS, LightGS, MobileGS, Embedded-3DGS, NanoGS |
| 加速 | 训练与推理加速 | FastGS, Proxy-GS, Faster-GS, GEMM-GS, AV1-3DGS, BlitzGS |
| 大规模 | 城市级与分布式场景管理 | BlitzGS |
| 前馈 | 单次前向传播泛化重建 | Z-Order GS, RoSplat, SplatWeaver, AdaptSplat, VolSplat, VG²GT |

**理解与语义**

| 类别 | 说明 | 方法 |
|------|------|------|
| 语言/语义 | 开放词汇 3D 理解与语言场 | LangSplat, Feature 3DGS, Semantic Foam, ReferSplat, Gaga |
| 生成/文生3D | 文本/条件驱动的 3D 生成 | DreamGaussian, SceneGen-LLMRL, PanoWorld, MORPHOS |
| 自动驾驶 | 驾驶场景重建与仿真 | Real2Sim, ConFixGS, P2GS, GEM, StreetNVS |

**动态与空间**

| 类别 | 说明 | 方法 |
|------|------|------|
| 动态 | 4D 高斯、时序变形与传播 | ParticleGS, 3DGS³, Velox, WebSpline |
| HDR/动态 | HDR 采集与时变光照 | HDR-NSFF, FreeTimeGS++ |
| SLAM | 同步定位与建图 | GaussianSplatting-SLAM-v2, GS-Map-SLAM, 2DGS-SLAM, MAGS-SLAM, ULF-Loc, GGD-SLAM |
| 稀疏视角 | 少视角与稀疏视角重建 | FrameTwin, GeoQuery, VidSplat, PanoPlane |
| 空间智能与世界模型 | 3D 空间推理、世界建模、神经符号 | Holi-Spatial, Spatial-TTT, OpenSpatial, APEIRIA, S2AM3D |

**应用与跨领域**

| 类别 | 说明 | 方法 |
|------|------|------|
| 人体/头像 | 可动画人体与头像重建 | GaussianAvatar, SplattingAvatar, HairGPT, ArtMesh |
| 编辑 | 交互式与文本引导场景编辑 | GaussianEditor, Frosting, AlbedoEdit, TransSplat |
| 重光照 | 可重光照与材质感知高斯 | Relightable-GS-VP, Ambient-Robust IR |
| CAD | CAD 模型拟合与逆向工程 | CADFit, KDH-CAD, CADDreamer, Zero-to-CAD |
| 跨领域 | 多模态融合与域外迁移 | GS-DOT, DiffSoup, LagrangianSplats, SurfFill |
| 仿真 | 物理仿真与代理模型 | GS-Playground, GS-Surrogate, FieryGS |
| 具身智能/机器人 | 抓取、操作、导航与 Sim2Real | GaussianGrasper, GraspSplats, LEGS, RoboSplat |
| 铰接/数字孪生 | 铰接物体交互与数字孪生 | ArtiTwinSplat |
| 鲁棒性 | 野外与退化鲁棒重建 | NRGS, DualSplat, HarmoGS |
| 安全 | 水印嵌入、版权保护与伪造检测 | RDSplat, GuardMarkGS, 3DEditSafe |
| 世界模型 | 3DGS 世界模型与场景预测 | MRO-GWM |
| 事件相机 | 事件相机驱动的 3DGS | TIDES |

</details>

## 13 AI 驱动技能

| # | 技能 | 功能 | 示例 |
|---|------|------|------|
| 1 | [`3dgs-paper-reader`](skills/3dgs-paper-reader/) | 读取任意 3DGS 论文，提取结构化洞见 | "帮我读一下 2401.01345" |
| 2 | [`3dgs-method-compare`](skills/3dgs-method-compare/) | 从 10+ 维度对比变体 | "对比 3DGS 和 2DGS 的渲染公式差异" |
| 3 | [`3dgs-code-reviewer`](skills/3dgs-code-reviewer/) | 检测 101+ 已知 3DGS 实现 bug | "审查我的 CUDA 渲染 kernel" |
| 4 | [`3dgs-experiment-planner`](skills/3dgs-experiment-planner/) | 为 CVPR/SIGGRAPH/TVCG 设计实验 | "帮我设计消融实验" |
| 5 | [`nerf-to-3dgs-migrator`](skills/nerf-to-3dgs-migrator/) | 逐步将 NeRF 方法迁移到 3DGS | "hash encoding 怎么迁移到 3DGS？" |
| 6 | [`cad-mesh-3dgs`](skills/cad-mesh-3dgs/) | 桥接 CAD/Mesh/3DGS — 35+ 转换方法 | "3DGS模型怎么提取高质量mesh？" |
| 7 | [`cg-paper-writing`](skills/cg-paper-writing/) | 为 CVPR/SIGGRAPH/TVCG 写论文，含对抗审稿 | "帮我写论文引言" |
| 8 | [`3dgs-visualizer`](skills/3dgs-visualizer/) | 出版级雷达图、时间线、热力图 | "画一个3DGS方法对比雷达图" |
| 9 | [`3dgs-engineering-guide`](skills/3dgs-engineering-guide/) | 从研究到生产部署 3DGS（10 条行业赛道） | "怎么部署3DGS做自动驾驶仿真？" |
| 10 | [`patent-software-ip`](skills/patent-software-ip/) | 生成专利申请文件与软著登记材料 | "生成专利申请文件" |
| 11 | [`3dgs-spatial-agent`](skills/3dgs-spatial-agent/) | Agent 驱动的 3D 场景推理、CAD 提取与编辑 | "从3DGS中提取椅子的CAD模型" |
| 12 | [`3dgs-mcp-renderer`](skills/3dgs-mcp-renderer/) | MCP 控制的 Three.js/3DGS 渲染桥接 | "从上方看这个场景" |
| 13 | [`3dgs-articulated-reasoner`](skills/3dgs-articulated-reasoner/) | 铰接物体推理与数字孪生 | "打开抽屉" |

兼容 **Claude Code**、**Cursor**、**Windsurf** 及其他 AI Agent 框架。

## 可视化示例

由 `3dgs-visualizer` 生成 — 完整分辨率文件见 [`Test/`](Test/)。

| 雷达图 | 指标柱状图 |
|:---:|:---:|
| <img src="Test/radar_comparison.png" width="380"> | <img src="Test/metrics_bar_comparison.png" width="380"> |

| 质量与速度 | 指标热力图 |
|:---:|:---:|
| <img src="Test/quality_vs_speed_scatter.png" width="380"> | <img src="Test/metrics_heatmap.png" width="380"> |

## 研究创新要点

> 基于知识库 700+ 方法的系统性空白分析生成。
> 目标刊物：TVCG / CGF / CAD / T-RO / IJCV / ACM TOG。

<details>
<summary><strong>I-01. 部件感知 Alpha 合成：铰接物体</strong></summary>

**问题：** 标准 alpha 合成在铰接物体的部件边界处产生颜色渗透。ULF-Loc (CVPR 2026) 暴露了特征偏差，但尚无渲染方程层面的修复方案。

**方法：** 扩展 alpha 合成引入部件感知不透明度调制：C(θ) = Σ Tᵢ · αᵢ · ω_{p(i)}(θ) · cᵢ(θ)，其中 ω 惩罚穿透和关节违规，使部件间穿透区域自动透明。

**路径：** 1) 基于 gsplat 光栅器。2) 添加 FK 层处理铰接物体 (URDF)。3) 通过 SDF 计算穿透/关节违规。4) 在 Articulate-100 上训练。

**目标：** SIGGRAPH / ACM TOG / TVCG
</details>

<details>
<summary><strong>I-02. 几何一致流世界模型：面向操作</strong></summary>

**问题：** 基于流的世界模型 (RoboFlow4D) 预测稠密 3D 流但缺乏几何一致性 — 预测的流可能违反物体刚性和物理约束。

**方法：** 将 3D 流预测与场景图约束耦合：静态物体施加刚性损失、铰接部件施加关节损失、叠放关系施加支撑约束。

**路径：** 1) 扩展 RoboFlow4D。2) 场景图解析器 (OpenMask3D)。3) 几何正则化器。4) 在 LIBERO + RoboCasa 上训练。

**目标：** IJCV / T-RO / RSS
</details>

<details>
<summary><strong>I-03. 多尺度占用-高斯双向桥接：驾驶</strong></summary>

**问题：** 占用预测 (SparseWorld, DOV) 是驾驶世界模型标准；3DGS 提供更优渲染质量。两者之间无可微分桥接。

**方法：** 双向转换：Occ→3DGS（从占用+语义学习位置+尺度预测器）和 3DGS→Occ（可微稀疏卷积池化）。共享主干实现统一预测+渲染。

**路径：** 1) 主干：SparseWorld-TC。2) Occ→3DGS 模块。3) 3DGS→Occ 模块。4) 训练：nuScenes, Waymo。

**目标：** TVCG / T-ITS / CVPR
</details>

<details>
<summary><strong>7 个更多创新要点（I-04 至 I-10）</strong></summary>

- **I-04. 立体几何神经-符号推理**：VLM + Z3/SMT 形式化验证器迭代精炼循环。目标：Pattern Recognition / AAAI。
- **I-05. 具身空间记忆**：海马体启发的 3DGS 场景图 + Perceiver 压缩器 + 重要性加权遗忘。目标：T-RO / IJCV。
- **I-06. 可微物理引擎**：SDF 接触检测 + 可微 KKT 接触求解器 + 库仑摩擦，面向操作。目标：ACM TOG / SIGGRAPH。
- **I-07. 触觉-视觉空间融合**：GelSight → 接触几何图 → 3D 场景投影 → 跨注意力融合。目标：T-RO / ICRA。
- **I-08. 全景空间世界模型**：球形视觉全景 + BEV 语义 + 可供性 + 空间关系图，实现"先想象再导航"。目标：ECCV / CVPR。
- **I-09. 代码即空间词汇**：VLM 生成 Three.js 代码 → 渲染 → 提取空间标注 → 微调 VLM。目标：CVPR / NeurIPS。
- **I-10. 双曲跨模态蒸馏**：Poincare 球蒸馏用于图像→点云层次化特征迁移。目标：T-MM / T-IP。

</details>

## 路线图

- [x] v0.1 — 初始版本，6 个核心技能（2026 年 4 月）
- [x] v0.2 — `3dgs-visualizer` + Text2Word 演示（2026 年 5 月）
- [x] v0.3 — 知识库 675→700+ 方法，25 类别，101+ bug 模式，12 个技能（2026 年 6 月）
- [x] v0.3.7 — 空间智能浪潮：680→700+ 方法，+10 新方法（FastGS, Holi-Spatial, Spatial-TTT 等），第 11 维度，Anthropic 标准对齐（2026 年 6 月 25 日）
- [x] v0.3.7 — CVPR 2026 代表性论文：690→700+ 方法，+23 篇已验证新方法（Eulerian GS, Energy-GS, NG-GS, UniSHARP, RAF, PDEO, Liquid Neural Fields, MaterialClusterGS 等），全部 13 技能更新（2026 年 6 月 28 日）
- [ ] v0.4 — `3dgs-spatial-agent` 增强（知识约束 CAD, DDF-GS 射线查询）
- [ ] v0.5 — MCP 协议集成：Agent 控制的 Three.js/3DGS 渲染管线
- [ ] v1.0 — CI/CD 集成 + 多框架官方收录
- [ ] v2.0 — Agent 间协作（多 Agent 论文讨论）

<sup>完整版本历史：[`changelog/`](changelog/)</sup>

## 项目结构

```
Awesome-Gaussian-Skills/
├── skills/                    # 13 个 AI Agent 技能（SKILL.md 格式）
│   ├── 3dgs-paper-reader/     # 论文阅读与总结
│   ├── 3dgs-method-compare/   # 方法对比引擎
│   ├── 3dgs-code-reviewer/    # 代码审查（101+ bug 模式）
│   ├── 3dgs-experiment-planner/ # 实验设计
│   ├── nerf-to-3dgs-migrator/ # NeRF→3DGS 迁移
│   ├── cad-mesh-3dgs/         # CAD/Mesh/3DGS 桥接
│   ├── cg-paper-writing/      # CG 论文写作助手
│   ├── 3dgs-visualizer/       # 研究可视化
│   ├── 3dgs-engineering-guide/ # 工程化部署
│   ├── patent-software-ip/    # 专利与软著生成
│   ├── 3dgs-spatial-agent/    # 空间智能 Agent
│   ├── 3dgs-mcp-renderer/     # MCP 渲染桥接
│   └── 3dgs-articulated-reasoner/ # 铰接推理与数字孪生
├── docs/                      # GitHub Pages 交互式浏览器
├── references/                # 知识库（700+ 方法，25 类别）
├── scripts/                   # 安装脚本与管线
├── Test/                      # 可视化示例
└── assets/                    # 项目图片
```

每个技能遵循 **SKILL.md 标准**，兼容 **Claude Code**（`.claude/`）、**Cursor**（`.cursor/rules/`）、**Windsurf** 及其他 AI Agent 框架。

## 贡献指南

欢迎贡献！详见 [贡献指南](CONTRIBUTING.md)。

[![Contributors](https://contrib.rocks/image?repo=jaccen/Awesome-Gaussian-Skills&max=24&columns=8)](https://github.com/jaccen/Awesome-Gaussian-Skills/graphs/contributors)

## 引用

```bibtex
@misc{awesome-gaussian-skills,
  author = {jaccen},
  title = {Awesome Gaussian Skills: 3D Spatial Intelligence Open-Source Toolbox for 3D Gaussian Splatting Research},
  year = {2026},
  url = {https://github.com/jaccen/Awesome-Gaussian-Skills}
}
```

## 致谢

- [3D Gaussian Splatting](https://repo-sam.informatik.uni-halle.de/jkortner/gaussian-splatting/) — 奠基性工作
- [awesome-3D-gaussian-splatting](https://github.com/MrNeRF/awesome-3D-gaussian-splatting) — 启发本项目的 awesome 列表
- [Awesome3DGS/3D-Gaussian-Splatting-Papers](https://github.com/Awesome3DGS/3D-Gaussian-Splatting-Papers) — 全面论文合集
- 所有 3DGS 研究者，你们的论文构成了我们的知识库

## 许可证

Apache-2.0。详见 [LICENSE](LICENSE)。

## Star 历史

[![Star History Chart](https://api.star-history.com/svg?repos=jaccen/Awesome-Gaussian-Skills&type=Date)](https://star-history.com/#jaccen/Awesome-Gaussian-Skills&Date)

<div align="center">

**如果这个项目帮你节省了时间，请给一个 Star！**</div>