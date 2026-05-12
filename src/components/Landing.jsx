import { useEffect, useRef, useState } from 'react';
import { useMobile } from '../hooks/useMobile';
import ProjectCard from './ProjectCard';
import MobileProjectCard from './MobileProjectCard';

const FILTER_TAGS = ['All', 'Visual Identity', 'Event', 'Graphics', 'Video'];
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
              {[
                { href: 'https://instagram.com/shinywrks', title: 'Instagram', d: 'M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zM12 0C8.741 0 8.333.014 7.053.072 2.695.272.273 2.69.073 7.052.014 8.333 0 8.741 0 12c0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98C8.333 23.986 8.741 24 12 24c3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98C15.668.014 15.259 0 12 0zm0 5.838a6.162 6.162 0 100 12.324 6.162 6.162 0 000-12.324zM12 16a4 4 0 110-8 4 4 0 010 8zm6.406-11.845a1.44 1.44 0 100 2.881 1.44 1.44 0 000-2.881z' },
                { href: 'mailto:justin@shinywrks.de', title: 'Mail', d: 'M20 4H4c-1.1 0-2 .9-2 2v12c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V6c0-1.1-.9-2-2-2zm0 4l-8 5-8-5V6l8 5 8-5v2z' },
                { href: 'https://behance.net/shinywrks', title: 'Behance', d: 'M7.799 5.698c.589 0 1.12.051 1.606.156.482.104.894.28 1.241.525.344.245.614.57.804.973.19.404.284.893.284 1.468 0 .63-.143 1.16-.427 1.588-.285.427-.7.775-1.246 1.04.752.218 1.313.604 1.683 1.161.37.555.554 1.226.554 2.012 0 .63-.119 1.176-.358 1.638a3.364 3.364 0 01-.974 1.153 4.336 4.336 0 01-1.435.68 6.169 6.169 0 01-1.686.225H2V5.698h5.799zm-.29 4.918c.47 0 .855-.114 1.153-.34.298-.227.446-.588.446-1.083 0-.27-.047-.494-.141-.673a1.16 1.16 0 00-.382-.43 1.556 1.556 0 00-.561-.225 3.166 3.166 0 00-.675-.067H4.847v2.818H7.51zm.158 5.108c.254 0 .495-.026.72-.08.226-.053.423-.14.592-.26.169-.12.305-.279.406-.477.1-.199.151-.449.151-.752 0-.596-.168-1.02-.503-1.274-.335-.254-.779-.38-1.333-.38H4.847v3.223H7.667zm8.56-7.96c.558 0 1.063.107 1.514.32.451.214.834.503 1.148.87.315.366.553.8.714 1.301.16.501.24 1.043.24 1.625v.624h-6.227c.03.695.237 1.23.621 1.605.383.375.905.563 1.563.563.506 0 .94-.122 1.304-.366.363-.244.59-.505.68-.78h2.07c-.332 1.016-.84 1.743-1.525 2.183-.685.44-1.519.66-2.503.66-.68 0-1.29-.109-1.833-.327a3.95 3.95 0 01-1.378-.924 4.08 4.08 0 01-.862-1.438c-.2-.558-.299-1.174-.299-1.848 0-.65.103-1.258.31-1.822a4.24 4.24 0 01.882-1.442 3.99 3.99 0 011.371-.944 4.49 4.49 0 011.81-.36zm.036 1.662c-.533 0-.975.155-1.325.465-.35.31-.566.762-.648 1.356h3.837c-.057-.594-.245-1.046-.565-1.356-.32-.31-.73-.465-1.299-.465zM15.093 5h4.827v1.268H15.093V5z' },
                { href: 'https://linkedin.com/in/shinywrks', title: 'LinkedIn', d: 'M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 01-2.063-2.065 2.064 2.064 0 112.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z' },
              ].map(({ href, title, d }) => (
                <a key={title} href={href} title={title} style={{ color: '#C4B8A4', display: 'flex', textDecoration: 'none', transition: 'color 200ms' }}
                  onMouseEnter={e => e.currentTarget.style.color = '#3D3428'}
                  onMouseLeave={e => e.currentTarget.style.color = '#C4B8A4'}>
                  <svg width={mobile ? 26 : 20} height={mobile ? 26 : 20} viewBox="0 0 24 24" fill="currentColor"><path d={d}/></svg>
                </a>
              ))}
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
