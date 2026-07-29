---
name: 3dgs-mcp-renderer
description: "MCP protocol integration with 3DGS rendering pipeline: Agent-controlled Three.js/WebGPU rendering, voice-driven scene reconstruction, real-time parameter manipulation, light tracing backend. Use when: MCP rendering, agent-controlled 3DGS, voice-driven reconstruction, real-time 3DGS editing, Three.js 3DGS, WebGPU Gaussian splatting, interactive rendering control, speech-to-3D, light tracing, HiGS accelerated rendering."
license: Apache-2.0
metadata:
  version: "0.8.0"
  author: jaccen
  tags: ["mcp", "3dgs", "gaussian-splatting", "rendering", "three.js", "webgpu", "voice", "agent", "interactive", "spec-first", "sculpting", "code-first"]
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

## Spec-First Sculpting Pipeline (v0.8.0)

> **Design inspiration**: img2threejs (GitHub: img2threejs/img2threejs) — open-source AI Skill that converts a single image into an interactive Three.js 3D model via a stage-gated sculpting pipeline. We borrow two core principles: (1) **spec-first** — define quality criteria and component hierarchy before any rendering; (2) **stage-gated sculpting** — progressive refinement with acceptance checks at each stage.

### Why Spec-First for MCP Rendering?

The original MCP pipeline was **reactive**: user issues a voice command → agent maps to a tool → render → verify. This works for single-step edits but fails for complex scene construction because:

- No upfront quality criteria → agent cannot self-assess before rendering
- No stage gates → errors compound across steps (bad camera → bad selection → bad edit)
- No component hierarchy → edits are flat, no part-level control

**The fix**: Introduce a `define_scene_spec` tool that runs *before* any sculpting/editing tools. This produces a machine-readable Object Spec that subsequent tools reference as acceptance criteria.

### The 6-Stage Sculpting Pipeline

```
┌─────────────────────────────────────────────────────────────┐
│                    SPEC-FIRST SCULPTING                      │
│                                                             │
│  ┌──────────────┐                                           │
│  │ define_scene │  ← Object Spec: component hierarchy,      │
│  │ _spec        │    material system, quality criteria      │
│  └──────┬───────┘                                           │
│         │                                                   │
│         ▼                                                   │
│  Stage 1: blockout    → Bounding boxes, camera framing     │
│         │  gate: bbox coverage ≥ spec.target_coverage?      │
│         ▼                                                   │
│  Stage 2: structural  → Part decomposition, hierarchy      │
│         │  gate: part count & nesting matches spec?         │
│         ▼                                                   │
│  Stage 3: form        → Gaussian density/scale/rotation     │
│         │  gate: PSNR estimate ≥ spec.min_psnr?             │
│         ▼                                                   │
│  Stage 4: material    → PBR/SH assignment per part         │
│         │  gate: material count per part matches spec?      │
│         ▼                                                   │
│  Stage 5: surface     → Normal consistency, thin structures │
│         │  gate: normal consistency score ≥ spec.threshold? │
│         ▼                                                   │
│  Stage 6: lighting    → Environment, shadows, AO           │
│            gate: render quality score ≥ spec.target_score?  │
└─────────────────────────────────────────────────────────────┘
```

Each stage is an MCP tool call. The agent renders a frame after each stage, evaluates against the gate, and either advances or retries. This mirrors img2threejs's `blockout → structural → form → material → surface → lighting` flow.

### Gate Evaluation Protocol

For each stage gate, the agent follows this protocol:

```
1. Execute stage tool (e.g., sculpt_form with parameters)
2. Call render_frame() to get current visual state
3. Call query_scene(query_type="stats") to get quantitative metrics
4. Compare metrics against spec gate criteria
5. If pass → advance to next stage
6. If fail → adjust parameters and retry (max 3 attempts)
7. If 3 failures → report to user with diagnostic info
```

### Voice-Driven Sculpting Example

