---
name: 3dgs-mcp-renderer
description: "MCP protocol integration with 3DGS rendering pipeline: Agent-controlled Three.js/WebGPU rendering, voice-driven scene reconstruction, real-time parameter manipulation, light tracing backend. Use when: MCP rendering, agent-controlled 3DGS, voice-driven reconstruction, real-time 3DGS editing, Three.js 3DGS, WebGPU Gaussian splatting, interactive rendering control, speech-to-3D, light tracing, HiGS accelerated rendering."
license: Apache-2.0
metadata:
  version: "0.7.1"
  author: jaccen
  tags: ["mcp", "3dgs", "gaussian-splatting", "rendering", "three.js", "webgpu", "voice", "agent", "interactive"]
  disable-model-invocation: true
  user-invocable: true
---

# 3DGS MCP Renderer — Agent-3DGS Interaction via MCP Protocol

Prototype specification for integrating MCP (Model Context Protocol) with 3DGS rendering pipelines, enabling AI Agents to directly manipulate Three.js/3DGS rendering parameters and achieve voice-driven 3D scene reconstruction.

## Architecture

```
┌─────────────┐     ┌─────────────┐     ┌──────────────────┐     ┌──────────────────┐
│ Voice/Text  │────▶│   Agent     │────▶│  MCP Server      │────▶│  3DGS Renderer   │
│ (Whisper/   │     │ (Claude/    │     │  (Node.js/       │     │  (Three.js/      │
│  Prompt)    │     │  TeleClaw)  │     │   Python)        │     │   WebGPU/HiGS/   │
│             │◀────│             │◀────│                  │◀────│   DDF-GS)        │
└─────────────┘     └─────────────┘     └──────────────────┘     └──────────────────┘
                        │                      │                       │
                        │  Tool calls          │  WebSocket/HTTP       │  WebGL/WebGPU/
                        │  (MCP protocol)       │  transport            │  HiGS/DDF-GS
```

## MCP Tools Specification

### Tool 1: `import_scene`

```json
{
  "name": "import_scene",
  "description": "Load a 3DGS scene from PLY/SPLAT file or URL into the renderer",
  "inputSchema": {
    "type": "object",
    "properties": {
      "source": { "type": "string", "description": "File path or URL to .ply/.splat file" },
      "format": { "enum": ["ply", "splat", "spz", "ksplat"], "description": "File format" }
    },
    "required": ["source"]
  },
  "output": { "type": "object", "properties": { "scene_id": "string", "gaussian_count": "number", "bbox": "object" } }
}
```

### Tool 2: `set_camera`

```json
{
  "name": "set_camera",
  "description": "Set camera position, target, and field of view",
  "inputSchema": {
    "type": "object",
    "properties": {
      "position": { "type": "array", "items": {"type": "number"}, "description": "[x, y, z]" },
      "target": { "type": "array", "items": {"type": "number"}, "description": "[x, y, z] look-at point" },
      "fov": { "type": "number", "description": "Field of view in degrees" },
      "up": { "type": "array", "items": {"type": "number"}, "description": "[x, y, z] up vector" }
    },
    "required": ["position", "target"]
  }
}
```

### Tool 3: `modify_gaussians`

```json
{
  "name": "modify_gaussians",
  "description": "Modify properties of Gaussians by selection criteria",
  "inputSchema": {
    "type": "object",
    "properties": {
      "select": {
        "type": "object",
        "properties": {
          "ids": { "type": "array", "items": {"type": "integer"}, "description": "Specific Gaussian IDs" },
          "region": { "type": "object", "properties": {"center": "array", "radius": "number"}, "description": "Sphere selection" },
          "label": { "type": "string", "description": "Semantic label from segmentation" }
        }
      },
      "operations": {
        "type": "array",
        "items": {
          "type": "object",
          "properties": {
            "property": { "enum": ["opacity", "color", "position", "scale", "rotation"] },
            "action": { "enum": ["set", "add", "multiply"] },
            "value": {}
          }
        }
      }
    },
    "required": ["select", "operations"]
  }
}
```

### Tool 4: `render_frame`

```json
{
  "name": "render_frame",
  "description": "Render current scene from current camera and return as image",
  "inputSchema": {
    "type": "object",
    "properties": {
      "width": { "type": "integer", "default": 1920 },
      "height": { "type": "integer", "default": 1080 },
      "format": { "enum": ["png", "jpeg", "webp"], "default": "png" },
      "background": { "type": "string", "default": "#000000" }
    }
  },
  "output": { "type": "object", "properties": { "image": "string (base64)", "render_time_ms": "number" } }
}
```

