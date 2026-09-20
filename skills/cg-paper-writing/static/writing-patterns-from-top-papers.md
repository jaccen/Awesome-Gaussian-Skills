---
# Writing Patterns from Top Papers (Exemplar-Based)

> Concrete, evidence-grounded writing techniques distilled from three benchmark papers. Unlike the abstract templates in other files, every pattern here is backed by direct quotes from published top-venue papers. Load this alongside any section template for calibration.

## Benchmark Papers

| Paper | Venue | Honor | arXiv | Why Benchmark |
|-------|-------|-------|-------|---------------|
| 3D Gaussian Splatting (3DGS) | SIGGRAPH 2023 (ACM TOG) | 20000+ citations | 2308.04079 | Foundational; paradigm-creating paper |
| Mip-Splatting | CVPR 2024 | Best Student Paper | 2311.16493 | Diagnostic + theory-grounded improvement |
| D4RT | CVPR 2026 | Best Paper | 2512.08924 | Paradigm-shift via architectural simplification |
---

## Cross-Cutting Patterns: The "Best Paper DNA"

### Pattern 1: Two-Sided Win Thesis

Every benchmark paper claims quality AND efficiency simultaneously, where prior work forced a trade-off. The thesis is: "we break the trade-off that everyone accepted as inevitable."

- **3DGS**: "Our method achieves real-time rendering of radiance fields with quality that equals the previous method with the best quality, while only requiring optimization times competitive with the fastest previous methods." (Fig. 1 caption)
- **Mip-Splatting**: comparable to prior work at training scale, significantly exceeds all SOTA at other scales — quality without multi-scale training requirements.
- **D4RT**: "sets a new state of the art, outperforming existing approaches in both speed and accuracy" (Abstract) — simultaneously wins on both axes.

**Application**: State your two-sided win explicitly in the abstract's first or second sentence. The reader's mental model should immediately register: "this paper breaks a known trade-off."

### Pattern 2: Diagnose Before Cure

Best papers spend the opening on WHY prior methods fail at the mechanism level, not just that they fail. The reader must understand the failure mode before seeing the solution.

- **Mip-Splatting**: Fig. 1 is a problem diagnosis diagram, not a results comparison. It illustrates the dilation/erosion mechanism. "We find that the source for this phenomenon can be attributed to the lack of 3D frequency constraints and the usage of a 2D dilation filter." (Abstract) — root cause named explicitly.
- **D4RT**: "Traditional 3D reconstruction asks: 'What is the geometry of everything, everywhere, all at once?' We argue this exhaustive, rigid approach is fundamentally ill-equipped for a dynamic world." (Intro) — reframes the incumbent approach's cost at the conceptual level.
- **3DGS**: "While the continuous nature of these methods helps optimization, the stochastic sampling required for rendering is costly and can result in noise." (Intro) — names the specific cost (stochastic sampling), not just "they are slow."

**Application**: Before describing your solution, write 1-2 sentences that diagnose the structural cost of the incumbent approach. Use "We find that the source for X can be attributed to Y" phrasing. Your reader should think "I always wondered why that happens."

### Pattern 3: The "Sidestep" Move

Rather than incrementally improving the incumbent approach, identify its structural cost and eliminate it entirely. The contribution is the elimination, not the optimization.

- **D4RT**: "a novel querying mechanism that sidesteps the heavy computation of dense, per-frame decoding and the complexity of managing multiple, task-specific decoders" (Abstract) — names two costs being bypassed.
- **Mip-Splatting**: "In contrast to previous work that rely on the MLP's ability to interpolate multi-scale signals during training with multi-scale images, our closed-form modification to the 3D Gaussian representation results in excellent out-of-distribution generalization" — sidesteps the multi-scale training requirement.
- **3DGS**: "In contrast to most point-based solutions that require Multi-View Stereo (MVS) data, we achieve high-quality results with only SfM points as input." — sidesteps the MVS dependency.

**Application**: In your introduction, explicitly state what your method does NOT need that all prior methods required. Frame it as: "Unlike [prior work] which requires [cost], our approach [eliminates cost]."

### Pattern 4: Theory Import

