import { LayerState } from "stores/layerState";
import { BallenAction } from "./actionTypes";

export type LayersActions =
  | ChangeActiveLayerAction
  | AddLayerAction
  | DeleteLayerAction
  | BeginMovingLayerAction
  | MoveLayerAction
  | CompleteMovingLayerAction
  | EndMovingLayerAction;

export const CHANGE_ACTIVE_LAYER = "layers/changeActiveLayer";
export const ADD_LAYER = "layers/addLayer";
export const DELETE_LAYER = "layers/deleteLayer";
export const BEGIN_MOVING_LAYER = "layers/beginMovigLayer";
export const MOVE_LAYER = "layers/moveLayer";
export const COMPLETE_MOVING_LAYER = "layers/endMovigLayer";
export const END_MOVING_LAYER = "layers/endMovingLayer";

export type ChangeActiveLayerAction = {
  type: typeof CHANGE_ACTIVE_LAYER;
  payload: {
    layerId: number;
  };
} & BallenAction;

export const changeActiveLayer = (layerId: number): ChangeActiveLayerAction => ({
  type: CHANGE_ACTIVE_LAYER,
  payload: {
    layerId
  }
});

export type AddLayerAction = {
  type: typeof ADD_LAYER;
} & BallenAction;

export const addLayer = (): AddLayerAction => ({
  type: ADD_LAYER,
  payload: {
    recordDescription: "Add layer"
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
    recordDescription: "Delete layer",
    layerId
  }
});

export type BeginMovingLayerAction = {
  type: typeof BEGIN_MOVING_LAYER;
  payload: {
    layers: LayerState[];
  };
} & BallenAction;

export const beginMovingLayer = (layers: LayerState[]): BeginMovingLayerAction => ({
  type: BEGIN_MOVING_LAYER,
  payload: {
    layers: [...layers]
  }
});

export type MoveLayerAction = {
  type: typeof MOVE_LAYER;
  payload: {
    layers: LayerState[];
  };
} & BallenAction;

export const moveLayer = (fromIndex: number, toIndex: number, layers: LayerState[]): MoveLayerAction => {
  const newLayers: LayerState[] = [...layers];

  const fromLayer = layers[fromIndex];
  newLayers.splice(fromIndex, 1);
  newLayers.splice(toIndex, 0, fromLayer);

  return {
    type: MOVE_LAYER,
    payload: {
      layers: newLayers
    }
  };
};

export type CompleteMovingLayerAction = {
  type: typeof COMPLETE_MOVING_LAYER;
  payload: {
    layers: LayerState[];
  };
} & BallenAction;

export const completeMovingLayer = (
  fromIndex: number,
  toIndex: number,
  layers: LayerState[]
): CompleteMovingLayerAction => {
  const newLayers: LayerState[] = [...layers];

  const fromLayer = layers[fromIndex];
  newLayers.splice(fromIndex, 1);
  newLayers.splice(toIndex, 0, fromLayer);

  return {
    type: COMPLETE_MOVING_LAYER,
    payload: {
      recordDescription: "Change layer order",
      layers: newLayers
    }
  };
};

export type EndMovingLayerAction = {
  type: typeof END_MOVING_LAYER;
  payload: {};
} & BallenAction;

export const endMovingLayer = (): EndMovingLayerAction => ({
  type: END_MOVING_LAYER,
  payload: {}
});
