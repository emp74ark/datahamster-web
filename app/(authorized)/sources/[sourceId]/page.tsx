import { loadSources } from '@/lib/data-load';

type PageProps = {
  params: Promise<{ sourceId: string }>;
};

export default async function Page(props: PageProps) {
  const { sourceId } = await props.params;
  const source = await loadSources(sourceId);
  console.log(source);
  return <div>Source: {sourceId}</div>;
}
