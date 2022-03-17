export const APP_HEADER_ITEMS = [
  {
    id: 'value-chains',
    label: 'Value Chains',
    href: '/value-chains',
    pages: [
      '/app/rice',
      '/app/veggies'
    ],
    children: [
      {
        label: 'Rice',
        href: 'value-chains/rice',
      },
      {
        label: 'Veggies',
        href: 'value-chains/veggies',
      },
    ]
  },
  {
    id: 'climate-risk-explorer',
    label: 'Climate Risk Explorer',
    href: '/explore',
  },
  {
    id: 'about',
    label: 'About',
    href: '/about',
  },
];

export default { APP_HEADER_ITEMS };
