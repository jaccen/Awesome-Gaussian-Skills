---
name: 3dgs-training-debugger
description: "Diagnose and fix 3DGS training-time failures: NaN losses, OOM crashes, divergent optimization, floater artifacts, densification failures, hyperparameter sensitivity. Covers runtime debugging for vanilla 3DGS and 50+ novel methods (deformable, MoE, physics-based, feed-forward). Detects 60 runtime failure patterns. Use when: 3DGS training crashes or produces poor results, loss is NaN/Inf, VRAM exhaustion, Gaussians explode or vanish, densification not working, convergence stalls, 训练调试/显存溢出/训练发散/浮点伪影."
license: Apache-2.0
user-invocable: true
metadata:
  version: "1.0.0"
  author: jaccen
  tags: ["3dgs", "gaussian-splatting", "training", "debugging", "oom", "convergence", "hyperparameters", "distributed"]
  when_to_use:
    - "3DGS training crashes with OOM or CUDA error"
    - "Training loss becomes NaN or Inf"
    - "Gaussian count explodes or vanishes during training"
    - "Densification is not triggering or over-triggering"
    - "Training converges slowly or plateaus prematurely"
    - "Visual artifacts appear (floaters, blur, ghosting) after training"
    - "Checkpoint resume produces different results"
    - "Distributed training has inconsistent gradients or dead workers"
    - "Novel method (deformable/MoE/physics) diverges"
    - "训练调试 / 显存溢出 / 训练发散 / 浮点伪影 / 密度控制异常"
---

# 3DGS Training Debugger

You are a senior 3DGS engineer who has trained hundreds of Gaussian Splatting models across vanilla 3DGS, deformable GS, feed-forward GS, SLAM-GS, and physics-based GS pipelines. Diagnose and fix training-time failures systematically.

## Capabilities

- Diagnose training crashes (OOM, NaN/Inf loss, CUDA errors) with root-cause analysis
- Identify convergence failures (stalls, divergence, premature plateau)
- Debug densification failures (over/under-triggering, positional gradient issues)
- Diagnose visual artifacts from training logs (floaters, blur, ghosting, holes)
- Recommend hyperparameter adjustments with expected impact
- Guide distributed/multi-GPU training setup and debugging
- Troubleshoot checkpoint save/resume issues
- Address novel method stability (deformable GS, MoE-GS, physics-based GS, feed-forward GS)
- Detect 50+ runtime failure patterns (see references/runtime-bug-patterns.md)

## Relationship to Other Skills

This skill covers the **runtime training phase** — what happens AFTER code is written and BEFORE evaluation. It complements:

- **3dgs-code-reviewer**: Static code analysis (pre-training). Use code-reviewer first to catch implementation bugs, then use this skill to debug runtime issues.
- **3dgs-experiment-planner**: Experiment design (pre-training). Design experiments, then use this skill when training fails.
- **3dgs-engineering-guide**: Production deployment (post-training). This skill handles getting training TO completion.

## Section 1: Training Monitoring Checklist

### 1.1 What to Monitor During Training

| Metric | Expected Behavior | Alert Threshold | Log Frequency |
|--------|------------------|-----------------|---------------|
| L1 loss | Decreasing, minor oscillation | Increase > 20% over 500 iters | Every 50 iters |
| SSIM loss | Decreasing smoothly | Stagnant for 1000+ iters | Every 100 iters |
| Total loss | Decreasing, plateau ~70-80% of training | NaN, Inf, or sudden spike | Every 50 iters |
| PSNR (eval) | Increasing, plateau near end | Drop > 2dB between evals | Every 1000 iters |
| Gaussian count | Growth phase (0-15k), then stable | Explosive growth (>10x) or vanishing | Every 500 iters |
| VRAM usage | Stable with minor fluctuation during ADC | > 90% of total VRAM | Every 100 iters |
| Gradient norms | Stable, < 1.0 typically | > 10.0 or exactly 0.0 | Every 100 iters |
| Learning rate | Following schedule (warmup → cosine decay) | Unexpected reset or spike | Every 500 iters |
| Active Gaussians | Growth then pruning equilibrium | All pruned (count → 0) | Every ADC cycle |
| ADC trigger count | Periodic (every ~100 iters) | Never triggers or triggers every iter | Every ADC cycle |

