import { BallenAction } from "actions/actionTypes";
import { ADD_LAYER, CHANGE_ACTIVE_LAYER, DELETE_LAYER, LayersActions, MOVE_LAYER } from "actions/layersAction";
import { InitialLayersState, LayersState } from "stores/layersState";
import layerReducer from "./layerReducer";

export default function reducer(state: LayersState = InitialLayersState, anyAction: BallenAction): LayersState {
  const action = anyAction as LayersActions;

  const reducerName = action.type.split("/")[1];
  if (reducerName === "layer") {
    let changed = false;
    const newState = state.layers.map(layer => {
      const newLayer = layerReducer(layer, action);
      if (newLayer !== layer) {
        changed = true;
        return newLayer;
      } else {
        return layer;
      }
    });

    if (changed) {
      return { ...state, layers: newState };
    } else {
      return state;
    }
  }

  switch (action.type) {
    case CHANGE_ACTIVE_LAYER:
      return { ...state, activeLayerId: action.payload.layerId };
    case ADD_LAYER: {
      const newState = { ...state };
      newState.layerIdSequence++;
      newState.layers.push({
        id: state.layerIdSequence,
        color: "#000000",
        name: `layer-${state.layerIdSequence}`,
        visible: true,
        imageData: new ImageData(state.size.x, state.size.y)
      });
      if (newState.activeLayerId === -1) {
        newState.activeLayerId = newState.layers[0].id;
      }
      return newState;
    }
    case DELETE_LAYER: {
      if (state.layers.length === 1) {
        return state;
      }

      const index = state.layers.findIndex(layer => layer.id === action.payload.layerId);
      if (index === -1) {
        return state;
      } else {
        state.layers.splice(index, 1);
        const nextLayerIndex = state.layers.length === index ? index - 1 : index;
        const activeLayerId = state.layers[nextLayerIndex].id;
        return { ...state, activeLayerId };
      }
    }
    case MOVE_LAYER: {
      return { ...state, layers: [...action.payload.layers] };
    }
    default: {
      let stateChanged = false;
      state.layers = state.layers.map(layer => {
        if (layer.id === state.activeLayerId) {
          const newLayer = layerReducer(layer, action);
          if (layer !== newLayer) {
            stateChanged = true;
          }
          return newLayer;
        } else {
          return layer;
        }
      });

      if (stateChanged) {
        return { ...state };
      } else {
        return state;
      }
    }
  }
}
