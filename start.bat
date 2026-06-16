@echo off
setlocal
cd /d "%~dp0"

REM Prefer system Node 24+; fall back to bundled portable runtime
set "NODE_DIR=%~dp0.tools\node-v24.16.0-win-x64"
where node >nul 2>&1 && for /f "delims=" %%v in ('node -p "process.versions.node.split('.')[0]" 2^>nul') do set "NODE_MAJOR=%%v"
if defined NODE_MAJOR if %NODE_MAJOR% GEQ 24 (
  echo Using system Node ...
) else if exist "%NODE_DIR%\node.exe" (
  set "PATH=%NODE_DIR%;%PATH%"
  echo Using bundled Node at %NODE_DIR%
) else (
  echo ERROR: LibreChat requires Node 24+. Install from https://nodejs.org or run npm run reinstall once.
  exit /b 1
)

REM Allow self-signed gateway TLS (https://localhost:3000)
set NODE_TLS_REJECT_UNAUTHORIZED=0

echo Starting LibreChat on http://localhost:3080 ...
npm run backend
