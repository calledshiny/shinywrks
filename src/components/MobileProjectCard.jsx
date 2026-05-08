const STAR_CURSOR = 'none';

export default function MobileProjectCard({ p, onNav }) {
  const aspect = (p.thumbW && p.thumbH) ? p.thumbW / p.thumbH : p.width / p.height;
  return (
    <div onClick={() => onNav('project', p)} style={{ cursor: STAR_CURSOR }}>
      <div style={{ position: 'relative', overflow: 'hidden', background: p.bg, aspectRatio: `${aspect}` }}>
        {p.thumb && <img src={p.thumb} alt="" style={{ position: 'absolute', inset: 0, width: '100%', height: '100%', objectFit: 'cover', display: 'block' }}/>}
        <div className="noise"/>
        <div style={{ position: 'absolute', bottom: 10, left: 10, fontFamily: 'Space Mono, monospace', fontSize: 9, letterSpacing: '0.08em', textTransform: 'uppercase', color: '#F5F3EF', background: 'rgba(13,11,8,0.42)', padding: '3px 6px', pointerEvents: 'none' }}>{p.blurb || p.tagLine}</div>
      </div>
      <div style={{ padding: '10px 0 0' }}>
        <div style={{ fontFamily: 'Space Mono, monospace', fontSize: 9, letterSpacing: '0.1em', textTransform: 'uppercase', color: '#3D3428', marginBottom: 4 }}>{(p.tags || [p.tag]).join(' / ')} / {p.year}</div>
        <div style={{ fontFamily: 'Space Grotesk, sans-serif', fontWeight: 500, fontSize: 16, letterSpacing: '-0.01em', color: '#0D0B08' }}>{p.title}</div>
      </div>
    </div>
  );
}
