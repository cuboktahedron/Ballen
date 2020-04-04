import { Action } from "redux";

export type BallenAction = {
  payload: {
    record: boolean;
  };
} & Action<string>;
