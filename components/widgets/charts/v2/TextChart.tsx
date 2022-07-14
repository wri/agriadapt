import { useCallback, useEffect, useState } from "react";
import { fetchDatasetQuery } from "services/query";
import InView from "components/in-view";

interface TextChartProps {
  value?: number;
  format?: 'deg' | string;
  unit?: 'celsius' | string;
  type?: 'Average' | string;
  name?: string | ((str: string) => string);
  analysis?: {
    dataset: string;
    format?: string;
    // query?: string | ((str: string) => string);
  }
  query?: string;
}

const TextChart = ({
  query = null,
  analysis = null,
  value = 0.0,
  format = 'deg',
  unit = 'celsius',
  type = 'Average',
  name = '2030 Projected Change in Annual Average Temperature',
}: TextChartProps) => {
  const valueString =
    format === 'deg'
      ? `${value}\u00B0 ${unit === 'celsius' ? 'C' : 'F'}`
      : value;

  const [result, setResult] = useState<number | string>(value);

  const formatValue = useCallback((val: number) => {
    let result = String(val);
    if (analysis.format) {
      const places = analysis.format.split('.')[1].length;
      result = val.toFixed(places);
    }
    return result;
  }, [analysis.format]);

  useEffect(() => {
    if (query && analysis) {
      fetchDatasetQuery(analysis.dataset, query).then(({ data }) => {
        setResult(formatValue(data.data[0].x));
      });
    }
  }, [analysis, analysis.dataset, formatValue, query, result]);

  return (
    <InView triggerOnce threshold={0.25}>
      {({ ref, inView }) => (
        <div ref={ref} className="w-full h-full">
          {inView && (
            <div className="c-text-chart-v2">
              <h1 className="stat-value">{result}</h1>
              <h3 className="stat-type">{type}</h3>
              <div className="stat-name">{name}</div>
            </div>
          )}
        </div>
      )}
    </InView>
  );
};

export default TextChart;