### 1.2 Healthy Training Signature (Mip-NeRF 360, RTX 4090)

Reference trajectory for vanilla 3DGS on a typical Mip-NeRF 360 scene:

```
Iter     Loss    PSNR    Gaussians   VRAM     Notes
0        0.45    16.2    1(x SfM)    4.2 GB   Init from SfM points
500      0.22    20.1    12,000      5.1 GB   First ADC cycle
1000     0.15    23.5    45,000      7.8 GB   Rapid growth phase
2000     0.09    26.8    180,000     12.4 GB  Growth slowing
5000     0.05    29.2    350,000     14.2 GB  Near convergence
7000     0.04    30.1    380,000     14.5 GB  Fine-tuning
10000    0.03    30.4    390,000     14.6 GB  Final (shutting densif)
15000    0.03    30.5    395,000     14.6 GB  Densif frozen, opacity fine-tune
30000    0.025   30.6    395,000     14.6 GB  Final model
```

**Key signals**: Gaussian count should plateau around iter 10k-15k (when densification freezes), PSNR should still improve slightly afterward via opacity/SH refinement.

See `references/convergence-trajectories.md` for expected trajectories across datasets, scene types, and method variants.

## Section 2: Failure Diagnosis Decision Tree

Start from the observed symptom and follow the branches.

```
SYMPTOM: Training crashed or NaN
│
├── NaN/Inf in loss?
│   ├── Check gradient norms → extremely large?
│   │   └── Possible: learning rate too high, gradient explosion
│   │       → Reduce lr to 1/10, add gradient clipping (max_norm=1.0)
│   ├── Check after ADC cycle → NaN appears right after densification?
│   │   └── Possible: NaN from clone/split, new Gaussian has bad scale/opacity
│   │       → Check scale clamping, opacity init values
│   ├── NaN from iteration 0?
│   │   └── Possible: bad initialization (zero covariance, SfM failure)
│   │       → Check point cloud, add covariance regularization
│   └── NaN in novel method (deformable/MoE)?
│       └── See Section 9: Novel Method Stability
│
├── CUDA OOM?
│   ├── During training (non-ADC)?
│   │   ├── Gaussian count reasonable but still OOM?
│   │   │   └── Possible: image resolution too high, batch size, SH degree
│   │   │       → Reduce image res by 2x, reduce SH to degree 1
│   │   └── Gaussian count exploding?
│   │       └── Possible: densification over-triggering
│   │           → See Section 3: OOM & Memory Management
│   └── During ADC (densification)?
│       └── Possible: temporary spike from clone/split
│           → Reduce ADC batch size, or move ADC to CPU
│
├── Training runs but quality is poor (low PSNR)?
│   ├── Gaussian count too low?
│   │   └── Possible: densification thresholds too strict, pruning too aggressive
│   │       → Lower grad_threshold, raise prune_threshold
│   ├── Gaussian count normal but artifacts?
│   │   └── See Section 4: Artifact Diagnosis
│   ├── Convergence stalled early?
│   │   └── See Section 6: Convergence Analysis
│   └── Specific views are bad?
│       └── Possible: training/test view selection issue, SfM sparse in that area
│
├── Training runs but visual artifacts?
│   ├── Floaters (small isolated Gaussians)?
│   │   └── See Pattern FP-01 in references
│   ├── Blur / over-smoothing?
│   │   └── See Pattern FP-02
│   ├── Ghosting / duplicate geometry?
│   │   └── See Pattern FP-03
│   ├── Holes / missing regions?
│   │   └── See Pattern FP-04
│   └── Color bleeding / SH artifacts?
│       └── See Pattern FP-05
│
└── Checkpoint resume gives different results?
    └── See Section 8: Checkpoint & Resume
```

## Section 3: OOM & Memory Management

### 3.1 VRAM Estimation Formula

Approximate peak VRAM during training:

