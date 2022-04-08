import map_sm from 'public/static/images/components/layout/landing/map-container-image-mobile.svg';
import map_md from 'public/static/images/components/layout/landing/map-container-image.svg';
import aboutImage from 'public/static/images/components/layout/landing/learn-more.svg';
import riceImage from 'public/static/images/components/layout/landing/valuechain-rice.svg';
import cottonImage from 'public/static/images/components/layout/landing/valuechain-cotton.svg';
import coffeeImage from 'public/static/images/components/layout/landing/valuechain-coffee.svg';
// import analysisImage from 'public/static/images/components/layout/landing/analysis-map.png';

const INTRO = {
  title:
    'Helping farmers and agriculture businesses around the world adapt to climate change.',
  subTitle: 'Data and tools for agricultural resilience',
  button: 'Explore the Latest Data',
};

const MAP = {
  title: 'Here’s a more compelling header for the map experience.',
  subTitle:
    'Here’s a subheader that provides additional contextual information.',
  button: 'Heres a more clear CTA for the map',
  image_sm: map_sm,
  image_md: map_md,
  image_alt: 'Map Explore',
};

const VALUECHAINS = {
  title: 'Here’s a more compelling header for the narrative experience.',
  subTitle:
    'Here’s a subheader that provides additional contextual information.',
  chains: [
    {
      label: 'Rice',
      image: riceImage,
    },
    {
      label: 'Coffee',
      image: coffeeImage,
    },
    {
      label: 'Cotton',
      image: cottonImage,
    },
  ],
};

const ANALYSIS = {
  title: "Here's a more compelling header for the analysis experience.",
  image_src: 'static/images/components/layout/landing/analysis-map.png',
  image_alt: 'Analysis Map',
  subTitle:
    "Here's a subheader that provides additional contextual information",
  cards: [
    {
      title:
        'Understand how climate hazards affect coffee production around the world',
      button: 'Check out the data',
    },
    {
      title:
        'Understand how climate hazards affect coffee production around the world',
      button: 'Check out the data',
    },
    {
      title:
        'Understand how climate hazards affect coffee production around the world',
      button: 'Check out the data',
    },
    {
      title:
        'Understand how climate hazards affect coffee production around the world',
      button: 'Check out the data',
    },
  ],
};

const LEARN = {
  title: 'Learn more about the project',
  subTitle:
    'The climate risk tool project is an initiative by World Resources Institute. The beta version of the tool has been funded by the Walmart Foundation.',
  button: 'About [Project Name]',
  image: aboutImage,
};

export { INTRO, MAP, VALUECHAINS, ANALYSIS, LEARN };
