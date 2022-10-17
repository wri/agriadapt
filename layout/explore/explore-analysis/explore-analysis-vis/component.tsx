import PieChart from 'components/widgets/charts/v2/PieChart';
import CalloutCard from 'components/widgets/charts/v2/CalloutCard';
import { ErrorBoundary } from 'react-error-boundary';
import ErrorFallback from 'components/error-fallback';
import { average, Output } from './utils';
import { useEffect, useState } from 'react';
import React from 'react';

interface AnaylsisVisualsProps {
  domains: {
    label: string;
    value: number;
  }[][];
  columns: string[];
  valueMaps: Record<string, string>[];
  outputs: Output[];
}

function useDynamicImport(importPromise) {
  const [imported, setImported] = useState({});

  useEffect(() => {
    let cancelled = false;
    const awaitImport = async () => {
      const result = await importPromise;
      if (!cancelled && result && Object.keys(imported).length === 0) {
        setImported(() => result);
      }
    };
    awaitImport();
    return () => {
      cancelled = true;
    };
  }, [importPromise, imported]);

  return imported;
};

const CustomErrorFallback = (_props) => (
  <ErrorFallback {..._props} title="Something went wrong loading the widget" />
);

const AnalysisVisuals = ({
  domains,
  columns,
  valueMaps,
  outputs,
}: AnaylsisVisualsProps) => {

  const IS_STATIC = typeof window === 'undefined';
  
  const { default: Colcade } = useDynamicImport(
    !IS_STATIC && import('colcade'),
  );
  const [colcade, setColcade] = useState(undefined);

  useEffect(() => {
    if (Colcade) {
      setColcade(
        new Colcade('.vis-grid', {
          columns: '.vis-grid-col',
          items: '.vis-grid-item'
        }),
      );
    }
  }, [Colcade]);

  useEffect(() => {
    colcade?.layout();
  }, [colcade]);

  return (
    <ErrorBoundary
      FallbackComponent={CustomErrorFallback}
      onError={(error) => {
        console.error(error.message);
      }}
    >
      {/* Implement masonry layout here: */}
      {/* data-colcade="columns: .grid-col, items: .grid-item" */}
      <div className="c-analysis-visuals vis-grid" data-colcade="columns: .vis-grid-col, items: .vis-grid-item">
        <div className="vis-grid-col vis-grid-col--1"></div>
        <div className="vis-grid-col vis-grid-col--2"></div>
        {columns.map((c, i) => {
          const output = outputs[i];
          if (!output) return;
          const numDomain = domains[i].map(({ value }) => value);
          const labelDomain = domains[i].map(({ label }) => label);
          const avg = average(
            numDomain.filter((x) => x != null),
            valueMaps[i],
            output
          );
          const valid = output.type === 'number' ? !isNaN(parseFloat(avg)) : true;

          return valid && (
            <div key={`${c}`} className={'vis-grid-item vis-grid-item--' + String.fromCharCode('a'.charCodeAt(0) + (i % (outputs.length/2)))}>
              {output.type === 'string' && (
                <PieChart name={c} domain={labelDomain} />
              )}
              {output.type === 'number' && (
                <CalloutCard
                  analysis={{
                    name: c,
                    type: 'avg',
                    value: avg,
                  }}
                />
              )}
            </div>
          );
        })}
      </div>
    </ErrorBoundary>
  );
};

export default AnalysisVisuals;
