import { createReducer } from '@reduxjs/toolkit';
import * as actions from './similar-datasets-actions';
import initialState from './similar-datasets-initial-state';

const reducers = createReducer(initialState, {
  [actions.setSimilarDatasetsLoading]: (state, { payload }) => ({
    ...state,
    loading: payload,
    error: null,
  }),
  [actions.setSimilarDatasetsError]: (state, { payload }) => ({
    ...state,
    loading: false,
    error: payload,
  }),
  [actions.setSimilarDatasets]: (state, { payload }) => ({
    ...state,
    data: payload,
  }),
  [actions.resetSimilarDatasets]: () => initialState,
});

export default reducers;
