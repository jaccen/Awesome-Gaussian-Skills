# SplatVerse Studio: Short Video Creation

SplatVerse Studio integrates **3D Gaussian Splatting** with a short-drama pipeline powered by the **Toonflow** engine, letting you go from text scripts to 3DGS-rendered video scenes.

## Architecture

```
Toonflow Engine (:10588)                    SplatVerse Studio
+------------------------------+            +------------------------------------------+
| Script -> Assets ->           |   REST     | Bridge (:10590)                           |
| Storyboard -> Video           |<--------->| Project Browser                            |
| Vendor: 3dgs-renderer         |            | Render Studio                              |
|                               |            | MCP Tools (25 tools)                       |
|                               |            | MCP Renderer (:9842)                       |
|                               |            | Pipeline (7 steps)                         |
|                               |            |   |-- Script Adaptation                     |
| MoneyPrinterTurbo (:8081)     |   REST     |   |-- Storyboard                            |
| Online material ->            |<--------->|   |-- Toonflow Sync                         |
| TTS -> FFmpeg -> Video        |            |   |-- TTS Dubbing                           |
| Cross-platform post           |            |   |-- Video Gen                             |
|                               |            |   |-- FFmpeg Compose                        |
| Studio Web (:5173)            |            |   +-- Publish (MPT)                         |
+------------------------------+            +------------------------------------------+
```

## Quick Start

