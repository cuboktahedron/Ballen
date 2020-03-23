import { ADD_LAYER, CHANGE_ACTIVE_LAYER, DELETE_LAYER, DRAW, LayersActions } from "actions/layersAction";
import { AnyAction } from "redux";
import { InitialLayersState, LayersState } from "stores/layersState";
import { DRAW as LAYER_DRAW } from "actions/layerAction";
import layerReducer from "./layerReducer";

export default function reducer(state: LayersState = InitialLayersState, anyAction: AnyAction): LayersState {
  const action = anyAction as LayersActions;

  switch (action.type) {
    case CHANGE_ACTIVE_LAYER:
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
    case DRAW: {
      state.layers = state.layers.map(layer => {
        if (layer.id === state.activeLayerId) {
          return layerReducer(layer, {
            type: LAYER_DRAW,
            payload: {
              imageData: action.payload.layer.imageData
            }
          });
        } else {
          return layer;
        }
      });

      return { ...state };
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
