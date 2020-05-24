import { LayersState } from "stores/layersState";
import { LB_NORMAL } from "stores/layerState";
import { BallenAction } from "./actionTypes";
import Blender from "./lib/Blender";
import Color from "./lib/Color";
import Graphics from "./lib/Graphics";
import { throughFilter } from "./lib/LayerFilter";

export type BuildActions = BuildAction | CloseBuildAction | OpenBuildAction;

export const BUILD = "build/build";
export const CLOSE_BUILD = "build/buildClose";
export const OPEN_BUILD = "build/buildOpen";

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
      targetImageData.data.set(layer.imageData.data);

      for (let y = 0; y < layers.size.y; y++) {
        for (let x = 0; x < layers.size.x; x++) {
          const a = targetG.color(x, y)?.a;
          if (a === 0xff) {
            targetG.dot(x, y, color);
          }
        }
      }

      throughFilter(targetImageData, layer.filters);

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

export type CloseBuildAction = {
  type: typeof CLOSE_BUILD;
} & BallenAction;

export const closeBuild = (): CloseBuildAction => {
  return {
    type: CLOSE_BUILD,
    payload: {}
  };
};

export type OpenBuildAction = {
  type: typeof OPEN_BUILD;
} & BallenAction;

export const openBuild = (): OpenBuildAction => {
  return {
    type: OPEN_BUILD,
    payload: {}
  };
};
