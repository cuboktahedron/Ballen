import { Vector2D } from "utils/ballen-core";
import { DrawStateWithRect } from "./tools";

export const RECTANGLE = "tool/rectangle";

export type RectangleProperty = {
  positive: boolean;
  fill: boolean;
};

export type ToolStateRectangle = {
  type: typeof RECTANGLE;
  property: RectangleProperty;
};

export type ToolDrawStateRectangle = {
  origin?: Vector2D;
  to?: Vector2D;
} & DrawStateWithRect;
