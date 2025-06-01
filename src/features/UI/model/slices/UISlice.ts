import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { UISchema } from "../types/UISchema";


const initialState: UISchema = {
  scroll: {},
}

export const uiSlice = createSlice({
  name: 'ui',
  initialState,
  reducers: {
    setScrollPosition: (state, {payload}: PayloadAction<{path: string; position: number}>) => {
      state.scroll[payload.path] = payload.position;
    }
  }
  // extraReducers(builder) {
      
  // },
})

export const {reducer: uiReducer} = uiSlice;
export const {actions: uiActions} = uiSlice;