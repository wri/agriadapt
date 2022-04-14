const chain_items = {
  inputs: {
    label: { text: 'Inputs', icon: 'icon-inputs' },
    options: {
      land_suitability: {
        label: 'Land Suitability',
        icon: 'icon-land-suitability',
      },
      seedlings: { label: 'Seedlings', icon: 'icon-seedlings' },
      fertilizer: { label: 'Fertilizer', icon: 'icon-fertilizer' },
      labor: { label: 'Labor', icon: 'icon-labor' },
    },
  },
  production: {
    label: { text: 'Production', icon: 'icon-production' },
    options: {
      change_in_yield: {
        label: 'Change in Yield',
        icon: 'icon-change-in-yield',
      },

      pests_and_diseases: {
        label: 'Pests & Diseases',
        icon: 'icon-pests-and-diseases',
      },
    },
  },
  processing: {
    label: { text: 'Processing', icon: 'icon-processing' },
    options: {
      lorem_ipsum: { label: 'Lorem ipsum', icon: 'icon-labor' },
      lorem_ipsum_2: { label: 'Lorem ipsum', icon: 'icon-labor' },
    },
  },
  trade: {
    label: { text: 'Trade', icon: 'icon-trade' },
    options: {
      lorem_ipsum: { label: 'Lorem ipsum', icon: 'icon-labor' },
      lorem_ipsum_2: { label: 'Lorem ipsum', icon: 'icon-labor' },
    },
  },
};

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
        widgetId: 'dc8a4c78-60c9-491f-88a3-e31b3626c598',
      },
      seedlings: {
        info: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. In in dolor vitae sem hendrerit ultrices id at urna. Integer lectus lectus, accumsan sed libero in, mollis dapibus justo. Mauris auctor lectus ullamcorper dolor elementum feugiat. Integer et condimentum mi. ',
        widgetId: 'a009abe8-96da-4665-9457-8b1941ba0e25',
      },
      fertilizer: {
        info: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. In in dolor vitae sem hendrerit ultrices id at urna. Integer lectus lectus, accumsan sed libero in, mollis dapibus justo. Mauris auctor lectus ullamcorper dolor elementum feugiat. Integer et condimentum mi. ',
        widgetId: null,
      },
      labor: {
        info: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. In in dolor vitae sem hendrerit ultrices id at urna. Integer lectus lectus, accumsan sed libero in, mollis dapibus justo. Mauris auctor lectus ullamcorper dolor elementum feugiat. Integer et condimentum mi. ',
        widgetId: null,
      },
    },
    production: {
      change_in_yield: {},
      pests_and_diseases: {},
    },
    processing: {},
    trade: {},
  },
  COFFEE: {},
  COTTON: {},
};

const user_stories = {
  header: 'Applicable Header e.g. “Hear From...”',
  stories: [
    {
      person: 'Daniel',
      location: 'Colombia',
      quote:
        'When my crops were devastated by the extreme rainfalls last summer, I was fortunate to have CRT data to demonstrate the loss and facilitate the process to claim the insurance.',
    },
  ],
};

export { intros, chain_items, chains, user_stories };
