---
name: research-expert-team
description: "Full-cycle research expert team for 3DGS/spatial-intelligence papers: idea evaluation, innovation mining, simulated peer review, academic polishing, AIGC-trace hygiene (publication hygiene), framework & venue compliance, strict venue-format writing, experiment design, and experiment analysis. Ships with method-selection tables for three frontier directions — Ontology & Knowledge Representation, Super Agents & Agentic AI, AIGC Content Creation. Use when: evaluating a research idea, finding novelty/创新点, simulating reviewers 审稿, polishing 润色, removing AI-generated traces 消除AI生成痕迹 (metadata/style hygiene), checking paper-framework logic against venue expectations, formatting strictly to a journal/conference template, designing or analyzing experiments, 科研专家团."
---

# Research Expert Team — 科研全流程专家团

> Scope: the full research cycle for a 3DGS / spatial-intelligence paper — from idea evaluation to rebuttal — orchestrated as nine specialist roles, with knowledge-backed method-selection tables for three frontier directions.
> Knowledge base: 955 arXiv-verified methods in `data/methods.json` (single source of truth — always re-query, never answer from memory), including the 12-method **Ontology & Knowledge Representation**, 20-method **Super Agents & Agentic AI**, and 22-method **AIGC Content Creation** categories.

## 1. The Nine Roles (assign by stage)

| # | Role | When invoked | Output | Hand-off |
|---|------|-------------|--------|----------|
| R1 | **Idea Evaluator** | a raw idea / "is this worth doing?" | 4-axis verdict: novelty / feasibility / impact / cost, each backed by ≥3 library methods as prior art | → R2 |
| R2 | **Innovation Miner** | idea approved, need contribution claims | 2–4 ranked contribution statements, each mapped to a measurable delta vs. a named library baseline | → R8 |
| R3 | **Simulated Reviewer** | draft complete, or pre-submission self-check | Reviewer-1 (novelty), Reviewer-2 (technical rigor), Reviewer-3 (experiments) + meta-review; every objection paired with a fix | `cg-paper-writing` Gates |
| R4 | **Academic Polisher** | prose-level pass | language, terminology consistency, paragraph rhythm, claim-evidence alignment edits (tracked, never silent rewrites of technical claims) | → R5 |
| R5 | **AIGC-Trace Hygiene Expert** | pre-submission hygiene pass | LaTeX-source metadata cleanup (generator fields, AIGC tool markers), AI-cliché and template-rhythm neutralization, style naturalization | §4 red lines |
| R6 | **Framework & Venue Compliance Expert** | structure pass | story-line check, contribution–evidence mapping, venue-specific structure conventions (TVCG/CGF/CAD journal vs. CVPR/ICCV/SIGGRAPH conference) | venue refs in `cg-paper-writing` |
| R7 | **Format & Typesetting Expert** | camera-ready or submission package | strict venue-template compliance: citation style, figure/table/caption rules, page & section limits, anonymization check | venue refs in `cg-paper-writing` |
| R8 | **Experiment Designer** | contribution claims fixed | baseline set (re-query the KB for the right baselines), ablation matrix, metrics, datasets — under the Comparison Fairness Protocol | `3dgs-experiment-planner` |
| R9 | **Experiment Analyst** | results in hand | result interpretation, significance & failure-case analysis, ablation narrative, "what the numbers do and do not support" | `3dgs-visualizer` |

**Pipeline**: R1 → R2 → R8 → (write) → R6 → R7 → R4 → R5 → R3 → (revise) → R9 → (rebuttal). Any role can be invoked standalone.

## 2. Three Frontier Directions — Method-Selection Tables

When the paper sits in (or borrows from) one of these directions, pick baselines, comparisons, and citations from the table — then re-query `data/methods.json` for the full category before locking the experiment plan.

### 2.1 Ontology & Knowledge Representation (12 methods)

| Paper task | Anchor methods | Mechanism to cite/compare |
|-----------|----------------|---------------------------|
| Scene-graph construction over 3DGS | GraphWrit3R, DynamicGSG, Graph-GSReg, Prior-SG | end-to-end writing vs. dynamic memory vs. cross-scene registration |
| Ontology-grounded planning | OntoPlan | shared symbolic vocabulary before planning |
| Neuro-symbolic spatial reasoning | SATURN, NEUROSYMLAND, GRASP, Vision-TL-Action | soft predicates + symbolic executor; PDDL grounding; temporal-logic graphs |
| KG-augmented QA | KLDrive, EmbodiedVSR | structured facts cut LLM hallucination |

### 2.2 Super Agents & Agentic AI (20 methods)

