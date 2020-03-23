import { combineReducers } from "redux";
import { RootState } from "stores/store";
import build from "./buildReducer";
import guideLayer from "./guideLayerReducer";
import layers from "./layersReducer";
import tools from "./toolsReducer";

const rootReducer = combineReducers<RootState>({
  layers,
  tools,
  build,
  guideLayer
});

export default rootReducer;
