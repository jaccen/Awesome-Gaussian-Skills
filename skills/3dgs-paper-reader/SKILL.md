---
name: 3dgs-paper-reader
description: 'Read and summarize 3DGS research papers. Extracts method architecture, innovations, experimental results
  from arXiv or local PDFs. Structured output with tables. Knowledge of 1085 methods across 26 categories. Use when:
  reading or analyzing a 3DGS/NeRF paper, extracting method details from arXiv PDF, summarizing 3D reconstruction
  research, 读论文/3DGS论文分析/文献总结.'
license: Apache-2.0
metadata:
  version: 1.5.0
  author: jaccen
  tags:
  - 3dgs
  - gaussian-splatting
  - paper-reading
  - research
  - nerf
  - 3d-reconstruction
  when_to_use:
  - Read or analyze a 3DGS/NeRF research paper
  - Extract method architecture or innovations from arXiv PDF
  - Summarize 3D reconstruction research with structured output
  - Compare a new paper against 1085 known 3DGS methods
  - Generate publication-quality paper summaries with tables
  - 读论文 / 3DGS论文分析 / 文献总结 / 方法提取
  platform-fields:
    user-invocable: true
---

# 3DGS Paper Reader

Use the [reading and evidence protocol](references/evidence-workflow.md) for paper identity, source acquisition, extraction and handoff.

## Choose the reading depth

- **Metadata** for bibliographic identification. Disambiguate title, authors, identifier and edition before associating content with a method.
- **Abstract brief** when only the primary abstract is accessible or the user requests a quick scan. State which source was read. Summarize the stated goal, proposed approach and author-reported claims. Mark uninspected mechanisms, experiments and limitations as gaps.
- **Full-text analysis** for mechanism, numerical comparison, novelty, evidence-sensitive writing or reusable knowledge. Inspect the body, relevant figures and tables, and available supplements. State exactly which sections and supplements were inspected and which questions remain open.

Start with the paper's research question and concrete failure mode. Explain the flow from inputs and assumptions to representation, transformations, supervision and output. Connect each substantive contribution to the closest prior mechanism and to the experiment or analysis that evaluates it. Include the conditions, counterexamples and negative or inconclusive findings that delimit the contribution.

Deliver a readable summary and, for knowledge reuse, a source-located `paper-evidence` record. The legacy `paper-insight` contract remains available for interchange with older workflows. Use source-located records for factual handoff to comparison, experiment planning and writing skills.

The repository lookup can return `primary_abstract` with source and retrieval date. Use that result for the abstract-brief workflow or open the full text for stronger claims. The coverage inventory shows the evidence status of each catalog entry and totals by category.