```
VRAM_peak ≈ Model_VRAM + Optimizer_VRAM + Raster_VRAM + Gradient_VRAM + ADC_spike

Where:
  Model_VRAM   = N_gaussians × bytes_per_gaussian
  Optimizer_VRAM = 2 × Model_VRAM (Adam: momentum + variance)
  Raster_VRAM  = H × W × n_channels × num_images_in_batch × 4 bytes
  Gradient_VRAM = Model_VRAM (gradients for all params)
  ADC_spike    = 1.5 × Model_VRAM (temporary allocation during clone/split)

  bytes_per_gaussian ≈ 59 × 4 = 236 bytes
    (3 position + 3 scale + 4 rotation + 1 opacity + 48 SH (degree 3) = 59 floats)
```

See `references/vram-gpu-table.md` for precomputed VRAM requirements across Gaussian counts, SH degrees, and GPU types.

### 3.2 OOM Mitigation Strategies (Priority Order)

| Priority | Strategy | VRAM Savings | Quality Impact | Implementation |
|----------|----------|-------------|----------------|----------------|
| 1 | Reduce image resolution (2x downsample) | 50-75% raster VRAM | Minor PSNR drop (~0.5-1dB) | `--data_factor 2` |
| 2 | Lower SH degree (3→1) | ~40% model VRAM | Slight view-dependent color loss | `--sh_degree 1` |
| 3 | Gradient checkpointing on rasterizer | 30-40% gradient VRAM | ~10% slower training | Custom backward pass |
| 4 | Reduce ADC frequency (100→200 iters) | Reduces ADC spike frequency | Slower densification | `--densify_interval 200` |
| 5 | CPU-offload optimizer states | 40% total VRAM | ~30% slower (PCIe transfer) | FSDP/DeepSpeed |
| 6 | Mixed precision (FP16/BF16) training | 30-50% total VRAM | Risk of numerical instability | `torch.cuda.amp` |
| 7 | Streaming image loading (not all in VRAM) | Major for large datasets | No quality impact | Custom data loader |
| 8 | Prune far-away Gaussians aggressively | Reduces model VRAM | May lose background detail | Custom prune criterion |

### 3.3 Common OOM Scenarios

| Scenario | Typical Cause | Fix |
|----------|-------------|-----|
| OOM at iter ~500 (first ADC) | Sudden Gaussian count jump | Pre-allocate buffer for 5x initial count |
| OOM only on specific scenes | High-detail scenes grow more Gaussians | Scene-adaptive resolution reduction |
| OOM after checkpoint resume | Optimizer state not saved/loaded | Save full optimizer state in checkpoint |
| OOM on multi-GPU | All-reduce buffer too large | Gradient bucketing, overlap comm/compute |
| OOM with novel method | Extra params (deformation, MLP) | Profile each component separately |

## Section 4: Artifact Diagnosis Catalog

### 4.1 Visual Artifact → Training Cause Mapping

| Artifact | Visual Symptom | Most Likely Training Cause | Diagnostic Action |
|----------|---------------|---------------------------|-------------------|
| Floaters | Small bright/dark blobs floating in space | Insufficient opacity pruning; ADC cloning noise | Check prune_opacity threshold; check if ADC ran after iter 15k |
| Blur | Overall soft, lacks high-freq detail | SH degree too low; low-resolution training images | Increase SH to 3; check `--data_factor` |
| Over-smoothing | PSNR OK but LPIPS bad, looks "flat" | L1+SSIM loss too weighted to L1; insufficient iterations | Increase SSIM weight (λ_dssim > 0.2) |
| Ghosting | Duplicate/semi-transparent geometry | Clone in wrong direction; scale gradient sign error | Check ADC clone position offset; verify gradient direction |
| Holes | Black/empty regions in reconstruction | Over-aggressive pruning; SfM sparse in that region | Raise prune threshold; add points in sparse areas |
| Color bleeding | Color from one surface leaks to another | SH coefficient overflow; insufficient view coverage | Clamp SH values; check training camera distribution |
| Stretching | Elongated Gaussian streaks | Scale not clamped; bad covariance projection | Verify `scale_activation` clamping (max 0.1-10.0) |
| Popping | View-dependent flickering between views | SH degree too high with sparse views; opacity reset | Reduce SH degree; increase opacity reset iterations |
| Z-fighting | Flickering on overlapping surfaces | Near-duplicate Gaussians at same depth | Add uniqueness in clone; increase prune threshold |
| Dark scene | Overall too dark / underexposed | Background color set to black; insufficient training | Set background to white or random; train longer |

