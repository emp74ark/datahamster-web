import { getPaginationParams, loadEvents, PaginationParamsType } from '@/lib';
import PageTitle from '@/components/ui/page-title';
import EventList from '@/components/widgets/event-list';
import PaginationBar from '@/components/widgets/pagination-bar';

type PageProps = {
  searchParams: Promise<{ action?: string } & PaginationParamsType>;
};

export default async function Page(props: PageProps) {
  const searchParams = await props.searchParams;
  const { action: actionId } = searchParams;
  const { pageNumber, perPage } = await getPaginationParams(searchParams);
  if (!actionId) {
    return (
      <>
        <PageTitle>Events</PageTitle>
        <p className="text-neutral-500">Select an action to view its events.</p>
      </>
    );
  }
  const events = await loadEvents({
    id: undefined,
    filter: {
      perPage,
      pageNumber,
      actionId,
    },
  });
  return (
    <>
      <EventList events={events?.results} />
      <PaginationBar
        current={pageNumber}
        perPage={perPage}
        totalResults={events?.total}
      />
    </>
  );
}
