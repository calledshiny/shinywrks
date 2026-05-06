#!/bin/bash
cd "$(dirname "$0")"
echo "🚀 Server läuft auf http://localhost:3000"
echo "   Drücke Ctrl+C zum Beenden"
echo ""
npx serve . -p 3000 &
SERVER_PID=$!

while true; do
  sleep 3
  git pull --quiet origin main
done
