import { Vector2D } from "utils/ballen-core";
import { DrawStateWithRect } from "./tools";

export const ELLIPSE = "tool/ellipse";

export type EllipseProperty = {
  positive: boolean;
  fill: boolean;
};

export type ToolStateEllipse = {
  type: typeof ELLIPSE;
  property: EllipseProperty;
};

export type ToolDrawStateEllipse = {
  origin?: Vector2D;
  to?: Vector2D;
} & DrawStateWithRect;
