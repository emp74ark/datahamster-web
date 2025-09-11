import { PropsWithChildren } from 'react';
import { getServerSession } from 'next-auth';
import { redirect } from 'next/navigation';
import LogoutButton from '@/components/ui/logout-button';
import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
} from '@/components/ui/navigation-menu';
import Link from 'next/link';
import { authOptions } from '@/lib';

type LayoutProps = {};

export default async function Layout(props: PropsWithChildren<LayoutProps>) {
  const session = await getServerSession(authOptions);
  if (!session) {
    redirect('/auth/login');
  }
  return (
    <>
      <NavigationMenu viewport={false} className="w-auto mx-auto mb-2">
        <NavigationMenuList>
          <NavigationMenuItem>
            <NavigationMenuLink asChild>
              <Link href="/dashboard">Dashboard</Link>
            </NavigationMenuLink>
          </NavigationMenuItem>
          <NavigationMenuItem>
            <NavigationMenuLink asChild>
              <Link href="/sources">Sources</Link>
            </NavigationMenuLink>
          </NavigationMenuItem>
          <NavigationMenuItem>
            <NavigationMenuTrigger>User</NavigationMenuTrigger>
            <NavigationMenuContent>
              <NavigationMenuLink asChild>
                <Link href="/profile">Profile</Link>
              </NavigationMenuLink>
              <LogoutButton />
            </NavigationMenuContent>
          </NavigationMenuItem>
        </NavigationMenuList>
      </NavigationMenu>
      {props.children}
    </>
  );
}
