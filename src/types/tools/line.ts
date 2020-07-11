export const LINE = "tool/line";

export type LineProperty = {
  positive: boolean;
  fill: boolean;
};

export type ToolStateLine = {
  type: typeof LINE;
  property: LineProperty;
};