```
User: "Build me a 3D scene of a desk with a monitor and keyboard"

Agent pipeline:
  1. define_scene_spec(
       components: ["desk", "monitor", "keyboard"],
       hierarchy: {"desk": [], "monitor": ["screen", "stand"], "keyboard": ["keys", "body"]},
       quality: {min_psnr: 25, target_coverage: 0.85, normal_consistency: 0.8}
     )
     → spec_id: "desk_scene_v1"

  2. sculpt_pipeline(stage="blockout", spec_id="desk_scene_v1")
     → Places bounding boxes for desk, monitor, keyboard
     → Gate: coverage = 0.90 ✓ (≥ 0.85)

  3. sculpt_pipeline(stage="structural", spec_id="desk_scene_v1")
     → Decomposes monitor into screen + stand, keyboard into keys + body
     → Gate: part count = 5, matches hierarchy ✓

  4. sculpt_pipeline(stage="form", spec_id="desk_scene_v1")
     → Adjusts Gaussian density on each part
     → Gate: PSNR estimate = 27.3 ✓ (≥ 25)

  5. sculpt_pipeline(stage="material", spec_id="desk_scene_v1")
     → Assigns: desk=wood, monitor_screen=glass, keyboard=plastic
     → Gate: materials per part ✓

  6. sculpt_pipeline(stage="surface", spec_id="desk_scene_v1")
     → Enforces normal consistency on flat surfaces
     → Gate: normal_consistency = 0.85 ✓ (≥ 0.8)

  7. sculpt_pipeline(stage="lighting", spec_id="desk_scene_v1")
     → Adds desk lamp environment light
     → Gate: quality_score = 0.87 ✓ (≥ 0.85)

  8. export_scene_code(spec_id="desk_scene_v1", format="threejs+splat")
     → Outputs: scene.js (procedural geometry) + scene.splat (3DGS data)
```

## Code-First Rendering Philosophy (v0.8.0)

> **Design inspiration**: img2threejs outputs pure Three.js code (not GLB/OBJ/PLY), making every model fully editable, version-controllable, and lightweight. We adopt this philosophy for 3DGS scene export.

### Traditional 3DGS Export vs Code-First Export

| Aspect | Traditional (.ply/.splat) | Code-First (.js + .splat) |
|--------|--------------------------|--------------------------|
| Editability | Binary blob, hard to edit | Source code, any field adjustable |
| Version control | Binary diff, no merge | Text diff, git-friendly |
| File size | Full Gaussian set (MB-GB) | Code skeleton (KB) + compressed splat data |
| Scene composition | Single flat Gaussian cloud | Hierarchical code with part-level control |
| Interaction logic | Must be added externally | Embedded in code |
| 3DGS data | All in one file | Separate .splat file loaded by code |
| Procedural elements | Not supported | Parametric geometry in code (e.g., desk surface = PlaneGeometry) |

### Hybrid: Procedural Code + 3DGS Splatting

