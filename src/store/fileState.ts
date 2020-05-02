export const FS_NONE = "none";
export const FS_LOAD = "load";
export const FS_SAVE = "save";
export const FS_EXPORT_AS_IMAGE = "exportAsImage";

export type FileStateType = typeof FS_NONE | typeof FS_LOAD | typeof FS_SAVE | typeof FS_EXPORT_AS_IMAGE;

export type FileState = {
  type: FileStateType;
};

export const InitialFileState: FileState = {
  type: FS_NONE
};