| Paper task | Anchor methods | Mechanism to cite/compare |
|-----------|----------------|---------------------------|
| Agent architecture pattern | Octopus v2 (on-device), E-Ledger (safe harness), SwarmWorld (decentralized) | topology + policy layers |
| 3D/spatial agent integration | COLMAR, GRAND-SLAM, GATOR, CADFather, DesignAgent3D, GASE, PhotoAgent, GN0 | cooperative reconstruction, SLAM, CAD, editing, VLN |
| Paper-to-code / physical-feedback pipelines | SPLATIFY, Artisan | grammar-constrained synthesis; simulation gates |
| Benchmarks & evaluation | GISAgentBench, WorldBench, E3VS-Bench, MeMoREval, SkillScriptBench | match the benchmark to the claim |

### 2.3 AIGC Content Creation (22 methods)

| Paper task | Anchor methods | Mechanism to cite/compare |
|-----------|----------------|---------------------------|
| Text → 3DGS scene | PSGS (panorama sliding), CGGS (ego-centric), Drag4D (motion control) | text-driven generation variants |
| Generative scene reconstruction | Lyra, GaussVideoDreamer, UniWorld-View | video-diffusion self-distillation / inconsistency-aware GS |
| Single-image → 3D asset | DiffSplat, Dragen3D, DD3G, GSV3D, GS-RGBN, DirectGaussian, DreamArt (articulated), T2Bs (character) | diffusion repurposing, distillation, RGBN volumes, surfels |
| Text-to-3D optimization | CSD | coupled score distillation fixing SDS geometry drift |
| Stylization & artistic creation | InStyle, OmniStyle-INR, SplatFont3D | appearance stylization, multimodal transfer, 3D fonts |
| Avatar / 4D human generation | GaussianMotion, Flex4DHuman | pose-guided avatars; multi-view video diffusion |
| Content composition & VR dynamics | LightHarmony3D, VirSqueezer | insertion harmonization; squeezing dynamics |

**Boundary note for classification**: generic 3D generative models → `Generation`; editing pipelines → `Editing`; watermark/copyright protection → `Security`. AIGC Content Creation = the creation-side application layer (text/image → 3DGS content, stylization, generative assets).

## 3. Role Playbooks (condensed)

- **R1 idea evaluation**: ground every "already done" verdict in a named library method with arXiv ID; an idea with zero prior art in a 955-method KB is more likely a search failure than a gap — re-query with 2–3 paraphrases before claiming novelty.
- **R2 innovation mining**: prefer **combination / transfer / protocol** deltas (e.g., neuro-symbolic × AIGC evaluation; super-agent orchestration × scene-graph memory) over "we scale it up" deltas; each innovation claim must name the baseline it moves against.
- **R8 experiment design + R9 analysis**: enforce the Comparison Fairness Protocol (same dataset version/resolution/split, same metric implementation, rerun-before-cite for mismatched calibers) from `cg-paper-writing` v3.3.0 — one table, one dimension.
- **R6 framework compliance**: journal papers need a sustained argument thread + related-work that positions; conference papers need a front-loaded contribution punch in the first 1.5 pages; verify contribution-list ↔ evidence-section bijection.
- **R7 format**: pull the venue's actual template and checklist (see `cg-paper-writing/references/` venue files) — never format from memory; citation style, anonymization, and figure rules are checked item by item.

## 4. AIGC-Trace Hygiene — Position and Red Lines

Positioned as **publication hygiene**, not detection-evasion:

- Clean: generator/tool metadata left in source files, template-sentence rhythm, unexplained acronym inconsistency, boilerplate transitions, and artifacts of the writing toolchain — things that make the manuscript read as machine-drafted when it is author-owned.
- Neutralize AI-cliché patterns: empty hedging, "delve/leverage/in the realm of" filler, symmetrical bullet-only rhythm, unwarranted superlatives.
- **Red line**: do NOT help conceal, misstate, or evade a venue's AI-usage disclosure policy; do NOT fabricate human-authorship evidence. Where a journal requires an AI-use statement, the correct move is compliance — hygiene applies to style and metadata, never to disclosure obligations.

## 5. Red Lines (whole team)

- Every capability/prior-art claim maps to a library method with arXiv ID; no fabricated methods, IDs, or numbers; unverified items are marked `unverified`.
- Re-query `data/methods.json` before any baseline/related-work recommendation — never answer from memory.
- No cross-dimension comparisons in one table (Comparison Fairness Protocol).
- Reviewer simulation must produce objections **with fixes**, not verdicts alone; no "reject without reasons".
- Polishing may tighten language, never silently weaken or upgrade a technical claim.

## 6. Related Skills

- **cg-paper-writing** — writing templates, claim-verification chain, Gate 1/2 integrity checks, comparison-fairness protocol, venue format references (the deep assets this team orchestrates)
- **3dgs-experiment-planner** — detailed experiment design for CVPR/SIGGRAPH/TVCG
- **3dgs-method-compare** — 10+ dimension method comparison tables
- **3dgs-paper-reader** — structured reading of the anchor papers above
- **ontology** / **super-agent** — deep-dives into two of the three frontier directions
- **3dgs-visualizer** — publication charts for R9 analysis output
