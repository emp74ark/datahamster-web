import { ComponentProps } from 'react';
import { cn } from '@/lib';

function Table({ className, ...props }: ComponentProps<'table'>) {
  return (
    <table
      className={cn('w-full rounded-sm overflow-hidden', className)}
      {...props}
    />
  );
}

function TableBody({ className, ...props }: ComponentProps<'tbody'>) {
  return <tbody className={cn(className)} {...props} />;
}

function TableHeader({ className, ...props }: ComponentProps<'thead'>) {
  return <thead className={cn(className, 'bg-neutral-800/80')} {...props} />;
}

function TableRow({ className, ...props }: ComponentProps<'tr'>) {
  return (
    <tr
      className={cn('border-b-1 border-neutral-800 text-sm p-2', className)}
      {...props}
    />
  );
}

function TableHeaderCell({ className, ...props }: ComponentProps<'th'>) {
  return <th className={cn('p-2', className)} {...props} />;
}

function TableCell({ className, ...props }: ComponentProps<'td'>) {
  return <td className={cn('p-2', className)} {...props} />;
}

export { Table, TableBody, TableHeader, TableRow, TableHeaderCell, TableCell };