### Tool 5: `query_scene`

```json
{
  "name": "query_scene",
  "description": "Query scene information: statistics, geometry, semantics",
  "inputSchema": {
    "type": "object",
    "properties": {
      "query_type": { "enum": ["stats", "bbox", "gaussian_at_point", "segmentation", "materials"] },
      "point": { "type": "array", "items": {"type": "number"}, "description": "[x, y, z] for point queries" }
    },
    "required": ["query_type"]
  }
}
```

### Tool 6: `cast_ray`

```json
{
  "name": "cast_ray",
  "description": "Cast a ray from origin in direction and return distance to first surface hit. Leverages DDF-GS (arXiv:2606.00817) neural field distilled from trained 3DGS.",
  "inputSchema": {
    "type": "object",
    "properties": {
      "origin": { "type": "array", "items": {"type": "number"}, "description": "[x, y, z] ray origin" },
      "direction": { "type": "array", "items": {"type": "number"}, "description": "[x, y, z] ray direction (normalized)" }
    },
    "required": ["origin", "direction"]
  },
  "output": { "type": "object", "properties": { "distance": "number", "hit": "boolean", "normal": "array [x,y,z]" } }
}
```

**Use cases**: Shadow rendering, ambient occlusion, reflection rays, global illumination

**Limitation**: Requires DDF distillation step after 3DGS training (adds ~10 min for 52MB model)

### Tool 7: `simulate_physics`

MCP Tool: simulate_physics — Invoke external physics engine (MPM/SPH/PBD) on 3DGS scene via RAF-style representation abstraction; parameters: object_ids, force, solver_type; returns: updated Gaussian positions/covariances

```json
{
  "name": "simulate_physics",
  "description": "Invoke external physics engine (MPM/SPH/PBD) on 3DGS scene via RAF-style representation abstraction",
  "inputSchema": {
    "type": "object",
    "properties": {
      "object_ids": { "type": "array", "items": {"type": "integer"}, "description": "IDs of objects to simulate" },
      "force": { "type": "object", "properties": {"linear": "array", "angular": "array"}, "description": "Applied force/torque" },
      "solver_type": { "enum": ["mpm", "sph", "pbd", "rigid_body"], "description": "Physics solver backend" },
      "dt": { "type": "number", "description": "Time step in seconds", "default": 0.016 },
      "steps": { "type": "integer", "description": "Number of simulation steps", "default": 1 }
    },
    "required": ["object_ids", "solver_type"]
  },
  "output": { "type": "object", "properties": { "updated_positions": "array", "updated_covariances": "array", "energy": "number" } }
}
```

**Use cases**: Physics-driven scene editing, collapse/fall simulation, fluid interaction with Gaussian objects

### Tool 8: `query_4d_scene`

MCP Tool: query_4d_scene — Query dynamic 3D scene at arbitrary (x,y,t) coordinates; returns: 3D position, flow vector, segmentation label; enables voice-driven temporal navigation

```json
{
  "name": "query_4d_scene",
  "description": "Query dynamic 3D scene at arbitrary (x,y,t) coordinates; enables voice-driven temporal navigation via D4RT unified query mechanism",
  "inputSchema": {
    "type": "object",
    "properties": {
      "x": { "type": "number", "description": "X coordinate in scene space" },
      "y": { "type": "number", "description": "Y coordinate in scene space" },
      "t": { "type": "number", "description": "Time index in dynamic sequence" },
      "query_fields": { "type": "array", "items": {"enum": ["position_3d", "flow_vector", "segmentation_label", "depth"]}, "description": "Fields to return" }
    },
    "required": ["x", "y", "t"]
  },
  "output": { "type": "object", "properties": { "position_3d": "array [x,y,z]", "flow_vector": "array [dx,dy,dz]", "segmentation_label": "string", "depth": "number" } }
}
```

**Use cases**: "What was here at time t=5?", temporal object tracking, voice-driven time scrubbing

### Tool 9: `deform_elastic`

MCP Tool: deform_elastic — Apply particle-skinned eigenmode deformation to 3DGS object; parameters: object_id, mode_indices, amplitudes; returns: deformed Gaussian positions

