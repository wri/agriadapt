import Field from 'components/form/Field';
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
import { forwardGeocode, reverseGeocode } from 'services/geocoder';

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
  const address = useSelect(current.address);
  const country = useSelect(current.country);
  const [selectedState, setSelectedState] = useState(current.state);
  const [geo, setGeo] = useState(current.geo);
  const [geocodeResults, setGeocodeResults] = useState([]);
  const [geoLabel, setGeoLabel] = useState(null);

  const [statesList, setStatesList] = useState([]);
  const [statesLoading, setStatesLoading] = useState(false);

  /* Side effect for switching to point or geocoded address location */
  useEffect(() => {
    if (locationType.value === 'point' || locationType.value === 'address') {
      setIsDrawing(true);
      if (current.type === 'point' || current.type === 'address')
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

  useEffect(() => {
    const data =
      locationType.value === 'point'
        ? pointData
        : locationType.value === 'current'
        ? geoLocatorData
        : null;
    if (data) {
      console.log(Object.values(data));
      reverseGeocode(Object.values(data)).then((result) => {
        if (result) setGeoLabel(result.place_name);
      });
    }
  }, [geoLocatorData, locationType.value, pointData]);

  const createLabel = useCallback(() => {
    const accuracy = 4;

    if (locationType.value === 'admin')
      return `${selectedState?.label}, ${country.value?.label}`;
    else if (locationType.value === 'point')
      // return `(${pointData.lat.toFixed(accuracy)}, ${pointData.lng.toFixed(
      //   accuracy
      return (
        geoLabel ||
        `(${pointData.lat.toFixed(accuracy)}, ${pointData.lng.toFixed(
          accuracy
        )})`
      );
    else if (locationType.value === 'current')
      return (
        geoLabel ||
        `(${geoLocatorData.latitude.toFixed(
          accuracy
        )}, ${geoLocatorData.longitude.toFixed(accuracy)})`
      );
    else if (locationType.value === 'address') return `${address.value.label}`;
    else return `Location ${id} (${locationType.value})`;
  }, [
    locationType.value,
    selectedState?.label,
    country.value?.label,
    pointData,
    geoLocatorData,
    address?.value,
    id,
    geoLabel,
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
      ...(locationType.value === 'address' && {
        address: address.value,
        longitude: pointData.lng,
        latitude: pointData.lat,
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

  /* Side effect to clear states list if no country is selected */
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
    if (locationType.value === 'address' && !address.value) return false;
    if (locationType.value === 'admin' && !(country.value && selectedState))
      return false;
    return true;
  }, [
    locationType.value,
    pointData,
    geoLocatorData,
    address.value,
    country.value,
    selectedState,
  ]);

  /* Event handler for geocode autocomplete results */
  const handleAddrSearch = (val: string) => {
    if (val.trim().length)
      forwardGeocode(val).then((results) => {
        setGeocodeResults(
          results.map(({ id, place_name, geometry: { coordinates } }) => ({
            value: id,
            label: place_name,
            lngLat: { lng: coordinates[0], lat: coordinates[1] },
          }))
        );
      });
    else {
      setGeocodeResults([]);
    }
  };

  /* Event handler for selecting a geocoded address */
  const handleSelectAddr = (val: { lngLat: number[] }) => {
    address.onChange(val);
    setDataDrawing(val.lngLat);
  };

  /* Event handler for selecting a state */
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
              {o.value === 'address' && (
                <div style={{ display: 'flex', flexDirection: 'row' }}>
                  <span style={{ paddingLeft: 20 }} />
                  <div style={{ flex: 1 }}>
                    <Field
                      properties={{
                        default: '',
                        disabled: locationType.value !== o.value,
                        placeholder: 'Search address',
                      }}
                      value={address.value}
                      onChange={handleSelectAddr}
                      onInputChange={handleAddrSearch}
                      className="Select--large"
                      options={geocodeResults}
                    >
                      {Select}
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
