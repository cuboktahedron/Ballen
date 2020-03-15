import { combineReducers } from "redux";
import layers from "./layersReducer";
import tools from "./toolsReducer";
import build from "./buildReducer";
import guideLayer from "./guideLayerReducer";
import { RootState } from "../store/store";

const rootReducer = combineReducers<RootState>({
  layers,
  tools,
  build,
  guideLayer
});

export default rootReducer;
