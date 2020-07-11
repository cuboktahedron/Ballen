import { LINE } from "actions/tool/line";
import { DrawStateWithRect } from "actions/toolsAction";
import { Vector2D } from "utils/ballen-core";

export type LineProperty = {
  positive: boolean;
  fill: boolean;
};

export type ToolDrawStateLine = {
  origin?: Vector2D;
  to?: Vector2D;
} & DrawStateWithRect;

export const InitialLineProperty: LineProperty = {
  positive: false,
  fill: false
};

export type ToolStateLine = {
  type: typeof LINE;
  property: LineProperty;
};

export const InitialLineState: ToolStateLine = {
  type: LINE,
  property: InitialLineProperty
};
