---
name: patent-software-ip
description: "Generate CN patent docs (claims, specification, abstract) and software copyright materials from AI/big-data project code or docs. Covers 7 AI domains + big data, 11 claim templates, auto domain detection, desensitization, prior-art search, and self-check."
version: "2.0.0"
author: jaccen
tags: ["patent", "software-copyright", "ip", "ai", "big-data", "3d-vision", "generative-ai", "embodied-ai", "nlp", "rag", "ai-engineering", "ai-safety"]
---

# Patent & Software Copyright Generation (AI + Big Data)

Generate CNIPA invention patent documents or CPCC software copyright materials from AI / big-data project code, design docs, and research papers.

**Covers 7 AI domains + Big Data (23 sub-directions), 11 claim templates.**

Full version (Chinese, with Word/PPT output): see `AI-Copyright-Skill` project.

## Triggers

patent / claims / specification / software copyright / disclosure / IP application / paper-to-patent / `/patent-software-ip`

## Overall Flow

```
Phase A  Requirement Diagnosis -> path + domain classification + risk level
Phase B  Project Analysis -> auto-detect domain + extract key technical points
Phase C  Generation (branch by path)
  C1 Patent: prior art search -> claims (11 templates) -> specification -> abstract -> self-check
  C2 Software Copyright: manual -> source code doc -> self-check
Phase D  Iterative Correction
```

## Phase A: Requirement Diagnosis

Confirm: path (patent/copyright/both), tech topic, applicant/inventor info, existing materials.

**Auto domain classification** (see Section "AI Domain Taxonomy" below).

**Gate**: 3-5 line diagnosis summary including domain + risk level.

## AI Domain Taxonomy

| Domain | Sub-directions | High-Risk Flags |
|--------|---------------|-----------------|
| **D1 Perceptual Intelligence** | 2D vision, 3D vision, multi-sensor fusion | 3D vision: bind 4-stage pipeline |
| **D2 Cognition & Language** | NLP, multimodal LLM, RAG, knowledge graph | RAG: show full 5-stage chain |
| **D3 Generative AI** | Diffusion, LLM text gen, cross-modal gen, AIGC watermark | **Must bind condition injection method**; pure content gen = rejected |
| **D4 Decision & Interaction** | Embodied AI, reinforcement learning, multi-agent | **Must bind sensor + actuator**; RL: bind reward to concrete task |
| **D5 AI Engineering** | Training/fine-tuning, inference deployment, data engineering, edge IoT | Training: bind to specific model architecture; inference: bind to hardware |
| **D6 AI Safety & Governance** | Adversarial robustness, watermark/tracing, privacy, alignment | Need concrete technical measure, not policy-level description |
| **D7 Industry Applications** | Autonomous driving, industrial, medical, financial, AI4Science | **Must bind data processing means**; financial: bind to data analysis |
| **D8 Big Data** | Distributed computing, data pipeline, stream processing, data quality, real-time analytics | **Must bind to specific application scenario**; pure platform = rejected |

## Phase B: Project Analysis

### B.1 Auto-Detection Decision Tree

Source files -> domain mapping:

| Key file | Detected domain |
|----------|----------------|
| `model.py`, `unet.py`, `vae.py` | D3 Generative AI |
| `train.py`, `finetune.py` | D5 AI Engineering (Training) |
| `inference.py`, `triton_serve.py`, `onnx_export.py` | D5 AI Engineering (Inference) |
| `render.py`, `gaussian.py`, `splat.py` | D1 3D Vision |
| `llm.py`, `chat.py`, `rag_chain.py` | D2 NLP / RAG |
| `robot.py`, `vla.py`, `env.py` | D4 Embodied AI |
| `reward.py`, `ppo.py` | D4 Reinforcement Learning |
| `watermark.py`, `embed_watermark.py` | D6 AI Safety / Watermark |
| `spark_job.py`, `flink_job.py`, `kafka_consumer.py` | D8 Big Data |
| `etl.py`, `data_pipeline.py`, `feature_store.py` | D8 Big Data (Data Engineering) |
| `stream.py`, `realtime_analytics.py` | D8 Big Data (Streaming) |
| `dataset.py`, `dataloader.py` | D5 AI Engineering (Data) |
| `privacy.py`, `dp_train.py` | D6 AI Safety (Privacy) |
| `config.yaml`, `pipeline.py` + langchain | D2 RAG / Agent |

Also detect 6 industry contexts: medical, financial, autonomous driving, industrial, smart city, education.

### B.2 Technical Points Extraction

Priority: model definition -> training/inference -> domain-specific core -> papers/design docs -> README.