```json
{
  "name": "deform_elastic",
  "description": "Apply particle-skinned eigenmode deformation to 3DGS object (FreeForm-style elastic deformation)",
  "inputSchema": {
    "type": "object",
    "properties": {
      "object_id": { "type": "integer", "description": "ID of object to deform" },
      "mode_indices": { "type": "array", "items": {"type": "integer"}, "description": "Eigenmode indices to activate" },
      "amplitudes": { "type": "array", "items": {"type": "number"}, "description": "Amplitude per eigenmode" },
      "interpolation": { "enum": ["linear", "smoothstep"], "description": "Interpolation method for deformation", "default": "smoothstep" }
    },
    "required": ["object_id", "mode_indices", "amplitudes"]
  },
  "output": { "type": "object", "properties": { "deformed_positions": "array", "eigenmode_energies": "array" } }
}
```

**Use cases**: Elastic soft-body deformation, eigenmode-based shape editing, physically plausible object bending

### Tool 10: `query_spatial_context`

```json
{
  "name": "query_spatial_context",
  "description": "Query spatial understanding of the current 3DGS scene using spatial intelligence models (Spatial-TTT/Holi-Spatial pipeline). Returns spatial relations, grounding, and scene graph.",
  "inputSchema": {
    "type": "object",
    "properties": {
      "scene_id": { "type": "string", "description": "Scene identifier from import_scene" },
      "query": { "type": "string", "description": "Natural language spatial query about the scene" },
      "mode": { "enum": ["grounding", "relation", "measurement", "scene_graph"], "description": "Type of spatial query" }
    },
    "required": ["scene_id", "query", "mode"]
  },
  "output": { "type": "object", "properties": { "answer": "string", "spatial_data": "object", "confidence": "number" } }
}
```

Integrates Holi-Spatial (ICML 2026 Oral) data pipeline for automated spatial annotation and Spatial-TTT (ECCV 2026) for streaming spatial memory updates.

### Tool 11: `bayesian_density_control`

```json
{
  "name": "bayesian_density_control",
  "description": "Agent-controlled Bayesian nonparametric Gaussian density control. Uses DP-Splat (arXiv:2607.10912) Dirichlet-process prior to automatically determine optimal Gaussian count per region, eliminating manual density hyperparameter tuning.",
  "inputSchema": {
    "type": "object",
    "properties": {
      "scene_id": { "type": "string" },
      "concentration": { "type": "number", "minimum": 0.1, "maximum": 10.0, "description": "DP concentration parameter α (higher = more Gaussians)" },
      "base_measure": { "enum": ["uniform", "saliency-weighted", "gradient-weighted"], "description": "Base measure for DP prior" },
      "max_iterations": { "type": "integer", "default": 50, "description": "Maximum MCMC iterations for posterior inference" }
    },
    "required": ["scene_id", "concentration"]
  },
  "output": { "type": "object", "properties": { "gaussian_count": "number", "regions_adjusted": "array", "elpd": "number" } }
}
```

**Use cases**: Auto-tune density for unknown scenes, eliminate manual clone/split threshold tuning, adapt density to scene complexity

### Tool 12: `moe_deform`

```json
{
  "name": "moe_deform",
  "description": "Apply Mixture-of-Experts dynamic deformation to selected Gaussians. Uses MoE-GS/MoDE (arXiv:2607.08250, TPAMI 2026) expert routing per motion pattern for physically plausible dynamic deformation.",
  "inputSchema": {
    "type": "object",
    "properties": {
      "scene_id": { "type": "string" },
      "object_ids": { "type": "array", "items": {"type": "integer"}, "description": "IDs of objects to deform" },
      "target_motion": { "type": "string", "description": "Description of desired motion (e.g., 'wave left hand', 'open door')" },
      "num_experts": { "type": "integer", "default": 4, "description": "Number of deformation experts" },
      "temporal_range": { "type": "array", "items": {"type": "number"}, "description": "[start_time, end_time] for deformation" }
    },
    "required": ["scene_id", "object_ids", "target_motion"]
  },
  "output": { "type": "object", "properties": { "deformed_positions": "array", "expert_weights": "array", "motion_coherence": "number" } }
}
```

**Use cases**: Voice-driven character animation, dynamic scene editing with motion-specific expert routing, 4D content creation

### Tool 13: `surgical_tracking`

