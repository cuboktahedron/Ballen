import { Vector2D } from "utils/ballenCore";
import { DrawStateWithRect } from "./tools";

export const LINE = "tool/line";

export type LineProperty = {
  positive: boolean;
  fill: boolean;
};

export type ToolDrawInfoLine = {
  origin?: Vector2D;
  to?: Vector2D;
} & DrawStateWithRect;
