export default function ProjectDetail({ project, projects, onNav }) {
  const p = project || projects[0];
  const currentIndex = projects.findIndex(x => x.id === p.id);
  const next = projects[(currentIndex + 1) % projects.length];
  const prev = projects[(currentIndex - 1 + projects.length) % projects.length];

  const placeholderBg = (shade) => {
    const shades = [p.bg, 'linear-gradient(160deg, #E8E2D6 0%, #C4B8A4 100%)', 'linear-gradient(140deg, #F5F3EF 0%, #E8E2D6 100%)'];
    return shades[shade % shades.length];
  };

  const renderRow = (items, cols, ri, rowPadding, rowGap, gridCols) => (
    <div key={ri} style={{ display: 'grid', gridTemplateColumns: gridCols || `repeat(${cols || 1}, 1fr)`, gap: rowGap ?? 2, padding: rowPadding || 0 }}>
      {items.map((item, ii) => {
        let inner;
        if (item.type === 'video') {
          inner = item.aspectRatio ? (
            <div style={{ aspectRatio: item.aspectRatio, background: item.bg || '#0D0B08', overflow: 'hidden' }}>
              <video autoPlay muted loop playsInline style={{ width: '100%', height: '100%', objectFit: item.fit || 'cover', display: 'block', position: 'relative', zIndex: 1 }}>
                <source src={item.src} type="video/mp4"/>
              </video>
            </div>
          ) : (
            <video autoPlay muted loop playsInline style={{ width: '100%', height: 'auto', display: 'block', position: 'relative', zIndex: 1 }}>
              <source src={item.src} type="video/mp4"/>
            </video>
          );
        } else if (item.aspectRatio) {
          inner = (
            <div style={{ aspectRatio: item.aspectRatio, overflow: 'hidden', background: item.bg || 'transparent', padding: item.padding || 0, boxSizing: 'border-box', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
              <img src={item.src} alt="" style={{ width: '100%', height: '100%', objectFit: item.fit || 'cover', display: 'block', filter: item.filter || 'none' }}/>
            </div>
          );
        } else if (item.fit === 'contain') {
          inner = (
            <div style={{ height: '100%', overflow: 'hidden', background: item.bg || 'transparent', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
              <img src={item.src} alt="" style={{ width: '100%', height: '100%', objectFit: 'contain', display: 'block', filter: item.filter || 'none' }}/>
            </div>
          );
        } else {
          inner = <img src={item.src} alt="" style={{ width: '100%', height: 'auto', display: 'block', filter: item.filter || 'none', position: 'relative', zIndex: 1 }}/>;
        }
        const aboveEl = item.labelAbove ? (
          <div style={{ padding: '0 4px 10px' }}>
            <span style={{ fontFamily: 'Space Mono, monospace', fontSize: 11, letterSpacing: '0.14em', textTransform: 'uppercase', color: '#3D3428' }}>{item.labelAbove}</span>
          </div>
        ) : null;
        if (item.caption || aboveEl) {
          return (
            <div key={ii}>
              {aboveEl}
              {inner}
              {item.caption && (
                <div style={{ padding: '10px 4px 6px', display: 'flex', flexDirection: 'column', gap: 3 }}>
                  <span style={{ fontFamily: 'Space Mono, monospace', fontSize: 11, letterSpacing: '0.14em', textTransform: 'uppercase', color: '#3D3428' }}>{item.caption}</span>
                  {item.captionSub && <span style={{ fontFamily: 'Space Mono, monospace', fontSize: 11, letterSpacing: '0.08em', color: '#3D3428', lineHeight: 1.5 }}>{item.captionSub}</span>}
                </div>
              )}
            </div>
          );
        }
        return <div key={ii} style={!item.aspectRatio && item.fit === 'contain' ? { height: '100%' } : {}}>{inner}</div>;
      })}
    </div>
  );

  return (
    <div style={{ background: '#F5F3EF', position: 'relative', zIndex: 1 }}>
    <div style={{ paddingTop: 65, maxWidth: 1200, margin: '0 auto' }}>
      <div style={{
        padding: '20px 48px',
        borderBottom: '1px solid #E8E2D6',
        display: 'flex',
        alignItems: 'flex-start',
        justifyContent: 'space-between',
        gap: 32,
        flexWrap: 'wrap',
      }}>
        <div style={{
          fontFamily: 'Space Mono, monospace',
          fontSize: 12,
          letterSpacing: '0.08em',
          lineHeight: 1.8,
          color: '#3D3428',
        }}>
          <div>{p.camera}</div>
          <div>{p.lens}</div>
          <div>{p.film}</div>
        </div>

        <div style={{
          fontFamily: 'Space Mono, monospace',
          fontSize: 12,
          letterSpacing: '0.08em',
          lineHeight: 1.8,
          color: '#3D3428',
          textAlign: 'center',
        }}>
          <div style={{
            fontFamily: 'Space Grotesk, sans-serif',
            fontWeight: 500,
            fontSize: 13,
            letterSpacing: '0.1em',
            textTransform: 'uppercase',
            color: '#0D0B08',
            marginBottom: 2,
          }}>{p.title}</div>
          <div>{p.tagLine}</div>
        </div>

        <div style={{
          fontFamily: 'Space Mono, monospace',
          fontSize: 12,
          letterSpacing: '0.08em',
          lineHeight: 1.8,
          color: '#3D3428',
          textAlign: 'right',
        }}>
          {p.studio && <div>{p.studio}</div>}
          <div>{p.location}</div>
          <div>{p.date}</div>
        </div>
      </div>

      <div style={{
        width: '100%',
        height: 'clamp(360px, 55vw, 680px)',
        background: p.bg,
        position: 'relative',
        zIndex: 1,
        overflow: 'hidden',
      }}>
        <div className="noise"/>
        {p.heroImg
          ? <div style={{ position: 'absolute', inset: 0, padding: '5% 12%', boxSizing: 'border-box' }}>
              <img src={p.heroImg} alt={p.title} style={{ width: '100%', height: '100%', objectFit: 'contain', filter: 'invert(1)' }}/>
            </div>
          : <div style={{ position: 'absolute', inset: 0, display: 'flex', alignItems: 'center', justifyContent: 'center', fontFamily: 'Space Mono, monospace', fontSize: 9, letterSpacing: '0.16em', textTransform: 'uppercase', color: 'rgba(196,184,164,0.3)' }}>Hero — {p.title}</div>
        }
      </div>

      {!p.sections && (
        <div style={{ display: 'flex', gap: 2, padding: '2px 0', borderBottom: '1px solid #E8E2D6' }}>
          {[0,1,2,3].map(i => (
            <div key={i} style={{ flex: i === 1 ? 1.4 : 1, height: 160, background: placeholderBg(i), position: 'relative', overflow: 'hidden' }}>
              <div className="noise"/>
              <div style={{ position: 'absolute', bottom: 8, left: 10, fontFamily: 'Space Mono, monospace', fontSize: 8, letterSpacing: '0.12em', color: 'rgba(196,184,164,0.35)' }}>{String(i+1).padStart(2,'0')}</div>
            </div>
          ))}
        </div>
      )}

      <div style={{ padding: '56px 48px', borderBottom: '1px solid #E8E2D6', display: 'flex', gap: 96 }}>
        <div style={{
          fontFamily: 'Space Mono, monospace', fontSize: 11,
          letterSpacing: '0.14em', textTransform: 'uppercase', color: '#3D3428',
          flexShrink: 0, paddingTop: 4,
        }}>Beschreibung</div>
        <div style={{ maxWidth: 600 }}>
          <p style={{
            fontFamily: 'Space Grotesk, sans-serif',
            fontWeight: 400, fontSize: 17, lineHeight: 1.65,
            color: '#1A1209', margin: 0,
          }}>{p.desc}</p>
          {p.claim && (
            <p style={{
              fontFamily: 'Space Grotesk, sans-serif',
              fontWeight: 400, fontSize: 19, lineHeight: 1.4,
              letterSpacing: '-0.01em',
              color: '#0D0B08', margin: '28px 0 0',
            }}>Claim: <span style={{ fontWeight: 700 }}>{p.claim}</span></p>
          )}
          {p.disclaimer && (
            <p style={{
              fontFamily: 'Space Mono, monospace',
              fontSize: 11, lineHeight: 1.6, letterSpacing: '0.04em',
              color: '#3D3428', margin: '36px 0 0',
            }}>{p.disclaimer}</p>
          )}
        </div>
      </div>

      {p.sections ? (
        p.sections.map((sec, si) => (
          <div key={si} style={{ borderTop: si === 0 ? 'none' : '1px solid #1A1209', marginTop: si === 0 ? 0 : 48 }}>
            <div style={{ padding: '28px 48px 20px', display: 'flex', alignItems: 'baseline', gap: 20 }}>
              <span style={{ fontFamily: 'Space Mono, monospace', fontSize: 11, letterSpacing: '0.14em', color: '#C4B8A4' }}>{String(si + 1).padStart(2, '0')}</span>
              <span style={{ fontFamily: 'Space Mono, monospace', fontSize: 11, letterSpacing: '0.14em', textTransform: 'uppercase', color: '#1A1209' }}>{sec.label}</span>
            </div>
            {sec.rows
              ? sec.rows.map((row, ri) => {
                  if (row.type === 'sublabel') {
                    return (
                      <div key={ri} style={{ padding: '48px 48px 16px' }}>
                        <span style={{ fontFamily: 'Space Mono, monospace', fontSize: 11, letterSpacing: '0.14em', textTransform: 'uppercase', color: '#3D3428' }}>{row.text}</span>
                      </div>
                    );
                  }
                  const el = renderRow(row.items, row.cols, ri, row.padding, row.gap, row.gridTemplateColumns);
                  return row.marginTop ? <div key={ri} style={{ marginTop: row.marginTop }}>{el}</div> : el;
                })
              : renderRow(sec.items, sec.cols, 0)
            }
          </div>
        ))
      ) : (
        <div style={{ padding: '2px 0' }}>
          <div className="gallery-row">
            <div className="gallery-item" style={{ height: 520, background: p.bg }}>
              <div className="noise"/>
            </div>
          </div>
          <div className="gallery-row">
            {[0,1,2].map(i => (
              <div key={i} className="gallery-item" style={{ height: 300, background: placeholderBg(i+1) }}>
                <div className="noise"/>
              </div>
            ))}
          </div>
          <div className="gallery-row">
            <div className="gallery-item" style={{ height: 440, flex: 1.6, background: placeholderBg(2) }}>
              <div className="noise"/>
            </div>
            <div className="gallery-item" style={{ height: 440, flex: 1, background: placeholderBg(0) }}>
              <div className="noise"/>
            </div>
          </div>
        </div>
      )}

      <div style={{ display: 'flex', borderTop: '1px solid #E8E2D6' }}>
        <button className="next-project-btn" onClick={() => onNav('project', prev)} style={{ borderRight: '1px solid #E8E2D6', flex: 1 }}>
          <div style={{
            fontFamily: 'Space Mono, monospace', fontSize: 10,
            letterSpacing: '0.16em', textTransform: 'uppercase', color: '#3D3428', marginBottom: 20,
          }}>← Vorheriges</div>
          <div style={{
            fontFamily: 'Space Grotesk, sans-serif', fontWeight: 500,
            fontSize: 'clamp(28px, 4vw, 72px)', letterSpacing: '-0.03em',
            lineHeight: 0.92, color: '#0D0B08',
          }}>{prev.title}</div>
          <div style={{
            fontFamily: 'Space Mono, monospace', fontSize: 10,
            letterSpacing: '0.1em', textTransform: 'uppercase', color: '#3D3428', marginTop: 16,
          }}>{prev.tagLine}</div>
        </button>
        <button className="next-project-btn" onClick={() => onNav('project', next)} style={{ flex: 1, textAlign: 'right' }}>
          <div style={{
            fontFamily: 'Space Mono, monospace', fontSize: 10,
            letterSpacing: '0.16em', textTransform: 'uppercase', color: '#3D3428', marginBottom: 20,
          }}>Nächstes →</div>
          <div style={{
            fontFamily: 'Space Grotesk, sans-serif', fontWeight: 500,
            fontSize: 'clamp(28px, 4vw, 72px)', letterSpacing: '-0.03em',
            lineHeight: 0.92, color: '#0D0B08',
          }}>{next.title}</div>
          <div style={{
            fontFamily: 'Space Mono, monospace', fontSize: 10,
            letterSpacing: '0.1em', textTransform: 'uppercase', color: '#3D3428', marginTop: 16,
          }}>{next.tagLine}</div>
        </button>
      </div>
    </div>
    </div>
  );
}
