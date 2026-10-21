# Research procedures — evidence before presentation

Reviewed 2026-10-21. These are planning aids, not laws inferred from successful
papers. The case indexes link to primary papers; any numerical or structural claim
about a specific paper still needs its exact source location.

## A. Question and contribution

Use whichever entry point fits the problem:

- A measured failure or unmet need with a defined user, task and consequence.
- A competing explanation that can be distinguished experimentally.
- A limitation of an existing representation, method or protocol.
- A combination or transfer whose benefit has a plausible mechanism and a real test.
- A missing dataset, evaluation, replication or negative result that would resolve
  uncertainty rather than merely add another leaderboard entry.

Record the nearest work, search queries/date/coverage, what changes, what remains
the same, and an observation that would make the contribution unconvincing. A
catalog miss is a search limitation, not proof of a gap.

Contributions can concern representations, mechanisms, learning, measurement,
datasets, evaluation, reliability or systems. Do not order these categories by
presumed scientific value. Evaluate importance, evidence, generality and cost in
the context of the actual question.

## B. Argument and structure

Choose an organization that makes the question, method, evidence and limits easy
to assess. Five-section, system-paper and capability-matrix outlines are optional
starting points. Follow the target venue's actual template where one exists.

Build a many-to-many claim–evidence map. A result may inform more than one claim;
several experiments may jointly test one claim. Keep scientifically relevant
negative results even if they complicate the narrative. Do not delete experiments
solely to force a one-to-one story.

Explain a proposed mechanism as a hypothesis until evidence supports it. An
engineering adjustment should be described at its actual scope; giving it a new
name does not establish a mechanism or create novelty. Write mathematical
equivalence only under stated assumptions; similar rendering/compositing
formulations are not an unconditional equivalence proof.

Maintain a symbol table and define approximations, objective terms, units and
boundary cases. Put definitions where the reader needs them, not in a fixed
section dictated by an exemplar.

## C. Experiment planning patterns

Choose patterns that answer the claims; these are not a mandatory experiment quota.

| Pattern | Purpose | Essential control or limitation |
|---|---|---|
| C1 Component ablation | Estimate a component's contribution | State retraining versus test-time removal; the two answer different questions |
| C2 Parameter sensitivity | Understand robustness to a parameter | Prespecify a useful range and distinguish tuning from held-out evaluation |
| C3 Matched baseline | Test a specific improvement | Match relevant data, metric and budget or disclose the mismatch |
| C4 Quality–resource trade-off | Test efficiency claims | Measure relevant time, memory, storage or energy with quality and settings |
| C5 Failure analysis | Characterize when a method fails | Define selection and denominators; no arbitrary minimum case count |
| C6 Generalization | Test transfer beyond training conditions | Prevent leakage and describe the shift and sampling frame |
| C7 Scaling | Assess behavior as resources change | Isolate the resource changed; account for repeated tuning |
| C8 Replication | Check whether a reported effect persists | Record deviations from the reference implementation and protocol |
| C9 Human evaluation | Assess a claim requiring human judgment | Define consent, sampling, blinding, task, rubric and uncertainty as applicable |
| C10 Robustness | Test meaningful perturbations | Preserve an appropriate reference; avoid only favorable corruptions |
| C11 System comparison | Compare complete user-facing pipelines | Disclose all changed components, priors, data and compute |
| C12 Mechanism test | Distinguish explanatory hypotheses | Include rival explanations and a disconfirming observation |
| C13 Geometry evaluation | Test geometric accuracy | Match alignment, scale, visibility and ground-truth assumptions |
| C14 Dynamic evaluation | Test motion and temporal behavior | Account for temporal dependence and leakage across frames |
| C15 Compression evaluation | Measure rate–quality behavior | Define stored content, decoder, bitrate/storage units and decoding costs |
| C16 Reproducibility | Enable an independent rerun | Versions, seeds, configs, preprocessing, scripts and artifact identifiers |

For a component comparison, fix confounders relevant to that component. If the
claim is improvement from a different prior or training source, that change is an
experimental factor to report and test, not a forbidden difference. Multiple
metrics can appear in one table if the protocol for each is clear.

Decide the independent unit before estimating uncertainty. Multiple views of one
scene or episodes from a shared trained policy are not automatically independent
training replicates. Choose repeats and precision goals with a design-appropriate
power/sensitivity analysis where practical. Do not impose 3/5 seeds or 100 cases
as universal publication requirements.

## D. Critical review

Ask only applicable questions, and record not-applicable reasons:

1. Are the claimed distinctions supported relative to the closest work?
2. Are assumptions and overlaps with prior work disclosed?
3. Is the comparison appropriate to the specific claim?
4. Could measurement choices hide relevant failures or trade-offs?
5. Are efficiency and resource claims measured under stated conditions?
6. Are benefits supported beyond favorable examples?
7. Do ablations distinguish mechanism from confounding or implementation changes?
8. Are negative results, uncertainty and limitations represented fairly?

An unanswered question is a review prompt, not automatically a paper defect.
Locate the evidence before assigning severity. Revise an objection when rebuttal
evidence warrants it. Concession frequency is not a scientific quality metric.

## E. Communication and reuse

Make claims easy to inspect, choose informative figures and include reproducible
assets when possible. Explain the audience and practical trade-offs. Do not infer
that naming, citation volume, a particular venue, or releasing a dataset caused a
paper's impact. Avoid promises of acceptance, citations or community adoption.

## F. Lightweight handoff

For a focused question, answer it directly with evidence and one concrete next
step. For a full project, maintain a concise ledger of question, claims, sources,
checks, experimental decisions and unresolved items. Persist it only when useful
or requested. Role labels and pattern IDs are optional navigation aids.
