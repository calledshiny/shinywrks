import { useMobile } from '../hooks/useMobile';

const TERRA = '#B07050';
const GLASS_BG = 'rgba(255,255,255,0.06)';
const GLASS_BORDER = 'rgba(255,255,255,0.18)';
const GLASS_TOP = 'rgba(255,255,255,0.28)';
const FG = 'white';
const FG_DIM = 'rgba(255,255,255,0.55)';

// Mini wireframe sketches. Each is a 60×54 viewBox by default.
function LandingSketch() {
  return (
    <svg viewBox="0 0 60 54" width="100%" height="100%" aria-hidden="true">
      <defs>
        <radialGradient id="ls-glow" cx="50%" cy="40%" r="55%">
          <stop offset="0%" stopColor={TERRA} stopOpacity="0.7"/>
          <stop offset="100%" stopColor={TERRA} stopOpacity="0"/>
        </radialGradient>
      </defs>
      <circle cx="30" cy="22" r="18" fill="url(#ls-glow)"/>
      <text x="30" y="24" textAnchor="middle" fontSize="6" fontFamily="serif" fill="white" opacity="0.95">spot</text>
      <text x="30" y="30" textAnchor="middle" fontSize="3.5" fontFamily="monospace" fill={TERRA} opacity="0.95">right</text>
      <rect x="8" y="42" width="11" height="5" rx="2.5" fill="white" opacity="0.18"/>
      <rect x="22" y="42" width="16" height="5" rx="2.5" fill={TERRA} opacity="0.65"/>
      <rect x="41" y="42" width="11" height="5" rx="2.5" fill="white" opacity="0.18"/>
    </svg>
  );
}

function DiscoverSketch() {
  return (
    <svg viewBox="0 0 60 54" width="100%" height="100%" aria-hidden="true">
      <rect x="4" y="4" width="6" height="7" rx="1.5" fill={TERRA} opacity="0.75"/>
      <rect x="12" y="4" width="6" height="7" rx="1.5" fill="white" opacity="0.18"/>
      <rect x="20" y="4" width="6" height="7" rx="1.5" fill="white" opacity="0.18"/>
      <rect x="28" y="4" width="6" height="7" rx="1.5" fill="white" opacity="0.18"/>
      <rect x="36" y="4" width="6" height="7" rx="1.5" fill="white" opacity="0.18"/>
      <rect x="4" y="15" width="52" height="17" rx="2" fill="white" opacity="0.08" stroke="white" strokeOpacity="0.16"/>
      <rect x="7" y="18" width="10" height="11" rx="1.5" fill={TERRA} opacity="0.35"/>
      <rect x="20" y="19" width="22" height="2" fill="white" opacity="0.6"/>
      <rect x="20" y="23" width="30" height="1.5" fill="white" opacity="0.3"/>
      <rect x="20" y="27" width="6" height="2" rx="1" fill={TERRA} opacity="0.5"/>
      <rect x="4" y="36" width="52" height="14" rx="2" fill="white" opacity="0.06" stroke="white" strokeOpacity="0.12"/>
      <rect x="7" y="39" width="9" height="9" rx="1.5" fill="white" opacity="0.2"/>
      <rect x="20" y="40" width="20" height="2" fill="white" opacity="0.5"/>
      <rect x="20" y="44" width="26" height="1.5" fill="white" opacity="0.25"/>
    </svg>
  );
}

function PillsSketch({ active = 1 }) {
  // Three pills, one highlighted (terra), with a chevron hint to next step.
  return (
    <svg viewBox="0 0 60 54" width="100%" height="100%" aria-hidden="true">
      <rect x="6" y="14" width="16" height="9" rx="4.5" fill={active === 0 ? TERRA : 'white'} opacity={active === 0 ? 0.75 : 0.18}/>
      <rect x="22" y="14" width="16" height="9" rx="4.5" fill={active === 1 ? TERRA : 'white'} opacity={active === 1 ? 0.75 : 0.18}/>
      <rect x="38" y="14" width="16" height="9" rx="4.5" fill={active === 2 ? TERRA : 'white'} opacity={active === 2 ? 0.75 : 0.18}/>
      <rect x="14" y="27" width="14" height="9" rx="4.5" fill="white" opacity="0.18"/>
      <rect x="30" y="27" width="14" height="9" rx="4.5" fill="white" opacity="0.18"/>
      <rect x="6" y="44" width="48" height="6" rx="3" fill={TERRA} opacity="0.7"/>
    </svg>
  );
}

