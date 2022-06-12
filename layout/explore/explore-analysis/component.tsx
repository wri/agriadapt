import Icon from 'components/ui/icon';
import { AnalysisLocation } from 'types/analysis';
import Location from '../explore-analysis-location';
import ExploreAnalysisLocationEditor from '../explore-analysis-location-editor';
import AnalysisTable from './explore-analysis-table';
import AnalysisVisuals from './explore-analysis-vis';

const ExploreAnalysis = ({
  locations: { map: locations, isAdding },
  setIsAdding,
}) => {
  const handleAddLocation = () => {
    setIsAdding(true);
  };

  return (
    <div className="c-analysis">
      {Object.values(locations).map((loc: AnalysisLocation) => (
        <div key={loc.id}>
          {!loc.editing ? (
            <Location label={loc.label} id={loc.id} />
          ) : (
            <ExploreAnalysisLocationEditor current={loc} />
          )}
        </div>
      ))}
      {isAdding ? (
        <ExploreAnalysisLocationEditor />
      ) : (
        <a onClick={handleAddLocation} className="c-add-location">
          <Icon name="icon-circle-plus" className="" />
          Add a Location
        </a>
      )}
      <AnalysisTable />
      <AnalysisVisuals />
    </div>
  );
};

export default ExploreAnalysis;
