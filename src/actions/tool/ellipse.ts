import { EllipseProperty, ToolDrawStateEllipse } from "../../store/tool/ellipseState";
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
    g.ellipse(x1, y1, x2, y2, Color.Transparent, { fill: toolProperty.fill });
  } else {
    g.ellipse(x1, y1, x2, y2, Color.Black, { fill: toolProperty.fill });
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
      state: {
        ...state,
        to: props.coords
      }
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

export const drawGuideEllipse = (props: DrawGuideProps): DrawGuideAction => {
  const guideLayer = props.guideLayer;
  const newImageData = new ImageData(guideLayer.imageData.width, guideLayer.imageData.height);

  const drawState = props.tools.drawState as ToolDrawStateEllipse;
  const toolProperty = props.tools.properties.get(ELLIPSE) as EllipseProperty;

  const g = new Graphics(newImageData);

  const origin = drawState.origin;
  const to = drawState.to;
  if (origin !== undefined && to !== undefined) {
    g.rectangle(origin.x, origin.y, to.x, to.y, GUIDE_LINE_COLOR, { fill: false });
    g.ellipse(origin.x, origin.y, to.x, to.y, GUIDE_LINE_COLOR, { fill: toolProperty.fill });
  }

  return {
    type: DRAW_GUIDE,
    payload: {
      imageData: newImageData
    }
  };
};
