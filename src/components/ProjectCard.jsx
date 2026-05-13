import { useState } from 'react';

const STAR_CURSOR = 'none';

export default function ProjectCard({ p, hPct, onNav }) {
  const [hovered, setHovered] = useState(false);
  const aspect = (p.thumbW && p.thumbH) ? p.thumbW / p.thumbH : p.width / p.height;
  const maxH = aspect > 1.8 ? '75%' : aspect > 1.2 ? '90%' : aspect < 0.65 ? '100%' : '95%';
  const maxW = aspect > 1.2 ? '50vw' : undefined;
  const effectiveHPct = typeof p.heightPct === 'number' ? p.heightPct : hPct;
  return (
    <div
      onClick={() => onNav('project', p)}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      style={{ flexShrink: 0, height: `${effectiveHPct * 100}%`, maxHeight: maxH, maxWidth: maxW, aspectRatio: `${aspect}`, display: 'flex', flexDirection: 'column', cursor: STAR_CURSOR }}
    >
      <div style={{ flex: 1, minHeight: 0, position: 'relative', overflow: 'hidden', background: p.bg }}>
        {p.thumb && <img src={p.thumb} alt="" style={{ position: 'absolute', inset: 0, width: '100%', height: '100%', objectFit: 'cover', display: 'block' }}/>}
        <div className="noise"/>
        <div style={{ position: 'absolute', inset: 0, background: 'rgba(245,243,239,0.28)', opacity: hovered ? 1 : 0, transition: 'opacity 450ms cubic-bezier(0.16,1,0.3,1)', pointerEvents: 'none' }}/>
        {hovered && <div className="thumb-shine"/>}
        <div style={{ position: 'absolute', bottom: 10, left: 10, fontFamily: 'Space Mono, monospace', fontSize: 9, letterSpacing: '0.08em', textTransform: 'uppercase', color: '#F5F3EF', background: 'rgba(13,11,8,0.42)', padding: '3px 6px', pointerEvents: 'none' }}>{p.blurb || p.tagLine}</div>
      </div>
      <div style={{ padding: '8px 0 0', flexShrink: 0 }}>
        <div style={{ fontFamily: 'Space Mono, monospace', fontSize: 8, letterSpacing: '0.1em', textTransform: 'uppercase', color: '#3D3428', marginBottom: 3 }}>{(p.tags || [p.tag]).join(' / ')} / {p.year}</div>
        <div style={{ fontFamily: 'Space Grotesk, sans-serif', fontWeight: 500, fontSize: 14, letterSpacing: '-0.01em', color: '#0D0B08' }}>{p.title}</div>
      </div>
    </div>
  );
}
