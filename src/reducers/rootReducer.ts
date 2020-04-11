import { BallenAction } from "actions/actionTypes";
import { InitialRootState, RootState } from "stores/rootState";
import buildReducer from "./buildReducer";
import guideLayerReducer from "./guideLayerReducer";
import historyReducer from "./historyReducer";
import layersReducer from "./layersReducer";
import toolsReducer from "./toolsReducer";
import { push, forward, backward } from "actions/historyAction";
import { REDO, UNDO, BATCH, RootActions } from "actions/rootAction";

export default function reducer(state: RootState = InitialRootState, action: BallenAction): RootState {
  const rootAction = action as RootActions;
  if (rootAction.type === BATCH) {
    let currentState = state;
    rootAction.payload.actions.forEach(action => {
      currentState = reducer(currentState, action);
    });
    return currentState;
  }

  if (action.type === UNDO) {
    const newState = historyReducer(state.history, backward());
    if (newState !== state.history) {
      return { ...state, ...newState.histories[newState.no], history: newState };
    } else {
      return state;
    }
  }

  if (action.type === REDO) {
    const newState = historyReducer(state.history, forward());
    if (newState !== state.history) {
      return { ...state, ...newState.histories[newState.no], history: newState };
    } else {
      return state;
    }
  }

  const reducerName = action.type.split("/")[0];

  switch (reducerName) {
    case "build": {
      const newState = buildReducer(state.build, action);
      if (newState !== state.build) {
        if (action.payload.recordDescription) {
          return {
            ...state,
            build: newState,
            history: historyReducer(
              state.history,
              push({ ...state, build: newState }, action.payload.recordDescription)
            )
          };
        } else {
          return { ...state, build: newState };
        }
      } else {
        return state;
      }
    }
    case "guideLayer": {
      const newState = guideLayerReducer(state.guideLayer, action);
      if (newState !== state.guideLayer) {
        if (action.payload.recordDescription) {
          return {
            ...state,
            guideLayer: newState,
            history: historyReducer(
              state.history,
              push({ ...state, guideLayer: newState }, action.payload.recordDescription)
            )
          };
        } else {
          return { ...state, guideLayer: newState };
        }
      } else {
        return state;
      }
    }
    case "layers": {
      const newState = layersReducer(state.layers, action);
      if (newState !== state.layers) {
        if (action.payload.recordDescription) {
          return {
            ...state,
            layers: newState,
            history: historyReducer(
              state.history,
              push({ ...state, layers: newState }, action.payload.recordDescription)
            )
          };
        } else {
          return { ...state, layers: newState };
        }
      } else {
        return state;
      }
    }
    case "tools": {
      const newState = toolsReducer(state.tools, action);
      if (newState !== state.tools) {
        if (action.payload.recordDescription) {
          return {
            ...state,
            tools: newState,
            history: historyReducer(
              state.history,
              push({ ...state, tools: newState }, action.payload.recordDescription)
            )
          };
        } else {
          return { ...state, tools: newState };
        }
      } else {
        return state;
      }
    }
    case "history": {
      const newState = historyReducer(state.history, action);
      if (newState !== state.history) {
        return { ...state, history: newState };
      } else {
        return state;
      }
    }
    default:
      return state;
  }
}
