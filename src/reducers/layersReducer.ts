import { BallenAction } from "actions/actionTypes";
import {
  ADD_LAYER,
  CHANGE_ACTIVE_LAYER,
  DELETE_LAYER,
  LayersActions,
  MOVE_LAYER,
  END_MOVING_LAYER,
  BEGIN_MOVING_LAYER,
  COMPLETE_MOVING_LAYER,
  LOAD_LAYERS,
  INIT_LAYERS
} from "actions/layersAction";
import { InitialLayersState, LayersState } from "stores/layersState";
import layerReducer from "./layerReducer";
import { LB_NORMAL } from "stores/layerState";

export default function reducer(state: LayersState = InitialLayersState, anyAction: BallenAction): LayersState {
  const action = anyAction as LayersActions;

  const reducerName = action.type.split("/")[1];
  if (reducerName === "layer") {
    let changed = false;
    const newLayers = state.layers.map(layer => {
      const newLayer = layerReducer(layer, action);
      if (newLayer !== layer) {
        changed = true;
        return newLayer;
      } else {
        return layer;
      }
    });

    if (changed) {
      return { ...state, layers: newLayers };
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
      newState.layers = [
        ...newState.layers,
        {
          id: newState.layerIdSequence,
          blend: LB_NORMAL,
          color: "#000000",
          imageData: new ImageData(newState.size.x, newState.size.y),
          name: `layer-${newState.layerIdSequence}`,
          opacity: 100,
          visible: true
        }
      ];

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
        const newState = { ...state };

        newState.layers = [...newState.layers];
        newState.layers.splice(index, 1);
        const nextLayerIndex = newState.layers.length === index ? index - 1 : index;
        newState.activeLayerId = newState.layers[nextLayerIndex].id;
        return newState;
      }
    }
    case BEGIN_MOVING_LAYER: {
      return { ...state, unsettledLayers: [...action.payload.layers] };
    }
    case MOVE_LAYER: {
      return { ...state, unsettledLayers: [...action.payload.layers] };
    }
    case COMPLETE_MOVING_LAYER: {
      return { ...state, layers: [...action.payload.layers], unsettledLayers: null };
    }
    case END_MOVING_LAYER: {
      return { ...state, unsettledLayers: null };
    }
    case LOAD_LAYERS: {
      const newState = { ...state, size: { ...action.payload.size } };
      newState.layerIdSequence = -1;
      newState.layers = action.payload.layers.map(layer => {
        newState.layerIdSequence++;

        return {
          ...layer,
          id: newState.layerIdSequence,
          visible: true
        };
      });

      newState.activeLayerId = newState.layers[0].id;
      return newState;
    }
    case INIT_LAYERS: {
      const newState = { ...InitialLayersState, size: { ...action.payload.size } };
      newState.layers = [
        {
          id: newState.layerIdSequence++,
          blend: LB_NORMAL,
          color: "#000000",
          imageData: new ImageData(newState.size.x, newState.size.y),
          name: `layer-${newState.layerIdSequence}`,
          opacity: 100,
          visible: true
        }
      ];
      newState.activeLayerId = newState.layers[0].id;
      return newState;
    }
    default: {
      return state;
    }
  }
}
