import { createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';
import { User, userActions } from 'entities/User';
import { USER_LOCALSTORAGE_KEY } from 'shared/const/localstorage';

interface LoginByUsernameProps {
  username: string,
  password: string,
}

export const loginByUsername = createAsyncThunk<User, LoginByUsernameProps, {rejectValue: string}>(
    'login',
    async (authData, thunkApi) => {
        try {
            const response = axios.post<User>('http://localhost:8000/login', authData);
            if (!(await response).data) {
                throw new Error();
            }
            localStorage.setItem(USER_LOCALSTORAGE_KEY, JSON.stringify((await response).data));
            thunkApi.dispatch(userActions.setAuthData((await response).data));
            return (await response).data;
        } catch (e) {
            return thunkApi.rejectWithValue('error');
        }
    },
);
