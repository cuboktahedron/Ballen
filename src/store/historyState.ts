import { BuildState } from "./buildState";
import { DialogState } from "./dialogState";
import { FileState } from "./fileState";
import { GuideLayerState } from "./guideLayerState";
import { LayersState } from "./layersState";
import { ToolsState } from "./toolsState";

export type HistoriesState = {
  histories: HistoryState[];
  historyIdSequence: number;
  no: number;
};

export type StatesOfHistory = {
  build?: BuildState;
  dialog?: DialogState;
  file?: FileState;
  guideLayer?: GuideLayerState;
  layers?: LayersState;
  tools?: ToolsState;
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
