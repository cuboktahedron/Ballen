import { Vector2D } from "utils/ballenCore";
import { EllipseProperty, ToolDrawStateEllipse } from "./ellipse";
import { FillerProperty, ToolDrawStateFiller } from "./filler";
import { LineProperty } from "./line";
import { PencilProperty, ToolDrawStatePencil } from "./pencil";

export type ToolDrawStateLine = {
  origin?: Vector2D;
  to?: Vector2D;
} & DrawStateWithRect;

export type DrawStateWithRect = {
  origin?: Vector2D;
  to?: Vector2D;
};

export type ToolProperty = PencilProperty | FillerProperty | EllipseProperty | LineProperty;
export type ToolDrawState = ToolDrawStatePencil | ToolDrawStateFiller | ToolDrawStateEllipse | ToolDrawStateLine;
