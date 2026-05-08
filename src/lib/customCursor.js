export function initCustomCursor() {
  const cursor = document.querySelector('.custom-cursor');
  if (!cursor || matchMedia('(hover: none), (pointer: coarse)').matches) return;
  const interactiveSel = 'a, button, .strip-item, [role="button"], input, select, textarea';
  let nx = -100, ny = -100, cx = -100, cy = -100;
  let pendingTarget = null, hover = false, ready = false, frame = 0;

  function tick() {
    frame = 0;
    if (nx !== cx || ny !== cy) {
      cursor.style.transform = `translate3d(${nx - 12}px, ${ny - 12}px, 0)`;
      cx = nx; cy = ny;
    }
    if (!ready) { cursor.classList.add('is-ready'); ready = true; }
    if (pendingTarget) {
      const next = !!pendingTarget.closest(interactiveSel);
      if (next !== hover) { hover = next; cursor.classList.toggle('is-hover', hover); }
      pendingTarget = null;
    }
  }

  window.addEventListener('pointermove', e => {
    nx = e.clientX; ny = e.clientY;
    pendingTarget = e.target;
    if (!frame) frame = requestAnimationFrame(tick);
  }, { passive: true });

  window.addEventListener('mouseleave', () => {
    if (ready) { cursor.classList.remove('is-ready'); ready = false; }
  });
}
