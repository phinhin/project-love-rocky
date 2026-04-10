export type LaunchCard = {
  id: string;
  name: string;
  provider: string;
  site: string;
  net: string;
  status: string;
  mission?: string;
  imageUrl?: string | null;
  orbit?: string | null;
  pad?: string | null;
  countryCode?: string | null;
};
