import { Vector2D } from "utils/ballenCore";
import { DrawStateWithRect } from "./tools";

export const RECTANGLE = "tool/rectangle";

export type RectangleProperty = {
  positive: boolean;
  fill: boolean;
};

export type ToolDrawInfoRectangle = {
  origin?: Vector2D;
  to?: Vector2D;
} & DrawStateWithRect;
