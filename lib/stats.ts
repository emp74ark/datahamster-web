export const statsEvents: Record<string, string> = {
  startPage: '0fc6aba9-b70d-4c7c-8b81-2757159f8b4b',
  dashboard: '82b67165-20e4-470a-a641-2b6a947c1220',
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
