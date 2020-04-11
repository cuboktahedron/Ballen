import { Vector2D } from "ballen-core";
import { ToolProperty, ToolsState } from "stores/toolsState";
import Color from "./lib/Color";
import {
  changeDrawStateBeginEllipse,
  ChangeDrawStateEllipseAction,
  changeDrawStateEndEllipse,
  changeDrawStateMiddleEllipse,
  ELLIPSE
} from "./tool/ellipse";
import {
  changeDrawStateBeginFiller,
  changeDrawStateEndFiller,
  ChangeDrawStateFillerAction,
  changeDrawStateMiddleFiller,
  FILLER
} from "./tool/filler";
import {
  changeDrawStateBeginLine,
  changeDrawStateEndLine,
  ChangeDrawStateLineAction,
  changeDrawStateMiddleLine,
  LINE
} from "./tool/line";
import {
  changeDrawStateBeginPencil,
  changeDrawStateEndPencil,
  changeDrawStateMiddlePencil,
  ChangeDrawStatePencilAction,
  PENCIL
} from "./tool/pencil";
import {
  changeDrawStateBeginRectangle,
  changeDrawStateEndRectangle,
  changeDrawStateMiddleRectangle,
  ChangeDrawStateRectangleAction,
  RECTANGLE
} from "./tool/rectangle";
import { BallenAction } from "./actionTypes";

export type ToolsActions = ChangeToolAction | ChangeToolPropertyAction | ChangeDrawStateAction;

export const GUIDE_LINE_COLOR = new Color("ff000080");

export const CHANGE_TOOL = "tools/changeTool";
export const CHANGE_DRAW_STATE = "tools/changeDrawState";
export const CHANGE_TOOL_PROPERTY = "tools/changeToolProperty";

export type ToolType = string;

export type ChangeToolAction = {
  type: typeof CHANGE_TOOL;
  payload: {
    type: ToolType;
  };
} & BallenAction;

export const changeTool = (type: ToolType): ChangeToolAction => ({
  type: CHANGE_TOOL,
  payload: {
    type
  }
});

export type ChangeToolPropertyAction = {
  type: typeof CHANGE_TOOL_PROPERTY;
  payload: {
    type: ToolType;
    property: ToolProperty;
  };
} & BallenAction;

export const changeToolProperty = (type: ToolType, property: ToolProperty): ChangeToolPropertyAction => ({
  type: CHANGE_TOOL_PROPERTY,
  payload: {
    type,
    property
  }
});

export type ChangeDrawStateBeginProps = {
  tools: ToolsState;
  coords: Vector2D;
};

export type ChangeDrawStateMiddleProps = {
  tools: ToolsState;
  coords: Vector2D;
};

export type ChangeDrawStateEndProps = {
  tools: ToolsState;
  coords: Vector2D;
};

export type ChangeDrawStateAction = { type: typeof CHANGE_DRAW_STATE } & (
  | ChangeDrawStatePencilAction
  | ChangeDrawStateFillerAction
  | ChangeDrawStateEllipseAction
  | ChangeDrawStateRectangleAction
  | ChangeDrawStateLineAction
) &
  BallenAction;

export const changeDrawStateBegin = (props: ChangeDrawStateBeginProps): ChangeDrawStateAction => {
  switch (props.tools.selectedType) {
    case PENCIL:
      return changeDrawStateBeginPencil(props);
    case FILLER:
      return changeDrawStateBeginFiller(props);
    case ELLIPSE:
      return changeDrawStateBeginEllipse(props);
    case RECTANGLE:
      return changeDrawStateBeginRectangle(props);
    case LINE:
      return changeDrawStateBeginLine(props);
    default:
      throw new Error(`undefined tool type specified ${props.tools.selectedType}`);
  }
};

export const changeDrawStateMiddle = (props: ChangeDrawStateMiddleProps): ChangeDrawStateAction => {
  switch (props.tools.selectedType) {
    case PENCIL:
      return changeDrawStateMiddlePencil(props);
    case FILLER:
      return changeDrawStateMiddleFiller(props);
    case ELLIPSE:
      return changeDrawStateMiddleEllipse(props);
    case RECTANGLE:
      return changeDrawStateMiddleRectangle(props);
    case LINE:
      return changeDrawStateMiddleLine(props);
    default:
      throw new Error(`undefined tool type specified ${props.tools.selectedType}`);
  }
};

export const changeDrawStateEnd = (props: ChangeDrawStateEndProps): ChangeDrawStateAction => {
  switch (props.tools.selectedType) {
    case PENCIL:
      return changeDrawStateEndPencil(props);
    case FILLER:
      return changeDrawStateEndFiller(props);
    case ELLIPSE:
      return changeDrawStateEndEllipse(props);
    case RECTANGLE:
      return changeDrawStateEndRectangle(props);
    case LINE:
      return changeDrawStateEndLine(props);
    default:
      throw new Error(`undefined tool type specified ${props.tools.selectedType}`);
  }
};
