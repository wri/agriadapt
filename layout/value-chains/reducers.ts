import { createSlice } from "@reduxjs/toolkit"

const initialState = {
    country: null,
    activeItem: 'inputs',
}

export const slice = createSlice({
    name: 'valuechains',
    initialState,
    reducers: {
        setCountry: (state, { payload }) => {
            state.country = payload;
        },
        setActiveItem: (state, { payload }) => {
            state.activeItem = payload;
        }
    }
})

export const actions = slice.actions;

export default slice.reducer;