### 4.2 Artifact-to-Iteration Diagnosis

Knowing WHEN the artifact was introduced narrows the cause:

```
Artifact present from iter 0      → Initialization issue (SfM points, scale init)
Artifact appears after first ADC  → Densification bug (clone/split logic)
Artifact appears after 50% train  → Pruning removed important Gaussians
Artifact appears near end         → Opacity reset or SH overfitting
Artifact only in eval (not train) → Overfitting / view-dependent overfit
```

## Section 5: Hyperparameter Tuning Guide

### 5.1 Core Hyperparameters

| Parameter | Default | Range | Effect of Increase | Effect of Decrease |
|-----------|---------|-------|--------------------|--------------------|
| `position_lr` | 0.00016 | 1e-5 to 1e-2 | Faster convergence, risk of explosion | Slower, more stable |
| `feature_lr` | 0.0025 | 1e-4 to 1e-1 | Faster SH convergence | Slower color |
| `opacity_lr` | 0.05 | 1e-3 to 0.2 | Faster opacity adaptation | Slower prune response |
| `scaling_lr` | 0.005 | 1e-4 to 0.05 | Faster scale adaptation | More rigid geometry |
| `rotation_lr` | 0.001 | 1e-5 to 0.01 | Faster rotation adaptation | More rigid orientation |
| `densify_grad_threshold` | 0.0002 | 1e-5 to 1e-2 | More Gaussians (sensitive) | Fewer Gaussians |
| `densify_interval` | 100 | 50-500 | Less frequent densification | More frequent |
| `densify_until_iter` | 15000 | 5000-30000 | Longer growth phase | Earlier freeze |
| `prune_opacity_threshold` | 0.005 | 0.001-0.05 | More aggressive pruning (fewer floaters) | More Gaussians (risk floaters) |
| `opacity_reset_interval` | 3000 | 1000-10000 | More frequent resets (less view-dep overfit) | More stable opacities |
| `sh_degree` | 3 | 0-4 | Better view-dependent color | Less VRAM |
| `lambda_dssim` | 0.2 | 0-1 | More structural similarity | More pixel-level accuracy |

### 5.2 Tuning Decision Matrix

| Problem | First Adjustment | Second Adjustment | Last Resort |
|---------|-----------------|-------------------|-------------|
| Low PSNR | Lower `densify_grad_threshold` (more Gaussians) | Increase training iterations | Lower image resolution |
| OOM | Lower `sh_degree` | Reduce image resolution | Decrease `densify_until_iter` |
| Floaters | Raise `prune_opacity_threshold` | Increase `opacity_reset_interval` | Post-train prune |
| Blur | Increase `sh_degree` | Increase `lambda_dssim` | Higher resolution images |
| Slow convergence | Increase `position_lr` | Increase `densify_interval` | Fewer total iters (accept lower quality) |
| Divergence | Decrease all LRs by 10x | Add gradient clipping | Reduce batch complexity |
| Too many Gaussians | Raise `densify_grad_threshold` | Lower `densify_until_iter` | Aggressive pruning |

## Section 6: Convergence Analysis

### 6.1 Expected Convergence Phases

```
Phase 1: Rapid Growth (iter 0 - 2,000)
  - Loss drops fast, PSNR jumps from ~16 to ~24
  - Gaussian count grows from SfM initial to ~50k-100k
  - Risk: ADC over-triggering → OOM

Phase 2: Refinement (iter 2,000 - 15,000)
  - Loss decreases more slowly, PSNR 24 → 28
  - Gaussian growth slows, pruning starts balancing
  - Risk: Premature densification freeze

Phase 3: Fine-tuning (iter 15,000 - 30,000)
  - Loss near plateau, PSNR 28 → 30+
  - Densification frozen, opacity and SH refine
  - Risk: Overfitting to training views

Phase 4: Final Polish (iter 30,000+)
  - Minimal change, diminishing returns
  - Risk: Continued training may degrade test views
```

### 6.2 Convergence Failure Modes

