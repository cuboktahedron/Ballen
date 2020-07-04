import { DrawBeginProps, DrawEndProps, DrawMiddleProps } from "actions/batchAction";
import { DrawGuideAction, DrawGuideProps, DRAW_GUIDE } from "actions/guideLayerAction";
import { DRAW, DrawAction } from "actions/layerAction";
import { ChangeDrawStateAction, CHANGE_DRAW_STATE, GUIDE_LINE_COLOR } from "actions/toolsAction";
import { LineProperty, ToolDrawStateLine } from "stores/tool/lineState";
import Color from "utils/graphics/Color";
import Graphics from "utils/graphics/Graphics";
import { getActiveLayer } from "./functions";

export const LINE = "tool/line";

export const drawBeginLine = (props: DrawBeginProps): DrawAction => {
  const activeLayer = getActiveLayer(props.layers);

  return {
    type: DRAW,
    payload: {
      layerId: activeLayer.id,
      imageData: null
    }
  };
};

export const drawMiddleLine = (props: DrawMiddleProps): DrawAction => {
  const activeLayer = getActiveLayer(props.layers);

  return {
    type: DRAW,
    payload: {
      layerId: activeLayer.id,
      imageData: null
    }
  };
};

export const drawEndLine = (props: DrawEndProps): DrawAction => {
  const activeLayer = getActiveLayer(props.layers);

  const drawState = props.tools.drawState as ToolDrawStateLine;
  let origin = drawState.origin;
  if (origin === undefined) {
    origin = props.event.coords;
  }

  const { x: x1, y: y1 } = origin;
  const { x: x2, y: y2 } = props.event.coords;

  const toolProperty = props.tools.properties.get(LINE) as LineProperty;

  const newImageData = new ImageData(activeLayer.imageData.width, activeLayer.imageData.height);
  newImageData.data.set(activeLayer.imageData.data);

  const g = new Graphics(newImageData);

  if (toolProperty.positive) {
    g.line(x1, y1, x2, y2, Color.Transparent);
  } else {
    g.line(x1, y1, x2, y2, Color.Black);
  }

  return {
    type: DRAW,
    payload: {
      layerId: activeLayer.id,
      imageData: newImageData,
      recordDescription: "Draw line"
    }
  };
};

export type ChangeDrawStateLineAction = {
  payload: {
    type: typeof LINE;
    state: ToolDrawStateLine;
  };
};

export const changeDrawStateBeginLine = (props: DrawBeginProps): ChangeDrawStateAction => {
  const drawState: ToolDrawStateLine = {
    origin: props.event.coords
  };

  return {
    type: CHANGE_DRAW_STATE,
    payload: {
      type: LINE,
      state: drawState
    }
  };
};

export const changeDrawStateMiddleLine = (props: DrawMiddleProps): ChangeDrawStateAction => {
  const state = props.tools.drawState as ToolDrawStateLine;

  return {
    type: CHANGE_DRAW_STATE,
    payload: {
      type: LINE,
      state: {
        ...state,
        to: props.event.coords
      }
    }
  };
};

// eslint-disable-next-line @typescript-eslint/no-unused-vars
export const changeDrawStateEndLine = (_props: DrawEndProps): ChangeDrawStateAction => ({
  type: CHANGE_DRAW_STATE,
  payload: {
    type: LINE,
    state: {}
  }
});

export const drawGuideLine = (props: DrawGuideProps): DrawGuideAction => {
  const guideLayer = props.guideLayer;
  const newImageData = new ImageData(guideLayer.imageData.width, guideLayer.imageData.height);

  const drawState = props.tools.drawState as ToolDrawStateLine;

  const g = new Graphics(newImageData);

  const origin = drawState.origin;
  const to = drawState.to;
  if (origin !== undefined && to !== undefined) {
    g.line(origin.x, origin.y, to.x, to.y, GUIDE_LINE_COLOR);
  }

  return {
    type: DRAW_GUIDE,
    payload: {
      imageData: newImageData
    }
  };
};
