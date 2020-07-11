import { Vector2D } from "utils/ballenCore";
import { EllipseProperty, ToolDrawInfoEllipse } from "./ellipse";
import { FillerProperty, ToolDrawInfoFiller } from "./filler";
import { LineProperty, ToolDrawInfoLine } from "./line";
import { PencilProperty, ToolDrawInfoPencil } from "./pencil";
import { RectangleProperty, ToolDrawInfoRectangle } from "./rectangle";

export type DrawStateWithRect = {
  origin?: Vector2D;
  to?: Vector2D;
};

export type ToolProperty = PencilProperty | FillerProperty | EllipseProperty | LineProperty | RectangleProperty;
export type ToolDrawInfo =
  | ToolDrawInfoPencil
  | ToolDrawInfoFiller
  | ToolDrawInfoEllipse
  | ToolDrawInfoLine
  | ToolDrawInfoRectangle;
