# Evidence-led review, citation checks and revision

Reviewed 2026-10-21. Simulated review is a structured self-check, not independent
human peer review or a forecast of acceptance.

## Review workflow

Scope the requested review. Read the actual manuscript and relevant artifacts.
Separate scientific validity, missing reporting, presentation and venue compliance.
Use multiple perspectives where useful; do not imply that named roles are
independent reviewers. Focused editing need not trigger an entire review pipeline.

For each finding, provide a location, observation, consequence, evidence,
uncertainty and feasible remedy. Classify it as supported, unresolved or not
applicable before assigning severity. A question without evidence of a problem is
a request for clarification, not a confirmed defect.

When a rebuttal supplies better evidence, revise or withdraw the finding. Do not
limit concessions, score rebuttals with arbitrary cutoffs, or preserve an attack
to appear adversarial. Repeated agreement is not by itself evidence of sycophancy.

For apparently conflicting results, compare protocols, samples, interventions,
training/retraining, inference conditions and uncertainty. Retain relevant results
and distinguish an explanatory hypothesis from a demonstrated mechanism. Do not
discard one result merely because the other tells a cleaner story.

## Citation verification has separate scopes

1. **Identity:** resolve the primary record and match title, authors and identifier.
   Catalog membership and lexical title overlap are only candidate checks.
2. **Claim support:** locate the specific passage, equation, table, figure or code
   supporting the statement. Retain qualifiers and experimental conditions.
3. **Publication and current context:** check current official proceedings or
   publisher records where venue status matters. Recent publication alone does not
   make a baseline stronger; an older foundational source is not an invalid citation.

An unavailable network request is unresolved, not evidence that a paper is fake.
Absence from `data/methods.json` is not evidence of nonexistence. Cached records
without retrieval timestamps cannot establish a current check.

The local `scripts/audit_manuscript_citations.py` checks metadata and returns
nonzero for unresolved cases. It cannot certify claim faithfulness, venues or
experimental results. `scripts/check_reference_freshness.py` flags review needs;
paper age does not prove obsolescence.

## Claim–evidence and numerical checks

- Map each consequential claim to a located primary source or measured artifact.
- Record dataset/version/split, resolution, metric implementation, preprocessing,
  hardware, model/prior, training budget and repeats when relevant.
- Controlled component comparisons should isolate relevant factors. End-to-end
  comparisons may change components if those changes are disclosed and the claim
  remains about the complete system.
- Multiple quality and resource dimensions can share a table. Keep the settings
  of each compared quantity explicit, and label paper-reported versus rerun values.
- Mark missing numbers as `DATA_NEEDED`; never infer measurements from an abstract,
  an expected trend or the appearance of a figure.

## Release status

For drafts, maintain supported / unresolved / not-applicable items and prioritize
the next evidence needed. For a submission-ready artifact, verify applicable
citation scopes, numerical provenance, claim limits, reproducibility, formatting,
anonymization and required AI-use disclosures. Do not force an artificial PASS if
necessary evidence is unavailable. A schema or checklist validates structure only.

`scripts/check_paper_consistency.py` supplies limited lexical label/reference
checks on explicitly supplied files. It does not expand TeX macros, follow all
inputs, validate bibliography or compile layout. Use the manual checklist in
`latex-source-hygiene.md` and actual compilation diagnostics for those checks.

## Style and persistence

Adapt to the user's writing samples and the venue's conventions. Sentence counts,
transition words, parallel lists or particular phrases are not reliable authorship
detectors. Improve clarity and precision without disguising authorship or changing
technical meaning. Preserve required disclosures and relevant provenance.

Persist a concise claim/source/review ledger when helpful for a long project.
Recheck time-sensitive publication and policy facts before submission; a prior
PASS does not make a source permanently verified. Do not load unrelated project
materials simply because they share a `.paper-context` directory.
