import coffee1 from 'public/images/quotes/coffee1.png';
import coffee2 from 'public/images/quotes/coffee2.png';
import LandSuitabilityControls from '../custom-widgets/LandSuitability/Controls';
import ImportExportControls from '../custom-widgets/ImportExport/Controls';

const inputs = {
  land_suitability: {
    info: 'inputs.land_suitability.info',
    fullWidth: true,
    widgets: [
      { id: '00b89bc8-b8c1-413f-ba55-2c4e7308133a', fullWidth: true },
      // { id: '41612127-bb5f-4ac3-b80a-4676dd9c3a2b', fullWidth: true },
      {
        title: 'Land Suitability for Coffee in {{country}}',
        type: 'custom',
        fullWidth: true,
        controls: LandSuitabilityControls,
        controlsProps: {
          options: [
            { label: 'Rainfed coffee', value: 'rainfed' },
            { label: 'Irrigated coffee', value: 'irrigated' },
          ],
          layers: {
            historic: [
              '2000s_historic_irrigated_coffee',
              '2000s_historic_rainfed_coffee',
            ],
            rcp4p5: [
              '2020s_rcp4p5_irrigated_coffee',
              '2020s_rcp4p5_rainfed_coffee',
              '2050s_rcp4p5_irrigated_coffee',
              '2050s_rcp4p5_rainfed_coffee',
            ],
            rcp8p5: [
              '2020s_rcp8p5_irrigated_coffee',
              '2020s_rcp8p5_rainfed_coffee',
              '2050s_rcp8p5_irrigated_coffee',
              '2050s_rcp8p5_rainfed_coffee',
            ],
          },
        },
      },
    ],
    // TODO: Additional Graphical Visual
  },
  labor: {
    info: 'inputs.labor.info',
    widgets: [{ id: '4cecc183-2ae4-4045-a7ad-c664ee1c368e' }],
  },
};

const production = {
  production_volume: {
    info: 'production.production_volume.info',
    widgets: [
      { id: 'f44edefe-e3eb-4598-bb37-692d70a21d23' },
      { id: 'ef4cc300-9d92-492a-9252-457a1964a5d1' },
    ],
    // TODO: Additional Callout - Need working query
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
    //   type: 'Total'
    // },
  },
  pests_and_disease: {
    info: 'production.pests_and_disease.info',
    widgets: [{ id: '8cdfd430-0f19-4f3d-ab4f-9d2474f15299' }],
  },
  changing_rainfall: {
    info: 'production.changing_rainfall.info',
    widgets: [{ id: 'd95ad48d-e14e-42cd-a5fb-1d8054c258d9' }],
  },
};

const trade = {
  export_and_import: {
    info: 'trade.export_and_import.info',
    // widgets: [{ id: '96622815-7e6b-4d15-97cc-3ca3bc1a5c98' }],
    widgets: [
      {
        title: 'Export and Import Statistics for Coffee in {{country}}',
        type: 'custom',
        fullWidth: true,
        controls: ImportExportControls,
        controlsProps: {
          products: [
            { label: 'Coffee, green', value: 'Coffee, green' },
            { label: 'Coffee, roasted', value: 'Coffee, roasted' },
          ],
          indicators: [
            { label: 'Quantity', value: 'Quantity' },
            { label: 'Value', value: 'Value' },
          ]
        },
      },
    ],
  },
};

const details = { inputs, production, trade };

export const quotes = [
  {
    location: 'quotes.0.location',
    image: coffee1,
    title: 'quotes.0.title',
    quote:
      'quotes.0.quote',
  },
  {
    location: 'quotes.1.location',
    image: coffee2,
    title: 'quotes.1.title',
    quote:
      'quotes.1.quote',
  },
];

export default details;
