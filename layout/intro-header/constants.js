import landingImage from 'public/static/images/components/layout/intro-header/intro-landing-image.svg';
import landingBlob from 'public/static/images/components/layout/intro-header/intro-landing-blob.svg';
import aboutImage from 'public/static/images/components/layout/intro-header/intro-about-image.svg';
import aboutBlob from 'public/static/images/components/layout/intro-header/intro-about-blob.svg';
import riceImage from 'public/static/images/components/layout/intro-header/intro-rice-image.svg';
import riceBlob from 'public/static/images/components/layout/intro-header/intro-rice-blob.svg';
import coffeeImage from 'public/static/images/components/layout/intro-header/intro-coffee-image.svg';
import coffeeBlob from 'public/static/images/components/layout/intro-header/intro-coffee-blob.svg';
import cottonImage from 'public/static/images/components/layout/intro-header/intro-cotton-image.svg';
import cottonBlob from 'public/static/images/components/layout/intro-header/intro-cotton-blob.svg';

const ABOUT = {
  id: 'ABOUT',
  title: 'About the Climate Risks in Agricultural Value Chains initiative',
  description: [
    'World Resources Institute has been building out a multifaceted program on Transforming Agriculture for Climate Resilience over the past five years. The aim of this work is to inform funders, policymakers and practitioners to integrate climate risk and resilience into plans, policies and programs.',
    'The Climate Risks in Agricultural Value Chains initiative focuses on in-depth stakeholder engagement to bring together sectoral knowledge with technical and data expertise, underpinned by a user-centric approach to tool development.',
  ],
  image: aboutImage,
  blob: aboutBlob,
};

const LANDING = {
  id: 'LANDING',
  title:
    'Helping farmers and agriculture businesses around the world adapt to climate change.',
  subtitle: 'Data and tools for agricultural resilience',
  image: landingImage,
  blob: landingBlob,
};

const RICE = {
  id: 'RICE',
  title: 'Rice',
  subtitle: 'Climate Risk in Rice Value Chains',
  description: [
    'Temperature increase, rising seas and changes in patterns of rainfall and its distribution under global climate changes might lead to substantial modifications in land and water resources for rice production as well as the productivity of rice crops grown in different parts of the world.',
  ],
  image: riceImage,
  blob: riceBlob,
  countries: [{ label: 'India', value: 'india' }],
};

const COTTON = {
  id: 'COTTON',
  title: 'Cotton',
  subtitle: 'Climate Risk in Cotton Value Chains',
  description: [
    'Temperature increase, rising seas and changes in patterns of rainfall and its distribution under global climate changes might lead to substantial modifications in land and water resources for rice production as well as the productivity of rice crops grown in different parts of the world.',
  ],
  image: cottonImage,
  blob: cottonBlob,
  countries: [{ label: 'India', value: 'india' }],
};

const COFFEE = {
  id: 'COFFEE',
  title: 'Coffee',
  subtitle: 'Climate Risk in Coffee Value Chains',
  description: [
    'Complexity and uncertainty make it hard to be precise but it is generally accepted that climate change will affect both arabica and robusta producers. Increasing average temperatures, more frequent droughts and heat waves, and inclement weather patterns threaten to upend a large portion of suitable coffee producing areas over the next decades. More coffee may need to be grown under irrigation, thereby increasing pressure on scarce water resources.',
  ],
  image: coffeeImage,
  blob: coffeeBlob,
  countries: [{ label: 'Colombia', value: 'colombia' }],
};

export { ABOUT, LANDING, RICE, COTTON, COFFEE };
