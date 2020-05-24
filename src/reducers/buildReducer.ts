import { BallenAction } from "actions/actionTypes";
import { BUILD, BuildActions, CLOSE_BUILD, OPEN_BUILD } from "actions/buildAction";
import { BuildState, InitialBuildState } from "stores/buildState";

export default function reducer(state: BuildState = InitialBuildState, anyAction: BallenAction): BuildState {
  const action = anyAction as BuildActions;

  switch (action.type) {
    case BUILD:
      return {
        ...state,
        imageData: action.payload.imageData
      };
    case CLOSE_BUILD:
      return {
        ...state,
        isOpened: false
      };
    case OPEN_BUILD:
      return {
        ...state,
        isOpened: true
      };
    default:
      return state;
  }
}
