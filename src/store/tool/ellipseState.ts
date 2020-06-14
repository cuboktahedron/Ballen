import { ELLIPSE } from "actions/tool/ellipse";
import { Vector2D } from "ballen-core";
import { DrawStateWithRect } from "actions/toolsAction";

export type EllipseProperty = {
  positive: boolean;
  fill: boolean;
};

export type ToolDrawStateEllipse = {
  origin?: Vector2D;
  to?: Vector2D;
} & DrawStateWithRect;

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
