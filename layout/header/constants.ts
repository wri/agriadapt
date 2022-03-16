export const APP_HEADER_ITEMS = [
  {
    id: 'value-chains',
    label: 'Value Chains',
    href: '/',
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
    // pages: [
    //   '/app/rice',
    //   '/app/veggies'
    // ],
    // children: [
    //   {
    //     label: 'Rice',
    //     href: 'value-chains/rice',
    //   },
    //   {
    //     label: 'Veggies',
    //     href: 'value-chains/veggies',
    //   },
    // ]
  },
  {
    id: 'climate-risk-explorer',
    label: 'Climate Risk Explorer',
    href: '/explorer',
  },
  {
    id: 'about',
    label: 'About',
    href: '/about',
  },
];

export default { APP_HEADER_ITEMS };
