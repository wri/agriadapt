import landingImage from 'public/images/components/layout/intro-header/landing/intro-landing-image.jpg';
import landingBlob from 'public/images/components/layout/intro-header/landing/intro-landing-blob.svg';
import aboutImage from 'public/images/components/layout/intro-header/about/intro-about-image.jpg';
import aboutBlob from 'public/images/components/layout/intro-header/about/intro-about-blob.svg';
import riceImage from 'public/images/components/layout/intro-header/rice/intro-rice-image.jpg';
import riceBlob from 'public/images/components/layout/intro-header/rice/intro-rice-blob.svg';
import coffeeImage from 'public/images/components/layout/intro-header/coffee/intro-coffee-image.jpg';
import coffeeBlob from 'public/images/components/layout/intro-header/coffee/intro-coffee-blob.svg';
import cottonImage from 'public/images/components/layout/intro-header/cotton/intro-cotton-image.jpg';
import cottonBlob from 'public/images/components/layout/intro-header/cotton/intro-cotton-blob.svg';

const ABOUT = {
  id: 'ABOUT',
  title: 'Agricultural Adaptation Tool',
  description: [
    'World Resources Institute has been building out a multifaceted program on Transforming Agriculture for Climate Resilience over the past five years. The aim of this work is to inform funders, policymakers and practitioners to integrate climate risk and resilience into plans, policies and programs.',
    'The Agricultural Adaptation Tool is developed focusing on in-depth stakeholder engagement to bring together sectoral knowledge with technical and data expertise, underpinned by a user-centric approach to tool development.',
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
  button: {
    label: 'Analyze Risk in Your Supply Chain',
    url: {
      pathname: '/explore',
      query: {
        tab: 'analysis',
        layers: JSON.stringify([
          {
            dataset: 'faf79d2c-5e54-4591-9d70-4bd1029c18e6',
            opacity: 1,
            layer: 'd555dc57-7536-484b-adb7-b2675db6b823',
          },
          {
            dataset: '3d8e2e82-b33a-4898-90e5-6e4a1d007b82',
            opacity: 1,
            layer: '2813220d-f77c-47c3-b19f-c34bdf974a2f',
          },
          {
            dataset: '66d28bbc-1e6e-4156-9ba2-875ecab665af',
            opacity: 1,
            layer: 'd31acf31-57d7-472e-8641-33127ede7b1c',
          },
          {
            dataset: '4ca6826c-718d-457d-b4e2-e9277d7ed62c',
            opacity: 1,
            layer: '341735ff-5773-4cf2-abef-d4a90db10645',
          },
          {
            dataset: '4d2d47c1-fed1-4484-83e3-c91c3f6f7315',
            opacity: 1,
            layer: '6c2a0892-87e7-41ef-b4f0-e53c89baab5c',
          },
        ]),
      },
    },
  },
};

const RICE = {
  id: 'RICE',
  title: 'Rice',
  subtitle: 'Climate Risk in Rice Value Chains',
  description: [
    'Temperature increases, rising sea levels, and changes in rainfall patterns and distribution could lead to substantial impacts on land and water resources for rice production. Continuous groundwater extraction for rice paddy irrigation is already resulting in a steep decline in groundwater across India (Oo 2018).',
  ],
  image: riceImage,
  blob: riceBlob,
};

const COTTON = {
  id: 'COTTON',
  title: 'Cotton',
  subtitle: 'Climate Risk in Cotton Value Chains',
  description: [
    "The cotton value chain is likely to experience disruptions due to climate change impacts such as water availability, changing rainfall patterns, and rising temperatures. Cotton's lengthy growing season (approximately 150-180 days) already makes the crop quite vulnerable to pests and diseases. A warmer climate will only increase cotton's susceptibility (Cotton 2040, 2021).",
  ],
  image: cottonImage,
  blob: cottonBlob,
};

const COFFEE = {
  id: 'COFFEE',
  title: 'Coffee',
  subtitle: 'Climate Risk in Coffee Value Chains',
  description: [
    'Although it is hard to be precise, it is generally accepted that climate change will affect both arabica and robusta production. Increasing average temperatures, more frequent droughts and heat waves, and inclement weather patterns threaten to upend a large portion of suitable coffee producing areas over the next decades. More coffee may need to be grown under irrigation, thereby increasing pressure on scarce water resources.',
  ],
  image: coffeeImage,
  blob: coffeeBlob,
};

export { ABOUT, LANDING, RICE, COTTON, COFFEE };
