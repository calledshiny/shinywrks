import { useEffect, useRef } from 'react';
import { useMobile } from '../hooks/useMobile';

const AUTOSCROLL_SPEED = 55;
const AUTOSCROLL_MAX = 260;
const AUTOSCROLL_DELAY = 400;

export default function WebsiteFrame({ src, alt = '', height }) {
  const mobile = useMobile();
  const h = height || (mobile ? '70vh' : '80vh');
  const ref = useRef(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    let rafId = null;
    let startTs = null;
    let lastScroll = 0;
    let cancelled = false;
    let started = false;

    const cancel = () => {
      cancelled = true;
      if (rafId != null) cancelAnimationFrame(rafId);
      el.removeEventListener('wheel', cancel);
      el.removeEventListener('touchstart', cancel);
      el.removeEventListener('pointerdown', cancel);
      el.removeEventListener('scroll', onUserScroll);
    };

    const onUserScroll = () => {
      if (Math.abs(el.scrollTop - lastScroll) > 4) cancel();
    };

    const tick = (ts) => {
      if (cancelled) return;
      if (startTs == null) startTs = ts;
      const elapsed = (ts - startTs) / 1000;
      const target = Math.min(elapsed * AUTOSCROLL_SPEED, AUTOSCROLL_MAX);
      el.scrollTop = target;
      lastScroll = el.scrollTop;
      if (target < AUTOSCROLL_MAX) {
        rafId = requestAnimationFrame(tick);
      } else {
        cancel();
      }
    };

    const start = () => {
      if (started || cancelled) return;
      started = true;
      el.addEventListener('wheel', cancel, { passive: true });
      el.addEventListener('touchstart', cancel, { passive: true });
      el.addEventListener('pointerdown', cancel, { passive: true });
      el.addEventListener('scroll', onUserScroll, { passive: true });
      rafId = requestAnimationFrame(tick);
    };

    const io = new IntersectionObserver((entries) => {
      entries.forEach(e => {
        if (e.isIntersecting && e.intersectionRatio > 0.3) {
          io.disconnect();
          setTimeout(start, AUTOSCROLL_DELAY);
        }
      });
    }, { threshold: [0.3] });
    io.observe(el);

    return () => {
      io.disconnect();
      cancel();
    };
  }, []);

  return (
    <div style={{ width: '100%' }}>
      <div
        ref={ref}
        style={{
          width: '100%',
          height: h,
          overflowY: 'auto',
          overflowX: 'hidden',
          WebkitOverflowScrolling: 'touch',
          background: '#0D0B08',
        }}
      >
        <img
          src={src}
          alt={alt}
          style={{ width: '100%', height: 'auto', display: 'block' }}
        />
      </div>
    </div>
  );
}
