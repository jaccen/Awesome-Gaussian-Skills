
# 路由表与工作流配方（详细版）

> 本文件是 `SKILL.md` 路由表的扩展：科研全流程的编排配方、专家团分派、方法检索策略、空间智能专题地图。
> 数据口径：**976 方法 / 869 条带 arXiv ID / 26 类**（2026-10-19 快照，`data/methods.json`）；子技能 18 个 + 专家团 1 个。

## 零、26 个类目（canonical，取自 `data/categories.json`）

Foundation · Optimization · Surface & Rendering · Compression & Streaming · Acceleration · Large-Scale · Feed-Forward · Language & Semantic · Generation · Autonomous Driving · Dynamic & 4D · HDR & Relighting · SLAM · Sparse-View · World Models & Spatial Intelligence · Human & Avatar · Editing · CAD & Reverse Engineering · Cross-Domain · Simulation · Embodied AI & Robotics · Robustness · Security · **Ontology & Knowledge Representation** · **Super Agents & Agentic AI** · **AIGC Content Creation**

后三个（2026-10-13 新增）是本体与知识表示、超级智能体、AIGC 内容生成，分别对应 `ontology` / `super-agent` / AIGC 相关任务。

## 一、科研全流程配方

### 配方 A：文献调研管线
**触发**："帮我调研 XX 方向"、"这个领域有哪些方法"、"写个 related work"

1. 明确方向关键词（中文/英文），映射到上列 26 个类目之一
2. `Grep` `3dgs-methods-overview.md` 中对应 `### 类目名` 段落，得到方法列表
3. 对代表性方法（3-8 个）逐个 Grep 方法名，提取：venue、核心创新、代码链接
4. 需要权威引用时 → 加载 `3dgs-spatial-intelligence-verified-references.md`，优先取 [VERIFIED] 条目
5. 需要深读笔记 → 按方向加载对应 `_kb_*.md` 簇文件（A–I 见 SKILL.md §B）
6. 执行 SKILL.md 的「引用准确性纪律」：arXiv API 验证每条引用
7. 产出对比表或综述初稿（可视化需求 → 路由 `3dgs-visualizer`）

### 配方 B：新方法立项管线
**触发**："我想做一个 XX 的新方法"、"帮我看这个 idea 是否已被做过"

1. 查新：Grep 知识库中与 idea 相关的关键词（机制词如 "pruning"、"deformation"、"feed-forward"），确认 novelty 空间
   - **判"白"必须两层**：本地知识库检索 + arXiv 全库实时检索；本地库是有偏样本，只查本地会把"已被做烂但没被收录"的方向误判为白
   - **同义词兜底是硬规则**：主线词 + ≥5 个同义词全为 0 才能判白
2. 路由 `3dgs-method-compare`：对比最接近的 2-4 个方法，找差异维度
3. 路由 `3dgs-experiment-planner`：设计数据集/基线/消融矩阵（对标目标 venue）
4. 涉及实现 → 路由 `3dgs-code-reviewer`（写码前防坑）+ `3dgs-training-debugger`（训练期）
5. 产出立项报告：novelty 声明 + 与最近邻方法的差异表 + 实验计划

### 配方 C：论文写作与投稿管线
**触发**："写论文"、"改 related work"、"准备投稿"

1. 立项/实验产物就绪后 → 路由 `cg-paper-writing`（写作规范）
2. venue 定位 → `3dgs-writing-capability.md` §1 的 26 类矩阵；期刊替代落点 → `ai-journal-landscape-2026.md`（二手数据，须一手核实）
3. 图表 → `3dgs-visualizer`（雷达图/时间线/对比表，PDF/PNG/HTML）
4. 数据核对 → `benchmark-data.md` + 论文原文溯源
5. 投稿 venue 策略 → `venues.md`
6. 中文期刊摘要润色不属本工具包，按用户既有规范处理（红色标注修订、清除 AI 痕迹）

### 配方 D：工程落地管线
**触发**："部署"、"上线"、"端侧"、"移动端"

