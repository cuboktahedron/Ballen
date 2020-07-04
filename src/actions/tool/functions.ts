import { LayersState } from "stores/layersState";
import { LayerState } from "stores/layerState";

export const getActiveLayer = (state: LayersState): LayerState => {
  const activeLayer = state.layers.find(layer => layer.id === state.activeLayerId);
  if (activeLayer === undefined) {
    throw new Error("can't find activeLayer");
  }

  return activeLayer;
};
