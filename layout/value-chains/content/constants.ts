export const item_labels = {
  land_suitability: {
    label: 'common:content.land_suitability',
    icon: 'icon-land-suitability',
  },
  seedlings: { label: 'common:content.seedlings', icon: 'icon-seedlings' },
  // fertilizer: { label: 'Fertilizer', icon: 'icon-fertilizer' },
  labor: { label: 'common:content.labor', icon: 'icon-labor' },
  change_in_yield: {
    label: 'common:content.change_in_yield',
    icon: 'icon-change-in-yield',
  },
  changes_in_rainfall: {
    label: 'common:content.changes_in_rainfall',
    icon: 'icon-production',
  },
  pests_and_disease: {
    label: 'common:content.pest_and_disease',
    icon: 'icon-pests-and-diseases',
  },
  production_volume: {
    label: 'common:content.production_volume',
    icon: 'icon-pests-and-diseases',
  },
  // changing_rainfall: {
  //   label: 'Changing Rainfall',
  //   icon: 'icon-pests-and-diseases',
  // },
  policies_and_price: {
    label: 'common:content.policies_and_price',
    icon: 'icon-labor',
  },
  food_vulnerability: {
    label: 'common:content.food_vulnerability',
    icon: 'icon-labor',
  },
  export_and_import: {
    label: 'common:content.export_and_import',
    icon: 'icon-labor',
  },
};

export const chain_items = {
  inputs: {
    label: { text: 'common:content.inputs', icon: 'icon-inputs' },
    options: [
      'land_suitability',
      'seedlings',
      // 'fertilizer',
      'labor',
    ],
  },
  production: {
    label: { text: 'common:content.production', icon: 'icon-production' },
    options: [
      'change_in_yield',
      'changes_in_rainfall',
      'pests_and_disease',
      'production_volume',
    ],
  },
  // processing: {
  //   label: { text: 'Processing', icon: 'icon-processing' },
  //   options: ['lorem_ipsum']
  // },
  trade: {
    label: { text: 'common:content.trade', icon: 'icon-trade' },
    options: ['poliies_and_price', 'food_vulnerability', 'export_and_import'],
  },
};

export const india_disclaimer = 'common:india_maps_disclaimer';