import { useEffect, useRef } from 'react';

export default function IPhoneMockup({ src, type, screenBg = '#0a0a0d', height = '72vh', label, isActive = true, onEnded }) {
  const isVideo = type === 'video' || (typeof src === 'string' && /\.(mp4|webm|mov)$/i.test(src));
  const videoRef = useRef(null);

  useEffect(() => {
    const v = videoRef.current;
    if (!v) return;
    if (isActive) {
      try { v.currentTime = 0; } catch {}
      v.play().catch(() => {});
    } else {
      v.pause();
      try { v.currentTime = 0; } catch {}
    }
  }, [isActive, src]);

  return (
    <div className="iphone-mockup" style={{ '--iphone-h': height }}>
      <div className="iphone-screen" style={{ background: screenBg }}>
        {src && (isVideo ? (
          <video ref={videoRef} src={src} muted playsInline preload="auto"
            onEnded={onEnded}
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
