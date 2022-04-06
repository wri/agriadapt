export const APP_HEADER_ITEMS = [
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
    id: "explorer",
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
  {
    id: 'language',
    label: 'English',
    href: '',
    mobile: false,
    children: [
      {
        label: 'Spanish',
        href: ''
      },
      {
        label: 'Hindi',
        href: ''
      },
      {
        label: 'Tamil',
        href: ''
      },
      {
        label: 'Telugu',
        href: ''
      },
    ]
  }
];

export default { APP_HEADER_ITEMS };
