import coffee1 from 'public/images/quotes/coffee1.png';
import coffee2 from 'public/images/quotes/coffee2.png';

const inputs = {
  land_suitability: {
    info: 'Coffee arabica production is highly sensitive to climate change. Significant reductions in climate suitability are expected for most coffee growing regions.',
    fullWidth: true,
    widgets: [
      { id: '00b89bc8-b8c1-413f-ba55-2c4e7308133a', fullWidth: true },
      // { id: '41612127-bb5f-4ac3-b80a-4676dd9c3a2b', fullWidth: true },
      {
        title: ({ country }) => `Land Suitability for Coffee in ${country}`,
        type: 'custom bar',
        fullWidth: true,
        options: [
          { label: 'Rainfed coffee', value: 'rainfed' },
          { label: 'Irrigated coffee', value: 'irrigated' },
        ],
        layers: {
          rainfed: {
            rcp4p5: [
              '2020s_rcp4p5_rainfed_coffee',
              '2050s_rcp4p5_rainfed_coffee',
              '2000s_historic_rainfed_coffee',
            ],
            rcp8p5: [
              '2020s_rcp8p5_rainfed_coffee',
              '2050s_rcp8p5_rainfed_coffee',
              '2000s_historic_rainfed_coffee',
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
        }
      }
    ],
    // TODO: Additional Graphical Visual
  },
  labor: {
    info: 'Agricultural workers are especially vulnerable to increased heat stress, which affects the health of individuals and reduces labour productivity. The Universal Thermal Climate Index identifies outdoor conditions that cause discomfort to people using a combination of temperature, humidity, wind, and radiation to determine the stress (sweating, shivering, skin wetness, etc.) a person undergoes when exposed to outdoor conditions.',
    widgets: [{ id: '4cecc183-2ae4-4045-a7ad-c664ee1c368e' }],
  },
};

const production = {
  production_volume: {
    info: (country: string) =>
      `Explore our data visualizations to better understand where the main coffee growing regions in ${country} are and how much coffee is currently produced.`,
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
    info: 'The coffee berry borer and coffee leaf rust are the most threatening pest and disease to the health of coffee trees. In general, increased temperatures will increase the spread of pests and diseases in coffee trees. However, projected decreased rainfall in certain regions may decrease the spread of pest and disease.',
    widgets: [{ id: '8cdfd430-0f19-4f3d-ab4f-9d2474f15299' }],
  },
  changing_rainfall: {
    info: 'Temperature and rainfall conditions are considered to be important factors in defining potential coffee yield. Both factors interfere in the crop phenology, and consequently in productivity and quality.',
    widgets: [{ id: 'd95ad48d-e14e-42cd-a5fb-1d8054c258d9' }],
    //TODO: Missing WidgetID
  },
};

const trade = {
  export_and_import: {
    info: 'Coffee is one of the most important commercially traded commodities in the international market, as well as the most popular beverage around the world. ',
    // TODO: Custom widget
    // widgets: [{ id: '96622815-7e6b-4d15-97cc-3ca3bc1a5c98' }],
    // TODO: Additional Graphical Visual
    analysis: {
      value: 'N/A',
      name: 'Data Coming Soon',
    },
  },
};

const details = { inputs, production, trade };

export const quotes = [
  {
    location: 'Risaralda, Colombia',
    image: coffee1,
    title: 'Producer, Asociación Asocafé Tatamá',
    quote:
      'AgriAdapt helps producers obtain the climate risk maps that are required by coffee certifications.',
  },
  {
    location: 'Bolivar, Colombia',
    image: coffee2,
    title:
      'Coffee association representative, Asociación De Jóvenes Cafeteros De Ciudad Bolivar',
    quote:
      'The tool would help coffee associations to revise the climatic risk in their lands.',
  },
];

export default details;
