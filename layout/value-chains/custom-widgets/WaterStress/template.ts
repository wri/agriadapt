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
            column: 'crop_suitability_class',
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
      // url: "https://wri-rw.carto.com/api/v2/sql?q=select raster, country, crop_suitability_class, value from foo_067_rw0_crop_suitability_class_edit WHERE raster IN ('2020s_rcp4p5_rainfed_coffee', '2050s_rcp4p5_rainfed_coffee', '2000s_historic_rainfed_coffee') AND country IN ('Colombia') AND crop_suitability_class NOT IN ('No Cultivation')",
      format: { type: 'json', property: 'rows' },
      transform: [
        {
          type: 'formula',
          expr: "if(datum.crop_suitability_class === 'Not Suitable', 0, if(datum.crop_suitability_class === 'Very Marginal', 1, 2))",
          as: 'siteOrder',
        },
        {
          type: 'aggregate',
          groupby: ['raster', 'crop_suitability_class', 'siteOrder'],
          ops: ['sum'],
          fields: ['value'],
          as: ['sum_value'],
        },
        {
          type: 'stack',
          groupby: ['raster'],
          field: 'sum_value',
          sort: { field: ['siteOrder'], order: ['ascending'] },
          as: ['sum_value_start', 'sum_value_end'],
          offset: 'normalize',
        },
        {
          type: 'formula',
          expr: "format((datum.sum_value_end - datum.sum_value_start), '.1%')",
          as: 'percentage',
        },
        {
          type: 'filter',
          expr: 'isValid(datum["sum_value"]) && isFinite(+datum["sum_value"])',
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
          groupby: ['raster'],
          aggregate: {
            fields: [
              'sum_value_start',
              'sum_value_start',
              'sum_value_end',
              'sum_value_end',
            ],
            ops: ['min', 'max', 'min', 'max'],
          },
        },
      },
      encode: {
        update: {
          x: { scale: 'x', field: 'raster' },
          width: { scale: 'x', band: 1 },
          y: {
            signal:
              'min(scale(\'y\',datum["min_sum_value_start"]),scale(\'y\',datum["max_sum_value_start"]),scale(\'y\',datum["min_sum_value_end"]),scale(\'y\',datum["max_sum_value_end"]))',
          },
          y2: {
            signal:
              'max(scale(\'y\',datum["min_sum_value_start"]),scale(\'y\',datum["max_sum_value_start"]),scale(\'y\',datum["min_sum_value_end"]),scale(\'y\',datum["max_sum_value_end"]))',
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
      domain: { data: 'source_0', field: 'raster', sort: true },
      // range: [0, 500],
      range: [0, { signal: 'width' }],
      padding: 0.45,
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
          update: { text: { signal: '[substring(datum.label, 0, 5)]' } },
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
      columnPadding: 10,
      columns: 2,
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
