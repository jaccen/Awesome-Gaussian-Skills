---
# Best Practices

## 3.1 Quality Assurance

**Geometric**: Chamfer Distance, F-Score (τ ∈ {1mm, 5mm, 10mm}), normal consistency

**Visual**: PSNR/SSIM/LPIPS — WARNING: insufficient for engineering use; human evaluation required for sign-off

**Engineering metrics**: sensor sim fidelity vs real data, real-time FPS (30/60/90+ by domain), memory footprint, time-to-first-render, rate-distortion curves

## 3.2 Scalability

- **Scene splitting**: octree/voxel grid, ~1M Gaussians/cell, overlap zones for seams
- **LOD**: multi-resolution hierarchy, distance-based switching, view-dependent refinement
- **Streaming**: camera pose → spatial index → LOD + frustum culling → compress → transfer → decompress & render

| Scenario | Compression | Ratio | Quality |
|----------|------------|-------|---------|
| Prototyping | None | 1x | None |
| Desktop | GETA-3DGS | 5x | Minimal |
| Mobile | MobileGS / CAGS | 10–50x | Moderate |
| Web | MesonGS++ + .splat/SPZ | 30–50x | Acceptable |
| Large-scale | HAC + progressive / CAGS | 50–100x | Significant |

## 3.3 Cross-Platform

| Platform | Backend | Fallback | Max Scene | Real-time? |
|----------|---------|----------|-----------|------------|
| Desktop (NVIDIA) | CUDA | Vulkan | 10M+ | 60 FPS |
| Desktop (AMD/Intel) | VkSplat | GSeurat | 5M+ | 30 FPS |
| Desktop (CPU) | tortuise (Rust) | — | 500K | No |
| macOS (Apple) | msplat (Metal) | — | 3M | 20 FPS |
| iOS | Metal | — | 1M | 15 FPS |
| Android | Vulkan | WebGPU | 1M | 15 FPS |
| Web | WebGPU | WebGL2 | 500K–2M | Varies |
| VR (Quest 3) | Vulkan (OpenXR) | — | 2M | 72 Hz |
| VR (Vision Pro) | Metal | — | 3M | 90 Hz |

**Checklist**: target GPU family, VRAM fallback to lower LOD, color space (sRGB/linear/HDR), min-spec hardware, memory leak testing over extended sessions

## 3.4 Data Pipeline Automation

**CI/CD**: Data validation → COLMAP SfM+MVS → 3DGS training → quality gate (PSNR/F-Score) → compression → deploy to CDN → alert on regression

**Quality gates**: PSNR < 28 dB = flag; geometric drift > 5mm = flag; coverage gaps; floater/needle artifacts

**Versioning**: Raw images + COLMAP in git; checkpoints (.ply) in git LFS/DVC; semantic versioning; changelog per version

**Monitoring**: FPS P50/P95/P99, Gaussian count, file size, data freshness, user engagement metrics