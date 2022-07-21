import PieChart from 'components/widgets/charts/v2/PieChart';
import TextChart from 'components/widgets/charts/v2/TextChart';

interface Output {
  type: 'number' | 'string';
  suffix?: string;
  prefix?: string;
}

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
  const average = (
    arr: number[],
    valueMap: Record<string, string>,
    { type, prefix, suffix }: Output
  ) => {
    const avg = arr.reduce((a, b) => a + b, 0) / arr.length;
    let num = avg.toFixed(2);
    if (suffix) num = num + suffix;
    if (prefix) num = prefix + num;
    if (type === 'number' || !valueMap) return num;
    else return valueMap[Math.round(avg)];
  };

  return (
    <div className="c-analysis-visuals">
      {columns.map((c, i) => {
        const numDomain = domains[i].map(({ value }) => value);
        const labelDomain = domains[i].map(({ label }) => label);
        const avg = average(
          numDomain.filter((x) => x != null),
          valueMaps[i],
          outputs[i]
        );
        return (
          <>
            <PieChart name={c} domain={labelDomain}/>
            {avg !== 'NaN' && <TextChart
              analysis={{
                name: c,
                type: 'avg',
                value: avg,
              }}
            />}
          </>
        );
      })}
    </div>
  );
};

export default AnalysisVisuals;
