'use client';

import { useSession } from 'next-auth/react';

export default function Page() {
  const session = useSession();
  return (
    <ul>
      <li>Email, {session.data?.user?.email}</li>
      <li>Username, {session.data?.user?.name}</li>
    </ul>
  );
}
