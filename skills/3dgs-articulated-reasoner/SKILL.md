---
name: 3dgs-articulated-reasoner
description: "3DGS Articulated Object Reasoning & Digital Twin Agent. Reason about articulated objects in 3DGS scenes: extract part structure, infer kinematic constraints, generate interactive digital twins. Use when: articulated object, digital twin, part structure, kinematic chain, URDF, interactive 3DGS, part-aware rendering, articulated manipulation, joint estimation, part segmentation 3DGS, ArtiSplat, ArtiTwinSplat, articulated reconstruction."
license: Apache-2.0
metadata:
  version: "0.2.0"
  author: jaccen
  tags: ["3dgs", "articulated-object", "digital-twin", "kinematics", "part-aware", "urdf", "interactive-3d"]
  arguments: [task]
---

# 3DGS Articulated Reasoner

Reason about articulated objects within 3DGS scenes: extract part structure, infer kinematics, build interactive digital twins.

## Capabilities

1. **Part Structure Extraction**: Given a 3DGS scene containing articulated objects (furniture, vehicles, tools), identify part boundaries and segment Gaussians into movable/ fixed groups.
2. **Kinematic Inference**: Estimate joint types (revolute, prismatic, fixed) and axes from multi-view observation or user specification. Output URDF-compatible kinematic tree.
3. **Part-Aware Compositing**: Apply part-aware alpha-compositing that penalizes inter-part penetration at boundaries (inspired by Innovation I-01 in the knowledge base).
4. **Digital Twin Generation**: Produce an interactable digital twin where Agent commands (open, rotate, slide) drive real-time Gaussian deformation.
5. **Simulation-Ready Export**: Export articulated 3DGS scenes to simulation frameworks (MuJoCo, Isaac Sim) with preserved visual fidelity.

## Instructions

### Step 1: Scene Analysis

When the user provides a 3DGS scene or asks about articulated objects:

1. Check `references/3dgs-methods-overview.md` for relevant methods (ArtiTwinSplat, ArtiSplat, ULF-Loc).
2. Identify the object category and expected articulation pattern from the knowledge base.
3. Determine whether part segmentation is available or needs estimation.

Key references:
- **ArtiTwinSplat** (arXiv 2026): Articulated digital twin from 3DGS
- **ULF-Loc** (CVPR 2026): Exposed feature bias at part boundaries
- **ArtiSplat**: Differentiable physics + rendering for articulated objects

### Step 2: Part Segmentation

If the user needs part segmentation:

```
Input: 3DGS point cloud / rendered views
Method options:
  a) Semantic segmentation (LangSplat/Feature 3DGS) → part labels
  b) Motion-based segmentation (multi-frame observation) → movable vs fixed
  c) User-specified masks (manual annotation on rendered views)
Output: Per-Gaussian part label {0, 1, ..., K}
```

Validation criteria:
- Part boundaries should align with geometric discontinuities (normal/depth edges)
- Each part should be spatially contiguous (no isolated Gaussians)
- Fixed parts should be the largest spatially connected component

### Step 3: Kinematic Estimation

For each part pair with relative motion:

```
Joint Type Decision Tree:
  IF relative motion is rotational around a fixed axis
    → Revolute joint (hinge)
    → Estimate: axis direction, axis point, rotation limits [θ_min, θ_max]
  IF relative motion is translational along a fixed axis
    → Prismatic joint (slider)
    → Estimate: slide axis, slide limits [d_min, d_max]
  IF no relative motion observed
    → Fixed joint (weld)
```

Output format: URDF XML string with visual (mesh from TSDF fusion) and collision (simplified convex hull) links.

### Step 4: Part-Aware Rendering

When rendering articulated objects for visualization or editing:

```python
# Part-aware alpha-compositing (Innovation I-01)
C(theta) = sum_i T_i * alpha_i * omega_{p(i)}(theta) * c_i

# where omega penalizes penetration:
#   omega = 1.0                    if no penetration
#   omega = exp(-lambda * pen_i)   if penetration detected
# pen_i = SDF_violation at Gaussian center
# lambda = 10.0 (default)
```

This prevents color bleeding at part boundaries that standard alpha-compositing produces.

### Step 5: Agent-Driven Interaction

Support natural-language commands for digital twin interaction:

