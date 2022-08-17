import { createSelector, createStructuredSelector } from 'reselect';
import { RootState } from 'lib/store';

// constants
import { BASEMAPS, LABELS } from 'components/map/constants';

// selectors
import {
  getUpdatedLayers,
  getActiveLayers,
  getUpdatedLayerGroups,
  getActiveInteractiveLayers,
} from 'components/map/selectors';
import { Basemap, Labels } from 'components/map/types';

const getLayerGroups = (state) => state.explore.map.layerGroups;
const getParametrization = (state) => state.explore.map.parametrization;
const getBasemapId = (state) => state.explore.map.basemap;
const getLabelId = (state) => state.explore.map.labels;

export const exploreMapGetUpdatedLayerGroups =
  getUpdatedLayerGroups(getLayerGroups);
export const exploreMapGetActiveLayers = getActiveLayers(getLayerGroups);
export const exploreMapGetUpdatedLayers = getUpdatedLayers(
  exploreMapGetActiveLayers,
  getParametrization
);
export const exploreMapGetActiveInteractiveLayers = getActiveInteractiveLayers(
  exploreMapGetActiveLayers
);

export const getBasemap = createSelector(
  [getBasemapId],
  (basemapId) => BASEMAPS[basemapId]
);

export const getLabel = createSelector(
  [getLabelId],
  (labelId) => LABELS[labelId]
);

export const getMapProps = createStructuredSelector<
  RootState,
  { basemap: Basemap; labels: Labels }
>({
  basemap: getBasemap,
  labels: getLabel,
});
