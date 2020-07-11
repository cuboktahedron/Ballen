import { BallenAction } from "actions/actionTypes";
import { BATCH } from "actions/batchAction";
import { backward, forward, push } from "reducers/actions/historyReducerAction";
import { CLEAR_HISTORY, REDO, RootActions, UNDO } from "actions/rootAction";
import { Action } from "redux";
import { InitialFileState } from "stores/fileState";
import { InitialHistoryState } from "stores/historyState";
import { InitialRootState, RootState } from "stores/rootState";
import buildReducer from "./buildReducer";
import dialogReducer from "./dialogReducer";
import fileReducer from "./fileReducer";
import guideLayerReducer from "./guideLayerReducer";
import historyReducer from "./historyReducer";
import layersReducer from "./layersReducer";
import toolsReducer from "./toolsReducer";

const reducers = {
  build: buildReducer,
  dialog: dialogReducer,
  file: fileReducer,
  guideLayer: guideLayerReducer,
  history: historyReducer,
  layers: layersReducer,
  tools: toolsReducer
};

export default function reducer(state: RootState = InitialRootState, action: Action): RootState {
  const rootAction = action as RootActions;
  if (rootAction.type === BATCH) {
    let currentState = state;
    rootAction.payload.actions.forEach(action => {
      currentState = reducer(currentState, action);
    });
    return currentState;
  }

  if (rootAction.type === UNDO) {
    const newState = historyReducer(state.history, backward());
    if (newState !== state.history) {
      return { ...state, ...newState.histories[newState.no], history: newState };
    } else {
      return state;
    }
  }

  if (rootAction.type === REDO) {
    const newState = historyReducer(state.history, forward());
    if (newState !== state.history) {
      return { ...state, ...newState.histories[newState.no], history: newState };
    } else {
      return state;
    }
  }

  if (rootAction.type === CLEAR_HISTORY) {
    const newState = historyReducer(
      InitialHistoryState,
      push({ ...state, file: { ...InitialFileState } }, rootAction.payload.reason)
    );
    if (newState !== state.history) {
      return { ...state, ...newState.histories[newState.no], history: newState };
    } else {
      return state;
    }
  }

  const reducerName = action.type.split("/")[0];
  if (!(reducerName in state)) {
    return state;
  }

  const bAction = action as BallenAction;
  const newState = reducers[reducerName](state[reducerName], bAction);
  if (newState !== state[reducerName]) {
    if (bAction.payload.recordDescription) {
      return {
        ...state,
        [reducerName]: newState,
        history: historyReducer(state.history, push({ [reducerName]: newState }, bAction.payload.recordDescription))
      };
    } else {
      return { ...state, [reducerName]: newState };
    }
  } else {
    return state;
  }
}
