export default function IPhoneMockup({ src, type, screenBg = '#0a0a0d', height = '72vh', label }) {
  const isVideo = type === 'video' || (typeof src === 'string' && /\.(mp4|webm|mov)$/i.test(src));

  return (
    <div className="iphone-mockup" style={{ '--iphone-h': height }}>
      <div className="iphone-screen" style={{ background: screenBg }}>
        {src && (isVideo ? (
          <video src={src} autoPlay muted loop playsInline preload="auto"
            style={{ width: '100%', height: '100%', objectFit: 'cover', display: 'block' }} />
        ) : (
          <img src={src} alt={label || ''}
            style={{ width: '100%', height: '100%', objectFit: 'cover', display: 'block' }} />
        ))}
      </div>
      <div className="iphone-island" />
      <div className="iphone-side iphone-side-action" />
      <div className="iphone-side iphone-side-vol-up" />
      <div className="iphone-side iphone-side-vol-down" />
      <div className="iphone-side iphone-side-power" />
    </div>
  );
}
