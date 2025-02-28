import { createSlice } from "@reduxjs/toolkit";
import { ProfileSchema } from "../types/profile";


const initialState: ProfileSchema = {
    readonly: true,
    isLoading: false,
    error: undefined,
    data: undefined,
}

export const profileSLice = createSlice({
  name: 'profile',
  initialState,
  reducers: {},
})

export const {actions: profileActions} = profileSLice
export const {reducer: profileReducer} = profileSLice