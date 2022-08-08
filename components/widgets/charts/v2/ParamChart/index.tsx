import WidgetHeader from 'components/widgets/header/component';
import React, { useState } from 'react';
import Renderer from '@widget-editor/renderer';
import RWAdapter from '@widget-editor/rw-adapter';

interface ParamChartProps {
  controls: React.FunctionComponent;
  controlsProps: any;
  title: string;
}

const ParamChart = ({ controls, controlsProps, title }: ParamChartProps) => {
  const widgetHeader = {
    id: null,
    name: title,
    type: undefined,
  };

  const [config, setConfig] = useState(null);

  return (
    <div className="p-4 border border-b-0 rounded border-gray-light shadow-gray-light shadow-sm">
      <WidgetHeader
        widget={widgetHeader}
        onToggleInfo={undefined}
        onToggleShare={undefined}
      />
      {typeof window !== 'undefined' && (
        <div className="c-param-chart relative flex overflow-y-hidden widget-container grow mb-3 pt-6">
          <Renderer widgetConfig={config} adapter={RWAdapter} />
          {React.createElement(controls, {
            ...controlsProps,
            setConfig: setConfig,
          })}
        </div>
      )}
    </div>
  );
};

export default ParamChart;
