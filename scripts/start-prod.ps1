# SplatVerse Studio — Production Launcher
# Usage: powershell -File scripts/start-prod.ps1
#
# Starts all services in production mode:
#   1. Build all components (MCP Server, Bridge, Web)
#   2. MCP Server (3DGS, port 9842 renderer)
#   3. Bridge Server (REST + SSE + Static, port 10590) — serves Vite build output
#   4. Open browser to http://localhost:10590
#
# Optional flags:
#   -SkipBuild    Skip the build step (use existing dist/ files)
#   -Toonflow     Also start Toonflow on port 10588

param(
    [switch]$SkipBuild = $false,
    [switch]$Toonflow = $false
)

$ErrorActionPreference = "Continue"
$rootDir = Split-Path -Parent $PSScriptRoot

Write-Host ""
Write-Host "==========================================" -ForegroundColor Cyan
Write-Host "  SplatVerse Studio — Production Mode" -ForegroundColor Cyan
Write-Host "==========================================" -ForegroundColor Cyan
Write-Host ""

# Ensure .temp directory exists
if (-not (Test-Path "$rootDir\.temp")) {
    New-Item -ItemType Directory -Path "$rootDir\.temp" -Force | Out-Null
}
if (-not (Test-Path "$rootDir\.temp\renders")) {
    New-Item -ItemType Directory -Path "$rootDir\.temp\renders" -Force | Out-Null
}

# Check node
$nodeVersion = node --version 2>$null
if (-not $nodeVersion) {
    Write-Host "[ERROR] Node.js not found. Install Node.js >= 18." -ForegroundColor Red
    exit 1
}
Write-Host "[OK] Node.js $nodeVersion" -ForegroundColor Green

# Check npm install
if (-not (Test-Path "$rootDir\node_modules")) {
    Write-Host "[INFO] Running npm install..." -ForegroundColor Yellow
    Push-Location $rootDir
    npm install
    Pop-Location
}

# -------------------------------------------------------
# Build
# -------------------------------------------------------
if (-not $SkipBuild) {
    Write-Host ""
    Write-Host "[BUILD] Building all components..." -ForegroundColor Yellow

    Write-Host "[BUILD] MCP Server..." -ForegroundColor Gray
    Push-Location "$rootDir\mcp-server"
    npm run build 2>&1 | Out-Null
    Pop-Location

    Write-Host "[BUILD] Bridge..." -ForegroundColor Gray
    Push-Location "$rootDir\studio\bridge"
    npm run build 2>&1 | Out-Null
    Pop-Location

    Write-Host "[BUILD] Web (Vite production)..." -ForegroundColor Gray
    Push-Location "$rootDir\studio\web"
    npx vite build 2>&1 | Out-Null
    Pop-Location

    Write-Host "[BUILD] All builds complete." -ForegroundColor Green
} else {
    Write-Host "[SKIP] Build skipped (using existing dist/ files)." -ForegroundColor Yellow
}

# Verify build outputs
$buildOk = $true
if (-not (Test-Path "$rootDir\mcp-server\dist\index.js")) { Write-Host "[ERROR] MCP Server build missing!" -ForegroundColor Red; $buildOk = $false }
if (-not (Test-Path "$rootDir\studio\bridge\dist\render-server.js")) { Write-Host "[ERROR] Bridge build missing!" -ForegroundColor Red; $buildOk = $false }
if (-not (Test-Path "$rootDir\studio\web\dist\index.html")) { Write-Host "[ERROR] Web build missing!" -ForegroundColor Red; $buildOk = $false }
if (-not $buildOk) { exit 1 }

# -------------------------------------------------------
# Kill stale processes on required ports
# -------------------------------------------------------
Write-Host ""
Write-Host "[CLEANUP] Clearing stale processes on ports 9842 and 10590..." -ForegroundColor Yellow
foreach ($port in @(9842, 10590)) {
    $procs = Get-NetTCPConnection -LocalPort $port -State Listen -ErrorAction SilentlyContinue | Select-Object -ExpandProperty OwningProcess -Unique
    if ($procs) {
        $procs | ForEach-Object { Stop-Process -Id $_ -Force -ErrorAction SilentlyContinue }
        Write-Host "  [OK] Port ${port} cleared" -ForegroundColor Gray
    }
}

