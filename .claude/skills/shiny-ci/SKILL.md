---
name: shiny-ci
description: Erstellt Assets im shinywrks Corporate Design (Social Posts, Projekt-Covers, Poster, OG-Images, Mockup-Kompositionen, Logo-Varianten). Wird verwendet, wenn der User Assets, Grafiken, Bilder, Banner, Posts, Thumbnails oder Visuals für shinywrks / sein Portfolio kreieren möchte. Bündelt CI-Regeln (Farben, Typo, Stil) und ruft `generate_image` für Bildgenerierung sowie Sharp/Vite-Skripte für Optimierung auf.
---

# shinywrks — Asset-Erstellung

Dieser Skill erstellt Assets im shinywrks Corporate Design. Vor jedem Asset werden die CI-Regeln unten **konsequent** angewendet, danach das passende Workflow-Rezept verwendet.

---

## 1 — Corporate Identity (verbindlich)

### Farben
| Token | Hex | Verwendung |
|-------|------|------------|
| black | `#0D0B08` | primärer Text, dunkle Flächen |
| dark | `#1A1209` | Body-Text, sekundär dunkel |
| brown-dark | `#3D3428` | Mono-Labels lesbar gedämpft |
| beige | `#C4B8A4` | dekorativ / Hover / Placeholder — **nicht** für Lese-Text |
| beige-light | `#E8E2D6` | Borders, Dividers |
| paper | `#F5F3EF` | Hintergrund / Standard hell |

Verlauf-Defaults für Hero-Backgrounds (siehe Projekte):
- Dunkel-Schwarz: `linear-gradient(160deg, #0D0B08 0%, #1a1209 100%)`
- Warm-Braun: `linear-gradient(160deg, #3D4D44 0%, #2E3B34 100%)` (Myndful)
- Akzent-Burgundy: `radial-gradient(ellipse at 30% 40%, #3a1f14 0%, #1a0f0a 55%, #0a0a0d 100%)` (Spotright)

### Typografie
- **Display / Titel**: Space Grotesk 500–700, `letter-spacing: -0.03em`, uppercase optional
- **Body**: Space Grotesk 17px, `line-height: 1.65`, color `#1A1209`
- **Mono Labels**: Space Mono **11–12px**, `letter-spacing: 0.14em`, **UPPERCASE**, color `#3D3428`
- **Meta-Zeilen** (TagLine-Stil): slash-separiert, mono, uppercase — Beispiel: `VISUAL IDENTITY / EVENT / 2025`

Google-Fonts-Einbettung:
```html
<link href="https://fonts.googleapis.com/css2?family=Space+Grotesk:wght@400;500;700&family=Space+Mono:wght@400;700&display=swap" rel="stylesheet">
```

### Stil-Signatur
- **Noise-Overlay** (SVG fractalNoise, `mix-blend-mode: overlay`, opacity ~0.06–0.13) — gibt Druck-/Filmgefühl
- **Editorial Grid**: viel Whitespace, harte 1px-Borders in `#E8E2D6`, Section-Nummern (`01`, `02` …) in `#C4B8A4`
- **Analog-Anmutung**: keine Glow-Effekte, keine Gradients ausser den definierten, keine abgerundeten Ecken (max. `border-radius: 2px`)
- **Cursor / Hover**: gedämpft, langsame Easings `cubic-bezier(0.16,1,0.3,1)` — niemals bouncy

### Was NICHT machen
- ❌ keine Emojis in Assets
- ❌ keine bunten Akzentfarben ausser projekt-spezifisch via `bg`-Gradient
- ❌ keine Sans wie Inter / Helvetica — **immer** Space Grotesk
- ❌ keine generischen KI-Ästhetiken (glossy, 3D-render, neon, glow)

---

## 2 — Asset-Typen & Rezepte

Wähle das passende Rezept anhand der User-Anfrage. Wenn unklar: per `AskUserQuestion` nachfragen welcher Asset-Typ + Format gewünscht ist.

### A) Instagram Square Post (1080×1080)
**Use case**: Projekt-Announcement, Behind-the-Scenes, Statement-Karte.

