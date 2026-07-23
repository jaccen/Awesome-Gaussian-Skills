
# 3DGS Convergence Trajectories

> Expected PSNR / SSIM / LPIPS / Gaussian count at key training iterations.
> Use these as reference baselines to detect abnormal training behavior.
> All values are approximate ranges from published results and community experience.
> Actual values vary by scene complexity, implementation, and hyperparameters.

## How to Use

1. Find your dataset and method family
2. Compare your training metrics at the specified iterations
3. If your PSNR is > 2 dB below the expected range at a given iteration, investigate (see SKILL.md Sec 2 & 6)
4. If your Gaussian count is > 2x above/below expected, check densification

---

## 1. Vanilla 3DGS — Standard Benchmarks

### Mip-NeRF 360 (per-scene averages, 30k iterations)

| Iteration | PSNR (dB) | SSIM | LPIPS | Gaussians | Phase |
|-----------|-----------|------|-------|-----------|-------|
| 0 | 14-18 | 0.35-0.45 | 0.45-0.55 | 1× SfM (~1k-10k) | Init |
| 500 | 19-22 | 0.50-0.60 | 0.35-0.45 | 8k-20k | Rapid Growth |
| 1,000 | 22-25 | 0.60-0.70 | 0.28-0.38 | 20k-60k | Rapid Growth |
| 2,000 | 25-27 | 0.68-0.76 | 0.22-0.30 | 60k-150k | Growth |
| 5,000 | 27-29 | 0.74-0.82 | 0.18-0.25 | 200k-350k | Refinement |
| 10,000 | 28-30 | 0.78-0.85 | 0.15-0.22 | 300k-400k | Late Refinement |
| 15,000 | 29-30.5 | 0.80-0.87 | 0.13-0.20 | 350k-420k | Densif Ends |
| 20,000 | 29.5-31 | 0.81-0.88 | 0.12-0.19 | 360k-430k | Fine-tune |
| 30,000 | 30-31.5 | 0.82-0.89 | 0.11-0.18 | 370k-450k | Final |

**Final published averages (Mip-NeRF 360, 8 scenes):** PSNR 27.21-31.2, SSIM 0.79-0.91, LPIPS 0.12-0.28

### Tanks & Temples (5k-30k iterations)

| Iteration | PSNR (dB) | Gaussians | Notes |
|-----------|-----------|-----------|-------|
| 500 | 18-21 | 5k-15k | Large scenes, slower init |
| 2,000 | 23-26 | 30k-80k | |
| 5,000 | 25-28 | 80k-200k | |
| 10,000 | 26-29 | 150k-300k | |
| 15,000 | 27-30 | 200k-350k | |
| 30,000 | 28-30.5 | 250k-400k | Final |

### Deep Blending (7k-30k iterations)

| Iteration | PSNR (dB) | Gaussians | Notes |
|-----------|-----------|-----------|-------|
| 500 | 20-24 | 5k-20k | Complex indoor, holes common |
| 2,000 | 24-28 | 30k-100k | |
| 5,000 | 26-29 | 80k-200k | |
| 10,000 | 27-30 | 150k-300k | |
| 30,000 | 28-31 | 200k-350k | Final |

### DTU (object-centric, 30k iterations)

| Iteration | PSNR (dB) | Gaussians | Notes |
|-----------|-----------|-----------|-------|
| 500 | 22-26 | 3k-10k | Fewer cameras = faster init |
| 2,000 | 28-32 | 15k-50k | |
| 5,000 | 32-35 | 40k-100k | |
| 10,000 | 34-37 | 60k-150k | |
| 30,000 | 35-38 | 80k-200k | Final |

---

## 2. Deformable 3DGS — Dynamic Scenes

### D-NeRF Synthetic (dynamic, 30k-50k iterations)

| Iteration | PSNR (dB) | Gaussians | Deform MLP Status | Notes |
|-----------|-----------|-----------|-------------------|-------|
| 0 | 16-20 | 1× SfM | Frozen (warmup) | MLP not training |
| 2,000 | 22-25 | 20k-50k | Frozen | Growth phase |
| 5,000 | 25-28 | 50k-100k | Enabled | MLP starts; possible instability |
| 10,000 | 27-30 | 100k-180k | Active | Temporal consistency improves |
| 20,000 | 29-32 | 150k-250k | Active | |
| 30,000 | 30-33 | 200k-300k | Active | Final for some scenes |
| 50,000 | 31-34 | 220k-320k | Active | Final; longer training helps |

**Alert**: If NaN appears when MLP is enabled (iter ~5000), see Pattern NF-01.

### Neural 3D Video (dynamic, multi-frame)