Grounding novelty in established theory converts "clever trick" to "principled solution." Import a theorem, framework, or principle from outside the immediate field.

- **Mip-Splatting**: imports Nyquist-Shannon Sampling Theorem from signal processing. A full Preliminaries section (Sec. 3.1) teaches Condition 1 (band-limited signal) and Condition 2 (sampling rate >= 2*max frequency) before using them.
- **3DGS**: grounds the rendering equation in the established EWA splatting framework [Zwicker et al. 2001a], showing Eq. 2 (NeRF) and Eq. 3 (point-based) share the same image formation model — importing signal processing to unify two literatures.
- **D4RT**: "inspired by the Scene Representation Transformer [39, 40]" — imports the encoder-decoder transformer architecture from scene representation literature.

**Application**: If your method has a theoretical basis, write a Preliminaries section that teaches the theorem before using it. The reader should learn the theory from your paper, not be expected to already know it.

### Pattern 5: Numbered Enumerations as Memory Anchors

Best papers use explicit "three key elements / three desirable properties / First-Second-Third" structures. Reviewers remember numbered structures far better than prose.

- **3DGS**: "We introduce three key elements that allow us to achieve state-of-the-art visual quality... First... Second... Third..." (Abstract)
- **D4RT**: "We draw attention to three desirable properties of this formulation: first, the indices need not coincide... second, each query is decoded independently... and third, this interface unlocks a suite of downstream applications..." (Method)

**Application**: If your contribution has 2-4 components, enumerate them. Use "First... Second... Third..." or "We draw attention to N properties: first..., second..., and third..." phrasing.

### Pattern 6: Protocol Creation

When no existing benchmark tests your claim, create the evaluation setting and run all baselines yourself. The protocol itself becomes a contribution.

- **Mip-Splatting**: "Contrary to prior work that evaluates models trained on single-scale data at the same scale, we consider an important new setting that involves training on full-resolution images and rendering at various resolutions (i.e., 1x, 1/2, 1/4, and 1/8) to mimic zoom-out effects. In the absence of a public benchmark for this setting, we trained all baseline methods ourselves." (Sec. 6.2)
- **D4RT**: Table 3 uses "Max. Track Count @ Target FPS" (60/24/10/1 FPS) — an unusual, practitioner-relevant efficiency metric. "D4RT is 18-300x faster than others." The metric is designed to be intuitively graspable.

**Application**: If standard metrics don't capture your advantage, design a new evaluation setting or metric. Run all baselines in your new setting. Disclose: "In the absence of a public benchmark for this setting, we trained all baseline methods ourselves."

### Pattern 7: Radical Transparency

Best papers over-share implementation details that other papers hide. This builds trust and enables reproducibility.

- **3DGS**: "All numbers in the table are from our own runs of the author's code for all previous methods, except for those of Mip-NeRF360 on their dataset, in which we copied the numbers from the original publication to avoid confusion about the current SOTA." (Sec. 7.2) — disclosure of number provenance.
- **3DGS**: "The majority (~80%) of our training time is spent in Python code, since we built our solution in PyTorch to allow our method to be easily used by others." (Conclusion) — shares an implementation limitation.
- **3DGS footnote**: "We trained Mip-NeRF360 on a 4-GPU A100 node for 12 hours, equivalent to 48 hours on a single GPU. Note that A100's are faster than A6000 GPUs." — hardware equivalence footnote.
- **Mip-Splatting**: "use a community reimplementation for Zip-NeRF as the code is not available" — discloses non-official baseline.
- **Mip-Splatting**: "totaling 0.3 for a fair comparison with 3DGS and 3DGS + EWA which replaces the dilation of 3DGS with the EWA filter" — filter variance chosen so total matches baseline's dilation, ensuring comparison fairness by design.

**Application**: Disclose: (1) where each number came from (own run vs. original paper), (2) hardware equivalence for cross-hardware comparisons, (3) any community reimplementation used, (4) deliberate fairness adjustments in hyperparameters.

### Pattern 8: Caption-as-Takeaway

Figure and table captions state the conclusion, not just the content. A reader scanning only captions should understand the full argument.

