# Renderer Backends — Compatibility & Integration Details

> Extracted from SKILL.md. Loaded on demand when renderer backend details are needed.

## Current Renderer Compatibility

| Renderer | Format | WebGPU | MCP-Ready | Stars |
|----------|--------|--------|-----------|-------|
| gsplat.js | .ply/.splat | Yes | Needs adapter | — |
| GaussianSplats3D | .ply | WebGL | Needs adapter | — |
| viser/nerfstudio | .ply | WebGL | Partial | — |
| PlayCanvas | .ply | Yes | Needs adapter | — |
| brush (Rust/WebGPU) | .ply | Yes | Closest | 4.3k |
| HiGS | .ply | Yes | Planned | — |
| DDF-GS | .ply + .ddf | Yes | Planned | — |

## DDF-GS Distillation Pipeline

1. Train 3DGS scene normally
2. Distill into Directed Distance Function (DDF) neural field
   - Input: trained 3DGS model (.ply)
   - Output: DDF model (~52MB, size independent of Gaussian count)
   - Training time: ~10 minutes
   - Quality: shadow at 30.3 dB PSNR, AO at 21.3 dB PSNR
3. DDF enables: shadow maps, AO, reflections, global illumination

## HiGS Hierarchical Rendering Integration

- HiGS (arXiv:2606.00352) achieves 15.8x rendering speedup via dual-scale tile architecture
- MCP integration: `render_frame()` can leverage HiGS backend for real-time rendering
- Architecture: Agent → MCP → HiGS Renderer (macro-tile partitioning + micro-tile rasterization)
- Performance target: 950+ FPS on NVIDIA GPU for interactive scene exploration