function ResultsSketch() {
  return (
    <svg viewBox="0 0 60 54" width="100%" height="100%" aria-hidden="true">
      <rect x="4" y="3" width="52" height="14" rx="2" fill="white" opacity="0.08" stroke="white" strokeOpacity="0.18"/>
      <rect x="7" y="6" width="8" height="8" rx="1.5" fill={TERRA} opacity="0.45"/>
      <rect x="18" y="7" width="22" height="2" fill="white" opacity="0.6"/>
      <rect x="18" y="11" width="28" height="1.5" fill="white" opacity="0.3"/>
      <rect x="4" y="20" width="52" height="14" rx="2" fill="white" opacity="0.08" stroke="white" strokeOpacity="0.18"/>
      <rect x="7" y="23" width="8" height="8" rx="1.5" fill={TERRA} opacity="0.45"/>
      <rect x="18" y="24" width="22" height="2" fill="white" opacity="0.6"/>
      <rect x="18" y="28" width="28" height="1.5" fill="white" opacity="0.3"/>
      <rect x="4" y="37" width="52" height="14" rx="2" fill="white" opacity="0.08" stroke="white" strokeOpacity="0.18"/>
      <rect x="7" y="40" width="8" height="8" rx="1.5" fill={TERRA} opacity="0.45"/>
      <rect x="18" y="41" width="22" height="2" fill="white" opacity="0.6"/>
      <rect x="18" y="45" width="28" height="1.5" fill="white" opacity="0.3"/>
    </svg>
  );
}

function DetailSketch() {
  return (
    <svg viewBox="0 0 60 54" width="100%" height="100%" aria-hidden="true">
      <rect x="6" y="4" width="48" height="46" rx="4" fill="white" opacity="0.08" stroke="white" strokeOpacity="0.22"/>
      <rect x="22" y="6" width="16" height="2" rx="1" fill="white" opacity="0.35"/>
      <rect x="9" y="11" width="42" height="14" rx="2" fill={TERRA} opacity="0.35"/>
      <rect x="9" y="28" width="30" height="2.5" fill="white" opacity="0.75"/>
      <rect x="9" y="33" width="40" height="1.5" fill="white" opacity="0.35"/>
      <rect x="9" y="37" width="34" height="1.5" fill="white" opacity="0.35"/>
      <rect x="9" y="42" width="18" height="6" rx="3" fill={TERRA} opacity="0.8"/>
      <rect x="44" y="42" width="7" height="6" rx="1.5" fill="white" opacity="0.25"/>
    </svg>
  );
}

function SaveSketch() {
  return (
    <svg viewBox="0 0 60 54" width="100%" height="100%" aria-hidden="true">
      <path d="M22 8 L22 44 L30 38 L38 44 L38 8 Z" fill={TERRA} opacity="0.8" stroke={TERRA} strokeWidth="1.5"/>
      <circle cx="30" cy="22" r="3" fill="white" opacity="0.9"/>
    </svg>
  );
}

function SpotsSketch() {
  return (
    <svg viewBox="0 0 60 54" width="100%" height="100%" aria-hidden="true">
      {[0, 1, 2].map(i => (
        <g key={i} transform={`translate(0, ${i * 16})`}>
          <rect x="4" y="4" width="52" height="12" rx="2" fill="white" opacity="0.08" stroke="white" strokeOpacity="0.18"/>
          <rect x="7" y="6" width="7" height="8" rx="1.5" fill={TERRA} opacity="0.4"/>
          <rect x="17" y="7" width="22" height="2" fill="white" opacity="0.55"/>
          <rect x="17" y="11" width="16" height="1.5" fill="white" opacity="0.3"/>
          <path d="M48 6 L48 13 L51 11 L54 13 L54 6 Z" fill={TERRA} opacity="0.8"/>
        </g>
      ))}
    </svg>
  );
}

