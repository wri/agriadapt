import { useCallback, useEffect, useState } from 'react';
import { fetchDatasetQuery } from 'services/query';
// import InView from "components/in-view";

interface TextChartProps {
  value?: number | string;
  // unit?: 'celsius' | string;
  analysis?: {
    name?: string | ((params: Record<string, any>) => string);
    dataset?: string;
    format?: string;
    query?: (params: Record<string, string | number>) => string;
    suffix?: string;
    type?: string;
  };
  params?: Record<string, string | number>;
}

const TextChart = ({
  analysis: { dataset, format, suffix, query, name, type },
  params,
  value = 0.0,
}: TextChartProps) => {
  const [result, setResult] = useState<number | string>(value);

  const formatValue = useCallback(
    (val: number) => {
      let result = String(val);
      if (format) {
        const places = format.split('.')[1].length;
        result = val.toFixed(places);
      }
      if (suffix) result = `${result}${suffix}`;
      return result;
    },
    [format, suffix]
  );

  useEffect(() => {
    if (query && dataset) {
      fetchDatasetQuery(dataset, query(params)).then(({ data }) => {
        setResult(formatValue(data.data[0].x));
      });
    } else setResult(typeof value === 'number' ? formatValue(value) : value);
  }, [dataset, formatValue, params, query, value]);

  return (
    // <InView triggerOnce threshold={0.25}>
    // {({ ref, inView }) => (
    <div className="w-full h-full flex">
      {/* {inView && ( */}
      <div className="c-text-chart-v2">
        <h1 className="stat-value">{result}</h1>
        {type && (
          <h3 className="stat-type">{type === 'avg' ? 'Average' : type}</h3>
        )}
        <div className="stat-name">
          {typeof name === 'function' ? name(params) : name}
        </div>
      </div>
      {/* )} */}
    </div>
    // )}
    // </InView>
  );
};

export default TextChart;
