import { capitalizeFirstLetter } from "utils/utils";

const inputs = {
  land_suitability: {
    info: 'Rice cultivation is highly vulnerable to climate fluctuations. Explore the visualizations below to learn more about how land suitability for rice production may change in the future due to climate change.',
    widgets: [{ id: '043440a2-b3fd-493e-93a9-362eac5637c7' }], // TODO: Additional Stacked Bar Visual
  },
  seedlings: {
    info: 'Rice seeds are the most sensitive to drought and high temperature during early seed development. The earlier plant drought occurs, the greater the damage to subsequent seed quality. (Rahman, Ellis, 2019).',
    widgets: [{ id: '9529e2a9-112c-4c77-b893-5b5a4d983be7' }],
  },
  //   fertilizer: {
  //     info: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. In in dolor vitae sem hendrerit ultrices id at urna. Integer lectus lectus, accumsan sed libero in, mollis dapibus justo. Mauris auctor lectus ullamcorper dolor elementum feugiat. Integer et condimentum mi. ',
  //     widgetId: 'a009abe8-96da-4665-9457-8b1941ba0e25',
  //   },
  labor: {
    info: 'Agricultural workers are especially vulnerable to increased heat stress, which affects the health of individuals and reduces labour productivity. The Universal Thermal Climate Index identifies outdoor conditions that cause discomfort to people using a combination of temperature, humidity, wind, and radiation to determine the stress (sweating, shivering, skin wetness, etc.) a person undergoes when exposed to outdoor conditions.',
    widgets: [{ id: '4cecc183-2ae4-4045-a7ad-c664ee1c368e' }],
  },
};

const production = {
  change_in_yield: {
    info: 'The vast majority of climate change impacts on rice production result from variations in temperature and rainfall that lead to flooding, water  scarcity, and increases in pests, diseases, and weeds. Despite significant uncertainty in predicted future climate conditions, it is important to measure the potential effects of climate change on global rice production as these insights can identify areas that are vulnerable to climate change and inform the development of adaptation strategies. Considering changes in rice yields is also valuable for ensuring future food security under the pressures of an increasing population and a growing rice demand.',
    widgets: [
      { id: '3118a9fb-e5fd-4dac-814b-be8a901140ef', fullWidth: true },
      { id: 'fb28562b-be9c-4630-b3a3-1440dd1e1bf9' },
    ], // TODO: These ID's are from separate cells on the Google sheets
    // TODO: Additional Callout
    analysis: false,
  },
  production: {
    info: 'Studies suggest that changes in rainfall patterns and distribution could lead to substantial impacts on land and water resources for rice production.',
    widgets: [{ id: 'd95ad48d-e14e-42cd-a5fb-1d8054c258d9' }],
  },
  production_volume: {
    info: (country: string) =>
      `Explore our data visualizations to better understand where the main rice growing regions in ${country} are and how much rice is currently produced.`,
    widgets: [
      { id: 'c98ace8b-0e9d-44e6-91ff-8dafec5a75cb' },
      { id: '5c601744-1e1a-4164-b6af-7830357c2947' },
    ], // TODO: Additional Callout
    analysis: false,
  },
};

// const processing = {};

const trade = {
  policies_and_price: {
    info: 'The Nominal Rate of Protection measures the extent to which agricultural policies affect the market price of a commodity. It computes the difference between the price a farmer receives versus the price a farmer would receive without these policies in place.',
    // TODO: Additional Callout
    analysis: {
      dataset: '641c0a35-f2e5-4198-8ed9-576ea7e9685a',
      query: ({ iso }: { iso: string }) =>
        `select nrp as x from data where countrycode='${iso}' order by year desc limit 1`,
      format: '0.00',
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
  food_vulnerability: {
    info: 'The Food Vulnerability Score shows a country’s vulnerability to climate change on a scale of 0 to 1. Lower scores indicate that countries that are less vulnerable. The Food score incorporates six indicators (projected change of cereal yields, projected population growth, food import dependency, rural population, agricultural capacity, and child malnutrition) to capture its vulnerability with regard to food production and demand, nutrition, and rural population.',
    // TODO: Additional Callout
    analysis: {
      dataset: '7e98607d-23d8-42f8-9662-5658f349bf0f',
      query: ({ country }: { country: string }) =>
        `select cri_score / 100 as x from data where country='${country}'`,
      format: '0.00',
      // type: 'Total',
      name: `Food vulnerability score in 2018`,
    },
  },
  export_and_import: {
    info: 'The rice market is highly exposed to climate change. Climate change not only creates risks for producing countries but also transmits those risks through agricultural commodity trade to consumers of all kinds, and can do so over significant distances.',
    // TODO: Additional Graphical Visual
  },
};

const details = { inputs, production, trade };

export default details;
