import cotton1 from 'public/images/quotes/cotton2.png';
import cotton2 from 'public/images/quotes/cotton1.png';
import cotton3 from 'public/images/quotes/cotton3.png';
import ImportExport from '../custom-widgets/ImportExport';
import LandSuitability from '../custom-widgets/LandSuitability';
// import WaterStress from '../custom-widgets/WaterStress';

export const cotton_landslide_widget = {
  title: 'widgets:cotton_land_suitability.title',
  info: {
    id: 'cotton_ls',
    description: 'all_land_suitability.description',
    links: [
      {
        link: 'https://resourcewatch.org/data/explore/945185f8-76b5-4f4d-84d6-eff7f96dd1f3',
        name: 'all_land_suitability.links.0',
      },
    ],
    caption: "all_land_suitability.caption"
  },
  type: 'custom',
  fullWidth: true,
  widget: LandSuitability,
  controlsProps: {
    options: [
      {
        label: 'widgets:cotton_land_suitability.rainfed_cotton',
        value: 'rainfed',
      },
      {
        label: 'widgets:cotton_land_suitability.irrigated_cotton',
        value: 'irrigated',
      },
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
};

export const cotton_import_widget = {
  title: 'widgets:export_import.cotton.title',
  info: {
    id: 'cotton_ie',
    description: 'widgets:export_import.description'
  },
  type: 'custom',
  fullWidth: true,
  widget: ImportExport,
  controlsProps: {
    products: [
      {
        label: 'widgets:export_import.cotton.products.cotton_carded_combed',
        value: 'Cotton, carded, combed',
      },
      {
        label: 'widgets:export_import.cotton.products.cotton_lint',
        value: 'Cotton lint',
      },
    ],
    indicators: [
      {
        label: 'widgets:export_import.indicators.quantity',
        value: 'Quantity',
      },
      { label: 'widgets:export_import.indicators.value', value: 'Value' },
    ],
  },
};

const inputs = {
  land_suitability: {
    info: 'inputs.land_suitability.info',
    fullWidth: true,
    widgets: [
      { id: '2a1aab23-1c36-4a17-b5e0-b63a68531c63', fullWidth: true },
      cotton_landslide_widget,
      // { id: 'a5b13394-84a8-4f7c-aa2d-7fc332f5c842', fullWidth: true },
      // {
      //   title: 'widgets:water_stress.title',
      //   info: {
      //     id: 'water-stress',
      //     description: 'widgets:water_stress.cotton_description',
      //   },
      //   type: 'custom',
      //   fullWidth: true,
      //   widget: WaterStress,
      //   controlsProps: {
      //     layers: {
      //       rcp4p5: [
      //         'ws2024cl',
      //         'ws3024cl',
      //         'ws4024cl',
      //       ],
      //       rcp8p5: [
      //         'ws2038cl',
      //         'ws3038cl',
      //         'ws4038cl',
      //       ],
      //     },
      //   },
      // },
    ],
    // TODO: Additional chart vis
  },
  labor: {
    info: ['inputs.labor.info.0', 'inputs.labor.info.1'],
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
    widgets: [{ id: '8cf03ba0-a517-4a43-b5b4-e677ccc6099c', fullWidth: true  }],
    //TODO: Additional Callout - Need working query
    // analysis: {
    //   value: 'N/A',
    //   name: 'Data Coming Soon',
    // },
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
      name: 'Nominal rate of protection, {{crop}} in {{country}} in 2018',
    },
  },
  export_and_import: {
    info: 'trade.export_and_import.info',
    widgets: [cotton_import_widget],
  },
};

export const quotes = {
  IND: {
    audience: 'IN',
    quotes: [
      {
        location: 'quotes.IN.IND.quotes.0.location',
        image: cotton1,
        title: 'quotes.IN.IND.quotes.0.title',
        quote: 'quotes.IN.IND.quotes.0.quote',
      },
      {
        location: 'quotes.IN.IND.quotes.1.location',
        image: cotton2,
        title: 'quotes.IN.IND.quotes.1.title',
        quote: 'quotes.IN.IND.quotes.1.quote',
      },
      {
        location: 'quotes.IN.IND.quotes.2.location',
        image: cotton3,
        title: 'quotes.IN.IND.quotes.2.title',
        quote: 'quotes.IN.IND.quotes.2.quote',
      },
    ],
  },
};

const details = { inputs, production, trade };

export default details;
