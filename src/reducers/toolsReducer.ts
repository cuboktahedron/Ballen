import { AnyAction } from "redux";
import { SELECT_TOOL, SET_DRAW_STATE, SET_TOOL_PARAM, ToolsActions } from "../actions/toolsAction";
import { InitialToolsState, ToolsState } from "../store/toolsState";

export default function reducer(state: ToolsState = InitialToolsState, anyAction: AnyAction): ToolsState {
  const action = anyAction as ToolsActions;

  switch (action.type) {
    case SELECT_TOOL:
      return {
        ...state,
        selectedType: action.payload.type
      };
    case SET_DRAW_STATE:
      return {
        ...state,
        drawState: { ...action.payload.state }
      };
    case SET_TOOL_PARAM: {
      const newState = { ...state };
      newState.params[action.payload.type] = action.payload.param;
      return newState;
    }
    default:
      return state;
  }
}
