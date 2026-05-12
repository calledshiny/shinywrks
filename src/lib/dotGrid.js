export function initDotGrid() {
  const canvas = document.getElementById('dot-grid-canvas');
  if (!canvas) return;
  const ctx = canvas.getContext('2d');
  const SPACING = 20;
  const BASE_RADIUS = 1.0;
  const BASE_ALPHA = 0.15;
  const REPEL_RADIUS = 140;
  const MAX_REPEL = 6;

  let mouse = { x: -999, y: -999 };
  let dots = [];

  const BASE_COLOR = [100, 88, 72];

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
  let nextPulseIn = 1000 + Math.random() * 1500;

  function draw() {
    const now = performance.now();
    if (now - lastPulseTime > nextPulseIn) {
      let tries = 0, spawned = false;
      while (tries++ < 8 && !spawned) {
        const nx = Math.random() * canvas.width;
        const ny = Math.random() * canvas.height;
        const tooClose = pulses.some(p => Math.hypot(nx - p.x, ny - p.y) < 250);
        if (!tooClose) { pulses.push({ x: nx, y: ny, radius: 0, maxRadius: 500 + Math.random() * 400, speed: 6 + Math.random() * 4, intensity: 0.55 + Math.random() * 0.25, sigma: 60 + Math.random() * 40 }); spawned = true; }
      }
      lastPulseTime = now;
      nextPulseIn = 400 + Math.random() * 500;
    }
    pulses = pulses.filter(p => p.radius < p.maxRadius);
    for (const p of pulses) { p.speed += 0.5; p.radius += p.speed; }

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
      for (const p of pulses) {
        const pdx = d.bx - p.x;
        const pdy = d.by - p.y;
        const pdist = Math.sqrt(pdx * pdx + pdy * pdy);
        const delta = pdist - p.radius;
        pulseAlpha += p.intensity * p._fade * Math.exp(-0.5 * Math.pow(delta / p.sigma, 2));
      }

      d.vx = (d.vx + (d.tx - d.ox) * 0.26) * 0.58;
      d.vy = (d.vy + (d.ty - d.oy) * 0.26) * 0.58;
      d.ox += d.vx;
      d.oy += d.vy;
      const aSpeed = inRepel ? 0.45 : 0.12;
      d.a  = (d.a  || BASE_ALPHA) + ((d.ta || BASE_ALPHA) - d.a)  * aSpeed;
      d.cf = (d.cf || 0)          + ((d.tc || 0)          - d.cf) * aSpeed;

      const totalMag = Math.sqrt(d.ox * d.ox + d.oy * d.oy);
      const rodAngle = totalMag > 0.01 ? Math.atan2(d.oy, d.ox) : 0;
      const tiltFactor = Math.min(1, totalMag / 8);
      const baseR = BASE_RADIUS;
      const radiusX = baseR + totalMag * 0.28;
      const radiusY = Math.max(0.4, baseR * (1 - tiltFactor * 0.55));

      const boost = Math.round((d.cf || 0) * 55);
      const r = Math.min(255, BASE_COLOR[0] + boost);
      const g = Math.min(255, BASE_COLOR[1] + boost);
      const b = Math.min(255, BASE_COLOR[2] + boost);
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
