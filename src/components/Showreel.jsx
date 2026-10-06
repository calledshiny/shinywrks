import { useEffect, useRef, useState } from 'react';
import { createPortal } from 'react-dom';
import { useLang } from '../i18n';

const STAR_CURSOR = 'none';

// Signalfarbe nur fürs Showreel. Creme auf diesem Rot hat 4,5:1 Kontrast.
export const REEL_RED = '#CC3A1F';

export const REEL = {
  year: 2026,
  duration: '1:04',
  teaser: 'reel/showreel-teaser.mp4',
  teaserPoster: 'reel/showreel-teaser.webp',
  landscape: { src: 'reel/showreel-16x9.mp4', poster: 'reel/showreel-16x9.webp' },
  vertical: { src: 'reel/showreel-9x16.mp4', poster: 'reel/showreel-9x16.webp' },
};

export const REEL_FILTERS = ['All', 'Video'];

function RecDot({ size = 6 }) {
  return <span className="reel-dot" style={{ width: size, height: size }} aria-hidden="true"/>;
}

export function ShowreelPill({ onOpen }) {
  const { t } = useLang();
  return (
    <button className="filter-tag reel-pill" onClick={onOpen} style={{ flexShrink: 0 }}>
      <RecDot/>
      <span>{t('showreel')}</span>
    </button>
  );
}

function TeaserVideo() {
  return (
    <video
      src={REEL.teaser} poster={REEL.teaserPoster}
      autoPlay muted loop playsInline preload="auto"
      style={{ position: 'absolute', inset: 0, width: '100%', height: '100%', objectFit: 'cover', display: 'block' }}
    />
  );
}

function PlayBadge({ visible }) {
  const { t } = useLang();
  return (
    <div style={{
      position: 'absolute', inset: 0, display: 'flex', alignItems: 'center', justifyContent: 'center',
      opacity: visible ? 1 : 0, transition: 'opacity 450ms cubic-bezier(0.16,1,0.3,1)', pointerEvents: 'none',
    }}>
      <div style={{
        display: 'inline-flex', alignItems: 'center', gap: 8,
        fontFamily: 'Space Mono, monospace', fontSize: 'clamp(9px, 0.6vw, 13px)', letterSpacing: '0.14em', textTransform: 'uppercase',
        color: '#F5F3EF', background: REEL_RED, padding: 'clamp(8px, 0.7vw, 12px) clamp(14px, 1vw, 20px)',
      }}>
        <span style={{ fontSize: '1.1em', lineHeight: 1 }}>▶</span>
        <span>{t('reelPlay')}</span>
      </div>
    </div>
  );
}

function ReelLabel({ size }) {
  return (
    <div style={{
      position: 'absolute', bottom: 10, left: 10, display: 'inline-flex', alignItems: 'center', gap: 6,
      fontFamily: 'Space Mono, monospace', fontSize: size, letterSpacing: '0.08em', textTransform: 'uppercase',
      color: '#F5F3EF', background: REEL_RED, padding: '3px 6px', pointerEvents: 'none',
    }}>
      <RecDot size={5}/>
      <span>Showreel {REEL.year} · {REEL.duration}</span>
    </div>
  );
}

function ReelMeta({ metaSize, titleSize }) {
  const { t } = useLang();
  return (
    <>
      <div style={{ fontFamily: 'Space Mono, monospace', fontSize: metaSize, letterSpacing: '0.1em', textTransform: 'uppercase', color: REEL_RED, marginBottom: 3 }}>
        Showreel / Video / AI / {REEL.year}
      </div>
      <div style={{ fontFamily: 'Space Grotesk, sans-serif', fontWeight: 500, fontSize: titleSize, letterSpacing: '-0.01em', color: '#0D0B08' }}>{t('reelTitle')}</div>
    </>
  );
}

