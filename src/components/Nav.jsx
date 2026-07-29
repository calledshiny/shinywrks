import StarSignet from './StarSignet';
import { useMobile } from '../hooks/useMobile';
import { useLang } from '../i18n';

const CROSS_CURSOR = 'none';

function LangToggle({ mobile }) {
  const { lang, setLang } = useLang();
  return (
    <div style={{ display: 'flex', alignItems: 'center', gap: 4 }}>
      {['de', 'en'].map((l, i) => (
        <span key={l} style={{ display: 'flex', alignItems: 'center', gap: 4 }}>
          {i === 1 && <span style={{ color: '#C4B8A4', fontFamily: 'Space Mono, monospace', fontSize: mobile ? 10 : 11 }}>/</span>}
          <button
            onClick={() => setLang(l)}
            className={`lang-btn${lang === l ? ' active' : ''}`}
            aria-pressed={lang === l}
          >{l.toUpperCase()}</button>
        </span>
      ))}
    </div>
  );
}

export default function Nav({ page, onNav }) {
  const mobile = useMobile();
  const { t } = useLang();
  return (
    <nav className="fu" style={{
      position: 'fixed', top: 0, left: 0, right: 0, zIndex: 1000,
      display: 'flex', alignItems: 'center', justifyContent: 'space-between',
      padding: mobile ? '14px 20px' : '18px 48px',
      borderBottom: '1px solid rgba(232,226,214,0.8)',
      background: 'rgba(245,243,239,0.88)',
      backdropFilter: 'blur(12px)',
      WebkitBackdropFilter: 'blur(12px)',
    }}>
      <button className="nav-logo-btn" onClick={() => onNav('home')} style={{
        display: 'flex', alignItems: 'center', gap: 10,
        background: 'none', border: 'none', cursor: CROSS_CURSOR, padding: 0,
        position: 'relative',
      }}>
        <StarSignet size={mobile ? 22 : 28}/>
      </button>
      <div style={{ display: 'flex', gap: mobile ? 18 : 40, alignItems: 'center' }}>
        <button
          onClick={() => onNav('home')}
          className={`nav-link${page === 'home' || page === 'project' ? ' active' : ''}`}
        >{t('navProjects')}</button>
        <button
          onClick={() => onNav('contact')}
          className={`nav-link${page === 'contact' ? ' active' : ''}`}
        >{t('navContact')}</button>
        <span style={{ width: 1, height: 14, background: '#E8E2D6', display: 'inline-block' }}/>
        <LangToggle mobile={mobile}/>
      </div>
    </nav>
  );
}
