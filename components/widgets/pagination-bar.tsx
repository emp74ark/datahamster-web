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

type PaginationBarProps = {
  entityPrefix: string;
  current: number;
  perPage: number;
  totalResults?: number;
};

const VISIBLE_PAGES = 3;

export default function PaginationBar({
  entityPrefix,
  current,
  perPage,
  totalResults = 0,
}: PaginationBarProps) {
  const pages = Math.ceil(totalResults / perPage);

  const visiblePageNumbers = Array.from(
    { length: pages },
    (_, i) => i + 1
  ).slice(
    current - (current >= VISIBLE_PAGES ? VISIBLE_PAGES : 1),
    current + (pages > VISIBLE_PAGES ? VISIBLE_PAGES : pages)
  );

  return (
    <Pagination className="mt-5 place-self-end">
      <PaginationContent>
        {current > 1 && (
          <PaginationItem>
            <PaginationPrevious
              href={`${entityPrefix}?pageNumber=${current - 1}&perPage=${perPage}`}
            />
          </PaginationItem>
        )}
        {visiblePageNumbers.map((pageNumber) => (
          <PaginationItem key={pageNumber}>
            <PaginationLink
              isActive={current === pageNumber}
              href={`${entityPrefix}?pageNumber=${pageNumber}&perPage=${perPage}`}
            >
              {pageNumber}
            </PaginationLink>
          </PaginationItem>
        ))}
        <PaginationSelect perPage={perPage}/>
        {pages > VISIBLE_PAGES && (
          <PaginationItem>
            <PaginationEllipsis />
          </PaginationItem>
        )}
        {current < pages && (
          <PaginationItem>
            <PaginationNext
              href={`${entityPrefix}?pageNumber=${current + 1}&perPage=${perPage}`}
            />
          </PaginationItem>
        )}
      </PaginationContent>
    </Pagination>
  );
}
