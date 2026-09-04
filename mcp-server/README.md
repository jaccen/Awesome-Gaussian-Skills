

# 3DGS MCP Renderer Server

> v0.5.0 — Agent-controlled 3DGS rendering pipeline via MCP (Model Context Protocol)

Part of [Awesome-Gaussian-Skills](https://github.com/jaccen/Awesome-Gaussian-Skills) — 819+ 3DGS methods, 15 skills, 108+ bug patterns.

## Overview

This MCP server enables AI Agents (Claude, TeleClaw, etc.) to directly manipulate 3D Gaussian Splatting (3DGS) rendering parameters through the Model Context Protocol. It bridges natural language instructions to concrete 3DGS scene operations.

```
Voice/Text → Agent LLM → MCP Server (this) → Browser Renderer (Three.js)
                ↑                                        │
                └──────── Visual Feedback (screenshot) ──┘
```

## Quick Start

### 1. Install Dependencies

```bash
cd mcp-server
npm install
```

### 2. Start the MCP Server

```bash
npm run dev          # Development (tsx, hot-reload)
# or
npm run build && npm start  # Production
```

The server starts on stdio (for MCP client) and opens a WebSocket server on port 9842 (for browser renderer).

### 3. Open the Browser Renderer

```bash
npm run renderer     # Serves renderer/ on http://localhost:8080
```

Open `http://localhost:8080` in your browser. The renderer auto-connects to the MCP server via WebSocket.

### 4. Configure Your MCP Client

Add to your MCP client config (e.g., Claude Desktop `claude_desktop_config.json`):

```json
{
  "mcpServers": {
    "3dgs-renderer": {
      "command": "node",
      "args": ["path/to/Awesome-Gaussian-Skills/mcp-server/dist/index.js"]
    }
  }
}
```

## Tools (24 Total)

### Core Tools (11 — Fully Implemented)

| Tool | Description |
|------|-------------|
| `import_scene` | Load PLY/SPLAT scene (synthetic placeholder in prototype) |
| `set_camera` | Set camera position, target, FOV, up vector |
| `modify_gaussians` | Modify Gaussian properties by selection (IDs/region/label) |
| `render_frame` | Render scene and return base64 image |
| `query_scene` | Query scene stats, bbox, point, segmentation, materials |
| `cast_ray` | Ray casting for hit detection (simplified DDF-GS) |
| `export_result` | Export scene to PLY/SPLAT/JSON |
| `prune_by_importance` | Importance-based Gaussian pruning (DoG/coreset/gradient) |
| `set_gaussian_density` | Increase/decrease Gaussian density per region |
| `adjust_opacity` | Batch opacity adjustment for selected Gaussians |
| `set_rotation` | Per-Gaussian rotation (articulated part manipulation) |

### Advanced Tools (13 — Schema Complete, Backend Stub)

| Tool | Description | Source Method |
|------|-------------|---------------|
| `simulate_physics` | Physics simulation (MPM/SPH/PBD) | RAF |
| `query_4d_scene` | Temporal scene query | D4RT |
| `deform_elastic` | Eigenmode elastic deformation | FreeForm |
| `query_spatial_context` | Spatial relation/measurement query | Holi-Spatial |
| `bayesian_density_control` | Bayesian nonparametric density control | DP-Splat |
| `moe_deform` | Mixture-of-Experts deformation | MoE-GS/MoDE |
| `surgical_tracking` | Surgical instrument tracking | Track2Map |
| `query_provenance` | Model provenance & forgery detection | GaussTrace |
| `set_pbr_material` | PBR material assignment | MGM/InvSplat |
| `deformable_aggregate` | Feed-forward GADA splatting | GADA |
| `set_stereoscopic` | Stereoscopic VR rendering | StereoGS |
| `distractor_decompose` | Transient/static separation | DeSplat |
| `adaptive_tessellation` | LOD proxy mesh adjustment | Proxy-GS |
| `lod_switch` | Level-of-detail streaming | StreamLoD-GS |

## Voice Intent Mapping

The server includes a voice intent mapper (`src/voice-intent.ts`) that translates natural language to MCP tool calls:

| Voice Input | Tool Calls |
|-------------|------------|
| "Show me the scene from above" | `set_camera` (top-down) → `render_frame` |
| "Make it less blurry" | `modify_gaussians` (opacity set) → `render_frame` |
| "Make it smaller" | `prune_by_importance` (ratio=0.3) → `render_frame` |
| "Remove that person" | `distractor_decompose` → `render_frame` |
| "What is on the table?" | `query_spatial_context` (mode=relation) |
| "How far is the table from the door?" | `query_spatial_context` (mode=measurement) |
| "Make this object look metallic" | `set_pbr_material` (metallic=1.0) |
| "Show me in VR mode" | `set_stereoscopic` (enabled=true) |

## Architecture

```
mcp-server/
├── package.json              # Dependencies: @modelcontextprotocol/sdk, ws
├── tsconfig.json             # TypeScript config (ES2022, ESNext modules)
├── src/
│   ├── index.ts              # MCP server entry (stdio transport, tool registration)
│   ├── types.ts              # All TypeScript interfaces
│   ├── scene-state.ts        # In-memory scene state (Gaussians, camera, metadata)
│   ├── renderer-bridge.ts    # WebSocket server ↔ browser renderer
│   ├── voice-intent.ts       # Voice/text → MCP tool call mapping (24 patterns)
│   └── tools.ts              # 24 tool definitions (schema + handler)
├── renderer/
│   ├── index.html            # Browser renderer page (Three.js)
│   └── renderer.js           # WebSocket client + Three.js point cloud renderer
└── examples/
    └── voice-demo.ts         # Voice-driven session demo
```

### Data Flow

```
1. MCP Client (Claude/TeleClaw) sends tool call via stdio
2. MCP Server receives call, dispatches to tool handler
3. Tool handler operates on SceneState (in-memory)
4. If rendering needed: send command via WebSocket to browser
5. Browser renders with Three.js, captures canvas, sends back base64 image
6. MCP Server returns result to MCP Client
7. Agent can verify rendered image and take next action
```

## Headless Mode

The server runs in headless mode when no browser renderer is connected. In headless mode:
- Scene operations (import, modify, query, prune) work normally on in-memory state
- `render_frame` returns empty image (no visual output)
- Camera and export commands are processed without visual feedback

This allows the MCP server to be used for batch processing and testing without a browser.

## Safety Rules

1. **Never modify original PLY files** — All operations are in-memory only
2. **Validate before render** — Camera parameters and Gaussian bounds checked
3. **Safety gate** — Operations affecting >10% of Gaussians are logged with warning
4. **Report rendering time** — `render_time_ms` always included in render output

## Development

```bash
# Install
npm install

# Development (tsx hot-reload)
npm run dev

# Build
npm run build

# Run voice demo
npm run demo
```

## Integration with Skills

This server implements the specification defined in:
- `skills/3dgs-mcp-renderer/SKILL.md` (v0.7.1) — 17 core tools
- `docs/mcp-integration-roadmap.md` — Phase 1-2 roadmap, 7 additional tools

Related skills:
- `3dgs-engineering-guide` — Production deployment
- `3dgs-spatial-agent` — Spatial intelligence agent
- `3dgs-articulated-reasoner` — Articulated object reasoning
- `3dgs-visualizer` — Visualization output

## License

Apache-2.0 — Part of Awesome-Gaussian-Skills