```json
{
  "name": "surgical_tracking",
  "description": "Track surgical instruments and reconstruct tissue map in real-time using Track2Map (arXiv:2607.08408, MICCAI 2026) surgical GS SLAM. Enables agent-assisted minimally invasive surgery guidance.",
  "inputSchema": {
    "type": "object",
    "properties": {
      "scene_id": { "type": "string" },
      "tracking_mode": { "enum": ["instrument", "tissue", "both"], "description": "What to track" },
      "update_rate_hz": { "type": "number", "default": 30, "description": "Target tracking update rate" },
      "safety_margin_mm": { "type": "number", "default": 2.0, "description": "Safety margin for collision warning (mm)" }
    },
    "required": ["scene_id", "tracking_mode"]
  },
  "output": { "type": "object", "properties": { "instrument_poses": "array", "tissue_map_update": "boolean", "collision_warnings": "array", "tracking_accuracy_mm": "number" } }
}
```

**Use cases**: Surgical navigation, instrument tracking, tissue deformation monitoring, collision avoidance in surgery

### Tool 14: `query_provenance`

```json
{
  "name": "query_provenance",
  "description": "Query 3DGS model provenance and IP forensics using GaussTrace (arXiv:2606.10612, ICML 2026). Constructs directed provenance graphs from Gaussian scene attributes for model lineage tracing, training data influence analysis, and forgery detection.",
  "inputSchema": {
    "type": "object",
    "properties": {
      "scene_id": { "type": "string" },
      "query_type": { "enum": ["lineage", "attribution", "forgery_detection", "training_data_influence"], "description": "Type of provenance query" },
      "evidence_threshold": { "type": "number", "default": 0.75, "description": "Confidence threshold for evidence graph edges" }
    },
    "required": ["scene_id", "query_type"]
  },
  "output": { "type": "object", "properties": { "provenance_graph": "object", "confidence_score": "number", "evidence_chain": "array", "forgery_flags": "array" } }
}
```

**Use cases**: 3DGS IP protection, model attribution, training data leakage detection, forgery analysis

### Tool 15: `set_pbr_material`

```json
{
  "name": "set_pbr_material",
  "description": "Set physically-based rendering (PBR) material properties on selected Gaussians using MGM (arXiv:2509.22112) and InvSplat (arXiv:2607.02301) material representations. Enables relighting without post-hoc decomposition by assigning intrinsic material attributes (albedo, metallic, roughness) directly to Gaussians.",
  "inputSchema": {
    "type": "object",
    "properties": {
      "scene_id": { "type": "string" },
      "select": { "type": "object", "description": "Selection criteria (same as modify_gaussians)" },
      "albedo": { "type": "array", "items": {"type": "number"}, "description": "[r, g, b] albedo in [0,1]" },
      "metallic": { "type": "number", "description": "Metallic factor in [0,1]" },
      "roughness": { "type": "number", "description": "Roughness factor in [0,1]" },
      "infer_from_appearance": { "type": "boolean", "default": false, "description": "Use InvSplat inverse feed-forward to infer PBR from existing appearance" }
    },
    "required": ["scene_id", "select"]
  },
  "output": { "type": "object", "properties": { "modified_count": "number", "material_preview": "string" } }
}
```

**Use cases**: Relightable 3DGS editing, material transfer, PBR asset generation, appearance decoupling

### Tool 16: `deformable_aggregate`

```json
{
  "name": "deformable_aggregate",
  "description": "Apply geometry-aware deformable aggregation (GADA, arXiv:2607.00595, ICML 2026) to feed-forward 3DGS from multi-view images. Uses deformable offsets and implicit confidence weighting for 2.13x faster FPS with improved PSNR over prior feed-forward methods.",
  "inputSchema": {
    "type": "object",
    "properties": {
      "input_views": { "type": "array", "items": {"type": "string"}, "description": "Array of image URLs or file paths" },
      "deform_offset_range": { "type": "number", "default": 0.1, "description": "Maximum deformable offset range (scene scale relative)" },
      "confidence_weighting": { "type": "boolean", "default": true, "description": "Enable implicit confidence weighting" },
      "output_format": { "enum": ["ply", "splat"], "default": "ply" }
    },
    "required": ["input_views"]
  },
  "output": { "type": "object", "properties": { "scene_id": "string", "gaussian_count": "number", "inference_time_ms": "number", "psnr_estimate": "number" } }
}
```

**Use cases**: Fast feed-forward 3DGS reconstruction, real-time multi-view splatting, generalizable 3DGS

### Tool 17: `set_stereoscopic`

