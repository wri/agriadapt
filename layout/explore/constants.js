export const EXPLORE_SECTIONS = {
  DISCOVER: 'Discover',
  ALL_DATA: 'All data',
  NEAR_REAL_TIME: 'Near Real-Time',
  TOPICS: 'Topics',
  AREAS_OF_INTEREST: 'Areas of Interest',
  COLLECTIONS: 'Collections',
  FAVORITES: 'Favorites',
  ...(!process.env.NEXT_PUBLIC_FEATURE_FLAG_MY_DATA && {
    MY_DATA: 'My Data',
  }),
};

export const EXPLORE_TABS = {
  LAYERS: 'Layers',
  ANALYSIS: 'Analysis',
};

export const EXPLORE_SUBSECTIONS = {
  NEW_AREA: 'area/new',
};

export const EXPLORE_FILTERS = {
  STANDARD: {
    EMISSION_SCENARIO: {
      label: 'Filter Layers by Emission Scenario',
      hint: 'Select a pathway for forward-looking data.',
      placeholder: 'Emission Scenario',
      type: 'select',
      tooltip: 'More information about the filter'
    },
  },
  ADVANCED: {
    VALUE_CHAINS: {
      placeholder: 'Value Chains',
      type: 'select',
      options: [
        { label: 'Rice', value: 'rice' },
        { label: 'Cotton', value: 'cotton' },
        { label: 'Coffee', value: 'coffee' },
      ],
    },
    REGION: {
      placeholder: 'Region',
      type: 'select',
    },
    TIMESCALE: {
      placeholder: 'Timescale',
      type: 'select',
    },
    SUPPLY_CHAIN_NODE: {
      placeholder: 'Supply Chain Node',
      type: 'select',
    },
    TIME_FRAME: {
      placeholder: 'Time Frame',
      options: [
        { label: 'Seasonal', value: 'seasonal' },
        { label: 'Annual', value: 'annual' },
      ],
      type: 'radio',
    },
  },
};
