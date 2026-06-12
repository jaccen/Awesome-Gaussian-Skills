---
name: 3dgs-signed-gaussian
description: "Signed Gaussian Splatting & TPSC (Transmittance-Preserving Subtractive Compositing): negative-opacity Gaussians that subtract color without consuming transmittance. Covers theory, CUDA implementation, bug patterns, and experimental design."
version: 1.0.0
author: jaccen
tags: ["3dgs", "gaussian-splatting", "signed-opacity", "tpsc", "negative-gaussian", "cuda", "compositing", "rendering"]
---

# Signed Gaussian Splatting & TPSC

You are a 3DGS researcher and CUDA engineer specializing in signed-opacity representations. You understand the theoretical foundations of negative-opacity Gaussians, the TPSC compositing rule, and the full stack of CUDA implementation details from forward/backward kernels to densification logic.

## When to Use

- Implementing or debugging signed-opacity extensions to 3D Gaussian Splatting
- Designing subtractive compositing rules that preserve transmittance
- Reviewing CUDA kernels for negative-Gaussian gradient correctness
- Setting up ablation experiments comparing standard vs. signed compositing
- Analyzing rendering artifacts caused by asymmetric opacity mappings
- Porting NegGS-style methods to transmittance-preserving formulations
- Writing or reviewing papers on signed/negative Gaussian representations

## Core Theory

### Signed Opacity

Standard 3DGS assumes all Gaussians have positive opacity ∈ [0, 1]. Signed Gaussian Splatting introduces **negative opacity**, allowing Gaussians to *subtract* color from the compositing equation.

| Property | Standard 3DGS | Signed GS |
|---|---|---|
| Opacity range | [0, 1] | (-1, 1) |
| Positive Gaussians | Add color | Add color (identical) |
| Negative Gaussians | Not possible | Subtract color (corrective) |
| Parameterization | α = sigmoid(s) | α̃ = tanh(s) · (1-ε) |

**Key distinction from NegGS**: NegGS uses negative *color* with positive *opacity*. SignedGS uses negative *opacity* with positive *color*. This difference is fundamental because it determines how transmittance is consumed.

### TPSC Compositing Rules

Standard alpha compositing (volume rendering):

```
C = Σ_{i=1}^{N} c_i · α_i · T_i
T_i = Π_{j=1}^{i-1} (1 - α_j)
```

TPSC introduces a signed opacity parameter κ (kappa):

```
κ_i = α̃_i · G_i    (signed opacity × Gaussian evaluation)
α̃_i = tanh(s_i) · (1-ε)
```

**Compositing rules:**

| κ sign | Color contribution | Transmittance rule |
|---|---|---|
| κ_i ≥ 0 | c_i · κ_i · T_{i-1} | T_i = T_{i-1} · (1 - κ_i) |
| κ_i < 0 | c_i · κ_i · T_{i-1} | T_i = T_{i-1} (preserved) |

**Why negative Gaussians must NOT consume transmittance:**

If negative κ both subtracts color AND reduces T, the scene suffers a *double penalty*:
1. Color is removed from the accumulation
2. Remaining transmittance decreases, reducing the color budget for subsequent Gaussians

This double penalty causes training collapse: negative Gaussians destroy the rendering rather than correct it.

**Color accumulation under TPSC:**

```
C = Σ_{i=1}^{N} c_i · κ_i · T_{i-1}
```

where T_{i-1} is the transmittance computed with the TPSC rule (negative κ preserved T).

### Mapping Functions

#### Symmetric tanh Mapping (Correct)

```
α̃ = tanh(s) · (1-ε),  ε = 1e-3
```

- Range: (-1+ε, 1-ε) → symmetric positive/negative
- Gradient: dα̃/ds = (1-ε) · sech²(s) — never zero, no gradient death
- tanh gradient ≈ 1 near zero, decays smoothly; sigmoid gradient → 0 for large |s|

#### Asymmetric Mapping (Original Bug)

```
α̃ = tanh(s)   (with sigmoid-initialized s)
```

Since s was initialized from sigmoid parameters, values clustered in [0, +∞), making tanh(s) ∈ [0, 1). The negative range was effectively only [-0.01, 0) — **negative coverage enhanced 99×** after fix.

#### Why sigmoid fails for signed opacity

```
α = sigmoid(s) → range (0, 1), no negative values possible
dα/ds = α(1-α) → 0 when α → 0 or α → 1 (gradient death)
```

tanh avoids both problems: symmetric range and non-vanishing gradient for moderate s.

## CUDA Implementation

### Forward Kernel (TPSC)

Location: `submodules/diff-gaussian-rasterization/cuda_rasterizer/forward.cu`

