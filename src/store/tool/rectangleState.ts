import { RECTANGLE } from "../../actions/tool/rectangle";
import { Vector2D } from "ballen-core";

export type RectangleProperty = {
  positive: boolean;
  fill: boolean;
};

export type ToolDrawStateRectangle = {
  origin?: Vector2D;
};

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
