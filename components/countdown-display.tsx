'use client';

import { useEffect, useState } from 'react';
import { formatCountdown } from '@/lib/utils';

export function CountdownDisplay({ net }: { net: string }) {
  const [display, setDisplay] = useState(() => formatCountdown(net));

  useEffect(() => {
    const tick = () => setDisplay(formatCountdown(net));
    tick();
    const id = setInterval(tick, 1000);
    return () => clearInterval(id);
  }, [net]);

  return <>{display}</>;
}
