import { BS_BUILDING, BS_COMPLETED, BuildStatus } from "stores/buildState";
import { LayersState } from "stores/layersState";
import { LB_NORMAL } from "stores/layerState";
import { BallenAction } from "./actionTypes";
import Blender from "../utils/graphics/Blender";
import Color from "../utils/graphics/Color";
import Graphics from "../utils/graphics/Graphics";
import { throughFilter } from "./lib/LayerFilter";
import { sleep } from "utils/functions";

export type BuildActions = BuildAction | CancelBuildAction | CloseBuildAction | ClearBuildAction | OpenBuildAction;

export const BUILD = "build/build";
export const CANCEL_BUILD = "build/cancel";
export const CLEAR_BUILD = "build/init";
export const CLOSE_BUILD = "build/buildClose";
export const OPEN_BUILD = "build/buildOpen";

export type CancelBuildAction = {
  type: typeof CANCEL_BUILD;
  payload: {
    done: boolean;
    text: string;
  };
} & BallenAction;

export const cancelBuild = (done: boolean): CancelBuildAction => {
  let text: string;
  if (done) {
    text = "Build canceled";
  } else {
    text = "Build canceling";
  }

  return {
    type: CANCEL_BUILD,
    payload: {
      done,
      text
    }
  };
};

export type BuildAction = {
  type: typeof BUILD;
  payload: {
    buildStatus: BuildStatus;
    imageData: ImageData;
    text: string;
  };
} & BallenAction;

class BuildCanceled {}

export const makeBuild = (layers: LayersState): [typeof build, typeof cancel] => {
  let canceled = false;

  const cancel = (): void => {
    canceled = true;
  };

  const buildStatusUpdated = (buildStatus: BuildStatus, text: string, imageData: ImageData): BuildAction => {
    if (canceled) {
      throw new BuildCanceled();
    }

    return {
      type: BUILD,
      payload: {
        buildStatus,
        imageData,
        text
      }
    };
  };

  const buildImageData = new ImageData(layers.size.x, layers.size.y);

  const build = () => async (dispatch: (arg: unknown) => void): Promise<void> => {
    try {
      const targetImageData = new ImageData(layers.size.x, layers.size.y);
      const targetG = new Graphics(targetImageData);
      const blender = new Blender(buildImageData);
      const buildStartTime = new Date();

      dispatch(buildStatusUpdated(BS_BUILDING, `Build started`, buildImageData));

      const reverseLayers = layers.layers.concat().reverse();
      for (const layer of reverseLayers) {
        dispatch(buildStatusUpdated(BS_BUILDING, `"${layer.name}" Rendering started.`, buildImageData));

        // for rendering
        await sleep(0);

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

        dispatch(buildStatusUpdated(BS_BUILDING, `Applying filter started`, buildImageData));
        throughFilter(targetImageData, layer.filters);
        dispatch(buildStatusUpdated(BS_BUILDING, `Applying filter finished`, buildImageData));

        const blend = blender[layer.blend] || blender[LB_NORMAL];
        blend.call(blender, targetImageData);

        dispatch(buildStatusUpdated(BS_BUILDING, `"${layer.name}" Rendering finished.`, buildImageData));
      }

      const buildFinishedTime = new Date();
      const elapsedTIme = buildFinishedTime.getTime() - buildStartTime.getTime();
      dispatch(buildStatusUpdated(BS_COMPLETED, `Build completed. (Elapsed Time: ${elapsedTIme} ms)`, buildImageData));
    } catch (e) {
      if (e instanceof BuildCanceled) {
        dispatch(cancelBuild(true));
        return;
      }

      throw e;
    }
  };

  return [build, cancel];
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

export type ClearBuildAction = {
  type: typeof CLEAR_BUILD;
} & BallenAction;

export const clearBuild = (): ClearBuildAction => {
  return {
    type: CLEAR_BUILD,
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
