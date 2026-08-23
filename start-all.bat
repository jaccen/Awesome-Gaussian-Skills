@echo off
rem ============================================================
rem  SplatVerse Studio - One-Click Launcher (Windows)
rem  Double-click this file to start everything automatically.
rem ============================================================
setlocal
cd /d "%~dp0"

where powershell >nul 2>nul
if errorlevel 1 (
    echo [ERR] PowerShell not found. This launcher requires Windows PowerShell.
    pause
    exit /b 1
)

echo Starting SplatVerse Studio...
echo   - Use .env for configuration (created automatically on first run)
echo   - Press Ctrl+C in the launcher window to stop all services
echo.
powershell -NoProfile -ExecutionPolicy Bypass -File "%~dp0scripts\start-all.ps1" %*

set EXITCODE=%ERRORLEVEL%
if not "%EXITCODE%"=="0" (
    echo.
    echo [ERR] Launcher exited with code %EXITCODE%
    pause
)
endlocal