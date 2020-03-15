import { FillerProperty, ToolDrawStateFiller } from "../../store/tool/fillerState";
import { DrawGuideAction, DrawGuideProps, DRAW_GUIDE } from "../guideLayerAction";
import { DRAW, DrawAction, DrawBeginProps, DrawEndProps, DrawMiddleProps } from "../layersAction";
import Color from "../lib/Color";
import Graphics from "../lib/Graphics";
import {
  SetDrawStateAction,
  SetDrawStateBeginProps,
  SetDrawStateEndProps,
  SetDrawStateMiddleProps,
  SET_DRAW_STATE
} from "../toolsAction";

export const FILLER = "tool/filler";

export const drawBeginFiller = (props: DrawBeginProps): DrawAction => {
  // TODO: method化する
  const activeLayer = props.layers.layers.find(layer => layer.id === props.layers.activeLayerId);
  if (activeLayer === undefined) {
    throw new Error("can't find activeLayer");
  }

  const newImageData = new ImageData(activeLayer.imageData.width, activeLayer.imageData.height);
  newImageData.data.set(activeLayer.imageData.data);

  const g = new Graphics(newImageData);
  const { x, y } = props.event.coords;
  const toolProperty = props.tools.properties.get(FILLER) as FillerProperty;

  if (toolProperty.positive) {
    g.fill(x, y, Color.Transparent);
  } else {
    g.fill(x, y, Color.Black);
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

export const drawMiddleFiller = (props: DrawMiddleProps): DrawAction => {
  const activeLayer = props.layers.layers.find(layer => layer.id === props.layers.activeLayerId);
  if (activeLayer === undefined) {
    throw new Error("can't find activeLayer");
  }

  const newImageData = new ImageData(activeLayer.imageData.width, activeLayer.imageData.height);
  newImageData.data.set(activeLayer.imageData.data);

  // TODO: 何もしないアクションを返す

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

export const drawEndFiller = (props: DrawEndProps): DrawAction => {
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

export type SetDrawStateFillerAction = {
  payload: {
    type: typeof FILLER;
    state: ToolDrawStateFiller;
  };
};

// eslint-disable-next-line @typescript-eslint/no-unused-vars
export const setDrawStateBeginFiller = (_props: SetDrawStateBeginProps): SetDrawStateAction => {
  return {
    type: SET_DRAW_STATE,
    payload: {
      type: FILLER,
      state: {}
    }
  };
};

// eslint-disable-next-line @typescript-eslint/no-unused-vars
export const setDrawStateMiddleFiller = (_props: SetDrawStateMiddleProps): SetDrawStateAction => {
  return {
    type: SET_DRAW_STATE,
    payload: {
      type: FILLER,
      state: {}
    }
  };
};

// eslint-disable-next-line @typescript-eslint/no-unused-vars
export const setDrawStateEndFiller = (_props: SetDrawStateEndProps): SetDrawStateAction => ({
  type: SET_DRAW_STATE,
  payload: {
    type: FILLER,
    state: {}
  }
});

export const drawGuideFiller = (props: DrawGuideProps): DrawGuideAction => {
  const guideLayer = props.guideLayer;
  const newImageData = new ImageData(guideLayer.imageData.width, guideLayer.imageData.height);

  // TODO: 何もしないアクションを渡す
  return {
    type: DRAW_GUIDE,
    payload: {
      imageData: newImageData
    }
  };
};
