import { useMobile } from '../hooks/useMobile';

const TERRA = '#B07050';
const FG = '#FFFFFF';
const FG_DIM = 'rgba(255,255,255,0.60)';
const FG_MUTED = 'rgba(255,255,255,0.40)';
const CITY_BG = 'radial-gradient(ellipse at 30% 30%, #5a3320 0%, #2a160d 45%, #0a0a0d 100%)';

function Logo({ size = 56 }) {
  return (
    <div style={{ display: 'inline-flex', alignItems: 'center', gap: size * 0.18 }}>
      <span style={{
        width: size * 0.18, height: size * 0.18, borderRadius: '50%',
        background: TERRA, display: 'inline-block',
        boxShadow: `0 0 ${size * 0.35}px ${TERRA}66`,
      }}/>
      <span style={{ fontFamily: 'Lora, serif', fontWeight: 400, fontSize: size, letterSpacing: '-0.02em', lineHeight: 1, color: FG }}>
        spot<span style={{ color: TERRA }}>right</span>
      </span>
    </div>
  );
}

function ColorChip({ swatchBg, swatchBorder, name, value }) {
  return (
    <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
      <span style={{
        width: 36, height: 36, borderRadius: 8,
        background: swatchBg,
        border: swatchBorder ? `1px solid ${swatchBorder}` : 'none',
        flexShrink: 0,
      }}/>
      <div style={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
        <span style={{ fontFamily: 'DM Sans, sans-serif', fontWeight: 500, fontSize: 13, color: FG, lineHeight: 1.2 }}>{name}</span>
        <span style={{ fontFamily: 'Space Mono, monospace', fontSize: 10, letterSpacing: '0.04em', color: FG_MUTED, lineHeight: 1.2 }}>{value}</span>
      </div>
    </div>
  );
}

function GlassPill({ label, bg, border, blur }) {
  return (
    <span style={{
      display: 'inline-flex', alignItems: 'center',
      fontFamily: 'DM Sans, sans-serif', fontWeight: 500, fontSize: 12, letterSpacing: '0.04em',
      padding: '8px 14px', borderRadius: 999,
      background: bg,
      border: `1px solid ${border}`,
      borderTopColor: 'rgba(255,255,255,0.35)',
      backdropFilter: blur,
      WebkitBackdropFilter: blur,
      color: FG,
    }}>{label}</span>
  );
}

function Block({ label, children }) {
  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
      <span style={{ fontFamily: 'Space Mono, monospace', fontSize: 10, letterSpacing: '0.18em', textTransform: 'uppercase', color: TERRA }}>{label}</span>
      {children}
    </div>
  );
}

export default function SpotrightDesignSystem() {
  const mobile = useMobile();

  return (
    <div style={{
      background: CITY_BG,
      padding: mobile ? '32px 20px' : '56px 48px',
      color: FG,
      position: 'relative',
      overflow: 'hidden',
    }}>
      <div style={{
        position: 'absolute', inset: 0,
        background: 'radial-gradient(circle at 78% 18%, rgba(255,200,140,0.10) 0%, transparent 35%), radial-gradient(circle at 12% 82%, rgba(176,112,80,0.12) 0%, transparent 40%)',
        pointerEvents: 'none',
      }}/>

      <div style={{ position: 'relative', display: 'flex', flexDirection: 'column', gap: mobile ? 40 : 56 }}>
        {/* BRAND */}
        <Block label="Brand">
          <Logo size={mobile ? 44 : 60}/>
        </Block>

        {/* COLORS */}
        <Block label="Colors">
          <div style={{
            display: 'grid',
            gridTemplateColumns: mobile ? 'repeat(2, 1fr)' : 'repeat(4, auto)',
            columnGap: mobile ? 16 : 40,
            rowGap: 16,
            justifyContent: 'start',
          }}>
            <ColorChip name="Terra" value="#B07050" swatchBg={TERRA}/>
            <ColorChip name="Text" value="#FFFFFF" swatchBg="#FFFFFF"/>
            <ColorChip name="Muted" value="rgba 0.60" swatchBg="rgba(255,255,255,0.60)" swatchBorder="rgba(255,255,255,0.15)"/>
            <ColorChip name="Night" value="#0A0A0D" swatchBg="#0A0A0D" swatchBorder="rgba(255,255,255,0.15)"/>
          </div>
        </Block>

        {/* TYPE */}
        <Block label="Type">
          <div style={{
            display: 'grid',
            gridTemplateColumns: mobile ? '1fr' : '1fr 1fr',
            gap: mobile ? 24 : 48,
          }}>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
              <span style={{ fontFamily: 'Lora, serif', fontSize: mobile ? 36 : 48, lineHeight: 1, color: FG, letterSpacing: '-0.02em' }}>Lora</span>
              <span style={{ fontFamily: 'Space Mono, monospace', fontSize: 10, letterSpacing: '0.14em', textTransform: 'uppercase', color: FG_MUTED }}>Logo · Hero · Section Titles</span>
              <span style={{ fontFamily: 'Lora, serif', fontSize: 16, color: FG_DIM, marginTop: 2 }}>Die Stadt. Jetzt.</span>
            </div>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
              <span style={{ fontFamily: 'DM Sans, sans-serif', fontWeight: 500, fontSize: mobile ? 36 : 48, lineHeight: 1, color: FG }}>DM Sans</span>
              <span style={{ fontFamily: 'Space Mono, monospace', fontSize: 10, letterSpacing: '0.14em', textTransform: 'uppercase', color: FG_MUTED }}>UI · Buttons · Pills · Body</span>
              <span style={{ fontFamily: 'DM Sans, sans-serif', fontWeight: 300, fontSize: 16, color: FG_DIM, marginTop: 2 }}>Was geht heute?</span>
            </div>
          </div>
        </Block>

        {/* GLASS MATERIAL */}
        <Block label="Glass Material">
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: 10 }}>
            <GlassPill label="Light" bg="rgba(255,255,255,0.12)" border="rgba(255,255,255,0.20)" blur="blur(20px) saturate(1.8)"/>
            <GlassPill label="Warm" bg="rgba(176,112,80,0.30)" border="rgba(176,112,80,0.50)" blur="blur(20px) saturate(1.8)"/>
            <GlassPill label="Dark" bg="rgba(0,0,0,0.40)" border="rgba(255,255,255,0.12)" blur="blur(24px)"/>
          </div>
        </Block>
      </div>
    </div>
  );
}
