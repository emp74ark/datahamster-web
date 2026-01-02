import { Event, FilterParams, Paginated } from '@/types/types';
import { graphqlClient } from '@/lib/graphql-client';
import { gql } from '@apollo/client';

export async function loadEvents<T extends string | undefined>({
  id,
  filter,
}: {
  id?: T;
  filter?: FilterParams & { actionId?: string };
}): Promise<
  T extends string ? Event | undefined : Paginated<Event> | undefined
> {
  try {
    if (id) {
      const { data } = await graphqlClient.query<{ event: Event }>({
        query: gql`
          query Event($id: String!) {
            event(id: $id) {
              id
              ip
              localTime
              createdAt
            }
          }
        `,
        variables: { id },
      });
      return data?.event as T extends string ? Event : never;
    }

    const { actionId, ...pagination } = filter || {};
    const { data } = await graphqlClient.query<{ events: Paginated<Event> }>({
      query: gql`
        query Events($actionId: String, $pagination: PaginationInput!) {
          events(actionId: $actionId, pagination: $pagination) {
            total
            results {
              id
              ip
              localTime
              createdAt
              data
            }
          }
        }
      `,
      variables: { pagination, actionId },
    });
    return data?.events as T extends string ? never : Paginated<Event>;
  } catch (e) {
    console.error('Error loading action(s): ', e);
  }
}
