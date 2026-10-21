> Scope: optional editorial examples; no claim of acceptance probability or universal experiment quotas. Verify paper facts and current venue rules at primary sources. `methodology-core.md` and `experiment-scale-thresholds.md` govern evidence standards.

# 四方向范文拆解 + 顶会模板（Domain Exemplar Templates）

> **用途**：写或修改 3DGS / 具身智能 / 空间智能 / Agent 四个方向的论文时，按本文件对照该方向的顶会范文拆解来组织结构、贡献声明、实验证据与避坑。与 `top-paper-patterns.md`（3DGS 通用共性范式）和 `writing-patterns-from-top-papers.md`（3 篇基准逐句拆解）互补——前者是"所有 3DGS 顶会的共性"，本文件是"四个方向各自的差异化和代表作"。
> **整理日期**：2026-10-21
> **检索口径**：全网检索（WebSearch）+ 项目 `data/methods.json`（976 方法/26 类快照）+ CVF/OpenAccess/PMLR 一手论文页。所有 arXiv ID 与 venue 均来自检索返回，写作时如要写入稿件请按 `3dgs-citation-audit.md` 三层校验协议复核。

---

## 如何使用本文件

1. **先定方向**：用户要写的论文落在下面哪个方向（3DGS 渲染/SLAM/压缩、具身智能 VLA/机器人、空间智能世界模型/3D-LLM、LLM Agent）。方向模糊时，按主技术栈判断——以高斯泼溅为核心→3DGS；以机器人策略/交互为核心→具身智能；以场景图/空间推理/世界模型为核心→空间智能；以 LLM 推理规划工具调用为核心→Agent。
2. **读对应章节的范文清单**：每条范文标注了 venue、arXiv、**为何是范文**（它示范了哪种写作手法）。
3. **套用该方向的写作模板**：每个方向给了摘要公式、引言弧线、方法组织、实验证据体系、贡献声明配方。
4. **对照避坑清单**：每个方向列了该方向审稿人最常攻击的点。

> **红线**：本文件列出的范文用于"读它的结构、学它的写法"，不要照抄其数据/结论。引用任何范文进入你的稿件前，必须按 `3dgs-citation-audit.md` 核实 ID 可达、名称一致、venue 准确。

---

## 方向一：3DGS（渲染 / SLAM / 压缩 / 前馈 / 生成）

### 1.1 范文清单

| 范文 | Venue | arXiv | 为何是范文（示范了什么手法） |
|------|-------|-------|---------------------------|
| 3D Gaussian Splatting (3DGS) | SIGGRAPH 2023 / ACM TOG | 2308.04079 | 范式创造论文。示范"Sidestep Move"——不优化 NeRF 的采样而是消除连续表示的必要性；teaser 图把每个对手标注致命弱点；"obvious method → problem → our approach"信任建立叙事。详见 `writing-patterns-from-top-papers.md` |
| Mip-Splatting | CVPR 2024 Best Student Paper | 2311.16493 | 诊断型改进论文。示范"Diagnose Before Cure"——先用整节做失效机制分析（erosion/dilation），再让两个 filter 成为"显而易见的解"；示范"Theory Import"——把 Nyquist-Shannon 采样定理引入作为 Preliminaries，把工程 trick 升格为原理贡献 |
| D4RT | CVPR 2026 Best Paper | 2512.08924 | 范式简化论文。示范"Two-Sided Win"——simplicity AND power 一句话并存；架构极简化的叙事写法 |
| Proxy-GS | CVPR 2026（满分候选） | 2509.24421 | 效率与质量双赢范文。示范"外部技术嫁接"——把传统图形学硬件管线（Hi-Z 分层剔除、Early-Z、Vulkan-CUDA 零拷贝）移植到 3DGS 瓶颈；遮挡感知的统一训练+推理框架叙事 |
| SparseSplat | CVPR 2026 | 2604.03069 | 前馈 3DGS 范文。示范"内容自适应 vs 刚性网格"的根因分析——把冗余归结为 pixel-aligned 与 3DGS 内容自适应本质的错配，再用香农熵采样替代，叙事从根因到解法一气呵成 |
| SDGS | CVPR 2026 | —（仅 CVF Open Access，arXiv 未检索到） | 3DGS-SLAM 范文。示范"sketch-then-paint"两阶段范式命名——给方法一个可记忆的名字比堆模块名更有效；示范混合像素传感器这类新硬件引入的动机写法 |
| FastGS | CVPR 2026 | 2511.04283 | 加速压缩范文。示范"100 秒训练"这类极强数字标题；方法节按"多视图一致性致密化→剪枝→精确图块相交→优化"的管线组织 |

