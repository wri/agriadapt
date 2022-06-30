export const chartData = {
  paramsConfig: {
    visualizationType: 'chart',
    caption: null,
    limit: 500,
    value: {
      tableName: 'dash_0044_forest_employment_gdp_by_sector',
      datasetID: 'aab58627-36b7-41fc-9658-27a850c34d15',
      type: 'number',
      alias: 'Total',
      name: 'total',
    },
    category: {
      tableName: 'dash_0044_forest_employment_gdp_by_sector',
      datasetID: 'aab58627-36b7-41fc-9658-27a850c34d15',
      type: 'string',
      alias: 'Gross Value Added (USD, millions)',
      name: 'gross_value_added_million_usd',
    },
    color: null,
    size: null,
    orderBy: null,
    aggregateFunction: null,
    chartType: 'pie',
    filters: [],
    areaIntersection: null,
    band: null,
    layer: null,
  },
  data: [
    {
      name: 'table',
      transform: [
        {
          type: 'window',
          ops: ['row_number'],
          as: ['rank'],
        },
        {
          type: 'formula',
          as: 'category',
          expr: "datum.rank < 6 ? datum.x : 'Others'",
        },
        {
          type: 'aggregate',
          groupby: ['category'],
          ops: ['sum'],
          fields: ['y'],
          as: ['value'],
        },
        {
          type: 'pie',
          field: 'value',
          startAngle: 0,
          endAngle: 6.29,
        },
      ],
      url: 'https://api.resourcewatch.org/v1/query/aab58627-36b7-41fc-9658-27a850c34d15?sql=SELECT gross_value_added_million_usd as x, total as y FROM dash_0044_forest_employment_gdp_by_sector   ORDER BY total desc LIMIT 500',
      format: {
        type: 'json',
        property: 'data',
      },
    },
  ],
  scales: [
    {
      name: 'c',
      type: 'ordinal',
      range: 'category20',
      domain: {
        data: 'table',
        field: 'category',
      },
    },
  ],
  marks: [
    {
      type: 'arc',
      from: {
        data: 'table',
      },
      encode: {
        enter: {
          fill: {
            scale: 'c',
            field: 'category',
          },
          x: {
            signal: 'width / 2',
          },
          y: {
            signal: 'height / 2',
          },
        },
        update: {
          opacity: {
            value: 1,
          },
          startAngle: {
            field: 'startAngle',
          },
          endAngle: {
            field: 'endAngle',
          },
          innerRadius: {
            value: 0,
            // signal: 'width > height ? height / 3 : width / 3',
          },
          outerRadius: {
            signal: 'width > height ? height / 2 : width / 2',
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
  interaction_config: [
    {
      name: 'tooltip',
      config: {
        fields: [
          {
            column: 'value',
            property: 'Total',
            type: 'number',
            format: '.2s',
          },
          {
            column: 'category',
            property: 'Gross Value Added (USD, millions)',
            type: 'string',
          },
        ],
      },
    },
  ],
};
