---
name: shiny-ci
description: Erstellt Assets im shinywrks Corporate Design (Social Posts, Projekt-Covers, Poster, OG-Images, Mockup-Kompositionen, Logo-Varianten, Lebensläufe / A4-Dokumente). Wird verwendet, wenn der User Assets, Grafiken, Bilder, Banner, Posts, Thumbnails, Lebensläufe oder Visuals für shinywrks / sein Portfolio kreieren möchte. Bündelt CI-Regeln (Farben, Typo, Stil), wiederverwendbare Code-Bausteine, und ruft `generate_image` für Bildgenerierung, Puppeteer für HTML→PDF, sowie Sharp/Vite-Skripte für Optimierung auf.
---

# shinywrks — Asset-Erstellung

Dieser Skill erstellt Assets im shinywrks Corporate Design. Vor jedem Asset werden die CI-Regeln unten **konsequent** angewendet, danach das passende Workflow-Rezept verwendet. Die Code-Bausteine in Sektion 4 sind getestet und sollten als Startpunkt für jedes statische Asset dienen.

---

## 1 — Corporate Identity (verbindlich)

### Farben

| Token | Hex | Verwendung |
|-------|------|------------|
| black | `#0D0B08` | primärer Text, dunkle Flächen, Icons |
| dark | `#1A1209` | Body-Text, sekundär dunkel |
| mono | `#3D3428` | Mono-Labels lesbar gedämpft |
| beige-readable | `#8B7A5C` | Mono-Labels die noch lesbar sein müssen |
| beige-soft | `#A89878` | dekorative Section-Nummern (`01`, `02`) |
| beige | `#C4B8A4` | **nur dekorativ** / Hover / Placeholder — nicht für Lese-Text |
| border | `#D8CDB8` / `#E8E2D6` | Borders, Dividers (wärmer bzw. heller) |
| paper | `#F5F3EF` | Standard-Hintergrund hell (kühler) |
| paper-warm | `#EFE8D8` | wärmerer Paper-Hintergrund (für Druck-Dokumente, CV) |
| paper-warm-2 | `#E5DBC4` | Sidebar / Akzent-Flächen (auf paper-warm) |

**Wann welches Paper?**
- Web-Assets / Standard-Portfolio → `#F5F3EF`
- Druck-Dokumente, CV, Editorial → `#EFE8D8` (wärmer, weniger digital)

Verlauf-Defaults für Hero-Backgrounds (Projektseite):
- Dunkel-Schwarz: `linear-gradient(160deg, #0D0B08 0%, #1a1209 100%)`
- Warm-Grün: `linear-gradient(160deg, #3D4D44 0%, #2E3B34 100%)` (Myndful)
- Akzent-Burgundy: `radial-gradient(ellipse at 30% 40%, #3a1f14 0%, #1a0f0a 55%, #0a0a0d 100%)` (Spotright)

### Typografie

- **Display / Titel**: Space Grotesk 500–700, `letter-spacing: -0.03em`, uppercase optional
- **Body**: Space Grotesk 11–17px, `line-height: 1.5–1.65`, color `#1A1209`
- **Mono Labels (klein)**: Space Mono **8–12px**, `letter-spacing: 0.14em`, **UPPERCASE**, color `#3D3428` (gedämpft) oder `#8B7A5C` (auf paper-warm, lesbarer)
- **Meta-Zeilen** (TagLine-Stil): slash-separiert, mono, uppercase — Beispiel: `VISUAL IDENTITY / EVENT / 2025`

Google-Fonts-Einbettung:
```html
<link rel="preconnect" href="https://fonts.googleapis.com">
<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
<link href="https://fonts.googleapis.com/css2?family=Space+Grotesk:wght@400;500;700&family=Space+Mono:wght@400;700&display=swap" rel="stylesheet">
```

### Stil-Signatur

