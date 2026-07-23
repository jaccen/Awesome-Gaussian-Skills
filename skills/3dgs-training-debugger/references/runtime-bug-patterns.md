
# 3DGS Training Runtime Bug Patterns

> 60+ runtime failure patterns that manifest DURING training execution. 
> These complement the 108+ static code bugs in `3dgs-code-reviewer/references/bug-patterns.md`.
> Static bugs are visible from code review; runtime bugs require training execution to detect.

## How to Use This File

1. Identify the symptom category (Initialization, Densification, Optimization, Memory, Convergence, Artifact, Multi-GPU, Novel Method)
2. Find the pattern ID (e.g., IF-01, DF-03)
3. Follow the diagnostic steps
4. Apply the fix and monitor for the expected outcome

---

## Category 1: Initialization Failures (IF)

### IF-01: SfM Sparse Initialization
- **Symptom**: Large holes in reconstruction; PSNR stalls at ~18-20
- **Root Cause**: COLMAP/SfM produced too few points (< 1000) for the scene
- **Diagnostic**: Check SfM point count: `len(pcd.points)`. If < 1000, too sparse.
- **Fix**: Increase SfM feature matching; use higher-resolution images for SfM; add uniform random points in scene bounding box
- **Expected Outcome**: PSNR should improve by 2-5 dB after densification catches up

### IF-02: Zero Covariance Initialization
- **Symptom**: NaN from iter 0; rendering produces black image
- **Root Cause**: Scale or rotation init produces zero determinant covariance (degenerate Gaussian)
- **Diagnostic**: Check if any `_scaling` values are exactly 0 after `scale_activation`
- **Fix**: Add small epsilon to scale init: `scale = torch.randn(3) * 0.01 + 0.01`; verify `scale_activation = lambda x: torch.exp(x).clamp(min=1e-6)`
- **Expected Outcome**: NaN disappears immediately; normal training resumes

### IF-03: Scale Explosion at Init
- **Symptom**: Gaussians cover entire scene as giant blobs; rendering is a single color
- **Root Cause**: Scale init values too large (e.g., uniform random with large range)
- **Diagnostic**: Check max scale value: should be < 1.0 at init (pre-activation)
- **Fix**: Use `scale = torch.randn(3) * 0.005` (small values); verify `scaling_activation` clamps max
- **Expected Outcome**: Normal-looking renderings within 50 iterations

### IF-04: Bad Camera Poses
- **Symptom**: No convergence; loss oscillates; rendered images don't match input
- **Root Cause**: COLMAP produced incorrect camera poses (common with repetitive structures, low-texture scenes)
- **Diagnostic**: Render from training poses and compare to input images — if grossly different, poses are wrong
- **Fix**: Re-run COLMAP with stricter matching; use known camera poses from dataset; bundle adjustment
- **Expected Outcome**: Training converges normally once poses are corrected

### IF-05: Wrong Background Color
- **Symptom**: Scene appears too dark; edges have black halo; alpha compositing wrong
- **Root Cause**: Background color set to black (0) when scene has bright sky/white background
- **Diagnostic**: Check `background = torch.zeros(3)` vs check if scene has bright backgrounds
- **Fix**: Set `background = torch.ones(3)` (white) or use random background during training
- **Expected Outcome**: PSNR improves by 1-3 dB; visual quality near edges improves

### IF-06: SH Coefficient Initialization Mismatch
- **Symptom**: Initial renderings have wrong colors; first few hundred iterations show color artifacts
- **Root Cause**: SH coefficients initialized from point cloud colors but with wrong SH dimension or DC coefficient formula
- **Diagnostic**: Check if DC coefficient (first SH term) matches color — should be `sh[0] = color * C0` where `C0 = 0.28209479177387814`
- **Fix**: Ensure SH DC init uses correct constant: `_features[:, 0:3] = RGB2SH(color)`
- **Expected Outcome**: Correct colors from iteration 0

---

## Category 2: Densification Failures (DF)

