# 参考文献时效与刷新机制（Reference Freshness Policy）

> **用途**：本技能 references/ 下的范文清单、venue 矩阵、规模门槛都会随时间失效。本文件规定**什么算过期、什么时候必须刷新、怎么刷新、怎么留痕**。
> **适用范围**：`domain-exemplar-templates.md`、`experiment-scale-thresholds.md`、`3dgs-domain-venues.md`、`top-paper-patterns.md`、`chinese-venue-routing-by-domain.md` 等含 venue/范文/数字的参考文件。
> **整理日期**：2026-10-21

---

## 0. 文件新鲜度元数据（每份参考文件头部应含）

建议每份范文/venue 类文件在头部写明：

```yaml
快照日期: 2026-10-21
下次建议复查: 2027-03（CVPR 2027 论文上线后）
覆盖范围: 3DGS / 具身智能 / 空间智能 / Agent 四方向代表作
已知空缺: SDGS、GSP-3D 无 arXiv 版
负责人: <维护者>
变更记录:
  - 2026-10-21 初版；核验 21 个 arXiv ID，修正 π₀ 错配
```

> 没有元数据的参考文件，默认视为"快照日期不明"，优先刷新。

---

## 1. 三类失效（过期不是一种，是三种）

| 类型 | 表现 | 危害 | 检测难度 |
|------|------|------|---------|
| **换届型失效** | 文中"最新"是上一届会议（如 2026 年 10 月仍称 CVPR 2026 为"最新"） | 选题判断滞后，漏掉整届新工作 | 易（看日期） |
| **超越型失效** | 某条"SOTA/代表方法"已被新工作超越 | 引用过时基线，审稿人质疑 | 中（需查引用/后续工作） |
| **链接型失效** | arXiv ID 失效、ID 指向别的论文、DOI 变更 | **最严重**：直接构成引用错误 | 高（必须逐个核验标题） |

> **优先级**：链接型失效 > 换届型失效 > 超越型失效。链接错误是硬伤（会被判引用造假），换届滞后只是"不够新"。

---

## 2. 刷新触发条件（满足任一即触发）

- [ ] 目标会议**新一届 proceedings 上线**（CVPR/ICCV/ECCV/NeurIPS/ICML/ICLR/CoRL/RSS/SIGGRAPH 任一）
- [ ] 距上次快照 **超过 6 个月**
- [ ] 发现任一 arXiv ID **标题不匹配**或 404
- [ ] 准备**正式投稿**前（无论距上次刷新多久，必须复核要引用的每一条）
- [ ] 某方向出现**范式级新工作**（改变问题定义的量级，如新的表示范式）
- [ ] 期刊**征稿范围/格式**调整（影响 `<venue>-format.md`）

---

## 3. 会议周期参考（用于预判何时该刷新）

> ⚠️ 以下为**常见月份区间**，逐年在变，**必须以官网当届公告为准**。本表只用于"预判刷新时点"，不可用于安排投稿截止。

| Venue | 常见论文上线/召开月份 | 刷新建议 |
|-------|---------------------|---------|
| AAAI | 2 月 | 3 月复查 |
| ICLR | 4-5 月 | 6 月复查 |
| ICRA | 5 月 | 6 月复查 |
| CVPR | 6 月 | **7 月复查（四方向必刷）** |
| ICML | 7 月 | 8 月复查 |
| RSS | 7 月 | 8 月复查 |
| SIGGRAPH | 8 月 | 9 月复查 |
| ECCV（偶数年） | 9-10 月 | 11 月复查 |
| ICCV（奇数年） | 10 月 | 11 月复查 |
| IROS | 10 月 | 11 月复查 |
| CoRL | 11 月 | 12 月复查 |
| NeurIPS | 12 月 | **次年 1 月复查（四方向必刷）** |
| SIGGRAPH Asia | 12 月 | 次年 1 月复查 |
| 3DV | 3 月 | 4 月复查 |
| TOG / TVCG / TPAMI / TRO / RA-L | 滚动出版 | 每 6 个月抽查 |

**两个必刷节点**：CVPR（7 月）与 NeurIPS（次年 1 月）。这两处覆盖了四方向绝大多数量级最高的新工作。

---

## 4. 刷新清单（按文件）

| 文件 | 必须更新什么 | 频率 |
|------|-------------|------|
| `domain-exemplar-templates.md` | ① 每方向范文清单（补新一届代表作，替换被超越者）② arXiv ID 核验记录 ③ 贡献配方是否仍成立 ④ 避坑清单（审稿风向会变） | 每届 CVPR/NeurIPS 后 |
| `experiment-scale-thresholds.md` | ① 各方向门槛中位数（用新一届 accepted papers 重新取中位数）② 新增指标要求（如 Agent 的成本披露） | 每 12 个月 |
| `3dgs-domain-venues.md` | ① 26 类计数与 venue 列 ② 热度标记 ③ 与 `data/methods.json` 快照对齐 | 每次 methods.json 更新后 |
| `top-paper-patterns.md` | ① 精读样本是否仍是"当届最佳" ② 新增范式是否改变共性规律 | 每届 CVPR 后 |
| `chinese-venue-routing-by-domain.md` | ① 各刊征稿范围 ② 交叉落点判断 ③ 双语发表政策 | 每 12 个月 |
| `<venue>-format.md` × 17 | 官方模板/投稿须知变更 | 投稿前必查 |

