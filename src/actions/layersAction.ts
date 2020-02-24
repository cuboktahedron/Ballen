import { SetColorAction, ToggleVisibleAction } from "./layerAction";

export type LayersActions =
  | SetActiveLayerAction
  | AddLayerAction
  | DeleteLayerAction
  | SetColorAction
  | ToggleVisibleAction;

export const SET_ACTIVE_LAYER = "layer/setActiveLayer";
export const ADD_LAYER = "layer/addLayer";
export const DELETE_LAYER = "layer/deleteLayer";

export type SetActiveLayerAction = {
  type: typeof SET_ACTIVE_LAYER;
  payload: {
    layerId: number;
  };
};

export const setActiveLayer = (layerId: number): SetActiveLayerAction => ({
  type: SET_ACTIVE_LAYER,
  payload: {
    layerId
  }
});

export type AddLayerAction = {
  type: typeof ADD_LAYER;
};

export const addLayer = (): AddLayerAction => ({
  type: ADD_LAYER
});

export type DeleteLayerAction = {
  type: typeof DELETE_LAYER;
  payload: {
    layerId: number;
  };
};

export const deleteLayer = (layerId: number): DeleteLayerAction => ({
  type: DELETE_LAYER,
  payload: {
    layerId
  }
});