### DF-01: Densification Never Triggers
- **Symptom**: Gaussian count stays at initial SfM count; PSNR plateaus early (~22)
- **Root Cause**: `densify_grad_threshold` too high; gradient computation for position not tracked
- **Diagnostic**: Check if `xyz_gradient_accum` has values > 0; check threshold value vs gradient distribution
- **Fix**: Lower `densify_grad_threshold` (try 1e-4 instead of 2e-4); verify gradient tracking is enabled (`xyz.requires_grad_(True)`)
- **Expected Outcome**: Gaussian count starts growing within 100 iterations

### DF-02: Densification Over-Triggers
- **Symptom**: Gaussian count explodes (>1M within first 1000 iters); OOM crash
- **Root Cause**: `densify_grad_threshold` too low; no size-based pruning
- **Diagnostic**: Check Gaussian count growth rate; log gradients to see distribution
- **Fix**: Raise `densify_grad_threshold`; add `size_threshold` to prune large Gaussians during densification; add max Gaussian count cap
- **Expected Outcome**: Growth rate slows to manageable pace (10k-50k per 500 iters)

### DF-03: Clone Direction Error
- **Symptom**: Ghosting artifacts; duplicated geometry offset from correct position
- **Root Cause**: Clone offset goes in wrong direction (adds offset instead of subtracting, or wrong normalization)
- **Diagnostic**: Log clone positions before/after; compare to gradient direction
- **Fix**: Verify clone logic: `new_xyz = old_xyz + (gradient_direction * step_size)` where `gradient_direction = gradient_normalized`. Check sign.
- **Expected Outcome**: No ghosting; cloned Gaussians appear in high-gradient regions

### DF-04: Split Scale Error
- **Symptom**: Split Gaussians are too large or too small; visual artifacts after densification
- **Root Cause**: Split scale factor incorrect (e.g., using `scale / 2` instead of `scale * 0.8`)
- **Diagnostic**: Log pre/post split scale values; verify against paper formula
- **Fix**: Standard split: `new_scale = old_scale * 0.8` (or 1.6 with probability distribution); ensure both new Gaussians have reduced scale
- **Expected Outcome**: Splits produce appropriately sized Gaussians

### DF-05: Prune Removes Too Many
- **Symptom**: Gaussian count drops sharply after prune step; holes in reconstruction
- **Root Cause**: `prune_opacity_threshold` too high; pruning also removes valid Gaussians
- **Diagnostic**: Log opacity distribution before prune; check what percentage is removed
- **Fix**: Lower `prune_opacity_threshold` (try 0.001 instead of 0.005); add shape/size criterion to avoid pruning small but important Gaussians
- **Expected Outcome**: Pruning removes only truly transparent Gaussians (< 5% of count)

### DF-06: Prune Too Lenient
- **Symptom**: Floater artifacts; excessive Gaussian count; VRAM pressure
- **Root Cause**: `prune_opacity_threshold` too low; no size-based pruning
- **Diagnostic**: Check for Gaussians with very large scale but low contribution (floaters)
- **Fix**: Raise prune threshold; add criterion: prune if `max_scale > threshold AND opacity < threshold`
- **Expected Outcome**: Floater count reduces; VRAM stabilizes

### DF-07: Opacity Reset Causes Regression
- **Symptom**: PSNR drops every `opacity_reset_interval` iterations, then recovers slowly
- **Root Cause**: Opacity reset is too aggressive; all opacities set to low value
- **Diagnostic**: Plot PSNR vs iteration — look for periodic dips matching reset interval
- **Fix**: Increase `opacity_reset_interval` (try 5000 instead of 3000); use partial reset (reset to `max(opacity, 0.01)` instead of 0)
- **Expected Outcome**: Smoother PSNR curve; less periodic regression

### DF-08: Size Threshold Not Updated
- **Symptom**: Densification still triggers after `densify_until_iter`; growth doesn't stop
- **Root Cause**: Size threshold (`size_threshold`) not updated with scene scale; densification check passes incorrectly
- **Diagnostic**: Check if `size_threshold` is updated to track 98th percentile of Gaussian sizes
- **Fix**: Update `size_threshold` periodically: `size_threshold = torch.quantile(sizes, 0.98)`
- **Expected Outcome**: Densification freezes at `densify_until_iter`

---

## Category 3: Optimization Failures (OF)

