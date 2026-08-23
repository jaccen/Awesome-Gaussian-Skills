# ============================================================
#  SplatVerse Studio - One-Click Launcher
# ============================================================
#  Usage:
#    Windows: double-click start-all.bat  (recommended)
#             or run:
#             powershell -NoProfile -ExecutionPolicy Bypass -File scripts/start-all.ps1
#    Any OS:  npm run start:all
#
#  What it does automatically (first run):
#    1. Checks Node.js >= 18
#    2. Creates .env from .env.example if missing
#    3. Runs npm install if dependencies are missing
#    4. Builds MCP Server / Bridge if dist is missing
#    5. Starts (in order):
#         Toonflow Studio   :10588  (auto-detected, optional)
#         MCP 3D Renderer   :9842
#         Bridge Server     :10590
#         Studio Web (Vite) :5173
#         MoneyPrinterTurbo :8081  (only if MPT_ENABLED=true and Docker available)
#    6. Health-checks every service and opens the browser
#
#  Flags:
#   -SkipInstall  Skip npm install
#   -NoToonflow   Do not start Toonflow
#   -NoMpt        Do not try to start MoneyPrinterTurbo
#   -NoBrowser    Do not auto-open the browser
# ============================================================

param(
    [switch]$SkipInstall = $false,
    [switch]$NoToonflow = $false,
    [switch]$NoMpt = $false,
    [switch]$NoBrowser = $false
)

$ErrorActionPreference = "Continue"
$rootDir = Split-Path -Parent $PSScriptRoot
$tempDir = Join-Path $rootDir ".temp"

# ------------------------------------------------------------
# helpers
# ------------------------------------------------------------
function Write-Step($msg)  { Write-Host ""; Write-Host "  $msg" -ForegroundColor Cyan }
function Write-Ok($msg)    { Write-Host "  [OK]   $msg" -ForegroundColor Green }
function Write-Warn($msg)  { Write-Host "  [WARN] $msg" -ForegroundColor Yellow }
function Write-Err($msg)   { Write-Host "  [ERR]  $msg" -ForegroundColor Red }

function Test-PortListening([int]$port) {
    $conn = Get-NetTCPConnection -LocalPort $port -State Listen -ErrorAction SilentlyContinue
    return ($null -ne $conn)
}

function Wait-Port([int]$port, [int]$seconds) {
    for ($i = 0; $i -lt $seconds; $i++) {
        if (Test-PortListening $port) { return $true }
        Start-Sleep -Seconds 1
    }
    return $false
}