export function ShowreelCard({ onOpen }) {
  const [hovered, setHovered] = useState(false);
  return (
    <div
      role="button"
      onClick={onOpen}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      style={{ flexShrink: 0, height: '100%', maxHeight: '90%', maxWidth: '50vw', aspectRatio: '16 / 9', display: 'flex', flexDirection: 'column', cursor: STAR_CURSOR }}
    >
      <div style={{ flex: 1, minHeight: 0, position: 'relative', overflow: 'hidden', background: '#0D0B08' }}>
        <TeaserVideo/>
        <div className="noise"/>
        <div style={{ position: 'absolute', inset: 0, background: 'rgba(13,11,8,0.28)', opacity: hovered ? 1 : 0, transition: 'opacity 450ms cubic-bezier(0.16,1,0.3,1)', pointerEvents: 'none' }}/>
        <PlayBadge visible={hovered}/>
        <ReelLabel size="clamp(9px, 0.55vw, 12px)"/>
      </div>
      <div style={{ padding: '8px 0 0', flexShrink: 0 }}>
        <ReelMeta metaSize="clamp(8px, 0.5vw, 11px)" titleSize="clamp(14px, 0.78vw, 18px)"/>
      </div>
    </div>
  );
}

export function MobileShowreelCard({ onOpen }) {
  return (
    <div onClick={onOpen} style={{ cursor: STAR_CURSOR }}>
      <div style={{ position: 'relative', overflow: 'hidden', background: '#0D0B08', aspectRatio: '16 / 9' }}>
        <TeaserVideo/>
        <div className="noise"/>
        <PlayBadge visible/>
        <ReelLabel size={9}/>
      </div>
      <div style={{ padding: '10px 0 0' }}>
        <ReelMeta metaSize={9} titleSize={16}/>
      </div>
    </div>
  );
}

// Eigene Adresse fürs Reel, z.B. für Akquise-Mails. Vercel leitet sie auf index.html (vercel.json).
export const REEL_PATH = '/showreel';

// autoStart: true nach Klick auf der Seite. Über den Link startet das Reel erst auf Klick.
export function ShowreelPlayer({ autoStart, onClose }) {
  const { t } = useLang();
  const videoRef = useRef();
  const [started, setStarted] = useState(autoStart);
  const [portrait, setPortrait] = useState(() => matchMedia('(orientation: portrait)').matches);

  useEffect(() => {
    const mq = matchMedia('(orientation: portrait)');
    const onChange = () => setPortrait(mq.matches);
    const onKey = (e) => { if (e.key === 'Escape') onClose(); };
    mq.addEventListener('change', onChange);
    window.addEventListener('keydown', onKey);
    document.body.classList.add('reel-open');
    return () => {
      mq.removeEventListener('change', onChange);
      window.removeEventListener('keydown', onKey);
      document.body.classList.remove('reel-open');
    };
  }, [onClose]);

  useEffect(() => {
    if (started) videoRef.current?.play().catch(() => {});
  }, [started, portrait]);

  const version = portrait ? REEL.vertical : REEL.landscape;

  return createPortal(
    <div className="reel-player" onClick={onClose} role="dialog" aria-modal="true" aria-label={t('reelTitle')}>
      <button className="reel-close" onClick={onClose} aria-label={t('close')}>
        <span>{t('close')}</span>
        <span aria-hidden="true" style={{ fontSize: '1.3em', lineHeight: 1 }}>×</span>
      </button>
      <div onClick={e => e.stopPropagation()} style={{
        position: 'relative', background: '#000',
        width: portrait ? 'auto' : 'min(92vw, calc((100vh - 140px) * 16 / 9))',
        height: portrait ? 'min(calc(100vh - 120px), calc(92vw * 16 / 9))' : 'auto',
        aspectRatio: portrait ? '9 / 16' : '16 / 9',
      }}>
        <video
          key={version.src}
          ref={videoRef}
          src={version.src} poster={version.poster}
          controls={started} autoPlay={started} playsInline preload="metadata"
          style={{ position: 'absolute', inset: 0, width: '100%', height: '100%', display: 'block' }}
        />
        {!started && (
          <button className="reel-start" onClick={() => setStarted(true)} aria-label={t('reelPlay')}>
            <span className="reel-start-badge">
              <span style={{ fontSize: '1.1em', lineHeight: 1 }}>▶</span>
              <span>{t('reelPlay')}</span>
            </span>
          </button>
        )}
      </div>
      <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginTop: 16, fontFamily: 'Space Mono, monospace', fontSize: 10, letterSpacing: '0.14em', textTransform: 'uppercase', color: '#C4B8A4' }}>
        <RecDot size={5}/>
        <span>shinywrks · Showreel {REEL.year} · {REEL.duration}</span>
      </div>
    </div>,
    document.body
  );
}
