// import WaterStress from '../custom-widgets/WaterStress';
import ImportExport from '../custom-widgets/ImportExport';
import LandSuitability from '../custom-widgets/LandSuitability';

export const coffee_landslide_widget = {
  title: 'widgets:coffee_land_suitability.title',
  info: {
    id: 'coffee_ls',
    description: 'widgets:all_land_suitability.description',
    links: [
      {
        link: 'https://resourcewatch.org/data/explore/945185f8-76b5-4f4d-84d6-eff7f96dd1f3',
        name: 'widgets:all_land_suitability.links.0',
      },
    ],
    caption: "widgets:all_land_suitability.caption"
  },
  type: 'custom',
  fullWidth: true,
  widget: LandSuitability,
  controlsProps: {
    options: [
      {
        label: 'widgets:coffee_land_suitability.rainfed_coffee',
        value: 'rainfed',
      },
      {
        label: 'widgets:coffee_land_suitability.irrigated_coffee',
        value: 'irrigated',
      },
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
};

export const coffee_import_widget = {
  title: 'widgets:export_import.coffee.title',
  info: {
    id: 'coffee_ie',
    description: 'widgets:export_import.description'
  },
  type: 'custom',
  fullWidth: true,
  widget: ImportExport,
  controlsProps: {
    products: [
      {
        label: 'widgets:export_import.coffee.products.coffee_green',
        value: 'Coffee, green',
      },
      {
        label: 'widgets:export_import.coffee.products.coffee_roasted',
        value: 'Coffee, roasted',
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
      { id: '00b89bc8-b8c1-413f-ba55-2c4e7308133a', fullWidth: true },
      coffee_landslide_widget,
      // { id: '41612127-bb5f-4ac3-b80a-4676dd9c3a2b', fullWidth: true },
      // {
      //   title: 'widgets:water_stress.title',
      //   info: {
      //     id: 'water-stress',
      //     description: 'widgets:water_stress.coffee_description',
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
    // TODO: Additional Graphical Visual
  },
  labor: {
    info: ['inputs.labor.info.0', 'inputs.labor.info.1'],
    widgets: [{ id: '4cecc183-2ae4-4045-a7ad-c664ee1c368e' }],
  },
};

const production = {
  production_volume: {
    info: 'production.production_volume.info',
    widgets: [
      { id: 'f44edefe-e3eb-4598-bb37-692d70a21d23' },
      { id: 'ef4cc300-9d92-492a-9252-457a1964a5d1', fullWidth: true },
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
  changes_in_rainfall: {
    info: 'production.changes_in_rainfall.info',
    widgets: [{ id: 'd95ad48d-e14e-42cd-a5fb-1d8054c258d9' }],
  },
};

const trade = {
  export_and_import: {
    info: 'trade.export_and_import.info',
    // widgets: [{ id: '96622815-7e6b-4d15-97cc-3ca3bc1a5c98' }],
    widgets: [coffee_import_widget],
  },
};

const details = { inputs, production, trade };

export default details;
