import { useMobile } from '../hooks/useMobile';

const BG = '#EFEEEA';
const INK = '#1D1D1B';
const INK_DIM = 'rgba(29,29,27,0.55)';
const RULE = 'rgba(29,29,27,0.12)';

const FUTURA = 'Jost, Futura, "Century Gothic", sans-serif';

function HofMark({ height, color = INK }) {
  return (
    <svg viewBox="0 0 92 49" style={{ height, width: 'auto', display: 'block' }} xmlns="http://www.w3.org/2000/svg">
      <g fill={color}>
        <path d="M6.2,21.1c4.1-.5,6.5-.7,11.9-1.1.5-7.8,1.9-11.7,5.3-17.1,3.6-.8,5.4-1.1,8.9-1.4-4.4,15.7-6.3,32.3.8,47.6-3.3-.3-5.1-.5-8.6-1.2-3.9-5.2-5.6-9.4-6.3-17.6-5.4-.4-7.8-.7-11.9-1.2.5,6.4,1.6,9.7,5.1,15.3-3.6-1.3-5.4-2-8.5-3.7C-.8,31.8-.8,19.2,2.2,10.2c2.9-1.6,4.6-2.3,8.1-3.6-2.9,5.4-3.8,8.5-4.1,14.5Z"/>
        <path d="M30.2,23.3c0-3.9.9-7.5,2.3-10.7,1.4-3.1,3.3-5.7,5.3-7.6,2-1.9,4-3.2,6.1-4C45.9.2,47.9,0,50.1,0c2.2,0,4.5.5,6.9,1.5,2.4,1,4.9,2.4,7.2,4.5s4.3,4.7,5.9,7.7c1.6,3,2.3,6.3,2.3,9.8,0,3.5-.6,6.8-1.9,9.9-1.3,3.1-3.5,5.7-5.7,7.9-2.2,2.2-4.7,3.8-7.2,4.8-2.5,1.1-4.8,1.6-7.2,1.7-2.4,0-4.5-.3-6.7-1.2-2.2-.9-4.3-2.3-6.3-4.4-2-2.1-3.9-4.7-5.2-8-1.3-3.3-2.1-6.9-2-10.8ZM40.7,23.3c0,2.2.3,4.2.9,6,.6,1.8,1.4,3.4,2.5,4.7,1,1.3,2.1,2.2,3.4,2.9,1.3.7,2.6,1,4,.9,1.4,0,2.8-.4,4.1-1.1,1.3-.7,2.6-1.7,3.7-3,1.1-1.3,2-2.8,2.6-4.6.7-1.8,1-3.7,1-5.8,0-2.1-.4-4-1.1-5.7-.7-1.7-1.6-3.3-2.7-4.5-1.1-1.3-2.3-2.2-3.7-2.9-1.3-.7-2.6-1-4-1.1-1.4,0-2.6.2-3.9.9-1.2.6-2.3,1.5-3.3,2.8-1,1.2-1.8,2.7-2.4,4.5-.6,1.8-1,3.8-1,6Z"/>
        <path d="M91.5,17c-3-1.3-5-2-9.6-3.1.9,2.7.9,4.1,1.1,7,4.3.4,6.2.7,8.9,1.2.1,2.6,0,4,0,6.6-2.8.7-4.7,1-9,1.6-.6,6.6-2.1,9.9-5.7,15.3-3.7,1.1-5.5,1.6-9.1,2.3,9.5-14.2,7.2-30,1.1-44.8,8.6,1.9,13.8,3.5,20.7,7.2,1,2.7,1.3,4.1,1.6,6.8Z"/>
      </g>
    </svg>
  );
}

function SectionLabel({ index, children }) {
  return (
    <div style={{ display: 'flex', alignItems: 'baseline', gap: 14, marginBottom: 24 }}>
      <span style={{ fontFamily: 'Space Mono, monospace', fontSize: 11, letterSpacing: '0.14em', textTransform: 'uppercase', color: '#C4B8A4' }}>{index}</span>
      <span style={{ fontFamily: 'Space Mono, monospace', fontSize: 11, letterSpacing: '0.14em', textTransform: 'uppercase', color: INK }}>{children}</span>
    </div>
  );
}

function Swatch({ value, name, light }) {
  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
      <div style={{
        width: '100%', aspectRatio: '1/1',
        background: value,
        border: light ? `1px solid ${RULE}` : 'none',
      }}/>
      <div>
        <div style={{ fontFamily: FUTURA, fontWeight: 500, fontSize: 13, color: INK, marginBottom: 2 }}>{name}</div>
        <div style={{ fontFamily: 'Space Mono, monospace', fontSize: 10, letterSpacing: '0.06em', color: INK_DIM }}>{value}</div>
      </div>
    </div>
  );
}