The key insight: **not everything needs to be Gaussians**. For a desk scene:
- Desk surface → procedural `BoxGeometry` in code (simple, editable, lightweight)
- Monitor screen texture → procedural `MeshStandardMaterial` (or 3DGS if view-dependent)
- Complex organic objects → 3DGS splatting data (where procedural code can't compete)

```javascript
// Code-first export example: desk_scene.js
import * as THREE from 'three';
import { SplatLoader } from './splat-loader.js';

export function createDeskScene() {
  const scene = new THREE.Scene();
  
  // === Procedural geometry (from sculpting spec) ===
  // Desk: simple parametric geometry
  const desk = new THREE.Mesh(
    new THREE.BoxGeometry(1.2, 0.05, 0.6),
    new THREE.MeshStandardMaterial({ color: 0x8B4513, roughness: 0.7 })
  );
  desk.position.set(0, 0.75, 0);
  scene.add(desk);
  
  // Keyboard: procedural + label-based grouping
  const keyboardGroup = new THREE.Group();
  // ... key meshes generated procedurally ...
  scene.add(keyboardGroup);
  
  // === 3DGS splatting (for complex/organic elements) ===
  // Monitor: splatting data for view-dependent reflections
  const monitorSplat = new SplatLoader();
  monitorSplat.load('monitor.splat').then(splat => {
    splat.setPosition(0, 0.95, -0.15);
    scene.add(splat);
  });
  
  // === Lighting (from sculpting stage 6) ===
  const lamp = new THREE.PointLight(0xFFE4B5, 0.8);
  lamp.position.set(0.4, 1.2, 0.2);
  scene.add(lamp);
  
  return scene;
}
```

### When to Use Code-First vs Pure Splat

| Scene Element | Recommendation | Why |
|--------------|---------------|-----|
| Flat surfaces (walls, floors, desks) | Procedural code | Simple, editable, tiny file size |
| Parametric objects (cabinets, shelves) | Procedural code | Adjust dimensions in code |
| Organic objects (plants, food, fabric) | 3DGS splat | Can't match quality procedurally |
| View-dependent surfaces (screens, mirrors) | 3DGS splat | SH coefficients capture view dependence |
| Articulated parts (joints, hinges) | Procedural code | Joint parameters are explicit in code |
| Mixed scenes (most real cases) | Hybrid code + splat | Best of both worlds |

### SLAT Connection

The code-first approach connects to SLAT (see `references/slat-unified-representation.md`): the structured latent's voxel grid naturally maps to a procedural geometry skeleton, while the per-voxel features decode to 3DGS splatting for complex regions. **SLAT encode → hierarchical decode: simple voxels → procedural code, complex voxels → 3DGS splats.**

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

### Tool 18: `define_scene_spec`

```json
{
  "name": "define_scene_spec",
  "description": "Define an Object Spec before any sculpting or editing. Establishes component hierarchy, material system, and quality gate criteria. Inspired by img2threejs spec-first methodology. Must be called before sculpt_pipeline stages.",
  "inputSchema": {
    "type": "object",
    "properties": {
      "components": {
        "type": "array",
        "items": {"type": "string"},
        "description": "Top-level component names (e.g., ['desk', 'monitor', 'keyboard'])"
      },
      "hierarchy": {
        "type": "object",
        "description": "Part decomposition tree. Keys are component names, values are arrays of sub-part names.",
        "additionalProperties": {
          "type": "array",
          "items": {"type": "string"}
        }
      },
      "materials": {
        "type": "array",
        "items": {
          "type": "object",
          "properties": {
            "name": {"type": "string"},
            "type": {"enum": ["procedural", "pbr", "splat", "hybrid"]},
            "params": {"type": "object"}
          }
        },
        "description": "Material system definition (procedural code, PBR attributes, or 3DGS splat)"
      },
      "quality_gates": {
        "type": "object",
        "properties": {
          "min_psnr": {"type": "number", "default": 20},
          "target_coverage": {"type": "number", "default": 0.8, "description": "Fraction of bbox occupied by geometry"},
          "normal_consistency": {"type": "number", "default": 0.7},
          "max_gaussian_count": {"type": "integer", "default": 500000}
        }
      },
      "scene_id": {"type": "string", "description": "Existing scene to associate spec with, or omit for new scene"}
    },
    "required": ["components"]
  },
  "output": {
    "type": "object",
    "properties": {
      "spec_id": "string",
      "stage_order": {"type": "array", "items": {"type": "string"}, "description": "['blockout', 'structural', 'form', 'material', 'surface', 'lighting']"},
      "validation": "object"
    }
  }
}
```

**Use cases**: Voice-driven scene construction, quality-controlled 3DGS editing, hierarchical part-level scene management

### Tool 19: `sculpt_pipeline`

```json
{
  "name": "sculpt_pipeline",
  "description": "Execute one stage of the spec-first sculpting pipeline. Each stage refines the scene progressively: blockout (bounding boxes) → structural (part decomposition) → form (Gaussian density/scale) → material (PBR/SH) → surface (normal consistency) → lighting (environment). Automatically evaluates stage gate after execution.",
  "inputSchema": {
    "type": "object",
    "properties": {
      "spec_id": {"type": "string", "description": "Spec ID from define_scene_spec"},
      "stage": {
        "enum": ["blockout", "structural", "form", "material", "surface", "lighting"],
        "description": "Sculpting stage to execute"
      },
      "params": {
        "type": "object",
        "description": "Stage-specific parameters (varies by stage)",
        "properties": {
          "blockout": {
            "type": "object",
            "properties": {
              "auto_layout": {"type": "boolean", "default": true, "description": "Auto-arrange component bounding boxes"},
              "layout_hint": {"type": "string", "description": "Natural language layout guidance"}
            }
          },
          "form": {
            "type": "object",
            "properties": {
              "density_strategy": {"enum": ["uniform", "curvature-aware", "saliency-weighted"], "default": "saliency-weighted"},
              "target_count": {"type": "integer", "description": "Target Gaussian count for this stage"}
            }
          },
          "material": {
            "type": "object",
            "properties": {
              "infer_from_appearance": {"type": "boolean", "default": false, "description": "Use InvSplat inverse feed-forward"},
              "material_assignments": {"type": "object", "description": "Part name → material name mapping"}
            }
          },
          "lighting": {
            "type": "object",
            "properties": {
              "environment_map": {"type": "string", "description": "HDRI environment map URL or preset name"},
              "enable_shadows": {"type": "boolean", "default": true},
              "enable_ao": {"type": "boolean", "default": true}
            }
          }
        }
      },
      "max_retries": {"type": "integer", "default": 3, "description": "Max retry attempts if gate fails"}
    },
    "required": ["spec_id", "stage"]
  },
  "output": {
    "type": "object",
    "properties": {
      "stage": "string",
      "gate_passed": "boolean",
      "gate_metrics": "object",
      "gate_criteria": "object",
      "retries_used": "integer",
      "next_stage": {"type": "string", "description": "Next stage if gate passed, or 'retry'/'failed'"}
    }
  }
}
```

**Gate criteria per stage**:

| Stage | Gate Metric | Source | Criteria |
|-------|------------|--------|----------|
| blockout | bbox_coverage | query_scene stats | ≥ spec.quality_gates.target_coverage |
| structural | part_count_match | query_scene segmentation | Matches spec.hierarchy part count |
| form | psnr_estimate | render_frame + metric | ≥ spec.quality_gates.min_psnr |
| material | material_coverage | query_scene materials | All parts have assigned materials |
| surface | normal_consistency | query_scene stats | ≥ spec.quality_gates.normal_consistency |
| lighting | quality_score | render_frame + perceptual metric | ≥ 0.8 (relative scale) |

**Use cases**: Progressive scene construction, quality-gated 3DGS editing, automated scene refinement with acceptance checks

### Tool 20: `export_scene_code`

```json
{
  "name": "export_scene_code",
  "description": "Export the current scene as Three.js code + 3DGS splat data (code-first rendering philosophy). Simple/parametric elements become procedural Three.js geometry code; complex/organic elements become compressed .splat files. Produces a version-controllable, editable export instead of a binary blob.",
  "inputSchema": {
    "type": "object",
    "properties": {
      "spec_id": {"type": "string", "description": "Spec ID for component hierarchy and material mapping"},
      "format": {
        "enum": ["threejs+splat", "threejs_only", "splat_only"],
        "default": "threejs+splat",
        "description": "Export format: hybrid (code+splat), pure code, or pure splat"
      },
      "code_options": {
        "type": "object",
        "properties": {
          "module_format": {"enum": ["esm", "commonjs"], "default": "esm"},
          "include_comments": {"type": "boolean", "default": true},
          "split_files": {"type": "boolean", "default": true, "description": "Split into scene.js + per-part files"},
          "interaction_hooks": {"type": "boolean", "default": true, "description": "Include interaction event hooks in code"}
        }
      },
      "splat_compression": {
        "type": "object",
        "properties": {
          "format": {"enum": ["ply", "splat", "spz", "ksplat"], "default": "splat"},
          "quantization": {"enum": ["f32", "f16", "int8"], "default": "f16"},
          "prune_threshold": {"type": "number", "default": 0.01, "description": "Opacity pruning threshold"}
        }
      },
      "partition_strategy": {
        "enum": ["spec_hierarchy", "spatial", "flat"],
        "default": "spec_hierarchy",
        "description": "How to partition scene into code-vs-splat: spec_hierarchy uses component parts, spatial uses voxel blocks, flat exports all as splat"
      }
    },
    "required": ["spec_id"]
  },
  "output": {
    "type": "object",
    "properties": {
      "code_file": "string (file path to .js scene code)",
      "splat_files": {"type": "array", "items": {"type": "string"}, "description": "File paths to .splat data per partition"},
      "manifest": {
        "type": "object",
        "description": "Scene manifest: part → (code function | splat file) mapping",
        "properties": {
          "procedural_parts": "array",
          "splat_parts": "array",
          "total_code_size_kb": "number",
          "total_splat_size_mb": "number"
        }
      },
      "scene_graph": "object"
    }
  }
}
```

**Partition strategy**:

```javascript
// spec_hierarchy partitioning logic:
for (const component of spec.components) {
  const partType = classifyPart(component);  // procedural | splat | hybrid
  if (partType === 'procedural') {
    // Generate Three.js geometry code
    codeFile += generateGeometryCode(component, spec);
  } else if (partType === 'splat') {
    // Export Gaussians as .splat file
    splatFile = exportGaussians(getGaussiansByLabel(component));
  } else {  // hybrid
    // Simple base as code, complex details as splat
    codeFile += generateBaseGeometryCode(component);
    splatFile = exportGaussians(getDetailGaussians(component));
  }
}
```

**Use cases**: Version-controllable 3DGS scene export, web-deployable hybrid rendering, editable scene handoff between agents or humans, lightweight scene sharing

## Voice Intent Mapping

| Voice Intent Example | Intent Type | MCP Tool Call |
|----------------------|-------------|---------------|
| "Build a scene with a desk and monitor" | Scene spec definition | `define_scene_spec` (components=["desk","monitor"]) |
| "Start with the rough layout" | Sculpting: blockout | `sculpt_pipeline` (stage="blockout") |
| "Decompose into parts" | Sculpting: structural | `sculpt_pipeline` (stage="structural") |
| "Refine the geometry" | Sculpting: form | `sculpt_pipeline` (stage="form") |
| "Assign materials" | Sculpting: material | `sculpt_pipeline` (stage="material") |
| "Fix the surfaces" | Sculpting: surface | `sculpt_pipeline` (stage="surface") |
| "Set up lighting" | Sculpting: lighting | `sculpt_pipeline` (stage="lighting") |
| "Export as editable code" | Code-first export | `export_scene_code` (format="threejs+splat") |
| "Export scene code only" | Procedural-only export | `export_scene_code` (format="threejs_only") |
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
| Spec-first sculpting | define_scene_spec + sculpt_pipeline (6 stages) | Prototype (v0.8.0) |
| Code-first export | Three.js code generator + splat partitioner | Prototype (v0.8.0) |

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
- [x] v0.8: Spec-first sculpting pipeline (define_scene_spec + sculpt_pipeline 6 stages) + Code-first rendering export (export_scene_code) + Bayesian density control (DP-Splat) + MoE deformation (MoE-GS/MoDE) + Surgical tracking (Track2Map)
- [ ] v0.9: SLAT-integrated latent editing (edit structured latent → re-decode to 3DGS)
- [ ] v1.0: Full voice-driven scene construction (spec → sculpt → export pipeline)

## Rules

1. **Never modify original PLY files**: All operations are in-memory only; export requires explicit user command
2. **Validate before render**: Always verify camera parameters and Gaussian bounds before rendering
3. **Respect GPU limits**: Check available VRAM before loading large scenes; provide downsampling option
4. **Report rendering time**: Always include render_time_ms in render_frame output for performance monitoring
5. **Safety gate**: Operations affecting >10% of Gaussians require explicit user confirmation
6. **Spec before sculpt** (v0.8.0): `sculpt_pipeline` must not be called without a valid `spec_id`. The spec defines acceptance criteria; without it, gate evaluation is impossible.
7. **Stage order enforced** (v0.8.0): Sculpting stages must execute in order: blockout → structural → form → material → surface → lighting. Skipping stages requires explicit user override.
8. **Code-first default** (v0.8.0): When exporting a scene, prefer `export_scene_code` with `format="threejs+splat"` over pure .ply export. Pure .ply should only be used when the user explicitly requests a binary blob.

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
- **cad-mesh-3dgs** — CAD/Mesh/3DGS conversion (use for code-first export partitioning and SLAT encoding)
- **nerf-to-3dgs-migrator** — NeRF migration (use for SLAT-based component mapping)
- **SLAT unified representation** — See `references/slat-unified-representation.md` for the shared theoretical framework underlying scene code-first export and latent editing

## Guardrail: Do Not Apply From Memory

Do NOT try to apply the logic, method data, bug patterns, or technical details described in this skill from memory. Always read the SKILL.md and referenced files from disk before producing any output. The knowledge base is updated frequently; stale memory may produce outdated, inaccurate, or fabricated results.

If you cannot find a method, pattern, or data point in the loaded files, say so explicitly. Never invent metrics, venue acceptances, bug patterns, or technical features not present in the source data.