### 1.2 写作模板

**摘要公式（3DGS 类通用）**：
1. 一句领域痛点（"X 是 Y 的关键挑战"）
2. 现有方法受限于____（点出痛点，带数字）
3. 我们报道____策略，通过____实现____（核心方案 1-2 句）
4. 量化亮点一句（"在____条件下实现____提升，创下____纪录"）
5. 意义升华一句（"为____领域提供新路径"）

**引言弧线（三段式，见 `top-paper-patterns.md` Intro 四段式）**：
- 段 1：领域重要性 + 当前卡在哪（制造紧张感）
- 段 2：最新进展到哪 + 还差什么（精准定位空白）
- 段 3：我们做了什么 + 突破了什么（响亮登场，含 first 声明）
- 段 4（可选）：贡献 bullet list（3-4 条四件套）

**方法组织**：3DGS 论文几乎都是"管线图 + 逐模块小节"。先放一张总体管线图（Figure 2），然后每个模块一个小节，小节标题用该模块的功能名（如 "Proxy-Guided Filter"）而非编号。每个模块小节遵循"该模块解决什么→怎么做→为什么这样做（justify every choice）"。

**实验证据体系（四层，见 `top-paper-patterns.md`）**：
1. 主对比表（vs SOTA，同一数据集同一 split，见 `writing-experiments.md` Comparison Fairness Protocol）
2. 消融表（每个模块单独消融，证明必要性）
3. 效率/速度表（FPS、训练时间、内存——3DGS 论文必有效率维度）
4. 定性图（teaser + 失效对比 + 几何可视化）

### 1.3 贡献声明配方
"1 条 first/品类占位 + 1-2 条技术创新（给机制）+ 0-1 条数据基准（筑护城河）+ 1 条实验验证"。3DGS 方向的 first 声明高频句式：
- "the first feed-forward framework capable of..."
- "the first training-free plug-and-play algorithmic approach..."
- "the first to unify X and Y in a single framework"

### 1.4 避坑清单（3DGS 方向审稿人最常攻击点）
- **跨数据集/跨 split 拼表**：所有对比方法必须同数据集、同版本、同 split、同评测协议（见 SKILL.md Red Lines 第 6 条）。基线数字口径无法核实就重跑，不许静默换算
- **效率数字无硬件标注**：FPS 必须注明 GPU 型号、分辨率、高斯数量；"real-time" 要给 Hz
- **未与最新 SOTA 比**：3DGS 领域迭代极快，相关工作漏掉近 6 个月的 SOTA 会被直接质疑
- **teaser 图不self-contained**：teaser 必须让读者只看图+caption 就懂核心贡献
- **方法节缺"为什么"**：只写"我们用了 X"不写"为什么用 X 而不是 Y"，审稿人会逐条追问
- **引用核实**：3DGS 论文 arXiv ID 和 venue 易错，投稿前必须跑 `scripts/audit_manuscript_citations.py`

---

## 方向二：具身智能（VLA / 机器人 / Sim2Real）

### 2.1 范文清单

