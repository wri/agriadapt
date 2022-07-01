import climaLogo from 'public/images/about/clima-y-cafe-logo.png';
import nationalAgroLogo from 'public/images/about/national-agro-logo.png';
import walmartFoundationLogo from 'public/images/about/walmart-foundation-logo.png';

const acknowledgements = {
  contributors: {
    header: 'A special thanks to our contributors',
    content: [
      {
        name: 'Clima y Café',
        image: climaLogo,
        href: 'https://climaycafe.com/',
      },
      {
        name: 'National Agro Foundation Towards Rural Prosperity',
        image: nationalAgroLogo,
        href: 'http://www.nationalagro.org/',
      },
    ],
  },

  committee_members: {
    subheader: 'Technical Advisory Committee Members',
    content: [
      {
        name: 'United Nations Food and Agriculture Organization',
        href: 'https://www.fao.org/home/en',
      },
      { name: 'World Food Programme', href: 'https://www.wfp.org/' },
    ],
  },

  funders: {
    header: 'Our Funders',
    content: [
      {
        name: 'Walmart Foundation',
        image: walmartFoundationLogo,
        href: 'https://walmart.org/',
      },
    ],
  },
};

export default acknowledgements;
