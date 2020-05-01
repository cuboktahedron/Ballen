import { DrawBeginProps, DrawEndProps, DrawMiddleProps } from "actions/batchAction";
import { DrawGuideAction, DrawGuideProps, DRAW_GUIDE } from "actions/guideLayerAction";
import { DRAW, DrawAction } from "actions/layerAction";
import Color from "actions/lib/Color";
import Graphics from "actions/lib/Graphics";
import { ChangeDrawStateAction, CHANGE_DRAW_STATE } from "actions/toolsAction";
import { PencilProperty, ToolDrawStatePencil } from "stores/tool/pencilState";

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
      layerId: activeLayer.id,
      imageData: newImageData
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
      layerId: activeLayer.id,
      imageData: newImageData
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