```cuda
// Inside the per-pixel compositing loop (front-to-back):
float kappa = alpha * gaussian_value;  // alpha is α̃ = tanh(s)·(1-ε)
float test_T = T;

if (kappa >= 0.0f) {
    // Standard alpha compositing
    T = T * (1.0f - kappa);
} else {
    // TPSC: negative Gaussian does NOT consume transmittance
    // T remains unchanged — this is the critical rule
}

float weight = kappa * test_T;
C += color * weight;  // weight is negative when kappa < 0 → subtractive
```

**Critical invariant**: When κ < 0, T is preserved. The variable `test_T` captures T *before* potential modification for weighted accumulation.

### Backward Kernel (4 Gradient Fixes)

Location: `submodules/diff-gaussian-rasterization/cuda_rasterizer/backward.cu`

Standard backward pass assumes all Gaussians consume transmittance. TPSC requires four corrections:

#### Fix 1: T Recovery for Negative κ Gradients

```cuda
// Standard: dT/dα_j = -T · accumulated_transmittance
// TPSC: if κ_j < 0, T_i ≠ T_{i-1}·(1-κ_j), so the chain rule for T changes
// Must recover T as if negative κ did not modify it
if (kappa < 0.0f) {
    // T was not multiplied by (1-κ), so dL/dT_through_this_gaussian = 0
    // Gradient does NOT propagate through transmittance for negative κ
}
```

#### Fix 2: accum_rec Tracking for Subtractive Color

```cuda
// Standard: accum_rec = Σ c_j · α_j · T_j (for background gradient)
// TPSC: accum_rec must account for signed weights
// Negative κ contributes negative color, so accum_rec includes subtractive terms
float accum_rec += color * kappa * T_prev;
```

#### Fix 3: dL/dκ with Sign-Aware Gradient

```
dL/dκ_i = T_{i-1} · Σ_channel(c_i - c_h · accum_rec) · dL/dpixel + sign(κ_i) · bg_term
```

The `sign(κ_i)` factor ensures the gradient correctly pushes negative κ toward more negative or less negative values, rather than treating it as a positive opacity that happens to be negative.

#### Fix 4: Background Gradient for Negative Gaussians

```cuda
// Standard: bg contributes T_final · background_color
// TPSC: T_final is larger (negative κ did not reduce T),
// so background gradient has a larger coefficient
// Must include sign-aware term: sign(κ_i) multiplies the background contribution
if (kappa < 0.0f) {
    dL_dkappa += sign(kappa) * bg_contribution_weight;
}
```

### Densification Modifications

#### Remove Forced Negative-Child Creation in Split

```python
# BUG (original): densify_and_split forced negative opacity on children
if opacity[parent] < 0:
    opacity[child] = -abs(opacity_parent / 2)  # WRONG: forces sign

# FIX: let the optimizer decide signs via tanh mapping
opacity[child] = opacity_parent / 2  # naturally preserves sign through tanh
```

**Rationale**: tanh mapping allows the optimizer to freely adjust signed opacity. Forcing negative children creates an artificial bias — the optimizer should discover which Gaussians need negative κ through gradient signals.

#### Negative Gaussian Ratio Cap

```python
# Original cap: too aggressive, killed corrective Gaussians
MAX_NEGATIVE_RATIO = 0.10

# Relaxed cap: prevents over-pruning while avoiding dominance
MAX_NEGATIVE_RATIO = 0.20
```

#### Sign-Aware Pruning

```python
# Standard pruning: remove low-opacity Gaussians
# Signed GS: must distinguish "low |α̃|" from "negative α̃"
# Never prune based on sign — only on magnitude |α̃|

prune_mask = torch.abs(opacities) < prune_threshold  # use abs()
# NOT: prune_mask = opacities < prune_threshold  # this kills all negative!
```

#### Opacity Reset

After densification, opacity values are reset. The reset must be compatible with tanh mapping:

```python
# Correct: reset through inverse tanh
s_new = torch.atanh(torch.tensor(reset_value / (1 - eps)))
# Incorrect: using sigmoid-style reset directly on tanh parameterization
```

## Known Bug Patterns

### SG-1: Asymmetric tanh Mapping

| | |
|---|---|
| **Symptom** | Negative Gaussians have negligible effect; PSNR unchanged from baseline |
| **Root cause** | `α̃ = tanh(s)` with sigmoid-initialized s gives asymmetric range; negative side ≈ [-0.01, 0) |
| **Detection** | Log `min(α̃)` during training; if > -0.05, mapping is asymmetric |
| **Fix** | Use `α̃ = tanh(s) · (1-ε)` with ε = 1e-3; verify s is initialized symmetrically around 0 |

### SG-2: Negative Gaussians Consuming Transmittance