```json
{
  "name": "set_stereoscopic",
  "description": "Enable stereoscopic (dual-eye) rendering mode using StereoGS energy-efficient processor paradigm. Shares compute and memory bandwidth between left and right eye views for VR/AR head-mounted displays. Approximates the StereoGS hardware accelerator in software.",
  "inputSchema": {
    "type": "object",
    "properties": {
      "scene_id": { "type": "string" },
      "enabled": { "type": "boolean", "description": "Enable or disable stereoscopic mode" },
      "ipd": { "type": "number", "default": 0.063, "description": "Interpupillary distance in meters (default: 63mm)" },
      "shared_compute": { "type": "boolean", "default": true, "description": "Share Gaussian sorting and blending between eyes (StereoGS paradigm)" },
      "output_mode": { "enum": ["side_by_side", "top_bottom", "dual_buffer"], "default": "dual_buffer" }
    },
    "required": ["scene_id", "enabled"]
  },
  "output": { "type": "object", "properties": { "left_eye_frame": "string", "right_eye_frame": "string", "render_time_ms": "number", "bandwidth_savings_pct": "number" } }
}
```

**Use cases**: VR/AR scene viewing, stereoscopic 3DGS preview, dual-eye rendering optimization

## Voice Intent Mapping

| Voice Intent Example | Intent Type | MCP Tool Call |
|----------------------|-------------|---------------|
| "What is to the left of the chair?" | Spatial grounding query | `query_spatial_context` (mode="grounding") |
| "How far is the table from the door?" | Spatial measurement | `query_spatial_context` (mode="measurement") |
| "Where did this 3D model come from?" | Provenance query | `query_provenance` (query_type="lineage") |
| "Is this 3DGS model authentic?" | Forgery detection | `query_provenance` (query_type="forgery_detection") |
| "Make this object look metallic" | PBR material edit | `set_pbr_material` (metallic=1.0) |
| "Infer materials from appearance" | Inverse material estimation | `set_pbr_material` (infer_from_appearance=true) |
| "Reconstruct from these photos fast" | Feed-forward splatting | `deformable_aggregate` (input_views=[...]) |
| "Show me in VR mode" | Stereoscopic rendering | `set_stereoscopic` (enabled=true) |
| "Adjust the eye distance" | VR IPD control | `set_stereoscopic` (ipd=value) |

## Voice-Driven Reconstruction Flow

```
User: "Show me the scene from above"
  │
  ▼
Whisper STT ──▶ Text: "Show me the scene from above"
  │
  ▼
Agent (Claude/TeleClaw) interprets:
  - Intent: Change camera to bird's-eye view
  - Parameters: position=[0, 10, 0], target=[0, 0, 0], up=[0, 0, -1]
  │
  ▼
MCP tool call: set_camera(position=[0, 10, 0], target=[0, 0, 0])
  │
  ▼
MCP tool call: render_frame(width=1920, height=1080)
  │
  ▼
Agent receives base64 image, verifies, reports to user
```

```
User: "Make the left wall transparent"
  │
  ▼
Agent:
  1. query_scene(query_type="segmentation") → find "left wall" label
  2. modify_gaussians(select={label: "left wall"}, operations=[{property: "opacity", action: "multiply", value: 0.2}])
  3. render_frame() → verify visual result
```

## Implementation Stack

| Component | Technology | Status |
|-----------|-----------|--------|
| MCP Server | Node.js + @modelcontextprotocol/sdk | Prototype |
| 3DGS Renderer | Three.js + gaussian-splat-3d / gsplat.js | Available |
| WebGPU backend | WebGPU + WGSL compute shaders | Experimental |
| HiGS backend | Dual-scale tile rasterization (arXiv:2606.00352) | Planned |
| DDF-GS backend | Neural distance field for ray queries (arXiv:2606.00817) | Planned |
| Transport | WebSocket (localhost) | Working |
| Voice STT | Whisper API / Web Speech API | Available |
| Agent integration | Claude Code / TeleClaw MCP client | Pending |

## Current Renderer Compatibility

| Renderer | Format | WebGPU | MCP-Ready | Stars |
|----------|--------|--------|-----------|-------|
| gsplat.js | .ply/.splat | Yes | Needs adapter | — |
| GaussianSplats3D | .ply | WebGL | Needs adapter | — |
| viser/nerfstudio | .ply | WebGL | Partial | — |
| PlayCanvas | .ply | Yes | Needs adapter | — |
| brush (Rust/WebGPU) | .ply | Yes | Closest | 4.3k |
| HiGS | .ply | Yes | Planned | — |
| DDF-GS | .ply + .ddf | Yes | Planned | — |

