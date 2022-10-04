import PieChart from 'components/widgets/charts/v2/PieChart';
import CalloutCard from 'components/widgets/charts/v2/CalloutCard';
import { ErrorBoundary } from 'react-error-boundary';
import ErrorFallback from 'components/error-fallback';
import { average, Output } from './utils';

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

  return (
    <ErrorBoundary
      FallbackComponent={CustomErrorFallback}
      onError={(error) => {
        console.error(error.message);
      }}
    >
      {/* Implement masonry layout here: */}
      <div className="c-analysis-visuals">
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
          return (
            <>
              {output.type === 'string' && (
                <PieChart name={c} domain={labelDomain} />
              )}
              {output.type === 'number' && !isNaN(parseFloat(avg)) && (
                <CalloutCard
                  analysis={{
                    name: c,
                    type: 'avg',
                    value: avg,
                  }}
                />
              )}
            </>
          );
        })}
      </div>
    </ErrorBoundary>
  );
};

export default AnalysisVisuals;
