---
name: 3dgs-compression-deploy
description: "3DGS compression-to-deployment pipeline: quantization (scalar/VQ/mixed-precision), pruning (coreset/adaptive/variational/merge/Bayesian), progressive streaming & LoD, Web/WebGPU/mobile deployment, hardware acceleration (Tensor Core/GEMM/FPGA/ASIC), training-free semantic compression. Covers 53+ methods across 6 compression categories. Use when: compressing 3DGS models, deploying 3DGS to web/mobile/edge, selecting quantization bit-width, designing streaming pipelines, 3DGS压缩/量化/剪枝/部署/流式传输/移动端/硬件加速."
license: Apache-2.0
user-invocable: true
metadata:
  version: "1.1.1"
  author: jaccen
  tags: ["3dgs", "gaussian-splatting", "compression", "quantization", "pruning", "vector-quantization", "streaming", "deployment", "mobile", "webgpu", "tensor-core", "hardware-acceleration", "bayesian", "semantic-compression"]
  when_to_use:
    - "Compress a 3DGS model for storage or transmission"
    - "Deploy 3DGS to web browser, mobile device, or edge hardware"
    - "Select quantization scheme, bit-width, or pruning strategy"
    - "Design progressive streaming or Level-of-Detail pipeline"
    - "Evaluate hardware acceleration options (Tensor Core, GEMM, FPGA, ASIC)"
    - "3DGS压缩 / 量化 / 剪枝 / 部署 / 流式传输 / 移动端 / 硬件加速"
---

# 3DGS Compression & Deployment

> End-to-end pipeline from raw 3DGS model to deployed application. Covers 6 compression categories + 4 deployment targets + hardware acceleration.

## Capabilities

- Analyze 3DGS model attributes (position, SH, opacity, scale, rotation) and recommend compression strategy
- Select quantization method and bit-width per attribute (scalar, VQ, mixed-precision)
- Design pruning pipeline (coreset, adaptive, variational, merge-based)
- Plan VQ codebook architecture and residual coding
- Architect progressive streaming and LoD systems (static and 4D dynamic)
- Guide platform-specific deployment (WebGL, WebGPU, iOS/Android, desktop)
- Evaluate hardware acceleration paths (Tensor Core, GEMM, FPGA, ASIC)
- Estimate compression ratio, quality loss, and rendering speed for each method combination

## Compression Pipeline

```
Raw 3DGS Model
    │
    ▼
[Step 1] Analysis ── attribute profiling, bottleneck identification
    │
    ▼
[Step 2] Strategy Selection ── target platform → compression recipe
    │
    ▼
[Step 3] Pruning ── reduce Gaussian count (coreset / adaptive / variational / merge)
    │
    ▼
[Step 4] Quantization ── reduce per-attribute bit-width (scalar / VQ / mixed-precision)
    │
    ▼
[Step 5] Vector Quantization ── codebook-based attribute compression (optional, replaces/augments Step 4)
    │
    ▼
[Step 6] Streaming & LoD ── progressive loading structure for network delivery
    │
    ▼
[Step 7] Deployment ── platform-specific renderer and runtime
    │
    ▼
Deployed Application (Web / Mobile / Desktop / Edge)
```

## Step 1: Analysis

Profile the 3DGS model before selecting compression methods:

| Attribute | FP32 Size | Typical Range | Sensitivity to Quantization |
|-----------|-----------|---------------|---------------------------|
| Position (μ) | 12B/Gaussian | Scene bounds | High — direct geometry impact |
| SH (degree 0–3) | 48B/Gaussian | [-1, 1] per coeff | Medium-High — visual quality driver |
| Opacity (α) | 4B/Gaussian | [0, 1] | Medium — pruning signal |
| Scale (s) | 12B/Gaussian | [1e-5, 1e2] | Medium — anisotropy sensitive |
| Rotation (q) | 16B/Gaussian | Unit quaternion | Low-Medium — can tolerate 8-bit |

**Profiling checklist:**
1. Total Gaussian count N and file size S
2. Target platform constraints (memory budget, bandwidth, GPU capability)
3. Quality floor (minimum acceptable PSNR/SSIM)
4. Required FPS threshold
5. Whether dynamic (4DGS) or static scene

## Step 2: Compression Strategy Selection

