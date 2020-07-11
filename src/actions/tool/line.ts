import { DrawBeginProps, DrawEndProps, DrawMiddleProps } from "actions/batchAction";
import { DrawGuideAction, DrawGuideProps, DRAW_GUIDE } from "actions/guideLayerAction";
import { DRAW, DrawAction } from "actions/layerAction";
import { ChangeDrawInfoAction, CHANGE_DRAW_STATE, GUIDE_LINE_COLOR } from "actions/toolsAction";
import { LINE, LineProperty, ToolDrawInfoLine } from "types/tools/line";
import Color from "utils/graphics/color";
import Graphics from "utils/graphics/graphics";

export const drawBeginLine = (props: DrawBeginProps): DrawAction => {
  return {
    type: DRAW,
    payload: {
      layerId: props.layer.id,
      imageData: null
    }
  };
};

export const drawMiddleLine = (props: DrawMiddleProps): DrawAction => {
  return {
    type: DRAW,
    payload: {
      layerId: props.layer.id,
      imageData: null
    }
  };
};

export const drawEndLine = (props: DrawEndProps): DrawAction => {
  const drawInfo = props.tools.drawInfo as ToolDrawInfoLine;
  let origin = drawInfo.origin;
  if (origin === undefined) {
    origin = props.event.coords;
  }

  const { x: x1, y: y1 } = origin;
  const { x: x2, y: y2 } = props.event.coords;

  const toolProperty = props.tools.property as LineProperty;

  const newImageData = new ImageData(props.layer.imageData.width, props.layer.imageData.height);
  newImageData.data.set(props.layer.imageData.data);

  const g = new Graphics(newImageData);

  if (toolProperty.positive) {
    g.line(x1, y1, x2, y2, Color.Transparent);
  } else {
    g.line(x1, y1, x2, y2, Color.Black);
  }

  return {
    type: DRAW,
    payload: {
      layerId: props.layer.id,
      imageData: newImageData,
      recordDescription: "Draw line"
    }
  };
};

export type ChangeDrawInfoLineAction = {
  payload: {
    type: typeof LINE;
    drawInfo: ToolDrawInfoLine;
  };
};

export const changeDrawInfoBeginLine = (props: DrawBeginProps): ChangeDrawInfoAction => {
  const drawInfo: ToolDrawInfoLine = {
    origin: props.event.coords
  };

  return {
    type: CHANGE_DRAW_STATE,
    payload: {
      type: LINE,
      drawInfo: drawInfo
    }
  };
};

export const changeDrawInfoMiddleLine = (props: DrawMiddleProps): ChangeDrawInfoAction => {
  const drawInfo = props.tools.drawInfo as ToolDrawInfoLine;

  return {
    type: CHANGE_DRAW_STATE,
    payload: {
      type: LINE,
      drawInfo: {
        ...drawInfo,
        to: props.event.coords
      }
    }
  };
};

// eslint-disable-next-line @typescript-eslint/no-unused-vars
export const changeDrawInfoEndLine = (_props: DrawEndProps): ChangeDrawInfoAction => ({
  type: CHANGE_DRAW_STATE,
  payload: {
    type: LINE,
    drawInfo: {}
  }
});

export const drawGuideLine = (props: DrawGuideProps): DrawGuideAction => {
  const guideLayer = props.guideLayer;
  const newImageData = new ImageData(guideLayer.imageData.width, guideLayer.imageData.height);

  const drawInfo = props.tools.drawInfo as ToolDrawInfoLine;

  const g = new Graphics(newImageData);

  const origin = drawInfo.origin;
  const to = drawInfo.to;
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
