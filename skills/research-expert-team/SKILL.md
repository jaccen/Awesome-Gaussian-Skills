---
name: research-expert-team
description: "Full-cycle research expert team for 3DGS/spatial-intelligence papers: idea evaluation, innovation mining, simulated peer review, academic polishing, AIGC-trace hygiene (publication hygiene), framework & venue compliance, strict venue-format writing, experiment design, and experiment analysis. Ships with method-selection tables for the Ontology & Knowledge Representation, Super Agents & Agentic AI, and AIGC Content Creation KB categories, master-paper studies for five directions (adding 3D Gaussian Splatting and Spatial Intelligence), plus a 3DGS paper-drafting blueprint (five-section skeleton, motivation-upgrade rewriting, painpoint→resource-metric evaluation mapping). Use when: evaluating a research idea, finding novelty/创新点, simulating reviewers 审稿, polishing 润色, drafting or structuring a 3DGS paper / 3DGS论文撰写, removing AI-generated traces 消除AI生成痕迹 (metadata/style hygiene), checking paper-framework logic against venue expectations, formatting strictly to a journal/conference template, designing or analyzing experiments, 科研专家团."
---

# Research Expert Team — 科研全流程专家团

> Scope: the full research cycle for a 3DGS / spatial-intelligence paper — from idea evaluation to rebuttal — orchestrated as nine specialist roles, with knowledge-backed method-selection tables and five-direction master-paper studies (§2.4).
> Knowledge base: 976 arXiv-verified methods in `data/methods.json` (single source of truth — always re-query, never answer from memory), including the 12-method **Ontology & Knowledge Representation**, 20-method **Super Agents & Agentic AI**, and 23-method **AIGC Content Creation** categories.

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

## 2. Method-Selection Tables — KB Categories & Direction Coverage

The tables below cover the three KB categories built for these directions; the other two covered directions (3D Gaussian Splatting, Spatial Intelligence) pick baselines by re-querying the KB's Reconstruction / Surface / Dynamic / Generation categories — all five directions have master-paper evidence in §2.4. When the paper sits in (or borrows from) one of these directions, pick baselines, comparisons, and citations from the table — then re-query `data/methods.json` for the full category before locking the experiment plan.

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

### 2.3 AIGC Content Creation (23 methods)

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

### 2.4 Methodology Core + Master-Paper Evidence Base（双层加载）

Two-layer asset: **`methodology-core.md` is the program** — the fifteen highest-cited exemplars distilled into executable operating procedures, domain-tuned to 3DGS/spatial-intelligence (not bound to those papers); **`mp-*.md` are the evidence** — per-direction full-text dissections tracing each procedure to its source paper. Load the program layer by need, the evidence layer to trace a provenance:

**Layer 1 — Program (methodology-core.md, load by role)**:

| Need | Section | What you get |
|---|---|---|
| Topic selection / innovation (R1/R2) | [§A](references/methodology-core.md) | four topic-selection modes M1-M4 + five opening-sentence variants A.1 (clash/paradox/agenda-revival/pipeline-dissection/legacy-gap) · red-flag checklist · delta typology (5 power levels) |
| Argumentation framework (R6) | §B | three venue-validated skeleton templates T1-T3 · contribution–evidence bijection procedure · related-work organization · limitations-section style · §B.5 representation-paper techniques (incl. motivation-upgrade rewriting + symbol-system unification) |
| 3DGS paper drafting (domain extension) | [`references/3dgs-paper-blueprint.md`](references/3dgs-paper-blueprint.md) | 3DGS-specific skeleton program: three writing rules (motivation upgrade / symbol unification / painpoint→resource-metric mapping) · five-section placement table (intro 4-paragraph arc · related-work 3-way moat · method total-then-split with 3DGS math preliminaries · experiment 4-table spec) · painpoint library · limitations library · pre-submission checklist |
| Experiment design / analysis (R8/R9) | §C | sixteen experiment patterns C1-C16 · domain iron rule (same diffusion prior / resolution / prompt set / evaluation protocol) |
| Simulated review (R3) | §D | eight reviewer must-ask questions D1-D8 with preempt actions |
| Polishing / value packaging | §E | nine value amplifiers (naming rights, citation trio, dataset-as-asset, future-work interfaces, …) |

**Layer 2 — Evidence (mp-*.md, load by direction)**:

