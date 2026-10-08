# 3DGS 论文引文与声明核查（审核侧）

> **定位**：本文件负责**可核实性与一致性**的核验——即稿件里提到的方法名、arXiv 编号、发表场所、乃至描述与指标，是否真实存在且互相匹配。它与本技能其它参考文件的分工是：
> - `paper-evaluation-framework.md` → 评「好不好」（创新性 / 价值）
> - `reviewer-perspective.md` → 评「审稿人会怎么看」（拒稿 / 中稿规律、Rebuttal）
> - `review-integrity.md` → 评「整体诚信与逻辑」（多智能体对抗评审）
> - **本文件 → 评「是不是真的」**（面向文献 / 编号 / venue 的事实层）
>
> **用途**：写 related work 与实验时核对引用；投稿前自查；评审他人稿件时验证其引用真实性。

---

## 0. 铁律：把判断委托给「活数据」

本文件**不承载「某某文章的编号是多少」这类死数据**。所有事实性结论必须落到可核实来源：

- 所有事实性核查以工程内的 `data/methods.json`（单一事实源，**881** 条方法、**771** 条持有 arXiv 编号）与 `.arxiv_cache.json`（**1372** 个已批查 / **1371** 个可达）为准；
- 能跑脚本就跑脚本——脚本实时读盘，比本文件的文字更新、更可靠；
- **本技能若被独立安装于它处、找不到上述文件时**：说明当前环境无法核实，应当直说「本环境无注册表、请人工核实」，**绝不凭印象补写编号**。

> **为什么这样设计**：历史教训是——把 venue / 编号写死进文档会导致「文档过时即错」。本项目就真的出过：写死的 venue 有 4 处是错的（见 §2 实录）。

---

## 1. 三层校验协议（Verification Protocol）

凡要引用或采纳一个 (方法名 ↔ arXiv 编号 ↔ venue) 三元组，依次过三关：

**L1 — ID 可达性**
- 分批调用 arXiv API：`http://export.arxiv.org/api/query?id_list=...`，**每批 ≤ 40 个，请求间隔 ≥ 4 s**；
- arXiv 限流凶猛，批间失败要退避重试（10–20 s）；并发跑两个扫描脚本会互相触发限流；
- 提交日期格式必须是 `YYYYMMDDHHMM`（写成 `2026-04-24` 会返回 400，表现为「全体请求 HTTPError / 候选池 0 篇」）。
- **优先命中 `.arxiv_cache.json` 缓存**，避免重复冲击 API。

**L2 — 名称一致性**
- 取出 arXiv 返回的 `title` 与 `summary`，与方法名一起归一化（小写、去除 `$^_{}` 等 LaTeX 残留、驼峰切分）后比对：
  - 方法名是 title / summary 的子串 → 通过；
  - 缩写或驼峰拆分后有 ≥50% token 命中 → 视为通过（缩写类命名天然容错，如 `NoPoSplat` ↔ 标题 "No Pose, No Problem…"）；
  - 完全无重合 → **待裁定**，不一定是错（见 §3 的 WARN 解读）。

**L3 — 名称反查 + 人工裁定**
- 对不匹配项用 `ti:"<名称>"` 检索，区分两种性质：
  - **ID 挂错**：该名称确有其他真实论文 → 找正确编号；
  - **名称虚构**：arXiv 库根本不存在这个方法名 → 删除该引用，不要补编。
- **同名必须人工裁定**（同名的情况远比你想象得多）：如 `SAGS` 有结构感知版与内窥镜版两篇、`CompGS` 有 4 篇同名、`UniGS` 有 3 篇 GS 同名。凭记忆报编号一律先经 API 验证。

---

## 2. 五类红线错误 + 真实罚例

本项目在核查中真实发现的错误，按性质分类——**这些就是审核时要拦的东西**：

| 类型 | 说明 | 本项目真实罚例 |
|---|---|---|
| **① 编号虚构 / 不可达** | 编号在 arXiv 库查不到 | `docs/studio.html` 的 Mip-Splatting 卡片曾写 `2312.21535`（查无此文）→ 正确为 **`2311.16493`**（CVPR 2024 Best Student Paper） |
| **② 名 ↔ 号错配** | 编号真实，但对应的是另一个方法 | 条目 `GES`(2402.17427)、描述却写 "Generalized Exponential Splatting" —— 该编号实为 **VastGaussian**（CVPR 2024，大场景）；已改名、更正描述、重归类为 Large-Scale |
| **③ venue 错** | 方法名与描述都对，但发表场所是错的 | `HybridGS`(2505.01938) 原标 CVPR 2025 → arXiv Comments 实为 **ICML 2025**；`GaussianBeV`(2407.14108) 原标 ECCV 2024 → 实为 **WACV 2025** |
| **④ 名 / venue / 描述全错** | 条目整体挪移 | `GS-Physics`(2409.08042) 实为 **Thermal3D-GS**（热红外新视角合成）→ 不仅改名，还把 venue 从 CVPR 2025 改为 **ECCV 2024**、把分类从 Embodied 改为 Cross-Domain |
| **⑤ 假名 / 派生后缀** | 在真实方法名后自造 `-v2` / `-2` / `-AD` / `+` 等伪续作后缀 | 规则：只有作者在 arXiv **标题**里印出来的才是真名（`FreeTimeGS++`、`MesonGS++`、`P2M++` 属此）；印不出来的（`Scaffold-GS+`、`GaussianSplatting-SLAM-v2`）＝伪名，删。 |

