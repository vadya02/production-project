import type { PayloadAction } from '@reduxjs/toolkit';
import { createSlice } from '@reduxjs/toolkit';
import { CounterSchema } from '../types/counterSchema';

// Define the initial value for the slice state
const initialState: CounterSchema = {
    value: 0,
};

export const counterSlice = createSlice({
    name: 'counter',
    initialState,
    reducers: {
        increment: (state) => {
            state.value += 1;
        },
        decrement: (state) => {
            state.value -= 1;
        },
        incrementByAmount: (state, action: PayloadAction<number>) => {
            state.value += action.payload;
        },
    },
});

// Export the generated action creators for use in components
export const { actions: counterActions } = counterSlice;

// Export the slice reducer for use in the store configuration
export const { reducer: counterReducer } = counterSlice;
