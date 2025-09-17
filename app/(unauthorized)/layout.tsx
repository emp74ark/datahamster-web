import { PropsWithChildren } from 'react';
import { getServerSession } from 'next-auth';
import { redirect } from 'next/navigation';
import { authOptions } from '@/lib';
import NavBar from '@/components/widgets/nav-bar';
import Header from '@/components/ui/header';

export default async function Layout({ children }: PropsWithChildren) {
  const session = await getServerSession(authOptions);
  if (session) {
    redirect('/dashboard');
  }
  return (
    <>
      <Header>
        <NavBar authorized={false} />
      </Header>
      <div className="content-center">{children}</div>
    </>
  );
}
