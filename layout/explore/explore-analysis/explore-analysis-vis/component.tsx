import PieChart from "components/widgets/charts/v2/PieChart";
import TextChart from "components/widgets/charts/v2/TextChart";
import { chartData } from "components/widgets/charts/v2/test-pie-chart";
import { chartData as chartData2 } from "components/widgets/charts/v2/test-pie-chart2";
import { chartData as barChart } from "components/widgets/charts/v2/test-bar-chart";

const AnalysisVisuals = () => {
  return (
    <div className="c-analysis-visuals">
      <PieChart widgetConfig={chartData} />
      <PieChart widgetConfig={chartData2} />
      <PieChart widgetConfig={barChart} />
      <TextChart />
      <TextChart />
      <TextChart />
    </div>
  );
};

export default AnalysisVisuals;
