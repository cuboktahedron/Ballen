import { createStore, applyMiddleware } from "redux";
import Reducers from "../reducers/rootReducer";
import { LayersState } from "./layersState";
import logger from "redux-logger";
import { BuildState } from "./buildState";
import { ToolsState } from "./toolsState";

export type RootState = {
  layers: LayersState;
  tools: ToolsState;
  build: BuildState;
};

export const store = createStore(Reducers, applyMiddleware(logger));
