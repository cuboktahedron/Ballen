import { SaveData } from "actions/fileAction";
import { useSelector } from "react-redux";
import { RootState } from "stores/rootState";

const useSave = (): string => {
  const state = useSelector((state: RootState) => state);

  const fromCharCode = (data: Uint8ClampedArray): string => {
    const charCodes: string[] = [];
    for (let i = 0; i < data.length; i++) {
      charCodes[i] = String.fromCharCode(data[i]);
    }

    return charCodes.join("");
  };

  const saveData: SaveData = {
    layers: {
      size: state.layers.size,
      layers: state.layers.layers.map(layer => {
        const base64String = btoa(fromCharCode(layer.imageData.data));
        const filters = layer.filters.map(filter => ({
          property: { ...filter.property }
        }));

        return {
          blend: layer.blend,
          color: layer.color,
          filters,
          imageDataBase64: base64String,
          name: layer.name
        };
      })
    }
  };

  return JSON.stringify(saveData);
};

export default useSave;
