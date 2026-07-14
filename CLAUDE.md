---
name: awesome-gaussian-skills
version: "0.4.2"
description: "3D Spatial Intelligence Open-Source Toolbox for 3D Gaussian Splatting Research. 760+ methods knowledge base, 14 research-grade skills (3 Router architecture), interactive explorer. Covers 3DGS paper reading, method comparison, code review, experiment planning, CAD/Mesh bridge, visualization, NeRF migration, engineering deployment, CG paper writing, IP generation, spatial intelligence, MCP rendering, articulated reasoning, compression & deployment."
when_to_use: "3DGS, Gaussian Splatting, NeRF, 3D reconstruction, surface reconstruction, CAD, mesh, point cloud, novel view synthesis, spatial intelligence, 3D Gaussian, splatting rendering, differentiable rendering, Gaussian world model, procedural 3D, event camera simulation, geometry opacity, reflective material, mesh generation, symmetry 3D generation, spatial control, physics simulation, articulated object, 4D reconstruction, relational language Gaussian, representation abstraction, elastic deformation, DoG pruning, proxy mesh occlusion, test-time spatial training, neuro-symbolic spatial reasoning, interactable digital twin, Bayesian density control, MoE deformation, surgical SLAM, training-free semantic compression"
arguments: [task]
author: jaccen
license: Apache-2.0
repository: https://github.com/jaccen/Awesome-Gaussian-Skills
keywords: ["3dgs", "gaussian-splatting", "spatial-intelligence", "cad", "mesh", "nerf", "3d-reconstruction", "differentiable-rendering", "agent-skills", "mcp"]---

# Awesome Gaussian Skills — Project Context

This project is the most comprehensive catalog and AI Agent skill pack for 3D Gaussian Splatting (3DGS) research, covering 760+ methods across 25 categories with 105+ known bug patterns.

> **Anthropic Skills Standard Alignment**: This project follows the SKILL.md standard format compatible with Claude Code (`.claude/`), Cursor (`.cursor/rules/`), and other AI Agent frameworks. Each skill includes YAML frontmatter (name, description, version, when_to_use, tags) and structured Markdown body with capabilities, instructions, and reference data. Target: `anthropics/skills` official repository listing.

## Available Skills

| Skill | Command | Description |
|-------|---------|-------------|
| `3dgs-paper-reader` | `/3dgs-paper-reader [arxiv-id]` | Read and summarize any 3DGS paper |
| `3dgs-method-compare` | `/3dgs-method-compare [method-a] [method-b]` | Compare methods across 11 dimensions (Router architecture) |
| `3dgs-code-reviewer` | `/3dgs-code-reviewer [file]` | Review 3DGS code for 105+ bug patterns (Self-Check Loop) |
| `3dgs-experiment-planner` | `/3dgs-experiment-planner [topic]` | Design experiments for top venues |
| `cad-mesh-3dgs` | `/cad-mesh-3dgs [query]` | Bridge CAD/Mesh and 3DGS representations (61+ methods) |
| `3dgs-visualizer` | `/3dgs-visualizer [chart-type]` | Generate publication-quality charts |
| `cg-paper-writing` | `/cg-paper-writing [section]` | Write CG/3D vision papers — CVPR/SIGGRAPH (Router architecture) |
| `3dgs-engineering-guide` | `/3dgs-engineering-guide [use-case]` | Deploy 3DGS from research to production (Router architecture) |
| `nerf-to-3dgs-migrator` | `/nerf-to-3dgs-migrator [method]` | Migrate NeRF methods to 3DGS |
| `patent-software-ip` | `/patent-software-ip [project]` | Generate patent/copyright docs |
| `3dgs-spatial-agent` | `/3dgs-spatial-agent [query]` | 3DGS/CAD/Mesh spatial intelligence agent |
| `3dgs-mcp-renderer` | `/3dgs-mcp-renderer [action]` | MCP-controlled Three.js/3DGS rendering (13 tools) |
| `3dgs-articulated-reasoner` | `/3dgs-articulated-reasoner [task]` | Articulated object reasoning & digital twin |
| `3dgs-compression-deploy` | `/3dgs-compression-deploy [target]` | Compress & deploy 3DGS models (quantize, prune, VQ, stream, Web/Mobile) |

