import { FILLER, FillerProperty } from "types/tools/filler";

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
