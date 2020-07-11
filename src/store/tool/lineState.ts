import { LINE, LineProperty } from "types/tools/line";

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
