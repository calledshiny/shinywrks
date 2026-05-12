import StarSignet from './StarSignet';
import { useMobile } from '../hooks/useMobile';

const CROSS_CURSOR = 'none';

export default function Nav({ page, onNav }) {
  const mobile = useMobile();
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
      <div style={{ display: 'flex', gap: mobile ? 24 : 40, alignItems: 'center' }}>
        <button
          onClick={() => onNav('home')}
          className={`nav-link${page === 'home' || page === 'project' ? ' active' : ''}`}
        >Projekte</button>
        <button
          onClick={() => onNav('contact')}
          className={`nav-link${page === 'contact' ? ' active' : ''}`}
        >Kontakt</button>
      </div>
    </nav>
  );
}
