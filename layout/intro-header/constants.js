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
import adaptImage from 'public/images/adaptation/intro.png';
import adaptBlob from 'public/images/adaptation/adapt-vector.png';
import cropImagerice from 'public/images/adaptation/rice_image.png';
import cropImagecotton from 'public/images/adaptation/cotton image.png';
import cropBlob from 'public/images/components/layout/intro-header/landing/intro-landing-blob.svg';
import storageimagerice from 'public/images/adaptation/storage_cotton.png';
import storageimagecotton from 'public/images/adaptation/transport-rice.png';
import storageimagec from 'public/images/adaptation/storage-cotton-image.png';
import transportimagec from 'public/images/adaptation/transport-cotton.png';

const ABOUT = {
  id: 'ABOUT',
  title: 'intro.title',
  description: ['intro.description.0', 'intro.description.1'],
  image: aboutImage,
  blob: aboutBlob,
};
const ADAPT = {
  id: 'ADAPTATION',
  title: 'intro.title',
  description: ['intro.description.0'],
  image: adaptImage,
  blob: adaptBlob,
};

const INPUT = {
  id: 'INPUT',
  title: 'Inputs and Production',
  description: ['Browse through our adaptation informationClimate change will cause a great strain on crucial inputs such as water and labor. Rainfall variability and drought impact water availability and can result in harvest losses and poor crop quality. Increased temperatures will cause unsafe working conditions, causing workers to lose income and resulting in decreased labor productivity. More frequent extreme weather events such as flooding will also harm crop quality and quantity. All of these impacts and more will ultimately effect incomes for workers in these value chain nodes.'],
  image: adaptImage,
  blob: adaptBlob,
};

const STORAGE = {
  id: 'STORAGE',
  title: 'Storage and Processing',
  description: ['Growing climate hazards will increase the risks of mold, insect infestation, fungi and diseases for rice storage, negatively impacting quality and quantity of processed products. Increased temperatures can result in unsafe facility working conditions, causing workers to lose income and resulting in decreased labor productivity.'],
  image: storageimagerice,
  blob: adaptBlob,
};

const TRANSPORT = {
  id: 'TRANSPORT',
  title: 'Transport, Trade, and Sales',
  description: ['Climate change will pose new challenges for transportation due to sea level rise, temperature changes, and damaged infrastructure, leading to more food loss due to spoiling. Trade could be impacted by poor quality and lower product volumes, increasing sourcing costs and adding to price volatility. Less food availability will ultimately impact the cost of rice as the consumer level.'],
  image: storageimagecotton,
  blob: adaptBlob,
};
const STORAGECOTTON = {
  id: 'STORAGE',
  title: 'Storage and Processing',
  description: ['Growing climate hazards will increase the risks of mold, insect infestation, fungi and diseases for rice storage, negatively impacting quality and quantity of processed products. Increased temperatures can result in unsafe facility working conditions, causing workers to lose income and resulting in decreased labor productivity.'],
  image: storageimagec,
  blob: adaptBlob,
};

const TRANSPORTCOTTON = {
  id: 'TRANSPORT',
  title: 'Transport, Trade, and Sales',
  description: ['Climate change will pose new challenges for transportation due to sea level rise, temperature changes, and damaged infrastructure, leading to more food loss due to spoiling. Trade could be impacted by poor quality and lower product volumes, increasing sourcing costs and adding to price volatility. Less food availability will ultimately impact the cost of rice as the consumer level.'],
  image: transportimagec,
  blob: adaptBlob,
};

const CROPSRICE ={
  id: 'CROPSRICE',
  title: 'Rice',
  subtitle: 'Adapting Rice Value Chains for Climate Resilience',
  description: ['Temperature increases, rising sea levels, and changes in rainfall patterns could lead to substantial impacts on land and water resources needed for reliable rice production. Continuous groundwater extraction for rice paddy irrigation is already resulting in a steep decline in groundwater availability.  ','Further along the value chain, climate change can cause an increased risk of mold, insect infestation, fungi and diseases that could negatively affect processing and storage. These impacts ultimately influence the quality and quantity of rice produced, which can result in price volatility and lower food availability.'],
  image: cropImagerice,
  blob: cropBlob,
}
const CROPSCOTTON ={
  id: 'CROPSCOTTON',
  title: 'Cotton',
  subtitle: 'Adapting Cotton Value Chains for Climate Resilience',
  description: ['adaptation:intro_cotton.description_cotton.0'],
  image: cropImagecotton,
  blob: cropBlob,
}


const LANDING = {
  id: 'LANDING',
  title: 'intro.title',
  subtitle: 'intro.subtitle',
  image: landingImage,
  blob: landingBlob,
  button: {
    label: 'intro.button_label',
    label2: 'intro.button_explore_label',
    url2: {
      pathname: '/adaptations',
    },
    url: {
      pathname: '/explore',
      query: {
        tab: 'analysis',
        add: 'current',
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
  button2:{
    label:'intro.button_label2',
    url: {
      pathname: '/explore',
    }
  }
};

const RICE = {
  id: 'RICE',
  title: 'common:value_chains.rice',
  subtitle: 'intro.subtitle',
  description: ['intro.description.0'],
  image: riceImage,
  blob: riceBlob,
};

const COTTON = {
  id: 'COTTON',
  title: 'common:value_chains.cotton',
  subtitle: 'intro.subtitle',
  description: ['intro.description.0'],
  image: cottonImage,
  blob: cottonBlob,
};

const COFFEE = {
  id: 'COFFEE',
  title: 'common:value_chains.coffee',
  subtitle: 'intro.subtitle',
  description: ['intro.description.0'],
  image: coffeeImage,
  blob: coffeeBlob,
};

export { ABOUT, LANDING, RICE, COTTON, COFFEE,ADAPT,CROPSRICE,CROPSCOTTON,INPUT,STORAGE,TRANSPORT,STORAGECOTTON,TRANSPORTCOTTON };
