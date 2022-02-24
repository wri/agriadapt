import { createAction } from '@reduxjs/toolkit';
import { createThunkAction } from 'redux-tools';

// Actions
export const setStaticData = createAction('GET-INVOLVED-INDEX/setStaticData');
export const setStaticDataLoading = createAction('GET-INVOLVED-INDEX/setStaticDataLoading');
export const setStaticDataError = createAction('GET-INVOLVED-INDEX/setStaticDataError');

export const fetchStaticData = createThunkAction('GET-INVOLVED-INDEX/fetchStaticData', (payload = 'get-involved') => (dispatch) => {
  dispatch(setStaticDataLoading(true));
  dispatch(setStaticDataError(null));

  return fetch(new Request(`${process.env.NEXT_PUBLIC_WRI_API_URL}/v1/static_page/${payload}`))
    .then((response) => {
      if (response.ok) return response.json();
      throw new Error(response.statusText);
    })
    .then(({ data }) => {
      dispatch(setStaticDataLoading(false));
      dispatch(setStaticDataError(null));
      dispatch(setStaticData({ name: payload, ...data.attributes }));
    })
    .catch((err) => {
      dispatch(setStaticDataLoading(false));
      dispatch(setStaticDataError(err));
    });
});
