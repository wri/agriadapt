import React, {
  ChangeEventHandler,
  useCallback,
  useEffect,
  useMemo,
  useRef,
  useState,
} from 'react';
import Field from 'components/form/Field';
import { EXPLORE_ANALYSIS } from '../constants';
import Select from 'react-select';
import useInput from 'hooks/form/useInput';
import { fetchDatasetQuery } from 'services/query';
import { GADM_ADMONE_DATSET_ID, GADM_ADMONE_SQL } from 'constants/app';
import useSelect from 'hooks/form/useSelect';
import { fetchGADM1Geostore } from 'services/geostore';
import { AnalysisLocation } from 'types/analysis';
import { getUserPosition } from 'utils/locations/user-position';
import { forwardGeocode } from 'services/geocoder';
import { useTranslation } from 'next-i18next';
import { useRouter } from 'next/router';
import { getGeocodeInfo, getIso } from './utils';

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
  const locationType = useInput<AnalysisLocation['type']>(
    current.type || 'point'
  );
  const typeRefs = useRef<Record<string, HTMLInputElement>>({});
  const address = useSelect(current.address);
  const country = useSelect(current.country);
  const [countryAndIso, setCountryAndIso] = useState({
    country: current.country,
    iso: current.iso,
  });
  const [selectedState, setSelectedState] = useState(current.state);
  const [geo, setGeo] = useState(current.geo);
  const [autocompleteResults, setAutocompleteResults] = useState<
    { value: string; label: string; lngLat: Record<string, number> }[]
  >([]);
  const [geocodeResults, setGeocodeResults] = useState<number[]>([]);
  const [geoLabel, setGeoLabel] = useState(null);

  const [statesList, setStatesList] = useState([]);
  const [statesLoading, setStatesLoading] = useState(false);

  const router = useRouter();
  const { locale } = router;

  useEffect(() => {
    setIsDrawing(true);
  }, [setIsDrawing]);

  /**
   * Side effect for processing clicked point data
   */
  useEffect(() => {
    const data = locationType.value === 'point' ? pointData : null;
    if (data) {
      getGeocodeInfo(data, locale).then(({ label, country, iso }) => {
        setGeoLabel(label);
        setCountryAndIso({
          country,
          iso,
        });
      });
    }
  }, [locale, locationType.value, pointData]);

  const onChangeLocType: ChangeEventHandler<HTMLInputElement> = async (e) => {
    locationType.onChange(e);
    const type = e.target.value;
    if (type === 'current') { // Current Location
      const { coords } = await getUserPosition();
      if (!coords) return;

      const data = { longitude: coords.longitude, latitude: coords.latitude };

      setIsGeoLocating(true);
      setIsDrawing(false);
      setDataGeoLocator(data);

      const { label, ...countryAndIso } = await getGeocodeInfo(data, locale);
      setGeoLabel(label);
      setCountryAndIso(countryAndIso);
    } else if (['point', 'address'].includes(type)) { // Point & Address Locations
      setIsDrawing(true);
      setIsGeoLocating(false);
      // Places marker at previous location data
      if (['point', 'address'].includes(current.type))
        setDataDrawing({ lng: current.longitude, lat: current.latitude });
    }
  };

  const createLabel = useCallback(() => {
    const accuracy = 4;

    if (locationType.value === 'admin')
      return `${selectedState?.label}, ${country.value?.label}`;
    else if (locationType.value === 'point')
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

  const stopEditing = useCallback(() => {
    setIsDrawing(false);
    setDataDrawing(null);
    setIsGeoLocating(false);
    setDataGeoLocator(null);
  }, [setDataDrawing, setDataGeoLocator, setIsDrawing, setIsGeoLocating]);

  const onCancel = () => {
    if (!isAdding) setEditing({ id, editing: false });
    else setIsAdding(false);
    stopEditing();
  };

  const makeLocation = useCallback(() => {
    const type = locationType.value;
    const loc = {
      id,
      label: label || createLabel(),
      type,
      iso: countryAndIso.iso,
      country: countryAndIso.country,
      // ...(type === 'admin' && {
      //   country: country.value,
      //   state: selectedState,
      //   longitude: geocodeResults[1],
      //   latitude: geocodeResults[0],
      // }),
      ...(type === 'point' && {
        longitude: pointData.lng,
        latitude: pointData.lat,
      }),
      ...(type === 'current' && {
        longitude: geoLocatorData.longitude,
        latitude: geoLocatorData.latitude,
      }),
      ...(type === 'address' && {
        address: address.value,
        longitude: pointData.lng,
        latitude: pointData.lat,
      }),
      geo,
      editing: false,
    };
    return loc;
  }, [
    address.value,
    countryAndIso.country,
    countryAndIso.iso,
    createLabel,
    geo,
    geoLocatorData?.latitude,
    geoLocatorData?.longitude,
    id,
    label,
    locationType.value,
    pointData?.lat,
    pointData?.lng,
  ]);

  const onSubmit = () => {
    const loc = makeLocation();
    
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
      forwardGeocode(val, String(locale)).then((results) => {
        setAutocompleteResults(
          results.map(
            ({ id, place_name, context, geometry: { coordinates } }) => ({
              value: id,
              label: place_name,
              country: context?.at(-1).text,
              lngLat: { lng: coordinates[0], lat: coordinates[1] },
            })
          )
        );
      });
    else {
      setAutocompleteResults([]);
    }
  };

  /* Event handler for selecting a geocoded address */
  const handleSelectAddr = (val: { country: string; lngLat: number[] }) => {
    address.onChange(val);
    setCountryAndIso({
      iso: getIso(val.country, locale),
      country: val.country,
    });
    setDataDrawing(val.lngLat);
  };

  /* Event handler for selecting a state */
  const handleSelectedStateChange = (obj) => {
    setSelectedState(obj);
  };

  /* Side Effect to Geocode the Country and Selected State */
  useEffect(() => {
    if (country.value?.label && selectedState?.label)
      forwardGeocode(
        `${selectedState?.label}, ${country.value?.label}`,
        Array.isArray(locale) ? locale.join('') : locale
      ).then((results) => {
        if (results) {
          const lngLatArr: number[] = [
            results[0].geometry.coordinates[1],
            results[0].geometry.coordinates[0],
          ];
          setGeocodeResults(lngLatArr);
        }
      });
    else {
      setGeocodeResults([]);
    }
  }, [country.value?.label, locale, selectedState]);

  /* Side Effect to place the marker at the Geocoded Coordinates */
  useEffect(() => {
    if (geocodeResults[0] && geocodeResults[1]) {
      setIsDrawing(true);
      setDataDrawing({ lng: geocodeResults[1], lat: geocodeResults[0] });
    }
  }, [geocodeResults, setDataDrawing, setIsDrawing]);

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

  const { t } = useTranslation(['explore', 'common']);

  return (
    <div className="c-analysis-location-editor">
      <div className="c-location-form">
        <h4>{t('explore:analysis.Select a Location')}</h4>
        <div className="c-radio-box">
          {LOCATION_CONFIG.options.map((o) => (
            <div key={o.value} className="c-radio">
              <input
                id={`radio-${o.value}`}
                ref={(el) => (typeRefs.current[o.value] = el)}
                type="radio"
                onChange={onChangeLocType}
                checked={locationType.value === o.value}
                value={o.value}
              />
              <label htmlFor={`radio-${o.value}`}>
                <span />
                {t(o.label)}
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
                      options={autocompleteResults}
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
          {t('explore:analysis.Cancel')}
        </button>
        <button
          onClick={onSubmit}
          className="c-button -primary"
          disabled={!isValid}
        >
          {current.editing
            ? t('explore:analysis.Edit Location')
            : t('explore:analysis.Add Location')}
        </button>
      </div>
    </div>
  );
};

export default ExploreAnalysisLocationEditor;
