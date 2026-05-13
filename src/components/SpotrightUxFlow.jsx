import { useMobile } from '../hooks/useMobile';

const TERRA = '#B07050';
const GLASS_BG = 'rgba(255,255,255,0.06)';
const GLASS_BORDER = 'rgba(255,255,255,0.18)';
const GLASS_TOP = 'rgba(255,255,255,0.28)';
const FG = 'white';
const FG_DIM = 'rgba(255,255,255,0.55)';

function LandingSketch() {
  return (
    <svg viewBox="0 0 60 40" width="100%" height="100%" aria-hidden="true">
      <defs>
        <radialGradient id="ls-glow" cx="50%" cy="45%" r="55%">
          <stop offset="0%" stopColor={TERRA} stopOpacity="0.7"/>
          <stop offset="100%" stopColor={TERRA} stopOpacity="0"/>
        </radialGradient>
      </defs>
      <circle cx="30" cy="18" r="14" fill="url(#ls-glow)"/>
      <text x="30" y="20" textAnchor="middle" fontSize="5" fontFamily="serif" fill="white" opacity="0.9">spot</text>
      <rect x="10" y="32" width="10" height="4" rx="2" fill="white" opacity="0.18"/>
      <rect x="22" y="32" width="14" height="4" rx="2" fill={TERRA} opacity="0.7"/>
      <rect x="38" y="32" width="10" height="4" rx="2" fill="white" opacity="0.18"/>
    </svg>
  );
}

function DiscoverSketch() {
  return (
    <svg viewBox="0 0 60 40" width="100%" height="100%" aria-hidden="true">
      <rect x="4" y="3" width="5" height="5" rx="1" fill={TERRA} opacity="0.75"/>
      <rect x="11" y="3" width="5" height="5" rx="1" fill="white" opacity="0.18"/>
      <rect x="18" y="3" width="5" height="5" rx="1" fill="white" opacity="0.18"/>
      <rect x="25" y="3" width="5" height="5" rx="1" fill="white" opacity="0.18"/>
      <rect x="4" y="11" width="52" height="12" rx="1.5" fill="white" opacity="0.08" stroke="white" strokeOpacity="0.16"/>
      <rect x="6" y="13" width="8" height="8" rx="1" fill={TERRA} opacity="0.4"/>
      <rect x="17" y="14" width="20" height="1.6" fill="white" opacity="0.6"/>
      <rect x="17" y="18" width="28" height="1.2" fill="white" opacity="0.3"/>
      <rect x="4" y="26" width="52" height="11" rx="1.5" fill="white" opacity="0.06" stroke="white" strokeOpacity="0.12"/>
      <rect x="6" y="28" width="7" height="7" rx="1" fill="white" opacity="0.2"/>
      <rect x="16" y="29" width="18" height="1.6" fill="white" opacity="0.5"/>
      <rect x="16" y="32" width="24" height="1.2" fill="white" opacity="0.25"/>
    </svg>
  );
}

function PillsSketch({ active = 1 }) {
  return (
    <svg viewBox="0 0 60 40" width="100%" height="100%" aria-hidden="true">
      <rect x="6" y="10" width="14" height="7" rx="3.5" fill={active === 0 ? TERRA : 'white'} opacity={active === 0 ? 0.75 : 0.18}/>
      <rect x="22" y="10" width="14" height="7" rx="3.5" fill={active === 1 ? TERRA : 'white'} opacity={active === 1 ? 0.75 : 0.18}/>
      <rect x="38" y="10" width="14" height="7" rx="3.5" fill={active === 2 ? TERRA : 'white'} opacity={active === 2 ? 0.75 : 0.18}/>
      <rect x="14" y="20" width="12" height="7" rx="3.5" fill="white" opacity="0.18"/>
      <rect x="30" y="20" width="12" height="7" rx="3.5" fill="white" opacity="0.18"/>
      <rect x="6" y="32" width="48" height="5" rx="2.5" fill={TERRA} opacity="0.7"/>
    </svg>
  );
}

function ResultsSketch() {
  return (
    <svg viewBox="0 0 60 40" width="100%" height="100%" aria-hidden="true">
      {[0, 1, 2].map(i => (
        <g key={i} transform={`translate(0, ${i * 13})`}>
          <rect x="4" y="2" width="52" height="10" rx="1.5" fill="white" opacity="0.08" stroke="white" strokeOpacity="0.16"/>
          <rect x="6" y="4" width="6" height="6" rx="1" fill={TERRA} opacity="0.45"/>
          <rect x="15" y="4" width="20" height="1.5" fill="white" opacity="0.6"/>
          <rect x="15" y="7" width="26" height="1.2" fill="white" opacity="0.3"/>
        </g>
      ))}
    </svg>
  );
}

