import { Action } from "redux";
import { HistoryState } from "stores/historyState";

export type HistoryActions = ForwardAction | BackwardAction | PushAction;

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
    history: HistoryState;
  };
} & Action<string>;

export const push = (history: HistoryState): PushAction => {
  return {
    type: PUSH,
    payload: {
      history
    }
  };
};
