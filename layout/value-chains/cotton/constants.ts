import cotton1 from 'public/images/quotes/cotton1.png';
import cotton2 from 'public/images/quotes/cotton2.png';
import cotton3 from 'public/images/quotes/cotton3.png';
import { capitalizeFirstLetter } from 'utils/utils';

const inputs = {
  land_suitability: {
    info: 'Appropriate cotton land use decisions are vital to achieve optimum productivity of the land and ensure environmental sustainability. Explore the visualizations below to learn more about how cotton land suitability may change in the future.',
    fullWidth: true,
    widgets: [
      { id: '2a1aab23-1c36-4a17-b5e0-b63a68531c63', fullWidth: true },
      // { id: 'a5b13394-84a8-4f7c-aa2d-7fc332f5c842', fullWidth: true },
      {
        title: ({ country }) => `Land Suitability for Coffee in ${country}`,
        type: 'custom bar',
        fullWidth: true,
        options: [
          { label: 'Rainfed cotton', value: 'rainfed' },
          { label: 'Irrigated cotton', value: 'irrigated' },
        ],
        layers: {
          rainfed: {
            rcp4p5: [
              '2020s_rcp4p5_rainfed_cotton',
              '2050s_rcp4p5_rainfed_cotton',
              '2000s_historic_rainfed_cotton',
            ],
            rcp8p5: [
              '2020s_rcp8p5_rainfed_cotton',
              '2050s_rcp8p5_rainfed_cotton',
              '2000s_historic_rainfed_cotton',
            ],
          },
          irrigated: {
            rcp4p5: [
              '2020s_rcp4p5_irrigated_coffee',
              '2050s_rcp4p5_irrigated_coffee',
              '2000s_historic_irrigated_coffee',
            ],
            rcp8p5: [
              '2020s_rcp8p5_irrigated_coffee',
              '2050s_rcp8p5_irrigated_coffee',
              '2000s_historic_irrigated_coffee',
            ],
          },
        },
      },
    ],
    // TODO: Additional chart vis
  },
  labor: {
    info: 'Agricultural workers are especially vulnerable to increased heat stress, which affects the health of individuals and reduces labour productivity. The Universal Thermal Climate Index identifies outdoor conditions that cause discomfort to people using a combination of temperature, humidity, wind, and radiation to determine the stress (sweating, shivering, skin wetness, etc.) a person undergoes when exposed to outdoor conditions.',
    widgets: [{ id: '4cecc183-2ae4-4045-a7ad-c664ee1c368e' }],
  },
  seedlings: {
    info: 'Temperature conditions are crutial for growing cotton. Seeds will have a low germination rate if the soil temperature is below 60°F (15°C). ',
    widgets: [{ id: 'e9ef2704-04b7-4ab1-adce-57d0a73317d9' }],
  },
};
const production = {
  production_volume: {
    info: (country: string) =>
      `Explore our data visualizations to better understand where the main cotton growing regions in ${country} are and how much cotton is currently produced.`,
    fullWidth: true,
    widgets: [{ id: '8cf03ba0-a517-4a43-b5b4-e677ccc6099c' }],
    //TODO: Additional Callout - Need working query
    analysis: {
      value: 'N/A',
      name: 'Data Coming Soon'
    },
    // analysis: {
    //   name: ({
    //     crop,
    //     country,
    //     year = 2010,
    //   }: {
    //     crop: string;
    //     country: string;
    //     year: number;
    //   }) => `${crop} production in ${country} in ${year}`,
    //   suffix: 'MT',
    //   type: 'Total',
    // },
  },
  pests_and_disease: {
    info: 'Changes to climate can result in the continuous evolution of pests, making them harder to contain, which can significantly influence yield and quality. Suitable temperature, humidity, low rainfall, low wind speed, suitable sunshine time and low evaporation are more likely to cause cotton pests and diseases. (Xiao, Q., Li, W., Kai, Y. et al.)',
    fullWidth: true,
    widgets: [], //TODO: Missing WidgetID (N/A)
  },
};
const trade = {
  policies_and_price: {
    info: 'The Nominal Rate of Protection measures the extent to which agricultural policies affect the market price of a commodity. It computes the difference between the price a farmer receives versus the price a farmer would receive without these policies in place.',
    //TODO: Callout
    analysis: {
      dataset: '641c0a35-f2e5-4198-8ed9-576ea7e9685a',
      query: ({ iso }: { iso: string }) =>
        `select nrp as x from data where countrycode='${iso}' order by year desc limit 1`,
      format: '0.00',
      suffix: '%',
      name: ({
        crop,
        country,
      }: {
        crop: 'rice' | 'cotton' | 'coffee';
        country: string;
      }) =>
        `Nominal rate of protection, ${capitalizeFirstLetter(
          crop
        )} in ${country} in 2018`,
    },
  },
  export_and_import: {
    info: 'Cotton is a very important cash crop which has a growing demand for domestic and international market. Disruptions to cotton production can result in an uncertain market for farmers and ripple effects can be seen throughout the entire value chain (Cotton 2040, 2021). Production constraints will impact global markets by effecting product availabilty, quality, and price.',
    //TODO: Additional Chart Visual
    analysis: {
      value: 'N/A',
      name: 'Data Coming Soon'
    }
  },
};

export const quotes = [
  {
    location: 'Nandyala, India',
    image: cotton1,
    title: 'Scientist, Regional Agricultural Research Station (RARS)',
    quote:
      'One of the important factors which can affect the cotton supply chain is the pest infestation which not only reduces the yield but also reduces the quality of ginnable cotton. The incidence of pests and diseases are climate related and the AgriAdapt can help us in providing early warning systems with its data on climate variability and forecasted risks',
  },
  {
    location: 'Vijayawada, India',
    image: cotton2,
    title:
      'Climate Change Activities Manager, Asian Infrastructure Investment Bank',
    quote:
      'Cotton’s supply chain is facing several challenges in the quality of cotton triggered by extreme climate events. Through a robust platform like AgriAdapt, Ginners/Spinners can identify the least affected regions to climate hazards and plan their purchases of cotton accordingly from these cultivated areas.',
  },
  {
    location: 'Guntur, India',
    image: cotton3,
    title: 'Manager, KDM Spinners Pvt Ltd.',
    quote:
      'Extreme weather events are affecting the quality of cotton. We have been facing a lot of problems related to the poor quality of cotton while procurement, which affects the final output and poses serious threats to the business. By knowing the climatic hazards and unseasonal rain through the AgriAdapt, we can procure cotton well in advance to avoid the purchase of cotton at a high cost and of poor quality. We can also sensitize our suppliers/farmers about climate hazards and possible infestation of pests and disease so that we can avoid climate related risks at the source itself.',
  },
];

const details = { inputs, production, trade };

export default details;
