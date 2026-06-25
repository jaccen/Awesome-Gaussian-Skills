---
# MCP Integration Roadmap: Agent-Controlled 3DGS Rendering Pipeline

> Version: 0.2.0 | Date: 2026-06-25 | Status: Design Phase

## Overview

This document outlines the technical roadmap for integrating MCP (Model Context Protocol) with 3DGS rendering pipelines, extending beyond the existing `3dgs-mcp-renderer` skill's prototype specification toward a production-grade Agent↔3DGS interaction framework.

## Current State

The `skills/3dgs-mcp-renderer/SKILL.md` (v0.5.0) defines a prototype architecture:
- Voice/Text → Agent → MCP Server → 3DGS Renderer (Three.js/WebGPU)
- 6 MCP tools: `import_scene`, `set_camera`, `render_view`, `adjust_gaussian`, `query_scene`, `export_result`
- 3 additional tools from v0.3.2: `simulate_physics`, `query_4d_scene`, `deform_elastic`
- 1 tool from v0.5.0: `query_spatial_context` (Holi-Spatial/Spatial-TTT integration)
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


## Phase 1.5: Spatial Intelligence & Articulated Integration (v0.4.5 target)

### New Spatial Intelligence Tools

| Tool | Description | Source Method | Priority |
|------|-------------|---------------|----------|
| `query_spatial_context` | Query spatial relations between objects (on, inside, next-to) using Holi-Spatial representations | Holi-Spatial (ICML 2026) | High |
| `test_time_adapt` | Apply test-time spatial training to adapt to new viewpoints/scenes at inference | Spatial-TTT (ECCV 2026) | High |
| `spatial_data_lookup` | Access OpenSpatial 3M+ spatial data engine for reference scenes and layouts | OpenSpatial (arXiv 2026) | Medium |

### Articulated Reasoning Tools

| Tool | Description | Integration | Priority |
|------|-------------|-------------|----------|
| `segment_parts` | Segment Gaussians into articulated/fixed parts via semantic + motion cues | 3dgs-articulated-reasoner skill | High |
| `estimate_kinematics` | Infer joint type, axis, and limits from multi-view observation | URDF output | High |
| `manipulate_part` | Apply joint offset to deform articulated part in real-time | Part-aware compositing | Medium |
| `check_collision` | SDF-based self-collision checking at joint limit extremes | MuJoCo integration | Medium |

### Tool Specification: `query_spatial_context`

```json
{
  "name": "query_spatial_context",
  "description": "Query spatial relationships between objects in a 3DGS scene using learned spatial representations",
  "inputSchema": {
    "type": "object",
    "properties": {
      "scene_id": { "type": "string" },
      "query_type": { "enum": ["relation", "affordance", "navigation", "layout"], "description": "Type of spatial query" },
      "target_objects": { "type": "array", "items": { "type": "string" }, "description": "Object names or IDs to query about" },
      "relation_filter": { "type": "string", "description": "Optional: specific relation to filter (on, inside, next-to, supports, blocks)" }
    },
    "required": ["scene_id", "query_type"]
  }
}
```

### Tool Specification: `manipulate_part`

```json
{
  "name": "manipulate_part",
  "description": "Manipulate an articulated part in a 3DGS scene by applying joint offsets",
  "inputSchema": {
    "type": "object",
    "properties": {
      "scene_id": { "type": "string" },
      "part_name": { "type": "string", "description": "Name of the articulated part (e.g. door, drawer, arm)" },
      "joint_type": { "enum": ["revolute", "prismatic", "fixed"] },
      "offset": { "type": "number", "description": "Joint offset in degrees (revolute) or meters (prismatic)" },
      "animate": { "type": "boolean", "default": false, "description": "Whether to animate the transition" },
      "collision_check": { "type": "boolean", "default": true, "description": "Whether to check for self-collision before applying" }
    },
    "required": ["scene_id", "part_name", "joint_type", "offset"]
  }
}
```

### Voice Intent Map (Extended)

| Voice Pattern | Intent | MCP Tool Call |
|---------------|--------|---------------|
| "What is on the table?" | Spatial relation query | `query_spatial_context` (query_type=relation) |
| "Can I open this drawer?" | Affordance query + manipulation | `query_spatial_context` (query_type=affordance) → `manipulate_part` |
| "Move the robot arm 45 degrees" | Articulated manipulation | `manipulate_part` (part=arm, offset=45) |
| "Show me the scene from a new angle" | Test-time spatial adaptation | `test_time_adapt` → `render_view` |
| "Find similar room layouts" | Spatial data lookup | `spatial_data_lookup` (query_type=layout) |
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
- **v0.4.5** (Jul 2026): Phase 1.5 — Spatial intelligence + articulated reasoning tools, `3dgs-articulated-reasoner` skill integration
- **v0.5.0** (Aug 2026): Phase 2 — Voice-driven closed-loop demo
- **v1.0** (Sep 2026): Phase 3 prototype — Multi-agent orchestration + CI/CD