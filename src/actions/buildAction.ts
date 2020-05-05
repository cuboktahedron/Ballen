import { LayersState } from "stores/layersState";
import { LB_NORMAL } from "stores/layerState";
import { BallenAction } from "./actionTypes";
import Blender from "./lib/Blender";
import Color from "./lib/Color";
import Graphics from "./lib/Graphics";

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
  const targetImageData = new ImageData(layers.size.x, layers.size.y);
  const targetG = new Graphics(targetImageData);
  const blender = new Blender(buildImageData);

  layers.layers
    .concat()
    .reverse()
    .forEach(layer => {
      const color = new Color(layer.color.substring(1));
      color.a = Math.trunc((layer.opacity / 100) * 255);

      targetImageData.data.set(layer.imageData.data);

      for (let y = 0; y < layers.size.y; y++) {
        for (let x = 0; x < layers.size.x; x++) {
          const a = targetG.color(x, y)?.a;
          if (a === 0xff) {
            targetG.dot(x, y, color);
          }
        }
      }

      const blend = blender[layer.blend] || blender[LB_NORMAL];
      blend.call(blender, targetImageData);
    });

  return {
    type: BUILD,
    payload: {
      imageData: buildImageData
    }
  };
};
