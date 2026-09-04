
name: awesome-gaussian-skills
version: "0.8.3"
description: "3D Spatial Intelligence Open-Source Toolbox for 3D Gaussian Splatting Research. 819+ methods knowledge base, 15 research-grade skills (3 Router architecture), interactive explorer. Covers 3DGS paper reading, method comparison, code review, experiment planning, CAD/Mesh bridge, visualization, NeRF migration, engineering deployment, CG paper writing, IP generation, spatial intelligence, MCP rendering (spec-first sculpting + code-first export), articulated reasoning, compression & deployment, training debugging. SLAT unified representation framework for conversion skills."
when_to_use: "3DGS, Gaussian Splatting, NeRF, 3D reconstruction, surface reconstruction, CAD, mesh, point cloud, novel view synthesis, spatial intelligence, 3D Gaussian, splatting rendering, differentiable rendering, Gaussian world model, procedural 3D, event camera simulation, geometry opacity, reflective material, mesh generation, symmetry 3D generation, spatial control, physics simulation, articulated object, 4D reconstruction, relational language Gaussian, representation abstraction, elastic deformation, DoG pruning, proxy mesh occlusion, test-time spatial training, neuro-symbolic spatial reasoning, interactable digital twin, Bayesian density control, MoE deformation, surgical SLAM, training-free semantic compression, deformable aggregation, PBR material splatting, 3DGS provenance analysis"
arguments: [task]
author: jaccen
license: Apache-2.0
repository: https://github.com/jaccen/Awesome-Gaussian-Skills
keywords: ["3dgs", "gaussian-splatting", "spatial-intelligence", "cad", "mesh", "nerf", "3d-reconstruction", "differentiable-rendering", "agent-skills", "mcp"]---

# Awesome Gaussian Skills — Project Context

This project is the most comprehensive catalog and AI Agent skill pack for 3D Gaussian Splatting (3DGS) research, covering 819+ methods across 23 categories with 104 known bug patterns.

> **Anthropic Skills Standard Alignment**: This project follows the SKILL.md standard format compatible with Claude Code (`.claude/`), Cursor (`.cursor/rules/`), and other AI Agent frameworks. Each skill includes YAML frontmatter (name, description, version, when_to_use, tags) and structured Markdown body with capabilities, instructions, and reference data. Target: `anthropics/skills` official repository listing.

## Available Skills

| Skill | Command | Description |
|-------|---------|-------------|
| `3dgs-paper-reader` | `/3dgs-paper-reader [arxiv-id]` | Read and summarize any 3DGS paper |
| `3dgs-method-compare` | `/3dgs-method-compare [method-a] [method-b]` | Compare methods across 11 dimensions (Router architecture) |
| `3dgs-code-reviewer` | `/3dgs-code-reviewer [file]` | Review 3DGS code for 104 bug patterns (Self-Check Loop) |
| `3dgs-experiment-planner` | `/3dgs-experiment-planner [topic]` | Design experiments for top venues |
| `cad-mesh-3dgs` | `/cad-mesh-3dgs [query]` | Bridge CAD/Mesh and 3DGS via SLAT framework (40+ methods) |
| `3dgs-visualizer` | `/3dgs-visualizer [chart-type]` | Generate publication-quality charts |
| `cg-paper-writing` | `/cg-paper-writing [section]` | Write CG/3D vision papers — CVPR/SIGGRAPH (Router architecture) |
| `3dgs-engineering-guide` | `/3dgs-engineering-guide [use-case]` | Deploy 3DGS from research to production (Router architecture) |
| `nerf-to-3dgs-migrator` | `/nerf-to-3dgs-migrator [method]` | Migrate NeRF methods to 3DGS via SLAT framework |
| `patent-software-ip` | `/patent-software-ip [project]` | Generate patent/copyright docs |
| `3dgs-spatial-agent` | `/3dgs-spatial-agent [query]` | 3DGS/CAD/Mesh spatial intelligence agent |
| `3dgs-mcp-renderer` | `/3dgs-mcp-renderer [action]` | MCP-controlled Three.js/3DGS rendering (20 tools: spec-first sculpting + code-first export) |
| `3dgs-articulated-reasoner` | `/3dgs-articulated-reasoner [task]` | Articulated object reasoning & digital twin |
| `3dgs-compression-deploy` | `/3dgs-compression-deploy [target]` | Compress & deploy 3DGS models (quantize, prune, VQ, stream, Web/Mobile) |
| `3dgs-training-debugger` | `/3dgs-training-debugger [symptom]` | Diagnose training failures: OOM, NaN, divergence, artifacts (60+ runtime patterns) |

