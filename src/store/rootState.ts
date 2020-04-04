import { BuildState, InitialBuildState } from "./buildState";
import { GuideLayerState, InitialGuideLayerState } from "./guideLayerState";
import { InitialLayersState, LayersState } from "./layersState";
import { InitialToolsState, ToolsState } from "./toolsState";

export type RootState = {
  layers: LayersState;
  tools: ToolsState;
  build: BuildState;
  guideLayer: GuideLayerState;
};

export const InitialRootState: RootState = {
  build: InitialBuildState,
  guideLayer: InitialGuideLayerState,
  layers: InitialLayersState,
  tools: InitialToolsState
};
