import { createReducer } from '@reduxjs/toolkit';
import * as actions from './actions';
import initialState from './initial-state';

const reducers = createReducer(initialState, {
  //
  // TOOLS
  //
  [actions.setTools]: (state, action) => ({ ...state, list: action.payload }),
  [actions.setActiveTools]: (state, action) => ({
    ...state,
    active: action.payload,
  }),
  [actions.setToolsLoading]: (state, action) => ({
    ...state,
    loading: action.payload,
  }),
  [actions.setToolsError]: (state, action) => ({
    ...state,
    error: action.payload,
  }),
});

export default reducers;
