import { RECTANGLE, RectangleProperty } from "types/tools/rectangle";

export const InitialRectangleProperty: RectangleProperty = {
  positive: false,
  fill: false
};

export type ToolStateRectangle = {
  type: typeof RECTANGLE;
  property: RectangleProperty;
};

export const InitialRectangleState: ToolStateRectangle = {
  type: RECTANGLE,
  property: InitialRectangleProperty
};
