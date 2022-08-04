import WidgetHeader from 'components/widgets/header/component';
import React, { useMemo } from 'react';
import { template } from 'components/widgets/charts/v2/HistogramChart/template';

import Renderer from '@widget-editor/renderer';
import RWAdapter from '@widget-editor/rw-adapter';

const VegaChart = ({ template, country }) => {

  const config = useMemo(() => {
    return { ...template };
  }, [template]);

  return (
    <div className="c-param-chart relative flex overflow-y-hidden widget-container grow mb-3 pt-6">
      <Renderer widgetConfig={config} adapter={RWAdapter} />
      <div className="c-controls">
        {/* Controls go here */}
      </div>
    </div>
  );
};

const HistogramChart = ({ country = undefined, title }) => {
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
        <VegaChart country={country} template={template} />
      )}
    </div>
  );
};

export default HistogramChart;
