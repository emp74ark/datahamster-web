import { loadSources } from '@/lib/data-load';

type PageProps = {

};

export default async function Page(props: PageProps) {
  const sources = await loadSources()
  console.log(sources);
  return (
    <div>Sources</div>
  );
}
