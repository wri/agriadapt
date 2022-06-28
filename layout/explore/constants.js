export const EXPLORE_TABS = {
  LAYERS: 'Layers',
  ANALYSIS: 'Analysis',
};

export const EXPLORE_FILTERS = {
  VALUE_CHAINS: {
    placeholder: 'Value Chains',
    hint: 'Select a pathway for forward-looking data.',
    type: 'select',
    multi: true,
    options: [
      { label: 'Rice', value: 'rice' },
      { label: 'Cotton', value: 'cotton' },
      { label: 'Coffee', value: 'coffee' },
    ],
  },
  EMISSION_SCENARIO: {
    placeholder: 'Emission Scenario',
    type: 'select',
    tooltip: 'More information about the filter',
    options: [
      { label: 'Optimistic RCP 4.5', value: 'rcp4.5' },
      { label: 'Pessimistic RCP 8.5', value: 'rcp8.5' },
    ],
  },
  TIMESCALE: {
    placeholder: 'Timescale',
    options: [
      { label: 'Any', value: 'any' },
      { label: 'Historic', value: 'historic' },
      { label: 'Future Looking', value: 'future_looking' },
    ],
    type: 'radio',
  },
};

export const EXPLORE_ANALYSIS = {
  LOCATION_CONFIG: {
    options: [
      { label: 'Select point on map', value: 'point' },
      { label: 'Use my current location', value: 'current' },
      { label: 'Search by address', value: 'address' },
      { label: 'Choose my location', value: 'admin' },
    ],
  }
}