Output: **Key Points List** (innovations, scheme skeleton, key params, distinctions, quantifiable effects, domain classification).

**Gate**: Present key points list for user confirmation.

## Phase C1: Patent Application

### C1.1 Prior Art Search

Online search 2-3 rounds: CNIPA patent DB, Google Patents, arXiv. Each result: source ID, scheme summary, limitations.

**CPC suggestions by domain**:
- D1 3D Vision: G06T 7/50, G06T 17/00
- D2 NLP/RAG: G06F 40/30, G06N 3/08
- D3 Generative AI: G06N 3/045, G06T 13/00
- D4 Embodied: G05B 19/00, B25J 9/16
- D5 AI Engineering: G06N 3/084
- D6 AI Safety: G06F 21/60
- D7 Industry: varies by sector
- D8 Big Data: G06F 16/245, G06F 16/903

### C1.2 Claims (11 Templates)

**Structure**: Method (1 independent + 3-8 dependent) + System (1 independent + 3-8 dependent) + Storage Medium (1 independent).

**Template selection by domain**:

| Template | Domain | Independent claim skeleton |
|----------|--------|--------------------------|
| T1 Model Architecture | D1/D2/D5 | Predefined network -> layer composition -> feature extraction -> output |
| T2 3D Vision | D1 3D | Capture -> sparse reconstruction -> dense optimization -> **rendering (expand formula)** |
| T3 Training Strategy | D5 | Data construction -> model initialization -> loss design -> optimization -> convergence |
| T4 Multimodal Fusion | D1/D2 | Multi-modal input -> modality-specific encoding -> cross-modal alignment -> fused output |
| T5 RAG Pipeline | D2 | Parse -> retrieve -> rerank -> reconstruct -> generate |
| T6 Diffusion Model | D3 | Noise scheduling -> condition injection (specify: cross-attention/adapter/ControlNet) -> denoising -> decode |
| T7 Agent | D2/D4 | Environment perception -> task decomposition -> tool selection -> execution -> feedback |
| T8 Embodied Intelligence | D4 | Sensor input -> perception -> planning -> actuator output + **safety constraint (dependent)** |
| T9 Inference Optimization | D5 | Model loading -> computation graph optimization -> kernel fusion -> output |
| T10 Big Data Processing | D8 | Data ingestion -> distributed processing (specify: Spark/Flink/MapReduce) -> aggregation -> storage/output |
| T11 Data Engineering & Quality | D8 | Data collection -> quality assessment -> anomaly detection -> cleaning -> feature extraction -> storage |

**Drafting rules (all domains)**:
1. Method + System claims in pairs
2. Independent: preamble (prior art) + "characterized by" (essential features)
3. Dependent: "according to claim X..." with further limitation
4. Every step must link to system component
5. Avoid functional limitation; prefer structural/step-based description
6. Quantify effects where possible ("improves accuracy by X%", "reduces latency to Y ms")

### C1.3 Specification

5-chapter: Tech Field -> Background (prior art + defects) -> Invention Content (problem + scheme + effects, quantified) -> Figure Description -> Specific Embodiments.

**Desensitization**:
- Dataset name -> "preset dataset"
- Parameter count -> "preset-scale model"
- Hardware -> "graphics processor" / "distributed computing node"
- Training duration -> "preset period"
- Framework -> "DL framework" / "distributed computing framework"
- API -> "remote interface"
- Company -> "institution"
- Specific values -> ranges

**Figures (mermaid `flowchart TB/LR`)**: System architecture + method flow + domain-specific pipeline (training/rendering/data pipeline/stream topology/etc.).

### C1.4 Abstract

<=300 chars. Tech domain + core scheme + main effect. No commercial terms.

### C1.5 Self-Check

- [ ] Independent claim contains all essential features
- [ ] Dependent claims correctly reference
- [ ] Method + System + Medium triple complete
- [ ] Specification sufficiently disclosed (enabling)
- [ ] Embodiments cover all claim features
- [ ] Beneficial effects quantified
- [ ] Terminology consistent throughout
- [ ] Abstract corresponds to claim 1
- [ ] Desensitization complete (no company/person/business name leak)
- [ ] Figure numbering consistent
- [ ] Domain-specific checks passed (see below)

**Domain-specific self-check**:

| Domain | Extra checks |
|--------|-------------|
| D1 3D Vision | Rendering formula in claim? 4-stage pipeline? |
| D2 NLP/RAG | Full 5-stage RAG chain? Specific embedding model? |
| D3 Generative AI | Condition injection method specified? Not pure content gen? |
| D4 Embodied | Sensor + actuator bound in every step? Safety dependent claim? |
| D5 AI Engineering | Specific model architecture? Hardware binding for inference? |
| D6 AI Safety | Concrete technical measure? Not policy-level? |
| D7 Financial/Medical | Data processing means bound? Not pure business method? |
| D8 Big Data | Specific application scenario bound? Not pure platform? Distributed topology described? |