**Prerequisites:** [Node.js ≥18](https://nodejs.org/) (Toonflow and MoneyPrinterTurbo are optional).

The one-click launcher starts everything automatically on first run:
checks Node.js, creates `.env` from `.env.example` if missing, runs `npm install`
if dependencies are missing, builds the MCP Server / Bridge binaries if needed, then
starts **Toonflow Studio (:10588)** (if found), **MCP 3D Renderer (:9842)**,
**Bridge Server (:10590)** and **Studio Web (:5173)**, health-checks every service,
and opens your browser.

### Option A —Windows (double-click)

Download the project, then double-click **`start-all.bat`** in the project root.
That's it —all services start automatically and a browser opens at `http://localhost:5173`.

### Option B —npm (any OS)

```bash
npm run start:all
```

### Option C —PowerShell (Windows)

```powershell
powershell -NoProfile -ExecutionPolicy Bypass -File scripts/start-all.ps1
```

> **One-time manual step only needed for video generation:** set `LLM_API_KEY` in the
> generated `.env` (used for script/storyboard generation).
>
> Toonflow (optional, for the full video pipeline) is auto-detected from
> `../AI应用/Toonflow-app`, `../Toonflow-app`, `./Toonflow-app`, or `TOONFLOW_APP_DIR`.
> MoneyPrinterTurbo (optional, needs Docker) is started only when `MPT_ENABLED=true`
> in `.env`.

Useful flags: `-NoToonflow` skip Toonflow, `-NoMpt` skip MPT, `-NoBrowser` skip
auto-opening the browser, `-SkipInstall` skip `npm install`.

### Minimal (no Toonflow)

If you only need the 3DGS rendering tools without Toonflow:

```bash
npm run dev    # MCP + Bridge + Web, no Toonflow
```

## Creating a Short Video: Step by Step

### Step 1 —Write a Script in Toonflow

Open the Toonflow web app (typically at `http://localhost:10588`). Create a project, write a script, and generate storyboards. Each storyboard is a scene with:

- **Prompt** —text description for image/video generation
- **Duration** —scene length in seconds
- **Track** —scene grouping label

Toonflow's pipeline: `Text → Script → Assets (roles, scenes, props) → Storyboards → Video`

### Step 2 —Browse Projects in Studio Web

Open `http://localhost:5173` and navigate to **Projects**. You'll see all Toonflow projects. Click a project to view its storyboards.

<details>
<summary>Example: Creating a test project via API</summary>

```bash
# Login to Toonflow
TOKEN=$(curl -s http://localhost:10588/api/login/login \
  -H "Content-Type: application/json" \
  -d '{"username":"admin","password":"admin123"}' | jq -r '.data.token')

# Create a script
curl -s http://localhost:10588/api/script/addScript \
  -H "Authorization: $TOKEN" \
  -H "Content-Type: application/json" \
  -d '{"name":"Forest Adventure","content":"# Forest Adventure\n## Scene 1...","projectId":1}'

# Add storyboards
curl -s http://localhost:10588/api/production/storyboard/batchAddStoryboardInfo \
  -H "Authorization: $TOKEN" \
  -H "Content-Type: application/json" \
  -d '{
    "scriptId": 1,
    "projectId": 1,
    "data": [
      {
        "prompt": "A misty forest at dawn, sunlight through trees",
        "videoDesc": "Dawn mist over ancient forest",
        "duration": 5,
        "track": "Scene 1",
        "state": "pending",
        "src": "",
        "shouldGenerateImage": 1,
        "associateAssetsIds": []
      }
    ]
  }'
```

</details>

### Step 3 —Render Storyboards as 3DGS Scenes

Two rendering modes in **Render Studio** (`/render`):

| Mode | What it does | When to use |
|------|-------------|-------------|
| **Direct 3DGS Render** | Render a single scene from a text description or `.ply` file | Quick preview without Toonflow |
| **Batch Render from Toonflow** | Render multiple Toonflow storyboards as 3DGS scenes | Full short-video production |

For batch rendering, enter the Toonflow **Project ID** and **Storyboard IDs** (comma-separated), then click **Render Batch**. The Bridge fetches storyboards from Toonflow, builds 3DGS scenes via MCP Server, and renders each storyboard frame.

### Step 4 —Monitor Render Progress

Render progress streams via SSE (Server-Sent Events). You'll see toast notifications in the top-right corner as each storyboard renders. The Dashboard shows recent render tasks with progress bars.

### Step 5 — 3DGS as a Toonflow Vendor (Optional)

To use 3DGS rendering directly inside Toonflow's image/video generation:

```bash
# Copy the vendor adapter to Toonflow
cp studio/bridge/vendor/3dgs-renderer.ts ../AI应用/Toonflow-app/data/vendor/
```

This registers 3DGS as both an image model (single-frame render) and video model (multi-frame animation) in Toonflow's vendor system.

## Port Reference

| Service | Port | Description |
|---------|------|-------------|
| Toonflow Engine | 10588 | Short-drama creation (external app) |
| MCP Renderer | 9842 | WebSocket 3DGS renderer |
| Bridge Server | 10590 | REST API + SSE, Toonflow proxy |
| Studio Web | 5173 | Vue 3 SPA frontend |
| MPT API (Sidecar) | 8081 | MoneyPrinterTurbo FastAPI (optional; 8081 used when host 8080 is taken) |
| MPT Web UI | 8501 | MoneyPrinterTurbo Streamlit UI (optional) |

## Troubleshooting

- **"Toonflow engine not running"** —Start Toonflow: `npm run start:all` or manually `node data/serve/app.js` in the Toonflow directory
- **Projects page shows no storyboards** —Create a script first in Toonflow; storyboards belong to scripts
- **3DGS vendor not available in Toonflow** —Copy `studio/bridge/vendor/3dgs-renderer.ts` to Toonflow's `data/vendor/` directory

## MoneyPrinterTurbo (MPT) Integration

[MoneyPrinterTurbo](https://github.com/harry0703/MoneyPrinterTurbo) is integrated as an **optional HTTP API sidecar**, extending SplatVerse Studio with online material video generation, additional TTS voices, and cross-platform publishing. **Zero intrusion** —when `MPT_ENABLED=false` or `MPT_API_URL` is unset, the pipeline behaves exactly as before.

### What MPT Adds

| Capability | Pipeline Step | Role |
|------------|---------------|------|
| **Extended TTS** | Step 4 (TTS) | Fallback when CosyVoice2 → Edge → SAPI all fail; adds Azure / SiliconFlow / ElevenLabs / Gemini voices |
| **Full Video Generation** | Step 6 (Compose) | Final fallback when 3DGS / Toonflow / video gen all produce no clips —uses Pexels / Pixabay / Coverr online materials |
| **Cross-Platform Publish** | Step 7 (Publish, new) | One-click publish to TikTok / Instagram / YouTube Shorts |

### Frontend Entry

The Studio Web "Script → Video" page (`/pipeline`) ships a built-in MPT entry:

- **Config panel**: a "📖 MoneyPrinterTurbo Integration" group at the bottom of the model config section —enable toggle, service URL, material source, default voice, plus a live connection status (Connected / Not connected). Saving writes the settings into `.env`.
- **Per-task options**: a "📖 MoneyPrinterTurbo Fallback" block at the bottom of the input section —check "Video fallback" and "TTS fallback" to automatically degrade to MPT when any main-pipeline step (3DGS / Toonflow / TTS) fails; when MPT is enabled you can also pick an MPT voice and publish platforms (YouTube / TikTok).

> Note: the bridge auto-loads the project-root `.env` at startup (dependency-free implementation, see `studio/bridge/src/load-env.ts`), so config saved from the UI takes effect **after the bridge restarts**. Launch the bridge from the project root (`npm run dev:bridge` or `scripts/start-dev.ps1`) to ensure the root `.env` is picked up.

### Setup

```bash
# 1. Configure MPT (fill in at least one material API key)
cp mpt-config.example.toml mpt-config.toml
#    Edit mpt-config.toml —required: pexels.api_key or pixabay.api_key (both free)

# 2. Start MPT container
docker compose -f docker-compose.mpt.yml up -d

# 3. Verify MPT is running
curl http://localhost:8081/api/v1/tasks?page=1&page_size=1

# 4. Enable MPT in Studio .env
#    MPT_ENABLED=true
#    MPT_API_URL=http://localhost:8081
```

### Configuration Reference

| Env Variable | Default | Description |
|--------------|---------|-------------|
| `MPT_ENABLED` | `false` | Enable/disable MPT integration |
| `MPT_API_URL` | (empty) | MPT FastAPI service URL |
| `MPT_MATERIAL_SOURCE` | `pexels` | Material source: `pexels` / `pixabay` / `coverr` / `local` |
| `MPT_DEFAULT_VOICE` | `zh-CN-XiaoxiaoNeural` | Default TTS voice name |

MPT-side settings (API keys for Pexels/Pixabay, TTS providers, LLM) go in `mpt-config.toml`, not `.env`. See `mpt-config.example.toml` for the full template.

### API Endpoints

| Endpoint | Method | Description |
|----------|--------|-------------|
| `/api/pipeline/mpt/health` | GET | Check MPT service availability |
| `/api/pipeline/mpt/bgm` | GET | List MPT BGM library |
| `/api/pipeline/tasks/:id/publish` | POST | Publish video to platforms (`{ platforms: [{ name, title, tags }] }`) |

### Creating a Task with MPT Fallback

```bash
curl -s http://localhost:10590/api/pipeline/tasks \
  -H "Content-Type: application/json" \
  -d '{
    "text": "In a quiet town, a kitten named HuaHua chats with a butterfly...",
    "title": "HuaHua Adventure",
    "style": "水彩",
    "videoRatio": "16:9",
    "enableTTS": true,
    "enableVideoGen": false,
    "enableMptFallback": true,
    "enableMptTTS": true,
    "mptVoiceName": "zh-CN-XiaoxiaoNeural",
    "publishPlatforms": [
      { "name": "youtube", "title": "HuaHua Adventure", "tags": ["animation", "cat"] }
    ]
  }'
```

The 7-step pipeline: **Script Adaptation → Storyboard → Toonflow Sync → TTS (MPT fallback) → Video Gen → FFmpeg Compose (MPT fallback) → Publish (MPT)**