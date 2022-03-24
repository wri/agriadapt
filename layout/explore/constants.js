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