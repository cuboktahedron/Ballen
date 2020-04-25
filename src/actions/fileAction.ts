import { BallenAction } from "./actionTypes";

export type FileActions = SaveAction | SaveCompletedAction;

export const SAVE = "file/save";
export const SAVE_COMPLETED = "file/saveCompleted";

export type SaveAction = {
  type: typeof SAVE;
} & BallenAction;

export const save = (): SaveAction => {
  return {
    type: SAVE,
    payload: {}
  };
};

export type SaveCompletedAction = {
  type: typeof SAVE_COMPLETED;
} & BallenAction;

export const saveCompleted = (): SaveCompletedAction => {
  return {
    type: SAVE_COMPLETED,
    payload: {}
  };
};
