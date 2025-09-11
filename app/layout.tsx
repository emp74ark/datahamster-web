import type { Metadata } from 'next';
import './globals.css';
import { PropsWithChildren } from 'react';
import Providers from '@/app/providers';

export const metadata: Metadata = {
  title: 'DataHamster',
  description: 'App for collecting data',
};

export default function RootLayout({ children }: PropsWithChildren) {
  return (
    <html lang="en">
      <body className="bg-background text-foreground">
        <main className="container mx-auto">
          <Providers>{children}</Providers>
        </main>
      </body>
    </html>
  );
}
