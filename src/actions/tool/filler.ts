import { DrawBeginProps, DrawEndProps, DrawMiddleProps } from "actions/batchAction";
import { DrawGuideAction, DrawGuideProps, DRAW_GUIDE } from "actions/guideLayerAction";
import { DRAW, DrawAction } from "actions/layerAction";
import { ChangeDrawInfoAction, CHANGE_DRAW_STATE } from "actions/toolsAction";
import { FILLER, FillerProperty, ToolDrawInfoFiller } from "types/tools/filler";
import Color from "utils/graphics/color";
import Graphics from "utils/graphics/graphics";

export const drawBeginFiller = (props: DrawBeginProps): DrawAction => {
  const newImageData = new ImageData(props.layer.imageData.width, props.layer.imageData.height);
  newImageData.data.set(props.layer.imageData.data);

  const g = new Graphics(newImageData);
  const { x, y } = props.event.coords;
  const toolProperty = props.tools.property as FillerProperty;

  if (toolProperty.positive) {
    g.fill(x, y, Color.Transparent);
  } else {
    g.fill(x, y, Color.Black);
  }

  return {
    type: DRAW,
    payload: {
      layerId: props.layer.id,
      imageData: newImageData,
      recordDescription: "Draw by filler"
    }
  };
};

export const drawMiddleFiller = (props: DrawMiddleProps): DrawAction => {
  const newImageData = new ImageData(props.layer.imageData.width, props.layer.imageData.height);
  newImageData.data.set(props.layer.imageData.data);

  return {
    type: DRAW,
    payload: {
      layerId: props.layer.id,
      imageData: null
    }
  };
};

export const drawEndFiller = (props: DrawEndProps): DrawAction => {
  return {
    type: DRAW,
    payload: {
      layerId: props.layer.id,
      imageData: null
    }
  };
};

export type ChangeDrawInfoFillerAction = {
  payload: {
    type: typeof FILLER;
    drawInfo: ToolDrawInfoFiller;
  };
};

// eslint-disable-next-line @typescript-eslint/no-unused-vars
export const changeDrawInfoBeginFiller = (_props: DrawBeginProps): ChangeDrawInfoAction => {
  return {
    type: CHANGE_DRAW_STATE,
    payload: {
      type: FILLER,
      drawInfo: {}
    }
  };
};

// eslint-disable-next-line @typescript-eslint/no-unused-vars
export const changeDrawInfoMiddleFiller = (_props: DrawMiddleProps): ChangeDrawInfoAction => {
  return {
    type: CHANGE_DRAW_STATE,
    payload: {
      type: FILLER,
      drawInfo: {}
    }
  };
};

// eslint-disable-next-line @typescript-eslint/no-unused-vars
export const changeDrawInfoEndFiller = (_props: DrawEndProps): ChangeDrawInfoAction => ({
  type: CHANGE_DRAW_STATE,
  payload: {
    type: FILLER,
    drawInfo: {}
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