| 范文 | Venue | arXiv | 为何是范文 |
|------|-------|-------|-----------|
| OpenVLA | ICML 2024 / CoRL 2024 | 2406.09246 | 开源 VLA 基准。示范"数据混合策略 + 动作统一映射"的方法节写法；示范如何把"开源权重"作为贡献之一 |
| π₀ (pi-zero) | arXiv 2024 / Physical Intelligence | 2410.24164 | 流匹配策略范文。示范"为什么选流匹配而不是扩散"的 justify 写法——审稿人最想知道你的设计决策理由 |
| Octo | RSS 2024 | 2405.12213 | 通用机器人策略范文。示范"多机器人构型统一"的方法形式化——观测空间 O、动作空间 A 的数学定义先行 |
| RT-2 | CoRL 2023 / Google | 2307.15818 | VLA 范式开山。示范"co-fine-tuning"概念命名——给方法一个能被记住的名字 |
| GS-VLA | CVPR 2026 | 2608.19066 | 3DGS+VLA 融合范文。示范"观测适配层"定位——3DGS 模块插在冻结 VLA 策略之前修复视角偏移，不含 LLM 却处处为 LLM 服务；含 Locality 定理的理论创新 |
| RoboTidy | CVPR 2026 | 2511.14161 | 3DGS+具身评测底座范文。示范"评测底座层"定位——3DGS 场景作为具身智能训练评测的仿真资产；示范系统论文的写法 |
| GSP-3D | Frontiers in Neurorobotics 2026 | —（期刊论文，arXiv 未检索到） | 3DGS+扩散策略+世界模型范文。示范三组件融合（GGR 回归 + 3DGS 条件扩散 + GS-WM）的系统论文组织；RoboTwin 2.0 超 DP3/π0/ACT 的对比叙事 |

### 2.2 写作模板（CoRL/RSS/ICRA 风格）

**摘要公式（具身智能，参见 CoRL Writing Style）**：
1. 机器人要做什么它以前做不到的（任务族，具体）
2. 为什么现有学习方法做不到
3. 我们的想法一句话
4. 标题证据带规模（"across 8 manipulation tasks, 5 seeds, 50 episodes each, on a real UR5"）
5. 对领域的启示

**引言"四问"契约（CoRL 风格，page 1 结束前必须回答）**：
1. 机器人能做什么它以前做不到的？（任务族，具体）
2. 什么被学习了，什么是用工程绕过的？（策略？奖励？表征？数据？）
3. 证据规模多大？（tasks × seeds × episodes；sim、real 还是都有）
4. 为什么这能超越 demo 泛化？（可迁移的洞察）

**方法节结构（数学形式化先行，VLA 论文通用）**：
1. Preliminaries & Problem Formulation：定义策略 π_θ(a_t | o_t, l)，观测空间 O（明确 o_t 含什么，如 o_t = {I_wrist, I_third, p_prop}），动作空间 A
2. 按 Input-Process-Output 逻辑组织：感知 → 推理/融合 → 生成
3. 每个设计决策都要 justify："为什么选 SigLIP 而不是 CLIP""为什么选流匹配而不是扩散（为了解决扩散推理延迟）"

**实验证据体系**：
1. 真实机器人主结果（success rate，带 seeds × episodes）
2. Sim-to-real 迁移（如有，标注 drop 幅度，如"11-point average sim-to-real drop"）
3. 泛化实验（unseen objects，给训练 vs held-out 对比数字）
4. 消融（每个组件）
5. **视频补充材料**（具身论文几乎必备，演示任务完成）

### 2.3 贡献声明配方
具身智能论文贡献常含"开源权重/数据集/仿真环境"作为独立贡献条：
- "We release X, the first open-source Y"
- "We contribute a new benchmark Z covering..."
- 系统论文可含"we open-source the full pipeline including code, data, and simulation assets"

### 2.4 避坑清单
- **claim 无数字无规模**：CoRL 最忌"transfers seamlessly"——必须改成"transfers with an 11-point average sim-to-real drop (Table 4)"。每个 claim 带数字+规模+章节指针
- **demo 形容词**：删掉 "impressive/remarkable/highly robust"——视频要么展示了要么没有
- **缺 Limitations 节**：CoRL 2026 强制要求，且要具体、与视频一致、限定 claim 边界
- **setup 细节推给附录**：CoRL 要求 setup 节带协议细节，不许全部 defer 到附录
- **seeds/episodes 不标**：涉及重复实验时说明独立训练次数与评估样本数，位置以可理解为准，让表格独立可读
- **双读者错位**：CoRL 有两类审稿人（ML 派查算法、机器人派查物理 claim），只服务一类就丢另一类的分

