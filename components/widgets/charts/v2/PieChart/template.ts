export const template = {
  interaction_config: [
    {
      config: {
        fields: [
          {
            type: 'string',
            property: 'Value',
            column: 'x',
          },
          {
            type: 'number',
            property: 'Count',
            column: 'y',
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
      domain: {
        data: 'table',
        field: 'x',
      },
      range: ['#B9D765', '#65B60D', '#C32D7B', '#3BB2D0', '#2C75B0', '#FAB72E'],
      type: 'ordinal',
      name: 'c',
    },
  ],
  data: [
    {
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
