import Renderer from '@widget-editor/renderer';
import RWAdapter from '@widget-editor/rw-adapter';

const Pie = ({ widgetConfig }) => (
  <div
    className="relative flex overflow-y-hidden widget-container grow mb-3"
    style={{ height: 171 }}
  >
    <Renderer widgetConfig={widgetConfig} adapter={RWAdapter} />
  </div>
);

const PieChart = ({
  value = 4.1,
  format = 'deg',
  unit = 'celsius',
  type = 'Average',
  name = '2030 Projected Change in Annual Average Temperature',
  widgetConfig,
}) => {
  const valueString =
    format === 'deg'
      ? `${value} \u00B0 ${unit === 'celsius' ? 'C' : 'F'}`
      : format === '%'
      ? `${value}%`
      : value;

  return (
    <div className="c-pie-chart-v2">
      <Pie widgetConfig={widgetConfig} />
      <h1 className="stat-value">{valueString}</h1>
      <h3 className="stat-type">{type}</h3>
      <div className="stat-name">{name}</div>
    </div>
  );
};

export default PieChart;