- **3DGS Fig. 1**: "Our method achieves real-time rendering of radiance fields with quality that equals the previous method with the best quality, while only requiring optimization times competitive with the fastest previous methods." — the two-sided win thesis in the caption.
- **Mip-Splatting Table 2**: "While Mip-Splatting yields comparable results at training resolution, it significantly surpasses previous work at all other scales." — conclusion sentence as caption.
- **D4RT Table 3**: "D4RT is 18-300x faster than others." — the headline number in the caption.

**Application**: Write each figure/table caption as: [Content description]. [Key takeaway sentence]. A reviewer who reads only captions should grasp your contribution.

### Pattern 9: Nearest-Neighbor Surgical Separation

Dedicate a passage to distinguishing your work from the single closest prior work. Be surgical, not dismissive.

- **Mip-Splatting**: full paragraph comparing to EWA splatting [59]: "A critical difference to [59] is that we tackle the reconstruction problem, optimizing the 3D Gaussian representation via inverse rendering while EWA splatting only considers the rendering problem." — identifies the precise axis of difference (reconstruction vs. rendering).
- **3DGS**: "Pulsar achieves fast sphere rasterization which inspired our tile-based and sorting renderer. However, given the analysis above, we want to maintain (approximate) conventional alpha-blending on sorted splats... Our rasterization respects visibility order in contrast to their order-independent method. In addition, we back-propagate gradients on all splats in a pixel and rasterize anisotropic splats." — credits inspiration, then lists three precise differentiators.

**Application**: Identify the one work most likely to be confused with yours. Write a passage that: (1) credits what it contributed, (2) states the precise axis of difference, (3) lists 2-3 specific technical differentiators.

### Pattern 10: Honest Boundary Statements

Best papers state what they do NOT achieve and what methods should NOT do. This paradoxically strengthens credibility.

- **Mip-Splatting**: "It's important to remark that rendering at higher resolutions is a super-resolution task, and models should not hallucinate high-frequency details absent from the training data." — states what the method should NOT do.
- **3DGS**: "We achieve comparable quality to InstantNGP and Plenoxels after 5-10m of training, but additional training time allows us to achieve SOTA quality which is not the case for the other fast methods." — admits parity at short training, claims advantage only at longer training.
- **Mip-Splatting Limitations**: "This issue correlates with our experimental findings, where increased zooming out leads to larger errors, as evidenced in Table 2." — limitation quantified with pointer to evidence.

**Application**: Write a Limitations subsection that: (1) names the specific failure mode, (2) quantifies it with a pointer to your own evidence table/figure, (3) suggests a concrete future fix. Never write "our method has limitations" without specifying them.

---

## Section-Specific Patterns

### Title

| Pattern | Example | Principle |
|--------|---------|-----------|
| Method name + "for" + capability | "3D Gaussian Splatting **for** Real-Time Radiance Field Rendering" | Front-load representation innovation + application win |
| Catchy name + colon + problem solved | "Mip-Splatting: **Alias-free** 3D Gaussian Splatting" | Name riffs on lineage; colon-delimited problem statement |
| Natural-language phrase embedding method name | "Efficiently Reconstructing Dynamic Scenes **One D4RT at a Time**" | Memorable; the title itself is quotable |

### Abstract Structure

All three follow: Problem → Gap → "We [verb]" solution → Core mechanism → Results → Impact.

- **3DGS**: Problem (quality requires costly networks) → Gap (no method achieves real-time at 1080p) → "We introduce three key elements" → First/Second/Third mechanism → "We demonstrate state-of-the-art visual quality and real-time rendering"
- **D4RT**: Problem (understanding dynamic scenes is formidable) → "This paper introduces D4RT" → Core innovation (novel querying mechanism that sidesteps two costs) → "The result is a lightweight and highly scalable method" → "sets a new state of the art"
- **Mip-Splatting**: Context (3DGS impressive) → Gap (artifacts when sampling rate changes) → Root cause (lack of 3D frequency constraints + 2D dilation) → Two targeted fixes → "Our evaluation validates the effectiveness"

### Introduction Opening