补充三条常见误判：
- **同名 ≠ 续作**：先比对**作者列表**。两篇 `GeoGS-SLAM`（作者零重叠）是两种独立方法，消歧词取自各自论文副标题，不得编造版本号。
- **描述性标题不是方法名**：论文从未自述方法名的（如 `Gaussian-Enhanced Surfel`、`View-Dependent Splatting Kernels`）不入目录，宁删勿编；有官方项目页自述名的除外（如 `HeadsUp`）。
- **条目描述也要核实**：方法对了不代表描述对了（`Spark 2.0` 曾被写成「NVIDIA 机器人仿真」，实为 World Labs 的 WebGL2 3DGS 渲染引擎）。

---

## 3. 工具：实时引文核查脚本

```
# 审一份稿件（md/txt），提取其中所有 arXiv 编号并逐个对照
python scripts/audit_manuscript_citations.py --file <manuscript.md>

# 查单个编号（回传 registry 里的方法名 / venue / arXiv 标题 / 名称吻合度）
python scripts/audit_manuscript_citations.py --id 2402.17427

# 查单个方法名（回传其编号与 venue；支持模糊候选）
python scripts/audit_manuscript_citations.py --name "HybridGS"
```

**输出解读**：
- `[RED FLAG]` → **禁用**。该编号在注册表与 arXiv 缓存中均无可用标题，属不可核实 / 疑似虚构。反虚构是本项目最优先的红线，**宁可删引也不补编**。
- `[WARN name↔title=no-overlap]` → **待人工裁定，不一定是错**。多数情况是缩写型命名（如 `FastFlowGS` 对应双关标题 "Racing in Volume with Flow Ensembles"、`DeG` 对应 "Generative 3D Gaussians with Learned Density Control"）——二者经核摘要证实都确系论文的自我指称。遇到 WARN 就走 §1 的 L2 / L3 人工裁定，**不要直接判伪造**。
- `[WARN] 不在 registry 但 arXiv 缓存有此文` → 真实的论文、尚未登记进 `methods.json`，可引用但建议补录。

> 注意：脚本所印的 `venue` 是 `methods.json` 的**登记值**，历史上被发现过错误。正式写进文献列表前务必按本文件 §1 复核一遍。

---

## 4. 审核清单（Checklist）

**写作时（每个引用落笔前）**
- [ ] 三元组对齐：方法名、arXiv 编号、venue 三者一致，且年份不与 venue 相矛盾。
- [ ] 名从主人：采用论文自述的叫法，最好有官方来源（项目页 / 论文自述），不用模块缩写拼凑方法名。
- [ ] 性能数字回原文核实，摘要里没写的不要声称。

**投稿前自查**
- [ ] 对稿件全文跑一遍 `--file` 模式，处理所有 `RED FLAG`。
- [ ] 逐个结掉 `WARN`：分析其究竟是缩写（可接受）还是错配（须修正），并留存核对记录。
- [ ] 检查是否有疑似派生后缀 `-v2` / `-2` / `-AD` 的自造名；有则对照 arXiv 标题确认或删除。
- [ ] 对照 `3dgs-paper-knowledge.md`：所选对照组在同一簇内，且指标成套（必须含资源类指标）。

**评审他人稿件时**
- [ ] 抽查其 3–5 条核心引用的三元组（用 `--id` / `--name`）；出现虚构编号即为致命伤。
- [ ] 核对它声称「SOTA」的对照组是否完备（按对应簇的常用数据集与基线表核），缺基线是常见攻击点。
- [ ] 检查同一工作在方法名上的一致性：若在不同章节改名或加后缀，值得怀疑。

---

## 5. 与本技能其它能力的关系

- 需要「预判审稿攻击点、准备 rebuttal」→ 加载 `reviewer-perspective.md`
- 需要「评创新性 / 产业价值」→ 加载 `paper-evaluation-framework.md`
- 需要「实验声称是否可溯源到服务器产物」→ 加载 `experiment-claim-verification.md`
- 需要「写什么 / 比什么候选、各簇数据集与指标」→ 加载 `3dgs-paper-knowledge.md`
- **需要「引用是否为真、归属是否正确」→ 就是本文件**

> **红线**：凡是事实层「真实与否」的判断，绝不可凭本技能任何文件的记忆作答；所有事实结论必须回到 `data/methods.json`、`.arxiv_cache.json` 或 arXiv API 原文。查不到就明确说「待人工核实」，不可补编。
