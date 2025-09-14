'use client';

import { statsEvents } from '@/lib';
import { useStatsEvent } from '@/hooks/use-stats-event';

type StatsEventProps = {
  scope: keyof typeof statsEvents;
};

export default function StatsEvent({ scope }: StatsEventProps) {
  useStatsEvent(scope);
  return null;
}