---

## 方向三：空间智能（世界模型 / 3D-LLM / 场景图 / 空间推理）

### 3.1 范文清单

| 范文 | Venue | arXiv | 为何是范文 |
|------|-------|-------|-----------|
| V-JEPA 2 | arXiv 2025 / Meta | 2506.09985 | JEPA 范式代表作。示范"避免像素重建、预测潜在表示"的认识论立场写法——在引言就亮明"我们不做生成式重建"的立场 |
| VJEPA (Variational JEPA) | ICML 2026 | — | 概率扩展范文。示范"确定性方法→概率泛化"的写法——把确定性回归目标的不确定性建模缺失作为 gap，变分目标作为解；示范 PSR/贝叶斯滤波的理论连接 |
| UniJEPA | ICML 2026 | 2608.07409 | 统一框架范文。示范"碎片化方法统一"的选题——把 I-JEPA/V-JEPA/DINO-World 等视为不同配方，用一个共享潜空间统一；单一端到端目标、单一超参的极简叙事 |
| DeWorldSG | ECCV 2026 | 2607.00889 | 3D 场景图+世界模型范文。示范"帧级独立预测→时空证据累积"的根因重构——把两个问题归结到同一根源，用不确定性建模+世界模型先验统一 |
| Spatial 3D-LLM | CVPR 2025 | 2507.16524 | 3D 空间感知 VLM 范文。示范"渐进式空间感知"三阶段（intra-referent → inter-referent → contextual）的层级推理叙事；示范新任务（距离测量+布局编辑）+新数据集（MODEL, 263K）筑护城河 |
| SpatialLLM (JHU) | CVPR 2025 | 2505.00788 | 3D 空间推理 LMM 范文。示范"compound design"——数据/架构/训练三阶段的系统化设计空间搜索；首个把 3D 朝向关系纳入 VQA；surpass GPT-4o by 8.7% 的强基线对比 |
| SpatialLLM (武大) | Int. J. Applied Earth Obs. 2026 | — | 城市空间智能范文。示范"免微调"路线——用结构化场景描述 prompt 通用 LLM，做城市规划/生态分析/交通管理；示范跨学科应用论文的写法 |

### 3.2 写作模板

**摘要公式（空间智能/世界模型类）**：
1. 一句能力缺口（"当前 LMM 缺乏 3D 空间推理能力"或"现有 JEPA 是确定性的，缺乏不确定性估计"）
2. 根因一句（数据稀缺/设计偏向 2D/确定性回归目标）
3. 我们的方法一句话（"我们系统研究 X 对 Y 的影响，引入 Z"）
4. 核心结果带数字（"surpass GPT-4o by 8.7%"或"在 Noisy-TV 上比重建基线更鲁棒"）
5. 意义一句

**引言弧线（空间智能常含认识论立场）**：
- 段 1：人类天然具备 X 能力 / 规划系统需要 Y
- 段 2：当前模型做不到，因为____（点出根因，不只是"缺数据"）
- 段 3：**认识论立场句**（如"预测有用的潜在表示而非重建原始观测"）——这是空间智能论文区别于普通改进论文的关键
- 段 4：我们的方法 + first 声明
- 段 5：贡献 list

**方法组织**：
- 世界模型类：Preliminaries（数学定义 JEPA/PSR/贝叶斯滤波）→ 方法（每个组件作为某原理的"后果"）→ 理论保证（放正文或附录）
- 3D-LLM 类：架构图（冻结编码器 + LLM + 适配模块）→ 逐模块小节 → 训练范式（instruction tuning / 多阶段）→ 损失函数

**实验证据体系**：
1. 主 benchmark 对比（vs SOTA + 强基线如 GPT-4o）
2. 新任务/新基准（如有，筑护城河）
3. 消融（每个模块/每个阶段）
4. 泛化（unseen scene / zero-shot）
5. 定性（空间推理案例可视化）

