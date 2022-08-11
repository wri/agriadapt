import map_sm from 'public/images/components/layout/landing/map-container-image-mobile.svg';
import map_md from 'public/images/components/layout/landing/map-container-image.svg';
import aboutImage from 'public/images/components/layout/landing/learn-more.svg';
import riceImage from 'public/images/components/layout/landing/value-chain-cards/rice.png';
import cottonImage from 'public/images/components/layout/landing/value-chain-cards/cotton.png';
import coffeeImage from 'public/images/components/layout/landing/value-chain-cards/coffee.png';
// import analysisImage from 'public/images/components/layout/landing/analysis-map.png';

const MAP = {
  // id: 'LANDING',
  title: 'landing:sub_intro.title',
  subTitle: 'landing:sub_intro.subtitle',
  button: {
    label: 'landing:sub_intro.button_label',
    url: { pathname: '/explore' },
  },
  image_sm: map_sm,
  image_md: map_md,
  image_alt: 'landing:sub_intro.image_alt',
};

const VALUECHAINS = {
  title: 'landing:value_chain_cards.title',
  subTitle: 'landing:value_chain_cards.subtitle',
  chains: [
    {
      label: 'common:value_chains.coffee',
      button_label: 'landing:value_chain_cards.bottons.coffee_card.coffee_button',
      image: coffeeImage,
      href: 'coffee',
    },
    {
      label: 'common:value_chains.cotton',
      button_label: 'landing:value_chain_cards.bottons.cotton_card.cotton_button',
      image: cottonImage,
      href: 'cotton',
    },
    {
      label: 'common:value_chains.rice',
      button_label: 'landing:value_chain_cards.bottons.rice_card.rice_button',
      image: riceImage,
      href: 'rice',
    },
  ],
};

const ANALYSIS = {
  // title: 'Overlay risk information to reveal potential impacts of hazards.',
  title: 'landing:map_analysis_carousel.title',
  image_src: 'static/images/components/layout/landing/analysis-map.png',
  image_alt: 'landing:map_analysis_carousel.image_alt',
  subTitle: 'landing:map_analysis_carousel.subtitle',
  cards: [
    {
      title: 'landing:map_analysis_carousel.content.0',
      button: {
        label: 'landing:map_analysis_carousel.link_to_map_button',
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
      title: 'landing:map_analysis_carousel.content.1',
      button: {
        label: 'landing:map_analysis_carousel.link_to_map_button',
        url: { pathname: '/explore', query: { tab: 'analysis' } },
      },
    },
    {
      title: 'landing:map_analysis_carousel.content.2',
      button: {
        label: 'landing:map_analysis_carousel.link_to_map_button',
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
    // {
    //   title:
    //     'Understand how climate hazards affect coffee production around the world',
    //   button: {
    //     label: 'Check out the data',
    //     url: { pathname: '/explore', query: { tab: 'analysis' } },
    //   },
    // },
  ],
};

const LEARN = {
  title: 'landing:landing_to_about.title',
  subTitle: 'landing:landing_to_about.subtitle',
  button: { label: 'landing:landing_to_about.button_label', url: '/about' },
  image: aboutImage,
};

export { MAP, VALUECHAINS, ANALYSIS, LEARN };
