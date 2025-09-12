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
      <body className="bg-background text-foreground min-h-screen">
        <main className="container p-4 min-h-screen grid grid-rows-[auto_1fr] gap-4  mx-auto">
          <Providers>{children}</Providers>
        </main>
      </body>
    </html>
  );
}
