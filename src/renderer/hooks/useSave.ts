import { SaveData } from "actions/fileAction";
import { useSelector } from "react-redux";
import { RootState } from "stores/rootState";
import { BinaryImageRunLength } from "utils/graphics/compress/BinaryImageRunLength";

const useSave = (): string => {
  const state = useSelector((state: RootState) => state);

  const birl = new BinaryImageRunLength();

  const saveData: SaveData = {
    layers: {
      size: state.layers.size,
      layers: state.layers.layers.map(layer => {
        const filters = layer.filters.map(filter => ({
          property: { ...filter.property }
        }));

        return {
          blend: layer.blend,
          color: layer.color,
          filters,
          imageData: Array.from(birl.compress(layer.imageData.data)),
          name: layer.name
        };
      })
    }
  };

  return JSON.stringify(saveData);
};

export default useSave;
