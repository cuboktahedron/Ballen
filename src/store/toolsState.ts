import { PENCIL } from "../actions/tool/pencil";
import { ToolType } from "../actions/toolsAction";
import { FillerParam, ToolDrawStateFiller } from "./tool/fillerState";
import { InitialPencilParam, PencilParam, ToolDrawStatePencil } from "./tool/pencilState";

export type ToolParam = PencilParam | FillerParam;
export type ToolDrawState = ToolDrawStatePencil | ToolDrawStateFiller;

export type ToolsState = {
  selectedType: ToolType;
  drawState: ToolDrawState;
  params: Map<ToolType, ToolParam>;
};

export const InitialToolsState: ToolsState = {
  selectedType: PENCIL,
  drawState: {},
  params: new Map([[PENCIL, InitialPencilParam]])
};
