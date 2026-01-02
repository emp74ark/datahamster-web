import { ApolloClient, HttpLink, InMemoryCache } from '@apollo/client';
import { COOKIE_NAME, GRAPHQL_URL } from '@/lib/constants';
import { SetContextLink } from '@apollo/client/link/context';
import { getCookie } from '@/lib/auth';

const gqlLink = new HttpLink({
  uri: GRAPHQL_URL.href,
  credentials: 'include',
});

const authLink = new SetContextLink(async ({ headers }) => {
  const cookie = await getCookie(COOKIE_NAME);

  return {
    headers: {
      ...headers,
      cookie: `${COOKIE_NAME}=${cookie}`,
    },
  };
});

export const graphqlClient = new ApolloClient({
  link: authLink.concat(gqlLink),
  cache: new InMemoryCache(),
  ssrMode: false,
  defaultOptions: {
    query: {
      fetchPolicy: 'no-cache',
    },
  },
});
