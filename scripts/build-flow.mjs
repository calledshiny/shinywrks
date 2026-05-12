import sharp from 'sharp';

const TERRA = '#B07050';
const W = 1600, H = 900;

// Helper: a glass-style rounded box with number badge + title + sub
function box(x, y, w, h, num, title, sub) {
  return `
  <g transform="translate(${x},${y})">
    <rect x="0" y="0" width="${w}" height="${h}" rx="20"
      fill="rgba(255,255,255,0.05)" stroke="rgba(255,255,255,0.18)" stroke-width="1.5"/>
    <rect x="0" y="0" width="${w}" height="1" fill="rgba(255,255,255,0.28)"/>
    <circle cx="28" cy="28" r="14" fill="${TERRA}"/>
    <text x="28" y="33" text-anchor="middle" font-family="DM Sans, sans-serif" font-size="14" font-weight="600" fill="white">${num}</text>
    <text x="28" y="78" font-family="Lora, serif" font-size="22" fill="white" font-weight="500">${title}</text>
    <text x="28" y="${h - 22}" font-family="DM Sans, sans-serif" font-size="12" fill="rgba(255,255,255,0.55)" letter-spacing="1.5">${sub}</text>
  </g>`;
}

// Arrow from (x1, y1) to (x2, y2), straight horizontal/vertical or curved
function arrow(x1, y1, x2, y2, label = '') {
  const mid = (x1 + x2) / 2;
  const path = `M ${x1} ${y1} L ${x2 - 12} ${y2}`;
  return `
  <g stroke="${TERRA}" stroke-width="2" fill="none">
    <path d="${path}"/>
    <polygon points="${x2 - 12},${y2 - 6} ${x2},${y2} ${x2 - 12},${y2 + 6}" fill="${TERRA}" stroke="none"/>
  </g>
  ${label ? `<text x="${mid}" y="${y1 - 12}" text-anchor="middle" font-family="DM Sans, sans-serif" font-size="11" fill="rgba(255,255,255,0.55)" letter-spacing="2">${label}</text>` : ''}`;
}

const bw = 220, bh = 130;
const yTop = 200, yBot = 540;
const gap = 60;
const xs = [80, 80 + bw + gap, 80 + 2 * (bw + gap), 80 + 3 * (bw + gap), 80 + 4 * (bw + gap)];

const svg = `<svg xmlns="http://www.w3.org/2000/svg" width="${W}" height="${H}" viewBox="0 0 ${W} ${H}">
  <defs>
    <radialGradient id="g" cx="50%" cy="50%" r="80%">
      <stop offset="0%" stop-color="#3a1f14" stop-opacity="1"/>
      <stop offset="50%" stop-color="#1a0f0a" stop-opacity="1"/>
      <stop offset="100%" stop-color="#0a0a0d" stop-opacity="1"/>
    </radialGradient>
    <filter id="n">
      <feTurbulence type="fractalNoise" baseFrequency="0.85" numOctaves="3" stitchTiles="stitch"/>
      <feColorMatrix type="saturate" values="0"/>
    </filter>
  </defs>
  <rect width="100%" height="100%" fill="url(#g)"/>
  <rect width="100%" height="100%" filter="url(#n)" opacity="0.06"/>

  <text x="80" y="100" font-family="DM Sans, sans-serif" font-size="13" font-weight="500" letter-spacing="3" fill="rgba(255,255,255,0.6)">USER FLOW</text>
  <text x="80" y="140" font-family="Lora, serif" font-size="32" fill="white" font-weight="500">Vom Hero zur Auswahl.</text>

  ${box(xs[0], yTop, bw, bh, '1', 'Landing', 'STADT + KATEGORIE')}
  ${box(xs[1], yTop, bw, bh, '2', 'Entdecken', 'KURATIERTE LISTE')}
  ${box(xs[2], yTop, bw, bh, '3', 'Event Detail', 'INFO + AKTIONEN')}
  ${box(xs[3], yTop, bw, bh, '4', 'Save', 'BOOKMARK ICON')}
  ${box(xs[4], yTop, bw, bh, '5', 'Meine Spots', 'GESPEICHERT')}

  ${arrow(xs[0] + bw, yTop + bh / 2, xs[1], yTop + bh / 2, 'CTA')}
  ${arrow(xs[1] + bw, yTop + bh / 2, xs[2], yTop + bh / 2, 'TAP CARD')}
  ${arrow(xs[2] + bw, yTop + bh / 2, xs[3], yTop + bh / 2, 'BOOKMARK')}
  ${arrow(xs[3] + bw, yTop + bh / 2, xs[4], yTop + bh / 2, 'AUTO')}

  <line x1="80" y1="${yTop + bh + 80}" x2="${W - 80}" y2="${yTop + bh + 80}" stroke="rgba(255,255,255,0.08)" stroke-width="1"/>

  <text x="80" y="${yBot - 40}" font-family="DM Sans, sans-serif" font-size="13" font-weight="500" letter-spacing="3" fill="rgba(255,255,255,0.6)">ALTERNATIVE PATH</text>
  <text x="80" y="${yBot}" font-family="Lora, serif" font-size="28" fill="white" font-weight="500">Für dich — Stepwise Funnel</text>

  ${box(xs[0], yBot + 50, bw, bh, 'A', 'Wann?', 'JETZT / HEUTE / WOCHE')}
  ${box(xs[1], yBot + 50, bw, bh, 'B', 'Was?', 'ROOFTOP / MUSIK / …')}
  ${box(xs[2], yBot + 50, bw, bh, 'C', 'Wer?', 'GRUPPE / 18+ / …')}
  ${box(xs[3], yBot + 50, bw, bh, '✓', 'Resultate', 'PERSONALISIERT')}

  ${arrow(xs[0] + bw, yBot + 50 + bh / 2, xs[1], yBot + 50 + bh / 2)}
  ${arrow(xs[1] + bw, yBot + 50 + bh / 2, xs[2], yBot + 50 + bh / 2)}
  ${arrow(xs[2] + bw, yBot + 50 + bh / 2, xs[3], yBot + 50 + bh / 2)}

  <path d="M ${xs[3] + bw} ${yBot + 50 + bh / 2} Q ${xs[4] + bw / 2} ${yBot + 50 + bh / 2 + 30}, ${xs[2] + bw / 2} ${yTop + bh}" stroke="${TERRA}" stroke-width="2" stroke-dasharray="6 6" fill="none" opacity="0.7"/>
  <text x="${xs[4]}" y="${yBot + 50 + bh / 2 + 90}" font-family="DM Sans, sans-serif" font-size="11" letter-spacing="2" fill="rgba(255,255,255,0.5)">FEEDS BACK INTO MAIN PATH</text>

</svg>`;

await sharp(Buffer.from(svg)).webp({ quality: 92 }).toFile('/home/user/shinywrks/public/spotright/ux-flow.webp');
console.log('done');
