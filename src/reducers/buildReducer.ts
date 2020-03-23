import { BUILD, BuildActions } from "actions/buildAction";
import { AnyAction } from "redux";
import { BuildState, InitialBuildState } from "stores/buildState";

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
