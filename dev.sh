#!/bin/bash
cd "$(dirname "$0")"

if [ ! -d node_modules ]; then
  echo "📦 Installing dependencies..."
  npm install
fi

# Initial pull
if [ -d .git ]; then
  echo "⬇️  Pulling latest..."
  git pull --quiet --ff-only origin main 2>/dev/null || true
fi

# Background loop: auto-pull every 5s while dev runs
if [ -d .git ]; then
  (
    while true; do
      sleep 5
      git fetch --quiet origin main 2>/dev/null || continue
      LOCAL=$(git rev-parse HEAD 2>/dev/null)
      REMOTE=$(git rev-parse origin/main 2>/dev/null)
      if [ -n "$LOCAL" ] && [ -n "$REMOTE" ] && [ "$LOCAL" != "$REMOTE" ]; then
        echo ""
        echo "🔄 Neue Commits — pulle …"
        git pull --quiet --ff-only origin main 2>&1 | grep -v "^From " || true
        echo "   $(git log -1 --oneline)"
      fi
    done
  ) &
  AUTOPULL_PID=$!
  trap "kill $AUTOPULL_PID 2>/dev/null" EXIT INT TERM
fi

echo "🚀 Vite dev server: http://localhost:5173"
echo "   Drücke Ctrl+C zum Beenden"
echo ""
npm run dev
