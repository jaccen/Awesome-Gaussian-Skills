---
name: 3dgs-mcp-renderer
description: "MCP protocol integration with 3DGS rendering pipeline: Agent-controlled Three.js/WebGPU rendering, voice-driven scene reconstruction, real-time parameter manipulation, light tracing backend. Use when: MCP rendering, agent-controlled 3DGS, voice-driven reconstruction, real-time 3DGS editing, Three.js 3DGS, WebGPU Gaussian splatting, interactive rendering control, speech-to-3D, light tracing, HiGS accelerated rendering."
license: Apache-2.0
metadata:
  version: "1.0.0"
  author: jaccen
  tags: ["mcp", "3dgs", "gaussian-splatting", "rendering", "three.js", "webgpu", "voice", "agent", "interactive", "spec-first", "sculpting", "code-first", "slat", "latent-editing"]
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

## Spec-First Sculpting Pipeline (v0.9.0)

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

> **Loaded on demand** — See [mcp-tools-spec.md](references/mcp-tools-spec.md) for the full voice-driven sculpting example (desk scene with 8-step agent pipeline).

## Code-First Rendering Philosophy (v0.9.0)

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

> **Loaded on demand** — See [code-first-examples.md](references/code-first-examples.md) for hybrid export code examples.

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

The code-first approach connects to SLAT (see `../../references/slat-unified-representation.md`): the structured latent's voxel grid naturally maps to a procedural geometry skeleton, while the per-voxel features decode to 3DGS splatting for complex regions. **SLAT encode → hierarchical decode: simple voxels → procedural code, complex voxels → 3DGS splats.**

## SLAT Latent Editing (v1.0.0)

> **Theoretical basis**: SLAT (Structured Latent Aggregation Transform) — see `../../references/slat-unified-representation.md`. A scene is encoded into a compact structured latent (a voxel grid over the scene, each voxel aggregating local Gaussian features), edited in latent space, then re-decoded back to a Gaussian set. This lets the agent manipulate entire semantic regions with a single operation, independent of per-Gaussian IDs.

### Encoding: Scene → Structured Latent

`encode_scene_slatent` voxelizes the active scene into a regular grid (`voxel_size`, default 1.0), assigning each Gaussian to a voxel by position. Each voxel stores an aggregated feature vector (mean position, mean scale, mean color, mean opacity, size, plus optional weighted semantic/part labels). The result is a `slat_id` referencing an in-memory snapshot with an `encode_loss` (reconstruction RMSE), letting the agent judge fidelity before editing.

### Editing in Latent Space

`edit_scene_latent` applies a `LatentEditOp` to voxels matched by a `LatentSelector` (by voxel ids, a spatial box, or a part name — substring, case-insensitive). Seven operations are supported:

| Op | Fields | Effect |
|----|--------|--------|
| `translate` | `delta: Vec3` | Move matched voxels (and their Gaussians) by a vector |
| `scale` | `factor: number`, `origin: Vec3` | Scale voxel positions relative to an origin |
| `rotate` | `angleDeg: number`, `axis: Vec3`, `origin: Vec3` | Rotate voxels around an axis (degrees) |
| `recolor` | `color: Vec3`, `mix: number` | Blend matched voxels' colors toward a target |
| `opacity` | `opacity: number`, `mode` | Set or scale opacity (mode `set`/`scale`) |
| `smooth` | `iterations: number`, `strength: number` | Smooth feature positions/colors by averaging neighbors |
| `delete` | `target: "voxel"` | Remove all Gaussians in matched voxels |

**Schema vs core naming**: the MCP JSON schema uses snake_case (`angle_deg`); the internal `LatentEditOp` uses camelCase (`angleDeg`). Handlers convert at the boundary. Library/test callers use camelCase directly.

**Safety gate**: `edit_scene_latent` computes `affected_gaussians`; if this exceeds 10% of the scene, the edit is rejected unless `confirm=true`. This reuses the project-wide 10% safety rule.

**Apply to scene**: with `apply_to_scene=true` (default) the edit is re-decoded and broadcast to the renderer via `modify_gaussians`; with `false` it only updates the in-memory snapshot, so the agent can preview/cancel before committing.

