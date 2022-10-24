import PieChart from 'components/widgets/charts/v2/PieChart';
import CalloutCard from 'components/widgets/charts/v2/CalloutCard';
import { average, Output } from './utils';
import Masonry, { ResponsiveMasonry } from 'react-responsive-masonry';
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

const AnalysisVisuals = ({
  domains,
  columns,
  valueMaps,
  outputs,
}: AnaylsisVisualsProps) => {
  return (
    <ResponsiveMasonry columnsCountBreakPoints={{ 350: 1, 750: 2 }}>
      <Masonry gutter={16}>
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
          const valid =
            output.type === 'number' ? !isNaN(parseFloat(avg)) : true;

          return (
            valid && (
              <React.Fragment key={c}>
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
              </React.Fragment>
            )
          );
        })}
      </Masonry>
    </ResponsiveMasonry>
  );
};

export default AnalysisVisuals;
