import { FILLER } from "../../actions/tool/filler";

export type FillerParam = {};

export type ToolDrawStateFiller = {};

export const InitialFillerParam: FillerParam = {};

export type ToolStateFiller = {
  type: typeof FILLER;
  param: FillerParam;
};

export const InitialFillerState: ToolStateFiller = {
  type: FILLER,
  param: InitialFillerParam
};
