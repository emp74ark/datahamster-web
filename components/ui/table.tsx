'use client';

import { Children, PropsWithChildren } from 'react';
import { cn } from '@/lib';

function Table({ children }: PropsWithChildren) {
  return <div className="w-full rounded-sm overflow-hidden">{children}</div>;
}

function TableHeader({ children }: PropsWithChildren) {
  const n = Children.count(children);
  return (
    <div className={cn('grid grid-cols-2 bg-accent p-2', `grid-cols-${n}`)}>
      {children}
    </div>
  );
}

function TableRow({ children }: PropsWithChildren) {
  const n = Children.count(children);
  return (
    <div className={cn('grid grid-cols-2 p-2 border-b-1', `grid-cols-${n}`)}>
      {children}
    </div>
  );
}

export { Table, TableHeader, TableRow };
