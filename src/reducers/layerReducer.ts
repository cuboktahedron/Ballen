import { CHANGE_COLOR, DRAW, LayerActions, TOGGLE_VISIBLE, CHANGE_NAME } from "actions/layerAction";
import { AnyAction } from "redux";
import { LayerState } from "stores/layerState";

export default function reducer(state: LayerState, anyAction: AnyAction): LayerState {
  const action = anyAction as LayerActions;

  switch (action.type) {
    case CHANGE_COLOR:
      return {
        ...state,
        color: action.payload.color
      };
    case CHANGE_NAME:
      return {
        ...state,
        name: action.payload.name
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
