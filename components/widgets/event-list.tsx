import { Event } from '@/types/types';
import {
  Table,
  TableBody,
  TableCell,
  TableHeader,
  TableHeaderCell,
  TableRow,
} from '@/components/ui/table';
import GetIpGeodata from '@/components/ui/get-ip-geodata';
import JsonList from '@/components/ui/json-list';

type EventListProps = {
  events?: Event[];
};

export default function EventList({ events }: EventListProps) {
  if (!events) {
    return <p>No events found</p>;
  }
  return (
    <Table className="h-fit">
      <TableHeader>
        <TableRow>
          <TableHeaderCell>Created</TableHeaderCell>
          <TableHeaderCell>IP</TableHeaderCell>
          <TableHeaderCell>Local time</TableHeaderCell>
          <TableHeaderCell>Data</TableHeaderCell>
        </TableRow>
      </TableHeader>
      <TableBody>
        {events?.map(({ id, createdAt, ip, localTime, data }) => (
          <TableRow key={id}>
            <TableCell>{new Date(createdAt).toLocaleString()}</TableCell>
            <TableCell>
              <GetIpGeodata ip={ip} />
            </TableCell>
            <TableCell>{new Date(localTime).toLocaleString()}</TableCell>
            <TableCell className="break-after-all">
              <JsonList data={data} />
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
}
