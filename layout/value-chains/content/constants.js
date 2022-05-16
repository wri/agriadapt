import rice1 from 'public/static/images/quotes/rice1.png'
import rice2 from 'public/static/images/quotes/rice2.png'
import rice3 from 'public/static/images/quotes/rice3.png'
import cotton1 from 'public/static/images/quotes/cotton1.png'
import cotton2 from 'public/static/images/quotes/cotton2.png'
import cotton3 from 'public/static/images/quotes/cotton3.png'
import coffee1 from 'public/static/images/quotes/coffee1.png'
import coffee2 from 'public/static/images/quotes/coffee2.png'

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

const riceQuotes = [
  {
    location: 'Chengalpet Dt, Tamilnadu',
    image: rice1,
    title: 'Mr. V. Prabhu',
    quote: 'Climate hazards left us in bankruptcy and led us to close down many rice mill units. With the information in this platform, however, I now understand how climate change is affecting the business and can better decide upon our operational plan and make the appropriate investments to prevent future climate risks.'
  },
  {
    location: 'Coimbatore, Tamilnadu, India',
    image: rice2,
    title: 'Asst Prof',
    quote: 'The Climate Risk Tool will help us to provide all stakeholders in the paddy value chain with the appropriate climate information they need to prepare against possible climate hazards'
  },
  {
    location: 'Kanchipuram Dt, Tamilnadu, India',
    image: rice3,
    title: 'Ricemill Owner Association',
    quote: 'An abnormal rise in temperature and unprecedented rainfall has drastically changed the processing methods of rice over the years, but the policies for rice mill units under small scale industry remain unchanged. With this new climate risk data, we hope to influence decision makers and adjust the policies on subsidies to support small scale workers in a shifting climate.'
  },
];

const cottonQuotes = [
  {
    location: 'Nandyala, India',
    image: cotton1,
    title: 'Scientist, Regional Agricultural Research Station (RARS)',
    quote: 'One of the important factors which can affect the cotton supply chain is the pest infestation which not only reduces the yield but also reduces the quality of ginnable cotton. The incidence of pests and diseases are climate related and the CRT can help us in providing early warning systems with its data on climate variability and forecasted risks'
  },
  {
    location: 'Vijayawada, India',
    image: cotton2,
    title: 'Climate Change Activities Manager, Asian Infrastructure Investment Bank',
    quote: 'Cotton’s supply chain is facing several challenges in the quality of cotton triggered by extreme climate events. Through a robust platform like CRT, Ginners/Spinners can identify the least affected regions to climate hazards and plan their purchases of cotton accordingly from these cultivated areas.'
  },
  {
    location: 'Guntur, India',
    image: cotton3,
    title: 'Manager, KDM Spinners Pvt Ltd.',
    quote: 'Extreme weather events are affecting the quality of cotton. We have been facing a lot of problems related to the poor quality of cotton while procurement, which affects the final output and poses serious threats to the business. By knowing the climatic hazards and unseasonal rain through the CRT, we can procure cotton well in advance to avoid the purchase of cotton at a high cost and of poor quality. We can also sensitize our suppliers/farmers about climate hazards and possible infestation of pests and disease so that we can avoid climate related risks at the source itself.'
  },
];

const coffeeQuotes = [
  {
    location: 'Risaralda, Colombia',
    image: coffee1,
    title: 'Producer, Asociación Asocafé Tatamá',
    quote: 'The CRT helps producers obtain the climate risk maps that are required by coffee certifications.'
  },
  {
    location: 'Bolivar, Colombia',
    image: coffee2,
    title: 'Coffee association representative, Asociación De Jóvenes Cafeteros De Ciudad Bolivar',
    quote: 'The tool would help coffee associations to revise the climatic risk in their lands.'
  },
]

export { intros, chain_items, chains, user_stories, riceQuotes, cottonQuotes, coffeeQuotes };
