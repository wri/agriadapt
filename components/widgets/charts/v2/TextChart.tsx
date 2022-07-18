import { useCallback, useEffect, useState } from "react";
import { fetchDatasetQuery } from "services/query";
// import InView from "components/in-view";

interface TextChartProps {
  value?: number;
  format?: 'deg' | string;
  unit?: 'celsius' | string;
  type?: 'Average' | string;
  name?: string | ((str: string) => string);
  analysis?: {
    dataset?: string;
    format?: string;
    // query?: string | ((str: string) => string);
  }
  query?: string;
  suffix?: string;
}

const TextChart = ({
  query = null,
  analysis = null,
  value = 0.0,
  // format = 'deg',
  // unit = 'celsius',
  type = null,
  name,
  suffix = null,
}: TextChartProps) => {
  const [result, setResult] = useState<number | string>(value);

  const formatValue = useCallback((val: number) => {
    let result = String(val);
    if (analysis?.format) {
      const places = analysis.format.split('.')[1].length;
      result = val.toFixed(places);
    }
    if (suffix)
      result = `${result}${suffix}`;
    return result;
  }, [analysis, suffix]);

  useEffect(() => {
    if (query && analysis) {
      fetchDatasetQuery(analysis.dataset, query)
        .then(({ data }) => {
          setResult(formatValue(data.data[0].x));
        })
    }
    else setResult(formatValue(value))
  }, [analysis, formatValue, query, result, value]);

  return (
    // <InView triggerOnce threshold={0.25}>
      // {({ ref, inView }) => (
        <div className="w-full h-full flex">
          {/* {inView && ( */}
            <div className="c-text-chart-v2">
              <h1 className="stat-value">{result}</h1>
              {type && <h3 className="stat-type">{type === 'avg' ? 'Average' : type}</h3>}
              <div className="stat-name">{name}</div>
            </div>
          {/* )} */}
        </div>
      // )}
    // </InView>
  );
};

export default TextChart;
