<div align="center">
        
# Awesome Gaussian Skills

### The Most Comprehensive 3DGS Paper Catalog — 630+ Methods, 25 Categories, Interactive Explorer

**You shouldn't search 20 different repos for 3DGS papers. This is the only one you need — plus AI-powered tools that no other list has.**

[![Stars](https://img.shields.io/github/stars/jaccen/Awesome-Gaussian-Skills?style=for-the-badge&logo=github&color=FFD700)](https://github.com/jaccen/Awesome-Gaussian-Skills/stargazers)
[![Live Demo](https://img.shields.io/badge/Interactive_Explorer-Online-4caf50.svg)](https://jaccen.github.io/Awesome-Gaussian-Skills/)
[![Methods](https://img.shields.io/badge/Methods-630+-9cf.svg)](references/3dgs-methods-overview.md)
[![Skills](https://img.shields.io/badge/AI_Skills-12-green.svg)](skills/)
[![Bug Patterns](https://img.shields.io/badge/Bug_Patterns-88+-red.svg)](skills/3dgs-code-reviewer/)
[![License](https://img.shields.io/badge/License-Apache%202.0-blue.svg)](LICENSE)
[![PRs Welcome](https://img.shields.io/badge/PRs-Welcome-brightgreen.svg)](CONTRIBUTING.md)

[English](README.md) | [中文](README_CN.md)

</div>

## What's New (June 2026)

Latest update (Jun 2): 607+ → 630+ methods, 25 categories, 88+ bug patterns. +23 new methods including: **HiGS** (NVIDIA, 15.8x hierarchical tile rendering), **DDF-GS** (constant-time ray queries on 3DGS, GI without mesh), **VEDAL** (variational pruning, 5.2x compression), **StreetNVS** (multi-sensor NVS), **LEGS** (3DGS+robot sim), **KDH-CAD** (knowledge-data hybrid CAD, 92.6%@250 samples), **SEIG** (VLM→Blender programs), **MORPHOS** (4D generation unifying mesh/GS/NeRF), **WebSpline** (spline trajectories), **AlbedoEdit** (video-level albedo editing). Skills v0.3.0: Anthropic standard alignment + 6 new bug patterns.

| Method | ArXiv | Category | One-Line Innovation |
|--------|-------|----------|-------------------|
| **HiGS** | [2606.00352](https://arxiv.org/abs/2606.00352) | Acceleration | Hierarchical tiles decouple partitioning/rasterization; 15.8x faster (NVIDIA) |
| **DDF-GS** | [2606.00817](https://arxiv.org/abs/2606.00817) | Rendering / GI | Directed Distance Field for ray queries on 3DGS; GI without mesh proxy |
| **VEDAL** | [2606.02346](https://arxiv.org/abs/2606.02346) | Compression | Variational free energy pruning; 5.2x compression @ 0.31 dB loss |
| **StreetNVS** | [2606.01590](https://arxiv.org/abs/2606.01590) | Autonomous Driving | Multi-sensor NVS (LiDAR+camera+ego-motion); matches 100x denser methods |
| **LEGS** | [2606.01458](https://arxiv.org/abs/2606.01458) | Robotics | Mesh+3DGS simulation; procedural VLA training; 15x cost reduction |
| **KDH-CAD** | [2606.01702](https://arxiv.org/abs/2606.01702) | CAD | Knowledge-data hybrid; 92.6% accuracy with 250 training samples |
| **SEIG** | [2606.02580](https://arxiv.org/abs/2606.02580) | Procedural 3D | VLM generates executable Blender programs from single image |
| **MORPHOS** | [2606.02491](https://arxiv.org/abs/2606.02491) | 4D Generation | Autoregressive 4D; T-SLAT unifies mesh/Gaussian/NeRF |
| **WebSpline** | [2606.02096](https://arxiv.org/abs/2606.02096) | Dynamic | Learnable Hermite spline trajectories + Structural Proxy Graph |
| **AlbedoEdit** | [2606.01362](https://arxiv.org/abs/2606.01362) | Editing | Video-level albedo-guided editing (insert/remove/texture) |
| **MRO-GWM** | [2606.01950](https://arxiv.org/abs/2606.01950) | World Model | Object-centric Gaussian world model for rigid body MPC |
| **DSD-GS** | [2605.30863](https://arxiv.org/abs/2605.30863) | Dynamic / Acceleration | Feed-forward dynamic-static decomposition; 700+ FPS on RTX 5090 |
| **VG²GT** | [2606.01573](https://arxiv.org/abs/2606.01573) | Feed-Forward | Voxel-Gaussian Transformer; frozen VFM + stochastic solid volume rendering |
| **TIDES** | [2606.02058](https://arxiv.org/abs/2606.02058) | Event Camera | Continuous-time event simulator from dynamic 3DGS |

<sup>Full changelog: [`changelog/`](changelog/)</sup>

> Knowledge base curated with multi-source verification. Found an error? [Open an Issue](https://github.com/jaccen/Awesome-Gaussian-Skills/issues/new).

## Why This Project?

You shouldn't have to rebuild the same RAG pipeline for every new 3DGS paper, or manually compare 20 variants across 10 dimensions, or discover after submission that your CUDA kernel has a known bug.

**With 630+ 3DGS papers since 2023 and growing, researchers waste hours on tasks that AI Agents can handle in seconds.** Yet ClawHub's 13,000+ skills cover almost zero for 3D reconstruction or computer graphics.

| What You Do | Without This | With This |
|-------------|-------------|-----------|
| Read a new paper | 30–60 min manual skimming | Structured summary in seconds |
| Compare GS variants | Hand-build comparison tables | 10+ dimension auto-comparison |
| Review 3DGS code | Miss known bug patterns | 88+ pattern detection |
| Design experiments | Guess baselines & ablations | Venue-tailored experiment plan |
| Migrate NeRF → 3DGS | Trial-and-error porting | Step-by-step migration guide |

## How We Compare

| What You Need | Typical Paper List | Awesome Gaussian Skills |
|---------------|-------------------|----------------------|
| Browse papers | Static markdown table | Interactive explorer: search, filter, sort |
| Compare methods | Open 2 papers side by side | 10+ dimension auto-comparison |
| Avoid code bugs | Discover after submission | 88+ known bug pattern detection |
| Design experiments | Guess baselines & ablations | Venue-tailored experiment plan |
| NeRF → 3DGS | Trial-and-error porting | Step-by-step migration guide |
| CAD ↔ 3DGS | No coverage | 35+ method conversion pipeline |
| Patent filing | Manual from scratch | Auto-generated claims & specs |

> **Bottom line:** Other lists give you paper titles. We give you paper titles + an AI toolkit that actually helps you do research faster.

## Features

- **630+ Methods Knowledge Base**: The most comprehensive catalog of 3D Gaussian Splatting variants across 25 categories, with arXiv IDs, venues, innovations, and code links. Updated daily.
- **Interactive Explorer**: [Try it now](https://jaccen.github.io/Awesome-Gaussian-Skills/) — Search, filter by category, sort by citations, click any method card for details
- **12 AI-Powered Skills** (Advanced): Paper reading, method comparison, code review, spatial intelligence, MCP rendering — works with OpenClaw, Claude Code, Cursor
- **Zero Setup**: Pure Markdown files, no dependencies
- **Actively Maintained**: Daily arXiv tracking

## Knowledge Base (630+ Methods)

| Group | Categories | Key Topics |
|-------|-----------|------------|
| **Core Representations** | Foundation, Antialiasing, Optimization, Surface/Rendering, Image Rep. | 3DGS, 2DGS, Scaffold-GS, Mip-Splatting, GaussianImage... |
| **Efficiency & Scale** | Compression, Acceleration, Large-Scale, Feed-Forward | Compact-3DGS, BlitzGS, HiGS, VEDAL, VG²GT... |
| **Understanding & Semantics** | Language/Semantic, Generation, Autonomous Driving | LangSplat, DreamGaussian, StreetNVS... |
| **Dynamic & Spatial** | Dynamic, HDR, SLAM, Sparse-View | DSD-GS, WebSpline, GGD-SLAM, PanoPlane... |
| **Applications** | Human/Avatar, Editing, Relighting, CAD, Cross-Domain, Simulation, Robotics, and 14 more categories | AlbedoEdit, KDH-CAD, LEGS, TIDES, 3DEditSafe... |

> [Try the interactive method explorer](https://jaccen.github.io/Awesome-Gaussian-Skills/) — search 630+ methods instantly, filter by category, sort by citations.
>
> Download full database: [3dgs-methods-overview.csv](3dgs-methods-overview.csv) | Full analysis: [references/3dgs-methods-overview.md](references/3dgs-methods-overview.md)

<details>
<summary><strong>Full Category Table (25 categories, 630+ methods)</strong></summary>

**Core Representations**

| Category | Description | Methods |
|----------|-------------|---------|
| Foundation | Core 3DGS representations and basic variants | 3DGS, 2DGS, Scaffold-GS, Scaffold-GS+, Mip-Splatting, 3DGEER, SNS |
| Antialiasing | Anti-aliasing and frequency-aware rendering | Mip-Splatting, LeanGaussian |
| Optimization | Training objectives, density control, and convergence | 3DGS-as-MCMC, 3DGS², AdpSplit, Denoising-GS |
| Surface / Rendering | Rendering formulation innovation (OIT, RBF, etc.) | SparseOIT, View-Dependent Splatting, Gaussian Surfel Rendering |
| Image Representation | Image-level Gaussian encoding | GaussianImage |

**Efficiency & Scale**

| Category | Description | Methods |
|----------|-------------|---------|
| Compression / Streaming | Lightweight, mobile, and progressive streaming | Compact-3DGS, LightGS, MobileGS, Embedded-3DGS, NanoGS, OT-UVVS, Gaussians on a Diet, HAC, MesonGS++, CAGS, PD-4DGS, MGS, DSGS, VEDAL |
| Acceleration | Training and inference speedup | Proxy-GS, Faster-GS, GEMM-GS, AV1-3DGS, BlitzGS, 3DGS³, TensorGS, HiGS, DSD-GS |
| Large-Scale | City-scale and distributed scene management | BlitzGS |
| Feed-Forward | Single-forward-pass generalizable reconstruction | Z-Order GS, RoSplat, SplatWeaver, AdaptSplat, PointForward, ZPressor, VolSplat, PM-Loss, DéjàView, VG²GT |

**Understanding & Semantics**

| Category | Description | Methods |
|----------|-------------|---------|
| Language / Semantic | Open-vocabulary 3D understanding and language fields | LangSplat, Feature 3DGS, Semantic Foam, NG-GS, ReferSplat, SCOUP, Gaga |
| Generation / Text-to-3D | Text/condition-driven 3D generation | DreamGaussian, SceneGen-LLMRL, DeG, PanoWorld, AnySurf, AssetGen, SEIG, MORPHOS |
| Autonomous Driving | Driving scene reconstruction and simulation | Real2Sim, ConFixGS, P2GS, GEM, StreetNVS |

**Dynamic & Spatial**

| Category | Description | Methods |
|----------|-------------|---------|
| Dynamic | 4D Gaussians, temporal deformation, and propagation | ParticleGS, 3DGS³, Velox, RetroNVS, WebSpline |
| HDR / Dynamic | HDR capture and time-varying illumination | HDR-NSFF, FreeTimeGS++ |
| SLAM | Simultaneous localization and mapping | 2DGS-SLAM, MAGS-SLAM, ULF-Loc, LiteLoc, Flow4DGS-SLAM, GGD-SLAM |
| Sparse-View | Few-shot and sparse-view reconstruction | FrameTwin, GeoQuery, VidSplat, PanoPlane |

**Applications & Cross-Domain**

| Category | Description | Methods |
|----------|-------------|---------|
| Human / Avatar | Animatable human and avatar reconstruction | GaussianAvatar, GAS, SplattingAvatar, Generalizable Human GS, HumanSplatHMR, D-Rex, DelightingFace, HairGPT, ArtMesh, HeadsUp, CapTalk, 3DGS Head Avatars |
| Editing | Interactive and text-guided scene editing | GaussianEditor, GeoGaussian, Frosting, SketchFaceGS, FluSplat, TransSplat, SVGS (Edit), VIRGi, GOR-IS, FaceParts, Robust Prior-Guided Seg., AlbedoEdit |
| Relighting | Relightable and material-aware Gaussians | Relightable-GS-VP, Ambient-Robust IR |
| CAD | CAD model fitting and reverse engineering | CADFit, KDH-CAD |
| Cross-Domain | Multi-modal fusion and out-of-domain transfer | GS-DOT, DiffSoup, FTSplat, IRIS, SplAttN, Fake3DGS, RGS, RESPIRE, LagrangianSplats, PG-3DGS, OCH3R, TransmissiveGS, SurfFill |
| Simulation | Physics simulation and surrogate models | GS-Playground, GS-Surrogate, FieryGS, SAM3D-Phys |
| Embodied AI / Robotics | Robotic grasping, manipulation, navigation, and sim-to-real | GaussianGrasper, GraspSplats, ManiGaussian, GSMem, RoboSplat, VR-Robo, GSDrive, LEGS |
| Active Vision | Active view selection and next-best-view | MAGICIAN |
| Real-Time NVS | Real-time novel view synthesis systems | 3DTV |
| Data Acquisition | Capture protocols and phone-based acquisition | Mobile Phone 3DGS Acquisition |
| Robustness | In-the-wild and degradation-robust reconstruction | NRGS, DualSplat, EnerGS, FreeFix, Luminance-GS++, HarmoGS |
| Degradation-Aware | Weather, underwater, and low-quality input handling | MERID-GS, MarineSTD-GS, E2EGS, NIRRGB-GS |
| System | Full-system design and hardware co-design | YOGO, GS-SCNet |
| Security | Watermarking, copyright protection, and forgery detection | RDSplat, GuardMarkGS, 3DEditSafe |
| World Model | 3DGS world models and scene prediction | MRO-GWM |
| Event Camera | Event camera-driven 3DGS | TIDES |

</details>

## Quick Start

Each skill is a standalone SKILL.md file — copy it to your Agent's skills directory and it works immediately. No dependencies, no build steps.

**3 commands to your first AI-powered 3DGS workflow:**

```bash
git clone https://github.com/jaccen/Awesome-Gaussian-Skills.git
cp -r Awesome-Gaussian-Skills/skills/* ~/.openclaw/skills/   # or .claude/ for Claude Code
openclaw restart   # then ask: "Compare 3DGS and 2DGS rendering formulations"
```

### Option 1: OpenClaw

```bash
# Copy all skills to OpenClaw skills directory
cp -r skills/* ~/.openclaw/skills/
openclaw restart
```

### Option 2: Claude Code / Cursor

```bash
# Copy the skills you need into your project's .claude/ directory
cp skills/3dgs-paper-reader/SKILL.md .claude/
cp skills/3dgs-code-reviewer/SKILL.md .claude/
```

### Option 3: One-Click Install Script

```bash
curl -sSL https://raw.githubusercontent.com/jaccen/Awesome-Gaussian-Skills/main/scripts/setup.sh | bash
```

## Skills Overview

### 1. `3dgs-paper-reader` — Paper Reading & Summarization

**Read any 3DGS paper and extract structured insights in seconds.**

```
You: "帮我读一下这篇论文 2401.01345，总结核心方法和实验结果"
Agent: [Extracts method name, core innovation, architecture, 
        training strategy, datasets, metrics, and key findings]
```

**Capabilities:**
- Parse arXiv papers (by ID or URL) and local PDFs
- Extract method architecture, loss functions, training details
- Generate structured summaries with tables
- Identify novelty and limitations

### 2. `3dgs-method-compare` — Method Comparison Engine

**Compare any 3DGS variants across 10+ dimensions.**

```
You: "对比 ***和 **** 的核心差异"
Agent: [Generates comparison table across: primitive representation,
        opacity handling, color mechanism, frequency modeling,
        geometric boundary, training strategy, etc.]
```

**Capabilities:**
- Multi-method side-by-side comparison
- 10+ comparison dimensions (rendering formula, primitive, loss, speed, ...)
- Identify design trade-offs
- Built-in knowledge of 607+ methods

### 3. `3dgs-code-reviewer` — Implementation Code Review

**Catch common 3DGS implementation bugs before submission.**

```
You: "审查我的 3DGS CUDA 渲染 kernel，看看有没有性能问题"
Agent: [Checks: alpha compositing order, tile-based rendering,
        CUDA memory coalescing, gradient computation, etc.]
```

**Capabilities:**
- Review CUDA kernels for correctness and performance
- Check rendering pipeline (differentiable rasterization, alpha blending)
- Validate loss function implementations
- Common bug pattern detection (88+ known patterns)

### 4. `3dgs-experiment-planner` — Experiment Design Assistant

**Design rigorous experiments that satisfy top-venue reviewers.**

```
You: "我要写一篇关于高频边界建模的3DGS论文，帮我设计实验"
Agent: [Recommends datasets, baselines, metrics, ablation matrix,
        rendering comparisons, and efficiency analysis plan]
```

**Capabilities:**
- Dataset and baseline recommendation (tailored to your method)
- Ablation study matrix design
- Metric selection guidance (PSNR/SSIM/LPIPS/FID/CHF/etc.)
- Efficiency analysis framework
- Visualization plan for paper figures

### 5. `nerf-to-3dgs-migrator` — NeRF-to-3DGS Migration Guide

**Migrate your NeRF method to 3DGS with step-by-step guidance.**

```
You: "我的 NeRF 方法用了 hash encoding + deformable field，
     怎么迁移到 3DGS？"
Agent: [Provides migration plan: feature encoding → per-Gaussian 
        attributes, deformation → position/rotation offsets, 
        with code templates]
```

**Capabilities:**
- Component-level migration analysis
- Code templates for common migration patterns
- Identify incompatibilities and workarounds
- Performance comparison estimation

### 6. `cad-mesh-3dgs` — CAD, Mesh & 3DGS Bridge

**Navigate the mesh↔3DGS pipeline, CAD reverse engineering, and surface extraction.**

```
You: "我训练了一个3DGS模型，怎么提取高质量的mesh？"
Agent: [Recommends SuGaR or 2DGS pipeline, provides TSDF extraction
        steps, Marching Cubes parameters, and quality evaluation code]
```

```
You: "如何把CAD模型（STEP格式）转换为3DGS表示？"
Agent: [Provides mesh→Gaussian conversion pipeline, covariance 
        initialization from mesh normals, and curvature-aware sampling]
```

**Capabilities:**
- Mesh→3DGS conversion (sampling, initialization, optimization)
- 3DGS→Mesh extraction (SuGaR, 2DGS, TSDF+Marching Cubes)
- CAD reverse engineering pipeline (mesh→B-rep via primitive fitting)
- Hybrid representation analysis (MaGS, UniMGS, 2DGS)
- Geometry quality evaluation (Chamfer Distance, F-Score, Normal Consistency)
- Debugging common mesh-Gaussian conversion issues

### 7. `cg-paper-writing` — CG Paper Writing Assistant v2.0

**Write publication-ready papers for CVPR/ICCV/ECCV/SIGGRAPH/TVCG, with multi-agent adversarial review and citation integrity gates.**

```
You: "帮我写一篇关于 3DGS的论文引言，要和 ****GS 做对比"
Agent: [Generates academic introduction with proper structure,
        domain terminology, and argumentation flow]
```

**Capabilities:**
- Venue-specific writing conventions (CVPR vs SIGGRAPH vs TVCG)
- Domain terminology database (3DGS, NeRF, rendering, geometry)
- De-AI-ification (remove AI writing patterns)
- Section-by-section writing (Abstract → Introduction → Related Work → Method → Experiments → Conclusion)
- Mathematical notation conventions
- **v2.0**: Multi-agent adversarial review with Concession Threshold Protocol (anti-sycophancy)
- **v2.0**: Citation three-layer verification (existence, claim-faithfulness, venue currency)
- **v2.0**: Integrity Gates (Post-Draft Gate + Pre-Submission Gate, non-skippable)
- **v2.0**: Style Calibration (learn from user's past writing samples)
- **v2.0**: Persistent writing context across sessions (symbol table, ref registry, gate status)

### 8. `3dgs-visualizer` — Research Visualization

**Generate publication-quality charts for 3DGS research: radar charts, comparison tables, and method timelines.**

```
You: "画一个雷达图对比 3DGS、2DGS 和 NegGS 在各维度的表现"
Agent: [Generates radar chart with 7 dimensions: Render Quality,
        Speed, Memory, Geometry, Scalability, Ease of Use, Novelty]
```

```
You: "生成3DGS领域的时间线演进图，从2023年到2026年"
Agent: [Creates chronological timeline showing 40+ methods across
        25 categories with citation-weighted node sizing]
```

**Capabilities:**
- Radar charts for multi-dimensional method comparison (7 default dimensions, customizable)
- Visual performance/efficiency comparison tables with color-coded highlighting
- Method evolution timelines with category lanes and citation-weighted sizing
- Dual output: static (PDF/PNG via matplotlib/seaborn) and interactive (HTML via plotly)
- 3 pre-built presets: Landscape Overview, Category Deep Dive, Paper Submission Package
- Publication-quality styling with Okabe-Ito colorblind-safe palette

### 9. `3dgs-engineering-guide` — Engineering Deployment Guide

**Bridge the gap from academic 3DGS research to production deployment.**

```
You: "How do I deploy 3DGS for autonomous driving simulation?"
Agent: [Recommends aiSim 6 / CARLA+3DGS pipeline, maps relevant
        papers (GSDrive, GS-Playground), highlights sensor
        simulation fidelity requirements]
```

**Capabilities:**
- 10 industry application tracks (AD, digital twin, heritage, film/game, e-commerce, inspection, AR/VR, BIM, robotics, military)
- 5-layer engineering technology stack (acquisition, reconstruction, post-processing, deployment, integration)
- Tool selection decision trees by use case, platform, and scene scale
- Cross-platform deployment guide (CUDA, Vulkan, WebGPU, mobile)
- Engineering best practices and common pitfalls

### 10. `patent-software-ip` — Patent & Software Copyright Generation

**Generate patent application docs and software copyright registration materials from your research project.**

```
You: "帮我的3DGS大场景重建项目生成专利申请文件"
Agent: [Scans project code & docs, searches prior art,
        generates claims, specification, and abstract
        with desensitization and self-check]
```

```
You: "我要给这个工具申请软件著作权，帮我准备材料"
Agent: [Generates software manual (10-15 pages with screenshots)
        and source code document (front/back 30 pages each),
        formatted for CPCC registration]
```

**Capabilities:**
- Dual-path workflow: patent application (claims + specification + abstract) and software copyright (manual + source code doc)
- Prior art search and differentiation analysis
- Claims drafting with independent + dependent claims structure
- Specification with full implementation details and desensitization
- Software copyright manual following CPCC format (10-15 pages, 6+ screenshots)
- Source code document formatting (50+ lines/page, sensitive data removal)
- Internal self-check for consistency, adequacy, and compliance

### 11. `3dgs-spatial-agent` — 3DGS/CAD/Mesh Spatial Intelligence Agent

**Agent-driven 3D scene reasoning, CAD extraction, and interactive editing.**

```
You: "帮我从3DGS模型中提取椅子的CAD参数化模型"
Agent: [Segments chair Gaussians via OP2GS, extracts mesh via SuGaR,
        fits parametric primitives via GS-CAD, exports STEP file]
```

**Capabilities:**
- Scene-level reasoning: segment → extract geometry → infer materials → build scene graph
- CAD-in-the-loop: build123d/Open Cascade for parametric model extraction from 3DGS
- Multi-modal I/O: text/prompt → parameterized CAD model or 3DGS scene edits
- Articulation discovery: identify articulated structure from Gaussian grouping
- Material inference: PBR properties from SH coefficients and Gaussian density

### 12. `3dgs-mcp-renderer` — MCP Protocol + 3DGS Rendering Bridge

**Agent-controlled Three.js/WebGPU rendering via MCP protocol.**

```
You: "从上方看这个场景"
Agent: [Calls MCP set_camera(0,10,0), render_frame(), returns image]
```

**Capabilities:**
- MCP tools: import_scene, set_camera, modify_gaussians, render_frame, query_scene
- Voice-driven reconstruction: Whisper → Agent → MCP → rendering
- Real-time parameter manipulation: opacity, color, position, scale
- Semantic querying: label-based Gaussian selection (OP2GS, Gaga integration)

## Architecture

```
Awesome-Gaussian-Skills/
├── skills/
│   ├── 3dgs-paper-reader/       # Paper reading & summarization
│   │   └── SKILL.md
│   ├── 3dgs-method-compare/     # Method comparison engine
│   │   └── SKILL.md
│   ├── 3dgs-code-reviewer/      # Code review for 3DGS implementations
│   │   └── SKILL.md
│   ├── 3dgs-experiment-planner/ # Experiment design assistant
│   │   └── SKILL.md
│   ├── nerf-to-3dgs-migrator/  # NeRF-to-3DGS migration guide
│   │   └── SKILL.md
│   ├── cad-mesh-3dgs/          # CAD, Mesh & 3DGS bridge (+ build123d pipeline)
│   │   └── SKILL.md
│   ├── 3dgs-visualizer/        # Research visualization (radar, table, timeline)
│   │   └── SKILL.md
│   ├── cg-paper-writing/        # CG paper writing assistant
│   │   └── SKILL.md
│   ├── 3dgs-engineering-guide/   # Engineering deployment guide
│   │   └── SKILL.md
│   └── patent-software-ip/       # Patent & software copyright generation
│       └── SKILL.md
│   ├── 3dgs-spatial-agent/       # 3DGS/CAD/Mesh spatial intelligence agent
│   │   └── SKILL.md
│   └── 3dgs-mcp-renderer/        # MCP protocol + Three.js/3DGS rendering bridge
│       └── SKILL.md
├── scripts/
│   ├── setup.sh                 # Quick install script
│   ├── cad2gs_pipeline.py       # CAD → 3DGS conversion (STEP/GLB → Gaussian init)
│   └── build_part_aware_scenes.py # Part-Aware experiment scene builder
├── docs/
│   ├── index.html               # Interactive method explorer
│   ├── 3dgs-viewer.js           # Sidecar-powered 3DGS visualization viewer
│   ├── sidecars/                # Animation sidecar modules
│   │   ├── 3dgs-render-process.step.js  # Rendering process animation
│   │   └── 3dgs-method-compare.step.js  # Method comparison animation
│   ├── fusion-framework.md      # Fusion design principles & roadmap
│   └── fusion-demo.html         # Fusion roadmap visualization
├── Text2Word/                # Interactive text-to-3DGS web demo
│   └── index.html
├── references/
|   ├── 3dgs-methods-overview.md # Index (607+ methods across 25 categories)
│   ├── methods-core.md         # Core methods (Foundation→Dynamic)
│   ├── methods-semantic-editing.md # Semantic, Editing, Material, Avatar
│   ├── methods-systems-apps.md # Systems, Applications, Cross-Domain
│   ├── cad-3d.md               # CAD/3D terminology, baselines, build123d pipeline
│   ├── experiments.md          # Experiment design, CAD benchmark scenes
│   └── baselines.md            # Baseline methods & datasets
├── Test/
│   ├── radar_comparison.pdf/png/html       # Radar chart: 3DGS vs 2DGS vs Mip-Splatting vs Scaffold-GS
│   ├── metrics_bar_comparison.pdf/png      # PSNR / SSIM / LPIPS grouped bar chart
│   ├── quality_vs_speed_scatter.pdf/png    # Quality vs Speed bubble chart
│   ├── metrics_heatmap.pdf/png             # Normalized metrics heatmap
│   └── metrics_dashboard.html              # Interactive 4-in-1 dashboard (plotly)
├── README.md
├── README_CN.md
├── CONTRIBUTING.md
└── LICENSE
```

Each skill follows the **SKILL.md standard** (YAML frontmatter + Markdown instructions), compatible with:

- **OpenClaw** (ClawHub ecosystem)
- **Claude Code** (`.claude/` directory)
- **Cursor** (`.cursor/rules/`)
- **Windsurf** and other AI Agent frameworks

## Visualization Samples

Samples generated by `3dgs-visualizer` — see [`Test/`](Test/) for full-resolution files.

| Radar Chart (Method Comparison) | Metrics Bar Chart (PSNR/SSIM/LPIPS) |
|:---:|:---:|
| <img src="Test/radar_comparison.png" width="320"> | <img src="Test/metrics_bar_comparison.png" width="420"> |

| Quality vs Speed Scatter | Normalized Metrics Heatmap |
|:---:|:---:|
| <img src="Test/quality_vs_speed_scatter.png" width="320"> | <img src="Test/metrics_heatmap.png" width="380"> |

Interactive versions (hover for details): [`radar_comparison.html`](Test/radar_comparison.html) | [`metrics_dashboard.html`](Test/metrics_dashboard.html)

## Research Innovation Highlights

> Derived from systematic gap analysis across 607+ methods. Each idea identifies a concrete problem, a methodological approach, and an implementation path.
> Target venues: TVCG / CGF / CAD / T-RO / IJCV / ACM TOG / Pattern Recognition.

<details>
<summary><strong>I-01. Part-Aware Alpha-Compositing for Articulated Objects</strong></summary>

**Problem:** Standard alpha-compositing causes color bleeding at part boundaries of articulated objects. ULF-Loc (CVPR 2026) exposed this feature bias, but no rendering-formulation-level fix exists for the articulated case.

**Approach:** Extend alpha-compositing with part-aware opacity modulation: C(theta) = sum_i T_i * alpha_i * omega_{p(i)}(theta) * c_i(theta), where omega penalizes penetration and joint violations, making inter-part penetration regions automatically transparent.

**Path:** 1) Build on gsplat rasterizer. 2) Add FK layer for articulated objects (URDF). 3) Compute penetration/joint violation via SDF. 4) Train on Articulate-100 (ArtMesh, CVPR 2026). 5) Evaluate: NVPSNR + physical consistency metrics.

**Target:** SIGGRAPH / ACM TOG / TVCG
</details>

<details>
<summary><strong>I-02. Geometry-Consistent Flow World Model for Manipulation</strong></summary>

**Problem:** Flow-based world models (RoboFlow4D, 2026) predict dense 3D flows but lack geometric consistency -- predicted flows can violate object rigidity and physical constraints.

**Approach:** Couple 3D flow prediction with scene graph constraints: rigidity loss for static objects, articulation loss for joints, support-relation constraints for stacking. Slow-fast collaboration between flow prediction and scene-graph updates.

**Path:** 1) Extend RoboFlow4D architecture. 2) Scene graph parser via OpenMask3D. 3) Geometric regularizer (rigid/articulated losses). 4) Train on LIBERO + RoboCasa. 5) Baselines: RoboFlow4D, RISE, DreamerV3.

**Target:** IJCV / T-RO / RSS
</details>

<details>
<summary><strong>I-03. Hyperbolic Cross-Modal Distillation for 3D Detection</strong></summary>

**Problem:** Cross-modal distillation for 3D detection suffers from representation collapse when transferring image features to point clouds. Euclidean space is inherently limited for hierarchical object relationships.

**Approach:** Conduct distillation in hyperbolic space (Poincare ball). Leverage exponentially increasing volume to better preserve semantic hierarchy during image-to-point-cloud fusion. Three modules: SGVO (semantic-guided voxel optimization), HFT (hyperbolic feature transfer), FAGO (feature aggregation optimization).

**Path:** 1) Hyperbolic embedding layers (PoincareBall ops in PyTorch). 2) Dual-branch: Swin-B + VoxelNet. 3) Hyperbolic contrastive loss. 4) Datasets: SUN RGB-D, nuScenes. 5) Metrics: mAP, NDS.

**Target:** IEEE T-MM / T-IP / Pattern Recognition
</details>

<details>
<summary><strong>I-04. Solid Geometry Neural-Symbolic Reasoning with Formal Verification</strong></summary>

**Problem:** VLMs fail on solid geometry (3D volume, cross-sections). Hilbert-Geo (CVPR 2026) introduces formal language but lacks verification guarantees.

**Approach:** Neural parser + Z3/SMT formal verifier in iterative refinement loop. VLM proposes reasoning steps, formal system verifies each step, incorrect steps trigger re-generation. Extends Hilbert-Geo's CDL with full 3D geometry predicates (volume, unfolding, etc.).

**Path:** 1) Extend CDL predicate library. 2) Train parser on SolidFGeo2k + expanded synthetic data. 3) Integrate Z3 Python API. 4) Evaluate: accuracy + formal correctness rate. 5) Baselines: Hilbert-Geo, GPT-4o, Gemini.

**Target:** Pattern Recognition / Neural Networks / AAAI / ICLR
</details>

<details>
<summary><strong>I-05. Embodied Spatial Memory with Long-Horizon Semantic Persistence</strong></summary>

**Problem:** GSMem uses 3DGS as spatial memory but lacks semantic persistence -- object semantics degrade as the agent explores new areas.

**Approach:** Hippocampus-inspired memory: short-term 3DGS scene graph + periodic semantic consolidation into compact embeddings (Perceiver compressor) + importance-weighted forgetting + retrieval-augmented long-horizon planning.

**Path:** 1) Base: GSMem + SceneGPT. 2) Memory consolidation: Perceiver-based compressor. 3) Episodic replay for forgotten regions. 4) Tasks: HM3D navigation, object search. 5) Metrics: SPL, semantic recall over time.

**Target:** T-RO / IJCV / ECCV
</details>

<details>
<summary><strong>I-06. Differentiable Physics Engine with Contact Modeling for Policy Optimization</strong></summary>

**Problem:** OrbiSim (2026) demonstrates differentiable physics potential but lacks realistic contact modeling for manipulation (grasping, pushing, stacking).

**Approach:** Extend OrbiSim with SDF-based contact detection for arbitrary meshes + differentiable KKT contact solver + Coulomb friction projection. Enables gradient-based policy optimization under sparse-reward contact-rich tasks.

**Path:** 1) Extend OrbiSim codebase. 2) Neural SDF for contact geometry (DMTet). 3) Differentiable KKT contact layer (DiffCo). 4) Tasks: MimicGen, LIBERO. 5) Baselines: OrbiSim, DreamerV3, PPO.

**Target:** ACM TOG / SIGGRAPH / TVCG / RSS
</details>

<details>
<summary><strong>I-07. Unified Tactile-Visual Spatial Fusion for Fine Manipulation</strong></summary>

**Problem:** VLA models (RT-2, GR00T, Pi-0) rely almost exclusively on vision. The tactile survey (2026) identifies contact geometry as essential but poorly integrated.

**Approach:** Unified tactile-visual spatial representation: tactile images -> contact geometry maps (normal, depth, shear) -> project onto 3D scene -> cross-attention fusion transformer -> shared action decoder.

**Path:** 1) Tactile simulation: GelSight in IsaacSim. 2) Visual backbone: DINOv2. 3) Differentiable tactile-to-3D projection. 4) Training: insertion, assembly tasks. 5) Datasets: MIT Touch, Slippery manipulation.

