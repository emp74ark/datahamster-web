import { Event, FilterParams, Paginated } from '@/types/types';
import { DATA_URL, setCookieToHeaders } from '@/lib';

export async function loadEvents<T extends string | undefined>({
  id,
  filter,
}: {
  id?: T;
  filter?: FilterParams;
}): Promise<
  T extends string ? Event | undefined : Paginated<Event> | undefined
> {
  try {
    const headers = await setCookieToHeaders('datahamster.sid');
    const url = new URL('event', DATA_URL);
    if (filter) {
      for (const key in filter) {
        const value = filter[key];
        if (!value) continue;
        url.searchParams.append(key, value.toString());
      }
    }
    if (id) {
      url.pathname += `/${id}`;
    }
    const response = await fetch(url, {
      headers,
      credentials: 'include',
    });
    if (!response.ok) {
      throw new Error('Failed to fetch actions');
    }
    return response.json();
  } catch (e) {
    console.error('Error loading actions: ', e);
  }
}
