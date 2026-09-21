# GitHub 仓库门面优化清单（一次性操作，约 30 分钟）

## 1. Social Preview 图

- 文件：`promo/social-preview.png`（1280×640，已生成）
- 操作：仓库页 → **Settings** → General → **Social preview** → 上传该图
- 作用：决定所有社交媒体（Reddit/Twitter/微信/Telegram）分享链接时的卡片首印象

## 2. Topics（站内搜索唯一入口，建议加满）

Settings → General → Topics，依次添加：

```
3d-gaussian-splatting  gaussian-splatting  computer-graphics  computer-vision
neural-rendering  radiance-fields  arxiv  awesome-list  awesome
knowledge-base  mcp  mcp-server  ai-agents  claude  skill-library
```

## 3. About 栏（一句话 + 链接）

**Description**（英文，短版）：

```
Daily-updated, arXiv-verified knowledge base of 859+ 3D Gaussian Splatting methods — with 15 AI agent skills, an MCP server, and an interactive explorer.
```

**Website**：填 GitHub Pages 地址（如 `https://jaccen.github.io/Awesome-Gaussian-Skills/`）

**Release 选项**：勾选 Releases、Packages 前两项保持默认

## 4. 置顶与 Release

- Profile 页 Pinned：置顶本仓库
- 用 Releases 发 **v0.9.0 — Data Accuracy Release**：tag 已有版本体系，release notes 直接粘贴 `changelog/2026-09-16-v5.md` 的英文摘要（release 会进入 follower feed）
- Discussions：Settings → 勾选 Discussions（降低互动门槛，公告区置顶"Submit your paper"帖）

## 5. README 首屏建议（可选，5 分钟）

- 在 Badges 区追加 Star History 卡片：

```markdown
[![Star History Chart](https://api.star-history.com/svg?repos=jaccen/Awesome-Gaussian-Skills&type=Date)](https://star-history.com/#jaccen/Awesome-Gaussian-Skills&Date)
```

- 「zero fabrication」表述已随 v0.9.0 改为可证实口径（逐条 arXiv 核验 + 审计报告链接），无需再改

## 6. 发布节奏（重要）

GitHub trending 按天统计 star 增速。建议：

1. 先完成上面 1-5（半天内）
2. 选一个**工作日**（周二~周四），北京时间 21:00-23:00（美东上午）同时发：
   - Reddit r/computervision（`promo/reddit-post.md` + 演示 GIF）
   - Show HN（`promo/hackernews-showhn.md`，首评贴技术细节）
   - 公众号（`promo/wechat-article.md`）
   - X/Twitter：@ 论文作者与 3DGS 社区账号
3. 一天 50+ star 即有进 trending 可能，进榜带来二次曝光
