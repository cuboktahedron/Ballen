import { BallenAction } from "./actionTypes";

export type RootActions = BatchAction | UndoAction | RedoAction;

export const BATCH = "batch";
export const UNDO = "undo";
export const REDO = "redo";

export type BatchAction = {
  type: typeof BATCH;
  payload: {
    actions: BallenAction[];
  };
} & BallenAction;

export const batch = (...actions: BallenAction[]): BatchAction => {
  return {
    type: BATCH,
    payload: {
      actions
    }
  };
};

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