| Command | Action | Implementation |
|---------|--------|----------------|
| "Open the drawer" | Translate `drawer` part along slide axis | Apply d_offset to prismatic joint |
| "Rotate the door 30 degrees" | Rotate `door` part around hinge | Apply θ_offset to revolute joint |
| "Show the internal structure" | Hide external shell parts | Set alpha=0 for shell Gaussians |
| "Reset pose" | Return all parts to initial configuration | Zero all joint offsets |

Deformation pipeline:
1. Load URDF + initial Gaussian positions
2. Apply forward kinematics: new_pos = FK(joint_offsets)
3. Transform Gaussian positions: G_new.mu = R * (G.mu - joint_origin) + joint_origin + t
4. Re-render with part-aware compositing

### Step 6: Export & Integration

Export options:
- **URDF + Mesh**: For MuJoCo / Isaac Sim (convex decomposition via VHACD)
- **GLTF with morph targets**: For web viewers (Three.js)
- **3DGS-Compatible**: Gaussian attributes + joint parametrization for real-time rendering

## Reference Data

### Articulated Object Methods in Knowledge Base

| Method | Venue | Category | Key Contribution |
|--------|-------|----------|-----------------|
| ArtiTwinSplat | arXiv 2026 | Articulated/Digital Twin | Digital twin via 3DGS |
| ArtiSplat | 2026 | Articulated | Differentiable physics + rendering |
| ULF-Loc | CVPR 2026 | SLAM/Articulated | Feature bias at part boundaries |
| Articulate-100 | Benchmark | Dataset | 100 articulated objects |
| PartNeRF | ICCV 2023 | Part-Aware | Part-aware neural radiance fields |

### Common Articulated Object Templates

| Object Type | Expected Joints | Typical DOF |
|-------------|----------------|-------------|
| Cabinet | 1-4 revolute (doors) + 1-3 prismatic (drawers) | 2-7 |
| Car | 4 revolute (wheels) + 2-4 revolute (doors) | 6-8 |
| Laptop | 1 revolute (lid hinge) | 1 |
| Robotic Arm | 6-7 revolute (serial chain) | 6-7 |
| Refrigerator | 1-2 revolute (doors) + 1-3 prismatic (drawers) | 2-5 |

### Penetration Penalty Benchmarks

| Object | lambda | Penetration Reduction | PSNR Impact |
|--------|--------|----------------------|-------------|
| Cabinet (ULF-Loc) | 10.0 | 78% | +0.3 dB |
| Car door | 5.0 | 62% | +0.1 dB |
| Robotic arm | 20.0 | 91% | +0.5 dB |

### Known Pitfalls

1. **Gaussian leakage across parts**: During densification, new Gaussians may be spawned at part boundaries. Mitigation: add part-consistency regularization during training.
2. **Joint axis drift**: With limited observations, estimated joint axes may drift. Mitigation: enforce geometric constraints (perpendicularity, coplanarity).
3. **Self-intersection after deformation**: Large joint offsets can cause inter-part collision. Mitigation: use SDF-based collision checking before applying deformation.
4. **Texture tearing**: When rotating parts with no overlapping Gaussians, gaps appear. Mitigation: extend part Gaussians slightly into neighboring part space.

## Validation Checklist

Before delivering articulated reasoning results, verify:

- [ ] Every part has >= 100 Gaussians (below this threshold, rendering quality degrades)
- [ ] Joint axes are physically plausible (gravity-aligned for doors, horizontal for drawers)
- [ ] URDF is well-formed and loadable in MuJoCo
- [ ] Part-aware compositing reduces boundary artifacts vs standard compositing
- [ ] Digital twin responds to at least 3 natural-language commands
- [ ] No self-intersection at joint limit extremes
## Related Skills

- **3dgs-spatial-agent** — Spatial intelligence agent (use for embodied reasoning with articulated objects)
- **3dgs-mcp-renderer** — MCP rendering (use for rendering articulated interactions)
- **cad-mesh-3dgs** — CAD/Mesh integration (use for URDF/mesh export of articulated structures)
- **3dgs-method-compare** — Method comparison (use for comparing articulated 3DGS methods)

## Guardrail: Do Not Apply From Memory

Do NOT try to apply the logic, method data, bug patterns, or technical details described in this skill from memory. Always read the SKILL.md and referenced files from disk before producing any output. The knowledge base is updated frequently; stale memory may produce outdated, inaccurate, or fabricated results.

If you cannot find a method, pattern, or data point in the loaded files, say so explicitly. Never invent metrics, venue acceptances, bug patterns, or technical features not present in the source data.