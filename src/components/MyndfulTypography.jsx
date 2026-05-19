import { useMobile } from '../hooks/useMobile';

export default function MyndfulTypography() {
  const m = useMobile();
  return (
    <div style={{ padding: m ? '0 16px' : '0 48px' }}>
      <div style={{ display: 'grid', gridTemplateColumns: m ? '1fr' : '1fr 1fr', gap: m ? 28 : 64, alignItems: 'start' }}>
        <Specimen italic={false} m={m} />
        <Specimen italic={true} m={m} />
      </div>
    </div>
  );
}

function Specimen({ italic, m }) {
  const label = italic ? 'Poppins SemiBold Italic' : 'Poppins SemiBold';
  return (
    <div style={{ textAlign: m ? 'center' : 'left' }}>
      <div style={{ fontFamily: 'Space Mono, monospace', fontSize: m ? 10 : 11, letterSpacing: '0.14em', textTransform: 'uppercase', color: '#3D3428', marginBottom: m ? 12 : 18 }}>{label}</div>
      <div style={{
        display: 'grid',
        gridTemplateColumns: m ? '1fr' : '180px 1fr',
        gap: m ? 8 : 28,
        alignItems: 'center',
        justifyItems: m ? 'center' : 'stretch'
      }}>
        <div style={{
          fontFamily: 'Poppins, sans-serif',
          fontWeight: 600,
          fontStyle: italic ? 'italic' : 'normal',
          fontSize: m ? 64 : 150,
          lineHeight: 1,
          color: '#0D0B08',
          letterSpacing: '-0.02em'
        }}>Aa</div>
        <div style={{
          fontFamily: 'Poppins, sans-serif',
          fontWeight: 600,
          fontStyle: italic ? 'italic' : 'normal',
          fontSize: m ? 11 : 13,
          lineHeight: 1.55,
          color: '#1A1209',
          textAlign: m ? 'center' : 'left'
        }}>
          The quick brown fox jumps over the lazy dog<br/>
          ABCDEFGHIJKLMNOPQRSTUVWXYZ<br/>
          abcdefghijklmnopqrstuvwxyz<br/>
          1234567890 .,&bdquo;&ldquo; $%?!@()
        </div>
      </div>
    </div>
  );
}
