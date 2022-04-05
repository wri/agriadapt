import climaLogo from 'public/static/images/about/clima-y-cafe-logo.png';
import nationalAgroLogo from 'public/static/images/about/national-agro-logo.png';
import walmartFoundationLogo from 'public/static/images/about/walmart-foundation-logo.png';

const acknowledgements = {
  contributors: {
    header: 'A special thanks to our contributors',
    content: [
      {
        name: 'Clima y Café',
        image: climaLogo,
      },
      {
        name: 'National Agro Foundation Towards Rural Prosperity',
        image: nationalAgroLogo,
      },
    ],
  },

  committee_members: {
    subheader: 'Technical Advisory Committee Members',
    content: [
      { name: 'United Nations Food and Agriculture Organization' },
      { name: 'World Food Programme' },
    ],
  },

  funders: {
    header: 'Our Funders',
    content: [
      {
        name: 'Walmart Foundation',
        image: walmartFoundationLogo,
      },
    ],
  },
};

export default acknowledgements;