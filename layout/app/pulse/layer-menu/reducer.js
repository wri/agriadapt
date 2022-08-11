import { createReducer } from '@reduxjs/toolkit';
import * as actions from './actions';
import initialState from './initial-state';

const reducers = createReducer(initialState, {
  [actions.resetLayerPoints]: (state) => ({ ...state, layerPoints: null }),
  [actions.setActiveLayer]: (state, { payload }) => ({
    ...state,
    layerActive: state.layerActive !== payload ? payload : null,
    loading: false,
    error: null,
  }),
  [actions.setActiveLayerLoading]: (state, { payload }) => ({
    ...state,
    loading: payload,
  }),
  [actions.setActiveLayerError]: (state, { payload }) => ({
    ...state,
    error: payload,
    layerActive: null,
  }),
});

export default reducers;
