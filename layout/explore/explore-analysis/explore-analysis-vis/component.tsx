import PieChart from 'components/widgets/charts/v2/PieChart';
import TextChart from 'components/widgets/charts/v2/TextChart';

interface AnaylsisVisualsProps {
  domains: number[][];
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
    if (!valueMap)
      return avg.toFixed(2);
    else return valueMap[Math.round(avg)];
  }

  return (
    <div className="c-analysis-visuals">
      {columns.map((c, i) => {
        const avg = average(domains[i].filter(x => x != null), valueMaps[i]);
        return (
          <>
            <PieChart name={c} domain={domains[i]} />
            <TextChart
              value={avg}
              // analysis={{ format: '0.00' }}
              type={'avg'}
              name={c}
            />
          </>
        );
      })}
    </div>
  );
};

export default AnalysisVisuals;
