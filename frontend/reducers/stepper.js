import { createSlice } from '@reduxjs/toolkit'

const initialState = {
    value: {
        nextPage: false,
        submitInfos: false,
    },
};

export const stepperSlice = createSlice({
    name: 'stepper',
    initialState,
    reducers: {
        getNextPage: (state, action) => {
            state.value.nextPage = action.payload;
        },
        submitInfos: (state, action) => {
            state.value.submitInfos = action.payload;
        }
    },
});

export const { getNextPage, submitInfos } = stepperSlice.actions;
export default stepperSlice.reducer;