import React from 'react';
import RWAdapter from '@widget-editor/rw-adapter';
import Renderer from '@widget-editor/renderer';
import styles from './styles.module.scss';
import { legend } from './template';
import Controls from './Controls';
import classnames from 'classnames';

interface ImportExportProps {
  config: Record<string, any>;
  setConfig: (config: any) => void;
  controlsProps: {
    indicators: any[];
    products: any[];
    country: string;
  };
}

const ImportExport = ({
  config,
  setConfig,
  controlsProps,
}: ImportExportProps) => (
  <div className="flex flex-1 flex-col">
    <div className={classnames(styles.c_info, "flex flex-auto")}>
      <div className="flex-auto">
        <Controls {...controlsProps} setConfig={setConfig} />
      </div>
      <div className={`${styles.c_legend} flex-1`}>
        <Renderer widgetConfig={legend} adapter={RWAdapter} />
      </div>
    </div>
    <div className="flex-1">
      <Renderer widgetConfig={config} adapter={RWAdapter} />
    </div>
  </div>
);

export default ImportExport;
