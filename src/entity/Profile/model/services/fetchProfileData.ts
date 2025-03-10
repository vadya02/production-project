import { createAsyncThunk } from '@reduxjs/toolkit';
import { ThunkConfig } from 'app/providers/StoreProvider';
import { Profile } from '../types/profile';

export const fetchProfileData = createAsyncThunk<Profile, void, ThunkConfig<string>>(
    'profile/fetchProfileData',
    async (_, thunkApi) => {
        const {extra, rejectWithValue} = thunkApi
        try {
            const response = extra.api.get<Profile>('/profile');
            if (!(await response).data) {
                throw new Error();
            }
            
            return (await response).data;
        } catch (e) {
            return rejectWithValue('error');
        }
    },
);
