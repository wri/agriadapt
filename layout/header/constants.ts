export const APP_HEADER_ITEMS = [
  {
    id: 'value-chains',
    label: 'header:value_chains',
    href: '/value-chains/rice',
    root: '/value-chains',
    children: [
      {
        label: 'common:value_chains.Rice',
        href: '/value-chains/rice',
      },
      {
        label: 'common:value_chains.Coffee',
        href: '/value-chains/coffee',
      },
      {
        label: 'common:value_chains.Cotton',
        href: '/value-chains/cotton',
        logEvent: true,
      },
    ],
  },
  {
    id: 'explorer',
    label: 'header:climate_risk_explorer',
    href: '/explore',
    root: '/explore',
    children: [
      {
        label: 'header:explore_the_map',
        href: '/explore',
      },
    ],
  },
  {
    id: 'about',
    label: 'header:about',
    href: '/about',
    root: '/about',
    children: [
      {
        label: 'header:about_the_project',
        href: '/about',
      },
    ],
  },
  {
    id: 'language',
    label: 'common:Language',
    // href: '',
    children: [
      {
        label: 'English',
        locale: 'en',
      },
      {
        label: 'Español',
        locale: 'es',
      },
      {
        label: 'தமிழ்',
        locale: 'ta',
      },
      {
        label: 'తెలుగు',
        locale: 'te',
      },
    ],
  },
];