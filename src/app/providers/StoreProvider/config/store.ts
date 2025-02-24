import { configureStore, ReducersMapObject } from '@reduxjs/toolkit';
import { counterReducer } from 'entity/Counter';
import { userReducers } from 'entity/User';
import { StateSchema } from './StateSchema';
import { createReducerManager } from './reducerManager';

export const createReduxStore = (initialState?: StateSchema, asyncReducers?: ReducersMapObject<StateSchema>) => {
    const rootReducer: ReducersMapObject<StateSchema> = { // ReducersMapObject<> -тип для объединения редьюсеров
        ...asyncReducers,
        counter: counterReducer,
        user: userReducers,
    };

    const reducerManager = createReducerManager(rootReducer);

    const store = configureStore({
        reducer: reducerManager.reduce,
        devTools: __IS_DEV__, // включаем devTools при режиме dev
        preloadedState: initialState, // дефолтный state для тестов
    });

    // @ts-ignore
    store.reducerManager = reducerManager;

    return store;
};
