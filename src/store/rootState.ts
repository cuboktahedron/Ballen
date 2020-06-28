import { BuildState, InitialBuildState } from "./buildState";
import { DialogState, InitialDialogState } from "./dialogState";
import { FileState, InitialFileState } from "./fileState";
import { GuideLayerState, InitialGuideLayerState } from "./guideLayerState";
import { HistoriesState, InitialHistoryState } from "./historyState";
import { InitialLayersState, LayersState } from "./layersState";
import { InitialProcessState, ProcessState } from "./processState";
import { InitialToolsState, ToolsState } from "./toolsState";

export type RootState = {
  build: BuildState;
  dialog: DialogState;
  file: FileState;
  guideLayer: GuideLayerState;
  history: HistoriesState;
  layers: LayersState;
  process: ProcessState;
  tools: ToolsState;
};

export const InitialRootState: RootState = {
  build: InitialBuildState,
  dialog: InitialDialogState,
  file: InitialFileState,
  guideLayer: InitialGuideLayerState,
  history: InitialHistoryState,
  layers: InitialLayersState,
  process: InitialProcessState,
  tools: InitialToolsState
};
