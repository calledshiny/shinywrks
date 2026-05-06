# shinywrks — Claude Context

## Projekt
Portfolio-Website für Justin Wiemann / shinywrks. Statisches Single-Page-App mit React via CDN (keine Build-Tools).

## Dateistruktur
- `index.html` — gesamte App (React, CSS, JSX via Babel Standalone)
- `projects.json` — Projektdaten, hier bearbeiten (kein Programmierwissen nötig)
- `shinywrks-logo.svg` — echtes Logo, inline als SVG-Polygon in `StarSignet`-Komponente
- `portrait.jpeg` — Profilfoto Justin
- `dev.sh` — lokaler Server + auto git pull (`npx serve . -p 3000`)
- `package.json` / `sandbox.config.json` — statisches Serving

## Tech Stack
- React 18 + Babel Standalone via cdn.jsdelivr.net (kein npm build)
- Space Mono (monospace), kein weiteres Framework
- Hash-Routing: `#/`, `#/kontakt`, `#/projekt/:slug`
- Farben: `#0D0B08` (schwarz), `#1A1209` (dunkel), `#F5F3EF` (hell), `#E8E2D6`, `#C4B8A4`

## GitHub
- Repo: `calledshiny/shinywrks`
- GitHub Pages: live unter calledshiny.github.io/shinywrks
- Feature-Branch: `claude/fix-chrome-hover-effect-56kyn`
- Push-Befehl (PAT-Auth):
  ```
  git push https://YOUR_GITHUB_PAT@github.com/calledshiny/shinywrks.git HEAD:main
  ```
- Nach jedem Push auch auf main pushen damit GitHub Pages aktualisiert wird

## Lokale Entwicklung (Mac)
```bash
cd ~/shinywrks   # oder wo der Ordner liegt
bash dev.sh      # startet Server auf localhost:3000 + auto-pull
```
Seite im Browser: http://localhost:3000

## Design-Konventionen
- Animationen: `fadeUp` (0.4s, cubic-bezier 0.16,1,0.3,1) für Content, `fadeLeft` (0.5s, 0.25s delay) für Projekt-Strip
- Nav active state: `border-bottom: 1px solid #0D0B08`
- Chrome shimmer auf Email-Link: `chrome-sweep` 0.8s linear, -0.08s delay, `fill-mode: both`
- Keine Kommentare im Code außer wo wirklich nötig
- Kein TypeScript, keine zusätzlichen Dependencies

## Wichtige Komponenten
- `StarSignet` — Logo-SVG, size prop (22px Nav, 10px Footer)
- `ProjectCard` — Karte mit Hover-Effekt und custom cursor
- `ProjectDetail` — Detailansicht mit prev/next Navigation
- `Kontakt` — Contact-Page: "Time to shine." → "Kontakt" label → Email → Social Icons → Standort
