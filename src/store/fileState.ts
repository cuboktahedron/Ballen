import { FileStateType, FS_NONE } from "types/file";

export type FileState = {
  type: FileStateType;
};

export const InitialFileState: FileState = {
  type: FS_NONE
};
