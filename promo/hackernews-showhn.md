# Hacker News — Show HN 文案

**形式**: Show HN 帖
**标题（HN 规范：不加感叹号、不堆卖点）**:

```
Show HN: 859+ 3D Gaussian Splatting methods, verified against arXiv, with an AI toolkit
```

**首发链接**: https://github.com/jaccen/Awesome-Gaussian-Skills
（若做落地页后再发，用 https://jaccen.github.io/Awesome-Gaussian-Skills/ 并在首评贴仓库）

---

## 首评（First comment，发布后立刻发出）

Hi HN — I'm a researcher working on 3D Gaussian Splatting, and I kept losing track of how fast the field moves (dozens of new papers every week). So I built this:

- **Searchable catalog of 859+ 3DGS methods** — live explorer at [链接], everything filterable by category/venue/year, with paper + code links
- **Verification over inflation**: an audit script checks every entry's arXiv ID against the actual paper (name must appear in title/abstract). When I first ran it, 181 entries failed — fake method names, IDs pointing to math and astronomy papers. I fixed or removed them all; the counter you see is the count that survived verification.
- **Agent skills + MCP server**: 15 skills (paper reading, method comparison, experiment planning, training debugging...) and an MCP server with 21 tools, so local agents can query the knowledge base directly
- **Daily arXiv tracker**: a scheduled GitHub Action scans new submissions and diffs them against the database

Stack: single-page static site (no build step for the explorer), Python for the data pipeline, JSON as the source of truth, CI enforces cross-carrier consistency.

Happy to answer questions about the data pipeline or the verification approach. What would make this most useful to you?

**注意事项**:
- HN 反自我推销：正文不要写 "amazing/awesome" 堆砌，首评语气克制，技术细节为主
- 准备回答 "why not a database/website instead of JSON in git" → 可版本化、可 diff、agent 可直接消费、无服务器成本
- 准备回答 "how do you verify" → arXiv API 逐条回查 + 名称归一化匹配 + 人工复核同名误配，审计报告在 docs/data-accuracy-audit-*.md
- 周二至周四早 8-10 点（美东）发帖，避免周五/周末
