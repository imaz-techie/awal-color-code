#!/bin/bash

echo "========================================"
echo "Color Token Dashboard - Quick Setup"
echo "========================================"
echo ""

echo "Installing dependencies..."
npm install

if [ $? -ne 0 ]; then
    echo ""
    echo "Installation failed! Please check your Node.js installation."
    echo "Visit: https://nodejs.org/"
    exit 1
fi

echo ""
echo "========================================"
echo "Installation Complete!"
echo "========================================"
echo ""
echo "Starting development server..."
echo "Your browser will open automatically at http://localhost:5173"
echo ""
echo "Press Ctrl+C to stop the server"
echo "========================================"
echo ""

npm run dev