- **Noise-Overlay** (SVG fractalNoise, blend-mode overlay/multiply, opacity 0.06–0.45) — gibt Druck-/Filmgefühl. Für warme Paper-Tones: feColorMatrix mit braunen RGB-Werten + `mix-blend-mode: multiply` (siehe Code-Baustein 4.2)
- **Editorial Grid**: viel Whitespace, harte 1px-Borders, Section-Nummern (`01`, `02` …) in `beige-soft` neben Mono-Labels
- **Dot-Grid** (statt klassischem Grid): radial-gradient, 18–24px spacing, opacity 0.18 — selektiv einsetzen (z.B. nur Hero oder Bottom-Row), nicht flächig
- **Analog-Anmutung**: keine Glow-Effekte, keine Gradients ausser den definierten, keine abgerundeten Ecken (max. `border-radius: 4–5px` nur für App-Icon-artige Badges)
- **Easings**: `cubic-bezier(0.16,1,0.3,1)` für sanfte Web-Animationen — niemals bouncy

### Was NICHT machen

- ❌ keine Emojis in Assets
- ❌ keine bunten Akzentfarben ausser projekt-spezifisch via `bg`-Gradient
- ❌ keine Sans wie Inter / Helvetica — **immer** Space Grotesk
- ❌ keine generischen KI-Ästhetiken (glossy, 3D-render, neon, glow)
- ❌ keine Mono-Labels in `#C4B8A4` wenn sie lesbar sein müssen — nutze `#8B7A5C`
- ❌ Dot-Grid nicht flächig über ganze Seite — gezielt auf ein/zwei Bereiche

---

## 2 — Asset-Typen & Rezepte

Wähle das passende Rezept anhand der User-Anfrage. Wenn unklar: per `AskUserQuestion` nachfragen welcher Asset-Typ + Format gewünscht ist.

### A) Instagram Square Post (1080×1080)
**Use case**: Projekt-Announcement, Behind-the-Scenes, Statement-Karte.

Layout-Optionen:
1. **Statement-Karte**: paper bg, Mono-Label oben (`SHINYWRKS / 2026 /`), Space-Grotesk-Headline mittig, Mono-Footer unten
2. **Projekt-Cover**: projekt-`bg` als Fläche, Logo zentriert (filter: invert wenn dunkler bg), TagLine unter Logo in mono
3. **Editorial Split**: 50/50 — links Foto/Mockup, rechts paper bg mit Meta + Headline

Liefer-Format: WebP, Quality 92, max 2400px Längsseite.

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
**Use case**: Twitter / LinkedIn / Slack Preview. Vorlage: `templates/og-card.html`.

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

### H) Lebenslauf / A4-Dokument
**Use case**: CV, Konzept-Brief, Whitepaper, einseitige Print-Dokumente. Vorlage: `templates/cv-a4.html`.

**Pflicht-Setup**:
```css
@page { size: A4 portrait; margin: 0; }
.page {
  width: 210mm;
  height: 297mm;
  background: #EFE8D8;          /* paper-warm */
  overflow: hidden;
  display: flex;
  flex-direction: column;
}
```

**Layout-Konventionen**:
- **Top-Header** (3-spaltig, `border-bottom #D8CDB8`): links 3 Mono-Disziplinen, mitte Dokument-Titel + Tagline, rechts Datum/Ort Meta-Stack. `align-items: center` für vertikale Mitte
- **Hero** (2-spaltig `1.85fr / 1fr`): links Signet 60–72px + Headline + Body, rechts Portrait + Meta-Liste
- **Sections** (`section.block`): `border-bottom`, Section-Header mit Nummer (`section-num`, beige-soft) und Label (`section-label`, dark)
- **Footer** (3-spaltig): `border-top`, Mono-Zeile unten. `margin-top: auto` zwingt zum unteren Seitenrand
- **Noise-Overlay** ganzseitig (siehe 4.2), wärmer durch feColorMatrix
- **Dot-Grid** selektiv in Hero oder Bottom-Bereichen

**Häufige Fallen** (aus Erfahrung):
- Mono-Labels brauchen `white-space: nowrap` damit Daten wie „SEP 2022 — AUG 2025" nicht umbrechen
- Bei 2-Spalten Hero: Spalten matchen sich auf Höhe → Portrait `max-width` kontrolliert über `aspect-ratio` die Höhe; bei Mismatch zwischen hero-text und hero-meta entsteht Whitespace
- Bei Footer-Cutoff: `margin-top: auto` auf footer + Content reduzieren statt overflow ignorieren
- Auto-Margin-Centering: `margin-top: auto` + `margin-bottom: auto` auf einem Flex-Item zentriert es in der verfügbaren Restfläche

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

