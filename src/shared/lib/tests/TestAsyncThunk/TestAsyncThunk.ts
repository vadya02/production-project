import { AsyncThunkAction, DeepPartial, Dispatch } from "@reduxjs/toolkit";
import { StateSchema } from "app/providers/StoreProvider";

type ActionCreatorType<ReturnType, ArgTypes, RejectedValue> = 
  (arg: ArgTypes) => AsyncThunkAction<ReturnType, ArgTypes, { rejectValue: RejectedValue }>;

export class TestAsyncThunk<ReturnType, ArgTypes, RejectedValue> {
  dispatch: Dispatch;
  getState: () => StateSchema;

  actionCreator: ActionCreatorType<ReturnType, ArgTypes, RejectedValue>;

  constructor(actionCreator: ActionCreatorType<ReturnType, ArgTypes, RejectedValue>, state?: DeepPartial<StateSchema>) {
    this.actionCreator = actionCreator
    this.dispatch = jest.fn();
    this.getState = jest.fn();
  }
  
  async callThunk(arg: ArgTypes) {
    const action = this.actionCreator(arg)
    const result = await action(this.dispatch, this.getState, undefined)

    return result;
  }
}