---
name: ontology
description: "Build and reason over ontologies & structured knowledge representations for 3D/spatial domains: ontology-grounded scene representation, 3D scene graph construction, knowledge-graph-augmented reasoning, neuro-symbolic spatial reasoning, and robot-ontology population. Backed by a 12-method 'Ontology & Knowledge Representation' knowledge base. Use when: designing scene graphs or spatial ontologies, connecting 3DGS scenes to knowledge graphs, neuro-symbolic spatial reasoning, LLM-assisted ontology construction, 本体工程/知识图谱/场景图/神经符号推理."
---

# Ontology & Knowledge Representation for 3D Domains

> Scope: ontology engineering and structured knowledge representations applied to 3D scenes, robots, and spatial reasoning.
> Knowledge base: 12 arXiv-verified methods in the **Ontology & Knowledge Representation** category (`data/methods.json`, single source of truth — always re-query, never answer from memory).

## 1. Representation Selection

| Need | Representation | Library exemplar |
|------|----------------|------------------|
| Structured scene memory that updates with change | Dynamic 3D Gaussian scene graph | DynamicGSG [arXiv:2502.15309] |
| Cross-scene unification of 3DGS maps | 3D scene graph registration | Graph-GSReg [arXiv:2606.29782] |
| Grounded, scalable long-horizon planning | Ontology-grounded scene representation | OntoPlan [arXiv:2610.07649] |
| End-to-end scene graph without pipelines | Direct 3D scene graph writing | GraphWrit3R [arXiv:2609.31595] |
| Open-plan environments (no wall heuristics) | Task/prior-driven probabilistic scene graphs | Prior-SG [arXiv:2608.06170] |

## 2. Reasoning over Structured Spatial Knowledge

| Pattern | Method | Mechanism |
|---------|--------|-----------|
| Neuro-symbolic spatial reasoning | SATURN [arXiv:2606.22694] | Approximate 3D scene reconstruction + soft perspective-aware predicates + training-free Pythonic symbolic executor |
| KG-augmented driving QA | KLDrive [arXiv:2603.21029] | Knowledge graph of fine-grained 3D scene facts reduces LLM hallucination |
| Scene-graph-guided CoT | EmbodiedVSR [arXiv:2503.11089] | Dynamic scene graphs steer chain-of-thought for zero-shot spatial tasks |
| Zero-shot 3D path planning | HiWE [arXiv:2609.39323] | Point-based interface: PointVLM grounding + depth-lifted semantic 3D representation + language planner |
| Symbolic safety assessment | NEUROSYMLAND [arXiv:2607.02277] | Probabilistic semantic scene graph + symbolic constraints (flatness, clearance), edge-deployable |
| Temporal-logic trajectory generation | Vision-TL-Action [arXiv:2607.26770] | Coordinate-free TL syntax graphs fused with visual tokens via cross-attention |
| Open-vocabulary manipulation via symbols | GRASP [arXiv:2606.12910] | VLM translates natural language → PDDL goals → real-time task-and-motion planning |

## 3. Ontology Construction & Population

- Robot-ontology population from URDF: LLM-guided extraction of embodied semantics (URDF → populated robot ontology, arXiv:2606.17073 lineage)
- Design principle from OntoPlan: align objects, spaces, relations, and states in **one shared symbolic vocabulary** before planning — spatial facts delivered as raw text to an LLM blow up token cost and lose spatial context
- Prefer **open-vocabulary + updatable** scene graphs (DynamicGSG) for long-term robot operation in changing environments

## 4. Design Rules

1. **One vocabulary, many modules**: a spatial ontology pays off only when perception, planning, and action all commit to the same symbolic vocabulary
2. **Soft predicates over hard thresholds**: noisy perception breaks binary spatial decisions — use soft, perspective-aware predicates (SATURN) with a symbolic executor separated from perception
3. **Scene graphs as the bridge**: between raw Gaussians/meshes and symbolic reasoning, the 3D scene graph is the current best-served interface (GraphWrit3R, DynamicGSG, Graph-GSReg, Prior-SG)
4. **Grounding before planning**: knowledge must lift to metric space (depth-lifted semantic 3D representation, HiWE) before motion-level use
5. **Update paths are first-class**: real environments change; a representation without an update protocol (DynamicGSG's environment adaptation) is a dead map

## 5. Red Lines

- Do NOT claim an ontology/scene-graph capability without a verifiable mechanism in the cited paper — every claim must map to a library method with arXiv ID
- Do NOT recommend representations from memory — re-query `data/methods.json` (Ontology & Knowledge Representation) first
- Do NOT promise exact symbolic guarantees from LLM components — LLM outputs enter as **soft, verifiable predicates**, never as axioms (KLDrive's structured-fact pattern)
- No fabricated method names, arXiv IDs, or benchmark numbers; if unverified, mark `unverified`

## 6. Related Skills

- **super-agent** — agentic frameworks that consume these representations (OntoPlan is itself an agentic framework)
- **3dgs-spatial-agent** — spatial intelligence agent (scene understanding substrate)
- **cad-mesh-3dgs** — geometry↔Gaussian bridging under the scene graph
- **3dgs-experiment-planner** — designing evaluation for structured-representation papers
- **cg-paper-writing** — when writing any of the above up
