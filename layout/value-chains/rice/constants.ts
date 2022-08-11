import rice1 from 'public/images/quotes/rice1.png'
import rice2 from 'public/images/quotes/rice2.png'
import rice3 from 'public/images/quotes/rice3.png'
import ImportExportControls from '../custom-widgets/ImportExport/Controls';
import LandSuitabilityControls from '../custom-widgets/LandSuitability/Controls';

const inputs = {
  land_suitability: {
    info: 'inputs.land_suitability.info',
    fullWidth: true,
    widgets: [
      { id: '043440a2-b3fd-493e-93a9-362eac5637c7', fullWidth: true },
      // { id: '284fed69-50e7-4d40-92a1-5640eb02e51f', fullWidth: true },
      {
        title: 'widgets:rice_land_suitability.title',
        type: 'custom',
        fullWidth: true,
        controls: LandSuitabilityControls,
        controlsProps: {
          options: [
            [
              { label: 'widgets:rice_land_suitability.dryland_rice', value: 'dryland' },
              { label: 'widgets:rice_land_suitability.wetland_rice', value: 'wetland' },
            ],
            [
              { label: 'widgets:rice_land_suitability.rainfed_rice', value: 'rainfed' },
              { label: 'widgets:rice_land_suitability.irrigated_rice', value: 'irrigated' },
            ],
          ],
          layers: {
            historic: [
              '2000s_historic_irrigated_wetland_rice',
              '2000s_historic_rainfed_dryland_rice',
              '2000s_historic_rainfed_wetland_rice',
            ],
            rcp4p5: [
              '2020s_rcp4p5_irrigated_wetland_rice',
              '2020s_rcp4p5_rainfed_dryland_rice',
              '2020s_rcp4p5_rainfed_wetland_rice',
              '2050s_rcp4p5_irrigated_wetland_rice',
              '2050s_rcp4p5_rainfed_dryland_rice',
              '2050s_rcp4p5_rainfed_wetland_rice',
            ],
            rcp8p5: [
              '2020s_rcp8p5_irrigated_wetland_rice',
              '2020s_rcp8p5_rainfed_dryland_rice',
              '2020s_rcp8p5_rainfed_wetland_rice',
              '2050s_rcp8p5_irrigated_wetland_rice',
              '2050s_rcp8p5_rainfed_dryland_rice',
              '2050s_rcp8p5_rainfed_wetland_rice',
            ],
          },
        }
      },
    ], // TODO: Additional Stacked Bar Visual
  },
  //   fertilizer: {
  //     info: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. In in dolor vitae sem hendrerit ultrices id at urna. Integer lectus lectus, accumsan sed libero in, mollis dapibus justo. Mauris auctor lectus ullamcorper dolor elementum feugiat. Integer et condimentum mi. ',
  //     widgetId: 'a009abe8-96da-4665-9457-8b1941ba0e25',
  //   },
  labor: {
    info: 'inputs.labor.info',
    widgets: [{ id: '4cecc183-2ae4-4045-a7ad-c664ee1c368e', fullWidth: true }],
  },
  seedlings: {
    info: 'inputs.seedlings.info',
    widgets: [{ id: '9529e2a9-112c-4c77-b893-5b5a4d983be7' }],
  },
};

const production = {
  production_volume: {
    info: 'production.production_volume.info',
    fullWidth: true,
    widgets: [
      { id: '5c601744-1e1a-4164-b6af-7830357c2947' },
      { id: 'c98ace8b-0e9d-44e6-91ff-8dafec5a75cb' },
    ], // TODO: Additional Callout - Need working query
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
    //   dataset: '54af072c-7bb5-4bb1-af84-ea7ba0b4fc22',
    //   query: ({ geojson }: { geojson: string }) =>
    //     `select count(b1) as x from data where ST_INTERSECTS(ST_SetSRID(ST_GeomFromGeoJSON(${geojson})), 4326) and system:index='foo_005_rw1_crop_area_production_spam2010V2r0_global_H_ACOF_A'`,
    //   suffix: 'MT',
    //   type: 'Total',
    // },
  },
  changes_in_rainfall: {
    info: 'production.changes_in_rainfall.info',
    widgets: [{ id: 'd95ad48d-e14e-42cd-a5fb-1d8054c258d9' }],
  },
  change_in_yield: {
    info: 'production.change_in_yield.info',
    fullWidth: true,
    widgets: [
      // Make embed/map-swipe
      {
        id: (country: string) =>
          ['India', 'Colombia'].includes(country)
            ? '3118a9fb-e5fd-4dac-814b-be8a901140ef'
            : 'fb28562b-be9c-4630-b3a3-1440dd1e1bf9',
      },
    ],
    // TODO: Additional Callout
    analysis: {
      dataset: 'd17e6978-0848-4a13-ba05-6f4af04ac7d1',
      query: ({ iso }: { iso: string }) =>
        `select avg(rcp85_median) as x from data where country='${iso}' and year=2050`,
      format: '0.00',
      name: 'Projected change in {{crop}} yield by 2050',
      suffix: '%',
    },
  },
};

// const processing = {};

const trade = {
  policies_and_price: {
    info: 'trade.policies_and_price.info',
    // TODO: Additional Callout
    analysis: {
      dataset: '641c0a35-f2e5-4198-8ed9-576ea7e9685a',
      query: ({ iso }: { iso: string }) =>
        `select nrp as x from data where countrycode='${iso}' order by year desc limit 1`,
      format: '0.00',
      suffix: '%',
      name: 'Nominal rate of protection, {{crop}} in {{country}} in 2018',
    },
  },
  food_vulnerability: {
    info: 'trade.food_vulnerability.info',
    // TODO: Additional Callout
    analysis: {
      dataset: '7e98607d-23d8-42f8-9662-5658f349bf0f',
      query: ({ country }: { country: string }) =>
        `select cri_score / 100 as x from data where country='${country}'`,
      format: '0.00',
      // type: 'Total',
      // TODO: Translate
      name: `Food vulnerability score in 2019`,
    },
  },
  export_and_import: {
    info: 'trade.export_and_import.info',
    widgets: [
      {
        title: 'widgets:export_import.rice.title',
        type: 'custom',
        fullWidth: true,
        controls: ImportExportControls,
        controlsProps: {
          products: [
            { label: 'widgets:export_import.rice.products.rice_husked', value: 'Rice, husked' },
            { label: 'widgets:export_import.rice.products.rice_milled', value: 'Rice, milled' },
            { label: 'widgets:export_import.rice.products.rice_paddy', value: 'Rice, paddy' },
          ],
          indicators: [
            { label: 'widgets:export_import.indicators.quantity', value: 'Quantity' },
            { label: 'widgets:export_import.indicators.value', value: 'Value' },
          ]
        },
      },
    ],
  },
};

export const quotes = [
  {
    location: 'quotes.0.location',
    image: rice1,
    title: 'quotes.0.title',
    quote: 'quotes.0.quote'
  },
  {
    location: 'quotes.1.location',
    image: rice2,
    title: 'quotes.1.title',
    quote: 'quotes.1.quote',
  },
  {
    location: 'quotes.2.location',
    image: rice3,
    title: 'quotes.2.title',
    quote: 'quotes.2.quote',
  },
];


const details = { inputs, production, trade };

export default details;
