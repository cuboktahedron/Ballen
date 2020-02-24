import React from "react";
import {
  ListItem,
  ListItemText,
  Box,
  createStyles,
  makeStyles,
  Button,
  Theme,
  IconButton
} from "@material-ui/core";
import { useDispatch } from "react-redux";
import { LayerState } from "../../store/layerState";
import VisibilityIcon from "@material-ui/icons/Visibility";
import VisibilityOffIcon from "@material-ui/icons/VisibilityOff";
import { setActiveLayer } from "../../actions/layersAction";
import { toggleVisible } from "../../actions/layerAction";

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    active: {
      background: theme.palette.grey[200]
    },

    btnColor: (props: LayerProps) => ({
      background: props.color,
      borderColor: "#000",
      borderStyle: "solid",
      borderWidth: 1,
      height: 32,
      marginLeft: 4,
      marginRight: 4,
      minWidth: 32,
      width: 32
    })
  })
);

type LayerProps = LayerState & {
  active: boolean;
};

const Layer: React.FC<LayerProps> = props => {
  const dispatch = useDispatch();

  const selectLayerHandler = (): void => {
    dispatch(setActiveLayer(props.id));
  };

  const toggleVisibleHandler = (): void => {
    dispatch(toggleVisible(props.id));
  };

  const classes = useStyles(props);

  let visibilityButton: JSX.Element;
  if (props.visible) {
    visibilityButton = (
      <IconButton onClick={toggleVisibleHandler}>
        <VisibilityIcon />
      </IconButton>
    );
  } else {
    visibilityButton = (
      <IconButton onClick={toggleVisibleHandler}>
        <VisibilityOffIcon />
      </IconButton>
    );
  }

  return (
    <ListItem
      className={props.active ? classes.active : ""}
      onClick={selectLayerHandler}
    >
      <Box>
        {visibilityButton}
        <Button className={classes.btnColor}>{""}</Button>
      </Box>
      <ListItemText primary={props.name} />
    </ListItem>
  );
};

export default Layer;
