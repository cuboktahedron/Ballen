import { AnyAction } from "redux";
import { LayerActions, CHANGE_COLOR, TOGGLE_VISIBLE, DRAW } from "../actions/layerAction";
import { LayerState } from "../store/layerState";

export default function reducer(state: LayerState, anyAction: AnyAction): LayerState {
  const action = anyAction as LayerActions;

  switch (action.type) {
    case CHANGE_COLOR:
      return {
        ...state,
        color: action.payload.color
      };
    case TOGGLE_VISIBLE:
      return {
        ...state,
        visible: !state.visible
      };
    case DRAW:
      if (action.payload.imageData === null) {
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
