interface TextChartProps {
  value?: number;
  format?: 'deg' | string;
  unit?: 'celsius' | string;
  type?: 'Average' | string;
  name?: string | ((str: string) => string);
}

const TextChart = ({
  value = 4.1,
  format = 'deg',
  unit = 'celsius',
  type = 'Average',
  name = '2030 Projected Change in Annual Average Temperature',
}: TextChartProps) => {
  const valueString =
    format === 'deg'
      ? `${value}\u00B0 ${unit === 'celsius' ? 'C' : 'F'}`
      : value;

  return (
    <div className="c-text-chart-v2">
      <h1 className="stat-value">{valueString}</h1>
      <h3 className="stat-type">{type}</h3>
      <div className="stat-name">{name}</div>
    </div>
  );
};

export default TextChart;