1. 选型 → 路由 `3dgs-engineering-guide`（10 个行业垂直、GIS/BIM/ROS2/引擎集成）
2. 压缩量化 → 路由 `3dgs-compression-deploy`（标量/VQ/混合精度量化、剪枝、渐进式 LoD）
3. CAD/Mesh 桥接 → 路由 `cad-mesh-3dgs`
4. 数字孪生/交互 → 路由 `3dgs-articulated-reasoner` 或 `3dgs-mcp-renderer`

### 配方 E：审稿与答辩管线
**触发**："reviewer 提了 XX"、"rebuttal 怎么写"

1. 实验质疑 → `3dgs-experiment-planner` 的 reviewer concern 章节补实验
2. 基线缺失 → `baselines.md` + `benchmark-data.md` 补对标数据
3. 对比表重绘 → `3dgs-visualizer`
4. 需要完整的三审稿视角 + meta-review → 走配方 F 的 R3 角色

### 配方 F：专家团全流程（2026-10 新增）
**触发**："帮我评估这个 idea"、"这个创新点够不够"、"帮我模拟审稿"、"润色"、"消除 AI 痕迹"、"按期刊格式改"、"分析实验结果"

路由到 `research-expert-team`，按下列九角色与流水线编排：

| 角色 | 触发语 | 产出 |
|------|--------|------|
| R1 Idea Evaluator | "这个 idea 值得做吗" | 四维判定：新颖性 / 可行性 / 影响力 / 成本，每维以 ≥3 个库内方法作 prior art |
| R2 Innovation Miner | "创新点在哪" | 2–4 条排序的贡献声明，各自映射到可度量 delta 与具名基线 |
| R3 Simulated Reviewer | "帮我审稿" | Reviewer-1/2/3 + meta-review，每条质疑配一个修法 |
| R4 Academic Polisher | "润色" | 语言、术语一致性、段落节奏、claim-evidence 对齐（可追踪，不静默改写技术论断） |
| R5 AIGC-Trace Hygiene | "消除 AI 痕迹" | 元数据清理、AI 套话与模板节奏中和、文风自然化 |
| R6 Framework & Venue Compliance | "结构合规吗" | 故事线、贡献-证据映射、会议/期刊结构惯例 |
| R7 Format & Typesetting | "按格式改" | 严格模板合规：引用样式、图表规则、页数、匿名化 |
| R8 Experiment Designer | "实验怎么设计" | 基线集、消融矩阵、指标、数据集（须回查知识库取基线） |
| R9 Experiment Analyst | "结果怎么解读" | 结果解释、显著性、失败案例分析、"数字支持什么、不支持什么" |

**流水线**：R1 → R2 → R8 → (写作) → R6 → R7 → R4 → R5 → R3 → (修改) → R9 → (rebuttal)。任意角色可单独调用。

**三个前沿方向的方法选型表**（在 `research-expert-team/references/` 下，涉及这些方向时先查表再回查知识库）：

| 方向 | 库内方法数 | 选型表文件 |
|------|-----------|-----------|
| Ontology & Knowledge Representation | 12 | `mp-ontology.md` |
| Super Agents & Agentic AI | 20 | `mp-super-agents.md` |
| AIGC Content Creation | 22 | `mp-aigc.md` |
| Spatial Intelligence（世界模型/具身） | 12（另有 SLAM 47、自动驾驶 24、具身 44 相关） | `mp-spatial.md` |

## 二、空间智能专题地图

**核心叙事**（出自仓库开源书籍）：具身智能体 = 空间表示 × 感知 × 规划 × 动作；3DGS 是唯一同时满足可渲染、可微、可编辑的表示。