### OF-01: Learning Rate Too High
- **Symptom**: Loss oscillates wildly or becomes NaN; PSNR doesn't improve
- **Root Cause**: LR above stable range for the optimizer (Adam)
- **Diagnostic**: Check gradient norms — if > 10.0, LR is too high; check if loss decreases with 10x lower LR
- **Fix**: Reduce all LRs by 10x; add gradient clipping: `torch.nn.utils.clip_grad_norm_(params, max_norm=1.0)`
- **Expected Outcome**: Loss decreases smoothly within 100 iterations

### OF-02: Learning Rate Too Low
- **Symptom**: Extremely slow convergence; PSNR only 22 at iter 10,000
- **Root Cause**: LR below effective range; warmup too long
- **Diagnostic**: Check if gradient norms are < 0.001 (essentially no updates); check LR schedule
- **Fix**: Increase LR by 5-10x; reduce warmup duration; check if LR schedule reaches peak
- **Expected Outcome**: Convergence speed matches expected trajectory

### OF-03: Gradient Vanishing
- **Symptom**: Loss plateau; no Gaussian movement; no densification triggers
- **Root Cause**: Gradients computed but too small; gradient accumulation not working; detached computation graph
- **Diagnostic**: Check `xyz_gradient_accum` values; check `xyz.requires_grad`; verify backward pass connects to Gaussian params
- **Fix**: Ensure `retain_graph=True` in backward if needed; verify no `.detach()` in the gradient path; check if loss is computed correctly (not just mean of rendered batch)
- **Expected Outcome**: Gradients flow; densification triggers within 100 iters

### OF-04: Loss Masking Error
- **Symptom**: Loss is near zero but rendering quality is poor
- **Root Cause**: Loss mask (e.g., foreground mask) excludes most of the image; only a few pixels contribute
- **Diagnostic**: Check mask coverage — if > 90% of pixels are masked, the loss is degenerate
- **Fix**: Verify mask logic; check if mask is inverted; ensure mask coverage > 50% of image
- **Expected Outcome**: Loss reflects actual rendering quality

### OF-05: SSIM Computation Error
- **Symptom**: SSIM loss is always near 0 or 1; doesn't decrease
- **Root Cause**: SSIM window size mismatch; SSIM computed on wrong resolution; single-channel SSIM on 3-channel image
- **Diagnostic**: Check SSIM implementation — verify window size (usually 11x11), input normalization
- **Fix**: Use multi-channel SSIM; ensure input is [0,1] range (not [0,255]); verify window parameters
- **Expected Outcome**: SSIM loss decreases from ~0.5 toward ~0.1

### OF-06: Regularization Loss Dominates
- **Symptom**: Total loss decreases but rendering quality doesn't improve
- **Root Cause**: Regularization term (sparsity, scale, opacity) weighted too heavily
- **Diagnostic**: Log individual loss components separately; check if reg loss > 10x rendering loss
- **Fix**: Reduce regularization weight; use warmup on regularization (start at 0, increase over training)
- **Expected Outcome**: Rendering loss becomes dominant; quality improves

### OF-07: Wrong Loss Aggregation
- **Symptom**: Loss values seem reasonable but training doesn't converge correctly
- **Root Cause**: Loss averaged over wrong dimension; per-pixel vs per-image; batch averaging error
- **Diagnostic**: Check loss reduction: should be `mean` over all valid pixels, not `sum`; verify batch dimension handling
- **Fix**: Use consistent reduction: `loss = l1_loss.mean() + lambda * ssim_loss.mean()`
- **Expected Outcome**: Training converges at expected rate

---

## Category 4: Memory Failures (MF)

### MF-01: OOM at First ADC
- **Symptom**: CUDA OOM at iteration ~100-500 (first densification cycle)
- **Root Cause**: Gaussian count jumps without pre-allocated buffer; temporary allocations during clone/split
- **Diagnostic**: Monitor VRAM leading up to first ADC; check if VRAM > 90% before ADC
- **Fix**: Pre-allocate Gaussian buffer for 5x initial count; reduce image resolution; move ADC computation to CPU
- **Expected Outcome**: First ADC cycle completes without OOM