## Knowledge Base Structure

```
references/
|-- 3dgs-methods-overview.md   # 819+ methods index (23 categories)
|-- methods-core.md            # Core methods (Foundation->Dynamic)
|-- methods-semantic-editing.md # Semantic, Editing, Material, Avatar
|-- methods-systems-apps.md    # Systems, Applications, Cross-Domain
|-- cad-3d.md                  # CAD/3D terminology, baselines, build123d
|-- experiments.md             # Experiment design, benchmarks
|-- baselines.md               # Baseline methods & datasets
|-- venues.md                  # Venue-specific conventions
|-- terminology.md             # Domain terminology glossary
|-- slat-unified-representation.md # SLAT framework: shared encode-decode theory for conversion skills
```

## Key Conventions

- Search knowledge base before answering: always check `references/` first
- Cite arXiv IDs for papers: format `[arXiv:XXXX.XXXXX](https://arxiv.org/abs/XXXX.XXXXX)`
- Version tracking: see `changelog/` for daily updates; current version in README roadmap
- All skills follow SKILL.md standard (compatible with Claude Code, OpenClaw, Cursor)
- Bug patterns: 104 known patterns (catalog in `skills/3dgs-code-reviewer/references/bug-patterns.md`, summary in SKILL.md)
- Method categories span 23 canonical categories (see data/categories.json): Foundation, Optimization, Feed-Forward, Dynamic & 4D, Editing, Human & Avatar, SLAM, Language & Semantic, Autonomous Driving, Embodied AI & Robotics, World Models & Spatial Intelligence, Security, and more
- **Router Architecture**: 3 skills (3dgs-method-compare, cg-paper-writing, 3dgs-engineering-guide) use axis-driven Router + manifest.yaml + static/ fragments for efficient context usage
- **Self-Check Loop**: 3dgs-code-reviewer v2.0.0 includes mandatory SC-1~SC-4 verification after each review
- **Stage Gates**: cg-paper-writing includes SG-1/SG-2/SG-3 non-skippable gates
- New skill (v0.4.4): 3dgs-training-debugger — Runtime training failure diagnosis (60+ runtime bug patterns, VRAM management, convergence analysis, novel method stability)
- MCP implementation (v0.8.0): mcp-server/ — 13 core tools (all real implementations) + 13 experimental tools (schema-only, listed only when INCLUDE_EXPERIMENTAL=1 and explicitly marked NOT IMPLEMENTED); true-3DGS render loop (gsplat.js via HTTP-served PLY on :9842), server-authoritative scene_id with persistent scene index, grid-accelerated cast_ray, real PLY/SPLAT export serialization, 5 distinct prune strategies, runtime argument validation, WS origin allowlist, 21 unit tests (`npm test`), 23-pattern voice intent mapper (`resolve_voice_command` tool)
- **Single Source of Truth** (v0.8.0): `data/methods.json` (819 methods, 23 categories) generated by `scripts/build_knowledge_base.py` from all historical carriers; CSV / explorer / abstracts.js are regenerated outputs; `scripts/validate_knowledge_base.py` enforces dedup / arXiv format / taxonomy / blacklist in CI (`.github/workflows/knowledge-ci.yml`)
- **Benchmark Arena** (v0.8.0): `bench/` — metrics.py (numpy PSNR/SSIM + optional LPIPS), run_eval.py ([S]-labeled local evaluation), leaderboard.json (source-labeled entries only, A/C/S/E convention from benchmark-data.md)
- **Skill Orchestration Contracts** (v0.8.0): `skills/_contracts/*.schema.json` (paper-insight / comparison-report / experiment-plan) validated by `scripts/validate_skill_contract.py`; Router manifests now have a real loader `scripts/router_load.py` (axis validation + fragment existence checks)
- **Spec-First Sculpting Pipeline** (v0.6.0, SPEC ONLY): 6-stage gate-gated sculpting (blockout -> structural -> form -> material -> surface -> lighting) defined in 3dgs-mcp-renderer SKILL.md; tools `define_scene_spec` / `sculpt_pipeline` / `export_scene_code` are specified but NOT implemented in mcp-server v0.8.0 (treat as roadmap, do not call)
- **Code-First Rendering Philosophy** (v0.6.0): hybrid procedural code + 3DGS splatting — procedural geometry rendered as Three.js code, complex photoreal elements exported as .splat data; default export mode is code + data, not GLB/OBJ
- **SLAT Unified Representation Framework** (v0.6.0): shared `references/slat-unified-representation.md` provides encode-decode theory for all conversion skills (cad-mesh-3dgs v1.7.0, nerf-to-3dgs-migrator v1.6.0); methods classified as Category A (Direct Pairwise), B (Implicit Latent), C (Explicit SLAT); replaces ad-hoc pairwise conversion tables with principled conversion-loss budgets
- Latest additions (2026-07 v0.4.3): GADA (ICML 2026), InvSplat, MGM, DualPhys-GS, GaussTrace (ICML 2026), StereoGS
- Previous additions (2026-07 v0.4.2): SalientGS, DP-Splat, Grassmannian Splatting, MoE-GS/MoDE (TPAMI 2026), HyperGS, MAC-Splat (ECCV 2026), AsySplat, GeoGS-SLAM v2, AnythingReality, Track2Map (MICCAI 2026), HoloTetSphere (ECCV 2026), CoSAG, StructSplat (ECCV 2026), ABot-3DWorld 0, PEAR (SIGGRAPH 2026), CAGS (SIGGRAPH 2026), PanoLOG, SyncSpace, SplatCtrl (ICRA 2026), StereoSplat+ (IROS 2026), FreDeGS
- Previous additions (2026-06/07 v0.4.1): FastGS, GaussianSplatting-SLAM-v2, GS-Map-SLAM, ArtiTwinSplat, Holi-Spatial, Spatial-TTT, Eulerian GS, Energy-GS, NG-GS, RAF, PDEO, UniSHARP, EvoGS, GP-3DGS, DISCOVERSE, gsplat, PDE-Constrained 3DGS, Capacity-Controlled Stylization, Flux-GS, Provable Pruning via Coresets, AnchorSplat, ASSEMCAD, WildSplat, NoDrift3R, Argus, World from Motion

