---
AIGC:
  ContentProducer: '001191110102MAD55U9H0F10002'
  ContentPropagator: '001191110102MAD55U9H0F10002'
  Label: '1'
  ProduceID: '3d192f5d-b9c4-42cb-8d07-267b534664a9'
  PropagateID: '3d192f5d-b9c4-42cb-8d07-267b534664a9'
  ReservedCode1: '3a02db71-6c01-4525-b4c8-30dceed156c2'
  ReservedCode2: '3a02db71-6c01-4525-b4c8-30dceed156c2'
---

# Issue: Suggest Linking to 3DGS Knowledge Base in README

## Repository
ArthurBrussee/brush

## Title
Suggestion: Add an "Ecosystem" or "Related Resources" section to README

## Body

### Background

Brush provides a unique and valuable cross-platform take on 3DGS — Rust/WebGPU for training and viewing, with a Web Demo that makes 3DGS accessible without CUDA. As the 3DGS ecosystem diversifies beyond the original CUDA implementation, having pointers to community resources would help users navigating this landscape.

### Suggestion

Would you consider adding an **"Ecosystem"** or **"Related Resources"** section to the README? This could help Brush users discover:

- Knowledge bases for understanding the 3DGS methods they encounter
- Other non-CUDA implementations (GSeurat/Vulkan, msplat/Metal) that share Brush's cross-platform philosophy
- Deployment and engineering resources for production use cases

### Example Entry

As a concrete example, **Awesome Gaussian Skills** (https://github.com/jaccen/Awesome-Gaussian-Skills) catalogs 254+ 3DGS methods across 21 categories, and specifically covers topics relevant to Brush's mission:

- **Cross-platform implementations**: GSeurat (Vulkan), msplat (Metal), and Brush (Rust/WebGPU) are all documented as part of the "de-CUDA" trend
- **Engineering deployment**: Progressive streaming, compression formats, GIS tool chain integration
- **Rendering formulation innovations**: softmax competition, order-independent transparency, non-exponential RBF — alternative formulations beyond alpha-compositing

A simple addition could look like:

```markdown
## Ecosystem

- [Awesome Gaussian Skills](https://github.com/jaccen/Awesome-Gaussian-Skills) - Comprehensive 3DGS methods knowledge base (254+ methods) & engineering guide, including cross-platform implementations
- [gsplat](https://github.com/nerfstudio-project/gsplat) - CUDA-accelerated gaussian rasterization library
- [awesome-3D-gaussian-splatting](https://github.com/MrNeRF/awesome-3D-gaussian-splatting) - Curated list of papers & resources
```

This would complement the existing Acknowledgements section and help users explore the broader ecosystem, especially those coming to 3DGS through Brush's Web Demo.

Thanks for Brush — it's great to see 3DGS breaking free from CUDA dependency!

---

## Notes for manual submission

- Repository: https://github.com/ArthurBrussee/brush/issues/new
- Feasibility: Low-Medium (no external linking precedent, but maintainers are approachable)
- Strategy: Emphasize the unique alignment: Brush is a "de-CUDA" project, and our knowledge base specifically documents de-CUDA alternatives as a key trend; this is a natural fit
- Alternative: Post in GitHub Discussions instead of Issues

> AI生成