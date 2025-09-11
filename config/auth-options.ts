import { AuthOptions, User } from 'next-auth';
import CredentialsProvider from 'next-auth/providers/credentials';
import { login } from '@/config/username';

export const authOptions: AuthOptions = {
  providers: [
    CredentialsProvider({
      name: 'Username & Password',
      credentials: {
        username: { label: 'Username', type: 'text' },
        password: { label: 'Password', type: 'password' },
      },
      async authorize(credentials) {
        if (!credentials?.username || !credentials?.password) {
          throw new Error('Missing credentials');
        }

        const data = await login({
          username: credentials.username,
          password: credentials.password,
        });

        if (data['message'] && data['error']) {
          throw new Error(data['message']);
        }

        return {
          email: data.email,
          name: data.username,
        } as User;
      },
    }),
  ],
};