### Workflow 2: Statisches Asset via HTML → Screenshot/PDF

Für Layouts (OG-Image, Statement-Karten, CVs):

1. Templates aus `templates/` als Startpunkt verwenden:
   - `og-card.html` für 1200×630 OG-Cards
   - `ig-square.html` für 1080×1080 IG-Posts
   - `cv-a4.html` für A4-Dokumente
2. Inline-CSS mit CI-Tokens, Google Fonts eingebettet, Noise-Overlay drin
3. Output:
   - **PNG/WebP**: via Puppeteer screenshot
   - **PDF**: via Puppeteer.pdf() — siehe Workflow 5

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

### Workflow 5: HTML → PDF via Puppeteer

Für CVs / A4-Dokumente oder andere Print-Outputs.

**Erst-Setup** (einmalig pro Projekt-Ordner):
```bash
npm init -y
npm install puppeteer --silent
```

**Render-Skript** (`templates/render-pdf.mjs`):
```javascript
import puppeteer from 'puppeteer';
import path from 'path';
import { fileURLToPath } from 'url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const htmlPath = path.join(__dirname, 'INPUT.html');
const pdfPath = path.join(__dirname, 'OUTPUT.pdf');

const browser = await puppeteer.launch({
  headless: true,
  args: ['--no-sandbox', '--disable-setuid-sandbox']
});
const page = await browser.newPage();
await page.goto('file://' + htmlPath, { waitUntil: 'networkidle0' });
await new Promise(r => setTimeout(r, 1500));  // Fonts loaded
await page.pdf({
  path: pdfPath,
  format: 'A4',
  printBackground: true,
  margin: { top: 0, right: 0, bottom: 0, left: 0 },
  preferCSSPageSize: true
});
await browser.close();
```

Ausführen:
```bash
node render-pdf.mjs
```

**Wichtig**:
- `printBackground: true` damit Backgrounds (paper-warm, dot-grid, noise) gerendert werden
- `preferCSSPageSize: true` nutzt `@page` aus dem HTML
- 1500ms warten damit Google Fonts geladen sind
- Bilder via relativer Pfad referenzieren (gleiches Verzeichnis wie HTML)

**Prozess in interaktivem Workflow** (User testet HTML zuerst):
1. HTML schreiben, an User schicken (`SendUserFile`)
2. **NICHT direkt PDF rendern** — User Feedback zum HTML abwarten
3. Iterate auf HTML bis Freigabe
4. Erst dann PDF rendern und beides ausliefern

---

## 4 — Code-Bausteine

Getestete CSS-Patterns aus realen shinywrks-Assets. Direkt copy-paste-fähig.

### 4.1 — A4 Page-Setup (Print-Dokument)

```css
@page { size: A4 portrait; margin: 0; }

html, body { background: #c9c1b0; }  /* Container-Rahmen rund um die Seite */
body {
  font-family: 'Space Grotesk', sans-serif;
  color: #1A1209;
  -webkit-font-smoothing: antialiased;
  padding: 18px 0;
  display: flex;
  justify-content: center;
}

.page {
  position: relative;
  width: 210mm;
  height: 297mm;
  background: #EFE8D8;            /* paper-warm */
  box-shadow: 0 24px 64px rgba(0,0,0,0.22);
  overflow: hidden;
  display: flex;
  flex-direction: column;
}

@media print {
  body { padding: 0; background: #EFE8D8; }
  .page { box-shadow: none; }
}
```

### 4.2 — Noise-Overlay (warm-braun, für paper-warm bgs)

```css
.page::after {
  content: '';
  position: absolute; inset: 0;
  pointer-events: none;
  background-image: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='400' height='400'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.8' numOctaves='4' stitchTiles='stitch'/%3E%3CfeColorMatrix type='matrix' values='0.18 0 0 0 0   0.14 0 0 0 0   0.08 0 0 0 0   0 0 0 0.7 0'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)' opacity='0.10'/%3E%3C/svg%3E");
  mix-blend-mode: multiply;
  opacity: 0.45;
  z-index: 10;
}
```

