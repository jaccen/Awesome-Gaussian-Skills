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