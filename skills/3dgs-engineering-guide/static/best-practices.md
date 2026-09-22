
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

### 3.2.1 Large-Scale LOD Streaming (Mapmost Practice)

City-scale 3DGS (100km²) requires billions of Gaussians — far exceeding single-GPU memory. Mapmost SDK for WebGL implements production-grade LOD streaming:

- **LOD matching**: Distance-based LOD level selection; only load current view frustum content; intelligently cull out-of-view data
- **Tile edge seam fix**: Per-tile independent depth sorting causes visible seams between tiles; Mapmost uses a proprietary edge-pixel processing algorithm to smooth tile boundaries
- **Service pipeline**: Mapmost 3DGS Builder generates tiled LOD service → SDK loads via `isLOD: true` with `isMerge: false` (tiled) or `true` (merged)
- **Benchmark**: 100km² city-scale scene with smooth rendering on consumer hardware

### 3.2.2 Adaptive Partition Training for Large Scenes

For km²-scale reconstruction, single-pass training is impractical (time + memory):

- **Adaptive partitioning**: Automatically split scene into sub-regions based on spatial extent and density
- **Mask training**: Each partition trained independently with masking to prevent boundary artifacts
- **One-click pipeline**: Mapmost 3DGS Builder automates: partition → train → merge → LOD service
- **Benefit**: Enables km²-scale high-quality reconstruction without manual intervention

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

## 3.5 3DGS Object-Level Individualization (单体化)

3DGS output is a "seamless whole" — buildings, trees, vehicles all fused together. Individual object selection and interaction requires **individualization** (单体化): extracting independent objects from the continuous scene.

### Bounding-Box Individualization (Production-Ready)

Principle: wrap target building in a 3D "box" defined by:
- **2D footprint**: polygon outline on horizontal plane
- **Base height**: elevation of box bottom
- **Stretch height**: vertical extent upward

Mapmost SDK implements this via `ClassifyAnalysis`:
```javascript
let option = {
  coordinate: coordinate,   // bounding box 2D polygon
  color: "#ff0000",         // highlight color
  opacity: 0.5,             // transparency
  baseHeight: 25,           // box bottom elevation
  stretchHeight: 35,        // box vertical extent
};
let analysis = new mapmost.ClassifyAnalysis(map);
analysis.analyse(option);
```

### Interactive Pick Tool vs Automated Extraction

| Approach | Scale | Method |
|----------|-------|--------|
| Interactive pick (Mapmost tool) | Small/medium | Mouse-drawn polygon + height adjustment + real-time preview + export |
| Automated extraction | City/district | AI-based building footprint detection from 3DGS → auto-generate bounding boxes |

Supported data types: 3DTiles, 3DGS (.ply/.splat), MMGS service data.

### Why It Matters

Individualization is the foundation for: clickable building info popups, independent facility highlighting, IoT data binding to specific equipment, and fine-grained spatial analysis. Without it, 3DGS remains "look but don't touch."