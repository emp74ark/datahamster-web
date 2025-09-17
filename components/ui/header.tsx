import { PropsWithChildren } from 'react';

export default function Header({ children }: PropsWithChildren) {
  return (
    <header className="w-auto mx-auto px-6 py-2 rounded-b-lg bg-background sticky top-0">
      {children}
    </header>
  );
}
