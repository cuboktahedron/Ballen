import { createStore, applyMiddleware } from "redux";
import Reducers from "../reducers/rootReducer";
import { LayersState } from "./layersState";
import { ToolState } from "./toolState";
import logger from "redux-logger";
import { BuildState } from "./buildState";

export type RootState = {
  layers: LayersState;
  tool: ToolState;
  build: BuildState;
};

export const store = createStore(Reducers, applyMiddleware(logger));
