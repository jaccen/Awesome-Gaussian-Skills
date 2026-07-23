

<div align="center">

<img src="assets/hero.png" width="100%" alt="3D Gaussian Splatting Methods Overview">

# Awesome Gaussian Skills

### The Most Comprehensive 3D Gaussian Splatting Catalog — 766+ Methods, 25 Categories, Interactive Explorer

**You shouldn't search 20 repos for 3DGS papers. This is the only one you need.**

[![Stars](https://img.shields.io/github/stars/jaccen/Awesome-Gaussian-Skills?style=for-the-badge&logo=github&color=FFD700)](https://github.com/jaccen/Awesome-Gaussian-Skills/stargazers)
[![Live Demo](https://img.shields.io/badge/Interactive_Explorer-Online-4caf50.svg)](https://jaccen.github.io/Awesome-Gaussian-Skills/)
[![Methods](https://img.shields.io/badge/Methods-766+-9cf.svg)](references/3dgs-methods-overview.md)
[![Skills](https://img.shields.io/badge/AI_Skills-14-green.svg)](skills/)
[![Bug Patterns](https://img.shields.io/badge/Bug_Patterns-108+-red.svg)](skills/3dgs-code-reviewer/)
[![License](https://img.shields.io/badge/License-Apache%202.0-blue.svg)](LICENSE)
[![PRs Welcome](https://img.shields.io/badge/PRs-Welcome-brightgreen.svg)](CONTRIBUTING.md)

[English](README.md) | [中文](README_CN.md)

</div>

## Why This Repo?

Other awesome lists give you paper titles. **We give you paper titles + an AI toolkit that makes you faster.**

| What You Need | Other Lists | This Repo |
|---------------|-------------|-----------|
| Browse papers | Static markdown table | [Interactive explorer](https://jaccen.github.io/Awesome-Gaussian-Skills/): search, filter, sort |
| Compare methods | Open 2 papers side by side | 10+ dimension auto-comparison |
| Avoid code bugs | Discover after submission | 108+ known bug pattern detection |
| Design experiments | Guess baselines & ablations | Venue-tailored experiment plan |
| NeRF → 3DGS | Trial-and-error porting | Step-by-step migration guide |
| CAD ↔ 3DGS | No coverage | 61+ method conversion pipeline |
| Patent filing | Manual from scratch | Auto-generated claims & specs |

## Live Demo

**[Try the Interactive Method Explorer →](https://jaccen.github.io/Awesome-Gaussian-Skills/)**

Search 766+ Methods instantly, filter by category, sort by citations, click any method card for details.

## 📖 Online Book: Spatial & Embodied Intelligence (New!)

> ** NEW (Jul 2026)** — A full open-source technical book,  built around **3D Gaussian Splatting** as the spine and weaving together **spatial intelligence** and **embodied intelligence** into one closed loop: *representation → perception → planning → action*.

**[📖 Read the Book →](https://jaccen.github.io/Awesome-Gaussian-Skills/spatial-embodied-intelligence.html)**

<div align="center">

<img src="assets/book-intro.png" width="100%" alt="Spatial & Embodied Intelligence Book — Cover & Chapter Overview">

</div>

**Core formula** (echoing `Agent = LLM + Context + Tools`):

> **Embodied Agent = Spatial Representation × Perception × Planning × Action**

**What's inside — 12 chapters, every method name anchored to this repo's real data (766+ Methods, 25 categories, 15 skills), zero fabrication:**

| # | Chapter | Focus |
|---|---------|-------|
| 引言 | Why this book | Why 3DGS is the key puzzle piece of Physical AI |
| CH 01 | NeRF → 3DGS: A paradigm leap | Explicit vs implicit, the three innovations, the alpha-compositing formula |
| CH 02 | The math & engineering core | Anisotropic Gaussians, differentiable rasterization, adaptive density control, CUDA |
| CH 03 | From scene to world | Large-scale, dynamic/4D, GS-SLAM, compression & deployment |
| CH 04 | Semantic Gaussians | CLIP/DINO feature distillation, open-vocabulary 3D segmentation |
| CH 05 | Editing · Generation · Asset-ization | Feed-forward reconstruction, SDS generation, animatable assets, PBR relighting |
| CH 06 | Embodied intelligence basics | VLA lineage (RT/π0/GR00T/ReconVLA), simulation, Sim2Real |
| CH 07 | 3DGS as robot spatial memory | GS-SLAM, map-as-renderer, three tiers of spatial memory |
| CH 08 | Object-level & articulated understanding | Part-level Gaussians, URDF bridging, the CAD·Mesh·3DGS triangle |
| CH 09 | Agent-driven digital twins | MCP rendering pipeline, gesture interaction, the perception-action loop |
| CH 10 | World models & the future | Six schools of world models, 3DGS×World Model, spatial foundation models, Physical AI |
| 后记 | Will 3DGS be eaten? | Why explicit representations will be compressed, not consumed |

Each chapter ends with hands-on exercises and links back to the repo's method tables, `references/`, and skills — so reading the book and doing the engineering are one seamless flow.

**Highlights you won't find in a paper list:**
- The six schools of world models (2026 taxonomy) and where 3DGS sits as the *only* representation that is simultaneously renderable, differentiable, and editable.
- How `GS-World`, `ManiGaussian`, and `OrbiSim` turn 3DGS into a differentiable simulation engine.
- A three-tier model of robot spatial memory (geometric → appearance → semantic) and where current GS-SLAM actually stands.

<details>
<summary><strong>Why we wrote it (and how it relates to this repo)</strong></summary>

This book is the *narrative layer* over the repo's *data layer*. The repo gives you 766+ method names, abstracts, and 14 engineering skills — but not the through-line that connects them. The book supplies that through-line: it argues *why* 3DGS became the bridge between spatial intelligence and embodied intelligence, and walks every chapter back to concrete methods and skills you can use today. Read the book to understand the map; use the repo to ship the territory.

</details>

## What's New (July 2026)

Latest update (Jul 23): **v0.4.3 — ICML 2026 & Material/Provenance Wave**. Now 766+ Methods. New additions: **GaussTrace** (ICML 2026, 3DGS provenance/IP forensics), **GADA** (ICML 2026, geometry-aware deformable aggregation, 2.13× faster), **InvSplat** (inverse feed-forward with intrinsic PBR materials), **MGM** (large material Gaussian model, relightable 3D generation), **DualPhys-GS** (underwater dual physics-guided 3DGS), **StereoGS** (hardware stereoscopic GS processor). +3 bug patterns (108+ total). MCP roadmap v0.2.3 with 4 new Phase 1.5 tools. Previous (Jul 14): v0.4.2 SIGGRAPH & MICCAI 2026 Wave. 3 Router skills total, all 15 skills with anti-hallucination guardrails. Newest: v0.5.0 implements MCP protocol server (24 tools, Three.js renderer, voice intent mapper). v0.4.4 added 3dgs-training-debugger skill (runtime training failure diagnosis, 60+ patterns).

| Method | Venue | Category | One-Line Innovation |
|--------|-------|----------|-------------------|
| **Proxy-GS** | CVPR 2026 Oral | Acceleration | Lightweight proxy model for 2.5x speedup with no accuracy loss |
| **Z-Order GS** | CVPR 2026 Oral | Feed-Forward | Z-order Morton curve + sparse attention O(N²)→O(N log N) |
| **3DReflecNet** | CVPR 2026 Best Paper Candidate | Cross-Domain | 120K+ objects, 48 material combos, 3 failure modes |
| **Flux-GS** | ECCV 2026 | Acceleration | Flux-based Gaussian splatting for real-time rendering |
| **AnchorSplat** | ECCV 2026 | Optimization | Anchor-driven splatting with efficient density control |
| **ASSEMCAD** | ECCV 2026 | CAD | Assembly-aware CAD reconstruction from 3DGS |
| **WildSplat** | ECCV 2026 | Robustness | In-the-wild scene reconstruction with transient object removal |
| **NoDrift3R** | ECCV 2026 | SLAM | Drift-free dense 3D reconstruction via point map regression |
| **Axis-Shared Rasterization Accelerator** | ISCA 2026 | Acceleration | Hardware accelerator with axis-shared tiled rasterization |
| **Prune Wisely** | — | Optimization | 90% Gaussian pruning via DoG importance criterion |
| **Provable Pruning via Coresets** | — | Optimization | Coreset-based provable Gaussian pruning with bounded error |
| **StreamLoD-GS** | — | Streaming | LoD-based progressive streaming with view-dependent quality |
| **CADDreamer** | CVPR 2025 Highlight | CAD | Text/sketch → CAD B-rep generation |
| **GaussTrace** | ICML 2026 | Security | 3DGS provenance analysis via LLM reasoning for IP forensics |
| **GADA** | ICML 2026 | Feed-Forward | Geometry-aware deformable aggregation, 2.13× faster FPS |
| **InvSplat** | arXiv 2026 | Feed-Forward | Inverse feed-forward splatting with intrinsic PBR materials |
| **MGM** | arXiv 2026 | Relighting | Large material Gaussian model for relightable 3D generation |
| **DualPhys-GS** | arXiv 2026 | Robustness | Dual physics-guided 3DGS for underwater reconstruction |
| **StereoGS** | 2026 | Acceleration | Energy-efficient hardware stereoscopic GS rendering processor |

<sup>Full changelog: [`changelog/`](changelog/)</sup>

## Quick Start

Each skill is a standalone SKILL.md file — copy it to your Agent's skills directory.

**3 commands to your first AI-powered 3DGS workflow:**

```bash
git clone https://github.com/jaccen/Awesome-Gaussian-Skills.git

# Option 1: Claude Code
cp -r Awesome-Gaussian-Skills/skills/* .claude/

# Option 2: Cursor
cp -r Awesome-Gaussian-Skills/skills/* .cursor/rules/

# Option 3: One-Click Install
curl -sSL https://raw.githubusercontent.com/jaccen/Awesome-Gaussian-Skills/main/scripts/setup.sh | bash
```

Then ask your Agent: *"Compare 3DGS and 2DGS rendering formulations"*

## Knowledge Base (766+ Methods, 25 Categories)

| Group | Categories | Key Topics |
|-------|-----------|------------|
| **Core Representations** | Foundation, Antialiasing, Optimization, Surface/Rendering, Image Rep. | 3DGS, 2DGS, Scaffold-GS, Mip-Splatting, GaussianImage |
| **Efficiency & Scale** | Compression, Acceleration, Large-Scale, Feed-Forward | Compact-3DGS, BlitzGS, HiGS, VEDAL, VG²GT |
| **Understanding & Semantics** | Language/Semantic, Generation, Autonomous Driving | LangSplat, DreamGaussian, StreetNVS |
| **Dynamic & Spatial** | Dynamic, HDR, SLAM, Sparse-View, Spatial Intelligence | DSD-GS, WebSpline, GGD-SLAM, Holi-Spatial, Spatial-TTT |
| **Applications** | Human/Avatar, Editing, Relighting, CAD, Cross-Domain, Simulation, Robotics, +14 more | AlbedoEdit, KDH-CAD, LEGS, TIDES, 3DEditSafe |

> Download full database: [CSV](3dgs-methods-overview.csv) | Full analysis: [references/3dgs-methods-overview.md](references/3dgs-methods-overview.md)

<details>
<summary><strong>Full Category Table (25 categories)</strong></summary>

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
| Compression / Streaming | Lightweight, mobile, and progressive streaming | Compact-3DGS, LightGS, MobileGS, Embedded-3DGS, NanoGS |
| Acceleration | Training and inference speedup | FastGS, Proxy-GS, Faster-GS, GEMM-GS, AV1-3DGS, BlitzGS |
| Large-Scale | City-scale and distributed scene management | BlitzGS |
| Feed-Forward | Single-forward-pass generalizable reconstruction | Z-Order GS, RoSplat, SplatWeaver, AdaptSplat, VolSplat, VG²GT |

**Understanding & Semantics**

| Category | Description | Methods |
|----------|-------------|---------|
| Language / Semantic | Open-vocabulary 3D understanding and language fields | LangSplat, Feature 3DGS, Semantic Foam, ReferSplat, Gaga |
| Generation / Text-to-3D | Text/condition-driven 3D generation | DreamGaussian, SceneGen-LLMRL, PanoWorld, MORPHOS |
| Autonomous Driving | Driving scene reconstruction and simulation | Real2Sim, ConFixGS, P2GS, GEM, StreetNVS |

**Dynamic & Spatial**

| Category | Description | Methods |
|----------|-------------|---------|
| Dynamic | 4D Gaussians, temporal deformation, and propagation | ParticleGS, 3DGS³, Velox, WebSpline |
| HDR / Dynamic | HDR capture and time-varying illumination | HDR-NSFF, FreeTimeGS++ |
| SLAM | Simultaneous localization and mapping | GaussianSplatting-SLAM-v2, GS-Map-SLAM, 2DGS-SLAM, MAGS-SLAM, ULF-Loc, GGD-SLAM |
| Sparse-View | Few-shot and sparse-view reconstruction | FrameTwin, GeoQuery, VidSplat, PanoPlane |
| Spatial Intelligence & World Model | 3D spatial reasoning, world modeling, neuro-symbolic | Holi-Spatial, Spatial-TTT, OpenSpatial, APEIRIA, S2AM3D |

**Applications & Cross-Domain**

| Category | Description | Methods |
|----------|-------------|---------|
| Human / Avatar | Animatable human and avatar reconstruction | GaussianAvatar, SplattingAvatar, HairGPT, ArtMesh |
| Editing | Interactive and text-guided scene editing | GaussianEditor, Frosting, AlbedoEdit, TransSplat |
| Relighting | Relightable and material-aware Gaussians | Relightable-GS-VP, Ambient-Robust IR |
| CAD | CAD model fitting and reverse engineering | CADFit, KDH-CAD, CADDreamer, Zero-to-CAD |
| Cross-Domain | Multi-modal fusion and out-of-domain transfer | GS-DOT, DiffSoup, LagrangianSplats, SurfFill |
| Simulation | Physics simulation and surrogate models | GS-Playground, GS-Surrogate, FieryGS |
| Embodied AI / Robotics | Grasping, manipulation, navigation, sim-to-real | GaussianGrasper, GraspSplats, LEGS, RoboSplat |
| Articulated / Digital Twin | Articulated object interaction and digital twin | ArtiTwinSplat |
| Robustness | In-the-wild and degradation-robust reconstruction | NRGS, DualSplat, HarmoGS |
| Security | Watermarking, copyright, forgery detection | RDSplat, GuardMarkGS, 3DEditSafe |
| World Model | 3DGS world models and scene prediction | MRO-GWM |
| Event Camera | Event camera-driven 3DGS | TIDES |

</details>

## 14 AI-Powered Skills

| # | Skill | What It Does | Example |
|---|-------|-------------|---------|
| 1 | [`3dgs-paper-reader`](skills/3dgs-paper-reader/) | Read any 3DGS paper, extract structured insights | "帮我读一下 2401.01345" |
| 2 | [`3dgs-method-compare`](skills/3dgs-method-compare/) | Compare variants across 10+ dimensions | "对比 3DGS 和 2DGS 的渲染公式差异" |
| 3 | [`3dgs-code-reviewer`](skills/3dgs-code-reviewer/) | Catch 108+ known 3DGS implementation bugs | "审查我的 CUDA 渲染 kernel" |
| 4 | [`3dgs-experiment-planner`](skills/3dgs-experiment-planner/) | Design experiments for CVPR/SIGGRAPH/TVCG | "帮我设计消融实验" |
| 5 | [`nerf-to-3dgs-migrator`](skills/nerf-to-3dgs-migrator/) | Migrate NeRF methods to 3DGS step-by-step | "hash encoding 怎么迁移到 3DGS？" |
| 6 | [`cad-mesh-3dgs`](skills/cad-mesh-3dgs/) | Bridge CAD/Mesh/3DGS — 61+ conversion methods | "3DGS模型怎么提取高质量mesh？" |
| 7 | [`cg-paper-writing`](skills/cg-paper-writing/) | Write papers for CVPR/SIGGRAPH/TVCG with adversarial review | "帮我写论文引言" |
| 8 | [`3dgs-visualizer`](skills/3dgs-visualizer/) | Publication-quality radar charts, timelines, heatmaps | "画一个3DGS方法对比雷达图" |
| 9 | [`3dgs-engineering-guide`](skills/3dgs-engineering-guide/) | Deploy 3DGS from research to production (10 industry tracks) | "怎么部署3DGS做自动驾驶仿真？" |
| 10 | [`patent-software-ip`](skills/patent-software-ip/) | Generate patent applications & software copyrights | "生成专利申请文件" |
| 11 | [`3dgs-spatial-agent`](skills/3dgs-spatial-agent/) | Agent-driven 3D scene reasoning, CAD extraction, editing | "从3DGS中提取椅子的CAD模型" |
| 12 | [`3dgs-mcp-renderer`](skills/3dgs-mcp-renderer/) | MCP-controlled Three.js/3DGS rendering bridge | "从上方看这个场景" |
| 13 | [3dgs-articulated-reasoner](skills/3dgs-articulated-reasoner/) | Articulated object reasoning and digital twin | "打开抽屉" |
| 14 | [3dgs-compression-deploy](skills/3dgs-compression-deploy/) | Compress & deploy 3DGS (quantize, prune, VQ, stream, Web/Mobile) | "3DGS模型怎么压缩到10MB？" |
| 15 | [3dgs-training-debugger](skills/3dgs-training-debugger/) | Diagnose training failures: OOM, NaN, divergence, artifacts (60+ runtime patterns) | "训练OOM了怎么办？" |

Works with **Claude Code**, **Cursor**, **Windsurf**, and other AI Agent frameworks.

## Visualization Samples

Generated by `3dgs-visualizer` — see [`Test/`](Test/) for full-resolution files.

| Radar Chart | Metrics Bar Chart |
|:---:|:---:|
| <img src="Test/radar_comparison.png" width="380"> | <img src="Test/metrics_bar_comparison.png" width="380"> |

| Quality vs Speed | Metrics Heatmap |
|:---:|:---:|
| <img src="Test/quality_vs_speed_scatter.png" width="380"> | <img src="Test/metrics_heatmap.png" width="380"> |

## Research Innovation Highlights

> Derived from systematic gap analysis across 766+ Methods.
> Target venues: TVCG / CGF / CAD / T-RO / IJCV / ACM TOG.

<details>
<summary><strong>I-01. Part-Aware Alpha-Compositing for Articulated Objects</strong></summary>

**Problem:** Standard alpha-compositing causes color bleeding at part boundaries of articulated objects. ULF-Loc (CVPR 2026) exposed this feature bias, but no rendering-formulation-level fix exists.

**Approach:** Extend alpha-compositing with part-aware opacity modulation: C(θ) = Σ Tᵢ · αᵢ · ω_{p(i)}(θ) · cᵢ(θ), where ω penalizes penetration and joint violations, making inter-part penetration regions automatically transparent.

**Path:** 1) Build on gsplat rasterizer. 2) Add FK layer for articulated objects (URDF). 3) Compute penetration/joint violation via SDF. 4) Train on Articulate-100.

**Target:** SIGGRAPH / ACM TOG / TVCG
</details>

<details>
<summary><strong>I-02. Geometry-Consistent Flow World Model for Manipulation</strong></summary>

**Problem:** Flow-based world models (RoboFlow4D) predict dense 3D flows but lack geometric consistency — predicted flows can violate object rigidity and physical constraints.

**Approach:** Couple 3D flow prediction with scene graph constraints: rigidity loss for static objects, articulation loss for joints, support-relation constraints for stacking.

**Path:** 1) Extend RoboFlow4D. 2) Scene graph parser via OpenMask3D. 3) Geometric regularizer. 4) Train on LIBERO + RoboCasa.

**Target:** IJCV / T-RO / RSS
</details>

<details>
<summary><strong>I-03. Multi-Scale Occupancy-Gaussian Bidirectional Bridge for Driving</strong></summary>

**Problem:** Occupancy (SparseWorld, DOV) is the driving world model standard; 3DGS provides superior rendering. No differentiable bridge exists between them.

**Approach:** Bidirectional conversion: Occ→3DGS (learned position+scale predictor from occupancy+semantics) and 3DGS→Occ (differentiable sparse convolution pooling). Joint backbone for unified prediction+rendering.

**Path:** 1) Backbone: SparseWorld-TC. 2) Occ→3DGS module. 3) 3DGS→Occ module. 4) Training: nuScenes, Waymo.

**Target:** TVCG / T-ITS / CVPR
</details>

<details>
<summary><strong>7 more innovation highlights (I-04 to I-10)</strong></summary>

- **I-04. Solid Geometry Neural-Symbolic Reasoning**: VLM + Z3/SMT formal verifier in iterative refinement loop. Target: Pattern Recognition / AAAI.
- **I-05. Embodied Spatial Memory**: Hippocampus-inspired 3DGS scene graph + Perceiver compressor + importance-weighted forgetting. Target: T-RO / IJCV.
- **I-06. Differentiable Physics Engine**: SDF-based contact + differentiable KKT contact solver + Coulomb friction for manipulation. Target: ACM TOG / SIGGRAPH.
- **I-07. Tactile-Visual Spatial Fusion**: GelSight → contact geometry maps → 3D scene projection → cross-attention fusion. Target: T-RO / ICRA.
- **I-08. Panoramic Spatial World Model**: Spherical visual panorama + BEV semantic + affordance + spatial relation graph for "imagine then navigate". Target: ECCV / CVPR.
- **I-09. Code-as-Spatial-Vocabulary**: VLM generates Three.js code → render → extract spatial annotations → fine-tune VLM. Target: CVPR / NeurIPS.
- **I-10. Hyperbolic Cross-Modal Distillation**: Poincare ball distillation for image→point-cloud hierarchical feature transfer. Target: T-MM / T-IP.

</details>

## Roadmap

- [x] v0.1 — Initial release with 6 core skills (Apr 2026)
- [x] v0.2 — `3dgs-visualizer` + Text2Word demo (May 2026)
- [x] v0.3 — Knowledge base 675->766+ Methods, 25 Categories, 101+ bug patterns, 12 skills (Jun 2026)
- [x] v0.3.7 — Spatial intelligence wave: 680->739+ methods, +10 new methods (FastGS, Holi-Spatial, Spatial-TTT, etc.), Dimension 11, Anthropic standard alignment (Jun 25, 2026)
- [x] v0.3.7 — CVPR 2026 representative papers: 690->739+ methods, +23 verified new methods, all 13 skills updated (Jun 28, 2026)
- [x] v0.4.0 — Router Architecture Expansion: cg-paper-writing + 3dgs-engineering-guide → Router + manifest.yaml + static/; 3dgs-code-reviewer Self-Check Loop; cg-paper-writing Stage Gates; 3 Router skills total (Jul 2, 2026)
- [x] v0.4.1 — ECCV & ISCA 2026 Wave: +Flux-GS, AnchorSplat, ASSEMCAD, WildSplat, NoDrift3R (ECCV 2026), Axis-Shared Rasterization Accelerator (ISCA 2026), Provable Pruning via Coresets; 739+ methods (Jul 9, 2026)
- [x] v0.4.2 — SIGGRAPH & MICCAI 2026 Wave: +DP-Splat, MoE-GS/MoDE (TPAMI 2026), HyperGS, MAC-Splat (ECCV 2026), Track2Map (MICCAI 2026), PEAR (SIGGRAPH 2026), CoSAG, HoloTetSphere (ECCV 2026), SalientGS; 739→766+ Methods, +3dgs-compression-deploy skill, 14 skills total (Jul 14, 2026)
- [x] v0.4.3 — ICML 2026 & Material/Provenance Wave: +GaussTrace (ICML 2026), GADA (ICML 2026), InvSplat, MGM, DualPhys-GS, StereoGS; 760→766+ Methods, +3 bug patterns (108+ total), MCP roadmap v0.2.3 (Jul 23, 2026)
- [x] v0.4.4 — Training Debugger Skill: +1 skill (3dgs-training-debugger, 60+ runtime patterns, VRAM management, convergence analysis), 14→15 skills total (Jul 23, 2026)
- [ ] v0.4 — `3dgs-spatial-agent` enhancements (knowledge-constrained CAD, DDF-GS ray query)
- [x] v0.5.0 — MCP Protocol Implementation: 24-tool MCP server (mcp-server/), Three.js WebSocket renderer, 24-pattern voice intent mapper, headless mode, voice demo (Jul 24, 2026)
- [ ] v1.0 — CI/CD integration + multi-framework official listings
- [ ] v2.0 — Agent-to-Agent collaboration (multi-agent paper discussion)

<sup>Full version history: [`changelog/`](changelog/)</sup>

## Architecture

```
Awesome-Gaussian-Skills/
├── skills/                    # 15 AI Agent skills (SKILL.md format)
│   ├── 3dgs-paper-reader/     # Paper reading & summarization
│   ├── 3dgs-method-compare/   # Method comparison engine
│   ├── 3dgs-code-reviewer/    # Code review (108+ bug patterns)
│   ├── 3dgs-experiment-planner/ # Experiment design
│   ├── nerf-to-3dgs-migrator/ # NeRF→3DGS migration
│   ├── cad-mesh-3dgs/         # CAD/Mesh/3DGS bridge
│   ├── cg-paper-writing/      # CG paper writing assistant
│   ├── 3dgs-visualizer/       # Research visualization
│   ├── 3dgs-engineering-guide/ # Engineering deployment
│   ├── patent-software-ip/    # Patent & copyright generation
│   ├── 3dgs-spatial-agent/    # Spatial intelligence agent
│   ├── 3dgs-mcp-renderer/     # MCP rendering bridge
│   ├── 3dgs-articulated-reasoner/ # Articulated reasoning & digital twin
│   ├── 3dgs-compression-deploy/  # Compression & deployment (quantize, prune, VQ, stream, Web/Mobile)
│   └── 3dgs-training-debugger/  # Training failure diagnosis (OOM, NaN, divergence, artifacts)
├── mcp-server/                # MCP server v0.5.0 (24 tools, Three.js renderer, voice intent)
├── docs/                      # GitHub Pages interactive explorer
├── references/                # Knowledge base (766+ Methods, 25 Categories)
├── scripts/                   # Install scripts & pipelines
├── Test/                      # Visualization samples
└── assets/                    # Project images
```

Each skill follows the **SKILL.md standard**, compatible with **Claude Code** (`.claude/`), **Cursor** (`.cursor/rules/`), **Windsurf**, and other AI Agent frameworks.

## Contributing

Contributions welcome! See [Contributing Guide](CONTRIBUTING.md).

[![Contributors](https://contrib.rocks/image?repo=jaccen/Awesome-Gaussian-Skills&max=24&columns=8)](https://github.com/jaccen/Awesome-Gaussian-Skills/graphs/contributors)

## Citation

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
- [awesome-3D-gaussian-splatting](https://github.com/MrNeRF/awesome-3D-gaussian-splatting) — The awesome list that inspired this project
- [Awesome3DGS/3D-Gaussian-Splatting-Papers](https://github.com/Awesome3DGS/3D-Gaussian-Splatting-Papers) — Comprehensive paper collection
- All 3DGS researchers whose papers form our knowledge base

## License

Apache-2.0. See [LICENSE](LICENSE) for details.

## Sponsor & Community

If this project helps your research or work, consider supporting us!

<table>
<tr>
<td align="center">
<img src="assets/sponsor-qrcode.jpg" width="200"><br>
<b>Sponsor / 打赏</b><br>
Buy us a coffee
</td>
<td align="center">
<img src="assets/group-qrcode.jpg" width="200"><br>
<b>Join Group / 加入社群</b><br>
3DGS research discussion
</td>
</tr>
</table>

## Star History

[![Star History Chart](https://api.star-history.com/svg?repos=jaccen/Awesome-Gaussian-Skills&type=Date)](https://star-history.com/#jaccen/Awesome-Gaussian-Skills&Date)

<div align="center">

**If this project saves you time, please give it a star!**</div>