Decision tree by target platform:

```
Target Platform?
├── Web (WebGL/WebGPU)
│   ├── Bandwidth-limited → Pruning + VQ + Streaming (CAGS/HGS pipeline)
│   └── Compute-limited → Aggressive pruning + low SH degree + Flux-GS
├── Mobile (iOS/Android)
│   ├── Real-time required → Mobile-GS pipeline (depth-aware OIT + distillation + pruning)
│   └── Quality priority → MesonGS++ (mixed-precision, budget-controlled) + NanoGS merge
├── Desktop (GPU ≥ RTX 3060)
│   ├── Max quality → Light quantization only (8-10 bit, ContextGS entropy coding)
│   └── Large scene → Pruning + Streaming + HiGS hierarchical tiles
└── Edge / Embedded
    ├── FPGA targeted → SpqGS (hardware-friendly quantization) + Axis-Shared Accelerator
    └── Low-power GPU → VEDAL pruning + 4-6 bit quantization + PocketGS on-device
```

**Combined target table:**

| Target | Typical Gaussian Budget | Bit-width Range | Streaming | Key Methods |
|--------|------------------------|-----------------|-----------|-------------|
| Web | 100K–500K | 4–8 bit | Required | CAGS, StreamLoD-GS, Spark 2.0 |
| Mobile | 50K–200K | 4–8 bit | Optional | Mobile-GS, Flux-GS, PocketGS |
| Desktop | 500K–5M | 8–16 bit | For large scenes | MesonGS++, HiGS, gsplat |
| Edge/FPGA | 10K–100K | 2–6 bit | Required | SpqGS, VEDAL, GEMM-GS |

## Step 3: Quantization

### Method Selection

| Method | Type | Venue | Bit-width | Key Feature |
|--------|------|-------|-----------|-------------|
| MesonGS++ | Mixed-precision (post-training) | arXiv 2026 | 4–16 bit per attribute | 0-1 ILP hyperparameter search, 34x compression |
| GETA-3DGS | Joint pruning + quantization | arXiv 2026 | 4–8 bit heterogeneous | Render-aware saliency, QADG dependency graph |
| GSQ | Learned step size | CVPR 2025 | 4–8 bit | Group-wise quantization with learnable step |
| ContextGS | Context-model entropy coding | NeurIPS 2024 | 8–16 bit | Anchor-level context replaces uniform quant |
| SpqGS | Scalable parallel | CVPR 2025 | Hardware-friendly | Parallel bit allocation for FPGA/ASIC |
| SOG-GS | Channel-grouped | CVPR 2025 | Per-channel | Preserves inter-Gaussian correlations |
| ZipGS | Pruning + quant + entropy | CVPR 2025 | Variable | Volumetric entropy coding |
| GaussianCodec | Entropy-constrained | CVPR 2025 | Rate-distortion optimized | Learned codec with ECVQ |
| EAGLES | Quantized embeddings | ECCV 2024 | 8–16 bit | Coarse-to-fine training + pruning |
| TC-GS | Tri-plane representation | IEEE 2026 | Implicit via tri-plane | Replaces per-Gaussian SH with shared tri-plane |

### Bit-width Selection Guide

| Attribute | 4–5 bit | 6–8 bit | 8–12 bit | 12–16 bit |
|-----------|---------|---------|----------|-----------|
| Position | Edge only — visible artifacts | Mobile/Web acceptable | Desktop recommended | Lossless-range |
| SH (dc) | Not recommended | Edge/mobile | Desktop | High-fidelity |
| SH (rest) | Aggressive mobile | Mobile/Web | Desktop | Unnecessary |
| Opacity | Acceptable (post-sigmoid) | Recommended | Overkill | Overkill |
| Scale | Log-space 4-bit risky | Log-space 6–8 bit | Recommended | Overkill |
| Rotation | 8-bit often sufficient | Standard | Unnecessary | Overkill |

**Rule of thumb:** Position and SH dominate quality; allocate more bits there. Opacity and rotation tolerate aggressive quantization.

## Step 4: Pruning

### Strategies

