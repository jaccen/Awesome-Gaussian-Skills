---
name: patent-software-ip
description: "Generate Chinese patent application docs (claims, specification, abstract) and software copyright registration materials (manual, source code doc) from code/design docs. Supports desensitization, prior-art search, and self-check."
version: "1.0.0"
author: jaccen
tags: ["patent", "software-copyright", "ip", "desensitization", "chinese-patent"]
---

# Patent Application & Software Copyright Generation

Generate CNIPA-format invention patent documents or CPCC software copyright registration materials from AI project code, design docs, and research papers.

Two output paths:
- **Patent**: Claims + Specification + Abstract (with technical disclosure as intermediate deliverable)
- **Software Copyright**: Software manual + Source code document

## Triggers

patent / claims / specification / software copyright / disclosure / IP application / paper-to-patent / `/patent-software-ip`

**Iteration**: When user modifies existing output, enter iterative correction flow directly.

## Overall Flow

```
Phase A  Requirement Diagnosis → path selection + basic info
Phase B  Project Analysis → extract key technical points
Phase C  Generation (branch by path)
  C1 Patent: prior art search → claims → specification → abstract → self-check
  C2 Software Copyright: manual → source code doc → self-check
Phase D  Iterative Correction
```

## Phase A: Requirement Diagnosis

Confirm: path (patent/copyright/both), tech topic, applicant info, inventor info, existing materials.

**Gate**: 3-5 line diagnosis summary.

## Phase B: Project Analysis

Priority: design docs/architecture → core code → papers/reports → README.

Output: **Key Points List** (core innovations, scheme skeleton, key params, distinctions from prior art, quantifiable effects).

**Gate**: Present key points list for user confirmation.

## Phase C1: Patent Application

### C1.1 Prior Art Search

Online search 2-3 rounds: CNIPA patent DB, Google Patents, arXiv. Each result: source ID, scheme summary, limitations.

### C1.2 Claims

**Structure**: Method (1 independent + 3-8 dependent) + System (1 independent + 3-8 dependent, step-by-step correspondence) + Storage Medium (1 independent).

**Drafting rules**:
1. Method + System claims in pairs
2. Independent: preamble (prior art common features) + "characterized by" (essential features)
3. Dependent: "according to claim X..." with further limitation
4. Every step must link to system component ("executed via GPU parallel computing unit")
5. Avoid functional limitation; prefer structural/step-based description

**AI-specific requirements**:
- Training claims must include: data construction, loss function, optimization strategy
- 3D Vision: must include full 4-stage pipeline (capture→sparse→dense→render); rendering step must expand rendering formula
- Generative AI: condition injection step must specify method (cross-attention/adapter/ControlNet) to avoid "pure content generation" rejection
- Embodied AI: every step must bind sensor input + actuator output; include safety constraint dependent claim
- RAG: must show complete 5-stage pipeline (parse→retrieve→rerank→reconstruct→generate)

### C1.3 Specification

5-chapter: Tech Field → Background (prior art + defects) → Invention Content (problem + scheme + effects, must be quantified) → Figure Description → Specific Embodiments.

**Desensitization**: dataset name→"preset dataset", parameter count→"preset-scale model", hardware→"graphics processor", training duration→"preset period", framework→"DL framework", API→"remote interface", company→"institution", specific values→ranges.

**Figures**: Use fenced mermaid (`flowchart TB`/`LR`). Required: system architecture + method flow + (domain-specific: training pipeline, rendering pipeline, data pipeline, etc.).

### C1.4 Abstract

≤300 chars. Covers: tech domain + core scheme + main effect. No commercial terms. Replace algorithm names with generic expressions.

### C1.5 Self-Check

- Independent claim contains all necessary features
- Dependent claims correctly reference
- Method + System + Medium triple complete
- Specification sufficiently disclosed (enabling)
- Embodiments cover all claim features
- Beneficial effects quantified (not vague)
- Terminology consistent throughout
- Abstract corresponds to claim 1
- Desensitization complete (no company/person/business name leak)
- Figure numbering consistent with references

## Phase C2: Software Copyright

### C2.1 Software Manual (10-15 pages, ≥6 screenshots)

**Structure**: Introduction (env + AI capability) → Installation (env + weights + config) → Functions (AI core + data + API + monitoring) → Non-functional → FAQ.

Key notes: Target non-technical reviewers; use `[Screenshot: feature name]` placeholders; describe deployment/config/monitoring for HCI requirement; declare open-source pre-trained weights outside protection scope.

### C2.2 Source Code Document (front 30 + back 30 pages, ≥50 lines/page)

File priority: model.py → train.py → inference.py [all required] → render.py [3D vision] → dataset.py → loss.py → generate.py [Gen-AI] → control.py [Embodied] → retriever.py [RAG] → config.yaml [optional].

**Desensitization**: Remove API keys, absolute paths, internal addresses, personal info, hardware models, cloud URLs, DB passwords. Retain algorithm comments.

<3000 lines: submit all; >3000: front 1500+back 1500 by priority.

### C2.3 Self-Check

Pages ≥15 + Screenshots ≥6 + Feature coverage + Non-tech description + Code pages + Lines per page ≥50 + Name consistency + No secret leaks.

## Phase D: Iterative Correction

Identify → Locate → Targeted fix → Save as v{N} → Re-run affected self-check items only. Do NOT re-run full pipeline.

## Output

```
outputs/{case-id}/
├── patent/          claims.md + specification.md + abstract.md + full.md
└── software-copyright/  manual.md + source_code.md
```

**Prohibitions**: No skill name/repo path/disclaimers in deliverables. No self-check section in body. No fabricated patent numbers/links. No "approximately" in claims. No commercial terms in abstract.
