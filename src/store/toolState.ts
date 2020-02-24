import { ToolType } from "../actions/toolAction";
import { PencilParam, ToolDrawStatePencil } from "./tool/pencilState";
import { PENCIL } from "../actions/tool/pencil";
import { FillerParam, ToolDrawStateFiller } from "./tool/fillerState";

export type ToolParam = PencilParam | FillerParam;

export type ToolDrawState = ToolDrawStatePencil | ToolDrawStateFiller;

export type ToolState = {
  type: ToolType;
  params: ToolParam;
  drawState: ToolDrawState;
};

export const InitialToolState: ToolState = {
  type: PENCIL,
  params: {
    thickness: 1
  },
  drawState: {}
};
