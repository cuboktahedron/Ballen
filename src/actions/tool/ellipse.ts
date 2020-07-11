import { DrawBeginProps, DrawEndProps, DrawMiddleProps } from "actions/batchAction";
import { DrawGuideAction, DrawGuideProps, DRAW_GUIDE } from "actions/guideLayerAction";
import { DRAW, DrawAction } from "actions/layerAction";
import { ChangeDrawInfoAction, CHANGE_DRAW_STATE, GUIDE_LINE_COLOR } from "actions/toolsAction";
import { ELLIPSE, EllipseProperty, ToolDrawInfoEllipse } from "types/tools/ellipse";
import Color from "utils/graphics/color";
import Graphics from "utils/graphics/graphics";

export const drawBeginEllipse = (props: DrawBeginProps): DrawAction => {
  return {
    type: DRAW,
    payload: {
      layerId: props.layer.id,
      imageData: null
    }
  };
};

export const drawMiddleEllipse = (props: DrawMiddleProps): DrawAction => {
  return {
    type: DRAW,
    payload: {
      layerId: props.layer.id,
      imageData: null
    }
  };
};

export const drawEndEllipse = (props: DrawEndProps): DrawAction => {
  const drawInfo = props.tools.drawInfo as ToolDrawInfoEllipse;
  let origin = drawInfo.origin;
  if (origin === undefined) {
    origin = props.event.coords;
  }

  const { x: x1, y: y1 } = origin;
  const { x: x2, y: y2 } = props.event.coords;

  const toolProperty = props.tools.property as EllipseProperty;

  const newImageData = new ImageData(props.layer.imageData.width, props.layer.imageData.height);
  newImageData.data.set(props.layer.imageData.data);

  const g = new Graphics(newImageData);

  if (toolProperty.positive) {
    g.ellipse(x1, y1, x2, y2, Color.Transparent, { fill: toolProperty.fill });
  } else {
    g.ellipse(x1, y1, x2, y2, Color.Black, { fill: toolProperty.fill });
  }

  return {
    type: DRAW,
    payload: {
      layerId: props.layer.id,
      imageData: newImageData,
      recordDescription: "Draw ellipse"
    }
  };
};

export type ChangeDrawInfoEllipseAction = {
  payload: {
    type: typeof ELLIPSE;
    drawInfo: ToolDrawInfoEllipse;
  };
};

export const changeDrawInfoBeginEllipse = (props: DrawBeginProps): ChangeDrawInfoAction => {
  const drawInfo: ToolDrawInfoEllipse = {
    origin: props.event.coords
  };

  return {
    type: CHANGE_DRAW_STATE,
    payload: {
      type: ELLIPSE,
      drawInfo: drawInfo
    }
  };
};

export const changeDrawInfoMiddleEllipse = (props: DrawMiddleProps): ChangeDrawInfoAction => {
  const drawInfo = props.tools.drawInfo as ToolDrawInfoEllipse;

  return {
    type: CHANGE_DRAW_STATE,
    payload: {
      type: ELLIPSE,
      drawInfo: {
        ...drawInfo,
        to: props.event.coords
      }
    }
  };
};

// eslint-disable-next-line @typescript-eslint/no-unused-vars
export const changeDrawInfoEndEllipse = (_props: DrawEndProps): ChangeDrawInfoAction => ({
  type: CHANGE_DRAW_STATE,
  payload: {
    type: ELLIPSE,
    drawInfo: {}
  }
});

export const drawGuideEllipse = (props: DrawGuideProps): DrawGuideAction => {
  const guideLayer = props.guideLayer;
  const newImageData = new ImageData(guideLayer.imageData.width, guideLayer.imageData.height);

  const drawInfo = props.tools.drawInfo as ToolDrawInfoEllipse;
  const toolProperty = props.tools.property as EllipseProperty;

  const g = new Graphics(newImageData);

  const origin = drawInfo.origin;
  const to = drawInfo.to;
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
