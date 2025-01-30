import { configureStore } from '@reduxjs/toolkit';
import { counterReducer } from 'entities/Counter';
import { StateSchema } from './StateSchema';

export const createReduxStore = (initialState?: StateSchema) => configureStore({
    reducer: {
        counter: counterReducer,
    },
    devTools: __IS_DEV__, // включаем devTools при режиме dev
    preloadedState: initialState, // дефолтный state для тестов
});
