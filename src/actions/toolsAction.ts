import { ELLIPSE } from "types/tools/ellipse";
import { FILLER } from "types/tools/filler";
import { LINE } from "types/tools/line";
import { PENCIL } from "types/tools/pencil";
import { RECTANGLE } from "types/tools/rectangle";
import { ToolProperty } from "types/tools/tools";
import { Vector2D } from "utils/ballen-core";
import Color from "../utils/graphics/Color";
import { BallenAction } from "./actionTypes";
import { DrawBeginProps, DrawEndProps, DrawMiddleProps } from "./batchAction";
import {
  changeDrawStateBeginEllipse,
  ChangeDrawStateEllipseAction,
  changeDrawStateEndEllipse,
  changeDrawStateMiddleEllipse
} from "./tool/ellipse";
import {
  changeDrawStateBeginFiller,
  changeDrawStateEndFiller,
  ChangeDrawStateFillerAction,
  changeDrawStateMiddleFiller
} from "./tool/filler";
import {
  changeDrawStateBeginLine,
  changeDrawStateEndLine,
  ChangeDrawStateLineAction,
  changeDrawStateMiddleLine
} from "./tool/line";
import {
  changeDrawStateBeginPencil,
  changeDrawStateEndPencil,
  changeDrawStateMiddlePencil,
  ChangeDrawStatePencilAction
} from "./tool/pencil";
import {
  changeDrawStateBeginRectangle,
  changeDrawStateEndRectangle,
  changeDrawStateMiddleRectangle,
  ChangeDrawStateRectangleAction
} from "./tool/rectangle";

export type ToolsActions = ChangeToolAction | ChangeToolPropertyAction | ChangeDrawStateAction | MoveCursorAction;

export const GUIDE_LINE_COLOR = new Color("ff000080");

export const CHANGE_TOOL = "tools/changeTool";
export const CHANGE_DRAW_STATE = "tools/changeDrawState";
export const CHANGE_TOOL_PROPERTY = "tools/changeToolProperty";
export const MOVE_CURSOR = "tools/moveCursor";

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

export type ChangeDrawStateAction = { type: typeof CHANGE_DRAW_STATE } & (
  | ChangeDrawStatePencilAction
  | ChangeDrawStateFillerAction
  | ChangeDrawStateEllipseAction
  | ChangeDrawStateRectangleAction
  | ChangeDrawStateLineAction
) &
  BallenAction;

export const changeDrawStateBegin = (props: DrawBeginProps): ChangeDrawStateAction => {
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

export const changeDrawStateMiddle = (props: DrawMiddleProps): ChangeDrawStateAction => {
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

export const changeDrawStateEnd = (props: DrawEndProps): ChangeDrawStateAction => {
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

export type MoveCursorAction = {
  type: typeof MOVE_CURSOR;
  payload: {
    coords: Vector2D | null;
  };
} & BallenAction;

export const moveCursor = (coords: Vector2D | null): MoveCursorAction => ({
  type: MOVE_CURSOR,
  payload: {
    coords: coords ? { ...coords } : null
  }
});
