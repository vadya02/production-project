import {
    AnyAction, EnhancedStore, Reducer, ReducersMapObject,
} from '@reduxjs/toolkit';
import { AxiosInstance } from 'axios';
import { ArticleDetailsSchema } from 'entity/Article/model/types/articleDetailsSchema';
import { CounterSchema } from 'entity/Counter';
import { ProfileSchema } from 'entity/Profile';
import { UserSchema } from 'entity/User';
import { AddCommentFormSchema } from 'features/addCommentForm';
import { LoginSchema } from 'features/AuthByUsername/model/types/loginSchema';
import { ArticleDetailsCommentSchema } from 'pages/ArticleDetailsPage';
import { NavigateOptions, To } from 'react-router-dom';

export interface StateSchema {
    counter: CounterSchema;
    user: UserSchema;

    // асинхронные редьюсеры
    loginForm?: LoginSchema;
    profile?: ProfileSchema;
    articleDetails?: ArticleDetailsSchema;
    articleDetailsComments?: ArticleDetailsCommentSchema;
    addCommentForm?: AddCommentFormSchema;
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

export interface ThunkExtraArg {
    api: AxiosInstance,
    navigate?: ( to: To, options?: NavigateOptions ) => void
}

export interface ThunkConfig<T> {
    extra: ThunkExtraArg,
    rejectValue: T,
    state: StateSchema,
}