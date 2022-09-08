import WidgetHeader from 'components/widgets/header/component';
import React, { Attributes, useState } from 'react';
import styles from './styles.module.scss';

interface CustomWidgetProps {
  widget: React.FunctionComponent;
  controlsProps: any;
  title: string;
}

const CustomWidget = ({ widget, controlsProps, title }: CustomWidgetProps) => {
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
        <div
          className={`${styles.c_param_chart} relative flex overflow-y-hidden widget-container grow mb-3 pt-6`}
        >
          {React.createElement(widget, {
            config,
            setConfig,
            controlsProps,
          } as Attributes)}
        </div>
      )}
    </div>
  );
};

export default CustomWidget;
