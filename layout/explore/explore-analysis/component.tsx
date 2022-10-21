// import ErrorFallback from 'components/error-fallback';
import Icon from 'components/ui/icon';
import { useTranslation } from 'next-i18next';
import { useRouter } from 'next/router';
import { useCallback, useEffect, useState } from 'react';
import { AnalysisLocation } from 'types/analysis';
import { getUserPosition } from 'utils/locations/user-position';
import Location from '../explore-analysis-location';
import ExploreAnalysisLocationEditor from '../explore-analysis-location-editor';
import {
  getGeocodeInfo,
  makePointLocation,
} from '../explore-analysis-location-editor/utils';
import AnalysisTable from './explore-analysis-table';
import AnalysisVisuals from './explore-analysis-vis';

// const CustomErrorFallback = (_props: any) => (
//   <ErrorFallback {..._props} title="Something went wrong loading the analysis table" />
// );

const ExploreAnalysis = ({
  locations: { loc_map: locations, isAdding, editingId },
  setIsAdding,
  addLocation,
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

  const { t } = useTranslation(['explore', 'common']);
  const router = useRouter();
  const { add } = router.query;
  const { locale } = router;

  /**
   * Add user location from link
   */
  const addUserLocation = useCallback(async () => {
    const {
      coords: { longitude, latitude },
    } = await getUserPosition();
    const info = await getGeocodeInfo({ longitude, latitude }, locale);
    const loc = makePointLocation('current', info, { longitude, latitude });
    addLocation(loc);
  }, [addLocation, locale]);

  useEffect(() => {
    if (String(add) === 'current') {
      addUserLocation();
      delete router.query.add;
      router.replace({ query: router.query }, undefined, { shallow: true });
    }
  }, [add, addUserLocation, router]);

  return (
    <div className="c-analysis">
      {Object.values(locations).map((loc: AnalysisLocation) => (
        <div key={loc.id}>
          {loc.id !== editingId ? (
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
          {t('explore:analysis.Add a Location')}
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
