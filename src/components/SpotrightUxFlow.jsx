import { Fragment } from 'react';
import { useMobile } from '../hooks/useMobile';

const TERRA = '#B07050';

const mainPath = [
  { num: '1', title: 'Landing', sub: 'STADT + KATEGORIE' },
  { num: '2', title: 'Entdecken', sub: 'KURATIERTE LISTE' },
  { num: '3', title: 'Event Detail', sub: 'INFO + AKTIONEN' },
  { num: '4', title: 'Save', sub: 'BOOKMARK' },
  { num: '5', title: 'Meine Spots', sub: 'GESPEICHERT' },
];

const altPath = [
  { num: 'A', title: 'Wann?', sub: 'JETZT / HEUTE / WOCHE' },
  { num: 'B', title: 'Was?', sub: 'ROOFTOP / MUSIK / …' },
  { num: 'C', title: 'Wer?', sub: 'GRUPPE / 18+ / …' },
  { num: '✓', title: 'Resultate', sub: 'PERSONALISIERT' },
];

export default function SpotrightUxFlow() {
  const mobile = useMobile();
  return (
    <div style={{
      background: 'radial-gradient(ellipse at 50% 30%, #3a1f14 0%, #1a0f0a 55%, #0a0a0d 100%)',
      padding: mobile ? '36px 20px' : '64px 56px',
      position: 'relative',
      overflow: 'hidden',
      color: 'white',
    }}>
      <FlowGroup label="USER FLOW" title="Vom Hero zur Auswahl." steps={mainPath} mobile={mobile} />
      <div style={{ height: 1, background: 'rgba(255,255,255,0.08)', margin: mobile ? '40px 0' : '56px 0' }} />
      <FlowGroup label="ALTERNATIVE PATH" title="Für dich — Stepwise Funnel" steps={altPath} mobile={mobile} />
    </div>
  );
}

function FlowGroup({ label, title, steps, mobile }) {
  return (
    <div>
      <div style={{
        fontFamily: 'Space Mono, monospace', fontSize: 11, letterSpacing: '0.14em',
        textTransform: 'uppercase', color: 'rgba(255,255,255,0.55)', marginBottom: 10,
      }}>{label}</div>
      <h3 style={{
        fontFamily: 'Space Grotesk, sans-serif', fontWeight: 500,
        fontSize: mobile ? 22 : 28, letterSpacing: '-0.02em',
        color: 'white', margin: 0, marginBottom: mobile ? 28 : 36,
      }}>{title}</h3>
      <div style={{
        display: 'flex',
        flexDirection: mobile ? 'column' : 'row',
        alignItems: 'stretch',
        gap: mobile ? 0 : 8,
      }}>
        {steps.map((s, i) => (
          <Fragment key={i}>
            <StepBox {...s} mobile={mobile} />
            {i < steps.length - 1 && <Arrow mobile={mobile} />}
          </Fragment>
        ))}
      </div>
    </div>
  );
}

function StepBox({ num, title, sub, mobile }) {
  return (
    <div style={{
      flex: 1,
      padding: mobile ? '18px 18px 16px' : '24px 18px 18px',
      background: 'rgba(255,255,255,0.06)',
      border: '1px solid rgba(255,255,255,0.18)',
      borderTopColor: 'rgba(255,255,255,0.28)',
      borderRadius: 14,
      position: 'relative',
      minWidth: 0,
    }}>
      <div style={{
        position: 'absolute', top: -12, left: 14,
        width: 26, height: 26, borderRadius: '50%',
        background: TERRA, color: 'white',
        display: 'flex', alignItems: 'center', justifyContent: 'center',
        fontFamily: 'Space Mono, monospace', fontSize: 11, fontWeight: 700,
        boxShadow: '0 4px 12px rgba(176,112,80,0.45)',
      }}>{num}</div>
      <div style={{
        fontFamily: 'Space Grotesk, sans-serif', fontWeight: 500,
        fontSize: mobile ? 17 : 18,
        color: 'white', marginTop: 6, marginBottom: 6,
        letterSpacing: '-0.01em',
      }}>{title}</div>
      <div style={{
        fontFamily: 'Space Mono, monospace', fontSize: 9,
        letterSpacing: '0.14em',
        color: 'rgba(255,255,255,0.55)',
      }}>{sub}</div>
    </div>
  );
}

function Arrow({ mobile }) {
  return mobile ? (
    <div style={{ display: 'flex', justifyContent: 'center', padding: '12px 0', color: TERRA }}>
      <svg width="14" height="18" viewBox="0 0 14 18" aria-hidden="true">
        <path d="M7 0 L7 15 M2 11 L7 17 L12 11" stroke="currentColor" strokeWidth="1.6" fill="none" strokeLinecap="round" strokeLinejoin="round"/>
      </svg>
    </div>
  ) : (
    <div style={{ display: 'flex', alignItems: 'center', color: TERRA, flexShrink: 0 }}>
      <svg width="20" height="14" viewBox="0 0 20 14" aria-hidden="true">
        <path d="M0 7 L17 7 M13 2 L18 7 L13 12" stroke="currentColor" strokeWidth="1.6" fill="none" strokeLinecap="round" strokeLinejoin="round"/>
      </svg>
    </div>
  );
}