| 主题 | 知识库文件 | 关联子技能 |
|------|-----------|-----------|
| 世界模型五流派（视频生成派/强化学习派/JEPA 派/空间智能派/自驾仿真派） | `world-models-spatial-intelligence.md` | `3dgs-spatial-agent` |
| 空间智能定义与李飞飞/LeCun 路线之争 | 同上 §1.2 | — |
| Physical AI 技术三角（World Model + 空间智能 + 具身） | 同上 §1.3 | — |
| VLA 谱系、Sim2Real | `embodied-spatial-intelligence-papers.md` | `3dgs-spatial-agent` |
| 机器人空间记忆三层模型（几何→外观→语义） | 仓库书籍 CH 06 | `3dgs-spatial-agent` |
| 关节物体与 CAD·Mesh·3DGS 三角 | `slat-unified-representation.md` + `cad-3d.md` | `3dgs-articulated-reasoner`、`cad-mesh-3dgs` |
| 权威引用（逐条验证） | `3dgs-spatial-intelligence-verified-references.md` | 所有写作类任务 |

空间智能类选题的查新：Grep `3dgs-methods-overview.md` 中 `### World Models & Spatial Intelligence`、`### SLAM`、`### Autonomous Driving`、`### Simulation`、`### Embodied AI & Robotics` 段落。

## 三、方法检索策略细则

1. **先窄后宽**：先用精确方法名/机制词 Grep，命中不足再放宽到类目段落。
2. **主清单优先，簇文件补充**：`3dgs-methods-overview.md` 是唯一全量清单；`methods-core.md`、`methods-semantic-editing.md`、`methods-systems-apps.md`、`papers-collection.md` 与九个 `_kb_*.md` 均已在本技能包内，overview 命中不足时直接查它们，**无需再去仓库读**（仓库版本更新更全，需要最新时才用仓库路径）。
3. **每日增量**：仓库 `changelog/YYYY-MM-DD*.md` 记录每日新增方法；查"最近一周新方法"时按日期 Grep changelog。
4. **计数口径**：`976 方法 / 869 条带 arXiv ID / 26 类`，2026-10-19 快照。
   引用统计数字时必须注明口径与快照日期，防止"计量口径不自洽"。
   口径演进：678（v0.9.0 审计后）→ 700 → 862 → 859（质量治理回退）→ 872 → 881 → 900 → 955 → **976**。
   历史叙述中的旧数字属 changelog 原文，不改写、也不得当作当前值引用。

## 四、子技能快速索引（18 + 专家团）

| 技能 | 一句话能力 |
|------|-----------|
| **research-expert-team** | 九角色科研专家团：选题→创新点→审稿→润色→去 AI 痕迹→格式→实验设计/分析 |
| 3dgs-paper-reader | 读论文：架构、创新点、实验结果结构化提取 |
| 3dgs-method-compare | 11 维度方法对比 + 轴驱动分片加载 |
| 3dgs-experiment-planner | 数据集/基线/指标/消融矩阵，对标 CVPR/ICCV/ECCV/SIGGRAPH/TVCG |
| 3dgs-code-reviewer | 104 个已知 bug 模式的 3DGS 代码审查 |
| 3dgs-training-debugger | 60+ 运行时失败模式诊断（NaN/OOM/floaters/稠密化） |
| 3dgs-visualizer | 出版级可视化：雷达图/对比表/时间线（静态+交互） |
| nerf-to-3dgs-migrator | NeRF→3DGS 迁移：兼容性分析 + 代码模板 |
| cad-mesh-3dgs | CAD/Mesh/3DGS 三角转换：表面提取、逆向 CAD |
| 3dgs-engineering-guide | 生产部署：10 行业垂直 + GIS/BIM/ROS2/引擎 |
| 3dgs-compression-deploy | 量化/剪枝/渐进式压缩到端侧 |
| 3dgs-articulated-reasoner | 关节物体推理与数字孪生（URDF 桥接） |
| 3dgs-spatial-agent | 空间智能体：感知-规划-动作闭环 |
| 3dgs-mcp-renderer | MCP 渲染管线（已安装） |
| cg-paper-writing | CV/图形学论文写作与投稿格式 |
| patent-software-ip | 中国专利/软著材料 |
| ontology | 本体建模与知识表示 |
| super-agent | 超级智能体架构与多智能体编排 |
