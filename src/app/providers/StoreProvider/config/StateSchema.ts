import {
    AnyAction, EnhancedStore, Reducer, ReducersMapObject,
} from '@reduxjs/toolkit';
import { CounterSchema } from 'entity/Counter';
import { UserSchema } from 'entity/User';
import { LoginSchema } from 'features/AuthByUsername/model/types/loginSchema';

export interface StateSchema {
    counter: CounterSchema;
    user: UserSchema;

    // асинхронные редьюсеры
    loginForm?: LoginSchema
}

// получаем ключи названий редьюсера
export type StateSchemakey = keyof StateSchema;

export interface ReducerManager {
    getReducerMap: () => ReducersMapObject<StateSchema>
    reduce: (state: StateSchema, action: AnyAction) => StateSchema;
    add: (key: StateSchemakey, reducer: Reducer) => void;
    remove: (key: StateSchemakey) => void;
}

export interface ReduxStoreWithManager extends EnhancedStore<StateSchema> {
     reducerManager: ReducerManager
}
