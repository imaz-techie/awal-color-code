@echo off
echo ========================================
echo Color Token Dashboard - Quick Setup
echo ========================================
echo.

echo Installing dependencies...
call npm install

if %errorlevel% neq 0 (
    echo.
    echo Installation failed! Please check your Node.js installation.
    echo Visit: https://nodejs.org/
    pause
    exit /b 1
)

echo.
echo ========================================
echo Installation Complete!
echo ========================================
echo.
echo Starting development server...
echo Your browser will open automatically at http://localhost:5173
echo.
echo Press Ctrl+C to stop the server
echo ========================================
echo.

call npm run dev
