import { RECTANGLE, RectangleProperty, ToolStateRectangle } from "types/tools/rectangle";

export const InitialRectangleProperty: RectangleProperty = {
  positive: false,
  fill: false
};

export const InitialRectangleState: ToolStateRectangle = {
  type: RECTANGLE,
  property: InitialRectangleProperty
};
