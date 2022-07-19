// import ErrorFallback from 'components/error-fallback';
import Icon from 'components/ui/icon';
import { useState } from 'react';
import { AnalysisLocation } from 'types/analysis';
import Location from '../explore-analysis-location';
import ExploreAnalysisLocationEditor from '../explore-analysis-location-editor';
import AnalysisTable from './explore-analysis-table';
import AnalysisVisuals from './explore-analysis-vis';

// const CustomErrorFallback = (_props: any) => (
//   <ErrorFallback {..._props} title="Something went wrong loading the analysis table" />
// );

const ExploreAnalysis = ({
  locations: { loc_map: locations, isAdding },
  setIsAdding,
}) => {
  const handleAddLocation = () => {
    setIsAdding(true);
  };

  // Data for analysis visualizations
  const [domains, setDomains] = useState([]);
  const [visCols, setVisCols] = useState([]);
  const [valueMaps, setValueMaps] = useState([]);
  const [outputs, setOutputs] = useState([]);
  const [loading, setLoading] = useState(false);

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
      {!!Object.values(locations).length && (
        // <CustomErrorFallback>
        <>
          <AnalysisTable
            setDomains={setDomains}
            setVisCols={setVisCols}
            setValueMaps={setValueMaps}
            setOutputs={setOutputs}
            setLoading={setLoading}
            loading={loading}
          />
          {!loading && (
            <AnalysisVisuals
              domains={domains}
              columns={visCols}
              valueMaps={valueMaps}
              outputs={outputs}
            />
          )}
        </>
        // </CustomErrorFallback>
      )}
    </div>
  );
};

export default ExploreAnalysis;
