import {
    AnyAction, combineReducers, Reducer, ReducersMapObject,
} from '@reduxjs/toolkit';
import { MountedReducers, ReducerManager, StateSchema, StateSchemakey } from './StateSchema';

// ReducersMapObject<StateSchema> - тип корневого редьюсера
export function createReducerManager(initialReducers: ReducersMapObject<StateSchema>): ReducerManager {
    const reducers = { ...initialReducers };

    let combinedReducer = combineReducers(reducers);

    let keysToRemove: Array<StateSchemakey> = []; // массив названий редьюсеров

    const mountedReducers: MountedReducers = {};

    return {
        getReducerMap: () => reducers,
        getMountedReducers: () => mountedReducers,
        reduce: (state: StateSchema, action: AnyAction) => {
            if (keysToRemove.length > 0) {
                state = { ...state };
                keysToRemove.forEach((key) => {
                    delete state[key];
                });
                keysToRemove = [];
            }
            return combinedReducer(state, action);
        },
        add: (key: StateSchemakey, reducer: Reducer) => {
            if (!key || reducers[key]) {
                return;
            }
            reducers[key] = reducer;
            mountedReducers[key] = true;
            combinedReducer = combineReducers(reducers);
        },
        remove: (key: StateSchemakey) => {
            if (!key || !reducers[key]) {
                return;
            }
            delete reducers[key];
            mountedReducers[key] = false;
            keysToRemove.push(key);
            combinedReducer = combineReducers(reducers);
        },
    };
}
