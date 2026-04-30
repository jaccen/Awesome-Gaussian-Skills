
<div align="center">

# Awesome Gaussian Skills

### 首个面向三维高斯泼溅 (3DGS) 与计算机图形学研究的 AI Agent 技能包

**即插即用的 AI Agent 技能，适配 OpenClaw / Claude Code / Cursor —— 用自然语言完成论文阅读、方法对比、代码审查、实验设计**

[![License: MIT](https://img.shields.io/badge/License-MIT-blue.svg)](LICENSE)
[![Skills](https://img.shields.io/badge/Skills-7-green.svg)](skills/)
[![OpenClaw Compatible](https://img.shields.io/badge/OpenClaw-Compatible-red.svg)]()
[![Claude Code Compatible](https://img.shields.io/badge/Claude_Code-Compatible-orange.svg)]()
[![PRs Welcome](https://img.shields.io/badge/PRs-Welcome-brightgreen.svg)](CONTRIBUTING.md)

[English](README.md) | [中文](README_CN.md)

</div>

---

## 为什么需要这个项目？

3D Gaussian Splatting (3DGS) 是计算机视觉和图形学最活跃的研究方向之一，**自 2023 年以来已发表 500+ 篇论文**。然而，AI Agent 生态中存在一个明显的空白：

> **ClawHub 已有 13000+ 技能，但几乎没有面向三维重建 / 计算机图形学的。**

与此同时，每个 3DGS 研究者都面临相同的重复性工作：

| 痛点 | 频率 |
|------|------|
| 阅读和总结新论文 | 每天 |
| 对比不同方法设计（GS vs 2DGS vs NegGS vs ...） | 每周 |
| 审查实现代码中的 bug | 每次投稿 |
| 设计消融实验 | 每篇论文 |
| 将 NeRF 方法迁移到 3DGS | 每个项目 |

**Awesome Gaussian Skills** 解决所有这些问题 —— 只需用自然语言描述你的需求，AI Agent 会处理剩下的工作。

---

## 特性

- **7 个科研级技能**：论文阅读、方法对比、代码审查、实验设计、NeRF→3DGS 迁移、CAD/Mesh↔3DGS 桥接、CG 论文写作
- **零配置**：纯 SKILL.md 文件 —— 不需要安装 Python 包、不需要依赖、不需要配置。直接放入 Agent 的技能目录即可使用
- **跨平台兼容**：支持 [OpenClaw](https://github.com/openclaw)、Claude Code、Cursor、Windsurf 以及所有支持 SKILL.md / CLAUDE.md 格式的 Agent
- **领域专家知识**：内置知识库覆盖 31 个类别的 100+ 3DGS 变体，含领域术语规范
- **持续维护**：每日更新，跟踪最新 arXiv 论文和社区动态

---

## 快速开始

### 方式一：OpenClaw

```bash
# 克隆仓库
git clone https://github.com/jaccen/Awesome-Gaussian-Skills.git
cd Awesome-Gaussian-Skills

# 复制所有技能到 OpenClaw 技能目录
cp -r skills/* ~/.openclaw/skills/

# 重启 OpenClaw
openclaw restart
```

### 方式二：Claude Code / Cursor

```bash
# 克隆到项目目录
git clone https://github.com/jaccen/Awesome-Gaussian-Skills.git

# 复制所需技能到项目的 CLAUDE.md 目录
cp -r skills/3dgs-paper-reader/SKILL.md .claude/
cp -r skills/3dgs-code-reviewer/SKILL.md .claude/
```

### 方式三：一键安装脚本

```bash
curl -sSL https://raw.githubusercontent.com/jaccen/Awesome-Gaussian-Skills/main/scripts/setup.sh | bash
```

---

## 技能概览

### 1. `3dgs-paper-reader` — 论文阅读与总结

**几秒钟内提取任意 3DGS 论文的结构化洞见。**

```
你: "帮我读一下 2401.01345，总结核心方法和实验结果"
Agent: [提取方法名称、核心创新、架构、训练策略、
       数据集、评估指标和关键发现]
```

**功能：**
- 解析 arXiv 论文（通过 ID 或 URL）和本地 PDF
- 提取方法架构、损失函数、训练细节
- 生成含表格的结构化摘要
- 识别创新点和局限性

### 2. `3dgs-method-compare` — 方法对比引擎

**从 10+ 个维度对比任意 3DGS 变体。**

```
你: "对比 NegGS 和 Scaffold-GS 的核心差异"
Agent: [从基元表示、不透明度处理、颜色机制、频率建模、
       几何边界、训练策略等维度生成对比表]
```

**功能：**
- 多方法并排对比
- 10+ 对比维度（渲染公式、基元、损失、速度等）
- 识别设计权衡
- 内置 100+ 方法的知识库

### 3. `3dgs-code-reviewer` — 代码审查

**在投稿前发现常见的 3DGS 实现缺陷。**

```
你: "审查我的 3DGS CUDA 渲染 kernel"
Agent: [检查 alpha 混合顺序、tile 渲染、CUDA 显存合并、
       梯度计算、已知 bug 模式等]
```

**功能：**
- 审查 CUDA kernel 的正确性和性能
- 检查渲染管线（可微光栅化、alpha 混合）
- 验证损失函数实现
- 常见 bug 模式检测（35+ 已知模式）

### 4. `3dgs-experiment-planner` — 实验设计助手

**设计满足顶会审稿人的严谨实验。**

```
你: "我要写一篇关于高频边界建模的3DGS论文，帮我设计实验"
Agent: [推荐数据集、基线、指标、消融矩阵、
       渲染对比和效率分析方案]
```

**功能：**
- 数据集和基线推荐（根据方法定制）
- 消融实验矩阵设计
- 评估指标选择指导（PSNR/SSIM/LPIPS/FID/CHF 等）
- 效率分析框架
- 论文插图可视化方案

### 5. `nerf-to-3dgs-migrator` — NeRF→3DGS 迁移指南

**通过分步指导将你的 NeRF 方法迁移到 3DGS。**

```
你: "我的 NeRF 方法用了 hash encoding + deformable field，怎么迁移？"
Agent: [提供迁移方案：编码→逐高斯属性、变形→位置/旋转偏移，
       附代码模板]
```

**功能：**
- 组件级迁移分析
- 常见迁移模式的代码模板
- 识别不兼容问题和解决方案
- 性能对比预估

### 6. `cad-mesh-3dgs` — CAD、Mesh 与 3DGS 桥接

**处理 mesh↔3DGS 管线、CAD 逆向工程和表面提取。**

```
你: "我训练了一个3DGS模型，怎么提取高质量的mesh？"
Agent: [推荐 SuGaR 或 2DGS 管线，提供 TSDF 提取步骤、
       Marching Cubes 参数和质量评估代码]
```

```
你: "如何把CAD模型（STEP格式）转换为3DGS表示？"
Agent: [提供 mesh→Gaussian 转换管线、基于网格法线的协方差初始化
       和曲率感知采样方案]
```

**功能：**
- Mesh→3DGS 转换（采样、初始化、优化）
- 3DGS→Mesh 提取（SuGaR、2DGS、TSDF+Marching Cubes）
- CAD 逆向工程管线（mesh→B-rep 通过基元拟合）
- 混合表示分析（MaGS、UniMGS、2DGS）
- 几何质量评估（Chamfer Distance、F-Score、法线一致性）
- 调试常见 mesh-Gaussian 转换问题

### 7. `cg-paper-writing` — CG 论文写作助手

**为 CVPR/ICCV/ECCV/SIGGRAPH/TVCG 撰写可投稿的论文。**

```
你: "帮我写一篇关于 3DGS的论文引言，要和 NegGS 做对比"
Agent: [生成学术引言，包含正确的结构、领域术语和论证逻辑]
```

**功能：**
- 会议特定的写作规范（CVPR vs SIGGRAPH vs TVCG）
- 领域术语数据库（3DGS、NeRF、渲染、几何）
- 去 AI 痕迹处理（移除 AI 写作模式）
- 分节写作（摘要→引言→相关工作→方法→实验→结论）
- 数学符号规范

---

## 项目结构

```
Awesome-Gaussian-Skills/
├── skills/
│   ├── 3dgs-paper-reader/       # 论文阅读与总结
│   │   └── SKILL.md
│   ├── 3dgs-method-compare/     # 方法对比引擎
│   │   └── SKILL.md
│   ├── 3dgs-code-reviewer/      # 3DGS 实现代码审查
│   │   └── SKILL.md
│   ├── 3dgs-experiment-planner/ # 实验设计助手
│   │   └── SKILL.md
│   ├── nerf-to-3dgs-migrator/  # NeRF→3DGS 迁移指南
│   │   └── SKILL.md
│   ├── cad-mesh-3dgs/          # CAD、Mesh 与 3DGS 桥接
│   │   └── SKILL.md
│   └── cg-paper-writing/        # CG 论文写作助手
│       └── SKILL.md
├── references/
│   └── 3dgs-methods-overview.md # 内置知识库（100+ 方法）
├── scripts/
│   └── setup.sh                 # 快速安装脚本
├── README.md
├── README_CN.md
├── CONTRIBUTING.md
└── LICENSE
```

每个技能遵循 **SKILL.md 标准**（YAML frontmatter + Markdown 指令），兼容：

- **OpenClaw**（ClawHub 生态）
- **Claude Code**（`.claude/` 目录）
- **Cursor**（`.cursor/rules/`）
- **Windsurf** 及其他 AI Agent 框架

---

## 涵盖的方法（部分）

| 类别 | 方法 |
|------|------|
| 基础 | 3DGS, 2DGS, Scaffold-GS, Scaffold-GS+, Mip-Splatting |
| 压缩 | Compact-3DGS, LightGS, MobileGS, Embedded-3DGS, NanoGS, OT-UVGS, Gaussians on a Diet, HAC |
| 编辑 | GaussianEditor, GeoGaussian, SketchFaceGS, FluSplat, TransSplat |
| 动态 | 4DGS, Dynamic-3DGS, SC-GS, Deformable-3DGS, RobustSplat |
| 符号/分解 | NegGS, SuGaR |
| 材质/重光照 | GRF, GS-IR, Instant Colorization, GaussianShader |
| 大规模 | CityGaussian, Mega-3DGS, Octree-GS, GeoGaussian, YOGO, Street Gaussians |
| 人体/化身 | GaussianAvatar, GAS, SplattingAvatar, Generalizable Human GS, High-Fidelity Human GS |
| 自动驾驶 | Street-GS, ADS-GS, Asset Harvester |
| 几何 | 2DGS, 2D-Gaussian, FlexiCubes+3DGS, PAGaS, GSCompleter, PGSR |
| CAD / Mesh | SuGaR, MaGS, UniMGS, Vol3DGS, BrepGaussian |
| 鲁棒性 | NRGS, DualSplat |
| SLAM | Gaussian Splatting SLAM, CGS-SLAM, WildGS-SLAM, S3PO-GS, Flow4DGS-SLAM, EvFlow-GS, MAGICIAN, Habitat-GS |
| 前馈 | GlobalSplat, SparseSplat, WildSplatter, TRiGS, Reliev3R, ARGS, Free Geometry, MVSplat, GS-LRM, DepthSplat, InstantSplat, AnySplat |
| 少样本/稀疏视角 | FSGS |
| 野外/鲁棒 | WildGaussians |
| 语言/语义 | LangSplat, Feature 3DGS |
| 生成/文生3D | DreamGaussian |
| 抗锯齿 | Mip-Splatting, LeanGaussian |
| 优化 | 3DGS-as-MCMC |
| 图像表示 | GaussianImage |
| 加速 | Proxy-GS, Faster-GS |
| 主动视觉 | MAGICIAN |
| 仿真 | GS-Playground |
| 实时新视角合成 | 3DTV |
| 跨领域 | GS-DOT |
| 数据采集 | Mobile Phone 3DGS Acquisition |
| 退化感知 | MERID-GS, MarineSTD-GS |
| 系统 | YOGO, GS-SCNet |

> 完整知识库覆盖 **31 个类别的 100+ 方法**的详细技术分析。详见 [`references/3dgs-methods-overview.md`](references/3dgs-methods-overview.md)。

---

## 路线图

- [x] v0.1 — 初始版本，6 个核心技能（2026年4月）
- [x] v0.1.1 — 新增 `cad-mesh-3dgs` 技能，桥接 CAD/Mesh↔3DGS（2026年4月）
- [x] v0.1.2 — 知识库扩展：50→100+ 方法、31 个类别、每日自动更新工作流（2026年4月）
- [ ] v0.2 — 新增 `3dgs-visualizer` 技能（Web 端渲染对比）
- [ ] v0.3 — 新增 `3dgs-benchmark-runner` 技能（自动化基准测试）
- [ ] v1.0 — ClawHub 正式收录 + CI/CD 集成
- [ ] v1.1 — 多语言支持（中文、日文、韩文）
- [ ] v2.0 — Agent 间协作（多 Agent 论文讨论）

---

## 参与贡献

欢迎贡献！请阅读 [贡献指南](CONTRIBUTING.md) 了解详情。

**贡献方式：**
- 为未覆盖的场景添加新技能
- 扩展方法知识库
- 报告问题或提出改进建议
- 分享你的使用案例和成功故事

---

## 引用

如果你在研究中使用了本项目，请考虑引用：

```bibtex
@misc{awesome-gaussian-skills,
  author = {jaccen},
  title = {Awesome Gaussian Skills: AI Agent Skill Pack for 3D Gaussian Splatting Research},
  year = {2026},
  url = {https://github.com/jaccen/Awesome-Gaussian-Skills}
}
```

---

## 致谢

- [3D Gaussian Splatting](https://repo-sam.informatik.uni-halle.de/jkortner/gaussian-splatting/) — 奠基性工作
- [OpenClaw](https://github.com/openclaw) — AI Agent 框架与 Skills 生态
- [awesome-3D-gaussian-splatting](https://github.com/MrNeRF/awesome-3D-gaussian-splatting) — 启发本项目的 awesome 列表
- 所有 3DGS 研究者，你们的论文构成了我们的知识库

---

## 许可证

本项目基于 MIT 许可证开源 —— 详见 [LICENSE](LICENSE) 文件。

---

<div align="center">

**为 3DGS 研究社区用心打造**

</div>

## 一、CV 核心链接

CVF 官方开源库（CVPR/ICCV/ECCV/3DV）：https://openaccess.thecvf.com/

CVPR 2025 全集：https://openaccess.thecvf.com/CVPR2025

ICCV 2025 全集：https://openaccess.thecvf.com/ICCV2025

3DV 2026：https://openaccess.thecvf.com/3DV2026

arXiv CV 最新预印本：https://arxiv.org/list/cs.CV/recent

## 二、CG/渲染核心链接

arXiv CG/图形学专区：https://arxiv.org/list/cs.GR/recent

ACM DL（SIGGRAPH）：https://dl.acm.org/

Eurographics 数字图书馆：https://diglib.eg.org/

RenderHub 渲染论文：https://renderhub.org/

## 三、3DGS/NeRF/三维重建专属

3DGS 官方论文&项目：https://github.com/graphdeco-inria/gaussian-splatting

3DGS 改进论文汇总：https://github.com/limacv/GaussianSplatting-Papers

NerfStudio 论文合集：https://github.com/nerfstudio-project/nerfstudio

CVPR 2025 3D 专题：https://openaccess.thecvf.com/CVPR2025?day=all#3D

SIGGRAPH 2025 预印本：https://arxiv.org/list/cs.GR/2507

Real-Time Rendering 论文库：https://www.realtimerendering.com/

EGSR 渲染顶会：https://diglib.eg.org/handle/10.23730/egsr

## 四、通用检索&国内镜像

谷歌学术：https://scholar.google.com

DBLP 顶会索引：https://dblp.uni-trier.de/

Hugging Face 论文聚合：https://huggingface.co/papers

arXiv 国内镜像：https://arxiv.tmmu.edu.cn/

学术搜素（替代谷歌）：https://xueshuso.com/

论文免费下载神器：https://sci-hub.se

如果这个项目帮你节省了时间，请给一个 Star！


