import { useMobile } from '../hooks/useMobile';
import { SOCIAL_ICONS } from './SocialIcons';

const STAR_CURSOR = 'none';

export default function Kontakt() {
  const mobile = useMobile();
  return (
    <div style={{ minHeight: '100vh', padding: mobile ? '120px 20px 80px' : '180px 48px 96px', display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}>
      <div>
        <h2 className="fu" style={{ fontFamily: 'Space Grotesk, sans-serif', fontWeight: 500, fontSize: 'clamp(28px, 3.5vw, 56px)', letterSpacing: '-0.025em', lineHeight: 1.05, color: '#0D0B08', marginBottom: 64 }}>
          Time to shine.
        </h2>

        <div className="fu1" style={{ fontFamily: 'Space Mono, monospace', fontSize: 9, letterSpacing: '0.16em', textTransform: 'uppercase', color: '#3D3428', marginBottom: 12 }}>
          Kontakt
        </div>

        <a
          href="mailto:justin@shinywrks.de"
          className="email-shine fu2"
          style={{
            display: 'block',
            fontFamily: 'Space Grotesk, sans-serif',
            fontWeight: 500,
            fontSize: 'clamp(28px, 4.5vw, 72px)',
            letterSpacing: '-0.02em',
            lineHeight: 1.15,
            textDecoration: 'none',
            marginBottom: 48,
            cursor: STAR_CURSOR,
          }}
        >justin@shinywrks.de</a>

        <div className="fu3" style={{ display: 'flex', gap: 20, marginBottom: 64 }}>
          {SOCIAL_ICONS.map(({ href, title, d }) => {
            const isExternal = !href.startsWith('mailto:');
            return (
              <a key={title} href={href} title={title}
                {...(isExternal ? { target: '_blank', rel: 'noopener noreferrer' } : {})}
                style={{ color: '#C4B8A4', display: 'flex', textDecoration: 'none', transition: 'color 200ms' }}
                onMouseEnter={e => e.currentTarget.style.color = '#1A1209'}
                onMouseLeave={e => e.currentTarget.style.color = '#C4B8A4'}>
                <svg width="28" height="28" viewBox="0 0 24 24" fill="currentColor"><path d={d}/></svg>
              </a>
            );
          })}
        </div>

        <div className="fu4">
          <div style={{ fontFamily: 'Space Mono, monospace', fontSize: 9, letterSpacing: '0.16em', textTransform: 'uppercase', color: '#3D3428', marginBottom: 10 }}>Standort</div>
          <div style={{ fontFamily: 'Space Mono, monospace', fontSize: 12, color: '#1A1209', letterSpacing: '0.04em' }}>Hof, DE</div>
        </div>
      </div>
    </div>
  );
}
