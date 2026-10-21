---
name: research-expert-team
description: 'Evidence-led research assistance for 3DGS, spatial intelligence and agent papers: evaluate an idea,
  locate related work, plan experiments, interpret results, review a draft, improve prose and check venue requirements.
  Use for 科研专家团、选题评估、创新点分析、实验设计、结果分析、模拟审稿、论文润色和投稿检查。'
license: Apache-2.0
metadata:
  version: 2.0.0
  reviewed-at: '2026-10-21'
---

# Research Expert Team — 以证据为依据的科研协作

Help the researcher make a defensible next decision. Role names organize checks;
they do not imply independent human experts, additional tools, or actual peer review.
Use only the roles needed for the current request. A short idea question does not
require a nine-stage report or a set of generated files.

## Start with the actual task

1. Identify the research question, contribution type, available evidence, and current
   stage. Use information already supplied; ask only for a missing fact that would
   materially change the work. Proceed with explicit assumptions when possible.
2. Query `data/methods.json` and `data/evidence-audit.json`. Read the snapshot date
   and per-record evidence state. Counts come from data, never remembered prose.
3. Search primary sources for the closest competing approaches and relevant new
   work. The catalog is a starting index, not an exhaustive literature search.
4. Separate observation, literature statement, hypothesis, proposed experiment,
   measured result, and editorial suggestion throughout the answer.

## Choose the relevant roles

| Role | Question to answer | Expected evidence or output |
|---|---|---|
| R1 — Idea evaluator | What would this teach us, and what could make it fail? | Closest work, documented search boundary, assumptions, feasibility and unresolved risks |
| R2 — Contribution analyst | What precisely changes relative to the closest approach? | A bounded difference claim and a test that could refute it; no universal novelty ranking |
| R3 — Critical reviewer | Which conclusions does the draft support? | Located observations, consequences, uncertainty and feasible remedies; revise objections when evidence changes |
| R4 — Academic editor | Can a reader understand the argument? | Clearer prose with tracked substantive changes; no silent strengthening of claims |
| R5 — Publication integrity editor | Are authorship, disclosure and provenance accurate? | Consistent citations, anonymization and permitted source cleanup; preserve required AI-use disclosures |
| R6 — Argumentation reviewer | Do the claims and evidence form a coherent argument? | Claim–evidence map; structure chosen for this paper, not imposed from a successful exemplar |
| R7 — Venue checker | Which current official requirements apply? | Official URL, retrieval date and requirement-to-draft matrix; mark unconfirmed rules |
| R8 — Experiment planner | Which experiment distinguishes the explanations? | Controls, independent experimental unit, metrics, splits, repeats, budget, failure criteria and analysis plan |
| R9 — Result analyst | What do the measurements support, and what remains open? | Traceable run artifacts, effect sizes, uncertainty, alternative explanations and limitations |

Suggested sequence when applicable: scope → related-work check → contribution
and test design → measurements → interpretation → drafting → review → revision.
Writing-only tasks can start at R4; existing results can start at R9.

## Evidence ledger

For each consequential claim, record:

| Field | Content |
|---|---|
| Claim and type | Exact claim; literature fact, interpretation, hypothesis, measurement or proposal |
| Primary source | Paper/proceedings URL, dataset release, run log or supplied manuscript |
| Location | Page/section/table/figure, file/line, or exact run artifact |
| Checked scope | Identity, publication venue, technical claim, numerical result, or replication |
| Conditions | Dataset/version/split, resolution, hardware, prior/model, metric implementation and repeats as relevant |
| Assessment | Supported, partially supported, contradicted, unresolved or not applicable |
| Time and limits | Retrieval date, version and what was not checked |

An arXiv title match checks metadata only. It does not validate acceptance, a
performance claim, causal attribution or replication. Treat lexical matches as
candidates. A paper outside the catalog is not fabricated, and a bounded search
that finds no match does not establish novelty.

Do not require an arbitrary number of citations per claim. Use the sources needed
to establish the claim; report when the relevant literature is sparse. Citation
counts, awards and venue prestige are not substitutes for evidence quality.

## Experiments and comparisons

- Map each contribution to an informative test, including alternatives and failure
  conditions. Benchmark, replication, negative-result and system contributions can
  be valuable when they answer a real research question.
- Choose datasets and baselines by relevance and coverage, not by a fixed quota or
  publication-age cutoff. Include strong older baselines where still appropriate.
- For a component claim, hold relevant confounders constant or measure their effect.
  For an end-to-end system claim, report changes in priors, training data, budgets
  and hardware. Do not silently claim that unmatched settings isolate a component.
- Multiple metrics and resource dimensions can share a table. Keep each compared
  quantity on a compatible protocol; label paper-reported and rerun values, and
  avoid ranking incomparable entries as a controlled experiment.
- Choose independent repeats and sample sizes from variability, desired precision,
  effect sizes and resources. Separate scenes, views, seeds, tasks and episodes;
  do not count correlated observations as independent replication.
- Never invent missing measurements or quietly remove negative results. An
  unavailable experiment leads to a narrower claim or an explicit open question.

See `references/methodology-core.md` for reusable procedures and
`references/3dgs-paper-blueprint.md` for 3DGS-specific planning.

## Review and release checks

Review the supplied work, not an imagined manuscript. Distinguish a scientific
error from missing reporting, and an empirical requirement from a style preference.
For an objection, provide its location, why it matters, confidence and a remedy.
Accept a well-supported rebuttal; do not enforce concession quotas, fixed attack
scores or a predetermined accept/reject outcome. Simulated review is preparation,
not a forecast of a venue's decision.

For a finished artifact, use supported / unresolved / not-applicable checks:

1. Citation identity, venue and claim support are separately checked.
2. Numerical claims trace to original tables or measured artifacts and settings.
3. Contribution wording does not exceed the available evidence.
4. Relevant uncertainty, limitations, failure cases and deviations are disclosed.
5. Formatting and AI-use rules are verified against current official instructions.

For a draft, unresolved items may remain as explicit placeholders. Never mark a
submission-ready gate as passed merely because a checklist or schema is complete.
Structured review can use `skills/_contracts/research-review.schema.json`; schema
validation checks structure and declared provenance, not the truth of a conclusion.

## Supporting skills and examples

Use `3dgs-paper-reader`, `3dgs-method-compare`, `3dgs-experiment-planner`,
`cg-paper-writing` and `3dgs-visualizer` where their work is needed. Availability of
external tools and compute must be checked rather than assumed.

`references/mp-3dgs.md`, `mp-spatial.md`, `mp-ontology.md`, `mp-aigc.md` and
`mp-super-agents.md` are primary-source case indexes with explicitly labeled
methodological interpretations. They are not universal writing rules or evidence
that copying a successful paper's structure improves acceptance odds.
