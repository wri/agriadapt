import rwImage from 'public/static/images/components/layout/footer/resourceWatchLogo.svg';
import aqueductImage from 'public/static/images/components/layout/footer/wriAqueductLogo.svg';
import prepImage from 'public/static/images/components/layout/footer/prepLogo.svg';

export const FOOTER_LINKS = [
  {
    id: "value-chains",
    label: "Value Chains",
    href: "/",
    children: [
      {
        label: "Rice",
        href: "/value-chains/rice",
      },
      {
        label: "Coffee",
        href: "/value-chains/coffee",
      },
      {
        label: "Cotton",
        href: "/value-chains/cotton",
        logEvent: true,
      },
    ],
  },
  {
    id: "explore",
    label: "Climate Risk Explorer",
    href: "/explore",
    children: [
      {
        label: "Explore the Map",
        href: "/explore",
      },
    ],
  },
  {
    id: "about",
    label: "About",
    href: "/about",
    children: [
      {
        label: "About the Project",
        href: "/about",
      },
    ],
  },
];

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
