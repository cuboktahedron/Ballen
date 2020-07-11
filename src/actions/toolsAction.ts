import { ELLIPSE } from "types/tools/ellipse";
import { FILLER } from "types/tools/filler";
import { LINE } from "types/tools/line";
import { PENCIL } from "types/tools/pencil";
import { RECTANGLE } from "types/tools/rectangle";
import { ToolProperty } from "types/tools/tools";
import { Vector2D } from "utils/ballenCore";
import Color from "../utils/graphics/color";
import { BallenAction } from "./actionTypes";
import { DrawBeginProps, DrawEndProps, DrawMiddleProps } from "./batchAction";
import {
  changeDrawInfoBeginEllipse,
  ChangeDrawInfoEllipseAction,
  changeDrawInfoEndEllipse,
  changeDrawInfoMiddleEllipse
} from "./tool/ellipse";
import {
  changeDrawInfoBeginFiller,
  changeDrawInfoEndFiller,
  ChangeDrawInfoFillerAction,
  changeDrawInfoMiddleFiller
} from "./tool/filler";
import {
  changeDrawInfoBeginLine,
  changeDrawInfoEndLine,
  ChangeDrawInfoLineAction,
  changeDrawInfoMiddleLine
} from "./tool/line";
import {
  changeDrawInfoBeginPencil,
  changeDrawInfoEndPencil,
  changeDrawInfoMiddlePencil,
  ChangeDrawInfoPencilAction
} from "./tool/pencil";
import {
  changeDrawInfoBeginRectangle,
  changeDrawInfoEndRectangle,
  changeDrawInfoMiddleRectangle,
  ChangeDrawInfoRectangleAction
} from "./tool/rectangle";

export type ToolsActions = ChangeToolAction | ChangeToolPropertyAction | ChangeDrawInfoAction | MoveCursorAction;

export const GUIDE_LINE_COLOR = new Color("ff000080");

export const CHANGE_TOOL = "tools/changeTool";
export const CHANGE_DRAW_STATE = "tools/changeDrawInfo";
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

export type ChangeDrawInfoAction = { type: typeof CHANGE_DRAW_STATE } & (
  | ChangeDrawInfoPencilAction
  | ChangeDrawInfoFillerAction
  | ChangeDrawInfoEllipseAction
  | ChangeDrawInfoRectangleAction
  | ChangeDrawInfoLineAction
) &
  BallenAction;

export const changeDrawInfoBegin = (props: DrawBeginProps): ChangeDrawInfoAction => {
  switch (props.tools.selectedType) {
    case PENCIL:
      return changeDrawInfoBeginPencil(props);
    case FILLER:
      return changeDrawInfoBeginFiller(props);
    case ELLIPSE:
      return changeDrawInfoBeginEllipse(props);
    case RECTANGLE:
      return changeDrawInfoBeginRectangle(props);
    case LINE:
      return changeDrawInfoBeginLine(props);
    default:
      throw new Error(`undefined tool type specified ${props.tools.selectedType}`);
  }
};

export const changeDrawInfoMiddle = (props: DrawMiddleProps): ChangeDrawInfoAction => {
  switch (props.tools.selectedType) {
    case PENCIL:
      return changeDrawInfoMiddlePencil(props);
    case FILLER:
      return changeDrawInfoMiddleFiller(props);
    case ELLIPSE:
      return changeDrawInfoMiddleEllipse(props);
    case RECTANGLE:
      return changeDrawInfoMiddleRectangle(props);
    case LINE:
      return changeDrawInfoMiddleLine(props);
    default:
      throw new Error(`undefined tool type specified ${props.tools.selectedType}`);
  }
};

export const changeDrawInfoEnd = (props: DrawEndProps): ChangeDrawInfoAction => {
  switch (props.tools.selectedType) {
    case PENCIL:
      return changeDrawInfoEndPencil(props);
    case FILLER:
      return changeDrawInfoEndFiller(props);
    case ELLIPSE:
      return changeDrawInfoEndEllipse(props);
    case RECTANGLE:
      return changeDrawInfoEndRectangle(props);
    case LINE:
      return changeDrawInfoEndLine(props);
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