| Iteration | PSNR (dB) | Gaussians | Notes |
|-----------|-----------|-----------|-------|
| 500 | 22-26 | 10k-30k | Per-frame init |
| 2,000 | 27-30 | 30k-80k | |
| 5,000 | 29-32 | 60k-150k | Temporal consistency builds |
| 10,000 | 30-33 | 100k-200k | |
| 30,000 | 31-34 | 150k-250k | Final |

---

## 3. Feed-Forward GS — Multi-View Generalizable

### RealEstate10K / ACID (generalizable, cross-scene)

| Iteration | Train PSNR | Test PSNR | Notes |
|-----------|------------|-----------|-------|
| 1,000 | 16-19 | 15-18 | Model learning to predict Gaussians |
| 10,000 | 20-24 | 19-23 | |
| 50,000 | 24-28 | 22-26 | Overfitting risk increases |
| 100,000 | 26-30 | 23-27 | |
| 300,000 | 28-32 | 24-28 | Final (large-scale training) |

**Alert**: Feed-forward GS requires 100k+ iterations. Premature evaluation at 30k will show poor results. This is normal, not a bug.

---

## 4. SLAM-GS — Incremental Reconstruction

### Replica (SLAM, per-room)

| Iteration | PSNR (per-frame) | Tracking ATE (cm) | Notes |
|-----------|-------------------|-------------------|-------|
| Initial | 22-26 | 0.5-2.0 | Per-keyframe optimization |
| 50 keyframes | 25-28 | 1.0-3.0 | Map grows; drift starts |
| 100 keyframes | 26-29 | 2.0-5.0 | Global optimization needed |
| Final + BA | 28-31 | 0.5-1.5 | After loop closure / global BA |

**Alert**: If ATE grows monotonically beyond 5cm, see Pattern NF-08 (Drift Accumulation).

### TUM-RGBD (SLAM, tracking focus)

| Stage | ATE (cm) | Notes |
|-------|----------|-------|
| Per-frame | 1.0-3.0 | Good |
| 100 frames | 2.0-5.0 | Acceptable, drift visible |
| Sequence end (no BA) | 5.0-15.0 | Drift accumulated |
| Sequence end (with BA) | 1.0-5.0 | After global optimization |

---

## 5. Compression GS — Post-Pruning

| Compression Ratio | PSNR Drop (dB) | Expected PSNR | Notes |
|-------------------|----------------|---------------|-------|
| 2× (50% prune) | 0.1-0.5 | ~Full PSNR - 0.3 | Minimal loss |
| 5× (80% prune) | 0.5-1.5 | ~Full PSNR - 1.0 | Visible but acceptable |
| 10× (90% prune) | 1.0-3.0 | ~Full PSNR - 2.0 | Quality degradation |
| 20× (95% prune) | 2.0-5.0 | ~Full PSNR - 3.5 | Aggressive; artifacts |

**Alert**: If PSNR drops > 1 dB even at 2× compression, see Pattern NF-10.

---

## 6. Novel Method Convergence Comparison

| Method Family | Iters to 25 dB | Iters to Converge | Final PSNR (Mip-NeRF 360 avg) | Risk Period |
|---------------|---------------|-------------------|-------------------------------|-------------|
| Vanilla 3DGS | ~1,000 | 30k | 27.2-31.2 | ADC growth phase |
| Deformable 3DGS | ~1,500 | 30k-50k | N/A (dynamic) | MLP enable at iter 5k |
| Feed-Forward GS | ~50,000 | 100k-300k | N/A (generalization) | Undertrained at 30k |
| SLAM-GS | ~500 (per-frame) | Keyframe-based | N/A (incremental) | Drift after 50 kfs |
| MoE-GS | ~1,000 | 30k | ~27-31 + MoE benefits | Expert collapse at any time |
| Physics GS | ~1,500 | 30k-50k | ~25-30 | Simulation divergence early |
| City-Scale GS | ~5,000 | 50k-100k | N/A (large scale) | OOM / block discontinuity |

---

## 7. Abnormal Convergence Indicators

| Indicator | Expected | Abnormal | Action |
|-----------|----------|----------|--------|
| PSNR at iter 500 | 19-22 | < 16 | Check init, camera poses |
| PSNR at iter 2,000 | 24-27 | < 22 | Check densification, LR |
| PSNR at iter 10,000 | 28-30 | < 26 | Check densification freeze, SH degree |
| Gaussian count at iter 1,000 | 20k-60k | < 5k or > 200k | Check grad threshold, prune |
| Gaussian count at iter 15,000 | 300k-450k | < 100k or > 1M | Check densification config |
| Loss at iter 500 | 0.10-0.22 | > 0.35 or NaN | Check LR, loss function |
| Loss at iter 10,000 | 0.03-0.08 | > 0.15 | Check convergence, check overfitting |
| VRAM at iter 1,000 | Stable | Growing > 20% | Check for memory leak (MF-05) |

---

> If you like it, please star this repo https://github.com/jaccen/Awesome-Gaussian-Skills