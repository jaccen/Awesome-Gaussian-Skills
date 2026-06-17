---
name: awesome-gaussian-skills
version: "0.3.3"
description: "3D Spatial Intelligence Open-Source Toolbox for 3D Gaussian Splatting Research. 675+ methods knowledge base, 12 research-grade skills, interactive explorer. Covers 3DGS paper reading, method comparison, code review, experiment planning, CAD/Mesh bridge, visualization, NeRF migration, engineering deployment, CG paper writing, IP generation, spatial intelligence, MCP rendering."
when_to_use: "3DGS, Gaussian Splatting, NeRF, 3D reconstruction, surface reconstruction, CAD, mesh, point cloud, novel view synthesis, spatial intelligence, 3D Gaussian, splatting rendering, differentiable rendering, Gaussian world model, procedural 3D, event camera simulation, geometry opacity, reflective material, mesh generation, symmetry 3D generation, spatial control, physics simulation, articulated object, 4D reconstruction, relational language Gaussian, representation abstraction, elastic deformation, DoG pruning, proxy mesh occlusion"
arguments: [task]

---

# Awesome Gaussian Skills — Project Context

This project is the most comprehensive catalog and AI Agent skill pack for 3D Gaussian Splatting (3DGS) research, covering 675+ methods across 25 categories with 99+ known bug patterns.

## Available Skills

| Skill | Command | Description |
|-------|---------|-------------|
| `3dgs-paper-reader` | `/3dgs-paper-reader [arxiv-id]` | Read and summarize any 3DGS paper |
| `3dgs-method-compare` | `/3dgs-method-compare [method-a] [method-b]` | Compare methods across 10+ dimensions |
| `3dgs-code-reviewer` | `/3dgs-code-reviewer [file]` | Review 3DGS code for 99+ bug patterns |
| `3dgs-experiment-planner` | `/3dgs-experiment-planner [topic]` | Design experiments for top venues |
| `cad-mesh-3dgs` | `/cad-mesh-3dgs [query]` | Bridge CAD/Mesh and 3DGS representations |
| `3dgs-visualizer` | `/3dgs-visualizer [chart-type]` | Generate publication-quality charts |
| `cg-paper-writing` | `/cg-paper-writing [section]` | Write CG/3D vision papers (CVPR/SIGGRAPH) |
| `3dgs-engineering-guide` | `/3dgs-engineering-guide [use-case]` | Deploy 3DGS from research to production |
| `nerf-to-3dgs-migrator` | `/nerf-to-3dgs-migrator [method]` | Migrate NeRF methods to 3DGS |
| `patent-software-ip` | `/patent-software-ip [project]` | Generate patent/copyright docs |
| `3dgs-spatial-agent` | `/3dgs-spatial-agent [query]` | 3DGS/CAD/Mesh spatial intelligence agent |
| `3dgs-mcp-renderer` | `/3dgs-mcp-renderer [action]` | MCP-controlled Three.js/3DGS rendering |

## Knowledge Base Structure

```
references/
├── 3dgs-methods-overview.md   # 675+ methods index (25 categories)
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
- Version tracking: see `changelog/` for daily updates; current version in README roadmap
- All skills follow SKILL.md standard (compatible with Claude Code, OpenClaw, Cursor)
- Bug patterns: 99+ known patterns (all in `skills/3dgs-code-reviewer/SKILL.md`)
- New method categories include: Spline-based primitives (WebSpline), Triangle primitives in SLAM, Albedo-decomposed editing, Variational pruning, Ray-query GI (DDF-GS), Token-based feed-forward (ZipSplat), Geometry opacity decoupling (Geometry Gaussians), Reflective material reconstruction (3DReflecNet), Autoregressive mesh generation (MeshWeaver/MeshFlow), DoG pruning primitives (Prune Wisely), Proxy mesh occlusion (Proxy-GS)