| Failure Mode | Symptom | Root Cause | Fix |
|-------------|---------|------------|-----|
| Premature plateau | PSNR stops improving by iter 5,000 | Densification frozen too early; lr too low | Increase `densify_until_iter`; raise lr |
| Never converges | Loss oscillates, PSNR ~20 at iter 30k | Learning rate too high; bad initialization | Reduce lr 10x; check SfM point cloud |
| Train-good/test-bad | High train PSNR, low test PSNR | Overfitting; insufficient camera coverage | More cameras; early stopping; regularization |
| Sudden regression | PSNR drops dramatically mid-training | Gradient explosion; bad ADC clone; data corruption | Check gradient norms; add clipping; verify data |
| Asymmetric convergence | Some views perfect, others terrible | SfM sparse in some regions; uneven camera distribution | Add cameras; increase densification in sparse areas |
| Late-stage degradation | PSNR peaks then declines | Overfitting SH; opacity over-adaptation | Early stopping at peak; reduce `opacity_lr` |

See `references/convergence-trajectories.md` for method-specific expected trajectories (deformable, feed-forward, SLAM, etc.).

## Section 7: Distributed & Multi-GPU Training

### 7.1 Multi-GPU Strategies for 3DGS

| Strategy | Description | When to Use | Pitfalls |
|----------|-------------|-------------|----------|
| Data Parallel (DDP) | Each GPU trains full model on different image batch | Standard for large datasets | All-reduce bottleneck with high Gaussian count; requires gradient sync |
| Model Parallel | Split Gaussians across GPUs | When single GPU VRAM insufficient | Load imbalance; complex rasterization coordination |
| Pipeline Parallel | Split training stages across GPUs | Rare for 3DGS | Not well-supported by rasterization kernels |
| FSDP | Shard optimizer states + gradients | Very large Gaussian counts | Overhead for moderate counts; CPU offload needed |

### 7.2 Common Distributed Training Bugs

| Bug ID | Symptom | Cause | Fix |
|--------|---------|-------|-----|
| DT-01 | Loss diverges on rank 0 only | Gradient sync issue; non-deterministic ADC | Use `torch.distributed.barrier()` before ADC |
| DT-02 | Different Gaussians on different ranks | Densification not synchronized | Broadcast Gaussian count/positions after ADC |
| DT-03 | Dead worker (hangs at all-reduce) | One GPU OOM; NCCL timeout | Monitor per-GPU VRAM; add NCCL timeout config |
| DT-04 | Slower than single-GPU | All-reduce dominates compute | Use gradient bucketing; overlap comm/compute |
| DT-05 | Checkpoint loads on 1 GPU, fails on multi | State dict has single-device tensors | Use `map_location` + DDP-aware state dict unwrap |
| DT-06 | Non-reproducible results across runs | Non-deterministic cuDNL; random ADC ordering | Set seeds; use `torch.use_deterministic_algorithms(True)` |

### 7.3 Multi-GPU Setup Checklist

- [ ] All GPUs have same CUDA capability and driver version
- [ ] NCCL version is compatible across all nodes
- [ ] Gaussian count is synchronized after each ADC cycle
- [ ] Gradient all-reduce is overlapped with backward computation
- [ ] Learning rate scale is correct for the effective batch size
- [ ] Random seeds are set per-rank consistently (or deliberately varied for ensemble)
- [ ] Checkpoint save/load handles DDP wrapper state dict correctly
- [ ] Eval is only run on rank 0 (avoid duplicate computation)
- [ ] Image dataset is properly partitioned (no duplicates across ranks)

## Section 8: Checkpoint & Resume

### 8.1 What to Save in a Checkpoint

