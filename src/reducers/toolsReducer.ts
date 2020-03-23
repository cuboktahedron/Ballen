import { CHANGE_DRAW_STATE, CHANGE_TOOL, CHANGE_TOOL_PROPERTY, ToolsActions } from "actions/toolsAction";
import { AnyAction } from "redux";
import { InitialToolsState, ToolsState } from "stores/toolsState";

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
