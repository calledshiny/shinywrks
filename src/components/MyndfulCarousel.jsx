import { useEffect, useRef, useState } from 'react';
import { useMobile } from '../hooks/useMobile';

export default function MyndfulCarousel({
  items = [],
  desktopCols = 3,
  desktopGap = 10,
  desktopPadding = '0 48px',
  mobilePadding = '0 32px',
  aspectRatio,
  fit = 'cover',
  seamless = false
}) {
  if (seamless) mobilePadding = '0';
  const m = useMobile();
  const stripRef = useRef();
  const [active, setActive] = useState(0);

  useEffect(() => {
    const el = stripRef.current;
    if (!el || !m) return;
    const onScroll = () => {
      const w = el.clientWidth;
      if (!w) return;
      const idx = Math.round(el.scrollLeft / w);
      setActive(Math.max(0, Math.min(items.length - 1, idx)));
    };
    el.addEventListener('scroll', onScroll, { passive: true });
    return () => el.removeEventListener('scroll', onScroll);
  }, [items.length, m]);

  const goTo = (i) => {
    const el = stripRef.current;
    if (!el) return;
    const wrapped = ((i % items.length) + items.length) % items.length;
    el.scrollTo({ left: wrapped * el.clientWidth, behavior: 'smooth' });
  };

  if (!m) {
    return (
      <div style={{
        display: 'grid',
        gridTemplateColumns: `repeat(${desktopCols}, 1fr)`,
        gap: desktopGap,
        padding: desktopPadding
      }}>
        {items.map((p, i) => (
          <ItemCell key={i} item={p} aspectRatio={aspectRatio} fit={fit} />
        ))}
      </div>
    );
  }

  return (
    <div style={{ display: 'flex', flexDirection: 'column', position: 'relative', padding: seamless ? '0 16px' : 0, boxSizing: 'border-box', maxWidth: '100%', minWidth: 0, overflow: 'hidden' }}>
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
          maxWidth: '100%',
          minWidth: 0,
        }}
      >
        {items.map((p, i) => (
          <div key={i} style={{
            flexShrink: 0,
            width: '100%',
            scrollSnapAlign: 'start',
            padding: mobilePadding,
            boxSizing: 'border-box',
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
          }}>
            <ItemCell item={p} aspectRatio={aspectRatio} fit={fit} centered />
          </div>
        ))}
      </div>

      <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', gap: 8, padding: '16px 0 0' }}>
        {items.map((_, i) => {
          const isActive = active === i;
          return (
            <button
              key={i}
              type="button"
              onClick={() => goTo(i)}
              aria-label={`${i + 1}`}
              aria-current={isActive ? 'true' : undefined}
              style={{
                width: isActive ? 18 : 6,
                height: 6,
                borderRadius: 999,
                border: 'none',
                padding: 0,
                background: isActive ? '#0D0B08' : '#C4B8A4',
                cursor: 'pointer',
                transition: 'width 350ms cubic-bezier(0.16,1,0.3,1), background 250ms ease',
              }}
            />
          );
        })}
      </div>
    </div>
  );
}

function ItemCell({ item, aspectRatio, fit, centered }) {
  const ar = item.aspectRatio || aspectRatio;
  const useFit = item.fit || fit;
  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 8, width: '100%', alignItems: centered ? 'center' : 'stretch' }}>
      <div style={{
        width: '100%',
        aspectRatio: ar,
        background: item.bg || 'transparent',
        overflow: 'hidden'
      }}>
        <img src={item.src} alt={item.caption || ''} style={{ width: '100%', height: '100%', objectFit: useFit, display: 'block' }}/>
      </div>
      {(item.caption || item.captionSub) && (
        <div style={{ display: 'flex', flexDirection: 'column', gap: 4, padding: '6px 4px 0', textAlign: centered ? 'center' : 'left' }}>
          {item.caption && (
            <span style={{ fontFamily: 'Space Mono, monospace', fontSize: 11, letterSpacing: '0.14em', textTransform: 'uppercase', color: '#3D3428' }}>{item.caption}</span>
          )}
          {item.captionSub && (
            <span style={{ fontFamily: 'Space Mono, monospace', fontSize: 11, letterSpacing: '0.08em', color: '#3D3428', lineHeight: 1.5 }}>{item.captionSub}</span>
          )}
        </div>
      )}
    </div>
  );
}
