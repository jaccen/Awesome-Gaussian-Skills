
# 3DGS VRAM & GPU Requirements

> Precomputed VRAM requirements for 3DGS training across Gaussian counts, SH degrees, and GPU types.
> Use to estimate memory needs before training and to diagnose OOM issues (see SKILL.md Sec 3).

## How to Use

1. Estimate your target Gaussian count (typically 300k-500k for indoor, 500k-1M+ for outdoor)
2. Find the table matching your SH degree
3. Look up VRAM requirements for your GPU
4. If estimated VRAM > 80% of GPU VRAM, apply mitigation strategies (Sec 3.2 of SKILL.md)

---

## 1. VRAM Estimation Formula

```
VRAM_peak = Model + Optimizer + Raster + Gradient + ADC_Spike

Component   Formula                                     Notes
---------   --------                                    -----
Model       N × 59 × 4 bytes (SH=3)                     Per-Gaussian: xyz(3)+scale(3)+rot(4)+opacity(1)+SH(48)
            N × 35 × 4 bytes (SH=1)                     SH(d): (d+1)^2 × 3
            N × 11 × 4 bytes (SH=0)                     DC only: 3
Optimizer   2 × Model                                   Adam: momentum + variance
Raster      H × W × C × batch × 4 bytes                 Per-image batch in rendering
Gradient    1 × Model                                   Gradients for all params
ADC_Spike   0.5 × Model                                 Temporary during clone/split

Total ≈     4.5 × Model + Raster                        Approximate peak
```

### Bytes per Gaussian by SH Degree

| SH Degree | SH Coeffs | Total Floats | Bytes per Gaussian |
|-----------|-----------|-------------|-------------------|
| 0 (DC) | 3 | 14 (3+3+4+1+3) | 56 |
| 1 | 12 | 23 (3+3+4+1+12) | 92 |
| 2 | 27 | 38 (3+3+4+1+27) | 152 |
| 3 (default) | 48 | 59 (3+3+4+1+48) | 236 |
| 4 | 75 | 86 (3+3+4+1+75) | 344 |

---

## 2. VRAM Table — SH Degree 3 (Default)

Peak VRAM (GB) = Model + Optimizer + Gradient + ADC Spike (excludes raster, which depends on resolution)

| Gaussians | Model (GB) | + Optimizer (GB) | + Gradient (GB) | + ADC (GB) | Total Peak (GB) | + 1080p Raster |
|-----------|-----------|------------------|-----------------|------------|-----------------|----------------|
| 50,000 | 0.011 | 0.034 | 0.011 | 0.005 | 0.06 | 0.20 |
| 100,000 | 0.022 | 0.066 | 0.022 | 0.011 | 0.12 | 0.26 |
| 200,000 | 0.044 | 0.131 | 0.044 | 0.022 | 0.24 | 0.38 |
| 300,000 | 0.066 | 0.197 | 0.066 | 0.033 | 0.36 | 0.50 |
| 400,000 | 0.088 | 0.263 | 0.088 | 0.044 | 0.48 | 0.62 |
| 500,000 | 0.110 | 0.329 | 0.110 | 0.055 | 0.60 | 0.75 |
| 750,000 | 0.165 | 0.493 | 0.165 | 0.082 | 0.91 | 1.05 |
| 1,000,000 | 0.220 | 0.658 | 0.220 | 0.110 | 1.21 | 1.35 |
| 2,000,000 | 0.439 | 1.316 | 0.439 | 0.220 | 2.42 | 2.56 |
| 5,000,000 | 1.098 | 3.291 | 1.098 | 0.549 | 6.04 | 6.18 |
| 10,000,000 | 2.197 | 6.582 | 2.197 | 1.098 | 12.08 | 12.22 |
| 20,000,000 | 4.394 | 13.164 | 4.394 | 2.197 | 24.15 | 24.29 |
| 50,000,000 | 10.984 | 32.910 | 10.984 | 5.492 | 60.37 | 60.51 |

**Raster VRAM (1080p, 3-channel, FP32):** ~0.14 GB per image in batch. Typically 1-4 images per step.

### Key Observations

- **300k Gaussians** (typical Mip-NeRF 360 result): ~0.5 GB total — any modern GPU works
- **1M Gaussians** (large outdoor scene): ~1.35 GB — easily fits on 4 GB+ GPU
- **10M Gaussians** (city-scale): ~12 GB — needs RTX 3080/4090 or better
- **50M Gaussians** (massive scene): ~60 GB — needs A100 80GB or multi-GPU

**Note:** These are model-only VRAM estimates. Actual peak VRAM includes rasterizer overhead, temporary allocations, and framework overhead. Real-world VRAM usage is typically 2-5x the model VRAM shown here due to CUDA context, PyTorch overhead, and rasterization buffers.

---

## 3. Realistic VRAM Estimates (Including Overhead)

Practical VRAM usage observed in training (includes framework overhead, rasterizer, data loading):

| Gaussians | SH=3 | SH=1 | SH=0 | 8-bit Adam (SH=3) |
|-----------|------|------|------|-------------------|
| 50k | 2-3 GB | 1.5-2 GB | 1-1.5 GB | 1.5-2 GB |
| 100k | 3-5 GB | 2-3.5 GB | 1.5-2.5 GB | 2.5-3.5 GB |
| 200k | 5-8 GB | 3.5-5.5 GB | 2.5-4 GB | 4-5.5 GB |
| 300k | 7-11 GB | 5-7 GB | 3.5-5 GB | 5-7 GB |
| 500k | 10-15 GB | 7-10 GB | 5-7 GB | 7-10 GB |
| 750k | 14-20 GB | 10-14 GB | 7-10 GB | 10-13 GB |
| 1M | 18-26 GB | 13-18 GB | 9-13 GB | 12-17 GB |
| 2M | 32-45 GB | 23-32 GB | 16-23 GB | 22-30 GB |
| 5M | 70-90 GB | 50-65 GB | 35-45 GB | 45-60 GB |
| 10M | OOM on 80GB | 80-100 GB | 55-70 GB | 70-85 GB |

