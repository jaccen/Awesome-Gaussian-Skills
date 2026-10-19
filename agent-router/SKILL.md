---
name: awesome-gaussian-skills
version: 1.1.0
display_name: 高斯泼溅科研总路由
display_name_en: Awesome Gaussian Skills Router
description: "Umbrella router for the Awesome-Gaussian-Skills toolkit (github.com/jaccen/Awesome-Gaussian-Skills): 976 arXiv-verified 3D Gaussian Splatting methods (869 with an arXiv ID) across 26 categories, 18 specialist sub-skills, a nine-role research expert team (科研专家团), and a spatial-intelligence / world-model / embodied-AI knowledge base. Routes idea evaluation, novelty mining, simulated peer review, polishing, AIGC-trace hygiene, venue formatting, experiment design and analysis to the right role; also handles method survey, citation verification and benchmark lookup. Use when any 3DGS / Gaussian Splatting / NeRF / spatial intelligence / world model / embodied AI / ontology / super-agent research or engineering task arises and it is unclear which sub-skill or knowledge base file to load. 3DGS科研/空间智能/世界模型/高斯泼溅/具身智能/专家团."
description_zh: "Awesome-Gaussian-Skills 工具包总路由：976 个经 arXiv 核验的 3D 高斯泼溅方法（869 条带 arXiv ID，26 个类别）、18 个专业子技能、九角色科研专家团（选题评估→创新点挖掘→模拟审稿→润色→AIGC 痕迹消除→投稿格式→实验设计与分析），以及空间智能/世界模型/具身智能知识库。适用于任何 3DGS/NeRF/空间智能/世界模型/具身智能/本体/超级智能体的科研与工程任务，负责判断意图并调度到正确的子技能、专家角色或知识库文件；支持方法检索、引用验证、基准与数据集查询。"
description_en: "Umbrella router for the Awesome-Gaussian-Skills toolkit: 976 arXiv-verified 3D Gaussian Splatting methods (869 with an arXiv ID) across 26 categories, 18 specialist sub-skills, a nine-role research expert team, and a spatial-intelligence / world-model / embodied-AI knowledge base. Routes any 3DGS / NeRF / spatial intelligence / world model / embodied AI / ontology / agentic-AI research or engineering task to the right sub-skill, expert role, or knowledge base file; supports method surveying, citation verification, and benchmark or dataset lookup."
agent_created: true
---

# Awesome Gaussian Skills — 总路由

## 概述

