import { FilterInfo, FilterProperties } from "types/filters";
import { LayerBlend } from "types/layerBlend";
import { LayerInfo } from "types/layers";
import { Vector2D } from "utils/ballenCore";
import { BinaryImageRunLength } from "utils/graphics/compress/binaryImageRunLength";
import { BallenAction } from "./actionTypes";

export type LayersActions =
  | ChangeActiveLayerAction
  | AddLayerAction
  | DeleteLayerAction
  | BeginMovingLayerAction
  | MoveLayerAction
  | CompleteMovingLayerAction
  | EndMovingLayerAction
  | LoadLayersAction
  | InitLayersAction;

export const CHANGE_ACTIVE_LAYER = "layers/changeActiveLayer";
export const ADD_LAYER = "layers/addLayer";
export const DELETE_LAYER = "layers/deleteLayer";
export const BEGIN_MOVING_LAYER = "layers/beginMovigLayer";
export const MOVE_LAYER = "layers/moveLayer";
export const COMPLETE_MOVING_LAYER = "layers/endMovigLayer";
export const END_MOVING_LAYER = "layers/endMovingLayer";
export const LOAD_LAYERS = "layers/loadLayers";
export const INIT_LAYERS = "layers/initLayers";

export type LayersSaveData = {
  layers: LayerSaveData[];
  size: Vector2D;
};

export type LayerSaveData = {
  blend: LayerBlend;
  color: string;
  filters: FilterSaveData[];
  imageData: number[];
  name: string;
};

export type FilterSaveData = {
  property: FilterProperties;
};

export type ChangeActiveLayerAction = {
  type: typeof CHANGE_ACTIVE_LAYER;
  payload: {
    layerId: number;
  };
} & BallenAction;

export const changeActiveLayer = (layerId: number): ChangeActiveLayerAction => ({
  type: CHANGE_ACTIVE_LAYER,
  payload: {
    layerId,
    recordDescription: "Change active layer"
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
    layers: LayerInfo<FilterInfo>[];
  };
} & BallenAction;

export const beginMovingLayer = (layers: LayerInfo<FilterInfo>[]): BeginMovingLayerAction => ({
  type: BEGIN_MOVING_LAYER,
  payload: {
    layers: [...layers]
  }
});

export type MoveLayerAction = {
  type: typeof MOVE_LAYER;
  payload: {
    layers: LayerInfo<FilterInfo>[];
  };
} & BallenAction;

export const moveLayer = (fromIndex: number, toIndex: number, layers: LayerInfo<FilterInfo>[]): MoveLayerAction => {
  const newLayers = [...layers];

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
    layers: LayerInfo<FilterInfo>[];
  };
} & BallenAction;

export const completeMovingLayer = (
  fromIndex: number,
  toIndex: number,
  layers: LayerInfo<FilterInfo>[]
): CompleteMovingLayerAction => {
  const newLayers = [...layers];

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

export type LoadLayersAction = {
  type: typeof LOAD_LAYERS;
  payload: {
    layers: {
      color: string;
      blend: LayerBlend;
      filters: {
        property: FilterProperties;
      }[];
      imageData: ImageData;
      name: string;
    }[];
    size: Vector2D;
  };
} & BallenAction;

export const loadLayers = (layers: LayersSaveData): LoadLayersAction => {
  const birl = new BinaryImageRunLength();
  const loadLayers = layers.layers.map(layer => {
    const imageData = new ImageData(layers.size.x, layers.size.y);
    const rawImageData = birl.decompress(new Uint32Array(layer.imageData));
    imageData.data.set(rawImageData);

    const data = {
      blend: layer.blend,
      color: layer.color,
      filters: layer.filters,
      imageData,
      name: layer.name
    };

    return data;
  });

  return {
    type: LOAD_LAYERS,
    payload: {
      layers: loadLayers,
      size: layers.size
    }
  };
};

export type InitLayersAction = {
  type: typeof INIT_LAYERS;
  payload: {
    size: Vector2D;
  };
} & BallenAction;

export const initLayers = (size: Vector2D): InitLayersAction => ({
  type: INIT_LAYERS,
  payload: {
    size
  }
});
