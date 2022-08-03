import rwImage from 'public/images/components/layout/footer/resourceWatchLogo.svg';
import aqueductImage from 'public/images/components/layout/footer/wriAqueductLogo.svg';
import prepImage from 'public/images/components/layout/footer/prepLogo.svg';
import { APP_HEADER_ITEMS } from 'layout/header/constants';

export const FOOTER_LINKS = APP_HEADER_ITEMS.slice(0, -1);

export const RELATED_SITES = [
  {
    href: 'https://resourcewatch.org',
    image: rwImage,
    alt: 'Resource Watch',
  },
  {
    href: 'https://www.wri.org/aqueduct',
    image: aqueductImage,
    alt: 'Aqueduct',
  },
  {
    href: 'https://www.prepdata.org',
    image: prepImage,
    alt: 'Resource Watch',
  },
]
