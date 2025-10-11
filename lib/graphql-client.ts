import { ApolloClient, HttpLink, InMemoryCache } from '@apollo/client';
import { GRAPHQL_URL } from '@/lib/constants';

export function graphqlClient() {
  return new ApolloClient({
    link: new HttpLink({ uri: GRAPHQL_URL.href }),
    cache: new InMemoryCache(),
  });
}
