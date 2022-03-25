import { createReducer } from "@reduxjs/toolkit";
import * as actions from "./actions";
import initialState from "./initial-state";

const reducers = createReducer(initialState, {
  [actions.toggleLabelsLayer]: (state, { payload }) => ({
    url: payload,
    labelsLayerActive: !state.labelsLayerActive,
  }),
  [actions.resetLabelsLayer]: () => ({ url: null, labelsLayerActive: false }),
});

export default reducers;
