const chain_items = [
  {
    id: 'inputs',
    label: { text: 'Inputs', icon: 'icon-inputs' },
    options: [
      { id: 'land_suitability', label: 'Land Suitability', icon: 'icon-land-suitability' },
      { id: 'seedlings', label: 'Seedlings', icon: 'icon-seedlings' },
      { id: 'fertilizer', label: 'Fertilizer', icon: 'icon-fertilizer' },
      { id: 'labor', label: 'Labor', icon: 'icon-labor' },
    ],
  },
  {
    id: 'production',
    label: { text: 'Production', icon: 'icon-production' },
    options: [
      { id: 'change_in_yield', label: 'Change in Yield', icon: 'icon-change-in-yield' },
      { id: 'pests_and_diseases', label: 'Pests & Diseases', icon: 'icon-pests-and-diseases' },
    ],
  },
  {
    id: 'processing',
    label: { text: 'Processing', icon: 'icon-processing' },
    options: [
      { id: 'lorem_ipsum', label: 'Lorem ipsum', icon: 'icon-labor' },
      { id: 'lorem_ipsum', label: 'Lorem ipsum', icon: 'icon-labor' },
    ],
  },
  {
    id: 'trade',
    label: {text: 'Trade', icon: 'icon-trade'},
    options: [
      { id: 'lorem_ipsum', label: 'Lorem ipsum', icon: 'icon-labor' },
      { id: 'lorem_ipsum', label: 'Lorem ipsum', icon: 'icon-labor' },
    ],
  },
];

const intros = {
  inputs: {
    header: 'Do we need an inputs intro?',
    description:
      'Lörem ipsum koldioxidbanta flitbonus pamäbel då vimiren pasamma. Exogisk höbelt, i preplastisk. Nys ultravigisk us emedan äd sisat. Lasat inat morotsmobb har påprest misade. Vass popregt. ',
  },
  production: {},
  processing: {},
  trade: {},
};

const chains = {
  RICE: {
    inputs: {
      land_suitability: {
        info: 'Soil salinity, texture, organic matter, pH, water quality, rainfall and temperature are among the most important attributes that could be used to determine the suitable parcel of land for rice cultivation.',
        widget: 'icon-',
      },
      seedlings: {
        info: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. In in dolor vitae sem hendrerit ultrices id at urna. Integer lectus lectus, accumsan sed libero in, mollis dapibus justo. Mauris auctor lectus ullamcorper dolor elementum feugiat. Integer et condimentum mi. ',
        widget: 'icon-',
      },
      fertilizer: {
        info: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. In in dolor vitae sem hendrerit ultrices id at urna. Integer lectus lectus, accumsan sed libero in, mollis dapibus justo. Mauris auctor lectus ullamcorper dolor elementum feugiat. Integer et condimentum mi. ',
        widget: 'icon-',
      },
      labor: {
        info: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. In in dolor vitae sem hendrerit ultrices id at urna. Integer lectus lectus, accumsan sed libero in, mollis dapibus justo. Mauris auctor lectus ullamcorper dolor elementum feugiat. Integer et condimentum mi. ',
        widget: 'icon-',
      },
    },
    production: {
      change_in_yield: {},
      pests_and_diseases: {},
    },
    processing: {},
    trade: {},
  },
};

export { intros, chain_items, chains };