const STEPS = {
  landing:   { title: 'Landing',      sub: 'Stadt + Pills',         Sketch: LandingSketch },
  entdecken: { title: 'Entdecken',    sub: 'Datum + Liste',         Sketch: DiscoverSketch },
  wann:      { title: 'Wann?',        sub: 'Jetzt / Heute / Woche', Sketch: () => <PillsSketch active={1}/> },
  was:       { title: 'Was?',         sub: 'Rooftop / Musik / …',   Sketch: () => <PillsSketch active={0}/> },
  wer:       { title: 'Wer?',         sub: 'Gruppe / 18+ / …',      Sketch: () => <PillsSketch active={2}/> },
  resultate: { title: 'Resultate',    sub: 'Kuratiert + Personal',  Sketch: ResultsSketch },
  detail:    { title: 'Event Detail', sub: 'Sheet öffnet',          Sketch: DetailSketch },
  save:      { title: 'Save',         sub: 'Bookmark',              Sketch: SaveSketch },
  spots:     { title: 'Meine Spots',  sub: 'Gespeichert',           Sketch: SpotsSketch },
};

function StepCard({ stepKey, mobile, badge }) {
  const s = STEPS[stepKey];
  const Sketch = s.Sketch;
  return (
    <div style={{
      position: 'relative',
      background: GLASS_BG,
      border: `1px solid ${GLASS_BORDER}`,
      borderTopColor: GLASS_TOP,
      borderRadius: 14,
      padding: mobile ? '14px 12px 12px' : '16px 14px 14px',
      display: 'flex', flexDirection: 'column', gap: 10,
    }}>
      {badge && (
        <div style={{
          position: 'absolute', top: -10, left: 14,
          padding: '3px 8px', borderRadius: 999, background: TERRA, color: 'white',
          fontFamily: 'Space Mono, monospace', fontSize: 9, letterSpacing: '0.14em', textTransform: 'uppercase',
          boxShadow: '0 4px 12px rgba(176,112,80,0.45)',
        }}>{badge}</div>
      )}
      <div style={{
        aspectRatio: '60/54',
        background: 'rgba(0,0,0,0.25)',
        border: `1px solid rgba(255,255,255,0.08)`,
        borderRadius: 8,
        overflow: 'hidden',
      }}>
        <Sketch/>
      </div>
      <div style={{ fontFamily: 'Space Grotesk, sans-serif', fontWeight: 500, fontSize: mobile ? 15 : 16, color: FG, letterSpacing: '-0.01em' }}>{s.title}</div>
      <div style={{ fontFamily: 'Space Mono, monospace', fontSize: 9, letterSpacing: '0.14em', textTransform: 'uppercase', color: FG_DIM }}>{s.sub}</div>
    </div>
  );
}

function DecisionNode({ mobile }) {
  return (
    <div style={{
      position: 'relative',
      display: 'flex', alignItems: 'center', justifyContent: 'center',
      padding: '12px 18px',
      background: 'rgba(176,112,80,0.16)',
      border: `1px solid rgba(176,112,80,0.55)`,
      borderRadius: 999,
      color: FG,
      gap: 10,
      maxWidth: 'fit-content',
      margin: '0 auto',
    }}>
      <div style={{
        width: 18, height: 18, borderRadius: '50%', background: TERRA,
        display: 'flex', alignItems: 'center', justifyContent: 'center',
        fontFamily: 'Space Mono, monospace', fontSize: 11, fontWeight: 700,
      }}>?</div>
      <div style={{ fontFamily: 'Space Grotesk, sans-serif', fontWeight: 500, fontSize: mobile ? 14 : 15 }}>
        Weißt du was du willst?
      </div>
    </div>
  );
}

function ArrowDown({ color = TERRA, height = 22 }) {
  return (
    <div style={{ display: 'flex', justifyContent: 'center', color }}>
      <svg width="14" height={height} viewBox={`0 0 14 ${height}`} aria-hidden="true">
        <path d={`M7 0 L7 ${height - 5} M2 ${height - 9} L7 ${height - 3} L12 ${height - 9}`} stroke="currentColor" strokeWidth="1.6" fill="none" strokeLinecap="round" strokeLinejoin="round"/>
      </svg>
    </div>
  );
}

