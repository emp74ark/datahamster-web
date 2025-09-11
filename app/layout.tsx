import type { Metadata } from 'next';
import './globals.css';
import { PropsWithChildren } from 'react';
import Providers from '@/app/providers';

export const metadata: Metadata = {
  title: 'DataHamster',
  description: 'App for collecting data',
};

export default async function RootLayout({ children }: PropsWithChildren) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className="bg-background text-foreground">
        <main className="container mx-auto py-4">
          <Providers>{children}</Providers>
        </main>
      </body>
    </html>
  );
}
