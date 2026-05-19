export function initDotGrid() {
  const canvas = document.getElementById('dot-grid-canvas');
  if (!canvas) return;
  const ctx = canvas.getContext('2d');
  const SPACING = 20;
  const BASE_RADIUS = 1.0;
  const BASE_ALPHA = 0.21;
  const REPEL_RADIUS = 140;
  const MAX_REPEL = 6;

  let mouse = { x: -999, y: -999 };
  let dots = [];

  const BASE_COLOR = [100, 88, 72];

  function hslToRgb(h, s, l) {
    h = ((h % 360) + 360) % 360 / 360;
    if (s === 0) { const v = Math.round(l * 255); return [v, v, v]; }
    const hue2rgb = (p, q, t) => {
      if (t < 0) t += 1;
      if (t > 1) t -= 1;
      if (t < 1 / 6) return p + (q - p) * 6 * t;
      if (t < 1 / 2) return q;
      if (t < 2 / 3) return p + (q - p) * (2 / 3 - t) * 6;
      return p;
    };
    const q = l < 0.5 ? l * (1 + s) : l + s - l * s;
    const p = 2 * l - q;
    return [
      Math.round(hue2rgb(p, q, h + 1 / 3) * 255),
      Math.round(hue2rgb(p, q, h) * 255),
      Math.round(hue2rgb(p, q, h - 1 / 3) * 255),
    ];
  }

  function resize() {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
    buildDots();
  }

  function buildDots() {
    dots = [];
    const cols = Math.ceil(canvas.width / SPACING) + 2;
    const rows = Math.ceil(canvas.height / SPACING) + 2;
    for (let r = 0; r < rows; r++) {
      for (let c = 0; c < cols; c++) {
        dots.push({
          bx: c * SPACING,
          by: r * SPACING,
          ox: 0, oy: 0,
          vx: 0, vy: 0,
          tx: 0, ty: 0,
          a: BASE_ALPHA,
        });
      }
    }
  }

  const isTouch = window.matchMedia('(hover: none), (pointer: coarse)').matches;
  if (!isTouch) {
    let _mouseOverInteractive = false;
    let _lastElCheck = 0;
    window.addEventListener('mousemove', e => {
      const now = performance.now();
      if (now - _lastElCheck > 50) {
        const el = document.elementFromPoint(e.clientX, e.clientY);
        _mouseOverInteractive = !!(el && el.closest('button:not(.next-project-btn), a, input, select, textarea, [role="button"]'));
        _lastElCheck = now;
      }
      if (_mouseOverInteractive) { mouse.x = -999; mouse.y = -999; }
      else { mouse.x = e.clientX; mouse.y = e.clientY; }
    });

    window.addEventListener('mouseleave', () => {
      mouse.x = -999; mouse.y = -999;
    });
  }

  window.addEventListener('resize', resize);
  resize();

  let pulses = [];
  let lastPulseTime = performance.now();
  let nextPulseIn = 3500 + Math.random() * 3500;

  window.addEventListener('pointerdown', e => {
    if (e.button !== undefined && e.button !== 0) return;
    const el = e.target;
    if (el && el.closest && el.closest('button, a, input, select, textarea, [role="button"]')) return;
    pulses.push({
      x: e.clientX,
      y: e.clientY,
      radius: 0,
      maxRadius: Math.hypot(canvas.width, canvas.height) * 1.05,
      speed: 10,
      intensity: 1.4,
      sigma: 60,
      isClick: true,
      displacement: 16,
      hueOffset: Math.random() * 360,
    });
  }, { passive: true });

  function draw() {
    const now = performance.now();
    if (now - lastPulseTime > nextPulseIn) {
      let tries = 0, spawned = false;
      while (tries++ < 8 && !spawned) {
        const nx = Math.random() * canvas.width;
        const ny = Math.random() * canvas.height;
        const tooClose = pulses.some(p => Math.hypot(nx - p.x, ny - p.y) < 400);
        if (!tooClose) { pulses.push({ x: nx, y: ny, radius: 0, maxRadius: 1300 + Math.random() * 600, speed: 1.4 + Math.random() * 0.6, intensity: 1.2 + Math.random() * 0.4, sigma: 110 + Math.random() * 50 }); spawned = true; }
      }
      lastPulseTime = now;
      nextPulseIn = 10000 + Math.random() * 6000;
    }
    pulses = pulses.filter(p => p.radius < p.maxRadius);
    for (const p of pulses) { p.speed += 0.05; p.radius += p.speed; }

    ctx.clearRect(0, 0, canvas.width, canvas.height);

    for (const p of pulses) { p._fade = 1 - p.radius / p.maxRadius; }

    for (let i = 0; i < dots.length; i++) {
      const d = dots[i];
      const dx = d.bx - mouse.x;
      const dy = d.by - mouse.y;
      const distSq = dx * dx + dy * dy;
      const inRepel = distSq < REPEL_RADIUS * REPEL_RADIUS && distSq > 0;
      const dist = inRepel ? Math.sqrt(distSq) : 0;

      if (inRepel) {
        const force = (1 - dist / REPEL_RADIUS);
        d.tx = (dx / dist) * force * MAX_REPEL;
        d.ty = (dy / dist) * force * MAX_REPEL;
        d.ta = BASE_ALPHA + force * 1.0;
        d.tc = force;
      } else {
        d.tx = 0; d.ty = 0;
        d.ta = BASE_ALPHA;
        d.tc = 0;
      }

      let pulseAlpha = 0;
      let pulsePushX = 0, pulsePushY = 0, pulsePushBoost = 0;
      let hueVecX = 0, hueVecY = 0, hueStrength = 0;
      for (const p of pulses) {
        const pdx = d.bx - p.x;
        const pdy = d.by - p.y;
        const pdist = Math.sqrt(pdx * pdx + pdy * pdy);
        const delta = pdist - p.radius;
        const gauss = Math.exp(-0.5 * Math.pow(delta / p.sigma, 2));
        pulseAlpha += p.intensity * p._fade * gauss;
        if (p.isClick && pdist > 0.001) {
          const force = gauss * p._fade;
          pulsePushX += (pdx / pdist) * force * p.displacement;
          pulsePushY += (pdy / pdist) * force * p.displacement;
          pulsePushBoost += force;
          const angleDeg = Math.atan2(pdy, pdx) * 180 / Math.PI;
          const hueRad = (angleDeg + p.hueOffset) * Math.PI / 180;
          hueVecX += Math.cos(hueRad) * force;
          hueVecY += Math.sin(hueRad) * force;
          hueStrength += force;
        }
      }

      if (pulsePushBoost > 0) {
        d.tx += pulsePushX;
        d.ty += pulsePushY;
        if (pulsePushBoost > d.tc) d.tc = pulsePushBoost;
        const pulseTa = BASE_ALPHA + pulsePushBoost * 0.9;
        if (pulseTa > d.ta) d.ta = pulseTa;
      }

      d.vx = (d.vx + (d.tx - d.ox) * 0.26) * 0.58;
      d.vy = (d.vy + (d.ty - d.oy) * 0.26) * 0.58;
      d.ox += d.vx;
      d.oy += d.vy;
      const aSpeed = (inRepel || pulsePushBoost > 0.1) ? 0.45 : 0.12;
      d.a  = (d.a  || BASE_ALPHA) + ((d.ta || BASE_ALPHA) - d.a)  * aSpeed;
      d.cf = (d.cf || 0)          + ((d.tc || 0)          - d.cf) * aSpeed;

      const totalMag = Math.sqrt(d.ox * d.ox + d.oy * d.oy);
      const rodAngle = totalMag > 0.01 ? Math.atan2(d.oy, d.ox) : 0;
      const tiltFactor = Math.min(1, totalMag / 8);
      const baseR = BASE_RADIUS;
      const radiusX = baseR + totalMag * 0.28;
      const radiusY = Math.max(0.4, baseR * (1 - tiltFactor * 0.55));

      const boost = Math.round((d.cf || 0) * 55);
      let r = Math.min(255, BASE_COLOR[0] + boost);
      let g = Math.min(255, BASE_COLOR[1] + boost);
      let b = Math.min(255, BASE_COLOR[2] + boost);
      if (hueStrength > 0.02) {
        const hue = Math.atan2(hueVecY, hueVecX) * 180 / Math.PI;
        const [rr, gg, bb] = hslToRgb(hue, 1.0, 0.68);
        const mix = Math.min(1, hueStrength);
        r = Math.round(r * (1 - mix) + rr * mix);
        g = Math.round(g * (1 - mix) + gg * mix);
        b = Math.round(b * (1 - mix) + bb * mix);
      }
      const finalAlpha = Math.min(1, d.a + pulseAlpha);

      ctx.beginPath();
      ctx.ellipse(d.bx + d.ox, d.by + d.oy, radiusX, radiusY, rodAngle, 0, Math.PI * 2);
      ctx.fillStyle = `rgba(${r},${g},${b},${finalAlpha})`;
      ctx.fill();
    }

    requestAnimationFrame(draw);
  }

  draw();
}
