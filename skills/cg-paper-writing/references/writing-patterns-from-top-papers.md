# Writing Patterns from Top Papers (Exemplar-Based)

> Concrete, evidence-grounded writing techniques distilled from three benchmark papers. Unlike the abstract templates in other files, every pattern here is backed by direct quotes from published top-venue papers. Load this alongside any section template for style calibration.

## Benchmark Papers

| Paper | Venue | Honor | arXiv | Why Benchmark |
|-------|-------|-------|-------|---------------|
| 3D Gaussian Splatting (3DGS) | SIGGRAPH 2023 (ACM TOG) | 20000+ citations | 2308.04079 | Foundational; paradigm-creating paper |
| Mip-Splatting | CVPR 2024 | Best Student Paper | 2311.16493 | Diagnostic + theory-grounded improvement |
| D4RT | CVPR 2026 | Best Paper | 2512.08924 | Paradigm-shift via architectural simplification |

---

## Cross-Cutting Patterns: The "Best Paper DNA"

### Pattern 1: Two-Sided Win Thesis

Every benchmark paper claims quality AND efficiency simultaneously, where prior work forced a trade-off. The thesis is: "we break the accepted trade-off."

- 3DGS Fig. 1 caption: "Our method achieves real-time rendering of radiance fields with quality that equals the previous method with the best quality [Barron et al. 2022], while only requiring optimization times competitive with the fastest previous methods."
- The teaser figure annotates each competitor with its fatal weakness: "InstantNGP (9.2 fps), Train: 7min, PSNR: 22.1" vs "Ours (135 fps), Train: 6 min, PSNR: 23.6" — speed of the fastest, quality of the best.
- D4RT abstract: "a simple yet powerful feedforward model designed to efficiently solve this task" — simplicity AND power, efficiency AND capability in one phrase.

How to apply: identify the accepted trade-off in your sub-field (quality vs speed, generality vs precision, accuracy vs memory), then frame your contribution as breaking it. One sentence must state both sides with numbers.

### Pattern 2: Diagnose Before Cure

Mip-Splatting devotes an entire section (Sec. 4 "Sensitivity to Sampling Rate") to mechanism-level failure analysis BEFORE presenting the method. The reader first sees WHY vanilla 3DGS fails — erosion ("Brake cable too thin") and dilation ("Spokes too thick due to screen space dilation") — then the two filters become the obvious cure.

How to apply: before describing your method, show the failure mode at mechanism level with a diagnostic figure (faithful vs degenerate representation, side by side). A method whose motivation is a diagnosed failure reads as inevitable, not incremental.

### Pattern 3: The "Sidestep" Move

3DGS does not improve NeRF's sampling or caching — it eliminates the structural cost entirely: "contrary to widely accepted opinion – a continuous representation is not strictly necessary to allow fast and high-quality radiance field training."

How to apply: when possible, frame your contribution as removing a cost the field assumed was unavoidable (not as optimizing it). Sidestep beats optimize. Sentence pattern: "Contrary to common belief / widely accepted opinion, X is not strictly necessary for Y."

### Pattern 4: Theory Import

Mip-Splatting grounds both filters in signal processing theory (Sec. 3.1 "Sampling Theorem" — Nyquist-Shannon). The 3D smoothing filter enforces a maximum sampling rate per 3D Gaussian; the 2D Mip filter approximates the box filter of the camera imaging process. Theory converts an engineering trick into a principled contribution.

How to apply: search adjacent fields for an established theorem that formalizes your intuition (sampling theory, information theory, optics, robust statistics). Import it as a Preliminaries section, then design each component as the theorem's consequence.

### Pattern 5: "Obvious Method → Problem → Our Approach" Trust-Building Narrative

3DGS's introduction first presents the obvious approach (points with 2D Gaussians), then shows its problems (aliasing, blending artifacts, cascades of heuristics), then positions its contribution as the minimal set of changes that makes the obvious approach work. The reader thinks: "I would have tried the same obvious thing — and here is why it fails without their fixes."

How to apply: do not hide the naive baseline. Present it, break it, then present your fix as the smallest set of changes that repairs it.

### Pattern 6: Root-Cause Attribution

