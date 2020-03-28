import {
  Box,
  Button,
  createStyles,
  IconButton,
  ListItem,
  makeStyles,
  TextField,
  Theme
} from "@material-ui/core";
import VisibilityIcon from "@material-ui/icons/Visibility";
import VisibilityOffIcon from "@material-ui/icons/VisibilityOff";
import { changeName, toggleVisible } from "actions/layerAction";
import { changeActiveLayer } from "actions/layersAction";
import React, { SyntheticEvent } from "react";
import { useDispatch } from "react-redux";
import { LayerState } from "stores/layerState";
import { useActiveLayer } from "./Layers";

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
  const activeLayer = useActiveLayer();
  const dispatch = useDispatch();

  const selectLayerHandler = (): void => {
    if (props.id === activeLayer.id) {
      return;
    }

    dispatch(changeActiveLayer(props.id));
  };

  const toggleVisibleHandler = (e: SyntheticEvent<HTMLElement>): void => {
    selectLayerHandler();
    dispatch(toggleVisible(props.id));

    e.stopPropagation();
  };

  const handleBlurName = (e: React.FocusEvent<HTMLInputElement>): void => {
    const value = e.currentTarget.value;
    dispatch(changeName(value));
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
      <TextField
        defaultValue={props.name}
        inputProps={{ maxLength: 32 }}
        onBlur={handleBlurName}
      />
    </ListItem>
  );
};

export default Layer;
