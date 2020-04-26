import { BallenAction } from "./actionTypes";
import { LayersSaveData } from "./layersAction";

export type FileActions = LoadAction | SaveAction;

export const LOAD = "file/load";
export const SAVE = "file/save";

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