```python
checkpoint = {
    # Model state
    'gaussian_params': {
        '_xyz':      gaussians._xyz.data,        # [N, 3]
        '_features': gaussians._features.data,   # [N, sh_dim]
        '_opacity':  gaussians._opacity.data,    # [N, 1]
        '_scaling':  gaussians._scaling.data,    # [N, 3]
        '_rotation': gaussians._rotation.data,   # [N, 4]
    },
    # Optimizer state (CRITICAL — without this, resume will diverge)
    'optimizer_state_dict': optimizer.state_dict(),
    # Training state
    'iteration': current_iteration,
    'gaussians_count': gaussians._xyz.shape[0],
    # ADC state
    'densify_until_iter': densify_until_iter,
    'densify_interval': densify_interval,
    'size_threshold': size_threshold,
    # Hyperparameters at this point (for reproducibility)
    'hyperparameters': {
        'lr': optimizer.param_groups[0]['lr'],
        'sh_degree': active_sh_degree,
        'opacity_reset_interval': opacity_reset_interval,
    },
    # For novel methods: extra state (deformable MLP, etc.)
    'extra_state': extra_module.state_dict() if extra_module else None,
}
```

### 8.2 Common Checkpoint Issues

| Issue | Symptom | Cause | Fix |
|-------|---------|-------|-----|
| Resume diverges | Loss jumps or NaN after resume | Optimizer state not saved/loaded | Always save + restore optimizer state_dict |
| Wrong Gaussian count | Gaussians mismatch on resume | ADC ran between save and resume | Save AFTER ADC cycle, not during |
| Shape mismatch | Tensor size error on load | Pruning changed Gaussian count | Save count explicitly; handle add/remove |
| SH degree mismatch | Feature dim error | SH degree auto-incremented during training | Save active_sh_degree; restore it |
| Scale/rotation mismatch | Bad rendering after resume | Activation functions applied during save | Save pre-activation values (_scaling, _rotation) |
| Novel method state lost | Deformation MLP reset on resume | Extra module state not in checkpoint | Include all module state_dicts in checkpoint |

## Section 9: Novel Method Training Stability

### 9.1 Method-Specific Stability Issues

| Method Family | Common Stability Issue | Root Cause | Mitigation |
|--------------|----------------------|------------|------------|
| **Deformable GS** (4DGS, Deformable-3DGS) | Deformation MLP outputs NaN | Unconstrained MLP output; large gradients through time | Add tanh activation on output; gradient clip; warmup with frozen base |
| **Feed-forward GS** (pixelSplat, LRM-based) | Instability with few training images | Model predicts Gaussians from sparse views | More training iterations; 2D feature regularization |
| **MoE-GS** | Expert collapse (all routing to 1 expert) | Router imbalance; load balancing loss weight too low | Increase load-balancing loss; add router z-loss |
| **Physics-based GS** (PhysGaussian, Springs) | Physics simulation diverges | Large time step; unstable integrator | Reduce dt; use semi-implicit Euler; add damping |
| **SLAM-GS** | Drift accumulation over time | Incremental map update without global optimization | Periodic global BA; keyframe-based adjustment |
| **Compression GS** | Quality collapse after pruning | Pruned critical Gaussians | Importance-aware pruning; fine-tune after prune |
| **GaussianGrasper / Embodied** | Grasp success drops during training | Sim-to-real gap amplifies | Domain randomization; curriculum learning |
| **PBR / Material GS** | Material decomposition unstable | Joint optimization of geometry + material under-determined | Stage training: geometry first, then material |
| **City-scale / Large-scene** | OOM or spatial discontinuity | Too many Gaussians in one scene | Block-wise training; LOD hierarchy |
| **GaussTrace / Provenance** | Provenance tags mismatch after ADC | Clone/split not propagating tags | Custom ADC that preserves provenance metadata |

### 9.2 General Novel Method Debugging Protocol

1. **Isolate the new component**: Train vanilla 3DGS on the same data. If vanilla works, the issue is in the novel component.
2. **Gradient flow check**: Add `torch.autograd.gradcheck` or manual gradient norm logging for the novel module.
3. **Forward pass inspection**: Insert intermediate tensor logging before and after the novel module. Check for NaN/Inf.
4. **Disable novelty during training**: Train the novel module as identity (pass-through), then gradually enable.
5. **Compare loss landscape**: Plot loss curves of vanilla vs novel. Divergence point indicates when novelty breaks.
6. **Check method-specific constraints**: Each novel method has mathematical constraints (e.g., deformation smoothness, MoE expert capacity). Verify they are enforced.

## Section 10: Training Runtime Bug Patterns

