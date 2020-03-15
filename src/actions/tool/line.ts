import { LineProperty, ToolDrawStateLine } from "../../store/tool/lineState";
import { DrawGuideAction, DrawGuideProps, DRAW_GUIDE } from "../guideLayerAction";
import { DRAW, DrawAction, DrawBeginProps, DrawEndProps, DrawMiddleProps } from "../layersAction";
import Color from "../lib/Color";
import Graphics from "../lib/Graphics";
import {
  SetDrawStateAction,
  SetDrawStateBeginProps,
  SetDrawStateEndProps,
  SetDrawStateMiddleProps,
  SET_DRAW_STATE,
  GUIDE_LINE_COLOR
} from "../toolsAction";

export const LINE = "tool/line";

export const drawBeginLine = (props: DrawBeginProps): DrawAction => {
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

export const drawMiddleLine = (props: DrawMiddleProps): DrawAction => {
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

export const drawEndLine = (props: DrawEndProps): DrawAction => {
  const activeLayer = props.layers.layers.find(layer => layer.id === props.layers.activeLayerId);
  if (activeLayer === undefined) {
    throw new Error("can't find activeLayer");
  }

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
      layer: {
        layerId: activeLayer.id,
        imageData: newImageData
      }
    }
  };
};

export type SetDrawStateLineAction = {
  payload: {
    type: typeof LINE;
    state: ToolDrawStateLine;
  };
};

export const setDrawStateBeginLine = (props: SetDrawStateBeginProps): SetDrawStateAction => {
  const drawState: ToolDrawStateLine = {
    origin: props.coords
  };

  return {
    type: SET_DRAW_STATE,
    payload: {
      type: LINE,
      state: drawState
    }
  };
};

export const setDrawStateMiddleLine = (props: SetDrawStateMiddleProps): SetDrawStateAction => {
  const state = props.tools.drawState as ToolDrawStateLine;

  return {
    type: SET_DRAW_STATE,
    payload: {
      type: LINE,
      state: {
        ...state,
        to: props.coords
      }
    }
  };
};

// eslint-disable-next-line @typescript-eslint/no-unused-vars
export const setDrawStateEndLine = (_props: SetDrawStateEndProps): SetDrawStateAction => ({
  type: SET_DRAW_STATE,
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
