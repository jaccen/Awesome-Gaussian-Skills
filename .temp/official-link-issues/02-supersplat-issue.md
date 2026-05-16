---
AIGC:
  ContentProducer: '001191110102MAD55U9H0F10002'
  ContentPropagator: '001191110102MAD55U9H0F10002'
  Label: '1'
  ProduceID: '8c0adf36-f09e-4bba-9dfb-03d97e71c088'
  PropagateID: '8c0adf36-f09e-4bba-9dfb-03d97e71c088'
  ReservedCode1: '2225df36-3352-47fb-9f32-36298b23f7d2'
  ReservedCode2: '2225df36-3352-47fb-9f32-36298b23f7d2'
---

# Issue: Suggest Linking to 3DGS Knowledge Base in README

## Repository
playcanvas/supersplat

## Title
Suggestion: Add a "Resources" or "Community Resources" section to README

## Body

### Background

SuperSplat has become one of the go-to tools for 3DGS editing and visualization. As the 3DGS ecosystem grows rapidly (500+ papers since 2023), users often need to look up method details, compare approaches, or understand the landscape when working with `.ply`/`.splat` files in SuperSplat.

### Suggestion

Would you consider adding a **"Resources"** or **"Community Resources"** section to the README? This could help SuperSplat users discover:

- Knowledge bases for understanding different 3DGS variants they encounter
- Format conversion tools (SplatTransform, gsbox, etc.) that complement SuperSplat
- Learning resources for users new to Gaussian Splatting

### Example Entry

As a specific suggestion, **Awesome Gaussian Skills** (https://github.com/jaccen/Awesome-Gaussian-Skills) maintains the most comprehensive catalog of 3DGS methods (254+ across 21 categories) with an interactive web explorer at https://jaccen.github.io/Awesome-Gaussian-Skills/. It also documents engineering topics relevant to SuperSplat users, including:

- The SPZ/SOG compression formats that SuperSplat supports
- PlayCanvas ecosystem integration (splat-transform CLI, @playcanvas/react)
- GIS/BIM interoperability challenges and solutions

A simple addition could look like:

```markdown
## Resources

- [Awesome Gaussian Skills](https://github.com/jaccen/Awesome-Gaussian-Skills) - 254+ 3DGS methods knowledge base & interactive explorer
- [3DGS Tutorial](https://huggingface.co/blog/gaussian-splatting) - Introduction by HuggingFace
```

This would be especially useful given that SuperSplat already supports multiple 3DGS formats and users often need context about which method produced a given file.

Thanks for SuperSplat — it's an essential tool in the 3DGS ecosystem!

---

## Notes for manual submission

- Repository: https://github.com/playcanvas/supersplat/issues/new
- Feasibility: Low-Medium (no external linking precedent, but PlayCanvas maintainers are relatively responsive)
- Strategy: Emphasize the overlap between SuperSplat's supported formats and the knowledge base's coverage; mention PlayCanvas ecosystem specifics (SPZ/SOG/splat-transform) to show genuine domain alignment
- Alternative: Post in GitHub Discussions instead of Issues (less intrusive)

> AI生成