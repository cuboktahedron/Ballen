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
    text: string;
  };
} & BallenAction;

// TODO: 共通でまとめる
const sleep = (msec: number): Promise<void> => new Promise(resolve => setTimeout(resolve, msec));

const buildStatusUpdated = (text: string, imageData: ImageData): BuildAction => {
  return {
    type: BUILD,
    payload: {
      imageData,
      text
    }
  };
};

export const build = (layers: LayersState) => async (dispatch: (arg: unknown) => void): Promise<void> => {
  const buildImageData = new ImageData(layers.size.x, layers.size.y);
  const targetImageData = new ImageData(layers.size.x, layers.size.y);
  const targetG = new Graphics(targetImageData);
  const blender = new Blender(buildImageData);

  const buildStartTime = new Date();
  dispatch(buildStatusUpdated(`Build started`, buildImageData));

  const reverseLayers = layers.layers.concat().reverse();
  for (const layer of reverseLayers) {
    dispatch(buildStatusUpdated(`"${layer.name}" Rendering started.`, buildImageData));

    // TODO: canvasのレンダリングが追いつかないのでsleepしているが、他にいい方法はないか？
    await sleep(100);

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

    dispatch(buildStatusUpdated(`Applying filter started`, buildImageData));
    throughFilter(targetImageData, layer.filters);
    dispatch(buildStatusUpdated(`Applying filter finished`, buildImageData));

    const blend = blender[layer.blend] || blender[LB_NORMAL];
    blend.call(blender, targetImageData);

    dispatch(buildStatusUpdated(`"${layer.name}" Rendering finished.`, buildImageData));
  }

  const buildFinishedTime = new Date();
  const elapsedTIme = buildFinishedTime.getTime() - buildStartTime.getTime();
  dispatch(buildStatusUpdated(`Build completed. (Elapsed Time: ${elapsedTIme} ms)`, buildImageData));
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
