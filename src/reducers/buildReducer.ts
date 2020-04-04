import { BallenAction } from "actions/actionTypes";
import { BUILD, BuildActions } from "actions/buildAction";
import { BuildState, InitialBuildState } from "stores/buildState";

export default function reducer(state: BuildState = InitialBuildState, anyAction: BallenAction): BuildState {
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
