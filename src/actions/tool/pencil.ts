import { DrawBeginProps, DrawMiddleProps, DrawEndProps, DRAW, DrawAction } from "../layerAction";
import {
  SetDrawStateBeginProps,
  SetDrawsStateAction,
  SET_DRAW_STATE,
  SetDrawStateMiddleProps,
  SetDrawStateEndProps
} from "../toolAction";
import { ToolDrawStatePencil } from "../../store/tool/pencilState";
import Graphics from "../lib/Graphics";

export const PENCIL = "tool/pencil";

export const drawBeginPencil = (props: DrawBeginProps): DrawAction => {
  // TODO: method化する
  const activeLayer = props.layers.layers.find(layer => layer.id === props.layers.activeLayerId);
  if (activeLayer === undefined) {
    throw new Error("can't find activeLayer");
  }

  const newImageData = new ImageData(activeLayer.imageData.width, activeLayer.imageData.height);
  newImageData.data.set(activeLayer.imageData.data);

  const g = new Graphics(newImageData);
  const { x, y } = props.event.coords;
  g.dot(x, y);

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

export const drawMiddlePencil = (props: DrawMiddleProps): DrawAction => {
  const activeLayer = props.layers.layers.find(layer => layer.id === props.layers.activeLayerId);
  if (activeLayer === undefined) {
    throw new Error("can't find activeLayer");
  }

  const drawState = props.tool.drawState as ToolDrawStatePencil;
  let prevCoords = drawState.prevCoords;
  if (prevCoords === undefined) {
    prevCoords = props.event.coords;
  }

  const newImageData = new ImageData(activeLayer.imageData.width, activeLayer.imageData.height);
  newImageData.data.set(activeLayer.imageData.data);

  const g = new Graphics(newImageData);
  const { x: x1, y: y1 } = prevCoords;
  const { x: x2, y: y2 } = props.event.coords;
  g.line(x1, y1, x2, y2);

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

export const drawEndPencil = (props: DrawEndProps): DrawAction => {
  const activeLayer = props.layers.layers.find(layer => layer.id === props.layers.activeLayerId);
  if (activeLayer === undefined) {
    throw new Error("can't find activeLayer");
  }

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

export type SetDrawStatePencilAction = {
  type: typeof SET_DRAW_STATE;
  payload: {
    type: typeof PENCIL;
    state: ToolDrawStatePencil;
  };
};

export const setDrawStateBeginPencil = (props: SetDrawStateBeginProps): SetDrawsStateAction => {
  const drawState: ToolDrawStatePencil = {
    prevCoords: props.coords
  };

  return {
    type: SET_DRAW_STATE,
    payload: {
      type: PENCIL,
      state: drawState
    }
  };
};

export const setDrawStateMiddlePencil = (props: SetDrawStateMiddleProps): SetDrawsStateAction => {
  const drawState = { ...(props.tool.drawState as ToolDrawStatePencil) };
  drawState.prevCoords = props.coords;

  return {
    type: SET_DRAW_STATE,
    payload: {
      type: PENCIL,
      state: drawState
    }
  };
};

// eslint-disable-next-line @typescript-eslint/no-unused-vars
export const setDrawStateEndPencil = (_props: SetDrawStateEndProps): SetDrawsStateAction => ({
  type: SET_DRAW_STATE,
  payload: {
    type: PENCIL,
    state: {}
  }
});
