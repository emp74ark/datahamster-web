'use client';

import { ChangeEvent } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';

type PaginationSelectProps = {
  perPage: number;
};

const perPageOptions = [5, 10, 20, 50];

export default function PaginationSelect({ perPage }: PaginationSelectProps) {
  const searchParams = useSearchParams();
  const router = useRouter();

  async function handlePerPageChange(event: ChangeEvent<HTMLSelectElement>) {
    const value = event.target.value;
    const currentParams = new URLSearchParams(searchParams.toString());
    currentParams.set('perPage', value);
    router.push(`?${currentParams.toString()}`);
  }

  return (
    <div>
      <span className="mr-2 text-sm text-neutral-400">Per page:</span>
      <select
        onChange={handlePerPageChange}
        defaultValue={perPage}
        className="rounded-md border border-neutral-700 text-foreground px-2 py-1 text-sm font-medium outline-none shadow-xs hover:bg-accent hover:text-accent-foreground bg-input/30 h-9"
      >
        {perPageOptions.map((option) => (
          <option key={option} value={option}>
            {option}
          </option>
        ))}
      </select>
    </div>
  );
}
