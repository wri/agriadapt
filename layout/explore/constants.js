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
    options: ['Rice', 'Cotton', 'Coffee'],
  },
  ADVANCED: {
    TIMESCALE: {
      placeholder: 'Timescale',
    },
    REGION: {
      placeholder: 'Region',
    },
    EMISSION_SCENARIO: {
      placeholder: 'Emission Scenario',
    },
    SUPPLY_CHAIN_NODE: {
      placeholder: 'Supply Chain Node',
    },
  },
};