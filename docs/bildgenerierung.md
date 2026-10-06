# Bildgenerierung

## spotright Hero, 06.10.2026

Ziel: das alte Hero-Foto (Hand hält iPhone nachts auf der Straße) mit dem neuen UI.
Dateien: `public/spotright/hero.webp` (2400 x 1339) und `public/spotright/hero-thumb.webp` (1024 x 1536, Ausschnitt).

- **Modell:** Nano Banana Pro, 16:9, 4k (Job meldet `nano_banana_2`)
- **Job:** `0d14c241-2a87-4a5b-a97b-218bc9835de3`
- **Referenzen:** altes `hero.webp` aus Git (Stand vor 06.10.) und der Screenshot
  `spotright-marketing/appstore/app-screens-2026-09-24/01-feed.png`
- **Prompt:** "Edit this exact photo (first image). Keep everything identical: the hand, the phone body,
  the framing and crop, the dark night street, the warm bokeh lights, the colors, the grain and the
  lighting. Only replace what is shown on the phone screen with the app screen from the second image.
  Fit the app screen exactly into the phone's display area, same perspective, rounded corners, the
  dynamic island stays on top. The display glows naturally like a real phone screen at night, the app
  UI stays sharp and legible. Do not add any other text or elements anywhere."

**Nachbearbeitung:** Szene und Hand waren gut, die Schrift auf dem Display war nachgezeichnet und falsch
("Houte", "Clups", "Peetry Slam"). Der echte Screenshot wurde deshalb per Homographie (SIFT, 456
Inlier) exakt auf das generierte Display gelegt, unten mit iPhone-Eckradius maskiert und in Lab
zu 60 Prozent an Helligkeit und Farbe des generierten Displays angeglichen. Die Dynamic Island
stammt aus dem generierten Bild.
