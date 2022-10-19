import climaLogo from 'public/images/about/clima-y-cafe-logo.png';
import nationalAgroLogo from 'public/images/about/national-agro-logo.png';
import walmartFoundationLogo from 'public/images/about/walmart-foundation-logo.png';

const acknowledgements = {
  contributors: {
    header: 'acknowledgements.contributors.header',
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
    subheader: 'acknowledgements.committee_members.subheader',
    content: [
      { name: 'CIAT', href: 'https://ciat.cgiar.org/' },
      { name: 'Climate Edge', href: 'https://www.climate-edge.com/' },
      { name: 'FAO GAEZ', href: 'https://gaez.fao.org/' },
      { name: 'Keith Wiebe with IFPRI', href: 'https://www.ifpri.org/' },
      { name: 'Edward Byers with IIASA Hotspots Explorer', href: 'https://hotspots-explorer.org/' },
      { name: 'Olam International', href: 'https://www.olamagri.com/' },
      { name: 'Suntory', href: 'https://www.suntory.com/' },
      { name: 'World Bank', href: 'https://www.worldbank.org/en/home' },
      { name: 'World Cocoa Foundation', href: 'https://www.worldcocoafoundation.org/' },
    ],
  },

  funders: {
    header: 'acknowledgements.funders.header',
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