## Phase C2: Software Copyright

### C2.1 Software Manual (10-15 pages, >=6 screenshots)

**Structure**: Introduction (env + capability) -> Installation (env + weights + config) -> Functions (core + data + API + monitoring) -> Non-functional -> FAQ.

Templates by domain:
- **General AI**: standard template
- **3D Vision**: add rendering/visualization section
- **Generative AI**: add sampling/inference section
- **Embodied AI**: add sensor/hardware integration section
- **Big Data**: add data pipeline/deployment section (distributed topology, cluster config, streaming topology diagram)

### C2.2 Source Code Document (front 30 + back 30 pages, >=50 lines/page)

**File priority by domain**:

| Domain | Required files | Domain-specific required |
|--------|---------------|------------------------|
| D1 3D Vision | model.py, train.py, inference.py, **render.py** | render.py |
| D2 NLP/RAG | model.py, train.py, inference.py, **retriever.py** | retriever.py |
| D3 Generative AI | model.py, train.py, inference.py, **generate.py** | generate.py |
| D4 Embodied | model.py, train.py, inference.py, **control.py**, env.py | control.py |
| D5 AI Engineering | model.py, **finetune.py**, **export.py**, **deploy.py** | finetune.py |
| D6 AI Safety | model.py, **watermark.py**, **adv_train.py** | watermark.py |
| D8 Big Data | **pipeline.py**, **etl.py**, **stream.py**, **config.yaml** | pipeline.py |

<3000 lines: submit all; >3000: front 1500 + back 1500 by priority.

**Desensitization**: Remove API keys, absolute paths, internal addresses, personal info, hardware models, cloud URLs, DB passwords. Retain algorithm comments.

### C2.3 Self-Check

- [ ] Pages >= 15
- [ ] Screenshots >= 6
- [ ] Feature coverage complete
- [ ] Non-technical description for reviewers
- [ ] Code pages with >= 50 lines/page
- [ ] Name consistency
- [ ] No secret leaks

## Knowledge Index

Deep-dive reference files for domain-specific patent writing rules, claim templates, and software copyright guides.

| File | Sections | Key Content |
|------|----------|-------------|
| eferences/ai-patent-claims-guide.md | 11 claim templates (T1-T14) | Full legal claim text per template: method/system/medium triples with dependent claims; Big Data T10-T14 included |
| eferences/ai-patent-special.md | Patentability framework, 8 risk domains, CPC codes, desensitization rules | AI+Big Data patentability risk assessment; domain mapping; figure requirements; industry desensitization; CPC classification (7.1-7.7); 9-domain quick reference |
| eferences/ai-software-copyright-guide.md | Type detection, source file priority, 5 domain templates, FAQ | Decision tree for 10+ project types; source code priority by domain; Big Data dedicated template (section 3.5); desensitization checklist; common pitfalls |
## Phase D: Iterative Correction

Identify -> Locate -> Targeted fix -> Save as v{N} -> Re-run affected self-check items only. Do NOT re-run full pipeline.

## Output

```
outputs/{case-id}/
  patent/          claims.md + specification.md + abstract.md + full.md
  software-copyright/  manual.md + source_code.md
```

**Prohibitions**: No skill name/repo path/disclaimers in deliverables. No self-check section in body. No fabricated patent numbers/links. No "approximately" in claims. No commercial terms in abstract.

## Quick Reference: 8 High-Risk Rejection Patterns

| Pattern | Why rejected | Fix |
|---------|-------------|-----|
| Pure content generation (no condition injection) | "Intellectual activity rules" | Specify cross-attention/adapter/ControlNet in claims |
| Financial AI without data processing means | "Business method" | Bind to specific feature engineering + model architecture |
| Embodied AI without sensor/actuator binding | "Pure algorithm" | Add "executed via LiDAR module" + "motor controller" |
| RAG without full pipeline | "Insufficient disclosure" | Show all 5 stages in method claim |
| Big Data platform without application | "Abstract idea" | Bind to specific scenario (e.g., real-time traffic analytics) |
| RL without reward function | "Insufficient disclosure" | Include reward computation formula |
| AI watermark without robustness test | "Insufficient technical effect" | Add adversarial/noise/compression robustness claim |
| Medical AI without clinical validation | "Insufficient enablement" | Add evaluation on specific dataset with clinical metrics |
