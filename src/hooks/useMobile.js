import { useEffect, useState } from 'react';

export function useMobile() {
  const [m, setM] = useState(() => typeof window !== 'undefined' && window.matchMedia('(max-width: 720px)').matches);
  useEffect(() => {
    const mq = window.matchMedia('(max-width: 720px)');
    const onChange = () => setM(mq.matches);
    mq.addEventListener('change', onChange);
    return () => mq.removeEventListener('change', onChange);
  }, []);
  return m;
}
