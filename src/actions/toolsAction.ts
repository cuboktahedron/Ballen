import { Vector2D } from "ballen-core";
import { ToolsState, ToolParam } from "../store/toolsState";
import {
  SetDrawStatePencilAction,
  PENCIL,
  setDrawStateBeginPencil,
  setDrawStateMiddlePencil,
  setDrawStateEndPencil
} from "./tool/pencil";
import {
  SetDrawStateFillerAction,
  FILLER,
  setDrawStateBeginFiller,
  setDrawStateMiddleFiller,
  setDrawStateEndFiller
} from "./tool/filler";

export type ToolsActions = SelectToolAction | SetToolParamAction | SetDrawStateAction;

export const SELECT_TOOL = "tools/selectTool";
export const SET_DRAW_STATE = "tools/setDrawState";
export const SET_TOOL_PARAM = "tools/setToolParam";

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

export type SetToolParamAction = {
  type: typeof SET_TOOL_PARAM;
  payload: {
    type: ToolType;
    param: ToolParam;
  };
};

export const setToolParam = (type: ToolType, param: ToolParam): SetToolParamAction => ({
  type: SET_TOOL_PARAM,
  payload: {
    type,
    param
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
);

export const setDrawStateBegin = (props: SetDrawStateBeginProps): SetDrawStateAction => {
  switch (props.tools.selectedType) {
    case PENCIL:
      return setDrawStateBeginPencil(props);
    case FILLER:
      return setDrawStateBeginFiller(props);
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
    default:
      throw new Error(`undefined tool type specified ${props.tools.selectedType}`);
  }
};
