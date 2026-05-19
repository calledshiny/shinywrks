import { useMobile } from '../hooks/useMobile';

const COLORS = [
  '#E56F89',
  '#3E4843',
  '#ECEBE2',
  '#8A7666',
  '#84AFB0',
];

export default function MyndfulColors() {
  const m = useMobile();
  const size = m ? 96 : 180;
  const gap = m ? 14 : 24;
  return (
    <div style={{
      display: 'flex',
      flexWrap: 'wrap',
      justifyContent: 'center',
      gap,
      padding: m ? '0 16px' : '0 48px'
    }}>
      {COLORS.map((c) => (
        <div key={c} style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 10 }}>
          <div style={{ width: size, height: size, borderRadius: m ? 18 : 28, background: c }}/>
          <span style={{ fontFamily: 'Space Mono, monospace', fontSize: m ? 10 : 11, letterSpacing: '0.12em', color: '#3D3428' }}>{c}</span>
        </div>
      ))}
    </div>
  );
}
