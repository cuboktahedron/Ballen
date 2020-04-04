import { BallenAction } from "actions/actionTypes";
import { InitialRootState, RootState } from "stores/rootState";
import buildReducer from "./buildReducer";
import guideLayerReducer from "./guideLayerReducer";
import layersReducer from "./layersReducer";
import toolsReducer from "./toolsReducer";

export default function reducer(state: RootState = InitialRootState, action: BallenAction): RootState {
  const reducerName = action.type.split("/")[0];

  switch (reducerName) {
    case "build": {
      const newState = buildReducer(state.build, action);
      if (newState !== state.build) {
        return { ...state, build: newState };
      } else {
        return state;
      }
    }
    case "guideLayer": {
      const newState = guideLayerReducer(state.build, action);
      if (newState !== state.guideLayer) {
        return { ...state, guideLayer: newState };
      } else {
        return state;
      }
    }
    case "layers": {
      const newState = layersReducer(state.layers, action);
      if (newState !== state.layers) {
        return { ...state, layers: newState };
      } else {
        return state;
      }
    }
    case "tools": {
      const newState = toolsReducer(state.tools, action);
      if (newState !== state.tools) {
        return { ...state, tools: newState };
      } else {
        return state;
      }
    }
    default:
      return state;
  }
}
