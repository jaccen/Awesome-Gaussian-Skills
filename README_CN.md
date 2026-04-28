

<div align="center">

# Awesome Gaussian Skills

### 首个面向三维高斯泼溅 (3DGS) 与计算机图形学研究的 AI Agent 技能包

**即插即用的 AI Agent 技能，适配 OpenClaw / Claude Code / Cursor —— 用自然语言完成论文阅读、方法对比、代码审查、实验设计**

[![License: MIT](https://img.shields.io/badge/License-MIT-blue.svg)](LICENSE)
[![Skills](https://img.shields.io/badge/Skills-6-green.svg)](skills/)
[![OpenClaw Compatible](https://img.shields.io/badge/OpenClaw-Compatible-red.svg)]()
[![Claude Code Compatible](https://img.shields.io/badge/Claude_Code-Compatible-orange.svg)]()
[![PRs Welcome](https://img.shields.io/badge/PRs-Welcome-brightgreen.svg)](CONTRIBUTING.md)

[English](README.md) | 中文

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

- **6 个科研级技能**：论文阅读、方法对比、代码审查、实验设计、NeRF→3DGS 迁移、CG 论文写作
- **零配置**：纯 SKILL.md 文件 —— 不需要安装 Python 包、不需要依赖、不需要配置。直接放入 Agent 的技能目录即可使用
- **跨平台兼容**：支持 [OpenClaw](https://github.com/openclaw)、Claude Code、Cursor、Windsurf 以及所有支持 SKILL.md / CLAUDE.md 格式的 Agent
- **领域专家知识**：内置 50+ 3DGS 变体、200+ 篇论文、领域术语规范的知识库
- **持续维护**：每周更新，跟踪最新 arXiv 论文和社区动态

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

### 2. `3dgs-method-compare` — 方法对比引擎

**从 10+ 个维度对比任意 3DGS 变体。**

```
你: "对比 NegGS 和 Scaffold-GS 的核心差异"
Agent: [从基元表示、不透明度处理、颜色机制、频率建模、
       几何边界、训练策略等维度生成对比表]
```

### 3. `3dgs-code-reviewer` — 代码审查

**在投稿前发现常见的 3DGS 实现缺陷。**

```
你: "审查我的 3DGS CUDA 渲染 kernel"
Agent: [检查 alpha 混合顺序、tile 渲染、CUDA 显存合并、
       梯度计算、已知 bug 模式等]
```

### 4. `3dgs-experiment-planner` — 实验设计助手

**设计满足顶会审稿人的严谨实验。**

```
你: "我要写一篇关于高频边界建模的论文，帮我设计实验"
Agent: [推荐数据集、基线、指标、消融矩阵、
       渲染对比和效率分析方案]
```

### 5. `nerf-to-3dgs-migrator` — NeRF→3DGS 迁移指南

**通过分步指导将你的 NeRF 方法迁移到 3DGS。**

```
你: "我的 NeRF 方法用了 hash encoding + deformable field，怎么迁移？"
Agent: [提供迁移方案：编码→逐高斯属性、变形→位置/旋转偏移，
       附代码模板]
```

### 6. `cg-paper-writing` — CG 论文写作助手

**为 CVPR/ICCV/ECCV/SIGGRAPH/TVCG 撰写可投稿的论文。**

```
你: "帮我写一篇关于高频边界建模方法的引言，要和 NegGS 做对比"
Agent: [生成学术引言，包含正确的结构、领域术语和论证逻辑]
```

---

## 涵盖的方法（部分）

| 类别 | 方法 |
|------|------|
| 基础 | 3DGS, 2DGS, Scaffold-GS, Scaffold-GS+ |
| 压缩 | Compact-3DGS, LightGS, MobileGS, Embedded-3DGS |
| 编辑 | GaussianEditor, GeoGaussian, Frosting |
| 动态 | 4DGS, Dynamic-3DGS, SC-GS, Deformable-3DGS |
| 符号/分解 | NegGS, SuGaR |
| 材质/重光照 | GRF, GS-IR, Relightable-3DGS |
| 大规模 | CityGaussian, Mega-3DGS, Octree-GS |
| 人体/化身 | GaussianAvatar, GAS, SplattingAvatar |
| 自动驾驶 | Street-GS, ADS-GS |
| 几何 | 2D-Gaussian, FlexiCubes+3DGS |

> 完整知识库涵盖 **50+ 方法**的详细技术分析。详见 [`references/3dgs-methods-overview.md`](references/3dgs-methods-overview.md)。

---

## 路线图

- [x] v0.1 — 初始版本，6 个核心技能（2026年4月）
- [ ] v0.2 — 新增 `3dgs-visualizer` 技能（Web 端渲染对比）
- [ ] v0.3 — 新增 `3dgs-benchmark-runner` 技能（自动化基准测试）
- [ ] v0.4 — 扩展知识库至 100+ 方法
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

## 许可证

本项目基于 MIT 许可证开源 —— 详见 [LICENSE](LICENSE) 文件。

---

<div align="center">

**为 3DGS 研究社区用心打造**

如果这个项目帮你节省了时间，请给一个 Star！

</div>

> AI生成