---

## 5. 刷新 SOP（六步）

### Step 1｜跑自动检测，先找出硬伤

```bash
# 在项目根目录执行（脚本在工程 scripts/，不随技能分发）
python scripts/check_reference_freshness.py skills/cg-paper-writing/references/domain-exemplar-templates.md
# 被限流时加大批次间隔
python scripts/check_reference_freshness.py <file.md> --delay 10 --months 18
```

脚本做什么：
- 正则提取文中所有 arXiv ID（跳过 `<!-- freshness:ignore-start/end -->` 区间与代码块——核验记录里的历史错配 ID 就靠这个标记排除）；
- 小批次（≤5/批，默认间隔 6s）调 arXiv API 核对；
- 比对**返回标题**与文中条目名（首词命中 / 前缀 / 词重叠三级判定）；
- 报四类问题：`MISMATCH`（标题不符）、`NOT_FOUND`（ID 确实查不到）、`API_ERROR`（请求失败，**不是** ID 问题）、`STALE`（发布超过阈值月数）；
- 同一 ID 在表格与链接列表重复出现时自动去重。

判读：
- `MISMATCH` / `NOT_FOUND` → **P0，必须当次修掉**；退出码 1
- `API_ERROR` → **不是引用错误**，是网络/限流；加大 `--delay` 重跑，退出码 2（结论不确定）
- `STALE` → P1，评估是否已被超越，不必然删

> **不要看到退出码非 0 就以为引用坏了**：`API_ERROR` 只表示"这次没验成"。把网络失败误判成 ID 不存在，会制造假警报并导致误删正确条目。

### Step 2｜补新一届代表作

按 `domain-exemplar-templates.md` 每方向的表格，用新 proceedings 检索补充：
- 每方向补 1-3 篇"新范式/新最佳论文"级工作；
- 若某旧条目已被普遍超越，标注"已被 X 超越"或移出主表（**不要静默删除**，保留在变更记录里）。

### Step 3｜重新校准规模门槛（仅 experiment-scale-thresholds.md）

按该文件 §5：取目标 venue 近两年 3-5 篇 accepted papers 的**中位数**，更新表内数字。不要用 best paper 校准。

### Step 4｜更新元数据与变更记录

改头部 `快照日期` / `下次建议复查`，并在 `变更记录` 追加一行（日期 + 做了什么 + 核验结果）。

### Step 5｜双副本同步 + 重打包

```bash
python scripts/sync_skill_copies.py --skill cg-paper-writing --apply
python scripts/package_skill_zip.py cg-paper-writing
python scripts/scan_skill_privacy.py          # 须 0 hits
python scripts/check_garble.py <改动的 md>     # 须 0 处
```

> **顺序纪律**：**先改完 SKILL.md 与 manifest.yaml，再跑同步**。只改 SKILL.md 不改 manifest 会丢路由；先同步后改 manifest 会让副本过期（两者都踩过）。

### Step 6｜回归校验

```bash
python .workbuddy/tmp/verify_cgpw_routing.py   # 轴值↔路由键↔文件存在
```
确认：轴值数 = 路由键数、所有引用文件存在、md5 双副本一致。

---

## 6. 失效等级与响应时限

| 等级 | 情形 | 响应 |
|------|------|------|
| **P0** | arXiv ID 指向别的论文 / 404 / venue 写错 | 当次会话内修正，并记录到变更记录 |
| **P1** | "最新"已跨届 / 某方法被明显超越 / 门槛数字过时 | 下次刷新窗口内处理 |
| **P2** | 表述可优化 / 新增可选条目 | 排入 backlog，不阻塞投稿 |

---

## 7. 已知的长期空缺（不要误当错误）

| 条目 | 状态 | 处理方式 |
|------|------|---------|
| SDGS（CVPR 2026） | 无 arXiv 版 | 引用走 CVF Open Access |
| GSP-3D（Frontiers in Neurorobotics 2026） | 无 arXiv 版 | 引用走期刊 DOI |
| VJEPA (Variational, ICML 2026) | 非 arXiv | 引用 PMLR v306:47703-47731 |
| SpatialLLM（武大） | 期刊 + GitHub，无 arXiv | 引用期刊 DOI 或仓库 |

> 这些是"确实没有"，不是"没查到"。刷新时若发现它们有了 arXiv 版，应补上并从本表移除。

---

## 8. 一句话原则

**"最新"是会腐烂的形容词，"2026-10 快照"是不会腐烂的事实。** 所有涉及"最新/前沿/SOTA"的表述，都必须能追溯到某个带日期的快照，否则不要写。
