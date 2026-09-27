
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

### Experiment Design: Beyond the Basics (Lessons from High-Impact Papers)

#### 1. Setup: Make every choice a deliberate decision
Do not just list datasets — explain WHY each dataset was chosen (what challenge it tests). Pin every hyperparameter to the baseline for fair comparison (Mip-Splatting: "Following [18], we train our models for 30K iterations across all scenes and use the same loss function, Gaussian density control strategy, schedule and hyper-parameters"). Open the experiments section with a roadmap paragraph ("We first present... We then assess... Finally, we discuss...").

#### 2. Main Results: Lead with the headline, then explain the "why"
After each table, write 2-3 sentences explaining WHY the method wins — not just "ours is best". Attribute the gain to the specific mechanism (e.g., "the improvement concentrates on scenes with X, confirming component Y addresses Z"). Report results at application-meaningful operating points when possible (D4RT: "Max. Track Count @ Target FPS" with 60/24/10/1 FPS columns).

#### 3. Ablation: Each component must earn its place
Change ONE component at a time; ablate on both quality and speed dimensions; include hyperparameter sensitivity analysis. Name ablation subsections by the component they validate (Mip-Splatting: "Effectiveness of the 3D Smoothing Filter", "Effectiveness of the 2D Mip Filter"). If a component cannot show a measurable contribution in ablation, cut it from the paper.

#### 4. Qualitative Analysis: Figures that tell a story
Use zoom-in detail boxes for direct comparison; add error maps (difference images) to make improvements visible; write self-contained captions — a reviewer skimming only figures must understand the claim. Diagnose failure modes honestly (Mip-Splatting's Fig. 1: faithful vs degenerate representation with named causes).

#### 5. Efficiency Analysis: Numbers that matter
Report FPS at a specified resolution + GPU model; report peak VRAM for training AND inference; report end-to-end wall-clock time. Disclose engineering reality (3DGS: "~80% of our training time is spent in Python code"). Throughput claims without hardware context are meaningless.

#### 6. Statistical Rigor (increasingly required by top venues)
Run 3-5 random seeds and report mean ± std; marginal improvements (< 0.5 dB or < 2%) need a significance test (t-test or Wilcoxon); prefer confidence intervals over point estimates. State the number of runs explicitly in the setup.

English template:
```
4.1 Experimental Setup (datasets, baselines, metrics)
4.2 Main Results (comparison tables)
4.3 Ablation Study (component analysis)
4.4 [Specific Analysis] (e.g., efficiency, generalization)
```

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