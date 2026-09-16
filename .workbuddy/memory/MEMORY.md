# 项目长期记忆 — Awesome-Gaussian-Skills

## 知识库数据结构与流程

- **单一事实源**：`data/methods.json`（`count` / `category_count` / `methods[]`，字段：name, arxiv_id, venue, year, category, desc, code_url, sources）。
- **必须同步的载体**（计数 100% 一致，CI 检查）：`3dgs-methods-overview.csv`、`docs/index.html`（METHODS 数组）、
  `docs/abstracts.js`（以方法名为键）、`references/3dgs-methods-overview.md`。
- **计数引用文件（改总数时需联动）**：`README.md`、`README_CN.md`、`CLAUDE.md`、`package.json`、
  `docs/index.html`（hero 徽章 / i18n 中英各 1 处）、`docs/anthropic-pr-preparation.md`、`mcp-server/README.md`、
  `3dgs-methods-overview.md`、`references/3dgs-spatial-intelligence-verified-references.md`、
  10 个 `skills/*/SKILL.md`、`skills/3dgs-method-compare/static/core-stance.md`、`skills/3dgs-engineering-guide/static/industry-landscape.md`、
  `studio/web/src/i18n/zh.ts`、`studio/web/src/views/Dashboard.vue`。
- **版本号位置**：`package.json`、`README.md` / `README_CN.md`（最新更新段）、`CLAUDE.md`、`docs/index.html`（hero.version 中英）。
- 历史 changelog **不改写**，修正以新的 changelog（同日用 `-v2` 后缀）记录。

## 已知坑

- `scripts/build_knowledge_base.py` 从 CSV + index.html 合并去重，**不读 methods.json**；直接运行会回退计数并丢失后续新增。
- `scripts/validate_knowledge_base.py` 只校验 ID 格式 / 重复 / 黑名单 / 载体计数，**不校验方法名与论文是否对应**。
- 每日 arXiv 扫描窗口默认 `cs.CV` / `cs.GR`；主分类为 `physics.*` 的 3DGS 方法（如 ptychography 方向）会被漏掉，
  必要时用 `all:"gaussian splatting"` 全库检索补扫。

## 准确性核查协议（2026-09-16 建立）

1. ID 可达性：分批（≤90 个/批）调用 `http://export.arxiv.org/api/query?id_list=...`，请求间隔 3.5–4 s。
2. 名称一致性：归一化方法名后判断是否为论文 title+summary 子串；缩写类命名（3DGS ↔ 3D Gaussian Splatting）会产生误报，需二次判别。
3. 名称反查：对不匹配项用 `ti:"<名称>"` 检索，区分「ID 挂错」（名称真实存在）与「名称虚构」（arXiv 无此名）。
   注意同名误配（SuGaR / SUGAR、EMGS / 肌电、LRG / 星系巡天、3DGS / 3DG-STFM），候选结果必须人工复核。
4. 命名规则：**采用论文自述的方法名**。不得用模块缩写拼凑方法名（2609.07231 的模块是 PGS，
   方法本体名为 `PG-Pose`，曾被误记为 `PlanarGS-Pose`）。
5. 警惕在真实方法名后派生 `-v2` / `-2` / `-AD` 等伪续作后缀的条目。
