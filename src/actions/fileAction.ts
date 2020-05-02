import { BallenAction } from "./actionTypes";
import { LayersSaveData } from "./layersAction";

export type FileActions = LoadAction | SaveAction | ExportAsImageAction;

export const LOAD = "file/load";
export const SAVE = "file/save";
export const EXPORT_AS_IMAGE = "file/exportAsImage";

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
