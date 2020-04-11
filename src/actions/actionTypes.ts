import { Action } from "redux";

export type BallenAction = {
  payload: {
    recordDescription?: string;
  };
} & Action<string>;