- **3DGS**: Representation taxonomy opening — "Meshes and points are the most common 3D scene representations because they are explicit... In contrast, recent NeRF methods build on continuous scene representations..." — frames two camps, positions work as synthesis.
- **D4RT**: Rhetorical question opening — "Traditional 3D reconstruction asks: 'What is the geometry of everything, everywhere, all at once?' We argue this exhaustive, rigid approach is fundamentally ill-equipped for a dynamic world." — conceptual reframing, quotable.
- **Mip-Splatting**: Field context → specific method (3DGS) → specific failure ("produces artifacts when camera views diverge") → mechanism analysis (zoom-out → dilation; zoom-in → erosion).

### Contribution Bullets

All three use 3-4 bullets where each bullet names a technical artifact, never an activity:

- **3DGS**: (1) anisotropic 3D Gaussians as representation, (2) optimization with adaptive density control, (3) fast differentiable rendering approach. NOT "we conducted experiments."
- **Mip-Splatting**: (1) 3D smoothing filter, (2) 2D Mip filter, (3) experiments on benchmarks, (4) "principled and simple, requiring only few changes to the original 3DGS code" — adoption-friendliness as contribution.
- **D4RT**: (1) novel method for efficient querying, (2) unified approach unlocking multiple outputs, (3) SOTA experiments, (4) "an efficient algorithm to track all pixels" — application unlock as contribution.

### Method Narrative: "Obvious Approach → Problem → Our Solution"

- **3DGS**: "An obvious approach would be to directly optimize the covariance matrix Sigma to obtain 3D Gaussians... However, covariance matrices have physical meaning only when they are positive semi-definite. For our optimization of all our parameters, we use gradient descent that cannot be easily constrained to produce such valid matrices... As a result, we opted for a more intuitive, yet equivalently expressive representation." — shows the naive option was considered and rejected for a principled reason.

### Experiments Section Opening: Roadmap Sentence

All three begin the experiments section with a roadmap:

- **Mip-Splatting**: "We first present the implementation details of Mip-Splatting. We then assess its performance on the Blender dataset and the challenging Mip-NeRF 360 dataset. Finally, we discuss the limitations of our approach." (Sec. 6)
- **D4RT**: "After inspecting qualitative differences in capability in Sec. 4.1, we proceed with evaluating 4D Reconstruction and Tracking performance in Sec. 4.2... We then continue with pure reconstruction tasks in Sec. 4.3... We conclude with a set of key ablations in Sec. 4.4." (Sec. 4)

### Ablation: Named Subsections with "What We Disable" Narrative

- **3DGS**: Each ablation has a named subsection ("Initialization from SfM", "Densification", "Isotropic Covariance", "Spherical Harmonics") with "We disable [component] and optimize using the rest of the settings" narrative. Results in Table 3 with per-scene breakdown.
- **Mip-Splatting**: Named ablations ("Effectiveness of the 3D Smoothing Filter", "Effectiveness of the 2D Mip Filter", "Single-scale Training and Multi-scale Testing") — each isolates one filter.

### Conclusion: Challenge Conventional Wisdom

- **3DGS**: "Our work demonstrates that — contrary to widely accepted opinion — a continuous representation is not strictly necessary to allow fast and high-quality radiance field training." — the memorable claim that challenges the field's assumption.
- **D4RT**: "We propose shifting the paradigm from fragmented, frame-level decoding to efficient, on-demand querying." — the paradigm shift stated as a sentence.

---

## Quick Reference: Pattern-to-Section Matrix

| Pattern | Title | Abstract | Intro | Method | Experiments | Conclusion |
|---------|-------|----------|-------|--------|------------|------------|
| Two-sided win thesis | | Primary | Primary | | Setup framing | Restate |
| Diagnose before cure | | Primary | Primary | | | |
| The "sidestep" move | | Primary | Primary | Primary | | |
| Theory import | | | | Primary | | |
| Numbered enumerations | | Primary | Primary | Primary | | |
| Protocol creation | | | | | Primary | |
| Radical transparency | | | | | Primary | Primary |
| Caption-as-takeaway | | | | | Primary | |
| Nearest-neighbor separation | | | Primary | Primary | | |
| Honest boundary statements | | | | | Primary | Primary |