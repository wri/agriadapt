import { createReducer } from "@reduxjs/toolkit";
import * as actions from "./actions";
import initialState from "./initial-state";

const reducer = createReducer(initialState, {
  [actions.setMobileOpened]: (state, action) => ({
    ...state,
    mobileOpened: action.payload,
  }),
  [actions.setSearchOpened]: (state, action) => ({
    ...state,
    searchOpened: action.payload,
  }),
  [actions.setSearchTerm]: (state, action) => ({
    ...state,
    searchTerm: action.payload,
  }),
});

export default reducer;