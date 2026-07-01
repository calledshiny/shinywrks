import { useEffect, useRef, useState } from 'react';
import { useMobile } from '../hooks/useMobile';

const ADVANCE_MS = 4500;
const PAUSE_MS = 60000;

export default function StillsCarousel({ stills = [] }) {
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
      setActive(Math.max(0, Math.min(stills.length - 1, idx)));
    };
    el.addEventListener('scroll', onScroll, { passive: true });
    return () => el.removeEventListener('scroll', onScroll);
  }, [stills.length]);

  const goTo = (i) => {
    const el = stripRef.current;
    if (!el) return;
    const wrapped = ((i % stills.length) + stills.length) % stills.length;
    el.scrollTo({ left: wrapped * el.clientWidth, behavior: 'smooth' });
  };

  useEffect(() => {
    if (paused) return;
    const id = setTimeout(() => goTo(activeRef.current + 1), ADVANCE_MS);
    return () => clearTimeout(id);
  }, [active, paused, stills]);

  const pauseAuto = () => {
    setPaused(true);
    clearTimeout(resumeTimer.current);
    resumeTimer.current = setTimeout(() => setPaused(false), PAUSE_MS);
  };

  const onArrow = (dir) => { pauseAuto(); goTo(activeRef.current + dir); };
  const onDot = (i) => { pauseAuto(); goTo(i); };

  const arrowStyle = {
    background: 'none',
    border: 'none',
    padding: '0 16px',
    cursor: 'none',
    color: '#C4B8A4',
    display: 'flex',
    alignItems: 'center',
    flexShrink: 0,
    transition: 'color 200ms ease',
  };

  return (
    <div style={{ display: 'flex', flexDirection: 'column', width: '100%' }}>
      <div style={{ position: 'relative', width: '100%' }}>
        <div style={{ width: '100%', aspectRatio: '1/1', overflow: 'hidden', background: '#0D0B08' }}>
          <div
            ref={stripRef}
            className="screens-strip"
            style={{
              display: 'flex',
              width: '100%',
              height: '100%',
              overflowX: 'auto',
              overflowY: 'hidden',
              scrollSnapType: 'x mandatory',
              scrollbarWidth: 'none',
              msOverflowStyle: 'none',
            }}
          >
            {stills.map((s, i) => (
              <div key={i} style={{ flexShrink: 0, width: '100%', height: '100%', scrollSnapAlign: 'start' }}>
                <img
                  src={s.src}
                  alt={s.title || ''}
                  style={{ display: 'block', width: '100%', height: '100%', objectFit: 'cover' }}
                />
              </div>
            ))}
          </div>
        </div>
        {!mobile && (
          <>
            <button type="button" className="carousel-arrow-outer" aria-label="Vorheriges Still" onClick={() => onArrow(-1)}
              style={{ position: 'absolute', left: -56, top: '50%', transform: 'translateY(-50%)' }}>
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                <polyline points="15 18 9 12 15 6"/>
              </svg>
            </button>
            <button type="button" className="carousel-arrow-outer" aria-label="Nächstes Still" onClick={() => onArrow(1)}
              style={{ position: 'absolute', right: -56, top: '50%', transform: 'translateY(-50%)' }}>
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                <polyline points="9 18 15 12 9 6"/>
              </svg>
            </button>
          </>
        )}
      </div>

      <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', gap: mobile ? 6 : 8, padding: mobile ? '14px 0 0' : '16px 0 0' }}>
        {stills.map((_, i) => {
          const isActive = active === i;
          const dotH = mobile ? 5 : 6;
          const dotInactiveW = mobile ? 5 : 6;
          const dotActiveW = mobile ? 14 : 18;
          return (
            <button
              key={i}
              type="button"
              onClick={() => onDot(i)}
              aria-label={`Still ${i + 1}`}
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
