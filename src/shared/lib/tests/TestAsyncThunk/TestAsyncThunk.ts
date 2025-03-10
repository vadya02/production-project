import { AsyncThunkAction, Dispatch } from "@reduxjs/toolkit";
import { StateSchema } from "app/providers/StoreProvider";
import axios, { AxiosStatic } from "axios";

type ActionCreatorType<ReturnType, ArgTypes, RejectedValue> = 
  (arg: ArgTypes) => AsyncThunkAction<ReturnType, ArgTypes, { rejectValue: RejectedValue }>;

jest.mock('axios');

const mockedAxios = jest.mocked(axios, true);

export class TestAsyncThunk<ReturnType, ArgTypes, RejectedValue> {
  dispatch: Dispatch;
  getState: () => StateSchema;

  actionCreator: ActionCreatorType<ReturnType, ArgTypes, RejectedValue>;

  api: jest.MockedFunctionDeep<AxiosStatic>;

  navigate: jest.MockedFn<any>;

  constructor(actionCreator: ActionCreatorType<ReturnType, ArgTypes, RejectedValue>, state?: DeepPartial<StateSchema>) {
    this.actionCreator = actionCreator
    this.dispatch = jest.fn();
    this.getState = jest.fn();
    this.api = mockedAxios;
    this.navigate = jest.fn();
  }
  
  async callThunk(arg: ArgTypes) {
    const action = this.actionCreator(arg)
    const result = await action(
      this.dispatch,
      this.getState,
      { 
        api: this.api,
        navigate: this.navigate
      }
    );

    return result;
  }
}