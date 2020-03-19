import { AnyAction } from "redux";
import { CHANGE_TOOL, CHANGE_DRAW_STATE, ToolsActions, CHANGE_TOOL_PROPERTY } from "../actions/toolsAction";
import { InitialToolsState, ToolsState } from "../store/toolsState";

export default function reducer(state: ToolsState = InitialToolsState, anyAction: AnyAction): ToolsState {
  const action = anyAction as ToolsActions;

  switch (action.type) {
    case CHANGE_TOOL:
      return {
        ...state,
        selectedType: action.payload.type
      };
    case CHANGE_DRAW_STATE:
      return {
        ...state,
        drawState: { ...action.payload.state }
      };
    case CHANGE_TOOL_PROPERTY: {
      const newState = { ...state };
      newState.properties.set(action.payload.type, action.payload.property);
      return newState;
    }
    default:
      return state;
  }
}
