import Icon from 'components/ui/icon';
import { useEffect } from 'react';
import ExploreAnalysisLocation from '../explore-analysis-location';
import ExploreAnalysisLocationEditor from '../explore-analysis-location-editor';

const ExploreAnalysis = ({
  locations: { list: locations, formOpen },
  setFormOpen,
}) => {

  useEffect(() => {
    console.log('formOpen', formOpen);
  }, [formOpen]);

  const handleAddLocation = () => {
    setFormOpen(true);
  };

  return (
    <div className="c-analysis">
      {locations.map((loc, i: number) => (
        <ExploreAnalysisLocation {...loc} key={i} />
      ))}

      {formOpen ? (
        <ExploreAnalysisLocationEditor />
      ) : (
        <a onClick={handleAddLocation} className="c-add-location">
          <Icon name="icon-circle-plus" className="" />
          Add a Location
        </a>
      )}
    </div>
  );
};

export default ExploreAnalysis;