## SplatVerse Studio (v0.8.0)

**SplatVerse Studio** is a one-stop web platform integrating Toonflow short-drama creation with 3DGS rendering.

### Architecture

```
Awesome-Gaussian-Skills/         (root, npm workspaces)
├── data/                        Single source of truth (methods.json, 819 methods)
├── bench/                       Benchmark arena (metrics, leaderboard)
├── mcp-server/                  3DGS MCP Server v0.8.0 (13 core + 13 experimental tools, HTTP+WS :9842, gsplat render loop)
├── studio/
│   ├── bridge/                  toonflow-bridge (REST + SSE + MCP)
│   │   ├── src/
│   │   │   ├── index.ts         MCP Server entry (8 tools, stdio)
│   │   │   ├── render-server.ts REST API + SSE (:10590)
│   │   │   ├── render-manager.ts Render task lifecycle
│   │   │   ├── gs-mcp-client.ts 3DGS MCP Client (real SDK)
│   │   │   ├── toonflow-client.ts Toonflow API client
│   │   │   └── types.ts         Shared type definitions
│   │   └── vendor/
│   │       └── 3dgs-renderer.ts  Toonflow vendor adapter
│   └── web/                     Vue3 + Vite SPA (:5173)
│       ├── src/views/           Dashboard, RenderStudio, ProjectBrowser, McpTools
│       └── src/composables/     useApi, useSSE
├── scripts/
│   └── start-dev.ps1            One-click dev launcher
├── docs/                        Method explorer, fusion-framework
├── skills/                      15 research-grade skills
└── package.json                 Root workspace config
```

