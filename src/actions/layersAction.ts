import { LayerState } from "stores/layerState";
import { BallenAction } from "./actionTypes";

export type LayersActions = ChangeActiveLayerAction | AddLayerAction | DeleteLayerAction | MoveLayerAction;

export const CHANGE_ACTIVE_LAYER = "layers/changeActiveLayer";
export const ADD_LAYER = "layers/addLayer";
export const DELETE_LAYER = "layers/deleteLayer";
export const MOVE_LAYER = "layers/moveLayer";

export type ChangeActiveLayerAction = {
  type: typeof CHANGE_ACTIVE_LAYER;
  payload: {
    layerId: number;
  };
} & BallenAction;

export const changeActiveLayer = (layerId: number): ChangeActiveLayerAction => ({
  type: CHANGE_ACTIVE_LAYER,
  payload: {
    record: false,
    layerId
  }
});

export type AddLayerAction = {
  type: typeof ADD_LAYER;
} & BallenAction;

export const addLayer = (): AddLayerAction => ({
  type: ADD_LAYER,
  payload: {
    record: true
  }
});

export type DeleteLayerAction = {
  type: typeof DELETE_LAYER;
  payload: {
    layerId: number;
  };
} & BallenAction;

export const deleteLayer = (layerId: number): DeleteLayerAction => ({
  type: DELETE_LAYER,
  payload: {
    record: true,
    layerId
  }
});

export const moveLayer = (fromIndex: number, toIndex: number, layers: LayerState[]): MoveLayerAction => {
  const newLayers: LayerState[] = [...layers];

  const fromLayer = layers[fromIndex];
  newLayers.splice(fromIndex, 1);
  newLayers.splice(toIndex, 0, fromLayer);

  return {
    type: MOVE_LAYER,
    payload: {
      record: true,
      layers: newLayers
    }
  };
};

export type MoveLayerAction = {
  type: typeof MOVE_LAYER;
  payload: {
    layers: LayerState[];
  };
} & BallenAction;
