import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { fetchProfileData } from "../services/fetchProfileData";
import { Profile, ProfileSchema } from "../types/profile";


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
  extraReducers(builder) {
      builder
          .addCase(fetchProfileData.pending, (state) => {
              state.isLoading = true;
              state.error = '';
          })
          .addCase(fetchProfileData.fulfilled, (state, action: PayloadAction<Profile>) => {
              state.isLoading = false;
              state.data = action.payload;
          })
          .addCase(fetchProfileData.rejected, (state, action) => {
              state.error = action.payload;
              state.isLoading = false;
          });
  },
})

export const {actions: profileActions} = profileSLice
export const {reducer: profileReducer} = profileSLice