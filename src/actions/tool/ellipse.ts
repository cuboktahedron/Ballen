import { DrawBeginProps, DrawMiddleProps, DrawEndProps, DRAW, DrawAction } from "../layerAction";
import {
  SetDrawStateBeginProps,
  SetDrawStateAction,
  SET_DRAW_STATE,
  SetDrawStateMiddleProps,
  SetDrawStateEndProps
} from "../toolsAction";
import Graphics from "../lib/Graphics";
import { ToolDrawStateEllipse, EllipseProperty } from "../../store/tool/ellipseState";
import Color from "../lib/Color";

export const ELLIPSE = "tool/ellipse";

export const drawBeginEllipse = (props: DrawBeginProps): DrawAction => {
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

export const drawMiddleEllipse = (props: DrawMiddleProps): DrawAction => {
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

export const drawEndEllipse = (props: DrawEndProps): DrawAction => {
  const activeLayer = props.layers.layers.find(layer => layer.id === props.layers.activeLayerId);
  if (activeLayer === undefined) {
    throw new Error("can't find activeLayer");
  }

  const drawState = props.tools.drawState as ToolDrawStateEllipse;
  let origin = drawState.origin;
  if (origin === undefined) {
    origin = props.event.coords;
  }

  const { x: x1, y: y1 } = origin;
  const { x: x2, y: y2 } = props.event.coords;

  const toolProperty = props.tools.properties.get(ELLIPSE) as EllipseProperty;

  const newImageData = new ImageData(activeLayer.imageData.width, activeLayer.imageData.height);
  newImageData.data.set(activeLayer.imageData.data);

  const g = new Graphics(newImageData);

  if (toolProperty.positive) {
    g.ellipse(x1, y1, x2, y2, Color.Transparent);
  } else {
    g.ellipse(x1, y1, x2, y2, Color.Black);
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

export type SetDrawStateEllipseAction = {
  payload: {
    type: typeof ELLIPSE;
    state: ToolDrawStateEllipse;
  };
};

export const setDrawStateBeginEllipse = (props: SetDrawStateBeginProps): SetDrawStateAction => {
  const drawState: ToolDrawStateEllipse = {
    origin: props.coords
  };

  return {
    type: SET_DRAW_STATE,
    payload: {
      type: ELLIPSE,
      state: drawState
    }
  };
};

export const setDrawStateMiddleEllipse = (props: SetDrawStateMiddleProps): SetDrawStateAction => {
  const state = props.tools.drawState as ToolDrawStateEllipse;

  return {
    type: SET_DRAW_STATE,
    payload: {
      type: ELLIPSE,
      state
    }
  };
};

// eslint-disable-next-line @typescript-eslint/no-unused-vars
export const setDrawStateEndEllipse = (_props: SetDrawStateEndProps): SetDrawStateAction => ({
  type: SET_DRAW_STATE,
  payload: {
    type: ELLIPSE,
    state: {}
  }
});
