const colors = {
  name: 'color',
  type: 'ordinal',
  range: [
    '#40B2CE',
    '#2E75AD',
    '#F9B746',
    '#ED4A4D',
    '#68B631',
    '#C22E7A',
    '#F478B7',
    '#63D2B9',
    '#F0812D',
    '#9E1D0D',
    '#A7E9E3',
    '#BAD771',
    '#393F44',
    '#CACCD0',
    '#717171',
  ],
  domain: {
    data: 'table',
    field: 'color',
  },
}

export const legend = {
  $schema: 'https://vega.github.io/schema/vega/v5.json',
  signals: [
    {
      name: 'width',
      init: 'containerSize()[1]',
      on: [
        {
          update: 'containerSize()[0]',
          events: 'window:resize',
        },
      ],
    },
    {
      name: 'height',
      init: 'containerSize()[0]',
      on: [
        {
          update: 'containerSize()[1]',
          events: 'window:resize',
        },
      ],
    },
  ],
  scales: [colors],
  legends: [
    {
      columnPadding: 10,
      columns: 1,
      rowPadding: 7,
      symbolSize: 300,
      symbolType: 'square',
      title: 'Legend',
      titlePadding: 10,
      fill: 'color',
      labelFontSize: 16,
      titleFontSize: 13,
      orient: 'top-right',
      titleFont: 'Lato',
      labelFont: 'Lato',
      titleColor: '#393f44',
      labelColor: '#393f44',
    },
  ],
}

export const template = {
  $schema: 'https://vega.github.io/schema/vega/v5.json',
  interaction_config: [
    {
      name: 'tooltip',
      config: {
        fields: [
          {
            column: 'datum.y',
            property: 'Metric Tonnes',
            type: 'number',
            format: '.2s',
          },
          {
            column: 'datum.color',
            property: 'color',
            type: 'string',
            format: '.2f',
          },
          {
            column: 'datum.x',
            property: 'Year',
            type: 'number',
            format: 'd',
          },
        ],
      },
    },
  ],
  autosize: {
    type: 'fit',
    contains: 'padding',
  },
  background: 'white',
  padding: 5,
  data: [
    {
      name: 'table',
      transform: null,
      format: {
        type: 'json',
        property: 'data',
      },
      url: "https://api.resourcewatch.org/v1/query/2dcd7aeb-d290-414b-80a2-8d90c44ae02a?sql=SELECT year as x, element as color, value as y FROM com_039_rw0_agricultural_trade_statistics_edit WHERE country IN ('Angola') AND element IN ('Export Quantity', 'Import Quantity') AND item IN ('Cotton, carded, combed', 'Cotton lint') ORDER BY year asc",
    },
    {
      name: 'filtered',
      source: 'table',
      transform: [],
    },
    {
      name: 'dots',
      source: 'filtered',
      transform: [
        {
          type: 'filter',
          expr: 'hover && hover.datum.x === datum.x && hover.datum.color === datum.color',
        },
      ],
    },
  ],
  config: {
    range: {
      dotSize: [20, 250],
      category20: [
        '#40B2CE',
        '#2E75AD',
        '#F9B746',
        '#ED4A4D',
        '#68B631',
        '#C22E7A',
        '#F478B7',
        '#63D2B9',
        '#F0812D',
        '#9E1D0D',
        '#A7E9E3',
        '#BAD771',
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
      fill: '#40B2CE',
    },
    symbol: {
      fill: '#40B2CE',
      stroke: '#fff',
    },
    rect: {
      fill: '#40B2CE',
    },
    line: {
      interpolate: 'linear',
      stroke: '#40B2CE',
      fillOpacity: 0,
    },
    name: 'user-custom',
  },
  signals: [
    {
      name: 'hover',
      value: null,
      on: [
        {
          events: '@cell:mouseover',
          update: 'datum',
        },
        {
          events: '@cell:mouseout',
          update: 'null',
        },
      ],
    },
    {
      name: 'width',
      init: 'isFinite(containerSize()[0]) ? containerSize()[0] : 200',
      on: [
        {
          update: 'isFinite(containerSize()[0]) ? containerSize()[0] : 200',
          events: 'window:resize',
        },
      ],
    },
    {
      name: 'height',
      init: 'isFinite(containerSize()[1]) ? containerSize()[1] : 200',
      on: [
        {
          update: 'isFinite(containerSize()[1]) ? containerSize()[1] : 200',
          events: 'window:resize',
        },
      ],
    },
  ],
  scales: [
    {
      name: 'x',
      type: 'linear',
      range: 'width',
      zero: false,
      domain: {
        data: 'filtered',
        field: 'x',
      },
    },
    {
      name: 'y',
      type: 'linear',
      range: [{ signal: 'height' }, 100],
      nice: true,
      zero: true,
      domain: {
        data: 'filtered',
        field: 'y',
      },
    },
    colors,
  ],
  axes: [
    {
      orient: 'bottom',
      scale: 'x',
      tickCount: 4,
      format: 'Y',
      labelFlush: true,
      ticks: false,
    },
    {
      orient: 'left',
      scale: 'y',
      labelOverlap: 'parity',
      labelAngle: -90,
      labelOffset: -15,
      format: 's',
      tickCount: 2,
      ticks: false,
      encode: {
        labels: {
          update: {
            align: {
              value: 'right',
            },
            baseline: {
              value: 'bottom',
            },
          },
        },
      },
    },
  ],
  marks: [
    {
      type: 'group',
      from: {
        facet: {
          data: 'filtered',
          name: 'facet',
          groupby: 'color',
        },
      },
      marks: [
        {
          name: 'lines',
          interactive: false,
          type: 'line',
          from: {
            data: 'facet',
          },
          encode: {
            enter: {
              x: {
                scale: 'x',
                field: 'x',
              },
              y: {
                scale: 'y',
                field: 'y',
              },
              stroke: {
                scale: 'color',
                field: 'color',
              },
              strokeCap: {
                value: 'round',
              },
              strokeWidth: {
                value: 2,
              },
              strokeJoin: {
                value: 'round',
              },
            },
          },
        },
        {
          interactive: false,
          type: 'symbol',
          from: {
            data: 'dots',
          },
          encode: {
            enter: {
              x: {
                scale: 'x',
                field: 'x',
              },
              y: {
                scale: 'y',
                field: 'y',
              },
              fill: {
                scale: 'color',
                field: 'color',
              },
            },
            update: {
              opacity: {
                value: 1,
              },
            },
          },
        },
      ],
    },
    {
      name: 'points',
      interactive: false,
      type: 'symbol',
      from: {
        data: 'filtered',
      },
      encode: {
        enter: {
          x: {
            scale: 'x',
            field: 'x',
          },
          y: {
            scale: 'y',
            field: 'y',
          },
        },
        update: {
          opacity: {
            value: 0,
          },
        },
      },
    },
    {
      name: 'cell',
      type: 'path',
      from: {
        data: 'points',
      },
      transform: [
        {
          type: 'voronoi',
          x: 'datum.x',
          y: 'datum.y',
          size: [
            {
              signal: 'width',
            },
            {
              signal: 'height',
            },
          ],
        },
      ],
      encode: {
        update: {
          path: {
            field: 'path',
          },
          fill: {
            value: 'red',
          },
          opacity: {
            value: 0,
          },
        },
      },
    },
  ],
  // legends: legend.legends,
};
