import { FILLER } from "../../actions/tool/filler";

export type FillerProperty = {
  positive: boolean;
};

export type ToolDrawStateFiller = {};

export const InitialFillerProperty: FillerProperty = {
  positive: false
};

export type ToolStateFiller = {
  type: typeof FILLER;
  property: FillerProperty;
};

export const InitialFillerState: ToolStateFiller = {
  type: FILLER,
  property: InitialFillerProperty
};
