import Icon from 'components/ui/icon';
import ExploreAnalysisLocation from '../explore-analysis-location';
import ExploreAnalysisLocationEditor from '../explore-analysis-location-editor';
import AnalysisTable from './explore-analysis-table';
import AnalysisVisuals from './explore-analysis-vis';

const ExploreAnalysis = ({
  locations: { list: locations, formOpen },
  setFormOpen,
}) => {

  const handleAddLocation = () => {
    setFormOpen(true);
  };

  return (
    <div className="c-analysis">
      {locations.map((loc, i: number) => (
        <ExploreAnalysisLocation {...loc} key={i} />
      ))}

      {formOpen || !locations.length ? (
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
