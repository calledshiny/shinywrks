import { useEffect, useRef, useState } from 'react';
import { useMobile } from '../hooks/useMobile';
import ProjectCard from './ProjectCard';
import MobileProjectCard from './MobileProjectCard';
import { SOCIAL_ICONS } from './SocialIcons';

const FILTER_TAGS = ['All', 'Visual Identity', 'Event', 'UI/UX Design', 'Graphics', 'Video', 'AI'];
const STAR_CURSOR = 'none';

export default function Landing({ onNav, projects, activeFilter, setActiveFilter }) {
  const mobile = useMobile();

  const filtered = activeFilter === 'All'
    ? projects
    : projects.filter(p => (p.tags || [p.tag]).includes(activeFilter));

  const stripRef = useRef();
  const wrapRef = useRef();

  useEffect(() => {
    if (mobile) return;
    const strip = stripRef.current;
    const wrap = wrapRef.current;
    if (!strip || !wrap) return;
    const onWheel = (e) => {
      e.preventDefault();
      strip.scrollLeft += e.deltaY + e.deltaX;
    };
    wrap.addEventListener('wheel', onWheel, { passive: false });
    document.body.style.overflow = 'hidden';
    return () => {
      wrap.removeEventListener('wheel', onWheel);
      document.body.style.overflow = '';
    };
  }, [mobile]);

  const [textOpen, setTextOpen] = useState(false);

  const heightPcts = [0.94, 0.72, 0.60, 1.0, 0.80, 0.66];

  return (
    <div ref={wrapRef} style={{
      height: mobile ? 'auto' : '100vh',
      minHeight: mobile ? '100vh' : undefined,
      display: 'flex', flexDirection: 'column',
      overflow: mobile ? 'visible' : 'hidden',
      paddingTop: mobile ? 56 : 65,
      paddingBottom: mobile ? 48 : 0,
      position: 'relative', zIndex: 1,
    }}>

      <section style={{
        padding: mobile ? '20px 20px 0' : 'clamp(8px, 2vh, 32px) 48px 0',
        display: 'flex',
        flexDirection: mobile ? 'column' : 'row',
        alignItems: mobile ? 'stretch' : 'flex-start',
        justifyContent: 'space-between',
        gap: mobile ? 32 : 48,
        flexShrink: 0, position: 'relative', zIndex: 1,
      }}>
        <div style={mobile ? { textAlign: 'center', display: 'flex', flexDirection: 'column', alignItems: 'center' } : undefined}>
          <h1 className="fu" style={{
            fontFamily: 'Space Grotesk, sans-serif', fontWeight: 500,
            fontSize: mobile ? 'clamp(36px, 10vw, 52px)' : 'clamp(42px, 5vw, 120px)',
            letterSpacing: '-0.03em', lineHeight: 0.9,
            color: '#0D0B08', marginBottom: mobile ? 12 : 'clamp(10px, 2vh, 28px)',
          }}>shinywrks</h1>
          <div className="fu1" style={{ fontFamily: 'Space Mono, monospace', fontSize: mobile ? 10 : 'clamp(11px, 0.85vw, 14px)', letterSpacing: '0.06em', color: '#3D3428', marginBottom: mobile ? 10 : 'clamp(8px, 1.6vh, 22px)' }}>
            I make your brand shine different
          </div>
          {mobile ? (
            <div style={{ marginBottom: 14 }}>
              <button onClick={() => setTextOpen(o => !o)} style={{
                fontFamily: 'Space Mono, monospace', fontSize: 9, letterSpacing: '0.1em',
                textTransform: 'uppercase', color: '#C4B8A4', background: 'none', border: 'none',
                cursor: STAR_CURSOR, padding: 0, display: 'flex', alignItems: 'center', gap: 5, margin: '0 auto',
              }}>
                <span>{textOpen ? 'weniger' : 'mehr'}</span>
                <span style={{ display: 'inline-block', transition: 'transform 300ms', transform: textOpen ? 'rotate(180deg)' : 'none' }}>↓</span>
              </button>
              {textOpen && (
                <p style={{ fontFamily: 'Space Grotesk, sans-serif', fontSize: 13, lineHeight: 1.6, color: '#1A1209', maxWidth: 400, marginTop: 10 }}>
                  Manchmal ruhig, manchmal laut — immer authentisch. Ich entwickle visuelle Identitäten die über alle Medien und Kanäle hinweg wirken. Vom ersten Gespräch bis zum fertigen Ergebnis denke ich mit, fühle mit und liefere.
                </p>
              )}
            </div>
          ) : (
            <p className="fu2" style={{ fontFamily: 'Space Grotesk, sans-serif', fontSize: 'clamp(13px, 0.95vw, 17px)', lineHeight: 1.55, color: '#1A1209', maxWidth: 'clamp(400px, 32vw, 560px)', marginBottom: 'clamp(10px, 2.2vh, 32px)' }}>
              Manchmal ruhig, manchmal laut — immer authentisch. Ich entwickle visuelle Identitäten die über alle Medien und Kanäle hinweg wirken. Vom ersten Gespräch bis zum fertigen Ergebnis denke ich mit, fühle mit und liefere.
            </p>
          )}
          <button className="fu3" onClick={() => onNav('contact')} style={{
            fontFamily: 'Space Mono, monospace', fontSize: mobile ? 10 : 'clamp(10px, 0.78vw, 13px)',
            letterSpacing: '0.14em', textTransform: 'uppercase',
            color: '#F5F3EF', background: '#0D0B08', border: '1px solid #0D0B08',
            padding: mobile ? '11px 24px' : 'clamp(11px, 1.2vh, 16px) clamp(24px, 1.8vw, 36px)', cursor: STAR_CURSOR,
            transition: 'background 300ms, border-color 300ms',
            alignSelf: mobile ? 'center' : undefined,
          }}
          onMouseEnter={e => { e.target.style.background='#3D3428'; e.target.style.borderColor='#3D3428'; }}
          onMouseLeave={e => { e.target.style.background='#0D0B08'; e.target.style.borderColor='#0D0B08'; }}
          >Kontakt →</button>
        </div>

        <div className="fu2" style={{
          flexShrink: 0,
          display: 'flex',
          flexDirection: 'row',
          alignItems: 'stretch',
          gap: mobile ? 16 : 20,
          width: mobile ? '100%' : undefined,
        }}>

          <div style={{ display: 'flex', flexDirection: 'column', justifyContent: 'center', gap: 'clamp(20px, 2vh, 28px)', width: mobile ? undefined : 'clamp(175px, 14vw, 230px)', flex: mobile ? 1 : undefined }}>

            <div>
              <div style={{ fontFamily: 'Space Grotesk, sans-serif', fontWeight: 500, fontSize: 15, letterSpacing: '-0.02em', color: '#0D0B08', whiteSpace: 'nowrap', marginBottom: 6 }}>
                Justin Wiemann
              </div>
              <div style={{ fontFamily: 'Space Mono, monospace', fontSize: 9, letterSpacing: '0.12em', textTransform: 'uppercase', color: '#C4B8A4', whiteSpace: 'nowrap' }}>
                Kommunikationsdesigner
              </div>
            </div>

            <div>
              <div style={{ width: 24, height: 1, background: '#E8E2D6', marginBottom: 10 }}/>
              <div style={{ fontFamily: 'Space Mono, monospace', fontSize: 9, letterSpacing: '0.06em', color: '#C4B8A4', marginBottom: 8 }}>
                Hof, DE
              </div>
              <div style={{ display: 'flex', alignItems: 'center', gap: 5 }}>
                <div className="availability-dot" style={{ width: 6, height: 6, borderRadius: '50%', background: '#4a9e5c', flexShrink: 0 }}/>
                <span style={{ fontFamily: 'Space Mono, monospace', fontSize: 9, letterSpacing: '0.12em', textTransform: 'uppercase', color: '#4a9e5c' }}>Verfügbar</span>
              </div>
            </div>

            <div style={{ display: 'flex', alignItems: 'center', gap: mobile ? 16 : 12 }}>
              {SOCIAL_ICONS.map(({ href, title, d }) => {
                const isExternal = !href.startsWith('mailto:');
                return (
                  <a key={title} href={href} title={title}
                    {...(isExternal ? { target: '_blank', rel: 'noopener noreferrer' } : {})}
                    style={{ color: '#C4B8A4', display: 'flex', textDecoration: 'none', transition: 'color 200ms' }}
                    onMouseEnter={e => e.currentTarget.style.color = '#3D3428'}
                    onMouseLeave={e => e.currentTarget.style.color = '#C4B8A4'}>
                    <svg width={mobile ? 26 : 20} height={mobile ? 26 : 20} viewBox="0 0 24 24" fill="currentColor"><path d={d}/></svg>
                  </a>
                );
              })}
            </div>
          </div>

          <div style={{
            width: mobile ? 130 : 'clamp(130px, 22vh, 240px)',
            height: mobile ? 174 : 'clamp(173px, 29vh, 320px)',
            position: 'relative', overflow: 'hidden', flexShrink: 0,
          }}>
            <img src="portrait.webp" alt="Justin Wiemann" style={{ width: '100%', height: '100%', objectFit: 'cover', objectPosition: 'center top', display: 'block' }}/>
            <div className="noise"/>
          </div>

        </div>
      </section>

      <div style={{ flex: 1, minHeight: 0, maxHeight: mobile ? 'none' : 'clamp(440px, 65vh, 920px)', display: 'flex', flexDirection: 'column', marginTop: mobile ? 28 : 'clamp(14px, 3.5vh, 56px)' }}>
        <div className="fu4" style={{
          padding: mobile ? '0 20px 6px' : '0 48px 6px',
          fontFamily: 'Space Mono, monospace', fontSize: 10,
          letterSpacing: '0.16em', textTransform: 'uppercase', color: '#3D3428',
        }}>Meine Projekte</div>
        <div className="fu4" style={{
          padding: mobile ? '8px 20px' : '8px 48px',
          display: 'flex', gap: 4, flexShrink: 0,
          overflowX: mobile ? 'auto' : 'visible',
          scrollbarWidth: 'none',
          WebkitOverflowScrolling: 'touch',
        }}>
          {FILTER_TAGS.map(t => (
            <button key={t} className={`filter-tag${activeFilter === t ? ' active' : ''}`} onClick={() => setActiveFilter(t)} style={{ flexShrink: 0 }}>{t}</button>
          ))}
        </div>
        {mobile ? (
          <div style={{ display: 'flex', flexDirection: 'column', gap: 22, padding: '16px 20px 24px' }}>
            {filtered.map(p => <MobileProjectCard key={p.id} p={p} onNav={onNav} />)}
          </div>
        ) : (
          <div
            ref={stripRef}
            className="fl"
            style={{
              flex: 1, minHeight: 0,
              display: 'flex', alignItems: 'flex-end', gap: 3,
              overflowX: 'auto', overflowY: 'hidden',
              padding: '4px 48px 64px',
              scrollbarWidth: 'none',
              MsOverflowStyle: 'none',
            }}
          >
            {filtered.map((p, i) => (
              <ProjectCard key={p.id} p={p} hPct={heightPcts[i % heightPcts.length]} onNav={onNav} />
            ))}
          </div>
        )}
      </div>

    </div>
  );
}