## DDF-GS Distillation Pipeline

1. Train 3DGS scene normally
2. Distill into Directed Distance Function (DDF) neural field
   - Input: trained 3DGS model (.ply)
   - Output: DDF model (~52MB, size independent of Gaussian count)
   - Training time: ~10 minutes
   - Quality: shadow at 30.3 dB PSNR, AO at 21.3 dB PSNR
3. DDF enables: shadow maps, AO, reflections, global illumination

## HiGS Hierarchical Rendering Integration

- HiGS (arXiv:2606.00352) achieves 15.8x rendering speedup via dual-scale tile architecture
- MCP integration: `render_frame()` can leverage HiGS backend for real-time rendering
- Architecture: Agent → MCP → HiGS Renderer (macro-tile partitioning + micro-tile rasterization)
- Performance target: 950+ FPS on NVIDIA GPU for interactive scene exploration

## Known Limitations

1. **Latency**: Large scenes (>1M Gaussians) require progressive loading; MCP render_frame may take 100-500ms
2. **Selection precision**: Sphere/label-based Gaussian selection may miss thin structures; need ray-picking
3. **State management**: MCP server must maintain scene state across tool calls; no built-in undo
4. **GPU memory**: WebGL/WebGPU shares GPU memory with browser; cannot load >2GB scenes on most devices

## Roadmap

- [x] v0.1: MCP tool specification (this document)
- [x] v0.2: Node.js MCP server + gsplat.js adapter + DDF-GS cast_ray tool + HiGS backend
- [ ] v0.3: Voice-to-MCP pipeline (Whisper → Agent → MCP → render) + simulate_physics (RAF) + query_4d_scene (D4RT) + deform_elastic (FreeForm)
- [ ] v0.4: Semantic querying (integrate OP2GS/Gaga for label-based selection)
- [ ] v0.5: Real-time streaming (WebSocket-based progressive rendering)
- [ ] v0.6: DDF-GS distillation integration (shadow/AO/reflection rendering)
- [ ] v0.7: HiGS hierarchical rendering backend (950+ FPS target)
- [ ] v0.8: Bayesian density control (DP-Splat) + MoE deformation (MoE-GS/MoDE) + Surgical tracking (Track2Map)

## Rules

1. **Never modify original PLY files**: All operations are in-memory only; export requires explicit user command
2. **Validate before render**: Always verify camera parameters and Gaussian bounds before rendering
3. **Respect GPU limits**: Check available VRAM before loading large scenes; provide downsampling option
4. **Report rendering time**: Always include render_time_ms in render_frame output for performance monitoring
5. **Safety gate**: Operations affecting >10% of Gaussians require explicit user confirmation

> Part of [Awesome-Gaussian-Skills](https://github.com/jaccen/Awesome-Gaussian-Skills)



## Red Lines

The following are categorical prohibitions. Violating any of these invalidates the output:

- **No invented data**: Never fabricate MCP tool schemas, API behaviors, or rendering capabilities not in the loaded reference files. If a value is not found, write "data not available" or "N/A".
- **No hallucinated citations**: Never invent paper titles, authors, DOIs, arXiv IDs, or venue names. Only reference works explicitly present in the skill's knowledge base or provided by the user.
- **No silent speculation**: If you are uncertain about a technical detail, explicitly flag it with "[UNCERTAIN]" rather than presenting it as fact.
- **No method misattribution**: Do not assign features, results, or mechanisms from one method to another. Each method's data is specific to that method.
- **No oversimplified comparisons**: Do not reduce multi-dimensional rendering trade-offs to a single judgment without context.

## Related Skills

- **3dgs-engineering-guide** — Production deployment (use for end-to-end deployment workflows)
- **3dgs-spatial-agent** — Spatial intelligence agent (use for agent-driven 3D interaction)
- **3dgs-articulated-reasoner** — Articulated object reasoning (use for interactive object manipulation)
- **3dgs-visualizer** — Visualization (use for rendering pipeline output quality assessment)

## Guardrail: Do Not Apply From Memory

Do NOT try to apply the logic, method data, bug patterns, or technical details described in this skill from memory. Always read the SKILL.md and referenced files from disk before producing any output. The knowledge base is updated frequently; stale memory may produce outdated, inaccurate, or fabricated results.

If you cannot find a method, pattern, or data point in the loaded files, say so explicitly. Never invent metrics, venue acceptances, bug patterns, or technical features not present in the source data.