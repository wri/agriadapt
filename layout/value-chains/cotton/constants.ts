import cotton1 from 'public/images/quotes/cotton1.png';
import cotton2 from 'public/images/quotes/cotton2.png';
import cotton3 from 'public/images/quotes/cotton3.png';
import { capitalizeFirstLetter } from 'utils/utils';

const inputs = {
  land_suitability: {
    info: 'inputs.land_suitability.info',
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
          historic: [
            '2000s_historic_irrigated_cotton',
            '2000s_historic_rainfed_cotton',
          ],
          rcp4p5: [
            '2020s_rcp4p5_irrigated_cotton',
            '2020s_rcp4p5_rainfed_cotton',
            '2050s_rcp4p5_irrigated_cotton',
            '2050s_rcp4p5_rainfed_cotton',
          ],
          rcp8p5: [
            '2020s_rcp8p5_irrigated_cotton',
            '2020s_rcp8p5_rainfed_cotton',
            '2050s_rcp8p5_irrigated_cotton',
            '2050s_rcp8p5_rainfed_cotton',
          ],
        },
      },
    ],
    // TODO: Additional chart vis
  },
  labor: {
    info: 'inputs.labor.info',
    widgets: [{ id: '4cecc183-2ae4-4045-a7ad-c664ee1c368e' }],
  },
  seedlings: {
    info: 'inputs.seedlings.info',
    widgets: [{ id: 'e9ef2704-04b7-4ab1-adce-57d0a73317d9' }],
  },
};
const production = {
  production_volume: {
    info: 'production.production_volume.info',
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
    info: 'production.pests_and_disease.info',
    fullWidth: true,
    widgets: [], //TODO: Missing WidgetID (N/A)
  },
};
const trade = {
  policies_and_price: {
    info: 'trade.policies_and_price.info',
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
    info: 'trade.export_and_import.info',
    widgets: [
      {
        title: ({ country }: { country: string }) =>
          `Export and Import Statistics for Cotton in ${country}`,
        type: 'histogram',
        fullWidth: true,
      },
    ]
  },
};

export const quotes = [
  {
    location: 'quotes.0.location',
    image: cotton1,
    title: 'quotes.0.title',
    quote: 'quotes.0.quote',
  },
  {
    location: 'quotes.1.location',
    image: cotton2,
    title: 'quotes.1.title',
    quote: 'quotes.1.quote',
  },
  {
    location: 'quotes.2.location',
    image: cotton3,
    title: 'quotes.2.title',
    quote: 'quotes.2.quote',
  },
];

const details = { inputs, production, trade };

export default details;
