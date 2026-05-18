import { useEffect, useRef, useState } from 'react';
import { useMobile } from '../hooks/useMobile';

const ADVANCE_MS = 6000;
const PAUSE_MS = 60000;

export default function PlakatCarousel({ plakate = [] }) {
  const mobile = useMobile();
  const stripRef = useRef();
  const activeRef = useRef(0);
  const resumeTimer = useRef(null);
  const [active, setActive] = useState(0);
  const [paused, setPaused] = useState(false);

  useEffect(() => { activeRef.current = active; }, [active]);

  useEffect(() => {
    const el = stripRef.current;
    if (!el) return;
    const onScroll = () => {
      const w = el.clientWidth;
      if (!w) return;
      const idx = Math.round(el.scrollLeft / w);
      setActive(Math.max(0, Math.min(plakate.length - 1, idx)));
    };
    el.addEventListener('scroll', onScroll, { passive: true });
    return () => el.removeEventListener('scroll', onScroll);
  }, [plakate.length]);

  const goTo = (i) => {
    const el = stripRef.current;
    if (!el) return;
    const wrapped = ((i % plakate.length) + plakate.length) % plakate.length;
    el.scrollTo({ left: wrapped * el.clientWidth, behavior: 'smooth' });
  };

  useEffect(() => {
    if (mobile || paused) return;
    const id = setTimeout(() => goTo(activeRef.current + 1), ADVANCE_MS);
    return () => clearTimeout(id);
  }, [active, mobile, paused, plakate]);

  const pauseAuto = () => {
    setPaused(true);
    clearTimeout(resumeTimer.current);
    resumeTimer.current = setTimeout(() => setPaused(false), PAUSE_MS);
  };

  const onArrow = (dir) => { pauseAuto(); goTo(activeRef.current + dir); };
  const onDot = (i) => { pauseAuto(); goTo(i); };

  if (mobile) {
    return (
      <div style={{ display: 'flex', flexDirection: 'column', gap: 44, padding: '0 20px' }}>
        {plakate.map((p, i) => (
          <div key={i} style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 10, width: '100%' }}>
            {p.title && (
              <span style={{ fontFamily: 'Space Mono, monospace', fontSize: 11, letterSpacing: '0.14em', textTransform: 'uppercase', color: '#3D3428' }}>
                {p.title}
              </span>
            )}
            <img
              src={p.src}
              alt={p.title || ''}
              style={{ display: 'block', width: '100%', height: 'auto', objectFit: 'contain' }}
            />
          </div>
        ))}
      </div>
    );
  }

  return (
    <div style={{ display: 'flex', flexDirection: 'column', position: 'relative' }}>
      {!mobile && (
        <>
          <button type="button" className="carousel-arrow carousel-arrow-prev" aria-label="Vorheriges Plakat" onClick={() => onArrow(-1)}>
            <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <polyline points="15 18 9 12 15 6"/>
            </svg>
          </button>
          <button type="button" className="carousel-arrow carousel-arrow-next" aria-label="Nächstes Plakat" onClick={() => onArrow(1)}>
            <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <polyline points="9 18 15 12 9 6"/>
            </svg>
          </button>
        </>
      )}

      <div
        ref={stripRef}
        className="screens-strip"
        style={{
          display: 'flex',
          overflowX: 'auto',
          overflowY: 'hidden',
          scrollSnapType: 'x mandatory',
          scrollbarWidth: 'none',
          msOverflowStyle: 'none',
        }}
      >
        {plakate.map((p, i) => (
          <div key={i} style={{
            flexShrink: 0,
            width: '100%',
            scrollSnapAlign: 'start',
            padding: mobile ? '0 20px' : '0 48px',
            boxSizing: 'border-box',
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
          }}>
            <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: mobile ? 10 : 14, width: '100%' }}>
              {p.title && (
                <span style={{ fontFamily: 'Space Mono, monospace', fontSize: 11, letterSpacing: '0.14em', textTransform: 'uppercase', color: '#3D3428' }}>
                  {p.title}
                </span>
              )}
              <img
                src={p.src}
                alt={p.title || ''}
                style={{
                  display: 'block',
                  width: '100%',
                  height: 'auto',
                  objectFit: 'contain',
                }}
              />
            </div>
          </div>
        ))}
      </div>

      <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', gap: mobile ? 8 : 12, padding: mobile ? '16px 0 0' : '20px 0 0', position: 'relative', zIndex: 4 }}>
        {plakate.map((_, i) => {
          const isActive = active === i;
          const dotH = mobile ? 6 : 8;
          const dotInactiveW = mobile ? 6 : 8;
          const dotActiveW = mobile ? 18 : 24;
          return (
            <button
              key={i}
              type="button"
              onClick={() => onDot(i)}
              aria-label={`Plakat ${i + 1}`}
              aria-current={isActive ? 'true' : undefined}
              style={{
                width: isActive ? dotActiveW : dotInactiveW,
                height: dotH,
                borderRadius: 999,
                border: 'none',
                padding: 0,
                background: isActive ? '#0D0B08' : '#C4B8A4',
                cursor: 'none',
                transition: 'width 350ms cubic-bezier(0.16,1,0.3,1), background 250ms ease',
              }}
            />
          );
        })}
      </div>
    </div>
  );
}