### MF-02: VRAM Fragmentation
- **Symptom**: OOM despite total free VRAM being sufficient (fragmented memory)
- **Root Cause**: Many small allocations/deallocations from per-image data loading
- **Diagnostic**: `torch.cuda.memory_summary()` shows large fragmentation; free memory is non-contiguous
- **Fix**: Use `torch.cuda.empty_cache()` periodically; pre-allocate image buffers; use `memory_format=torch.channels_last`
- **Expected Outcome**: VRAM utilization improves; OOM resolved

### MF-03: Optimizer State Bloat
- **Symptom**: VRAM usage grows steadily even when Gaussian count is stable
- **Root Cause**: Adam optimizer stores momentum + variance for every parameter; growth proportional to Gaussian count
- **Diagnostic**: Check optimizer memory: `sum(p.numel() for g in optimizer.param_groups for p in g['params']) * 8 bytes * 2` (Adam factor)
- **Fix**: Use memory-efficient optimizer (e.g., Adafactor); use 8-bit Adam; CPU offload optimizer states
- **Expected Outcome**: VRAM growth slowed; longer training without OOM

### MF-04: Image Data Loading OOM
- **Symptom**: OOM during data loading, not during training step
- **Root Cause**: All images loaded into VRAM simultaneously; high-resolution images
- **Diagnostic**: Check if `images` tensor is on GPU; check total image VRAM: `N_images × H × W × 3 × 4 bytes`
- **Fix**: Stream images (load per-batch); keep images on CPU, transfer to GPU per step; downsample images
- **Expected Outcome**: Image VRAM reduced by 80-95%

### MF-05: Gradient Accumulation Buffer Leak
- **Symptom**: VRAM grows over iterations even without Gaussian count change
- **Root Cause**: Gradient accumulation buffers not freed; `retain_graph=True` without manual cleanup
- **Diagnostic**: Track VRAM over time: if monotonically increasing, buffer leak
- **Fix**: Remove `retain_graph=True` if not needed; call `torch.cuda.empty_cache()` every N iters; ensure `optimizer.zero_grad()` is called
- **Expected Outcome**: VRAM stabilizes after initial growth

### MF-06: ADC Temporary Allocation Spike
- **Symptom**: OOM specifically during densification step (not during render/backward)
- **Root Cause**: Clone/split creates temporary tensors; concatenated new Gaussian array is temporarily 2x size
- **Diagnostic**: Profile ADC step VRAM: should be ~1.5x model VRAM peak
- **Fix**: Process clone and split in batches, not all at once; move ADC to CPU; use in-place operations
- **Expected Outcome**: ADC step VRAM reduced to ~1.2x model VRAM

---

## Category 5: Convergence Failures (CF)

### CF-01: Premature Plateau
- **Symptom**: PSNR stops improving by iter 5,000; stuck at ~24-25
- **Root Cause**: Densification frozen too early (`densify_until_iter` too low); LR decayed too fast
- **Diagnostic**: Check if Gaussian count stopped growing before expected; check LR schedule at plateau point
- **Fix**: Increase `densify_until_iter` (try 20000 instead of 15000); check LR still effective at iter 5000
- **Expected Outcome**: PSNR continues improving past iter 5000

### CF-02: Oscillating Loss
- **Symptom**: Loss bounces up and down; no smooth convergence
- **Root Cause**: LR too high; batch size too small; data ordering issue
- **Diagnostic**: Plot loss with smoothing; check if oscillation amplitude > 20% of loss value
- **Fix**: Reduce LR by 5x; increase batch size (more images per step); shuffle training data
- **Expected Outcome**: Loss decreases smoothly with < 5% oscillation

### CF-03: Test PSNR Regression
- **Symptom**: Training PSNR continues improving but test PSNR degrades
- **Root Cause**: Overfitting to training views; SH over-adaptation; lack of regularization
- **Diagnostic**: Compare train vs test PSNR curves; gap > 3-5 dB indicates overfitting
- **Fix**: Early stopping at peak test PSNR; increase opacity reset frequency; reduce SH degree; add sparsity regularization
- **Expected Outcome**: Test PSNR stays within 2 dB of train PSNR

