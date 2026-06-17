

# MCP Integration Roadmap: Agent-Controlled 3DGS Rendering Pipeline

> Version: 0.1.0 | Date: 2026-06-17 | Status: Design Phase

## Overview

This document outlines the technical roadmap for integrating MCP (Model Context Protocol) with 3DGS rendering pipelines, extending beyond the existing `3dgs-mcp-renderer` skill's prototype specification toward a production-grade Agent↔3DGS interaction framework.

## Current State

The `skills/3dgs-mcp-renderer/SKILL.md` (v0.3.0) defines a prototype architecture:
- Voice/Text → Agent → MCP Server → 3DGS Renderer (Three.js/WebGPU)
- 6 MCP tools: `import_scene`, `set_camera`, `render_view`, `adjust_gaussian`, `query_scene`, `export_result`
- 3 additional tools from v0.3.2: `simulate_physics`, `query_4d_scene`, `deform_elastic`
- Transport: WebSocket/HTTP between MCP Server and Renderer

## Phase 1: 3DGS-Specific MCP Tools (v0.4.0 target)

### New Tools

| Tool | Description | Priority |
|------|-------------|----------|
| `set_gaussian_density` | Control Gaussian count per region via density map; targets oversmoothing in flat regions and underdetail in complex regions | High |
| `adjust_opacity` | Batch-adjust opacity values for selected Gaussians; supports per-Gaussian opacity adjustment | High |
| `prune_by_importance` | Agent-driven importance-based pruning; integrates Prune Wisely DoG strategy at runtime | High |
| `set_rotation` | Per-Gaussian rotation control for articulated object manipulation (FreeArtGS/ArtGS integration) | Medium |
| `adaptive_tessellation` | Dynamically adjust proxy mesh tessellation density (Proxy-GS integration) | Medium |
| `lod_switch` | Switch Level-of-Detail for streaming FVV (StreamLoD-GS integration) | Medium |
| `distractor_decompose` | Separates transient objects from static background (DeSplat integration) | Low |

### Tool Specification: `prune_by_importance`

```json
{
  "name": "prune_by_importance",
  "description": "Agent-controlled importance-based pruning of Gaussians using DoG or gradient-based strategy",
  "inputSchema": {
    "type": "object",
    "properties": {
      "scene_id": { "type": "string" },
      "strategy": { "enum": ["dog", "gradient", "sparsity", "variational"], "description": "Pruning strategy" },
      "target_ratio": { "type": "number", "minimum": 0.1, "maximum": 0.9, "description": "Target Gaussian retention ratio" },
      "preserve_regions": { "type": "array", "items": { "type": "object" }, "description": "Bounding boxes of regions to protect from pruning" }
    },
    "required": ["scene_id", "strategy", "target_ratio"]
  }
}
```

## Phase 2: Voice-Driven Closed-Loop Architecture (v0.5.0 target)

```
┌──────────┐     ┌───────────┐     ┌──────────────┐     ┌────────────────┐
│  Voice    │────▶│  Intent    │────▶│  MCP Tool    │────▶│  3DGS Renderer │
│  Input    │     │  Recog.    │     │  Selection   │     │  (Three.js/    │
│(Whisper/  │     │(Agent LLM) │     │  + Params    │     │   WebGPU/HiGS) │
│ Azure STT)│     │            │     │              │     │                │
└──────────┘     └───────────┘     └──────────────┘     └────────────────┘
     ▲                                                        │
     │              ┌───────────┐                             │
     └──────────────│  Visual   │◀────────────────────────────┘
                    │  Feedback │  Rendered frame / metrics
                    │(Screenshot│  returned to Agent
                    │  + Desc.)  │
                    └───────────┘
```

### Intent Recognition Mapping

| Voice Pattern | Intent | MCP Tool Call |
|---------------|--------|---------------|
| "Make it less blurry" | Increase detail in under-refined regions | `set_gaussian_density` + `adjust_opacity` |
| "Remove that person" | Distractor removal | `distractor_decompose` |
| "Make it smaller/faster" | Reduce model size | `prune_by_importance` (target_ratio=0.3) |
| "Rotate the arm" | Articulated manipulation | `set_rotation` (part="arm", angle=30°) |
| "Show me from above" | Camera change | `set_camera` (view="top-down") |
| "Make it run faster" | LOD or compression | `lod_switch` (level="low") or compression |

## Phase 3: Multi-Agent 3DGS Orchestration (v1.0+ vision)

- **Scene Analyst Agent**: Evaluates rendering quality, identifies artifacts
- **Optimization Agent**: Adjusts density control, pruning, opacity
- **Physics Agent**: Manages simulation parameters (RAF/FreeForm integration)
- **Export Agent**: Handles format conversion (PLY→OBJ→STEP via cad-mesh-3dgs pipeline)

Agents communicate via shared MCP Server state, coordinating through semantic scene graphs.

## Dependencies

| Component | Current | Target | Status |
|-----------|---------|--------|--------|
| threejs-devtools-mcp | v0.1.0 | v0.2.0+ | Experimental |
| @modelcontextprotocol/server-threejs | v0.1.0 | v0.3.0+ | Experimental |
| gsplat (WebGPU renderer) | 5.1k+ stars | 6.0+ | Active |
| Spark 2.0 (browser renderer) | Production | Integration candidate | Released |

## Risks & Mitigations

| Risk | Impact | Mitigation |
|------|--------|------------|
| WebGPU browser support limited | Rendering fallback | Maintain WebGL2 fallback path |
| MCP tool latency for real-time rendering | User experience | Pre-compute common operations; async pipeline |
| Proxy mesh generation overhead | Prune/performance tools | Cache proxy mesh; incremental updates |

## Timeline

- **v0.4.0** (Jul 2026): Phase 1 — 4 new MCP tools, `prune_by_importance` spec integrated
- **v0.5.0** (Aug 2026): Phase 2 — Voice-driven closed-loop demo
- **v1.0** (Sep 2026): Phase 3 prototype — Multi-agent orchestration + CI/CD