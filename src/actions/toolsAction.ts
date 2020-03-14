import { Vector2D } from "ballen-core";
import { ToolProperty, ToolsState } from "../store/toolsState";
import {
  ELLIPSE,
  setDrawStateBeginEllipse,
  SetDrawStateEllipseAction,
  setDrawStateEndEllipse,
  setDrawStateMiddleEllipse
} from "./tool/ellipse";
import {
  FILLER,
  setDrawStateBeginFiller,
  setDrawStateEndFiller,
  SetDrawStateFillerAction,
  setDrawStateMiddleFiller
} from "./tool/filler";
import {
  LINE,
  setDrawStateBeginLine,
  setDrawStateEndLine,
  SetDrawStateLineAction,
  setDrawStateMiddleLine
} from "./tool/line";
import {
  PENCIL,
  setDrawStateBeginPencil,
  setDrawStateEndPencil,
  setDrawStateMiddlePencil,
  SetDrawStatePencilAction
} from "./tool/pencil";
import {
  RECTANGLE,
  setDrawStateBeginRectangle,
  setDrawStateEndRectangle,
  setDrawStateMiddleRectangle,
  SetDrawStateRectangleAction
} from "./tool/rectangle";

export type ToolsActions = SelectToolAction | SetToolPropertyAction | SetDrawStateAction;

export const SELECT_TOOL = "tools/selectTool";
export const SET_DRAW_STATE = "tools/setDrawState";
export const SET_TOOL_PROPERTY = "tools/setToolProperty";

export type ToolType = string;

export type SelectToolAction = {
  type: typeof SELECT_TOOL;
  payload: {
    type: ToolType;
  };
};

export const selectTool = (type: ToolType): SelectToolAction => ({
  type: SELECT_TOOL,
  payload: {
    type
  }
});

export type SetToolPropertyAction = {
  type: typeof SET_TOOL_PROPERTY;
  payload: {
    type: ToolType;
    property: ToolProperty;
  };
};

export const setToolProperty = (type: ToolType, property: ToolProperty): SetToolPropertyAction => ({
  type: SET_TOOL_PROPERTY,
  payload: {
    type,
    property
  }
});

export type SetDrawStateBeginProps = {
  tools: ToolsState;
  coords: Vector2D;
};

export type SetDrawStateMiddleProps = {
  tools: ToolsState;
  coords: Vector2D;
};

export type SetDrawStateEndProps = {
  tools: ToolsState;
  coords: Vector2D;
};

export type SetDrawStateAction = { type: typeof SET_DRAW_STATE } & (
  | SetDrawStatePencilAction
  | SetDrawStateFillerAction
  | SetDrawStateEllipseAction
  | SetDrawStateRectangleAction
  | SetDrawStateLineAction
);

export const setDrawStateBegin = (props: SetDrawStateBeginProps): SetDrawStateAction => {
  switch (props.tools.selectedType) {
    case PENCIL:
      return setDrawStateBeginPencil(props);
    case FILLER:
      return setDrawStateBeginFiller(props);
    case ELLIPSE:
      return setDrawStateBeginEllipse(props);
    case RECTANGLE:
      return setDrawStateBeginRectangle(props);
    case LINE:
      return setDrawStateBeginLine(props);
    default:
      throw new Error(`undefined tool type specified ${props.tools.selectedType}`);
  }
};

export const setDrawStateMiddle = (props: SetDrawStateMiddleProps): SetDrawStateAction => {
  switch (props.tools.selectedType) {
    case PENCIL:
      return setDrawStateMiddlePencil(props);
    case FILLER:
      return setDrawStateMiddleFiller(props);
    case ELLIPSE:
      return setDrawStateMiddleEllipse(props);
    case RECTANGLE:
      return setDrawStateMiddleRectangle(props);
    case LINE:
      return setDrawStateMiddleLine(props);
    default:
      throw new Error(`undefined tool type specified ${props.tools.selectedType}`);
  }
};

export const setDrawStateEnd = (props: SetDrawStateEndProps): SetDrawStateAction => {
  switch (props.tools.selectedType) {
    case PENCIL:
      return setDrawStateEndPencil(props);
    case FILLER:
      return setDrawStateEndFiller(props);
    case ELLIPSE:
      return setDrawStateEndEllipse(props);
    case RECTANGLE:
      return setDrawStateEndRectangle(props);
    case LINE:
      return setDrawStateEndLine(props);
    default:
      throw new Error(`undefined tool type specified ${props.tools.selectedType}`);
  }
};