| | |
|---|---|
| **Symptom** | Training collapse, PSNR 8-13 dB; rendered images nearly black |
| **Root cause** | Forward kernel applies `T *= (1-κ)` for all κ, including negative. Double penalty: subtracts color AND reduces T |
| **Detection** | Compare Gaussian count: affected runs have far fewer Gaussians (e.g., 569K vs 4.66M) |
| **Fix** | Add conditional in forward.cu: if κ < 0, T remains unchanged |

### SG-3: Forced Negative Children in Split

| | |
|---|---|
| **Symptom** | Gaussian count fails to grow; 8× fewer Gaussians than baseline |
| **Root cause** | densify_and_split forces `opacity[child] = -abs(opacity_parent / 2)`, creating too many negative Gaussians that get pruned |
| **Detection** | Log negative/positive ratio after each densification step |
| **Fix** | Remove forced sign assignment; use `opacity[child] = opacity_parent / 2` |

### SG-4: Opacity Initialization Mismatch

| | |
|---|---|
| **Symptom** | Initial training produces NaN loss or zero gradients |
| **Root cause** | Initializing `s` from sigmoid parameters (non-negative) then applying tanh gives asymmetric distribution |
| **Detection** | Check `s.min() >= 0` after initialization |
| **Fix** | Initialize `s` symmetrically: `s = atanh(target_α̃ / (1-ε))` or `s = 0` |

### SG-5: Sign-Based Pruning Killing All Negative Gaussians

| | |
|---|---|
| **Symptom** | All negative Gaussians disappear by iter ~10K; no corrective capacity |
| **Root cause** | Pruning uses `opacity < threshold` instead of `|opacity| < threshold` |
| **Detection** | Log negative count after pruning steps |
| **Fix** | Use `torch.abs(opacities) < prune_threshold` |

### SG-6: Missing Ablation Flags in render.py

| | |
|---|---|
| **Symptom** | Ablation groups A/B (baseline) render with signed opacity → PSNR 6-11 dB |
| **Root cause** | render.py defaults to `use_signed_opacity=True` even for baseline groups |
| **Detection** | Baseline PSNR < 15 dB is a clear signal |
| **Fix** | Add `--ablate_signed_opacity` and `--ablate_pruning` flags to render.py |

## Experimental Design

### Datasets

| Dataset | Scenes | Characteristics |
|---|---|---|
| MipNeRF360 | garden, room, kitchen, stump | Indoor/outdoor, varying point density (stump: 32K, kitchen: 241K initial points) |
| Deep Blending | drjohnson, playroom | Challenging unbounded scenes |

Note: T&T dataset had corrupted cameras.bin (0 bytes) — excluded from evaluation.

### Metrics

| Metric | Direction | Details |
|---|---|---|
| PSNR | ↑ | Peak signal-to-noise ratio |
| SSIM | ↑ | Structural similarity |
| LPIPS | ↓ | VGG backbone, perceptual quality |

Evaluation at 30K iterations. Results saved as `results_iter{N}.json`.

### Ablation Groups

| Group | Configuration | Purpose |
|---|---|---|
| A | Baseline 3DGS (ablate_signed_opacity + ablate_pruning) | Standard compositing reference |
| B | HF perception loss only, no signed opacity | Isolate HF loss contribution |
| C | Full SignedGS (TPSC + signed opacity + HF loss) | Complete method |
| D | SignedGS without custom pruning | Isolate pruning strategy contribution |

Ablation flags:
```bash
--ablate_signed_opacity   # Disable signed opacity, use standard alpha
--ablate_pruning          # Disable sign-aware pruning, use standard pruning
--ablate_perception_loss  # Disable HF perception loss
```

### Training Configuration

```bash
# Smoke test (700 iter, verify TPSC correctness)
python train.py -s <scene> --iterations 700 --test_iterations 700

# Full training (30K iter)
python train.py -s <scene> --iterations 30000 --test_iterations 7000 30000

# GPU parallel strategy (8×L40S): 4 groups × 2-3 scenes parallel
# Estimated time: 10-15 min per scene at 48-75 it/s
```

### Key Empirical Results

| Configuration | garden PSNR | Δ vs baseline |
|---|---|---|
| A (baseline 3DGS) | ~28.39 | — |
| B (HF loss only) | ~28.4x | marginal |
| C (full SignedGS) | target >29.0 | >0.6 dB |
| TPSC smoke test (700 iter) | 20.52 (vs 10.29 broken) | +10.23 dB fix validation |

Negative Gaussian statistics (C group target):
- Negative ratio: 10-15% of total Gaussians
- Average |α̃| ≈ 0.6
- Sign-aware pruning protects boundary Gaussians

## Comparison with Related Methods

### SignedGS vs NegGS

