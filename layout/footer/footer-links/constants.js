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

export default { FOOTER_LINKS };
