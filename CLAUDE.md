# shinywrks — Claude Context

## Projekt
Portfolio-Website für Justin Wiemann / shinywrks. React-SPA mit Vite, Hash-Routing.

## Dateistruktur
- `index.html` — Vite-Entry (HTML-Gerüst, lädt `/src/main.jsx`)
- `src/main.jsx` — React-Entry, initialisiert dot-grid + custom cursor
- `src/App.jsx` — Routing + Page-Switch
- `src/components/` — `StarSignet`, `Nav`, `Footer`, `Landing`, `ProjectCard`, `MobileProjectCard`, `ProjectDetail`, `Kontakt`, `SocialIcons`
- `src/hooks/useMobile.js` — Media-Query-Hook
- `src/lib/dotGrid.js`, `src/lib/customCursor.js` — Vanilla-JS-Animationen
- `src/styles.css` — globale Styles + Animationen
- `public/projects.json` — Projektdaten, hier bearbeiten (kein Programmierwissen nötig)
- `public/portrait.jpeg`, `public/shinywrks-logo.svg`, `public/tapestop/`, `public/project/` — statische Assets
- `dev.sh` — startet `npm run dev`
- `vite.config.js` — Vite-Konfig

## Tech Stack
- React 18 + Vite 5 (npm-Build)
- Space Mono / Space Grotesk via Google Fonts
- Hash-Routing: `#/`, `#/kontakt`, `#/projekt/:slug`
- Farben: `#0D0B08` (schwarz), `#1A1209` (dunkel), `#F5F3EF` (hell), `#E8E2D6`, `#C4B8A4`

## GitHub & Hosting
- Repo: `calledshiny/shinywrks`
- Hosting: Vercel (auto-deploy bei Push auf `main`)
- Feature-Branch: `claude/check-react-usage-PD2Qr`
- Push: `git push origin <branch>`

## Lokale Entwicklung (Mac)
Voraussetzung: Node.js (≥ 18) installiert. Check: `node --version`. Falls nicht: `brew install node` oder von [nodejs.org](https://nodejs.org).

```bash
cd ~/shinywrks
bash dev.sh   # erstes Mal: installiert Dependencies, dann startet Vite
```
Seite im Browser: http://localhost:3000 (HMR — Änderungen sofort sichtbar)

Build prüfen: `npm run build` (Output in `dist/`)
Build-Preview: `npm run preview`

## Design-Konventionen
- Animationen: `fadeUp` (0.4s, cubic-bezier 0.16,1,0.3,1) für Content, `fadeLeft` (0.5s, 0.25s delay) für Projekt-Strip
- Nav active state: `border-bottom: 1px solid #0D0B08`
- Chrome shimmer auf Email-Link: `chrome-sweep` 0.8s linear, -0.08s delay, `fill-mode: both`
- Keine Kommentare im Code außer wo wirklich nötig
- Kein TypeScript

## Wichtige Komponenten
- `StarSignet` — Logo-SVG, size prop (22px Nav, 10px Footer)
- `ProjectCard` — Karte mit Hover-Effekt und custom cursor
- `ProjectDetail` — Detailansicht mit prev/next Navigation
- `Kontakt` — Contact-Page: "Time to shine." → "Kontakt" label → Email → Social Icons → Standort
