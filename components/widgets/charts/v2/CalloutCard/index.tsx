import { useTranslation } from 'next-i18next';
import dynamic from 'next/dynamic';
import { useCallback, useEffect, useState } from 'react';
import { fetchDatasetQuery } from 'services/query';
// import InView from "components/in-view";

interface CalloutCardProps {
  // unit?: 'celsius' | string;
  analysis?: {
    name?: string;
    value?: number | string;
    dataset?: string;
    format?: string;
    query?: (params: Record<string, string | number>) => string;
    suffix?: string;
    type?: string;
  };
  params?: Record<string, string | number>;
}

const CalloutCard = ({
  analysis: { dataset, format, suffix, query, name, type, value = 0.0 },
  params,
}: CalloutCardProps) => {
  const [result, setResult] = useState<number | string>(value);

  const { t } = useTranslation();

  const formatValue = useCallback(
    (val: number) => {
      if (val == undefined) return 'N/A';
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
      // For value chain pages
      fetchDatasetQuery(dataset, query(params)).then(({ data }) => {
        setResult(formatValue(data.data[0]?.x));
      });
    } else setResult(typeof value === 'number' ? formatValue(value) : value);
  }, [dataset, formatValue, params, query, value]);

  const ReactFitty = dynamic(
    () => import('react-fitty').then(({ ReactFitty }) => ReactFitty),
    { ssr: false }
  );

  return (
    // <InView triggerOnce threshold={0.25}>
    // {({ ref, inView }) => (
    <div className="w-full h-full flex">
      {/* {inView && ( */}
      <div className="c-callout-card border border-b-0 border-gray-light shadow-gray shadow-sm flex rounded">
        <div className="c-data m-auto">
          <h1 className="stat-value">
            <ReactFitty maxSize={64}>{result}</ReactFitty>
          </h1>
          {type && (
            <h3 className="stat-type">{type === 'avg' ? 'Average' : type}</h3>
          )}
          <div className="stat-name">{t(name, params)}</div>
        </div>
      </div>
      {/* )} */}
    </div>
    // )}
    // </InView>
  );
};

export default CalloutCard;
