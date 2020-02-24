import { AnyAction } from "redux";
import { BuildActions, BUILD } from "../actions/buildAction";
import { BuildState, InitialBuildState } from "../store/buildState";

export default function reducer(state: BuildState = InitialBuildState, anyAction: AnyAction): BuildState {
  const action = anyAction as BuildActions;

  switch (action.type) {
    case BUILD:
      return {
        ...state,
        imageData: action.payload.imageData
      };
    default:
      return state;
  }
}
