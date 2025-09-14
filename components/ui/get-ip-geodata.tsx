import {
  HoverCard,
  HoverCardContent,
  HoverCardTrigger,
} from '@/components/ui/hover-card';
import { getIpGeoData } from '@/lib';

type GetIpGeodataProps = {
  ip: string;
};

export default async function GetIpGeodata({ ip }: GetIpGeodataProps) {
  const data = await getIpGeoData(ip);

  return (
    <HoverCard>
      <HoverCardTrigger>{ip}</HoverCardTrigger>
      <HoverCardContent>
        {data?.status === 'success' ? (
          <dl>
            <div>
              <dt className="font-bold">Country</dt>
              <dd>{data?.country}</dd>
            </div>
            <div>
              <dt className="font-bold">City</dt>
              <dd>{data?.city}</dd>
            </div>
            <div>
              <dt className="font-bold">ISP</dt>
              <dd>{data?.isp}</dd>
            </div>
          </dl>
        ) : (
          <p>{data?.message}</p>
        )}
      </HoverCardContent>
    </HoverCard>
  );
}
