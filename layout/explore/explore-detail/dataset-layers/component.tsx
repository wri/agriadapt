import React from 'react';
import PropTypes from 'prop-types';

// Components
import DatasetLayerCard from './dataset-layer-card';
import { APILayerSpec } from 'types/layer';
import { useTranslation } from 'next-i18next';

const DatasetLayers = ({
  layers,
  dataset,
  isATimeline,
  timelineLayerMapbox,
  timelineLayer,
}) => {
  const showTimelineMapbox = isATimeline && !!timelineLayerMapbox;
  const showTimelineOldApproach =
    isATimeline && !timelineLayerMapbox && timelineLayer;

  const { t } = useTranslation(['explore', 'common']);

  return (
    <div className="c-dataset-layers">
      <h3>{t('explore:explore_detail.Dataset layers')}</h3>
      <div className="layers-container">
        {showTimelineOldApproach && (
          <DatasetLayerCard layer={timelineLayer} dataset={dataset} />
        )}
        {showTimelineMapbox && (
          <DatasetLayerCard layer={timelineLayerMapbox} dataset={dataset} />
        )}
        {!isATimeline &&
          layers.map((layer: APILayerSpec) => (
            <DatasetLayerCard key={layer.id} layer={layer} dataset={dataset} />
          ))}
      </div>
    </div>
  );
};

DatasetLayers.propTypes = {
  layers: PropTypes.array.isRequired,
  dataset: PropTypes.object.isRequired,
  layerGroups: PropTypes.object.isRequired,
  isATimeline: PropTypes.bool.isRequired,
  timelineLayerMapbox: PropTypes.object.isRequired,
};

export default DatasetLayers;
