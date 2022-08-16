export interface ValueChainPageProps {
  country: {
    label: string;
    value: string;
    iso: string;
  };
  countries: {
    label: string;
    value: string;
    iso: string;
  }[];
  headers?;
}