Layout-Optionen:
1. **Statement-Karte**: paper bg, Mono-Label oben (`SHINYWRKS / 2026 /`), Space-Grotesk-Headline mittig, Mono-Footer unten
2. **Projekt-Cover**: projekt-`bg` als Fläche, Logo zentriert (filter: invert wenn dunkler bg), TagLine unter Logo in mono
3. **Editorial Split**: 50/50 — links Foto/Mockup, rechts paper bg mit Meta + Headline

Liefer-Format: WebP, Quality 92, max 2400px Längsseite (`npm run optimize:images` Konvention)

### B) Instagram Story (1080×1920)
**Use case**: Projekt-Teaser, Zitat-Karte, Event-Ankündigung.

- Safe-Area: top 220px, bottom 250px (Profil + Action-Bar)
- Mono-Label oben, gross gesetzter Display-Text mittig
- Optional Noise-Overlay als finishing

### C) Projekt-Thumbnail (Landing-Karte)
**Spec**: 1600×1067 (3:2) oder 320×420 (Portrait-Card). Speichern unter `public/<slug>/m-cover-<n>.webp`.

- Hintergrund = projekt-`bg`
- Foto / Mockup in Bildmitte, ~78% Höhe (siehe `heightPct: 0.78`)
- KEIN Text auf dem Thumb — Title kommt aus `projects.json`

### D) OG-Image / Sharing-Card (1200×630)
**Use case**: Twitter / LinkedIn / Slack Preview.

- paper bg
- `SHINYWRKS` Wortmarke oben links (mono, 12px, letter-spacing 0.14em)
- Projekt-Titel mittig (Space Grotesk 500, ~96px, letter-spacing -0.03em)
- TagLine unter Titel in mono
- Datum unten rechts mono
- 1px-Border `#E8E2D6` innen

### E) Poster (A1 / A2 — Print)
**Specs**: A1 = 4961×7016px @ 300dpi, A2 = 3508×4961px. CMYK-Profil bei Druck-Output beachten.

- Display-Typo dominiert (Space Grotesk in Schriftgrößen 200pt+)
- 5% Bleed-Rand
- Mono-Footer mit Meta (`SHINYWRKS / <STADT> / <DATUM>`)
- Noise-Overlay als finale Layer

### F) Mockup-Komposition (Apparel / Print / Device)
**Use case**: Projekt-Detailseiten-Assets wie Tapestop-Shirts oder Spotright-Phone-Screens.

- Hintergrund: `bg` des Projekts oder `#E8E2D6`
- Mockup-Foto zentriert, `object-fit: contain`
- Caption: mono 11px uppercase `#3D3428`, optional `captionSub` 11px regular
- Speichern in `public/<slug>/<asset>-<variant>.webp`

### G) Logo-Variante (SVG)
**Use case**: Wortmarke, Signet, Lockup-Varianten für neue Projekte.

- Schrift: Space Grotesk 700 für Wortmarken, oder custom letterforms wenn projekt-spezifisch
- SVG mit `viewBox`, keine fixen `width`/`height` — skalierbar
- Farbe via `currentColor` wo möglich, sonst `#0D0B08`
- Speichern als `public/<slug>/logo.svg`

---

## 3 — Workflows

### Workflow 1: KI-generiertes Bild (Foto / Mockup-Basis)

1. Prompt formulieren mit CI-Tonalität — **Schlüsselwörter**: *editorial, analog film grain, muted earth palette, paper texture, minimalist German design, Bauhaus-influenced, no text, soft directional light*.
2. **Negative**: glossy, neon, 3D render, AI-typical, watermark, logo, text.
3. Tool: `mcp__d580faa6-bdb1-4bbb-a232-9099ece470ab__generate_image` aufrufen.
4. Ergebnis in `public/<slug>/<asset>.webp` ablegen — vorher via Sharp konvertieren falls nicht WebP.
5. `npm run optimize:images` ausführen wenn Original > 2400px.

Beispiel-Prompt-Template:
> *"Editorial product photography, [SUBJECT], shot on Hasselblad, muted earth-tone palette (#0D0B08 #C4B8A4 #F5F3EF), soft north-facing window light, paper texture in background, subtle film grain, minimalist composition with negative space, no text, no logo, 4:5 portrait, analog look"*

