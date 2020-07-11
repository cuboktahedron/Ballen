import { LayerState } from "./layerState";
import { Vector2D } from "utils/ballen-core";
export type LayersState = {
  layerIdSequence: number;
  activeLayerId: number;
  layers: LayerState[];
  unsettledLayers: LayerState[] | null;
  size: Vector2D;
};

export const InitialLayersState: LayersState = {
  layerIdSequence: 0,
  activeLayerId: -1,
  layers: [],
  unsettledLayers: null,
  size: {
    x: 580,
    y: 580
  }
};
