import StarSignet from './StarSignet';
import { useMobile } from '../hooks/useMobile';

const CROSS_CURSOR = 'none';

export default function Footer({ onNav }) {
  const mobile = useMobile();
  return (
    <footer style={{
      position: 'fixed', bottom: 0, left: 0, right: 0, zIndex: 999,
      padding: mobile ? '0 16px' : '0 48px',
      height: 32,
      borderTop: '1px solid #E8E2D6',
      background: 'rgba(245,243,239,0.92)',
      backdropFilter: 'blur(8px)',
      WebkitBackdropFilter: 'blur(8px)',
      display: 'flex', alignItems: 'center', justifyContent: 'space-between',
    }}>
      <button onClick={() => onNav('home')} style={{
        display: 'flex', alignItems: 'center', gap: 6,
        background: 'none', border: 'none', cursor: CROSS_CURSOR, padding: 0,
      }}>
        <StarSignet size={10}/>
        <span style={{ fontFamily: 'Space Mono, monospace', fontSize: 9, letterSpacing: '0.1em', textTransform: 'uppercase', color: '#C4B8A4' }}>shinywrks</span>
      </button>
      <div style={{ fontFamily: 'Space Mono, monospace', fontSize: 9, letterSpacing: '0.06em', display: 'flex', alignItems: 'center', gap: mobile ? 12 : 24 }}>
        {!mobile && <a href="mailto:justin@shinywrks.de" style={{ color: '#1A1209', textDecoration: 'none', letterSpacing: '0.04em' }}>justin<span style={{fontFamily: 'system-ui, sans-serif'}}>@</span>shinywrks.de</a>}
        {!mobile && <span style={{ color: '#E8E2D6' }}>|</span>}
        <a href="https://instagram.com/shinywrks" style={{
          textDecoration: 'none',
          background: 'linear-gradient(45deg, #f09433, #e6683c, #dc2743, #cc2366, #bc1888)',
          WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent',
          backgroundClip: 'text',
        }}>‌<span style={{fontFamily: 'system-ui, sans-serif'}}>@</span>shinywrks</a>
        <span style={{ color: '#E8E2D6' }}>|</span>
        <span style={{ color: '#C4B8A4', fontSize: 9, display: 'flex', alignItems: 'center', gap: 3 }}>
          <svg width="9" height="9" viewBox="0 0 10 10" style={{flexShrink: 0}}>
            <circle cx="5" cy="5" r="4.2" fill="none" stroke="#C4B8A4" strokeWidth="0.9"/>
            <text x="5" y="7.2" textAnchor="middle" fontFamily="system-ui,sans-serif" fontSize="5.5" fill="#C4B8A4">C</text>
          </svg>
          2026
        </span>
      </div>
    </footer>
  );
}