### Quick Start

```powershell
# One-click launch (MCP + Bridge + Web)
powershell -File scripts/start-dev.ps1

# Or run individually
npm run dev:bridge    # Bridge REST server on :10590
npm run dev:web       # Vite dev server on :5173
npm run dev:mcp       # MCP Server (stdio)
```

### Services

| Service | Port | Description |
|---------|------|-------------|
| Studio Web | :5173 | Vue3 SPA dashboard |
| Bridge REST | :10590 | REST API + SSE (render tasks, Toonflow proxy, MCP calls) |
| Bridge MCP | stdio | 8 MCP tools for Agent integration |
| MCP Renderer | :9842 | HTTP file serving + WebSocket; gsplat.js real-3DGS renderer (hello handshake, load_gaussians_url) |
| MCP Server | stdio | 13 core 3DGS tools + 13 experimental (INCLUDE_EXPERIMENTAL=1) |

### Bridge REST Endpoints

- `GET /api/health` — Service health + MCP connection status
- `POST /api/mcp/connect` — Connect to 3DGS MCP Server
- `GET /api/mcp/tools` — List MCP tools
- `POST /api/mcp/call` — Direct MCP tool invocation
- `POST /api/render/direct` — 3DGS render from text description (returns `usedCameraSpec` when auto-adjusted)
- `POST /api/render/batch` — Batch render Toonflow storyboards
- `GET /api/events` — SSE real-time render progress
- `GET /api/toonflow/health` — Toonflow connection status (JWT auto-login)
- `GET /api/toonflow/projects` — Proxy Toonflow projects (auto-JWT-auth)
- `POST /api/toonflow/projects` — Proxy Toonflow projects (POST variant)
- `POST /api/toonflow/projects/:id/storyboards` — Proxy Toonflow storyboards
- `POST /api/toonflow/projects/:id/assets` — Proxy Toonflow assets
- `GET /api/scenes` — List local .ply/.splat scene files
- `GET /api/renders/:filename` — Serve rendered images from .temp/renders/

### Toonflow Integration Notes

- **Credentials** (v0.8.0): source code no longer hardcodes defaults — set `TOONFLOW_USER` / `TOONFLOW_PASS` via env vars (see `.env.example`); login fails with a warning if unset
- **JWT auth**: Auto-login with 180-day token; auto-refresh via Axios interceptor
- **API routes** (all POST): `/api/project/getProject`, `/api/production/getStoryboardData`, `/api/assets/getAssetsApi`, etc.

### Duix-Avatar (HeyGem) Integration Assessment

**Status**: Evaluated, deferred to Phase 2.

**Architecture**: HeyGem is a local/offline digital human video generation system by GuijiAI (硅基智能).
- **Core flow**: Upload 10s video → clone appearance + voice → text/audio drives lip-sync video
- **Tech stack**: Docker (3 services: FunASR, Fish-Speech TTS, video synthesis) + Electron client
- **Hardware**: NVIDIA GPU required (min 6GB VRAM for community 2.0 bundle, 16GB recommended for official Docker)
- **API**: No stable REST API yet — currently Electron-only GUI; community builds HTTP wrappers (heygem-api on GitHub)

**Integration plan for SplatVerse Studio** (Phase 2):
1. Deploy HeyGem Docker services on GPU server (192.168.20.2)
2. Build a thin `heygem-client.ts` in Bridge to call HeyGem's internal API
3. Compositing pipeline: 3DGS background render + HeyGem digital human foreground → alpha composite
4. Vendor adapter: `duix-avatar.ts` for Toonflow (text → script → 3DGS bg + digital human fg → composited video)

**Blockers**: Requires GPU server with Docker; no stable HTTP API yet; community HTTP wrappers are experimental.

