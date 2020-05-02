import { BallenAction } from "./actionTypes";
import { LayersSaveData } from "./layersAction";

export type FileActions = EndFileAction | LoadAction | SaveAction | ExportAsImageAction;

export const END_FILE = "file/endFile";
export const LOAD = "file/load";
export const SAVE = "file/save";
export const EXPORT_AS_IMAGE = "file/exportAsImage";

export type EndFileAction = {
  type: typeof END_FILE;
} & BallenAction;

export const endFile = (): EndFileAction => {
  return {
    type: END_FILE,
    payload: {}
  };
};

export type SaveData = {
  layers: LayersSaveData;
};

export type LoadAction = {
  type: typeof LOAD;
} & BallenAction;

export const load = (): LoadAction => {
  return {
    type: LOAD,
    payload: {}
  };
};

export type SaveAction = {
  type: typeof SAVE;
} & BallenAction;

export const save = (): SaveAction => {
  return {
    type: SAVE,
    payload: {}
  };
};

export type ExportAsImageAction = {
  type: typeof EXPORT_AS_IMAGE;
} & BallenAction;

export const exportAsImage = (): ExportAsImageAction => {
  return {
    type: EXPORT_AS_IMAGE,
    payload: {}
  };
};
