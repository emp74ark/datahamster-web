import { PropsWithChildren } from 'react';

type TableProps = {
  columns?: number;
};

function Table({ children }: PropsWithChildren) {
  return <div className="w-full rounded-sm overflow-hidden">{children}</div>;
}

function TableHeader({ children, columns = 2 }: PropsWithChildren<TableProps>) {
  return (
    <div className={`grid grid-cols-${columns} bg-accent p-2`}>{children}</div>
  );
}

function TableRow({ children, columns = 2 }: PropsWithChildren<TableProps>) {
  return (
    <div className={`grid grid-cols-${columns} p-2 border-b-1`}>{children}</div>
  );
}

export { Table, TableHeader, TableRow };
