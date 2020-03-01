import { PencilProperty, ToolDrawStatePencil } from "../../store/tool/pencilState";
import { DRAW, DrawAction, DrawBeginProps, DrawEndProps, DrawMiddleProps } from "../layerAction";
import Color from "../lib/Color";
import Graphics from "../lib/Graphics";
import {
  SetDrawStateAction,
  SetDrawStateBeginProps,
  SetDrawStateEndProps,
  SetDrawStateMiddleProps,
  SET_DRAW_STATE
} from "../toolsAction";

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
  const toolProperty = props.tools.properties.get(PENCIL) as PencilProperty;

  if (toolProperty.positive) {
    g.dot(x, y, Color.Transparent);
  } else {
    g.dot(x, y, Color.Black);
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

export const drawMiddlePencil = (props: DrawMiddleProps): DrawAction => {
  const activeLayer = props.layers.layers.find(layer => layer.id === props.layers.activeLayerId);
  if (activeLayer === undefined) {
    throw new Error("can't find activeLayer");
  }

  const drawState = props.tools.drawState as ToolDrawStatePencil;
  let prevCoords = drawState.prevCoords;
  if (prevCoords === undefined) {
    prevCoords = props.event.coords;
  }

  const newImageData = new ImageData(activeLayer.imageData.width, activeLayer.imageData.height);
  newImageData.data.set(activeLayer.imageData.data);

  const g = new Graphics(newImageData);
  const { x: x1, y: y1 } = prevCoords;
  const { x: x2, y: y2 } = props.event.coords;
  const toolProperty = props.tools.properties.get(PENCIL) as PencilProperty;

  if (toolProperty.positive) {
    g.line(x1, y1, x2, y2, Color.Transparent);
  } else {
    g.line(x1, y1, x2, y2, Color.Black);
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
  payload: {
    type: typeof PENCIL;
    state: ToolDrawStatePencil;
  };
};

export const setDrawStateBeginPencil = (props: SetDrawStateBeginProps): SetDrawStateAction => {
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

export const setDrawStateMiddlePencil = (props: SetDrawStateMiddleProps): SetDrawStateAction => {
  const drawState = { ...(props.tools.drawState as ToolDrawStatePencil) };
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
export const setDrawStateEndPencil = (_props: SetDrawStateEndProps): SetDrawStateAction => ({
  type: SET_DRAW_STATE,
  payload: {
    type: PENCIL,
    state: {}
  }
});
