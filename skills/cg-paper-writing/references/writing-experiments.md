
---
# Experiments, Rebuttal & Contribution Templates

## Experiments

Required components:
1. **Datasets**: List all datasets, explain train/test split
2. **Evaluation metrics**: Choose by direction (see table below)
3. **Baseline comparison**: At minimum include current SOTA
4. **Ablation study**: Verify contribution of each core module

### Direction-Specific Metrics

| Direction | Core Metrics | Supplementary |
|-----------|-------------|---------------|
| Novel View Synthesis | PSNR↑ SSIM↑ LPIPS↓ | FPS, primitive count |
| 3D Shape Understanding | mIoU↑ mAcc↑ | F1-score, AUC |
| 3D Generation | FID↓, 1-NNA-CD↓, 1-NNA-EMD↓ | MMD, COV |
| Point Cloud Registration | RMSE↓, Chamfer↓ | RRE, RTE |
| CAD Reconstruction | Chamfer↓, F-score↑ | Geometric accuracy |
| 3D Scene Understanding | mIoU↑ | Recall, Precision |

Optional bonus items:
- Runtime comparison (FPS, training time, memory)
- Visual comparison (qualitative analysis figures)
- Different scene difficulty (indoor/outdoor, simple/complex)
- Robustness analysis (noise, occlusion, sparse views)

English template:
```
4.1 Experimental Setup (datasets, baselines, metrics)
4.2 Main Results (comparison tables)
4.3 Ablation Study (component analysis)
4.4 [Specific Analysis] (e.g., efficiency, generalization)
```

### Experiment Design: Beyond the Basics (Lessons from High-Impact Papers)

The difference between a "solid" experiment section and a "best paper" experiment section is not more tables — it is **the depth of analysis that turns data into evidence**.

#### 1. Setup: Make every choice a deliberate decision

- **Dataset selection**: Do NOT just list datasets — explain WHY each was chosen (what challenge does it test?). A CVPR reviewer asks: "Does your method generalize beyond the benchmark you chose?"
- **Baseline selection**: Include at least 2-3 current SOTA methods. Explain why these specific baselines were chosen (same problem class, same evaluation protocol, or strongest reported results).
- **Evaluation protocol**: Follow the EXACT protocol of your baselines (same train/test split, same metrics implementation). A single mismatch invalidates the comparison.

#### 2. Main Results: Lead with the headline, then explain the "why"

- **Table design**: Bold the best result, underline the second-best. One table per metric family (quality, speed, memory). Do NOT cram everything into one giant table.
- **Analysis paragraph**: After each table, write 2-3 sentences explaining the pattern. Do NOT just say "our method achieves the best PSNR" — explain WHY (e.g., "The improvement is most pronounced on scenes with fine details, suggesting that our frequency-aware splitting captures high-frequency content that uniform splitting misses").
- **Failure analysis**: Include at least one paragraph on when and why the method fails or underperforms. This builds credibility — reviewers trust authors who acknowledge limitations.

#### 3. Ablation: Each component must earn its place

- **Ablation matrix**: Remove or replace one component at a time. Present as a table showing the contribution of each module to the final result.
- **Metric-level ablation**: If the paper claims improvement on both quality and speed, ablate for BOTH. A component that improves PSNR but hurts FPS is not free.
- **Hyperparameter sensitivity**: Include a sensitivity analysis for key hyperparameters (at least a line plot showing performance vs. parameter value). This preempts the reviewer question "How did you choose this value?"

#### 4. Qualitative Analysis: Figures that tell a story

- **Figure layout**: Zoom-in detail boxes (red/green rectangles with enlarged regions) are the CVPR standard for visual comparison.
- **Error maps**: Show per-pixel difference between your result and the ground truth / baseline. This is far more convincing than side-by-side images where differences are invisible.
- **Figure caption**: Must be self-contained — a reader should understand the figure from the caption alone without reading the body text.

#### 5. Efficiency Analysis: Numbers that matter

- Report FPS (frames per second) at a SPECIFIC resolution (e.g., "43 FPS at 1920×1080 on a single RTX 4090").
- Report peak GPU memory (VRAM) during both training and inference.
- If claiming speedup, report wall-clock time for the full pipeline, not just the forward pass.
- Training time: "X hours on Y GPU" — reviewers compare this to their own compute budget.

#### 6. Statistical Rigor (increasingly required by top venues)

- Run key experiments 3-5 times with different random seeds; report mean ± standard deviation.
- For marginal improvements (<0.5 dB PSNR), provide statistical significance test results (paired t-test or Wilcoxon signed-rank test).
- Confidence intervals are more informative than point estimates for noisy metrics like FID.

## Contribution Statement

Good contribution statements are:
1. **Specific**: Point to technical mechanism, not "proposed a new method"
2. **Measurable**: Include expected metric improvement
3. **Differentiated**: Clearly distinguish from prior work
4. **Honest**: No exaggeration

Template:
```
- We propose [specific technique] that [specific mechanism]. Unlike [prior work] which [limitation], our approach [advantage], achieving [specific results].
- We introduce [component] that enables [capability]. This [specific benefit], as demonstrated by [experiment/analysis].
- We conduct extensive experiments on [N] benchmarks, demonstrating [specific results] over [M] state-of-the-art methods.
```

## Common Rebuttal Strategies

| Reviewer Challenge | Response Strategy |
|-------------------|-------------------|
| Novelty质疑 | Precisely specify technical differences; add comparison experiments |
| Missing baseline | Acknowledge omission; add experiments or cite reason |
| Efficiency质疑 | Add FPS/memory/parameter count table |