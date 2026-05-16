---
AIGC:
  ContentProducer: '001191110102MAD55U9H0F10002'
  ContentPropagator: '001191110102MAD55U9H0F10002'
  Label: '1'
  ProduceID: '800a3b23-cd88-4398-8387-20fa7487033a'
  PropagateID: '800a3b23-cd88-4398-8387-20fa7487033a'
  ReservedCode1: '6b8db1bc-6c45-4645-8a3c-4a3f87c4d0c0'
  ReservedCode2: '6b8db1bc-6c45-4645-8a3c-4a3f87c4d0c0'
---

# Issue: Request to Add "Related Projects" Section

## Repository
graphdeco-inria/gaussian-splatting

## Title
Suggestion: Add a "Related Projects" section to README

## Body

### Background

3D Gaussian Splatting has grown into one of the most active research areas in computer vision and graphics, with 500+ papers published since the original work. The community has produced a rich ecosystem of implementations, viewers, tools, and knowledge bases — but there is currently no centralized place in this repository to discover them.

### Suggestion

I would like to suggest adding a **"Related Projects"** section to the README, similar to what many popular open-source projects maintain. This would help researchers and practitioners discover:

- Alternative implementations (gsplat, OpenSplat, brush, etc.)
- Viewers and editors (SuperSplat, gsplat.js, etc.)
- Knowledge bases and method catalogs
- Compression, streaming, and deployment tools

### Example Entry

As a concrete example, our project **Awesome Gaussian Skills** (https://github.com/jaccen/Awesome-Gaussian-Skills) curates the most comprehensive catalog of 3DGS variants (254+ methods across 21 categories) with an interactive explorer, and provides AI agent skills for 3DGS research workflows (paper reading, method comparison, code review). 

A "Related Projects" section could link to:
- [Awesome Gaussian Skills](https://github.com/jaccen/Awesome-Gaussian-Skills) - 254+ 3DGS methods knowledge base with interactive explorer & AI agent toolkit
- [MrNeRF/awesome-3D-gaussian-splatting](https://github.com/MrNeRF/awesome-3D-gaussian-splatting) - Curated list of 3DGS papers and resources
- [gsplat](https://github.com/nerfstudio-project/gsplat) - CUDA-accelerated differentiable gaussian rasterization
- [SuperSplat](https://github.com/playcanvas/supersplat) - Browser-based 3DGS editor
- [brush](https://github.com/ArthurBrussee/brush) - Cross-platform 3DGS in Rust/WebGPU

### Maintainer Note

I understand that maintainer resources are limited. If a "Related Projects" section is not feasible, even a single link to the awesome-3D-gaussian-splatting list would help the community discover related work more easily.

Thank you for the foundational work that started this entire field!

---

## Notes for manual submission

- Repository: https://github.com/graphdeco-inria/gaussian-splatting/issues/new
- Feasibility: Low (no Related Projects section exists, maintainers resource-limited)
- Strategy: Frame as a community service suggestion, not self-promotion; offer multiple example entries to show this benefits the whole ecosystem
- If maintainers decline: Accept gracefully; the MrNeRF awesome-list (8.6k stars) is higher priority anyway

> AI生成