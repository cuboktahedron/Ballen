import { ToolType } from "actions/toolsAction";
import { ELLIPSE } from "types/tools/ellipse";
import { FILLER } from "types/tools/filler";
import { LINE } from "types/tools/line";
import { PENCIL } from "types/tools/pencil";
import { RECTANGLE } from "types/tools/rectangle";
import { ToolDrawState, ToolProperty } from "types/tools/tools";
import { Vector2D } from "utils/ballenCore";
import { InitialEllipseProperty } from "./tool/ellipseState";
import { InitialFillerProperty } from "./tool/fillerState";
import { InitialLineProperty } from "./tool/lineState";
import { InitialPencilProperty } from "./tool/pencilState";
import { InitialRectangleProperty } from "./tool/rectangleState";

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
