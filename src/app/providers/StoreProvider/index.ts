import { createReduxStore } from './config/store';
import { StoreProvider } from './ui/StoreProvider';

export {
    // eslint-disable-next-line indent
    createReduxStore,
    StoreProvider,
};

export type { StateSchema, ThunkConfig } from './config/StateSchema';
export type { AppDispatch } from './config/store';
