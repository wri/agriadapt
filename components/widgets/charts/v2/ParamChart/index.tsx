import WidgetHeader from 'components/widgets/header/component';
import React, { useState } from 'react';
import Renderer from '@widget-editor/renderer';
import RWAdapter from '@widget-editor/rw-adapter';
import styles from './styles.module.scss';

interface ParamChartProps {
  controls: React.FunctionComponent;
  legendConfig: any;
  controlsProps: any;
  title: string;
}

const ParamChart = ({
  controls,
  controlsProps,
  title,
  legendConfig,
}: ParamChartProps) => {
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
        <div className={`${styles.c_param_chart} relative flex overflow-y-hidden widget-container grow mb-3 pt-6`}>
          <div className="flex-1">
            <Renderer widgetConfig={config} adapter={RWAdapter} />
          </div>
          <div className="flex flex-col pr-5">
            <div className="flex-1">
              {React.createElement(controls, {
                ...controlsProps,
                setConfig,
              })}
            </div>
            <div className={styles.c_legend}>
              <Renderer widgetConfig={legendConfig} adapter={RWAdapter} />
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default ParamChart;
