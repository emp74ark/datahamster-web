import { PropsWithChildren } from 'react';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/config/auth-options';
import { redirect } from 'next/navigation';
import {
  NavigationMenu,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
} from '@/components/ui/navigation-menu';
import Link from 'next/link';

type LayoutProps = {};

export default async function Layout(props: PropsWithChildren<LayoutProps>) {
  const session = await getServerSession(authOptions);
  if (session) {
    redirect('/dashboard');
  }
  return (
    <>
      <NavigationMenu viewport={false} className="w-auto mx-auto mb-2">
        <NavigationMenuList>
          <NavigationMenuItem>
            <NavigationMenuLink asChild>
              <Link href="/">Start</Link>
            </NavigationMenuLink>
          </NavigationMenuItem>
          <NavigationMenuItem>
            <NavigationMenuLink asChild>
              <Link href="/auth/login">Login</Link>
            </NavigationMenuLink>
          </NavigationMenuItem>
          <NavigationMenuItem>
            <NavigationMenuLink asChild>
              <Link href="/auth/signup">Sign up</Link>
            </NavigationMenuLink>
          </NavigationMenuItem>
        </NavigationMenuList>
      </NavigationMenu>
      {props.children}
    </>
  );
}
