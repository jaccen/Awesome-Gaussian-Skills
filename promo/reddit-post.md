# Reddit 发布文案

**发帖板块**: r/computervision（首选）/ r/MachineLearning / r/3DGS（如有）
**形式**: 文字帖 + 演示 GIF（用 methods.html 搜索/弹窗/筛选录屏，10 秒内）
**最佳时间**: 美东周二至周四上午（对应北京时间晚间）

---

## 标题（三选一）

1. I built a searchable, arXiv-verified knowledge base of 859+ 3D Gaussian Splatting methods — with a free interactive explorer
2. Stop digging through awesome-lists: every 3DGS method here is verified against its actual arXiv paper
3. Show r/computervision: 15 AI agent skills + MCP server that cover the whole 3DGS research lifecycle

## 正文

I kept a personal list of 3D Gaussian Splatting papers for my own research, and it grew into something bigger — so I open-sourced it:

**Awesome Gaussian Skills** → https://github.com/jaccen/Awesome-Gaussian-Skills

What's inside:

- **Interactive explorer** (hosted on GitHub Pages, no install): search / filter / sort every method, click any card for the abstract (EN + 中文) and direct links to paper & code
- **859 methods, 23 categories** — every arXiv ID was re-verified against the arXiv API (title ↔ name match checked entry by entry)
- **15 research-grade agent skills** covering the full lifecycle: paper reading, method comparison, code review, experiment planning, NeRF→3DGS migration, compression & deployment, training debugging
- **A working MCP server** (21 tools) so Claude/other agents can drive the knowledge base directly
- **Daily arXiv scan** (GitHub Action) that reports newly submitted 3DGS papers against the database

The honest part: this started as a web-scraped catalog, and when I audited it properly I found a bunch of bad entries — method names that don't exist and IDs pointing to unrelated papers. I deleted or fixed 181 of them and now ship with a "verified" flag per entry instead of inflated numbers. Better 678 real ones than 858 with junk.

Feedback welcome — especially on which method categories are missing. Issues and PRs open.

**评论预案**:
- 有人问"跟 awesome-3dgs 有什么区别" → 强调：结构化 JSON 知识库 + 逐条核验 + agent 可消费（MCP/skills），不是链接清单
- 有人报错链 → 致谢 + 请提 issue，说明"每条都有 sources 字段标注数据来源，可追溯"
