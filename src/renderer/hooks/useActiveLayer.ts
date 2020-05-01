import { useSelector } from "react-redux";
import { RootState } from "stores/rootState";
import { LayerState } from "stores/layerState";

export const useActiveLayer = (): LayerState => {
  const layers = useSelector((state: RootState) => state.layers);

  const activeLayer = layers.layers.find(layer => layer.id === layers.activeLayerId);
  if (activeLayer === undefined) {
    throw new Error(`can't find layer by id(${layers.activeLayerId})`);
  }

  return activeLayer;
};
