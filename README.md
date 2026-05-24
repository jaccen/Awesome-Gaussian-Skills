

<div align="center">

If you like it, please ⭐️ star this repo! 
        
# Awesome Gaussian Skills

### The Most Comprehensive 3DGS Methods Knowledge Base & AI Agent Toolkit

**548+ 3DGS methods cataloged with interactive explorer, code review, and AI-powered research tools**

[![Stars](https://img.shields.io/github/stars/jaccen/Awesome-Gaussian-Skills?style=for-the-badge&logo=github&color=FFD700)](https://github.com/jaccen/Awesome-Gaussian-Skills/stargazers)
[![Forks](https://img.shields.io/github/forks/jaccen/Awesome-Gaussian-Skills?style=for-the-badge&logo=github&color=4FC3F7)](https://github.com/jaccen/Awesome-Gaussian-Skills/network/members)
[![Contributors](https://img.shields.io/github/contributors/jaccen/Awesome-Gaussian-Skills?style=for-the-badge&color=22C55E)](https://github.com/jaccen/Awesome-Gaussian-Skills/graphs/contributors)
[![Last Commit](https://img.shields.io/github/last-commit/jaccen/Awesome-Gaussian-Skills?style=for-the-badge&color=F97316)]()

[![Live Demo](https://img.shields.io/badge/Live_Demo-Online-4caf50.svg)](https://jaccen.github.io/Awesome-Gaussian-Skills/)
[![Try Demo Now](https://img.shields.io/badge/Try_Demo-Now-2196F3.svg?logo=github)](https://jaccen.github.io/Awesome-Gaussian-Skills/)
[![License](https://img.shields.io/badge/License-Apache%202.0-blue.svg)](LICENSE)
[![Skills](https://img.shields.io/badge/Skills-10-green.svg)](skills/)
[![OpenClaw Compatible](https://img.shields.io/badge/OpenClaw-Compatible-red.svg)]()
[![Claude Code Compatible](https://img.shields.io/badge/Claude_Code-Compatible-orange.svg)]()
[![PRs Welcome](https://img.shields.io/badge/PRs-Welcome-brightgreen.svg)](CONTRIBUTING.md)

[English](README.md) | [中文](README_CN.md)

</div>

## What's New (May 2026)

Major expansion: 516+ → 548+ methods, 25 categories. +17 new methods including ZPressor (NeurIPS 2025), VolSplat, PM-Loss (3DV 2026), AmbiSuR (ICML 2026), RT-Splatting (CVPR 2026 Highlight), TideGS 1B+ Gaussians, OP2GS dual-opacity, MMGS OT compression, 3DSGS, GaussianZoom, AnyCity, Cross-View Splatter, FLUIDSPLAT, GS-DIFF, ReorgGS, AsyncEvGS, SplitGS-Loc. Daily arXiv tracking active.

| Method | ArXiv | Category | One-Line Innovation |
|--------|-------|----------|-------------------|
| **ZPressor** | [2505.23734](https://arxiv.org/abs/2505.23734) | Feed-Forward | Bottleneck-aware latent compression scales feed-forward 3DGS beyond 100 input views (NeurIPS 2025) |
| **VolSplat** | [2509.19297](https://arxiv.org/abs/2509.19297) | Feed-Forward | Voxel-aligned Gaussian prediction improves multi-view consistency over pixel alignment |
| **PM-Loss** | [2506.05327](https://arxiv.org/abs/2506.05327) | Feed-Forward | Pointmap regularization smooths depth boundaries for feed-forward 3DGS (3DV 2026) |
| **AmbiSuR** | [2605.12494](https://arxiv.org/abs/2605.12494) | Surface / Rendering | Photometric ambiguity self-indication via SH for GS surface reconstruction (ICML 2026) |
| **RT-Splatting** | [2605.18263](https://arxiv.org/abs/2605.18263) | Rendering | Reflection-transmission joint modeling, dual occupancy-opacity (CVPR 2026 Highlight) |
| **TideGS** | [2605.20150](https://arxiv.org/abs/2605.20150) | Large-Scale | Out-of-core 1B+ Gaussians training via SSD-CPU-GPU hierarchy on 24GB GPU |
| **OP2GS** | [2605.20044](https://arxiv.org/abs/2605.20044) | Semantic | Dual-opacity primitives decoupling visual existence from instance occupancy |
| **MMGS** | [2605.19304](https://arxiv.org/abs/2605.19304) | Compression | 10x compressed 3DGS via Optimal Transport, 10% primitives + 10x speedup |
| **3DSGS** | [2605.18334](https://arxiv.org/abs/2605.18334) | Foundation | General 3D Skew Gaussian primitives with re-derived CUDA rasterization |
| **GaussianZoom** | [2605.18252](https://arxiv.org/abs/2605.18252) | Generation | Progressive zoom-in generative 3D with expandable continuous LoD |
| **AnyCity** | [2605.19949](https://arxiv.org/abs/2605.19949) | Feed-Forward | Observation-grounded generative reconstruction for sparse aerial scenes |
| **Cross-View Splatter** | [2605.19656](https://arxiv.org/abs/2605.19656) | Feed-Forward | Ground+satellite cross-view fusion for outdoor 3DGS |
| **FLUIDSPLAT** | [2605.18866](https://arxiv.org/abs/2605.18866) | Simulation | Physical flow field via anisotropic GS partition-of-unity |
| **GS-DIFF** | [2605.07203](https://arxiv.org/abs/2605.07203) | Editing | Scene change detection on Gaussian primitives; +17% mIoU |
| **ReorgGS** | [2605.08739](https://arxiv.org/abs/2605.08739) | Optimization | Equivalent distribution reorganization fixing parameterization degeneration |
| **AsyncEvGS** | [2605.07192](https://arxiv.org/abs/2605.07192) | Cross-Domain | Async event+RGB dual-system for motion-blurred 3DGS |
| **SplitGS-Loc** | [2605.07351](https://arxiv.org/abs/2605.07351) | SLAM | Mixture-of-Gaussians disambiguating 2D-3D correspondences |
| **TensorGS** | [2605.17855](https://arxiv.org/abs/2605.17855) | Acceleration | Tensor Core FP16 acceleration for 3DGS rasterization, 1.65x speedup |
| **DeG** | [2605.16355](https://arxiv.org/abs/2605.16355) | Generation | Density-Sampled Gaussians with octree probability density (SIGGRAPH 2026) |
| **P2GS** | [2605.16925](https://arxiv.org/abs/2605.16925) | Autonomous Driving | Physical prior-guided photometric 3DGS for urban scenes (CVPR 2026) |
| **ArtMesh** | [2605.16582](https://arxiv.org/abs/2605.16582) | Human / Avatar | Part-aware articulated mesh field + Articulate-100 benchmark |
| **GEM** | [2605.17682](https://arxiv.org/abs/2605.17682) | Autonomous Driving | 4D Gaussian evolution model for occupancy forecasting + motion planning |
| **PanoWorld** | [2605.17916](https://arxiv.org/abs/2605.17916) | Generation | Whole-house VR panorama synthesis via 3DGS spatial world model |
| **LiteLoc** | [2605.17777](https://arxiv.org/abs/2605.17777) | SLAM | Color-free 3DGS localization with 94% storage reduction (IEEE/CAA JAS) |
| **DSGS** | [2605.17002](https://arxiv.org/abs/2605.17002) | Compression | Decoder-side GS from compressed video bitstreams for immersive delivery |
| **HarmoGS** | [2605.13073](https://arxiv.org/abs/2605.13073) | Robustness | Conflict-aware gradient harmonization for in-the-wild 3DGS |
| **ULF-Loc** | — | SLAM | Unbiased landmark feature fixing alpha-compositing bias (CVPR 2026 Highlight) |
| **AdaptSplat** | — | Feed-Forward | Vision foundation model adaptation for feed-forward 3DGS |
| **PointForward** | — | Feed-Forward | Anchor-aligned feed-forward driving reconstruction via 3DGS |
| **3DGS³** | — | Acceleration | Joint super sampling + frame interpolation for real-time large-scale GS |
| **TransmissiveGS** | — | Cross-Domain | Residual-guided disentangled GS for transmissive scenes |
| **NIRRGB-GS** | — | Degradation-Aware | Near-infrared assisted low-light 3DGS (AISY 2026) |
| **Learn2Splat** | [2605.15760](https://arxiv.org/abs/2605.15760) | Optimization | Meta-learned optimizer replacing Adam/SGD for 3DGS (Geiger group) |
| **EndoGSim** | [2605.16022](https://arxiv.org/abs/2605.16022) | Medical | MLLM+4DGS+differentiable MPM for endoscopic simulation (MICCAI 2026) |
| **3DEditSafe** | [2605.15398](https://arxiv.org/abs/2605.15398) | Security | First 3D editing safety regularization against NSFW propagation |
| **Robust Prior-Guided Seg.** | [2605.16065](https://arxiv.org/abs/2605.16065) | Editing | SAM-HQ prior-guided 3DGS segmentation (ICIP 2026) |
| **SNS** | [2605.15010](https://arxiv.org/abs/2605.15010) | Foundation | Skew-Normal primitive for asymmetric boundary modeling |
| **SplatWeaver** | [2605.07287](https://arxiv.org/abs/2605.07287) | Feed-Forward | Cardinality expert routing +30% budget, +1.02 dB |
| **MGS** | [2603.19234](https://arxiv.org/abs/2603.19234) | Compression | Matryoshka continuous LoD from single training |
| **Denoising-GS** | [2605.14880](https://arxiv.org/abs/2605.14880) | Optimization | 3DGS optimization reframed as spatial denoising |
| **AdpSplit** | [2605.06876](https://arxiv.org/abs/2605.06876) | Optimization | Error-driven adaptive split, 9–22% faster |
| **OCH3R** | [2605.13018](https://arxiv.org/abs/2605.13018) | Cross-Domain | Single-RGB holistic 3D with per-object Gaussians |
| **ConFixGS** | [2605.09688](https://arxiv.org/abs/2605.09688) | Autonomous Driving | Diffusion priors fix feedforward 3DGS, +3.68 dB |
| **BlitzGS** | [2605.13794](https://arxiv.org/abs/2605.13794) | Large-Scale | Distributed GPU sharding for city-scale GS |
| **Z-Order GS** | [2605.13465](https://arxiv.org/abs/2605.13465) | Feed-Forward | Z-order spatial coherence (CVPR 2026 Oral) |
| **Real2Sim** | [2605.13591](https://arxiv.org/abs/2605.13591) | Simulation | 4DGS + differentiable MPM for physics-aware AD |
| **SparseOIT** | [2605.13855](https://arxiv.org/abs/2605.13855) | Rendering | Order-independent transparency for glass scenes |
| **GuardMarkGS** | [2605.12919](https://arxiv.org/abs/2605.12919) | Security | First unified watermarking + edit deterrence |
| **SCOUP** | [2605.13600](https://arxiv.org/abs/2605.13600) | Semantic | 400x language-GS training speedup |
| **AV1-3DGS** | [2605.14629](https://arxiv.org/abs/2605.14629) | Acceleration | AV1 motion vectors, 63% training speedup |

<sup>Full changelog: [`changelog/`](changelog/)</sup>

> Knowledge base curated with multi-source verification. Found an error? [Open an Issue](https://github.com/jaccen/Awesome-Gaussian-Skills/issues/new).

## Why This Project?

You shouldn't have to rebuild the same RAG pipeline for every new 3DGS paper, or manually compare 20 variants across 10 dimensions, or discover after submission that your CUDA kernel has a known bug.

**With 548+ 3DGS papers since 2023 and growing, researchers waste hours on tasks that AI Agents can handle in seconds.** Yet ClawHub's 13,000+ skills cover almost zero for 3D reconstruction or computer graphics.

| What You Do | Without This | With This |
|-------------|-------------|-----------|
| Read a new paper | 30–60 min manual skimming | Structured summary in seconds |
| Compare GS variants | Hand-build comparison tables | 10+ dimension auto-comparison |
| Review 3DGS code | Miss known bug patterns | 67+ pattern detection |
| Design experiments | Guess baselines & ablations | Venue-tailored experiment plan |
| Migrate NeRF → 3DGS | Trial-and-error porting | Step-by-step migration guide |

## Features

- **548+ Methods Knowledge Base: The most comprehensive catalog of 3D Gaussian Splatting variants across 25 categories, with arXiv IDs, venues, innovations, and code links. Updated daily.
- **Interactive Explorer**: [Try it now](https://jaccen.github.io/Awesome-Gaussian-Skills/) — Search, filter by category, sort by citations, click any method card for details
- **10 Research-Grade Skills** (Advanced): AI Agent skills for paper reading, method comparison, code review — works with OpenClaw, Claude Code, Cursor
- **Zero Setup**: Pure Markdown files, no dependencies
- **Actively Maintained**: Daily arXiv tracking

## Knowledge Base (548+ Methods)

**Core Representations**

| Category | Description | Methods |
|----------|-------------|---------|
| Foundation | Core 3DGS representations and basic variants | 3DGS, 2DGS, Scaffold-GS, Scaffold-GS+, Mip-Splatting, 3DGEER, SNS |
| Antialiasing | Anti-aliasing and frequency-aware rendering | Mip-Splatting, LeanGaussian |
| Optimization | Training objectives, density control, and convergence | 3DGS-as-MCMC, 3DGS², AdpSplit, Denoising-GS |
| Surface / Rendering | Rendering formulation innovation (OIT, RBF, etc.) | SparseOIT |
| Image Representation | Image-level Gaussian encoding | GaussianImage |

**Efficiency & Scale**

| Category | Description | Methods |
|----------|-------------|---------|
| Compression / Streaming | Lightweight, mobile, and progressive streaming | Compact-3DGS, LightGS, MobileGS, Embedded-3DGS, NanoGS, OT-UVGS, Gaussians on a Diet, HAC, MesonGS++, CAGS, PD-4DGS, MGS |
| Acceleration | Training and inference speedup | Proxy-GS, Faster-GS, GEMM-GS, AV1-3DGS, BlitzGS, 3DGS³ |
| Large-Scale | City-scale and distributed scene management | BlitzGS |
| Feed-Forward | Single-forward-pass generalizable reconstruction | Z-Order GS, RoSplat, SplatWeaver, AdaptSplat, PointForward, ZPressor, VolSplat, PM-Loss |

**Understanding & Semantics**

| Category | Description | Methods |
|----------|-------------|---------|
| Language / Semantic | Open-vocabulary 3D understanding and language fields | LangSplat, Feature 3DGS, Semantic Foam, NG-GS, ReferSplat, SCOUP |
| Generation / Text-to-3D | Text/condition-driven 3D generation | DreamGaussian, SceneGen-LLMRL |
| Autonomous Driving | Driving scene reconstruction and simulation | Real2Sim, ConFixGS |

**Dynamic & Spatial**

| Category | Description | Methods |
|----------|-------------|---------|
| Dynamic | 4D Gaussians, temporal deformation, and propagation | ParticleGS, 3DGS³, Velox, RetroNVS |
| HDR / Dynamic | HDR capture and time-varying illumination | HDR-NSFF, FreeTimeGS++ |
| SLAM | Simultaneous localization and mapping | 2DGS-SLAM, MAGS-SLAM, ULF-Loc |
| Sparse-View | Few-shot and sparse-view reconstruction | FrameTwin, GeoQuery, VidSplat, PanoPlane |

**Applications & Cross-Domain**

| Category | Description | Methods |
|----------|-------------|---------|
| Human / Avatar | Animatable human and avatar reconstruction | GaussianAvatar, GAS, SplattingAvatar, Generalizable Human GS, HumanSplatHMR, D-Rex, DelightingFace, HairGPT |
| Editing | Interactive and text-guided scene editing | GaussianEditor, GeoGaussian, Frosting, SketchFaceGS, FluSplat, TransSplat, SVGS (Edit), VIRGi, GOR-IS, FaceParts, Robust Prior-Guided Seg. |
| Relighting | Relightable and material-aware Gaussians | Relightable-GS-VP |
| CAD | CAD model fitting and reverse engineering | CADFit |
| Cross-Domain | Multi-modal fusion and out-of-domain transfer | GS-DOT, DiffSoup, FTSplat, IRIS, SplAttN, Fake3DGS, RGS, RESPIRE, LagrangianSplats, PG-3DGS, OCH3R, EndoGSim |
| Simulation | Physics simulation and surrogate models | GS-Playground, GS-Surrogate, FieryGS |
| Embodied AI / Robotics | Robotic grasping, manipulation, navigation, and sim-to-real | GaussianGrasper, GraspSplats, ManiGaussian, GSMem, RoboSplat, VR-Robo, GSDrive |
| Active Vision | Active view selection and next-best-view | MAGICIAN |
| Real-Time NVS | Real-time novel view synthesis systems | 3DTV |
| Data Acquisition | Capture protocols and phone-based acquisition | Mobile Phone 3DGS Acquisition |
| Robustness | In-the-wild and degradation-robust reconstruction | NRGS, DualSplat, EnerGS, FreeFix, Luminance-GS++, HarmoGS |
| Degradation-Aware | Weather, underwater, and low-quality input handling | MERID-GS, MarineSTD-GS, E2EGS, NIRRGB-GS |
| System | Full-system design and hardware co-design | YOGO, GS-SCNet |
| Security | Watermarking, copyright protection, and forgery detection | RDSplat, GuardMarkGS, 3DEditSafe |

> The full knowledge base covers **548+ methods** across 25 categories with detailed technical analysis. See [
eferences/3dgs-methods-overview.md](references/3dgs-methods-overview.md).

Download the full database as CSV: [3dgs-methods-overview.csv](3dgs-methods-overview.csv)

> **No installation needed** — [Try the interactive method explorer](https://jaccen.github.io/Awesome-Gaussian-Skills/) to search 548+ methods instantly.

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
- Built-in knowledge of 548+ methods

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
- Common bug pattern detection (67+ known patterns)

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
|   ├── 3dgs-methods-overview.md # Index (548+ methods across 25 categories)
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

> Derived from systematic gap analysis across 548+ methods. Each idea identifies a concrete problem, a methodological approach, and an implementation path.
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
- [ ] v0.3 — Add `3dgs-benchmark-runner` skill (automated benchmark execution)
- [ ] v1.0 — ClawHub official listing + CI/CD integration
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
  title = {Awesome Gaussian Skills: AI Agent Skill Pack for 3D Gaussian Splatting Research},
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

**Made with passion for the 3DGS research community**

If this project saves you time, please give it a star!

## I. Core CV Links

CVF Open Access (CVPR/ICCV/ECCV/3DV): https://openaccess.thecvf.com/

CVPR 2025: https://openaccess.thecvf.com/CVPR2025

ICCV 2025: https://openaccess.thecvf.com/ICCV2025

3DV 2026: https://openaccess.thecvf.com/3DV2026

arXiv CV (recent): https://arxiv.org/list/cs.CV/recent

## II. Core CG / Rendering Links

arXiv Graphics (cs.GR): https://arxiv.org/list/cs.GR/recent

ACM DL (SIGGRAPH): https://dl.acm.org/

Eurographics Digital Library: https://diglib.eg.org/

RenderHub (rendering papers): https://renderhub.org/

## III. 3DGS / NeRF / 3D Reconstruction

3DGS official paper & repo: https://github.com/graphdeco-inria/gaussian-splatting

3DGS paper tracker: https://github.com/longxiang-ai/awesome-gaussians

NerfStudio paper collection: https://github.com/nerfstudio-project/nerfstudio

CVPR 2025 3D track: https://openaccess.thecvf.com/CVPR2025?day=all#3D

SIGGRAPH 2025 preprints: https://arxiv.org/list/cs.GR/2507

Real-Time Rendering papers: https://www.realtimerendering.com/

EGSR (rendering symposium): https://diglib.eg.org/handle/10.23730/egsr

## IV. General Search & Chinese Mirrors

Google Scholar: https://scholar.google.com

DBLP (top-venue index): https://dblp.uni-trier.de/

Hugging Face Papers: https://huggingface.co/papers

arXiv CN mirror: https://arxiv.tmmu.edu.cn/

</div>

