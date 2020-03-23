import { CLEAR_GUIDE, DRAW_GUIDE, GuideLayerActions } from "actions/guideLayerAction";
import { AnyAction } from "redux";
import { GuideLayerState, InitialGuideLayerState } from "stores/guideLayerState";

export default function reducer(
  state: GuideLayerState = InitialGuideLayerState,
  anyAction: AnyAction
): GuideLayerState {
  const action = anyAction as GuideLayerActions;

  switch (action.type) {
    case CLEAR_GUIDE:
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
