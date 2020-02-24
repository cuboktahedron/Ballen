import { AnyAction } from "redux";
import { LayerActions, SET_COLOR, TOGGLE_VISIBLE, DRAW } from "../actions/layerAction";
import { LayerState } from "../store/layerState";

export default function reducer(state: LayerState, anyAction: AnyAction): LayerState {
  const action = anyAction as LayerActions;

  switch (action.type) {
    case SET_COLOR:
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
      return {
        ...state,
        imageData: action.payload.layer.imageData
      };
    default:
      return state;
  }
}
