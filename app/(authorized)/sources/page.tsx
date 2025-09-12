import { loadSources } from '@/lib/data-load';
import PageTitle from '@/components/ui/page-title';
import Link from 'next/link';
import {
  Card,
  CardAction,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { Button } from '@/components/ui/button';

export default async function Page() {
  const sources = await loadSources(undefined);
  return (
    <section>
      <PageTitle>Sources</PageTitle>
      <div className='flex gap-5'>
        {sources?.map(({ id, title, description }) => (
          <Card key={id}>
            <CardHeader>
              <CardTitle>{title}</CardTitle>
            </CardHeader>
            <CardContent>{description}</CardContent>
            <CardFooter>
              <CardAction>
                <Button asChild variant="outline">
                  <Link href={`/sources/${id}`}>View</Link>
                </Button>
              </CardAction>
            </CardFooter>
          </Card>
        ))}
      </div>
    </section>
  );
}
