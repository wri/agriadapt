const chain_items = {
  inputs: {
    label: { text: 'Inputs', icon: 'icon-inputs' },
    options: {
      land_suitability: {
        label: 'Land Suitability',
        icon: 'icon-land-suitability',
      },
      seedlings: { label: 'Seedlings', icon: 'icon-seedlings' },
      // fertilizer: { label: 'Fertilizer', icon: 'icon-fertilizer' },
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
      production: {
        label: 'Production',
        icon: 'icon-production',
      },
      pests_and_disease: {
        label: 'Pest and Disease',
        icon: 'icon-pests-and-diseases',
      },
      production_volume: {
        label: 'Production Volume',
        icon: 'icon-pests-and-diseases',
      },
      changing_rainfall: {
        label: 'Changing Rainfall',
        icon: 'icon-pests-and-diseases',
      },
    },
  },
  // processing: {
  //   label: { text: 'Processing', icon: 'icon-processing' },
  //   options: {
  //     lorem_ipsum: { label: 'Lorem ipsum', icon: 'icon-labor' },
  //     lorem_ipsum_2: { label: 'Lorem ipsum', icon: 'icon-labor' },
  //   },
  // },
  trade: {
    label: { text: 'Trade', icon: 'icon-trade' },
    options: {
      policies_and_price: { label: 'Lorem ipsum', icon: 'icon-labor' },
      food_vulnerability: { label: 'Lorem ipsum', icon: 'icon-labor' },
      export_and_import: { label: 'Lorem ipsum', icon: 'icon-labor' },
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
