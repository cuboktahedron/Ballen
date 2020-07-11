import { DrawBeginProps, DrawEndProps, DrawMiddleProps } from "actions/batchAction";
import { DrawGuideAction, DrawGuideProps, DRAW_GUIDE } from "actions/guideLayerAction";
import { DRAW, DrawAction } from "actions/layerAction";
import { ChangeDrawStateAction, CHANGE_DRAW_STATE } from "actions/toolsAction";
import { FILLER, FillerProperty, ToolDrawStateFiller } from "types/tools/filler";
import Color from "utils/graphics/Color";
import Graphics from "utils/graphics/Graphics";
import { getActiveLayer } from "./functions";

export const drawBeginFiller = (props: DrawBeginProps): DrawAction => {
  const activeLayer = getActiveLayer(props.layers);

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
      layerId: activeLayer.id,
      imageData: newImageData,
      recordDescription: "Draw by filler"
    }
  };
};

export const drawMiddleFiller = (props: DrawMiddleProps): DrawAction => {
  const activeLayer = getActiveLayer(props.layers);
  const newImageData = new ImageData(activeLayer.imageData.width, activeLayer.imageData.height);
  newImageData.data.set(activeLayer.imageData.data);

  return {
    type: DRAW,
    payload: {
      layerId: activeLayer.id,
      imageData: null
    }
  };
};

export const drawEndFiller = (props: DrawEndProps): DrawAction => {
  const activeLayer = getActiveLayer(props.layers);

  return {
    type: DRAW,
    payload: {
      layerId: activeLayer.id,
      imageData: null
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
export const changeDrawStateBeginFiller = (_props: DrawBeginProps): ChangeDrawStateAction => {
  return {
    type: CHANGE_DRAW_STATE,
    payload: {
      type: FILLER,
      state: {}
    }
  };
};

// eslint-disable-next-line @typescript-eslint/no-unused-vars
export const changeDrawStateMiddleFiller = (_props: DrawMiddleProps): ChangeDrawStateAction => {
  return {
    type: CHANGE_DRAW_STATE,
    payload: {
      type: FILLER,
      state: {}
    }
  };
};

// eslint-disable-next-line @typescript-eslint/no-unused-vars
export const changeDrawStateEndFiller = (_props: DrawEndProps): ChangeDrawStateAction => ({
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
