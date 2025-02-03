import { configureStore, ReducersMapObject } from '@reduxjs/toolkit';
import { counterReducer } from 'entities/Counter';
import { userReducers } from 'entities/User';
import { StateSchema } from './StateSchema';

export const createReduxStore = (initialState?: StateSchema) => {
    const rootReducer: ReducersMapObject<StateSchema> = { // ReducersMapObject<> -тип для объединения редьюсеров
        counter: counterReducer,
        user: userReducers,
    };
    return configureStore({
        reducer: rootReducer,
        devTools: __IS_DEV__, // включаем devTools при режиме dev
        preloadedState: initialState, // дефолтный state для тестов
    });
};
