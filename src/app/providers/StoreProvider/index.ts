import { StateSchema, ThunkConfig } from './config/StateSchema';
import { AppDispatch, createReduxStore } from './config/store';
import { StoreProvider } from './ui/StoreProvider';

export {
  AppDispatch,
  // eslint-disable-next-line indent
  createReduxStore, StateSchema, StoreProvider,
  ThunkConfig
};

