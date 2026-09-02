
# PR Submission Preparation — anthropics/skills

> This document contains the prepared PR description for submitting Awesome Gaussian Skills to the official `anthropics/skills` repository. Copy the content below into a GitHub PR when ready to submit.

## PR Title

```
Add Awesome Gaussian Skills — 15 3DGS research lifecycle skills + MCP sculpt pipeline (801+ methods)
```

## PR Description

```markdown
## Awesome Gaussian Skills

A collection of 15 research-grade AI Agent skills covering the entire 3D Gaussian Splatting (3DGS) research lifecycle — from paper reading to production deployment. Built on a knowledge base of 801+ methods across 23 categories with 108+ known code bug patterns and 60+ runtime training failure patterns. Includes a working MCP server (v1.1.0) with 21 core tools, a spec-first sculpting pipeline, SLAT latent editing, and cross-scene latent transfer for voice-driven 3D scene construction.

### Skills Included (15)

| # | Skill | Purpose | Phase |
|---|-------|---------|-------|
| 1 | `3dgs-paper-reader` | Read and summarize 3DGS papers | Pre-research |
| 2 | `3dgs-method-compare` | Compare methods across 11 dimensions (Router architecture) | Pre-research |
| 3 | `3dgs-code-reviewer` | Review code for 108+ known bug patterns (Self-Check Loop) | Pre-training |
| 4 | `3dgs-experiment-planner` | Design experiments for CVPR/ICCV/SIGGRAPH | Pre-training |
| 5 | `3dgs-training-debugger` | Diagnose runtime training failures: OOM, NaN, divergence, artifacts (60+ patterns) | During training |
| 6 | `3dgs-visualizer` | Generate publication-quality charts | Post-training |
| 7 | `cg-paper-writing` | Write CG/3D vision papers — CVPR/SIGGRAPH (Router architecture) | Post-training |
| 8 | `3dgs-engineering-guide` | Deploy 3DGS from research to production (Router architecture) | Post-training |
| 9 | `3dgs-compression-deploy` | Compress & deploy: quantize, prune, VQ, stream, Web/Mobile | Post-training |
| 10 | `cad-mesh-3dgs` | Bridge CAD/Mesh and 3DGS representations (40+ methods) | Cross-phase |
| 11 | `3dgs-spatial-agent` | 3DGS/CAD/Mesh spatial intelligence agent | Cross-phase |
| 12 | `3dgs-mcp-renderer` | MCP-controlled Three.js/3DGS rendering + sculpt pipeline + SLAT latent editing + cross-scene transfer (21 core + 13 experimental tools) | Cross-phase |
| 13 | `3dgs-articulated-reasoner` | Articulated object reasoning & digital twin | Cross-phase |
| 14 | `nerf-to-3dgs-migrator` | Migrate NeRF methods to 3DGS | Cross-phase |
| 15 | `patent-software-ip` | Generate patent/copyright docs from AI projects | Cross-phase |

### Anthropic Skills Standard Compliance

- [x] YAML frontmatter with `name` and `description` (required by spec)
- [x] Each skill in own directory with `SKILL.md`
- [x] Progressive disclosure: SKILL.md files under 500 lines, large content in `references/`
- [x] Compatible with Claude Code (`.claude/`), Cursor (`.cursor/rules/`) layouts
- [x] All skills include `## Red Lines` anti-hallucination guardrails
- [x] All skills include `## Guardrail: Do Not Apply From Memory`
- [x] All skills include `## Related Skills` cross-references
- [x] 4 skills include Self-Check Loop verification
- [x] License: Apache-2.0

### Key Features

1. **Progressive disclosure architecture**: 3 skills use Router architecture with `manifest.yaml` + `static/` fragments for efficient context usage
2. **Anti-hallucination guardrails**: Every skill enforces categorical prohibitions against fabricated data, hallucinated citations, and silent speculation
3. **Domain-specific bug databases**: 108+ static code review patterns + 60+ runtime training patterns
4. **Knowledge base integration**: Shared `references/` directory with 801+ method entries, updated daily
5. **MCP server with sculpt + SLAT pipeline**: `3dgs-mcp-renderer` includes a working TypeScript MCP server (v1.1.0) with 21 core tools (import, render, query, modify, prune, sculpt, export, encode/edit/list latent, transfer/interpolate latent) and 13 experimental tool stubs. The spec-first sculpting pipeline supports 6-stage gate-evaluated sculpting (blockout → structural → form → material → surface → lighting) with code-first export to Three.js procedural geometry + .splat binary. SLAT latent editing adds encode/edit/decode of structured scene latents with 7 edit ops and a 10% safety gate; cross-scene transfer re-applies a latent edit across scenes (relative change) and interpolates two scenes in latent space.
6. **Voice-driven scene construction**: 42 regex-based voice intent rules map natural language to MCP tool calls, including 8 sculpting-specific and 11 SLAT-specific commands (9 single-scene + 2 cross-scene) for stage-by-stage pipeline execution