Mip-Splatting attributes each artifact to a specific mechanism: high-frequency artifacts ← degenerate (thin) 3D Gaussians ← excessive sampling rate; dilation ← screen-space maximum Gaussian extent. Every observed symptom has a named cause, and every component of the method targets exactly one cause.

How to apply: build a symptom → cause → fix table before writing. Each method component must map to exactly one root cause; each root cause must be observable in a figure.

### Pattern 7: Protocol Creation

Mip-Splatting creates an evaluation protocol — single-scale training, multi-scale testing — that exposes the weakness of prior work and remains the community standard. Owning the evaluation protocol means every future paper compares on your terms.

How to apply: if existing benchmarks hide your contribution's strength, define a new evaluation axis (new train/test split, new metric, new stress test), demonstrate prior methods fail on it, and make the protocol easy to reproduce.

### Pattern 8: Paradigm-Shift Framing

D4RT frames its contribution as a paradigm shift, not an incremental improvement: prior work either stitches multiple task-specific models together or fails on dynamic objects — D4RT replaces the pipeline with "a unified transformer architecture" that "jointly infers depth, spatio-temporal correspondence, and full camera parameters."

How to apply: name the incumbent paradigm (multi-module pipeline, per-scene optimization, task-specific heads), then frame your work as the unified replacement. Sentence pattern: "Instead of [incumbent architecture with its structural cost], we [unified mechanism]."

### Pattern 9: Desired-Properties Enumeration

D4RT enumerates what a solution SHOULD have before presenting its own: process monocular video efficiently, jointly output geometry + motion + camera parameters, run at interactive rates. The method is then presented as the point in design space satisfying all requirements.

How to apply: before the method section, enumerate 3 desired properties as design requirements. Then show each component exists to satisfy one property. This converts your design choices from arbitrary to necessary.

### Pattern 10: Throughput Intuition Metric

D4RT's headline table is "Max. Track Count @ Target FPS" — columns are 60 FPS / 24 FPS / 10 FPS / 1 FPS. Instead of reporting average speed, it reports capability AT real-time budgets, which maps directly to deployability (60 FPS = real-time robot, 24 FPS = video rate).

How to apply: report your efficiency result at application-meaningful operating points (real-time budget, memory budget, energy budget), not as an abstract average. "X at 60 FPS" is a claim a practitioner can act on; "X averages 45 FPS" is not.

---

## Section-Specific Patterns

### Title
- 3DGS: "3D Gaussian Splatting for Real-Time Radiance Field Rendering" — [Method Name] for [Target Capability]. The capability is the selling point (real-time), not the task (novel view synthesis).
- Mip-Splatting: "Mip-Splatting: Alias-free 3D Gaussian Splatting" — [Name]: [Property] + [Base Method]. The property (alias-free) is a falsifiable claim.
- D4RT: "Efficiently Reconstructing Dynamic Scenes One D4RT at a Time" — verb-first capability with the method name embedded. Memorable without being cute.

### Teaser Figure (Fig. 1)
- 3DGS: the teaser IS the result table rendered as images — Ground Truth vs 3 competitors vs Ours, each annotated with (fps, train time, PSNR). A reviewer gets the entire contribution from Fig. 1 alone.
- Mip-Splatting: the teaser is a diagnosis — (a) faithful vs (b) degenerate representation, with zoom-ins naming the failure (erosion/dilation) and the cause (3D Gaussian size vs focal length).

### Abstract
- All three follow: task importance (1 sentence) → incumbent limitation (1-2 sentences) → our approach (1-2 sentences) → results with numbers (1-2 sentences).
- Quantified claims are mandatory: 3DGS states real-time rendering with quality equal to the best prior method; D4RT states the unified architecture and its joint outputs. No benchmark paper ships an abstract without numbers.

### Introduction
- 3DGS: ends the opening paragraph with the trade-off statement, then the contribution paragraph lists exactly 3 contributions matching the 3 method components.
- Mip-Splatting: the intro previews the diagnosis (Sec. 4) before the method (Sec. 5) — the paper's structure is itself an argument.
- D4RT: the intro states the desired properties, then the contributions map 1:1 onto them.

