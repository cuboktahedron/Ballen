import { BallenAction } from "./actionTypes";
import { BatchAction } from "./batchAction";

export type RootActions = BatchAction | UndoAction | RedoAction | ClearHistoryAction;

export const UNDO = "undo";
export const REDO = "redo";
export const CLEAR_HISTORY = "clearHistory";

export type UndoAction = {
  type: typeof UNDO;
} & BallenAction;

export const undo = (): UndoAction => {
  return {
    type: UNDO,
    payload: {}
  };
};

export type RedoAction = {
  type: typeof REDO;
} & BallenAction;

export const redo = (): RedoAction => {
  return {
    type: REDO,
    payload: {}
  };
};

export type ClearHistoryAction = {
  type: typeof CLEAR_HISTORY;
  payload: {
    reason;
  };
} & BallenAction;

export const clearHistory = (reason: string): ClearHistoryAction => {
  return {
    type: CLEAR_HISTORY,
    payload: {
      reason
    }
  };
};
