import { createReducer } from '@reduxjs/toolkit';
import * as actions from './actions';
import initialState from './initial-state';

const reducers = createReducer(initialState, {
  [actions.setContextLayers]: (state, { payload }) => ({
    ...state,
    contextLayers: payload,
  }),
  [actions.setContextActiveLayers]: (state, { payload }) => ({
    ...state,
    activeLayers: payload,
    activeLayersLoading: false,
  }),
  [actions.setContextLayersLoading]: (state, { payload }) => ({
    ...state,
    contextLayersLoading: payload,
  }),
  [actions.setContextLayersError]: (state, { payload }) => ({
    ...state,
    error: payload,
  }),
});

export default reducers;
