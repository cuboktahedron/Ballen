import { Vector2D } from "utils/ballenCore";
import { DrawStateWithRect } from "./tools";

export const ELLIPSE = "tool/ellipse";

export type EllipseProperty = {
  positive: boolean;
  fill: boolean;
};

export type ToolDrawInfoEllipse = {
  origin?: Vector2D;
  to?: Vector2D;
} & DrawStateWithRect;
