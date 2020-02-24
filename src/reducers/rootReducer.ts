import { combineReducers } from "redux";
import layers from "./layersReducer";
import tool from "./toolReducer";
import build from "./buildReducer";
import { RootState } from "../store/store";

const rootReducer = combineReducers<RootState>({
  layers,
  tool,
  build
});

export default rootReducer;
