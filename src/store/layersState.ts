import { LayerState } from "./layerState";
import { Vector2D } from "ballen-core";
export type LayersState = {
  layerIdSequence: number;
  activeLayerId: number;
  layers: LayerState[];
  size: Vector2D;
};

export const InitialLayersState: LayersState = {
  layerIdSequence: 0,
  activeLayerId: -1,
  layers: [],
  size: {
    x: 580,
    y: 580
  }
};
