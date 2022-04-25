import Icon from "components/ui/icon";

const ExploreAnalysisLocation = ({ label }) => {
  return (
    <div className="c-analysis-location">
      <Icon name="icon-ellipsis" className="" />
      <div className="c-location-label">{label}</div>
    </div>
  );
};

export default ExploreAnalysisLocation;
