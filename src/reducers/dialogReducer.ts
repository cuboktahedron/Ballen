import { BallenAction } from "actions/actionTypes";
import { CLOSE_DIALOG, DialogActions, OPEN_DIALOG } from "actions/dialogAction";
import { DialogState, InitialDialogState } from "stores/dialogState";

export default function reducer(state: DialogState = InitialDialogState, anyAction: BallenAction): DialogState {
  const action = anyAction as DialogActions;

  switch (action.type) {
    case CLOSE_DIALOG:
      return {
        ...state,
        isOpen: false
      };
    case OPEN_DIALOG:
      return {
        ...state,
        isOpen: true
      };
    default:
      return state;
  }
}