**Target:** T-RO / IJCV / ICRA
</details>

<details>
<summary><strong>I-08. Panoramic Spatial World Model for Embodied Navigation</strong></summary>

**Problem:** PanoWorld generates panoramic video as visual synthesis. NavSpace tests spatial instruction following but lacks generative prediction. Neither couples visual generation with spatial affordances for navigation.

**Approach:** Joint panoramic world model: spherical visual panorama + top-down semantic BEV with affordances + traversability segmentation + spatial relation graph. Enables "imagine then navigate" planning loop.

**Path:** 1) Adapt PanoWorld's spherical diffusion model. 2) Add parallel BEV semantic decoder. 3) Affordance head (traversability + interaction). 4) Training: Matterport3D, HM3D. 5) Integration: plug into NavSpace for closed-loop nav.

**Target:** ECCV / IJCV / CVPR
</details>

<details>
<summary><strong>I-09. Code-as-Spatial-Vocabulary: Executable 3D Scene Representation for VLMs</strong></summary>

**Problem:** SpatialBabel (2026) reveals VLMs can generate correct 3D code but fail at simpler spatial questions -- code serves as external memory the model cannot access internally.

**Approach:** Self-supervised pipeline: VLM generates Three.js code -> execute in headless renderer -> extract spatial annotations (depth, normals, relations) -> fine-tune VLM on extracted QA pairs -> at test time, answer without code generation.

