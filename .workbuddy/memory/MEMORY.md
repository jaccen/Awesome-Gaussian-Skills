# 项目长期记忆 — Awesome-Gaussian-Skills

## 当前基线（v0.9.0，2026-09-16）

- **总数 678 / 23 分类 / arXiv 568 (83%) / 代码链接 130 (19%)**——这是经全库「名称↔论文」逐条核验后的诚实计数，
  此前 858 含 181 条虚构/错挂条目，勿再引用旧计数。
- **单一事实源**：`data/methods.json`（`count` / `category_count` / `methods[]`，字段：name, arxiv_id, venue, year, category, desc, code_url, sources）。
- **必须同步的载体**（计数 100% 一致，CI 检查）：`3dgs-methods-overview.csv`、`docs/methods.html`（METHODS 数组，2026-09-16 从 index.html 迁入）、
  `docs/abstracts.js`（以方法名为键）、`references/3dgs-methods-overview.md`。
- **计数引用文件（改总数时需联动，共 43 个）**：`README.md`、`README_CN.md`、`CLAUDE.md`、`package.json`、
  `docs/` 四页 + `docs/app-common.js`（hero 徽章 / i18n 中英）、`docs/anthropic-pr-preparation.md`、`mcp-server/README.md`、
  `3dgs-methods-overview.md`、`references/3dgs-spatial-intelligence-verified-references.md`、
  10 个 `skills/*/SKILL.md`、`skills/3dgs-method-compare/static/core-stance.md`、`skills/3dgs-engineering-guide/static/industry-landscape.md`。
- **版本号位置**：`package.json`、`README.md` / `README_CN.md`（最新更新段）、`docs/index.html` + `docs/app-common.js`（hero.version 中英）。
- 历史 changelog **不改写**，修正以新的 changelog（同日用 `-v2/-v3/...` 后缀）记录。
- 涨 star 配套：`promo/`（Reddit / Show HN / 公众号文案 + social-preview.png + github-facelift.md 清单）、
  `scripts/daily_arxiv_scan.py` + `.github/workflows/daily-arxiv.yml`（每日扫描，本地已实测）。

## 已知坑

- `scripts/build_knowledge_base.py` 从 CSV + methods.html 合并去重，**不读 methods.json**；直接运行会回退计数并丢失后续新增。
- `scripts/validate_knowledge_base.py` 只校验 ID 格式 / 重复 / 黑名单 / 载体计数，**不校验方法名与论文是否对应**；
  其查重用 `casefold()`，检不出「转义名 vs 真名」类隐性重复（如 `3DGS\u00B3` vs `3DGS³`）。
- **`docs/index.html` 的 i18n 翻译函数是 `window.AGS_T`，不是 `window.t`**（2026-09-16 起）。
  原因：`playcanvas.min.js` 压缩产物会向 `window` 泄漏 `t` 并覆盖 i18n 函数，导致全页文案被清空。
  PlayCanvas 已改为按需加载（`window.ensurePlayCanvas()` / `openScene()`），新增脚本一律用 `AGS_T`，
  不要依赖 `window.t`，也不要往 `window` 上挂单字母变量。
- **同日修复 methods.html 时，METHODS 数组的 `arxiv:` 字段与 references md 的链接 ID 都要单独同步**——
  只改 json 会导致页面/文档仍显示旧编号（v0.9.0 曾因此返工一次）。
- 每日 arXiv 扫描窗口默认 `cs.CV` / `cs.GR`；主分类为 `physics.*` 的 3DGS 方法（如 ptychography 方向）会被漏掉，
  必要时用 `all:"gaussian splatting"` 全库检索补扫。

## 前端页面约定（docs/，2026-09-16 起为四页结构）

- **站点结构**：`index.html`（精简主页，19.7KB，仅 hero + 4 张子页入口卡 + 旧锚点重定向）、
  `methods.html`（方法库，METHODS 数组所在页）、`studio.html`（Text2Word/Img2GS/Showcase）、
  `skills.html`（技能/安装/趋势）；共享 i18n 在 `docs/app-common.js`（含子页标题键 `window.AGS_TITLE_KEY`）。
- 方法探索器：预建小写检索索引 + 160ms 防抖 + 分块渲染（首屏 48 张，哨兵自动续载）；
  卡片用自定义 class（`.mc*`）而非 Tailwind 原子类（Tailwind CDN 会对新 DOM 重新扫描编译）。
- 探索器状态写 URL：`?q=&cat=&sort=`；详情深链 `#m=<方法名>`；语言用 `#en/#zh`，锚点 `#methods` 等，
  三者共存于 hash/query，新增状态不得冲突。
- i18n：静态文案用 `data-i18n` / `data-i18n-ph` / `data-i18n-aria`，动态用 `AGS_T(key)`，
  新键需同时加 zh 与 en 两处。
- `setLang` 对 renderTabs/renderMethods/renderSkills/renderInstall/renderTrends 逐函数守卫，
  新增子页动态渲染函数时把它加进 app-common.js 的守卫列表。

## 准确性核查协议（2026-09-16 建立，v0.9.0 已执行一轮全量修复）

1. ID 可达性：分批（≤40 个/批）调用 `http://export.arxiv.org/api/query?id_list=...`，请求间隔 ≥4 s；
   arXiv 限流凶猛，批间失败要退避重试（10-20s），并发跑两个扫描脚本会互相触发限流。
2. 名称一致性：归一化方法名后判断是否为论文 title+summary 子串；缩写类命名需容错
   （Deformable-3DGS ↔ "Deformable 3D Gaussians"），但容错只允许用于核验、不允许用于硬凑。
3. 名称反查：对不匹配项用 `ti:"<名称>"` 检索，区分「ID 挂错」（名称真实存在）与「名称虚构」（arXiv 无此名）。
   同名误配必须人工裁定（SAGS 有结构感知版与内窥镜版两篇、CompGS 有 4 篇同名、UniGS 有 3 篇 GS 同名）；
   **凭记忆报的 ID 一律先经 API 验证**——InFusion 实为 2404.11613（记忆 2404.03501 是量子论文）、
   CityGaussian 实为 2404.01133、Scaffold-GS 实为 2312.00109。
4. 命名规则：**采用论文自述的方法名**。不得用模块缩写拼凑方法名（2609.07231 的模块是 PGS，
   方法本体名为 `PG-Pose`，曾被误记为 `PlanarGS-Pose`）。
5. 警惕在真实方法名后派生 `-v2` / `-2` / `-AD` 等伪续作后缀的条目（GaussianShader-v2 已修）。
6. 名称不可核实的条目（EGS/EMGS/LRG/BAGS/RAF/HGS）宁可删除，不保留存疑数据——
   678 条全真实比 858 条含 181 条虚假更有价值，这也是对外的宣传点。
