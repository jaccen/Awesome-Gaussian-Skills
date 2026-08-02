# SplatVerse Studio — One-Click Launcher
# Usage: powershell -File scripts/start.ps1
#
# Starts all services:
#   1. Toonflow (port 10588) — short drama engine
#   2. MCP Server (port 9842) — 3DGS renderer
#   3. Bridge Server (port 10590) — SplatVerse Studio web platform
#
# Flags:
#   -SkipBuild     Skip build step (use existing dist/)
#   -NoToonflow    Don't start Toonflow
#   -NoBrowser      Don't auto-open browser

param(
    [switch]$SkipBuild = $false,
    [switch]$NoToonflow = $false,
    [switch]$NoBrowser = $false
)

$ErrorActionPreference = "Continue"
$rootDir = Split-Path -Parent $PSScriptRoot

Write-Host ""
Write-Host "==========================================" -ForegroundColor Cyan
Write-Host "  SplatVerse Studio — One-Click Launcher" -ForegroundColor Cyan
Write-Host "==========================================" -ForegroundColor Cyan
Write-Host ""

# Ensure directories
foreach ($d in @(".temp", ".temp\renders", "scenes")) {
    $p = Join-Path $rootDir $d
    if (-not (Test-Path $p)) { New-Item -ItemType Directory -Path $p -Force | Out-Null }
}

# Check node
$nodeVersion = node --version 2>$null
if (-not $nodeVersion) {
    Write-Host "[ERROR] Node.js not found." -ForegroundColor Red
    exit 1
}
Write-Host "[OK] Node.js $nodeVersion" -ForegroundColor Green

# npm install if needed
if (-not (Test-Path "$rootDir\node_modules")) {
    Write-Host "[INFO] Running npm install..." -ForegroundColor Yellow
    Push-Location $rootDir; npm install; Pop-Location
}

# ---- Build ----
if (-not $SkipBuild) {
    Write-Host ""
    Write-Host "[BUILD] Building all components..." -ForegroundColor Yellow

    Write-Host "  MCP Server..." -ForegroundColor Gray
    Push-Location "$rootDir\mcp-server"; npm run build 2>&1 | Out-Null; Pop-Location

    Write-Host "  Bridge..." -ForegroundColor Gray
    Push-Location "$rootDir\studio\bridge"; npm run build 2>&1 | Out-Null; Pop-Location

    Write-Host "  Web (Vite)..." -ForegroundColor Gray
    Push-Location "$rootDir\studio\web"; npx vite build 2>&1 | Out-Null; Pop-Location

    Write-Host "[BUILD] Done." -ForegroundColor Green
} else {
    Write-Host "[SKIP] Build skipped." -ForegroundColor Yellow
}

# Verify builds
$buildOk = $true
if (-not (Test-Path "$rootDir\mcp-server\dist\index.js")) { Write-Host "[ERROR] MCP Server build missing!" -ForegroundColor Red; $buildOk = $false }
if (-not (Test-Path "$rootDir\studio\bridge\dist\render-server.js")) { Write-Host "[ERROR] Bridge build missing!" -ForegroundColor Red; $buildOk = $false }
if (-not (Test-Path "$rootDir\studio\web\dist\index.html")) { Write-Host "[ERROR] Web build missing!" -ForegroundColor Red; $buildOk = $false }
if (-not $buildOk) { exit 1 }

# ---- Kill stale processes ----
Write-Host ""
Write-Host "[CLEANUP] Clearing ports..." -ForegroundColor Yellow
foreach ($port in @(9842, 10588, 10590)) {
    $procs = Get-NetTCPConnection -LocalPort $port -State Listen -ErrorAction SilentlyContinue | Select-Object -ExpandProperty OwningProcess -Unique
    if ($procs) { $procs | ForEach-Object { Stop-Process -Id $_ -Force -ErrorAction SilentlyContinue }; Write-Host "  Port $port cleared" -ForegroundColor Gray }
}

# ---- Start Toonflow ----
$toonflowProc = $null
if (-not $NoToonflow) {
    $toonflowDir = $env:TOONFLOW_APP_DIR
    if (-not $toonflowDir) { $toonflowDir = "C:\Users\Lenovo\Desktop\AI应用\Toonflow-app" }
    if (Test-Path "$toonflowDir\data\serve\app.js") {
        Write-Host ""
        Write-Host "[1/3] Starting Toonflow (port 10588)..." -ForegroundColor Cyan
        $toonflowProc = Start-Process -FilePath "cmd" -ArgumentList "/c", "set NODE_ENV=prod && node data\serve\app.js" -WorkingDirectory $toonflowDir -PassThru -WindowStyle Hidden
        Start-Sleep -Seconds 4
        $tf = Get-NetTCPConnection -LocalPort 10588 -State Listen -ErrorAction SilentlyContinue
        if ($tf) { Write-Host "  [OK] Toonflow running" -ForegroundColor Green }
        else { Write-Host "  [WARN] Toonflow may not have started" -ForegroundColor Yellow }
    } else {
        Write-Host "[WARN] Toonflow not found at $toonflowDir" -ForegroundColor Yellow
    }
}

