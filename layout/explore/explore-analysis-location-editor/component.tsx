import Field from 'components/form/Field';
import Input from 'components/form/Input';
import { EXPLORE_ANALYSIS } from '../constants';
import Select from 'react-select';
import useRadio from 'hooks/form/useRadio';
import { useState } from 'react';

const ExploreAnalysisLocationEditor = ({ addLocation, setFormOpen }) => {
  const { LOCATION_CONFIG } = EXPLORE_ANALYSIS;
  const locationType = useRadio('');
  const [country, setCountry] = useState('');
  const [geo] = useState(null);

  const onChangeCountry = (c) => {
    setCountry(c?.value || '');
  };

  const onCancel = () => {
    setFormOpen(false);
  };

  const onSubmit = () => {
    addLocation({
      label: 'Location',
      country: country,
      type: locationType,
      geo: geo,
    });
    setFormOpen(false);
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
        <button onClick={onSubmit} className="c-button -primary">
          Add Location
        </button>
      </div>
    </div>
  );
};

export default ExploreAnalysisLocationEditor;
