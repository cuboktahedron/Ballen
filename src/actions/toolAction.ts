import { Vector2D } from "ballen-core";
import {
  setDrawStateBeginPencil,
  setDrawStateMiddlePencil,
  setDrawStateEndPencil,
  SetDrawStatePencilAction,
  PENCIL
} from "./tool/pencil";
import { ToolState } from "../store/toolState";
import {
  SetDrawStateFillerAction,
  FILLER,
  setDrawStateBeginFiller,
  setDrawStateMiddleFiller,
  setDrawStateEndFiller
} from "./tool/filler";

export type ToolActions = SetToolAction | SetDrawsStateAction;

export const SET_TOOL = "tool/setTool";
export const SET_DRAW_STATE = "tool/setDrawState";
export type ToolType = string;

export type SetToolAction = {
  type: typeof SET_TOOL;
  payload: {
    type: ToolType;
  };
};

export const setTool = (type: ToolType): SetToolAction => ({
  type: SET_TOOL,
  payload: {
    type
  }
});

export type SetDrawStateBeginProps = {
  tool: ToolState;
  coords: Vector2D;
};

export type SetDrawStateMiddleProps = {
  tool: ToolState;
  coords: Vector2D;
};

export type SetDrawStateEndProps = {
  tool: ToolState;
  coords: Vector2D;
};

export type SetDrawsStateAction = SetDrawStatePencilAction | SetDrawStateFillerAction;

export const setDrawStateBegin = (props: SetDrawStateBeginProps): SetDrawsStateAction => {
  switch (props.tool.type) {
    case PENCIL:
      return setDrawStateBeginPencil(props);
    case FILLER:
      return setDrawStateBeginFiller(props);
    default:
      throw new Error(`undefined tool type specified ${props.tool.type}`);
  }
};

export const setDrawStateMiddle = (props: SetDrawStateMiddleProps): SetDrawsStateAction => {
  switch (props.tool.type) {
    case PENCIL:
      return setDrawStateMiddlePencil(props);
    case FILLER:
      return setDrawStateMiddleFiller(props);
    default:
      throw new Error(`undefined tool type specified ${props.tool.type}`);
  }
};

export const setDrawStateEnd = (props: SetDrawStateEndProps): SetDrawsStateAction => {
  switch (props.tool.type) {
    case PENCIL:
      return setDrawStateEndPencil(props);
    case FILLER:
      return setDrawStateEndFiller(props);
    default:
      throw new Error(`undefined tool type specified ${props.tool.type}`);
  }
};