### Installation

```bash
# Clone the repository
git clone https://github.com/jaccen/Awesome-Gaussian-Skills.git

# Use with Claude Code
cp -r Awesome-Gaussian-Skills/skills/* ~/.claude/skills/

# Or use with Cursor
cp -r Awesome-Gaussian-Skills/skills/* .cursor/rules/
```

### Testing

Each skill can be tested independently:

    /3dgs-paper-reader 2403.11188
    /3dgs-code-reviewer train.py
    /3dgs-training-debugger "NaN at iteration 500"
    /3dgs-method-compare 3DGS Mip-NeRF360

MCP server tests (71 tests, Node.js test runner):

    cd mcp-server && npm test

### Repository

- **GitHub**: https://github.com/jaccen/Awesome-Gaussian-Skills
- **License**: Apache-2.0
- **Version**: v1.1.0 (MCP server) / v0.8.2 (knowledge base)
- **Last updated**: September 2, 2026
```

## Spec Compliance Summary

| Spec Requirement | Status | Notes |
|-----------------|--------|-------|
| `name` in frontmatter | 15/15 (100%) | All lowercase with hyphens |
| `description` in frontmatter | 15/15 (100%) | Detailed, includes both English and Chinese triggers |
| Own directory + SKILL.md | 15/15 (100%) | Standard structure |
| SKILL.md under 500 lines | 15/15 (100%) | All skills under 500 lines (trimmed in v0.8.1) |
| `## Red Lines` | 15/15 (100%) | Anti-hallucination guardrails |
| `## Related Skills` | 15/15 (100%) | Cross-references |
| `## Guardrail: Do Not Apply From Memory` | 15/15 (100%) | Knowledge freshness guard |

## MCP Server Status (v1.1.0)

| Component | Status | Details |
|-----------|--------|---------|
| Core tools (21) | Implemented | import_scene, set_camera, modify_gaussians, render_frame, query_scene, cast_ray, export_result, prune_by_importance, set_gaussian_density, adjust_opacity, set_rotation, query_spatial_context, resolve_voice_command, define_scene_spec, sculpt_pipeline, export_scene_code, encode_scene_slatent, edit_scene_latent, list_slatents, transfer_scene_edit, interpolate_scene_latent |
| Experimental tools (13) | Schema-only stubs | Requires INCLUDE_EXPERIMENTAL=1 env var |
| Sculpt pipeline (6 stages) | Implemented | blockout → structural → form → material → surface → lighting, with quality gate evaluation |
| SLAT latent editing (3 tools) | Implemented | encode_scene_slatent / edit_scene_latent / list_slatents, 7 edit ops, 10% safety gate |
| SLAT cross-scene transfer (2 tools) | Implemented | transfer_scene_edit / interpolate_scene_latent, voxel-grid spatial correspondence, 10% safety gate |
| Voice intent rules (42) | Implemented | 23 core + 8 sculpting + 9 SLAT + 2 cross-scene rules |
| Code-first export | Implemented | Three.js procedural JS + .splat binary, standalone HTML with CDN |
| Tests | 71 tests | 7 test files covering exporters, PLY, pruning/spatial, voice validation, sculpt pipeline, SLAT, cross-scene transfer |
| TypeScript compilation | 0 errors | strict mode, ES2022 |

## Remaining Technical Debt (Non-blocking for PR)

1. ~~Trim `cad-mesh-3dgs/SKILL.md` (537 lines)~~ — Done in v0.8.1 (now 448 lines)
2. ~~Trim `3dgs-mcp-renderer/SKILL.md` (542 lines)~~ — Done in v0.8.1 (now 271 lines)
3. ~~Add unit tests for sculpt.ts~~ — Done in v0.9.0 (sculpt.test.mjs)
4. ~~Add standalone HTML export with CDN Three.js~~ — Done in v0.9.0
5. Standardize `static/` to `references/` naming in 3 Router skills (optional)
6. Real STT integration (Whisper) — v1.0 roadmap item
7. SLAT-integrated latent editing — v1.0 roadmap item

These do not affect functionality or spec compliance (spec only requires name + description).