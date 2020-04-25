import { useSelector } from "react-redux";
import { RootState } from "stores/rootState";

export type SaveData = {
  layers: LayersSaveData;
};

export type LayersSaveData = {
  layers: LayerSaveData[];
};

export type LayerSaveData = {
  color: string;
  imageDataBase64: string;
  name: string;
};

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
      layers: state.layers.layers.map(layer => {
        const base64String = btoa(fromCharCode(layer.imageData.data));

        return {
          color: layer.color,
          imageDataBase64: base64String,
          name: layer.name
        };
      })
    }
  };

  return JSON.stringify(saveData);
};

export default useSave;
