import { FILLER, FillerProperty, ToolStateFiller } from "types/tools/filler";

export const InitialFillerProperty: FillerProperty = {
  positive: false
};

export const InitialFillerState: ToolStateFiller = {
  type: FILLER,
  property: InitialFillerProperty
};