### 3.3 贡献声明配方
空间智能论文常含"新任务 + 新数据集 + 新基准"三件套：
- "We identify three fundamental types of 3D spatial relationships..."
- "We propose a new task X and a dataset Y containing Z annotations..."
- "We provide a roadmap for optimal design..."（系统化设计搜索类）

### 3.4 避坑清单
- **认识论立场模糊**：世界模型论文不说清"你站在生成派还是预测派"，审稿人会质疑动机
- **与 GPT-4o/Gemini 等强基线不比**：空间推理论文不比强基线会被质疑意义
- **新数据集无统计**：新数据集必须给规模、标注类型、采集方式、多样性分析
- **空间关系只测距离**：漏掉朝向、拓扑、交互等关系会被指"空间理解不完整"
- **理论连接牵强**：把 JEPA 连到贝叶斯滤波必须有形式化证明，不能只口头说"inspired by"
- **评估指标单一**：只用 accuracy，不给 error（如 X/Y/Z-mARE）会被质疑空间精度

---

## 方向四：LLM Agent（推理规划 / 工具调用 / 多智能体）

### 4.1 范文清单

| 范文 | Venue | arXiv | 为何是范文 |
|------|-------|-------|-----------|
| ReAct | ICLR 2023 | 2210.03629 | Agent 范式开山。示范"两种能力首次缝合"的选题——reasoning 和 acting 之前分开研究，ReAct 把它们 interleave；示范 Thought-Action-Observation 循环的命名（可记忆的模式名）|
| Reflexion | NeurIPS 2023 | 2303.11366 | 语言强化学习范文。示范"不用梯度改参数，用自然语言做梯度"的概念重塑——把 self-critique+memory 重新框定为 RL；示范三模型协作架构（Actor/Evaluator/Self-Reflection）|
| Tree of Thoughts (ToT) | NeurIPS 2023 | 2305.10601 | 搜索式推理范文。示范"把推理框定为树搜索"的问题重构——打破 ReAct 的线性约束；示范 BFS/DFS 在推理上的迁移写法 |
| Voyager | NeurIPS 2023 Workshop | 2305.16291 | 技能库范文。示范"把可复用代码存为技能"的开放世界 agent 叙事；示范 Minecraft 这类开放环境评测的写法 |
| LATS | arXiv 2023 | — | 统一框架范文。示范"ReAct + ToT + MCTS 三合一"的统一叙事 |
| AutoGen / MetaGPT | arXiv 2023 / ICLR 2024 | — | 多智能体范文。示范"角色分工 + 协议"的系统设计写法 |

### 4.2 写作模板（NeurIPS/ICLR/ICML ML 顶会风格）

**摘要公式（Sebastian Farquhar 5 句式，ML 顶会通用）**：
1. 你做到了什么："We introduce..." / "We prove..." / "We demonstrate..."
2. 为什么这难且重要
3. 你怎么做的（含专有关键词便于检索）
4. 你有什么证据
5. 你最 remarkable 的数字/结果

> 删掉 "Large language models have achieved remarkable success..." 这类万能开场——任何 ML 论文都能 prepend 的首句就是废句。

**引言（1-1.5 页内，Methods 必须在 page 2-3 开始）**：
1. 问题陈述（clear）
2. 简要方法概述
3. 2-4 条 bullet 贡献（每条 1-2 行，双栏格式下）

**方法节（Enable reimplementation）**：
- 概念大纲或伪代码
- 所有关键超参列出
- 架构细节足以复现
- 呈现最终设计决策；消融放实验节

**实验节（每个实验明确声明）**：
- 这个实验支持哪个 claim
- 它如何连接到主贡献
- 实验设置（细节进附录）
- 观察到什么："the blue line shows X, which demonstrates Y"
- 误差棒 + 方法论说明（std vs stderr）
- 超参搜索范围 + 选 split
- 计算基础设施（GPU 型号、总时长）
- seed 设置方法

**Related Work（方法论组织，不按论文组织）**：
- 好："One line of work uses X's assumption [refs] whereas we use Y's assumption because..."
- 坏："Snap et al. introduced X while Crackle et al. introduced Y."
- 慷慨引用——审稿人很可能是相关论文作者

