export function initCustomCursor() {
  const cursor = document.querySelector('.custom-cursor');
  if (!cursor || matchMedia('(hover: none), (pointer: coarse)').matches) return;
  const interactiveSel = 'a, button, .strip-item, [role="button"], input, select, textarea';
  let pendingTarget = null, hover = false, ready = false, frame = 0;

  function tickHover() {
    frame = 0;
    if (pendingTarget) {
      const next = !!pendingTarget.closest(interactiveSel);
      if (next !== hover) { hover = next; cursor.classList.toggle('is-hover', hover); }
      pendingTarget = null;
    }
  }

  window.addEventListener('pointermove', e => {
    cursor.style.transform = `translate3d(${e.clientX - 12}px, ${e.clientY - 12}px, 0)`;
    if (!ready) { cursor.classList.add('is-ready'); ready = true; }
    pendingTarget = e.target;
    if (!frame) frame = requestAnimationFrame(tickHover);
  }, { passive: true });

  window.addEventListener('mouseleave', () => {
    if (ready) { cursor.classList.remove('is-ready'); ready = false; }
  });
}
