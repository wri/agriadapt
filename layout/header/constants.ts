export const APP_HEADER_ITEMS = [
  {
    id: 'crops',
    label: 'header:crops',
    href: '/crops/rice',
    root: '/crops',
    children: [
      {
        label: 'common:value_chains.coffee',
        href: '/crops/coffee',
      },
      {
        label: 'common:value_chains.cotton',
        href: '/crops/cotton',
        logEvent: true,
      },
      {
        label: 'common:value_chains.rice',
        href: '/crops/rice',
      },
    ],
  },
  {
    id: 'explorer',
    label: 'header:explore_the_map',
    href: '/explore',
    root: '/explore',
    children: [
      {
        label: 'footer:layers',
        href: { pathname: '/explore', query: { tab: 'layers'}},
      },
      {
        label: 'footer:analysis',
        href: { pathname: '/explore', query: { tab: 'analysis'}},
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