**Limitations 节（ML 顶会强制要求）**：
- 写成 scope of work，不是 defense
- 说明评估覆盖了什么、没覆盖什么
- 每个开放问题指向"能回答它的实验"
- 不要在这里论证"局限不影响 claim"——那是 Results 的事

### 4.3 贡献声明配方
Agent 论文贡献常含"新范式命名 + 基准提升 + 开源"：
- "We introduce ReAct, a new paradigm that synergizes reasoning and acting..."
- "We show that X improves over Y by Z% on benchmark W..."
- "We release code and prompts at..."

### 4.4 避坑清单
- **抽象开篇**：删掉 "LLMs have achieved remarkable success..."——直接从你的具体贡献开始
- **引言超 1.5 页**：背景塞太多，Methods 起步太晚；把背景挪到 Related Work
- **实验无 claim 映射**：每个实验必须明确"测试哪个 claim"，检查实验相关性；保留有科学意义的负结果和稳健性证据
- **缺统计显著性**：error bars、运行次数、统计检验、置信区间缺一不可
- **缺 Limitations**：NeurIPS/ICML/ICLR 都强制，不写直接扣分
- **缺 paper checklist**：三大会都要求，不完整会被 desk reject
- **Related Work 逐论文罗列**：必须按方法论组织，体现你的工作和哪一脉不同、为什么不同
- **概念无命名**：Agent 论文最值钱的是"可被引用的模式名"——ReAct、Reflexion、ToT 都因命名而传播；给你的 loop/pattern 起个能记住的名字

---

## 跨方向通用速查

| 你在写什么 | 优先加载本文件的哪节 | 同时加载 |
|-----------|-------------------|---------|
| 3DGS 渲染/SLAM/压缩/前馈 | §1 + `top-paper-patterns.md` + `writing-patterns-from-top-papers.md` | `3dgs-paper-knowledge.md`（基线/数据集/指标） |
| 具身智能 VLA/机器人 | §2 + `writing-experiments.md` | `3dgs-domain-venues.md`（具身类 venue） |
| 空间智能/世界模型/3D-LLM | §3 + `writing-abstract-intro.md` | `3dgs-domain-venues.md`（World Models 类 venue） |
| LLM Agent/推理规划 | §4 + `reviewer-perspective.md` | `venue-formats.md`（NeurIPS/ICLR 格式） |
| 3DGS+具身融合 | §1 + §2 | `top-paper-patterns.md` §2.3（3DGS 作为感知底座四层融合） |
| 3DGS+空间智能融合 | §1 + §3 | `3dgs-paper-knowledge.md` |

---

## 范文一手链接（写作时核实用）

> 以下链接来自 2026-10-21 检索，**均经 arXiv API `id_list` 逐个核验标题匹配**（见文末核验记录）。写入稿件前仍应按 `3dgs-citation-audit.md` 复核 venue。

- 3DGS: https://arxiv.org/abs/2308.04079
- Mip-Splatting: https://arxiv.org/abs/2311.16493
- D4RT: https://arxiv.org/abs/2512.08924
- Proxy-GS: https://arxiv.org/abs/2509.24421
- SparseSplat: https://arxiv.org/abs/2604.03069
- SDGS: CVPR 2026（CVF Open Access，arXiv 未检索到）
- FastGS: https://arxiv.org/abs/2511.04283
- OpenVLA: https://arxiv.org/abs/2406.09246
- π₀: https://arxiv.org/abs/2410.24164
- Octo: https://arxiv.org/abs/2405.12213
- RT-2: https://arxiv.org/abs/2307.15818
- GS-VLA: https://arxiv.org/abs/2608.19066
- RoboTidy: https://arxiv.org/abs/2511.14161
- GSP-3D: Frontiers in Neurorobotics 2026（期刊论文，arXiv 未检索到）
- V-JEPA 2: https://arxiv.org/abs/2506.09985
- VJEPA (Variational): ICML 2026（PMLR v306:47703-47731）
- UniJEPA: https://arxiv.org/abs/2608.07409
- DeWorldSG: https://arxiv.org/abs/2607.00889
- Spatial 3D-LLM: https://arxiv.org/abs/2507.16524
- SpatialLLM (JHU): https://arxiv.org/abs/2505.00788
- SpatialLLM (武大): https://github.com/WHU-USI3DV/SpatialLLM
- ReAct: https://arxiv.org/abs/2210.03629
- Reflexion: https://arxiv.org/abs/2303.11366
- Tree of Thoughts: https://arxiv.org/abs/2305.10601
- Voyager: https://arxiv.org/abs/2305.16291

