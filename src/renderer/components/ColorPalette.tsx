import { Button, makeStyles, createStyles } from "@material-ui/core";
import React from "react";
import { useDispatch } from "react-redux";
import { setColor } from "../../actions/layerAction";

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
  const handleOnClick = (): void => {
    dispatch(setColor(props.color));
  };

  const classes = useStyles(props);

  return (
    <Button className={classes.btnColor} onClick={handleOnClick}>
      {""}
    </Button>
  );
};
