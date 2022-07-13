const inputs = {
  land_suitability: {
    info: 'Appropriate cotton land use decisions are vital to achieve optimum productivity of the land and ensure environmental sustainability. Explore the visualizations below to learn more about how cotton land suitability may change in the future.',
    widgets: [{ id: '2a1aab23-1c36-4a17-b5e0-b63a68531c63' }],
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
    widgets: [{ id: '8cf03ba0-a517-4a43-b5b4-e677ccc6099c' }],
    //TODO: Additional Callout
    analysis: {
      query: '',
      type: 'Total',
      name: (crop: string, country: string, year: number) =>
        `${crop} production in ${country} in ${year}`,
    },
  },
  pests_and_disease: {
    info: 'Changes to climate can result in the continuous evolution of pests, making them harder to contain, which can significantly influence yield and quality. Suitable temperature, humidity, low rainfall, low wind speed, suitable sunshine time and low evaporation are more likely to cause cotton pests and diseases. (Xiao, Q., Li, W., Kai, Y. et al.)',
    widgets: [], //TODO: Missing WidgetID (N/A)
  },
};
const trade = {
  policies_and_price: {
    info: 'The Nominal Rate of Protection measures the extent to which agricultural policies affect the market price of a commodity. It computes the difference between the price a farmer receives versus the price a farmer would receive without these policies in place.',
    //TODO: Callout
    analysis: true,
  },
  export_and_import: {
    info: 'Cotton is a very important cash crop which has a growing demand for domestic and international market. Disruptions to cotton production can result in an uncertain market for farmers and ripple effects can be seen throughout the entire value chain (Cotton 2040, 2021). Production constraints will impact global markets by effecting product availabilty, quality, and price.',
    //TODO: Additional Chart Visual
  },
};

const details = { inputs, production, trade };

export default details;
