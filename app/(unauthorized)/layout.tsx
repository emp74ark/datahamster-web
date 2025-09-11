import { PropsWithChildren } from 'react';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/config/auth-options';
import { redirect } from 'next/navigation';

type LayoutProps = {};

export default async function Layout(props: PropsWithChildren<LayoutProps>) {
  const session = await getServerSession(authOptions);
  if (session) {
    redirect('/dashboard');
  }
  return <div>{props.children}</div>;
}
