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

## Project Detail Page — Schema & Konventionen

### projects.json — Felder pro Projekt
```jsonc
{
  "id": 1,
  "slug": "tapestop",                      // URL: #/projekt/tapestop
  "title": "TAPESTOP",                     // Titel (Header Mitte oben, gross auf Landing)
  "tag": "Visual Identity",                // Primary-Filter auf Landing
  "tags": ["Visual Identity", "Event"],    // alle Filter-Tags (1:1 zu tagLine)
  "year": "2025",
  "tagLine": "VISUAL IDENTITY / EVENT / 2025",  // Header Mitte: tags + year, slash-separated, UPPERCASE
  "blurb": "Techno / Trance Event Kollektiv",   // Subtitle auf Landing-Karte
  "desc": "Vollständiger Beschreibungstext …",  // Beschreibungs-Block auf Detail-Page
  "claim": "no second take.",                   // optional, fett unter desc
  "disclaimer": "Fiktives Projekt …",           // optional, Mono-Hinweis unter claim

  // Header oben links (3 Zeilen mono) — section-namen oder slash-getrennt
  "camera": "CORPORATE DESIGN /",
  "lens":   "EVENT EXPERIENCE /",
  "film":   "CAMPAIGN / LANDING PAGE",

  // Header oben rechts (rechtsbündig, optional studio)
  "studio":   "SHINYWRKS",                 // optional, oberste Zeile
  "location": "FREIES PROJEKT",            // oder Stadt; bei Auftragsart auf DE
  "date":     "AUG 2025",

  "bg":     "linear-gradient(160deg, #0D0B08 0%, #1a1209 100%)",  // Hero-Hintergrund
  "thumb":  "tapestop/m-poster-triple.jpg", // Landing-Card
  "thumbW": 1600,
  "thumbH": 1067,
  "heroImg": "tapestop/logo.svg",          // optional; wird mit filter:invert auf bg gelegt

  "sections": [ /* siehe unten */ ]
}
```

### Layout-Struktur Detail-Page (von oben nach unten)
1. **Top-Header** (3-spaltig, `border-bottom #E8E2D6`, padding 20px 48px):
   - links: `camera` / `lens` / `film` (3 Zeilen mono)
   - mitte: `title` (Space Grotesk, uppercase) + `tagLine` (mono)
   - rechts: `studio` (optional) / `location` / `date`
2. **Hero** (`height: clamp(360px, 55vw, 680px)`, `bg`, optional `heroImg` mit `invert(1)`, Noise-Overlay)
3. **Beschreibung** (2-spaltig: Label „Beschreibung" + rechte Spalte mit `desc` Fliesstext, optional `claim` (fett, Space Grotesk 19px, 28px Abstand), optional `disclaimer` (Space Mono 11px, 36px Abstand))
4. **Sections** (siehe unten) — oder Placeholder-Galerie wenn `sections` fehlt
5. **Prev/Next** Navigation am Fuß

### Sections-Struktur
```jsonc
"sections": [
  {
    "label": "Corporate Design",           // wird uppercased angezeigt, mit "01" prefix
    "rows": [
      // Bilder-Row
      { "cols": 2, "gap": 2, "padding": "0 48px",
        "items": [
          { "src": "tapestop/foo.jpg", "caption": "POSTER A1",
            "captionSub": "Offset, 250 g/m²", "aspectRatio": "3/4" },
          { "src": "tapestop/bar.jpg", "fit": "contain", "aspectRatio": "1/1" }
        ]
      },
      // Sublabel zwischen Rows
      { "type": "sublabel", "text": "Anwendung im Raum" },
      // Video-Item
      { "items": [{ "type": "video", "src": "tapestop/clip.mp4", "aspectRatio": "16/9" }] }
    ]
  }
]
```
Row-Felder: `cols`, `gap`, `padding`, `gridTemplateColumns`, `marginTop`.
Item-Felder: `src`, `type` (`video` optional), `aspectRatio`, `fit` (`cover`|`contain`), `bg`, `padding`, `filter`, `caption`, `captionSub`, `labelAbove`.

### Typografie-Regeln (vereinheitlicht)
- **Body** (Beschreibung, Fliesstext): Space Grotesk 17px, `lineHeight 1.65`, color `#1A1209`
- **Titel/Hero/Prev-Next-Title**: Space Grotesk 500, `letter-spacing -0.03em` (gross) bzw. `0.1em` uppercase (klein)
- **Mono-Labels klein**: Space Mono **11px, `letter-spacing 0.14em`, uppercase**, color `#3D3428`
  → gilt für: Section-Label, Sublabels, Caption, CaptionSub, labelAbove, „Beschreibung"-Label
- **Section-Nummern** (`01`, `02`, …): wie oben, aber bewusst dekorativ in `#C4B8A4` (heller, sitzt als Marker links neben dem Label)
- **Mono Header oben**: Space Mono 12px, `letter-spacing 0.08em`, color `#3D3428`
- **Prev/Next-Footer**: mono 10px (eigener Kontext, kleiner ok)

### Farb-Hierarchie (Text)
- `#0D0B08` — primär (Titel)
- `#1A1209` — Body / Section-Labels
- `#3D3428` — sekundäre Mono-Labels (lesbar gedämpft)
- `#C4B8A4` — **nur dekorativ / Hover / Placeholder**, nicht für lesbaren Text
- `#E8E2D6` — Borders / Dividers

### Wiederkehrende Muster
- `tagLine` = `tags.join(' / ').toUpperCase() + ' / ' + year`
- Top-links zeigt typischerweise die Hauptdisziplinen / Sektion-Namen des Projekts (1:1 oder verkürzt, slash-getrennt)
- Top-rechts: `studio` ist optional, `location` kann „FREIES PROJEKT" / „EIGENINITIATIVE" sein oder eine Stadt
- Section-Labels sind Title-Case in JSON, werden im UI via `textTransform: uppercase` gerendert
