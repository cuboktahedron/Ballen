import { DrawBeginProps, DrawMiddleProps, DrawEndProps, DRAW, DrawAction } from "../layerAction";
import {
  SetDrawStateBeginProps,
  SetDrawsStateAction,
  SET_DRAW_STATE,
  SetDrawStateMiddleProps,
  SetDrawStateEndProps
} from "../toolAction";
import Graphics from "../lib/Graphics";
import { ToolDrawStateFiller } from "../../store/tool/fillerState";

export const FILLER = "tool/filler";

export const drawBeginFiller = (props: DrawBeginProps): DrawAction => {
  // TODO: method化する
  const activeLayer = props.layers.layers.find(layer => layer.id === props.layers.activeLayerId);
  if (activeLayer === undefined) {
    throw new Error("can't find activeLayer");
  }

  const newImageData = new ImageData(activeLayer.imageData.width, activeLayer.imageData.height);
  newImageData.data.set(activeLayer.imageData.data);

  const g = new Graphics(newImageData);
  const { x, y } = props.event.coords;
  g.fill(x, y);

  // TODO: 塗りつぶしを実装
  return {
    type: DRAW,
    payload: {
      layer: {
        layerId: activeLayer.id,
        imageData: newImageData
      }
    }
  };
};

export const drawMiddleFiller = (props: DrawMiddleProps): DrawAction => {
  const activeLayer = props.layers.layers.find(layer => layer.id === props.layers.activeLayerId);
  if (activeLayer === undefined) {
    throw new Error("can't find activeLayer");
  }

  const newImageData = new ImageData(activeLayer.imageData.width, activeLayer.imageData.height);
  newImageData.data.set(activeLayer.imageData.data);

  // TODO: 何もしないアクションを返す

  return {
    type: DRAW,
    payload: {
      layer: {
        layerId: activeLayer.id,
        imageData: newImageData
      }
    }
  };
};

export const drawEndFiller = (props: DrawEndProps): DrawAction => {
  const activeLayer = props.layers.layers.find(layer => layer.id === props.layers.activeLayerId);
  if (activeLayer === undefined) {
    throw new Error("can't find activeLayer");
  }

  // TODO: 何もしないアクションを返す

  return {
    type: DRAW,
    payload: {
      layer: {
        layerId: activeLayer.id,
        imageData: activeLayer.imageData
      }
    }
  };
};

export type SetDrawStateFillerAction = {
  type: typeof SET_DRAW_STATE;
  payload: {
    type: typeof FILLER;
    state: ToolDrawStateFiller;
  };
};

// eslint-disable-next-line @typescript-eslint/no-unused-vars
export const setDrawStateBeginFiller = (_props: SetDrawStateBeginProps): SetDrawsStateAction => {
  return {
    type: SET_DRAW_STATE,
    payload: {
      type: FILLER,
      state: {}
    }
  };
};

// eslint-disable-next-line @typescript-eslint/no-unused-vars
export const setDrawStateMiddleFiller = (_props: SetDrawStateMiddleProps): SetDrawsStateAction => {
  return {
    type: SET_DRAW_STATE,
    payload: {
      type: FILLER,
      state: {}
    }
  };
};

// eslint-disable-next-line @typescript-eslint/no-unused-vars
export const setDrawStateEndFiller = (_props: SetDrawStateEndProps): SetDrawsStateAction => ({
  type: SET_DRAW_STATE,
  payload: {
    type: FILLER,
    state: {}
  }
});
