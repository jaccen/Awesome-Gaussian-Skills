# 3DGS / CG evidence and mock review

Load for methods, experiments, novelty assessment and full-paper review. These are research checks, not an acceptance formula.

## From artifacts to prose

Maintain a compact ledger: claim and scope; source with page/table or run/config/checkpoint/commit location; protocol and assumptions; supported/unresolved/not-applicable status; next action. Distinguish measurements, citations, mathematical deductions and hypotheses. Draft a claim outline, then prose. On revision check numerical values, notation, qualifiers and citation/figure references. Return the requested text plus material evidence gaps; focused edits do not need an entire review pipeline.

Search the closest problem formulations and alternative representations, not just similarly named GS methods. Record date and search limitations. Catalog membership proves neither novelty nor claim support. Avoid unqualified “first” claims.

## Representation and mechanism

- For 3DGS, define coordinate frames, projection approximation, covariance parameterization/positive definiteness, opacity activation, view-dependent appearance and compositing/sorting assumptions where relevant. Distinguish screen-space footprint from world-space scale, opacity from density, and alpha compositing from an exact volumetric integral.
- Specify learned/fixed variables, training/inference differences, densification/pruning, gradient paths and additional supervision. Tie equations to operations; distinguish implementation heuristics from proofs.
- Rendering quality does not establish surface accuracy. Geometry claims need depth/normal extraction, opacity thresholds, mesh extraction, alignment, masks and ground-truth coverage.
- Dynamic GS needs canonical/world/time frames, temporal splits, camera/motion ambiguity and test-time optimization disclosure. Relighting claims must distinguish appearance changes from identified lighting/material decomposition.
- CAD/shape claims need the relevant topology, watertightness or geometric validity checks; plausible renders do not establish editable B-rep validity. SLAM claims need tracking failure rates, SE(3)/Sim(3) alignment, scale and loop-closure settings.

## Comparable experiments

- Record dataset release, evaluated scenes, calibration, split, resolution, masks, background, color/exposure processing and metric code/version. PSNR aggregation and SSIM/LPIPS implementations affect comparisons. Dataset totals are not the evaluated subset.
- Select baselines by claim and contribution type. Separate reruns and published numbers with their settings; exclude incompatible numbers from direct ranking. Use controlled ablations for component attribution and disclosed end-to-end comparisons for system claims.
- For pretrained/feed-forward systems, report training data, overlap checks, external priors and test-time adaptation. Sparse-view experiments must fix view count/selection and avoid test-view tuning.
- Speed claims need hardware, precision, resolution, batch, warm-up, synchronization, timing scope (rasterizer/full pipeline), repeated timings and memory measurement. Report speed/quality tradeoffs. Compression needs serialized bytes including codebooks/decoders, decoding cost and rate-distortion comparisons.
- Identify independent units (scenes/subjects) before uncertainty analysis. Repeated frames from a scene are not independent scenes. Separate seed variation and scene variation. Choose paired tests, cluster bootstrap or descriptive intervals according to design; report effect sizes and assumptions. No universal p-value requirement applies.
- Separate pilot development from held-out evaluation. Freeze selection rules before final testing; disclose excluded scenes, failed runs and negative results. Never select scenes or seeds because a desired gain appears.

## Evidence-led mock review

Use domain researcher (mechanism/closest work), methods reviewer (design/statistics/reproducibility), and venue editor (scope/contribution/readability) perspectives as appropriate. These are simulated lenses; multiple agents do not constitute independent human review.

Each finding needs location, observation, evidence, consequence, uncertainty and feasible remedy. Distinguish central scientific defects from missing reporting or inapplicable checks. Report strengths. Withdraw disproved findings; absence of evidence alone does not establish fabrication.

Prioritize by consequence and effort. Arbitrary self-scores, venue-rank mappings, citation counts, stars, concession rates and debate quotas are not validated acceptance predictors. Dataset, analysis and system contributions need not invent an architecture.

## Maintenance scenarios

| Input | Observable expected behavior |
|---|---|
| Abstract without measurements | Bounded draft with missing data marked; no invented gains |
| FPS at different resolutions | Flag mismatch before ranking |
| PSNR gain claimed as mesh improvement | Require geometry evidence or narrow claim |
| Small repeated-frame sample | Recognize dependency; no automatic t-test |
| Objection refuted by logs | Correct or withdraw finding |
| Unspecified Nature-family journal | Leave journal-specific requirements unresolved |
| Confidential official CVPR 2026 review | Apply venue AI prohibition; do not generate review |
