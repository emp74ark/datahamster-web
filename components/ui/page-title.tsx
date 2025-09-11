import { PropsWithChildren } from 'react';

export default function PageTitle({ children }: PropsWithChildren) {
  return <h1 className="text-2xl mb-4">{children}</h1>;
}