| Strategy | Method | Venue | Compression | Quality Impact |
|----------|--------|-------|-------------|----------------|
| **Coreset-based** | Provable Pruning via Coresets | arXiv 2026 | Theoretical guarantee | Minimal — multiplicative approximation |
| **Bayesian** | DP-Splat | arXiv 2026 | Automatic complexity control | Minimal — DP prior converges to optimal count |
| **Training-free semantic** | CoSAG | arXiv 2026 | 37–76× over LangSplatV2 | Minimal — zero fine-tuning, leverages CLIP features |
| **Importance-based** | Prune Wisely (DoG) | CVPR 2026 | 90% reduction | Minimal — DoG avoids false positives |
| **Variational** | VEDAL | arXiv 2026（venue 待核实） | 5.2x (0.31 dB drop) | Low — uncertainty-gated async pruning |
| **Merge-based** | NanoGS | arXiv 2026 | Training-free | Mass-preserving moment matching |
| **Global+Local** | LightGaussian | NeurIPS 2024 | 15x | SVD distillation compensates |
| **Render-aware** | GETA-3DGS | arXiv 2026 | ~5x storage | Transmittance-weighted saliency |
| **Frequency-aware** | FAD-GS | CVPR 2024 | Frequency-separated | Separates low/high freq Gaussians |
| **Memory-bounded** | Gaussians on a Diet | arXiv 2026 | 80% peak memory | Iterative growth+pruning |
| **Hybrid** | HybridGS | CVPR 2025 | Explicit+implicit | Neural coding recovers pruned info |
| **Budget-controlled** | MGS (Matryoshka) | arXiv 2026 | Continuous LoD | Any prefix of ordered set is coherent |

### Pruning Decision Flow

```
Need theoretical guarantees?
├── Yes → Provable Pruning via Coresets
└── No
    ├── Training-free requirement?
    │   ├── Yes → NanoGS (merge) or LightGaussian (post-training)
    │   └── No
    │       ├── Can retrain/fine-tune after pruning?
    │       │   ├── Yes → Prune Wisely (DoG) + finetune, or VEDAL
    │       │   └── No → NanoGS or GETA-3DGS (auto, no per-scene thresholds)
    │       └── Need continuous quality levels?
    │           └── Yes → MGS (Matryoshka stochastic budget training)
```

## Step 5: Vector Quantization

### VQ Pipeline

```
Gaussian Attributes
    │
    ▼
[1] Attribute Grouping ── group by type (position, SH, scale/rotation)
    │
    ▼
[2] Codebook Learning ── K-means / learned / residual codebook
    │
    ▼
[3] Assignment ── nearest-neighbor lookup per group
    │
    ▼
[4] Residual Coding ── (optional) multi-level residual VQ
    │
    ▼
[5] Entropy Coding ── arithmetic / ANS coding of indices
    │
    ▼
Compressed Bitstream
```

### VQ Methods

| Method | Codebook Type | Venue | Compression | Key Feature |
|--------|--------------|-------|-------------|-------------|
| CompactGS | Learned per-attribute | ECCV 2024 | 10–15x | Simple codebook, minimal overhead |
| VQGS | Residual codebook | CVPR 2025 | High-ratio | Multi-level residual improves quality |
| RDO-Gaussian | ECVQ (entropy-constrained) | ECCV 2024 | 40x+ | Rate-distortion optimized VQ |
| CAGS | VQ + LoD layers | SIGGRAPH 2026 | Adaptive | VQ establishes quality LoDs for streaming |
| CGVQ | Clustered codebook | SIGGRAPH 2026 Poster | 20% bpp reduction | Cluster-guided grouping before quant |
| Sp2403GS | Codebook + pruning | CVPR 2024 | Combined | Importance-based codebook selection |
| HAC | Hash-grid context | ECCV 2024 | ~100x | Context modeling for entropy coding |
| CompGS | Importance-aware | CVPR 2025 | Progressive | Progressive decoding support |

### Codebook Design Rules

1. **Codebook size K**: 256 (8-bit index) is standard; 1024 (10-bit) for quality; 64 (6-bit) for extreme compression
2. **Grouping strategy**: Group by attribute type (position separate from SH); within SH, separate DC from higher-order
3. **Residual levels**: 1 level = 10–20x; 2 levels = 20–50x; 3 levels = diminishing returns
4. **LoD integration**: Each residual level can serve as a LoD tier (see Step 6)

## Step 6: Streaming & LoD

### Static Scene Streaming

