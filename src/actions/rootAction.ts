import { BallenAction } from "./actionTypes";

export type RootActions = UndoAction | RedoAction;

export const UNDO = "undo";
export const REDO = "redo";

export type UndoAction = {
  type: typeof UNDO;
} & BallenAction;

export const undo = (): UndoAction => {
  return {
    type: UNDO,
    payload: {
      record: false
    }
  };
};

export type RedoAction = {
  type: typeof REDO;
} & BallenAction;

export const redo = (): RedoAction => {
  return {
    type: REDO,
    payload: {
      record: false
    }
  };
};
