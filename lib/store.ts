import { createWrapper } from 'next-redux-wrapper';
import { reducers as WEReducers } from '@widget-editor/widget-editor';

// todo: move redactions to modules
import * as reducers from 'redactions';
import modules from 'modules';

// Layout
import { reducers as headerReducers } from 'layout/header';
import footerReducers from 'layout/footer/reducers';

// Dataset
import { reducers as datasetListItemReducers } from 'components/datasets/list/list-item';
import { reducers as similarDatasetsReducers } from 'components/datasets/similar-datasets/similar-datasets';

// Value Chains
import narrativeReducers from 'layout/value-chains/reducers';

// Tools
import { reducers as relatedToolsReducers } from 'components/tools/related-tools';

import { configureStore, Reducer } from '@reduxjs/toolkit';

const WERed: Reducer<{ editor: unknown; AnyAction }> = WEReducers;

const makeStore = () =>
  configureStore({
    reducer: {
      ...reducers,
      ...modules,
      ...WERed,
      // Header
      header: headerReducers,
      footer: footerReducers,

      // Value Chains
      value_chains: narrativeReducers,

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