### Workflow 2: Statisches Asset via SVG / HTML

Wenn das Asset reines Layout ist (OG-Image, Statement-Karte), erstelle eine HTML-Vorlage und screenshotte sie:

1. Erstelle temporäre HTML-Datei mit Inline-CSS, lade Google Fonts (siehe oben).
2. Setze `width` / `height` der Body-Box exakt auf Output-Format (z.B. 1080×1080).
3. Verwende die definierten CI-Tokens.
4. Füge Noise-SVG ein (siehe `styles.css` Pattern).
5. Screenshotte via Headless-Chrome / Puppeteer oder lass den User bspw. `npx playwright screenshot` ausführen.

HTML-Skelett-Template ist in `templates/og-card.html` referenziert (bei Bedarf erstellen).

### Workflow 3: Asset zu `projects.json` hinzufügen

Nach Asset-Erstellung im jeweiligen Projekt-Ordner:

1. Datei prüfen: `ls public/<slug>/`
2. Eintrag in `projects.json` ergänzen unter dem entsprechenden Projekt:
   - Bei Thumbnail: `thumb`, `thumbW`, `thumbH` updaten
   - Bei Section-Bild: in `sections[].rows[].items[]` einfügen
   - Aspect-Ratio aus der Bilddatei ermitteln (`sharp` oder `identify`)
3. Schema-Konventionen aus `CLAUDE.md` strikt einhalten (Mono-Labels Title-Case in JSON, im UI uppercase).

### Workflow 4: Bild-Optimierung (PNG/JPG → WebP)

```bash
npm run optimize:images
```
Konvertiert alle PNG/JPG in `public/` zu WebP. Max 2400px Längsseite, Quality 92. **Nach jedem neuen Asset ausführen.**

---

## 4 — Checkliste vor Auslieferung

Bevor ein Asset als „fertig" gilt, prüfe:

- [ ] Farben aus offizieller Palette (kein Pink, Blau, Grün ausser projekt-spezifisch)
- [ ] Typo: Space Grotesk Display, Space Mono Labels
- [ ] Mono-Labels UPPERCASE mit `letter-spacing: 0.14em`
- [ ] Noise-Overlay bei Foto / Hero (subtle, ~0.06 opacity)
- [ ] Keine generische KI-Ästhetik (glossy / neon / 3D render)
- [ ] Datei in `public/<slug>/` abgelegt, WebP/SVG-Format
- [ ] Dateiname kebab-case (`m-poster-triple.webp`, nicht `MosterTriple.PNG`)
- [ ] Falls Listing-Asset: `projects.json` Eintrag aktualisiert
- [ ] Aspect-Ratio in JSON dokumentiert wo nötig

---

## 5 — Werkzeug-Referenz

| Tool | Wofür |
|------|-------|
| `mcp__d580faa6-…__generate_image` | Foto-/Illustrations-Basis generieren |
| `mcp__d580faa6-…__generate_video` | Loop-Animationen (z.B. `landing-idle.mp4`-artig) |
| `Bash` → `npm run optimize:images` | WebP-Konvertierung + Resize |
| `Bash` → `sharp` / `identify` | Aspect-Ratio ermitteln |
| `Write` | SVG-Logos / HTML-Templates schreiben |
| `Edit` → `public/projects.json` | Asset im Schema registrieren |

---

## 6 — Frag den User wenn unklar

Bei jeder Skill-Aktivierung — wenn nicht aus dem Prompt eindeutig — kläre via `AskUserQuestion`:

1. **Welcher Asset-Typ?** (Social Post / Story / Poster / OG-Image / Projekt-Thumb / Mockup / Logo)
2. **Welches Format / welche Dimensionen?** (default IG square 1080×1080 wenn unklar)
3. **Welches Projekt / Kontext?** (existierender Projekt-Slug oder neues / standalone shinywrks-Asset)
4. **Soll das Asset in `projects.json` registriert werden?**

Erst nach Klärung Workflow starten.
