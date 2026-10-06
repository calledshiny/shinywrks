import { useMobile } from '../hooks/useMobile';
import { useLang } from '../i18n';

// Stand: brand-system.md in spotright-marketing (28.09.2026). Signal hat Terra am 21.09. ersetzt.
const SIGNAL = '#F53702';
const GROUND = '#171110';
const INK = '#F4EFE6';
const MUTED = '#A49C8F';
const LINE = '#3F3937';
const BRICOLAGE = "'Bricolage Grotesque', sans-serif";

const COLORS = [
  { name: 'Signal', value: '#F53702' },
  { name: 'Signal Deep', value: '#C42B00' },
  { name: 'Ground', value: '#171110', border: true },
  { name: 'Surface', value: '#201A18', border: true },
  { name: 'Ink', value: '#F4EFE6' },
  { name: 'Paper', value: '#F0E7D9' },
  { name: 'Muted', value: '#A49C8F' },
  { name: 'Mint', value: '#4ADE80', note: { de: 'nur „läuft gerade“', en: "only 'live now'" } },
];

function ColorChip({ name, value, border, note, lang }) {
  return (
    <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
      <span style={{ width: 36, height: 36, borderRadius: 8, background: value, border: border ? `1px solid ${LINE}` : 'none', flexShrink: 0 }}/>
      <div style={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
        <span style={{ fontFamily: 'DM Sans, sans-serif', fontWeight: 500, fontSize: 13, color: INK, lineHeight: 1.2 }}>{name}</span>
        <span style={{ fontFamily: 'Space Mono, monospace', fontSize: 10, letterSpacing: '0.04em', color: MUTED, lineHeight: 1.2 }}>{value}{note ? ` · ${note[lang]}` : ''}</span>
      </div>
    </div>
  );
}

function Block({ label, children }) {
  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
      <span style={{ fontFamily: 'Space Mono, monospace', fontSize: 10, letterSpacing: '0.18em', textTransform: 'uppercase', color: SIGNAL }}>{label}</span>
      {children}
    </div>
  );
}

function TypeSpecimen({ family, weight, name, use, sample, mobile }) {
  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
      <span style={{ fontFamily: family, fontWeight: weight, fontSize: mobile ? 36 : 48, lineHeight: 1, color: INK, letterSpacing: '-0.02em' }}>{name}</span>
      <span style={{ fontFamily: 'Space Mono, monospace', fontSize: 10, letterSpacing: '0.14em', textTransform: 'uppercase', color: MUTED }}>{use}</span>
      <span style={{ fontFamily: family, fontWeight: weight === 500 && family === BRICOLAGE ? 600 : 400, fontSize: 18, color: INK, marginTop: 2 }}>{sample}</span>
    </div>
  );
}

export default function SpotrightDesignSystem() {
  const mobile = useMobile();
  const { lang } = useLang();
  const en = lang === 'en';

  return (
    <div style={{ background: GROUND, padding: mobile ? '32px 20px' : '56px 48px', color: INK, position: 'relative', overflow: 'hidden' }}>
      <div style={{ position: 'relative', display: 'flex', flexDirection: 'column', gap: mobile ? 40 : 56 }}>
        <Block label="Logo">
          <div style={{ display: 'flex', alignItems: 'center', flexWrap: 'wrap', gap: mobile ? 24 : 48 }}>
            <img src="spotright/brand/wortmarke.svg" alt="spotright" style={{ height: mobile ? 40 : 60, width: 'auto', display: 'block' }}/>
            <img src="spotright/brand/signet.svg" alt="" style={{ height: mobile ? 44 : 60, width: 'auto', display: 'block' }}/>
            <img src="spotright/brand/appicon.webp" alt="App Icon" style={{ height: mobile ? 56 : 76, width: 'auto', borderRadius: '22%', display: 'block' }}/>
          </div>
        </Block>

        <Block label="Colors">
          <div style={{ display: 'grid', gridTemplateColumns: mobile ? 'repeat(2, 1fr)' : 'repeat(4, auto)', columnGap: mobile ? 16 : 40, rowGap: 16, justifyContent: 'start' }}>
            {COLORS.map(c => <ColorChip key={c.name} {...c} lang={en ? 'en' : 'de'}/>)}
          </div>
        </Block>

        <Block label="Type">
          <div style={{ display: 'grid', gridTemplateColumns: mobile ? '1fr' : '1fr 1fr', gap: mobile ? 24 : 48 }}>
            <TypeSpecimen
              family={BRICOLAGE} weight={500} name="Bricolage Grotesque" mobile={mobile}
              use={en ? 'Wordmark Medium · Headlines SemiBold' : 'Wortmarke Medium · Headlines SemiBold'}
              sample={en ? "What's on in Hof today?" : 'Was geht heute in Hof?'}
            />
            <TypeSpecimen
              family="DM Sans, sans-serif" weight={500} name="DM Sans" mobile={mobile}
              use={en ? 'UI · Body · 300 to 500' : 'UI · Text · 300 bis 500'}
              sample={en ? 'Everything on today. In one place.' : 'Alles, was heute läuft. An einem Ort.'}
            />
          </div>
        </Block>
      </div>
    </div>
  );
}
