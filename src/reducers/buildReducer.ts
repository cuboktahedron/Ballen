import { BallenAction } from "actions/actionTypes";
import { BUILD, BuildActions, CLOSE_BUILD, OPEN_BUILD, CLEAR_BUILD, CANCEL_BUILD } from "actions/buildAction";
import { BuildState, InitialBuildState, BS_READY, BS_CANCELING, BS_CANCELED } from "stores/buildState";

export default function reducer(state: BuildState = InitialBuildState, anyAction: BallenAction): BuildState {
  const action = anyAction as BuildActions;

  switch (action.type) {
    case BUILD:
      return {
        ...state,
        buildStatus: action.payload.buildStatus,
        buildTexts: [...state.buildTexts, action.payload.text],
        imageData: action.payload.imageData
      };
    case CANCEL_BUILD:
      return {
        ...state,
        buildStatus: action.payload.done ? BS_CANCELED : BS_CANCELING,
        buildTexts: [...state.buildTexts, action.payload.text]
      };
    case CLEAR_BUILD:
      return {
        ...state,
        buildStatus: BS_READY,
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
