# MCP Tools Specification — Full JSON Schemas

> Extracted from SKILL.md. Loaded on demand when full tool schema details are needed.

## Voice-Driven Sculpting Example

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

## Tool 1: `import_scene`

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

## Tool 2: `set_camera`

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

## Tool 3: `modify_gaussians`

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

## Tool 4: `render_frame`

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

## Tool 5: `query_scene`

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

## Tool 6: `cast_ray`

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

## Tool 7: `simulate_physics`

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

## Tool 8: `query_4d_scene`

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

## Tool 9: `deform_elastic`

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

## Tool 10: `query_spatial_context`

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

## Tool 11: `bayesian_density_control`

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

## Tool 12: `moe_deform`

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

## Tool 13: `surgical_tracking`

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

## Tool 14: `query_provenance`

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

## Tool 15: `set_pbr_material`

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

## Tool 16: `deformable_aggregate`

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

## Tool 17: `set_stereoscopic`

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

## Tool 18: `define_scene_spec`

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

## Tool 19: `sculpt_pipeline`

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

## Tool 20: `export_scene_code`

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