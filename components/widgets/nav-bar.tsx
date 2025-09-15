import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
} from '@/components/ui/navigation-menu';
import Link from 'next/link';
import LogoutButton from '@/components/ui/logout-button';

type NavBarProps = {
  authorized: boolean;
};

const authNavLinks: { title: string; href: string }[] = [
  {
    title: 'Dashboard',
    href: '/dashboard',
  },
  {
    title: 'Sources',
    href: '/sources',
  },
  {
    title: 'Events',
    href: '/events?pageNumber=1&perPage=10',
  },
];

const unAuthNavLinks: { title: string; href: string }[] = [
  {
    title: 'Start',
    href: '/',
  },
  {
    title: 'Login',
    href: '/auth/login',
  },
  {
    title: 'Sign up',
    href: '/auth/signup',
  },
];

export default function NavBar({ authorized }: NavBarProps) {
  return (
    <NavigationMenu viewport={false} className="w-auto mx-auto mb-2">
      <NavigationMenuList>
        {(authorized ? authNavLinks : unAuthNavLinks).map(({ title, href }) => (
          <NavigationMenuItem key={title}>
            <NavigationMenuLink asChild>
              <Link href={href}>{title}</Link>
            </NavigationMenuLink>
          </NavigationMenuItem>
        ))}
        {authorized ? (
          <NavigationMenuItem>
            <NavigationMenuTrigger>User</NavigationMenuTrigger>
            <NavigationMenuContent>
              <NavigationMenuLink asChild>
                <Link href="/profile">Profile</Link>
              </NavigationMenuLink>
              <LogoutButton />
            </NavigationMenuContent>
          </NavigationMenuItem>
        ) : null}
      </NavigationMenuList>
    </NavigationMenu>
  );
}
