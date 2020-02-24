import React from "react";
import Layer from "./Layer";
import { List, IconButton } from "@material-ui/core";
import { LayersState } from "../../store/layersState";
import { LayerState } from "../../store/layerState";
import { RootState } from "../../store/store";
import { useSelector, useDispatch } from "react-redux";
import AddCircleOutlineIcon from "@material-ui/icons/AddCircleOutline";
import DeleteIcon from "@material-ui/icons/Delete";
import { addLayer, deleteLayer } from "../../actions/layersAction";

const Layers: React.FC = () => {
  const dispatch = useDispatch();
  const layers = useSelector((state: RootState) => {
    return state.layers;
  });

  const layerItems = layers.layers.map((layer, key) => {
    return (
      <Layer
        key={key}
        active={layer.id === layers.activeLayerId}
        {...layer}
      ></Layer>
    );
  });

  const addLayerHander = (): void => {
    dispatch(addLayer());
  };

  const deleteLayerHandler = (): void => {
    dispatch(deleteLayer(layers.activeLayerId));
  };

  return (
    <div>
      <List>{layerItems}</List>
      <IconButton onClick={addLayerHander}>
        <AddCircleOutlineIcon />
      </IconButton>
      <IconButton
        onClick={deleteLayerHandler}
        disabled={layers.layers.length <= 1}
      >
        <DeleteIcon />
      </IconButton>
    </div>
  );
};

export const useActiveLayer = (layers: LayersState): LayerState => {
  const activeLayer = layers.layers.find(
    layer => layer.id === layers.activeLayerId
  );
  if (activeLayer === undefined) {
    throw new Error(`can't find layer by id(${layers.activeLayerId})`);
  }

  return activeLayer;
};

export default Layers;