---

## 检索来源声明

本文件范文清单基于以下 2026-10-21 检索来源编译：
- WebSearch: "embodied AI paper writing CVPR CoRL RSS ICRA VLA" / "spatial intelligence world model JEPA" / "LLM agent paper ReAct Reflexion" / "3DGS SLAM compression CVPR 2026"
- 项目 `data/methods.json` 2026-10-19 快照（976 方法/26 类）
- CVF Open Access / PMLR / arXiv 一手论文页
- CoRL Writing Style（SkillMD，brycewang-stanford/Awesome-Journal-Skills）
- Embodied-AI Paper Writer（LobeHub，OpenGHz，蒸馏自 63 篇 CoRL/RSS/ICRA/IROS/Science Robotics 2022-2026）
- ML Paper Writing for Top AI Conferences（LobeHub，综合 Neel Nanda/Sebastian Farquhar/Gopen & Swan/Lipton/Steinhardt/Ethan Perez/Karpathy）

> **注意**：本文件列出的范文用于结构参照。范文的具体数字、结论、机制不得照抄进你的稿件。任何引用进入稿件前必须按 `3dgs-citation-audit.md` 三层校验（ID 可达 / 名称一致 / venue 准确）。如某范文未收录进 `data/methods.json`，不等于虚构，但写作时引用其 arXiv ID 须单独复核。

---

## arXiv ID 核验记录（2026-10-21）

<!-- freshness:ignore-start -->
> 本节是**审计记录**，不是引用清单。其中的历史错配 ID 仅用于说明修正过程，供 `check_reference_freshness.py` 跳过。

**核验方式**：arXiv API `id_list` 批量查询 + `search_query` 标题反查，逐条比对返回标题。
**结果**：21 条有 arXiv ID 的范文中，**20 条标题直接匹配，1 条发现错配并已修正**（修正后 21/21 全部匹配）。

| 状态 | 条目 | 说明 |
|------|------|------|
| ✅ 已核验 | 3DGS / Mip-Splatting / D4RT / Proxy-GS / SparseSplat / FastGS / OpenVLA / π₀ / Octo / RT-2 / GS-VLA / RoboTidy / V-JEPA 2 / UniJEPA / DeWorldSG / Spatial 3D-LLM / SpatialLLM(JHU) / ReAct / Reflexion / ToT / Voyager | 返回标题与本文描述一致 |
| 🔧 **已修正** | **π₀：2410.24122 → 2410.24164** | 原 ID 指向《Multiparameter optimal control of F1-ATPase》，与本方向无关。属编号笔误，标题反查定位到正确 ID |
| ⚠️ 无 arXiv | SDGS（CVPR 2026）/ GSP-3D（Frontiers 2026） | 检索未获 arXiv 版，引用须走 CVF Open Access 或期刊 DOI |
| ⚠️ 非 arXiv | VJEPA (Variational, ICML 2026) | PMLR v306:47703-47731，引用用 PMLR 页 |
| ⚠️ 仅代码库 | SpatialLLM (武大) | Int. J. Applied Earth Obs. 2026，附 GitHub |

**教训（写进流程）**：`2410.24122` vs `2410.24164` 只差两位，肉眼几乎不可辨。凡把 ID 写进稿件或知识文件，必须走 `id_list` 逐个比对**返回标题**——只验"ID 能否打开"不够，因为错 ID 往往也是真实存在的另一篇论文（这次就是）。

<!-- freshness:ignore-end -->
