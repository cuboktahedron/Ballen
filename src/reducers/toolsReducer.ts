import { BallenAction } from "actions/actionTypes";
import { CHANGE_DRAW_STATE, CHANGE_TOOL, CHANGE_TOOL_PROPERTY, MOVE_CURSOR, ToolsActions } from "actions/toolsAction";
import { DrawStateWithRect } from "types/tools/tools";
import { InitialToolsState, ToolsState } from "stores/toolsState";

export default function reducer(state: ToolsState = InitialToolsState, anyAction: BallenAction): ToolsState {
  const action = anyAction as ToolsActions;

  switch (action.type) {
    case CHANGE_TOOL:
      return {
        ...state,
        selectedType: action.payload.type
      };
    case CHANGE_DRAW_STATE: {
      const rect = action.payload.state as DrawStateWithRect;
      if (rect && rect.origin != null && rect.to != null) {
        return {
          ...state,
          drawState: { ...action.payload.state },
          rect: [rect.origin, rect.to]
        };
      } else {
        return {
          ...state,
          drawState: { ...action.payload.state },
          rect: null
        };
      }
    }
    case CHANGE_TOOL_PROPERTY: {
      const newState = { ...state };
      newState.properties.set(action.payload.type, action.payload.property);
      return newState;
    }
    case MOVE_CURSOR: {
      return {
        ...state,
        coords: action.payload.coords ? { ...action.payload.coords } : null
      };
    }
    default:
      return state;
  }
}