Für kühlen `paper #F5F3EF`: `mix-blend-mode: overlay`, opacity 0.55, ohne feColorMatrix:
```css
background-image: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='400' height='400'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.78' numOctaves='4' stitchTiles='stitch'/%3E%3CfeColorMatrix type='saturate' values='0'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)' opacity='0.06'/%3E%3C/svg%3E");
```

### 4.3 — Dot-Grid (selektiv via Modifier-Klasse)

```css
:root { --dot: rgba(100, 88, 72, 0.18); }

.dot-grid {
  background-image: radial-gradient(circle at 1px 1px, var(--dot) 0.8px, transparent 1.1px);
  background-size: 18px 18px;        /* enger = 14-18px, weiter = 24-30px */
  background-position: 0 0;
}
```

Anwendung: `<div class="hero-text dot-grid">` — nur an bewussten Stellen, nie flächig.

### 4.4 — Star-Signet (inline SVG, currentColor)

```html
<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 376 347" style="width:72px;height:72px;fill:#0D0B08;">
  <polygon points="253.5 208.7 360.6 347 215.4 233.3 147.3 277.4 155.6 237.2 15.4 347 128.1 201.5 0 217.6 122.5 138.3 15.4 0 160.6 113.7 228.7 69.6 220.3 109.8 360.6 0 247.9 145.4 376 129.4 253.5 208.7"/>
</svg>
```

Größen-Konventionen: 22px (Nav Desktop) · 28px (Nav Desktop alt) · 34–44px (Detail-Header) · 60–72px (Hero-Dominanz) · 100px+ (Splash/Cover).

### 4.5 — Section-Pattern (Nummer + Label + Entries)

```html
<section class="block">
  <div class="section-header">
    <span class="section-num">01</span>
    <span class="section-label">Bildungs- und Berufsweg</span>
  </div>
  <div class="entry">
    <div class="entry-date">FEB 2026 — HEUTE</div>
    <div class="entry-main">
      <div class="place">Belan GmbH</div>
      <div class="role">Produktmanager / Mediengestalter</div>
    </div>
    <div class="entry-desc">Beschreibungstext…</div>
  </div>
</section>
```

```css
section.block { padding: 13px 28px 10px; border-bottom: 1px solid var(--border); }
.section-header { display: grid; grid-template-columns: 36px 1fr; align-items: baseline; margin-bottom: 10px; }
.section-num { font-family: 'Space Mono'; font-size: 9px; letter-spacing: 0.16em; color: var(--beige-soft); }
.section-label { font-family: 'Space Mono'; font-size: 9.5px; letter-spacing: 0.16em; color: var(--dark); text-transform: uppercase; }

.entry {
  display: grid;
  grid-template-columns: 150px 1fr 235px;    /* date | flex middle | aligned right */
  column-gap: 18px;
  padding: 9px 0;
  border-top: 1px solid var(--border);
  align-items: baseline;
}
.entry:first-of-type { border-top: none; }
.entry-date { font-family: 'Space Mono'; font-size: 9px; letter-spacing: 0.14em; text-transform: uppercase; white-space: nowrap; }
.entry-main .place { font-family: 'Space Grotesk'; font-weight: 500; font-size: 12px; text-transform: uppercase; }
.entry-main .role { font-family: 'Space Mono'; font-size: 8.5px; letter-spacing: 0.14em; text-transform: uppercase; }
.entry-desc { font-size: 10.5px; line-height: 1.5; }
```

### 4.6 — Meta-Grid 2-Spalten (Sidebar mit Name/Datum/Adresse/Kontakt)

