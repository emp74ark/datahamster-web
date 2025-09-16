'use client';

import { useEffect } from 'react';
import { sendStatsEvent, statsEvents } from '@/lib';

export function useStatsEvent(scope: keyof typeof statsEvents) {
  useEffect(() => {
    if (typeof window === 'undefined') return;
    sendStatsEvent(scope);
  }, [scope]);
}
