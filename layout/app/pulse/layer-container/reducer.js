import { createReducer } from '@reduxjs/toolkit';
import * as actions from './actions';
import initialState from './initial-state';

const reducer = createReducer(initialState, {
  [actions.setDisplayed]: (state, { payload }) => ({
    ...state,
    displayed: payload,
  }),
});

export default reducer;