```css
.meta-list {
  display: grid;
  grid-template-columns: 1fr 1fr;
  column-gap: 14px;
  row-gap: 9px;
}
.meta-block.full { grid-column: 1 / -1; }
.meta-block .label {
  font-family: 'Space Mono'; font-size: 7.5px;
  letter-spacing: 0.18em; color: var(--beige-readable);
  text-transform: uppercase; display: block; margin-bottom: 2px;
}
.meta-block .value {
  font-family: 'Space Mono'; font-size: 8.5px;
  letter-spacing: 0.04em; color: var(--dark);
  text-transform: uppercase; display: block; line-height: 1.4;
}
```

### 4.7 — Portrait-Box (Sepia + Vignette)

```css
.portrait {
  width: 100%;
  max-width: 235px;            /* Höhe via aspect-ratio */
  aspect-ratio: 4 / 5;
  margin: 0 auto;
  background:
    url('portrait.webp') center 28% / cover no-repeat,
    var(--paper-warm-2);
  position: relative;
  filter: sepia(0.22) saturate(0.88) contrast(1.04);
  border: 1px solid var(--border);
}
.portrait::after {
  content: '';
  position: absolute; inset: 0;
  background: linear-gradient(180deg, rgba(45,30,18,0) 55%, rgba(45,30,18,0.22) 100%);
  pointer-events: none;
}
```

### 4.8 — Auto-Margin Centering (Flex-Column)

Um ein Element in der Restfläche eines Flex-Column-Containers zu zentrieren:
```css
.contact-strip {
  margin-top: auto;
  margin-bottom: auto;
}
```
- Nur `margin-top: auto` → Element wird nach unten gedrückt
- Beide auto → Element sitzt mittig im verbleibenden Raum

### 4.9 — Footer-Anker (verhindert Cut-off)

```css
.page { display: flex; flex-direction: column; overflow: hidden; }
footer { margin-top: auto; }    /* zieht footer ans untere Ende */
```
**Aber Achtung**: Wenn Content > 297mm, wird footer trotzdem abgeschnitten. Lösung: Content reduzieren (Paddings/Portrait/etc.), nicht overflow ignorieren.

### 4.10 — Software/Skill-Chips mit Letter-Icon + 4-Punkt-Skala

```html
<div class="sw-chip">
  <div class="sw-icon boxed">Ps</div>     <!-- Adobe-Style -->
  <div>
    <div class="sw-name">Photoshop</div>
    <div class="sw-dots" data-level="4">
      <span></span><span></span><span></span><span></span>
    </div>
  </div>
</div>
```

```css
.sw-chip {
  border: 1px solid var(--border);
  background: rgba(208, 195, 170, 0.35);
  padding: 8px 10px;
  display: grid;
  grid-template-columns: auto 1fr;
  column-gap: 10px;
  align-items: center;
}
.sw-icon { width: 28px; height: 28px; display: flex; align-items: center; justify-content: center; color: var(--black); }
.sw-icon.boxed { background: var(--black); color: var(--paper); border-radius: 5px; font-family: 'Space Grotesk'; font-weight: 700; font-size: 12.5px; }
.sw-icon svg { width: 24px; height: 24px; fill: currentColor; }
.sw-icon.boxed svg { width: 18px; height: 18px; }
.sw-name { font-family: 'Space Mono'; font-size: 7.5px; letter-spacing: 0.14em; text-transform: uppercase; margin-bottom: 5px; }
.sw-dots { display: flex; gap: 4px; }
.sw-dots span { width: 5px; height: 5px; border-radius: 50%; background: var(--border); }
.sw-dots[data-level="1"] span:nth-child(-n+1),
.sw-dots[data-level="2"] span:nth-child(-n+2),
.sw-dots[data-level="3"] span:nth-child(-n+3),
.sw-dots[data-level="4"] span:nth-child(-n+4) { background: var(--black); }
```

**Konvention**: Adobe-Tools = `boxed` Letter-Stil (Ps, Ai, Id, Pr, Ae) — das IST ihre offizielle App-Icon-Form. Andere Tools = ungeboxte echte SVG-Marken (Figma, Blender, Notion, Anthropic-Star für Claude, etc.).

### 4.11 — Kontakt-Strip mit Inline-Icons

