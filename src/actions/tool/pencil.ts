import { DrawBeginProps, DrawEndProps, DrawMiddleProps } from "actions/batchAction";
import { DrawGuideAction, DrawGuideProps, DRAW_GUIDE } from "actions/guideLayerAction";
import { DRAW, DrawAction } from "actions/layerAction";
import { ChangeDrawInfoAction, CHANGE_DRAW_STATE } from "actions/toolsAction";
import { PENCIL, PencilProperty, ToolDrawInfoPencil } from "types/tools/pencil";
import Color from "utils/graphics/color";
import Graphics from "utils/graphics/graphics";

export const drawBeginPencil = (props: DrawBeginProps): DrawAction => {
  const newImageData = new ImageData(props.layer.imageData.width, props.layer.imageData.height);
  newImageData.data.set(props.layer.imageData.data);

  const g = new Graphics(newImageData);
  const { x, y } = props.event.coords;
  const toolProperty = props.tools.property as PencilProperty;

  if (toolProperty.positive) {
    g.dot(x, y, Color.Transparent);
  } else {
    g.dot(x, y, Color.Black);
  }

  return {
    type: DRAW,
    payload: {
      layerId: props.layer.id,
      imageData: newImageData
    }
  };
};

export const drawMiddlePencil = (props: DrawMiddleProps): DrawAction => {
  const drawInfo = props.tools.drawInfo as ToolDrawInfoPencil;
  let prevCoords = drawInfo.prevCoords;
  if (prevCoords === undefined) {
    prevCoords = props.event.coords;
  }

  const newImageData = new ImageData(props.layer.imageData.width, props.layer.imageData.height);
  newImageData.data.set(props.layer.imageData.data);

  const g = new Graphics(newImageData);
  const { x: x1, y: y1 } = prevCoords;
  const { x: x2, y: y2 } = props.event.coords;
  const toolProperty = props.tools.property as PencilProperty;

  if (toolProperty.positive) {
    g.line(x1, y1, x2, y2, Color.Transparent);
  } else {
    g.line(x1, y1, x2, y2, Color.Black);
  }

  return {
    type: DRAW,
    payload: {
      layerId: props.layer.id,
      imageData: newImageData
    }
  };
};

export const drawEndPencil = (props: DrawEndProps): DrawAction => {
  return {
    type: DRAW,
    payload: {
      layerId: props.layer.id,
      imageData: props.layer.imageData,
      recordDescription: "Draw by pencil"
    }
  };
};

export type ChangeDrawInfoPencilAction = {
  payload: {
    type: typeof PENCIL;
    drawInfo: ToolDrawInfoPencil;
  };
};

export const changeDrawInfoBeginPencil = (props: DrawBeginProps): ChangeDrawInfoAction => {
  const drawInfo: ToolDrawInfoPencil = {
    prevCoords: props.event.coords
  };

  return {
    type: CHANGE_DRAW_STATE,
    payload: {
      type: PENCIL,
      drawInfo: drawInfo
    }
  };
};

export const changeDrawInfoMiddlePencil = (props: DrawMiddleProps): ChangeDrawInfoAction => {
  const drawInfo = { ...(props.tools.drawInfo as ToolDrawInfoPencil) };
  drawInfo.prevCoords = props.event.coords;

  return {
    type: CHANGE_DRAW_STATE,
    payload: {
      type: PENCIL,
      drawInfo: drawInfo
    }
  };
};

// eslint-disable-next-line @typescript-eslint/no-unused-vars
export const changeDrawInfoEndPencil = (_props: DrawEndProps): ChangeDrawInfoAction => ({
  type: CHANGE_DRAW_STATE,
  payload: {
    type: PENCIL,
    drawInfo: {}
  }
});

// eslint-disable-next-line @typescript-eslint/no-unused-vars
export const drawGuidePencil = (_props: DrawGuideProps): DrawGuideAction => {
  return {
    type: DRAW_GUIDE,
    payload: {
      imageData: null
    }
  };
};