| Method | LoD Mechanism | Venue | Latency Reduction | Key Feature |
|--------|--------------|-------|-------------------|-------------|
| StreamLoD-GS | View-dependent LoD levels | arXiv 2026 | Progressive | Bandwidth-adaptive FVV delivery |
| HGS | Hierarchical Gaussian structuring | CVPR 2025 | Progressive | Level-of-detail Gaussian hierarchy |
| GS-Stream | Progressive chunk delivery | CVPR 2025 | Bandwidth-adaptive | Chunk-based 3DGS streaming |
| EvoGS | Evolution Tree (wavelet-inspired) | arXiv 2026 | 2.4x payload reduction | Continuous parent-child refinement |
| MGS | Stochastic budget training | arXiv 2026 | Continuous | Any prefix = coherent render |
| SCube | VoxSplats + hierarchical LOD | NeurIPS 2024 | Hierarchical | Voxelized splat for large-scale |
| CAGS | VQ-based LoD + reference image | SIGGRAPH 2026 | +5–20 dB PSNR | Server-side low-res reference corrects color |

### Dynamic (4DGS) Streaming

| Method | Mechanism | Venue | First-frame Latency | Key Feature |
|--------|-----------|-------|---------------------|-------------|
| PD-4DGS | Hierarchical Deformation Decomposition | arXiv 2026 | ~1.7s (from 73–930s) | 3 independent layers: static + global deform + local refine |
| CAGS | VQ LoD + color correction | SIGGRAPH 2026 | Adaptive | Representation-agnostic, works with diverse Gaussian types |
| QUEEN | Quantized streaming encoding | NeurIPS 2024 | Streaming | Dynamic Gaussian free-viewpoint video |
| BlitzGS | Distributed GPU sharding | arXiv 2026 | Parity-based | City-scale distributed rendering + importance scoring |

### Streaming Architecture Pattern

```
Server                                          Client
┌──────────┐    HTTP/HLS/DASH    ┌──────────────────┐
│ 3DGS     │ ──── Layer 0 ────→ │ Base quality      │
│ Encoder  │ ──── Layer 1 ────→ │ + Deformation     │
│          │ ──── Layer 2 ────→ │ + Refinement      │
│ CAGS/    │                    │                   │
│ PD-4DGS  │ ←── Bandwidth ──── │ Quality Feedback  │
└──────────┘                    └──────────────────┘
```

## Step 7: Deployment

### Web (WebGL / WebGPU)

| Platform | Renderer | Max Gaussians | Key Feature |
|----------|----------|--------------|-------------|
| Spark 2.0 | WebGPU | 100M+ splats | Chunk streaming, multi-splat sorting, progressive LOD |
| Visionary | WebGPU + ONNX Runtime | Large | 4DGS + neural avatars + generative post-processing |
| SuperSplat | WebGL | ~5M | Editable viewer, selection tools |
| PlayCanvas | WebGL 2.0 | ~2M | Game engine integration |

**Web deployment checklist:**
1. Choose WebGPU (Chrome 113+) for compute shader support; fallback WebGL 2.0 for compatibility
2. Chunk Gaussians into 50K–200K groups for progressive loading
3. Use INT8/FP16 textures for quantized attributes
4. Implement front-to-back alpha compositing in fragment shader (WebGL) or compute shader (WebGPU)
5. Target 30+ FPS at 1080p for interactive experience

### Mobile (iOS / Android)

| Method | Venue | FPS (Mobile) | Key Feature |
|--------|-------|-------------|-------------|
| Mobile-GS | ICLR 2026 | 1000+ FPS (on-device) | Depth-aware OIT + distillation + contribution pruning |
| Flux-GS | ECCV 2026 | Real-time | Monte Carlo specular energy, compact latent SH |
| PocketGS | arXiv 2026 | On-device training | Anisotropic seeding + cached alpha compositing |

**Mobile deployment pipeline:**
1. Train on server → compress (prune + quantize + merge via NanoGS)
2. Export to mobile-optimized format (INT8 attributes, fused SH degree ≤ 2)
3. Use Metal (iOS) / Vulkan (Android) for GPU rasterization
4. Apply Mobile-GS depth-aware OIT for correct blending on tile-based GPUs
5. Memory budget: stay under 500MB for iOS, 300MB for Android

