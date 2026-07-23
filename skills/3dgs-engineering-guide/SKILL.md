---
name: 3dgs-engineering-guide
description: "Guide for deploying 3DGS from research to production: 10 industry verticals, engineering stack, GIS toolchain solutions, cross-platform deployment, and common pitfalls. References 760+ methods. Use when: deploying 3DGS to production or industry, selecting tools/pipeline/platform, troubleshooting engineering problems (OOM, artifacts, platform lock-in), integrating 3DGS with GIS/BIM/ROS2/game engines, 3DGS部署/高斯泼溅工程化/3DGS生产环境/工程指南."
license: Apache-2.0
user-invocable: true
metadata:
  version: "2.0.0"
  author: jaccen
  tags: ["3dgs", "gaussian-splatting", "engineering", "deployment", "digital-twin", "autonomous-driving"]
  when_to_use:
    - "Deploy 3DGS to production or an industry application"
    - "Select tools, pipeline, or platform for a 3DGS deployment scenario"
    - "Troubleshoot engineering problems with 3DGS (OOM, artifacts, platform lock-in)"
    - "Integrate 3DGS with GIS, BIM, ROS2, or game engines"
    - "3DGS部署 / 高斯泼溅工程化 / 3DGS生产环境 / 工程指南"
---

# 3DGS Engineering Guide (Router)

> **Architecture**: Axis-driven static/dynamic router. Do NOT try to apply the engineering guidance from memory or from this router alone. Always load fragments from disk as described below.

## Step 1 — Detect Request Axes

Analyze the user's request to determine axis values:

### Axis: domain
| User Intent | domain value |
|-------------|-------------|
| Autonomous driving simulation, sensor sim | autonomous-driving |
| Digital twin, smart city, GIS | digital-twin |
| Cultural heritage, museum, 3D archiving | culture |
| Film, game production, virtual production | film-games |
| E-commerce, 3D product display, WebAR | ecommerce |
| Industrial inspection, drone survey | industrial |
| AR/VR/MR headsets, spatial computing | ar-vr |
| BIM, architecture, as-built verification | bim |
| Robotics, embodied AI, manipulation | robotics |
| Military simulation, defense | military |
| World model, interactive 3D world | world-model |
| Unspecified or broad engineering question | all |

### Axis: focus
| User Intent | focus value |
|-------------|-------------|
| Data acquisition, reconstruction, deployment pipeline | pipeline |
| Quality assurance, scalability, cross-platform | best-practices |
| Debugging artifacts, OOM, deployment failures | pitfalls |
| Choosing tools by use case/platform/scale | decision-tree |
| Specific technology stack info (formats, compression, engines) | tech-stack |
| GIS integration, spatial analysis, S3M/Cesium | gis-toolchain |
| Unspecified or comprehensive engineering guidance | all |

If the user does not specify, defaults are: domain=all, focus=all.

## Step 2 — Load Required Fragments

### Always Load (every invocation)
Read these files from static/:
- static/core-stance.md — Role, workflow, deployment scale reference, terminology, guardrails

### On-Demand Load (by detected domain)
All domain values load `static/industry-landscape.md` (the landscape fragment covers all 10 verticals + world models). The Router will focus attention on the relevant section within the loaded fragment.

### On-Demand Load (by detected focus)
| focus | Fragment(s) to Load |
|-------|-------------------|
| pipeline | static/tech-stack.md |
| best-practices | static/best-practices.md |
| pitfalls | static/pitfalls.md |
| decision-tree | static/decision-trees.md |
| tech-stack | static/tech-stack.md |
| gis-toolchain | static/gis-toolchain.md |
| all | All focus fragments (tech-stack, best-practices, pitfalls, decision-trees, gis-toolchain) |

### Reference Load (when citing specific methods)
- static/reference-papers.md — Method tables organized by domain

**Optimization**: For a focused question (e.g., "how to deploy 3DGS on Quest 3"), load core-stance + industry-landscape (domain=ar-vr section) + tech-stack. For broad planning (e.g., "start a digital twin project"), load all fragments.

## Step 3 — Execute Engineering Guidance

After loading the required fragments:

1. Identify use case from domain axis — focus on the relevant industry section
2. Recommend pipeline from tech-stack fragment
3. Reference specific methods from reference-papers fragment and knowledge base
4. Provide concrete next steps — actionable items, not generic advice
5. Warn about pitfalls from pitfalls fragment — highlight domain-specific failure modes

## Cross-Skill Routing

This skill focuses on production engineering. For related workflows:
- **Method comparison** → 3dgs-method-compare (for selecting methods for deployment)
- **Code review/bug detection** → 3dgs-code-reviewer (for detecting deployment-critical bugs)
- **MCP rendering** → 3dgs-mcp-renderer (for real-time rendering integration)
- **Spatial intelligence** → 3dgs-spatial-agent (for agent-driven deployment scenarios)
- **CAD/Mesh integration** → cad-mesh-3dgs (for BIM/CAD workflows)


## Red Lines

The following are categorical prohibitions. Violating any of these invalidates the output:

- **No invented data**: Never fabricate deployment metrics, VRAM numbers, or system requirements not in the loaded reference files. If a value is not found, write "data not available" or "N/A".
- **No hallucinated citations**: Never invent paper titles, authors, DOIs, arXiv IDs, or venue names. Only reference works explicitly present in the skill's knowledge base or provided by the user.
- **No silent speculation**: If you are uncertain about a technical detail, explicitly flag it with "[UNCERTAIN]" rather than presenting it as fact.
- **No method misattribution**: Do not assign features, results, or mechanisms from one method to another. Each method's data is specific to that method.
- **No oversimplified recommendations**: Do not reduce complex deployment trade-offs to a single "use this" judgment without considering the target environment.

## Related Skills

- **3dgs-method-compare** — Method comparison (use for selecting methods for deployment)
- **3dgs-code-reviewer** — Code review (use for detecting deployment-critical bugs)
- **3dgs-mcp-renderer** — MCP rendering protocol (use for real-time rendering integration)
- **3dgs-spatial-agent** — Spatial intelligence (use for agent-driven deployment scenarios)

## Guardrail: Do Not Apply From Memory

Do NOT try to apply the logic, method data, bug patterns, or technical details described in this skill from memory. Always read the SKILL.md and referenced files from disk before producing any output. The knowledge base is updated frequently; stale memory may produce outdated, inaccurate, or fabricated results.

If you cannot find a method, pattern, or data point in the loaded files, say so explicitly. Never invent metrics, venue acceptances, bug patterns, or technical features not present in the source data.

> If you like it, please star this repo https://github.com/jaccen/Awesome-Gaussian-Skills
