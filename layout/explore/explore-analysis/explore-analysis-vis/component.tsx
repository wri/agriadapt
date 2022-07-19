import PieChart from 'components/widgets/charts/v2/PieChart';
import TextChart from 'components/widgets/charts/v2/TextChart';

interface AnaylsisVisualsProps {
  domains: {
    label: string;
    value: number;
  }[][];
  columns: string[];
  valueMaps: Record<string, string>[];
}

const AnalysisVisuals = ({
  domains,
  columns,
  valueMaps,
}: AnaylsisVisualsProps) => {
  const average = (arr: number[], valueMap) => {
    const avg = arr.reduce((a, b) => a + b, 0) / arr.length;
    if (!valueMap) return avg.toFixed(2);
    else return valueMap[Math.round(avg)];
  };

  return (
    <div className="c-analysis-visuals">
      {columns.map((c, i) => {
        const numDomain = domains[i].map(({ value }) => value);
        const labelDomain = domains[i].map(({ label }) => label);
        const avg = average(
          numDomain.filter((x) => x != null),
          valueMaps[i]
        );
        return (
          <>
            <PieChart name={c} domain={labelDomain} />
            <TextChart
              analysis={{
                name: c,
                type: 'avg',
              }}
              value={avg}
            />
          </>
        );
      })}
    </div>
  );
};

export default AnalysisVisuals;
