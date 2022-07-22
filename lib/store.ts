import { createWrapper } from 'next-redux-wrapper';
import {
  reducers as WEReducers,
} from '@widget-editor/widget-editor';

// todo: move redactions to modules
import * as reducers from 'redactions';
import modules from 'modules';

// Layout
import { reducers as headerReducers } from 'layout/header';

// Dataset
import { reducers as datasetListItemReducers } from 'components/datasets/list/list-item';
import { reducers as similarDatasetsReducers } from 'components/datasets/similar-datasets/similar-datasets';

// Value Chains
import narrativeReducer from 'layout/value-chains/reducers'

// Tools
import { reducers as relatedToolsReducers } from 'components/tools/related-tools';

// Pulse
import { reducers as pulseReducers } from 'layout/app/pulse';
import { reducers as layerContainerReducers } from 'layout/app/pulse/layer-container';
import { reducers as layerMenuReducers } from 'layout/app/pulse/layer-menu';
// import {
//   reducers as layerCardReducers,
//   initialState as layerCardInitialState,
// } from 'layout/app/pulse/layer-card';
import { reducers as layerPillReducers } from 'layout/app/pulse/layer-pill';
import { reducers as labelsPillsReducers } from 'layout/app/pulse/labels-pill';
import { reducers as globeCesiumReducers } from 'components/vis/globe-cesium';
import { configureStore, Reducer } from '@reduxjs/toolkit';

const WERed: Reducer<{ editor: unknown; AnyAction }> = WEReducers;

const makeStore = () => configureStore({
  reducer: {
    ...reducers,
    ...modules,
    ...WERed,
    // Header
    header: headerReducers,

    // Value Chains
    value_chains: narrativeReducer,

    // Pulse
    layerContainerPulse: layerContainerReducers,
    layerMenuPulse: layerMenuReducers,
    contextLayersPulse: layerPillReducers,
    labelsPulse: labelsPillsReducers,
    globeCesium: globeCesiumReducers,
    pulse: pulseReducers,

    // Dataset
    datasetListItem: datasetListItemReducers,
    similarDatasets: similarDatasetsReducers,

    // Tools
    relatedTools: relatedToolsReducers,
  },
});

export type AppStore = ReturnType<typeof makeStore>;
export type RootState = ReturnType<AppStore['getState']>;

export const wrapper = createWrapper<AppStore>(makeStore);
