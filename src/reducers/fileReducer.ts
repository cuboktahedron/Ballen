import { BallenAction } from "actions/actionTypes";
import { EXPORT_AS_IMAGE, FileActions, LOAD, SAVE } from "actions/fileAction";
import { FileState, FS_EXPORT_AS_IMAGE, FS_LOAD, FS_SAVE, InitialFileState } from "stores/fileState";

export default function reducer(state: FileState = InitialFileState, anyAction: BallenAction): FileState {
  const action = anyAction as FileActions;

  switch (action.type) {
    case LOAD:
      return {
        ...state,
        type: FS_LOAD
      };
    case SAVE:
      return {
        ...state,
        type: FS_SAVE
      };
    case EXPORT_AS_IMAGE:
      return {
        ...state,
        type: FS_EXPORT_AS_IMAGE
      };
    default:
      return state;
  }
}