### Decoding: Latent → Scene

Decoding rebuilds the Gaussian set: matched voxels are re-instantiated from edited features, untouched voxels keep their original Gaussians. `delete` removes the affected Gaussians entirely.

### Voice-Driven SLAT Example

> **Loaded on demand** — See [mcp-tools-spec.md](references/mcp-tools-spec.md) for full SLAT voice examples ("encode the scene", "move the cluster left", "scale the group up", etc.).

## MCP Tools Specification

19 core MCP tools (fully implemented) + 13 experimental tools (schema-only stubs) enable agent-controlled 3DGS rendering, editing, sculpting, latent editing, and export. Full JSON schemas are loaded on demand.

| # | Tool Name | Description |
|---|-----------|-------------|
| 1 | `import_scene` | Load a 3DGS scene from PLY/SPLAT file or URL |
| 2 | `set_camera` | Set camera position, target, and field of view |
| 3 | `modify_gaussians` | Modify Gaussian properties by selection criteria (IDs, region, label) |
| 4 | `render_frame` | Render current scene from current camera as image |
| 5 | `query_scene` | Query scene stats, bbox, point, segmentation, or materials |
| 6 | `cast_ray` | Cast ray for distance/normal via DDF-GS neural field |
| 7 | `simulate_physics` | Invoke external physics engine (MPM/SPH/PBD) on 3DGS scene |
| 8 | `query_4d_scene` | Query dynamic 3D scene at arbitrary (x,y,t) coordinates |
| 9 | `deform_elastic` | Apply particle-skinned eigenmode deformation to 3DGS object |
| 10 | `query_spatial_context` | Spatial understanding query (grounding, relation, measurement, scene graph) |
| 11 | `bayesian_density_control` | DP-Splat Bayesian nonparametric Gaussian density control |
| 12 | `moe_deform` | MoE-GS/MoDE mixture-of-experts dynamic deformation |
| 13 | `surgical_tracking` | Track2Map surgical instrument tracking and tissue mapping |
| 14 | `query_provenance` | GaussTrace provenance query and IP forgery detection |
| 15 | `set_pbr_material` | Set PBR material properties (MGM/InvSplat) on selected Gaussians |
| 16 | `deformable_aggregate` | GADA feed-forward 3DGS from multi-view images |
| 17 | `set_stereoscopic` | Stereoscopic dual-eye rendering (StereoGS) for VR/AR |
| 18 | `define_scene_spec` | Define Object Spec (hierarchy, materials, quality gates) before sculpting |
| 19 | `sculpt_pipeline` | Execute one stage of spec-first sculpting (6 stages, gate-evaluated) |
| 20 | `export_scene_code` | Export scene as Three.js code + 3DGS splat (code-first philosophy) |
| 21 | `encode_scene_slatent` | Encode current scene into a SLAT structured latent snapshot (voxel grid + per-voxel features) |
| 22 | `edit_scene_latent` | Apply a latent edit (translate/scale/rotate/recolor/opacity/smooth/delete) to a SLAT snapshot, optionally re-decode to scene |
| 23 | `list_slatents` | List in-memory SLAT snapshots (id, voxel count, source Gaussian count) |

> **Full tool schemas loaded on demand** — See [mcp-tools-spec.md](references/mcp-tools-spec.md) for complete JSON schemas, sculpting examples, and reconstruction flows.

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
| "Encode the scene as a latent snapshot" | SLAT encoding | `encode_scene_slatent` |
| "Move the cluster to the left" | SLAT translate | `edit_scene_latent` (op="translate", select part="cluster") |
| "Scale the whole group up" | SLAT scale | `edit_scene_latent` (op="scale") |
| "Rotate the table 90 degrees" | SLAT rotate | `edit_scene_latent` (op="rotate", angleDeg=90) |
| "Recolor the background to blue" | SLAT recolor | `edit_scene_latent` (op="recolor") |
| "Fade out the distant objects" | SLAT opacity | `edit_scene_latent` (op="opacity") |
| "Smooth the table surface" | SLAT smooth | `edit_scene_latent` (op="smooth") |
| "Delete the chair voxels" | SLAT delete | `edit_scene_latent` (op="delete") |
| "List my latent snapshots" | SLAT listing | `list_slatents` |

