export const EXPLORE_SECTIONS = {
  DISCOVER: "Discover",
  ALL_DATA: "All data",
  NEAR_REAL_TIME: "Near Real-Time",
  TOPICS: "Topics",
  AREAS_OF_INTEREST: "Areas of Interest",
  COLLECTIONS: "Collections",
  FAVORITES: "Favorites",
  ...(!process.env.NEXT_PUBLIC_FEATURE_FLAG_MY_DATA && {
    MY_DATA: "My Data",
  }),
};

export const EXPLORE_TABS = {
  LAYERS: 'Layers',
  ANALYSIS: 'Analysis',
}

export const EXPLORE_SUBSECTIONS = {
  NEW_AREA: "area/new",
};

export const EXPLORE_FILTERS = {
  VALUE_CHAINS: {
    placeholder: 'Value Chains',
    type: 'select',
    options: [
      { label: 'Rice', value: 'rice' },
      { label: 'Cotton', value: 'cotton' },
      { label: 'Coffee', value: 'coffee' },
    ],
  },
  ADVANCED: {
    TIMESCALE: {
      placeholder: 'Timescale',
      type: 'select',
    },
    REGION: {
      placeholder: 'Region',
      type: 'select',
    },
    EMISSION_SCENARIO: {
      placeholder: 'Emission Scenario',
      type: 'select',
    },
    SUPPLY_CHAIN_NODE: {
      placeholder: 'Supply Chain Node',
      type: 'select',
    },
    SUPPLY_CHAIN_NODE: {
      placeholder: 'Time Frame',
      options: [
        { label: 'Seasonal', value: 'seasonal' },
        { label: 'Annual', value: 'annual' },
      ],
      type: 'radio',
    },
  },
};
export const EXPLORE_DATASETS_IDS = [
  '66d28bbc-1e6e-4156-9ba2-875ecab665af', // Projected Change in Extreme Precipitation Days
  'ea2db3a6-49c8-4d41-a2ab-758eb6fe4bc0', // Landslide Susceptibility
  'c4b12251-2d61-458f-a2c0-096c37901ade', // Projected Change in Annual Average Maximum Temeprature
  '4ca6826c-718d-457d-b4e2-e9277d7ed62c', // Projected Change in Annual Average Temperature
  'cit01701-Travel-Time-to-Major-Cities', // Accessibility to Cities
  'faf79d2c-5e54-4591-9d70-4bd1029c18e6', // Projected Change in Cumulative Precipitation
  'c66d7f3a-d1a8-488f-af8b-302b0f2c3840', // Water Stress
  'f4a83ced-4aea-4cf5-aa71-00927fe707e1', // Seasonal Variability of Water
];
