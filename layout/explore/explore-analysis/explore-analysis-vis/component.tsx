import PieChart from 'components/widgets/charts/v2/PieChart';
import CalloutCard from 'components/widgets/charts/v2/CalloutCard';
import { ErrorBoundary } from 'react-error-boundary';
import ErrorFallback from 'components/error-fallback';
import { average, Output } from './utils';
import { useCallback, useEffect } from 'react';
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

const CustomErrorFallback = (_props) => (
  <ErrorFallback {..._props} title="Something went wrong loading the widget" />
);

const AnalysisVisuals = ({
  domains,
  columns,
  valueMaps,
  outputs,
}: AnaylsisVisualsProps) => {

  const initColcade = useCallback(async() => {
    const { default: Colcade } = await import('colcade');
    const grid = document.querySelector('.vis-grid');
    if (!Colcade || !grid) return;

    const col = new Colcade(grid, {
      columns: '.vis-grid-col',
      items: '.vis-grid-item'
    });
    col.layout();
  }, []);

  useEffect(() => {
    initColcade();
  }, [initColcade]);

  return (
    <ErrorBoundary
      FallbackComponent={CustomErrorFallback}
      onError={(error) => {
        console.error(error.message);
      }}
    >
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
            <div key={c} className="vis-grid-item">
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
