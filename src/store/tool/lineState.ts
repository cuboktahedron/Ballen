import { LINE, LineProperty, ToolStateLine } from "types/tools/line";

export const InitialLineProperty: LineProperty = {
  positive: false,
  fill: false
};

export const InitialLineState: ToolStateLine = {
  type: LINE,
  property: InitialLineProperty
};
