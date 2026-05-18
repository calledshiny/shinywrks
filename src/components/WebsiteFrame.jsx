import { useMobile } from '../hooks/useMobile';

export default function WebsiteFrame({ src, alt = '', height }) {
  const mobile = useMobile();
  const h = height || (mobile ? '70vh' : '80vh');
  return (
    <div style={{ width: '100%' }}>
      <div style={{
        width: '100%',
        height: h,
        overflowY: 'auto',
        overflowX: 'hidden',
        WebkitOverflowScrolling: 'touch',
        background: '#0D0B08',
      }}>
        <img
          src={src}
          alt={alt}
          style={{ width: '100%', height: 'auto', display: 'block' }}
        />
      </div>
    </div>
  );
}
