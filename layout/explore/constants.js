export const EXPLORE_TABS = {
  LAYERS: 'Layers',
  ANALYSIS: 'Analysis',
};

export const EXPLORE_FILTERS = {
  STANDARD: {
    VALUE_CHAINS: {
      placeholder: 'Value Chains',
      hint: 'Select a pathway for forward-looking data.',
      type: 'select',
      options: [
        { label: 'Rice', value: 'rice' },
        { label: 'Cotton', value: 'cotton' },
        { label: 'Coffee', value: 'coffee' },
      ],
    },
  },
  ADVANCED: {
    EMISSION_SCENARIO: {
      placeholder: 'Emission Scenario',
      type: 'select',
      tooltip: 'More information about the filter'
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

export const EXPLORE_ANALYSIS = {
  LOCATION_CONFIG: {
    options: [
      { label: 'Select point on map', value: 'point' },
      { label: 'Use my current location', value: 'current' },
      { label: 'Search by address', value: 'search' },
      { label: 'Choose my location', value: 'dropdown' },
    ],
  }
}