import map_sm from 'public/images/components/layout/landing/map-container-image-mobile.svg';
import map_md from 'public/images/components/layout/landing/map-container-image.svg';
import aboutImage from 'public/images/components/layout/landing/learn-more.svg';
import riceImage from 'public/images/components/layout/landing/value-chain-cards/rice.png';
import cottonImage from 'public/images/components/layout/landing/value-chain-cards/cotton.png';
import coffeeImage from 'public/images/components/layout/landing/value-chain-cards/coffee.png';
// import analysisImage from 'public/images/components/layout/landing/analysis-map.png';

const MAP = {
  title: 'Dozens of reliable datasets on climate risk and agriculture',
  subTitle:
    'We are on a mission to making climate information accessible to all.',
  button: {
    label: 'Explore the Latest Data',
    url: { pathname: '/explore' },
  },
  image_sm: map_sm,
  image_md: map_md,
  image_alt: 'Map Explore',
};

const VALUECHAINS = {
  title: 'Risk to shocks is not the same across all value chains',
  subTitle: 'Learn more about how climate change affects various crops',
  chains: [
    {
      label: 'Coffee',
      image: coffeeImage,
      href: 'coffee',
    },
    {
      label: 'Cotton',
      image: cottonImage,
      href: 'cotton',
    },
    {
      label: 'Rice',
      image: riceImage,
      href: 'rice',
    },
  ],
};

const ANALYSIS = {
  title: 'Overlay risk information to reveal potential impacts of hazards.',
  image_src: 'static/images/components/layout/landing/analysis-map.png',
  image_alt: 'Analysis Map',
  subTitle: 'Or start with these recommendations from our data specialists.',
  cards: [
    {
      title:
        'Coffee quality is susceptible to water stress and increased temperatures.',
      button: {
        label: 'Check out the data',
        url: {
          pathname: '/explore',
          query: {
            layers: JSON.stringify([
              {
                dataset: '54af072c-7bb5-4bb1-af84-ea7ba0b4fc22',
                opacity: 1,
                layer: '25bfd5c3-396a-4cef-a8ff-8fb8395e29bf',
              },
              {
                dataset: 'c66d7f3a-d1a8-488f-af8b-302b0f2c3840',
                opacity: 1,
                layer: 'fdf06d8c-72e9-48a7-80f1-27bd5f19342c',
              },
              {
                dataset: '4ca6826c-718d-457d-b4e2-e9277d7ed62c',
                opacity: 1,
                layer: '6dbeaa53-8490-46ab-80e8-f556df9631a8',
              },
            ]),
            tab: 'analysis',
          },
        },
      },
    },
    {
      title: 'Understand how cotton production is exposed to water stress.',
      button: {
        label: 'Check out the data',
        url: {
          pathname: '/explore',
          query: {
            layers: JSON.stringify([
              {
                dataset: '54af072c-7bb5-4bb1-af84-ea7ba0b4fc22',
                opacity: 1,
                layer: 'f7848792-8ffe-497e-8142-893d606b7754',
              },
              {
                dataset: 'c66d7f3a-d1a8-488f-af8b-302b0f2c3840',
                opacity: 1,
                layer: 'fdf06d8c-72e9-48a7-80f1-27bd5f19342c',
              },
            ]),
            tab: 'analysis',
          },
        },
      },
    },
    {
      title:
        'Droughts and floods put rice at risk, with impacts to global food supply.',
      button: {
        label: 'Check out the data',
        url: { pathname: '/explore', query: { tab: 'analysis' } },
      },
    },
    {
      title:
        'Understand how climate hazards affect coffee production around the world',
      button: {
        label: 'Check out the data',
        url: { pathname: '/explore', query: { tab: 'analysis' } },
      },
    },
  ],
};

const LEARN = {
  title: 'Learn more about the project',
  subTitle:
    'The Agricultural Adaptation Tool project is an initiative by World Resources Institute. The beta version of the tool has been funded by the Walmart Foundation.',
  button: 'Read More',
  image: aboutImage,
};

export { MAP, VALUECHAINS, ANALYSIS, LEARN };
