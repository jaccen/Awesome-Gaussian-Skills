---
name: super-agent
description: "Design, orchestrate, and debug super agents & multi-agent LLM systems: architecture patterns (router, harness, memory, orchestration), agent-topology selection, 3D/spatial agent integration (reconstruction, SLAM, navigation, editing, CAD), and failure diagnosis. Backed by a 20-method 'Super Agents & Agentic AI' knowledge base. Use when: building multi-agent LLM pipelines, orchestrating agent teams, designing 3D-spatial agents, diagnosing multi-agent coordination failures, 超级智能体/多智能体系统/智能体编排."
---

# Super Agent & Multi-Agent System Design

> Scope: LLM-agent architecture, multi-agent orchestration, and the 3D/spatial agent cross-section.
> Knowledge base: 20 arXiv-verified methods in the **Super Agents & Agentic AI** category (`data/methods.json`, single source of truth — always re-query, never answer from memory).

## 1. Architecture Pattern Selection

| Pattern | When to use | Library exemplar |
|---------|-------------|------------------|
| **On-device super agent** | Edge deployment, privacy, low latency function calling | Octopus v2 [arXiv:2404.01744] — 2B params beating GPT-4 on function-calling accuracy/latency |
| **Agentic pipeline with physical feedback** | Asset generation needing physics validity | Artisan [arXiv:2610.13947] — multi-agent + simulation feedback for articulated 3D assets |
| **Decentralized swarm** | Emergent coordination without assigned roles | SwarmWorld [arXiv:2608.26081] — stigmergic self-organization of LLM agents |
| **Safe execution harness** | Enterprise policy compliance, partial observability | E-Ledger [arXiv:2610.11552] — code approval layer + world ledger of verified rules |
| **Paper-to-code research agent** | Reimplementation pipelines | SPLATIFY [arXiv:2610.09116] — 3DGS papers → trainable gsplat code via grammar-constrained multi-agent synthesis |

## 2. 3D / Spatial Agent Integration

| Task | Method | Key mechanism |
|------|--------|---------------|
| Multi-agent 3D reconstruction | COLMAR [arXiv:2607.13524] | Cooperative view-policy learning, overlap-aware coverage |
| Multi-agent GS SLAM | GRAND-SLAM [arXiv:2506.18885] | Local-optimization tracking, global consistency outdoors |
| Agentic 3D object reconstruction | GATOR [arXiv:2610.11215] | Generative + agentic recovery from casual images, occlusion inference |
| Autonomous CAD reconstruction | CADFather [arXiv:2610.09127] | VLM assistant coordinates complementary tools, decides finish |
| Interactive 3D scene editing | DesignAgent3D [arXiv:2608.21438] | Designer-like multimodal reasoning, intent disambiguation |
| Embodied-simulation environment building | GASE [arXiv:2606.17520] | Automated GS reconstruction for sim scenes, minimal sim-to-real gap |
| VLN generation-evaluation-policy | GN0 [arXiv:2606.03682] | Unified paradigm on a 3DGS simulation engine (GN-Matrix / GN-Bench) |
| Robotic photography | PhotoAgent [arXiv:2603.22796] | LMM CoT → geometric constraints, reflection in internal world model |
| Urban planning agent | CityPlanner [arXiv:2609.09578] | Sandbox-agent: inspect files, generate plans, run evaluators, revise |

## 3. Evaluation & Diagnosis

- **Benchmarks**: GISAgentBench (realistic GIS workflows) · WorldBench (Three.js voxel worlds, vision-vs-code judge disagreement) · E3VS-Bench (5-DoF viewpoint-dependent active perception in 3DGS scenes) · MeMoREval (which memory modality to retain) · SkillScriptBench (skill-package self-evolution: doc repair vs script repair vs behavior preservation)
- **Failure diagnosis**: coordination failures often hide behind similar symptoms; distinguish information-passing vs information-use vs verification faults before re-orchestrating (see E-Ledger's ledger pattern for verified-rules bookkeeping)
- **Memory design**: textual records are not the only option — visual and spatial memory modalities change both information availability and inference cost (MeMoREval protocol: experience first, request later)

## 4. Design Rules

1. **Topology first**: choose centralized / decentralized / hybrid before role design; multi-agent consistency and communication budget dominate architecture
2. **Sandbox over free-form**: executable environments with inspect → plan → evaluate → revise loops (CityPlanner, WorldBench) outperform one-shot generation for spatial tasks
3. **Grammar/constraint-constrained synthesis**: when agents generate code or assets, constrain the output space with a formal grammar or template (SPLATIFY's context-free grammar over gsplat; Artisan's physical simulation gates)
4. **Policy before autonomy**: any agent that acts on external state needs an approval layer and a persistent ledger (E-Ledger)
5. **Competence-aware orchestration**: more collaboration is not always better — model the backbone's task-conditioned competence, then decide how much coordination a query deserves

## 5. Red Lines

- Do NOT claim an agent capability without a verifiable mechanism in the cited paper — every capability claim must map to a library method with arXiv ID
- Do NOT copy coordination topologies from memory — re-query `data/methods.json` (Super Agents & Agentic AI) before recommending
- Do NOT evaluate multi-agent systems with single-agent metrics — pick the matching benchmark from §3
- No fabricated benchmark names or numbers; if unverified, mark `unverified`

## 6. Related Skills

- **3dgs-spatial-agent** — 3DGS/CAD/Mesh spatial intelligence agent (single-agent spatial reasoning)
- **3dgs-mcp-renderer** — MCP-driven 3DGS rendering/sculpting (tool layer for agents)
- **cad-mesh-3dgs** — CAD/Mesh↔3DGS bridging (CADFather's domain substrate)
- **ontology** — knowledge representation & neuro-symbolic grounding for agent state
- **cg-paper-writing** — when writing any of the above up
