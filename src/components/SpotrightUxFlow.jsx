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
  wann:      { title: 'Wann?',        sub: 'JETZT / HEUTE' },
  was:       { title: 'Was?',         sub: 'ROOFTOP / MUSIK' },
  wer:       { title: 'Wer?',         sub: 'GRUPPE / 18+' },
  resultate: { title: 'Resultate',    sub: 'PERSONALISIERT' },
  detail:    { title: 'Event Detail', sub: 'SHEET' },
  save:      { title: 'Save',         sub: 'BOOKMARK' },
  spots:     { title: 'Meine Spots',  sub: 'GESPEICHERT' },
};

function StepCard({ stepKey, badge }) {
  const s = STEPS[stepKey];
  return (
    <div style={{
      position: 'relative',
      background: GLASS_BG,
      border: `1px solid ${GLASS_BORDER}`,
      borderTopColor: GLASS_TOP,
      borderRadius: 10,
      padding: '10px 12px',
      display: 'flex', flexDirection: 'column', gap: 4,
    }}>
      {badge && (
        <div style={{
          position: 'absolute', top: -8, left: 10,
          padding: '2px 7px', borderRadius: 999, background: TERRA, color: 'white',
          fontFamily: 'Space Mono, monospace', fontSize: 8, letterSpacing: '0.14em', textTransform: 'uppercase',
          boxShadow: '0 3px 8px rgba(176,112,80,0.45)',
        }}>{badge}</div>
      )}
      <div style={{ fontFamily: 'Space Grotesk, sans-serif', fontWeight: 500, fontSize: 13, color: FG, letterSpacing: '-0.01em', lineHeight: 1.15 }}>{s.title}</div>
      <div style={{ fontFamily: 'Space Mono, monospace', fontSize: 9, letterSpacing: '0.14em', color: FG_DIM, lineHeight: 1.2 }}>{s.sub}</div>
    </div>
  );
}

function ArrowH({ size = 16 }) {
  return (
    <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', color: TERRA, flexShrink: 0 }}>
      <svg width={size} height="10" viewBox="0 0 16 10" aria-hidden="true">
        <path d="M0 5 L13 5 M10 1 L14 5 L10 9" stroke="currentColor" strokeWidth="1.4" fill="none" strokeLinecap="round" strokeLinejoin="round"/>
      </svg>
    </div>
  );
}

function ArrowV({ size = 16 }) {
  return (
    <div style={{ display: 'flex', justifyContent: 'center', color: TERRA }}>
      <svg width="10" height={size} viewBox="0 0 10 16" aria-hidden="true">
        <path d="M5 0 L5 13 M1 10 L5 14 L9 10" stroke="currentColor" strokeWidth="1.4" fill="none" strokeLinecap="round" strokeLinejoin="round"/>
      </svg>
    </div>
  );
}

function Decision({ mobile }) {
  return (
    <div style={{
      display: 'inline-flex', alignItems: 'center', gap: 8,
      padding: '6px 12px',
      background: 'rgba(176,112,80,0.16)',
      border: `1px solid rgba(176,112,80,0.55)`,
      borderRadius: 999, color: FG,
    }}>
      <div style={{
        width: 14, height: 14, borderRadius: '50%', background: TERRA,
        display: 'flex', alignItems: 'center', justifyContent: 'center',
        fontFamily: 'Space Mono, monospace', fontSize: 9, fontWeight: 700,
      }}>?</div>
      <div style={{ fontFamily: 'Space Grotesk, sans-serif', fontWeight: 500, fontSize: mobile ? 12 : 13 }}>
        Weißt du was du willst?
      </div>
    </div>
  );
}

function BranchLabel({ text }) {
  return (
    <div style={{
      fontFamily: 'Space Mono, monospace', fontSize: 9, letterSpacing: '0.18em',
      textTransform: 'uppercase', color: TERRA, marginBottom: 6,
    }}>{text}</div>
  );
}

