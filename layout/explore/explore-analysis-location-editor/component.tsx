import Field from 'components/form/Field';
import Input from 'components/form/Input';
import { EXPLORE_ANALYSIS } from '../constants';
import Select from 'react-select';
import useInput from 'hooks/form/useInput';
import { useCallback, useEffect, useMemo, useState } from 'react';
import { fetchDatasetQuery } from 'services/query';
import { GADM_ADMONE_DATSET_ID, GADM_ADMONE_SQL } from 'constants/app';
import useSelect from 'hooks/form/useSelect';
import { fetchGADM1Geostore } from 'services/geostore';

const ExploreAnalysisLocationEditor = ({
  list: locations,
  countries,
  addLocation,
  editLocation,
  setEditIndex,
  editIndex,
  editing = false,
}) => {
  const { LOCATION_CONFIG } = EXPLORE_ANALYSIS;
  const current = locations[editIndex] || {};
  const label = current.label;
  const locationType = useInput(current.type || '');
  const country = useSelect(current.country || '');
  const state = useSelect(current.state || '');
  const [geo, setGeo] = useState(current.geo || null);

  const [states, setStates] = useState([]);
  const [statesLoading, setStatesLoading] = useState(false);

  const createLabel = useCallback(() => {
    if (locationType.value === 'admin')
      return `${state.value.label}, ${country.value.label}`;
    else return `Location ${editIndex} (${locationType.value})`;
  }, [locationType.value, state.value.label, country.value.label, editIndex]);

  const loc = useMemo(() => {
    return {
      label: label || createLabel(),
      country: country.value.value,
      state: state.value.value,
      type: locationType.value,
      geo: geo,
    };
  }, [
    label,
    createLabel,
    country.value.value,
    state.value.value,
    locationType.value,
    geo,
  ]);

  const onCancel = () => {
    setEditIndex(-1);
  };

  const onSubmit = () => {
    addLocation(loc);
  };

  const onSubmitEdit = () => {
    editLocation({
      index: editIndex,
      edit: loc,
    });
  };

  // Side effect for getting state options based on country
  useEffect(() => {
    const iso = country.value.value;
    if (iso) {
      setStatesLoading(true);
      fetchDatasetQuery(
        GADM_ADMONE_DATSET_ID,
        `${GADM_ADMONE_SQL} '${iso}'`
      ).then(({ data: { data: states } }) => {
        setStates(states.map((s) => ({ label: s.name_1, value: s.gid_1 })));
        setStatesLoading(false);
      });
    }
  }, [country.value.value]);

  // Side effect for getting geo data
  useEffect(() => {
    const iso = country.value.value;
    const [, gadm1Id] = state.value.value
      ? state.value.value.match(/[A-Z]{3}\.(\d+)_1/)
      : [];
    if (gadm1Id) fetchGADM1Geostore(iso, gadm1Id).then((data) => setGeo(data));
  }, [country.value.value, state.value.value]);

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
                      }}
                      placeholder="Country"
                      className="Select--large"
                      options={countries}
                      {...country}
                    >
                      {Select}
                    </Field>
                    <Field
                      properties={{
                        default: '',
                        disabled: !country || locationType.value !== o.value,
                        isLoading: statesLoading,
                      }}
                      placeholder="State"
                      className="Select--large"
                      options={states}
                      {...state}
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
          onClick={editing ? onSubmitEdit : onSubmit}
          className="c-button -primary"
          disabled={!locationType.value}
        >
          {editing ? 'Edit Location' : 'Add Location'}
        </button>
      </div>
    </div>
  );
};

export default ExploreAnalysisLocationEditor;
