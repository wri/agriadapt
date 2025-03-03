import methodImage from 'public/images/adaptation/method_image.png';
import exploreCardImage from 'public/images/adaptation/explore_Card.png';
import inputImage1 from 'public/images/adaptation/input1.svg';
import inputImage2 from 'public/images/adaptation/input2.svg';
import inputImage3 from 'public/images/adaptation/input3.svg';
const HOW = {
  title: 'adaptation:contributors.title',
  subtitle: 'adaptation:contributors.subtitle',
  steps: [
    { title: 'adaptation:steps.step1.title', description: 'adaptation:steps.step1.description' },
    { title: 'adaptation:steps.step2.title', description: 'adaptation:steps.step2.description' },
    { title: 'adaptation:steps.step3.title', description: 'adaptation:steps.step3.description' },
    { title: 'adaptation:steps.step4.title', description: 'adaptation:steps.step4.description' },
  ],
};
const METHODOLOGY = {
  title: 'adaptation:methodology.title',
  description: [
    'adaptation:methodology.description.0',
    'adaptation:methodology.description.1',
    'adaptation:methodology.description.2',
  ],
  paragraph: 'adaptation:methodology.paragraph',
  image: methodImage,
  noteTitle: 'adaptation:methodology.noteTitle',
  noteDescription: 'adaptation:methodology.noteDescription'
};
const CROPS = {
  rice: {
    name: "adaptation:CROPS.rice.name",
    description: "adaptation:CROPS.rice.description",
    inputCards: [
      { image: inputImage1, title: "adaptation:CROPS.rice.title1", despcription: "adaptation:CROPS.rice.descript1", link: "../../adaptations/rice/input-and-production" },
      { image: inputImage2, title: "adaptation:CROPS.rice.title2", despcription: "adaptation:CROPS.rice.descript2", link: "../../adaptations/rice/storage-and-processing" },
      { image: inputImage3, title: "adaptation:CROPS.rice.title3", despcription: "adaptation:CROPS.rice.descript3", link: "../../adaptations/rice/transport-trade-and-sales" },
    ],
  },
  cotton: {
    name: "adaptation:CROPS.cotton.name",
    description: "adaptation:CROPS.cotton.description",
    inputCards: [
      { image: inputImage1, title: "adaptation:CROPS.cotton.title1",despcription: "adaptation:CROPS.cotton.descript1", link: "../../adaptations/cotton/input-and-production"},
      { image: inputImage2, title: "adaptation:CROPS.cotton.title2" ,despcription: "adaptation:CROPS.cotton.descript2", link: "../../adaptations/cotton/storage-and-processing"},
      { image: inputImage3, title: "adaptation:CROPS.cotton.title3",despcription: "adaptation:CROPS.cotton.descript3", link: "../../adaptations/cotton/transport-trade-and-sales" },
    ],
  },
};
export const NOT_FOUND_CROP = {
  name: "adaptation:notFound.name",
  description: "adaptation:notFound.description",
};

const EXPLORECARD = {
  exploreImage: exploreCardImage,
  title: "adaptation:exploreCard.title",
  description: "adaptation:exploreCard.description",
  crops: [
    { name: "adaptation:exploreCard.crops.Rice", slug: "rice" },
    { name: "adaptation:exploreCard.crops.Cotton", slug: "cotton" },

  ]
}






export { HOW, METHODOLOGY, CROPS, EXPLORECARD };
