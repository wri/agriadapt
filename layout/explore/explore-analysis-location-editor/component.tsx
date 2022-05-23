import Field from 'components/form/Field';
import Input from 'components/form/Input';
import { EXPLORE_ANALYSIS } from '../constants';
import Select from 'react-select';
import useInput from 'hooks/form/useInput';
import { useMemo, useState } from 'react';

const ExploreAnalysisLocationEditor = ({
  addLocation,
  editLocation,
  setEditIndex,
  editIndex,
  editing = false,
}) => {
  const { LOCATION_CONFIG } = EXPLORE_ANALYSIS;
  const current = locations[editIndex] || {};
  const locationType = useInput(current.type || '');
  const [country, setCountry] = useState(current.country || '');
  const [geo] = useState(null);

  const loc = useMemo(() => ({
    label: `Location ${editIndex} (${locationType.value})`,
    country: country,
    type: locationType.value,
    geo: geo,
  }), [editIndex, locationType, country, geo]);

  const onChangeCountry = (c) => {
    setCountry(c?.value || '');
  };

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
              {o.value === 'dropdown' && (
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
                      options={[
                        { label: 'Colombia', value: 'colombia' },
                        { label: 'India', value: 'india' },
                      ]}
                      value={country}
                      onChange={onChangeCountry}
                    >
                      {Select}
                    </Field>
                    <Field
                      properties={{
                        default: '',
                        disabled: !country || locationType.value !== o.value,
                      }}
                      placeholder="State"
                      className="Select--large"
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