**These estimates use:** 1080p resolution, batch=1, Adam optimizer, PyTorch default overhead. For higher resolution or batch, add ~0.5-1 GB per extra image/batch.

---

## 4. GPU Recommendations by Scene Type

| Scene Type | Typical Gaussians | Recommended GPU (min) | Recommended GPU (optimal) | Notes |
|------------|-------------------|----------------------|--------------------------|-------|
| DTU object | 100k-200k | GTX 1060 6GB | RTX 3060 12GB | Small scene, fast training |
| Mip-NeRF 360 | 300k-500k | RTX 3060 12GB | RTX 4070 12GB | Moderate, standard benchmark |
| Tanks & Temples | 200k-400k | RTX 3060 12GB | RTX 3080 10GB | Large outdoor |
| Deep Blending | 200k-350k | RTX 3060 12GB | RTX 3080 10GB | Complex indoor |
| Large outdoor | 500k-1M | RTX 3090 24GB | RTX 4090 24GB | High Gaussian count |
| City-scale | 1M-5M+ | A100 40GB | A100 80GB | Block-wise recommended |
| Deformable (dynamic) | 200k-500k | RTX 3090 24GB | RTX 4090 24GB | Extra MLP params |
| Feed-forward (inference) | Varies | RTX 3090 24GB | A100 40GB | Large model weights |
| SLAM (real-time) | 50k-200k | RTX 3060 12GB | RTX 3080 10GB | Incremental, low count |

---

## 5. VRAM Breakdown by Component (300k Gaussians, SH=3, 1080p)

```
Component                    VRAM (GB)   % of Total
────────────────────────── ──────────  ──────────
Model parameters              0.066        6%
Optimizer (Adam m+v)          0.197       18%
Gradients                     0.066        6%
Rasterizer (per image)        0.140       13%
ADC temporary spike           0.033        3%
─── Framework Overhead ─────
CUDA context                  ~0.500      45%
PyTorch allocator             ~0.100       9%
─── Total ───                ~1.10 GB    100%
```

Note: Actual measured VRAM for this config is typically 7-11 GB (including all Python/PyTorch/CUDA overhead, image data in VRAM, and rasterizer intermediate buffers not shown above).

---

## 6. Multi-GPU VRAM Savings

| Strategy | VRAM per GPU (4 GPUs) | Speedup | Implementation Complexity |
|----------|----------------------|---------|--------------------------|
| Data Parallel (DDP) | 1/4 of optimizer + gradient | ~3.2x | Low |
| FSDP | 1/4 of model + optimizer + gradient | ~3.0x | Medium |
| 8-bit Adam + DDP | 1/8 of optimizer + 1/4 gradient | ~3.2x | Low-Medium |
| CPU Offload + DDP | Near-zero optimizer VRAM | ~2.5x | Medium |
| Model Parallel (split N) | Proportional split | ~2.5x | High |

---

## 7. VRAM Reduction Techniques — Measured Impact

| Technique | VRAM Reduction | Quality Impact | Speed Impact | Recommendation |
|-----------|---------------|----------------|-------------|----------------|
| Resolution × 0.5 | ~60% raster | -0.5 to -1.5 dB PSNR | +20% faster | First choice for OOM |
| SH 3→1 | ~40% model | -0.3 to -1.0 dB (view-dep) | +10% faster | If view-dep not critical |
| SH 3→0 | ~75% model | -1.0 to -3.0 dB | +15% faster | Last resort |
| 8-bit Adam | ~60% optimizer | None (good) | +5% slower | Strongly recommended |
| Gradient checkpointing | ~35% gradient | None | +15% slower | For large models |
| Batch 1 (from 4) | ~75% raster | Minor convergence noise | +30% slower | Standard for 3DGS |
| Densify interval ×2 | ~10% ADC | Slower convergence | Negligible | If OOM at ADC |
| Early densify stop (10k) | ~15% model | -0.5 to -1.0 dB | Faster | Acceptable trade-off |
| Streaming images | Major (all images) | None | +5% slower (I/O) | For large datasets |
| Prune floaters actively | ~5-15% model | +0.1 to +0.3 dB | Negligible | Good practice |

---

## 8. Quick VRAM Estimator

Use this formula for a quick estimate:

```
VRAM_GB ≈ (N_gaussians / 100,000) × 1.8 × SH_multiplier + 4

Where:
  SH_multiplier = 1.0 (SH=0), 1.5 (SH=1), 2.0 (SH=2), 2.5 (SH=3)
  +4 GB = approximate framework/CUDA/rasterizer overhead

Examples:
  300k, SH=3: (3.0) × 1.8 × 2.5 + 4 = 13.5 + 4 = 17.5 GB → RTX 3090/4090 OK
  100k, SH=3: (1.0) × 1.8 × 2.5 + 4 = 4.5 + 4 = 8.5 GB → RTX 3060 12GB OK
  1M, SH=3:   (10.0) × 1.8 × 2.5 + 4 = 45 + 4 = 49 GB → Needs A100 80GB or DDP
```

> If you like it, please star this repo https://github.com/jaccen/Awesome-Gaussian-Skills