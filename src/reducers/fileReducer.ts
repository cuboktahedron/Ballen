import { BallenAction } from "actions/actionTypes";
import { FileActions, SAVE, SAVE_COMPLETED } from "actions/fileAction";
import { InitialFileState, FileState } from "stores/fileState";

export default function reducer(state: FileState = InitialFileState, anyAction: BallenAction): FileState {
  const action = anyAction as FileActions;

  switch (action.type) {
    case SAVE:
      return {
        ...state,
        save: true
      };
    case SAVE_COMPLETED:
      return {
        ...state,
        save: false
      };
    default:
      return state;
  }
}
