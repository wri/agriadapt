import React from 'react';
import classnames from 'classnames';

// Utils
import { logEvent } from 'utils/analytics';
import { APILayerSpec } from 'types/layer';

interface DatasetLayerCardProps {
  dataset: Record<string, any>;
  layer: APILayerSpec;
  layerGroup: Record<string, any>;
  layerIsActive: boolean;
  setMapLayerGroupActive: ({
    dataset,
    active,
  }: {
    dataset: Record<string, any>;
    active: string;
  }) => void;
  toggleMapLayerGroup: ({
    dataset,
    toggle,
  }: {
    dataset: Record<string, any>;
    toggle: boolean;
  }) => void;
}

function DatasetLayerCard(props: DatasetLayerCardProps) {
  const {
    dataset,
    layer: { id, name, description },
    layerGroup,
    layerIsActive,
    setMapLayerGroupActive,
    toggleMapLayerGroup,
  } = props;

  const componentClassname = classnames({
    'c-dataset-layer-card': true,
    '-active': layerIsActive,
  });
  const layerButtonClassname = classnames({
    'c-button': true,
    '-secondary': !layerIsActive,
    '-primary': layerIsActive,
    '-fullwidth': true,
  });

  const handleToggleLayer = () => {
    if (!layerIsActive) {
      logEvent('Explore', 'Show Layer', `${name} [${id}]`);

      if (!layerGroup) {
        toggleMapLayerGroup({ dataset, toggle: true });
      }
      setMapLayerGroupActive({
        dataset: { id: dataset.id },
        active: id,
      });
    } else {
      toggleMapLayerGroup({
        dataset: { id: dataset.id },
        toggle: false,
      });
      logEvent('Explore', 'Hide Layer', `${name} [${id}]`);
    }
  };

  return (
    <div className={componentClassname}>
      <div className="layer-data">
        <strong>{name}</strong>
        <p className="description">{description}</p>
      </div>
      <div className="button-container">
        <button className={layerButtonClassname} onClick={handleToggleLayer}>
          {!layerIsActive && <span>Show layer</span>}
          {layerIsActive && <span>Active</span>}
        </button>
      </div>
    </div>
  );
}

export default DatasetLayerCard;
