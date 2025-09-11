'use client';

import { signOut } from 'next-auth/react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { NavigationMenuLink } from '@/components/ui/navigation-menu';

export default function LogoutButton() {
  const router = useRouter();
  async function logoutHandler() {
    await signOut({
      redirect: false,
    });
    router.push('/');
  }
  return (
    <NavigationMenuLink asChild>
      <Link href="#" onClick={logoutHandler}>
        Logout
      </Link>
    </NavigationMenuLink>
  );
}