function DetailSketch() {
  return (
    <svg viewBox="0 0 60 40" width="100%" height="100%" aria-hidden="true">
      <rect x="6" y="3" width="48" height="34" rx="3" fill="white" opacity="0.08" stroke="white" strokeOpacity="0.22"/>
      <rect x="9" y="6" width="42" height="10" rx="1.5" fill={TERRA} opacity="0.35"/>
      <rect x="9" y="19" width="28" height="2" fill="white" opacity="0.75"/>
      <rect x="9" y="23" width="38" height="1.2" fill="white" opacity="0.35"/>
      <rect x="9" y="26" width="32" height="1.2" fill="white" opacity="0.35"/>
      <rect x="9" y="31" width="16" height="4" rx="2" fill={TERRA} opacity="0.8"/>
      <rect x="44" y="31" width="6" height="4" rx="1.5" fill="white" opacity="0.25"/>
    </svg>
  );
}

function SaveSketch() {
  return (
    <svg viewBox="0 0 60 40" width="100%" height="100%" aria-hidden="true">
      <path d="M24 6 L24 34 L30 30 L36 34 L36 6 Z" fill={TERRA} opacity="0.8" stroke={TERRA} strokeWidth="1.2"/>
      <circle cx="30" cy="16" r="2.5" fill="white" opacity="0.9"/>
    </svg>
  );
}

function SpotsSketch() {
  return (
    <svg viewBox="0 0 60 40" width="100%" height="100%" aria-hidden="true">
      {[0, 1, 2].map(i => (
        <g key={i} transform={`translate(0, ${i * 13})`}>
          <rect x="4" y="2" width="52" height="10" rx="1.5" fill="white" opacity="0.08" stroke="white" strokeOpacity="0.16"/>
          <rect x="6" y="4" width="6" height="6" rx="1" fill={TERRA} opacity="0.4"/>
          <rect x="15" y="4" width="18" height="1.5" fill="white" opacity="0.55"/>
          <rect x="15" y="7" width="14" height="1.2" fill="white" opacity="0.3"/>
          <path d="M48 4 L48 10 L51 8 L54 10 L54 4 Z" fill={TERRA} opacity="0.8"/>
        </g>
      ))}
    </svg>
  );
}

const STEPS = {
  landing:   { title: 'Landing',      sub: 'STADT + PILLS',         Sketch: LandingSketch },
  entdecken: { title: 'Entdecken',    sub: 'DATUM + LISTE',         Sketch: DiscoverSketch },
  wann:      { title: 'Wann?',        sub: 'JETZT / HEUTE',         Sketch: () => <PillsSketch active={1}/> },
  was:       { title: 'Was?',         sub: 'ROOFTOP / MUSIK',       Sketch: () => <PillsSketch active={0}/> },
  wer:       { title: 'Wer?',         sub: 'GRUPPE / 18+',          Sketch: () => <PillsSketch active={2}/> },
  resultate: { title: 'Resultate',    sub: 'PERSONALISIERT',        Sketch: ResultsSketch },
  detail:    { title: 'Event Detail', sub: 'SHEET',                 Sketch: DetailSketch },
  save:      { title: 'Save',         sub: 'BOOKMARK',              Sketch: SaveSketch },
  spots:     { title: 'Meine Spots',  sub: 'GESPEICHERT',           Sketch: SpotsSketch },
};

function StepCard({ stepKey, badge }) {
  const s = STEPS[stepKey];
  const Sketch = s.Sketch;
  return (
    <div style={{
      position: 'relative',
      background: GLASS_BG,
      border: `1px solid ${GLASS_BORDER}`,
      borderTopColor: GLASS_TOP,
      borderRadius: 10,
      padding: '8px 8px 10px',
      display: 'flex', flexDirection: 'column', gap: 6,
    }}>
      {badge && (
        <div style={{
          position: 'absolute', top: -8, left: 10,
          padding: '2px 7px', borderRadius: 999, background: TERRA, color: 'white',
          fontFamily: 'Space Mono, monospace', fontSize: 8, letterSpacing: '0.14em', textTransform: 'uppercase',
          boxShadow: '0 3px 8px rgba(176,112,80,0.45)',
        }}>{badge}</div>
      )}
      <div style={{
        aspectRatio: '60/40',
        background: 'rgba(0,0,0,0.25)',
        border: '1px solid rgba(255,255,255,0.08)',
        borderRadius: 5,
        overflow: 'hidden',
      }}>
        <Sketch/>
      </div>
      <div style={{ fontFamily: 'Space Grotesk, sans-serif', fontWeight: 500, fontSize: 12, color: FG, letterSpacing: '-0.01em', lineHeight: 1.1 }}>{s.title}</div>
      <div style={{ fontFamily: 'Space Mono, monospace', fontSize: 8, letterSpacing: '0.14em', color: FG_DIM, lineHeight: 1 }}>{s.sub}</div>
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
