export const DATA_URL = new URL(
  process.env.NEXTDATA_URL || 'http://localhost:3700'
);

export const AUTH_URL = new URL(
  process.env.NEXTAUTH_URL || 'http://localhost:3700/auth'
);

export const DEFAULT_HEADERS = { 'Content-Type': 'application/json' };
