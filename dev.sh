#!/bin/bash
cd "$(dirname "$0")"

if [ ! -d node_modules ]; then
  echo "📦 Installing dependencies..."
  npm install
fi

echo "🚀 Vite dev server: http://localhost:3000"
echo "   Drücke Ctrl+C zum Beenden"
echo ""
npm run dev
