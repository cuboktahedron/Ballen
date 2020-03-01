import { FILLER } from "../actions/tool/filler";
import { PENCIL } from "../actions/tool/pencil";
import { ToolType } from "../actions/toolsAction";
import { FillerProperty, InitialFillerProperty, ToolDrawStateFiller } from "./tool/fillerState";
import { InitialPencilProperty, PencilProperty, ToolDrawStatePencil } from "./tool/pencilState";

export type ToolProperty = PencilProperty | FillerProperty;
export type ToolDrawState = ToolDrawStatePencil | ToolDrawStateFiller;

export type ToolsState = {
  selectedType: ToolType;
  drawState: ToolDrawState;
  properties: Map<ToolType, ToolProperty>;
};

export const InitialToolsState: ToolsState = {
  selectedType: PENCIL,
  drawState: {},
  properties: new Map([
    [PENCIL, InitialPencilProperty],
    [FILLER, InitialFillerProperty]
  ])
};