**Path:** 1) Extend S3-FT from SpatialBabel. 2) Automated: prompt -> code -> render -> annotation. 3) 10K+ procedural 3D scenes. 4) Fine-tune Qwen3-VL. 5) Eval: SpatialBabel, CV-Bench-2D/3D/Spatial.

**Target:** CVPR / NeurIPS / AAAI
</details>

<details>
<summary><strong>I-10. Multi-Scale Occupancy-Gaussian Bidirectional Bridge for Driving World Models</strong></summary>

**Problem:** Occupancy (SparseWorld, DOV) is the driving world model standard; 3DGS provides superior rendering. No differentiable bridge exists between them.

**Approach:** Bidirectional conversion: Occ->3DGS (differentiable sampler from occupancy+semantic features to Gaussian parameters) and 3DGS->Occ (learned voxel pooling from Gaussian parameters). Joint backbone for unified prediction+rendering.

**Path:** 1) Backbone: SparseWorld-TC or DOV. 2) Occ->3DGS: learned position+scale predictor. 3) 3DGS->Occ: differentiable sparse convolution pooling. 4) Training: nuScenes, Waymo. 5) Metrics: mIoU, PSNR, latency.

**Target:** TVCG / T-ITS / CVPR / ICCV
</details>

## Roadmap

- [x] v0.1 — Initial release with 6 core skills (Apr 2026)
- [x] v0.1.1 — Add `cad-mesh-3dgs` skill for CAD/Mesh↔3DGS bridge (Apr 2026)
- [x] v0.1.2 — Knowledge base expansion: 50→120+ methods, 23 categories, daily auto-update workflow (Apr-May 2026)
- [x] v0.1.3 — Knowledge base v2: 130→150+ methods, 52+ bug patterns, 23 categories, cross-domain expansion (May 2026)
- [x] v0.1.4 — Knowledge base v3: 150→152+ methods, 53+ bug patterns, 23 categories (optimized), FreeTimeGS++, D-Rex (May 2026)
- [x] v0.1.5 — Knowledge base restructured: split overview into 3 sub-files for efficient retrieval (May 2026)
- [x] v0.2 — Add `3dgs-visualizer` skill (radar charts, comparison tables, method timelines; static + interactive output) (May 2026)
- [x] v0.2.1 — Add Text2Word interactive demo — text-to-3DGS web creation platform (May 2026)
- [x] v0.2.2 — Add `patent-software-ip` skill — patent application docs & software copyright registration materials (May 2026)
- [x] v0.2.3 — Knowledge base expansion: 222→240+ methods, 57+ bug patterns, daily update + new physics-GS/streaming methods (May 2026)
- [x] v0.2.4 — Knowledge base expansion: 240→254+ methods, 60+ bug patterns, OIT transparency, distributed city-scale GS, 4DGS physics sim for AD (May 2026)
- [x] v0.2.5 — Knowledge base expansion: 254→512+ methods, 62+ bug patterns, Skew-Normal primitive, expert-routing feedforward GS, continuous LoD, adaptive split operator (May 2026)
- [x] v0.2.6 — Daily update: 512→516+ methods, +4 new (Learn2Splat meta-optimizer, EndoGSim medical 4DGS+MPM, 3DEditSafe editing safety, Robust Prior-Guided Segmentation); Medical imaging expanded (May 2026)
- [x] v0.2.7 — Daily update: 516→531+ methods, +15 new (HarmoGS, ULF-Loc, AdaptSplat, PointForward, 3DGS³, TransmissiveGS, NIRRGB-GS, TensorGS Tensor Core, DeG SIGGRAPH'26, P2GS CVPR'26, ArtMesh, DSGS, GEM, PanoWorld, LiteLoc); 63+ bug patterns; 25 categories (May 2026)
- [x] v0.2.8 — Daily update: 531→548+ methods, +17 new (ZPressor NeurIPS'25, VolSplat, PM-Loss 3DV'26, AmbiSuR ICML'26, RT-Splatting CVPR'26 Highlight, TideGS 1B+ Gaussians, OP2GS dual-opacity, MMGS OT compression, 3DSGS skew Gaussian, GaussianZoom zoom-in gen, AnyCity aerial, Cross-View Splatter, FLUIDSPLAT, GS-DIFF, ReorgGS, AsyncEvGS, SplitGS-Loc); 67+ bug patterns; 25 categories (May 2026)
- [x] v0.2.9 — CAD fusion: `cad-mesh-3dgs` skill + build123d pipeline (STEP→GLB→3DGS), cad2gs_pipeline.py, Part-Aware experiment scene builder, Sidecar animation system for 3DGS visualization (May 2026)
- [x] v0.2.10 — Daily update: 548→559+ methods, +5 new (GaussianPile CVPR'26 volumetric medical 3DGS, Flow4DGS-SLAM CVPR'26 flow-guided dynamic SLAM, Ilov3Splat ICPR'26 instance-level open-vocab, LeGS learnable density control, PhysX-Omni unified physical 3D gen); 69+ bug patterns; 25 categories (May 2026)
- [x] v0.2.11 — Daily update: 553→559+ methods, +6 new (CAdam SIGGRAPH'26 generative densification, GGD-SLAM ICRA'26 dynamic SLAM, PiG-Avatar volumetric canonical avatars, Latent Dynamics clothing animation, ROAR-3D multi-view generation, GLUT color transformation) (May 2026)
- [x] v0.2.12 — Daily update: 559→574+ methods, +15 new (ArtSplat first feed-forward articulated 3DGS 400x faster, BEA-GS CVPR'26 Highlight object extraction, F-RNG feed-forward relightable 25x faster, CodecSplat 20-108 KiB/scene, TriSplat triangle primitives mesh export, VoxelGS scaffold-anchored Gaussian+voxel SDF, TokenGS learnable tokens, NoPo4D pose-free feed-forward 4DGS, COSY compositional head editing, R5DGS semantic 4DGS rigid constraints, RiGS rigid-aware monocular 4DGS, Underwater360/GlowGS/DelowlightSplat degradation-specific 3DGS, RoVES physics-aware driving editing, 4D-GSW 4DGS watermarking, DP-GES depth peeling surfel rendering); 71+ bug patterns; 25 categories (May 2026)
- [x] v0.2.13 — Daily update: 574→591+ methods, +17 new (EulerianGS CVPR'26, GAVIS CVPR'26, DGSG-Mind, DeGO CVPR'26, TWINGS CVPR'26, BitC-3DGS, FRUC, IDESplat CVPR'26, PhyGenHOI, MonoPhysics, FreeForm CVPR'26, TDg, SRUG, NeuROK CVPR'26, PocketGS, X-GS, WeatherCity); 79+ bug patterns; 25 categories (May 2026)
- [x] v0.2.14 — Daily update: 591→607+ methods, +16 new (HeadsUp Apple UV-parameterized head, DéjàView looped transformer, View-Dependent Splatting Kernels SIGGRAPH'26, SAM3D-Phys generative priors+physics, Gaga 3D-aware memory bank, CapTalk text+speech head, SurfFill LiDAR+surfel, CLEAR-NeRF unbounded, AnySurf/AssetGen/DinoComplete generation+completion, Ambient-Robust IR RGB-NIR, Multi-view Consistent 3DGS Head CVPR'26, Gaussian-Enhanced Surfel depth-peeling); 82+ bug patterns; 25 categories (Jun 2026)
- [x] v0.3.0 — Skills standard alignment (Anthropic Claude Code / OpenClaw) + Daily update: 607→630+ methods, +23 new (HiGS NVIDIA 15.8x rendering, DDF-GS ray queries, VEDAL variational pruning, StreetNVS multi-sensor NVS, LEGS embodied GS sim, KDH-CAD knowledge-hybrid, SEIG VLM→Blender, MORPHOS 4D gen, WebSpline spline trajectories, AlbedoEdit video editing, MRO-GWM world model, DSD-GS 700FPS, VG²GT voxel-gaussian, TIDES event sim, Triangle Splatting SLAM, DeblurNVS, GeoSAM-3D, SplatShot avatar, GSDeformer deformation, MidSurfNet mid-surface, 3DCodeBench benchmark, Dynamic Mesh-Gaussian physics); 88+ bug patterns; 25 categories (Jun 2026)
- [ ] v0.3.1 — Add `3dgs-benchmark-runner` skill (automated benchmark execution)
- [ ] v0.4 — Advanced `3dgs-spatial-agent` skill enhancements (knowledge-constrained CAD via KDH-CAD, DDF-GS ray query, SEIG procedural generation)
- [ ] v0.5 — MCP protocol integration: Agent-controlled Three.js/3DGS rendering pipeline + DDF-GS ray query MCP tool
- [ ] v1.0 — ClawHub official listing + CI/CD integration + anthropics/skills PR
- [ ] v1.1 — Multi-language support (Chinese, Japanese, Korean)
- [ ] v2.0 — Agent-to-Agent collaboration (multi-agent paper discussion)

## Contributing

Contributions are welcome! Please read our [Contributing Guide](CONTRIBUTING.md) for details.

**Ways to contribute:**
- Add new skills for uncovered scenarios
- Expand the methods knowledge base
- Report bugs or suggest improvements
- Share your use cases and success stories

[![Contributors](https://contrib.rocks/image?repo=jaccen/Awesome-Gaussian-Skills&max=24&columns=8)](https://github.com/jaccen/Awesome-Gaussian-Skills/graphs/contributors)

## Citation

If you find this project helpful in your research, please consider citing:

```bibtex
@misc{awesome-gaussian-skills,
  author = {jaccen},
  title = {Awesome Gaussian Skills: 3D Spatial Intelligence Open-Source Toolbox for 3D Gaussian Splatting Research},
  year = {2026},
  url = {https://github.com/jaccen/Awesome-Gaussian-Skills}
}
```

## Acknowledgments

- [3D Gaussian Splatting](https://repo-sam.informatik.uni-halle.de/jkortner/gaussian-splatting/) — The foundational work
- [OpenClaw](https://github.com/openclaw) — The AI Agent framework and Skills ecosystem
- [awesome-3D-gaussian-splatting](https://github.com/MrNeRF/awesome-3D-gaussian-splatting) — The awesome list that inspired this project
- [Awesome3DGS/3D-Gaussian-Splatting-Papers](https://github.com/Awesome3DGS/3D-Gaussian-Splatting-Papers) — Comprehensive paper collection (498+ papers) with authors, arXiv links, and code repositories, organized by conference/year
- [longxiang-ai/awesome-gaussians](https://github.com/longxiang-ai/awesome-gaussians) — Daily auto-updated 3DGS paper tracker (276 stars)
- All 3DGS researchers whose papers form our knowledge base

## License

Apache-2.0. See [LICENSE](LICENSE) for details. Fork, publish, sell — with explicit patent grant for enterprise users.

## Star History

[![Star History Chart](https://api.star-history.com/svg?repos=jaccen/Awesome-Gaussian-Skills&type=Date)](https://star-history.com/#jaccen/Awesome-Gaussian-Skills&Date)

<div align="center">

**If this project saves you time, please give it a star!**</div>