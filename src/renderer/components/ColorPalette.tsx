import { Button, createStyles, makeStyles } from "@material-ui/core";
import { changeColor } from "actions/layerAction";
import React from "react";
import { useDispatch } from "react-redux";
import { useActiveLayer } from "renderer/hooks/useActiveLayer";

const useStyles = makeStyles(() =>
  createStyles({
    btnColor: (props: ColorPaletteProps) => ({
      background: props.color,
      borderColor: "#000",
      borderStyle: "solid",
      borderWidth: 1,
      height: 32,
      margin: 2,
      minWidth: 32,
      width: 32
    })
  })
);

type ColorPaletteProps = {
  color: string;
};

export const ColorPalette: React.FC<ColorPaletteProps> = props => {
  const dispatch = useDispatch();
  const activeLayer = useActiveLayer();

  const handleOnClick = (): void => {
    dispatch(changeColor(activeLayer.id, props.color));
  };

  const classes = useStyles(props);

  return (
    <Button className={classes.btnColor} onClick={handleOnClick}>
      {""}
    </Button>
  );
};