### Desktop

- **gsplat** (UC Berkeley/NVIDIA): Production-grade CUDA rasterization, 4x VRAM savings
- **HiGS** (NVIDIA): Hierarchical tiling for 15.8x speedup, exact front-to-back compositing
- **GEMM-GS**: Tensor Core-compatible blending for 1.42x speedup

## Hardware Acceleration

| Method | Hardware | Venue | Speedup | Key Feature |
|--------|----------|-------|---------|-------------|
| GEMM-GS | Tensor Core (GEMM) | arXiv 2026 | 1.42x | Reformulates blending as GEMM ops |
| TensorGS | Tensor Core (FP16 matrix) | arXiv 2026 | 1.65x | Tensorizes rasterization with cross-tile grouping |
| Axis-Shared Accelerator | ASIC (custom) | ISCA 2026 | On-chip real-time | First 3DGS hardware accelerator, order-independent transmittance |
| HiGS | GPU (hierarchical tiles) | NVIDIA 2026 | 15.8x | Macro-tile + fine render tile decoupling |
| LiteGS | GPU (Moore Threads) | SIGGRAPH Asia 2025 | Software-hardware co-opt | Won 3DGS Challenge silver at SIGGRAPH Asia |
| SpqGS | FPGA-friendly | CVPR 2025 | Parallel bit allocation | Hardware-scalable quantization |
| QuadBox | GPU (AABB optimization) | arXiv 2026 | 1.85x | Geometry-aware bounding boxes |
| StereoGS | ASIC (stereoscopic) | 2026 | Dual-eye shared | Energy-efficient stereoscopic GS processor; shared compute + memory bandwidth for VR/AR |

### Acceleration Selection

```
Deployment hardware?
├── NVIDIA GPU (RTX 30xx+)
│   ├── Tensor Core available → GEMM-GS or TensorGS
│   └── Standard CUDA → HiGS + gsplat
├── Custom ASIC / SoC design
│   └── Axis-Shared Rasterization Accelerator (ISCA 2026)
├── FPGA
│   └── SpqGS (hardware-friendly quant) + custom rasterizer
├── Mobile GPU (Mali/Adreno/Apple)
│   └── Mobile-GS depth-aware OIT + Flux-GS Monte Carlo
└── VR/AR HMD (stereoscopic)
    └── StereoGS (dual-eye shared compute + memory bandwidth)
```

## Methods Quick Reference

| Category | Method | Venue | Compression | Quality | Speed |
|----------|--------|-------|-------------|---------|-------|
| Mixed-precision Q | MesonGS++ | arXiv 2026 | 34x | High | Post-training |
| Joint Prune+Q | GETA-3DGS | arXiv 2026 | ~5x | High | Auto |
| Adaptive Prune | Prune Wisely | CVPR 2026 | 90% Gaussians | High | Post-training |
| Variational Prune | VEDAL | arXiv 2026（venue 待核实） | 5.2x | 0.31 dB drop | 185 FPS |
| Coreset Prune | Provable Coresets | arXiv 2026 | Guaranteed | Theoretical | + finetune |
| Merge Simplify | NanoGS | arXiv 2026 | Training-free | High | Fast (CPU) |
| VQ+LoD Stream | CAGS | SIGGRAPH 2026 | Adaptive | +5–20 dB | Stream |
| VQ Residual | VQGS | CVPR 2025 | High-ratio | Medium | — |
| Tri-plane | TC-GS | IEEE 2026 | Implicit | — | — |
| 4D Stream | PD-4DGS | arXiv 2026 | Progressive | 3-layer | 1.7s first-frame |
| Large-scale Dist | BlitzGS | arXiv 2026 | Parity shards | City-scale | Distributed |
| Mobile | Mobile-GS | ICLR 2026 | 50–100x | Acceptable | 1000+ FPS |
| Mobile | Flux-GS | ECCV 2026 | Parameter reduction | High | Real-time |
| WebGPU | Visionary | arXiv 2025 | Stream | High | WebGPU |
| Web | Spark 2.0 | 2026 | Stream | 100M+ splats | WebGPU |
| Tensor Core | GEMM-GS | arXiv 2026 | — | Negligible loss | 1.42x |
| Tensor Core | TensorGS | arXiv 2026 | — | Negligible loss | 1.65x |
| ASIC | Axis-Shared Accel | ISCA 2026 | — | On-chip | Real-time |
| Hierarchical Tile | HiGS | NVIDIA 2026 | — | Exact compositing | 15.8x |
| Evolution Tree | EvoGS | arXiv 2026 | 2.4x payload | Continuous | Stream |
| Matryoshka LoD | MGS | arXiv 2026 | Continuous | Any prefix | Flexible |
| Hash-grid Context | HAC | ECCV 2024 | ~100x | High | Encoding |