### CF-04: Asymmetric Convergence
- **Symptom**: Some views render perfectly, others are terrible
- **Root Cause**: Uneven camera distribution; SfM sparse in poorly observed regions
- **Diagnostic**: Per-view PSNR plot; identify low-PSNR views and check camera coverage in that area
- **Fix**: Add more cameras in sparse regions; increase densification sensitivity for under-observed areas; importance sampling (sample under-rendered views more)
- **Expected Outcome**: Per-view PSNR variance reduces

### CF-05: Late-Stage Degradation
- **Symptom**: PSNR peaks around iter 20k-25k then gradually declines
- **Root Cause**: SH overfitting; opacity over-adaptation to training views; weight decay absent
- **Diagnostic**: Plot PSNR over full training range; identify peak; check if degradation is on test or train set
- **Fix**: Early stopping at peak; reduce `opacity_lr` in late training; add weight decay; freeze SH after iter 20k
- **Expected Outcome**: Model quality maintained at peak level

### CF-06: Never Reaches Expected PSNR
- **Symptom**: Training converges smoothly but final PSNR is 2-5 dB below papers
- **Root Cause**: Multiple possibilities: wrong camera intrinsics, lower image resolution, different dataset version, hyperparameter mismatch
- **Diagnostic**: Verify camera intrinsics match dataset; check image resolution vs paper; verify SH degree; check densification parameters
- **Fix**: Match all hyperparameters to paper/spec; verify dataset is correct version; check if using correct eval protocol
- **Expected Outcome**: PSNR matches published baselines

### CF-07: Convergence Varies Across Runs
- **Symptom**: Same config produces PSNR varying by 1-3 dB across runs
- **Root Cause**: Non-deterministic operations (cuDNN, random initialization, data ordering); non-deterministic ADC
- **Diagnostic**: Set all seeds and check if variance reduces; use `torch.use_deterministic_algorithms(True)`
- **Fix**: Set seeds (`torch.manual_seed`, `np.random.seed`, `random.seed`); use deterministic algorithms; fix data ordering
- **Expected Outcome**: Variance < 0.5 dB across runs

---

## Category 6: Artifact Failures (AF)

### AF-01: Floaters (Bright/Dark Isolated Blobs)
- **Symptom**: Small bright or dark Gaussians floating in empty space away from surfaces
- **Root Cause**: Insufficient opacity pruning; floaters from noisy SfM points; ADC cloning Gaussian into empty space
- **Diagnostic**: Render depth map — floaters appear as spikes in depth; check if they have high opacity but large scale
- **Fix**: Raise `prune_opacity_threshold`; add size+opacity joint pruning; post-train pruning (remove Gaussians with `max_scale > 2.0 AND opacity < 0.1`)
- **Expected Outcome**: Floater count reduces to near zero

### AF-02: Over-Smoothing / Blur
- **Symptom**: Renderings lack high-frequency detail; edges are soft
- **Root Cause**: SH degree too low; SSIM weight too low; too aggressive pruning of small detail Gaussians
- **Diagnostic**: Check SH degree (should be 3 for complex scenes); check λ_dssim; check prune threshold
- **Fix**: Increase SH to 3; increase λ_dssim to 0.2-0.4; lower prune threshold; increase training iterations
- **Expected Outcome**: Sharper renderings, higher LPIPS

### AF-03: Ghosting (Duplicate/Offset Geometry)
- **Symptom**: Semi-transparent duplicates of geometry offset from the true surface
- **Root Cause**: ADC clone direction error; scale gradient sign error; Gaussians being cloned in wrong direction
- **Diagnostic**: Render at locations where ghosting occurs; check if ghosts correspond to ADC clone events
- **Fix**: Verify clone direction (should follow gradient toward higher error region); check gradient sign in backward pass
- **Expected Outcome**: Ghosting disappears within 1000 iters of fix

### AF-04: Holes (Missing Regions)
- **Symptom**: Black or empty regions in reconstruction where geometry should exist
- **Root Cause**: Over-aggressive pruning; SfM sparse in those regions; densification too conservative
- **Diagnostic**: Check Gaussian density in hole regions; check if holes correspond to SfM sparse areas
- **Fix**: Lower prune threshold; increase densification sensitivity; add SfM points in sparse areas; increase `densify_until_iter`
- **Expected Outcome**: Holes fill in over 500-1000 iters