### Method
- 3DGS: each subsection ends with the role the component plays in the whole ("...this allows us to...").
- Mip-Splatting: each filter is presented with the same 4-beat structure: theory → what vanilla 3DGS does wrong → our modification → what it fixes.
- D4RT: architecture figure first, then "Training and Inference" as a separate subsection — the reader can implement from the paper.

### Experiments
- All three open the experiments section with a roadmap paragraph. Mip-Splatting: "We first present the implementation details of Mip-Splatting. We then assess its performance on the Blender dataset [28] and the challenging Mip-NeRF 360 dataset [2]. Finally, we discuss the limitations of our approach." D4RT: "After inspecting qualitative differences in capability in Sec. 4.1, we proceed with evaluating 4D Reconstruction and Tracking performance in Sec. 4.2... We conclude with a set of key ablations in Sec. 4.4."
- Mip-Splatting's implementation subsection pins every hyperparameter to the baseline for fair comparison: "We build our method upon the popular open-source 3DGS code base [18]. Following [18], we train our models for 30K iterations across all scenes and use the same loss function, Gaussian density control strategy, schedule and hyper-parameters."
- Ablations are named by the component they validate: "Effectiveness of the 3D Smoothing Filter", "Effectiveness of the 2D Mip Filter", "Single-scale Training and Multi-scale Testing".

### Limitations & Conclusion
- Mip-Splatting's limitations section quantifies its own weakness and links it to evidence: "this approximation introduces errors, particularly when the Gaussian is small in screen space. This issue correlates with our experimental findings, where increased zooming out leads to larger errors, as evidenced in Table 2." Then it names the fix direction (more efficient CUDA implementation, better data structure for precomputing the sampling rate).
- 3DGS's conclusion challenges the field's assumption ("a continuous representation is not strictly necessary") and discloses engineering reality ("The majority (~80%) of our training time is spent in Python code, since we built our solution in PyTorch to allow our method to be easily used by others").

---

## How to Use This File

1. Before drafting any section, re-read the matching section-specific pattern above.
2. When calibrating style, pick the benchmark paper closest to your paper's type:
   - Paradigm-creating / representation paper → 3DGS
   - Diagnostic improvement / theory-grounded fix → Mip-Splatting
   - Unified framework / architectural simplification → D4RT
3. Every pattern here is falsifiable against the source PDFs (arXiv 2308.04079, 2311.16493, 2512.08924). These are writing techniques for calibration, not method citations — do not cite patterns from this file in a paper.

## How to Extend This Library（标杆论文深读扩展流程）

当用户要求"学习高引用论文的写作模式"（下载顶刊论文 / 学习论文撰写模式 / 研读标杆论文）时，不要止步于检索投稿指南或二手解读——必须下载论文全文并深读。流程如下：

1. **选纸标准**（选 3-4 篇）：
   - 子领域的范式开创性论文（如 3DGS，20000+ 引用）
   - 目标 venue 的最佳论文奖得主（如 Mip-Splatting CVPR 2024 Best Student Paper、D4RT CVPR 2026 Best Paper）
   - 与用户目标 venue 和论文类型匹配的高引用论文
2. **分析前先验证（关键坑点）**：下载 PDF 后必须打开确认首页标题与预期论文一致。曾发生 arXiv ID 一位之差（2311.16481 实为 D-SCL 论文，正确的 Mip-Splatting 是 2311.16493）导致错误论文在缓存中存放数月未被发现。验证链：arXiv ID → 标题 → 作者，三者对齐后才可提取文本。
3. **提取与结构映射**：用 pymupdf/fitz 提取全文（对双栏 PDF 有效），先映射章节骨架（摘要 / 引言 / 相关工作 / 方法 / 实验 / 局限 / 结论）并记录行号，再逐节精读。
4. **带证据提炼模式**：每个模式必须包含 (a) 模式名 (b) 论文原文直接引用 (c) "how to apply" 应用指引。没有原文引用的模式是推测，不是校准。
5. **重点记录论文的自我定位手法**：teaser 图策略、trade-off 框定、贡献列表结构、limitations 诚实度——这些跨章节手法是最高价值的提取物。
6. **更新本文件与路由**：新标杆论文加入上方 Benchmark Papers 表；保持每个模式可对照源 PDF 的 arXiv ID 证伪。