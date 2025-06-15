import {
	AnyAction,
	EnhancedStore,
	Reducer,
	ReducersMapObject,
} from "@reduxjs/toolkit";
import { AxiosInstance } from "axios";
import { ArticleDetailsSchema } from "entity/Article/model/types/articleDetailsSchema";
import { CounterSchema } from "entity/Counter";
import { ProfileSchema } from "entity/Profile";
import { UserSchema } from "entity/User";
import { AddCommentFormSchema } from "features/addCommentForm";
import { LoginSchema } from "features/AuthByUsername/model/types/loginSchema";
import { UISchema } from "features/UI";
import { ArticleDetailsPageSchema } from "pages/ArticleDetailsPage";
import { ArticlesPageSchema } from "pages/ArticlesPage";

export interface StateSchema {
	counter: CounterSchema;
	user: UserSchema;
	ui: UISchema;

	// асинхронные редьюсеры
	loginForm?: LoginSchema;
	profile?: ProfileSchema;
	articleDetails?: ArticleDetailsSchema;
	addCommentForm?: AddCommentFormSchema;
	articlesPage?: ArticlesPageSchema;
	articleDetailsPage?: ArticleDetailsPageSchema;
}

// получаем ключи названий редьюсера
export type StateSchemakey = keyof StateSchema;

export type MountedReducers = OptionalRecord<StateSchemakey, boolean>;

export interface ReducerManager {
	getReducerMap: () => ReducersMapObject<StateSchema>;
	reduce: (state: StateSchema, action: AnyAction) => StateSchema;
	add: (key: StateSchemakey, reducer: Reducer) => void;
	remove: (key: StateSchemakey) => void;

	getMountedReducers: () => MountedReducers;
}

export interface ReduxStoreWithManager extends EnhancedStore<StateSchema> {
	reducerManager: ReducerManager;
}

export interface ThunkExtraArg {
	api: AxiosInstance;
}

export interface ThunkConfig<T> {
	extra: ThunkExtraArg;
	rejectValue: T;
	state: StateSchema;
}
