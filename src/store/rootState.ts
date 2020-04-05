import { BuildState, InitialBuildState } from "./buildState";
import { GuideLayerState, InitialGuideLayerState } from "./guideLayerState";
import { HistoriesState, InitialHistoryState } from "./historyState";
import { InitialLayersState, LayersState } from "./layersState";
import { InitialToolsState, ToolsState } from "./toolsState";

export type RootState = {
  layers: LayersState;
  tools: ToolsState;
  build: BuildState;
  guideLayer: GuideLayerState;
  history: HistoriesState;
};

export const InitialRootState: RootState = {
  build: InitialBuildState,
  guideLayer: InitialGuideLayerState,
  layers: InitialLayersState,
  tools: InitialToolsState,
  history: InitialHistoryState
};