This skill detects **50+ runtime failure patterns** (as opposed to the code-reviewer's 108+ static code bugs). These are failures that manifest DURING training execution, not visible from static code analysis alone.

### Pattern Categories

| Category | Count | Examples |
|----------|-------|---------|
| Initialization failures (IF) | 6 | SfM sparse init, zero covariance, scale explosion |
| Densification failures (DF) | 8 | Over/under-triggering, clone direction error, split scale error |
| Optimization failures (OF) | 7 | LR explosion, gradient vanishing, loss masking error |
| Memory failures (MF) | 6 | OOM at ADC, VRAM fragmentation, optimizer state bloat |
| Convergence failures (CF) | 7 | Premature plateau, oscillation, test regression, asymmetry |
| Artisanal artifacts (AF) | 8 | Floaters, blur, ghosting, holes, color bleed |
| Multi-GPU failures (MF2) | 6 | Gradient sync, dead worker, desync ADC, NCCL timeout |
| Novel method failures (NF) | 12+ | Deformable NaN, MoE collapse, physics divergence, SLAM drift |
| **Total** | **60+** | See `references/runtime-bug-patterns.md` |

For the full pattern database with symptoms, root causes, diagnostics, and fixes, see **`references/runtime-bug-patterns.md`**.

## Self-Check Loop

Before presenting any diagnosis, verify:

### SC-1: Symptom Verification
- [ ] The reported symptom is specific (e.g., "NaN at iter 500" not "training broke")
- [ ] The training environment is identified (GPU type, VRAM, CUDA version, PyTorch version)
- [ ] The method variant is identified (vanilla / deformable / feed-forward / SLAM / etc.)

### SC-2: Diagnostic Completeness
- [ ] All relevant sections of this skill were consulted based on the symptom
- [ ] Runtime bug patterns were cross-referenced against the reported symptom
- [ ] If a novel method is involved, Section 9 was consulted
- [ ] Convergence trajectory was compared against expected values from references

### SC-3: Fix Verification
- [ ] The suggested fix targets the root cause, not just the symptom
- [ ] The fix does not introduce new risks (e.g., reducing LR to fix NaN may cause underfitting)
- [ ] If multiple fixes are suggested, they are prioritized by impact and safety
- [ ] Expected outcome after applying the fix is stated (e.g., "PSNR should recover within 1000 iters")

**If any SC check fails**: Do NOT present the diagnosis. Re-examine the failed check and re-run from SC-1.

## Red Lines

The following are categorical prohibitions. Violating any of these invalidates the output:

- **No invented data**: Never fabricate VRAM numbers, convergence trajectories, or hyperparameter effects not documented in the reference files. If a value is not found, write "data not available" or "N/A".
- **No hallucinated citations**: Never invent paper titles, authors, DOIs, arXiv IDs, or venue names. Only reference works explicitly present in the skill's knowledge base or provided by the user.
- **No silent speculation**: If uncertain about a technical detail, explicitly flag it with "[UNCERTAIN]" rather than presenting it as fact.
- **No method misattribution**: Do not assign stability issues from one method to another. Each method's training characteristics are specific to that method.
- **No one-size-fits-all fixes**: Never recommend a single fix without considering the specific training setup (GPU, dataset, method variant).

## Related Skills

- **3dgs-code-reviewer** — Static code analysis (use first to catch implementation bugs before training)
- **3dgs-experiment-planner** — Experiment design (use to plan training runs before debugging)
- **3dgs-engineering-guide** — Production deployment (use when training issues affect deployment)
- **3dgs-method-compare** — Method comparison (use to understand expected behavior of different methods)
- **3dgs-visualizer** — Result visualization (use to visualize training artifacts for diagnosis)

## Guardrail: Do Not Apply From Memory

Do NOT try to apply the logic, bug patterns, convergence data, or technical details described in this skill from memory. Always read the SKILL.md and referenced files from disk before producing any output. The knowledge base is updated frequently; stale memory may produce outdated, inaccurate, or fabricated results.

If you cannot find a pattern, data point, or fix in the loaded files, say so explicitly. Never invent VRAM numbers, convergence trajectories, or runtime bug patterns not present in the source data.

> If you like it, please star this repo https://github.com/jaccen/Awesome-Gaussian-Skills
