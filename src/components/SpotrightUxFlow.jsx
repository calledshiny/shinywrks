import { useMobile } from '../hooks/useMobile';

const TERRA = '#B07050';
const GLASS_BG = 'rgba(255,255,255,0.06)';
const GLASS_BORDER = 'rgba(255,255,255,0.18)';
const GLASS_TOP = 'rgba(255,255,255,0.28)';
const FG = 'white';
const FG_DIM = 'rgba(255,255,255,0.55)';

const STEPS = {
  landing:   { title: 'Landing',      sub: 'STADT + PILLS' },
  entdecken: { title: 'Entdecken',    sub: 'DATUM + LISTE' },
  wann:      { title: 'Wann?',        sub: 'JETZT / HEUTE / …' },
  was:       { title: 'Was?',         sub: 'ROOFTOP / MUSIK / …' },
  wer:       { title: 'Wer?',         sub: 'GRUPPE / 18+ / …' },
  resultate: { title: 'Resultate',    sub: 'PERSONALISIERT' },
  detail:    { title: 'Event Detail', sub: 'SHEET' },
  save:      { title: 'Save',         sub: 'BOOKMARK' },
  spots:     { title: 'Meine Spots',  sub: 'GESPEICHERT' },
};

function StepCard({ stepKey }) {
  const s = STEPS[stepKey];
  return (
    <div style={{
      background: GLASS_BG,
      border: `1px solid ${GLASS_BORDER}`,
      borderTopColor: GLASS_TOP,
      borderRadius: 10,
      padding: '12px 14px',
      display: 'flex', flexDirection: 'column', gap: 4,
      minWidth: 0,
    }}>
      <div style={{ fontFamily: 'Space Grotesk, sans-serif', fontWeight: 500, fontSize: 14, color: FG, letterSpacing: '-0.01em', lineHeight: 1.2 }}>{s.title}</div>
      <div style={{ fontFamily: 'Space Mono, monospace', fontSize: 9, letterSpacing: '0.14em', color: FG_DIM, lineHeight: 1.2 }}>{s.sub}</div>
    </div>
  );
}

function ArrowH() {
  return (
    <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', color: TERRA, flexShrink: 0, padding: '0 6px' }}>
      <svg width="16" height="10" viewBox="0 0 16 10" aria-hidden="true">
        <path d="M0 5 L13 5 M10 1 L14 5 L10 9" stroke="currentColor" strokeWidth="1.4" fill="none" strokeLinecap="round" strokeLinejoin="round"/>
      </svg>
    </div>
  );
}

function ArrowV() {
  return (
    <div style={{ display: 'flex', justifyContent: 'center', color: TERRA }}>
      <svg width="10" height="16" viewBox="0 0 10 16" aria-hidden="true">
        <path d="M5 0 L5 13 M1 10 L5 14 L9 10" stroke="currentColor" strokeWidth="1.4" fill="none" strokeLinecap="round" strokeLinejoin="round"/>
      </svg>
    </div>
  );
}

function HorizFlow({ keys, mobile }) {
  return (
    <div style={{
      display: 'flex',
      flexDirection: mobile ? 'column' : 'row',
      alignItems: 'stretch',
      gap: 0,
    }}>
      {keys.map((k, i) => (
        <FlowFragment key={k}>
          <div style={{ flex: 1, minWidth: 0 }}><StepCard stepKey={k}/></div>
          {i < keys.length - 1 && (mobile ? <ArrowV/> : <ArrowH/>)}
        </FlowFragment>
      ))}
    </div>
  );
}

function FlowFragment({ children }) {
  return <>{children}</>;
}

function PhaseHeader({ num, label }) {
  return (
    <div style={{
      display: 'flex', alignItems: 'baseline', gap: 12,
      marginBottom: 12,
    }}>
      <span style={{
        fontFamily: 'Space Mono, monospace', fontSize: 11, letterSpacing: '0.18em',
        color: TERRA,
      }}>{num}</span>
      <span style={{
        fontFamily: 'Space Mono, monospace', fontSize: 11, letterSpacing: '0.18em',
        textTransform: 'uppercase', color: FG,
      }}>{label}</span>
    </div>
  );
}

function PathRow({ label, children }) {
  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 6 }}>
      <div style={{
        fontFamily: 'Space Mono, monospace', fontSize: 9, letterSpacing: '0.18em',
        textTransform: 'uppercase', color: TERRA,
      }}>{label}</div>
      <div>{children}</div>
    </div>
  );
}

function OrSeparator() {
  return (
    <div style={{
      fontFamily: 'Space Mono, monospace', fontSize: 10, letterSpacing: '0.2em',
      textTransform: 'lowercase', color: TERRA,
      textAlign: 'center',
    }}>oder</div>
  );
}

export default function SpotrightUxFlow() {
  const mobile = useMobile();

  return (
    <div style={{
      background: 'radial-gradient(ellipse at 50% 28%, #3a1f14 0%, #1a0f0a 55%, #0a0a0d 100%)',
      padding: mobile ? '24px 18px' : '32px 32px',
      color: FG,
    }}>
      <div style={{
        fontFamily: 'Space Mono, monospace', fontSize: 10, letterSpacing: '0.14em',
        textTransform: 'uppercase', color: 'rgba(255,255,255,0.55)', marginBottom: 6,
      }}>User Flow</div>
      <h3 style={{
        fontFamily: 'Space Grotesk, sans-serif', fontWeight: 500,
        fontSize: mobile ? 18 : 22, letterSpacing: '-0.02em',
        color: 'white', margin: 0, marginBottom: 24,
      }}>Zwei Wege zum richtigen Event.</h3>

      <div style={{ display: 'flex', flexDirection: 'column', gap: 24 }}>
        {/* Phase 1 */}
        <div>
          <PhaseHeader num="01" label="Öffnen"/>
          <div style={{ maxWidth: mobile ? '100%' : 280 }}><StepCard stepKey="landing"/></div>
        </div>

        {/* Phase 2 */}
        <div>
          <PhaseHeader num="02" label="Entscheiden — zwei Wege"/>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 14 }}>
            <PathRow label="Browse">
              <div style={{ maxWidth: mobile ? '100%' : 280 }}><StepCard stepKey="entdecken"/></div>
            </PathRow>
            <OrSeparator/>
            <PathRow label="Funnel">
              <HorizFlow keys={['wann', 'was', 'wer', 'resultate']} mobile={mobile}/>
            </PathRow>
          </div>
        </div>

        {/* Phase 3 */}
        <div>
          <PhaseHeader num="03" label="Merken"/>
          <HorizFlow keys={['detail', 'save', 'spots']} mobile={mobile}/>
        </div>
      </div>
    </div>
  );
}
