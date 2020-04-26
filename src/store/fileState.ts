export const FS_NONE = "none";
export const FS_LOAD = "load";
export const FS_SAVE = "save";

export type FileStateType = typeof FS_NONE | typeof FS_LOAD | typeof FS_SAVE;

export type FileState = {
  type: FileStateType;
};

export const InitialFileState: FileState = {
  type: FS_NONE
};
