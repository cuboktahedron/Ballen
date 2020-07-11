import { Action } from "redux";

export type HistoryActions = ChangeAction;

export const CHANGE = "history/change";

export type ChangeAction = {
  type: typeof CHANGE;
  payload: {
    no: number;
  };
} & Action<string>;

export const changeHistory = (no: number): ChangeAction => {
  return {
    type: CHANGE,
    payload: {
      no
    }
  };
};