### AF-05: Color Bleeding
- **Symptom**: Color from one surface bleeds onto adjacent surfaces
- **Root Cause**: SH coefficient overflow; insufficient view coverage causing SH extrapolation errors
- **Diagnostic**: Check SH coefficient magnitude (should be bounded); check view coverage in bleeding area
- **Fix**: Clamp SH values; add SH regularization; more cameras at different angles
- **Expected Outcome**: Color bleeding reduces; accurate colors

### AF-06: Stretching (Elongated Gaussian Streaks)
- **Symptom**: Long thin streaks radiating from objects
- **Root Cause**: Scale not clamped; bad covariance projection; scale grows unbounded
- **Diagnostic**: Check max scale values; verify `scaling_activation` clamps to reasonable max (e.g., 10.0)
- **Fix**: Clamp scale: `scaling = scaling_activation(x).clamp(max=10.0)`; verify covariance projection formula
- **Expected Outcome**: Streaking disappears; compact Gaussians

### AF-07: View-Dependent Popping
- **Symptom**: Renderings flicker when changing viewpoint; inconsistent appearance
- **Root Cause**: SH degree too high with sparse training views; opacity reset causing global view changes
- **Diagnostic**: Render sequence of nearby views; check for discrete jumps in appearance
- **Fix**: Reduce SH degree (3→1); increase opacity reset interval; add smoothness regularization on SH
- **Expected Outcome**: Smooth view-dependent transitions