## Knowledge Base Structure

```
references/
|-- 3dgs-methods-overview.md   # 760+ methods index (25 categories)
|-- methods-core.md            # Core methods (Foundation->Dynamic)
|-- methods-semantic-editing.md # Semantic, Editing, Material, Avatar
|-- methods-systems-apps.md    # Systems, Applications, Cross-Domain
|-- cad-3d.md                  # CAD/3D terminology, baselines, build123d
|-- experiments.md             # Experiment design, benchmarks
|-- baselines.md               # Baseline methods & datasets
|-- venues.md                  # Venue-specific conventions
|-- terminology.md             # Domain terminology glossary
```

## Key Conventions

- Search knowledge base before answering: always check `references/` first
- Cite arXiv IDs for papers: format `[arXiv:XXXX.XXXXX](https://arxiv.org/abs/XXXX.XXXXX)`
- Version tracking: see `changelog/` for daily updates; current version in README roadmap
- All skills follow SKILL.md standard (compatible with Claude Code, OpenClaw, Cursor)
- Bug patterns: 105+ known patterns (all in `skills/3dgs-code-reviewer/SKILL.md`)
- Method categories span 25 groups: Foundation, Compression, Dynamic/Large-scale, Editing/Material, Avatar/Human, Autonomous Driving, Geometry, Signed Decomposition, SLAM, Procedural/4D, Spatial Intelligence & World Model, and more
- **Router Architecture**: 3 skills (3dgs-method-compare, cg-paper-writing, 3dgs-engineering-guide) use axis-driven Router + manifest.yaml + static/ fragments for efficient context usage
- **Self-Check Loop**: 3dgs-code-reviewer v2.0.0 includes mandatory SC-1~SC-4 verification after each review
- **Stage Gates**: cg-paper-writing includes SG-1/SG-2/SG-3 non-skippable gates
- Latest additions (2026-07 v0.4.2): SalientGS, DP-Splat, Grassmannian Splatting, MoE-GS/MoDE (TPAMI 2026), HyperGS, MAC-Splat (ECCV 2026), AsySplat, GeoGS-SLAM v2, AnythingReality, Track2Map (MICCAI 2026), HoloTetSphere (ECCV 2026), CoSAG, StructSplat (ECCV 2026), ABot-3DWorld 0, PEAR (SIGGRAPH 2026), CAGS (SIGGRAPH 2026), PanoLOG, SyncSpace, SplatCtrl (ICRA 2026), StereoSplat+ (IROS 2026), FreDeGS
- Previous additions (2026-06/07 v0.4.1): FastGS, GaussianSplatting-SLAM-v2, GS-Map-SLAM, ArtiTwinSplat, Holi-Spatial, Spatial-TTT, Eulerian GS, Energy-GS, NG-GS, RAF, PDEO, UniSHARP, EvoGS, GP-3DGS, DISCOVERSE, gsplat, PDE-Constrained 3DGS, Capacity-Controlled Stylization, Flux-GS, Provable Pruning via Coresets, AnchorSplat, ASSEMCAD, WildSplat, NoDrift3R, Argus, World from Motion

## Anthropic Skills Standard Compliance

- [x] YAML frontmatter with `name`, `description`, `license`, `metadata` (version, author, tags, when_to_use)
- [x] Structured Markdown body (Capabilities, Instructions, Reference Data)
- [x] Each skill in own directory with `SKILL.md`
- [x] Progressive disclosure: SKILL.md < 500 lines, large content in `references/`
- [x] `allowed-tools` field for pre-approved tool access
- [x] Compatible with Claude Code (`.claude/`), Cursor (`.cursor/rules/`) layouts
- [x] Router architecture for efficient context usage (3 skills)
- [x] Anti-hallucination guardrails (all 14 skills)
- [x] Red Lines categorical prohibitions (7 research skills)
- [x] Self-Check loops for code review (1 skill)
- [x] Stage Gates for paper writing (1 skill)
- [ ] Submit PR to `anthropics/skills` official repository