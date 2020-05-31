import { BallenAction } from "actions/actionTypes";
import { BUILD, BuildActions, CLOSE_BUILD, OPEN_BUILD, CLEAR_BUILD } from "actions/buildAction";
import { BuildState, InitialBuildState } from "stores/buildState";

export default function reducer(state: BuildState = InitialBuildState, anyAction: BallenAction): BuildState {
  const action = anyAction as BuildActions;

  switch (action.type) {
    case BUILD:
      return {
        ...state,
        buildTexts: [...state.buildTexts, action.payload.text],
        imageData: action.payload.imageData
      };
    case CLEAR_BUILD:
      return {
        ...state,
        buildTexts: [],
        imageData: new ImageData(580, 580)
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
