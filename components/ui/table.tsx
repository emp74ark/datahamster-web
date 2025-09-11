import { PropsWithChildren } from 'react';
import { cn } from '@/lib';

type TableProps = {
  columns?: number;
};

function Table({ children }: PropsWithChildren) {
  return <div className="w-full rounded-sm overflow-hidden">{children}</div>;
}

function TableHeader({ children, columns }: PropsWithChildren<TableProps>) {
  return (
    <div
      className={cn('grid grid-cols-2 bg-accent p-2', `grid-cols-${columns}`)}
    >
      {children}
    </div>
  );
}

function TableRow({ children, columns }: PropsWithChildren<TableProps>) {
  return (
    <div
      className={cn('grid grid-cols-2 p-2 border-b-1', `grid-cols-${columns}`)}
    >
      {children}
    </div>
  );
}

export { Table, TableHeader, TableRow };
