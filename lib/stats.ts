export const statsEvents: Record<string, string> = {
  startPage: '9113f90b-0970-4361-a901-710f84356691',
  dashboard: '6dfc9788-dbb0-4c0a-9e24-dfc2a2ce30c0',
};

export async function sendStatsEvent(event: keyof typeof statsEvents) {
  try {
    const lastEventName = `stats-${event}`;
    const lastStatsEvent = localStorage.getItem(lastEventName);
    const today = new Date().toISOString().split('T')[0];
    if (lastStatsEvent === today) {
      return;
    }
    const timestamp = Date.now();
    await fetch(
      `/api/stats/add?id=${statsEvents[event]}&timestamp=${timestamp}`,
      {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
        },
      }
    );
    localStorage.setItem(`stats-${event}`, today);
  } catch (e) {
    console.error('Error sending event: ', e);
  }
}
