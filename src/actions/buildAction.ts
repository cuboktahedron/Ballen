import { LayersState } from "stores/layersState";
import Color from "./lib/Color";
import { BallenAction } from "./actionTypes";

export type BuildActions = BuildAction;

export const BUILD = "build/build";

export type BuildAction = {
  type: typeof BUILD;
  payload: {
    imageData: ImageData;
  };
} & BallenAction;

export const build = (layers: LayersState): BuildAction => {
  const buildImageData = new ImageData(layers.size.x, layers.size.y);
  const buildData = buildImageData.data;
  layers.layers
    .concat()
    .reverse()
    .forEach(layer => {
      const sourceData = layer.imageData.data;
      const sourceColor = new Color(layer.color.substr(1));

      for (let y = 0; y < layers.size.y; y++) {
        for (let x = 0; x < layers.size.x; x++) {
          const ri = y * layers.size.x * 4 + x * 4;
          const gi = ri + 1;
          const bi = ri + 2;
          const ai = ri + 3;

          if (sourceData[ai] === 0xff) {
            buildData[ri] = sourceColor.r;
            buildData[gi] = sourceColor.g;
            buildData[bi] = sourceColor.b;
            buildData[ai] = 0xff;
          }
        }
      }
    });

  return {
    type: BUILD,
    payload: {
      imageData: buildImageData
    }
  };
};
