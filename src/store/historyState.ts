import { BuildState } from "./buildState";
import { GuideLayerState } from "./guideLayerState";
import { LayersState } from "./layersState";
import { ToolsState } from "./toolsState";

export type HistoriesState = {
  no: number;
  histories: HistoryState[];
};

export type HistoryState = {
  layers?: LayersState;
  tools?: ToolsState;
  build?: BuildState;
  guideLayer?: GuideLayerState;
};

export const InitialHistoryState: HistoriesState = {
  no: -1,
  histories: []
};
