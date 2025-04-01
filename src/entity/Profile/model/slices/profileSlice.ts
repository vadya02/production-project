import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { fetchProfileData } from "../services/fetchProfileData/fetchProfileData";
import { updateProfileData } from "../services/updateProfileData/updateProfileData";
import { Profile, ProfileSchema, ValidateProfileError } from "../types/profile";


const initialState: ProfileSchema = {
    readonly: true,
    isLoading: false,
    error: undefined,
    data: undefined,
}

export const profileSLice = createSlice({
  name: 'profile',
  initialState,
  reducers: {
    setReadonly: (state, action: PayloadAction<boolean>) => {
        state.readonly = action.payload
    },
    cancelEdit: (state) => {
        state.readonly = true;
        state.form = state.data;
    },
    updateProfile: (state, action: PayloadAction<Profile>) => {
        state.form = {
            ...state.data,
            ...action.payload
        }
    },
  },
  extraReducers(builder) {
      builder
          .addCase(fetchProfileData.pending, (state) => {
              state.isLoading = true;
              state.error = '';
          })
          .addCase(fetchProfileData.fulfilled, (state, action: PayloadAction<Profile>) => {
              state.isLoading = false;
              state.data = action.payload;
              state.form = action.payload;
          })
          .addCase(fetchProfileData.rejected, (state, action) => {
              state.error = action.payload;
              state.isLoading = false;
          })
          .addCase(updateProfileData.pending, (state) => {
            state.isLoading = true;
            state.error = '';
            state.validateErrors = undefined;
        })
        .addCase(updateProfileData.fulfilled, (state, action: PayloadAction<Profile>) => {
            state.isLoading = false;
            state.data = action.payload;
            state.form = action.payload;
            state.readonly = true;
            state.validateErrors = undefined;
        })
        .addCase(updateProfileData.rejected, (state, action) => {
            state.isLoading = false;
            state.validateErrors = action.payload as ValidateProfileError[] | undefined;
        });
  },
})

export const {actions: profileActions} = profileSLice
export const {reducer: profileReducer} = profileSLice