| Aspect | NegGS | SignedGS (TPSC) |
|---|---|---|
| Negative signal location | Color (c_i < 0, α_i > 0) | Opacity (α̃_i < 0, c_i ≥ 0) |
| Transmittance consumption | Yes: negative color still consumes T | No: negative κ preserves T |
| Gradient signal | Mixed: color gradient + T reduction | Clean: only color contribution direction |
| Physical interpretation | "Darkening" filter | "Corrective" Gaussian |
| Rendering equation | C += c_i · α_i · T_i, c_i can be < 0 | C += c_i · κ_i · T_{i-1}, κ_i can be < 0 |
| Double penalty | Partially present | Eliminated by TPSC |

### SignedGS vs Standard 3DGS

| Aspect | Standard 3DGS | SignedGS |
|---|---|---|
| Opacity parameterization | α = σ(s) ∈ (0,1) | α̃ = tanh(s)·(1-ε) ∈ (-1+ε, 1-ε) |
| Compositing | C = Σ c_i · α_i · T_i | C = Σ c_i · κ_i · T_{i-1} |
| Transmittance | T_i = T_{i-1}·(1-α_i) always | T_i = T_{i-1}·(1-κ_i) if κ≥0; T_i = T_{i-1} if κ<0 |
| High-frequency detail | Limited by positive-only representation | Corrective negative Gaussians enhance edges |
| Parameter count | Same | Same (reparameterized opacity) |

### SignedGS vs Other Negative Representations

| Method | Where is negativity? | T preserved? | Gradient quality |
|---|---|---|---|
| 3DGS + neg. SH | Spherical harmonics | No | Noisy, indirect |
| NegGS | Color | No | Mixed signal |
| SignedGS (TPSC) | Opacity | Yes | Clean, sign-aware |

## Implementation Checklist

### Forward Kernel

- [ ] Projected Gaussian evaluation G_i computed per-pixel
- [ ] Signed opacity κ_i = α̃_i · G_i, where α̃_i = tanh(s_i)·(1-ε)
- [ ] Conditional transmittance: T preserved when κ < 0
- [ ] Weighted color accumulation: C += c_i · κ_i · T_{prev}
- [ ] Background term: C += T_final · bg_color
- [ ] Early termination: skip when T < ε (standard)

### Backward Kernel

- [ ] Fix 1: T gradient recovery for negative κ (no T chain through negative Gaussians)
- [ ] Fix 2: accum_rec includes subtractive color contributions
- [ ] Fix 3: dL/dκ includes sign(κ_i) · bg_term
- [ ] Fix 4: Background gradient multiplied by preserved T (larger than standard)
- [ ] Gradient sign verification: numeric gradient vs analytic gradient comparison

### Mapping & Initialization

- [ ] Symmetric mapping: α̃ = tanh(s)·(1-ε), NOT bare tanh(s)
- [ ] Initialization: s initialized symmetrically (atanh-based or zero)
- [ ] ε = 1e-3 prevents exact ±1 boundary values

### Densification

- [ ] densify_and_split: no forced negative-child creation
- [ ] densify_and_clone: no sign-based bias
- [ ] Pruning: use |α̃| < threshold, NOT α̃ < threshold
- [ ] Negative ratio cap: MAX_NEGATIVE_RATIO = 0.20
- [ ] Opacity reset: compatible with tanh parameterization

### Ablation Flags

- [ ] `--ablate_signed_opacity`: disables signed opacity, falls back to standard α = σ(s)
- [ ] `--ablate_pruning`: disables sign-aware pruning, uses standard pruning
- [ ] `--ablate_perception_loss`: disables HF perception loss
- [ ] render.py respects all ablation flags (not just train.py)

### Verification

- [ ] Smoke test: 700 iter, PSNR > 20 dB (broken TPSC gives ~10 dB)
- [ ] Gaussian count: comparable to baseline (within 2× ratio)
- [ ] Negative Gaussian ratio: 10-15% at convergence
- [ ] Gradient check: numerical vs analytical gradient for κ < 0 path
- [ ] Full training: 30K iter, metrics at 7K and 30K checkpoints

## References

1. Kerbl, B., Kopanas, G., Leimkühler, T., & Drettakis, G. (3DGS) "3D Gaussian Splatting for Real-Time Radiance Field Rendering." ACM TOG (SIGGRAPH), 2023.
2. Seonho, P. & Park, J. (NegGS) "Negative Gaussian Splatting." 2024.
3. SignedGS: Signed Opacity for Enhanced Gaussian Splatting. Internal technical report, 2026.
4. EWA Splatting: Zwicker, M., Pfister, H., van Baar, J., & Gross, M. "EWA Volume Splatting." IEEE Visualization, 2001.
5. Mip-NeRF 360: Barron, J.T. et al. "Mip-NeRF 360: Unbounded Anti-Aliased Neural Radiance Fields." CVPR, 2023.
6. Deep Blending: Hedman, P. et al. "Deep Blending for Free-Viewpoint Image-Based Rendering." ACM TOG (SIGGRAPH), 2018.
