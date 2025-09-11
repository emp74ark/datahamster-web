import { PropsWithChildren } from 'react';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/config/auth-options';
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

type LayoutProps = {};

export default async function Layout(props: PropsWithChildren<LayoutProps>) {
  const session = await getServerSession(authOptions);
  if (!session) {
    redirect('/auth/login');
  }
  return (
    <div>
      <NavigationMenu>
        <NavigationMenuList>
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
    </div>
  );
}
