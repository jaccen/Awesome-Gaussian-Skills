
---
# Title, Abstract & Introduction Templates

## Title

The title is the paper's first impression and largely determines whether editors/reviewers read further. Do NOT just state "what you did" (object + operation). Lead with research value.

Core logic: **innovation core + achieved breakthrough + field value**. Tell the reader what change your work brings.

Bad examples (too flat, no value):
- "Preparation and Performance Study of [Material]"
- "3D Gaussian Splatting with [Component]"

Good pattern:
```
[Strategy]: achieving [large performance gain], providing new insights for [application scenario]
```
Example: "[Modification strategy]: achieves substantial improvement in [metric], offering a new avenue for [application]"

Title checklist:
1. Lead with the highlight (core improvement / effect), not generic subjects
2. Avoid vague, generic phrasings; front-load your selling point
3. One glance should reveal: object, method/means, improvement achieved, application value
4. Keep concise; do not pile up jargon nouns

## Abstract

Structure: Problem → Gap → Our method (one sentence) → Core mechanism (1-2 sentences) → Results with numbers → Broader impact.

- Word count: CVPR/ICCV 150-250 words; SIGGRAPH 200-300 words; PhD thesis 500-800 characters
- Prohibitions: undefined abbreviations, citations, subjects other than "we"
- Must include: method name, core metric values, baseline comparison

English template:
```
[Problem context, 1 sentence]
[Specific gap/limitation, 1-2 sentences]
[Our approach name and core idea, 1-2 sentences]
[Key technical mechanism, 1 sentence]
[Main results with numbers, 1-2 sentences]
[Broader impact or implication, 1 sentence]
```

### Abstract Closed-Loop Logic (anti-summary mindset)

An abstract is NOT a compressed restatement of the whole paper — it is an independent micro-story. A reviewer must understand your complete work without reading the body. Follow this closed loop:

1. Briefly state field importance (1 sentence)
2. Raise the current pain point / existing shortcoming
3. State the research approach this paper adopts to target it
4. Show key experimental results with quantitative data
5. Distill the academic and application value of this work

Anti-pattern: opening with a long industry history or generic background, which buries the point and loses the reviewer within a few lines.

### Transition-Word Rhythm Trick

Use contrast/transition connectives (however, but, 然而, 但是, 为此, thereby, to this end) to create reading rhythm and clearly segment background → contradiction → solution → result. This lets reviewers quickly locate your innovation focus and avoids a flat, monotonous block of prose. Memorize: the abstract is the hook of the whole paper, not a content replay.

## Introduction

Standard structure (applies to all target venues):

1. **Field background + established paradigm** (1 paragraph)
2. **Prior work classification + shared limitations** (1-2 paragraphs)
3. **This paper's motivation: derive research question from limitations** (1 paragraph)
4. **Method overview: core idea + 2-3 key designs** (1 paragraph)
5. **Experiment summary: key metrics + advantages** (1 paragraph)

English template:
```
Paragraph 1: Problem context and importance
Paragraph 2: Existing approaches and their limitations
Paragraph 3: Our insight and high-level approach
Paragraph 4: Technical summary (what we actually do)
Paragraph 5: Contributions (bulleted, 3-4 items)
```

### Introduction Prohibitions

- No math formulas in introduction (at most one core formula for intuitive illustration)
- No experimental details in introduction (specific numbers go to experiments section)
- Avoid generic optimistic endings ("We believe this work will advance the field")
- Do NOT only list prior literature without carving out a clear research gap; if a reviewer doubts "existing work is already good, what is your significance?", the paper is set for major revision

### Four-Step Funneling Logic ("Why this work must be done")

The introduction must ultimately answer: why is this work non-negotiable? Use this progressive funnel:

1. **Step 1 — Real field problem**: Raise a real domain difficulty to prove the direction itself is research-worthy and set the big background
2. **Step 2 — Prior achievements**: Sort existing works and objectively acknowledge their progress; do NOT wholesale-dismiss predecessors
3. **Step 3 — Precise limitation**: Pinpoint the limitation that still remains in current approaches, and dig out the gap in fine-grained sub-scenarios that has not yet been filled
4. **Step 4 — Introduce this work**: Naturally bring in your work — it happens to target that pain point and provides the corresponding solution

The whole introduction narrows progressively from grand domain → specific scientific problem → your research, so the reviewer genuinely accepts: the gap is real, and this work is necessary. This layers down step by step rather than staying flat.

### Contribution Statement Template

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