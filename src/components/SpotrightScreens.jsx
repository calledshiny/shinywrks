import { useEffect, useRef, useState } from 'react';
import { useMobile } from '../hooks/useMobile';
import IPhoneMockup from './IPhoneMockup';

const FALLBACK_MS = 6000; // used for screens without a video
const PAUSE_MS = 60000;

export default function SpotrightScreens({ screens = [] }) {
  const mobile = useMobile();
  const stripRef = useRef();
  const activeRef = useRef(0);
  const resumeTimer = useRef(null);
  const [active, setActive] = useState(0);
  const [paused, setPaused] = useState(false);
  const [expanded, setExpanded] = useState(false);

  useEffect(() => { activeRef.current = active; }, [active]);
  useEffect(() => { setExpanded(false); }, [active]);

  useEffect(() => {
    const el = stripRef.current;
    if (!el) return;
    const onScroll = () => {
      const w = el.clientWidth;
      if (!w) return;
      const idx = Math.round(el.scrollLeft / w);
      setActive(Math.max(0, Math.min(screens.length - 1, idx)));
    };
    el.addEventListener('scroll', onScroll, { passive: true });
    return () => el.removeEventListener('scroll', onScroll);
  }, [screens.length]);

  const goTo = (i) => {
    const el = stripRef.current;
    if (!el) return;
    const wrapped = ((i % screens.length) + screens.length) % screens.length;
    el.scrollTo({ left: wrapped * el.clientWidth, behavior: 'smooth' });
  };

  // Fallback advance for screens without a playable video (no src, or image)
  useEffect(() => {
    if (mobile || paused) return;
    const s = screens[active];
    if (!s) return;
    const isVideo = s.type === 'video' || (typeof s.src === 'string' && /\.(mp4|webm|mov)$/i.test(s.src));
    if (isVideo) return; // advance is driven by onEnded
    const id = setTimeout(() => goTo(activeRef.current + 1), FALLBACK_MS);
    return () => clearTimeout(id);
  }, [active, mobile, paused, screens]);

  const handleEnded = (i) => {
    if (mobile || paused) return;
    if (i !== activeRef.current) return;
    goTo(activeRef.current + 1);
  };

  const pauseAuto = () => {
    setPaused(true);
    clearTimeout(resumeTimer.current);
    resumeTimer.current = setTimeout(() => setPaused(false), PAUSE_MS);
  };

  const onArrow = (dir) => {
    pauseAuto();
    goTo(activeRef.current + dir);
  };

  const onDot = (i) => {
    pauseAuto();
    goTo(i);
  };

  return (
    <div
      style={{ display: 'flex', flexDirection: 'column', gap: mobile ? 28 : 0, marginBottom: mobile ? 0 : 16, position: 'relative' }}
    >
      {!mobile && (
        <>
          <button
            type="button"
            className="carousel-arrow carousel-arrow-prev"
            aria-label="Vorheriger Screen"
            onClick={() => onArrow(-1)}
          >
            <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <polyline points="15 18 9 12 15 6"/>
            </svg>
          </button>
          <button
            type="button"
            className="carousel-arrow carousel-arrow-next"
            aria-label="Nächster Screen"
            onClick={() => onArrow(1)}
          >
            <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <polyline points="9 18 15 12 9 6"/>
            </svg>
          </button>
        </>
      )}

      <div
        ref={stripRef}
        style={{
          display: 'flex',
          overflowX: 'auto',
          overflowY: 'hidden',
          scrollSnapType: 'x mandatory',
          scrollbarWidth: 'none',
          msOverflowStyle: 'none',
          paddingBottom: mobile ? 60 : 100,
        }}
        className="screens-strip"
      >
        {screens.map((s, i) => (
          <div key={i} style={{
            flexShrink: 0,
            width: '100%',
            scrollSnapAlign: 'start',
            padding: mobile ? '0 20px' : '0 48px',
            boxSizing: 'border-box',
            display: 'grid',
            gridTemplateColumns: mobile ? 'minmax(0, 1fr)' : 'minmax(0, 1fr) minmax(0, 1fr)',
            gap: mobile ? 28 : 48,
            alignItems: 'center',
            height: mobile ? 'auto' : 'calc(100vh - 260px)',
            minHeight: mobile ? 'auto' : 480,
          }}>
            {mobile ? (
              <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 8, width: '100%' }}>
                <button
                  type="button"
                  onClick={() => setExpanded((v) => !v)}
                  aria-expanded={expanded}
                  style={{ display: 'flex', alignItems: 'center', gap: 8, background: 'transparent', border: 'none', padding: 0, cursor: 'none', fontFamily: 'Space Grotesk, sans-serif', fontWeight: 500, fontSize: 18, letterSpacing: '-0.02em', color: '#0D0B08' }}
                >
                  <span>{s.title}</span>
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" style={{ transform: expanded ? 'rotate(180deg)' : 'none', transition: 'transform 240ms cubic-bezier(0.16,1,0.3,1)' }}>
                    <polyline points="6 9 12 15 18 9"/>
                  </svg>
                </button>
                {expanded && (
                  <div style={{ display: 'flex', flexDirection: 'column', gap: 6, alignItems: 'center', textAlign: 'center', maxWidth: 360 }}>
                    {s.label && (
                      <span style={{ fontFamily: 'Space Mono, monospace', fontSize: 10, letterSpacing: '0.14em', textTransform: 'uppercase', color: '#3D3428' }}>{s.label}</span>
                    )}
                    {s.body && (
                      <p style={{ fontFamily: 'Space Grotesk, sans-serif', fontWeight: 400, fontSize: 13.5, lineHeight: 1.55, color: '#1A1209', margin: 0 }}>{s.body}</p>
                    )}
                  </div>
                )}
              </div>
            ) : (
              <div style={{ display: 'flex', flexDirection: 'column', gap: 14, justifyContent: 'center' }}>
                {s.label && (
                  <span style={{ fontFamily: 'Space Mono, monospace', fontSize: 11, letterSpacing: '0.14em', textTransform: 'uppercase', color: '#3D3428' }}>{s.label}</span>
                )}
                {s.title && (
                  <h3 style={{ fontFamily: 'Space Grotesk, sans-serif', fontWeight: 500, fontSize: 26, letterSpacing: '-0.02em', lineHeight: 1.15, color: '#0D0B08', margin: 0 }}>{s.title}</h3>
                )}
                {s.body && (
                  <p style={{ fontFamily: 'Space Grotesk, sans-serif', fontWeight: 400, fontSize: 15, lineHeight: 1.6, color: '#1A1209', margin: 0, maxWidth: 460 }}>{s.body}</p>
                )}
              </div>
            )}
            <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100%' }}>
              <IPhoneMockup src={s.src} type={s.type} screenBg={s.screenBg} height={mobile ? undefined : 'min(72vh, calc(100vh - 280px))'} isActive={active === i} onEnded={() => handleEnded(i)} />
            </div>
          </div>
        ))}
      </div>

      <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', gap: 12, padding: '4px 0 2px', marginTop: mobile ? 0 : -80, position: 'relative', zIndex: 4 }}>
        {screens.map((_, i) => {
          const isActive = active === i;
          return (
            <button
              key={i}
              type="button"
              onClick={() => onDot(i)}
              aria-label={`Screen ${i + 1}`}
              aria-current={isActive ? 'true' : undefined}
              style={{
                width: isActive ? 24 : 8,
                height: 8,
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