export default function ZoomInDesignSystem() {
  const m = useMobile();
  const pad = m ? '40px 20px' : '64px 48px';
  return (
    <div style={{ background: BG, padding: pad, color: INK }}>

      {/* LOGO */}
      <SectionLabel index="01">Wortmarke</SectionLabel>
      <div style={{
        display: 'grid',
        gridTemplateColumns: m ? '1fr' : '1.4fr 1fr',
        gap: m ? 32 : 56,
        alignItems: 'center',
        marginBottom: m ? 56 : 96,
      }}>
        <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', padding: m ? '24px 0' : '32px 0' }}>
          <HofMark height={m ? 90 : 140} />
        </div>
        <p style={{ fontFamily: 'Space Grotesk, sans-serif', fontWeight: 400, fontSize: m ? 14 : 16, lineHeight: 1.6, color: '#1A1209', margin: 0, maxWidth: 460 }}>
          Asymmetrisch gestretched, von der Mitte aus aufgezogen — das <strong style={{ fontWeight: 500 }}>O</strong> wird zur Kameralinse, die ganze Marke zum Zoom. Nicht perfekt, aber genau richtig.
        </p>
      </div>

      {/* FARBEN */}
      <SectionLabel index="02">Farben</SectionLabel>
      <div style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(3, 1fr)',
        gap: m ? 14 : 20,
        marginBottom: m ? 24 : 32,
      }}>
        <Swatch value="#1D1D1B" name="Tiefschwarz" />
        <Swatch value="#EFEEEA" name="Off-White" light />
        <Swatch value="#B89BD8" name="Sunset Lavender" />
      </div>
      <p style={{ fontFamily: FUTURA, fontWeight: 500, fontSize: m ? 13 : 14, lineHeight: 1.55, color: INK_DIM, maxWidth: 640, margin: 0, marginBottom: m ? 56 : 96 }}>
        Schwarz und Off-White tragen das System. Die Akzenttöne stammen aus den Motiven selbst — jedes Plakat bringt seinen eigenen Filmton mit. Keine starre CI-Palette, sondern eine wandernde.
      </p>

      {/* SCHRIFT */}
      <SectionLabel index="03">Schrift</SectionLabel>
      <div style={{
        display: 'grid',
        gridTemplateColumns: m ? '1fr' : '1.4fr 1fr',
        gap: m ? 32 : 56,
      }}>
        <div>
          <div style={{ fontFamily: FUTURA, fontWeight: 700, fontSize: m ? 'clamp(40px, 12vw, 64px)' : 'clamp(60px, 7vw, 110px)', lineHeight: 0.95, letterSpacing: '-0.01em', color: INK, marginBottom: m ? 18 : 28 }}>
            HEADLINE
          </div>
          <p style={{ fontFamily: FUTURA, fontWeight: 500, fontSize: m ? 13 : 15, lineHeight: 1.55, color: INK, margin: 0, maxWidth: 560 }}>
            Gendandisit, odis estrum quam, que pa est, sin recaeptatus porio que soluptates porro et, que quia quisquis dolo consecum que opti quas maion earcienet fuga. Itatus utemquias evel molut eos verferitat quidempos as ex es seriore pedio magnis et acita sum et hiliasp editemperis ipit volorrunto ma earum nonectem quaere.
          </p>
        </div>
        <div style={{ display: 'flex', flexDirection: 'column', gap: m ? 22 : 32, justifyContent: 'flex-end', paddingBottom: m ? 0 : 8 }}>
          <div>
            <div style={{ fontFamily: 'Space Mono, monospace', fontSize: 10, letterSpacing: '0.14em', textTransform: 'uppercase', color: INK_DIM, marginBottom: 6 }}>Display</div>
            <div style={{ fontFamily: FUTURA, fontWeight: 700, fontSize: m ? 20 : 24, color: INK }}>Futura Bold</div>
          </div>
          <div>
            <div style={{ fontFamily: 'Space Mono, monospace', fontSize: 10, letterSpacing: '0.14em', textTransform: 'uppercase', color: INK_DIM, marginBottom: 6 }}>Fließtext</div>
            <div style={{ fontFamily: FUTURA, fontWeight: 500, fontSize: m ? 18 : 22, color: INK }}>Futura Medium</div>
          </div>
        </div>
      </div>

    </div>
  );
}
