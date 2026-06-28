name: 3dgs-method-compare
description: "Compare 3D Gaussian Splatting variants across 11 dimensions. Built-in knowledge of 713+ methods across 25 categories. Supports axis-driven fragment loading for efficient context usage."
version: 3.1.0
author: jaccen
tags: ["3dgs", "gaussian-splatting", "method-comparison", "research"]
when_to_use:
  - "Compare 3DGS methods or variants"
  - "Analyze trade-offs between Gaussian Splatting approaches"
  - "Generate comparison tables for 3DGS papers"
  - "Find the best 3DGS method for a specific scenario"
  - "检索3DGS方法对比、3D高斯泼溅方法比较"
---

# 3DGS Method Comparison Engine (Router)

> **Architecture**: Axis-driven static/dynamic router. Do NOT try to apply the comparison logic from memory or from this router alone. Always load fragments from disk as described below.

## Step 1 — Detect Request Axes

Analyze the user's request to determine axis values:

### Axis: category
| User Intent | category value |
|-------------|---------------|
| Foundation/baseline methods, opacity, compression | core |
| Surface reconstruction, geometry, text-to-3D generation | geometry |
| Language features, semantic, feed-forward inference | semantic |
| SLAM, large-scale scene, urban reconstruction | slam |
| Dynamic scenes, 4DGS, human/avatar, articulated objects | dynamic |
| Cross-domain, autonomous driving, spatial intelligence, editing, systems | pplication |
| Broad/unspecified comparison across many categories | ll |

### Axis: depth
| User Intent | depth value |
|-------------|-------------|
| Quick lookup, single method info | quick |
| Standard comparison (2-5 methods, focused analysis) | standard |
| Comprehensive survey, full-category scan | comprehensive |

If the user does not specify, defaults are: category=all, depth=standard.

## Step 2 — Load Required Fragments

### Always Load (every invocation)
Read these files from static/:
- static/core-stance.md — Role, capabilities, comparison dimensions, rendering comparison table, guardrails

### On-Demand Load (by detected category)
Read the corresponding fragment(s) from static/:

| category | Fragment to Load |
|----------|-----------------|
| core | static/methods-core.md |
| geometry | static/methods-geometry.md |
| semantic | static/methods-semantic.md |
| slam | static/methods-slam.md |
| dynamic | static/methods-dynamic.md |
| pplication | static/methods-application.md |
| ll | ALL method fragments (methods-core.md through methods-application.md) |

### Reference Load (when producing structured output)
- static/output-rules.md — Output format template and comparison rules

**Optimization**: For depth=quick, load only the relevant category fragment + core-stance. For depth=comprehensive, load all fragments plus output-rules.

## Step 3 — Execute Comparison

After loading the required fragments:

1. Apply the comparison dimensions from core-stance.md
2. Use method data from the loaded category fragment(s)
3. Follow output format from output-rules.md if producing tables/reports
4. Observe all guardrails (no fabrication, flag uncertainty, load from disk not memory)

## Cross-Skill Routing

This skill focuses on method-level comparison. For related workflows:
- **Paper reading/analysis** → 3dgs-paper-reader
- **Code review/bug detection** → 3dgs-code-reviewer
- **Experiment design** → 3dgs-experiment-planner
- **Engineering deployment** → 3dgs-engineering-guide
- **Visualization/radar charts** → 3dgs-visualizer
- **CAD/Mesh integration** → cad-mesh-3dgs
- **Spatial intelligence/agent** → 3dgs-spatial-agent

## Related Skills

- **3dgs-paper-reader** — Deep reading and analysis of 3DGS papers (use when you need detailed paper understanding, not just method comparison)
- **3dgs-code-reviewer** — Bug detection and code review for 3DGS implementations (use when comparing implementation quality)
- **3dgs-experiment-planner** — Experiment design for 3DGS research (use when comparison informs experiment design)
- **3dgs-engineering-guide** — Production deployment of 3DGS (use when comparison targets deployment scenarios)
- **3dgs-visualizer** — Publication-quality comparison visualizations (use when comparison needs radar charts or timeline plots)
- **3dgs-spatial-agent** — Spatial intelligence and embodied reasoning with 3DGS

> If you like it, please star this repo https://github.com/jaccen/Awesome-Gaussian-Skills