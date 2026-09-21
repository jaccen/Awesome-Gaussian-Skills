# 全渠道协同首发 Runbook（以电子书为主角）

目标：让《深入理解空间智能与具身智能 · 以 3D Gaussian Splatting 为核心》广泛传阅、快速建立行业影响力。
核心资产：电子书 `docs/spatial-embodied-intelligence.html`（2157 行自包含 HTML）+ 仓库知识库（859/23/16/34，全部 arXiv 逐条核验）。

---

## Step 0 — 拿到可分享 URL（门禁，必须先做）

当前仓库无 GitHub Pages / CNAME / 静态托管，电子书没有干净 URL。先发布：
- 用「发布为应用」skill 部署 `docs/spatial-embodied-intelligence.html`（单文件、零依赖）→ 得到 `{{EBOOK_URL}}`。
- 若改用 GitHub Pages：在仓库 Settings → Pages 指向 `docs/`，URL 即 `https://jaccen.github.io/Awesome-Gaussian-Skills/docs/spatial-embodied-intelligence.html`。
- 拿到后，**全局替换**本 runbook 与 `reddit-post.md / hackernews-showhn.md / wechat-launch.md / zhihu-post.md / x-thread.md` 中的 `{{EBOOK_URL}}`。

## Step 1 — T-0（发布前半天）：仓库门面

执行 `promo/github-facelift.md`：
1. 上传 `promo/social-preview.png` 作 Social preview；
2. 加 Topics（3d-gaussian-splatting / physical-ai / embodied-ai / mcp / knowledge-base …）；
3. About 的 **Website 指向 `{{EBOOK_URL}}`**，Description 写"859 arXiv-verified 3DGS methods + an open ebook on Spatial & Embodied Intelligence"；
4. 仓库 Pinned、发 Release **v0.9.x「随书发布」**、开 Discussions 并置顶"Submit your paper / 方法提名"帖；
5. README 首屏追加 Star History 卡片。

## Step 2 — T-1 窗口（周二~周四 21:00–23:00 北京时间 = 美东上午）

**1 小时内集中发布**，每条都链 `{{EBOOK_URL}}`，并互相 @/引用形成回流：

1. GitHub Release 已发 → Discussions 置顶"方法提名"；
2. **Show HN**（`hackernews-showhn.md`，首评立刻跟）；
3. **Reddit r/computervision**（`reddit-post.md` + 首页截图/GIF）；
4. **公众号**（`wechat-launch.md`，刘润式，末尾无话题标签）；
5. **知乎专栏**（`zhihu-post.md`）；
6. **X/Twitter 线程**（`x-thread.md`，@ 论文作者与社区账号）。

补充渠道（同窗口或次日）：Bilibili 15 分钟导读（录屏 + 口播）、arXiv 作为 survey/position 预印本。

## Step 3 — 发布后 2 小时：互动防守

- HN/Reddit 首评答疑：how verified / why JSON not a DB / why not a website；
- 公众号评论区置顶"免费离线版链接"；
- 知乎回答评论区收"方法提名"。

## Step 4 — 复利（长期，让书持续"活着"）

- 每日 arXiv 扫描 → 周末「本周新进展」线程/公众号，书持续更新；
- 开放 PR 征集方法/章节勘误，社区共建；
- 英文版 + 日/韩摘要出海；
- 给电子书加 BibTeX「如何引用」块，让论文可 cite（行业影响力的硬通货）。

## KPI

- 日-1：50+ star → 进 GitHub trending → 二次曝光；
- 3 个月：1k+ star、被 ≥3 篇综述/博客引用、知乎回答千赞级、至少 1 篇论文 cite 本书。

## 一致性红线

所有对外文案数字必须与 `data/methods.json` 一致：**859 方法 / 23 分类 / 16 技能 / 34 MCP 工具**，且"可核实"口径不得弱化。
