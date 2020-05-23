import { LayerBlend } from "stores/layerState";
import { BallenAction } from "./actionTypes";
import { DrawBeginProps, DrawEndProps, DrawMiddleProps } from "./batchAction";
import { drawBeginEllipse, drawEndEllipse, drawMiddleEllipse, ELLIPSE } from "./tool/ellipse";
import { drawBeginFiller, drawEndFiller, drawMiddleFiller, FILLER } from "./tool/filler";
import { drawBeginLine, drawEndLine, drawMiddleLine, LINE } from "./tool/line";
import { drawBeginPencil, drawEndPencil, drawMiddlePencil, PENCIL } from "./tool/pencil";
import { drawBeginRectangle, drawEndRectangle, drawMiddleRectangle, RECTANGLE } from "./tool/rectangle";

export type LayerAction = {
  payload: {
    layerId: number;
  };
} & BallenAction;

export type LayerActions =
  | AddFilterAction
  | ChangeBlendAction
  | ChangeColorAction
  | ChangeNameAction
  | DeleteFilterAction
  | ToggleVisibleAction
  | DrawAction;

export const ADD_FILTER = "layers/layer/addFilter";
export const CHANGE_BLEND = "layers/layer/changeBlend";
export const CHANGE_COLOR = "layers/layer/changeColor";
export const CHANGE_NAME = "layers/layer/changeName";
export const DELETE_FILTER = "layers/layer/deleteFilter";
export const TOGGLE_VISIBLE = "layers/layer/toggleVisible";
export const DRAW = "layers/layer/draw";

export type AddFilterAction = {
  type: typeof ADD_FILTER;
} & LayerAction;

export const addFilter = (layerId: number): AddFilterAction => ({
  type: ADD_FILTER,
  payload: {
    layerId,
    recordDescription: "Add filter"
  }
});

export type ChangeBlendAction = {
  type: typeof CHANGE_BLEND;
  payload: {
    blend: LayerBlend;
  };
} & LayerAction;

export const changeBlend = (layerId: number, blend: LayerBlend): ChangeBlendAction => ({
  type: CHANGE_BLEND,
  payload: {
    layerId,
    blend,
    recordDescription: "Change layer blend"
  }
});

export type ChangeColorAction = {
  type: typeof CHANGE_COLOR;
  payload: {
    color: string;
  };
} & LayerAction;

export const changeColor = (layerId: number, color: string): ChangeColorAction => ({
  type: CHANGE_COLOR,
  payload: {
    layerId,
    recordDescription: "Change layer color",
    color
  }
});

export type ChangeNameAction = {
  type: typeof CHANGE_NAME;
  payload: {
    name: string;
  };
} & LayerAction;

export const changeName = (layerId: number, name: string): ChangeNameAction => ({
  type: CHANGE_NAME,
  payload: {
    layerId,
    name,
    recordDescription: "Change layer name"
  }
});

export type DeleteFilterAction = {
  type: typeof DELETE_FILTER;
  payload: {
    layerId: number;
    filterId: number;
  };
} & LayerAction;

export const deleteFilter = (layerId: number, filterId: number): DeleteFilterAction => ({
  type: DELETE_FILTER,
  payload: {
    layerId,
    filterId,
    recordDescription: "Delete layer filter"
  }
});

export type ToggleVisibleAction = {
  type: typeof TOGGLE_VISIBLE;
  payload: {
    layerId: number;
  };
} & LayerAction;

export const toggleVisible = (layerId: number): ToggleVisibleAction => ({
  type: TOGGLE_VISIBLE,
  payload: {
    layerId,
    recordDescription: "Toggle layer visible"
  }
});

export type DrawAction = {
  type: typeof DRAW;
  payload: {
    layerId: number;
    imageData: ImageData | null;
  };
} & BallenAction;

export const drawBegin = (props: DrawBeginProps): DrawAction => {
  switch (props.tools.selectedType) {
    case PENCIL:
      return drawBeginPencil(props);
    case FILLER:
      return drawBeginFiller(props);
    case ELLIPSE:
      return drawBeginEllipse(props);
    case RECTANGLE:
      return drawBeginRectangle(props);
    case LINE:
      return drawBeginLine(props);
    default:
      throw new Error(`undefined tool type specified ${props.tools.selectedType}`);
  }
};

export const drawMiddle = (props: DrawMiddleProps): DrawAction => {
  switch (props.tools.selectedType) {
    case PENCIL:
      return drawMiddlePencil(props);
    case FILLER:
      return drawMiddleFiller(props);
    case ELLIPSE:
      return drawMiddleEllipse(props);
    case RECTANGLE:
      return drawMiddleRectangle(props);
    case LINE:
      return drawMiddleLine(props);
    default:
      throw new Error(`undefined tool type specified ${props.tools.selectedType}`);
  }
};

export const drawEnd = (props: DrawEndProps): DrawAction => {
  switch (props.tools.selectedType) {
    case PENCIL:
      return drawEndPencil(props);
    case FILLER:
      return drawEndFiller(props);
    case ELLIPSE:
      return drawEndEllipse(props);
    case RECTANGLE:
      return drawEndRectangle(props);
    case LINE:
      return drawEndLine(props);
    default:
      throw new Error(`undefined tool type specified ${props.tools.selectedType}`);
  }
};
