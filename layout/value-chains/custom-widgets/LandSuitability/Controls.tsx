import Field from 'components/form/Field';
import useSelect from 'hooks/form/useSelect';
import React, { useEffect, useState } from 'react';
import { template } from './template';
import Select from 'react-select';
import RadioGroup from 'components/form/RadioGroup';
import { useTranslation } from 'next-i18next';
import styles from './styles.module.scss';

const Controls = ({ setConfig, options: params, layers, country }) => {
  const scenarios = [
    { label: 'Pessimistic (RCP 8.5)', value: 'rcp8p5' },
    { label: 'Optimistic (RCP 4.5)', value: 'rcp4p5' },
  ];
  const emscen = useSelect(scenarios[0]);
  const [radios, setRadios] = useState(
    Array.isArray(params[0]) ? params.map((p) => p[0].value) : [params[0].value]
  );
  const [radioToggle, setRadioToggle] = useState(true);

  const { t } = useTranslation('common')

  const handleRadioSelect = (i) => (c) => {
    setRadios((r) => {
      r[i] = c;
      return r;
    });
    setRadioToggle((t) => !t);
  };

  useEffect(() => {
    const rasters = [...layers[emscen.value.value], ...layers['historic']]
      .reduce((arr, l) => {
        if (radios.every((p) => l.includes(p))) arr.push(`'${l}'`);
        return arr;
      }, [])
      .join(',');
    if (!rasters.length) setConfig({ ...template });
    const url = `https://wri-rw.carto.com/api/v2/sql?q=select raster, country, crop_suitability_class, value from foo_067_rw0_crop_suitability_class_edit WHERE raster IN (${rasters}) AND country IN ('${country}') AND crop_suitability_class NOT IN ('No Cultivation')`;
    setConfig({
      ...template,
      data: [
        {
          ...template.data[0],
          url,
        },
      ],
    });
  }, [country, emscen.value, layers, radios, setConfig, radioToggle]);

  return (
    <div className={styles.c_controls}>
      <Field
        id={'EMISSION_SCENARIO'}
        properties={{
          // TODO: Translate
          label: t('common:emission_scenarios:Emissions_Scenario'),
          default: scenarios[0],
        }}
        value={emscen.value}
        onChange={emscen.onChange}
        options={scenarios}
        className={'Select--large'}
      >
        {Select}
      </Field>
      {Array.isArray(params[0]) ? (
        params.map((p, i) => (
          <Field
            key={i}
            id={`RADIO_${i}`}
            properties={{
              default: p[0].value,
            }}
            value={radios[i]}
            onChange={handleRadioSelect(i)}
            options={p}
          >
            {RadioGroup}
          </Field>
        ))
      ) : (
        <Field
          id={'RADIO'}
          properties={{
            default: params[0].value,
          }}
          value={radios[0]}
          onChange={handleRadioSelect(0)}
          options={params}
        >
          {RadioGroup}
        </Field>
      )}
    </div>
  );
};

export default Controls;