# ---- Start MCP Server ----
Write-Host ""
Write-Host "[2/3] Starting MCP Server + Renderer (port 9842)..." -ForegroundColor Cyan
$env:RENDERER_PORT = "9842"
$mcpProc = Start-Process -FilePath "node" -ArgumentList "$rootDir\mcp-server\dist\index.js" -PassThru -WindowStyle Hidden -RedirectStandardOutput "$rootDir\.temp\mcp-stdout.log" -RedirectStandardError "$rootDir\.temp\mcp-stderr.log"
Start-Sleep -Seconds 2

# ---- Start Bridge Server ----
Write-Host "[3/3] Starting Bridge Server (port 10590)..." -ForegroundColor Cyan
$env:MCP_SERVER_PATH = "$rootDir\mcp-server\dist\index.js"
$env:BRIDGE_PORT = "10590"
$env:NODE_ENV = "production"
$env:PRODUCTION = "1"
$bridgeProc = Start-Process -FilePath "node" -ArgumentList "$rootDir\studio\bridge\dist\render-server.js" -PassThru -WindowStyle Hidden -RedirectStandardOutput "$rootDir\.temp\bridge-stdout.log" -RedirectStandardError "$rootDir\.temp\bridge-stderr.log"
Start-Sleep -Seconds 3

# Verify Bridge
try {
    $r = Invoke-WebRequest -Uri "http://localhost:10590/api/health" -UseBasicParsing -TimeoutSec 5
    $h = $r.Content | ConvertFrom-Json
    Write-Host "  [OK] Bridge: status=$($h.status) mcp=$($h.mcp) toonflow=$($h.toonflow)" -ForegroundColor Green
} catch {
    Write-Host "  [ERROR] Bridge health check failed" -ForegroundColor Red
}

# ---- Summary ----
Write-Host ""
Write-Host "==========================================" -ForegroundColor Green
Write-Host "  SplatVerse Studio is running!" -ForegroundColor Green
Write-Host "==========================================" -ForegroundColor Green
Write-Host ""
Write-Host "  Studio:     http://localhost:10590" -ForegroundColor White
Write-Host "  Health:     http://localhost:10590/api/health" -ForegroundColor Gray
Write-Host "  MCP:        ws://localhost:9842" -ForegroundColor Gray
if (-not $NoToonflow -and $toonflowProc) {
    Write-Host "  Toonflow:   http://localhost:10588" -ForegroundColor Gray
}
Write-Host ""
Write-Host "  Landing page: docs/index.html" -ForegroundColor Gray
Write-Host "  Press Ctrl+C to stop." -ForegroundColor Yellow
Write-Host ""

# Open browser
if (-not $NoBrowser) { Start-Process "http://localhost:10590" }

# Keep alive
try {
    while ($true) {
        Start-Sleep -Seconds 5
        if ($mcpProc -and $mcpProc.HasExited) {
            Write-Host "[WARN] MCP Server exited. Restarting..." -ForegroundColor Yellow
            $mcpProc = Start-Process -FilePath "node" -ArgumentList "$rootDir\mcp-server\dist\index.js" -PassThru -WindowStyle Hidden -RedirectStandardOutput "$rootDir\.temp\mcp-stdout.log" -RedirectStandardError "$rootDir\.temp\mcp-stderr.log"
        }
        if ($bridgeProc -and $bridgeProc.HasExited) {
            Write-Host "[ERROR] Bridge exited. Check .temp\bridge-stderr.log" -ForegroundColor Red
            break
        }
    }
} finally {
    Write-Host "`n[INFO] Stopping..." -ForegroundColor Yellow
    if ($toonflowProc -and -not $toonflowProc.HasExited) { Stop-Process -Id $toonflowProc.Id -Force -ErrorAction SilentlyContinue }
    if ($bridgeProc -and -not $bridgeProc.HasExited) { Stop-Process -Id $bridgeProc.Id -Force -ErrorAction SilentlyContinue }
    if ($mcpProc -and -not $mcpProc.HasExited) { Stop-Process -Id $mcpProc.Id -Force -ErrorAction SilentlyContinue }
    Write-Host "[OK] All stopped." -ForegroundColor Green
}