本技能是 [Awesome-Gaussian-Skills](https://github.com/jaccen/Awesome-Gaussian-Skills) 工具包的总入口与调度器。当前基线（**2026-10-19 快照**）：

- **方法知识库**：`data/methods.json` **976 条方法**，其中 **869 条带 arXiv ID**，覆盖 **26 个类目**；每条含 arXiv ID、venue、年份、类目、核心创新点、代码链接
- **18 个子技能**：覆盖 3DGS 科研与工程全流程（读论文 → 方法对比 → 实验设计 → 代码审查 → 训练调试 → 可视化 → 论文写作 → 专利 → 本体 → 超级智能体 → MCP 渲染）
- **科研专家团**（`research-expert-team`）：九个角色覆盖选题评估到 rebuttal，并自带「本体与知识表示 / 超级智能体 / AIGC 内容生成」三个前沿方向的方法选型表
- **知识库快照**：本技能包内含 30 个参考文件（方法全库、九簇深度笔记、写作能力库、验证引用、世界模型、具身智能、期刊分区、基准与数据集等）
- **配套资源**：在线交互式方法检索器、开源书籍《Spatial & Embodied Intelligence》、benchmark 数据

本技能的职责是：**判断任务类型 → 路由到正确的子技能、专家角色或知识库文件**，并强制执行引用准确性纪律。

## 数据源与路径

| 资源 | 位置 |
|------|------|
| 本地仓库（作者维护，每日更新） | `C:\Users\Lenovo\Desktop\Project\Awesome-Gaussian-Skills` |
| 单一事实源（方法库） | 仓库内 `data/methods.json`（改任何计数前先看它） |
| 类目清单 | 仓库内 `data/categories.json`（26 个 canonical 类目 + 各类计数） |
| GitHub 仓库 | https://github.com/jaccen/Awesome-Gaussian-Skills |
| 在线方法检索器 | https://jaccen.github.io/Awesome-Gaussian-Skills/ |
| 在线书籍（空间与具身智能） | https://jaccen.github.io/Awesome-Gaussian-Skills/spatial-embodied-intelligence.html |

子技能安装状态（WorkBuddy 用户技能目录）：**18 个全部已安装**，路由表里不再有"未安装"项。

## 任务路由表

按任务意图路由到对应子技能（均已作为独立 WorkBuddy 技能加载；若其未触发，手动调用 Skill 工具）：

| 任务意图 | 路由到 |
|----------|--------|
| **科研全流程**：评估 idea、挖创新点、模拟审稿、润色、消除 AI 痕迹、投稿格式、实验设计与分析 | `research-expert-team`（九角色专家团） |
| 读/总结 3DGS、NeRF 论文；从 arXiv PDF 提取方法架构 | `3dgs-paper-reader` |
| 对比两个或多个 3DGS 方法；找某场景最优方法 | `3dgs-method-compare` |
| 设计实验：数据集、基线、指标、消融矩阵 | `3dgs-experiment-planner` |
| 审查 3DGS/CUDA 实现代码；渲染伪影排查 | `3dgs-code-reviewer`（104 个已知 bug 模式） |
| 训练崩溃：NaN、OOM、发散、floaters、稠密化失败 | `3dgs-training-debugger`（60+ 运行时模式） |
| 论文配图：雷达图、对比表、方法时间线 | `3dgs-visualizer` |
| NeRF 方法迁移到 3DGS；NeRF-3DGS 混合架构 | `nerf-to-3dgs-migrator` |
| CAD ↔ Mesh ↔ 3DGS 转换、表面提取、逆向 CAD | `cad-mesh-3dgs` |
| 部署到生产：行业选型、GIS/BIM/ROS2/引擎集成 | `3dgs-engineering-guide` |
| 压缩、剪枝、量化到端侧部署 | `3dgs-compression-deploy` |
| 关节物体推理、部件结构、数字孪生 | `3dgs-articulated-reasoner` |
| 空间智能体：感知-规划-动作闭环、空间记忆 | `3dgs-spatial-agent` |
| 计算机图形/3D 视觉学术论文写作与投稿格式 | `cg-paper-writing` |
| 中国专利/软著材料生成 | `patent-software-ip` |
| MCP 协议 3DGS 渲染管线 | `3dgs-mcp-renderer` |
| 本体建模、知识表示、场景图与符号接地 | `ontology` |
| 超级智能体架构、多智能体编排、Agentic AI | `super-agent` |

**路由规则**：
1. 任务命中上表某一行 → 立即调用对应子技能，本技能不再展开。
2. 任务横跨多阶段（如"为我的新方法写论文"）→ 交给 `research-expert-team` 按 R1→R2→R8→R6/R7→R4/R5→R3→R9 编排，由它分派到各子技能。
3. 意图模糊时，先查下方知识库定位方法背景，再确认路由。

## 知识库使用（references/ 目录）

本技能包内含 30 个知识库快照，按需加载，**不要一次全读**：

### A. 方法检索（最先查）

| 文件 | 内容 | 加载时机 |
|------|------|----------|
| `3dgs-methods-overview.md`（约 209 KB，最大） | 全部方法按 26 个类目列表，含 changelog 追加记录 | 需要检索方法、找相关工作时，**必须用 Grep 按关键词/类目检索**，禁止整读 |
| `methods-core.md`（102 KB） | 基础 / 表示 / 前馈 / 压缩 / 动态的核心方法详解 | overview 命中不足时补充 |
| `methods-semantic-editing.md`（27 KB） | 语义与编辑方向方法 | 语义、编辑类任务 |
| `methods-systems-apps.md`（45 KB） | 系统与应用方向方法（含鲁棒性） | 部署、应用类任务 |
| `papers-collection.md`（36 KB） | 按研究方向组织的补充论文清单 | 需要更广的论文池 |

### B. 深度研读笔记（九簇，`_kb_*.md`）

| 文件 | 簇主题 |
|------|--------|
| `_kb_A_Found_Render_Opt_Acc.md` | 基础、渲染、优化、加速 |
| `_kb_B_Compression.md` | 压缩与流式 |
| `_kb_C_Dynamic4D.md` | 动态与 4D |
| `_kb_D_FeedForward.md` | 前馈重建 |
| `_kb_E_Sparse_SLAM.md` | 稀疏视角与 SLAM |
| `_kb_F_Embodied_Driving.md` | 具身与自动驾驶 |
| `_kb_G_Editing_Human_Gen.md` | 编辑、人体与生成 |
| `_kb_H_Semantic_Cross_HDR.md` | 语义、跨域、HDR |
| `_kb_I_CAD_Large_Sim_Sec_World.md` | CAD、大规模、仿真、安全、世界模型 |

九簇笔记的逐篇 ID 已逐一核验可达；`paper-reading-knowledge-base.md`（198 KB）是它们的汇总深读版。

### C. 写作 / 投稿 / 实验

| 文件 | 内容 | 加载时机 |
|------|------|----------|
| `3dgs-writing-capability.md` | 26 类 → 期刊矩阵 + 近期论文精读 + 选题切口 | 定位投稿 venue、找选题 |
| `ai-journal-landscape-2026.md` | 通用 AI 期刊分区与 3DGS 适配标注（**二手编译，须一手核实**） | 期刊替代落点 |
| `venues.md` | 目标会议/期刊信息 | 投稿规划 |
| `baselines.md` | 常用基线方法速查 | 实验设计 |
| `benchmark-data.md` | 基准数据、MS-SSIM/VMAF/FID 指标、性能对比表 | 实验对标、报告数据 |
| `dynamic-datasets.md` | 动态场景数据集 | 动态场景实验 |
| `experiments.md` | 标准实验设计与数据集配置 | 实验设计 |
| `terminology.md` | 三维重建/新视角合成术语与符号规范 | 写作一致性 |

### D. 空间智能 / 世界模型 / 具身

| 文件 | 内容 |
|------|------|
| `world-models-spatial-intelligence.md` | 世界模型五流派、空间智能定义、Physical AI、商业化与研究方向 |
| `embodied-spatial-intelligence-papers.md` | 具身智能论文集（VLA 谱系、Sim2Real 等） |
| `slat-unified-representation.md` | SLAT 统一编码-解码框架 |
| `cad-3d.md` | CAD/3D 方向术语、基线与数据集 |
| `3dgs-spatial-intelligence-verified-references.md` | 逐条验证过的权威参考，[VERIFIED]/[CROSS-REF]/[UNVERIFIED] 三级标注 |
| `verification-report.md` | 全项目论文 arXiv ID 核查报告（快照） |

### E. 路由配方

`router-map.md`：五套工作流配方（文献调研 / 立项 / 写作投稿 / 工程落地 / 审稿答辩）+ 专家团编排 + 空间智能专题地图 + 检索策略细则 + 子技能索引。

**检索模式示例**（对 `3dgs-methods-overview.md`）：
- 按类目找方法：`Grep pattern="### Compression & Streaming" -A 30`
- 按方法名查详情：`Grep pattern="Mip-Splatting"`
- 按 venue 找新作：`Grep pattern="ECCV 2026"`
- 三个新类目：`Grep pattern="### Ontology & Knowledge Representation"` / `"### Super Agents & Agentic AI"` / `"### AIGC Content Creation"`

## 引用准确性纪律（强制）

知识库历史审计中曾移除 181 条不可核实条目、修正 56 条 arXiv ID 错链——**任何要写进交付物的引用必须三重验证**：

1. **arXiv API 编号查询**：确认 ID 可达且标题/摘要含方法名（`https://arxiv.org/abs/<id>`）
2. **标题检索**：WebSearch 交叉确认发表 venue 与年份
3. **数据可溯源**：性能数字必须出自论文原文，不得转述知识库中无出处的数字

知识库中标注 `[UNVERIFIED]` 或"venue 待核实"的条目，引用前必须完成验证，否则显式告知用户该条目未验证。

**计数口径纪律**：对外报数量时必须写明快照日期与口径——`976 方法 / 869 条带 arXiv ID / 26 类（2026-10-19 快照，data/methods.json）`。历史曾虚报至 973（去重缺陷）与 800+（未审计），均以审计后口径为准。

## 知识库更新

本技能包内是快照。仓库每日更新，需要最新数据时：

- 直接 Grep 本地仓库 `C:\Users\Lenovo\Desktop\Project\Awesome-Gaussian-Skills\references\` 下的同名文件（总是最新）
- 查看 `changelog/` 目录获取每日新增方法
- 方法总量以 `data/methods.json` 的 `count` 字段为准（当前 955），不要以本文件或 README 的旧表述为准
- 快照刷新：`python scripts/sync_umbrella_refs.py --apply`（工程 references/ → 本技能包，单向，不删技能包自有文件）
