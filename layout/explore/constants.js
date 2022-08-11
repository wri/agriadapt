export const EXPLORE_TABS = {
  LAYERS: 'layers',
  ANALYSIS: 'analysis',
};

export const EXPLORE_FILTERS = {
  VALUE_CHAINS: {
    placeholder: 'Value Chains',
    hint: 'explore:layers.value_chains.hint',
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
      { label: 'common:emission_scenarios.optimistic', value: 'rcp4.5' },
      { label: 'common:emission_scenarios.pessimistic', value: 'rcp8.5' },
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
  },
};

export const INDIA_BLACKLIST_DATASET_IDS = [
  '2dcd7aeb-d290-414b-80a2-8d90c44ae02a',
  '4d2d47c1-fed1-4484-83e3-c91c3f6f7315',
  'd17e6978-0848-4a13-ba05-6f4af04ac7d1',
  '641c0a35-f2e5-4198-8ed9-576ea7e9685a',
];
