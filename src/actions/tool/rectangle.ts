import { DrawBeginProps, DrawEndProps, DrawMiddleProps } from "actions/batchAction";
import { DrawGuideAction, DrawGuideProps, DRAW_GUIDE } from "actions/guideLayerAction";
import { DRAW, DrawAction } from "actions/layerAction";
import { ChangeDrawStateAction, CHANGE_DRAW_STATE, GUIDE_LINE_COLOR } from "actions/toolsAction";
import { RECTANGLE, RectangleProperty, ToolDrawStateRectangle } from "types/tools/rectangle";
import Color from "utils/graphics/color";
import Graphics from "utils/graphics/graphics";
import { getActiveLayer } from "./functions";

export const drawBeginRectangle = (props: DrawBeginProps): DrawAction => {
  const activeLayer = getActiveLayer(props.layers);

  return {
    type: DRAW,
    payload: {
      layerId: activeLayer.id,
      imageData: null
    }
  };
};

export const drawMiddleRectangle = (props: DrawMiddleProps): DrawAction => {
  const activeLayer = getActiveLayer(props.layers);

  return {
    type: DRAW,
    payload: {
      layerId: activeLayer.id,
      imageData: null
    }
  };
};

export const drawEndRectangle = (props: DrawEndProps): DrawAction => {
  const activeLayer = getActiveLayer(props.layers);

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
      layerId: activeLayer.id,
      imageData: newImageData,
      recordDescription: "Draw rectangle"
    }
  };
};

export type ChangeDrawStateRectangleAction = {
  payload: {
    type: typeof RECTANGLE;
    state: ToolDrawStateRectangle;
  };
};

export const changeDrawStateBeginRectangle = (props: DrawBeginProps): ChangeDrawStateAction => {
  const drawState: ToolDrawStateRectangle = {
    origin: props.event.coords
  };

  return {
    type: CHANGE_DRAW_STATE,
    payload: {
      type: RECTANGLE,
      state: drawState
    }
  };
};

export const changeDrawStateMiddleRectangle = (props: DrawMiddleProps): ChangeDrawStateAction => {
  const state = props.tools.drawState as ToolDrawStateRectangle;

  return {
    type: CHANGE_DRAW_STATE,
    payload: {
      type: RECTANGLE,
      state: {
        ...state,
        to: props.event.coords
      }
    }
  };
};

// eslint-disable-next-line @typescript-eslint/no-unused-vars
export const changeDrawStateEndRectangle = (_props: DrawEndProps): ChangeDrawStateAction => ({
  type: CHANGE_DRAW_STATE,
  payload: {
    type: RECTANGLE,
    state: {}
  }
});

export const drawGuideRectangle = (props: DrawGuideProps): DrawGuideAction => {
  const guideLayer = props.guideLayer;
  const newImageData = new ImageData(guideLayer.imageData.width, guideLayer.imageData.height);

  const drawState = props.tools.drawState as ToolDrawStateRectangle;
  const toolProperty = props.tools.properties.get(RECTANGLE) as RectangleProperty;

  const g = new Graphics(newImageData);

  const origin = drawState.origin;
  const to = drawState.to;
  if (origin !== undefined && to !== undefined) {
    g.rectangle(origin.x, origin.y, to.x, to.y, GUIDE_LINE_COLOR, { fill: toolProperty.fill });
  }

  return {
    type: DRAW_GUIDE,
    payload: {
      imageData: newImageData
    }
  };
};
