import { ELLIPSE } from "../actions/tool/ellipse";
import { FILLER } from "../actions/tool/filler";
import { PENCIL } from "../actions/tool/pencil";
import { RECTANGLE } from "../actions/tool/rectangle";
import { ToolType } from "../actions/toolsAction";
import { FillerProperty, InitialFillerProperty, ToolDrawStateFiller } from "./tool/fillerState";
import { InitialPencilProperty, PencilProperty, ToolDrawStatePencil } from "./tool/pencilState";
import { InitialEllipseProperty, ToolDrawStateEllipse, EllipseProperty } from "./tool/ellipseState";
import { InitialRectangleProperty } from "./tool/rectangleState";

export type ToolProperty = PencilProperty | FillerProperty | EllipseProperty;
export type ToolDrawState = ToolDrawStatePencil | ToolDrawStateFiller | ToolDrawStateEllipse;

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
    [FILLER, InitialFillerProperty],
    [ELLIPSE, InitialEllipseProperty],
    [RECTANGLE, InitialRectangleProperty]
  ])
};
