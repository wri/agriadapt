import Field from 'components/form/Field';
import Input from 'components/form/Input';
import { EXPLORE_ANALYSIS } from '../constants';
import Select from 'react-select';
import useInput from 'hooks/form/useInput';
// import SelectInput from 'components/form/SelectInput';
import { useCallback, useEffect, useMemo, useState } from 'react';
import { fetchDatasetQuery } from 'services/query';
import { GADM_ADMONE_DATSET_ID, GADM_ADMONE_SQL } from 'constants/app';
import useSelect from 'hooks/form/useSelect';
import { fetchGADM1Geostore } from 'services/geostore';
import { AnalysisLocation } from 'types/analysis';
import { getUserPosition } from 'utils/user-position';

const ExploreAnalysisLocationEditor = ({
  countries,
  addLocation,
  editLocation,
  setIsAdding,
  isAdding,
  current = {} as AnalysisLocation,
  setEditing,
  setIsDrawing,
  setDataDrawing,
  drawer: { data: pointData },
  geoLocator: { data: geoLocatorData },
  setIsGeoLocating,
  setDataGeoLocator,
}) => {
  const { LOCATION_CONFIG } = EXPLORE_ANALYSIS;

  const id = current.id;
  const label = current.label;
  const locationType = useInput(current.type || 'point');
  const country = useSelect(current.country);
  const [selectedState, setSelectedState] = useState(current.state);
  const [geo, setGeo] = useState(current.geo);

  const [statesList, setStatesList] = useState([]);
  const [statesLoading, setStatesLoading] = useState(false);

  /* Side effect for switiching to point location */
  useEffect(() => {
    if (locationType.value === 'point') {
      setIsDrawing(true);
      if (current.type === 'point')
        setDataDrawing({
          lng: current.longitude,
          lat: current.latitude,
        });
    } else {
      setIsDrawing(false);
      setDataDrawing(null);
    }
  }, [
    locationType.value,
    current.type,
    current.latitude,
    current.longitude,
    setIsDrawing,
    setDataDrawing,
  ]);

  /* Side effect for switching to current location */
  useEffect(() => {
    if (locationType.value === 'current') {
      setIsGeoLocating(true);
      getUserPosition(({ coords: { longitude, latitude } }) =>
        setDataGeoLocator({ longitude, latitude })
      );
    } else {
      setIsGeoLocating(false);
      setDataGeoLocator(null);
    }
  }, [locationType.value, setDataGeoLocator, setIsGeoLocating]);

  const createLabel = useCallback(() => {
    if (locationType.value === 'admin')
      return `${selectedState?.label}, ${country.value?.label}`;
    else if (locationType.value === 'point')
      return `(${pointData.lat}, ${pointData.lng})`;
    else if (locationType.value === 'current')
      return `(${geoLocatorData.latitude}, ${geoLocatorData.longitude})`;
    else return `Location ${id} (${locationType.value})`;
  }, [
    locationType.value,
    selectedState?.label,
    country.value?.label,
    pointData,
    geoLocatorData,
    id,
  ]);

  const stopEditing = () => {
    setIsDrawing(false);
    setDataDrawing(null);
    setIsGeoLocating(false);
    setDataGeoLocator(null);
  };

  const onCancel = () => {
    if (!isAdding) setEditing({ id, editing: false });
    else setIsAdding(false);
    stopEditing();
  };

  const onSubmit = () => {
    const loc = {
      id,
      label: label || createLabel(),
      type: locationType.value,
      ...(locationType.value === 'admin' && {
        country: country.value,
        state: selectedState,
      }),
      ...(locationType.value === 'point' && {
        longitude: pointData.lng,
        latitude: pointData.lat,
      }),
      ...(locationType.value === 'current' && {
        longitude: geoLocatorData.longitude,
        latitude: geoLocatorData.latitude,
      }),
      geo: geo,
      editing: false,
    };
    if (current.editing)
      editLocation({
        id,
        edit: loc,
      });
    else addLocation(loc);

    stopEditing();
  };

  useEffect(() => {
    if (!country.value?.length) {
      setStatesList([]);
    }
  }, [country.value]);

  /* Side effect to clear selected state when changing country */
  useEffect(() => {
    setSelectedState(null);
  }, [country.value]);

  const isValid = useMemo(() => {
    if (!locationType.value) return false;
    if (locationType.value === 'point' && !pointData) return false;
    if (locationType.value === 'current' && !geoLocatorData) return false;
    if (locationType.value === 'admin' && !(country.value && selectedState))
      return false;
    return true;
  }, [
    locationType.value,
    pointData,
    geoLocatorData,
    country.value,
    selectedState,
  ]);

  const handleSelectedStateChange = (obj) => {
    setSelectedState(obj);
  };

  // Side effect for getting state options based on country
  useEffect(() => {
    if (country.value) {
      const { value: iso } = country.value;
      if (iso) {
        setStatesLoading(true);
        fetchDatasetQuery(
          GADM_ADMONE_DATSET_ID,
          `${GADM_ADMONE_SQL} '${iso}'`
        ).then(({ data: { data: states } }) => {
          setStatesList(
            states.map((s) => ({ label: s.name_1, value: s.gid_1 }))
          );
          setStatesLoading(false);
        });
      }
    }
  }, [country.value]);

  // Sort by states TODO: Add locale modifier
  useEffect(() => {
    setStatesList((s) =>
      s.sort((a, b) => (a.label < b.label ? -1 : a.label > b.label ? 1 : 0))
    );
  }, [statesList]);

  // Side effect for getting geo data
  useEffect(() => {
    if (country.value && selectedState) {
      const { value: iso } = country.value;
      const [, gadm1Id] = selectedState?.value
        ? selectedState.value.match(/[A-Z]{3}\.(\d+)_1/)
        : [];
      if (gadm1Id)
        fetchGADM1Geostore(iso, gadm1Id).then((data) => setGeo(data));
    }
  }, [country.value, selectedState]);

  return (
    <div className="c-analysis-location-editor">
      <div className="c-location-form">
        {/* TODO: Translate */}
        <h4>Select a Location</h4>
        <div className="c-radio-box">
          {LOCATION_CONFIG.options.map((o) => (
            <div key={o.value} className="c-radio">
              <input
                id={`radio-${o.value}`}
                type="radio"
                onChange={locationType.onChange}
                checked={locationType.value === o.value}
                value={o.value}
              />
              <label htmlFor={`radio-${o.value}`}>
                <span />
                {o.label}
              </label>
              {o.value === 'search' && (
                <div style={{ display: 'flex', flexDirection: 'row' }}>
                  <span style={{ paddingLeft: 20 }} />
                  <div style={{ flex: 1 }}>
                    <Field
                      onChange={undefined} // TODO: Search address
                      properties={{
                        disabled: locationType.value !== o.value,
                        placeholder: 'Search address',
                      }}
                    >
                      {Input}
                    </Field>
                  </div>
                </div>
              )}
              {o.value === 'admin' && (
                <div style={{ display: 'flex', flexDirection: 'row' }}>
                  <span style={{ paddingLeft: 20 }} />
                  <div style={{ flex: 1 }}>
                    <Field
                      properties={{
                        default: '',
                        disabled: locationType.value !== o.value,
                        placeholder: 'Country',
                      }}
                      {...country}
                      className="Select--large"
                      options={countries}
                    >
                      {Select}
                    </Field>
                    <Field
                      properties={{
                        default: '',
                        disabled:
                          !country.value || locationType.value !== o.value,
                        placeholder: 'State',
                      }}
                      value={selectedState}
                      onChange={handleSelectedStateChange}
                      className="Select--large"
                      isLoading={statesLoading}
                      options={statesList}
                    >
                      {Select}
                    </Field>
                  </div>
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
      <div className="c-location-actions">
        <button onClick={onCancel} className="c-button -secondary">
          Cancel
        </button>
        <button
          onClick={onSubmit}
          className="c-button -primary"
          disabled={!isValid}
        >
          {current.editing ? 'Edit Location' : 'Add Location'}
        </button>
      </div>
    </div>
  );
};

export default ExploreAnalysisLocationEditor;