### WebGPU Native 3DGS Renderer — Upgrade Plan

**Current state**: Three.js `ShaderMaterial` with per-point opacity (v15 "Preview Mode") — soft round splats but no front-to-back depth sorting, so not photorealistic.

**Candidate solutions** (evaluated):

| Solution | Pros | Cons | Best For |
|----------|------|------|----------|
| **gsplat.js** | Purpose-built JS lib for 3DGS, Three.js-like API, WebGPU/WebGL | Relatively new, smaller community | Direct replacement for current Three.js renderer |
| **Babylon.js** | Native built-in 3DGS support, mature, WebGPU | Larger bundle, different API from Three.js | Full-featured 3D engine with 3DGS |
| **Three.js + GaussianSplats3D** | Stays in Three.js ecosystem, Spark is fast | Community-maintained, not official | Minimal changes to current code |
| **SuperSplat (PlayCanvas)** | Full visual editor, production quality | PlayCanvas engine lock-in, heavy | Standalone 3DGS editing tool |

**Recommended path**: **gsplat.js** as Phase 2 renderer upgrade — drop-in replacement for the `renderer.html` iframe, keeping the same WebSocket binary push protocol from MCP Server. The MCP Server can be extended to emit proper sorted-splat data for gsplat.js consumption.

**Integration steps** (Phase 2):
1. Replace `renderer.html` Three.js code with gsplat.js viewer
2. Add MCP Server tool: `export_splat_data` — outputs .splat format for direct browser consumption
3. Keep WebSocket push as fallback; add HTTP file serving for large scenes
4. Result: Production-quality 3DGS rendering with proper depth sorting and alpha compositing

### Bridge MCP Tools (8)

1. `render_storyboard` — From Toonflow storyboard → 3DGS render
2. `render_direct` — From text description → 3DGS scene
3. `query_task` — Query render task status
4. `list_tasks` — List all render tasks
5. `connect_toonflow` — Connect Toonflow engine
6. `connect_mcp` — Connect 3DGS MCP Server
7. `list_mcp_tools` — List available MCP tools
8. `call_mcp_tool` — Direct MCP tool invocation

## Anthropic Skills Standard Compliance

- [x] YAML frontmatter with `name`, `description`, `license`, `metadata` (version, author, tags, when_to_use)
- [x] Structured Markdown body (Capabilities, Instructions, Reference Data)
- [x] Each skill in own directory with `SKILL.md`
- [x] Progressive disclosure: SKILL.md < 500 lines, large content in `references/`
- [x] `allowed-tools` field for pre-approved tool access
- [x] Compatible with Claude Code (`.claude/`), Cursor (`.cursor/rules/`) layouts
- [x] Router architecture for efficient context usage (3 skills)
- [x] Anti-hallucination guardrails (all 15 skills)
- [x] Red Lines categorical prohibitions (all 15 skills)
- [x] Self-Check loops for code review & training debugging (2 skills)
- [x] Stage Gates for paper writing (1 skill)
- [ ] Submit PR to `anthropics/skills` official repository (materials prepared: `docs/anthropic-pr-preparation.md`)
- [x] MCP protocol implementation (v0.8.0): 13 core tools (all real) + 13 experimental tools in `mcp-server/`, HTTP+WS server with gsplat.js real-3DGS render loop, server-authoritative scene persistence, 23-pattern voice intent mapper (`resolve_voice_command` tool), 21 unit tests
- [ ] Spec-First Sculpting Pipeline (v0.6.0 SPEC ONLY): `define_scene_spec` + `sculpt_pipeline` + `export_scene_code` defined in SKILL.md but NOT implemented in mcp-server v0.8.0 (roadmap)
- [x] Code-First Rendering (v0.6.0): 3dgs-mcp-renderer v0.8.0 — hybrid procedural code + 3DGS splatting export, default output is Three.js code + .splat data
- [x] SLAT Unified Representation Framework (v0.6.0): shared `references/slat-unified-representation.md`, adopted by cad-mesh-3dgs v1.7.0 and nerf-to-3dgs-migrator v1.6.0