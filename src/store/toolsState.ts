import { ELLIPSE } from "actions/tool/ellipse";
import { FILLER } from "actions/tool/filler";
import { LINE } from "actions/tool/line";
import { PENCIL } from "actions/tool/pencil";
import { RECTANGLE } from "actions/tool/rectangle";
import { ToolType } from "actions/toolsAction";
import { EllipseProperty, InitialEllipseProperty, ToolDrawStateEllipse } from "./tool/ellipseState";
import { FillerProperty, InitialFillerProperty, ToolDrawStateFiller } from "./tool/fillerState";
import { InitialLineProperty, LineProperty, ToolDrawStateLine } from "./tool/lineState";
import { InitialPencilProperty, PencilProperty, ToolDrawStatePencil } from "./tool/pencilState";
import { InitialRectangleProperty } from "./tool/rectangleState";
import { Vector2D } from "ballen-core";

export type ToolProperty = PencilProperty | FillerProperty | EllipseProperty | LineProperty;
export type ToolDrawState = ToolDrawStatePencil | ToolDrawStateFiller | ToolDrawStateEllipse | ToolDrawStateLine;

export type ToolsState = {
  coords: Vector2D | null;
  drawState: ToolDrawState;
  properties: Map<ToolType, ToolProperty>;
  rect: [Vector2D, Vector2D] | null;
  selectedType: ToolType;
};

export const InitialToolsState: ToolsState = {
  coords: null,
  drawState: {},
  properties: new Map([
    [PENCIL, InitialPencilProperty],
    [FILLER, InitialFillerProperty],
    [ELLIPSE, InitialEllipseProperty],
    [RECTANGLE, InitialRectangleProperty],
    [LINE, InitialLineProperty]
  ]),
  selectedType: PENCIL,
  rect: null
};