### AF-08: Z-Fighting on Overlapping Surfaces
- **Symptom**: Flickering on surfaces that overlap in depth
- **Root Cause**: Near-duplicate Gaussians at same depth; sorting instability
- **Diagnostic**: Check for Gaussians with nearly identical positions and depths
- **Fix**: Add deduplication in clone (don't clone if too close to existing); raise prune threshold for near-duplicates
- **Expected Outcome**: Stable rendering of overlapping surfaces

---

## Category 7: Multi-GPU Failures (MF2)

### MF2-01: Gradient Sync Failure
- **Symptom**: Loss diverges on rank 0; other ranks are normal
- **Root Cause**: All-reduce not called correctly; non-deterministic ADC creates different Gaussian sets per rank
- **Diagnostic**: Check if all GPUs have same Gaussian count after ADC; log gradient norms per rank
- **Fix**: Add `torch.distributed.barrier()` before ADC; synchronize Gaussian count and positions after ADC
- **Expected Outcome**: All ranks have same Gaussians and gradients

### MF2-02: Dead Worker
- **Symptom**: Training hangs indefinitely at all-reduce or barrier
- **Root Cause**: One GPU has OOM'd; NCCL timeout not configured; network issue
- **Diagnostic**: Check GPU status on all nodes; set NCCL timeout: `os.environ['NCCL_TIMEOUT'] = '600'`
- **Fix**: Monitor VRAM on all GPUs; add try/except around training loop; set NCCL debug: `NCCL_DEBUG=WARN`
- **Expected Outcome**: Dead worker is detected and handled gracefully

### MF2-03: ADC Desynchronization
- **Symptom**: Different GPUs have different Gaussian counts after densification
- **Root Cause**: ADC runs independently per rank; gradient-based threshold triggers on different Gaussians
- **Diagnostic**: Log Gaussian count per rank after each ADC cycle; compare counts
- **Fix**: Broadcast Gaussian decisions from rank 0; or synchronize ADC input (gradients) before densification
- **Expected Outcome**: All ranks have identical Gaussian sets after ADC

### MF2-04: Non-Reproducible Multi-GPU Results
- **Symptom**: Same config, different results on multi-GPU vs single-GPU
- **Root Cause**: Effective batch size different; gradient averaging changes optimization trajectory; batch composition different
- **Diagnostic**: Compare loss curves single vs multi-GPU; check effective batch size
- **Fix**: Scale LR by world size (or square root); ensure same images per epoch; use same random seeds
- **Expected Outcome**: Multi-GPU training matches single-GPU quality

### MF2-05: Checkpoint Load Failure on Multi-GPU
- **Symptom**: Checkpoint loads on 1 GPU but fails on multi-GPU
- **Root Cause**: DDP wraps model in `DistributedDataParallel`; state dict has `module.` prefix; device mapping wrong
- **Diagnostic**: Check checkpoint keys for `module.` prefix; check device placement
- **Fix**: Strip `module.` prefix: `{k.replace('module.', ''): v for k, v in state_dict.items()}`; use `map_location`
- **Expected Outcome**: Checkpoint loads correctly on all GPU configurations

### MF2-06: NCCL Communication Overhead
- **Symptom**: Multi-GPU is slower than single GPU despite more compute
- **Root Cause**: All-reduce communication dominates; no compute/comm overlap
- **Diagnostic**: Profile: check if communication time > compute time; check all-reduce tensor sizes
- **Fix**: Use gradient bucketing (group small gradients); overlap all-reduce with backward computation; use NCCL P2P
- **Expected Outcome**: Multi-GPU speedup approaches linear scaling

---

## Category 8: Novel Method Failures (NF)

### NF-01: Deformable GS — MLP NaN
- **Symptom**: NaN loss appears after fine-tuning with deformation MLP enabled
- **Root Cause**: MLP output unrestricted; gradients through temporal dimension are large; no activation on output
- **Diagnostic**: Log MLP output; check for values > 1e3; check gradient through MLP
- **Fix**: Add `tanh` activation on MLP output; add gradient clipping specifically on MLP params; warmup (freeze MLP for first N iters)
- **Expected Outcome**: Stable training; no NaN after enabling MLP

### NF-02: Deformable GS — Temporal Inconsistency
- **Symptom**: Static parts of scene still deform; temporal flickering
- **Root Cause**: Deformation field not regularized; MLP applies deformation everywhere
- **Diagnostic**: Check deformation magnitudes in static regions; should be near-zero
- **Fix**: Add temporal smoothness regularization; mask deformation by motion segmentation; residual deformation (only learn offset from canonical)
- **Expected Outcome**: Static regions stable; only dynamic regions deform

### NF-03: Feed-Forward GS — Sparse View Instability
- **Symptom**: Model produces garbage Gaussians when tested with fewer views than trained
- **Root Cause**: Model overfits to specific number of input views; feature aggregation breaks with different view count
- **Diagnostic**: Test with varying view counts; check Gaussian distribution quality
- **Fix**: Train with varying view counts (augmentation); use attention that handles variable input; add view-count regularization
- **Expected Outcome**: Stable output across view counts

### NF-04: MoE-GS — Expert Collapse
- **Symptom**: All routing goes to 1-2 experts; other experts receive no data
- **Root Cause**: Router imbalance; load-balancing loss weight too low or zero; expert capacity too small
- **Diagnostic**: Log expert utilization per batch; check if any expert has 0% routing
- **Fix**: Increase load-balancing loss weight (try 0.01-0.1); add router z-loss to prevent logits explosion; lower expert capacity and increase number of experts
- **Expected Outcome**: Expert utilization distributed (no expert > 40% of tokens)

### NF-05: MoE-GS — Router Instability
- **Symptom**: Router assignments oscillate; training loss is unstable
- **Root Cause**: Router temperature too high (uniform) or too low (argmax-like); random initialization
- **Diagnostic**: Log router entropy over training; should decrease smoothly from log(n_experts) to ~0.5
- **Fix**: Use temperature annealing (start high, decrease over training); initialize router with orthogonal weights
- **Expected Outcome**: Router stabilizes; assignments become consistent

### NF-06: Physics-Based GS — Simulation Divergence
- **Symptom**: Physics simulation diverges; Gaussian positions explode; NaN from physics integrator
- **Root Cause**: Time step too large; integrator unstable; spring stiffness too high
- **Diagnostic**: Log physics energy over time; should be conserved (not grow); check for NaN in positions after physics step
- **Fix**: Reduce time step dt; use semi-implicit Euler instead of explicit Euler; add damping coefficient; reduce spring stiffness
- **Expected Outcome**: Energy conserved; positions stable; no NaN

### NF-07: Physics-Based GS — Stiffness Artifact
- **Symptom**: Object doesn't deform naturally; appears rigid or too soft
- **Root Cause**: Spring/rest-length parameters wrong; mass estimation wrong; stiffness mismatch with scene scale
- **Diagnostic**: Check spring rest lengths vs actual distances; check mass distribution
- **Fix**: Compute rest lengths from initial Gaussian positions; normalize mass by volume; scene-scale-dependent stiffness
- **Expected Outcome**: Natural deformation behavior

### NF-08: SLAM-GS — Drift Accumulation
- **Symptom**: Reconstruction quality degrades over time; later frames are misaligned
- **Root Cause**: Incremental optimization without global adjustment; no loop closure
- **Diagnostic**: Track camera pose error over time; compare to ground truth if available
- **Fix**: Keyframe-based global optimization; loop closure detection; periodic global bundle adjustment
- **Expected Outcome**: Drift bounded; all frame alignments maintained

### NF-09: SLAM-GS — Map Fragmentation
- **Symptom**: Separate unconnected Gaussian clusters; gaps between sub-maps
- **Root Cause**: Each keyframe treated independently; no overlap-based merging
- **Diagnostic**: Render global map; check for hard boundaries between sub-maps
- **Fix**: Overlap-based merging of sub-maps; global refinement after all keyframes processed; shared Gaussians at boundaries
- **Expected Outcome**: Seamless global map

### NF-10: Compression GS — Quality Collapse
- **Symptom**: Quality drops dramatically after compression/pruning
- **Root Cause**: Importance-agnostic pruning removed critical Gaussians; quantization too aggressive
- **Diagnostic**: Compare pre/post compression PSNR; check which Gaussians were pruned
- **Fix**: Importance-aware pruning (use gradient or visibility-based importance); fine-tune after pruning; adaptive quantization (lower precision for less important Gaussians)
- **Expected Outcome**: Quality drop < 0.5 dB after compression

### NF-11: City-Scale GS — Spatial Discontinuity
- **Symptom**: Visible seams between blocks/training regions
- **Root Cause**: Block-wise training creates independent models; no overlap or blending
- **Diagnostic**: Render across block boundaries; check for discontinuities
- **Fix**: Overlap blocks and blend boundaries; global refinement after block training; LOD-based blending
- **Expected Outcome**: Seamless transitions across block boundaries

### NF-12: GaussTrace — Provenance Tag Loss
- **Symptom**: Provenance tags are wrong or missing after densification
- **Root Cause**: ADC clone/split doesn't propagate provenance metadata; new Gaussians get default/empty tags
- **Diagnostic**: Check tag integrity after each ADC cycle; verify cloned Gaussians inherit parent tags
- **Fix**: Custom ADC that propagates provenance: clone → inherit parent tag; split → both children inherit parent tag; verify tag tensor shape matches Gaussian tensor
- **Expected Outcome**: All Gaussians have correct provenance tags throughout training

---

## Quick Reference: Pattern → Section Mapping

| Pattern IDs | Category | SKILL.md Section |
|-------------|----------|-----------------|
| IF-01 to IF-06 | Initialization Failures | Sec 1 (Monitoring), Sec 2 (Decision Tree) |
| DF-01 to DF-08 | Densification Failures | Sec 2 (Decision Tree), Sec 5 (Hyperparams) |
| OF-01 to OF-07 | Optimization Failures | Sec 5 (Hyperparams), Sec 6 (Convergence) |
| MF-01 to MF-06 | Memory Failures | Sec 3 (OOM & Memory) |
| CF-01 to CF-07 | Convergence Failures | Sec 6 (Convergence) |
| AF-01 to AF-08 | Artifact Failures | Sec 4 (Artifacts) |
| MF2-01 to MF2-06 | Multi-GPU Failures | Sec 7 (Distributed) |
| NF-01 to NF-12 | Novel Method Failures | Sec 9 (Novel Method Stability) |
| **Total: 60 patterns** | | |

---

> If you like it, please star this repo https://github.com/jaccen/Awesome-Gaussian-Skills