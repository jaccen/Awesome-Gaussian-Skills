# SplatVerse Studio — 一键启动脚本
# 用法：powershell -File scripts/start-dev.ps1
# 
# 启动顺序：
#   1. MCP Server (3DGS, port 9842 renderer)
#   2. Bridge Server (REST + SSE, port 10590)
#   3. Studio Web (Vite dev, port 5173)

$ErrorActionPreference = "Continue"
$rootDir = Split-Path -Parent $PSScriptRoot

Write-Host ""
Write-Host "======================================" -ForegroundColor Cyan
Write-Host "  SplatVerse Studio — Dev Launcher" -ForegroundColor Cyan
Write-Host "======================================" -ForegroundColor Cyan
Write-Host ""

# Ensure .temp directory exists
if (-not (Test-Path "$rootDir\.temp")) {
    New-Item -ItemType Directory -Path "$rootDir\.temp" -Force | Out-Null
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

# Build MCP Server if not built
if (-not (Test-Path "$rootDir\mcp-server\dist\index.js")) {
    Write-Host "[INFO] Building MCP Server..." -ForegroundColor Yellow
    Push-Location "$rootDir\mcp-server"
    npm run build
    Pop-Location
}

# Build Bridge if not built
if (-not (Test-Path "$rootDir\studio\bridge\dist\render-server.js")) {
    Write-Host "[INFO] Building Bridge..." -ForegroundColor Yellow
    Push-Location "$rootDir\studio\bridge"
    npm run build
    Pop-Location
}

Write-Host ""
Write-Host "[1/3] Starting MCP Server + Renderer Bridge (port 9842)..." -ForegroundColor Cyan
$env:RENDERER_PORT = "9842"
$mcpProc = Start-Process -FilePath "node" -ArgumentList "$rootDir\mcp-server\dist\index.js" -PassThru -NoNewWindow -RedirectStandardOutput "$rootDir\.temp\mcp-stdout.log" -RedirectStandardError "$rootDir\.temp\mcp-stderr.log"
Start-Sleep -Seconds 2

Write-Host "[2/3] Starting Bridge REST Server (port 10590)..." -ForegroundColor Cyan
$env:MCP_SERVER_PATH = "$rootDir\mcp-server\dist\index.js"
$env:BRIDGE_PORT = "10590"
$bridgeProc = Start-Process -FilePath "node" -ArgumentList "$rootDir\studio\bridge\dist\render-server.js" -PassThru -NoNewWindow -RedirectStandardOutput "$rootDir\.temp\bridge-stdout.log" -RedirectStandardError "$rootDir\.temp\bridge-stderr.log"
Start-Sleep -Seconds 2

Write-Host "[3/3] Starting Studio Web (Vite, port 5173)..." -ForegroundColor Cyan
Push-Location "$rootDir\studio\web"
$webProc = Start-Process -FilePath "npx" -ArgumentList "vite", "--host" -PassThru -NoNewWindow
Pop-Location

Write-Host ""
Write-Host "======================================" -ForegroundColor Green
Write-Host "  All services launched!" -ForegroundColor Green
Write-Host "======================================" -ForegroundColor Green
Write-Host ""
Write-Host "  Studio Web:   http://localhost:5173" -ForegroundColor White
Write-Host "  Bridge API:   http://localhost:10590" -ForegroundColor White
Write-Host "  MCP Renderer: ws://localhost:9842"    -ForegroundColor White
Write-Host "  MCP Server:   stdio (via bridge)"    -ForegroundColor White
Write-Host ""
Write-Host "  Press Ctrl+C to stop all services."   -ForegroundColor Yellow
Write-Host ""

# Wait for Ctrl+C
try {
    while ($true) {
        Start-Sleep -Seconds 1
        
        # Check if processes are still alive
        if ($mcpProc -and $mcpProc.HasExited) {
            Write-Host "[WARN] MCP Server exited unexpectedly (exit: $($mcpProc.ExitCode))." -ForegroundColor Yellow
        }
        if ($bridgeProc -and $bridgeProc.HasExited) {
            Write-Host "[WARN] Bridge Server exited unexpectedly (exit: $($bridgeProc.ExitCode))." -ForegroundColor Yellow
        }
    }
} finally {
    Write-Host ""
    Write-Host "[INFO] Stopping all services..." -ForegroundColor Yellow
    
    if ($webProc -and -not $webProc.HasExited) {
        Stop-Process -Id $webProc.Id -Force -ErrorAction SilentlyContinue
    }
    if ($bridgeProc -and -not $bridgeProc.HasExited) {
        Stop-Process -Id $bridgeProc.Id -Force -ErrorAction SilentlyContinue
    }
    if ($mcpProc -and -not $mcpProc.HasExited) {
        Stop-Process -Id $mcpProc.Id -Force -ErrorAction SilentlyContinue
    }
    
    Write-Host "[OK] All services stopped." -ForegroundColor Green
}
