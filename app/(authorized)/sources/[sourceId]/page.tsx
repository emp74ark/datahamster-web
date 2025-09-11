type PageProps = {
  params: Promise<{ sourceId: string }>;
};

export default async function Page(props: PageProps) {
  const { sourceId } = await props.params;
  return <div>Source: {sourceId}</div>;
}
