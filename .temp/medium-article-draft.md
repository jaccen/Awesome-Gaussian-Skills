---
AIGC:
  ContentProducer: '001191110102MAD55U9H0F10002'
  ContentPropagator: '001191110102MAD55U9H0F10002'
  Label: '1'
  ProduceID: 'd1206fe6-28eb-4209-a25d-eae9e57a79d3'
  PropagateID: 'd1206fe6-28eb-4209-a25d-eae9e57a79d3'
  ReservedCode1: '062285f3-296c-4039-8a60-a318763bbd1a'
  ReservedCode2: '062285f3-296c-4039-8a60-a318763bbd1a'
---

# I Cataloged 240+ 3D Gaussian Splatting Methods — Here's What I Found

3D Gaussian Splatting exploded onto the scene in August 2023, and it hasn't slowed down since. With 500+ papers published in under three years, the field moves faster than most researchers can keep up with. I know this firsthand — every morning I'd open arXiv to find 3–5 new 3DGS papers, each with a different twist on primitives, rendering, or optimization.

The existing awesome lists helped, but only so far. Most are what I'd call "title dumps" — a paper name, an arXiv link, and nothing else. That's fine for finding a paper you already know exists. It's useless for figuring out whether anyone has tried combining physics simulation with 3DGS, or which compression method actually works at mobile inference speeds.

So I started cataloging. Methodically. Every paper got structured metadata: what venue it appeared at, what category it falls into, what its core innovation is, whether code is available. Two hundred and forty methods later, patterns started emerging that surprised me.

Here's what the data reveals.

## Dynamic/4DGS Is the Fastest-Growing Sub-Field

If you plot method counts by category, Dynamic/4DGS sits near the top — and it's accelerating. The jump from time-conditioned deformations (Deformable-GS, SC-GS) to physics-driven approaches (ParticleGS, LagrangianSplats) happened in under a year. The latest wave couples Gaussian primitives with MPM solvers and Lagrangian fluid dynamics, essentially turning 3DGS from a static reconstruction tool into a simulation substrate.

This isn't just an academic trend. Autonomous driving simulation demands dynamic scene reconstruction. The market is pulling this sub-field forward.

## SIGGRAPH 2026 May Be the 3DGS-Richest Venue Yet

Looking at venue metadata across the knowledge base, SIGGRAPH 2026 (and SIGGRAPH Asia 2025) papers are dense with 3DGS innovations. Methods like 3DGEER and DelightingFace are appearing in TOG issues tied to these venues. Unlike CVPR/ICCV, where 3DGS competes with the full breadth of vision research, SIGGRAPH concentrates the graphics community — and that community has fully embraced Gaussian representations.

If you're tracking where the next wave of high-impact 3DGS work will land, watch the SIGGRAPH 2026 program.

## Exact Rendering Is Challenging the Foundational Splatting Assumption

Here's the most intellectually interesting finding: 3DGEER (Exact and Efficient Emission Rendering) directly challenges the alpha-compositing approximation that 3DGS is built on. The original splatting formulation sorts primitives by depth and blends them with alpha compositing — fast, but physically inexact. 3DGEER shows that exact volume rendering of Gaussian-emitted radiance is both tractable and produces measurably better results.

This isn't an incremental tweak. If exact rendering gains traction, it could shift the entire field's rendering formulation the way Mip-Splatting shifted anti-aliasing expectations.

## Physics-GS Coupling Is Becoming a Distinct Sub-Field

Six months ago, "physics + 3DGS" was a curiosity. Now it's a recognizable research direction with its own methodological coherence:

- **ParticleGS** couples Gaussian primitives with MPM (Material Point Method) for granular flow simulation
- **LagrangianSplats** uses Lagrangian fluid dynamics for water reconstruction
- **GS-Playground** provides a physics sandbox for 3DGS scene interaction
- **GS-Surrogate** replaces full physics simulations with 3DGS-based surrogates for real-time inference

The coupling runs both directions — physics informs Gaussian dynamics, and Gaussians serve as efficient proxies for physics engines. This bidirectional relationship suggests the field is converging on something more fundamental than "adding physics to 3DGS."

## Cross-Platform 3DGS (Non-CUDA) Is Maturing

For a field born on CUDA, the emergence of real alternatives matters. **brush** (Rust/WebGPU, 4.3k GitHub stars) can train and render 3DGS in the browser. **GSeurat** and **VkSplat** target Vulkan. **msplat** brings 3DGS to Apple's Metal ecosystem. **tortuise** aims at framework-agnostic training.

Why does this matter? Because the biggest deployment opportunities — web viewers, mobile AR, edge devices — don't have CUDA. The engineering bottleneck has always been "it works on my NVIDIA GPU, but..." These tools are closing that gap.

## The Interactive Explorer

Reading about 240 methods is one thing. Navigating them is another. I built an interactive explorer at [jaccen.github.io/Awesome-Gaussian-Skills](https://jaccen.github.io/Awesome-Gaussian-Skills/) that lets you search, filter by category, and compare methods side by side. There's also a Text2World component where you can describe a scene in natural language and get method recommendations with a WebGL 3D preview.

## For the Data-Driven Researchers

The full knowledge base is available as a downloadable CSV: [`3dgs-methods-overview.csv`](https://github.com/jaccen/Awesome-Gaussian-Skills/blob/main/3dgs-methods-overview.csv). Columns include method name, arXiv ID, venue, category, core innovation, code link, and notes. If you want to build your own analysis — category growth rates, venue distributions, year-over-year trends — the data is there.

## A Note on AI Agent Skills

For researchers who want to go beyond browsing, the project includes 10 research-grade AI Agent skills: paper reading, method comparison, code review (57+ known bug patterns), experiment design, NeRF-to-3DGS migration, and more. They work with OpenClaw, Claude Code, and Cursor. But these are the advanced use case — the knowledge base itself is the foundation.

---

The 3DGS field is moving too fast for any single person to track everything. That's exactly why structured, searchable, metadata-rich catalogs matter. If nothing else, cataloging 240+ methods taught me that the field's center of gravity is shifting — from static reconstruction toward dynamic simulation, from CUDA-only toward cross-platform, and from approximate toward exact rendering. The next 240 methods will tell us whether those shifts consolidate into new paradigms.

All data and tools are open-source: [github.com/jaccen/Awesome-Gaussian-Skills](https://github.com/jaccen/Awesome-Gaussian-Skills)

> AI生成