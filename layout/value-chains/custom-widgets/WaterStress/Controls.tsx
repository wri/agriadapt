import Field from 'components/form/Field';
import useSelect from 'hooks/form/useSelect';
import React, { useEffect } from 'react';
import { template } from './template';
import Select from 'react-select';
import { useTranslation } from 'next-i18next';
import styles from './styles.module.scss';

const Controls = ({ setConfig, layers, country }) => {
  const scenarios = [
    { label: 'common:emission_scenarios.pessimistic', value: 'rcp8p5' },
    { label: 'common:emission_scenarios.optimistic', value: 'rcp4p5' },
  ];
  const emscen = useSelect(scenarios[0]);

  const { t } = useTranslation(['common', 'widgets']);

  useEffect(() => {
    const rasters = [...layers[emscen.value.value]]
      .map((l) => `'${l}'`)
      .join(',');
    if (!rasters.length) setConfig({ ...template });
    const url = `https://wri-rw.carto.com/api/v2/sql?q=select water_stress_change, country, layer, area from wat_006_rw1_projected_water_stress_class_edit WHERE layer IN (${rasters}) AND country IN ('${country}')`;
    setConfig({
      ...template,
      data: [
        {
          ...template.data[0],
          url,
        },
      ],
    });
  }, [country, emscen.value, layers, setConfig]);

  return (
    <div className={styles.c_controls}>
      <Field
        id={'EMISSION_SCENARIO'}
        properties={{
          label: t('common:emission_scenarios:Emissions_Scenario'),
          default: scenarios[0],
        }}
        isSearchable={false}
        value={{ ...emscen.value, label: t(emscen.value.label) }}
        onChange={emscen.onChange}
        options={scenarios.map((s) => ({ ...s, label: t(s.label) }))}
        className={'Select--large'}
      >
        {Select}
      </Field>
    </div>
  );
};

export default Controls;
