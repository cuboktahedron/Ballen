import { AnyAction } from "redux";
import { ToolActions, SET_TOOL, SET_DRAW_STATE } from "../actions/toolAction";
import { InitialToolState, ToolState } from "../store/toolState";

export default function reducer(state: ToolState = InitialToolState, anyAction: AnyAction): ToolState {
  const action = anyAction as ToolActions;

  switch (action.type) {
    case SET_TOOL:
      return {
        ...state,
        type: action.payload.type,
        drawState: {}
      };
    case SET_DRAW_STATE:
      return {
        ...state,
        drawState: { ...action.payload.state }
      };
    default:
      return state;
  }
}
