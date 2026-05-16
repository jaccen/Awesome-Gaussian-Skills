---
AIGC:
  ContentProducer: '001191110102MAD55U9H0F10002'
  ContentPropagator: '001191110102MAD55U9H0F10002'
  Label: '1'
  ProduceID: '085657e8-f23e-487e-bac5-7062e06b7b48'
  PropagateID: '085657e8-f23e-487e-bac5-7062e06b7b48'
  ReservedCode1: '13fa7bd8-3cac-4329-b2d1-f5ceef3ab789'
  ReservedCode2: '13fa7bd8-3cac-4329-b2d1-f5ceef3ab789'
---

# PR: Add Awesome Gaussian Skills to awesome-3D-gaussian-splatting

## Target Repository
MrNeRF/awesome-3D-gaussian-splatting

## PR Title
Add Awesome Gaussian Skills - 3DGS methods knowledge base & AI agent toolkit

## PR Description

### What does this PR add?

Adds **Awesome Gaussian Skills** — the most comprehensive 3DGS methods knowledge base (254+ methods, 21 categories) with an interactive web explorer and AI agent research tools — to the awesome list.

### Why is this project relevant?

1. **Comprehensive Knowledge Base**: 254+ 3DGS methods cataloged with arXiv IDs, venues, innovations, and code links — the most extensive such catalog publicly available
2. **Interactive Explorer**: Live demo at https://jaccen.github.io/Awesome-Gaussian-Skills/ for browsing, searching, and comparing methods
3. **Machine-Readable Data**: CSV export (`3dgs-methods-overview.csv`) for programmatic access to the method database
4. **AI Agent Tools**: 10 research-grade skills for paper reading, method comparison, code review, experiment planning — compatible with OpenClaw, Claude Code, Cursor
5. **Active Maintenance**: Daily arXiv tracking with automated updates and changelogs
6. **Engineering Coverage**: Documents deployment, compression, streaming, GIS integration — bridging research and practice

### Where is it added?

Under **Tools & Utilities > Development Tools**, alongside existing entries like SuperSplat, GSOPs, and camorph.

An argument could also be made for a new **"AI & Automation Tools"** sub-category, but placing it under the existing "Development Tools" keeps the change minimal and follows the current structure.

### Checklist

- [x] The entry follows the existing format: `- [Name](URL) - Brief description`
- [x] The project is actively maintained (last commit within 30 days)
- [x] The project is relevant to 3D Gaussian Splatting
- [x] The description is concise and informative

---

## Exact README Diff

### Location: Under `### Development Tools` (after the SuperSplat entry)

**Current:**
```markdown
### Development Tools

- [GSOPs for Houdini](https://github.com/david-rhodes/GSOPs) - Houdini integration tools
- [camorph](https://github.com/Fraunhofer-IIS/camorph) - Camera parameter conversion
- [SuperSplat](https://github.com/playcanvas/supersplat) - Browser-based 3DGS editor
```

**Proposed:**
```markdown
### Development Tools

- [GSOPs for Houdini](https://github.com/david-rhodes/GSOPs) - Houdini integration tools
- [camorph](https://github.com/Fraunhofer-IIS/camorph) - Camera parameter conversion
- [SuperSplat](https://github.com/playcanvas/supersplat) - Browser-based 3DGS editor
- [Awesome Gaussian Skills](https://github.com/jaccen/Awesome-Gaussian-Skills) - 254+ 3DGS methods knowledge base with interactive explorer & AI agent toolkit
```

---

## Alternative: New "AI & Automation Tools" Sub-Category

If the maintainers prefer a separate sub-category for AI-powered tools (which may grow as the ecosystem evolves):

**Under `## Tools & Utilities`, add after `### Development Tools`:**

```markdown
### AI & Automation Tools

- [Awesome Gaussian Skills](https://github.com/jaccen/Awesome-Gaussian-Skills) - 254+ 3DGS methods knowledge base with interactive explorer & AI agent toolkit for paper reading, method comparison, and code review
```

---

## Notes for manual submission

- Fork URL: https://github.com/MrNeRF/awesome-3D-gaussian-splatting/fork
- PR URL: After forking, create a branch, edit README.md, and submit PR via GitHub
- CONTRIBUTING.md states: For non-paper resources, standard fork/branch/edit-README/PR flow
- Entry format must match: `- [Name](URL) - Brief description`
- This is the HIGHEST PRIORITY submission (8.6k stars, clear PR process, highest feasibility)

> AI生成