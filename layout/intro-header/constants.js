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
  title: 'intro.title',
  description: ['intro.description.0', 'intro.description.1'],
  image: aboutImage,
  blob: aboutBlob,
};

const LANDING = {
  id: 'LANDING',
  title:
    'intro.title',
  subtitle: 'intro.subtitle',
  image: landingImage,
  blob: landingBlob,
  button: {
    label: 'intro.button_label',
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
  title: 'common:Rice',
  subtitle: 'intro.subtitle',
  description: ['description.0'],
  image: riceImage,
  blob: riceBlob,
};

const COTTON = {
  id: 'COTTON',
  title: 'common:Cotton',
  subtitle: 'intro.subtitle',
  description: ['description.0'],
  image: cottonImage,
  blob: cottonBlob,
};

const COFFEE = {
  id: 'COFFEE',
  title: 'common:Coffee',
  subtitle: 'intro.subtitle',
  description: ['description.0'],
  image: coffeeImage,
  blob: coffeeBlob,
};

export { ABOUT, LANDING, RICE, COTTON, COFFEE };
