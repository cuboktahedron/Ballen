import { BuildState, InitialBuildState } from "./buildState";
import { GuideLayerState, InitialGuideLayerState } from "./guideLayerState";
import { HistoriesState, InitialHistoryState } from "./historyState";
import { InitialLayersState, LayersState } from "./layersState";
import { InitialProcessState, ProcessState } from "./processState";
import { InitialToolsState, ToolsState } from "./toolsState";
import { InitialFileState, FileState } from "./fileState";

export type RootState = {
  layers: LayersState;
  tools: ToolsState;
  build: BuildState;
  file: FileState;
  guideLayer: GuideLayerState;
  history: HistoriesState;
  process: ProcessState;
};

export const InitialRootState: RootState = {
  build: InitialBuildState,
  guideLayer: InitialGuideLayerState,
  file: InitialFileState,
  layers: InitialLayersState,
  tools: InitialToolsState,
  history: InitialHistoryState,
  process: InitialProcessState
};
