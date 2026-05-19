<div align="center">

# Awesome Gaussian Skills

### 最全面的 3DGS 方法知识库与 AI Agent 工具集

If you like it, please ⭐️ star this repo!

**523+ 3DGS 方法编目，含交互式浏览器、代码审查与 AI 驱动的研究工具**

[![Stars](https://img.shields.io/github/stars/jaccen/Awesome-Gaussian-Skills?style=for-the-badge&logo=github&color=FFD700)](https://github.com/jaccen/Awesome-Gaussian-Skills/stargazers)
[![Forks](https://img.shields.io/github/forks/jaccen/Awesome-Gaussian-Skills?style=for-the-badge&logo=github&color=4FC3F7)](https://github.com/jaccen/Awesome-Gaussian-Skills/network/members)
[![Contributors](https://img.shields.io/github/contributors/jaccen/Awesome-Gaussian-Skills?style=for-the-badge&color=22C55E)](https://github.com/jaccen/Awesome-Gaussian-Skills/graphs/contributors)
[![Last Commit](https://img.shields.io/github/last-commit/jaccen/Awesome-Gaussian-Skills?style=for-the-badge&color=F97316)]()

[![Live Demo](https://img.shields.io/badge/在线演示-Live_Demo-4caf50.svg)](https://jaccen.github.io/Awesome-Gaussian-Skills/)
[![Try Demo Now](https://img.shields.io/badge/立即体验-Now-2196F3.svg?logo=github)](https://jaccen.github.io/Awesome-Gaussian-Skills/)
[![License](https://img.shields.io/badge/License-Apache%202.0-blue.svg)](LICENSE)
[![Skills](https://img.shields.io/badge/Skills-10-green.svg)](skills/)
[![OpenClaw Compatible](https://img.shields.io/badge/OpenClaw-Compatible-red.svg)]()
[![Claude Code Compatible](https://img.shields.io/badge/Claude_Code-Compatible-orange.svg)]()
[![PRs Welcome](https://img.shields.io/badge/PRs-Welcome-brightgreen.svg)](CONTRIBUTING.md)

[English](README.md) | [中文](README_CN.md)

</div>

## 本月新增 (2026年5月)

过去30天新增25篇方法——516+ → 523+ 方法, 63+ bug 模式。每日arXiv持续追踪。

| 方法 | ArXiv | 类别 | 一句话创新 |
|------|-------|------|-----------|
| **HarmoGS** | [2605.13073](https://arxiv.org/abs/2605.13073) | 鲁棒性 | 梯度冲突感知调和解决in-the-wild 3DGS |
| **ULF-Loc** | — | SLAM | 无偏地标特征修复alpha混合偏差 (CVPR 2026 Highlight) |
| **AdaptSplat** | — | 前馈 | 视觉基础模型适配用于前馈3DGS |
| **PointForward** | — | 前馈 | 锚点对齐前馈驾驶场景3DGS重建 |
| **3DGS³** | — | 加速 | 联合超采样+帧插值实现大规模实时3DGS渲染 |
| **TransmissiveGS** | — | 跨领域 | 残差引导解耦GS处理透射场景 |
| **NIRRGB-GS** | — | 退化感知 | 近红外辅助暗光3DGS (AISY 2026) |
| **Learn2Splat** | [2605.15760](https://arxiv.org/abs/2605.15760) | 优化 | 元学习优化器替代Adam/SGD，长程稳定无退化（Geiger组） |
| **EndoGSim** | [2605.16022](https://arxiv.org/abs/2605.16022) | 医学 | MLLM+4DGS+可微MPM内窥镜物理仿真 (MICCAI 2026) |
| **3DEditSafe** | [2605.15398](https://arxiv.org/abs/2605.15398) | 安全 | 首个3D编辑安全正则化，抑制NSFW语义传播 |
| **Robust Prior-Guided Seg.** | [2605.16065](https://arxiv.org/abs/2605.16065) | 编辑 | SAM-HQ先验引导3DGS分割 (ICIP 2026) |
| **SNS** | [2605.15010](https://arxiv.org/abs/2605.15010) | 基础 | Skew-Normal 非对称基元，连续插值高斯↔半高斯 |
| **SplatWeaver** | [2605.07287](https://arxiv.org/abs/2605.07287) | 前馈 | 基数专家路由，-30%高斯预算，+1.02 dB |
| **MGS** | [2603.19234](https://arxiv.org/abs/2603.19234) | 压缩 | Matryoshka 连续 LoD，单次训练任意精度 |
| **Denoising-GS** | [2605.14880](https://arxiv.org/abs/2605.14880) | 优化 | 将3DGS优化重构为空间去噪 |
| **AdpSplit** | [2605.06876](https://arxiv.org/abs/2605.06876) | 优化 | 误差驱动自适应分裂，训练加速9–22% |
| **OCH3R** | [2605.13018](https://arxiv.org/abs/2605.13018) | 跨领域 | 单RGB全息3D重建，逐物体高斯 |
| **ConFixGS** | [2605.09688](https://arxiv.org/abs/2605.09688) | 自动驾驶 | 扩散先验修复前馈3DGS，+3.68 dB |
| **BlitzGS** | [2605.13794](https://arxiv.org/abs/2605.13794) | 大规模 | 分布式GPU分片，城市级3DGS |
| **Z-Order GS** | [2605.13465](https://arxiv.org/abs/2605.13465) | 前馈 | Z序空间连贯排列 (CVPR 2026 Oral) |
| **Real2Sim** | [2605.13591](https://arxiv.org/abs/2605.13591) | 仿真 | 4DGS + 可微MPM物理感知AD仿真 |
| **SparseOIT** | [2605.13855](https://arxiv.org/abs/2605.13855) | 渲染 | 顺序无关透明，解决玻璃/折射场景 |
| **GuardMarkGS** | [2605.12919](https://arxiv.org/abs/2605.12919) | 安全 | 首个统一水印+编辑阻止框架 |
| **SCOUP** | [2605.13600](https://arxiv.org/abs/2605.13600) | 语义 | 语言-GS训练加速400倍 |
| **AV1-3DGS** | [2605.14629](https://arxiv.org/abs/2605.14629) | 加速 | AV1运动向量，训练提速63% |

<sup>完整变更记录: [`changelog/`](changelog/)</sup>

> 知识库经多源交叉验证维护。发现错误？[提交 Issue](https://github.com/jaccen/Awesome-Gaussian-Skills/issues/new)。

## 为什么需要这个项目？

你不应该为每篇新3DGS论文重新搭建相同的RAG管线，或手动在10个维度上对比20个变体，或投稿后才发现CUDA kernel有已知bug。

**2023年以来已有523+篇3DGS论文，研究人员在AI Agent几秒就能完成的任务上浪费数小时。** 然而ClawHub 13,000+技能中几乎为零覆盖3D重建/计算机图形学。

**Awesome Gaussian Skills** 是一套零配置工具——复制技能文件，你的AI Agent就能读论文、比方法、审代码、设计实验、写论文、生成知识产权文档，且内置523+方法的领域知识。

| 你做的事 | 没有本项目 | 有本项目 |
|----------|-----------|---------|
| 读新论文 | 30–60分钟手翻 | 几秒出结构化摘要 |
| 对比GS变体 | 手工搭对比表 | 10+维度自动对比 |
| 审查3DGS代码 | 漏掉已知bug模式 | 63+模式自动检测 |
| 设计实验 | 猜基线和消融 | 顶会定制实验方案 |
| NeRF→3DGS迁移 | 试错式移植 | 逐步迁移指南 |

## 特性

- **523+ 方法知识库**：最全面的 3DGS 变体编目，涵盖 25 个类别，含 arXiv ID、发表 venue、核心创新与代码链接。每日更新。
- **交互式浏览器**：[立即体验](https://jaccen.github.io/Awesome-Gaussian-Skills/) — 按类别筛选、按引用排序、点击卡片查看详情
- **10 个科研级技能**（进阶）：AI Agent 技能——论文阅读、方法对比、代码审查，适配 OpenClaw、Claude Code、Cursor
- **零配置**：纯 Markdown 文件，无需依赖
- **持续维护**：每日 arXiv 跟踪

## 知识库（523+ 方法）

**核心表示**

| 类别 | 说明 | 方法 |
|------|------|------|
| 基础 | 核心3DGS表示与基本变体 | 3DGS, 2DGS, Scaffold-GS, Scaffold-GS+, Mip-Splatting, 3DGEER, SNS |
| 抗锯齿 | 抗锯齿与频率感知渲染 | Mip-Splatting, LeanGaussian |
| 优化 | 训练目标、密度控制与收敛 | 3DGS-as-MCMC, 3DGS², AdpSplit, Denoising-GS |
| 表面/渲染 | 渲染公式创新（OIT、RBF等） | SparseOIT |
| 图像表示 | 图像级高斯编码 | GaussianImage |

**效率与规模**

| 类别 | 说明 | 方法 |
|------|------|------|
| 压缩/流式 | 轻量化、移动端与渐进式传输 | Compact-3DGS, LightGS, MobileGS, Embedded-3DGS, NanoGS, OT-UVGS, Gaussians on a Diet, HAC, MesonGS++, CAGS, PD-4DGS, MGS |
| 加速 | 训练与推理加速 | Proxy-GS, Faster-GS, GEMM-GS, AV1-3DGS, BlitzGS, 3DGS³ |
| 大规模 | 城市级与分布式场景管理 | BlitzGS |
| 前馈 | 单次前向传播泛化重建 | Z-Order GS, RoSplat, SplatWeaver, AdaptSplat, PointForward |

**理解与语义**

| 类别 | 说明 | 方法 |
|------|------|------|
| 语言/语义 | 开放词汇3D理解与语言场 | LangSplat, Feature 3DGS, Semantic Foam, NG-GS, ReferSplat, SCOUP |
| 生成/文生3D | 文本/条件驱动的3D生成 | DreamGaussian, SceneGen-LLMRL |
| 自动驾驶 | 驾驶场景重建与仿真 | Real2Sim, ConFixGS |

**动态与空间**

| 类别 | 说明 | 方法 |
|------|------|------|
| 动态 | 4D高斯、时序变形与传播 | ParticleGS, 3DGS³, Velox, RetroNVS |
| HDR/动态 | HDR采集与时变光照 | HDR-NSFF, FreeTimeGS++ |
| SLAM | 同步定位与建图 | 2DGS-SLAM, MAGS-SLAM, ULF-Loc |
| 稀疏视角 | 少视角与稀疏视角重建 | FrameTwin, GeoQuery, VidSplat, PanoPlane |

**应用与跨领域**

| 类别 | 说明 | 方法 |
|------|------|------|
| 人体/头像 | 可动画人体与头像重建 | GaussianAvatar, GAS, SplattingAvatar, Generalizable Human GS, HumanSplatHMR, D-Rex, DelightingFace, HairGPT |
| 编辑 | 交互式与文本引导场景编辑 | GaussianEditor, GeoGaussian, Frosting, SketchFaceGS, FluSplat, TransSplat, SVGS (Edit), VIRGi, GOR-IS, FaceParts, Robust Prior-Guided Seg. |
| 重光照 | 可重光照与材质感知高斯 | Relightable-GS-VP |
| CAD | CAD模型拟合与逆向工程 | CADFit |
| 跨领域 | 多模态融合与域外迁移 | GS-DOT, DiffSoup, FTSplat, IRIS, SplAttN, Fake3DGS, RGS, RESPIRE, LagrangianSplats, PG-3DGS, OCH3R, TransmissiveGS |
| 仿真 | 物理仿真与代理模型 | GS-Playground, GS-Surrogate, FieryGS |
| 具身智能/机器人 | 机器人抓取、操作、导航与Sim2Real | GaussianGrasper, GraspSplats, ManiGaussian, GSMem, RoboSplat, VR-Robo, GSDrive |
| 主动视觉 | 主动视角选择与下一最优视角 | MAGICIAN |
| 实时新视角合成 | 实时新视角合成系统 | 3DTV |
| 数据采集 | 采集协议与手机端采集 | Mobile Phone 3DGS Acquisition |
| 鲁棒性 | 野外与退化鲁棒重建 | NRGS, DualSplat, EnerGS, FreeFix, Luminance-GS++, HarmoGS |
| 退化感知 | 恶劣天气、水下与低质量输入 | MERID-GS, MarineSTD-GS, E2EGS, NIRRGB-GS |
| 系统 | 全系统设计与硬件协同设计 | YOGO, GS-SCNet |
| 安全 | 水印嵌入、版权保护与伪造检测 | RDSplat, GuardMarkGS, 3DEditSafe |

> 完整知识库覆盖 **25 个类别的 523+ 方法**的详细技术分析。详见 [`references/3dgs-methods-overview.md`](references/3dgs-methods-overview.md)。

下载完整数据库 CSV：[`3dgs-methods-overview.csv`](3dgs-methods-overview.csv)

> **无需安装** — [立即体验交互式方法浏览器](https://jaccen.github.io/Awesome-Gaussian-Skills/)，秒搜 523+ 方法。

## 快速开始

每个技能是一个独立的 SKILL.md 文件 — 复制到你的 Agent 技能目录即可使用。无需依赖，无需构建。

**3条命令开启AI驱动的3DGS工作流：**

```bash
git clone https://github.com/jaccen/Awesome-Gaussian-Skills.git
cp -r Awesome-Gaussian-Skills/skills/* ~/.openclaw/skills/   # 或 .claude/ 用于 Claude Code
openclaw restart   # 然后问："对比3DGS和2DGS的渲染公式"
```

### 方式一：OpenClaw

```bash
# 复制所有技能到 OpenClaw 技能目录
cp -r skills/* ~/.openclaw/skills/
openclaw restart
```

### 方式二：Claude Code / Cursor

```bash
# 复制所需技能到项目的 .claude/ 目录
cp skills/3dgs-paper-reader/SKILL.md .claude/
cp skills/3dgs-code-reviewer/SKILL.md .claude/
```

### 方式三：一键安装脚本

```bash
curl -sSL https://raw.githubusercontent.com/jaccen/Awesome-Gaussian-Skills/main/scripts/setup.sh | bash
```

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
- 内置 523+ 方法的知识库

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
- 常见 bug 模式检测（63+ 已知模式）

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

### 8. `3dgs-visualizer` — 研究可视化

**为 3DGS 研究生成出版级图表：雷达图、对比表和方法时间线。**

```
你: "画一个雷达图对比 3DGS、2DGS 和 NegGS 在各维度的表现"
Agent: [生成 7 维雷达图：渲染质量、速度、内存、几何质量、
        可扩展性、易用性、创新性]
```

```
你: "生成3DGS领域的时间线演进图，从2023年到2026年"
Agent: [创建按类别分道的时间线，展示 40+ 方法，节点大小
        按引用量加权]
```

**功能：**
- 雷达图：多维方法对比（7 个默认维度，可自定义）
- 可视化性能/效率对比表（最佳/次佳高亮标注）
- 方法演进时间线（25 个类别分道，引用量加权节点）
- 双输出：静态图（PDF/PNG，matplotlib/seaborn）+ 交互式 HTML（plotly）
- 3 个预设模板：领域全景概览、类别深度分析、论文投稿图表包
- 出版级样式：Okabe-Ito 色盲安全调色板

### 9. `3dgs-engineering-guide` — 工程化部署指南

**从学术研究到生产部署，桥接3DGS的工程化鸿沟。**

```
你: "我要把3DGS用在自动驾驶仿真中，应该选什么工具链？"
Agent: [分析应用场景，推荐 aiSim 6 / CARLA+3DGS 管线，
        关联相关论文（GSDrive、GS-Playground），
        提醒传感器仿真保真度要求]
```

**功能：**
- 10大行业落地赛道（自动驾驶、数字孪生、文博、影视游戏、电商、工业巡检、AR/VR、BIM、机器人、军事仿真）
- 5层工程技术栈（采集→重建→后处理→部署→集成）
- 工具选型决策树（按场景/平台/规模）
- 跨平台部署指南（CUDA/Vulkan/WebGPU/移动端）
- 工程化最佳实践与常见避坑

### 10. `patent-software-ip` — 专利与软著生成

**从研究项目代码/设计文档出发，生成专利申请文件与软件著作权登记材料。**

```
你: "帮我的3DGS大场景重建项目生成专利申请文件"
Agent: [扫描项目代码与文档，检索现有技术，
        生成权利要求书、说明书、摘要，
        含脱敏处理与自检]
```

```
你: "我要给这个工具申请软件著作权，帮我准备材料"
Agent: [生成软件说明书（10-15页含截图占位）
        和源代码文档（前后各30页），
        符合CPCC登记格式]
```

**能力：**
- 双路径工作流：专利申请（权利要求书+说明书+摘要）与软著登记（说明书+源代码文档）
- 现有技术检索与差异化分析
- 权利要求书撰写（独立+从属权利要求结构）
- 说明书完整实施方式与脱敏处理
- 软著说明书遵循CPCC格式（10-15页，6+截图）
- 源代码文档格式化（每页50+行，敏感信息清除）
- 内部自检：一致性、充分性、合规性

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
│   ├── 3dgs-visualizer/        # 研究可视化（雷达图、对比表、时间线）
│   │   └── SKILL.md
│   ├── cg-paper-writing/        # CG 论文写作助手
│   │   └── SKILL.md
│   ├── 3dgs-engineering-guide/   # 工程化部署指南
│   │   └── SKILL.md
│   └── patent-software-ip/       # 专利与软著生成
│       └── SKILL.md
├── Text2Word/                # 交互式文生3DGS Web演示
│   └── index.html
├── references/
│   ├── 3dgs-methods-overview.md # 索引（25 个类别 523+ 方法）
│   ├── methods-core.md         # 核心方法（基础→动态）
│   ├── methods-semantic-editing.md # 语义、编辑、材质、头像
│   └── methods-systems-apps.md # 系统、应用、跨领域
├── scripts/
│   └── setup.sh                 # 快速安装脚本
├── Test/
│   ├── radar_comparison.pdf/png/html       # 雷达图：3DGS vs 2DGS vs Mip-Splatting vs Scaffold-GS
│   ├── metrics_bar_comparison.pdf/png      # PSNR / SSIM / LPIPS 分组柱状图
│   ├── quality_vs_speed_scatter.pdf/png    # 质量与速度权衡散点图
│   ├── metrics_heatmap.pdf/png             # 归一化指标热力图
│   └── metrics_dashboard.html              # 交互式四合一仪表盘 (plotly)
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

## 可视化示例

由 `3dgs-visualizer` 生成的高清样例 —— 完整分辨率文件见 [`Test/`](Test/)。

| 雷达图（方法多维度对比） | 分组柱状图（PSNR/SSIM/LPIPS） |
|:---:|:---:|
| <img src="Test/radar_comparison.png" width="320"> | <img src="Test/metrics_bar_comparison.png" width="420"> |

| 质量与速度权衡散点图 | 归一化指标热力图 |
|:---:|:---:|
| <img src="Test/quality_vs_speed_scatter.png" width="320"> | <img src="Test/metrics_heatmap.png" width="380"> |

交互式版本（悬停查看详情）：[`radar_comparison.html`](Test/radar_comparison.html) | [`metrics_dashboard.html`](Test/metrics_dashboard.html)

## 路线图

- [x] v0.1 — 初始版本，6 个核心技能（2026年4月）
- [x] v0.1.1 — 新增 `cad-mesh-3dgs` 技能，桥接 CAD/Mesh↔3DGS（2026年4月）
- [x] v0.1.2 — 知识库扩展：50→120+ 方法、23 个类别、每日自动更新工作流（2026年4-5月）
- [x] v0.1.3 — 知识库 v2：130→150+ 方法、52+ bug 模式、23 个类别、跨领域扩展（2026年5月）
- [x] v0.1.4 — 知识库 v3：150→152+ 方法、53+ bug 模式、23 个类别（已优化）、FreeTimeGS++、D-Rex（2026年5月）
- [x] v0.1.5 — 知识库结构升级：拆分为 3 个子文件提升检索效率（2026年5月）
- [x] v0.2 — 新增 `3dgs-visualizer` 技能（雷达图、对比表、方法时间线；静态 + 交互式双输出）（2026年5月）
- [x] v0.2.1 — 新增 Text2Word 交互演示——文生3DGS Web创作平台（2026年5月）
- [x] v0.2.2 — 新增 `patent-software-ip` 技能——专利申请文件与软著登记材料生成（2026年5月）
- [x] v0.2.3 — 知识库扩展：222→240+ 方法、57+ bug 模式、每日更新 + 物理GS/流式传输新方法（2026年5月）
- [x] v0.2.4 — 知识库扩展：240→254+ 方法、60+ bug 模式、OIT 透明渲染、分布式城市级 GS、自动驾驶 4DGS 物理仿真（2026年5月）
- [x] v0.2.5 — 知识库扩展：254→516+ 方法、62+ bug 模式、Skew-Normal 非对称基元、专家路由前馈 GS、连续 LoD、自适应分裂算子（2026年5月）
- [x] v0.2.6 — 每日更新：512→516+ 方法，+4新方法(Learn2Splat元学习优化器、EndoGSim医学4DGS+MPM、3DEditSafe编辑安全、Robust Prior-Guided分割)；医学影像类别扩充（2026年5月）
- [x] v0.2.7 — 每日更新: 516→523+方法, +7新(HarmoGS梯度调和, ULF-Loc alpha混合偏差修复CVPR Highlight, AdaptSplat/PointForward前馈, 3DGS³超采样加速, TransmissiveGS, NIRRGB-GS); 63+ bug模式; 25类别 (2026年5月)
- [ ] v0.3 — 新增 `3dgs-benchmark-runner` 技能（自动化基准测试）
- [ ] v1.0 — ClawHub 正式收录 + CI/CD 集成
- [ ] v1.1 — 多语言支持（中文、日文、韩文）
- [ ] v2.0 — Agent 间协作（多 Agent 论文讨论）

## 参与贡献

欢迎贡献！请阅读 [贡献指南](CONTRIBUTING.md) 了解详情。

**贡献方式：**
- 为未覆盖的场景添加新技能
- 扩展方法知识库
- 报告问题或提出改进建议
- 分享你的使用案例和成功故事

[![Contributors](https://contrib.rocks/image?repo=jaccen/Awesome-Gaussian-Skills&max=24&columns=8)](https://github.com/jaccen/Awesome-Gaussian-Skills/graphs/contributors)

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

## 致谢

- [3D Gaussian Splatting](https://repo-sam.informatik.uni-halle.de/jkortner/gaussian-splatting/) — 奠基性工作
- [OpenClaw](https://github.com/openclaw) — AI Agent 框架与 Skills 生态
- [awesome-3D-gaussian-splatting](https://github.com/MrNeRF/awesome-3D-gaussian-splatting) — 启发本项目的 awesome 列表
- [Awesome3DGS/3D-Gaussian-Splatting-Papers](https://github.com/Awesome3DGS/3D-Gaussian-Splatting-Papers) — 全面论文合集（498+ 篇），含作者、arXiv 链接和代码仓库，按会议/年份分类
- [longxiang-ai/awesome-gaussians](https://github.com/longxiang-ai/awesome-gaussians) — 每日自动更新的 3DGS 论文追踪器（276 stars）
- 所有 3DGS 研究者，你们的论文构成了我们的知识库

## 许可证

本项目基于 Apache-2.0 许可证开源 —— 详见 [LICENSE](LICENSE) 文件。可自由 Fork、发布、销售 — 含明确专利授权条款，对企业用户友好。

## Star 历史

[![Star History Chart](https://api.star-history.com/svg?repos=jaccen/Awesome-Gaussian-Skills&type=Date)](https://star-history.com/#jaccen/Awesome-Gaussian-Skills&Date)

<div align="center">

**为 3DGS 研究社区用心打造**

If this project saves you time, please give it a star!

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

3DGS 论文追踪器：https://github.com/longxiang-ai/awesome-gaussians

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

学术搜索（替代谷歌）：https://xueshuso.com/

如果这个项目帮你节省了时间，请给一个 Star！

</div>
