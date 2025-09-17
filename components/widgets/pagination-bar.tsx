'use client';

import {
  Pagination,
  PaginationContent,
  PaginationEllipsis,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from '@/components/ui/pagination';
import PaginationSelect from '@/components/widgets/pagination-select';
import { useSearchParams } from 'next/navigation';

type PaginationBarProps = {
  current: number;
  perPage: number;
  totalResults?: number;
};

const VISIBLE_PAGES = 3;

export default function PaginationBar({
  current,
  perPage,
  totalResults = 0,
}: PaginationBarProps) {
  const searchParams = useSearchParams();
  const pages = Math.ceil(totalResults / perPage);

  const visiblePageNumbers = Array.from(
    { length: pages },
    (_, i) => i + 1
  ).slice(
    current - (current >= VISIBLE_PAGES ? VISIBLE_PAGES : 1),
    current + (pages > VISIBLE_PAGES ? VISIBLE_PAGES : pages)
  );

  function genPageLink(target: number) {
    const currentParams = new URLSearchParams(searchParams.toString());
    currentParams.set('pageNumber', target.toString());
    currentParams.set('perPage', perPage.toString());
    return `?${currentParams.toString()}`;
  }

  return (
    <Pagination className="mt-5 place-self-end">
      <PaginationContent>
        {current > 1 && (
          <PaginationItem>
            <PaginationPrevious href={genPageLink(current - 1)} />
          </PaginationItem>
        )}
        {visiblePageNumbers.map((pageNumber) => (
          <PaginationItem key={pageNumber}>
            <PaginationLink
              isActive={current === pageNumber}
              href={genPageLink(pageNumber)}
            >
              {pageNumber}
            </PaginationLink>
          </PaginationItem>
        ))}
        <PaginationSelect perPage={perPage} />
        {pages > VISIBLE_PAGES && (
          <PaginationItem>
            <PaginationEllipsis />
          </PaginationItem>
        )}
        {current < pages && (
          <PaginationItem>
            <PaginationNext href={genPageLink(current + 1)} />
          </PaginationItem>
        )}
      </PaginationContent>
    </Pagination>
  );
}
