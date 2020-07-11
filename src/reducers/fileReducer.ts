import { BallenAction } from "actions/actionTypes";
import { END_FILE, EXPORT_AS_IMAGE, FileActions, LOAD, SAVE } from "actions/fileAction";
import { FileState, InitialFileState } from "stores/fileState";
import { FS_EXPORT_AS_IMAGE, FS_LOAD, FS_NONE, FS_SAVE } from "types/file";

export default function reducer(state: FileState = InitialFileState, anyAction: BallenAction): FileState {
  const action = anyAction as FileActions;

  switch (action.type) {
    case END_FILE:
      return {
        ...state,
        type: FS_NONE
      };
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
