type IpGeoData = {
  query: string;
  status: 'success' | 'fail';
  message: string;
  country: string;
  countryCode: string;
  region: string;
  regionName: string;
  city: string;
  zip: string;
  lat: number;
  lon: number;
  timezone: string;
  isp: string;
  org: string;
  as: string;
};

export async function getIpGeoData(ip: string): Promise<IpGeoData | undefined> {
  try {
    const response = await fetch(`http://ip-api.com/json/${ip}`);
    return response.json();
  } catch (e) {
    console.error('Error getting ip geo data: ', e);
  }
}
