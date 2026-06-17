

# Writing Skills Enhancement: Best Paper Paradigm Extraction

> Version: 0.1.0 | Date: 2026-06-17
> Sources: CVPR 2025-2026 Best Paper, Best Student Paper, Highlight, and Full Score Oral papers in 3DGS/CG/spatial intelligence

## Extracted Paradigms

### 1. Problem Formulation — How Top Papers Define Scientific Questions

**VGGT / D4RT Pattern** (CVPR 2025/2026 Best Paper):
- Start from **observable phenomenon** (multi-view 3D reconstruction works but requires per-scene optimization → VGGT; static reconstruction works but dynamics fail → D4RT)
- Identify the **single bottleneck** that blocks progress (task-isolated architectures → VGGT unifies them; no temporal consistency in 4D → D4RT's unified query)
- Formulate as: "Current methods achieve X but fail at Y because Z. We propose to resolve Z by [method]."

**Proxy-GS Pattern** (CVPR 2026 Full Score Oral):
- Quantify the inefficiency directly: "N% of decoded Gaussians are invisible from current viewpoint"
- One-figure motivation: show heatmap of wasted computation → immediate "aha" for reviewers

**Prune Wisely Pattern** (CVPR 2026):
- Target a widely-accepted but suboptimal practice (uniform pruning) with precise data on its cost
- Show gap between theoretical compression limit and achieved compression → motivates new primitive type (DoG)

### 2. Methodology Narrative Logic — Observation → Hypothesis → Design → Verification

**D4RT**: Video dynamics are temporally sparse → hypothesis: unified query mechanism can track + reconstruct simultaneously → design: per-frame query tokens with cross-frame attention → verify: 200+ FPS with tracking accuracy

**TRELLIS.2** (CVPR 2026 Best Student Paper):
- Observation: Generated 3D assets lack interior geometry and material separation
- Hypothesis: A native 3D model that operates in 3D latent space (not 2D→3D lifting) can capture interior structure
- Design: 4B-param structured latent 3D transformer with nested layer support
- Verify: 17s PBR generation with open surfaces + transparent materials

**General Template**:
1. Observation: [quantified limitation of existing methods]
2. Hypothesis: [if we change X, then Y should improve because Z]
3. Design: [concrete architecture change with 2-3 key innovations]
4. Verify: [ablation isolating each innovation + comparison on standard benchmarks]

### 3. Experiment Design Templates

**Standard Ablation Matrix** (Proxy-GS):
| Config | Proxy Mesh | Occlusion Culling | Anchor Reduction | PSNR | FPS |
|--------|-----------|-------------------|-----------------|------|-----|
| Baseline (Scaffold-GS) | — | — | — | X.XX | Y.Y |
| + Proxy only | ✓ | — | — | X.XX | Y.Y |
| + Culling only | — | ✓ | — | X.XX | Y.Y |
| Full method | ✓ | ✓ | ✓ | X.XX | Y.Y |

**Extreme Scenario Test** (3DReflecNet / Prune Wisely):
- Design stress tests targeting the method's claimed advantage
- 3DReflecNet: 48 material parameter combinations across 3 failure modes
- Prune Wisely: 90% pruning at each quality level (PSNR/LPIPS/SSIM at 10%, 30%, 50%, 70%, 90% reduction)

**Cross-Dataset Generalization** (VGGT / D4RT):
- Train on one dataset, test on unseen domains
- VGGT: trained on Co3D, tested on BLVD / TANKS
- Report both in-domain and out-of-domain to demonstrate generalization

### 4. Visualization Presentation Techniques

**Qualitative Comparison**:
- Side-by-side with error magnification (4× or 8× L1 error overlay)
- Zoom-in patches on failure cases of baselines that the proposed method resolves

**Error Heatmaps** (Proxy-GS / Prune Wisely):
- Per-pixel PSNR/LPIPS heatmap showing spatial distribution of quality
- Highlights where pruning removes detail vs. where it successfully compresses

**Per-Category Bar Charts** (D4RT):
- Not just average numbers; show per-scene or per-category breakdowns
- Reveals that average improvements hide category-specific wins

**Architecture Diagram Clarity** (TRELLIS.2):
- Color-coded data flow: input (blue) → encoder (green) → latent (orange) → decoder (purple) → output (red)
- One-sentence annotation per block
- Avoid overlapping arrows; use clean left-to-right flow

## Application to This Project

### README.md Improvements
- Apply Proxy-GS pattern: add one-figure motivation showing "time wasted on manual RAG/comparison" vs. "seconds with this toolkit"
- Quantify the value proposition precisely: "97+ known bug patterns detected" > "comprehensive bug detection"

### SKILL.md Improvements
- Each skill should state its **single bottleneck resolution** in the description
- Example: `3dgs-code-reviewer` — "97+ bug patterns including 2 newly discovered from CVPR 2026 (DoG pruning false positive, proxy mesh over-culling)"
- Use per-method performance numbers in comparison tables (not just "faster" but "3× speedup, PSNR preserved")

## Revision Log
- 2026-06-17: Initial extraction from CVPR 2025-2026 Best Paper candidates