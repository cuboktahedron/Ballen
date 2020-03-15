import { applyMiddleware, createStore } from "redux";
import logger from "redux-logger";
import Reducers from "../reducers/rootReducer";
import { BuildState } from "./buildState";
import { GuideLayerState } from "./guideLayerState";
import { LayersState } from "./layersState";
import { ToolsState } from "./toolsState";

export type RootState = {
  layers: LayersState;
  tools: ToolsState;
  build: BuildState;
  guideLayer: GuideLayerState;
};

export const store = createStore(Reducers, applyMiddleware(logger));
