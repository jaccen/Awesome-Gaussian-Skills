---
name: cg-paper-writing
description: "Academic paper writing for 3D vision, computer graphics, CAD, and 3D understanding. Covers NeRF, 3DGS, SLAM, point cloud, 3D shape, CAD modeling. Supports CVPR/ICCV/ECCV/SIGGRAPH venues. Multi-agent adversarial review, citation integrity gates, style calibration. Use when: writing or revising a CG/3D vision paper, drafting abstract/intro/method/experiments, running adversarial review or citation integrity check, calibrating writing style to a venue, 写论文/写paper/论文写作/CG论文/三维视觉论文."
license: Apache-2.0
metadata:
  version: "3.0.0"
  author: jaccen
  tags: ["paper-writing", "academic", "computer-graphics", "3dgs", "nerf", "computer-vision", "cvpr", "siggraph", "adversarial-review", "citation-integrity", "style-calibration"]
  when_to_use:
    - "Write or revise a CG/3D vision academic paper"
    - "Draft abstract, introduction, related work, method, or experiments for a 3DGS/NeRF/CAD paper"
    - "Run adversarial review or citation integrity check on a draft"
    - "Calibrate writing style to a target venue"
    - "写论文 / 写paper / 论文写作 / CG论文 / 三维视觉论文"
---

# CG Paper Writing Engine (Router)

> **Architecture**: Axis-driven static/dynamic router. Do NOT try to apply the writing logic from memory or from this router alone. Always load fragments from disk as described below.

## Step 1 — Detect Request Axes

Analyze the user's request to determine axis values:

### Axis: section
| User Intent | section value |
|-------------|--------------|
| Writing or revising abstract | abstract |
| Writing or revising introduction | intro |
| Writing or revising related work | related-work |
| Writing or revising methodology | method |
| Writing or revising experiments | experiments |
| Writing contribution statements | contribution |
| Full paper or unspecified section | all |

### Axis: venue
| User Intent | venue value |
|-------------|-------------|
| Targeting CVPR/ICCV/ECCV | cvpr |
| Targeting SIGGRAPH/EG/PG | siggraph |
| Targeting NeurIPS/AAAI | neurips |
| Targeting TVCG/CGF/TOG/TPAMI | tvcg |
| Writing PhD thesis chapter | thesis |
| Unspecified or multi-venue | all |

If the user does not specify, defaults are: section=all, venue=all.

## Step 2 — Load Required Fragments

### Always Load (every invocation)
Read these files from static/:
- static/core-stance.md — Role, writing process, de-AI rules, citation fact-check, guardrails
- static/symbols-terminology.md — Mathematical symbols, CG/CAD/3D terminology reference

### On-Demand Load (by detected section)
| section | Fragment(s) to Load |
|---------|-------------------|
| abstract | static/writing-abstract-intro.md |
| intro | static/writing-abstract-intro.md |
| related-work | static/writing-related-method.md |
| method | static/writing-related-method.md |
| experiments | static/writing-experiments.md |
| contribution | static/writing-experiments.md |
| all | All writing fragments (abstract-intro, related-method, experiments) |

### On-Demand Load (by detected venue)
| venue | Fragment to Load |
|-------|-----------------|
| any non-all value | static/venue-formats.md |
| all | static/venue-formats.md |

### Reference Load (for review/integrity work)
- static/review-integrity.md — Multi-agent review, Devil's Advocate Protocol, citation verification, integrity gates, style calibration, writing quality check, persistence

**Optimization**: For a focused task (e.g., "write abstract"), load only core-stance + symbols-terminology + writing-abstract-intro + venue-formats (if venue specified). For full paper work, load all fragments.

## Step 3 — Execute Writing Task

After loading the required fragments:

1. Follow section-specific templates from the loaded writing fragment
2. Apply venue-specific formatting from venue-formats.md
3. Use terminology and symbols from symbols-terminology.md
4. Observe all guardrails from core-stance.md (no fabrication, de-AI rules, citation fact-check)
5. For review/integrity work, follow protocols from review-integrity.md

## Rules

1. **Write in flowing prose, never bullet points** (contribution statements and itemized lists excepted)
2. **Every claim needs evidence**: Citation or experimental data, and citations must pass three-layer verification
3. **Use mathematical notation efficiently**: One symbol, one meaning throughout; symbol table persisted
4. **Match the venue's tone**: CVPR more concise; SIGGRAPH more narrative; if style sample provided, strictly calibrate
5. **Chinese academic writing**: Follow Chinese academic conventions (本文/我们/由此/表明)
6. **Never fabricate data**: Mark missing data as `<!-- DATA_NEEDED: <description> -->`
7. **Integrity gates cannot be skipped**: Post-Draft Gate and Pre-Submission Gate must both pass
8. **Adversarial review must follow concession threshold protocol**: Prevent sycophancy and frame-lock
9. **Claim-citation alignment**: Each claim must be traceable to supporting citation, and citation must actually support the claim
10. **Writing context persistence**: Maintain symbol, citation, review state consistency across sessions

## Red Lines

The following are categorical prohibitions. Violating any of these invalidates the output:

- **No invented data**: Never fabricate experimental results, method capabilities, or review outcomes. If a value is not found in the loaded files, write "data not available" or "N/A".
- **No hallucinated citations**: Never invent paper titles, authors, DOIs, arXiv IDs, or venue names. Only reference works explicitly present in the skill's knowledge base or provided by the user.
- **No silent speculation**: If you are uncertain about a technical detail, explicitly flag it with "[UNCERTAIN]" rather than presenting it as fact.
- **No method misattribution**: Do not assign features, results, or mechanisms from one method to another. Each method's data is specific to that method.
- **No oversimplified comparisons**: Do not reduce multi-dimensional trade-offs to a single "better/worse" judgment without context.

## Cross-Skill Routing

This skill focuses on paper writing. For related workflows:
- **Method comparison** → 3dgs-method-compare (for positioning and related work tables)
- **Paper reading/analysis** → 3dgs-paper-reader (for understanding related work in depth)
- **Experiment design** → 3dgs-experiment-planner (for experiment sections)
- **Visualization/figures** → 3dgs-visualizer (for paper-quality figures)
- **Code review** → 3dgs-code-reviewer (for implementation verification)

## Related Skills

- **3dgs-paper-reader** — Deep reading and analysis of 3DGS papers (use for understanding related work)
- **3dgs-method-compare** — Method comparison (use for positioning and related work tables)
- **3dgs-experiment-planner** — Experiment design (use for experiment sections)
- **3dgs-visualizer** — Visualization (use for paper-quality figures)
- **3dgs-code-reviewer** — Code review (use for implementation verification)

## Guardrail: Do Not Apply From Memory

Do NOT try to apply the logic, method data, bug patterns, or technical details described in this skill from memory. Always read the SKILL.md and referenced files from disk before producing any output. The knowledge base is updated frequently; stale memory may produce outdated, inaccurate, or fabricated results.

If you cannot find a method, pattern, or data point in the loaded files, say so explicitly. Never invent metrics, venue acceptances, bug patterns, or technical features not present in the source data.

> If you like it, please star this repo https://github.com/jaccen/Awesome-Gaussian-Skills
