import { BallenAction } from "./actionTypes";

export type DialogActions = CloseDialogAction | OpenDialogAction;

export const CLOSE_DIALOG = "dialog/closeDilog";
export const OPEN_DIALOG = "dialog/openDilog";

export type CloseDialogAction = {
  type: typeof CLOSE_DIALOG;
} & BallenAction;

export const closeDialog = (): CloseDialogAction => {
  return {
    type: CLOSE_DIALOG,
    payload: {}
  };
};

export type OpenDialogAction = {
  type: typeof OPEN_DIALOG;
} & BallenAction;

export const openDialog = (): OpenDialogAction => {
  return {
    type: OPEN_DIALOG,
    payload: {}
  };
};
