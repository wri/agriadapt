export const FOOTER_LINKS = [
  {
    id: 'value-chains',
    label: 'Value Chains',
    href: '/value-chains',
    children: [
      {
        label: 'Rice',
        href: '/value-chains/rice',
      },
      {
        label: 'Coffee',
        href: '/value-chains/coffee',
      },
      {
        label: 'Cotton',
        href: '/value-chains/cotton',
        logEvent: true,
      },
    ],
  },
  {
    id: 'explorer',
    label: 'Climate Risk Explorer',
    href: '/explorer',
    children: [
      {
        label: 'Explore the Map',
        href: '/explorer',
      }
    ],
  },
  // {
  //   id: 'blog',
  //   label: 'Blog',
  //   href: 'https://blog.resourcewatch.org',
  //   isExternalLink: true,
  // },
  {
    id: 'about',
    label: 'About',
    href: '/about',
    children: [
      {
        label: 'About the Project',
        href: '/about',
      }
    ],
  }
];

export default { FOOTER_LINKS };
