export const chartData = {
  data: [
    {
      name: 'table',
      transform: [
        {
          type: 'joinaggregate',
          ops: ['distinct'],
          fields: ['x'],
          as: ['count'],
        },
      ],
      format: {
        type: 'json',
        property: 'data',
      },
      url: 'https://api.resourcewatch.org/v1/query/03bfb30e-829f-4299-bab9-b2be1b66b5d4?sql=SELECT%20country%20as%20x%20%2C%20country%20as%20color%20%2C%20gross_value_added_roundwood_production_us_million%20as%20y%20FROM%20for_020_forest_employment_gdp_edit%20ORDER%20BY%20gross_value_added_roundwood_production_us_million%20desc%20LIMIT%2050',
    },
    {
      name: 'filtered',
      source: 'table',
      transform: [],
    },
  ],
  config: {
    range: {
      dotSize: [20, 250],
      category20: [
        '#3BB2D0',
        '#2C75B0',
        '#FAB72E',
        '#EF4848',
        '#65B60D',
        '#C32D7B',
        '#F577B9',
        '#5FD2B8',
        '#F1800F',
        '#9F1C00',
        '#A5E9E3',
        '#B9D765',
        '#393F44',
        '#CACCD0',
        '#717171',
      ],
      ordinal: {
        scheme: 'greens',
      },
      ramp: {
        scheme: 'purples',
      },
    },
    axis: {
      labelFontSize: 13,
      labelFont: 'Lato',
      labelColor: '#717171',
      labelPadding: 10,
      ticks: true,
      tickSize: 8,
      tickColor: '#A9ABAD',
      tickOpacity: 0.5,
      tickExtra: false,
    },
    axisX: {
      bandPosition: 0.5,
      domainWidth: 1.2,
      domainColor: '#A9ABAD',
      labelAlign: 'center',
      labelBaseline: 'top',
    },
    axisY: {
      domain: false,
      labelAlign: 'left',
      labelBaseline: 'bottom',
      tickOpacity: 0.5,
      grid: true,
      ticks: false,
      gridColor: '#A9ABAD',
      gridOpacity: 0.5,
    },
    mark: {
      fill: '#3BB2D0',
    },
    symbol: {
      fill: '#3BB2D0',
      stroke: '#fff',
    },
    rect: {
      fill: '#3BB2D0',
    },
    line: {
      interpolate: 'linear',
      stroke: '#3BB2D0',
      fillOpacity: 0,
    },
    name: 'user-custom',
  },
  signals: [],
  autosize: {
    type: 'fit',
    contains: 'padding',
  },
  scales: [
    {
      name: 'x',
      type: 'linear',
      domain: {
        data: 'filtered',
        field: 'y',
      },
      range: 'width',
      nice: true,
      zero: true,
    },
    {
      name: 'y',
      type: 'band',
      domain: {
        data: 'filtered',
        field: 'x',
      },
      range: 'height',
      padding: 0.1,
    },
    {
      name: 'color',
      type: 'ordinal',
      domain: {
        data: 'table',
        field: 'color',
      },
      range: [
        '#3BB2D0',
        '#2C75B0',
        '#FAB72E',
        '#EF4848',
        '#65B60D',
        '#C32D7B',
        '#F577B9',
        '#5FD2B8',
        '#F1800F',
        '#9F1C00',
        '#A5E9E3',
        '#B9D765',
        '#393F44',
        '#CACCD0',
        '#717171',
      ],
    },
  ],
  marks: [
    {
      type: 'group',
      from: {
        facet: {
          data: 'filtered',
          name: 'facet',
          groupby: 'x',
        },
      },
      encode: {
        enter: {
          y: {
            scale: 'y',
            field: 'x',
          },
        },
      },
      signals: [
        {
          name: 'height',
          update: "bandwidth('y')",
        },
      ],
      scales: [
        {
          name: 'pos',
          type: 'band',
          range: 'height',
          domain: {
            data: 'facet',
            field: 'color',
            sort: true,
          },
        },
      ],
      marks: [
        {
          type: 'rect',
          from: {
            data: 'facet',
          },
          encode: {
            update: {
              opacity: {
                value: 1,
              },
              fill: {
                scale: 'color',
                field: 'color',
              },
              y: {
                scale: 'pos',
                field: 'color',
              },
              height: {
                scale: 'pos',
                band: 1,
              },
              x: {
                scale: 'x',
                field: 'y',
              },
              x2: {
                scale: 'x',
                value: 0,
              },
            },
            hover: {
              opacity: {
                value: 0.8,
              },
            },
          },
        },
      ],
    },
  ],
  interaction_config: [
    {
      name: 'tooltip',
      config: {
        fields: [
          {
            column: 'y',
            property:
              'Gross Value Added in Roundwood Production (USD, millions)',
            type: 'number',
            format: '.2s',
          },
          {
            column: 'color',
            property: 'color',
            type: 'string',
            format: '.2f',
          },
          {
            column: 'x',
            property: 'Country',
            type: 'string',
            format: '.2f',
          },
        ],
      },
    },
  ],
};
