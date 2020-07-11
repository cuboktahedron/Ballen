export const FILLER = "tool/filler";

export type FillerProperty = {
  positive: boolean;
};

export type ToolStateFiller = {
  type: typeof FILLER;
  property: FillerProperty;
};

export type ToolDrawStateFiller = {};
