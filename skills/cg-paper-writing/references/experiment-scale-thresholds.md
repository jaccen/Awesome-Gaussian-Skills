# Experiment sufficiency — plan evidence, not quotas

Reviewed 2026-10-21. No universal number of datasets, baselines, seeds, tasks or
episodes guarantees an adequate paper. The previous numerical "lower bounds"
were not backed by a systematic sample and must not be treated as venue rules.

## Decide what the experiment must establish

For each claim, record the target population/task, independent experimental unit,
comparison, estimand/metric, important alternatives, desired precision, expected
variability, resource budget and stopping rule. Decide what outcome would weaken
the claim before running the held-out evaluation.

| Area | Choose coverage from | Report when relevant |
|---|---|---|
| 3DGS rendering | Scene scale, texture, view coverage, motion and calibration conditions | Quality metrics and implementations; resolution; hardware; training/rendering time; memory, stored content and Gaussian count |
| Compression | Intended bitrate/storage range and target decoder | Rate–distortion curves, decoder costs, preprocessing and whether optimizer/state/metadata are included |
| SLAM and geometry | Motion, camera/depth setup, alignment and failure conditions | Tracking/reconstruction errors, scale/alignment protocol, sequence failures and map resource use |
| Embodied tasks | Task variation, objects, environment shift and deployment claim | Success definition and denominators; trained-policy repeats versus evaluation episodes; resets, latency and interventions |
| Spatial reasoning | The type of spatial question and data split | Accuracy or geometry errors appropriate to the task; leakage controls; scene generalization and representation ablations |
| LLM agents | Claimed capability and supported tool/environment scope | Model/version/date, prompts, decoding, budgets, calls/tokens, failures and cost/latency measurements |

Choose baselines by proximity, strength, reproducibility and availability. A
baseline is not obsolete merely because it is older than six months. Report an
unavailable comparison and its implications rather than fabricate a rerun.

## Replication and uncertainty

- Distinguish datasets, scenes, frames, independent trained models, seeds, tasks
  and episodes. Describe dependencies and avoid pseudoreplication.
- Use pilot variability, sensitivity or power analysis to plan repetitions where
  suitable. If resources constrain repetition, state the limitation and narrow
  claims; a fixed three-seed convention does not ensure useful precision.
- Report effect sizes and uncertainty appropriate to the sampling unit. Explain
  whether intervals describe variation across scenes, runs or evaluation samples.
- Keep tuning, validation and held-out testing separate. Document deviations from
  the planned analysis and all relevant negative outcomes.

## Context from published papers

Relevant accepted papers can reveal conventions and useful evaluation choices.
Record their selection criteria, publication dates and exact experiment locations.
Do not use the median dataset count of a convenience sample as a statistical
sample-size requirement. Official requirements must come from the current venue.

## Sufficiency checklist

1. Does each important claim have a suitable test or explicit unresolved status?
2. Could a plausible alternative explanation produce the same apparent result?
3. Are settings comparable for the quantity being compared?
4. Are numerical results traceable to logs/tables and metric implementations?
5. Does reported uncertainty match the independent experimental unit?
6. Are relevant limitations and failure conditions visible?
7. Is the claim narrower than, or equal to, the scope of the evidence?

For a draft, unanswered items guide next work; they are not automatic rejection
rules. For a submission, resolve them or explicitly limit the claim.

Use `3dgs-experiment-planner` for domain planning, and `experimental-design` or
`statistical-power` when installed for the corresponding design calculations.
