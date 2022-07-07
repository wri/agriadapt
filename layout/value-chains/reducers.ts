import { createSlice } from "@reduxjs/toolkit"

const initialState = {
    geostore: '',
    activeItem: 'inputs',
}

export const slice = createSlice({
    name: 'valuechains',
    initialState,
    reducers: {
        setGeostore: (state, { payload }) => {
            state.geostore = payload;
        },
        setActiveItem: (state, { payload }) => {
            state.activeItem = payload;
        }
    }
})

export const actions = slice.actions;

export default slice.reducer;