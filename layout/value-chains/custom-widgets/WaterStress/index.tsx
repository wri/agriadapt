import React from 'react';
import RWAdapter from '@widget-editor/rw-adapter';
import Renderer from '@widget-editor/renderer';
import styles from './styles.module.scss';
import { legend } from './template';
import Controls from './Controls';

interface WaterStressProps {
  config: Record<string, any>;
  setConfig: (config: any) => void;
  controlsProps: {
    options: any[];
    layers: any[];
    country: string;
  };
}

const WaterStress = ({
  config,
  setConfig,
  controlsProps,
}: WaterStressProps) => (
  <>
    <div className={styles.c_chart}>
      <Renderer widgetConfig={config} adapter={RWAdapter} />
    </div>
    <div className={styles.c_info}>
      <div className="flex-1">
        <Controls {...controlsProps} setConfig={setConfig} />
      </div>
      <div className={styles.c_legend}>
        <Renderer widgetConfig={legend} adapter={RWAdapter} />
      </div>
    </div>
  </>
);

export default WaterStress;