export default function SpotrightUxFlow() {
  const mobile = useMobile();
  const cardW = mobile ? 'minmax(0,1fr)' : '130px';

  return (
    <div style={{
      background: 'radial-gradient(ellipse at 50% 30%, #3a1f14 0%, #1a0f0a 55%, #0a0a0d 100%)',
      padding: mobile ? '24px 18px' : '36px 32px',
      position: 'relative',
      overflow: 'hidden',
      color: FG,
    }}>
      <div style={{
        fontFamily: 'Space Mono, monospace', fontSize: 10, letterSpacing: '0.14em',
        textTransform: 'uppercase', color: 'rgba(255,255,255,0.55)', marginBottom: 6,
      }}>User Flow</div>
      <h3 style={{
        fontFamily: 'Space Grotesk, sans-serif', fontWeight: 500,
        fontSize: mobile ? 18 : 22, letterSpacing: '-0.02em',
        color: 'white', margin: 0, marginBottom: mobile ? 18 : 24,
      }}>Zwei Wege zum richtigen Event.</h3>

      {/* Start */}
      <div style={{ display: 'flex', justifyContent: 'center' }}>
        <div style={{ width: mobile ? '60%' : 140 }}><StepCard stepKey="landing" badge="Start"/></div>
      </div>

      <div style={{ padding: '8px 0' }}><ArrowV/></div>

      {/* Decision */}
      <div style={{ display: 'flex', justifyContent: 'center' }}><Decision mobile={mobile}/></div>

      <div style={{ padding: '6px 0' }}><ArrowV/></div>

      {/* Branches */}
      <div style={{
        display: 'grid',
        gridTemplateColumns: mobile ? '1fr 1fr' : '1fr 2.6fr',
        gap: mobile ? 10 : 24,
        alignItems: 'start',
      }}>
        {/* Left: Browse */}
        <div>
          <BranchLabel text="Nein → Browse"/>
          <StepCard stepKey="entdecken"/>
        </div>

        {/* Right: Funnel */}
        <div>
          <BranchLabel text="Ja → Vorschlag"/>
          {mobile ? (
            <div style={{ display: 'flex', flexDirection: 'column' }}>
              <StepCard stepKey="wann"/>
              <ArrowV size={12}/>
              <StepCard stepKey="was"/>
              <ArrowV size={12}/>
              <StepCard stepKey="wer"/>
              <ArrowV size={12}/>
              <StepCard stepKey="resultate"/>
            </div>
          ) : (
            <div style={{ display: 'grid', gridTemplateColumns: `repeat(4, ${cardW}) `, columnGap: 0, alignItems: 'stretch' }}>
              <StepCard stepKey="wann"/>
              <ArrowH/>
              <StepCard stepKey="was"/>
              <ArrowH/>
              <StepCard stepKey="wer"/>
              <ArrowH/>
              <StepCard stepKey="resultate"/>
            </div>
          )}
        </div>
      </div>

      <div style={{ padding: '8px 0' }}><ArrowV/></div>

      {/* Converged */}
      <div style={{
        display: 'grid',
        gridTemplateColumns: mobile ? '1fr' : 'repeat(3, 1fr) 0',
        gap: mobile ? 0 : 0,
        justifyContent: 'center',
      }}>
        {mobile ? (
          <>
            <StepCard stepKey="detail"/>
            <ArrowV size={12}/>
            <StepCard stepKey="save"/>
            <ArrowV size={12}/>
            <StepCard stepKey="spots" badge="Ziel"/>
          </>
        ) : (
          <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'stretch', gap: 0 }}>
            <div style={{ width: 140 }}><StepCard stepKey="detail"/></div>
            <ArrowH/>
            <div style={{ width: 140 }}><StepCard stepKey="save"/></div>
            <ArrowH/>
            <div style={{ width: 140 }}><StepCard stepKey="spots" badge="Ziel"/></div>
          </div>
        )}
      </div>
    </div>
  );
}
