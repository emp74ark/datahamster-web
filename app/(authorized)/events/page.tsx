import { getPaginationParams, loadEvents, PaginationParamsType } from '@/lib';
import PageTitle from '@/components/ui/page-title';
import EventList from '@/components/widgets/event-list';
import PaginationBar from '@/components/widgets/pagination-bar';

type PageProps = {
  searchParams: Promise<PaginationParamsType>;
};

export default async function Page(props: PageProps) {
  const searchParams = await props.searchParams;
  const { pageNumber, perPage } = await getPaginationParams(searchParams);

  const events = await loadEvents({
    id: undefined,
    filter: {
      pageNumber,
      perPage,
    },
  });

  return (
    <section className="grid grid-rows-[auto_1fr]">
      <PageTitle>Latest Events</PageTitle>
      <EventList events={events?.results} />
      <PaginationBar
        current={pageNumber}
        perPage={perPage}
        totalResults={events?.total}
      />
    </section>
  );
}
