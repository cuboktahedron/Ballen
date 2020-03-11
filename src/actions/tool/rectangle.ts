import { DrawBeginProps, DrawMiddleProps, DrawEndProps, DRAW, DrawAction } from "../layerAction";
import {
  SetDrawStateBeginProps,
  SetDrawStateAction,
  SET_DRAW_STATE,
  SetDrawStateMiddleProps,
  SetDrawStateEndProps
} from "../toolsAction";
import Graphics from "../lib/Graphics";
import { ToolDrawStateRectangle, RectangleProperty } from "../../store/tool/rectangleState";
import Color from "../lib/Color";

export const RECTANGLE = "tool/rectangle";

export const drawBeginRectangle = (props: DrawBeginProps): DrawAction => {
  // TODO: method化する
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

export const drawMiddleRectangle = (props: DrawMiddleProps): DrawAction => {
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

export const drawEndRectangle = (props: DrawEndProps): DrawAction => {
  const activeLayer = props.layers.layers.find(layer => layer.id === props.layers.activeLayerId);
  if (activeLayer === undefined) {
    throw new Error("can't find activeLayer");
  }

  const drawState = props.tools.drawState as ToolDrawStateRectangle;
  let origin = drawState.origin;
  if (origin === undefined) {
    origin = props.event.coords;
  }

  const { x: x1, y: y1 } = origin;
  const { x: x2, y: y2 } = props.event.coords;

  const toolProperty = props.tools.properties.get(RECTANGLE) as RectangleProperty;

  const newImageData = new ImageData(activeLayer.imageData.width, activeLayer.imageData.height);
  newImageData.data.set(activeLayer.imageData.data);

  const g = new Graphics(newImageData);

  if (toolProperty.positive) {
    g.rectangle(x1, y1, x2, y2, Color.Transparent, { fill: toolProperty.fill });
  } else {
    g.rectangle(x1, y1, x2, y2, Color.Black, { fill: toolProperty.fill });
  }

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

export type SetDrawStateRectangleAction = {
  payload: {
    type: typeof RECTANGLE;
    state: ToolDrawStateRectangle;
  };
};

export const setDrawStateBeginRectangle = (props: SetDrawStateBeginProps): SetDrawStateAction => {
  const drawState: ToolDrawStateRectangle = {
    origin: props.coords
  };

  return {
    type: SET_DRAW_STATE,
    payload: {
      type: RECTANGLE,
      state: drawState
    }
  };
};

export const setDrawStateMiddleRectangle = (props: SetDrawStateMiddleProps): SetDrawStateAction => {
  const state = props.tools.drawState as ToolDrawStateRectangle;

  return {
    type: SET_DRAW_STATE,
    payload: {
      type: RECTANGLE,
      state
    }
  };
};

// eslint-disable-next-line @typescript-eslint/no-unused-vars
export const setDrawStateEndRectangle = (_props: SetDrawStateEndProps): SetDrawStateAction => ({
  type: SET_DRAW_STATE,
  payload: {
    type: RECTANGLE,
    state: {}
  }
});
