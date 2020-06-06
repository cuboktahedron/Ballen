import {
  IconButton,
  List,
  createStyles,
  makeStyles,
  Theme,
  Box
} from "@material-ui/core";
import AddCircleOutlineIcon from "@material-ui/icons/AddCircleOutline";
import DeleteIcon from "@material-ui/icons/Delete";
import { addLayer, deleteLayer } from "actions/layersAction";
import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { LayerState } from "stores/layerState";
import { RootState } from "stores/rootState";
import Layer from "./Layer";

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    body: {
      minHeight: "150px",
      maxHeight: "300px",
      overflow: "auto"
    },

    footer: {
      background: theme.palette.primary.light
    },

    icon: {
      color: theme.palette.primary.contrastText
    }
  })
);

const Layers: React.FC = () => {
  const dispatch = useDispatch();
  const layers = useSelector((state: RootState) => {
    return state.layers;
  });

  const renderLayers: LayerState[] = layers.unsettledLayers ?? layers.layers;
  const layerItems = renderLayers.map((layer, index) => {
    return (
      <Layer
        key={layer.id}
        active={layer.id === layers.activeLayerId}
        index={index}
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

  const classes = useStyles();

  return (
    <Box>
      <Box className={classes.body}>
        <List>{layerItems}</List>
      </Box>
      <Box className={classes.footer}>
        <IconButton
          className={classes.icon}
          size="small"
          onClick={addLayerHander}
        >
          <AddCircleOutlineIcon />
        </IconButton>
        <IconButton
          className={classes.icon}
          size="small"
          disabled={layers.layers.length <= 1}
          onClick={deleteLayerHandler}
        >
          <DeleteIcon />
        </IconButton>
      </Box>
    </Box>
  );
};

export default Layers;