## Output Format

When this skill produces a compression-deployment plan, use this template:

```markdown
# 3DGS Compression & Deployment Plan

## Model Profile
- Gaussian count: N
- File size: S MB
- Scene type: static / dynamic (4DGS)
- Key bottleneck: [storage / bandwidth / compute / memory]

## Target Platform
- Platform: [Web / Mobile / Desktop / Edge]
- Constraints: [memory budget, bandwidth, GPU]

## Compression Recipe
1. Pruning: [method] → target: X% reduction
2. Quantization: [method] → [bit-width per attribute]
3. VQ: [method, codebook size] → (if applicable)
4. Entropy coding: [method]

## Expected Results
- Compression ratio: Xx
- Estimated PSNR: Y dB (drop: Δ dB)
- Estimated file size: Z MB
- Rendering speed: W FPS on target

## Streaming Architecture (if applicable)
- Layers: [base / deformation / refinement]
- First-frame latency: < T seconds

## Deployment Stack
- Renderer: [gsplat / Spark 2.0 / Mobile-GS / custom]
- Acceleration: [Tensor Core / HiGS / FPGA / none]
- Format: [PLY compressed / chunk stream / custom binary]
```

## Rules

1. **Always profile before compressing**: attribute distribution dictates bit-width allocation, not a fixed recipe
2. **Pruning before quantization**: reducing Gaussian count first lowers total data; then quantize the remaining attributes
3. **VQ replaces or augments scalar quantization**: do not apply both independently to the same attribute group
4. **Streaming requires LoD structure**: flat compression without LoD degrades user experience on slow connections
5. **Mobile deployment needs Metal/Vulkan**: CUDA is not available on mobile; plan the rasterization backend from Step 2
6. **Quantization-aware finetuning recovers quality**: always finetune 1–5k iterations after aggressive (≤6 bit) quantization
7. **Entropy coding is the last step**: apply after all other compression; HAC/ContextGS/GaussianCodec specialize in this
8. **Cross-reference with knowledge base**: load `references/compression-methods.md` for full method details before making recommendations

## Red Lines

- **No invented metrics**: Never fabricate compression ratios, PSNR values, or FPS numbers. If a value is not in the knowledge base, state "data not available"
- **No hallucinated methods**: Only reference methods explicitly present in `references/compression-methods.md` or provided by the user
- **No speculative hardware claims**: Do not claim FPGA/ASIC performance numbers without source data
- **No silent speculation**: Flag uncertain details with `[UNCERTAIN]` rather than presenting as fact
- **No method misattribution**: Do not assign compression ratios from one method to another

## Related Skills

- **3dgs-engineering-guide** — Production deployment decisions, industry verticals, tech stack
- **3dgs-method-compare** — Compare compression methods head-to-head on benchmarks
- **3dgs-visualizer** — Generate radar charts comparing compression methods
- **3dgs-experiment-planner** — Design ablation studies for compression pipelines
- **cad-mesh-3dgs** — Mesh extraction from compressed 3DGS for BIM/CAD workflows
- **3dgs-mcp-renderer** — MCP protocol for compressed 3DGS rendering integration

## Guardrail: Do Not Apply From Memory

Do NOT try to apply the method data, compression ratios, technical details, or deployment recommendations described in this skill from memory. Always read the SKILL.md and `references/compression-methods.md` from disk before producing any output. The knowledge base is updated frequently; stale memory may produce outdated, inaccurate, or fabricated results.

If you cannot find a method, metric, or data point in the loaded files, say so explicitly. Never invent compression ratios, venue acceptances, performance numbers, or technical features not present in the source data.

> If you like it, please star this repo https://github.com/jaccen/Awesome-Gaussian-Skills