function Kill-Port([int]$port) {
    $procs = Get-NetTCPConnection -LocalPort $port -State Listen -ErrorAction SilentlyContinue `
        | Select-Object -ExpandProperty OwningProcess -Unique
    foreach ($p in $procs) {
        Stop-Process -Id $p -Force -ErrorAction SilentlyContinue
        Write-Host "    port $port cleared (pid $p)" -ForegroundColor Gray
    }
}

function Get-EnvValue([string]$name) {
    $envFile = Join-Path $rootDir ".env"
    if (Test-Path $envFile) {
        foreach ($line in Get-Content $envFile) {
            $t = $line.Trim()
            if ($t.StartsWith("$name=")) {
                return $t.Substring($name.Length + 1).Trim('"', "'")
            }
        }
    }
    return ""
}

# ------------------------------------------------------------
# 0. Banner
# ------------------------------------------------------------
Write-Host ""
Write-Host "==========================================================" -ForegroundColor Cyan
Write-Host "  SplatVerse Studio - One-Click Launcher" -ForegroundColor Cyan
Write-Host "==========================================================" -ForegroundColor Cyan

# ------------------------------------------------------------
# 1. Node.js check
# ------------------------------------------------------------
Write-Step "[1/8] Checking Node.js..."
$nodeVer = node --version 2>$null
if (-not $nodeVer) {
    Write-Err "Node.js not found. Install Node.js >= 18 from https://nodejs.org/ and retry."
    exit 1
}
$verNum = [int]($nodeVer.TrimStart('v').Split('.')[0])
if ($verNum -lt 18) {
    Write-Err "Node.js $nodeVer is too old. Install Node.js >= 18."
    exit 1
}
Write-Ok "Node.js $nodeVer"

# ------------------------------------------------------------
# 2. .env bootstrap
# ------------------------------------------------------------
$envFile = Join-Path $rootDir ".env"
if (-not (Test-Path $envFile)) {
    if (Test-Path (Join-Path $rootDir ".env.example")) {
        Copy-Item (Join-Path $rootDir ".env.example") $envFile
        Write-Warn ".env not found, created from .env.example."
        Write-Warn "Remember to set LLM_API_KEY in .env before generating videos."
    }
} else {
    Write-Ok ".env found"
}

# ------------------------------------------------------------
# 3. npm install
# ------------------------------------------------------------
if (-not $SkipInstall) {
    if (-not (Test-Path (Join-Path $rootDir "node_modules"))) {
        Write-Step "Installing dependencies (npm install)"
        Write-Host "    This can take a few minutes on first run..." -ForegroundColor Gray
        Push-Location $rootDir
        npm install --no-audit --no-fund 2>&1 | Select-Object -Last 5
        Pop-Location
        if (-not (Test-Path (Join-Path $rootDir "node_modules"))) {
            Write-Err "npm install failed. Check network / npm registry and retry."
            exit 1
        }
        Write-Ok "dependencies installed"
    } else {
        Write-Ok "node_modules present, skipping install"
    }
} else {
    Write-Warn "npm install skipped (-SkipInstall)"
}

# ------------------------------------------------------------
# 4. Build (only when dist is missing)
# ------------------------------------------------------------
$mcpDist = Join-Path $rootDir "mcp-server\dist\index.js"
$bridgeDist = Join-Path $rootDir "studio\bridge\dist\render-server.js"
if (-not (Test-Path $mcpDist) -or -not (Test-Path $bridgeDist)) {
    Write-Step "Building missing binaries"
    if (-not (Test-Path $mcpDist)) {
        Push-Location (Join-Path $rootDir "mcp-server")
        npm run build 2>&1 | Select-Object -Last 3
        Pop-Location
    }
    if (-not (Test-Path $bridgeDist)) {
        Push-Location (Join-Path $rootDir "studio\bridge")
        npm run build 2>&1 | Select-Object -Last 3
        Pop-Location
    }
}
if (-not (Test-Path $mcpDist) -or -not (Test-Path $bridgeDist)) {
    Write-Err "Build failed. Missing: $mcpDist or $bridgeDist"
    exit 1
}
Write-Ok "binaries ready (mcp-server/dist, studio/bridge/dist)"

# ------------------------------------------------------------
# 5. Ports
# ------------------------------------------------------------
Write-Step "Preparing ports"
if (-not (Test-Path $tempDir)) { New-Item -ItemType Directory -Path $tempDir -Force | Out-Null }

$webPort = 5173
if (Test-PortListening $webPort) {
    Write-Warn "Port $webPort (Studio Web) already in use - reusing existing instance"
} else {
    if (Test-PortListening 10590) { Kill-Port 10590 }
    if (Test-PortListening 9842)  { Kill-Port 9842 }
    Write-Ok "ports 9842/10590 ready"
}

# ------------------------------------------------------------
# 6. Toonflow (optional)
# ------------------------------------------------------------
$toonflowProc = $null
if (-not $NoToonflow) {
    Write-Step "Locating Toonflow Studio"
    if (Test-PortListening 10588) {
        Write-Ok "Toonflow already running on :10588"
    } else {
        $tfEnv = $env:TOONFLOW_APP_DIR
        $tfDotEnv = Get-EnvValue "TOONFLOW_APP_DIR"
        $tfCandidates = @()
        if ($tfEnv)      { $tfCandidates += $tfEnv }
        if ($tfDotEnv)   { $tfCandidates += $tfDotEnv }
        $tfCandidates += (Join-Path $rootDir "..\..\AI应用\Toonflow-app")
        $tfCandidates += (Join-Path $rootDir "..\AI应用\Toonflow-app")
        $tfCandidates += (Join-Path $rootDir "..\Toonflow-app")
        $tfCandidates += (Join-Path $rootDir "Toonflow-app")

        # Prefer the first candidate whose node_modules is already installed
        $tfDirFound = $null
        foreach ($c in ($tfCandidates | Select-Object -Unique)) {
            if (Test-Path (Join-Path $c "data\serve\app.js")) {
                if (-not $tfDirFound) { $tfDirFound = $c }
                if (Test-Path (Join-Path $c "node_modules")) { $tfDirFound = $c; break }
            }
        }
        if ($tfDirFound) {
            if (Test-Path (Join-Path $tfDirFound "node_modules")) {
                Write-Ok "Toonflow found at $tfDirFound - starting on :10588"
                $toonflowProc = Start-Process -FilePath "cmd" -ArgumentList "/c", "set NODE_ENV=prod && node data\serve\app.js" -WorkingDirectory $tfDirFound -PassThru -WindowStyle Hidden -RedirectStandardOutput (Join-Path $tempDir "toonflow-stdout.log") -RedirectStandardError (Join-Path $tempDir "toonflow-stderr.log")
                if (Wait-Port 10588 20) { Write-Ok "Toonflow listening on :10588" }
                else { Write-Warn "Toonflow started but :10588 not listening yet (see .temp\toonflow-stderr.log)" }
            } else {
                Write-Warn "Toonflow found at $tfDirFound but its node_modules is missing."
                Write-Warn "  Run: cd $tfDirFound && npm install, then retry."
                Write-Warn "  Skipping - Studio still works for 3DGS rendering without Toonflow."
            }
        } else {
            Write-Warn "Toonflow not found (optional). Place it in ..\..\AI应用\Toonflow-app or set TOONFLOW_APP_DIR."
            Write-Warn "  Skipping - Studio still works for 3DGS rendering without Toonflow."
        }
    }
}

# ------------------------------------------------------------
# 7. MCP Server (3D renderer) - port 9842
# ------------------------------------------------------------
Write-Step "[7/8] Starting services"
if (-not (Test-PortListening 9842)) {
    Write-Host "  [MCP] Starting 3D renderer on :9842" -ForegroundColor Gray
    $env:RENDERER_PORT = "9842"
    $mcpProc = Start-Process -FilePath "node" -ArgumentList $mcpDist -PassThru -WindowStyle Hidden -RedirectStandardOutput (Join-Path $tempDir "mcp-stdout.log") -RedirectStandardError (Join-Path $tempDir "mcp-stderr.log")
    if (Wait-Port 9842 15) { Write-Ok "MCP renderer :9842" } else { Write-Warn "MCP renderer not listening yet (see .temp\mcp-stderr.log)" }
} else {
    Write-Ok "MCP renderer already running on :9842"
}

# ------------------------------------------------------------
# 8. Bridge Server - port 10590
# ------------------------------------------------------------
if (-not (Test-PortListening 10590)) {
    Write-Host "  [BRIDGE]   Running REST+SSE bridge on :10590" -ForegroundColor Gray
    $env:MCP_SERVER_PATH = $mcpDist
    $env:BRIDGE_PORT = "10590"
    $env:NODE_ENV = "development"
    $bridgeProc = Start-Process -FilePath "node" -ArgumentList $bridgeDist -PassThru -WindowStyle Hidden -RedirectStandardOutput (Join-Path $tempDir "bridge-stdout.log") -RedirectStandardError (Join-Path $tempDir "bridge-stderr.log")
    if (Wait-Port 10590 15) { Write-Ok "Bridge :10590" } else { Write-Warn "Bridge not listening yet (see .temp\bridge-stderr.log)" }
} else {
    Write-Ok "Bridge already running on :10590"
}

# Bridge health check
Start-Sleep -Seconds 2
try {
    $r = Invoke-WebRequest -Uri "http://localhost:10590/api/health" -UseBasicParsing -TimeoutSec 8
    $h = $r.Content | ConvertFrom-Json
    Write-Ok "Bridge health: status=$($h.status) mcp=$($h.mcp) toonflow=$($h.toonflow)"
} catch {
    Write-Warn "Bridge health check not answered yet (it may still be warming up)."
}

# ------------------------------------------------------------
# 9. Studio Web (Vite dev) - port 5173
# ------------------------------------------------------------
if (-not (Test-PortListening $webPort)) {
    Write-Host "  [WEB]      Starting Vite dev server on :5173" -ForegroundColor Gray
    $webProc = Start-Process -FilePath "cmd" -ArgumentList "/c", "npx vite --host" -WorkingDirectory (Join-Path $rootDir "studio\web") -PassThru -WindowStyle Hidden
    if (Wait-Port $webPort 30) { Write-Ok "Studio Web :5173" } else { Write-Warn "Vite not listening on 5173 yet (first run may be slow)." }
} else {
    Write-Ok "Studio Web already running on :5173"
}

# ------------------------------------------------------------
# 10. MoneyPrinterTurbo (optional, requires Docker)
# ------------------------------------------------------------
if (-not $NoMpt) {
    $mptEnabled = Get-EnvValue "MPT_ENABLED"
    if ($mptEnabled -eq "true") {
        Write-Step "MoneyPrinterTurbo (MPT)"
        $dockerCmd = Get-Command docker -ErrorAction SilentlyContinue
        if ($dockerCmd) {
            Write-Host "  docker compose up -d (sidecar :8081)" -ForegroundColor Gray
            Push-Location $rootDir
            docker compose -f docker-compose.mpt.yml up -d 2>&1 | Select-Object -Last 5
            Pop-Location
            if (Wait-Port 8081 30) { Write-Ok "MPT API :8081" } else { Write-Warn "MPT not answering on 8081 yet (check: docker compose -f docker-compose.mpt.yml logs)" }
        } else {
            Write-Warn "MPT_ENABLED=true but Docker is not installed. Skipping MPT (Studio still works)."
        }
    } else {
        Write-Host "  MPT disabled (.env MPT_ENABLED!=true) - skipped" -ForegroundColor Gray
    }
}

# ------------------------------------------------------------
# Summary
# ------------------------------------------------------------
Write-Host ""
Write-Host "==========================================================" -ForegroundColor Green
Write-Host "  SplatVerse Studio is running!" -ForegroundColor Green
Write-Host "==========================================================" -ForegroundColor Green
Write-Host ""
Write-Host "  Studio Web:    http://localhost:5173" -ForegroundColor White
Write-Host "  Bridge API:    http://localhost:10590/api/health" -ForegroundColor Gray
Write-Host "  MCP Renderer:  ws://localhost:9842" -ForegroundColor Gray
if (-not $NoToonflow -and (Test-PortListening 10588)) {
    Write-Host "  Toonflow:      http://localhost:10588" -ForegroundColor Gray
}
if (-not $NoMpt -and (Test-PortListening 8081)) {
    Write-Host "  MPT API:       http://localhost:8081" -ForegroundColor Gray
}
Write-Host ""
Write-Host "  Press Ctrl+C to stop all services." -ForegroundColor Yellow
Write-Host ""

# Open browser
if (-not $NoBrowser) {
    Start-Process "http://localhost:5173"
}

# ------------------------------------------------------------
# Keep alive + auto-restart
# ------------------------------------------------------------
try {
    while ($true) {
        Start-Sleep -Seconds 5
        if ($mcpProc -and $mcpProc.HasExited) {
            Write-Warn "MCP renderer exited (code $($mcpProc.ExitCode)). Restarting..."
            $mcpProc = Start-Process -FilePath "node" -ArgumentList $mcpDist -PassThru -WindowStyle Hidden -RedirectStandardOutput (Join-Path $tempDir "mcp-stdout.log") -RedirectStandardError (Join-Path $tempDir "mcp-stderr.log")
        }
        if ($bridgeProc -and $bridgeProc.HasExited) {
            Write-Err "Bridge exited (code $($bridgeProc.ExitCode)). See .temp\bridge-stderr.log"
            break
        }
    }
} finally {
    Write-Host ""
    Write-Host "[INFO] Stopping services..." -ForegroundColor Yellow
    if ($toonflowProc -and -not $toonflowProc.HasExited) { Stop-Process -Id $toonflowProc.Id -Force -ErrorAction SilentlyContinue }
    if ($bridgeProc -and -not $bridgeProc.HasExited)   { Stop-Process -Id $bridgeProc.Id -Force -ErrorAction SilentlyContinue }
    if ($mcpProc -and -not $mcpProc.HasExited)         { Stop-Process -Id $mcpProc.Id -Force -ErrorAction SilentlyContinue }
    if ($webProc -and -not $webProc.HasExited)         { Stop-Process -Id $webProc.Id -Force -ErrorAction SilentlyContinue }
    Write-Host "[OK] All services stopped." -ForegroundColor Green
}