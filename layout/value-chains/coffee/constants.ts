const inputs = {
    land_suitability: {
        info: 'Coffee arabica production is highly sensitive to climate change. Significant reductions in climate suitability are expected for most coffee growing regions.',
        widgetIds: ['00b89bc8-b8c1-413f-ba55-2c4e7308133a'], 
        // TODO: Additional Graphical Visual
    },
    labor: {
        info: 'Agricultural workers are especially vulnerable to increased heat stress, which affects the health of individuals and reduces labour productivity. The Universal Thermal Climate Index identifies outdoor conditions that cause discomfort to people using a combination of temperature, humidity, wind, and radiation to determine the stress (sweating, shivering, skin wetness, etc.) a person undergoes when exposed to outdoor conditions.',
        widgetIds: ['4cecc183-2ae4-4045-a7ad-c664ee1c368e']
    }
}

const production = {
    production_volume: {
        info: (country: string) => `Explore our data visualizations to better understand where the main coffee growing regions in ${country} are and how much coffee is currently produced.`,
        widgetIds: ['f44edefe-e3eb-4598-bb37-692d70a21d23','ef4cc300-9d92-492a-9252-457a1964a5d1'],
        // TODO: Additional Callout
    },
    pests_and_disease: {
        info: 'The coffee berry borer and coffee leaf rust are the most threatening pest and disease to the health of coffee trees. In general, increased temperatures will increase the spread of pests and diseases in coffee trees. However, projected decreased rainfall in certain regions may decrease the spread of pest and disease.',
        widgetIds: ['8cdfd430-0f19-4f3d-ab4f-9d2474f15299'],
    },
    changing_rainfall: {
        info: 'Temperature and rainfall conditions are considered to be important factors in defining potential coffee yield. Both factors interfere in the crop phenology, and consequently in productivity and quality.',
        widgetIds: ['d95ad48d-e14e-42cd-a5fb-1d8054c258d9'], //TODO: Missing WidgetID
    },
}

const trade = {
    export_and_import: {
        info: 'Coffee is one of the most important commercially traded commodities in the international market, as well as the most popular beverage around the world. ',
        // TODO: Additional Graphical Visual
    },
}

const details = { inputs, production, trade };

export default details;