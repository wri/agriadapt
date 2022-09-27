const colors = {
  name: 'color',
  type: 'ordinal',
  domain: [
    '2.8x or greater decrease',
    '2x decrease',
    '1.4x decrease',
    'Near normal',
    '1.4x increase',
    '2x increase',
    '2.8x or greater increase',
    'No data',
  ],
  range: [
    '#009ACD',
    '#74B0D1',
    '#ABC8D9',
    '#DEDEDE',
    '#F8AB95',
    '#FF7451',
    '#FF1900',
    '#4F4F4F',
  ],
  interpolate: 'hcl',
};

export const template = {
  $schema: 'https://vega.github.io/schema/vega/v5.json',
  interaction_config: [
    {
      config: {
        fields: [
          {
            type: 'string',
            property: 'Water Stress Change',
            column: 'water_stress_change',
          },
          {
            type: 'string',
            property: 'Area',
            column: 'percentage',
          },
        ],
      },
      name: 'tooltip',
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
      name: 'source_0',
      format: { type: 'json', property: 'rows' },
      transform: [
        {
          type: 'formula',
          expr: "if(datum.water_stress_change === 'No data', 0, if(datum.water_stress_change === '2.8x or greater increase', 1, if(datum.water_stress_change === '2x increase',2,if(datum.water_stress_change === '1.4x increase',3,if(datum.water_stress_change === 'Near normal',4,if(datum.water_stress_change === '1.4x decrease',5,if(datum.water_stress_change === '2x decrease',6,7)))))))",
          as: 'siteOrder',
        },
        {
          type: 'aggregate',
          groupby: ['layer', 'water_stress_change', 'siteOrder'],
          ops: ['sum'],
          fields: ['area'],
          as: ['sum_area'],
        },
        {
          type: 'stack',
          groupby: ['layer'],
          field: 'sum_area',
          sort: { field: ['siteOrder'], order: ['ascending'] },
          as: ['sum_area_start', 'sum_area_end'],
          offset: 'normalize',
        },
        {
          type: 'formula',
          expr: "format((datum.sum_area_end - datum.sum_area_start), '.1%')",
          as: 'percentage',
        },
        {
          type: 'filter',
          expr: 'isValid(datum["sum_area"]) && isFinite(+datum["sum_area"])',
        },
      ],
    },
  ],
  signals: [
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
  marks: [
    {
      type: 'group',
      from: {
        facet: {
          data: 'source_0',
          name: 'stack_group_main',
          groupby: ['layer'],
          aggregate: {
            fields: [
              'sum_area_start',
              'sum_area_start',
              'sum_area_end',
              'sum_area_end',
            ],
            ops: ['min', 'max', 'min', 'max'],
          },
        },
      },
      encode: {
        update: {
          x: { scale: 'x', field: 'layer' },
          width: { scale: 'x', band: 1 },
          y: {
            signal:
              'min(scale(\'y\',datum["min_sum_area_start"]),scale(\'y\',datum["max_sum_area_start"]),scale(\'y\',datum["min_sum_area_end"]),scale(\'y\',datum["max_sum_area_end"]))',
          },
          y2: {
            signal:
              'max(scale(\'y\',datum["min_sum_area_start"]),scale(\'y\',datum["max_sum_area_start"]),scale(\'y\',datum["min_sum_area_end"]),scale(\'y\',datum["max_sum_area_end"]))',
          },
          clip: { value: true },
          cornerRadius: { value: 5 },
        },
      },
      marks: [
        {
          type: 'group',
          encode: {
            update: {
              y: { field: { group: 'y' }, mult: -1 },
              width: { field: { group: 'width' } },
            },
          },
          marks: [
            {
              name: 'marks',
              type: 'rect',
              style: ['bar'],
              from: { data: 'stack_group_main' },
              encode: {
                update: {
                  // tooltip: {
                  //   signal:
                  //     '{"layer": isValid(datum["layer"]) ? datum["layer"] : ""+datum["layer"], "Sum of area": format(datum["sum_area_end"]-datum["sum_area_start"], ""), "Water Stress Change": isValid(datum["water_stress_change"]) ? datum["water_stress_change"] : ""+datum["water_stress_change"], "siteOrder": isValid(datum["siteOrder"]) ? datum["siteOrder"] : ""+datum["siteOrder"]}',
                  // },
                  fill: { scale: 'color', field: 'water_stress_change' },
                  ariaRoleDescription: { value: 'bar' },
                  // description: {
                  //   signal:
                  //     '"layer: " + (isValid(datum["layer"]) ? datum["layer"] : ""+datum["layer"]) + "; Sum of area: " + (format(datum["sum_area_end"]-datum["sum_area_start"], "")) + "; Water Stress Change: " + (isValid(datum["water_stress_change"]) ? datum["water_stress_change"] : ""+datum["water_stress_change"]) + "; siteOrder: " + (isValid(datum["siteOrder"]) ? datum["siteOrder"] : ""+datum["siteOrder"])',
                  // },
                  width: { field: { group: 'width' } },
                  y: { scale: 'y', field: 'sum_area_end' },
                  y2: { scale: 'y', field: 'sum_area_start' },
                },
              },
            },
          ],
        },
      ],
    },
  ],
  scales: [
    {
      name: 'x',
      type: 'band',
      domain: { data: 'source_0', field: 'layer', sort: true },
      range: [0, { signal: 'width' }],
      padding: 0.15,
    },
    {
      name: 'y',
      type: 'linear',
      domain: [0, 1],
      range: [{ signal: 'height' }, 0],
      nice: true,
      zero: true,
    },
    colors,
  ],
  axes: [
    {
      scale: 'x',
      offset: 30,
      orient: 'top',
      grid: false,
      domain: false,
      labelAlign: 'center',
      labelAngle: 0,
      labelBaseline: 'top',
      labelColor: '#266510',
      labelFontSize: '18',
      ticks: false,
      encode: {
        labels: {
          update: {
            text: { signal: "['20'+ substring(datum.label, 2, 4) +'s']" },
          },
        },
      },
      zindex: 0,
    },
  ],
  config: { style: { cell: { stroke: null } } },
};

export const legend = {
  $schema: 'https://vega.github.io/schema/vega/v5.json',
  scales: [colors],
  legends: [
    {
      // columnPadding: 10,
      columns: 1,
      rowPadding: 7,
      symbolSize: 1000,
      symbolType: 'square',
      title: 'Water Stress Change',
      titlePadding: 10,
      fill: 'color',
      labelFontSize: 16,
      titleFontSize: 13,
      titleFont: 'Lato',
      labelFont: 'Lato',
      titleColor: '#393f44',
      labelColor: '#393f44',
      orient: 'left',
    },
  ],
  config: { style: { cell: { stroke: null } } },
};
