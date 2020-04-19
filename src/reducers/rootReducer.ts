import { BallenAction } from "actions/actionTypes";
import { backward, forward, push } from "actions/historyAction";
import { BATCH, REDO, RootActions, UNDO } from "actions/rootAction";
import { Action } from "redux";
import { InitialRootState, RootState } from "stores/rootState";
import buildReducer from "./buildReducer";
import guideLayerReducer from "./guideLayerReducer";
import historyReducer from "./historyReducer";
import layersReducer from "./layersReducer";
import processReducer from "./processReducer";
import toolsReducer from "./toolsReducer";

export default function reducer(state: RootState = InitialRootState, action: Action): RootState {
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
  const bAction = action as BallenAction;

  switch (reducerName) {
    case "process": {
      const newState = processReducer(state.process, bAction);
      if (newState !== state.process) {
        if (bAction.payload.recordDescription) {
          return {
            ...state,
            process: newState,
            history: historyReducer(
              state.history,
              push({ ...state, process: newState }, bAction.payload.recordDescription)
            )
          };
        } else {
          return { ...state, process: newState };
        }
      } else {
        return state;
      }
    }
    case "build": {
      const newState = buildReducer(state.build, bAction);
      if (newState !== state.build) {
        if (bAction.payload.recordDescription) {
          return {
            ...state,
            build: newState,
            history: historyReducer(
              state.history,
              push({ ...state, build: newState }, bAction.payload.recordDescription)
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
      const newState = guideLayerReducer(state.guideLayer, bAction);
      if (newState !== state.guideLayer) {
        if (bAction.payload.recordDescription) {
          return {
            ...state,
            guideLayer: newState,
            history: historyReducer(
              state.history,
              push({ ...state, guideLayer: newState }, bAction.payload.recordDescription)
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
      const newState = layersReducer(state.layers, bAction);
      if (newState !== state.layers) {
        if (bAction.payload.recordDescription) {
          return {
            ...state,
            layers: newState,
            history: historyReducer(
              state.history,
              push({ ...state, layers: newState }, bAction.payload.recordDescription)
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
      const newState = toolsReducer(state.tools, bAction);
      if (newState !== state.tools) {
        if (bAction.payload.recordDescription) {
          return {
            ...state,
            tools: newState,
            history: historyReducer(
              state.history,
              push({ ...state, tools: newState }, bAction.payload.recordDescription)
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
      const newState = historyReducer(state.history, bAction);
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
