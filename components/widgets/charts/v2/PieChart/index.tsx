import Renderer from '@widget-editor/renderer';
import RWAdapter from '@widget-editor/rw-adapter';
import { useEffect, useMemo, useState } from 'react';
import { template } from 'components/widgets/charts/v2/PieChart/template';

const Pie = ({ widgetConfig }) => (
  <div
    className="relative flex overflow-y-hidden w-full mb-4"
    style={{ height: 172 }}
  >
    <Renderer widgetConfig={widgetConfig} adapter={RWAdapter} />
  </div>
);

const PieChart = ({
  // format = 'deg',
  // unit = '%',
  name,
  domain,
}) => {
  const values: { x: string; y: number }[] = useMemo(() => {
    const countMap = {};
    // Counting number of values
    domain.forEach((x: string) => {
      if (countMap[x]) countMap[x] = countMap[x] + 1;
      else countMap[x] = 1;
    });

    return Object.entries(countMap).map(([x, y]: [x: string, y: number]) => ({
      x,
      y,
    }));
  }, [domain]);

  const widgetConfig = useMemo(
    () => ({
      ...template,
      data: [{ ...template.data[0], values }],
    }),
    [values]
  );

  // const valueString = `${20}%`;

  const [on, setOn] = useState(false);

  useEffect(() => {
    setOn(true);
  }, []);

  return (
    <div className="c-pie-chart-v2 border border-b-0 border-gray-light shadow-gray shadow-sm rounded">
      {on && <Pie widgetConfig={widgetConfig} />}
      {/* <h1 className="stat-value">{valueString}</h1>
      <h3 className="stat-type">{type}</h3> */}
      <div className="stat-name">{name}</div>
    </div>
  );
};

export default PieChart;
