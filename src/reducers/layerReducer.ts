import { BallenAction } from "actions/actionTypes";
import {
  ADD_FILTER,
  CHANGE_BLEND,
  CHANGE_COLOR,
  CHANGE_NAME,
  CHANGE_OPACITY,
  DRAW,
  LayerActions,
  TOGGLE_VISIBLE,
  DELETE_FILTER
} from "actions/layerAction";
import { InitialIdProperty } from "stores/filter/id";
import { LayerState } from "stores/layerState";
import filterReducer from "./filterReducer";

export default function reducer(state: LayerState, anyAction: BallenAction): LayerState {
  const action = anyAction as LayerActions;

  if (state.id !== action.payload.layerId) {
    return state;
  }

  const reducerName = action.type.split("/")[2];
  if (reducerName === "filter") {
    let changed = false;
    const newFilters = state.filters.map(filter => {
      const newLayer = filterReducer(filter, action);
      if (newLayer !== filter) {
        changed = true;
        return newLayer;
      } else {
        return filter;
      }
    });

    if (changed) {
      return { ...state, filters: newFilters };
    } else {
      return state;
    }
  }

  switch (action.type) {
    case ADD_FILTER: {
      const newState = { ...state };
      newState.filterIdSequence++;
      newState.filters = [
        ...newState.filters,
        {
          id: newState.filterIdSequence,
          name: `filter-${newState.filterIdSequence}`,
          property: InitialIdProperty
        }
      ];

      return newState;
    }
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
    case DELETE_FILTER: {
      const index = state.filters.findIndex(filter => filter.id === action.payload.filterId);
      if (index === -1) {
        return state;
      } else {
        const newState = { ...state };

        newState.filters = [...newState.filters];
        newState.filters.splice(index, 1);
        return newState;
      }
    }
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