| Direction | File | Exemplars (venue, citations) | What you learn |
|---|---|---|---|
| Ontology & Knowledge Representation | [`references/mp-ontology.md`](references/mp-ontology.md) | Kimera (IJRR 2021, 407) · ConceptGraphs (ICRA 2024, 671) | journal-arc system papers · FM-era bridge papers |
| Super Agents & Agentic AI | [`references/mp-super-agents.md`](references/mp-super-agents.md) | ReAct (ICLR 2023, 12,540) · MetaGPT (ICLR 2024 Oral, 2,626) · Toolformer (NeurIPS 2023, 6,146) · Generative Agents (UIST 2023, 5,987) · Voyager (TMLR 2024, 2,622) | minimal-paradigm · human-practice-transfer · data-bootstrapping · memory-architecture · lifelong-skill-library papers |
| AIGC Content Creation | [`references/mp-aigc.md`](references/mp-aigc.md) | DreamFusion (ICLR 2023, 3,929) · DreamGaussian (ICLR 2024, 1,098) | paradigm-creating papers · representation-swap efficiency papers |
| 3D Gaussian Splatting | [`references/mp-3dgs.md`](references/mp-3dgs.md) | 3DGS (TOG 2023, 10,887) · 4DGS (CVPR 2024, 1,676) · SuGaR (CVPR 2024, 982) | representation-revolution · extension-paradigm · downstream-gap (surface/editing) papers |
| Spatial Intelligence | [`references/mp-spatial.md`](references/mp-spatial.md) | NeRF (ECCV 2020, 5,900) · Instant-NGP (TOG 2022, 6,456) · DUSt3R (CVPR 2024, 2,022) | representation-founding · efficiency-mechanism · pipeline-replacement (geometry foundation model) papers |

Citation counts: Semantic Scholar, verified 2026-10. Division of labor (enforced): new lessons go into methodology-core as generalizable procedures; mp-*.md only ever grows by adding case evidence — never duplicate methodology there.

## 3. Role Playbooks (condensed)

- **R1 idea evaluation**: ground every "already done" verdict in a named library method with arXiv ID; an idea with zero prior art in a 976-method KB is more likely a search failure than a gap — re-query with 2–3 paraphrases before claiming novelty. Load methodology-core **§A** (§2.4): classify the idea into M1-M4 (combination gap / obstacle-bypass / ecosystem-bridge / pain-point-with-mechanism) via the per-mode yes/no questions, then run the red-flag checklist — any hit → rework the topic, not the writing.
- **R2 innovation mining**: load methodology-core **§A.3** delta typology — rank claims by power (representation-level > mechanism-level > combination-level > protocol-level > system-level), make each pass the one-sentence delta test (which named baseline, which measurable delta), and prefer combination/transfer/protocol deltas over "we scale it up". Tag every verdict with its mode number (M1-M4) and delta level (1-5) for R6/R8 traceability.
- **R3 simulated review**: beyond domain-standard scrutiny, walk methodology-core **§D** D1-D8 (representation arbitrariness · own-prior-work overlap · baseline parity · metric blind spots · efficiency caliber · cost disadvantage · mechanism patchwork · hidden negatives); every question the draft cannot answer becomes an objection **with a fix**. The review report must state per-item D1-D8 coverage.
- **R8 experiment design + R9 analysis**: compose the plan from methodology-core **§C** patterns C1-C16 (state which pattern each experiment table uses) and enforce the Comparison Fairness Protocol from `cg-paper-writing` v3.3.0 — same dataset version/resolution/split, same metric implementation, rerun-before-cite for mismatched calibers, one table one dimension; for 3DGS/generative work the domain iron rule (same diffusion prior / prompt set) is non-negotiable. R9 interprets failures through the failure-mode taxonomy (C5), not anecdotes.
- **R6 framework compliance**: load methodology-core **§B** — pick the skeleton template matching the paper type (T1 journal system-arc / T2 conference capability-matrix / T3 paradigm-creating minimal-method), run the contribution–evidence bijection (every contribution ↔ unique evidence section; orphan experiments deleted or demoted to appendix), organize related work per B.3 (per-paper verdicts or grouped-gap prose), and write the limitations section per B.4 until Reviewer-2 has nothing left to add. For 3DGS-direction papers, additionally load the §2.4 domain blueprint (`3dgs-paper-blueprint.md`) and walk its five-section placement table + pre-submission checklist.
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
- **references/ (this skill, two layers + domain extension)** — [`methodology-core.md`](references/methodology-core.md): the executable methodology program distilled from the 15 exemplars (A 选题引擎+开题变体 / B 论述架构+表示论文技法+骨架路由 / C 实验模式库 C1-C16 / D 审稿人预期库 / E 价值放大器 / F 团队约定); [`3dgs-paper-blueprint.md`](references/3dgs-paper-blueprint.md): 3DGS-specific drafting skeleton (three writing rules, five-section placement, painpoint/limitation libraries, cross-referenced with cg-paper-writing templates); `mp-*.md` (5 files, 5 directions, 15 exemplar papers): per-direction full-text evidence base tracing every program step to its source paper
- **3dgs-experiment-planner** — detailed experiment design for CVPR/SIGGRAPH/TVCG
- **3dgs-method-compare** — 10+ dimension method comparison tables
- **3dgs-paper-reader** — structured reading of the anchor papers above
- **ontology** / **super-agent** — deep-dives into two of the five covered directions (Ontology, Super Agents)
- **3dgs-visualizer** — publication charts for R9 analysis output
