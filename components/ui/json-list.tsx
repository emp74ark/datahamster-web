import { JSONValue } from '@/types/types';

type JsonListProps = {
  data: Record<string, JSONValue>;
};

export default function JsonList({ data }: JsonListProps) {
  return (
    <dl>
      {Object.entries(data).map(([key, value]) => (
        <div key={key} className="flex flex-row gap-2">
          <dt className="font-bold">{key}</dt>
          <dd>{JSON.stringify(value)}</dd>
        </div>
      ))}
    </dl>
  );
}
