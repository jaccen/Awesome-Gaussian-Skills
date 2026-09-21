# Hacker News — Show HN（以书为主角）

**形式**: Show HN 帖
**标题**（HN 规范：不加感叹号、不堆卖点）:

```
Show HN: An open-source ebook on Spatial & Embodied Intelligence via 3D Gaussian Splatting
```

**首发链接**: {{EBOOK_URL}}
（若发布为应用前先用仓库地址：https://github.com/jaccen/Awesome-Gaussian-Skills ，并在首评贴电子书路径）

---

## 首评（First comment，发布后立刻发出）

Hi HN — I'm a researcher who kept losing track of how fast 3DGS moves (dozens of new papers weekly), and noticed nobody had written the textbook that ties 3DGS to embodied AI. With NVIDIA pushing 3DGS as the spatial backbone of Physical AI (NuRec, InstantNuRec, the new Khronos glTF 3DGS standard), I figured the through-line was worth writing down.

So I wrote a free, single-file, offline-readable ebook: **《深入理解空间智能与具身智能 · 以 3D Gaussian Splatting 为核心》**.

- **One spine**: embodied agent = spatial representation × perception × planning × action
- **11 chapters** from NeRF→3DGS through the engineering core (incl. a 108+ bug-pattern debugging table), semantic Gaussians, embodied foundations, 3DGS-as-spatial-memory (GS-SLAM), agent-driven digital twins, world models, and safety/provenance
- **62 arXiv-cited references**, formula boxes, comparison tables, end-of-chapter questions

It's backed by an open knowledge base where **every one of 859 methods / 23 categories** is re-verified against its arXiv paper (name must appear in title/abstract) — no inflated counts, no fabricated method names. Plus 16 agent skills and an MCP server (34 tools) so local agents can query it.

Stack: single static HTML (no build step), JSON source of truth, CI enforces cross-carrier consistency.

Happy to answer anything about the verification pipeline or the writing. What would make this most useful to you?

**注意事项**:
- HN 反自我推销：正文不堆 "amazing/awesome"，首评语气克制、技术细节为主。
- 准备回答 "why not a database/website instead of JSON in git" → 可版本化、可 diff、agent 可直接消费、无服务器成本。
- 准备回答 "how do you verify" → arXiv API 逐条回查 + 名称归一化匹配 + 人工复核同名误配；审计报告见 docs/data-accuracy-audit-*.md。
- 周二至周四早 8–10 点（美东）发帖，避免周五/周末。
