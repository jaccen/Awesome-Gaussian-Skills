===== README.md
mbodied intelligence, and walks every chapter back to concrete methods and skills you can use today. Read the book to understand the map; use the repo to ship the territory.

</details>

## What's New (Sep 2026)

### Latest Update (Sep 21, 2026): **v0.9.4 — Multi-Channel Harvest: 700 → 862 Methods + Accuracy Overhaul** ⭐

Knowledge base expanded from **700 to 862 verified methods** (+162, +23.1%) through a multi-channel arXiv
harvest over the last 150 days. Six query families (`cs.CV` / `cs.GR` / `cs.RO` / full-corpus /
`abs:"3D Gaussian Splatting"` / `ti:"Gaussian Splatting"`) returned 395 candidates; after verification
**162** were admitted. Also in this release:

- **Verification protocol (R1–R6)**: every admission requires the paper's *self-stated* method name,
  reproduced in its own abstract; multi-word names must contain a proper-noun token — this alone rejected
  67 descriptions 
===== README_CN.md
trong>为什么要写这本书（以及它和本仓库的关系）</strong></summary>

这本书是本仓库*数据层*之上的*叙事层*。仓库给你 862 方法名、摘要和 15 个工程技能 —— 但没有把它们串起来的主线。这本书补上了这条主线：它论证*为什么* 3DGS 成为了空间智能与具身智能之间的桥梁，并在每章末尾回扣到今天就能用的具体方法和技能。读这本书理解地图，用这个仓库耕耘疆土。

</details>

## 最新动态（2026 年 9 月）

最新更新（9 月 21 日）：**v0.9.4 — 多渠道抓取：700 → 862 个方法 + 准确性全面核查** ⭐

通过多渠道 arXiv 检索（近 150 天），知识库从 **700 条扩展至 862 条已验证方法**（+162，+23.1%）。
六个检索式（`cs.CV` / `cs.GR` / `cs.RO` / 全库 / `abs:"3D Gaussian Splatting"` / `ti:"Gaussian Splatting"`）
共召回 395 篇候选，经准确性核验后**收录 162 条**。本版本同时完成：

- **核验（R1–R6）**：每个入库条目的方法名必须取自论文**自述**且在其摘要中复现；多词名称须含专有形态 token——
  仅此一项就剔除了 67 个"把描述性短语当方法名"的条目（如 `Capacity-Controlled`、`Scene-Level`）。
  114 条边界候选逐条精读摘要裁定，25 条纳入、其余剔除。
- **准确性修复**：57 条参考文献的"显示 ID 与链接 ID 不一致"已修正（全部为显示正确、链接错误）；
  **删除 13 条错挂条目**——例如 `Dynamic 3D Gaussians` 指向的 2309.13114 实为一篇磁性自旋玻璃物理论文，
  `GS-LRM-v2` 实际指向 DOF-GS。全部条目均已过 arXiv API 实查。
- **AIGC 痕迹清除**：29 个文本文件；21 张历史损坏 JPEG 已恢复并按安全算法