function BranchLabel({ text, align = 'center' }) {
  return (
    <div style={{
      fontFamily: 'Space Mono, monospace', fontSize: 10, letterSpacing: '0.18em',
      textTransform: 'uppercase', color: TERRA, textAlign: align, marginBottom: 8,
    }}>{text}</div>
  );
}

export default function SpotrightUxFlow() {
  const mobile = useMobile();

  return (
    <div style={{
      background: 'radial-gradient(ellipse at 50% 28%, #3a1f14 0%, #1a0f0a 55%, #0a0a0d 100%)',
      padding: mobile ? '36px 20px' : '64px 56px',
      position: 'relative',
      overflow: 'hidden',
      color: FG,
    }}>
      <div style={{
        fontFamily: 'Space Mono, monospace', fontSize: 11, letterSpacing: '0.14em',
        textTransform: 'uppercase', color: 'rgba(255,255,255,0.55)', marginBottom: 8,
      }}>User Flow</div>
      <h3 style={{
        fontFamily: 'Space Grotesk, sans-serif', fontWeight: 500,
        fontSize: mobile ? 22 : 28, letterSpacing: '-0.02em',
        color: 'white', margin: 0, marginBottom: mobile ? 32 : 48,
      }}>Zwei Wege zum richtigen Event.</h3>

      {/* Entry */}
      <div style={{ maxWidth: mobile ? '100%' : 280, margin: '0 auto' }}>
        <StepCard stepKey="landing" mobile={mobile} badge="Start"/>
      </div>

      <ArrowDown/>

      {/* Decision */}
      <DecisionNode mobile={mobile}/>

      <div style={{ display: 'flex', justifyContent: 'center', position: 'relative', height: 36 }}>
        <BranchSplit/>
      </div>

      {/* Two branches */}
      <div style={{
        display: 'grid',
        gridTemplateColumns: '1fr 1fr',
        gap: mobile ? 12 : 32,
        alignItems: 'start',
      }}>
        {/* Left: Browse */}
        <div>
          <BranchLabel text="Nein — ich browse"/>
          <StepCard stepKey="entdecken" mobile={mobile}/>
        </div>

        {/* Right: Funnel */}
        <div>
          <BranchLabel text="Ja — schlag mir vor"/>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 0 }}>
            <StepCard stepKey="wann" mobile={mobile}/>
            <ArrowDown height={20}/>
            <StepCard stepKey="was" mobile={mobile}/>
            <ArrowDown height={20}/>
            <StepCard stepKey="wer" mobile={mobile}/>
            <ArrowDown height={20}/>
            <StepCard stepKey="resultate" mobile={mobile}/>
          </div>
        </div>
      </div>

      <div style={{ display: 'flex', justifyContent: 'center', position: 'relative', height: 36, marginTop: 12 }}>
        <BranchMerge/>
      </div>

      {/* Converged steps */}
      <div style={{ maxWidth: mobile ? '100%' : 280, margin: '0 auto', display: 'flex', flexDirection: 'column', gap: 0 }}>
        <StepCard stepKey="detail" mobile={mobile}/>
        <ArrowDown/>
        <StepCard stepKey="save" mobile={mobile}/>
        <ArrowDown/>
        <StepCard stepKey="spots" mobile={mobile} badge="Ziel"/>
      </div>
    </div>
  );
}

function BranchSplit() {
  return (
    <svg width="100%" height="36" viewBox="0 0 200 36" preserveAspectRatio="none" aria-hidden="true">
      <path d="M100 0 L100 12 L40 30 L40 36 M100 12 L160 30 L160 36" stroke={TERRA} strokeWidth="1.6" fill="none" strokeLinecap="round" strokeLinejoin="round"/>
      <polygon points="36,30 40,36 44,30" fill={TERRA}/>
      <polygon points="156,30 160,36 164,30" fill={TERRA}/>
    </svg>
  );
}

function BranchMerge() {
  return (
    <svg width="100%" height="36" viewBox="0 0 200 36" preserveAspectRatio="none" aria-hidden="true">
      <path d="M40 0 L40 6 L100 24 L100 36 M160 0 L160 6 L100 24" stroke={TERRA} strokeWidth="1.6" fill="none" strokeLinecap="round" strokeLinejoin="round"/>
      <polygon points="96,32 100,36 104,32" fill={TERRA}/>
    </svg>
  );
}
