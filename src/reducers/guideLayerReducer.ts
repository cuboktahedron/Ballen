import { AnyAction } from "redux";
import { GuideLayerState, InitialGuideLayerState } from "../store/guideLayerState";
import { GuideLayerActions, DRAW_GUIDE, CLEAR } from "../actions/guideLayerAction";

export default function reducer(
  state: GuideLayerState = InitialGuideLayerState,
  anyAction: AnyAction
): GuideLayerState {
  const action = anyAction as GuideLayerActions;

  switch (action.type) {
    case CLEAR:
      return {
        ...state,
        imageData: new ImageData(state.imageData.width, state.imageData.height)
      };
    case DRAW_GUIDE:
      if (action.payload.imageData == null) {
        return state;
      } else {
        return {
          ...state,
          imageData: action.payload.imageData
        };
      }
    default:
      return state;
  }
}
