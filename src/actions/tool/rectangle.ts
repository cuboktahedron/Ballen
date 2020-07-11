import { DrawBeginProps, DrawEndProps, DrawMiddleProps } from "actions/batchAction";
import { DrawGuideAction, DrawGuideProps, DRAW_GUIDE } from "actions/guideLayerAction";
import { DRAW, DrawAction } from "actions/layerAction";
import { ChangeDrawInfoAction, CHANGE_DRAW_STATE, GUIDE_LINE_COLOR } from "actions/toolsAction";
import { RECTANGLE, RectangleProperty, ToolDrawInfoRectangle } from "types/tools/rectangle";
import Color from "utils/graphics/color";
import Graphics from "utils/graphics/graphics";

export const drawBeginRectangle = (props: DrawBeginProps): DrawAction => {
  return {
    type: DRAW,
    payload: {
      layerId: props.layer.id,
      imageData: null
    }
  };
};

export const drawMiddleRectangle = (props: DrawMiddleProps): DrawAction => {
  return {
    type: DRAW,
    payload: {
      layerId: props.layer.id,
      imageData: null
    }
  };
};

export const drawEndRectangle = (props: DrawEndProps): DrawAction => {
  const drawInfo = props.tools.drawInfo as ToolDrawInfoRectangle;
  let origin = drawInfo.origin;
  if (origin === undefined) {
    origin = props.event.coords;
  }

  const { x: x1, y: y1 } = origin;
  const { x: x2, y: y2 } = props.event.coords;

  const toolProperty = props.tools.property as RectangleProperty;

  const newImageData = new ImageData(props.layer.imageData.width, props.layer.imageData.height);
  newImageData.data.set(props.layer.imageData.data);

  const g = new Graphics(newImageData);

  if (toolProperty.positive) {
    g.rectangle(x1, y1, x2, y2, Color.Transparent, { fill: toolProperty.fill });
  } else {
    g.rectangle(x1, y1, x2, y2, Color.Black, { fill: toolProperty.fill });
  }

  return {
    type: DRAW,
    payload: {
      layerId: props.layer.id,
      imageData: newImageData,
      recordDescription: "Draw rectangle"
    }
  };
};

export type ChangeDrawInfoRectangleAction = {
  payload: {
    type: typeof RECTANGLE;
    drawInfo: ToolDrawInfoRectangle;
  };
};

export const changeDrawInfoBeginRectangle = (props: DrawBeginProps): ChangeDrawInfoAction => {
  const drawInfo: ToolDrawInfoRectangle = {
    origin: props.event.coords
  };

  return {
    type: CHANGE_DRAW_STATE,
    payload: {
      type: RECTANGLE,
      drawInfo: drawInfo
    }
  };
};

export const changeDrawInfoMiddleRectangle = (props: DrawMiddleProps): ChangeDrawInfoAction => {
  const drawInfo = props.tools.drawInfo as ToolDrawInfoRectangle;

  return {
    type: CHANGE_DRAW_STATE,
    payload: {
      type: RECTANGLE,
      drawInfo: {
        ...drawInfo,
        to: props.event.coords
      }
    }
  };
};

// eslint-disable-next-line @typescript-eslint/no-unused-vars
export const changeDrawInfoEndRectangle = (_props: DrawEndProps): ChangeDrawInfoAction => ({
  type: CHANGE_DRAW_STATE,
  payload: {
    type: RECTANGLE,
    drawInfo: {}
  }
});

export const drawGuideRectangle = (props: DrawGuideProps): DrawGuideAction => {
  const guideLayer = props.guideLayer;
  const newImageData = new ImageData(guideLayer.imageData.width, guideLayer.imageData.height);

  const drawInfo = props.tools.drawInfo as ToolDrawInfoRectangle;
  const toolProperty = props.tools.property as RectangleProperty;

  const g = new Graphics(newImageData);

  const origin = drawInfo.origin;
  const to = drawInfo.to;
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
