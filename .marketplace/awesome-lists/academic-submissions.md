# Academic Awesome-List Submissions

Ready-to-paste entries for the curated academic lists in the 3DGS / NeRF /
computer-graphics space. Submit one PR per list; keep the description to one
line, match each list's existing style, and link the specific section
(toolbox / skills), not just the repo root.

---

## 1. MrNeRF/awesome-3D-gaussian-splatting
Repo: https://github.com/MrNeRF/awesome-3D-gaussian-splatting (8.9k★, the
canonical 3DGS list)

Add under the **Toolboxes / Utils** (or "Resources") section, near other
tooling:

```markdown
- [Awesome Gaussian Skills](https://github.com/jaccen/Awesome-Gaussian-Skills) - AI agent skills + MCP server for 3DGS research: 896-method catalog, 15 skills (paper reader, method compare, experiment planner, code reviewer, training debugger, visualizer), and a stdio MCP server for agent-driven 3DGS rendering.
```

PR title suggestion: `Add Awesome Gaussian Skills — AI skills & MCP server for 3DGS research`

PR body: one short paragraph noting it's a research toolbox (not a single
paper), links to the live explorer, and that it's Apache-2.0.

---

## 2. awesome-NeRF
Repo: https://github.com/yenchenlin/awesome-NeRF (the canonical NeRF list)

Add under a **Tools / Resources** section:

```markdown
- [Awesome Gaussian Skills](https://github.com/jaccen/Awesome-Gaussian-Skills) - AI skills + MCP server for NeRF→3DGS research, including a dedicated NeRF-to-3DGS migration skill and an 896-method 3DGS catalog.
```

---

## 3. Computer-graphics / spatial-intelligence lists
If you target lists like `awesome-computer-graphics` or spatial-AI awesome
lists, use the general form:

```markdown
- [Awesome Gaussian Skills](https://github.com/jaccen/Awesome-Gaussian-Skills) - 3D Gaussian Splatting research toolbox: 896-method catalog, 15 AI agent skills, and an MCP server for agent-driven 3DGS rendering. Apache-2.0.
```

---

## Tips

- Most awesome lists require the linked repo to be **non-trivial and
  maintained** — this repo (161★, last push 2026-10, 896 methods) qualifies.
- Keep one entry per list; don't double-list across sections.
- Some lists want a star threshold or a minimum age; check each list's
  `CONTRIBUTING.md` before opening the PR.
- The interactive explorer (https://jaccen.github.io/Awesome-Gaussian-Skills/)
  is a strong differentiator — mention it in the PR body, not the entry line.
