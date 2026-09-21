# X / Twitter 发布线程（英文 · 海外作者与社区）

**形式**: 9 条线程，发布后 @ 相关论文作者与 NVIDIA 社区账号（@NVIDIA、@DrJimFan 等，谨慎 @ 避免 spam）
**最佳时间**: 与 HN/Reddit 同窗口（美东上午）
**链接**: 每条都带 {{EBOOK_URL}}；末条带仓库

---

1/ NVIDIA keeps calling 3D Gaussian Splatting the "JPEG of 3D" (Khronos glTF 3DGS + OpenUSD 3DGS ratified 2026). It's becoming the spatial backbone of Physical AI. I wrote the textbook to understand why. 🧵

2/ 3DGS isn't just a renderer. Omniverse NuRec turns sensor captures into robot-testable scenes; InstantNuRec does one-click road reconstruction. It's how robots get a *machine-readable* world.

3/ But the field moves at dozens of papers/week. Lists exist; a through-line from 3DGS → spatial repr → embodied agent → world model → safety did not. So I wrote one.

4/ "深入理解空间智能与具身智能 · 以 3DGS 为核心" — free, single-file, offline-readable. Spine: embodied agent = spatial representation × perception × planning × action.

5/ 11 chapters: NeRF→3DGS, engineering core (108+ bug-pattern table), compression, semantic Gaussians, embodied foundations, 3DGS-as-memory (GS-SLAM), articulated understanding, agent-driven twins, world models, safety.

6/ Backed by an open knowledge base: 859 methods / 23 categories, every arXiv ID re-verified (name must appear in title/abstract). No inflated counts. Plus 16 agent skills + an MCP server (34 tools).

7/ Every reference (62) carries an arXiv ID. Every data point is traceable. "Looks correct" ≠ "is correct" — we made verifiability the baseline.

8/ Why now: synthetic-data market → $1.79–3.7B by 2030 (CAGR 35–42%). The infra is being standardized. The textbook was missing.

9/ Free, offline, packable. Read it, star the repo, open a PR.
{{EBOOK_URL}}
Repo: https://github.com/jaccen/Awesome-Gaussian-Skills
