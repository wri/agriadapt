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

// Explore
import exploreReducer from 'layout/explore/reducers';

// Tools
import { reducers as relatedToolsReducers } from 'components/tools/related-tools';

import storage from 'redux-persist/lib/storage';

import { configureStore, Reducer } from '@reduxjs/toolkit';
import { persistCombineReducers, persistReducer, persistStore } from 'redux-persist';

const WERed: Reducer<{ editor: unknown; AnyAction }> = WEReducers;

const persistConfig = {
  key: 'root',
  storage,
  whitelist: [''],
};

const explorePersistConfig = {
  key: 'explore',
  storage,
  whitelist: ['analysis', 'sidebar']
}

const persistedRootReducer = persistCombineReducers(persistConfig, {
  ...reducers,
  ...modules,
  ...WERed,
  // Header
  header: headerReducers,
  footer: footerReducers,

  // Value Chains
  value_chains: narrativeReducers,

  // Explore
  explore: persistReducer(explorePersistConfig, exploreReducer),

  // Dataset
  datasetListItem: datasetListItemReducers,
  similarDatasets: similarDatasetsReducers,

  // Tools
  relatedTools: relatedToolsReducers,
});

const makeStore = () => {
  const store = configureStore({
    reducer: persistedRootReducer,
  });
  store['__persistor'] = persistStore(store);
  return store;
}

export type AppStore = ReturnType<typeof makeStore>;
export type RootState = ReturnType<AppStore['getState']>;

export const wrapper = createWrapper<AppStore>(makeStore);
