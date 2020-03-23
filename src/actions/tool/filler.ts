import { DrawGuideAction, DrawGuideProps, DRAW_GUIDE } from "actions/guideLayerAction";
import { DRAW, DrawAction, DrawBeginProps, DrawEndProps, DrawMiddleProps } from "actions/layersAction";
import Color from "actions/lib/Color";
import Graphics from "actions/lib/Graphics";
import {
  ChangeDrawStateAction,
  ChangeDrawStateBeginProps,
  ChangeDrawStateEndProps,
  ChangeDrawStateMiddleProps,
  CHANGE_DRAW_STATE
} from "actions/toolsAction";
import { FillerProperty, ToolDrawStateFiller } from "stores/tool/fillerState";

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

  return {
    type: DRAW,
    payload: {
      layer: {
        layerId: activeLayer.id,
        imageData: null
      }
    }
  };
};

export const drawEndFiller = (props: DrawEndProps): DrawAction => {
  const activeLayer = props.layers.layers.find(layer => layer.id === props.layers.activeLayerId);
  if (activeLayer === undefined) {
    throw new Error("can't find activeLayer");
  }

  return {
    type: DRAW,
    payload: {
      layer: {
        layerId: activeLayer.id,
        imageData: null
      }
    }
  };
};

export type ChangeDrawStateFillerAction = {
  payload: {
    type: typeof FILLER;
    state: ToolDrawStateFiller;
  };
};

// eslint-disable-next-line @typescript-eslint/no-unused-vars
export const changeDrawStateBeginFiller = (_props: ChangeDrawStateBeginProps): ChangeDrawStateAction => {
  return {
    type: CHANGE_DRAW_STATE,
    payload: {
      type: FILLER,
      state: {}
    }
  };
};

// eslint-disable-next-line @typescript-eslint/no-unused-vars
export const changeDrawStateMiddleFiller = (_props: ChangeDrawStateMiddleProps): ChangeDrawStateAction => {
  return {
    type: CHANGE_DRAW_STATE,
    payload: {
      type: FILLER,
      state: {}
    }
  };
};

// eslint-disable-next-line @typescript-eslint/no-unused-vars
export const changeDrawStateEndFiller = (_props: ChangeDrawStateEndProps): ChangeDrawStateAction => ({
  type: CHANGE_DRAW_STATE,
  payload: {
    type: FILLER,
    state: {}
  }
});

// eslint-disable-next-line @typescript-eslint/no-unused-vars
export const drawGuideFiller = (_props: DrawGuideProps): DrawGuideAction => {
  return {
    type: DRAW_GUIDE,
    payload: {
      imageData: null
    }
  };
};
