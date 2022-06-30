export const chartData = {
  interaction_config: [
    {
      config: {
        fields: [
          {
            format: '.2s',
            type: 'number',
            property: '2014',
            column: 'value',
          },
          {
            type: 'string',
            property: 'Sector',
            column: 'x',
          },
        ],
      },
      name: 'tooltip',
    },
  ],
  marks: [
    {
      encode: {
        hover: {
          opacity: {
            value: 0.8,
          },
        },
        update: {
          outerRadius: {
            signal: 'width > height ? height / 2 : width / 2',
          },
          innerRadius: {
            value: 0,
            // signal: 'width > height ? height / 3 : width / 3',
          },
          endAngle: {
            field: 'endAngle',
          },
          startAngle: {
            field: 'startAngle',
          },
          opacity: {
            value: 1,
          },
        },
        enter: {
          y: {
            signal: 'height / 2',
          },
          x: {
            signal: 'width / 2',
          },
          fill: {
            field: 'x',
            scale: 'c',
          },
          // fillOpacity: {
          //   signal:
          //     "(datum.x=='Agriculture' | datum.x=='Land Use Change' ?1:0.15)",
          // },
          stroke: '#000',
          strokeOpacity: {
            value: 1,
          },
          strokeWidth: {
            value: 9,
          },
        },
      },
      from: {
        data: 'table',
      },
      type: 'arc',
    },
  ],
  scales: [
    {
      domain: [
        'Energy',
        'Agriculture',
        'Land Use Change',
        'Industry',
        'Waste',
        'Bunker Fuels',
      ],
      range: ['#B9D765', '#65B60D', '#C32D7B', '#3BB2D0', '#2C75B0', '#FAB72E'],
      type: 'ordinal',
      name: 'c',
    },
  ],
  data: [
    {
      format: {
        property: 'data',
        type: 'json',
      },
      url: 'https://api.resourcewatch.org/v1/query/b8a6a6ea-7d2f-4d59-bb5e-7143a2ddc1fe?sql=SELECT sector as x, year_2014 as y FROM dash_cli_008_greenhouse_gas_emissions_country_sector ORDER BY fields ASC&env=production&application=rw',
      transform: [
        {
          as: ['rank'],
          ops: ['row_number'],
          type: 'window',
        },
        {
          as: ['value'],
          fields: ['y'],
          ops: ['sum'],
          groupby: ['x'],
          type: 'aggregate',
        },
        {
          endAngle: 6.29,
          startAngle: 0,
          field: 'value',
          type: 'pie',
        },
      ],
      name: 'table',
    },
  ],
};