## Voice-Driven Reconstruction Flow

> **Loaded on demand** — See [mcp-tools-spec.md](references/mcp-tools-spec.md) for the full voice-driven reconstruction flow examples (camera control and transparency editing).

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
| Spec-first sculpting | define_scene_spec + sculpt_pipeline (6 stages) | Implemented (v0.9.0) |
| Code-first export | Three.js code generator + splat partitioner | Implemented (v0.9.0) |
| SLAT latent editing | encode/edit/decode structured latent (3 tools) | Implemented (v1.0.0) |

## Renderer Backend Details

> **Loaded on demand** — See [renderer-backends.md](references/renderer-backends.md) for renderer compatibility, DDF-GS, and HiGS details.

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
- [x] v0.8: Spec-first sculpting pipeline design (define_scene_spec + sculpt_pipeline 6 stages) + Code-first rendering export (export_scene_code) + Bayesian density control (DP-Splat) + MoE deformation (MoE-GS/MoDE) + Surgical tracking (Track2Map)
- [x] v0.9: Spec-first sculpting pipeline **implemented** — 3 new core tools (define_scene_spec, sculpt_pipeline, export_scene_code) with SceneSpecManager, 6-stage gate-evaluated executor, Three.js code generator, 8 voice intent patterns. E2E smoke test passing.
- [x] v1.0: SLAT-integrated latent editing **implemented** — 3 new core tools (encode_scene_slatent, edit_scene_latent, list_slatents) with SlatManager, 7 latent edit ops (translate/scale/rotate/recolor/opacity/smooth/delete), voxel-grid encoder/decoder, 9 SLAT voice intent patterns, 10% safety gate, E2E tests passing.
- [ ] v1.1: Full voice-driven scene construction (spec → sculpt → export pipeline with real STT) + SLAT-based cross-scene latent transfer

## Rules

1. **Never modify original PLY files**: All operations are in-memory only; export requires explicit user command
2. **Validate before render**: Always verify camera parameters and Gaussian bounds before rendering
3. **Respect GPU limits**: Check available VRAM before loading large scenes; provide downsampling option
4. **Report rendering time**: Always include render_time_ms in render_frame output for performance monitoring
5. **Safety gate**: Operations affecting >10% of Gaussians require explicit user confirmation
6. **Spec before sculpt** (v0.9.0): `sculpt_pipeline` must not be called without a valid `spec_id`. The spec defines acceptance criteria; without it, gate evaluation is impossible.
7. **Stage order enforced** (v0.9.0): Sculpting stages must execute in order: blockout → structural → form → material → surface → lighting. Skipping stages requires explicit user override.
8. **Code-first default** (v0.9.0): When exporting a scene, prefer `export_scene_code` with `format="threejs+splat"` over pure .ply export. Pure .ply should only be used when the user explicitly requests a binary blob.
9. **SLAT safety gate** (v1.0.0): `edit_scene_latent` affecting >10% of Gaussians requires `confirm=true`. Preview with `apply_to_scene=false` before committing destructive latent edits.
10. **Naming boundary** (v1.0.0): MCP tool arguments use snake_case (`angle_deg`); the core `LatentEditOp` uses camelCase (`angleDeg`). Handlers convert at the boundary; never mix cases in the core layer.

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
- **SLAT unified representation** — See `../../references/slat-unified-representation.md` for the shared theoretical framework underlying scene code-first export and latent editing

## Guardrail: Do Not Apply From Memory

Do NOT try to apply the logic, method data, bug patterns, or technical details described in this skill from memory. Always read the SKILL.md and referenced files from disk before producing any output. The knowledge base is updated frequently; stale memory may produce outdated, inaccurate, or fabricated results.

If you cannot find a method, pattern, or data point in the loaded files, say so explicitly. Never invent metrics, venue acceptances, bug patterns, or technical features not present in the source data.