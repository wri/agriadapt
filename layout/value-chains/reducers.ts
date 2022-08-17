import { createSlice } from '@reduxjs/toolkit';
import { HYDRATE } from 'next-redux-wrapper';

const initialState = {
  country: null,
  crop: 'rice',
  worldview: 'US',
};

export const slice = createSlice({
  name: 'VALUECHAINS',
  initialState,
  reducers: {
    setCountry: (state, { payload }) => {
      state.country = payload;
    },
    setActiveCrop: (state, { payload }) => {
      state.crop = payload;
    },
    setWorldview: (state, { payload }) => {
      state.worldview = payload;
    },
  },
  extraReducers: (builder) => {
    // eslint-disable-next-line
    // @ts-ignore
    builder.addCase(HYDRATE, (state, { payload }) => ({
      ...payload.value_chains,
    }));
  },
});

export const actions = slice.actions;

export default slice.reducer;
