import { createSlice } from '@reduxjs/toolkit';
import { HYDRATE } from 'next-redux-wrapper';

const initialState = {
  showPrivacyModal: false,
  showTermsModal: false,
};

export const slice = createSlice({
  name: 'FOOTER',
  initialState,
  reducers: {
    setShowPrivacyModal: (state, { payload }) => {
      state.showPrivacyModal = payload;
    },
    setShowTermsModal: (state, { payload }) => {
      state.showTermsModal = payload;
    },
  },
  extraReducers: (builder) => {
    // eslint-disable-next-line
    // @ts-ignore
    builder.addCase(HYDRATE, (state, { payload }) => ({
      ...payload.footer,
    }));
  },
});

export const actions = slice.actions;

export default slice.reducer;