# -------------------------------------------------------
# Start Toonflow (optional)
# -------------------------------------------------------
if ($Toonflow) {
    $toonflowDir = $env:TOONFLOW_APP_DIR
    if (-not $toonflowDir) { $toonflowDir = "C:\Users\Lenovo\Desktop\AI应用\Toonflow-app" }
    if (Test-Path "$toonflowDir\data\serve\app.js") {
        Write-Host ""
        Write-Host "[1/3] Starting Toonflow (port 10588)..." -ForegroundColor Cyan
        Push-Location $toonflowDir
        $toonflowProc = Start-Process -FilePath "node" -ArgumentList "data\serve\app.js" -PassThru -NoNewWindow -RedirectStandardOutput "$rootDir\.temp\toonflow-stdout.log" -RedirectStandardError "$rootDir\.temp\toonflow-stderr.log"
        Pop-Location
        Start-Sleep -Seconds 3
    } else {
        Write-Host "[WARN] Toonflow not found at $toonflowDir. Skipping." -ForegroundColor Yellow
    }
}

# -------------------------------------------------------
# Start MCP Server
# -------------------------------------------------------
Write-Host ""
Write-Host "[1/2] Starting MCP Server + Renderer (port 9842)..." -ForegroundColor Cyan
$env:RENDERER_PORT = "9842"
$mcpProc = Start-Process -FilePath "node" -ArgumentList "$rootDir\mcp-server\dist\index.js" -PassThru -NoNewWindow -RedirectStandardOutput "$rootDir\.temp\mcp-stdout.log" -RedirectStandardError "$rootDir\.temp\mcp-stderr.log"
Start-Sleep -Seconds 2

# -------------------------------------------------------
# Start Bridge Server (production mode)
# -------------------------------------------------------
Write-Host "[2/2] Starting Bridge Server (production, port 10590)..." -ForegroundColor Cyan
$env:MCP_SERVER_PATH = "$rootDir\mcp-server\dist\index.js"
$env:BRIDGE_PORT = "10590"
$env:NODE_ENV = "production"
$env:PRODUCTION = "1"
$bridgeProc = Start-Process -FilePath "node" -ArgumentList "$rootDir\studio\bridge\dist\render-server.js" -PassThru -NoNewWindow -RedirectStandardOutput "$rootDir\.temp\bridge-stdout.log" -RedirectStandardError "$rootDir\.temp\bridge-stderr.log"
Start-Sleep -Seconds 2

# -------------------------------------------------------
# Summary
# -------------------------------------------------------
Write-Host ""
Write-Host "==========================================" -ForegroundColor Green
Write-Host "  SplatVerse Studio is running!" -ForegroundColor Green
Write-Host "==========================================" -ForegroundColor Green
Write-Host ""
Write-Host "  Open in browser:  http://localhost:10590" -ForegroundColor White
Write-Host "  Bridge API:       http://localhost:10590/api/health" -ForegroundColor White
Write-Host "  MCP Renderer:     ws://localhost:9842" -ForegroundColor White
if ($Toonflow) {
    Write-Host "  Toonflow:         http://localhost:10588" -ForegroundColor White
}
Write-Host ""
Write-Host "  Press Ctrl+C to stop all services." -ForegroundColor Yellow
Write-Host ""

# Open browser
Start-Process "http://localhost:10590"

# Wait for Ctrl+C
try {
    while ($true) {
        Start-Sleep -Seconds 2

        # Check if processes are still alive
        if ($mcpProc -and $mcpProc.HasExited) {
            Write-Host "[WARN] MCP Server exited (exit: $($mcpProc.ExitCode)). Restarting..." -ForegroundColor Yellow
            $mcpProc = Start-Process -FilePath "node" -ArgumentList "$rootDir\mcp-server\dist\index.js" -PassThru -NoNewWindow -RedirectStandardOutput "$rootDir\.temp\mcp-stdout.log" -RedirectStandardError "$rootDir\.temp\mcp-stderr.log"
        }
        if ($bridgeProc -and $bridgeProc.HasExited) {
            Write-Host "[ERROR] Bridge Server exited (exit: $($bridgeProc.ExitCode)). Check .temp\bridge-stderr.log" -ForegroundColor Red
        }
    }
} finally {
    Write-Host ""
    Write-Host "[INFO] Stopping all services..." -ForegroundColor Yellow

    if ($toonflowProc -and -not $toonflowProc.HasExited) {
        Stop-Process -Id $toonflowProc.Id -Force -ErrorAction SilentlyContinue
    }
    if ($bridgeProc -and -not $bridgeProc.HasExited) {
        Stop-Process -Id $bridgeProc.Id -Force -ErrorAction SilentlyContinue
    }
    if ($mcpProc -and -not $mcpProc.HasExited) {
        Stop-Process -Id $mcpProc.Id -Force -ErrorAction SilentlyContinue
    }

    Write-Host "[OK] All services stopped." -ForegroundColor Green
}