```html
<div class="contact-strip">
  <span class="ci">
    <svg class="ci-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.6" stroke-linecap="round">
      <circle cx="12" cy="12" r="9.5"/>
      <line x1="2.5" y1="12" x2="21.5" y2="12"/>
      <path d="M12 2.5 C 7 7 7 17 12 21.5 M 12 2.5 C 17 7 17 17 12 21.5"/>
    </svg>
    <span class="mono">SHINYWRKS.DE</span>
  </span>
  <!-- Phone-Icon + Nummer -->
  <!-- Envelope-Icon + Email -->
</div>
```

Icons (Line-Style, 12px, stroke-currentColor): Globe, Phone-Handset, Envelope. SVG-Paths siehe `templates/cv-a4.html`.

---

## 5 — Checkliste vor Auslieferung

- [ ] Farben aus offizieller Palette (kein Pink, Blau, Grün ausser projekt-spezifisch)
- [ ] Typo: Space Grotesk Display, Space Mono Labels
- [ ] Mono-Labels UPPERCASE mit `letter-spacing: 0.14em` (oder 0.16/0.18em für sehr kleine)
- [ ] Mono-Labels die lesbar sein müssen → in `#8B7A5C` oder `#3D3428`, NICHT in `#C4B8A4`
- [ ] `white-space: nowrap` auf Mono-Labels mit Daten/Längen die nicht umbrechen sollen
- [ ] Noise-Overlay (subtle); bei warmen Tönen mit braunem feColorMatrix
- [ ] Dot-Grid (wenn verwendet) gezielt, nicht flächig
- [ ] Keine generische KI-Ästhetik (glossy / neon / 3D render)
- [ ] Datei in `public/<slug>/` abgelegt, WebP/SVG-Format (für Web) bzw. PDF (für Print)
- [ ] Dateiname kebab-case (`m-poster-triple.webp`)
- [ ] Falls Listing-Asset: `projects.json` Eintrag aktualisiert
- [ ] Bei A4-Dokumenten: Footer nicht abgeschnitten (Content < 297mm)

---

## 6 — Werkzeug-Referenz

| Tool | Wofür |
|------|-------|
| `mcp__d580faa6-…__generate_image` | Foto-/Illustrations-Basis generieren |
| `mcp__d580faa6-…__generate_video` | Loop-Animationen (z.B. `landing-idle.mp4`-artig) |
| `Bash` → `npm install puppeteer && node render-pdf.mjs` | HTML → PDF (A4) für CV/Print-Dokumente |
| `Bash` → `npm run optimize:images` | WebP-Konvertierung + Resize |
| `Bash` → `sharp` / `identify` | Aspect-Ratio ermitteln |
| `Write` | SVG-Logos / HTML-Templates schreiben |
| `Edit` → `public/projects.json` | Asset im Schema registrieren |
| `SendUserFile` | HTML zur Review schicken (vor Render), oder finale Assets ausliefern |

---

## 7 — Iterations-Workflow (für statische Assets mit User-Review)

Wichtig wenn User Layouts iterativ reviewt (z.B. CV, OG-Card):

1. HTML schreiben oder bestehendes Template anpassen
2. **HTML zuerst per `SendUserFile`** an User schicken — KEIN PDF/PNG rendern
3. User-Feedback einarbeiten, HTML aktualisieren
4. Schritte 2–3 wiederholen bis Freigabe
5. **Erst dann** PDF/PNG via Puppeteer rendern und ausliefern

Dieses Vorgehen spart Render-Zyklen und respektiert die User-Konvention „PDF erst rendern wenn HTML bestätigt".

---

## 8 — Frag den User wenn unklar

Bei jeder Skill-Aktivierung — wenn nicht aus dem Prompt eindeutig — kläre via `AskUserQuestion`:

1. **Welcher Asset-Typ?** (Social Post / Story / Poster / OG-Image / Projekt-Thumb / Mockup / Logo / CV)
2. **Welches Format / welche Dimensionen?** (default IG square 1080×1080 wenn unklar; A4 für Dokument)
3. **Welches Projekt / Kontext?** (existierender Projekt-Slug oder neues / standalone shinywrks-Asset)
4. **Soll das Asset in `projects.json` registriert werden?**

Erst nach Klärung Workflow starten.
