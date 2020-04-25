import { BuildState } from "./buildState";
import { GuideLayerState } from "./guideLayerState";
import { LayersState } from "./layersState";
import { ProcessState } from "./processState";
import { ToolsState } from "./toolsState";
import { FileState } from "./fileState";

export type HistoriesState = {
  histories: HistoryState[];
  historyIdSequence: number;
  no: number;
};

export type StatesOfHistory = {
  layers?: LayersState;
  tools?: ToolsState;
  build?: BuildState;
  guideLayer?: GuideLayerState;
  file?: FileState;
  process?: ProcessState;
};

export type HistoryState = {
  id: number;
  description: string;
} & StatesOfHistory;

export const InitialHistoryState: HistoriesState = {
  histories: [],
  historyIdSequence: 0,
  no: -1
};
