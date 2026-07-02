---
# Abstract & Introduction Templates

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