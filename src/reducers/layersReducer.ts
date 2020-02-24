import { AnyAction } from "redux";
import { LayersActions, SET_ACTIVE_LAYER, ADD_LAYER, DELETE_LAYER } from "../actions/layersAction";
import { InitialLayersState, LayersState } from "../store/layersState";
import layerReducer from "./layerReducer";
import { TOGGLE_VISIBLE } from "../actions/layerAction";

export default function reducer(state: LayersState = InitialLayersState, anyAction: AnyAction): LayersState {
  const action = anyAction as LayersActions;

  switch (action.type) {
    case SET_ACTIVE_LAYER:
      return { ...state, activeLayerId: action.payload.layerId };
    case ADD_LAYER:
      state.layerIdSequence++;
      state.layers.push({
        id: state.layerIdSequence,
        color: "#000000",
        name: `layer-${state.layerIdSequence}`,
        visible: true,
        imageData: new ImageData(state.size.x, state.size.y)
      });
      if (state.activeLayerId === -1) {
        state.activeLayerId = state.layers[0].id;
      }
      return { ...state };
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
    case TOGGLE_VISIBLE:
      state.layers = state.layers.map(layer => {
        if (layer.id === action.payload.layerId) {
          return layerReducer(layer, action);
        } else {
          return layer;
        }
      });
      return { ...state };
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
