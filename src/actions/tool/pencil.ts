import { DrawBeginProps, DrawEndProps, DrawMiddleProps } from "actions/batchAction";
import { DrawGuideAction, DrawGuideProps, DRAW_GUIDE } from "actions/guideLayerAction";
import { DRAW, DrawAction } from "actions/layerAction";
import { ChangeDrawStateAction, CHANGE_DRAW_STATE } from "actions/toolsAction";
import { PENCIL, PencilProperty, ToolDrawStatePencil } from "types/tools/pencil";
import Color from "utils/graphics/color";
import Graphics from "utils/graphics/graphics";
import { getActiveLayer } from "./functions";

export const drawBeginPencil = (props: DrawBeginProps): DrawAction => {
  const activeLayer = getActiveLayer(props.layers);
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
      layerId: activeLayer.id,
      imageData: newImageData
    }
  };
};

export const drawMiddlePencil = (props: DrawMiddleProps): DrawAction => {
  const activeLayer = getActiveLayer(props.layers);
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
      layerId: activeLayer.id,
      imageData: newImageData
    }
  };
};

export const drawEndPencil = (props: DrawEndProps): DrawAction => {
  const activeLayer = getActiveLayer(props.layers);

  return {
    type: DRAW,
    payload: {
      layerId: activeLayer.id,
      imageData: activeLayer.imageData,
      recordDescription: "Draw by pencil"
    }
  };
};

export type ChangeDrawStatePencilAction = {
  payload: {
    type: typeof PENCIL;
    state: ToolDrawStatePencil;
  };
};

export const changeDrawStateBeginPencil = (props: DrawBeginProps): ChangeDrawStateAction => {
  const drawState: ToolDrawStatePencil = {
    prevCoords: props.event.coords
  };

  return {
    type: CHANGE_DRAW_STATE,
    payload: {
      type: PENCIL,
      state: drawState
    }
  };
};

export const changeDrawStateMiddlePencil = (props: DrawMiddleProps): ChangeDrawStateAction => {
  const drawState = { ...(props.tools.drawState as ToolDrawStatePencil) };
  drawState.prevCoords = props.event.coords;

  return {
    type: CHANGE_DRAW_STATE,
    payload: {
      type: PENCIL,
      state: drawState
    }
  };
};

// eslint-disable-next-line @typescript-eslint/no-unused-vars
export const changeDrawStateEndPencil = (_props: DrawEndProps): ChangeDrawStateAction => ({
  type: CHANGE_DRAW_STATE,
  payload: {
    type: PENCIL,
    state: {}
  }
});

// eslint-disable-next-line @typescript-eslint/no-unused-vars
export const drawGuidePencil = (_props: DrawGuideProps): DrawGuideAction => {
  return {
    type: DRAW_GUIDE,
    payload: {
      imageData: null
    }
  };
};
