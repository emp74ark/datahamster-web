export const DATA_URL = new URL(
  process.env.NEXTDATA_URL || 'http://localhost:3700'
);

export const GRAPHQL_URL = new URL('/graphql', DATA_URL);

export const AUTH_URL = new URL(
  process.env.NEXTAUTH_URL || 'http://localhost:3700/auth'
);

export const COOKIE_NAME =
  process.env.NEXTAUTH_COOKIE_NAME || 'datahamster.sid';

export const DEFAULT_HEADERS = { 'Content-Type': 'application/json' };
