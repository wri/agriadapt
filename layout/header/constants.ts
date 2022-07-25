export const APP_HEADER_ITEMS = [
  {
    id: "value-chains",
    label: "Value Chains",
    href: "/value-chains/rice",
    root: '/value-chains',
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
    id: "explorer",
    label: "Climate Risk Explorer",
    href: "/explore",
    root: '/explore',
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
    root: '/about',
    children: [
      {
        label: "About the Project",
        href: "/about",
      },
    ],
  },
  {
    id: 'language',
    label: 'Language',
    // href: '',
    children: [
      {
        label: 'English',
        // href: ''
      },
      {
        label: 'Español',
        // href: ''
      },
      {
        label: 'தமிழ்',
        // href: ''
      },
      {
        label: 'తెలుగు',
        // href: ''
      },
      // {
      //   label: 'Telugu',
      //   // href: ''
      // },
    ]
  }
];