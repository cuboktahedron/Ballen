import { ELLIPSE } from "../../actions/tool/ellipse";
import { Vector2D } from "ballen-core";

export type EllipseProperty = {
  positive: boolean;
  fill: boolean;
};

export type ToolDrawStateEllipse = {
  origin?: Vector2D;
};

export const InitialEllipseProperty: EllipseProperty = {
  positive: false,
  fill: false
};

export type ToolStateEllipse = {
  type: typeof ELLIPSE;
  property: EllipseProperty;
};

export const InitialEllipseState: ToolStateEllipse = {
  type: ELLIPSE,
  property: InitialEllipseProperty
};
