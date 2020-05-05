import { BallenAction } from "actions/actionTypes";
import {
  CHANGE_BLEND,
  CHANGE_COLOR,
  CHANGE_NAME,
  CHANGE_OPACITY,
  DRAW,
  LayerActions,
  TOGGLE_VISIBLE
} from "actions/layerAction";
import { LayerState } from "stores/layerState";

export default function reducer(state: LayerState, anyAction: BallenAction): LayerState {
  const action = anyAction as LayerActions;

  if (state.id !== action.payload.layerId) {
    return state;
  }

  switch (action.type) {
    case CHANGE_BLEND:
      return {
        ...state,
        blend: action.payload.blend
      };
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
    case CHANGE_OPACITY:
      return {
        ...state,
        opacity: action.payload.opacity
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
