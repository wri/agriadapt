import WidgetHeader from 'components/widgets/header/component';
import React, { useMemo, useState } from 'react';
import { template } from 'components/widgets/charts/v2/ParamChart/template';
import Select from 'react-select';
import RadioGroup from 'components/form/RadioGroup';

import Renderer from '@widget-editor/renderer';
import RWAdapter from '@widget-editor/rw-adapter';
import Field from 'components/form/Field';
import useSelect from 'hooks/form/useSelect';

const BarChart = ({ template, country, layers, options: params }) => {
  // TODO: Use controls JSX prop instead 
  const options = [
    { label: 'Pessimistic (RCP 8.5)', value: 'rcp8p5' },
    { label: 'Optimistic (RCP 4.5)', value: 'rcp4p5' },
  ];
  const emscen = useSelect(options[0]);
  const [radios, setRadios] = useState(
    Array.isArray(params[0]) ? params.map((p) => p[0].value) : [params[0].value]
  );
  const [radioToggle, setRadioToggle] = useState(true);

  const handleSelectEm = (em) => {
    emscen.onChange(em);
  };

  const handleRadioSelect = (i) => (c) => {
    setRadios(r => {
      r[i] = c;
      return r;
    });
    setRadioToggle(t => !t);
  };

  const config = useMemo(() => {
    const rasters = [...layers[emscen.value.value], ...layers['historic']]
      .reduce((arr, l) => {
        if (radios.every((p) => l.includes(p))) arr.push(`'${l}'`);
        return arr;
      }, [])
      .join(',');
    if (!rasters.length) return { ...template };
    const url = `https://wri-rw.carto.com/api/v2/sql?q=select raster, country, crop_suitability_class, value from foo_067_rw0_crop_suitability_class_edit WHERE raster IN (${rasters}) AND country IN ('${country}') AND crop_suitability_class NOT IN ('No Cultivation')`;
    return {
      ...template,
      data: [
        {
          ...template.data[0],
          url,
        },
      ],
    };
  }, [country, emscen.value, layers, radios, radioToggle, template]);

  return (
    <div className="c-param-chart relative flex overflow-y-hidden widget-container grow mb-3 pt-6">
      <Renderer widgetConfig={config} adapter={RWAdapter} />
      <div className="c-controls">
        <Field
          id={'EMISSION_SCENARIO'}
          properties={{
            // TODO: Translate
            label: `Emissions Scenario`,
            default: options[0],
          }}
          value={emscen.value}
          onChange={handleSelectEm}
          options={options}
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
              // TODO: Translate
              // label: `Type`,
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
    </div>
  );
};

const ParamChart = ({ country = undefined, layers, options, title }) => {
  const widgetHeader = {
    id: null,
    name: title,
    type: undefined,
  };

  return (
    <div className="p-4 border border-b-0 rounded-tl rounded-tr border-gray-light shadow-gray-light shadow-sm rounded-br rounded-bl">
      <WidgetHeader
        widget={widgetHeader}
        onToggleInfo={undefined}
        onToggleShare={undefined}
      />
      {typeof window !== 'undefined' && (
        <BarChart
          template={template}
          country={country}
          layers={layers}
          options={options}
        />
      )}
    </div>
  );
};

export default ParamChart;
