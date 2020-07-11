import { HistoryActions } from "actions/historyAction";
import { Action } from "redux";
import { StatesOfHistory } from "stores/historyState";

export type CombinedHistoryActions = ForwardAction | BackwardAction | PushAction | HistoryActions;

export const FORWARD = "history/forward";
export const BACKWARD = "history/backward";
export const PUSH = "history/push";

export type ForwardAction = {
  type: typeof FORWARD;
} & Action<string>;

export const forward = (): ForwardAction => {
  return {
    type: FORWARD
  };
};

export type BackwardAction = {
  type: typeof BACKWARD;
} & Action<string>;

export const backward = (): BackwardAction => {
  return {
    type: BACKWARD
  };
};

export type PushAction = {
  type: typeof PUSH;
  payload: {
    recordDescription: string;
    statesOfHistory: StatesOfHistory;
  };
} & Action<string>;

export const push = (statesOfHistory: StatesOfHistory, recordDescription: string): PushAction => {
  return {
    type: PUSH,
    payload: {
      recordDescription,
      statesOfHistory
    }
  };
};
