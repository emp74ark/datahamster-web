import { ReactNode, Suspense } from 'react';
import Loading from '@/app/loading';

type ActionLayoutProps = {
  children: ReactNode;
  actions: ReactNode;
};

export default function Layout({ children, actions }: ActionLayoutProps) {
  return (
    <section className="@container flex flex-row gap-5 w-full">
      <Suspense fallback={<Loading />}>
        <div className="bg-accent/50 px-4 py-5 rounded-md w-1/4">{children}</div>
        <div className="w-full">{actions}</div>
      </Suspense>
    </section>
  );
}
