---
name: awesome-gaussian-skills
description: "3D Spatial Intelligence Open-Source Toolbox for 3D Gaussian Splatting Research. 607+ methods knowledge base, 10 research-grade skills, interactive explorer. Covers 3DGS paper reading, method comparison, code review, experiment planning, CAD/Mesh bridge, visualization, NeRF migration, engineering deployment, CG paper writing, and IP generation."
when_to_use: "3DGS, Gaussian Splatting, NeRF, 3D reconstruction, surface reconstruction, CAD, mesh, point cloud, novel view synthesis, spatial intelligence, 3D Gaussian, splatting rendering, differentiable rendering"
arguments: [task]
---

# Awesome Gaussian Skills — Project Context

This project is the most comprehensive catalog and AI Agent skill pack for 3D Gaussian Splatting (3DGS) research, covering 607+ methods across 25 categories.

## Available Skills

| Skill | Command | Description |
|-------|---------|-------------|
| `3dgs-paper-reader` | `/3dgs-paper-reader [arxiv-id]` | Read and summarize any 3DGS paper |
| `3dgs-method-compare` | `/3dgs-method-compare [method-a] [method-b]` | Compare methods across 10+ dimensions |
| `3dgs-code-reviewer` | `/3dgs-code-reviewer [file]` | Review 3DGS code for 82+ bug patterns |
| `3dgs-experiment-planner` | `/3dgs-experiment-planner [topic]` | Design experiments for top venues |
| `cad-mesh-3dgs` | `/cad-mesh-3dgs [query]` | Bridge CAD/Mesh and 3DGS representations |
| `3dgs-visualizer` | `/3dgs-visualizer [chart-type]` | Generate publication-quality charts |
| `cg-paper-writing` | `/cg-paper-writing [section]` | Write CG/3D vision papers (CVPR/SIGGRAPH) |
| `3dgs-engineering-guide` | `/3dgs-engineering-guide [use-case]` | Deploy 3DGS from research to production |
| `nerf-to-3dgs-migrator` | `/nerf-to-3dgs-migrator [method]` | Migrate NeRF methods to 3DGS |
| `patent-software-ip` | `/patent-software-ip [project]` | Generate patent/copyright docs |

## Knowledge Base Structure

```
references/
├── 3dgs-methods-overview.md   # 607+ methods index (25 categories)
├── methods-core.md            # Core methods (Foundation→Dynamic)
├── methods-semantic-editing.md # Semantic, Editing, Material, Avatar
├── methods-systems-apps.md    # Systems, Applications, Cross-Domain
├── cad-3d.md                  # CAD/3D terminology, baselines, build123d
├── experiments.md             # Experiment design, benchmarks
├── baselines.md               # Baseline methods & datasets
├── venues.md                  # Venue-specific conventions
└── terminology.md             # Domain terminology glossary
```

## Key Conventions

- Search knowledge base before answering: always check `references/` first
- Cite arXiv IDs for papers: format `[arXiv:XXXX.XXXXX](https://arxiv.org/abs/XXXX.XXXXX)`
- Version tracking: see `changelog/` for daily updates
- All skills follow SKILL.md standard (compatible with Claude Code, OpenClaw, Cursor)