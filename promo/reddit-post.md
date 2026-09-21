# Reddit 发布文案（以书为主角）

**板块**: r/computervision（首选）/ r/MachineLearning / r/robotics / r/3DGS
**形式**: 文字帖 + 电子书首页截图 / 交互式浏览器 GIF（10 秒内）
**最佳时间**: 美东周二至周四上午（对应北京时间 21:00–23:00）

---

## 标题（三选一）

1. I wrote an open-source ebook on Spatial & Embodied Intelligence through 3D Gaussian Splatting — 859 methods, all arXiv-verified
2. Show r/computervision: a free, offline-readable textbook connecting 3DGS to embodied AI (with a 859-method knowledge base)
3. The "JPEG of 3D" is here (Khronos glTF 3DGS, NVIDIA NuRec). I wrote the textbook to actually understand it.

## 正文

NVIDIA spent GTC/CVPR 2026 telling us Physical AI is the next trillion-dollar wave — and kept pointing at one technique: **3D Gaussian Splatting**. Omniverse NuRec turns sensor captures into robot-testable scenes with 3DGS; InstantNuRec does one-click road reconstruction; Khronos + OpenUSD just ratified 3DGS as the "JPEG of 3D."

But when I went looking for a textbook that connects **3DGS → spatial representation → embodied intelligence → world models → safety**, there wasn't one. Plenty of awesome-lists, no through-line.

So I wrote one: **《深入理解空间智能与具身智能 · 以 3D Gaussian Splatting 为核心》** (free, single-file, offline-readable HTML).

What's inside:
- A single spine: **embodied agent = spatial representation × perception × planning × action**
- 11 chapters: NeRF→3DGS, the math/engineering core (incl. a 108+ bug-pattern debugging table), large-scale/dynamic/compression, semantic Gaussians, editing & generation, embodied foundations, 3DGS as spatial memory (GS-SLAM), object & articulated understanding, agent-driven digital twins, world models, safety & provenance
- Formula boxes, method-comparison tables, end-of-chapter questions, and **62 arXiv-cited references**

It's backed by an open, entry-by-entry arXiv-verified knowledge base:
- **859 3DGS methods / 23 categories**, every arXiv ID re-checked against the paper (method name must appear in title/abstract)
- **16 AI engineering skills** (paper reading, method comparison, experiment planning, training debugging…)
- an **MCP server with 34 tools** so agents can query the base directly

Read it / star the repo / open a PR: {{EBOOK_URL}}
(repo: https://github.com/jaccen/Awesome-Gaussian-Skills)

The honest part: "looks correct" and "is correct" are different. Every entry is traceable to source. Feedback and missing categories welcome.

**评论预案**: 见 hackernews-showhn.md 首评（how verified / why JSON not a DB / why not a website）。
