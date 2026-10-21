# A 3DGS paper plan — adapt it to the evidence

Reviewed 2026-10-21. This is an optional planning scaffold, not a required
five-section format, a way to turn tuning into novelty, or an acceptance formula.

## Scope the contribution

State the actual task, input/output representations, intended users and measured
failure or limitation. Compare against the closest approach under a documented
search boundary. Distinguish a representation, an optimization change, a systems
improvement, an evaluation contribution and an application study without ranking
these types universally.

## Organize an inspectable argument

| Part | Reader's question | Evidence to prepare |
|---|---|---|
| Motivation | What is the scoped problem and why does it matter? | Primary sources or measured failures with conditions |
| Related work | What is the closest alternative and what changes? | Located comparisons; avoid unsupported "first" or "never" claims |
| Method | What is implemented and under which assumptions? | Definitions, equations, approximations, algorithm and implementation |
| Evaluation | Does the change explain the measured benefit? | Appropriate controls, quality/resource measurements and uncertainty |
| Limits | When does the conclusion fail or remain untested? | Negative outcomes, missing comparisons, domain shifts and resource limits |

The venue may require a different structure. Place definitions where useful and
keep a consistent symbol table for Gaussian parameters, cameras, compositing,
losses and units.

## 3DGS-specific checks

- State which representation is actually used: 3D/2D Gaussians, surfels, hybrids,
  or a learned latent. Similar names do not imply interchangeable models.
- Distinguish preprocessing, initialization, optimization, density control,
  training-time regularization and inference-time changes.
- For rendering, state dataset/version/split, resolution, preprocessing and metric
  implementation. Specify camera and depth/alignment assumptions where relevant.
- For efficiency, identify the measured operation and hardware. Show relevant
  quality–resource trade-offs; distinguish GPU timing from end-to-end latency.
- For compression, state what is stored and what decoding costs; do not compare
  files with different included components without explaining them.
- For geometry and dynamics, choose suitable ground truth and account for scale,
  alignment, visibility, temporal dependence and sequence-level failures.
- For generation, disclose priors, training data, prompts and evaluation models.
  Match relevant factors for a component claim; disclose changes for system claims.
- For repeated experiments, distinguish scenes/views from independent runs.
  Choose repeats from the uncertainty needed and available resources, not quotas.

## Claims and revision

Write an engineering change at its actual scope. A mechanism is a hypothesis until
an appropriate experiment distinguishes it from alternatives; giving a threshold
or heuristic a new name does not establish novelty. Link each consequential claim
to a paper location or a measured artifact. Keep missing results as placeholders.

Use `methodology-core.md` for experiment choices, `mp-3dgs.md` for primary-source
case indexes, and `cg-paper-writing` for drafting and official venue checks.
